import type { Metadata } from "next";
import { absoluteUrl, pages, siteConfig, type SitePage } from "@/lib/site";

type BuildOpts = {
  path?: string;
  title?: string;
  description?: string;
  absoluteTitle?: boolean;
  noIndex?: boolean;
  ogImage?: string;
};

export function buildMetadata(pageKey: keyof typeof pages, opts: BuildOpts = {}): Metadata {
  const page: SitePage = pages[pageKey];
  const title = opts.title ?? page.title;
  const description = opts.description ?? page.description;
  const path = opts.path ?? page.path;
  const url = absoluteUrl(path);
  const image = absoluteUrl(opts.ogImage ?? siteConfig.defaultOgImage);
  const absolute = opts.absoluteTitle ?? page.absoluteTitle;

  return {
    title: absolute ? { absolute: title } : title,
    description,
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.legalName,
    keywords: [
      "capability readiness",
      "ECRA",
      "Development Action Plan",
      "IT services",
      "BFSI",
      "organizational capability",
      "workforce assessment",
      "OLL",
      "Organization Learning Labs",
    ],
    category: "business",
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/og-default.svg"),
    telephone: siteConfig.phone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    inLanguage: "en",
  };
}

export function webPageJsonLd(pageKey: keyof typeof pages, opts: BuildOpts = {}) {
  const page = pages[pageKey];
  const title = opts.title ?? page.title;
  const description = opts.description ?? page.description;
  const path = opts.path ?? page.path;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "en",
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
