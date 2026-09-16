"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useReservationModal } from "@/context/ReservationModalContext";
import { Menu as MenuIcon, X, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useReservationModal();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Nav links arranged in exact storytelling page order
  const navLinks = [
    { label: "Moments", href: "/#gallery" },
    { label: "Philosophy", href: "/#story" },
    { label: "Menu", href: "/#menu" },
    { label: "Custodians", href: "/#chef" },
    { label: "Press", href: "/#press" },
    { label: "Location", href: "/#location" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          isScrolled
            ? "bg-[#14100e]/95 backdrop-blur-md border-b border-[#362A23]/70 py-3 shadow-2xl text-[#F5EFEB]"
            : "bg-gradient-to-b from-black/85 via-black/45 to-transparent py-4 sm:py-5 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Wordmark - Sleek single line */}
          <Link
            href="/"
            className="group flex items-center gap-2 flex-shrink-0 focus:outline-none"
            aria-label="Ember & Oak Home"
          >
            <span className="w-2 h-2 rounded-full bg-ember shadow-[0_0_10px_#D97A3F] group-hover:scale-125 transition-transform duration-300" />
            <span className="font-serif tracking-[0.2em] text-lg sm:text-xl font-bold uppercase whitespace-nowrap text-white">
              Ember <span className="font-light text-gold italic">&amp;</span> Oak
            </span>
            <span className="hidden xl:inline text-[9px] uppercase tracking-[0.3em] text-gold/70 font-sans border-l border-border-theme/80 pl-2.5 ml-1">
              Bistro &bull; Hearth Kitchen
            </span>
          </Link>

          {/* Desktop Nav Links - Single Sleek Horizontal Line */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[11px] uppercase tracking-[0.22em] font-medium whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative py-1 text-white/85 hover:text-gold transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls - In One Line */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Reserve CTA in Gold Outline */}
            <button
              type="button"
              onClick={() => openModal()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] font-semibold border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-300 whitespace-nowrap shadow-[0_0_15px_rgba(201,169,98,0.15)] hover:shadow-[0_0_20px_rgba(201,169,98,0.35)]"
            >
              <Flame className="w-3.5 h-3.5 text-ember" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-1.5 sm:p-2 text-white/90 hover:text-white border border-border-theme/60"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#14100e]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 lg:hidden text-[#F5EFEB]"
          >
            <div className="flex flex-col gap-5 text-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-mono">Navigation</span>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-2xl tracking-wide hover:text-gold transition-colors py-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="pt-3 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    openModal();
                  }}
                  className="w-full max-w-xs py-3 text-xs uppercase tracking-[0.25em] font-semibold border border-gold bg-gold text-black transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Flame className="w-4 h-4 text-black" />
                  <span>Reserve a Table</span>
                </button>

                <Link
                  href="/admin/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="text-xs text-muted-theme hover:text-foreground tracking-widest uppercase mt-2"
                >
                  Staff Portal &rarr;
                </Link>
              </div>
            </div>

            <div className="text-center text-xs text-muted-theme border-t border-border-theme pt-4">
              <p className="font-serif text-sm text-[#F5EFEB] mb-0.5">Ember &amp; Oak Bistro</p>
              <p>412 Artisan Way &bull; Historic Arts District</p>
              <p className="mt-1 text-[11px] text-gold">Dinner Service: Wed - Sun from 5:00 PM</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
