import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SR Poultry Farm — Natural Naati Kodi Raised Naturally",
    template: "%s · SR Poultry Farm",
  },
  description:
    "SR Poultry Farm raises natural Naati Kodi (country chicken) — free roaming, traditionally fed, farm fresh. Explore available birds, book a farm visit, and buy after you visit.",
  keywords: ["Naati Kodi", "country chicken", "natural poultry", "farm fresh chicken", "SR Poultry Farm", "desi kodi"],
  openGraph: {
    title: "SR Poultry Farm — Natural Naati Kodi",
    description: "Healthy • Traditional • Farm Fresh country chicken, raised naturally.",
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
      <body>{children}</body>
    </html>
  );
}
