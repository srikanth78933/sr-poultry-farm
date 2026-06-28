import type { Chicken } from "@/types";

// Fallback shown if the API is unreachable, so the site still looks complete.
export const SAMPLE_CHICKENS: Chicken[] = [
  {
    id: 1, breed_name: "Naati Kodi Premium",
    description: "Free-roaming country chicken raised on natural grains and open pasture. Firm, flavourful meat prized for traditional cooking.",
    min_weight_kg: 1.2, max_weight_kg: 1.5, price_per_kg: 480, age_months: 7,
    status: "available", is_featured: true,
    cover_image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&auto=format&q=80",
    images: [],
  },
  {
    id: 2, breed_name: "Naati Kodi Classic",
    description: "Traditionally reared desi hen, open-garden farmed with fresh water and zero growth hormones.",
    min_weight_kg: 1.0, max_weight_kg: 1.3, price_per_kg: 440, age_months: 6,
    status: "available", is_featured: true,
    cover_image: "https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=800&auto=format&q=80",
    images: [],
  },
  {
    id: 3, breed_name: "Country Rooster (Poonga)",
    description: "Mature free-range rooster with rich, dense meat. Slow-grown in an open environment for authentic naati flavour.",
    min_weight_kg: 1.6, max_weight_kg: 2.2, price_per_kg: 520, age_months: 9,
    status: "available", is_featured: false,
    cover_image: "https://images.unsplash.com/photo-1569396116180-210c182bedb8?w=800&auto=format&q=80",
    images: [],
  },
  {
    id: 4, breed_name: "Young Naati Pullet",
    description: "Tender young hen, naturally fed and pasture-raised. Lighter, softer meat suitable for fry and pepper preparations.",
    min_weight_kg: 0.8, max_weight_kg: 1.1, price_per_kg: 420, age_months: 5,
    status: "available", is_featured: false,
    cover_image: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?w=800&auto=format&q=80",
    images: [],
  },
];
