"use client";
import Link from "next/link";
import { Phone, MapPin, Mail } from "lucide-react";
import LogoMark from "./LogoMark";
import { useLanguage } from "@/contexts/LanguageContext";

const WA1 = "https://wa.me/917893398267";
const WA2 = "https://wa.me/917975708686";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-24 bg-farm-greenDark text-farm-sand">
      {/* Quote strip */}
      <div className="border-b border-white/10 bg-gradient-to-r from-farm-greenDark via-farm-green/30 to-farm-greenDark py-8 text-center">
        <p className="font-display text-xl font-bold text-white sm:text-2xl">&ldquo;{t.footer.tagline}&rdquo;</p>
        <p className="mt-1.5 text-sm text-farm-sand/60 uppercase tracking-widest">SR Natu Kodi Farms</p>
      </div>

      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <LogoMark size={46} />
            <div>
              <p className="font-display text-lg font-bold text-white">SR Natu Kodi Farms</p>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-farm-gold/80">Village taste to your home</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-farm-sand/70">
            Authentic Natu Kodi raised on open pasture in Andhra Pradesh — free roaming, naturally fed, traditionally raised.
          </p>
          {/* Social */}
          <div className="mt-5 flex gap-3">
            {[
              { href: WA1, icon: <WhatsAppIcon />, label: "WhatsApp", bg: "bg-[#25D366]" },
              { href: "https://instagram.com", icon: <InstagramIcon />, label: "Instagram", bg: "bg-gradient-to-br from-purple-500 to-pink-500" },
              { href: "https://facebook.com", icon: <FacebookIcon />, label: "Facebook", bg: "bg-[#1877F2]" },
              { href: "https://youtube.com", icon: <YouTubeIcon />, label: "YouTube", bg: "bg-[#FF0000]" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className={`${s.bg} grid h-8 w-8 place-items-center rounded-full text-white transition hover:scale-110 hover:opacity-90`}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-farm-gold">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-farm-sand/70">
            {[
              { href: "/chickens", label: t.nav.chickens },
              { href: "/about", label: t.nav.farm },
              { href: "/purchase", label: t.nav.buy },
              { href: "/book-visit", label: t.nav.visit },
              { href: "/admin/login", label: "Staff Login" },
            ].map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-farm-gold">{t.contact.callTitle}</h4>
          <ul className="mt-4 space-y-3 text-sm text-farm-sand/70">
            <li>
              <a href="tel:+917893398267" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-farm-gold" /> +91 78933 98267
              </a>
            </li>
            <li>
              <a href="tel:+917975708686" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="h-4 w-4 shrink-0 text-farm-gold" /> +91 79757 08686
              </a>
            </li>
            <li className="pt-1">
              <a href={WA1} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/20 px-3 py-1 text-[#4ade80] hover:bg-[#25D366]/30 transition-colors text-xs font-semibold">
                <WhatsAppIcon size={14} /> WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-farm-gold">{t.contact.locTitle}</h4>
          <ul className="mt-4 space-y-3 text-sm text-farm-sand/70">
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-farm-gold" />
              <a href="mailto:srnatukodifarms@gmail.com" className="hover:text-white transition-colors break-all">
                srnatukodifarms@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-farm-gold" />
              <span>S. Nadimpalli Village, Somala Mandalam,<br />Annamayya District,<br />Andhra Pradesh 517257</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs text-farm-sand/40">
        © {new Date().getFullYear()} SR Natu Kodi Farms · Pure Taste. Natural Farming. · {t.footer.loc}
      </div>
    </footer>
  );
}
