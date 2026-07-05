"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Globe, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WA_URL = "https://wa.me/917893398267";
const MAPS_URL = "https://maps.app.goo.gl/fPCgV9MKsAdDKWvM6?g_st=aw";
const INSTAGRAM_URL = "https://www.instagram.com/natu_kodi.farms?igsh=NjZ2cXRnNmszaDF2";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative bg-forest text-cream/70 mt-24">
      <div className="absolute inset-0 kraft-noise opacity-10 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-2 max-w-md">
            <div className="mb-6">
              <div className="text-cream font-serif uppercase text-xl tracking-tight font-semibold">
                Natu Kodi Farms
              </div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-cream/50 mt-1">
                Annamayya District · AP
              </div>
            </div>
            <p className="font-telugu text-2xl text-amber-farm mb-3">
              పల్లె రుచిని మీ ఇంటికి
            </p>
            <p className="text-sm leading-relaxed">
              Country chicken raised the honest village way. No hormones, no cages,
              no advance payments. Just walk in, pick a bird, and we weigh it live.
            </p>
          </div>

          {/* Visit */}
          <div>
            <h5 className="text-cream font-medium mb-5 text-xs uppercase tracking-[0.2em]">
              Visit the Farm
            </h5>
            <address className="not-italic text-sm leading-relaxed space-y-1">
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:text-cream transition-colors">
                <MapPin className="size-4 shrink-0 text-amber-farm mt-0.5" />
                <span>
                  S. Nadimpalli Village, Somala Mandalam,<br />
                  Annamayya District, AP 517257
                </span>
              </a>
              <div className="pt-2 text-cream/50 text-xs">Open Mon–Sun · 06:00 – 18:00</div>
            </address>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-cream font-medium mb-5 text-xs uppercase tracking-[0.2em]">
              Reach Us
            </h5>
            <ul className="text-sm space-y-2.5">
              <li>
                <a href="tel:+917893398267" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <Phone className="size-4 text-amber-farm" /> +91 78933 98267
                </a>
              </li>
              <li>
                <a href="tel:+917975708686" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <Phone className="size-4 text-amber-farm" /> +91 79757 08686
                </a>
              </li>
              <li>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <MessageCircle className="size-4 text-amber-farm" /> WhatsApp Order
                </a>
              </li>
              <li>
                <a href="mailto:natukodifarms.in@gmail.com" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <Mail className="size-4 text-amber-farm" /> natukodifarms.in@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.natukodifarms.com" target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <Globe className="size-4 text-amber-farm" /> natukodifarms.com
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center hover:text-cream transition-colors">
                  <Instagram className="size-4 text-amber-farm" /> @natu_kodi.farms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-cream/40">
          <span>© {new Date().getFullYear()} Natu Kodi Farms · Pure Taste. Natural Farming.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">Privacy</a>
            <a href="#" className="hover:text-cream transition-colors">Terms</a>
            <Link href="/admin/login" className="hover:text-amber-farm transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
