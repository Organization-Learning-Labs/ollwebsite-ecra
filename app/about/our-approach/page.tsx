import type { Metadata } from "next";
import Link from "next/link";
import { AboutSubPage } from "@/components/about/AboutSubPage";
import { BigStatement } from "@/components/story/BigStatement";
import { NamedCards } from "@/components/story/NamedCards";
import { HierarchyTiers } from "@/components/story/HierarchyTiers";
import { NumberedList } from "@/components/story/NumberedList";
import { ProcessFunnel } from "@/components/story/ProcessFunnel";
import { StoryHead } from "@/components/story/StoryHead";
import { SystemFlow } from "@/components/story/SystemFlow";
import { aboutContent as c } from "@/data/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("aboutApproach");

export default function OurApproachPage() {
  const b = c.blueprint;
  return (
    <AboutSubPage
      slug="our-approach"
      pageKey="aboutApproach"
      eyebrow={c.approach.label}
      h1={c.approach.h2}
      lede={c.approach.shortLede}
    >
      <section>
        <div className="wrap">
          <StoryHead eyebrow="Seven steps" title="From research to embedded capability." />
          <NumberedList items={c.approach.steps} cols={2} label={c.approach.label} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.approach.architectureLabel} title="Five parts, one architecture." />
          <SystemFlow parts={c.approach.architecture} label={c.approach.architectureLabel} />
        </div>
      </section>

      <section id="blueprint">
        <div className="wrap">
          <StoryHead eyebrow={b.label} title={b.h2} lede={b.shortIntro} />
          <BigStatement statement={b.pullQuote} />
          <Link className="inline-link" href="/competence-blueprint">
            Explore the Competence Blueprint →
          </Link>

          <h3 className="s-sub">{b.expertHeading}</h3>
          <p className="s-lede" style={{ marginTop: 0 }}>
            {b.shortExpert}
          </p>

          <h3 className="s-sub">{b.processHeading}</h3>
          <ProcessFunnel steps={b.process} label={b.processHeading} />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow="Architecture" title={b.architectureHeading} lede={b.shortArchitectureLede} />
          <h3 className="s-sub">{b.exampleHeading}</h3>
          <p className="s-lede" style={{ marginTop: -6, marginBottom: 0 }}>
            {b.exampleLede}
          </p>
          <HierarchyTiers
            tiers={b.hierarchy}
            example={b.exampleRows}
            exampleTitle={b.exampleTitle}
            label={b.architectureHeading}
          />
          <p className="s-note">{b.exampleNote}</p>
          <p className="s-note">
            <strong>Important distinction.</strong> {b.distinction}
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <StoryHead eyebrow="Why it matters" title={b.whyHeading} lede={b.shortWhyLede} />
          <NamedCards items={b.whyBullets} cols={3} />
          <p className="s-quote" data-reveal="up">{b.whyQuote}</p>
        </div>
      </section>
    </AboutSubPage>
  );
}
