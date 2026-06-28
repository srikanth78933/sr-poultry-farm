import Link from "next/link";
import { Egg, Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 bg-farm-greenDark text-farm-sand">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-farm-gold text-farm-earth">
              <Egg className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold text-white">SR Poultry Farm</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-farm-sand/80">
            Naturally raised Naati Kodi (country chicken) — free roaming, traditionally fed,
            and farm fresh. Visit our farm, pick your bird, and take home authentic taste.
          </p>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-farm-sand/80">
            <li><Link href="/chickens" className="hover:text-white">Available Naati Kodi</Link></li>
            <li><Link href="/about" className="hover:text-white">Our Farm</Link></li>
            <li><Link href="/purchase" className="hover:text-white">How to Buy</Link></li>
            <li><Link href="/book-visit" className="hover:text-white">Book a Visit</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Admin Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold text-white">Reach Us</h4>
          <ul className="mt-4 space-y-3 text-sm text-farm-sand/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 90000 00000</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@srpoultryfarm.com</li>
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4" /> SR Poultry Farm, Village Road, Telangana, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-farm-sand/60">
        © {new Date().getFullYear()} SR Poultry Farm. Raised Naturally · Healthy · Traditional · Farm Fresh.
      </div>
    </footer>
  );
}
