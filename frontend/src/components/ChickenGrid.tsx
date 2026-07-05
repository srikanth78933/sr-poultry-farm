"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { SAMPLE_CHICKENS } from "@/lib/sampleData";
import type { Chicken } from "@/types";
import ChickenCard from "./ChickenCard";

export default function ChickenGrid({ featuredOnly = false }: { featuredOnly?: boolean }) {
  const [items, setItems] = useState<Chicken[] | null>(null);

  useEffect(() => {
    const q = featuredOnly ? "?featured=true" : "";
    api<Chicken[]>(`/chickens${q}`)
      .then((data) => setItems(data.length ? data : SAMPLE_CHICKENS))
      .catch(() => setItems(SAMPLE_CHICKENS.filter((c) => (featuredOnly ? c.is_featured : true))));
  }, [featuredOnly]);

  if (items === null) {
    return (
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card h-80 animate-pulse bg-kraft/40" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <p className="text-center text-stone-500">No birds available right now. Please check back soon.</p>;
  }

  return (
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <ChickenCard key={c.id} c={c} />
      ))}
    </div>
  );
}
