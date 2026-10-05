import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./not-found.css";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";

export const metadata: Metadata = {
  title: { absolute: "Page not found | The Organization Learning Labs" },
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

const DESTINATIONS = [
  {
    href: "/ecra",
    title: "Assess your readiness",
    body: "Start an Enterprise Competence Readiness Assessment at the level that fits you.",
  },
  {
    href: "/competence-blueprint",
    title: "Competence Blueprint",
    body: "See how competences are defined, levelled and linked to every role.",
  },
  {
    href: "/about",
    title: "About us",
    body: "Our purpose, our values and the approach behind our research.",
  },
  {
    href: "/about/responsible-assessment",
    title: "Responsible Assessment",
    body: "How we keep every assessment fair, private and evidence based.",
  },
] as const;

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function NotFound() {
  return (
    <main id="main" className="nf">
      <StoryMotion />
      <div className="nf-hero">
        <span className="nf-num" aria-hidden="true">
          404
        </span>
        <StoryHero
          eyebrow="Error 404"
          h1="This page took a different path"
          lede="The link may be old, or the page may have moved. Here are the best places to pick up from."
          highlight="path"
        >
          <div className="nf-acts">
            <Link className="btn btn-primary" href="/">
              Back to home
              <Arrow />
            </Link>
            <Link className="btn btn-ghost" href="/contact">
              Talk to us
            </Link>
          </div>
        </StoryHero>
      </div>

      <section>
        <div className="wrap">
          <StoryHead eyebrow="Popular destinations" title="Pick up from here" />
          <ul className="nf-cards" data-stagger>
            {DESTINATIONS.map((d, i) => (
              <li key={d.href} style={{ "--i": i } as CSSProperties}>
                <Link className="s-card nf-card" href={d.href}>
                  <h3>{d.title}</h3>
                  <p>{d.body}</p>
                  <span className="nf-go">
                    Go
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
