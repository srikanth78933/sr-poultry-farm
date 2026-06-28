import type { Metadata } from "next";
import Link from "next/link";
import { Eye, CalendarCheck, MapPin, Hand, Scale, ReceiptText, Wallet, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "How to Buy",
  description: "How buying naturally raised Naati Kodi works at SR Naati Kodi Farms — visit, choose, weigh, pay.",
};

const steps = [
  { icon: Eye, title: "View Available Birds", desc: "Browse our current flock online with weights, age and price per kg." },
  { icon: CalendarCheck, title: "Book a Farm Visit", desc: "Pick a date and time slot. We confirm your booking and reserve your slot." },
  { icon: MapPin, title: "Visit the Farm", desc: "Come and see the birds in their natural, free-roaming environment." },
  { icon: Hand, title: "Select Your Chicken", desc: "Choose the exact bird you want, in person." },
  { icon: Scale, title: "Live Weighing", desc: "We weigh your selected bird in front of you for full transparency." },
  { icon: ReceiptText, title: "Final Bill", desc: "Total = actual weight × price per kg. No hidden charges." },
  { icon: Wallet, title: "Pay & Take Home", desc: "Pay by cash or UPI and take home your fresh country chicken." },
];

export default function PurchasePage() {
  return (
    <section className="container-x py-16">
      <Reveal className="mb-12 text-center">
        <span className="eyebrow">The Purchase Flow</span>
        <h1 className="section-title mt-2 text-4xl sm:text-5xl">How to Buy Our Naati Kodi</h1>
        <p className="mx-auto mt-3 max-w-2xl text-stone-500">
          We believe in honesty and transparency. That is why we sell only after you visit —
          so you choose your bird and see it weighed live before you pay.
        </p>
      </Reveal>

      <div className="relative mx-auto max-w-3xl">
        <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-farm-green/20 sm:block" />
        <div className="space-y-5">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <div className="relative flex items-start gap-5 rounded-3xl bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-farm-green text-white shadow-lg">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-farm-leaf">Step {i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-farm-greenDark">{s.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/book-visit" className="btn-primary">
          Start by booking a visit <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
