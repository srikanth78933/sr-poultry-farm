"use client";
import { useEffect, useState } from "react";
import { Bird, CheckCircle2, PackageCheck, CalendarClock, ShoppingBag, IndianRupee, Hourglass } from "lucide-react";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/types";

const cards = (s: DashboardStats) => [
  { label: "Total Birds", value: s.total_birds, icon: Bird, color: "bg-emerald-500" },
  { label: "Available", value: s.available_birds, icon: CheckCircle2, color: "bg-lime-500" },
  { label: "Sold", value: s.sold_birds, icon: PackageCheck, color: "bg-stone-500" },
  { label: "Upcoming Visits", value: s.upcoming_bookings, icon: CalendarClock, color: "bg-sky-500" },
  { label: "Pending Bookings", value: s.pending_bookings, icon: Hourglass, color: "bg-amber-500" },
  { label: "Total Orders", value: s.total_orders, icon: ShoppingBag, color: "bg-indigo-500" },
];

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<DashboardStats>("/dashboard/stats", { auth: true })
      .then(setStats)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-farm-greenDark">Dashboard</h1>
      <p className="text-stone-500">Overview of your farm at a glance.</p>

      {error && <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-rose-600">{error}</p>}

      {stats && (
        <>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cards(stats).map((c) => (
              <div key={c.label} className="flex items-center gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <span className={`grid h-14 w-14 place-items-center rounded-2xl text-white ${c.color}`}>
                  <c.icon className="h-7 w-7" />
                </span>
                <div>
                  <p className="text-3xl font-bold text-stone-800">{c.value}</p>
                  <p className="text-sm text-stone-500">{c.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-farm-green to-farm-greenDark p-6 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20">
                <IndianRupee className="h-6 w-6" />
              </span>
              <p className="mt-4 text-sm text-farm-sand/80">Revenue Collected</p>
              <p className="text-3xl font-bold">₹{stats.revenue_collected.toLocaleString("en-IN")}</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-farm-gold/20 text-farm-gold">
                <IndianRupee className="h-6 w-6" />
              </span>
              <p className="mt-4 text-sm text-stone-500">Total Billed</p>
              <p className="text-3xl font-bold text-stone-800">₹{stats.revenue_billed.toLocaleString("en-IN")}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
