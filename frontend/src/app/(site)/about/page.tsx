import type { Metadata } from "next";
import Image from "next/image";
import { Sprout, Wheat, Sun, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "The Farm — Natu Kodi Farms",
  description: "Our story: a family-run country chicken farm in Annamayya District, Andhra Pradesh, raising heritage breeds the natural way since 2018.",
};

const steps = [
  { icon: Sprout,        t: "Native chicks",        b: "We source heritage breed chicks from certified Andhra hatcheries — no commercial broiler lines." },
  { icon: Wheat,         t: "Natural feed",          b: "Millets, broken rice, greens and kitchen scraps. Zero antibiotic growth promoters." },
  { icon: Sun,           t: "Free-range pasture",    b: "8+ months of open orchard foraging. Every bird lives outdoors, not in cages." },
  { icon: HeartHandshake, t: "Farm-gate handover",  b: "Customer selects, we weigh live at the counter. Complete transparency, always." },
];

const quality = [
  "Certified by the AP State Veterinary Department",
  "Regular water and soil quality tests every quarter",
  "No antibiotic growth promoters — ever",
  "Farm inspections open to all customers",
  "Traceability from chick to counter",
  "Halal slaughter available on request",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero split */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-telugu text-amber-farm text-xl mb-2 block">మా కథ</span>
          <h1 className="font-serif text-5xl md:text-6xl font-medium text-forest text-balance mb-6">
            A family farm in the heart of Annamayya District.
          </h1>
          <div className="space-y-5 text-forest/75 leading-relaxed">
            <p>
              Natu Kodi Farms began in 2018 when our founder returned from the city
              to his ancestral land in Peddapuram, determined to bring back the honest
              flavour of village chicken that had disappeared from urban markets.
            </p>
            <p>
              Today, three generations of the family raise heritage Andhra breeds — Aseel,
              Kadaknath, Sonali and Ghyas — on 12 acres of mango orchard. No shortcuts,
              no antibiotics, no factory shed. Just birds, soil, sun and time.
            </p>
            <p className="font-serif italic text-forest text-xl">
              "The scale doesn&apos;t lie. The soil doesn&apos;t lie. And neither do we."
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] rounded-lg overflow-hidden ring-1 ring-forest/10 shadow-lift">
            <Image
              src="/farm-visit.jpg"
              alt="Natu Kodi Farms farmland at dusk"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4-step process */}
      <section className="bg-kraft/40 py-24 relative">
        <div className="absolute inset-0 kraft-noise opacity-30 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-forest text-balance mb-14 max-w-2xl">
            Our 4-step farming process
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <div key={s.t} className="bg-cream border border-forest/10 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="size-12 rounded-full bg-forest/5 grid place-items-center">
                    <s.icon className="size-5 text-forest" />
                  </div>
                  <span className="font-serif italic text-amber-farm text-2xl">0{i + 1}</span>
                </div>
                <h3 className="font-serif text-xl text-forest font-medium mb-2">{s.t}</h3>
                <p className="text-sm text-forest/60 leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality assurance */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-forest mb-10 max-w-xl">
          Quality assurance
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {quality.map((q) => (
            <li key={q} className="flex items-start gap-3 border-b border-forest/10 pb-4">
              <span className="size-2 rounded-full bg-amber-farm mt-2 shrink-0" />
              <span className="text-forest/80">{q}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

