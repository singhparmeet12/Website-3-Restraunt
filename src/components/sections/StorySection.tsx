"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HandDrawnUnderline, EmberFlourish, OakLeafSprig } from "@/components/ui/HandDrawnAccents";
import { Flame, Compass, Wine, ArrowRight } from "lucide-react";
import Link from "next/link";

interface StoryPanelProps {
  chapter: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  quote?: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  accentIcon: React.ReactNode;
}

function StoryPanel({
  chapter,
  title,
  subtitle,
  paragraphs,
  quote,
  imageSrc,
  imageAlt,
  reversed = false,
  accentIcon,
}: StoryPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"],
  });

  // Parallax transform: image moves slower or opposite to create deep cinematic parallax
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  return (
    <div
      ref={panelRef}
      className="relative min-h-0 sm:min-h-[60vh] lg:min-h-[80vh] flex items-center py-8 sm:py-14 lg:py-20 overflow-hidden border-b border-border-theme/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
            reversed ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Parallax Image Container (7 cols) */}
          <div
            className={`lg:col-span-7 relative ${
              reversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative overflow-hidden aspect-[16/10] sm:aspect-[16/11] max-w-lg mx-auto sm:max-w-none border border-border-theme bg-surface shadow-2xl">
              <motion.div
                style={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: yParallax,
                        scale: scaleParallax,
                      }
                }
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700"
                  style={{ backgroundImage: `url('${imageSrc}')` }}
                  role="img"
                  aria-label={imageAlt}
                />
              </motion.div>

              {/* Edge Gradient Overlays for Moody Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 border border-gold/15 pointer-events-none" />

              {/* Discreet Caption Tag */}
              <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-gold border border-border-theme">
                {imageAlt}
              </div>
            </div>
          </div>

          {/* Text Content Block (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:col-span-5 flex flex-col ${
              reversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            {/* Chapter & Accent Motif */}
            <div className="flex items-center gap-2.5 mb-3 text-gold text-xs uppercase tracking-[0.3em] font-mono">
              <span>{accentIcon}</span>
              <span>{chapter}</span>
              <span className="text-border-theme">&bull;</span>
              <span className="text-muted-theme font-sans normal-case tracking-normal text-xs">
                {subtitle}
              </span>
            </div>

            {/* Chapter Title */}
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15] mb-4">
              {title}
            </h3>

            {/* Hand-Drawn Single-Stroke Underline */}
            <div className="mb-6">
              <HandDrawnUnderline className="text-ember w-32 h-2.5" />
            </div>

            {/* Body Copy */}
            <div className="space-y-4 text-sm sm:text-base text-muted-theme leading-relaxed font-light">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Pull Quote */}
            {quote && (
              <blockquote className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border-theme/60 pl-3 sm:pl-4 border-l-2 border-l-gold">
                <p className="font-serif italic text-sm sm:text-lg text-foreground/90 leading-snug">
                  &ldquo;{quote}&rdquo;
                </p>
              </blockquote>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function StorySection() {
  const panels: StoryPanelProps[] = [
    {
      chapter: "Chapter I",
      title: "The Primal Hearth",
      subtitle: "Elemental Fire Cooking",
      accentIcon: <Flame className="w-3.5 h-3.5 text-ember" />,
      imageSrc:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Missouri White Oak Hearth Kitchen",
      reversed: false,
      paragraphs: [
        "At Ember & Oak, cooking begins not with a knob or dial, but with hand-split logs of cured white oak, sugar maple, and hickory coals glowing at twelve-hundred degrees.",
        "We deliberate over every log, adjusting draft and airflow with hand-cranked iron pulleys. In an era dominated by sterile immersion circulators, we trust the living instinct of fire, smoke, and seasoned cast iron.",
      ],
      quote:
        "Fire is never passive. It breathes, demands vigilance, and rewards patience with caramelization no modern oven can mimic.",
    },
    {
      chapter: "Chapter II",
      title: "Sovereign Terroir",
      subtitle: "Regenerative Roots",
      accentIcon: <Compass className="w-3.5 h-3.5 text-gold" />,
      imageSrc:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Wild-Foraged Botanicals & Heritage Crops",
      reversed: true,
      paragraphs: [
        "Our pantry is shaped exclusively by farmers, foragers, and fishermen within a day's journey. We work with heritage livestock breeds, wild-harvested coastal mushrooms, and cold-water seafood pulled hours before service.",
        "Our menu changes with the micro-seasons — reflecting early spring morels, mid-summer heirloom peppers, and late autumn root vegetables caramelized deep in the embers.",
      ],
      quote:
        "We do not manipulate ingredients to fit an abstract concept. We listen to the harvest, apply the heat of oak, and let provenance speak.",
    },
    {
      chapter: "Chapter III",
      title: "The Living Cellar",
      subtitle: "Natural & Vintage Viticulture",
      accentIcon: <Wine className="w-3.5 h-3.5 text-ember-light" />,
      imageSrc:
        "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Underground Sommelier Vault & Reserve Vintages",
      reversed: false,
      paragraphs: [
        "Curated by Master Sommelier Elena Rostova, our subterranean cellar preserves over 750 references spanning biodynamic pioneers in the Jura, legendary Rhone syrahs, and rare allocations from coastal California estates.",
        "Whether you seek an unvarnished orange pet-nat or a legendary grand cru pour via Coravin, each bottle is selected to bridge the smoky richness of our hearth with vibrant, terroir-driven acidity.",
      ],
      quote:
        "Wine should share the exact same soil-stained honesty as the wood smoke curling from our chimney.",
    },
  ];

  return (
    <section id="story" className="relative bg-background text-foreground">
      {/* Section Header */}
      <div className="pt-12 sm:pt-20 pb-6 sm:pb-10 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
          <OakLeafSprig className="w-5 h-5 text-gold" />
          <span>The Philosophy</span>
          <OakLeafSprig className="w-5 h-5 text-gold rotate-180" />
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          A Return to Primal Gastronomy
        </h2>
        <div className="flex justify-center mt-2 mb-4">
          <HandDrawnUnderline className="text-ember w-40 h-3" />
        </div>
        <p className="text-xs sm:text-base text-muted-theme leading-relaxed font-light">
          An unhurried three-act culinary journey where ancient wood-fired techniques converge with
          contemporary culinary refinement.
        </p>
      </div>

      {/* Panels */}
      <div>
        {panels.map((panel, idx) => (
          <StoryPanel key={panel.chapter} {...panel} />
        ))}
      </div>

      {/* Transitional Lead to Menu */}
      <div className="py-16 text-center border-b border-border-theme/40 bg-surface-raised/30">
        <p className="font-serif italic text-xl text-foreground mb-4">
          Experience the alchemy tonight at our hearth.
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-gold hover:text-gold-light border-b border-gold/60 pb-1 hover:border-gold transition-all"
        >
          <span>Explore Tonight&apos;s Menu</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}
