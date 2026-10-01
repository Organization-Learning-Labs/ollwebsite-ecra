import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import "./dap-report.css";
import { DAP_TOTAL_PAGES, DapReportDocument } from "@/components/dap/DapReportDocument";
import { NamedCards } from "@/components/story/NamedCards";
import { StoryCta } from "@/components/story/StoryCta";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
const NOINDEX = { index: false, follow: false, nocache: true } as const;

export const metadata: Metadata = {
  title: { absolute: "Sample Development Action Plan | The Organization Learning Labs" },
  description: "A sample of the Development Action Plan every assessed employee receives.",
  robots: { ...NOINDEX, googleBot: { ...NOINDEX, noimageindex: true } },
  alternates: { canonical: null },
};

const INSIDE = [
  {
    href: "#dap-glance",
    title: "Overall Summary",
    body: "Based on the job role selected and the belt assigned to the user, the assessment results are summarized into Beginner, Intermediate, Performer, Expert and Best in Class.",
  },
  {
    href: "#dap-sections",
    title: "Competence Overview",
    body: "Overview specific to each competence as far as what has been assessed and what the assessee could focus on for future development.",
  },
  {
    href: "#dap-reading",
    title: "Recommended reading",
    body: "Reading matched to each competence, ordered so the weakest area comes first.",
  },
  {
    href: "#dap-method",
    title: "Methodology and verification",
    body: "How the scores were produced, with a verification code HR can file and check later.",
  },
] as const;

const VALUE = [
  {
    title: "Evidence HR can file",
    body: "Every report follows the same structure, so results stay comparable across people, teams and years.",
  },
  {
    title: "A better development conversation",
    body: "Managers start from specific objectives and actions, not general impressions.",
  },
  {
    title: "Capability gaps you can see",
    body: "Individual plans roll up into a clear view of where your organization needs to build next.",
  },
] as const;

export default function DapReportPage() {
  return (
    <main id="main">
      <StoryMotion />
      <style>{`@page { size: A4 landscape; margin: 12mm; }`}</style>

      <div className="dap-noprint">
        <StoryHero
          eyebrow="Sample report"
          h1="The Development Action Plan every assessed employee receives"
          lede="Each person gets a personal, printable plan that shows where they stand on every competence, what that level means for their job category, and the concrete actions and reading that move them up."
          highlight="Development"
        >
          <p className="dap-hero-note">Illustrative sample. Names, scores and organization are fictional.</p>
          <div className="dap-hero-acts">
            <Link className="btn btn-primary" href="/contact">
              Talk to us
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </StoryHero>

        <section>
          <div className="wrap">
            <StoryHead eyebrow="What's inside" title="Four parts, one clear plan" />
            <ul className="dap-inside" data-stagger>
              {INSIDE.map((item, i) => (
                <li key={item.href} style={{ "--i": i } as CSSProperties}>
                  <a href={item.href}>
                    <span className="dap-inside-n">{i + 1}</span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                    <span className="dap-inside-go">See it in the report</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className="alt dap-viewer-sec" aria-label="Sample Development Action Plan">
        <div className="wrap">
          <div className="dap-viewer" data-reveal="up">
            <div className="dap-viewer-bar">
              <span>
                <span className="dap-viewer-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="dap-viewer-title">Development Action Plan</span>
              </span>
              <span className="dap-viewer-tag">Sample · A4 landscape · {DAP_TOTAL_PAGES} pages</span>
            </div>
            <div className="dap-report">
              <DapReportDocument />
            </div>
          </div>
        </div>
      </section>

      <div className="dap-noprint">
        <section className="dap-value-sec">
          <div className="wrap">
            <StoryHead eyebrow="For your organization" title="What a plan for every employee gives you" />
            <NamedCards items={VALUE} cols={3} />
          </div>
        </section>

        <section className="alt dap-cta-sec">
          <div className="wrap">
            <StoryCta
              heading="See what this looks like for your people"
              body="Start with a readiness assessment, or talk to us about running it across your organization."
              actions={[
                { label: "Assess your readiness", href: "/ecra", primary: true },
                { label: "Contact us", href: "/contact" },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
