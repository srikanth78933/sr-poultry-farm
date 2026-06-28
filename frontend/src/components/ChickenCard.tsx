import Link from "next/link";
import { Scale, CalendarClock } from "lucide-react";
import type { Chicken } from "@/types";
import { mediaUrl } from "@/lib/api";
import StatusBadge from "./StatusBadge";

export default function ChickenCard({ c }: { c: Chicken }) {
  return (
    <div className="card group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-lime-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mediaUrl(c.cover_image)}
          alt={c.breed_name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3"><StatusBadge status={c.status} /></div>
        {c.is_featured && (
          <span className="absolute right-3 top-3 chip bg-farm-gold/90 text-farm-earth">★ Premium</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-bold text-farm-greenDark">{c.breed_name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-stone-500">{c.description}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-600">
          <span className="inline-flex items-center gap-1.5">
            <Scale className="h-4 w-4 text-farm-leaf" />
            {Number(c.min_weight_kg)}–{Number(c.max_weight_kg)} KG
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="h-4 w-4 text-farm-leaf" />
            {c.age_months} months
          </span>
        </div>
        <div className="mt-5 flex items-end justify-between border-t border-stone-100 pt-4">
          <div>
            <span className="text-2xl font-bold text-farm-green">₹{Number(c.price_per_kg)}</span>
            <span className="text-sm text-stone-400"> / KG</span>
          </div>
          <Link href="/book-visit" className="btn-outline px-4 py-2 text-sm">Book Visit</Link>
        </div>
      </div>
    </div>
  );
}
