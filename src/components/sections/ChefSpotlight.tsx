import React from "react";
import { EmberFlourish, HandDrawnUnderline, OakLeafSprig } from "@/components/ui/HandDrawnAccents";
import { Award, Wine } from "lucide-react";

export function ChefSpotlight() {
  return (
    <section id="chef" className="py-12 sm:py-24 bg-surface text-foreground border-b border-border-theme/40 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <EmberFlourish className="w-4 h-4 text-gold" />
            <span>The Custodians</span>
            <EmberFlourish className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Culinary Direction &amp; Cellar
          </h2>
          <div className="flex justify-center mt-2 mb-4">
            <HandDrawnUnderline className="text-ember w-36 h-2.5" />
          </div>
          <p className="text-xs sm:text-sm text-muted-theme font-light leading-relaxed">
            The creative minds shaping our wood-fired hearth and natural viticulture program.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Profile 1: Executive Chef Marcus Vance */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative w-full max-w-[220px] sm:max-w-none sm:w-56 aspect-[3/4] flex-shrink-0 mx-auto sm:mx-0 border border-border-theme bg-surface-raised overflow-hidden shadow-xl">
              <div
                className="w-full h-full bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80')`,
                }}
                role="img"
                aria-label="Executive Chef Marcus Vance"
              />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 text-[9px] uppercase font-mono tracking-widest text-gold border border-border-theme">
                Executive Chef
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-mono mb-1">
                  <Award className="w-3.5 h-3.5 text-ember" />
                  <span>James Beard Nominee</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Marcus Vance
                </h3>
                <span className="text-xs uppercase tracking-widest text-muted-theme block mt-0.5">
                  Culinary Director &amp; Hearthmaster
                </span>

                {/* Pull Quote in Display Serif Italic */}
                <blockquote className="my-4 sm:my-5 border-l-2 border-gold pl-4 italic font-serif text-sm sm:text-lg text-foreground/90 leading-snug">
                  &ldquo;Fire is not merely a heat source; it is our primary ingredient, imparting
                  nuance that modern ovens could never replicate.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-muted-theme leading-relaxed font-light">
                  Following stages in the Basque hills of Getaria and Copenhagen&apos;s pioneering
                  open-fire kitchens, Chef Marcus returned to establish Ember &amp; Oak. His cuisine
                  strips away superfluous garnishes in favor of profound caramelized depth and
                  honest wood smoke.
                </p>
              </div>
            </div>
          </div>

          {/* Profile 2: Master Sommelier Elena Rostova */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <div className="relative w-full max-w-[220px] sm:max-w-none sm:w-56 aspect-[3/4] flex-shrink-0 mx-auto sm:mx-0 border border-border-theme bg-surface-raised overflow-hidden shadow-xl">
              <div
                className="w-full h-full bg-cover bg-center grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                style={{
                  backgroundImage: `url('/images/elena-rostova.jpg')`,
                }}
                role="img"
                aria-label="Master Sommelier Elena Rostova"
              />
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 text-[9px] uppercase font-mono tracking-widest text-gold border border-border-theme">
                Master Sommelier
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-mono mb-1">
                  <Wine className="w-3.5 h-3.5 text-gold" />
                  <span>Court of Master Sommeliers</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                  Elena Rostova
                </h3>
                <span className="text-xs uppercase tracking-widest text-muted-theme block mt-0.5">
                  Beverage Director &amp; Cellarmaster
                </span>

                {/* Pull Quote in Display Serif Italic */}
                <blockquote className="my-4 sm:my-5 border-l-2 border-gold pl-4 italic font-serif text-sm sm:text-lg text-foreground/90 leading-snug">
                  &ldquo;The greatest bottles are not forged by industrial chemistry, but by soil,
                  season, and the patient restraint of grower-producers.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-muted-theme leading-relaxed font-light">
                  Having guided cellars in Lyon, Geneva, and Manhattan, Elena curates our subterranean
                  collection with an emphasis on biodynamic vignerons and historical library vintages.
                  Her pairings challenge conventions, matching rich smoky cuts with electrifying
                  alpine acidity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
