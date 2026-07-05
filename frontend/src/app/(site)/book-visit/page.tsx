"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import type { SlotAvailability, Booking } from "@/types";

const TIME_SLOTS = ["06:00-08:00", "08:00-10:00", "10:00-12:00", "14:00-16:00", "16:00-18:00"];

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function BookVisitPage() {
  const [name, setName]         = useState("");
  const [mobile, setMobile]     = useState("");
  const [date, setDate]         = useState("");
  const [slot, setSlot]         = useState<string | null>(null);
  const [visitors, setVisitors] = useState(2);
  const [purpose, setPurpose]   = useState("");
  const [booked, setBooked]     = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]       = useState("");
  const [confirmed, setConfirmed] = useState<Booking | null>(null);

  useEffect(() => {
    if (!date) return;
    api<SlotAvailability>(`/bookings/slots?visit_date=${date}`)
      .then((d) => setBooked(d.booked_slots))
      .catch(() => setBooked([]));
  }, [date]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) { setError("Please choose a time slot."); return; }
    setError(""); setSubmitting(true);
    try {
      const res = await api<Booking>("/bookings", {
        method: "POST",
        json: { customer_name: name, mobile, visit_date: date, time_slot: slot, num_visitors: visitors, purpose },
      });
      setConfirmed(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <div className="size-16 rounded-full bg-forest/10 grid place-items-center mx-auto mb-6">
          <CheckCircle2 className="size-8 text-forest" />
        </div>
        <span className="font-telugu text-amber-farm text-xl mb-2 block">ధన్యవాదాలు</span>
        <h1 className="font-serif text-4xl md:text-5xl text-forest font-medium mb-4">
          Your slot is reserved.
        </h1>
        <p className="text-forest/70 max-w-md mx-auto mb-10">
          We&apos;ll confirm on WhatsApp within an hour. Bring the family, wear closed shoes, and get ready to meet the flock.
        </p>
        <button
          onClick={() => { setConfirmed(null); setDate(""); setSlot(null); setName(""); setMobile(""); }}
          className="text-sm uppercase tracking-widest text-amber-farm border-b-2 border-amber-farm/30 pb-1 font-semibold"
        >
          Book another visit
        </button>
      </section>
    );
  }

  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-8">
        <span className="font-telugu text-amber-farm text-xl block mb-2">సందర్శన నమోదు</span>
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-forest text-balance">
          Book a farm visit
        </h1>
        <p className="text-forest/60 mt-3 max-w-xl">
          Choose a date and time slot. We host up to 12 visitors per slot to keep the birds calm.
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <form
          onSubmit={submit}
          className="bg-cream border border-forest/10 rounded-lg p-8 md:p-10 shadow-craft space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Full Name" required>
              <input required type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
            </Field>
            <Field label="Mobile Number" required>
              <input required type="tel" placeholder="+91" value={mobile} onChange={(e) => setMobile(e.target.value)} className="input" />
            </Field>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Visit Date" required>
              <input
                required type="date"
                value={date}
                onChange={(e) => { setDate(e.target.value); setSlot(null); }}
                min={todayStr()}
                className="input"
              />
            </Field>
            <Field label="Number of Visitors" required>
              <input
                required type="number" min={1} max={50}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="input"
              />
            </Field>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-forest/70 mb-3">
              Time Slot {date && <span className="text-amber-farm normal-case font-normal tracking-normal">· {date}</span>}
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {TIME_SLOTS.map((ts) => {
                const isBooked   = booked.includes(ts);
                const isSelected = slot === ts;
                return (
                  <button
                    key={ts}
                    type="button"
                    disabled={isBooked || !date}
                    onClick={() => setSlot(ts)}
                    className={`py-3 rounded-sm text-xs font-semibold uppercase tracking-widest transition-colors border ${
                      isSelected
                        ? "bg-forest text-cream border-forest"
                        : isBooked
                        ? "bg-forest/5 text-forest/30 border-forest/10 line-through cursor-not-allowed"
                        : !date
                        ? "bg-forest/5 text-forest/30 border-forest/10 cursor-not-allowed"
                        : "bg-cream text-forest border-forest/20 hover:border-forest hover:bg-forest/5"
                    }`}
                  >
                    {ts}
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Purpose (optional)">
            <textarea rows={3} placeholder="Family visit, function order, tour, etc." value={purpose} onChange={(e) => setPurpose(e.target.value)} className="input resize-none" />
          </Field>

          {error && (
            <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-forest/10">
            <p className="text-xs text-forest/50 max-w-xs">
              You will only pay after selecting and live-weighing a bird at the farm.
            </p>
            <button
              type="submit"
              disabled={!slot || submitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-farm text-cream px-8 py-3.5 rounded-sm text-sm font-semibold uppercase tracking-widest hover:bg-amber-deep disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Reserve My Slot
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-forest/70 mb-2">
        {label}{required && <span className="text-amber-farm ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
