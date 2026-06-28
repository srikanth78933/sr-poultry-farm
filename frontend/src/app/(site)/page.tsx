import Link from "next/link";
import {
  Leaf, Sun, Droplets, ShieldCheck, Sprout, HeartHandshake,
  CheckCircle2, ArrowRight, Bird, Award,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import ChickenGrid from "@/components/ChickenGrid";

const trust = [
  { icon: Leaf, label: "Healthy" },
  { icon: Award, label: "Traditional" },
  { icon: Bird, label: "Farm Fresh" },
];

const values = [
  { icon: Sprout, title: "Natural Farming", desc: "Birds grow at their own pace on grains, greens and open pasture — never force-fed." },
  { icon: Sun, title: "Free Roaming", desc: "Open-garden farming under sun and sky keeps our Naati Kodi active and healthy." },
  { icon: Droplets, title: "Clean Water & Feed", desc: "Fresh water and traditional feeding, with no unnecessary chemicals or hormones." },
  { icon: ShieldCheck, title: "Quality Assured", desc: "Every bird is health-checked so you take home only the best country chicken." },
];

const process = [
  { n: "01", title: "Natural Growth", desc: "Chicks raised slowly in an open, low-stress environment." },
  { n: "02", title: "Healthy Feeding", desc: "Grains, greens and kitchen-grade natural feed — nothing artificial." },
  { n: "03", title: "Open Environment", desc: "Free roaming across green farm space with sun and fresh air." },
  { n: "04", title: "Quality Checking", desc: "Each bird inspected for health before it is offered to you." },
];

const journey = [
  "View available birds online",
  "Book your farm visit",
  "Visit the farm in person",
  "Select your chicken",
  "We weigh it live",
  "Pay & take it home fresh",
];

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-24 flex min-h-[92vh] items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1500076656116-558758f991c1?w=1600&auto=format&q=80)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-farm-greenDark/30 via-transparent to-farm-cream" />
        <div className="container-x relative z-10 pt-28">
          <div className="max-w-2xl reveal">
            <span className="chip bg-white/70 text-farm-greenDark backdrop-blur">
              <Leaf className="h-4 w-4" /> Raised Naturally on Open Pasture
            </span>
            <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-farm-greenDark sm:text-6xl lg:text-7xl">
              SR Poultry Farm
            </h1>
            <p className="mt-4 font-display text-2xl font-semibold text-farm-earth sm:text-3xl">
              Natural Naati Kodi, Raised Naturally
            </p>
            <p className="mt-3 text-lg font-medium tracking-wide text-stone-700">
              Healthy · Traditional · Farm Fresh
            </p>
            <p className="mt-5 max-w-xl text-stone-600">
              Authentic country chicken from free-roaming birds, traditionally fed and lovingly raised.
              Explore our flock, visit the farm, and choose your bird in person.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/chickens" className="btn-primary">
                Explore Naati Kodi <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/book-visit" className="btn-gold">Book a Farm Visit</Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {trust.map((t) => (
                <span key={t.label} className="glass chip rounded-full px-4 py-2 text-farm-greenDark">
                  <t.icon className="h-4 w-4 text-farm-leaf" /> {t.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AVAILABLE NAATI KODI */}
      <section id="available" className="container-x py-20">
        <Reveal className="mb-10 text-center">
          <span className="eyebrow">Available Now</span>
          <h2 className="section-title mt-2">Our Naati Kodi Flock</h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500">
            Each bird is naturally raised and priced per kilogram. Final weight is measured live at the farm.
          </p>
        </Reveal>
        <ChickenGrid featuredOnly />
        <div className="mt-10 text-center">
          <Link href="/chickens" className="btn-outline">View all birds <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="container-x">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow">Why SR Poultry Farm?</span>
            <h2 className="section-title mt-2">Better Birds, Better Taste</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <div className="card h-full p-7">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-farm-green/10 text-farm-green">
                    <v.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-farm-greenDark">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-500">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        className="relative bg-cover bg-center py-24"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&auto=format&q=80)" }}
      >
        <div className="absolute inset-0 bg-farm-greenDark/70" />
        <div className="container-x relative z-10">
          <Reveal className="mb-12 text-center">
            <span className="eyebrow text-farm-sand">Our Farming Process</span>
            <h2 className="section-title mt-2 text-white">From Pasture to Plate</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="glass-dark h-full rounded-3xl p-7 text-farm-sand">
                  <span className="font-display text-4xl font-extrabold text-farm-gold">{p.n}</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-farm-sand/80">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="container-x py-20">
        <Reveal className="mb-10 text-center">
          <span className="eyebrow">How to Buy</span>
          <h2 className="section-title mt-2">Your Farm-to-Home Journey</h2>
          <p className="mx-auto mt-3 max-w-xl text-stone-500">
            We sell only after you visit, so you see exactly what you take home.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {journey.map((step, i) => (
            <Reveal key={step} delay={i * 0.06}>
              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-farm-green text-white">
                  {i + 1}
                </span>
                <span className="font-medium text-stone-700">{step}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/purchase" className="btn-outline">
            See full buying guide <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-farm-green px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-farm-gold/20 blur-2xl" />
          <HeartHandshake className="mx-auto h-12 w-12 text-farm-gold" />
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">Come Meet Your Bird</h2>
          <p className="mx-auto mt-3 max-w-xl text-farm-sand/90">
            Book a visit, walk the farm, and choose your Naati Kodi the traditional way.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/book-visit" className="btn-gold">Book a Farm Visit</Link>
            <Link href="/chickens" className="btn-outline border-white/40 text-white hover:bg-white hover:text-farm-green">
              Browse Birds
            </Link>
          </div>
          <ul className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-farm-sand/90">
            <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> No advance payment</li>
            <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Live weighing</li>
            <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4" /> Pay after you choose</li>
          </ul>
        </div>
      </section>
    </>
  );
}
