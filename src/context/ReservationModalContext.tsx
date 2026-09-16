"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ReservationModalContextType {
  isOpen: boolean;
  openModal: (initialDate?: string, initialPartySize?: number) => void;
  closeModal: () => void;
  initialDate?: string;
  initialPartySize?: number;
}

const ReservationModalContext = createContext<ReservationModalContextType | undefined>(undefined);

export function ReservationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialDate, setInitialDate] = useState<string | undefined>(undefined);
  const [initialPartySize, setInitialPartySize] = useState<number | undefined>(undefined);

  const openModal = (date?: string, partySize?: number) => {
    setInitialDate(date);
    setInitialPartySize(partySize);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ReservationModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        initialDate,
        initialPartySize,
      }}
    >
      {children}
    </ReservationModalContext.Provider>
  );
}

export function useReservationModal() {
  const context = useContext(ReservationModalContext);
  if (!context) {
    throw new Error("useReservationModal must be used within a ReservationModalProvider");
  }
  return context;
}
