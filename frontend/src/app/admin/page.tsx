"use client";
import { useEffect, useState } from "react";
import { Egg, PackageCheck, PackageX, CalendarClock, Hourglass, ShoppingBag, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/types";

const rupee = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<DashboardStats>("/dashboard/stats", { auth: true })
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-forest font-medium">Morning Overview</h1>
          <p className="text-xs sm:text-sm text-forest/60 mt-1">{today}</p>
        </div>
        <a href="/admin/orders" className="inline-flex items-center justify-center gap-1 bg-forest text-cream px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-forest-deep transition-colors shrink-0 w-full sm:w-auto">
          + New Order
        </a>
      </div>

      {error && (
        <div className="mb-6 rounded-sm bg-red-50 border border-red-200 px-4 py-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {!stats && !error && (
        <div className="flex items-center justify-center py-24">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
        </div>
      )}

      {stats && (
        <>
          {/* 6-column stat grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
            <Stat icon={Egg}         label="Total Birds"      value={stats.total_birds} />
            <Stat icon={PackageCheck} label="Available"        value={stats.available_birds} accent />
            <Stat icon={PackageX}    label="Sold"             value={stats.sold_birds} />
            <Stat icon={CalendarClock} label="Upcoming Visits" value={stats.upcoming_bookings} />
            <Stat icon={Hourglass}   label="Pending"          value={stats.pending_bookings} warn />
            <Stat icon={ShoppingBag} label="Total Orders"     value={stats.total_orders} />
          </div>

          {/* Revenue */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-forest to-forest-deep text-cream shadow-lift">
              <div className="absolute inset-0 kraft-noise opacity-15 pointer-events-none" />
              <div className="relative">
                <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-amber-farm">Revenue Collected</div>
                <div className="font-serif text-5xl font-medium mt-3 tracking-tight">
                  {rupee(stats.revenue_collected)}
                </div>
                <div className="mt-4 text-xs text-cream/60 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 bg-amber-farm/20 text-amber-farm px-2 py-0.5 rounded-sm">
                    <ArrowUpRight className="size-3" /> Live
                  </span>
                  from {stats.total_orders} paid orders
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg p-6 bg-cream border border-forest/10 shadow-craft">
              <div className="text-[10px] uppercase tracking-[0.22em] font-bold text-forest/50">Total Billed</div>
              <div className="font-serif text-5xl font-medium mt-3 text-forest tracking-tight">
                {rupee(stats.revenue_billed)}
              </div>
              <div className="mt-4 text-xs text-forest/60">
                {rupee(Math.max(0, stats.revenue_billed - stats.revenue_collected))} outstanding
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  icon: Icon, label, value, accent, warn,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  accent?: boolean;
  warn?: boolean;
}) {
  return (
    <div className="bg-cream border border-forest/10 rounded-lg p-3 sm:p-4 shadow-craft">
      <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
        <Icon className={`size-3 sm:size-3.5 shrink-0 ${accent ? "text-forest" : warn ? "text-amber-farm" : "text-forest/40"}`} />
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] font-bold text-forest/50 truncate">{label}</span>
      </div>
      <div className={`font-serif text-2xl sm:text-3xl font-medium ${warn ? "text-amber-farm" : "text-forest"}`}>{value}</div>
    </div>
  );
}
