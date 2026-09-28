import type { MetadataRoute } from "next";
import { pages, siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: pages.home.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "en-IN",
    background_color: "#F5F7FA",
    theme_color: "#004F96",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
