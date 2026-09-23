/**
 * Site-wide configuration. Point NEXT_PUBLIC_SITE_URL at production when deploying.
 * Content helpers are async so they can later swap to REST APIs without changing pages.
 */

export const siteConfig = {
  name: "The Organization Learning Labs",
  shortName: "OLL",
  legalName: "The Organization Learning Labs LLP",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  locale: "en_IN",
  phone: "+91 76766 46518",
  email: {
    privacy: "privacy@ollacademy.com",
    legal: "legal@ollacademy.com",
  },
  social: {
    // Add profiles when available for sameAs / Open Graph
  },
  platform: {
    signup: "https://platform.ollacademy.com/signup",
    signin: "https://platform.ollacademy.com/",
  },
  research: "https://research.ollacademy.com/research?type=internal",
  defaultOgImage: "/og-default.svg",
} as const;

export type SitePage = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
};

export const pages: Record<string, SitePage> = {
  home: {
    path: "/",
    title: "OLL — Capability readiness for technology and BFSI enterprises",
    description:
      "AI broke the business model in IT services and the risk model in banking. OLL assesses whether your organization has the capabilities to make the shift.",
    absoluteTitle: true,
  },
  about: {
    path: "/about",
    title: "About OLL — The Organization Learning Labs",
    description:
      "How OLL connects future requirements to organizational capabilities, role competencies and individual readiness.",
    absoluteTitle: true,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy policy — OLL",
    description:
      "How OLL collects, uses, shares and protects information across the platform, assessments and research library.",
    absoluteTitle: true,
  },
  terms: {
    path: "/terms",
    title: "Terms and conditions — OLL",
    description:
      "The agreement between you and OLL for use of the website, platform, research library and assessments.",
    absoluteTitle: true,
  },
};

export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${p}`;
}
