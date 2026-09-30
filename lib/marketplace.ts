/**
 * Server-side client for homepage marketplace content.
 * Case studies and best practices: dedicated fetch endpoints with is_free filter.
 * Research: GET /blogs/fetch/preview, filtered by industry on the server.
 */

import type { CardItem, CaseStudy, IndustryKey } from "@/data/home";
import { getPilotApiBaseUrl } from "@/lib/oll-bot/pilot-api";

export type MarketplaceContentType =
  | "research_synopsis"
  | "best_practice"
  | "case_study";

export const MARKETPLACE_INDUSTRY: Record<IndustryKey, string> = {
  it: "Information Technology",
  bfsi: "Banking, Financial Service And Insurance",
};

const PLATFORM_SITE =
  process.env.NEXT_PUBLIC_PLATFORM_SITE_URL?.replace(/\/$/, "") ||
  "https://platform.ollacademy.com";

/** Main OLL Academy marketplace landing (assessments, research, best practices). */
export function platformMarketplaceUrl(): string {
  return `${PLATFORM_SITE}/marketplace`;
}

const RESEARCH_SITE =
  process.env.NEXT_PUBLIC_RESEARCH_SITE_URL?.replace(/\/$/, "") ||
  "https://research.ollacademy.com";

type ImageSet = {
  featured_image?: string;
  square_image?: string;
  portrait_image?: string;
  other_images?: string[];
};

type RawContentItem = {
  id?: string;
  title?: string;
  description?: string;
  slug?: string;
  url?: string;
  industry?: string;
  category?: string;
  sub_industry?: string;
  content_type?: string;
  banner_image?: string;
  images?: ImageSet;
  images_res?: ImageSet;
  author?: Array<{ name?: string }> | { name?: string } | string;
  created_at?: string;
  created_by?: string;
  created_by_name?: string;
  publication_date?: string;
  is_free?: boolean;
  is_published?: boolean;
  metrics?: Array<{ value?: string; label?: string }>;
  outcomes?: Array<{ value?: string; label?: string }>;
};

const FREE_MARKETPLACE_PARAMS = { is_free: "true" } as const;

type RawBlogPreview = {
  blog_id?: string;
  industry?: string;
  published_at?: string;
  description?: string;
  slug?: string;
  research_synopsis?: {
    research_title?: string;
    short_description?: string;
    images?: ImageSet;
    authors?: Array<{ name?: string }> | null;
  };
};

