import type { Metadata } from "next";
import { AboutSubPage } from "@/components/about/AboutSubPage";
import { SplitMedia } from "@/components/about/SplitMedia";
import { BigStatement } from "@/components/story/BigStatement";
import { NamedCards } from "@/components/story/NamedCards";
import { ReinventionLoop } from "@/components/story/ReinventionLoop";
import { StoryHead } from "@/components/story/StoryHead";
import { aboutContent as c } from "@/data/about";
import { photos } from "@/lib/photos";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("aboutPurpose");

export default function OurPurposePage() {
  return (
    <AboutSubPage
      slug="our-purpose"
      pageKey="aboutPurpose"
      eyebrow={c.whyReadiness.label}
      h1={c.whyReadiness.h2}
      lede={c.whyReadiness.shortLede}
    >
      <section>
        <div className="wrap">
          <BigStatement eyebrow="The question we help answer" statement={c.whyReadiness.question} tone="dark" />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow="The readiness gap" title="Why readiness, and why now." />
          <NamedCards items={c.whyReadiness.shortPoints} cols={3} />
          <p className="s-note">{c.whyReadiness.note}</p>
        </div>
      </section>

      <section id="reinvention">
        <div className="wrap">
          <SplitMedia photo={photos.reinvention} reverse>
            <p className="s-eyebrow">{c.reinvention.label}</p>
            <h2 className="s-split-h">{c.reinvention.h2}</h2>
            <p className="s-lede">{c.reinvention.shortLede}</p>
            <p className="s-lede">{c.reinvention.shortBody}</p>
          </SplitMedia>

          <h3 className="s-sub">{c.reinvention.perspectiveHeading}</h3>
          <p className="s-lede" style={{ marginTop: -6, marginBottom: 12 }}>
            {c.reinvention.perspectiveLede}
          </p>
          <ReinventionLoop
            stages={c.reinvention.stages}
            highlight={["Sense", "Design", "Build"]}
            badge="ECRA"
            centre="Continuous"
            label={c.reinvention.perspectiveHeading}
          />

          <h3 className="s-sub">{c.reinvention.ecraRoleHeading}</h3>
          <p className="s-note" style={{ marginTop: 0 }}>
            {c.reinvention.ecraRole}
          </p>
          <p className="s-quote" data-reveal="up">{c.reinvention.closing}</p>
        </div>
      </section>
    </AboutSubPage>
  );
}
