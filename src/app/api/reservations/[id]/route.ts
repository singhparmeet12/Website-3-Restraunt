import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Lookup either by unique reference or cuid id
    const reservation = await prisma.reservation.findFirst({
      where: {
        OR: [{ reference: id }, { id: id }],
      },
      include: {
        table: true,
      },
    });

    if (!reservation) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ reservation });
  } catch (error) {
    console.error("Fetch reservation error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reservation" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.reservation.findFirst({
      where: {
        OR: [{ reference: id }, { id: id }],
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id: existing.id },
      data: {
        status: body.status || existing.status,
        specialRequests: body.specialRequests ?? existing.specialRequests,
        dietaryNotes: body.dietaryNotes ?? existing.dietaryNotes,
      },
      include: { table: true },
    });

    return NextResponse.json({ success: true, reservation: updated });
  } catch (error) {
    console.error("Update reservation error:", error);
    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.reservation.findFirst({
      where: {
        OR: [{ reference: id }, { id: id }],
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Reservation not found" },
        { status: 404 }
      );
    }

    // Mark as cancelled rather than hard deleting so audit trail is preserved
    const cancelled = await prisma.reservation.update({
      where: { id: existing.id },
      data: {
        status: "CANCELLED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Reservation successfully cancelled",
      reservation: cancelled,
    });
  } catch (error) {
    console.error("Cancel reservation error:", error);
    return NextResponse.json(
      { error: "Failed to cancel reservation" },
      { status: 500 }
    );
  }
}
