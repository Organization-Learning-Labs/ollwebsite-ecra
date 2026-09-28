import type { LevelSlug } from "@/data/ecra";

const PATHS: Record<LevelSlug, React.ReactNode> = {
  enterprise: (
    <>
      <path d="M4 21V8l8-5 8 5v13" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01" />
      <path d="M2 21h20" />
    </>
  ),
  "business-unit": (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M11 12v2h2v-2" />
    </>
  ),
  "function-capability-area": (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </>
  ),
  "leaders-roles": (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M17.5 4.5l.9 1.9 2.1.3-1.5 1.5.4 2.1-1.9-1-1.9 1 .4-2.1-1.5-1.5 2.1-.3z" />
      <path d="M16 14.5a5 5 0 0 1 5 5.5" />
    </>
  ),
};

export function LevelIcon({ slug, className = "lv-icon" }: { slug: LevelSlug; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 24 24">{PATHS[slug]}</svg>
    </span>
  );
}
