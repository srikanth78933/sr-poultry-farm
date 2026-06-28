import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "SR Naati Kodi Farms — Village Taste to Your Home",
    template: "%s · SR Naati Kodi Farms",
  },
  description:
    "SR Naati Kodi Farms — authentic country chicken raised naturally on open pasture in Andhra Pradesh. Free roaming, traditionally fed, farm fresh. Book a farm visit today.",
  keywords: ["Naati Kodi", "country chicken", "natural poultry", "SR Naati Kodi Farms", "desi kodi", "Andhra Pradesh chicken", "village chicken"],
  openGraph: {
    title: "SR Naati Kodi Farms — Village Taste to Your Home",
    description: "Pure Taste. Natural Farming. Authentic Naati Kodi from Andhra Pradesh.",
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
