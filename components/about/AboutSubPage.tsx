import JsonLd from "@/components/JsonLd";
import { AboutCta } from "@/components/about/AboutCta";
import { AboutNextCard } from "@/components/about/AboutNextCard";
import { AboutSectionNav } from "@/components/about/AboutSectionNav";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { aboutSection, type AboutSectionSlug } from "@/data/about-sections";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import type { pages } from "@/lib/site";

type AboutSubPageProps = {
  slug: AboutSectionSlug;
  pageKey: keyof typeof pages;
  eyebrow: string;
  h1: string;
  lede: string;
  children: React.ReactNode;
};

/** Frame for every About sub-page: hero, section tabs, content, next link and CTA. */
export function AboutSubPage({ slug, pageKey, eyebrow, h1, lede, children }: AboutSubPageProps) {
  const section = aboutSection(slug);
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd(pageKey),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
            { name: section.title, path: section.href },
          ]),
        ]}
      />
      <StoryMotion />
      <StoryHero
        eyebrow={eyebrow}
        h1={h1}
        lede={lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "About us", href: "/about" }, { label: section.title }]}
      />
      <AboutSectionNav current={slug} />
      {children}
      <section className="about-end">
        <div className="wrap">
          <AboutNextCard current={slug} />
          <div style={{ marginTop: 72 }}>
            <AboutCta />
          </div>
        </div>
      </section>
    </main>
  );
}
