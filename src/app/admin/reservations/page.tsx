import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReservationModalProvider } from "@/context/ReservationModalContext";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { AdminReservationsManager } from "./AdminReservationsManager";

export const metadata = {
  title: "Staff Concierge & Bookings | Ember & Oak",
  description: "Internal staff concierge management for table reservations and seating.",
};

export const dynamic = "force-dynamic";

export default async function AdminReservationsPage() {
  const reservations = await prisma.reservation.findMany({
    include: {
      table: true,
    },
    orderBy: [{ date: "asc" }, { timeSlot: "asc" }],
  });

  const tables = await prisma.table.findMany({
    orderBy: { tableNumber: "asc" },
  });

  return (
    <ReservationModalProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-1 pt-32 pb-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
          <AdminReservationsManager
            initialReservations={JSON.parse(JSON.stringify(reservations))}
            tables={tables}
          />
        </main>

        <Footer />
        <ReservationModal />
      </div>
    </ReservationModalProvider>
  );
}
