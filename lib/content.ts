/**
 * Server-side content loaders.
 * Marketplace card sections load from GET /content/marketplace with local fallback.
 */

import {
  ART_BASE,
  BAND,
  COMPS,
  HERO_IMAGES,
  IND,
  RESEARCH,
  TARGET,
  VISIBLE_COMPS,
  type CardItem,
  type CaseStudy,
  type IndustryKey,
} from "@/data/home";
import { fetchHomeMarketplaceSection } from "@/lib/marketplace";

export type ContentSource = "live" | "fallback";

export type HomeContent = {
  industry: IndustryKey;
  artBase: typeof ART_BASE;
  industries: typeof IND;
  practices: Record<IndustryKey, CardItem[]>;
  research: Record<IndustryKey | "all", CardItem[]>;
  cases: Record<IndustryKey, CaseStudy[]>;
  comps: typeof COMPS;
  band: typeof BAND;
  target: typeof TARGET;
  visibleComps: typeof VISIBLE_COMPS;
  heroImages: typeof HERO_IMAGES;
  contentSource: {
    research: Record<IndustryKey, ContentSource>;
    practices: Record<IndustryKey, ContentSource>;
    cases: Record<IndustryKey, ContentSource>;
  };
};

const INDUSTRY_KEYS: IndustryKey[] = ["it", "bfsi"];

function normalizeIndustry(value?: string | string[]): IndustryKey {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "bfsi" ? "bfsi" : "it";
}

async function loadMarketplaceForIndustry(industry: IndustryKey) {
  const [researchRes, practicesRes, casesRes] = await Promise.all([
    fetchHomeMarketplaceSection(industry, "research_synopsis", 3),
    fetchHomeMarketplaceSection(industry, "best_practice", 3),
    fetchHomeMarketplaceSection(industry, "case_study", 3),
  ]);

  return {
    research: researchRes.live
      ? (researchRes.items as CardItem[])
      : (RESEARCH[industry] ?? RESEARCH.all).slice(0, 3),
    researchSource: researchRes.live ? ("live" as const) : ("fallback" as const),
    practices: practicesRes.live ? (practicesRes.items as CardItem[]) : [],
    practicesSource: practicesRes.live ? ("live" as const) : ("fallback" as const),
    cases: casesRes.live ? (casesRes.items as CaseStudy[]) : [],
    casesSource: casesRes.live ? ("live" as const) : ("fallback" as const),
  };
}

/** Load homepage marketing content for SSR. */
export async function getHomeContent(industryParam?: string | string[]): Promise<HomeContent> {
  const industry = normalizeIndustry(industryParam);

  const loaded = await Promise.all(
    INDUSTRY_KEYS.map(async (key) => ({
      key,
      ...(await loadMarketplaceForIndustry(key)),
    }))
  );

  const research: Record<IndustryKey, CardItem[]> = { it: [], bfsi: [] };
  const practices: Record<IndustryKey, CardItem[]> = { it: [], bfsi: [] };
  const cases: Record<IndustryKey, CaseStudy[]> = { it: [], bfsi: [] };
  const contentSource = {
    research: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
    practices: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
    cases: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
  };

  for (const row of loaded) {
    research[row.key] = row.research;
    practices[row.key] = row.practices;
    cases[row.key] = row.cases;
    contentSource.research[row.key] = row.researchSource;
    contentSource.practices[row.key] = row.practicesSource;
    contentSource.cases[row.key] = row.casesSource;
  }

  return {
    industry,
    artBase: ART_BASE,
    industries: IND,
    practices,
    research: { ...research, all: research.it.length ? research.it : RESEARCH.all },
    cases,
    comps: COMPS,
    band: BAND,
    target: TARGET,
    visibleComps: VISIBLE_COMPS,
    heroImages: HERO_IMAGES,
    contentSource,
  };
}

export { normalizeIndustry };
