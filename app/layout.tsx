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
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
  other: {
    "geo.region": "IN-KA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F5F7FA",
  colorScheme: "only light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${satoshi.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll-reveal hidden states only apply once JS is known to run; if the
            observer never mounts, `reveal-all` shows everything as a safety net. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(d){d.classList.add('js');addEventListener('load',function(){setTimeout(function(){if(!d.classList.contains('motion-on'))d.classList.add('reveal-all')},3000)})})(document.documentElement)",
          }}
        />
      </head>
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
