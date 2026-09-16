"use client";

import React, { useEffect } from "react";
import { useReservationModal } from "@/context/ReservationModalContext";
import { ReservationFlow } from "./ReservationFlow";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ReservationModal() {
  const { isOpen, closeModal, initialDate, initialPartySize } = useReservationModal();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative z-10 w-full max-w-3xl my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 text-muted-theme hover:text-foreground border border-border-theme bg-surface hover:border-gold transition-colors"
              aria-label="Close reservation modal"
            >
              <X className="w-5 h-5" />
            </button>

            <ReservationFlow
              initialDate={initialDate}
              initialPartySize={initialPartySize}
              isModal={true}
              onComplete={() => {
                // Keep open to show confirmation ticket
              }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
