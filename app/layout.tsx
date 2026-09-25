import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import "./globals.css";
import "./oll-bot.css";
import JsonLd from "@/components/JsonLd";
import { SiteChrome } from "@/components/SiteChrome";
import { OllieBotProvider } from "@/components/oll-bot/OllieBotContext";
import { buildMetadata, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata("home"),
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  other: {
    "geo.region": "IN-KA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0C1626" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} ${newsreader.variable}`}>
      {/* Extensions such as Grammarly add attributes to body before hydration. */}
      <body suppressHydrationWarning>
        <OllieBotProvider>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <SiteChrome>{children}</SiteChrome>
        </OllieBotProvider>
      </body>
    </html>
  );
}
