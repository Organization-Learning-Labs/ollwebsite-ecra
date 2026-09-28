import { readFile } from "node:fs/promises";
import path from "node:path";

export const BRAND_BLUE = "#004F96";
export const BRAND_NAVY = "#0B1B33";
export const BRAND_AMBER = "#FDB500";

/** favicon.png is the brand mark on a #004F96 rounded square (181×203). */
const MARK_RATIO = 181 / 203;

async function markDataUrl() {
  const buf = await readFile(path.join(process.cwd(), "public", "favicon.png"));
  return `data:image/png;base64,${buf.toString("base64")}`;
}

export async function BrandMark({ height }: { height: number }) {
  const src = await markDataUrl();
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={Math.round(height * MARK_RATIO)} height={height} />;
}

export async function iconElement(size: number, rounded: boolean) {
  const mark = await BrandMark({ height: Math.round(size * 0.9) });
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BRAND_BLUE,
        borderRadius: rounded ? Math.round(size * 0.22) : 0,
      }}
    >
      {mark}
    </div>
  );
}

export async function socialCardElement() {
  const mark = await BrandMark({ height: 150 });
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: `linear-gradient(135deg, ${BRAND_NAVY} 0%, ${BRAND_BLUE} 100%)`,
        color: "#FFFFFF",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {mark}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, letterSpacing: 4, color: "#BFD3EA", textTransform: "uppercase" }}>The Organization</span>
          <span style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05 }}>Learning Labs</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <span style={{ fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          Capability readiness for IT services and retail banking enterprises
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: "#E8EEF6" }}>
          <div style={{ width: 48, height: 6, borderRadius: 3, background: BRAND_AMBER }} />
          Enterprise Capability Readiness Assessment (ECRA)
        </div>
      </div>
    </div>
  );
}
