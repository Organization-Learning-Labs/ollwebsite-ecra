import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PhotoBand from "@/components/media/PhotoBand";
import { AboutReveal } from "@/components/about/AboutReveal";
import { AboutIconWell } from "@/components/about/aboutIcons";
import {
  cbArchitectureIcon,
  cbCategoryIcon,
  cbFoundationIcon,
  cbLevelIcon,
  cbPathwayAIcon,
  cbSectionIcon,
  cbSignificanceIcon,
  cbTransformIcon,
  type CbSectionKey,
} from "@/components/competence-blueprint/competenceBlueprintIcons";
import { competenceBlueprintContent as c } from "@/data/competence-blueprint";
import { photos } from "@/lib/photos";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("competenceBlueprint");

function SectionLabel({
  sectionKey,
  children,
}: {
  sectionKey: CbSectionKey;
  children: string;
}) {
  return (
    <p className="label about-label">
      <AboutIconWell icon={cbSectionIcon(sectionKey)} className="about-icon-well--sm" />
      {children}
    </p>
  );
}

function VisualBand({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  return (
    <AboutReveal className="about-visual-wrap">
      <div className="about-visual" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="about-visual-img" />
      </div>
      <p className="about-visual-caption">{caption}</p>
    </AboutReveal>
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

      {/* 1. Page head */}
      <div className="phead about-phead">
        <div className="wrap about-phead-inner">
          <div className="about-phead-copy">
            <p className="label">{c.hero.label}</p>
            <h1>{c.hero.h1}</h1>
            <p className="lede">{c.hero.lede}</p>
            <div className="meta-row">
              {c.hero.chips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
          </div>
          <figure className="about-phead-figure" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/about/about-layers.svg" alt="" />
          </figure>
        </div>
      </div>

      <section>
        <div className="wrap">
          {c.hero.intro.map((p) => (
            <p key={p.slice(0, 48)} className="lede" style={{ maxWidth: "72ch" }}>
              {p}
            </p>
          ))}
          <blockquote className="about-pull">{c.hero.pullQuote}</blockquote>
        </div>
      </section>

      {/* 2. What is the OLL Competence Blueprint? */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="whatIs">{c.whatIs.label}</SectionLabel>
          <h2>{c.whatIs.h2}</h2>
          {c.whatIs.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="lede">
              {p}
            </p>
          ))}
          <blockquote className="about-pull">{c.whatIs.pullQuote}</blockquote>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.blueprint} />
      </div>

      {/* 3. Capability and competence architecture */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="architecture">{c.architecture.label}</SectionLabel>
          <h2>{c.architecture.h2}</h2>
          <p className="lede">{c.architecture.lede}</p>
          <div className="defs">
            {c.architecture.layers.map((row, i) => (
              <div className="def" key={row.title}>
                <b>
                  <AboutIconWell icon={cbArchitectureIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <ol className="about-pipeline" aria-label="Capability to role pipeline">
            {c.architecture.pipeline.map((step, i) => (
              <li key={step} className="about-pipeline-item" style={{ ["--i" as string]: i }}>
                <AboutIconWell icon={cbArchitectureIcon(i)} />
                <span className="about-pipeline-n">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.architecture.note}</p>
          </div>
        </div>
      </section>

      {/* 4. Six competence categories */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="categories">{c.categories.label}</SectionLabel>
          <h2>{c.categories.h2}</h2>
          <p className="lede">{c.categories.lede}</p>
          <div className="defs">
            {c.categories.items.map((row, i) => (
              <div className="def" key={row.title}>
                <b>
                  <AboutIconWell icon={cbCategoryIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <p className="lede" style={{ marginTop: 28 }}>
            {c.categories.closing}
          </p>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.levels} />
      </div>

      {/* 5. Four levels of application */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="levels">{c.levels.label}</SectionLabel>
          <h2>{c.levels.h2}</h2>
          <p className="lede">{c.levels.lede}</p>
          <ol className="about-pillars">
            {c.levels.items.map((item, i) => (
              <li key={item.title}>
                <div className="about-pillars-mark">
                  <AboutIconWell icon={cbLevelIcon(i)} />
                  <span className="about-pillars-n">{i + 1}</span>
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="lede" style={{ marginTop: 28 }}>
            {c.levels.closing}
          </p>
        </div>
      </section>

      <div className="wrap">
        <VisualBand src="/about/about-levels.svg" caption={c.pathways.label} />
      </div>

      {/* 6. Two pathways */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="pathways">{c.pathways.label}</SectionLabel>
          <h2>{c.pathways.h2}</h2>
          <p className="lede">{c.pathways.lede}</p>

          <h3 className="about-subhead">{c.pathways.pathwayAHeading}</h3>
          <div className="chain">
            {c.pathways.pathwayA.map((step, i) => (
              <div className="chain-row about-chain-row" key={step.title}>
                <b>
                  <AboutIconWell icon={cbPathwayAIcon(i)} className="about-icon-well--inline" />
                  {i + 1}. {step.title}
                </b>
                <span>{step.body}</span>
              </div>
            ))}
          </div>

          <h3 className="about-subhead">{c.pathways.pathwayBHeading}</h3>
          <p className="lede">{c.pathways.pathwayB}</p>
          <blockquote className="about-pull">{c.pathways.pullQuote}</blockquote>
        </div>
      </section>

      {/* 7. Current vs future organization archetypes */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="archetypes">{c.archetypes.label}</SectionLabel>
          <h2>{c.archetypes.h2}</h2>
          <p className="lede">{c.archetypes.lede}</p>
          <div className="grid-2" style={{ marginTop: 36 }}>
            <div>
              <h3 className="about-col-h">{c.archetypes.currentTitle}</h3>
              <p className="lede" style={{ marginTop: 10 }}>
                {c.archetypes.currentBody}
              </p>
            </div>
            <div>
              <h3 className="about-col-h">{c.archetypes.futureTitle}</h3>
              <p className="lede" style={{ marginTop: 10 }}>
                {c.archetypes.futureBody}
              </p>
            </div>
          </div>
          <p className="lede" style={{ marginTop: 28 }}>
            {c.archetypes.comparison}
          </p>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.archetypes.note}</p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.engineering} />
      </div>

      {/* 8. From capabilities to competencies */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="toCompetencies">{c.toCompetencies.label}</SectionLabel>
          <h2>{c.toCompetencies.h2}</h2>
          <p className="lede">{c.toCompetencies.lede}</p>
          <h3 className="about-subhead">{c.toCompetencies.exampleTitle}</h3>
          <div className="chain">
            {c.toCompetencies.exampleRows.map((row, i) => (
              <div className="chain-row about-chain-row" key={row.title}>
                <b>
                  <AboutIconWell icon={cbPathwayAIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <span>{row.body}</span>
              </div>
            ))}
          </div>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.toCompetencies.note}</p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.planning} />
      </div>

      {/* 9. From blueprint to transformation */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="transformation">{c.transformation.label}</SectionLabel>
          <h2>{c.transformation.h2}</h2>
          <p className="lede">{c.transformation.lede}</p>
          <div className="chain">
            {c.transformation.stages.map((step, i) => (
              <div className="chain-row about-chain-row" key={step.title}>
                <b>
                  <AboutIconWell icon={cbTransformIcon(i)} className="about-icon-well--inline" />
                  {i + 1}. {step.title}
                </b>
                <span>{step.body}</span>
              </div>
            ))}
          </div>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.transformation.note}</p>
          </div>
          <blockquote className="about-pull">{c.transformation.pullQuote}</blockquote>
        </div>
      </section>

      <div className="wrap">
        <VisualBand src="/about/about-cycle.svg" caption={c.ecra.label} />
      </div>

      {/* 10. Connection with ECRA + foundation + CTA */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="ecra">{c.ecra.label}</SectionLabel>
          <h2>{c.ecra.h2}</h2>
          <p className="lede">{c.ecra.lede}</p>
          <p className="lede">{c.ecra.body}</p>
          <div className="defs">
            {c.ecra.trio.map((row) => (
              <div className="def" key={row.title}>
                <b>{row.title}</b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.ecra.caveat}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionLabel sectionKey="foundation">{c.foundation.label}</SectionLabel>
          <h2>{c.foundation.h2}</h2>
          <p className="lede">{c.foundation.lede}</p>
          <ol className="about-pipeline about-pipeline--3" aria-label="Research to outcomes pipeline">
            {c.foundation.pipeline.map((step, i) => (
              <li key={step} className="about-pipeline-item" style={{ ["--i" as string]: i }}>
                <AboutIconWell icon={cbFoundationIcon(i)} />
                <span className="about-pipeline-n">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <h3 className="about-subhead">{c.foundation.significanceHeading}</h3>
          <div className="defs">
            {c.foundation.significance.map((row, i) => (
              <div className="def" key={row.title}>
                <b>
                  <AboutIconWell icon={cbSignificanceIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <p className="lede" style={{ marginTop: 28 }}>
            {c.foundation.living}
          </p>
          {c.foundation.closingQuotes.map((q) => (
            <blockquote className="about-pull" key={q.slice(0, 40)}>
              {q}
            </blockquote>
          ))}

          <div className="cta-band" style={{ marginTop: 48 }}>
            <div>
              <h2>{c.close.ctaHeading}</h2>
              <p>{c.close.ctaBody}</p>
            </div>
            <div className="acts">
              <a className="btn btn-primary" href={siteConfig.platform.signup}>
                {c.close.primaryLabel}
              </a>
              <Link className="btn btn-ghost" href={c.close.secondaryHref}>
                {c.close.secondaryLabel}
              </Link>
              <Link className="btn btn-ghost" href={c.close.tertiaryHref}>
                {c.close.tertiaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
