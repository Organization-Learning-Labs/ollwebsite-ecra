/**
 * Server-side content loaders.
 * Today these read local data modules; later they can fetch REST APIs
 * (e.g. process.env.OLL_API_BASE_URL) without changing page components.
 */

import {
  ART_BASE,
  BAND,
  CASES,
  COMPS,
  HERO_IMAGES,
  IND,
  PRACTICES,
  RESEARCH,
  TARGET,
  VISIBLE_COMPS,
  type IndustryKey,
} from "@/data/home";

export type HomeContent = {
  industry: IndustryKey;
  artBase: typeof ART_BASE;
  industries: typeof IND;
  practices: typeof PRACTICES;
  research: typeof RESEARCH;
  cases: typeof CASES;
  comps: typeof COMPS;
  band: typeof BAND;
  target: typeof TARGET;
  visibleComps: typeof VISIBLE_COMPS;
  heroImages: typeof HERO_IMAGES;
};

function normalizeIndustry(value?: string | string[]): IndustryKey {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "bfsi" ? "bfsi" : "it";
}

/** Load homepage marketing content for SSR. Swap internals for REST when ready. */
export async function getHomeContent(industryParam?: string | string[]): Promise<HomeContent> {
  // Future: const res = await fetch(`${process.env.OLL_API_BASE_URL}/home?industry=...`, { next: { revalidate: 60 } })
  const industry = normalizeIndustry(industryParam);
  return {
    industry,
    artBase: ART_BASE,
    industries: IND,
    practices: PRACTICES,
    research: RESEARCH,
    cases: CASES,
    comps: COMPS,
    band: BAND,
    target: TARGET,
    visibleComps: VISIBLE_COMPS,
    heroImages: HERO_IMAGES,
  };
}

export { normalizeIndustry };
