import type { Metadata } from "next";
import { AboutSubPage } from "@/components/about/AboutSubPage";
import { BigStatement } from "@/components/story/BigStatement";
import { NumberedList } from "@/components/story/NumberedList";
import { StoryHead } from "@/components/story/StoryHead";
import { aboutContent as c } from "@/data/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("aboutResponsible");

export default function ResponsibleAssessmentPage() {
  return (
    <AboutSubPage
      slug="responsible-assessment"
      pageKey="aboutResponsible"
      eyebrow={c.responsible.label}
      h1={c.responsible.h2}
      lede={c.responsible.shortLede}
    >
      <section>
        <div className="wrap">
          <StoryHead eyebrow="Seven commitments" title="How we assess." lede={c.responsible.grounding} />
          <NumberedList items={c.responsible.commitments} cols={2} label="Responsible assessment commitments" />
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead title={c.responsible.participantsHeading} lede={c.responsible.participantsIntro} />
          <ul className="s-bullets">
            {c.responsible.participantsPoints.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap">
          <BigStatement eyebrow="Our objective" statement={c.responsible.objective} tone="dark" size="md" />
        </div>
      </section>
    </AboutSubPage>
  );
}
