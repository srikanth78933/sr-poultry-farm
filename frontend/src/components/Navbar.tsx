"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import LogoMark from "./LogoMark";
import { useLanguage, LANG_LABELS, Lang } from "@/contexts/LanguageContext";

const WA_NUMBER = "917893398267";

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/chickens", label: t.nav.chickens },
    { href: "/about", label: t.nav.farm },
    { href: "/#why-choose-us", label: t.nav.whyUs },
    { href: "/book-visit", label: t.nav.visit },
    { href: "/#franchise", label: t.nav.franchise },
    { href: "/#contact", label: t.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Main bar */}
      <div className={`transition-all duration-300 ${scrolled ? "py-0" : "py-2"}`}>
        <nav className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/8 border-b border-stone-100" : "bg-white/80 backdrop-blur-md"}`}>
          <div className="flex h-16 items-center gap-3">

            {/* ── Logo ── */}
            <Link href="/" className="flex shrink-0 items-center gap-2.5 group mr-4">
              <span className="transition-transform duration-300 group-hover:scale-105">
                <LogoMark size={40} />
              </span>
              <span className="hidden sm:block leading-tight">
                <span className="block font-display text-[15px] font-bold text-farm-greenDark tracking-tight">SR Naati Kodi Farms</span>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-farm-leaf">Village taste to your home</span>
              </span>
            </Link>

            {/* ── Desktop nav (visible from md/1024px) ── */}
            <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-full px-3 py-2 text-[13px] font-semibold text-stone-600 transition-all hover:bg-farm-green/10 hover:text-farm-greenDark whitespace-nowrap"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* ── Right: Lang + WhatsApp + Hamburger ── */}
            <div className="ml-auto flex shrink-0 items-center gap-2">

              {/* Language switcher */}
              <div ref={langRef} className="relative hidden md:block">
                <button
                  onClick={() => setLangOpen((v) => !v)}
                  className="flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-bold text-stone-600 shadow-sm transition hover:border-farm-green/40 hover:text-farm-greenDark"
                >
                  {lang === "en" ? "EN" : LANG_LABELS[lang].slice(0, 2)}
                  <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1.5 w-36 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-2xl">
                    {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className={`flex w-full items-center gap-2 px-4 py-2.5 text-sm transition hover:bg-farm-green/8 hover:text-farm-greenDark ${lang === l ? "bg-farm-green/10 font-semibold text-farm-greenDark" : "text-stone-600"}`}
                      >
                        {LANG_LABELS[l]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* WhatsApp button */}
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#20c65e] hover:scale-105"
              >
                <WhatsAppIcon size={14} />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>

              {/* Call button */}
              <a
                href="tel:+917893398267"
                className="hidden xl:inline-flex items-center gap-1.5 rounded-full border border-farm-green/30 px-3.5 py-2 text-xs font-bold text-farm-greenDark transition hover:bg-farm-green hover:text-white hover:border-farm-green"
              >
                <Phone className="h-3.5 w-3.5" />
                <span>Call</span>
              </a>

              {/* Hamburger – mobile only */}
              <button
                aria-label="Toggle menu"
                className="grid h-9 w-9 place-items-center rounded-full border border-stone-200 bg-white text-farm-greenDark shadow-sm transition hover:border-farm-green/40 lg:hidden"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="lg:hidden mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mt-1 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-2xl">
            {/* Nav links */}
            <div className="divide-y divide-stone-50">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center px-5 py-3.5 text-sm font-semibold text-stone-700 transition hover:bg-farm-green/5 hover:text-farm-greenDark"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Language + action buttons */}
            <div className="border-t border-stone-100 px-4 py-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">Language</p>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileOpen(false); }}
                    className={`rounded-full px-3 py-1 text-xs font-bold transition ${lang === l ? "bg-farm-green text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white"
                >
                  <WhatsAppIcon size={16} /> WhatsApp
                </a>
                <a
                  href="tel:+917893398267"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-farm-green/30 py-3 text-sm font-bold text-farm-greenDark"
                >
                  <Phone className="h-4 w-4" /> Call Us
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
