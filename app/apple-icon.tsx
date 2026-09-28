import { ImageResponse } from "next/og";
import { iconElement } from "@/lib/brand-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(await iconElement(size.width, false), size);
}
