import type { Metadata } from "next";
import HomePage from "@/components/home/HomePage";
import JsonLd from "@/components/JsonLd";
import { getHomeContent } from "@/lib/content";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { IND } from "@/data/home";

/** SSR on each request so ?industry= and future API data stay fresh. */
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ industry?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const industry = sp.industry === "bfsi" ? "bfsi" : "it";
  const label = IND[industry].name;
  return buildMetadata("home", {
    path: industry === "it" ? "/" : `/?industry=${industry}`,
    title: `OLL — Capability readiness for ${label}`,
    description:
      industry === "bfsi"
        ? "Digital channels and AI-enabled threats changed the BFSI risk model. OLL assesses whether your organization has the capabilities to make the shift."
        : "AI broke the business model in IT services. OLL assesses whether your organization has the capabilities to make the shift.",
  });
}

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;
  const content = await getHomeContent(sp.industry);

  return (
    <>
      <JsonLd
        data={webPageJsonLd("home", {
          path: content.industry === "it" ? "/" : `/?industry=${content.industry}`,
          title: `OLL — Capability readiness for ${IND[content.industry].name}`,
        })}
      />
      <HomePage initialIndustry={content.industry} content={content} />
    </>
  );
}
