/**
 * Site-wide configuration. Point NEXT_PUBLIC_SITE_URL at production when deploying.
 * Content helpers are async so they can later swap to REST APIs without changing pages.
 */

export const siteConfig = {
  name: "The Organization Learning Labs",
  shortName: "OLL",
  legalName: "The Organization Learning Labs LLP",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://theorganizationlearninglabs.com",
  /** Only this host may be indexed; any other host (Railway, previews, localhost) is kept out of search. */
  productionHost: "theorganizationlearninglabs.com",
  locale: "en_IN",
  phone: "+91 76766 46518",
  email: {
    privacy: "privacy@ollacademy.com",
    legal: "legal@ollacademy.com",
    contact: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@ollacademy.com",
  },
  social: {
    // Add profiles when available for sameAs / Open Graph
  },
  platform: {
    signup: "https://platform.ollacademy.com/signup",
    signin: "https://platform.ollacademy.com/",
  },
  research: "https://research.ollacademy.com/research?type=internal",
  defaultOgImage: "/opengraph-image",
  logo: "/icon",
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
    title: "OLL | Capability readiness for technology and retail banking enterprises",
    description:
      "AI broke the business model in IT services and the risk model in banking. OLL assesses whether your organization has the capabilities to make the shift.",
    absoluteTitle: true,
  },
  about: {
    path: "/about",
    title: "About OLL | The Organization Learning Labs",
    description:
      "OLL builds a research-led enterprise capability transformation platform, connecting research, competence blueprints, ECRA and reinvention.",
    absoluteTitle: true,
  },
  aboutPurpose: {
    path: "/about/our-purpose",
    title: "Our purpose: Why capability readiness matters | OLL",
    description:
      "Why future performance depends on capabilities developed today, and how OLL helps enterprises move from adapting to change to continuously evolving.",
    absoluteTitle: true,
  },
  aboutValues: {
    path: "/about/our-values",
    title: "Our values and pillars | OLL",
    description:
      "The values behind OLL's research and frameworks, and the pillars that shape how we work and what we commit to.",
    absoluteTitle: true,
  },
  aboutApproach: {
    path: "/about/our-approach",
    title: "Our research-to-readiness approach | OLL",
    description:
      "How OLL moves from understanding disruption to future capability architecture, the Competence Blueprint and enterprise readiness.",
    absoluteTitle: true,
  },
  ecra: {
    path: "/ecra",
    title: "ECRA: Enterprise Capability Readiness Assessment | OLL",
    description:
      "How the Enterprise Capability Readiness Assessment examines readiness at enterprise, business unit, function and role level, and how enterprise capability relates to individual competence.",
    absoluteTitle: true,
  },
  ecraEnterprise: {
    path: "/ecra/enterprise",
    title: "Enterprise readiness assessment | ECRA | OLL",
    description:
      "Assess whether the enterprise possesses, or can develop, the organizational capabilities required to execute its future strategy and operating model.",
    absoluteTitle: true,
  },
  ecraBusinessUnit: {
    path: "/ecra/business-unit",
    title: "Business unit readiness assessment | ECRA | OLL",
    description:
      "Assess whether a business unit or organizational entity can deliver its assigned future business outcomes and contribute to enterprise strategy.",
    absoluteTitle: true,
  },
  ecraFunction: {
    path: "/ecra/function-capability-area",
    title: "Function and capability area assessment | ECRA | OLL",
    description:
      "Examine the maturity and readiness of a specific function, capability group or strategic transformation area on a five-level scale.",
    absoluteTitle: true,
  },
  ecraRoles: {
    path: "/ecra/leaders-roles",
    title: "Leaders and roles assessment | ECRA | OLL",
    description:
      "Examine whether teams and individuals possess the competence, behaviours and practical ability required to perform future roles.",
    absoluteTitle: true,
  },
  aboutResponsible: {
    path: "/about/responsible-assessment",
    title: "Responsible assessment | OLL",
    description:
      "OLL's commitment to responsible assessment: building trust through clarity, context and the responsible use of capability insights.",
    absoluteTitle: true,
  },
  competenceBlueprint: {
    path: "/competence-blueprint",
    title: "Competence Blueprint | OLL",
    description:
      "The OLL Competence Blueprint connects future organization archetypes to capabilities, role-based competence and transformation action.",
    absoluteTitle: true,
  },
  contact: {
    path: "/contact",
    title: "Contact us | OLL",
    description:
      "Talk to OLL about an enterprise, business unit or leadership readiness assessment, or a research partnership.",
    absoluteTitle: true,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy policy | OLL",
    description:
      "How OLL collects, uses, shares and protects information across the platform, assessments and research library.",
    absoluteTitle: true,
  },
  terms: {
    path: "/terms",
    title: "Terms and conditions | OLL",
    description:
      "The agreement between you and OLL for use of the website, platform, research library and assessments.",
    absoluteTitle: true,
  },
};

export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${p}`;
}
