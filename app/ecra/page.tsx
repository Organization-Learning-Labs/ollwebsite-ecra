import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { EcraCta } from "@/components/ecra/EcraCta";
import { EcraLevelTiles } from "@/components/ecra/EcraLevelTiles";
import { EcraSectionNav } from "@/components/ecra/EcraSectionNav";
import { ImageStream } from "@/components/ecra/ImageStream";
import { CapabilityNest } from "@/components/story/CapabilityNest";
import { LineInSand } from "@/components/story/LineInSand";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { aboutContent as c } from "@/data/about";
import { ECRA_NAV_LABEL, ecraIntro, journey } from "@/data/ecra";
import { photos } from "@/lib/photos";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("ecra");

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default function EcraHubPage() {
  return (
    <main id="main" className="ecra-page">
      <JsonLd
        data={[
          webPageJsonLd("ecra"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: ECRA_NAV_LABEL, path: "/ecra" },
          ]),
        ]}
      />
      <StoryMotion />
      <StoryHero
        eyebrow={c.ecra.label}
        h1={c.ecra.h2}
        lede={c.ecra.shortLede}
        highlight="readiness"
        crumbs={[{ label: "Home", href: "/" }, { label: ECRA_NAV_LABEL }]}
      />
      <EcraSectionNav />

      <section>
        <div className="wrap">
          <figure className="s-photo">
            <Image src={photos.ecra.src} alt={photos.ecra.alt} fill priority sizes="(max-width: 1200px) 100vw, 1140px" />
          </figure>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow="Four levels" title={ecraIntro.h1} lede={ecraIntro.lede} />
          <ul className="ecra-persp" data-stagger>
            {ecraIntro.perspectives.map((p, i) => (
              <li key={p.who}>
                <span className="ecra-persp-n">{String(i + 1).padStart(2, "0")}</span>
                <strong>{p.who}</strong>
                <p>{p.need}</p>
              </li>
            ))}
          </ul>
          <p className="s-quote" data-reveal="up">{ecraIntro.connect}</p>
          <EcraLevelTiles />
        </div>
      </section>

      <section>
        <div className="wrap ecra-teaser">
          <div>
            <StoryHead eyebrow="What it examines" title="Future requirements, current readiness." lede={c.ecra.shortBody} />
            <p className="about-list-intro">{c.ecra.examinesHeading}</p>
            <ul className="s-bullets" style={{ gridTemplateColumns: "1fr" }}>
              {c.ecra.examines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="ecra-teaser-side">
            <ImageStream items={journey} label="The assessment and transformation journey" />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <LineInSand
            eyebrow="Where we draw the line"
            title={c.ecra.isNotHeading}
            lead={`${c.ecra.isBody} ECRA is not, by itself:`}
            negations={c.ecra.isNot}
            body={c.ecra.interpretation}
          />
        </div>
      </section>

      <section id="compare">
        <div className="wrap">
          <StoryHead eyebrow={c.compare.label} title={c.compare.h2} lede={c.compare.lede} />
          <CapabilityNest
            outerTitle={c.compare.columns.left}
            outerDef={c.compare.enterpriseDef}
            outerParts={["People", "Processes", "Technology", "Governance", "Leadership", "Culture", "Collaboration", "Operating models"]}
            innerTitle={c.compare.columns.right}
            innerDef={c.compare.individualDef}
            innerParts={["knowledge", "skills", "judgment", "behaviours", "experience"]}
          />
          <div className="shift compare-shift" role="table" aria-label="Capability versus competence">
            <div className="shift-head" role="row">
              <div>Lens</div>
              <div>{c.compare.columns.left}</div>
              <div aria-hidden="true" />
              <div className="to">{c.compare.columns.right}</div>
            </div>
            {c.compare.rows.map((row, i) => (
              <div className="shift-row" role="row" key={row.left.slice(0, 32)}>
                <div className="shift-dim" role="rowheader">
                  {i + 1}
                </div>
                <div className="shift-is" role="cell">
                  {row.left}
                </div>
                <div className="shift-arrow" aria-hidden="true">
                  <Arrow />
                </div>
                <div className="shift-to" role="cell">
                  {row.right}
                </div>
              </div>
            ))}
          </div>
          <p className="s-quote" data-reveal="up">{c.compare.closing}</p>
        </div>
      </section>

      <section className="about-end alt">
        <div className="wrap">
          <EcraCta />
        </div>
      </section>
    </main>
  );
}
