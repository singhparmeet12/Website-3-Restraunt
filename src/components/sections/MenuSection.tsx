"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuCard, MenuItemData } from "@/components/menu/MenuCard";
import { HandDrawnUnderline, EmberFlourish, PrintedDottedDivider } from "@/components/ui/HandDrawnAccents";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { useReservationModal } from "@/context/ReservationModalContext";

interface MenuSectionProps {
  initialItems: MenuItemData[];
}

export function MenuSection({ initialItems }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>("STARTERS");
  const { openModal } = useReservationModal();

  const categories = [
    { id: "STARTERS", label: "Starters & Crudo" },
    { id: "WOOD_FIRED", label: "Wood-Fired Hearth" },
    { id: "MAINS", label: "Signature Mains" },
    { id: "DESSERTS", label: "Confections & Tarte" },
    { id: "COCKTAILS_WINE", label: "Cellar & Cocktails" },
  ];

  const filteredItems = initialItems.filter(
    (item) => item.category === activeCategory
  );

  return (
    <section id="menu" className="py-12 sm:py-24 bg-surface text-foreground border-b border-border-theme/40 relative">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-ember/5 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <EmberFlourish className="w-4 h-4 text-gold" />
            <span>Seasonal Degustation</span>
            <EmberFlourish className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            The Hearth &amp; Cellar Menu
          </h2>
          <div className="flex justify-center mt-2 mb-4">
            <HandDrawnUnderline className="text-ember w-36 h-2.5" />
          </div>
          <p className="text-xs sm:text-sm text-muted-theme font-light leading-relaxed">
            Every dish is kissed by white oak embers and paired with low-intervention viticulture.
            Menu items rotate as micro-seasons shift.
          </p>
        </div>

        {/* Category Tabs: Mobile-friendly horizontally scrollable pill selector */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 no-scrollbar gap-2 sm:gap-3 border-b border-border-theme/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-200 border ${
                activeCategory === cat.id
                  ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,169,98,0.25)]"
                  : "bg-surface-raised/60 border-border-theme text-muted-theme hover:text-foreground hover:border-gold/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tab-switch Stagger Animation */}
        <div className="min-h-[320px] sm:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-1"
            >
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.3 }}
                >
                  <MenuCard item={item} />
                </motion.div>
              ))}

              {filteredItems.length === 0 && (
                <div className="py-16 text-center text-muted-theme font-serif italic">
                  Tonight&apos;s selections for this category are being prepared by the kitchen.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <PrintedDottedDivider className="my-12 text-border-theme" />

        {/* Callouts and Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          <div className="text-center sm:text-left">
            <span className="font-serif italic text-foreground text-sm block">
              Dietary preferences &amp; bespoke multi-course tasting menus
            </span>
            <span className="text-[11px] text-muted-theme">
              Please notify our concierge of all allergies 24 hours prior to service.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="px-6 py-3 border border-border-theme hover:border-foreground text-foreground text-xs uppercase tracking-[0.2em] font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>Full Menu &amp; Wine List</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => openModal()}
              className="px-6 py-3 bg-gold hover:bg-gold-light text-black text-xs uppercase tracking-[0.2em] font-semibold transition-colors border border-gold inline-flex items-center gap-2"
            >
              <Flame className="w-3.5 h-3.5 text-ember" />
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
