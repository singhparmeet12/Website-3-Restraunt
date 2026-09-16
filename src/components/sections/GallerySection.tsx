"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from "lucide-react";
import { EmberFlourish, HandDrawnUnderline } from "@/components/ui/HandDrawnAccents";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
  tag: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g1",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=85",
    alt: "Ember Hearth Fire & Rotisserie",
    caption: "Missouri white oak logs burning down to 1,200°F cooking embers.",
    tag: "The Hearth",
  },
  {
    id: "g2",
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=85",
    alt: "Hand-Cut Wagyu Tartare Plating",
    caption: "Cured egg yolk, smoked shallot aioli, and crispy tendon crisp.",
    tag: "Plating",
  },
  {
    id: "g3",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85",
    alt: "Main Dining Room Atmosphere",
    caption: "Candlelit dark oak banquettes beneath reclaimed timber beams.",
    tag: "Atmosphere",
  },
  {
    id: "g4",
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=85",
    alt: "Underground Sommelier Vault",
    caption: "Over 750 biodynamic and rare vintage European allocations.",
    tag: "The Cellar",
  },
  {
    id: "g5",
    src: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1600&q=85",
    alt: "45-Day Dry-Aged Bone-in Ribeye",
    caption: "Caramelized crust finished with smoked marrow butter and garlic flowers.",
    tag: "Signature",
  },
  {
    id: "g6",
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1600&q=85",
    alt: "Smoked Cherrywood Old Fashioned",
    caption: "Brown butter-washed bourbon served over crystal hand-carved sphere.",
    tag: "Cocktails",
  },
];

export function GallerySection() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev! > 0 ? prev! - 1 : GALLERY_IMAGES.length - 1));
  }, [activeIdx]);

  const handleNext = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((prev) => (prev! < GALLERY_IMAGES.length - 1 ? prev! + 1 : 0));
  }, [activeIdx]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, handlePrev, handleNext]);

  return (
    <section id="gallery" className="py-12 sm:py-24 bg-background text-foreground border-b border-border-theme/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <EmberFlourish className="w-4 h-4 text-gold" />
            <span>Visual Archive</span>
            <EmberFlourish className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Moments in Smoke &amp; Stone
          </h2>
          <div className="flex justify-center mt-2 mb-4">
            <HandDrawnUnderline className="text-ember w-36 h-2.5" />
          </div>
          <p className="text-xs sm:text-sm text-muted-theme font-light leading-relaxed">
            A photographic glimpse inside our wood-burning hearth, historic dining room, and subterranean wine cellar.
          </p>
        </div>

        {/* 2-column on mobile, 2-col on tablet, 3-col on desktop for maximum density and low scrolling */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setActiveIdx(idx)}
              className="group relative cursor-pointer overflow-hidden border border-border-theme bg-surface aspect-[4/3] shadow-lg"
            >
              {/* Background Image with Hover Zoom */}
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('${img.src}')` }}
                role="img"
                aria-label={img.alt}
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Tag Badge */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/70 backdrop-blur-md px-1.5 py-0.5 sm:px-2.5 sm:py-1 text-[8px] sm:text-[9px] uppercase font-mono tracking-widest text-gold border border-border-theme">
                {img.tag}
              </div>

              {/* Zoom Icon on Hover */}
              <div className="hidden sm:flex absolute top-3 right-3 w-8 h-8 rounded-none bg-black/60 border border-border-theme text-foreground/80 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5 text-gold" />
              </div>

              {/* Overlay Caption */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 text-white transform sm:translate-y-1 sm:group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-serif text-xs sm:text-base font-bold text-white tracking-wide truncate">
                  {img.alt}
                </h4>
                <p className="text-[10px] sm:text-[11px] text-[#C2B5A8] line-clamp-1 mt-0.5 font-light">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveIdx(null)}
              className="absolute top-6 right-6 z-20 p-2.5 text-white/80 hover:text-white border border-border-theme bg-black/60 transition-colors"
              aria-label="Close image lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 z-20 p-3 text-white/80 hover:text-white border border-border-theme bg-black/60 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 z-20 p-3 text-white/80 hover:text-white border border-border-theme bg-black/60 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content */}
            <motion.div
              key={GALLERY_IMAGES[activeIdx].id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full max-h-[70vh] border border-border-theme bg-surface overflow-hidden shadow-2xl">
                <div
                  className="w-full h-full bg-contain bg-no-repeat bg-center"
                  style={{ backgroundImage: `url('${GALLERY_IMAGES[activeIdx].src}')` }}
                />
              </div>

              {/* Caption and index bar */}
              <div className="mt-4 text-center max-w-lg">
                <div className="flex items-center justify-center gap-2 text-gold text-[10px] uppercase font-mono tracking-widest mb-1">
                  <span>{GALLERY_IMAGES[activeIdx].tag}</span>
                  <span>&bull;</span>
                  <span>
                    {activeIdx + 1} of {GALLERY_IMAGES.length}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-white">
                  {GALLERY_IMAGES[activeIdx].alt}
                </h3>
                <p className="text-xs text-[#C2B5A8] mt-1 font-light">
                  {GALLERY_IMAGES[activeIdx].caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
