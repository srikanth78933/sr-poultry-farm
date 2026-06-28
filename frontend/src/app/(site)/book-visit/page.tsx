"use client";
import { useEffect, useState } from "react";
import { CalendarCheck, CheckCircle2, Loader2, Clock } from "lucide-react";
import { api } from "@/lib/api";
import type { SlotAvailability, Booking } from "@/types";

const ALL_SLOTS = ["08:00-10:00", "10:00-12:00", "12:00-14:00", "16:00-18:00"];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookVisitPage() {
  const [form, setForm] = useState({
    customer_name: "",
    mobile: "",
    visit_date: todayStr(),
    time_slot: "",
    num_visitors: 1,
    purpose: "",
  });
  const [booked, setBooked] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    if (!form.visit_date) return;
    setLoadingSlots(true);
    api<SlotAvailability>(`/bookings/slots?visit_date=${form.visit_date}`)
      .then((d) => setBooked(d.booked_slots))
      .catch(() => setBooked([]))
      .finally(() => setLoadingSlots(false));
  }, [form.visit_date]);

  const update = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.time_slot) {
      setError("Please choose a time slot.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api<Booking>("/bookings", { method: "POST", json: form });
      setConfirmed(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <section className="container-x py-20">
        <div className="card mx-auto max-w-lg p-10 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-farm-green" />
          <h1 className="mt-4 font-display text-3xl font-bold text-farm-greenDark">Visit Requested!</h1>
          <p className="mt-2 text-stone-500">
            Thank you, {confirmed.customer_name}. Your visit request has been received.
          </p>
          <div className="mt-6 rounded-2xl bg-farm-green/5 p-5 text-left text-sm">
            <p><span className="font-semibold">Date:</span> {confirmed.visit_date}</p>
            <p><span className="font-semibold">Time:</span> {confirmed.time_slot}</p>
            <p><span className="font-semibold">Visitors:</span> {confirmed.num_visitors}</p>
            <p><span className="font-semibold">Status:</span> <span className="capitalize">{confirmed.status}</span></p>
          </div>
          <p className="mt-4 text-xs text-stone-400">
            Our team will confirm your visit shortly. Please carry your mobile number for reference.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center reveal">
          <span className="eyebrow">Plan Your Visit</span>
          <h1 className="section-title mt-2 text-4xl">Book a Farm Visit</h1>
          <p className="mx-auto mt-3 max-w-lg text-stone-500">
            Choose a date and an available slot. No payment now — you buy only after you visit and select.
          </p>
        </div>

        <form onSubmit={submit} className="card space-y-5 p-7 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Your Name</label>
              <input className="input" required value={form.customer_name}
                onChange={(e) => update("customer_name", e.target.value)} placeholder="Full name" />
            </div>
            <div>
              <label className="label">Mobile Number</label>
              <input className="input" required value={form.mobile} type="tel"
                onChange={(e) => update("mobile", e.target.value)} placeholder="10-digit mobile" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="label">Visit Date</label>
              <input className="input" type="date" required min={todayStr()} value={form.visit_date}
                onChange={(e) => { update("visit_date", e.target.value); update("time_slot", ""); }} />
            </div>
            <div>
              <label className="label">Number of Visitors</label>
              <input className="input" type="number" min={1} max={50} value={form.num_visitors}
                onChange={(e) => update("num_visitors", Number(e.target.value))} />
            </div>
          </div>

          <div>
            <label className="label flex items-center gap-2">
              <Clock className="h-4 w-4" /> Time Slot
              {loadingSlots && <Loader2 className="h-3.5 w-3.5 animate-spin text-farm-leaf" />}
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ALL_SLOTS.map((slot) => {
                const isBooked = booked.includes(slot);
                const selected = form.time_slot === slot;
                return (
                  <button
                    type="button"
                    key={slot}
                    disabled={isBooked}
                    onClick={() => update("time_slot", slot)}
                    className={`rounded-xl border-2 px-2 py-3 text-sm font-semibold transition ${
                      isBooked
                        ? "cursor-not-allowed border-stone-200 bg-stone-100 text-stone-400 line-through"
                        : selected
                        ? "border-farm-green bg-farm-green text-white"
                        : "border-stone-200 bg-white text-stone-700 hover:border-farm-green"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-stone-400">Booked slots are disabled to prevent double booking.</p>
          </div>

          <div>
            <label className="label">Purpose (optional)</label>
            <textarea className="input min-h-[90px]" value={form.purpose}
              onChange={(e) => update("purpose", e.target.value)}
              placeholder="e.g. Looking to buy 2 birds for a family function" />
          </div>

          {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
            {submitting ? "Booking..." : "Confirm Visit Request"}
          </button>
        </form>
      </div>
    </section>
  );
}
