import type { Metadata } from "next";
import ChickenGrid from "@/components/ChickenGrid";

export const metadata: Metadata = {
  title: "Available Naati Kodi",
  description: "Browse all naturally raised country chickens available at SR Naati Kodi Farms.",
};

export default function ChickensPage() {
  return (
    <section className="container-x py-16">
      <div className="mb-10 text-center reveal">
        <span className="eyebrow">The Flock</span>
        <h1 className="section-title mt-2 text-4xl sm:text-5xl">Available Naati Kodi</h1>
        <p className="mx-auto mt-3 max-w-2xl text-stone-500">
          All birds are raised naturally and priced per kilogram. You select your bird and we weigh it
          live during your farm visit — you pay only for the actual weight.
        </p>
      </div>
      <ChickenGrid />
    </section>
  );
}
