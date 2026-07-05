import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Chicken } from "@/types";
import { mediaUrl } from "@/lib/api";
import { TELUGU_NAMES } from "@/lib/sampleData";

const statusStyle: Record<string, string> = {
  available: "bg-forest text-cream",
  reserved:  "bg-amber-farm text-cream",
  sold:      "bg-forest/20 text-forest/60",
};

export default function ChickenCard({ c }: { c: Chicken }) {
  const disabled = c.status !== "available";
  const imgSrc = c.cover_image?.startsWith("/") ? c.cover_image : mediaUrl(c.cover_image);

  return (
    <article className="group relative">
      <div className="absolute inset-0 kraft-noise opacity-40 rounded-lg pointer-events-none" />
      <div className="relative bg-kraft/50 border border-forest/10 rounded-lg p-3 shadow-craft transition-all hover:shadow-lift hover:-translate-y-0.5">
        <div className="relative overflow-hidden rounded-md aspect-square bg-forest/5 ring-1 ring-forest/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={c.breed_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {c.is_featured && (
            <span className="absolute top-3 left-3 bg-cream text-forest px-2 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm shadow-craft">
              Featured
            </span>
          )}
          <span className={`absolute top-3 right-3 px-2 py-1 text-[9px] uppercase tracking-widest font-bold rounded-sm ${statusStyle[c.status] ?? "bg-forest/20 text-forest/60"}`}>
            {c.status}
          </span>
        </div>

        <div className="px-1 pt-4 pb-1">
          <div className="flex justify-between items-baseline gap-2">
            <h3 className="font-serif text-xl font-medium text-forest leading-tight">{c.breed_name}</h3>
            {TELUGU_NAMES[c.breed_name] && (
              <span className="font-telugu text-base text-amber-farm">{TELUGU_NAMES[c.breed_name]}</span>
            )}
          </div>
          <p className="text-xs text-forest/60 mt-2 leading-relaxed line-clamp-2">{c.description}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            <dt className="text-forest/45 uppercase tracking-widest text-[10px]">Weight</dt>
            <dd className="text-forest text-right font-medium">{Number(c.min_weight_kg)}–{Number(c.max_weight_kg)} kg</dd>
            <dt className="text-forest/45 uppercase tracking-widest text-[10px]">Age</dt>
            <dd className="text-forest text-right font-medium">{c.age_months} months</dd>
          </dl>

          <div className="mt-5 pt-4 border-t border-forest/10 flex items-center justify-between">
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
