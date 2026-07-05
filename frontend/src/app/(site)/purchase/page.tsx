import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Search, Scale, Wallet, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Buy — Natu Kodi Farms",
  description: "Book a visit, come to the farm, pick your bird, watch us weigh it live, pay only for actual weight. Zero advance.",
};

const steps = [
  { icon: MapPin,        title: "Visit the Farm",        body: "Book a time slot online or WhatsApp us. Bring the whole family — parking, seating and tea are on us." },
  { icon: Search,        title: "Select a Bird",         body: "Walk through the orchards, meet the flock, and hand-pick the specific bird you want." },
  { icon: Scale,         title: "Live Weighing",         body: "Our digital scale sits at the counter. You watch the number, we don't touch it." },
  { icon: Wallet,        title: "Pay by UPI or Cash",    body: "Total = weight × per-kg rate. Pay only when you're happy. No advance, no surprises." },
  { icon: PackageCheck,  title: "Fresh Handover",        body: "Cleaned, cut to your preference, packed in food-grade ice. Home within hours." },
];

export default function PurchasePage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <span className="font-telugu text-amber-farm text-xl block mb-2">ఎలా కొనాలి</span>
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-forest text-balance max-w-3xl">
          Simple, transparent, and completely honest.
        </h1>

        <div className="mt-10 inline-flex items-center gap-4 bg-forest text-cream px-6 py-4 rounded-sm">
          <span className="font-serif text-3xl leading-none text-amber-farm">₹0</span>
          <span className="text-sm uppercase tracking-widest font-semibold">No advance payment. Ever.</span>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <ol className="relative border-l-2 border-dashed border-forest/20 ml-6 space-y-12 pt-8">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pl-10">
              <span className="absolute -left-[27px] top-0 size-12 rounded-full bg-cream border-2 border-forest grid place-items-center shadow-craft">
                <s.icon className="size-5 text-forest" />
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-serif italic text-amber-farm text-2xl">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-forest font-medium">{s.title}</h3>
              </div>
              <p className="text-forest/70 mt-2 leading-relaxed max-w-xl">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 pl-10">
          <Link
            href="/book-visit"
            className="inline-flex items-center gap-2 bg-amber-farm text-cream px-6 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-widest hover:bg-amber-deep transition-colors shadow-lift"
          >
            Book a Farm Visit
          </Link>
        </div>
      </section>
    </>
  );
}

