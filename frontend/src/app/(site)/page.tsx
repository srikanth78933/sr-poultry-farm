"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Check, ChevronRight, ArrowRight, Leaf, Droplets, Sun, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SAMPLE_CHICKENS } from "@/lib/sampleData";

const WA_NUMBER = "917893398267";
const WA_URL = `https://wa.me/${WA_NUMBER}`;
const FRANCHISE_WA = `https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20SR%20Natu%20Kodi%20Farms%20Franchise.`;

/* icons that can't be animated server-side, but used in JSX */
const CHECK_ICONS = [
  <Leaf key="leaf" className="h-3.5 w-3.5" />,
  <Sun key="sun" className="h-3.5 w-3.5" />,
  <Droplets key="drop" className="h-3.5 w-3.5" />,
  <ShieldCheck key="shield" className="h-3.5 w-3.5" />,
  <Check key="check" className="h-3.5 w-3.5" />,
];

const TRUST_ICONS = ["🌿", "⚖️", "👁️", "🐓"];

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">

      {/* ════════ HERO ════════ */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#f9fdf6] to-[#f0faf0] flex items-center">
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-bl from-farm-green/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-farm-gold/8 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 h-96 w-96 rounded-full bg-farm-green/6 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #14532d 1.5px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="container-x relative z-10 py-24 lg:py-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

            {/* Text */}
            <div className="lg:col-span-7 xl:col-span-6">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-farm-green/20 bg-farm-green/8 px-4 py-1.5">
                <Leaf className="h-3.5 w-3.5 text-farm-green" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-farm-green">{t.hero.badge}</span>
              </div>

              {/* Heading */}
              <h1 className="font-display leading-[1.05] tracking-tight">
                <span className="block text-[2.8rem] font-black text-farm-greenDark sm:text-6xl lg:text-[3.5rem] xl:text-6xl">
                  {t.hero.title1}
                </span>
                <span className="mt-1 block text-[2.8rem] font-black sm:text-6xl lg:text-[3.5rem] xl:text-6xl">
                  <span className="relative inline-block text-gradient-gold">
                    {t.hero.title2}
                    <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-farm-gold to-amber-300 opacity-60" />
                  </span>
                </span>
              </h1>

              {/* Tagline from footer (translated) */}
              <p className="mt-5 text-xl font-semibold text-stone-700 sm:text-2xl">{t.footer.tagline}</p>

              {/* Telugu brand tagline — always stays as the brand signature */}
              <p className="mt-1 font-display text-base italic text-farm-earth/80 sm:text-lg">
                పల్లె రుచిని మీ ఇంటికి
              </p>

              {/* Divider */}
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-farm-green/30 to-transparent" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-farm-green/50">{t.story.eyebrow}</span>
                <div className="h-px flex-1 bg-gradient-to-l from-farm-green/30 to-transparent" />
              </div>

              {/* Checklist */}
              <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-stone-500">{t.hero.raisedWith}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {t.story.points.slice(0, 5).map((point, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-farm-green text-white">
                      {CHECK_ICONS[i]}
                    </span>
                    <span className="text-sm font-medium text-stone-700">{point}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/chickens" className="btn-primary text-sm sm:text-base">
                  {t.hero.btnView} <ChevronRight className="h-4 w-4" />
                </Link>
                <Link href="/book-visit" className="btn border-2 border-farm-green/30 text-farm-greenDark hover:bg-farm-green hover:text-white hover:border-farm-green text-sm sm:text-base">
                  {t.hero.btnBook}
                </Link>
              </div>

              {/* Quick contact */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-stone-500">
                <a href="tel:+917893398267" className="flex items-center gap-1.5 font-semibold hover:text-farm-greenDark transition-colors">
                  <Phone className="h-4 w-4 text-farm-green" /> +91 78933 98267
                </a>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 font-semibold text-[#25D366] hover:opacity-80 transition-opacity">
                  <WhatsAppIcon size={16} /> {t.hero.btnWA}
                </a>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-farm-green/20">
                  <Image
                    src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=900&auto=format&q=85"
                    alt="Natu Kodi on the farm"
                    fill
                    className="object-cover animate-float"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-farm-greenDark/20 via-transparent to-transparent" />
                </div>
                {/* Floating stat 1 */}
                <div className="absolute -left-6 top-8 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-black/10 border border-stone-100">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-farm-green/10 text-xl">🐓</span>
                  <div>
                    <p className="text-xs font-bold text-farm-greenDark">100% Natural</p>
                    <p className="text-[10px] text-stone-400">{t.trust.points[0].desc.split("—")[0].trim()}</p>
                  </div>
                </div>
                {/* Floating stat 2 */}
                <div className="absolute -right-6 bottom-10 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-black/10 border border-stone-100">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-farm-gold/15 text-xl">⚖️</span>
                  <div>
                    <p className="text-xs font-bold text-farm-greenDark">{t.trust.points[1].title}</p>
                    <p className="text-[10px] text-stone-400">₹0 {t.visitCta.note.split("·")[1]?.trim()}</p>
                  </div>
                </div>
                <div className="absolute -right-4 -top-4 -z-10 h-full w-full rounded-[2.5rem] bg-farm-green/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FEATURE STRIP ════════ */}
      <section className="bg-farm-greenDark">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
            {t.features.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 bg-farm-greenDark px-4 py-7 text-center">
                <span className="text-2xl">{["🌾", "💧", "🐓", "🌿", "🏡"][i]}</span>
                <span className="text-sm font-bold text-white">{f.title}</span>
                <span className="text-xs text-farm-sand/60">{f.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ NATU KODI COLLECTION ════════ */}
      <section id="natu-kodi" className="py-20 bg-stone-50">
        <div className="container-x">
          <div className="text-center">
            <span className="eyebrow">{t.products.eyebrow}</span>
            <h2 className="section-title mt-2">{t.products.title}</h2>
            <p className="mx-auto mt-4 max-w-lg text-stone-500">{t.products.desc}</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_CHICKENS.map((chicken) => (
              <div key={chicken.id} className="group flex flex-col overflow-hidden rounded-3xl bg-white border border-stone-100 shadow-sm transition-all hover:-translate-y-1.5 hover:shadow-xl hover:shadow-farm-green/10">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={chicken.cover_image || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&auto=format&q=80"}
                    alt={chicken.breed_name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {chicken.status === "available" && (
                    <span className="absolute right-3 top-3 rounded-full bg-farm-green/90 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                      {t.story.points[4].split(",")[0]}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold text-farm-greenDark">{chicken.breed_name}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-stone-500 line-clamp-2">{chicken.description}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-stone-50 px-3 py-2 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">Weight</p>
                      <p className="mt-0.5 text-sm font-bold text-stone-700">{chicken.min_weight_kg}–{chicken.max_weight_kg} kg</p>
                    </div>
                    <div className="rounded-xl bg-stone-50 px-3 py-2 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-stone-400">Age</p>
                      <p className="mt-0.5 text-sm font-bold text-stone-700">{chicken.age_months} mo</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
                    <div>
                      <span className="text-2xl font-black text-farm-greenDark">₹{chicken.price_per_kg}</span>
                      <span className="ml-1 text-xs font-medium text-stone-400">/ kg</span>
                    </div>
                    <Link href="/chickens" className="rounded-xl bg-farm-green px-4 py-2 text-xs font-bold text-white transition hover:bg-farm-greenDark">
                      {t.hero.btnView.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/chickens" className="btn-outline inline-flex items-center gap-2 text-sm">
              {t.nav.chickens} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ WHY CHOOSE US ════════ */}
      <section id="why-choose-us" className="py-20">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=900&auto=format&q=80"
                  alt="Country rooster on the farm"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-5 right-4 rounded-2xl bg-farm-greenDark px-5 py-4 shadow-2xl max-w-[200px]">
                <p className="font-display text-sm font-bold italic text-white">&ldquo;{t.story.quote}&rdquo;</p>
                <p className="mt-1 text-[10px] text-farm-sand/60">SR Natu Kodi Farms</p>
              </div>
              <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl bg-farm-green/10" />
            </div>

            {/* Content */}
            <div>
              <span className="eyebrow">{t.nav.whyUs}</span>
              <h2 className="section-title mt-2">{t.story.title}</h2>
              <p className="mt-4 text-stone-600 leading-relaxed">{t.story.desc}</p>

              <div className="mt-8 space-y-4">
                {t.trust.points.map((point, i) => (
                  <div key={i} className="flex gap-4 rounded-2xl border border-stone-100 bg-white p-4 shadow-sm transition hover:border-farm-green/20 hover:shadow-md">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-farm-green/10 text-xl">{TRUST_ICONS[i]}</span>
                    <div>
                      <h3 className="font-bold text-farm-greenDark">{point.title}</h3>
                      <p className="mt-0.5 text-sm text-stone-500">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FARM VISIT CTA ════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&q=80"
            alt="Farm landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-farm-greenDark/95 to-farm-greenDark/75" />
        </div>
        <div className="container-x relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow text-farm-gold/90">{t.visitCta.eyebrow}</span>
            <h2 className="section-title mt-3 text-white">{t.visitCta.title}</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-white/75">{t.visitCta.desc}</p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/book-visit" className="btn-gold gap-2 text-base">
                {t.visitCta.btn} <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn bg-[#25D366] text-white text-base hover:bg-[#20c65e] shadow-lg">
                <WhatsAppIcon size={18} /> {t.hero.btnWA}
              </a>
            </div>
            <p className="mt-5 text-sm text-white/50">{t.visitCta.note}</p>
          </div>
        </div>
      </section>

      {/* ════════ STATS ════════ */}
      <section className="py-16 bg-farm-cream">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[
              { n: "100+", label: t.trust.points[0].title, emoji: "🐓" },
              { n: "₹0", label: t.visitCta.note.split("·")[1]?.trim() || "Advance Payment", emoji: "💳" },
              { n: "Live", label: t.visitCta.note.split("·")[2]?.trim() || "Weighing", emoji: "⚖️" },
              { n: "4+", label: "Languages", emoji: "🌐" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm border border-stone-100">
                <span className="text-3xl">{s.emoji}</span>
                <span className="mt-3 text-3xl font-black text-farm-greenDark">{s.n}</span>
                <span className="mt-1 text-xs font-semibold text-stone-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FRANCHISE ════════ */}
      <section id="franchise" className="py-20 bg-stone-900">
        <div className="container-x">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <span className="eyebrow text-farm-gold/80">{t.franchise.eyebrow}</span>
              <h2 className="section-title mt-2 text-white whitespace-pre-line">{t.franchise.title}</h2>
              <p className="mt-5 text-stone-400 leading-relaxed">{t.franchise.desc}</p>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-farm-gold">{t.franchise.supplyTitle}</p>
                <ul className="mt-4 space-y-2.5">
                  {t.franchise.supply.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-stone-300">
                      <Check className="h-4 w-4 shrink-0 text-farm-gold" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <a href={FRANCHISE_WA} target="_blank" rel="noopener noreferrer"
                  className="btn bg-[#25D366] text-white text-base hover:bg-[#20c65e] shadow-lg shadow-green-900/40">
                  <WhatsAppIcon size={18} /> {t.franchise.btn}
                </a>
                <p className="mt-2.5 text-xs text-stone-500">{t.franchise.btnNote}</p>
              </div>
            </div>

            <div className="grid gap-4">
              {t.franchise.options.slice(0, 3).map((opt) => (
                <div key={opt.n} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10 hover:border-farm-gold/30">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-farm-gold/15 font-black text-farm-gold text-sm">
                    {opt.n}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-white">{opt.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-400">{opt.desc}</p>
                    <a href={FRANCHISE_WA} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-farm-gold hover:underline">
                      {t.franchise.btn} <ChevronRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" className="py-20">
        <div className="container-x">
          <div className="text-center">
            <span className="eyebrow">{t.contact.eyebrow}</span>
            <h2 className="section-title mt-2">{t.contact.title}</h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Phone */}
            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-farm-green/10">
                <Phone className="h-5 w-5 text-farm-green" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-farm-greenDark">{t.contact.callTitle}</h3>
              <div className="mt-4 space-y-2.5">
                <a href="tel:+917893398267" className="block text-base font-semibold text-stone-700 hover:text-farm-green transition-colors">
                  +91 78933 98267
                </a>
                <a href="tel:+917975708686" className="block text-base font-semibold text-stone-700 hover:text-farm-green transition-colors">
                  +91 79757 08686
                </a>
              </div>
              <div className="mt-5 flex gap-2">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-sm font-bold text-white hover:bg-[#20c65e] transition-colors">
                  <WhatsAppIcon size={15} /> {t.hero.btnWA}
                </a>
                <a href="tel:+917893398267"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border-2 border-farm-green/30 py-2.5 text-sm font-bold text-farm-greenDark hover:bg-farm-green hover:text-white hover:border-farm-green transition-colors">
                  <Phone className="h-4 w-4" /> {t.hero.btnCall}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-farm-green/10">
                <Mail className="h-5 w-5 text-farm-green" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-farm-greenDark">{t.contact.emailTitle}</h3>
              <a href="mailto:srnatukodifarms@gmail.com"
                className="mt-4 block break-all text-base font-semibold text-stone-700 hover:text-farm-green transition-colors">
                srnatukodifarms@gmail.com
              </a>
              <a href="mailto:srnatukodifarms@gmail.com"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl border-2 border-farm-green/30 px-4 py-2 text-sm font-bold text-farm-greenDark hover:bg-farm-green hover:text-white hover:border-farm-green transition-colors">
                <Mail className="h-4 w-4" />
              </a>
            </div>

            {/* Location */}
            <div className="rounded-3xl border border-stone-100 bg-white p-7 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-farm-green/10">
                <MapPin className="h-5 w-5 text-farm-green" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-farm-greenDark">{t.contact.locTitle}</h3>
              <p className="mt-4 leading-relaxed text-stone-600 whitespace-pre-line">{t.contact.loc}</p>
              <a
                href="https://maps.google.com/?q=S.+Nadimpalli+Village,+Somala+Mandalam,+Annamayya+District,+Andhra+Pradesh+517257"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl border-2 border-farm-green/30 px-4 py-2 text-sm font-bold text-farm-greenDark hover:bg-farm-green hover:text-white hover:border-farm-green transition-colors"
              >
                <MapPin className="h-4 w-4" /> Maps
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="mt-10 rounded-3xl border border-stone-100 bg-stone-50 p-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">{t.contact.followTitle}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105">
                <WhatsAppIcon size={17} /> {t.hero.btnWA}
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                Instagram
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#1877F2] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#FF0000] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
