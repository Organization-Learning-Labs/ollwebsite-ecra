import { ImageResponse } from "next/og";
import { iconElement } from "@/lib/brand-image";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(await iconElement(size.width, true), size);
}
