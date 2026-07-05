import type { Chicken } from "@/types";

// Exact breeds from the Lovable design — shown when API is unreachable.
export const SAMPLE_CHICKENS: Chicken[] = [
  {
    id: 1,
    breed_name: "Aseel",
    description: "The heritage fighter breed, prized for its firm, flavorful meat and traditional Andhra taste.",
    min_weight_kg: 1.5, max_weight_kg: 2.8, price_per_kg: 540, age_months: 8,
    status: "available", is_featured: true,
    cover_image: "/bird-aseel.jpg",
    images: [],
  },
  {
    id: 2,
    breed_name: "Kadaknath",
    description: "Rare black-meat breed known for its medicinal value and iron-rich, low-fat profile.",
    min_weight_kg: 1.2, max_weight_kg: 1.8, price_per_kg: 820, age_months: 10,
    status: "reserved", is_featured: true,
    cover_image: "/bird-kadaknath.jpg",
    images: [],
  },
  {
    id: 3,
    breed_name: "Sonali Cross",
    description: "Free-range golden hen raised on grain, greens and open pasture. A weekday favourite.",
    min_weight_kg: 1.4, max_weight_kg: 2.2, price_per_kg: 480, age_months: 7,
    status: "available", is_featured: false,
    cover_image: "/bird-sonali.jpg",
    images: [],
  },
  {
    id: 4,
    breed_name: "Ghyas Desi",
    description: "A hardy village-mix bird, foraged in mango orchards for a clean, layered flavour.",
    min_weight_kg: 1.2, max_weight_kg: 1.6, price_per_kg: 460, age_months: 9,
    status: "available", is_featured: false,
    cover_image: "/bird-ghyas.jpg",
    images: [],
  },
];

export const TELUGU_NAMES: Record<string, string> = {
  "Aseel": "అసీల్",
  "Kadaknath": "కడక్‌నాథ్",
  "Sonali Cross": "సోనాలి",
  "Ghyas Desi": "ఘ్యాస్",
};
