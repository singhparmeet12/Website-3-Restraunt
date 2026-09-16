import React from "react";
import { Flame, Sparkles } from "lucide-react";

export interface MenuItemData {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dietaryTags: string;
  pairing?: string | null;
  image?: string;
  isFeatured?: boolean;
}

export function MenuCard({ item }: { item: MenuItemData }) {
  const tags = item.dietaryTags
    ? item.dietaryTags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const tagLabels: Record<string, { label: string; bg: string }> = {
    GF: { label: "GF", bg: "border-border-theme text-foreground/80" },
    DF: { label: "DF", bg: "border-border-theme text-foreground/80" },
    VG: { label: "VG", bg: "border-border-theme text-foreground/80" },
    V: { label: "V", bg: "border-border-theme text-foreground/80" },
    CHEF_FAVORITE: { label: "Hearth Signature", bg: "border-gold/60 text-gold bg-gold/5" },
  };

  return (
    <div className="group relative py-5 border-b border-border-theme/50 transition-colors duration-200 hover:bg-surface-raised/40 px-3 -mx-3">
      {/* Top Line: Dish Name, Dotted Leader, Price */}
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-center gap-2">
          <h4 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-foreground group-hover:text-gold transition-colors duration-200">
            {item.name}
          </h4>
          {item.isFeatured && (
            <span
              className="inline-flex items-center text-ember text-[11px]"
              title="Chef's Hearth Signature"
            >
              <Flame className="w-3.5 h-3.5 fill-ember/20" />
            </span>
          )}
        </div>

        {/* Traditional Printed Dotted Leader Line */}
        <div className="dotted-leader hidden sm:block" />

        {/* Right Aligned Price */}
        <div className="flex-shrink-0 font-mono text-base sm:text-lg font-bold text-gold">
          ${item.price.toFixed(0)}
        </div>
      </div>

      {/* Dish Description in Grotesk Sans */}
      <p className="mt-1.5 text-xs sm:text-sm text-muted-theme font-light leading-relaxed max-w-2xl">
        {item.description}
      </p>

      {/* Bottom Metadata: Dietary Tags and Sommelier Pairing */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        {/* Dietary Tag Badges */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {tags.map((tag) => {
              const meta = tagLabels[tag] || { label: tag, bg: "border-border-theme text-muted-theme" };
              return (
                <span
                  key={tag}
                  className={`text-[9px] uppercase tracking-wider font-mono px-2 py-0.5 border ${meta.bg}`}
                >
                  {meta.label}
                </span>
              );
            })}
          </div>
        )}

        {/* Sommelier Pairing */}
        {item.pairing && (
          <div className="text-[11px] text-gold/80 italic font-serif flex items-center gap-1.5 ml-auto">
            <Sparkles className="w-3 h-3 text-gold/60" />
            <span>Pairing: {item.pairing}</span>
          </div>
        )}
      </div>
    </div>
  );
}
