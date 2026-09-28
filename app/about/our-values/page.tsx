import type { Metadata } from "next";
import { AboutSubPage } from "@/components/about/AboutSubPage";
import { NumberedList } from "@/components/story/NumberedList";
import { StoryHead } from "@/components/story/StoryHead";
import { WordGrid } from "@/components/story/WordGrid";
import { aboutContent as c } from "@/data/about";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("aboutValues");

export default function OurValuesPage() {
  return (
    <AboutSubPage
      slug="our-values"
      pageKey="aboutValues"
      eyebrow={c.values.label}
      h1={c.values.h2}
      lede={c.values.shortLede}
    >
      <section>
        <div className="wrap">
          <WordGrid
            items={c.values.items.map((v) => ({ title: v.title, line: v.principle, sub: v.short }))}
          />
        </div>
      </section>

      <section id="pillars" className="alt">
        <div className="wrap">
          <StoryHead eyebrow={c.pillars.label} title={c.pillars.h2} lede={c.pillars.shortLede} />
          <NumberedList items={c.pillars.items} cols={2} label={c.pillars.label} />
          <p className="s-closing">{c.pillars.closing}</p>
        </div>
      </section>
    </AboutSubPage>
  );
}
