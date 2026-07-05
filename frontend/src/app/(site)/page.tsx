"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Droplets, Sun, Scale, ChevronRight, MessageCircle, Phone, MapPin, ArrowUpRight, Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SAMPLE_CHICKENS, TELUGU_NAMES } from "@/lib/sampleData";

const WA_URL = "https://wa.me/917893398267";
const FRANCHISE_WA = "https://wa.me/917893398267?text=Hi%2C%20I%27m%20interested%20in%20Natu%20Kodi%20Farms%20Franchise.";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="overflow-x-hidden">

      {/* ════════ HERO ════════ */}
      <section className="relative overflow-hidden">
        {/* Telugu watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] flex items-center justify-center select-none">
          <span className="font-telugu leading-none text-forest" style={{ fontSize: "28vw", whiteSpace: "nowrap" }}>పల్లె</span>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
          <div>
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 border border-forest/10 text-forest text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="size-1.5 bg-amber-farm rounded-full animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] text-forest text-balance mb-8 font-medium">
              {t.hero.title1}{" "}
              <span className="italic text-forest/60">{t.hero.title2}</span>
            </h1>
            <p className="text-lg text-forest/70 max-w-lg mb-10 leading-relaxed">
              {t.hero.desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/chickens" className="inline-flex items-center gap-3 bg-amber-farm text-cream px-6 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-widest hover:bg-amber-deep transition-colors shadow-lift">
                {t.hero.btnView} <ArrowRight className="size-4" />
              </Link>
              <Link href="/book-visit" className="inline-flex items-center gap-3 border border-forest/25 text-forest px-6 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-widest hover:bg-forest hover:text-cream transition-colors">
                {t.hero.btnBook}
              </Link>
              <a href={WA_URL} className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-medium text-forest hover:text-amber-farm transition-colors">
                <MessageCircle className="size-4" /> {t.hero.btnWA}
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg aspect-[4/5] ring-1 ring-forest/10 shadow-lift">
              <Image
                src="/hero-rooster.jpg"
                alt="Aseel rooster at Natu Kodi Farms"
                fill
                className="object-cover animate-float"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest/50 to-transparent" />
            </div>
            {/* Floating info card */}
            <div className="absolute -bottom-6 -left-6 bg-cream border border-forest/10 p-5 rounded-sm shadow-craft max-w-[220px]">
              <div className="flex items-center gap-2 mb-1.5">
                <Scale className="size-4 text-amber-farm" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-farm">Live Weighing</span>
              </div>
              <p className="text-sm text-forest leading-snug">
                Every bird weighed in front of you. Pay only for actual weight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FEATURE STRIP ════════ */}
      <section className="bg-forest py-14 relative overflow-hidden">
        <div className="absolute inset-0 kraft-noise opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10 text-cream/90">
          {[Leaf, Droplets, Sun].map((Icon, i) => (
            <div key={i} className="flex items-start gap-5">
              <div className="size-12 rounded-full border border-cream/25 grid place-items-center shrink-0">
                <Icon className="size-5 text-amber-farm" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-cream font-medium">{t.features[i].title}</h3>
                <p className="text-sm text-cream/60 mt-1 max-w-[38ch]">{t.features[i].desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ BIRDS GRID ════════ */}
      <section className="py-24 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-telugu text-amber-farm text-lg block mb-1">{t.products.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl text-forest font-medium">{t.products.title}</h2>
            <p className="text-forest/60 mt-2 max-w-md">{t.products.desc}</p>
          </div>
          <Link href="/chickens" className="inline-flex items-center gap-2 text-amber-farm font-semibold text-sm uppercase tracking-widest border-b-2 border-amber-farm/30 pb-1 hover:border-amber-farm transition-colors">
            View all breeds <ChevronRight className="size-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_CHICKENS.map((bird) => (
            <BirdCard key={bird.id} bird={bird} />
          ))}
        </div>
      </section>

      {/* ════════ WHY CHOOSE US ════════ */}
      <section className="bg-kraft/40 py-24 relative">
        <div className="absolute inset-0 kraft-noise opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl mb-14">
            <h2 className="font-serif text-4xl md:text-5xl text-forest font-medium">
              {t.story.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: "01", t: "Traditional Andhra breeds", b: "Aseel, Kadaknath, Sonali & Ghyas — heritage birds, not commercial broilers." },
              { n: "02", t: "See before you buy", b: "Every customer walks through the farm and hand-picks their own bird." },
              { n: "03", t: "Live weighing scale", b: "Digital scale at the counter. Transparent, no hidden charges." },
              { n: "04", t: "Zero advance payment", b: "Pay in cash or UPI only after you're satisfied with the bird." },
            ].map((p) => (
              <div key={p.n}>
                <div className="font-serif text-amber-farm italic text-3xl mb-3">{p.n}</div>
                <h3 className="font-serif text-xl text-forest font-medium mb-2">{p.t}</h3>
                <p className="text-sm text-forest/65 leading-relaxed">{p.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FARM VISIT CTA ════════ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/farm-visit.jpg"
            alt="Andhra village farm"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-forest/75 mix-blend-multiply" />
          <div className="absolute inset-0 kraft-noise opacity-15 pointer-events-none" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center text-cream">
          <span className="font-telugu text-amber-farm text-2xl block mb-4">{t.visitCta.eyebrow}</span>
          <h2 className="font-serif text-5xl md:text-6xl font-medium tracking-tight text-balance mb-6">
            {t.visitCta.title}
          </h2>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.visitCta.desc}
          </p>
          <Link
            href="/book-visit"
            className="inline-flex items-center gap-3 bg-cream text-forest px-7 py-4 rounded-sm font-semibold text-sm uppercase tracking-[0.2em] hover:bg-amber-farm hover:text-cream transition-colors"
          >
            {t.visitCta.btn} <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* ════════ STATS ROW ════════ */}
      <section className="py-20 border-b border-forest/10">
        <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            { k: "100+", l: "Birds Ready" },
            { k: "₹0",   l: "Advance Payment" },
            { k: "Live", l: "Weighing Scale" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-6xl md:text-7xl text-forest font-medium">{s.k}</div>
              <p className="text-forest/45 uppercase tracking-[0.25em] text-[10px] font-bold mt-3">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════ FRANCHISE ════════ */}
      <section id="franchise" className="bg-forest-deep text-cream py-24 relative overflow-hidden">
        <div className="absolute inset-0 kraft-noise opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-telugu text-amber-farm text-xl block mb-3">{t.franchise.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-5 text-balance">
              {t.franchise.title}
            </h2>
            <p className="text-cream/70 leading-relaxed max-w-lg">
              {t.franchise.desc}
            </p>
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-lg p-8 backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-widest text-amber-farm font-bold mb-2">Partner Enquiry</div>
            <div className="font-serif text-2xl text-cream mb-6">Talk to our founder directly.</div>
            <div className="space-y-3 text-sm text-cream/80">
              <div className="flex items-center gap-3"><Phone className="size-4 text-amber-farm" /> +91 78933 98267</div>
              <div className="flex items-center gap-3"><MessageCircle className="size-4 text-amber-farm" /> WhatsApp anytime</div>
              <div className="flex items-center gap-3"><MapPin className="size-4 text-amber-farm" /> S. Nadimpalli, Annamayya District, AP</div>
            </div>
            <a
              href={FRANCHISE_WA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-amber-farm text-cream px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest font-semibold hover:bg-amber-deep transition-colors"
            >
              {t.franchise.btn} <ArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

/* Inline BirdCard — matches Lovable bird-card.tsx exactly */
function BirdCard({ bird }: { bird: (typeof SAMPLE_CHICKENS)[0] }) {
  const disabled = bird.status !== "available";
  const statusStyle: Record<string, string> = {
    available: "bg-forest text-cream",
    reserved:  "bg-amber-farm text-cream",
    sold:      "bg-forest/20 text-forest/60",
  };

  return (
    <article className="group relative">
      <div className="absolute inset-0 kraft-noise opacity-40 rounded-lg pointer-events-none" />
      <div className="relative bg-kraft/50 border border-forest/10 rounded-lg p-3 shadow-craft transition-all hover:shadow-lift hover:-translate-y-0.5">
        <div className="relative overflow-hidden rounded-md aspect-square bg-forest/5 ring-1 ring-forest/10">
          <Image
            src={bird.cover_image}
            alt={bird.breed_name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {bird.is_featured && (
            <span className="absolute top-3 left-3 bg-cream text-forest px-2 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm shadow-craft">
              Featured
            </span>
          )}
          <span className={`absolute top-3 right-3 px-2 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm ${statusStyle[bird.status] ?? "bg-forest/20 text-forest/60"}`}>
            {bird.status}
          </span>
        </div>

        <div className="px-1 pt-4 pb-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="font-serif text-xl font-medium text-forest leading-tight">{bird.breed_name}</h3>
            {TELUGU_NAMES[bird.breed_name] && (
              <span className="font-telugu text-base text-amber-farm">{TELUGU_NAMES[bird.breed_name]}</span>
            )}
          </div>
          <p className="text-xs text-forest/60 mt-2 leading-relaxed line-clamp-2">{bird.description}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <dt className="text-forest/45 uppercase tracking-widest text-[10px]">Weight</dt>
            <dd className="text-forest text-right font-medium">{bird.min_weight_kg}–{bird.max_weight_kg} kg</dd>
            <dt className="text-forest/45 uppercase tracking-widest text-[10px]">Age</dt>
            <dd className="text-forest text-right font-medium">{bird.age_months} months</dd>
          </dl>

          <div className="mt-5 pt-4 border-t border-forest/10">
            <Link
              href="/book-visit"
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold transition-all ${
                disabled
                  ? "border border-forest/15 text-forest/30 pointer-events-none"
                  : "bg-forest text-cream hover:bg-forest-deep"
              }`}
            >
              Book a Visit <ArrowUpRight className="size-3" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

