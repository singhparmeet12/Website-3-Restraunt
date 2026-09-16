import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const STANDARD_TIME_SLOTS = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const partySizeStr = searchParams.get("partySize") || "2";
    const partySize = parseInt(partySizeStr, 10);

    if (!date) {
      return NextResponse.json(
        { error: "Date parameter is required (YYYY-MM-DD)" },
        { status: 400 }
      );
    }

    // Basic date validation
    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid date format. Expected YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Timezone-safe date validation using YYYY-MM-DD string comparison
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    if (date < todayStr) {
      return NextResponse.json(
        { error: "Reservations cannot be booked for past dates" },
        { status: 400 }
      );
    }

    // 60-day window limit
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    const maxDateStr = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, "0")}-${String(maxDate.getDate()).padStart(2, "0")}`;

    if (date > maxDateStr) {
      return NextResponse.json(
        { error: "Reservations are only open up to 60 days in advance" },
        { status: 400 }
      );
    }

    // 1. Fetch eligible tables for this party size
    const eligibleTables = await prisma.table.findMany({
      where: {
        isActive: true,
        capacityMax: { gte: partySize },
        capacityMin: { lte: partySize },
      },
    });

    if (eligibleTables.length === 0) {
      // Party size too large for standard tables
      return NextResponse.json({
        date,
        partySize,
        slots: STANDARD_TIME_SLOTS.map((slot) => ({
          timeSlot: slot,
          status: "sold_out",
          remainingCount: 0,
          areasAvailable: [],
        })),
        message: "For parties larger than 8, please contact our private dining concierge directly.",
      });
    }

    // 2. Fetch existing reservations for this date
    const existingReservations = await prisma.reservation.findMany({
      where: {
        date,
        status: { not: "CANCELLED" },
        tableId: { not: null },
      },
      select: {
        timeSlot: true,
        tableId: true,
      },
    });

    // Group booked table IDs by timeSlot
    const bookedTablesBySlot: Record<string, Set<string>> = {};
    for (const slot of STANDARD_TIME_SLOTS) {
      bookedTablesBySlot[slot] = new Set<string>();
    }

    for (const res of existingReservations) {
      if (bookedTablesBySlot[res.timeSlot] && res.tableId) {
        bookedTablesBySlot[res.timeSlot].add(res.tableId);
      }
    }

    // 3. Compute availability per slot
    const slots = STANDARD_TIME_SLOTS.map((slot) => {
      const bookedSet = bookedTablesBySlot[slot] || new Set();
      const freeTables = eligibleTables.filter((table) => !bookedSet.has(table.id));
      const remainingCount = freeTables.length;

      const areasAvailable = Array.from(new Set(freeTables.map((t) => t.area)));

      let status: "available" | "limited" | "sold_out" = "sold_out";
      if (remainingCount > 2) {
        status = "available";
      } else if (remainingCount > 0) {
        status = "limited";
      }

      return {
        timeSlot: slot,
        status,
        remainingCount,
        areasAvailable,
      };
    });

    return NextResponse.json({
      date,
      partySize,
      slots,
    });
  } catch (error) {
    console.error("Availability API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching availability" },
      { status: 500 }
    );
  }
}
