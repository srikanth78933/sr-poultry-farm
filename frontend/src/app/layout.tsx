import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "SR Natu Kodi Farms — Village Taste to Your Home",
    template: "%s · SR Natu Kodi Farms",
  },
  description:
    "SR Natu Kodi Farms — authentic country chicken raised naturally on open pasture in Andhra Pradesh. Free roaming, traditionally fed, farm fresh. Book a farm visit today.",
  keywords: ["Natu Kodi", "country chicken", "natural poultry", "SR Natu Kodi Farms", "desi kodi", "Andhra Pradesh chicken", "village chicken"],
  openGraph: {
    title: "SR Natu Kodi Farms — Village Taste to Your Home",
    description: "Pure Taste. Natural Farming. Authentic Natu Kodi from Andhra Pradesh.",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#166534",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
