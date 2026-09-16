"use client";

import React, { useState } from "react";
import { HandDrawnUnderline, EmberFlourish } from "@/components/ui/HandDrawnAccents";
import { MapPin, Clock, Phone, Mail, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";

export function LocationHours() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Subscription failed");
      }

      setStatusMessage({ type: "success", text: data.message });
      setEmail("");
    } catch (err: unknown) {
      setStatusMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Subscription error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceHours = [
    { service: "Dinner Dining Room", days: "Wednesday – Sunday", times: "5:00 PM – 10:30 PM" },
    { service: "Ember Hearth Counter", days: "Wednesday – Sunday", times: "5:30 PM & 8:15 PM Seatings" },
    { service: "The Cellar Lounge", days: "Wednesday – Sunday", times: "4:30 PM – Midnight" },
    { service: "Private Buyouts & Events", days: "Monday & Tuesday", times: "By Advance Arrangement" },
  ];

  return (
    <section id="location" className="py-12 sm:py-24 pb-28 sm:pb-24 bg-surface text-foreground relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-medium mb-2">
            <EmberFlourish className="w-4 h-4 text-gold" />
            <span>Finding Ember &amp; Oak</span>
            <EmberFlourish className="w-4 h-4 text-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Hours &amp; Location
          </h2>
          <div className="flex justify-center mt-2 mb-4">
            <HandDrawnUnderline className="text-ember w-36 h-2.5" />
          </div>
          <p className="text-xs sm:text-sm text-muted-theme font-light leading-relaxed">
            Nestled inside the repurposed 19th-century ironworks foundry in the Historic Arts District.
          </p>
        </div>

        {/* 2-Column Grid: Left (Hours & Address), Right (Styled Map & Newsletter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column (6 cols): Hours Table & Address Details */}
          <div className="lg:col-span-6 space-y-10">
            {/* Hours Table */}
            <div className="border border-border-theme bg-surface-raised p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-widest font-mono mb-6">
                <Clock className="w-4 h-4 text-ember" />
                <span>Service Schedule</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {serviceHours.map((h, i) => (
                  <div
                    key={i}
                    className="border-b border-border-theme/50 pb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1"
                  >
                    <div>
                      <span className="font-serif font-bold text-foreground block sm:inline">
                        {h.service}
                      </span>
                      <span className="text-muted-theme text-[11px] block sm:inline sm:ml-2">
                        ({h.days})
                      </span>
                    </div>
                    <span className="font-mono text-gold font-semibold text-right">
                      {h.times}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Direct Inquiries */}
            <div className="border border-border-theme bg-surface-raised p-6 sm:p-8">
              <div className="flex items-center gap-2.5 text-gold text-xs uppercase tracking-widest font-mono mb-4">
                <MapPin className="w-4 h-4 text-gold" />
                <span>Address &amp; Valet</span>
              </div>

              <p className="font-serif text-lg text-foreground font-semibold">
                412 Artisan Way &bull; Historic Arts District
              </p>
              <p className="text-xs sm:text-sm text-muted-theme mt-1 leading-relaxed">
                Complimentary curbside valet service begins at 4:30 PM nightly at our main portico.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border-theme">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-theme block mb-1">
                    Concierge &amp; Host
                  </span>
                  <a
                    href="tel:+15553623762"
                    className="font-mono text-sm text-foreground hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-ember" />
                    <span>+1 (555) 362-3762</span>
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-theme block mb-1">
                    Private Dining / Inquiries
                  </span>
                  <a
                    href="mailto:concierge@emberandoak.restaurant"
                    className="font-mono text-xs text-foreground hover:text-gold transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-gold" />
                    <span>concierge@emberandoak.restaurant</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Themed Interactive Map & Newsletter */}
          <div className="lg:col-span-6 space-y-8">
            {/* Themed Interactive Dark Map View */}
            <div className="border border-border-theme bg-[#120F0D] relative overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-xl">
              {/* Stylized Dark Grid / Vector Map */}
              <div className="absolute inset-0 bg-[#161210] p-6 flex flex-col justify-between">
                {/* Map Grid Lines */}
                <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#362A23_1px,transparent_1px),linear-gradient(to_bottom,#362A23_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]" />

                {/* River / Historic District Boundary Curve */}
                <svg
                  className="absolute inset-0 w-full h-full text-[#241A14] pointer-events-none"
                  viewBox="0 0 400 250"
                  fill="none"
                >
                  <path
                    d="M-20,180 C80,160 140,220 250,190 C340,160 410,210 430,220"
                    stroke="currentColor"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M180,-20 L180,270"
                    stroke="#2E231C"
                    strokeWidth="3"
                    strokeDasharray="4 4"
                  />
                  <path
                    d="M-20,90 L420,90"
                    stroke="#2E231C"
                    strokeWidth="3"
                  />
                </svg>

                {/* Restaurant Pin Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-ember/20 animate-ping absolute -inset-1" />
                    <div className="w-8 h-8 rounded-none border-2 border-gold bg-black flex items-center justify-center text-gold shadow-[0_0_15px_#D97A3F]">
                      <MapPin className="w-4 h-4 text-ember fill-ember/40" />
                    </div>
                  </div>
                  <div className="mt-2 bg-black/90 backdrop-blur-md border border-gold/40 px-3 py-1 text-center shadow-lg">
                    <span className="font-serif text-xs font-bold text-[#F5EFEB] block">
                      Ember &amp; Oak
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-gold block">
                      Foundry 412
                    </span>
                  </div>
                </div>

                {/* Map Street Label Overlay */}
                <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-mono tracking-widest text-muted-theme border border-border-theme">
                  Historic Arts District &bull; Sector 4
                </div>

                {/* Directions Button */}
                <div className="absolute bottom-4 right-4 z-10">
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-gold text-black text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 hover:bg-gold-light transition-colors"
                  >
                    <span>Open in Maps</span>
                    &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter: The Ember Cellar Dispatch */}
            <div className="border border-border-theme bg-surface-raised p-6 sm:p-8">
              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-mono mb-2">
                <EmberFlourish className="w-4 h-4 text-gold" />
                <span>The Cellar Dispatch</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Private Tastings &amp; Rare Vintages
              </h3>
              <p className="text-xs text-muted-theme mt-1.5 mb-5 leading-relaxed font-light">
                Receive confidential notifications regarding our seasonal menu debuts, guest winemaker
                hearth dinners, and exclusive reservations.
              </p>

              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="epicurean@sommelier.org"
                  className="flex-1 bg-surface border border-border-theme text-foreground px-4 py-2.5 text-xs focus:outline-none focus:border-gold font-mono"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 border border-gold"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Join Dispatch</span>
                      <Send className="w-3 h-3" />
                    </>
                  )}
                </button>
              </form>

              {statusMessage && (
                <div
                  className={`mt-3 text-xs p-2.5 flex items-center gap-2 ${
                    statusMessage.type === "success"
                      ? "text-emerald-400 bg-emerald-950/20 border border-emerald-500/30"
                      : "text-red-400 bg-red-950/20 border border-red-500/30"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
