import React from "react";
import Link from "next/link";
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#120E0C] text-[#C2B5A8] border-t border-[#362A23] pt-12 pb-28 lg:pb-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#29201A]">
          {/* Col 1: Wordmark & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <span className="w-2.5 h-2.5 rounded-full bg-ember shadow-[0_0_10px_#D97A3F]" />
              <span className="font-serif tracking-[0.2em] text-2xl font-bold uppercase text-[#F5EFEB]">
                Ember <span className="font-light text-gold italic">&amp;</span> Oak
              </span>
            </Link>
            <p className="text-xs text-[#AA9C92] max-w-sm leading-relaxed font-light">
              An elemental modern bistro in the Historic Arts District. Wood-fired gastronomy guided
              by white oak embers, sustainable terroir, and low-intervention viticulture.
            </p>
            <div className="text-[11px] font-mono text-gold pt-2">
              Foundry 412 &bull; 412 Artisan Way &bull; Concierge: +1 (555) 362-3762
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold block">
              Experience
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#gallery" className="hover:text-[#F5EFEB] transition-colors">
                  The Visual Archive (Moments)
                </Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-[#F5EFEB] transition-colors">
                  The Philosophy &amp; Fire
                </Link>
              </li>
              <li>
                <Link href="/#menu" className="hover:text-[#F5EFEB] transition-colors">
                  Dinner &amp; Degustation Menu
                </Link>
              </li>
              <li>
                <Link href="/#chef" className="hover:text-[#F5EFEB] transition-colors">
                  Custodians: Chef &amp; Sommelier
                </Link>
              </li>
              <li>
                <Link href="/#location" className="hover:text-[#F5EFEB] transition-colors">
                  Hours, Valet &amp; Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Gastronomy Accreditations & Admin */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-gold block">
              Accreditations &amp; Access
            </span>
            <p className="text-xs text-[#AA9C92] leading-relaxed">
              Proud selection in the Michelin Guide &bull; James Beard Nominee &bull; The World’s 50
              Best Discovery.
            </p>

            <div className="pt-3">
              <Link
                href="/admin/reservations"
                className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-light border border-gold/40 px-3 py-1.5 transition-colors font-mono uppercase tracking-wider"
              >
                <span>Staff Concierge Portal</span>
                &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#78695F]">
          <p>&copy; {new Date().getFullYear()} Ember &amp; Oak Bistro. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C2B5A8] transition-colors cursor-pointer">
              Privacy Notice
            </span>
            <span className="hover:text-[#C2B5A8] transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-[#C2B5A8] transition-colors cursor-pointer">
              Accessibility
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
