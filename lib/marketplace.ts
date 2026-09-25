/**
 * Thin server-side client for GET /content/marketplace.
 * Mirrors the academy app's category → content_type mapping without axios/auth.
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

type RawMarketplaceItem = {
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
  images?: {
    featured_image?: string;
    square_image?: string;
    portrait_image?: string;
  };
  author?: Array<{ name?: string }> | { name?: string } | string;
  created_at?: string;
  created_by_name?: string;
  metrics?: Array<{ value?: string; label?: string }>;
  outcomes?: Array<{ value?: string; label?: string }>;
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

function resolveAuthor(raw: RawMarketplaceItem["author"]): string {
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

function bannerUrl(item: RawMarketplaceItem): string | undefined {
  const candidates = [
    item.banner_image,
    item.images?.featured_image,
    item.images?.square_image,
    item.images?.portrait_image,
  ];
  for (const raw of candidates) {
    const url = raw?.trim();
    if (url) return url;
  }
  return undefined;
}

function researchArticleUrl(item: RawMarketplaceItem): string {
  if (item.url?.trim()) return item.url.trim();
  const slug = item.slug?.trim() || (item.title ? slugifyTitle(item.title) : "");
  if (!slug) return `${RESEARCH_SITE}/research?type=internal`;
  return `${RESEARCH_SITE}/research/${encodeURIComponent(slug)}`;
}

function caseStudyUrl(item: RawMarketplaceItem): string {
  if (item.url?.trim()) return item.url.trim();
  const id = item.id?.trim();
  if (!id) return `${PLATFORM_SITE}/marketplace?contentCategory=case-studies`;
  const slug = item.slug?.trim();
  const q = new URLSearchParams({ id });
  if (slug) q.set("slug", slug);
  return `${PLATFORM_SITE}/marketplace/case-studies?${q.toString()}`;
}

function bestPracticeUrl(item: RawMarketplaceItem): string {
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

export async function fetchMarketplace(params: {
  content_type: MarketplaceContentType;
  industry: string;
  page_size?: number;
}): Promise<RawMarketplaceItem[]> {
  const base = getPilotApiBaseUrl();
  const q = new URLSearchParams({
    content_type: params.content_type,
    industry: params.industry,
    page: "1",
    page_size: String(params.page_size ?? 3),
  });

  const res = await fetch(`${base}/content/marketplace?${q.toString()}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!res.ok) return [];

  const payload = (await res.json().catch(() => ({}))) as {
    data?: RawMarketplaceItem[];
  };
  return Array.isArray(payload.data) ? payload.data : [];
}

export function mapToCardItem(
  item: RawMarketplaceItem,
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

  return {
    tag,
    t: item.title?.trim() || "Untitled",
    d: truncate(item.description?.trim() || ""),
    by: item.created_by_name?.trim() || resolveAuthor(item.author),
    on: formatDate(item.created_at),
    u,
    img: bannerUrl(item),
  };
}

export function mapToCaseStudy(item: RawMarketplaceItem): CaseStudy {
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

export async function fetchHomeMarketplaceSection(
  industry: IndustryKey,
  contentType: MarketplaceContentType,
  limit = 3
): Promise<{ items: CardItem[] | CaseStudy[]; live: boolean }> {
  try {
    const raw = await fetchMarketplace({
      content_type: contentType,
      industry: MARKETPLACE_INDUSTRY[industry],
      page_size: limit,
    });
    if (raw.length === 0) return { items: [], live: false };

    if (contentType === "case_study") {
      return { items: raw.map(mapToCaseStudy), live: true };
    }
    return {
      items: raw.map((item) =>
        mapToCardItem(item, contentType as "research_synopsis" | "best_practice")
      ),
      live: true,
    };
  } catch {
    return { items: [], live: false };
  }
}
