import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutSectionNav } from "@/components/about/AboutSectionNav";
import { AboutTiles } from "@/components/about/AboutTiles";
import { BigStatement } from "@/components/story/BigStatement";
import { FactSheet } from "@/components/story/FactSheet";
import { LineInSand } from "@/components/story/LineInSand";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { SystemFlow } from "@/components/story/SystemFlow";
import { VisionMission } from "@/components/story/VisionMission";
import { WordGrid } from "@/components/story/WordGrid";
import { aboutContent as c } from "@/data/about";
import { photos } from "@/lib/photos";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("about");

const TLDR = [
  { k: "Organization", v: `${c.close.org} (OLL), ${siteConfig.legalName}` },
  { k: "What we do", v: "Research-led enterprise capability transformation platform" },
  { k: "Vision", v: "Self-learning, continuously reinventing enterprises" },
  { k: "Mission", v: "Research future organizations, design capability architecture, build future-ready enterprises" },
  { k: "Approach", v: c.hero.pipeline.join(", ") },
  { k: "Flagship assessment", v: "ECRA (Enterprise Capability Readiness Assessment)" },
  { k: "Assessment levels", v: "Enterprise, business unit, function, team or role" },
  { k: "Core framework", v: "The OLL Competence Blueprint" },
  { k: "Development method", v: "LADE: Learn, Apply, Demonstrate, Embed" },
  { k: "Industries in focus", v: "Information technology, banking and insurance" },
  { k: "Contact", v: siteConfig.phone },
] as const;

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("about"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />

      <StoryMotion />
      <StoryHero eyebrow="About us" h1={c.hero.h1} lede={c.hero.shortLede} chips={c.hero.chips} highlight="reinvention" />

      <VisionMission vision={c.hero.vision} mission={c.hero.mission} />

      <AboutSectionNav />

      <section>
        <div className="wrap">
          <figure className="s-photo">
            <Image src={photos.connected.src} alt={photos.connected.alt} fill sizes="(max-width: 1200px) 100vw, 1140px" />
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow="How OLL fits together" title="One connected system." lede={c.hero.shortBody} />
          <SystemFlow
            parts={c.approach.architecture}
            label={c.approach.architectureLabel}
            journey={c.hero.pipeline}
            journeyLabel="The OLL approach pipeline"
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <BigStatement eyebrow={c.close.label} statement={c.close.h2} body={c.close.shortBody} tone="dark" />
        </div>
      </section>

      <section id="explore" className="alt">
        <div className="wrap">
          <StoryHead eyebrow="Explore" title="Who we are, how we work and what we build." />
          <AboutTiles />
        </div>
      </section>

      <section>
        <div className="wrap">
          <LineInSand
            eyebrow="Where we draw the line"
            title="Readiness, used responsibly."
            quote={c.responsible.objective}
            lead={c.ecra.isBody}
            negations={c.ecra.isNot}
            links={[
              { href: "/ecra", label: "How ECRA works" },
              { href: "/about/responsible-assessment", label: "Responsible assessment" },
            ]}
          />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.values.label} title={c.values.h2} />
          <WordGrid items={c.values.items.map((v) => ({ title: v.title, line: v.principle }))} />
          <Link className="inline-link" href="/about/our-values" style={{ marginTop: 32 }}>
            Our values and pillars →
          </Link>
        </div>
      </section>

      <section>
        <div className="wrap">
          <FactSheet rows={TLDR} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <AboutCta />
        </div>
      </section>
    </main>
  );
}
