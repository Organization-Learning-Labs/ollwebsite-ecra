import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PhotoBand from "@/components/media/PhotoBand";
import { AboutReveal } from "@/components/about/AboutReveal";
import {
  AboutIconWell,
  approachStepIcon,
  blueprintProcessIcon,
  commitmentIcon,
  levelIcon,
  pillarIcon,
  pipelineIcon,
  reinventionIcon,
  sectionIcon,
  valueIcon,
} from "@/components/about/aboutIcons";
import { aboutContent as c } from "@/data/about";
import { photos } from "@/lib/photos";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("about");

function SectionLabel({
  sectionKey,
  children,
}: {
  sectionKey: Parameters<typeof sectionIcon>[0];
  children: string;
}) {
  return (
    <p className="label about-label">
      <AboutIconWell icon={sectionIcon(sectionKey)} className="about-icon-well--sm" />
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

      {/* 1. Who we are */}
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
            <img src="/about/about-orbit.svg" alt="" />
          </figure>
        </div>
      </div>

      <section>
        <div className="wrap">
          {c.hero.body.map((p) => (
            <p key={p.slice(0, 40)} className="lede" style={{ maxWidth: "72ch" }}>
              {p}
            </p>
          ))}
          <ol className="about-pipeline" aria-label="OLL approach pipeline">
            {c.hero.pipeline.map((step, i) => (
              <li key={step} className="about-pipeline-item" style={{ ["--i" as string]: i }}>
                <AboutIconWell icon={pipelineIcon(i)} />
                <span className="about-pipeline-n">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div className="defs about-mission">
            <div className="def">
              <b>Vision</b>
              <p>{c.hero.vision}</p>
            </div>
            <div className="def">
              <b>Mission</b>
              <p>{c.hero.mission}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.research} />
      </div>

      {/* 2. Why capability readiness */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="why">{c.whyReadiness.label}</SectionLabel>
          <h2>{c.whyReadiness.h2}</h2>
          {c.whyReadiness.paragraphs.map((p) => (
            <p key={p.slice(0, 48)} className="lede">
              {p}
            </p>
          ))}
          <blockquote className="about-pull">{c.whyReadiness.question}</blockquote>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.whyReadiness.note}</p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <VisualBand src="/about/about-layers.svg" caption={c.values.label} />
      </div>

      {/* 3. Values */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="values">{c.values.label}</SectionLabel>
          <h2>{c.values.h2}</h2>
          <p className="lede">{c.values.lede}</p>
          <ul className="values about-values">
            {c.values.items.map((item, i) => (
              <li key={item.title}>
                <b>
                  <AboutIconWell icon={valueIcon(i)} className="about-icon-well--inline" />
                  {item.title}
                </b>
                <span>
                  <em className="about-principle">{item.principle}</em>
                  {item.body}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4. Pillars */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="pillars">{c.pillars.label}</SectionLabel>
          <h2>{c.pillars.h2}</h2>
          <p className="lede">{c.pillars.lede}</p>
          <ol className="about-pillars">
            {c.pillars.items.map((item, i) => (
              <li key={item.title}>
                <div className="about-pillars-mark">
                  <AboutIconWell icon={pillarIcon(i)} />
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
            {c.pillars.closing}
          </p>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.workshop} />
      </div>

      {/* 5. Research-to-readiness */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="approach">{c.approach.label}</SectionLabel>
          <h2>{c.approach.h2}</h2>
          <p className="lede">{c.approach.lede}</p>
          <div className="chain">
            {c.approach.steps.map((step, i) => (
              <div className="chain-row about-chain-row" key={step.title}>
                <b>
                  <AboutIconWell icon={approachStepIcon(i)} className="about-icon-well--inline" />
                  {i + 1}. {step.title}
                </b>
                <span>{step.body}</span>
              </div>
            ))}
          </div>
          <h3 className="about-subhead">{c.approach.architectureLabel}</h3>
          <div className="defs">
            {c.approach.architecture.map((row) => (
              <div className="def" key={row.title}>
                <b>{row.title}</b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Competence Blueprint system */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="blueprint">{c.blueprint.label}</SectionLabel>
          <h2>{c.blueprint.h2}</h2>
          {c.blueprint.intro.map((p) => (
            <p key={p.slice(0, 48)} className="lede">
              {p}
            </p>
          ))}
          <blockquote className="about-pull">{c.blueprint.pullQuote}</blockquote>

          <h3 className="about-subhead">{c.blueprint.expertHeading}</h3>
          <p className="lede">{c.blueprint.expertBody}</p>

          <h3 className="about-subhead">{c.blueprint.processHeading}</h3>
          <div className="chain">
            {c.blueprint.process.map((step, i) => (
              <div className="chain-row about-chain-row" key={step.title}>
                <b>
                  <AboutIconWell icon={blueprintProcessIcon(i)} className="about-icon-well--inline" />
                  {i + 1}. {step.title}
                </b>
                <span>{step.body}</span>
              </div>
            ))}
          </div>

          <h3 className="about-subhead">{c.blueprint.architectureHeading}</h3>
          <p className="lede">{c.blueprint.architectureLede}</p>
          <div className="defs">
            {c.blueprint.hierarchy.map((row) => (
              <div className="def" key={row.title}>
                <b>{row.title}</b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <div className="note" style={{ marginTop: 28 }}>
            <p>
              <strong>Important distinction.</strong> {c.blueprint.distinction}
            </p>
          </div>

          <h3 className="about-subhead">{c.blueprint.exampleHeading}</h3>
          <p className="lede">{c.blueprint.exampleLede}</p>
          <p className="about-example-k">{c.blueprint.exampleTitle}</p>
          <div className="chain">
            {c.blueprint.exampleRows.map((row) => (
              <div className="chain-row" key={row.title}>
                <b>{row.title}</b>
                <span>{row.body}</span>
              </div>
            ))}
          </div>
          <div className="note" style={{ marginTop: 24 }}>
            <p>{c.blueprint.exampleNote}</p>
          </div>

          <h3 className="about-subhead">{c.blueprint.whyHeading}</h3>
          <p className="lede">{c.blueprint.whyLede}</p>
          <div className="defs">
            {c.blueprint.whyBullets.map((row) => (
              <div className="def" key={row.title}>
                <b>{row.title}</b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <blockquote className="about-pull">{c.blueprint.whyQuote}</blockquote>
        </div>
      </section>

      <div className="wrap">
        <VisualBand src="/about/about-levels.svg" caption={c.ecra.label} />
      </div>

      {/* 7. ECRA */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="ecra">{c.ecra.label}</SectionLabel>
          <h2>{c.ecra.h2}</h2>
          <p className="lede">{c.ecra.lede}</p>
          <p className="lede">{c.ecra.body}</p>
          <p className="about-list-intro">{c.ecra.examinesHeading}</p>
          <ul className="about-bullets">
            {c.ecra.examines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="about-subhead">{c.ecra.levelsHeading}</h3>
          <p className="lede">{c.ecra.levelsLede}</p>
          <div className="defs">
            {c.ecra.levels.map((row, i) => (
              <div className="def" key={row.title}>
                <b>
                  <AboutIconWell icon={levelIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>

          <h3 className="about-subhead">{c.ecra.isNotHeading}</h3>
          <div className="grid-2 about-is-not">
            <div>
              <p className="lede" style={{ marginTop: 0 }}>
                {c.ecra.isBody}
              </p>
            </div>
            <div>
              <p className="about-list-intro">ECRA is not, by itself:</p>
              <ul className="about-bullets">
                {c.ecra.isNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="note" style={{ marginTop: 28 }}>
            <p>{c.ecra.interpretation}</p>
          </div>
        </div>
      </section>

      {/* 8. Capability vs competence */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="compare">{c.compare.label}</SectionLabel>
          <h2>{c.compare.h2}</h2>
          <p className="lede">{c.compare.lede}</p>
          <div className="grid-2" style={{ marginTop: 36 }}>
            <div>
              <h3 className="about-col-h">{c.compare.columns.left}</h3>
              <p className="lede" style={{ marginTop: 10 }}>
                {c.compare.enterpriseDef}
              </p>
            </div>
            <div>
              <h3 className="about-col-h">{c.compare.columns.right}</h3>
              <p className="lede" style={{ marginTop: 10 }}>
                {c.compare.individualDef}
              </p>
            </div>
          </div>
          <div className="about-compare" role="table" aria-label="Capability versus competence">
            <div className="about-compare-head" role="row">
              <span role="columnheader">{c.compare.columns.left}</span>
              <span role="columnheader">{c.compare.columns.right}</span>
            </div>
            {c.compare.rows.map((row) => (
              <div className="about-compare-row" role="row" key={row.left.slice(0, 32)}>
                <span role="cell">{row.left}</span>
                <span role="cell">{row.right}</span>
              </div>
            ))}
          </div>
          <blockquote className="about-pull">{c.compare.closing}</blockquote>
        </div>
      </section>

      <div className="wrap">
        <VisualBand src="/about/about-cycle.svg" caption={c.reinvention.label} />
      </div>

      {/* 9. Enterprise reinvention */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="reinvention">{c.reinvention.label}</SectionLabel>
          <h2>{c.reinvention.h2}</h2>
          <p className="lede">{c.reinvention.lede}</p>
          <p className="lede">{c.reinvention.body}</p>
          <h3 className="about-subhead">{c.reinvention.perspectiveHeading}</h3>
          <p className="lede">{c.reinvention.perspectiveLede}</p>
          <div className="chain">
            {c.reinvention.stages.map((step, i) => (
              <div className="chain-row about-chain-row" key={step.title}>
                <b>
                  <AboutIconWell icon={reinventionIcon(i)} className="about-icon-well--inline" />
                  {i + 1}. {step.title}
                </b>
                <span>{step.body}</span>
              </div>
            ))}
          </div>
          <h3 className="about-subhead">{c.reinvention.ecraRoleHeading}</h3>
          <p className="lede">{c.reinvention.ecraRole}</p>
          <blockquote className="about-pull">{c.reinvention.closing}</blockquote>
        </div>
      </section>

      <div className="wrap">
        <PhotoBand photo={photos.boardroom} />
      </div>

      {/* 10. Responsible assessment */}
      <section className="alt">
        <div className="wrap">
          <SectionLabel sectionKey="responsible">{c.responsible.label}</SectionLabel>
          <h2>{c.responsible.h2}</h2>
          <p className="lede">{c.responsible.lede}</p>
          <p className="lede">{c.responsible.grounding}</p>
          <div className="defs">
            {c.responsible.commitments.map((row, i) => (
              <div className="def" key={row.title}>
                <b>
                  <AboutIconWell icon={commitmentIcon(i)} className="about-icon-well--inline" />
                  {row.title}
                </b>
                <p>{row.body}</p>
              </div>
            ))}
          </div>
          <h3 className="about-subhead">{c.responsible.participantsHeading}</h3>
          <p className="lede">{c.responsible.participantsBody}</p>
          <blockquote className="about-pull">{c.responsible.objective}</blockquote>
        </div>
      </section>

      {/* 11. Close + CTA */}
      <section>
        <div className="wrap">
          <SectionLabel sectionKey="close">{c.close.label}</SectionLabel>
          <h2>{c.close.h2}</h2>
          <p className="lede">{c.close.body}</p>
          <p className="about-org">{c.close.org}</p>

          <div className="cta-band" style={{ marginTop: 48 }}>
            <div>
              <h2>{c.close.ctaHeading}</h2>
              <p>{c.close.ctaBody}</p>
            </div>
            <div className="acts">
              <a className="btn btn-primary" href={c.close.primaryHref}>
                {c.close.primaryLabel}
              </a>
              <Link className="btn btn-ghost" href={c.close.secondaryHref}>
                {c.close.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
