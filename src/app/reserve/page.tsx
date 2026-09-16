import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ReservationFlow } from "@/components/reservation/ReservationFlow";
import { ReservationModalProvider } from "@/context/ReservationModalContext";
import { ReservationModal } from "@/components/reservation/ReservationModal";

export const metadata = {
  title: "Reserve a Table | Ember & Oak Modern Bistro",
  description:
    "Book an intimate dining reservation or front-row hearth counter seating at Ember & Oak. Real-time availability, instant confirmation, and sommelier pairing options.",
};

export default function ReservePage() {
  return (
    <ReservationModalProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-1 pt-28 sm:pt-36 pb-24 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Embedded Full Reservation Flow */}
            <ReservationFlow isModal={false} />
          </div>
        </main>

        <Footer />
        <ReservationModal />
      </div>
    </ReservationModalProvider>
  );
}
