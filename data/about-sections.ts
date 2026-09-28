/** Ordered pages in the About section - drives the header menu, hub tiles, section nav and next links. */

import { photos, type SitePhoto } from "@/lib/photos";

export type AboutSectionSlug =
  | "our-purpose"
  | "our-values"
  | "our-approach"
  | "responsible-assessment";

export type AboutSection = {
  slug: AboutSectionSlug;
  href: `/about/${AboutSectionSlug}`;
  title: string;
  summary: string;
  photo: SitePhoto;
};

export const aboutSections: readonly AboutSection[] = [
  {
    slug: "our-purpose",
    href: "/about/our-purpose",
    title: "Our purpose",
    summary: "Why capability readiness matters, and how enterprises move from adapting to change to continuously evolving.",
    photo: photos.purpose,
  },
  {
    slug: "our-values",
    href: "/about/our-values",
    title: "Our values",
    summary: "The principles behind our research and the pillars that shape how we work and what we commit to.",
    photo: photos.values,
  },
  {
    slug: "our-approach",
    href: "/about/our-approach",
    title: "Our approach",
    summary: "From understanding disruption to designing future capabilities and the Competence Blueprint.",
    photo: photos.approach,
  },
  {
    slug: "responsible-assessment",
    href: "/about/responsible-assessment",
    title: "Responsible assessment",
    summary: "Building trust through clarity, context and the responsible use of assessment insights.",
    photo: photos.responsible,
  },
];

export const assessmentLink = {
  href: "/ecra",
  title: "Our Assessment (ECRA)",
  summary: "The Enterprise Capability Readiness Assessment, at enterprise, business unit, function and role level.",
  photo: photos.ecra as SitePhoto,
} as const;

export const blueprintLink = {
  href: "/competence-blueprint",
  title: "Competence Blueprint",
  summary: "How future organization archetypes connect to capabilities, role-based competence and transformation action.",
  photo: photos.blueprint as SitePhoto,
} as const;

export function aboutSection(slug: AboutSectionSlug): AboutSection {
  const found = aboutSections.find((s) => s.slug === slug);
  if (!found) throw new Error(`Unknown about section: ${slug}`);
  return found;
}

export function nextAboutSection(slug: AboutSectionSlug): AboutSection | null {
  const i = aboutSections.findIndex((s) => s.slug === slug);
  return i >= 0 && i < aboutSections.length - 1 ? aboutSections[i + 1] : null;
}
