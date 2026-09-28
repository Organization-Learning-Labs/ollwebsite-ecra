import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { SplitMedia } from "@/components/about/SplitMedia";
import { BigStatement } from "@/components/story/BigStatement";
import { FactSheet } from "@/components/story/FactSheet";
import { NamedCards } from "@/components/story/NamedCards";
import { NumberedList } from "@/components/story/NumberedList";
import { PathwaysMap } from "@/components/story/PathwaysMap";
import { StoryCta } from "@/components/story/StoryCta";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { TransformCycle } from "@/components/story/TransformCycle";
import { WordGrid } from "@/components/story/WordGrid";
import { competenceBlueprintContent as c } from "@/data/competence-blueprint";
import { photos } from "@/lib/photos";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("competenceBlueprint");

const TLDR = [
  { k: "What it is", v: "A research-led architecture connecting strategy, future capabilities, workforce competence and reinvention" },
  { k: "Purpose", v: "Connect external change to organizational capability, role-based competence and transformation action" },
  { k: "Architecture", v: `${c.architecture.layers.length} layers: ${c.architecture.pipeline.join(", ")}` },
  { k: "Competence categories", v: `${c.categories.items.length}: ${c.categories.items.map((i) => i.title).join(", ")}` },
  { k: "Levels of application", v: `${c.levels.items.length}: ${c.levels.items.map((i) => i.title).join(", ")}` },
  { k: "Pathways", v: "Organization transformation, or focused capability or role transformation" },
  { k: "Connects to", v: "ECRA readiness assessment and transformation programs" },
  { k: "Status", v: "A living architecture that evolves with research and evidence" },
] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function CompetenceBlueprintPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("competenceBlueprint"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Competence Blueprint", path: "/competence-blueprint" },
          ]),
        ]}
      />

      <StoryMotion />
      <StoryHero eyebrow={c.hero.label} h1={c.hero.h1} lede={c.hero.lede} chips={c.hero.chips} highlight="Capability" />

      <section>
        <div className="wrap">
          <NamedCards items={c.hero.shortIntro} cols={3} />
          <div style={{ marginTop: 40 }}>
            <BigStatement statement={c.hero.pullQuote} tone="dark" />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.whatIs.label} title={c.whatIs.h2} />
          <NamedCards items={c.whatIs.shortParagraphs} cols={3} />
          <p className="s-quote" data-reveal="up">{c.whatIs.pullQuote}</p>
        </div>
      </section>

      <section id="architecture">
        <div className="wrap">
          <StoryHead eyebrow={c.architecture.label} title={c.architecture.h2} lede={c.architecture.shortLede} />
          <ol className="s-pipe" data-stagger aria-label="Capability to role pipeline" style={{ marginTop: 0, marginBottom: 28 }}>
            {c.architecture.pipeline.map((step, i) => (
              <li key={step}>
                <span>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <dl className="s-defs">
            {c.architecture.layers.map((row) => (
              <div key={row.title}>
                <dt>{row.title}</dt>
                <dd>{row.body}</dd>
              </div>
            ))}
          </dl>
          <p className="s-note">{c.architecture.note}</p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.categories.label} title={c.categories.h2} />
          <WordGrid items={c.categories.items.map((i) => ({ title: i.title, line: i.body }))} />
          <p className="s-closing">{c.categories.closing}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SplitMedia photo={photos.levels}>
            <p className="s-eyebrow">{c.levels.label}</p>
            <h2 className="s-split-h">{c.levels.h2}</h2>
            <p className="s-lede">{c.levels.shortLede}</p>
          </SplitMedia>
          <div style={{ marginTop: 32 }}>
            <NamedCards items={c.levels.items} cols={4} closing={c.levels.shortClosing} />
          </div>
        </div>
      </section>

      <section id="pathways" className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.pathways.label} title={c.pathways.h2} lede={c.pathways.shortLede} />
          <PathwaysMap
            aHeading={c.pathways.pathwayAHeading}
            aSteps={c.pathways.pathwayA}
            bHeading={c.pathways.pathwayBHeading}
            bBody={c.pathways.pathwayB}
            bEntries={c.pathways.pathwayBEntries}
            bSteps={c.pathways.pathwayBSteps}
            chain={c.pathways.chain}
            chainLabel={`${c.pathways.pullQuote.split(":")[0]}.`}
          />
        </div>
      </section>

      <section>
        <div className="wrap">
          <StoryHead eyebrow={c.archetypes.label} title={c.archetypes.h2} lede={c.archetypes.shortLede} />
          <div className="shift compare-shift" role="table" aria-label="Current versus future archetype">
            <div className="shift-head" role="row">
              <div>View</div>
              <div>{c.archetypes.currentTitle}</div>
              <div aria-hidden="true" />
              <div className="to">{c.archetypes.futureTitle}</div>
            </div>
            <div className="shift-row" role="row">
              <div className="shift-dim" role="rowheader">
                Archetype
              </div>
              <div className="shift-is" role="cell">
                {c.archetypes.currentBody}
              </div>
              <div className="shift-arrow" aria-hidden="true">
                <Arrow />
              </div>
              <div className="shift-to" role="cell">
                {c.archetypes.futureBody}
              </div>
            </div>
          </div>
          <p className="s-closing">{c.archetypes.shortComparison}</p>
          <p className="s-note">{c.archetypes.note}</p>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <SplitMedia photo={photos.engineering} reverse>
            <p className="s-eyebrow">{c.toCompetencies.label}</p>
            <h2 className="s-split-h">{c.toCompetencies.h2}</h2>
            <p className="s-lede">{c.toCompetencies.shortLede}</p>
          </SplitMedia>
          <p className="about-example-k" style={{ marginTop: 40 }}>
            {c.toCompetencies.exampleTitle}
          </p>
          <NumberedList items={c.toCompetencies.exampleRows} cols={2} label={c.toCompetencies.exampleTitle} />
          <p className="s-note">{c.toCompetencies.note}</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <StoryHead eyebrow={c.transformation.label} title={c.transformation.h2} lede={c.transformation.shortLede} />
          <TransformCycle
            stages={c.transformation.stages}
            loopLabel="Refine based on evidence, then diagnose again"
            label="Blueprint to transformation stages"
          />
          <p className="s-note">{c.transformation.note}</p>
          <p className="s-quote" data-reveal="up">{c.transformation.pullQuote}</p>
        </div>
      </section>

      <section id="ecra" className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.ecra.label} title={c.ecra.h2} lede={c.ecra.shortLede} />
          <NamedCards items={c.ecra.trio} cols={3} closing={c.ecra.shortBody} />
          <p className="s-note">{c.ecra.caveat}</p>
        </div>
      </section>

      <section id="close">
        <div className="wrap">
          <BigStatement
            eyebrow={c.foundation.label}
            statement={c.foundation.h2}
            body={c.foundation.shortLede}
            tone="dark"
          />
          <ol className="s-pipe" data-stagger aria-label="Research to outcomes pipeline">
            {c.foundation.pipeline.map((step, i) => (
              <li key={step}>
                <span>{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <h3 className="s-sub">{c.foundation.significanceHeading}</h3>
          <NamedCards items={c.foundation.significance} cols={3} closing={c.foundation.shortLiving} />
          {c.foundation.closingQuotes.map((q) => (
            <p className="s-quote" data-reveal="up" key={q.slice(0, 40)}>
              {q}
            </p>
          ))}
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <FactSheet rows={TLDR} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <StoryCta
            heading={c.close.ctaHeading}
            body={c.close.ctaBody}
            actions={[
              { label: c.close.primaryLabel, href: siteConfig.platform.signup, primary: true },
              { label: c.close.secondaryLabel, href: c.close.secondaryHref },
              { label: c.close.tertiaryLabel, href: c.close.tertiaryHref },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
