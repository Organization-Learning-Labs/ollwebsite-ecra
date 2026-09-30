/**
 * Server-side content loaders.
 * Marketplace sections load from case-studies, best-practices, and blogs preview APIs.
 */

import {
  FAQS,
  HERO_IMAGES,
  IND,
  OLL_STATEMENT,
  type CardItem,
  type CaseStudy,
  type IndustryKey,
} from "@/data/home";
import {
  fetchFreeBestPractices,
  fetchFreeCaseStudies,
  fetchResearchPreview,
  partitionBestPracticesByIndustry,
  partitionResearchByIndustry,
  pickCaseStudiesForIndustry,
} from "@/lib/marketplace";

export type ContentSource = "live" | "fallback";

export type HomeContent = {
  industry: IndustryKey;
  industries: typeof IND;
  statement: typeof OLL_STATEMENT;
  faqs: typeof FAQS;
  practices: Record<IndustryKey, CardItem[]>;
  research: Record<IndustryKey | "all", CardItem[]>;
  cases: Record<IndustryKey, CaseStudy[]>;
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

function buildIndustryContent(
  key: IndustryKey,
  live: {
    freeCaseStudies: Awaited<ReturnType<typeof fetchFreeCaseStudies>>;
    researchPreview: Awaited<ReturnType<typeof fetchResearchPreview>>;
    bestPractices: Awaited<ReturnType<typeof fetchFreeBestPractices>>;
  } | null
) {
  if (!live) {
    return {
      research: [] as CardItem[],
      researchSource: "fallback" as const,
      practices: [] as CardItem[],
      practicesSource: "fallback" as const,
      cases: [] as CaseStudy[],
      casesSource: "fallback" as const,
    };
  }

  return {
    research: partitionResearchByIndustry(live.researchPreview, key, 9),
    researchSource: "live" as const,
    practices: partitionBestPracticesByIndustry(live.bestPractices, key, 9),
    practicesSource: "live" as const,
    cases: pickCaseStudiesForIndustry(live.freeCaseStudies, key, 3),
    casesSource: "live" as const,
  };
}

/** Load homepage marketing content for SSR. */
export async function getHomeContent(industryParam?: string | string[]): Promise<HomeContent> {
  const industry = normalizeIndustry(industryParam);

  let live: {
    freeCaseStudies: Awaited<ReturnType<typeof fetchFreeCaseStudies>>;
    researchPreview: Awaited<ReturnType<typeof fetchResearchPreview>>;
    bestPractices: Awaited<ReturnType<typeof fetchFreeBestPractices>>;
  } | null = null;

  try {
    const [freeCaseStudies, researchPreview, bestPractices] = await Promise.all([
      fetchFreeCaseStudies(),
      fetchResearchPreview(),
      fetchFreeBestPractices(),
    ]);
    live = { freeCaseStudies, researchPreview, bestPractices };
  } catch {
    live = null;
  }

  const research: Record<IndustryKey, CardItem[]> = { it: [], bfsi: [] };
  const practices: Record<IndustryKey, CardItem[]> = { it: [], bfsi: [] };
  const cases: Record<IndustryKey, CaseStudy[]> = { it: [], bfsi: [] };
  const contentSource = {
    research: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
    practices: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
    cases: { it: "fallback" as ContentSource, bfsi: "fallback" as ContentSource },
  };

  for (const key of INDUSTRY_KEYS) {
    const row = buildIndustryContent(key, live);
    research[key] = row.research;
    practices[key] = row.practices;
    cases[key] = row.cases;
    contentSource.research[key] = row.researchSource;
    contentSource.practices[key] = row.practicesSource;
    contentSource.cases[key] = row.casesSource;
  }

  return {
    industry,
    industries: IND,
    statement: OLL_STATEMENT,
    faqs: FAQS,
    practices,
    research: {
      ...research,
      all: [...research.it, ...research.bfsi].filter(
        (item, index, arr) => arr.findIndex((x) => x.u === item.u) === index
      ),
    },
    cases,
    heroImages: HERO_IMAGES,
    contentSource,
  };
}

export { normalizeIndustry };
