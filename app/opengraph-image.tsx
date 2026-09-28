import { ImageResponse } from "next/og";
import { socialCardElement } from "@/lib/brand-image";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name}: capability readiness for IT services and retail banking enterprises`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(await socialCardElement(), size);
}
