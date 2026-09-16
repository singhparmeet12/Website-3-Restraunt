import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit } from "@/lib/rateLimit";
import { sendReservationConfirmationEmail } from "@/lib/email";

const ReservationSchema = z.object({
  guestName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name cannot exceed 80 characters")
    .trim(),
  guestEmail: z.string().email("Please provide a valid email address").trim().toLowerCase(),
  guestPhone: z
    .string()
    .min(7, "Phone number must be at least 7 characters")
    .max(25, "Phone number is too long")
    .trim(),
  partySize: z
    .number()
    .int()
    .min(1, "Party size must be at least 1")
    .max(8, "For parties larger than 8, please contact concierge directly"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  timeSlot: z.string().regex(/^\d{2}:\d{2}$/, "Time slot must be in HH:MM format"),
  seatingArea: z
    .enum(["HEARTH_COUNTER", "MAIN_DINING", "WINE_VAULT", "TERRACE", "ANY"])
    .default("MAIN_DINING"),
  occasion: z.string().max(60).optional().nullable(),
  dietaryNotes: z.string().max(250).optional().nullable(),
  specialRequests: z.string().max(350).optional().nullable(),
});

function generateReference(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // No ambiguous chars (0/O, 1/I)
  let result = "EO-";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by client IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "local-client";
    const rateLimit = checkRateLimit(`res_${ip}`, 8, 10 * 60 * 1000); // 8 bookings per 10 mins

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: "Too many reservation attempts. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Validate request body
    const body = await request.json();
    const validatedData = ReservationSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      guestName,
      guestEmail,
      guestPhone,
      partySize,
      date,
      timeSlot,
      seatingArea,
      occasion,
      dietaryNotes,
      specialRequests,
    } = validatedData.data;

    // Timezone-safe date validation
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    if (date < todayStr) {
      return NextResponse.json(
        { error: "Reservations cannot be booked for past dates." },
        { status: 400 }
      );
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    const maxDateStr = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, "0")}-${String(maxDate.getDate()).padStart(2, "0")}`;

    if (date > maxDateStr) {
      return NextResponse.json(
        { error: "Reservations are open up to 60 days in advance." },
        { status: 400 }
      );
    }

    // 3. Run transactional allocation & double-booking prevention
    const reservation = await prisma.$transaction(async (tx) => {
      // Find candidate tables
      const areaFilter =
        seatingArea && seatingArea !== "ANY" ? { area: seatingArea } : {};

      const candidateTables = await tx.table.findMany({
        where: {
          isActive: true,
          capacityMax: { gte: partySize },
          capacityMin: { lte: partySize },
          ...areaFilter,
        },
      });

      // If specific seating area is full, fall back to any available table
      let eligibleTables = candidateTables;
      if (eligibleTables.length === 0 && seatingArea !== "ANY") {
        eligibleTables = await tx.table.findMany({
          where: {
            isActive: true,
            capacityMax: { gte: partySize },
            capacityMin: { lte: partySize },
          },
        });
      }

      if (eligibleTables.length === 0) {
        throw new Error("NO_CAPACITY");
      }

      // Check which of these tables are already booked for this date and timeSlot
      const tableIds = eligibleTables.map((t) => t.id);
      const bookedReservations = await tx.reservation.findMany({
        where: {
          date,
          timeSlot,
          tableId: { in: tableIds },
          status: { not: "CANCELLED" },
        },
        select: { tableId: true },
      });

      const bookedTableIds = new Set(bookedReservations.map((r) => r.tableId));
      const availableTable = eligibleTables.find((t) => !bookedTableIds.has(t.id));

      if (!availableTable) {
        throw new Error("SLOT_UNAVAILABLE");
      }

      // Generate a unique reference
      let reference = generateReference();
      let exists = await tx.reservation.findUnique({ where: { reference } });
      while (exists) {
        reference = generateReference();
        exists = await tx.reservation.findUnique({ where: { reference } });
      }

      // Create reservation
      const newReservation = await tx.reservation.create({
        data: {
          reference,
          guestName,
          guestEmail,
          guestPhone,
          partySize,
          date,
          timeSlot,
          seatingArea: availableTable.area,
          occasion: occasion || null,
          dietaryNotes: dietaryNotes || null,
          specialRequests: specialRequests || null,
          status: "CONFIRMED",
          tableId: availableTable.id,
        },
        include: {
          table: true,
        },
      });

      return newReservation;
    });

    // 4. Send or simulate confirmation email
    const emailResult = await sendReservationConfirmationEmail({
      reference: reservation.reference,
      guestName: reservation.guestName,
      guestEmail: reservation.guestEmail,
      partySize: reservation.partySize,
      date: reservation.date,
      timeSlot: reservation.timeSlot,
      seatingArea: reservation.seatingArea,
      occasion: reservation.occasion,
      specialRequests: reservation.specialRequests,
    });

    return NextResponse.json(
      {
        success: true,
        reservation,
        emailNotification: {
          sent: emailResult.success,
          simulated: emailResult.simulated,
          previewHtml: emailResult.html,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message === "SLOT_UNAVAILABLE" || error.message === "NO_CAPACITY") {
        return NextResponse.json(
          {
            error:
              "We apologize, but this table slot was just reserved or is unavailable. Please select another time or seating area.",
          },
          { status: 409 }
        );
      }
    }

    console.error("Booking API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while confirming your reservation." },
      { status: 500 }
    );
  }
}
