"use client";

import React, { useState } from "react";
import { MenuItemData, MenuCard } from "@/components/menu/MenuCard";
import { HandDrawnUnderline, EmberFlourish, PrintedDottedDivider } from "@/components/ui/HandDrawnAccents";
import { Search, Flame, Filter } from "lucide-react";
import { useReservationModal } from "@/context/ReservationModalContext";

export function MenuCatalog({ items }: { items: MenuItemData[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [dietaryFilter, setDietaryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openModal } = useReservationModal();

  const categories = [
    { id: "ALL", label: "Full Degustation" },
    { id: "STARTERS", label: "Starters & Crudo" },
    { id: "WOOD_FIRED", label: "The Wood-Fired Hearth" },
    { id: "MAINS", label: "Signature Mains" },
    { id: "DESSERTS", label: "Confections" },
    { id: "COCKTAILS_WINE", label: "Cellar & Cocktails" },
  ];

  const dietaryOptions = [
    { id: "ALL", label: "All Offerings" },
    { id: "GF", label: "Gluten-Free (GF)" },
    { id: "DF", label: "Dairy-Free (DF)" },
    { id: "VG", label: "Vegetarian (VG)" },
    { id: "CHEF_FAVORITE", label: "Hearth Signatures" },
  ];

  const filteredItems = items.filter((item) => {
    // Category match
    if (activeCategory !== "ALL" && item.category !== activeCategory) {
      return false;
    }

    // Dietary filter match
    if (dietaryFilter !== "ALL") {
      const tags = item.dietaryTags ? item.dietaryTags.split(",") : [];
      if (!tags.includes(dietaryFilter)) return false;
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchPairing = item.pairing?.toLowerCase().includes(q) || false;
      if (!matchName && !matchDesc && !matchPairing) return false;
    }

    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-8">
      {/* Title & Editorial Lead */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
          <EmberFlourish className="w-4 h-4 text-gold" />
          <span>The Printed Edition</span>
          <EmberFlourish className="w-4 h-4 text-gold" />
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
          Degustation &amp; Offerings
        </h1>
        <div className="flex justify-center mt-2 mb-4">
          <HandDrawnUnderline className="text-ember w-40 h-3" />
        </div>
        <p className="text-sm text-muted-theme font-light leading-relaxed">
          Culinary selections roasted over cured white oak, complemented by grower-producer
          biodynamic viticulture.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border-theme p-4 sm:p-6 mb-12 space-y-4 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-muted-theme absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dishes, ingredients, or sommelier pairings..."
            className="w-full bg-surface-raised border border-border-theme text-foreground pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-gold"
          />
        </div>

        {/* Categories Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-2 text-xs uppercase tracking-wider font-semibold border transition-colors ${
                activeCategory === cat.id
                  ? "bg-gold text-black border-gold"
                  : "bg-surface-raised border-border-theme text-muted-theme hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Tag Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border-theme/60 text-xs">
          <div className="flex items-center gap-1.5 text-muted-theme uppercase tracking-wider text-[10px] font-mono mr-2">
            <Filter className="w-3 h-3 text-ember" />
            <span>Filter Dietary:</span>
          </div>
          {dietaryOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDietaryFilter(opt.id)}
              className={`px-2.5 py-1 text-[11px] border font-mono transition-colors ${
                dietaryFilter === opt.id
                  ? "bg-ember text-white border-ember font-bold"
                  : "border-border-theme text-muted-theme hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Listing */}
      <div className="space-y-2 min-h-[400px]">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}

        {filteredItems.length === 0 && (
          <div className="py-20 text-center border border-dashed border-border-theme p-8">
            <p className="font-serif italic text-lg text-foreground mb-2">
              No culinary items match your filter criteria.
            </p>
            <p className="text-xs text-muted-theme">
              Try adjusting your search terms or dietary filters.
            </p>
          </div>
        )}
      </div>

      <PrintedDottedDivider className="my-14" />

      {/* Bottom Booking Callout */}
      <div className="bg-surface border border-border-theme p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div>
          <h3 className="font-serif text-2xl font-bold text-foreground">
            Experience These Offerings Tonight
          </h3>
          <p className="text-xs text-muted-theme mt-1">
            Reserve a dining table or front-row hearth counter seat with our concierge.
          </p>
        </div>
        <button
          type="button"
          onClick={() => openModal()}
          className="px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs uppercase tracking-[0.2em] inline-flex items-center gap-2 border border-gold"
        >
          <Flame className="w-4 h-4 text-ember" />
          <span>Reserve a Table</span>
        </button>
      </div>
    </div>
  );
}
