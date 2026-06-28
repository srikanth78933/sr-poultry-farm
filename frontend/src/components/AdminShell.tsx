"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Bird, CalendarDays, ShoppingBag, Users, LogOut, Egg, Menu, X,
} from "lucide-react";
import { getToken, clearToken, api } from "@/lib/api";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Bird },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarDays },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    api("/auth/me", { auth: true })
      .then(() => setReady(true))
      .catch(() => {
        clearToken();
        router.replace("/admin/login");
      });
  }, [router]);

  function logout() {
    clearToken();
    router.replace("/admin/login");
  }

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-farm-cream">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-farm-green/30 border-t-farm-green" />
      </div>
    );
  }

  const SidebarLinks = () => (
    <nav className="space-y-1">
      {nav.map((n) => {
        const active = pathname === n.href;
        return (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              active ? "bg-farm-green text-white" : "text-farm-sand/80 hover:bg-white/10"
            }`}
          >
            <n.icon className="h-5 w-5" /> {n.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Sidebar - desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-farm-greenDark p-5 lg:flex">
        <Link href="/admin" className="mb-8 flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-farm-gold text-farm-earth">
            <Egg className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-white">SR Admin</span>
        </Link>
        <SidebarLinks />
        <button onClick={logout} className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-farm-sand/80 hover:bg-white/10">
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </aside>

      {/* Mobile top bar */}
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between bg-farm-greenDark px-4 py-3 lg:hidden">
          <span className="font-display text-lg font-bold text-white">SR Admin</span>
          <button onClick={() => setOpen((v) => !v)} className="text-white">
            {open ? <X /> : <Menu />}
          </button>
        </header>
        {open && (
          <div className="bg-farm-greenDark px-4 pb-4 lg:hidden">
            <SidebarLinks />
            <button onClick={logout} className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-farm-sand/80 hover:bg-white/10">
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </div>
        )}
        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
