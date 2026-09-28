import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import JsonLd from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { StoryCta } from "@/components/story/StoryCta";
import { StoryHead } from "@/components/story/StoryHead";
import { StoryHero } from "@/components/story/StoryHero";
import { StoryMotion } from "@/components/story/StoryMotion";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("contact");

const ICONS = {
  phone: "M6.6 3.5h3l1.5 4-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z",
  mail: "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
} as const;

const STEPS = [
  { t: "We read your note", s: "A member of the OLL team reviews what you shared and who is best placed to help." },
  { t: "A short scoping call", s: "Within one business day we set up a call to understand your context and goals." },
  { t: "A clear next step", s: "You get a recommended assessment scope, or the research and resources that fit." },
] as const;

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export default function ContactPage() {
  const tel = siteConfig.phone.replace(/\s/g, "");
  const cards = [
    { icon: ICONS.phone, k: "Call us", v: siteConfig.phone, href: `tel:${tel}`, s: "Monday to Friday, 9:30 am to 6:30 pm IST" },
    { icon: ICONS.mail, k: "Email us", v: siteConfig.email.contact, href: `mailto:${siteConfig.email.contact}`, s: "We reply within one business day" },
    { icon: ICONS.spark, k: "Start an assessment", v: "Create your account", href: siteConfig.platform.signup, s: "Set up an enterprise, unit or role assessment" },
  ];

  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("contact"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact us", path: "/contact" },
          ]),
        ]}
      />
      <StoryMotion />
      <StoryHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
        eyebrow="Contact us"
        h1="Let's talk about your capability readiness"
        lede="Whether you are scoping an enterprise assessment, focusing on one unit or role, or exploring a research partnership, tell us where you are and we will help you find the right starting point."
        highlight="readiness"
      />

      <section className="contact-sec">
        <div className="wrap contact-grid">
          <aside className="contact-side">
            <ul className="contact-cards" data-stagger>
              {cards.map((c) => (
                <li key={c.k}>
                  <a className="contact-card" href={c.href}>
                    <span className="contact-card-ic">
                      <Icon d={c.icon} />
                    </span>
                    <span className="contact-card-body">
                      <span className="contact-card-k">{c.k}</span>
                      <strong>{c.v}</strong>
                      <small>{c.s}</small>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <div className="contact-form-card" data-reveal="up">
            <h2>Send us a message</h2>
            <p>All fields are required. We only use these details to reply to you.</p>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <StoryHead eyebrow="What happens next" title="From first message to a clear plan" />
          <ol className="next-steps" data-stagger>
            {STEPS.map((step, i) => (
              <li key={step.t} style={{ "--i": i } as CSSProperties}>
                <span className="next-steps-n">{i + 1}</span>
                <strong>{step.t}</strong>
                <p>{step.s}</p>
              </li>
            ))}
          </ol>
          <p className="contact-faq" data-reveal="up">
            Looking for a quick answer? Browse the{" "}
            <Link className="inline-link" href="/#faq">
              questions and answers
            </Link>{" "}
            on our home page.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <StoryCta
            heading="Ready to see where you stand?"
            body="Start with a readiness assessment at the level that fits your organization today."
            actions={[
              { label: "Assess your readiness", href: siteConfig.platform.signup, primary: true },
              { label: "Explore Our Assessment", href: "/ecra" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}
