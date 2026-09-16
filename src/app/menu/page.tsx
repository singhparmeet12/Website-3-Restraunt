import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileBottomBar } from "@/components/navigation/MobileBottomBar";
import { Footer } from "@/components/layout/Footer";
import { ReservationModalProvider } from "@/context/ReservationModalContext";
import { ReservationModal } from "@/components/reservation/ReservationModal";
import { MenuCatalog } from "./MenuCatalog";

export const metadata = {
  title: "Menu & Degustation | Ember & Oak Bistro",
  description:
    "Explore our complete wood-fired menu: starters, dry-aged steaks, wood-roasted seafood, confections, and low-intervention cellar wines.",
};

export const revalidate = 60;

export default async function MenuPage() {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <ReservationModalProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />

        <main className="flex-1 pt-24 sm:pt-32 pb-24">
          <MenuCatalog items={items} />
        </main>

        <Footer />
        <MobileBottomBar />
        <ReservationModal />
      </div>
    </ReservationModalProvider>
  );
}
