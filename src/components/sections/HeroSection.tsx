"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useReservationModal } from "@/context/ReservationModalContext";
import { ChevronDown, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";
import { HandDrawnUnderline, EmberFlourish } from "@/components/ui/HandDrawnAccents";

export function HeroSection() {
  const { openModal } = useReservationModal();
  const shouldReduceMotion = useReducedMotion();

  const headlineLines = ["Where Primal Fire", "Meets Modern Heritage"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Ken-Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#161210]">
        <div
          className={`absolute inset-0 bg-cover bg-center ${
            shouldReduceMotion ? "" : "animate-ken-burns"
          }`}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2400&q=85')`,
          }}
        />

        {/* Cinematic Multi-Layer Gradient Overlays for Deep Contrast & Mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161210] via-[#161210]/65 to-[#161210]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161210]/80 via-transparent to-[#161210]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#161210]/40 to-[#161210]" />

        {/* Ambient Warm Hearth Glow */}
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-ember/15 blur-[120px] pointer-events-none rounded-full" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-24 pb-16 flex flex-col items-center">
        {/* Editorial Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-gold/40 bg-black/40 backdrop-blur-md mb-8"
        >
          <EmberFlourish className="w-4 h-4 text-gold" />
          <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-medium">
            Wood-Fired Hearth &bull; Historic Arts District
          </span>
          <EmberFlourish className="w-4 h-4 text-gold" />
        </motion.div>

        {/* Staggered Line-by-Line Headline Reveal */}
        <div className="overflow-hidden mb-6">
          {headlineLines.map((line, idx) => (
            <div key={line} className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.4 + idx * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#F5EFEB] leading-[1.08]"
              >
                {line}
              </motion.h1>
            </div>
          ))}
        </div>

        {/* Hand-Drawn Single-Stroke Underline Accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          className="mb-8 origin-center"
        >
          <HandDrawnUnderline className="text-ember w-44 sm:w-64 h-3.5" />
        </motion.div>

        {/* Editorial Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-base sm:text-lg md:text-xl text-[#C2B5A8] max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          An elemental modern bistro celebrating the primal artistry of white oak hearth cooking,
          terroir-driven viticulture, and unhurried hospitality.
        </motion.p>

        {/* Primary Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={() => openModal()}
            className="w-full sm:w-auto px-9 py-4 bg-gold hover:bg-gold-light text-black font-semibold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 transition-all duration-300 border border-gold shadow-[0_0_25px_rgba(201,169,98,0.3)] hover:shadow-[0_0_35px_rgba(201,169,98,0.6)]"
          >
            <Flame className="w-4 h-4 text-ember" />
            <span>Reserve a Table</span>
          </button>

          <Link
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 border border-[#362A23] hover:border-gold/80 bg-black/40 backdrop-blur-md text-[#F5EFEB] hover:text-gold text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-2 transition-all duration-300 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle Bouncing Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#C2B5A8]/70 font-mono">
          Scroll to Discover
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold/80"
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
