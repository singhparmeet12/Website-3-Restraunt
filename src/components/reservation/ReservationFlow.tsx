"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Utensils,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Download,
  Mail,
  AlertCircle,
  Loader2,
  Flame,
  Wine,
  Trees,
} from "lucide-react";
import { HandDrawnUnderline, EmberFlourish } from "@/components/ui/HandDrawnAccents";

interface TimeSlotAvailability {
  timeSlot: string;
  status: "available" | "limited" | "sold_out";
  remainingCount: number;
  areasAvailable: string[];
}

interface ReservationConfirmation {
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion?: string | null;
  specialRequests?: string | null;
  table?: {
    name: string;
    area: string;
  };
}

interface ReservationFlowProps {
  initialDate?: string;
  initialPartySize?: number;
  onComplete?: (ref: string) => void;
  isModal?: boolean;
}

export function ReservationFlow({
  initialDate,
  initialPartySize = 2,
  onComplete,
  isModal = false,
}: ReservationFlowProps) {
  // Format today's date YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [partySize, setPartySize] = useState<number>(initialPartySize);
  const [date, setDate] = useState<string>(initialDate || getTodayString());
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [seatingArea, setSeatingArea] = useState<string>("MAIN_DINING");
  const [occasion, setOccasion] = useState<string>("");
  const [dietaryNotes, setDietaryNotes] = useState<string>("");
  const [specialRequests, setSpecialRequests] = useState<string>("");

  // Guest Contact Form
  const [guestName, setGuestName] = useState<string>("");
  const [guestEmail, setGuestEmail] = useState<string>("");
  const [guestPhone, setGuestPhone] = useState<string>("");

  // Live Availability State
  const [availability, setAvailability] = useState<TimeSlotAvailability[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState<boolean>(false);
  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationConfirmation | null>(null);
  const [emailPreviewHtml, setEmailPreviewHtml] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);

  // Fetch live availability whenever date or partySize changes
  useEffect(() => {
    if (!date) return;
    let isCancelled = false;

    async function fetchAvailability() {
      setIsLoadingAvailability(true);
      setAvailabilityError(null);
      try {
        const res = await fetch(`/api/reservations/availability?date=${date}&partySize=${partySize}`);
        if (!res.ok) {
          throw new Error("Unable to load table schedule");
        }
        const data = await res.json();
        if (!isCancelled) {
          setAvailability(data.slots || []);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setAvailabilityError(err instanceof Error ? err.message : "Error checking availability");
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingAvailability(false);
        }
      }
    }

    fetchAvailability();
    return () => {
      isCancelled = true;
    };
  }, [date, partySize]);

  // Quick date presets
  const setQuickDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    setDate(d.toISOString().split("T")[0]);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        guestName,
        guestEmail,
        guestPhone,
        partySize,
        date,
        timeSlot,
        seatingArea,
        occasion: occasion || null,
        dietaryNotes: dietaryNotes || null,
        specialRequests: specialRequests || null,
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to confirm reservation");
      }

      setConfirmedReservation(data.reservation);
      if (data.emailNotification?.previewHtml) {
        setEmailPreviewHtml(data.emailNotification.previewHtml);
      }

      setStep(4);
      if (onComplete) onComplete(data.reservation.reference);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#D97A3F", "#C9A962", "#F5EFEB"],
        });
      } catch {
        // ignore confetti errors on headless
      }
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Booking submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate .ics calendar download
  const downloadCalendarFile = () => {
    if (!confirmedReservation) return;
    const { reference, date, timeSlot, partySize, seatingArea } = confirmedReservation;
    const [hours, minutes] = timeSlot.split(":").map(Number);
    const start = new Date(date);
    start.setHours(hours, minutes, 0);

    const end = new Date(start);
    end.setHours(start.getHours() + 2); // 2-hour dining block

    const formatICSDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ember and Oak//Restaurant Reservation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:Dinner at Ember & Oak [${reference}]`,
      `DESCRIPTION:Table reserved for ${partySize} guests. Seating: ${seatingArea}. Reference: ${reference}. Concierge: +1 (555) 362-3762`,
      "LOCATION:Ember & Oak, 412 Artisan Way, Historic Arts District",
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `UID:${reference}@emberandoak.restaurant`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `EmberAndOak-${reference}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const seatingAreas = [
    {
      id: "MAIN_DINING",
      name: "Main Dining Room",
      desc: "Intimate dark oak tables & ambient candlelight",
      icon: Utensils,
    },
    {
      id: "HEARTH_COUNTER",
      name: "Ember Hearth Counter",
      desc: "Front-row seats facing the wood fire & rotisserie",
      icon: Flame,
    },
    {
      id: "WINE_VAULT",
      name: "The Sommelier Vault",
      desc: "Quiet cellar alcove, sommelier pairing access",
      icon: Wine,
    },
    {
      id: "TERRACE",
      name: "Heated Garden Terrace",
      desc: "Covered veranda with stone fireplace",
      icon: Trees,
    },
  ];

  const occasionsList = [
    "Date Night",
    "Anniversary",
    "Birthday",
    "Business Dinner",
    "Culinary Tasting",
    "Casual Dining",
  ];

  return (
    <div className={`w-full max-w-3xl mx-auto bg-surface border border-border-theme p-6 sm:p-10 shadow-2xl ${isModal ? "" : "my-8"}`}>
      {/* Header / Steps Indicator */}
      <div className="mb-8 border-b border-border-theme/60 pb-6 text-center relative">
        <div className="flex items-center justify-center gap-2 text-gold text-xs uppercase tracking-[0.25em] mb-2 font-medium">
          <EmberFlourish className="w-4 h-4 text-gold" />
          <span>Table Reservation</span>
          <EmberFlourish className="w-4 h-4 text-gold" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          {step === 1 && "Select Party & Date"}
          {step === 2 && "Choose Time & Seating"}
          {step === 3 && "Guest Details"}
          {step === 4 && "Reservation Confirmed"}
        </h2>
        <div className="flex justify-center mt-1">
          <HandDrawnUnderline className="text-ember/70 w-28 h-2" />
        </div>

        {/* Step Progress Bar */}
        {step < 4 && (
          <div className="flex items-center justify-center gap-3 mt-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <span
                  className={`w-7 h-7 text-xs flex items-center justify-center font-mono font-semibold transition-colors duration-200 ${
                    step === s
                      ? "bg-gold text-black border border-gold"
                      : step > s
                      ? "bg-ember text-white border border-ember"
                      : "border border-border-theme text-muted-theme"
                  }`}
                >
                  {s}
                </span>
                {s < 3 && <span className="w-8 h-px bg-border-theme" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 1: PARTY SIZE & DATE */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="space-y-8"
        >
          {/* Party Size Selector */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-theme mb-3 font-semibold flex items-center gap-2">
              <Users className="w-4 h-4 text-ember" />
              <span>Party Size</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPartySize(num)}
                  className={`py-3 text-sm font-mono font-bold transition-all border ${
                    partySize === num
                      ? "bg-gold text-black border-gold shadow-[0_0_12px_rgba(201,169,98,0.3)]"
                      : "bg-surface-raised border-border-theme text-foreground hover:border-ember"
                  }`}
                >
                  {num} {num === 1 ? "Guest" : "Guests"}
                </button>
              ))}
            </div>
            {partySize > 6 && (
              <p className="text-[11px] text-gold/90 mt-2 italic">
                * Note: Parties of 7-8 will be seated in our Grand Oak Round Table or Private Vault.
              </p>
            )}
          </div>

          {/* Date Picker & Quick Shortcuts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-theme font-semibold flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-ember" />
                <span>Dining Date</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className="text-[11px] text-foreground/80 hover:text-ember border-b border-dashed border-border-theme pb-0.5 font-sans"
                >
                  Tonight
                </button>
                <span className="text-border-theme">&bull;</span>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="text-[11px] text-foreground/80 hover:text-ember border-b border-dashed border-border-theme pb-0.5 font-sans"
                >
                  Tomorrow
                </button>
                <span className="text-border-theme">&bull;</span>
                <button
                  type="button"
                  onClick={() => setQuickDate(3)}
                  className="text-[11px] text-foreground/80 hover:text-ember border-b border-dashed border-border-theme pb-0.5 font-sans"
                >
                  In 3 Days
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                type="date"
                min={getTodayString()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-3.5 focus:outline-none focus:border-gold font-mono text-sm tracking-wider"
              />
            </div>
            <p className="text-[11px] text-muted-theme mt-2">
              Reservations are released 60 days in advance. Dinner service Wednesday through Sunday.
            </p>
          </div>

          {/* Next Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors duration-200 border border-gold"
            >
              <span>View Available Times</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: TIME SLOT & SEATING AREA */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          className="space-y-8"
        >
          {/* Reservation Criteria Summary */}
          <div className="bg-surface-raised p-4 border border-border-theme flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-muted-theme uppercase tracking-wider block text-[10px]">Party</span>
                <span className="font-mono font-bold text-foreground">{partySize} Guests</span>
              </div>
              <span className="text-border-theme">|</span>
              <div>
                <span className="text-muted-theme uppercase tracking-wider block text-[10px]">Date</span>
                <span className="font-mono font-bold text-foreground">{date}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-ember hover:underline uppercase text-[10px] tracking-widest"
            >
              Change
            </button>
          </div>

          {/* Time Slot Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs uppercase tracking-[0.2em] text-muted-theme font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-ember" />
                <span>Available Service Times</span>
              </label>
              {isLoadingAvailability && (
                <div className="flex items-center gap-1.5 text-xs text-gold">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Checking database...</span>
                </div>
              )}
            </div>

            {availabilityError && (
              <div className="bg-red-950/20 border border-red-500/40 text-red-300 text-xs p-3 mb-4 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{availabilityError}</span>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {availability.map((slot) => {
                const isSelected = timeSlot === slot.timeSlot;
                const isSoldOut = slot.status === "sold_out";

                return (
                  <button
                    key={slot.timeSlot}
                    type="button"
                    disabled={isSoldOut}
                    onClick={() => setTimeSlot(slot.timeSlot)}
                    className={`py-3 px-2 border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(201,169,98,0.35)]"
                        : isSoldOut
                        ? "opacity-35 bg-surface-raised/40 border-border-theme/40 cursor-not-allowed line-through text-muted-theme"
                        : "bg-surface-raised border-border-theme hover:border-gold text-foreground"
                    }`}
                  >
                    <span className="font-mono font-bold text-sm">{slot.timeSlot}</span>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-sans ${
                        isSelected
                          ? "text-black/80 font-bold"
                          : slot.status === "limited"
                          ? "text-ember font-semibold"
                          : "text-muted-theme"
                      }`}
                    >
                      {slot.status === "available"
                        ? "Available"
                        : slot.status === "limited"
                        ? "1 Table Left"
                        : "Sold Out"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seating Area Preference */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-muted-theme mb-3 font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>Dining Atmosphere Preference</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {seatingAreas.map((area) => {
                const Icon = area.icon;
                const isSelected = seatingArea === area.id;

                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setSeatingArea(area.id)}
                    className={`p-4 text-left border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "border-gold bg-surface-raised shadow-[0_0_12px_rgba(201,169,98,0.2)]"
                        : "border-border-theme bg-surface-raised/60 hover:border-border-theme/80"
                    }`}
                  >
                    <div
                      className={`p-2 border rounded-none ${
                        isSelected ? "border-gold text-gold bg-gold/10" : "border-border-theme text-muted-theme"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span
                        className={`font-serif text-sm font-semibold block ${
                          isSelected ? "text-gold" : "text-foreground"
                        }`}
                      >
                        {area.name}
                      </span>
                      <span className="text-[11px] text-muted-theme leading-relaxed block mt-0.5">
                        {area.desc}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="pt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-border-theme text-foreground hover:text-ember text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              type="button"
              disabled={!timeSlot}
              onClick={() => setStep(3)}
              className={`px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold flex items-center gap-2 transition-all border ${
                timeSlot
                  ? "bg-gold hover:bg-gold-light text-black border-gold"
                  : "bg-surface-raised/50 border-border-theme text-muted-theme cursor-not-allowed opacity-60"
              }`}
            >
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: GUEST DETAILS & FORM */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
        >
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {submitError && (
              <div className="bg-red-950/20 border border-red-500/40 text-red-300 text-xs p-3.5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Booking Summary Header */}
            <div className="bg-surface-raised p-4 border border-border-theme text-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <span className="font-mono font-bold text-foreground">
                  {date} &bull; {timeSlot}
                </span>
                <span className="text-border-theme">|</span>
                <span className="font-mono font-bold text-foreground">{partySize} Guests</span>
                <span className="text-border-theme">|</span>
                <span className="text-gold font-medium">
                  {seatingAreas.find((a) => a.id === seatingArea)?.name || seatingArea}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-ember hover:underline uppercase text-[10px] tracking-widest"
              >
                Change Time
              </button>
            </div>

            {/* Contact Information Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-1.5 font-semibold">
                  Full Name <span className="text-ember">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Lord / Lady / Dr. / Full Name"
                  className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-3 focus:outline-none focus:border-gold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-1.5 font-semibold">
                  Email Address <span className="text-ember">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  placeholder="concierge@example.com"
                  className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-3 focus:outline-none focus:border-gold text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-1.5 font-semibold">
                  Mobile Phone <span className="text-ember">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-3 focus:outline-none focus:border-gold text-sm font-mono"
                />
              </div>
            </div>

            {/* Occasion Selector */}
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-2 font-semibold">
                Special Occasion (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {occasionsList.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occasion === occ ? "" : occ)}
                    className={`px-3 py-1.5 text-xs border transition-colors ${
                      occasion === occ
                        ? "bg-gold text-black border-gold font-semibold"
                        : "bg-surface-raised border-border-theme text-muted-theme hover:text-foreground"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary & Special Requests */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-1.5 font-semibold">
                  Dietary Restrictions / Allergies (Optional)
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g. Gluten-free, Shellfish allergy, Vegetarian guest"
                  className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-2.5 focus:outline-none focus:border-gold text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-muted-theme mb-1.5 font-semibold">
                  Notes for the Host / Sommelier (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Special seating arrangement, champagne on arrival, etc."
                  className="w-full bg-surface-raised border border-border-theme text-foreground px-4 py-2.5 focus:outline-none focus:border-gold text-xs resize-none"
                />
              </div>
            </div>

            {/* Terms and Cancellation Notice */}
            <p className="text-[11px] text-muted-theme/80 leading-relaxed border-t border-border-theme/60 pt-4">
              By confirming, you agree to our 24-hour cancellation policy. We hold tables for up to 15
              minutes past reservation time. Confirmation email will be dispatched immediately.
            </p>

            {/* Form Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 border border-border-theme text-foreground hover:text-ember text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gold hover:bg-gold-light text-black font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors border border-gold shadow-[0_0_15px_rgba(201,169,98,0.25)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Allocating Table...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Reservation</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* STEP 4: CONFIRMATION & TICKET */}
      {step === 4 && confirmedReservation && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 text-center"
        >
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto border border-gold bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_20px_rgba(201,169,98,0.25)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold font-mono block mb-1">
              Table Reserved &bull; Confirmed
            </span>
            <h3 className="font-serif text-3xl font-bold text-foreground">
              We Await Your Arrival, {confirmedReservation.guestName}
            </h3>
            <p className="text-xs text-muted-theme mt-2 max-w-md mx-auto">
              A formal confirmation has been dispatched to{" "}
              <strong className="text-foreground font-mono">{confirmedReservation.guestEmail}</strong>.
            </p>
          </div>

          {/* Ticket Card */}
          <div className="bg-surface-raised border border-gold/40 p-6 text-left relative overflow-hidden shadow-xl max-w-md mx-auto">
            <div className="absolute top-0 right-0 bg-gold text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1">
              Confirmed
            </div>

            <div className="border-b border-border-theme pb-4 mb-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-theme block">
                Booking Reference
              </span>
              <span className="font-mono text-2xl font-extrabold text-gold tracking-widest">
                {confirmedReservation.reference}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs mb-4">
              <div>
                <span className="text-muted-theme block text-[10px] uppercase tracking-wider">Date</span>
                <span className="font-mono font-bold text-foreground">{confirmedReservation.date}</span>
              </div>
              <div>
                <span className="text-muted-theme block text-[10px] uppercase tracking-wider">Time</span>
                <span className="font-mono font-bold text-foreground">{confirmedReservation.timeSlot}</span>
              </div>
              <div>
                <span className="text-muted-theme block text-[10px] uppercase tracking-wider">Party</span>
                <span className="font-mono font-bold text-foreground">
                  {confirmedReservation.partySize} {confirmedReservation.partySize === 1 ? "Guest" : "Guests"}
                </span>
              </div>
              <div>
                <span className="text-muted-theme block text-[10px] uppercase tracking-wider">Area</span>
                <span className="font-serif font-semibold text-foreground">
                  {seatingAreas.find((a) => a.id === confirmedReservation.seatingArea)?.name ||
                    confirmedReservation.seatingArea}
                </span>
              </div>
            </div>

            {confirmedReservation.table && (
              <div className="bg-surface p-2.5 border border-border-theme text-[11px] text-muted-theme">
                Allocated Station:{" "}
                <span className="text-gold font-mono font-semibold">
                  {confirmedReservation.table.name}
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={downloadCalendarFile}
              className="px-5 py-2.5 border border-border-theme hover:border-gold bg-surface text-foreground hover:text-gold text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors font-medium"
            >
              <Download className="w-3.5 h-3.5 text-gold" />
              <span>Add to Calendar (.ics)</span>
            </button>

            {emailPreviewHtml && (
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="px-5 py-2.5 border border-ember/60 hover:border-ember bg-surface text-foreground hover:text-ember text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-ember" />
                <span>View Email Receipt</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setTimeSlot("");
                setConfirmedReservation(null);
              }}
              className="px-5 py-2.5 border border-border-theme hover:border-foreground text-muted-theme hover:text-foreground text-xs uppercase tracking-[0.2em] transition-colors"
            >
              Book Another Table
            </button>
          </div>

          {/* Direct Link to Staff View for Live Demo */}
          <div className="pt-4 border-t border-border-theme/60">
            <p className="text-[11px] text-muted-theme">
              Simulating staff operations?{" "}
              <a
                href="/admin/reservations"
                className="text-gold underline hover:text-gold-light font-medium"
              >
                View live bookings in Staff Concierge Dashboard &rarr;
              </a>
            </p>
          </div>
        </motion.div>
      )}

      {/* Simulated Email Preview Modal */}
      <AnimatePresence>
        {showEmailModal && emailPreviewHtml && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-border-theme p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-border-theme pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-ember" />
                  <span className="font-serif text-sm font-semibold">
                    Guest Confirmation Dispatch (HTML Preview)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="text-xs uppercase tracking-widest text-muted-theme hover:text-foreground border border-border-theme px-2 py-1"
                >
                  Close
                </button>
              </div>

              <div
                className="prose max-w-none text-foreground text-sm"
                dangerouslySetInnerHTML={{ __html: emailPreviewHtml }}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
