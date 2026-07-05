"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage, LANG_LABELS, Lang } from "@/contexts/LanguageContext";
import LogoMark from "@/components/LogoMark";

const WA_NUMBER = "917893398267";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();

  const NAV = [
    { href: "/",               label: t.nav.home       },
    { href: "/chickens",       label: t.nav.chickens   },
    { href: "/about",          label: t.nav.farm       },
    { href: "/purchase",       label: t.nav.buy        },
    { href: "/book-visit",     label: t.nav.visit      },
    { href: "/#franchise",     label: t.nav.franchise  },
  ];
  const pathname = usePathname();
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node))
        setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-forest/10 transition-all duration-200 ${
      scrolled ? "bg-cream/95 backdrop-blur-md shadow-sm" : "bg-cream/85 backdrop-blur-md"
    }`}>
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <LogoMark size={64} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-medium uppercase tracking-[0.14em]">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`transition-colors hover:text-amber-farm ${
                pathname === n.href ? "text-amber-farm" : "text-forest/80"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Language picker */}
          <div ref={langRef} className="relative hidden sm:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 border border-forest/20 rounded-sm px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest text-forest/70 hover:border-forest/40 hover:text-forest transition-colors"
            >
              {lang === "en" ? "EN" : LANG_LABELS[lang].slice(0, 2)}
              <ChevronDown className={`h-3 w-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-36 bg-cream border border-forest/12 rounded-sm shadow-lift overflow-hidden">
                {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`flex w-full items-center px-4 py-2.5 text-xs uppercase tracking-widest transition hover:bg-forest/5 hover:text-forest ${
                      lang === l ? "bg-forest/8 text-forest font-bold" : "text-forest/65"
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${WA_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-forest text-cream px-4 py-2 rounded-sm text-[10px] font-semibold uppercase tracking-widest hover:bg-forest-deep transition-colors"
          >
            WhatsApp
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden size-9 grid place-items-center border border-forest/20 rounded-sm text-forest hover:border-forest/40 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-forest/10 bg-cream">
          <nav className="flex flex-col px-5 py-4 gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-2.5 text-xs uppercase tracking-widest font-medium rounded-sm transition-colors ${
                  pathname === n.href
                    ? "text-amber-farm bg-forest/5"
                    : "text-forest/75 hover:text-forest hover:bg-forest/5"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          {/* Mobile lang + WA */}
          <div className="px-5 pb-5 flex gap-2">
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-forest text-cream py-3 rounded-sm text-xs font-semibold uppercase tracking-widest"
            >
              WhatsApp
            </a>
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1 border border-forest/20 rounded-sm px-3 py-3 text-[10px] font-bold uppercase tracking-widest text-forest"
              >
                {lang === "en" ? "EN" : LANG_LABELS[lang].slice(0, 2)}
                <ChevronDown className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 bottom-full mb-1 w-36 bg-cream border border-forest/12 rounded-sm shadow-lift overflow-hidden">
                  {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setLangOpen(false); }}
                      className="flex w-full items-center px-4 py-2.5 text-xs uppercase tracking-widest text-forest/70 hover:bg-forest/5 hover:text-forest transition"
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
