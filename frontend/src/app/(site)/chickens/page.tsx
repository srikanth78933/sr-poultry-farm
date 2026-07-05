"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";
import { SAMPLE_CHICKENS } from "@/lib/sampleData";
import type { Chicken } from "@/types";
import ChickenCard from "@/components/ChickenCard";

type BirdFilter = "all" | "available" | "featured";
type Tab = "birds" | "eggs";

type EggItem = {
  id: number;
  name: string;
  telugu_name: string;
  description: string;
  availability: string;
  cover_image: string;
  is_featured: boolean;
};

const eggStatusStyle: Record<string, string> = {
  available: "bg-forest text-cream",
  limited:   "bg-amber-farm text-cream",
};

export default function ProductsPage() {
  const [items, setItems]   = useState<Chicken[] | null>(null);
  const [eggs, setEggs]     = useState<EggItem[] | null>(null);
  const [filter, setFilter] = useState<BirdFilter>("all");
  const [tab, setTab]       = useState<Tab>("birds");

  useEffect(() => {
    api<Chicken[]>("/chickens")
      .then((data) => setItems(data.length ? data : SAMPLE_CHICKENS))
      .catch(() => setItems(SAMPLE_CHICKENS));
    api<EggItem[]>("/eggs")
      .then((data) => setEggs(data))
      .catch(() => setEggs([]));
  }, []);

  const filtered = (items ?? []).filter((c) => {
    if (filter === "available") return c.status === "available";
    if (filter === "featured")  return c.is_featured;
    return true;
  });

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        <span className="font-telugu text-amber-farm text-xl block mb-2">మా ఉత్పత్తులు</span>
        <h1 className="font-serif text-5xl md:text-6xl font-medium text-forest text-balance">Our Products</h1>
        <p className="text-forest/60 mt-3 max-w-2xl">
          Raised and harvested on our Annamayya District farm. Visit us, choose what you need, and take it home fresh.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">

        {/* Tabs — Birds / Eggs */}
        <div className="flex items-center gap-1 mb-8 border-b border-forest/10 pb-0">
          {(["birds", "eggs"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold border-b-2 transition-colors -mb-px ${
                tab === t
                  ? "border-forest text-forest"
                  : "border-transparent text-forest/50 hover:text-forest"
              }`}
            >
              {t === "birds" ? "🐓 Birds" : "🥚 Eggs"}
            </button>
          ))}
        </div>

        {/* ── BIRDS TAB ── */}
        {tab === "birds" && (
          <>
            <div className="flex items-center gap-2 mb-8">
              {(["all", "available", "featured"] as BirdFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors ${
                    filter === f
                      ? "bg-forest text-cream"
                      : "text-forest/60 hover:text-forest hover:bg-forest/5"
                  }`}
                >
                  {f}
                </button>
              ))}
              <div className="ml-auto text-xs text-forest/50 uppercase tracking-widest">
                {filtered.length} birds
              </div>
            </div>

            {items === null ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-kraft/40 aspect-[3/4] animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((c) => <ChickenCard key={c.id} c={c} />)}
              </div>
            )}
          </>
        )}

        {/* ── EGGS TAB ── */}
        {tab === "eggs" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(eggs ?? []).map((egg) => (
              <article key={egg.id} className="group relative">
                <div className="absolute inset-0 kraft-noise opacity-40 rounded-lg pointer-events-none" />
                <div className="relative bg-kraft/50 border border-forest/10 rounded-lg p-3 shadow-craft transition-all hover:shadow-lift hover:-translate-y-0.5">

                  {/* Egg photo */}
                  <div className="relative overflow-hidden rounded-md aspect-square ring-1 ring-forest/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={egg.cover_image} alt={egg.name} className="w-full h-full object-cover" />
                    <span className={`absolute top-2 right-2 px-2 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm shadow ${eggStatusStyle[egg.availability] ?? "bg-forest text-cream"}`}>
                      {egg.availability}
                    </span>
                  </div>

                  <div className="px-1 pt-4 pb-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <h3 className="font-serif text-xl font-medium text-forest leading-tight">{egg.name}</h3>
                      <span className="font-telugu text-base text-amber-farm">{egg.telugu_name}</span>
                    </div>
                    <p className="text-xs text-forest/60 mt-2 leading-relaxed">{egg.description}</p>

                    <div className="mt-5 pt-4 border-t border-forest/10">
                      <Link
                        href="/book-visit"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-sm text-xs uppercase tracking-widest font-semibold bg-forest text-cream hover:bg-forest-deep transition-all"
                      >
                        Book a Visit <ArrowUpRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
