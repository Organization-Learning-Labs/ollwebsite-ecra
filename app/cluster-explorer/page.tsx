import type { Metadata } from "next";
import { Suspense } from "react";
import "./cluster-explorer.css";
import { ClusterExplorer } from "@/components/clusters/ClusterExplorer";
import { PasswordGate } from "@/components/clusters/PasswordGate";
import { StoryCta } from "@/components/story/StoryCta";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { ACCESS_PATH, hasAccess } from "@/lib/clusters/access";
import { getExplorerData } from "@/lib/clusters/source";
import { siteConfig } from "@/lib/site";

const NOINDEX = { index: false, follow: false, nocache: true } as const;

export const metadata: Metadata = {
  title: { absolute: "Cluster Explorer | The Organization Learning Labs" },
  description: "Explore the competence clusters linked to each job role.",
  robots: { ...NOINDEX, googleBot: { ...NOINDEX, noimageindex: true } },
  alternates: { canonical: null },
};

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ClusterExplorerPage({ searchParams }: PageProps) {
  if (!(await hasAccess())) {
    const query = new URLSearchParams();
    for (const [k, v] of Object.entries(await searchParams)) {
      if (typeof v === "string") query.set(k, v);
    }
    const qs = query.toString();
    return (
      <main id="main">
        <StoryMotion />
        <PasswordGate next={qs ? `${ACCESS_PATH}?${qs}` : ACCESS_PATH} />
      </main>
    );
  }

  const data = await getExplorerData();

  return (
    <main id="main">
      <StoryMotion />
      <StoryHero
        eyebrow="Competence clusters"
        h1="See the competence clusters behind every role"
        lede="Pick an industry, a sub-industry and a job role to see the clusters of competence the role is assessed on, and what each one means."
        highlight="clusters"
      />

      <section className="cx-sec">
        <div className="wrap">
          <Suspense fallback={null}>
            <ClusterExplorer data={data} />
          </Suspense>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryCta
            heading="Measure these clusters across your people"
            body="Run a readiness assessment for the roles that matter most, or talk to us about your organization."
            actions={[
              { label: "Take the assessment", href: siteConfig.platform.signup, primary: true },
              { label: "Talk to us", href: "/contact" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
