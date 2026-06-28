"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Egg } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/chickens", label: "Naati Kodi" },
  { href: "/about", label: "Our Farm" },
  { href: "/purchase", label: "How to Buy" },
  { href: "/book-visit", label: "Book a Visit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`container-x flex items-center justify-between rounded-full px-5 py-2.5 transition-all ${
          scrolled ? "glass" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-farm-green text-farm-sand shadow-lg">
            <Egg className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold text-farm-greenDark">SR Poultry Farm</span>
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-farm-leaf">Natural Naati Kodi</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-farm-green/10 hover:text-farm-greenDark"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/book-visit" className="btn-primary ml-2 px-5 py-2 text-sm">
            Visit the Farm
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/70 text-farm-greenDark md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="container-x mt-2 md:hidden">
          <div className="glass flex flex-col gap-1 rounded-3xl p-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold text-stone-700 hover:bg-farm-green/10"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
