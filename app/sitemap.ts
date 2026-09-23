import type { MetadataRoute } from "next";
import { pages, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return Object.values(pages).map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: now,
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
