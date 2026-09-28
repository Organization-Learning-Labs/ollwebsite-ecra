import Link from "next/link";
import type { CSSProperties } from "react";
import { SplitWords } from "./SplitWords";

type Crumb = { label: string; href?: string };

type StoryHeroProps = {
  eyebrow: string;
  h1: string;
  lede: string;
  chips?: readonly string[];
  crumbs?: Crumb[];
  /** One word of the h1 to sweep with the amber marker. */
  highlight?: string;
};

/** Text-first oversized hero used across the story pages. */
export function StoryHero({ eyebrow, h1, lede, chips, crumbs, highlight }: StoryHeroProps) {
  return (
    <header className="s-hero">
      <div className="wrap">
        {crumbs ? (
          <nav className="about-crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c) => (
                <li key={c.label} aria-current={c.href ? undefined : "page"}>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="s-eyebrow">{eyebrow}</p>
        <h1 className="s-hero-h1">
          <SplitWords text={h1} highlight={highlight} />
        </h1>
        <p className="s-hero-lede">{lede}</p>
        {chips?.length ? (
          <ul className="s-chips">
            {chips.map((chip, i) => (
              <li key={chip} style={{ "--i": i } as CSSProperties}>
                {chip}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </header>
  );
}
