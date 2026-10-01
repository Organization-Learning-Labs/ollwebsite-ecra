import JsonLd from "@/components/JsonLd";
import { EcraCta } from "@/components/ecra/EcraCta";
import { EcraNextCard } from "@/components/ecra/EcraNextCard";
import { EcraSectionNav } from "@/components/ecra/EcraSectionNav";
import { LevelIcon } from "@/components/ecra/LevelIcon";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { ECRA_NAV_LABEL, ecraLevel, type LevelSlug } from "@/data/ecra";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import type { pages } from "@/lib/site";

type EcraSubPageProps = {
  slug: LevelSlug;
  pageKey: keyof typeof pages;
  children: React.ReactNode;
};

/** Frame for every ECRA level page: hero, section tabs, content, next link and CTA. */
export function EcraSubPage({ slug, pageKey, children }: EcraSubPageProps) {
  const level = ecraLevel(slug);
  return (
    <main id="main" className="ecra-page">
      <JsonLd
        data={[
          webPageJsonLd(pageKey),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: ECRA_NAV_LABEL, path: "/ecra" },
            { name: level.title, path: level.href },
          ]),
        ]}
      />
      <StoryMotion />
      <div className="lv-hero">
        <LevelIcon slug={slug} className="lv-icon lv-icon--hero" />
        <StoryHero
          eyebrow={`Assessment level · ${level.title}`}
          h1={level.title}
          lede={level.summary}
          crumbs={[{ label: "Home", href: "/" }, { label: ECRA_NAV_LABEL, href: "/ecra" }, { label: level.title }]}
        />
      </div>
      <EcraSectionNav current={slug} />
      {children}
      <section className="about-end">
        <div className="wrap">
          <EcraNextCard current={slug} />
          <div style={{ marginTop: 72 }}>
            <EcraCta slug={slug} />
          </div>
        </div>
      </section>
    </main>
  );
}
