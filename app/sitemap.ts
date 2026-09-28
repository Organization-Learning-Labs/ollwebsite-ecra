import type { MetadataRoute } from "next";
import { absoluteUrl, pages } from "@/lib/site";

/** Bump when page content changes meaningfully. */
const LAST_MODIFIED = new Date("2026-09-28");

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = Object.values(pages).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
  entries.splice(1, 0, {
    url: absoluteUrl("/?industry=bfsi"),
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly",
    priority: 0.9,
  });
  return entries;
}
