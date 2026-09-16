"use client";

import React, { useState } from "react";
import { HandDrawnUnderline, EmberFlourish } from "@/components/ui/HandDrawnAccents";
import {
  Calendar,
  Clock,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Armchair,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

interface AdminReservation {
  id: string;
  reference: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  partySize: number;
  date: string;
  timeSlot: string;
  seatingArea: string;
  occasion?: string | null;
  dietaryNotes?: string | null;
  specialRequests?: string | null;
  status: string;
  table?: {
    id: string;
    tableNumber: number;
    name: string;
    area: string;
  } | null;
}

interface TableData {
  id: string;
  tableNumber: number;
  name: string;
  area: string;
  capacityMin: number;
  capacityMax: number;
}

export function AdminReservationsManager({
  initialReservations,
  tables,
}: {
  initialReservations: AdminReservation[];
  tables: TableData[];
}) {
  const [reservations, setReservations] = useState<AdminReservation[]>(initialReservations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = reservations.filter((r) => {
    if (statusFilter !== "ALL" && r.status !== statusFilter) return false;

    if (dateFilter === "TODAY" && r.date !== todayStr) return false;
    if (dateFilter === "TOMORROW" && r.date !== tomorrowStr) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = r.guestName.toLowerCase().includes(q);
      const matchRef = r.reference.toLowerCase().includes(q);
      const matchEmail = r.guestEmail.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchEmail) return false;
    }

    return true;
  });

  const totalConfirmed = reservations.filter((r) => r.status === "CONFIRMED").length;
  const totalSeated = reservations.filter((r) => r.status === "SEATED").length;
  const totalGuests = reservations
    .filter((r) => r.status === "CONFIRMED" || r.status === "SEATED")
    .reduce((acc, curr) => acc + curr.partySize, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-border-theme pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold text-xs uppercase font-mono tracking-widest mb-1.5">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Staff Concierge &bull; Live Service Console</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Reservations &amp; Floor Management
          </h1>
          <div className="mt-1">
            <HandDrawnUnderline className="text-ember w-32 h-2" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-border-theme hover:border-gold bg-surface text-xs uppercase tracking-wider font-mono flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Floor</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-surface border border-border-theme p-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-muted-theme block">
            Confirmed Bookings
          </span>
          <span className="font-mono text-2xl font-bold text-gold mt-1 block">
            {totalConfirmed}
          </span>
        </div>
        <div className="bg-surface border border-border-theme p-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-muted-theme block">
            Currently Seated
          </span>
          <span className="font-mono text-2xl font-bold text-emerald-400 mt-1 block">
            {totalSeated}
          </span>
        </div>
        <div className="bg-surface border border-border-theme p-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-muted-theme block">
            Total Expected Guests
          </span>
          <span className="font-mono text-2xl font-bold text-ember mt-1 block">
            {totalGuests}
          </span>
        </div>
        <div className="bg-surface border border-border-theme p-4">
          <span className="text-[10px] uppercase font-mono tracking-widest text-muted-theme block">
            Configured Tables
          </span>
          <span className="font-mono text-2xl font-bold text-foreground mt-1 block">
            {tables.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border-theme p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-theme absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, reference code, email..."
            className="w-full bg-surface-raised border border-border-theme text-foreground pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Date Filter */}
          <div className="flex items-center border border-border-theme bg-surface-raised p-0.5 text-xs font-mono">
            <button
              onClick={() => setDateFilter("ALL")}
              className={`px-3 py-1 text-[11px] ${
                dateFilter === "ALL" ? "bg-gold text-black font-bold" : "text-muted-theme hover:text-foreground"
              }`}
            >
              All Dates
            </button>
            <button
              onClick={() => setDateFilter("TODAY")}
              className={`px-3 py-1 text-[11px] ${
                dateFilter === "TODAY" ? "bg-gold text-black font-bold" : "text-muted-theme hover:text-foreground"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setDateFilter("TOMORROW")}
              className={`px-3 py-1 text-[11px] ${
                dateFilter === "TOMORROW" ? "bg-gold text-black font-bold" : "text-muted-theme hover:text-foreground"
              }`}
            >
              Tomorrow
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex items-center border border-border-theme bg-surface-raised p-0.5 text-xs font-mono">
            {["ALL", "CONFIRMED", "SEATED", "CANCELLED"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-2.5 py-1 text-[11px] ${
                  statusFilter === s
                    ? "bg-ember text-white font-bold"
                    : "text-muted-theme hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="border border-border-theme bg-surface overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border-theme bg-surface-raised/80 font-mono uppercase tracking-wider text-[10px] text-muted-theme">
              <th className="p-3.5">Reference</th>
              <th className="p-3.5">Guest &amp; Contact</th>
              <th className="p-3.5">Date &amp; Time</th>
              <th className="p-3.5">Party</th>
              <th className="p-3.5">Table &amp; Area</th>
              <th className="p-3.5">Special Notes</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Floor Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-theme/40 font-light">
            {filtered.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-surface-raised/50 transition-colors duration-150"
              >
                {/* Reference Code */}
                <td className="p-3.5 font-mono font-bold text-gold whitespace-nowrap">
                  {r.reference}
                </td>

                {/* Guest Info */}
                <td className="p-3.5">
                  <span className="font-serif font-bold text-foreground block text-sm">
                    {r.guestName}
                  </span>
                  <span className="text-[11px] text-muted-theme font-mono block">
                    {r.guestEmail}
                  </span>
                  <span className="text-[11px] text-muted-theme font-mono block">
                    {r.guestPhone}
                  </span>
                </td>

                {/* Date & Time */}
                <td className="p-3.5 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-mono font-semibold text-foreground">
                    <Clock className="w-3 h-3 text-ember" />
                    <span>{r.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-theme font-mono text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{r.date}</span>
                  </div>
                </td>

                {/* Party Size */}
                <td className="p-3.5 whitespace-nowrap">
                  <span className="font-mono font-bold text-foreground">
                    {r.partySize} {r.partySize === 1 ? "Guest" : "Guests"}
                  </span>
                  {r.occasion && (
                    <span className="block text-[10px] text-gold font-sans font-medium">
                      &bull; {r.occasion}
                    </span>
                  )}
                </td>

                {/* Table & Seating Area */}
                <td className="p-3.5">
                  <span className="font-serif font-semibold text-foreground block">
                    {r.table ? r.table.name : "Unassigned"}
                  </span>
                  <span className="text-[10px] uppercase font-mono text-muted-theme block">
                    {r.seatingArea}
                  </span>
                </td>

                {/* Dietary & Notes */}
                <td className="p-3.5 max-w-xs">
                  {r.dietaryNotes && (
                    <span className="text-[11px] text-ember block font-medium">
                      Allergy: {r.dietaryNotes}
                    </span>
                  )}
                  {r.specialRequests ? (
                    <span className="text-[11px] text-muted-theme block italic">
                      &ldquo;{r.specialRequests}&rdquo;
                    </span>
                  ) : (
                    <span className="text-muted-theme/40 text-[11px]">&mdash;</span>
                  )}
                </td>

                {/* Status Badge */}
                <td className="p-3.5 whitespace-nowrap">
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] uppercase font-mono font-bold border ${
                      r.status === "CONFIRMED"
                        ? "bg-gold/10 text-gold border-gold/40"
                        : r.status === "SEATED"
                        ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/40"
                        : "bg-red-950/20 text-red-400 border-red-500/30"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* Quick Actions */}
                <td className="p-3.5 text-right whitespace-nowrap">
                  <div className="inline-flex items-center gap-1.5">
                    {r.status === "CONFIRMED" && (
                      <button
                        type="button"
                        disabled={updatingId === r.id}
                        onClick={() => handleStatusUpdate(r.id, "SEATED")}
                        className="px-2.5 py-1 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-900/40 border border-emerald-500/40 text-[10px] uppercase font-mono flex items-center gap-1"
                        title="Mark table as seated"
                      >
                        <Armchair className="w-3 h-3" />
                        <span>Seat</span>
                      </button>
                    )}

                    {r.status !== "CANCELLED" && (
                      <button
                        type="button"
                        disabled={updatingId === r.id}
                        onClick={() => handleStatusUpdate(r.id, "CANCELLED")}
                        className="px-2.5 py-1 bg-red-950/30 text-red-400 hover:bg-red-900/40 border border-red-500/40 text-[10px] uppercase font-mono flex items-center gap-1"
                        title="Cancel reservation"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    )}

                    {r.status === "CANCELLED" && (
                      <button
                        type="button"
                        disabled={updatingId === r.id}
                        onClick={() => handleStatusUpdate(r.id, "CONFIRMED")}
                        className="px-2.5 py-1 bg-gold/10 text-gold hover:bg-gold/20 border border-gold/40 text-[10px] uppercase font-mono flex items-center gap-1"
                        title="Reactivate booking"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Reinstate</span>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="p-12 text-center text-muted-theme font-serif italic">
                  No reservations found matching the selected filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
