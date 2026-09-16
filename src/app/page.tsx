import React from "react";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navigation/Navbar";
import { MobileBottomBar } from "@/components/navigation/MobileBottomBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { StorySection } from "@/components/sections/StorySection";
import { MenuSection } from "@/components/sections/MenuSection";
import { ChefSpotlight } from "@/components/sections/ChefSpotlight";
import { PressAccolades } from "@/components/sections/PressAccolades";
import { LocationHours } from "@/components/sections/LocationHours";
import { Footer } from "@/components/layout/Footer";
import { ReservationModalProvider } from "@/context/ReservationModalContext";
import { ReservationModal } from "@/components/reservation/ReservationModal";

export const revalidate = 60; // Revalidate menu items every minute

export default async function HomePage() {
  // Fetch menu items on server for instant hydration
  const menuItems = await prisma.menuItem.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return (
    <ReservationModalProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-ember selection:text-white">
        {/* Global Navigation */}
        <Navbar />

        {/* Main Content Sections in Perfect Storytelling Flow */}
        <main className="flex-1">
          {/* 1. Hero with Ken-Burns Zoom & Staggered Reveal */}
          <HeroSection />

          {/* 2. Visual Archive: Moments in Smoke & Stone (Elevated to top section) */}
          <GallerySection />

          {/* 3. The Philosophy: Primal Hearth, Sovereign Terroir & Living Cellar */}
          <StorySection />

          {/* 4. Printed Menu Experience */}
          <MenuSection initialItems={menuItems} />

          {/* 5. Culinary & Cellar Direction */}
          <ChefSpotlight />

          {/* 6. Editorial Press & Critiques */}
          <PressAccolades />

          {/* 7. Schedule, Address, Dark Map & Dispatch */}
          <LocationHours />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Floating Bottom App Dock */}
        <MobileBottomBar />

        {/* Global Reservation Modal Dialog */}
        <ReservationModal />
      </div>
    </ReservationModalProvider>
  );
}
