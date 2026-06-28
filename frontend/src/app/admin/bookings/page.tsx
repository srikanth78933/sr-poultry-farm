"use client";
import { useEffect, useState } from "react";
import { Check, X, Phone, Users } from "lucide-react";
import { api } from "@/lib/api";
import type { Booking, BookingStatus } from "@/types";
import StatusBadge from "@/components/StatusBadge";

const FILTERS: (BookingStatus | "all")[] = ["all", "pending", "approved", "rejected", "completed"];

export default function BookingsPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  function load() {
    const q = filter === "all" ? "" : `?status=${filter}`;
    api<Booking[]>(`/bookings${q}`, { auth: true }).then(setItems).catch(() => setItems([]));
  }
  useEffect(load, [filter]);

  async function setStatus(id: number, status: BookingStatus) {
    await api(`/bookings/${id}`, { method: "PATCH", json: { status }, auth: true }).catch(() => {});
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-farm-greenDark">Farm Visit Bookings</h1>
      <p className="text-stone-500">Approve or reject visit requests.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`chip capitalize ${filter === f ? "bg-farm-green text-white" : "bg-white text-stone-600"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-farm-green/5 text-stone-500">
            <tr>
              <th className="px-5 py-3 font-semibold">Visitor</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Slot</th>
              <th className="px-5 py-3 font-semibold">Visitors</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {items.map((b) => (
              <tr key={b.id} className="hover:bg-stone-50">
                <td className="px-5 py-3">
                  <p className="font-semibold text-stone-800">{b.customer_name}</p>
                  <p className="flex items-center gap-1 text-xs text-stone-400"><Phone className="h-3 w-3" /> {b.mobile}</p>
                  {b.purpose && <p className="mt-1 max-w-xs text-xs text-stone-400">{b.purpose}</p>}
                </td>
                <td className="px-5 py-3 text-stone-600">{b.visit_date}</td>
                <td className="px-5 py-3 text-stone-600">{b.time_slot}</td>
                <td className="px-5 py-3"><span className="inline-flex items-center gap-1 text-stone-600"><Users className="h-4 w-4" />{b.num_visitors}</span></td>
                <td className="px-5 py-3"><StatusBadge status={b.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setStatus(b.id, "approved")} title="Approve"
                      className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200"><Check className="h-4 w-4" /></button>
                    <button onClick={() => setStatus(b.id, "rejected")} title="Reject"
                      className="grid h-8 w-8 place-items-center rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200"><X className="h-4 w-4" /></button>
                    <button onClick={() => setStatus(b.id, "completed")} title="Mark completed"
                      className="rounded-lg bg-sky-100 px-2 text-xs font-semibold text-sky-700 hover:bg-sky-200">Done</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-stone-400">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