function slugifyTitle(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function resolveAuthor(raw: RawContentItem["author"]): string {
  if (!raw) return "Organization Learning Labs";
  if (typeof raw === "string" && raw.trim()) return raw.trim();
  if (Array.isArray(raw)) {
    const name = raw[0]?.name?.trim();
    if (name) return name;
  }
  if (typeof raw === "object" && "name" in raw && raw.name?.trim()) {
    return raw.name.trim();
  }
  return "Organization Learning Labs";
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncate(text: string, max = 220): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function bannerUrl(item: RawContentItem): string | undefined {
  const candidates = [
    item.banner_image,
    item.images_res?.featured_image,
    item.images?.featured_image,
    item.images_res?.square_image,
    item.images?.square_image,
    item.images_res?.portrait_image,
    item.images?.portrait_image,
  ];
  for (const raw of candidates) {
    const url = raw?.trim();
    if (url) return url;
  }
  return undefined;
}

function matchesIndustry(itemIndustry: string | undefined, industry: IndustryKey): boolean {
  const expected = MARKETPLACE_INDUSTRY[industry];
  const actual = itemIndustry?.trim();
  if (!actual || !expected) return false;
  return actual.localeCompare(expected, undefined, { sensitivity: "accent" }) === 0;
}

/** Homepage only surfaces explicitly free marketplace content. */
function isFreeMarketplaceItem(item: RawContentItem): boolean {
  if (item.is_published === false) return false;
  return item.is_free === true;
}

function researchArticleUrl(item: { slug?: string; title?: string; url?: string }): string {
  if (item.url?.trim()) return item.url.trim();
  const slug = item.slug?.trim() || (item.title ? slugifyTitle(item.title) : "");
  if (!slug) return `${RESEARCH_SITE}/research?type=internal`;
  return `${RESEARCH_SITE}/research/${encodeURIComponent(slug)}`;
}

function caseStudyUrl(item: RawContentItem): string {
  if (item.url?.trim()) return item.url.trim();
  const slug = item.slug?.trim() || (item.title ? slugifyTitle(item.title) : "");
  if (slug) return `${RESEARCH_SITE}/case-studies/${encodeURIComponent(slug)}`;
  const id = item.id?.trim();
  if (!id) return `${RESEARCH_SITE}/case-studies`;
  return `${RESEARCH_SITE}/case-studies?id=${encodeURIComponent(id)}`;
}

function bestPracticeUrl(item: RawContentItem): string {
  if (item.url?.trim()) return item.url.trim();
  const id = item.id?.trim();
  if (!id) return `${PLATFORM_SITE}/marketplace?contentCategory=best-practices`;
  return `${PLATFORM_SITE}/marketplace/best-practices?id=${encodeURIComponent(id)}`;
}

export function marketplaceViewAllUrl(contentType: MarketplaceContentType): string {
  const categoryMap: Record<MarketplaceContentType, string> = {
    research_synopsis: "organization-research",
    best_practice: "best-practices",
    case_study: "case-studies",
  };
  return `${PLATFORM_SITE}/marketplace?contentCategory=${categoryMap[contentType]}`;
}

async function fetchApiList<T>(
  path: string,
  params?: Record<string, string>
): Promise<T[]> {
  const base = getPilotApiBaseUrl();
  const q = new URLSearchParams(params);
  const suffix = q.size ? `?${q.toString()}` : "";
  const res = await fetch(`${base}${path}${suffix}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];

  const payload = (await res.json().catch(() => ({}))) as { data?: T[] };
  return Array.isArray(payload.data) ? payload.data : [];
}

/** Public: GET /case-studies/fetch?is_free=true */
export async function fetchFreeCaseStudies(): Promise<RawContentItem[]> {
  return fetchApiList<RawContentItem>("/case-studies/fetch", {
    ...FREE_MARKETPLACE_PARAMS,
    page_size: "50",
  });
}

/** Only industry-matched free published case studies (no cross-industry backfill). */
export function pickCaseStudiesForIndustry(
  items: RawContentItem[],
  industry: IndustryKey,
  limit = 3
): CaseStudy[] {
  return items
    .filter(isFreeMarketplaceItem)
    .filter((item) => matchesIndustry(item.industry, industry))
    .slice(0, limit)
    .map(mapToCaseStudy);
}

/** Public: GET /best-practices/fetch?is_free=true */
export async function fetchFreeBestPractices(): Promise<RawContentItem[]> {
  return fetchApiList<RawContentItem>("/best-practices/fetch", {
    ...FREE_MARKETPLACE_PARAMS,
    page_size: "50",
  });
}

export async function fetchResearchPreview(): Promise<RawBlogPreview[]> {
  return fetchApiList<RawBlogPreview>("/blogs/fetch/preview", {
    ...FREE_MARKETPLACE_PARAMS,
    is_published: "true",
    page_size: "50",
  });
}

export function partitionResearchByIndustry(
  items: RawBlogPreview[],
  industry: IndustryKey,
  limit = 9
): CardItem[] {
  return items
    .filter((item) => matchesIndustry(item.industry, industry))
    .slice(0, limit)
    .map(mapBlogPreviewToCardItem);
}

export function partitionBestPracticesByIndustry(
  items: RawContentItem[],
  industry: IndustryKey,
  limit = 9
): CardItem[] {
  return items
    .filter((item) => isFreeMarketplaceItem(item) && matchesIndustry(item.industry, industry))
    .slice(0, limit)
    .map((item) => mapToCardItem(item, "best_practice"));
}

export function mapToCardItem(
  item: RawContentItem,
  contentType: "research_synopsis" | "best_practice"
): CardItem {
  const tag =
    item.industry?.trim() ||
    item.sub_industry?.trim() ||
    item.category?.trim() ||
    "OLL";

  const u =
    contentType === "research_synopsis"
      ? researchArticleUrl(item)
      : bestPracticeUrl(item);

  const authorName = resolveAuthor(item.author);
  const by =
    authorName !== "Organization Learning Labs"
      ? authorName
      : item.created_by?.trim() ||
        item.created_by_name?.trim() ||
        "Organization Learning Labs";

  return {
    tag,
    t: item.title?.trim() || "Untitled",
    d: truncate(item.description?.trim() || ""),
    by,
    on: formatDate(item.publication_date || item.created_at),
    u,
    img: bannerUrl(item),
  };
}

function mapBlogPreviewToCardItem(item: RawBlogPreview): CardItem {
  const synopsis = item.research_synopsis;
  const title = synopsis?.research_title?.trim() || "Untitled";
  const authors = synopsis?.authors;

  let by = "Organization Learning Labs";
  if (Array.isArray(authors) && authors[0]?.name?.trim()) {
    by = authors[0].name.trim();
  }

  return {
    tag: item.industry?.trim() || "OLL",
    t: title,
    d: truncate(synopsis?.short_description?.trim() || item.description?.trim() || ""),
    by,
    on: formatDate(item.published_at),
    u: researchArticleUrl({ slug: item.slug, title }),
    img: synopsis?.images?.featured_image?.trim() || undefined,
  };
}

export function mapToCaseStudy(item: RawContentItem): CaseStudy {
  const metrics = item.metrics ?? item.outcomes ?? [];
  const m1 = metrics[0]?.value?.trim();
  const l1 = metrics[0]?.label?.trim();
  const m2 = metrics[1]?.value?.trim();
  const l2 = metrics[1]?.label?.trim();

  return {
    tag: item.industry?.trim() || item.category?.trim() || "Case study",
    t: item.title?.trim() || "Untitled case study",
    d: truncate(item.description?.trim() || "", 280),
    u: caseStudyUrl(item),
    img: bannerUrl(item),
    ...(m1 && l1 ? { m1, l1 } : {}),
    ...(m2 && l2 ? { m2, l2 } : {}),
  };
}

export type MarketplaceFetchSource = "live" | "fallback";

export async function fetchHomeMarketplaceSection(
  industry: IndustryKey,
  contentType: MarketplaceContentType,
  limit = 3
): Promise<{ items: CardItem[] | CaseStudy[]; source: MarketplaceFetchSource }> {
  try {
    if (contentType === "case_study") {
      const raw = await fetchFreeCaseStudies();
      return {
        items: pickCaseStudiesForIndustry(raw, industry, limit),
        source: "live",
      };
    }

    if (contentType === "best_practice") {
      const raw = (await fetchFreeBestPractices())
        .filter((item) => isFreeMarketplaceItem(item) && matchesIndustry(item.industry, industry))
        .slice(0, limit);
      return {
        items: raw.map((item) => mapToCardItem(item, "best_practice")),
        source: "live",
      };
    }

    const raw = (await fetchResearchPreview())
      .filter((item) => matchesIndustry(item.industry, industry))
      .slice(0, limit);
    return {
      items: raw.map(mapBlogPreviewToCardItem),
      source: "live",
    };
  } catch {
    return { items: [], source: "fallback" };
  }
}
