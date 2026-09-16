"use client";

import React from "react";
import Link from "next/link";
import { useReservationModal } from "@/context/ReservationModalContext";
import { Flame, Image as ImageIcon, UtensilsCrossed, Clock3, Sparkles } from "lucide-react";

export function MobileBottomBar() {
  const { openModal } = useReservationModal();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 pointer-events-auto">
      {/* Background Glass Dock */}
      <div className="bg-[#130f0d]/92 backdrop-blur-xl border-t border-[#362a23]/75 px-3 py-2 sm:py-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(0,0,0,0.65)]">
        <nav className="max-w-md mx-auto grid grid-cols-5 items-center text-center">
          {/* 1. Moments (Gallery) */}
          <Link
            href="/#gallery"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-gold active:scale-95 transition-all group"
            aria-label="View Moments Gallery"
          >
            <ImageIcon className="w-4 h-4 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
            <span className="text-[10px] tracking-wider uppercase font-medium font-sans">
              Moments
            </span>
          </Link>

          {/* 2. Philosophy (Story) */}
          <Link
            href="/#story"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-gold active:scale-95 transition-all group"
            aria-label="Read Our Story & Philosophy"
          >
            <Sparkles className="w-4 h-4 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
            <span className="text-[10px] tracking-wider uppercase font-medium font-sans">
              Story
            </span>
          </Link>

          {/* 3. Primary CTA: Reserve Table (Highlighted Floating Center Button) */}
          <button
            type="button"
            onClick={() => openModal()}
            className="relative -top-3.5 flex flex-col items-center justify-center active:scale-95 transition-transform mx-auto focus:outline-none"
            aria-label="Reserve a Table"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#9e3a13] via-ember to-[#f39c55] p-[1.5px] shadow-[0_0_20px_rgba(217,122,63,0.5)]">
              <div className="w-full h-full rounded-full bg-[#1b1512] flex items-center justify-center border border-gold/40">
                <Flame className="w-5 h-5 text-gold animate-pulse" />
              </div>
            </div>
            <span className="text-[9px] tracking-widest uppercase font-bold text-gold mt-0.5 font-sans whitespace-nowrap drop-shadow">
              Reserve
            </span>
          </button>

          {/* 4. Menu */}
          <Link
            href="/#menu"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-gold active:scale-95 transition-all group"
            aria-label="View Menu"
          >
            <UtensilsCrossed className="w-4 h-4 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
            <span className="text-[10px] tracking-wider uppercase font-medium font-sans">
              Menu
            </span>
          </Link>

          {/* 5. Visit / Hours */}
          <Link
            href="/#location"
            className="flex flex-col items-center justify-center py-1 text-white/75 hover:text-gold active:scale-95 transition-all group"
            aria-label="Hours and Location"
          >
            <Clock3 className="w-4 h-4 mb-1 text-gold/80 group-hover:text-gold transition-colors" />
            <span className="text-[10px] tracking-wider uppercase font-medium font-sans">
              Hours
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
