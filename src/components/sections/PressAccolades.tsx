import React from "react";
import { EmberFlourish, HandDrawnUnderline } from "@/components/ui/HandDrawnAccents";
import { Star } from "lucide-react";

export function PressAccolades() {
  const pressQuotes = [
    {
      source: "The Michelin Guide",
      edition: "Selection & Sommelier Award",
      quote:
        "The most compelling wood-fired hearth in the district. Vance harnesses timber smoke not as a blunt instrument, but as a translucent seasoning.",
      critic: "Inspectors' Notebook",
    },
    {
      source: "The World’s 50 Best Discovery",
      edition: "Global Culinary Archive",
      quote:
        "Ember & Oak achieves that elusive balance: raw, elemental fire cooking presented with the supreme refinement of a grand European bistro.",
      critic: "Discovery Academy",
    },
    {
      source: "Architectural Digest",
      edition: "Dining Design Excellence",
      quote:
        "Moody, transportive, and deeply intentional. The candlelit dark oak joinery and glowing embers feel like a sanctuary from the modern world.",
      critic: "Design & Gastronomy",
    },
  ];

  const pressLogos = [
    "MICHELIN GUIDE",
    "THE WORLD’S 50 BEST",
    "JAMES BEARD FOUNDATION",
    "ARCHITECTURAL DIGEST",
    "FOOD & WINE EDITORS",
  ];

  return (
    <section id="press" className="py-10 sm:py-20 bg-background text-foreground border-b border-border-theme/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Press Strip Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[10px] uppercase font-mono tracking-[0.35em] text-gold/80 block mb-4 sm:mb-6">
            Recognized &bull; Critiqued &bull; Celebrated
          </span>

          {/* Clean Press Logo Strip */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-6 border-y border-border-theme/60 opacity-75">
            {pressLogos.map((logo) => (
              <span
                key={logo}
                className="font-serif tracking-[0.25em] text-xs sm:text-sm text-foreground/70 uppercase font-semibold hover:text-gold transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Static Editorial Critique Quotes (No Carousel!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mt-14">
          {pressQuotes.map((item, idx) => (
            <div
              key={idx}
              className="border border-border-theme bg-surface p-8 flex flex-col justify-between relative group hover:border-gold/60 transition-colors duration-300"
            >
              {/* Star / Badge Icon */}
              <div className="flex items-center gap-1 text-gold mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="font-serif italic text-base sm:text-lg text-foreground leading-relaxed mb-6 font-light">
                &ldquo;{item.quote}&rdquo;
              </p>

              {/* Publication Footer */}
              <div className="border-t border-border-theme/60 pt-4">
                <span className="font-serif text-sm font-bold text-foreground block">
                  {item.source}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold block mt-0.5">
                  {item.edition}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
