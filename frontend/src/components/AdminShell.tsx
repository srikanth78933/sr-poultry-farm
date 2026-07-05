"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Boxes, Egg, CalendarCheck2, Receipt, Users, LogOut, Menu, X,
} from "lucide-react";
import { getToken, clearToken, api } from "@/lib/api";
import LogoMark from "@/components/LogoMark";

const nav = [
  { href: "/admin",           label: "Dashboard",      icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Birds",          icon: Boxes           },
  { href: "/admin/eggs",      label: "Eggs",           icon: Egg             },
  { href: "/admin/bookings",  label: "Bookings",       icon: CalendarCheck2  },
  { href: "/admin/orders",    label: "Orders & Billing", icon: Receipt       },
  { href: "/admin/customers", label: "Customers",      icon: Users           },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen]   = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.replace("/admin/login"); return; }
    api("/auth/me", { auth: true })
      .then(() => setReady(true))
      .catch(() => { clearToken(); router.replace("/admin/login"); });
  }, [router]);

  function logout() { clearToken(); router.replace("/admin/login"); }

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-soil">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest/20 border-t-forest" />
          <p className="text-[10px] uppercase tracking-widest text-forest/50">Loading…</p>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <Link href="/admin" className="flex items-center gap-2.5 mb-10" onClick={() => setOpen(false)}>
        <LogoMark size={42} />
        <div>
          <div className="text-cream font-serif uppercase text-sm tracking-tight font-semibold">
            Natu Kodi
          </div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-cream/40">
            Admin Console
          </div>
        </div>
      </Link>

      {/* Nav items */}
      <nav className="space-y-1 flex-1">
        {nav.map((n) => {
          const active = pathname === n.href ||
            (n.href !== "/admin" && pathname.startsWith(n.href));
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm transition-colors ${
                active
                  ? "bg-cream/10 text-cream border-l-2 border-amber-farm"
                  : "text-cream/60 hover:bg-cream/5 hover:text-cream"
              }`}
            >
              <n.icon className="size-4" />
              <span className="uppercase tracking-widest text-xs">{n.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-8 pt-6 border-t border-cream/10">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 px-3 py-2 text-xs uppercase tracking-widest text-cream/50 hover:text-cream transition-colors"
        >
          <LogOut className="size-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-soil flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 bg-forest text-cream/70 min-h-screen p-6 flex-col relative overflow-hidden">
        <div className="absolute inset-0 kraft-noise opacity-10 pointer-events-none" />
        <div className="relative flex flex-col h-full">
          <SidebarContent />
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between border-b border-forest/10 bg-cream/80 backdrop-blur-md px-5 py-3">
          <Link href="/admin" className="flex items-center gap-2">
            <LogoMark size={34} />
            <span className="font-serif text-sm font-semibold uppercase text-forest">Admin</span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="size-9 grid place-items-center border border-forest/20 rounded-sm text-forest"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </header>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden bg-forest text-cream/70 px-6 py-6 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 kraft-noise opacity-10 pointer-events-none" />
            <div className="relative"><SidebarContent /></div>
          </div>
        )}

        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
