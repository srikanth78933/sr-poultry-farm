"use client";
import { useEffect, useState } from "react";
import { Check, X, Phone, Users, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { Booking, BookingStatus } from "@/types";
import StatusBadge from "@/components/StatusBadge";

const FILTERS: (BookingStatus | "all")[] = ["all", "pending", "approved", "rejected", "completed"];

export default function BookingsPage() {
  const [items, setItems]   = useState<Booking[]>([]);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [error, setError]   = useState("");
  const [busy, setBusy]     = useState<number | null>(null);

  function load() {
    const q = filter === "all" ? "" : `?status=${filter}`;
    api<Booking[]>(`/bookings${q}`, { auth: true })
      .then(setItems)
      .catch((e) => setError(e.message));
  }
  useEffect(load, [filter]);

  async function setStatus(id: number, status: BookingStatus) {
    setBusy(id);
    setError("");
    try {
      await api(`/bookings/${id}`, { method: "PATCH", json: { status }, auth: true });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="eyebrow">Admin</p>
        <h1 className="font-serif text-3xl text-forest font-medium mt-1">Farm Visit Bookings</h1>
        <p className="text-sm text-forest/60 mt-1">Approve or reject visit requests.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest transition border ${
              filter === f
                ? "border-forest bg-forest text-cream"
                : "border-forest/20 text-forest/70 hover:border-forest/40 hover:text-forest"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto card">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-forest/10 bg-kraft/30">
            <tr>
              {["Visitor", "Date", "Slot", "Visitors", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-forest/60">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-forest/5">
            {items.map((b) => (
              <tr key={b.id} className="hover:bg-kraft/20 transition-colors">
                <td className="px-5 py-3">
                  <p className="font-medium text-forest">{b.customer_name}</p>
                  <p className="flex items-center gap-1 text-xs text-forest/50 mt-0.5">
                    <Phone className="h-3 w-3" /> {b.mobile}
                  </p>
                  {b.purpose && (
                    <p className="mt-1 max-w-xs text-xs text-forest/40">{b.purpose}</p>
                  )}
                </td>
                <td className="px-5 py-3 text-forest/80">{b.visit_date}</td>
                <td className="px-5 py-3 text-forest/80">{b.time_slot}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 text-forest/80">
                    <Users className="h-4 w-4" />{b.num_visitors}
                  </span>
                </td>
                <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStatus(b.id, "approved")}
                      disabled={busy === b.id}
                      title="Approve"
                      className="grid h-8 w-8 place-items-center rounded-sm border border-forest/30
                                 bg-forest/5 text-forest hover:bg-forest hover:text-cream
                                 disabled:opacity-40 transition"
                    >
                      {busy === b.id
                        ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        : <Check className="h-4 w-4" />
                      }
                    </button>
                    <button
                      onClick={() => setStatus(b.id, "rejected")}
                      disabled={busy === b.id}
                      title="Reject"
                      className="grid h-8 w-8 place-items-center rounded-sm border border-red-200
                                 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white
                                 disabled:opacity-40 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setStatus(b.id, "completed")}
                      disabled={busy === b.id}
                      title="Mark completed"
                      className="rounded-sm border border-forest/20 bg-kraft/40 px-2 text-xs
                                 font-semibold uppercase tracking-wide text-forest/70
                                 hover:bg-forest hover:text-cream disabled:opacity-40 transition"
                    >
                      Done
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center text-sm uppercase tracking-widest text-forest/30">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
