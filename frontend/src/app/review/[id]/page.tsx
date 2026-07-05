"use client";
import { Suspense, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Check, X, Loader2, Phone, Users, CalendarDays, Clock, MessageCircle } from "lucide-react";
import { api } from "@/lib/api";
import type { Booking } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import LogoMark from "@/components/LogoMark";

type ReviewResult = { booking: Booking; whatsapp_link?: string | null };

export default function BookingReviewPage() {
  return (
    <Suspense fallback={null}>
      <BookingReviewInner />
    </Suspense>
  );
}

function BookingReviewInner() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loadError, setLoadError] = useState("");
  const [busy, setBusy] = useState<"approve" | "decline" | null>(null);
  const [actionError, setActionError] = useState("");
  const [waLink, setWaLink] = useState<string | null>(null);

  useEffect(() => {
    if (!token) { setLoadError("This link is missing its access token."); return; }
    api<Booking>(`/bookings/review/${id}?token=${encodeURIComponent(token)}`)
      .then(setBooking)
      .catch((e) => setLoadError(e instanceof Error ? e.message : "Unable to load this booking."));
  }, [id, token]);

  async function act(action: "approve" | "decline") {
    setBusy(action);
    setActionError("");
    try {
      const result = await api<ReviewResult>(`/bookings/review/${id}?token=${encodeURIComponent(token)}`, {
        method: "POST",
        json: { action },
      });
      setBooking(result.booking);
      setWaLink(result.whatsapp_link ?? null);
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "Action failed");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="min-h-screen bg-soil grid place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 flex flex-col items-center gap-2">
          <LogoMark size={56} />
          <p className="text-[10px] uppercase tracking-[0.22em] text-forest/50">Booking Review</p>
        </div>

        <div className="card p-6 sm:p-8">
          {loadError && (
            <div className="rounded-sm bg-red-50 border border-red-200 px-4 py-3">
              <p className="text-sm text-red-700">{loadError}</p>
            </div>
          )}

          {!loadError && !booking && (
            <div className="flex flex-col items-center gap-3 py-10">
              <Loader2 className="size-6 animate-spin text-forest/40" />
              <p className="text-xs uppercase tracking-widest text-forest/40">Loading…</p>
            </div>
          )}

          {booking && (
            <>
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h1 className="font-serif text-2xl text-forest font-medium">{booking.customer_name}</h1>
                  <p className="flex items-center gap-1.5 text-sm text-forest/60 mt-1">
                    <Phone className="size-3.5" /> {booking.mobile}
                  </p>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="rounded-sm bg-kraft/40 px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-forest/50">
                    <CalendarDays className="size-3.5" /> Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-forest">{booking.visit_date}</p>
                </div>
                <div className="rounded-sm bg-kraft/40 px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-forest/50">
                    <Clock className="size-3.5" /> Slot
                  </p>
                  <p className="mt-1 text-sm font-semibold text-forest">{booking.time_slot}</p>
                </div>
                <div className="rounded-sm bg-kraft/40 px-4 py-3">
                  <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-forest/50">
                    <Users className="size-3.5" /> Visitors
                  </p>
                  <p className="mt-1 text-sm font-semibold text-forest">{booking.num_visitors}</p>
                </div>
                {booking.purpose && (
                  <div className="col-span-2 rounded-sm bg-kraft/40 px-4 py-3">
                    <p className="text-[10px] uppercase tracking-widest text-forest/50">Purpose</p>
                    <p className="mt-1 text-sm text-forest/80">{booking.purpose}</p>
                  </div>
                )}
              </div>

              {actionError && (
                <div className="mb-4 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-sm text-red-700">{actionError}</p>
                </div>
              )}

              {booking.status === "pending" && !waLink && (
                <div className="flex gap-3">
                  <button
                    onClick={() => act("approve")}
                    disabled={busy !== null}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-forest px-4 py-3
                               text-sm font-semibold uppercase tracking-widest text-cream hover:bg-forest-deep
                               disabled:opacity-50 transition"
                  >
                    {busy === "approve" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                    Approve
                  </button>
                  <button
                    onClick={() => act("decline")}
                    disabled={busy !== null}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm border border-red-200
                               bg-red-50 px-4 py-3 text-sm font-semibold uppercase tracking-widest text-red-600
                               hover:bg-red-600 hover:text-white disabled:opacity-50 transition"
                  >
                    {busy === "decline" ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
                    Decline
                  </button>
                </div>
              )}

              {waLink && (
                <div className="text-center">
                  <p className="mb-3 text-sm text-forest/70">
                    {booking.status === "approved" ? "Booking approved." : "Booking declined."} Send the customer a WhatsApp update:
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-amber-farm px-5 py-3
                               text-sm font-semibold uppercase tracking-widest text-white hover:bg-amber-deep transition"
                  >
                    <MessageCircle className="size-4" /> Send on WhatsApp
                  </a>
                </div>
              )}

              {booking.status !== "pending" && !waLink && (
                <p className="text-center text-sm text-forest/50">
                  This booking has already been marked <span className="font-semibold">{booking.status}</span>.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
