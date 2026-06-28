import type { Metadata } from "next";
import { Leaf, Sun, Droplets, ShieldCheck, Sprout, Heart, Utensils, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our Farm",
  description: "The story behind SR Poultry Farm — natural farming, free roaming birds, and traditional care.",
};

const points = [
  { icon: Sprout, title: "Natural Farming Practices", desc: "We follow time-tested, natural methods — no shortcuts, no artificial growth boosters." },
  { icon: Sun, title: "Free Roaming Birds", desc: "Our Naati Kodi roam freely across open garden space, just as country chicken should." },
  { icon: Utensils, title: "Traditional Feeding", desc: "Grains, greens and natural feed give our birds their authentic, rich flavour." },
  { icon: Droplets, title: "Clean Water", desc: "Constant access to fresh, clean water keeps the flock healthy and active." },
  { icon: Leaf, title: "Healthy Environment", desc: "Open, low-stress surroundings mean stronger, happier, healthier birds." },
  { icon: ShieldCheck, title: "No Unnecessary Chemicals", desc: "We avoid needless antibiotics and hormones for clean, honest poultry." },
  { icon: Heart, title: "Better Taste", desc: "Slow, natural growth develops the firm texture and deep taste of true naati kodi." },
  { icon: BadgeCheck, title: "Quality Assurance", desc: "Every bird is checked for health and condition before it reaches you." },
];

const process = [
  { n: "01", title: "Natural Growth", desc: "Chicks are raised slowly and naturally, never rushed." },
  { n: "02", title: "Healthy Feeding", desc: "A traditional diet of grains and greens — nothing artificial." },
  { n: "03", title: "Open Environment", desc: "Free roaming across green, sunlit farm space." },
  { n: "04", title: "Quality Checking", desc: "Careful health checks before any bird is offered for sale." },
];

export default function AboutPage() {
  return (
    <>
      <section
        className="relative -mt-24 flex min-h-[60vh] items-end bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&q=80)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-farm-cream via-farm-greenDark/30 to-transparent" />
        <div className="container-x relative z-10 pb-12">
          <span className="eyebrow text-farm-sand">Our Story</span>
          <h1 className="mt-2 font-display text-5xl font-extrabold text-white sm:text-6xl">Why SR Poultry Farm?</h1>
          <p className="mt-3 max-w-2xl text-farm-sand">
            Because real country chicken deserves real country care.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <Reveal>
          <div className="card mx-auto max-w-3xl p-8 sm:p-10">
            <p className="text-lg leading-relaxed text-stone-600">
              At <span className="font-semibold text-farm-greenDark">SR Poultry Farm</span>, we raise
              Naati Kodi the way it has always been done — birds roaming freely under open skies,
              fed traditionally, and given clean water and a calm, healthy environment. No factory
              cages, no unnecessary chemicals. Just patient, natural farming that brings out the
              authentic taste country chicken is loved for.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="card h-full p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-farm-green/10 text-farm-green">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-farm-greenDark">{p.title}</h3>
                <p className="mt-1.5 text-sm text-stone-500">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">Our Farming Process</span>
            <h2 className="section-title mt-2">Four Steps to Honest Poultry</h2>
          </Reveal>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <span className="font-display text-5xl font-extrabold text-farm-green/15">{p.n}</span>
                  <h3 className="-mt-4 font-display text-xl font-bold text-farm-greenDark">{p.title}</h3>
                  <p className="mt-2 text-sm text-stone-500">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
