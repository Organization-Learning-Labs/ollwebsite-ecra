import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("terms");

const LAST_UPDATED = "1 October 2026";
const { legalName, llpin, registeredOffice, phone } = siteConfig;
const LEGAL_EMAIL = siteConfig.email.legal;

const SECTIONS = [
  ["accept", "Agreement"],
  ["defs", "Definitions"],
  ["accounts", "Accounts and eligibility"],
  ["nomination", "Nomination and authority"],
  ["use", "Acceptable use"],
  ["integrity", "Assessment integrity"],
  ["outputs", "Results and how to use them"],
  ["ai", "Ollie and website content"],
  ["ip", "Intellectual property"],
  ["fees", "Fees, taxes and refunds"],
  ["availability", "Availability and changes"],
  ["links", "Third-party links"],
  ["warranty", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["indemnity", "Indemnity"],
  ["term", "Suspension and termination"],
  ["force", "Force majeure"],
  ["law", "Governing law and disputes"],
  ["general", "General"],
  ["contact", "Contact and notices"],
] as const;

export default function TermsPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("terms"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      <div className="phead">
        <div className="wrap narrow">
          <p className="label">Legal</p>
          <h1>Terms and conditions</h1>
          <p className="lede">
            The agreement between you and OLL when you use our websites, the OLL platforms, the research library or
            Ollie, or take part in an assessment.
          </p>
          <div className="meta-row">
            <span>Last updated: {LAST_UPDATED}</span>
            <span>Governing law: India</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap legal">
          <nav className="toc" aria-label="On this page">
            <h4>On this page</h4>
            {SECTIONS.map(([id, label], i) => (
              <a key={id} href={`#${id}`}>
                {i + 1}. {label}
              </a>
            ))}
          </nav>

          <div className="legal-body">
            <h2 id="accept">1. Agreement</h2>
            <p>
              These terms form a binding agreement between you and <strong>{legalName}</strong> (LLPIN {llpin}), with
              its registered office at {registeredOffice.full} (&quot;OLL&quot;, &quot;we&quot;, &quot;us&quot;).
            </p>
            <p>
              By accessing our websites, creating an account, clicking to accept, or taking an assessment, you agree to
              these terms. This is an electronic record under the Information Technology Act, 2000 and does not need a
              physical or digital signature. If you accept on behalf of an organization, you confirm you are authorized
              to bind it, and &quot;you&quot; includes that organization.
            </p>
            <p>
              Where OLL and your organization have signed a separate written agreement or order form, that agreement
              prevails over these terms to the extent of any conflict. Our{" "}
              <Link className="textlink" href="/privacy">
                privacy policy
              </Link>{" "}
              explains how we handle personal data and forms part of these terms.
            </p>

            <h2 id="defs">2. Definitions</h2>
            <ul>
              <li>
                <strong>Services:</strong> theorganizationlearninglabs.com, the OLL platform (platform.ollacademy.com),
                the admin portal (admin.ollacademy.com), the OLL Research library (research.ollacademy.com) and Ollie.
              </li>
              <li>
                <strong>Assessment:</strong> the Enterprise Capability Readiness Assessment and any other diagnostic we
                make available.
              </li>
              <li>
                <strong>DAP:</strong> the Development Action Plan produced for a participant.
              </li>
              <li>
                <strong>Participant:</strong> an individual who takes an assessment, whether self-enrolled or
                nominated.
              </li>
              <li>
                <strong>Customer:</strong> an organization that contracts with us or nominates participants.
              </li>
              <li>
                <strong>Content:</strong> our frameworks, competence blueprints, assessment items, reports, research and
                all other material we make available.
              </li>
              <li>
                <strong>Ollie:</strong> the AI assistant on our websites.
              </li>
            </ul>

            <h2 id="accounts">3. Accounts and eligibility</h2>
            <p>
              You must be 18 or older and competent to contract under the Indian Contract Act, 1872, and you must give
              accurate information. You are responsible for keeping your credentials secure and for activity under your
              account. Accounts are personal and may not be shared. Tell us promptly if you suspect unauthorized use.
            </p>

            <h2 id="nomination">4. Nomination and authority</h2>
            <p>
              Where a Customer or an individual nominates a participant, they confirm they have a genuine work reason
              and the authority to do so and to give us the participant&apos;s details, and that the Customer will tell
              the participant what the assessment is for. A participant is free to decline.
            </p>
            <p>
              The Customer receives progress and completion information where it has authorized the assessment, and
              aggregated insight. Individual results and DAPs are released to the Customer only with the
              participant&apos;s consent, as set out in our{" "}
              <Link className="textlink" href="/privacy#results">
                privacy policy
              </Link>
              .
            </p>

            <h2 id="use">5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>copy, resell, sublicense or redistribute the Content, or use it to build a competing product;</li>
              <li>reverse engineer the Services, or scrape, crawl or bulk-extract material from them;</li>
              <li>
                use the Content or Ollie&apos;s output to train or improve any AI model, or try to extract Ollie&apos;s
                instructions or bypass its safeguards;
              </li>
              <li>upload malicious code, attempt unauthorized access, or interfere with the Services;</li>
              <li>misrepresent your identity, role or organization, or nominate someone without a genuine reason;</li>
              <li>
                post or submit anything unlawful, defamatory, obscene, infringing or harmful, or anything prohibited
                under the Information Technology Act, 2000 and the rules made under it;
              </li>
              <li>use the Services in breach of any applicable law.</li>
            </ul>

            <h2 id="integrity">6. Assessment integrity</h2>
            <p>
              Assessments are designed to be completed by the named participant, working alone, without recording,
              publishing or sharing the questions. Results obtained otherwise are not meaningful and we may invalidate
              them. Assessment items are confidential to OLL.
            </p>

            <h2 id="outputs">7. Results and how to use them</h2>
            <div className="callout">
              <p>
                Results indicate readiness against a defined set of competencies for a role. They are a development
                input. They are not a psychometric or clinical instrument and they are not designed for use as the sole
                basis of a hiring, promotion, disciplinary or termination decision.
              </p>
            </div>
            <p>
              A single participant&apos;s result gives an individual-level view, not a verdict on a department or an
              organization. Decisions you take on the strength of any result remain yours, and you are responsible for
              complying with employment, equal opportunity and data protection law that applies to you.
            </p>

            <h2 id="ai">8. Ollie and website content</h2>
            <p>
              Ollie is an automated assistant. Its replies are generated by an AI model, can be incomplete or wrong, and
              are not professional, legal, financial or employment advice. Research, articles and other website content
              are for general information. Check anything important with us before relying on it. Do not share
              sensitive personal data with Ollie.
            </p>

            <h2 id="ip">9. Intellectual property</h2>
            <p>
              The Content, including the competence blueprints, capability architecture, assessment items, reporting
              formats, research, and the OLL and OLL Academy names and logos, belongs to OLL or our licensors and is
              protected under the Copyright Act, 1957, the Trade Marks Act, 1999 and other law. Subject to these terms
              and any applicable fees, we grant you a non-exclusive, non-transferable, revocable licence to use the
              Services and to use reports we issue to you internally for your own capability development.
            </p>
            <p>
              Information you submit remains yours. You grant us the rights needed to operate the Services, produce
              your results and, in de-identified and aggregated form, improve our research and the assessment
              architecture.
            </p>

            <h2 id="fees">10. Fees, taxes and refunds</h2>
            <p>
              Where an assessment, plan or programme is paid for, the price, billing frequency, payment terms and
              refund terms are those shown in the applicable order form, proposal or plan description at the time of
              purchase. Unless stated otherwise:
            </p>
            <ul>
              <li>prices are in Indian rupees and exclude GST and other applicable taxes, which are added at the prevailing rate;</li>
              <li>we issue a GST-compliant tax invoice for every payment;</li>
              <li>invoices for organizations are payable within the period stated on the invoice;</li>
              <li>
                refunds, where available, are made to the original payment method within the period stated in the
                applicable terms.
              </li>
            </ul>
            <p>
              Nothing in these terms limits any right you have as a consumer under the Consumer Protection Act, 2019.
            </p>

            <h2 id="availability">11. Availability and changes</h2>
            <p>
              We work to keep the Services available but do not guarantee uninterrupted access. We may change, suspend
              or withdraw features, and will give reasonable notice of material changes affecting a paid service.
            </p>
            <p>
              We may update these terms. We will post the revised version here with a new date and, where a change is
              significant, tell account holders before it takes effect. Continuing to use the Services after that
              means you accept the updated terms.
            </p>

            <h2 id="links">12. Third-party links</h2>
            <p>
              The Services may link to websites or services we do not control. We are not responsible for their
              content, terms or privacy practices.
            </p>

            <h2 id="warranty">13. Disclaimers</h2>
            <p>
              The Services and Content are provided &quot;as is&quot; and &quot;as available&quot;. To the extent
              permitted by law, we exclude implied warranties of merchantability, fitness for a particular purpose and
              non-infringement. We do not promise any particular business outcome, capability improvement or result
              from using the Services.
            </p>

            <h2 id="liability">14. Limitation of liability</h2>
            <p>
              To the extent permitted by law, neither party is liable for indirect, incidental, special or
              consequential loss, or for loss of profit, revenue, goodwill or anticipated savings. Our total liability
              arising out of or in connection with these terms is limited to the fees you paid us for the relevant
              Service in the twelve months before the event giving rise to the claim. Nothing in these terms limits
              liability for fraud, for death or personal injury caused by negligence, or any other liability that
              cannot be limited under Indian law.
            </p>

            <h2 id="indemnity">15. Indemnity</h2>
            <p>
              You will indemnify us against claims, losses and reasonable costs arising from your breach of these
              terms, your misuse of the Services, a nomination you make without proper authority, or your use of
              results in a way these terms do not permit.
            </p>

            <h2 id="term">16. Suspension and termination</h2>
            <p>
              You may close your account at any time. We may suspend or terminate access where you materially breach
              these terms, where required by law, or where continued access poses a security risk; where reasonable we
              will tell you first. On termination, the licence in section 9 ends and reports already issued may be kept
              for your internal use. Sections 7, 9, 13, 14, 15, 18 and 19 survive termination.
            </p>

            <h2 id="force">17. Force majeure</h2>
            <p>
              Neither party is liable for delay or failure caused by events beyond its reasonable control, such as
              natural disasters, epidemics, war, government action, or failure of public utilities or networks, other
              than payment obligations.
            </p>

            <h2 id="law">18. Governing law and disputes</h2>
            <p>
              These terms are governed by the laws of India. Please contact us first; we will try in good faith to
              resolve any dispute within 30 days.
            </p>
            <ul>
              <li>
                <strong>Organizations and business users:</strong> any dispute not resolved within 30 days will be
                referred to arbitration under the Arbitration and Conciliation Act, 1996 by a sole arbitrator appointed
                by mutual agreement. The seat and venue of arbitration is Bengaluru, Karnataka, and the language is
                English. Subject to this, the courts at Bengaluru have exclusive jurisdiction.
              </li>
              <li>
                <strong>Individuals acting as consumers:</strong> the courts at Bengaluru have jurisdiction, and
                nothing here prevents you from approaching a consumer commission or court where the Consumer Protection
                Act, 2019 allows you to.
              </li>
            </ul>

            <h2 id="general">19. General</h2>
            <ul>
              <li>
                <strong>Entire agreement:</strong> these terms, the privacy policy and any order form or written
                agreement are the whole agreement between us about the Services.
              </li>
              <li>
                <strong>Severability:</strong> if any part is found unenforceable, the rest continues to apply.
              </li>
              <li>
                <strong>Assignment:</strong> you may not transfer your rights under these terms without our consent. We
                may transfer ours as part of a merger, acquisition or restructuring.
              </li>
              <li>
                <strong>No waiver:</strong> a delay in enforcing a right is not a waiver of it.
              </li>
            </ul>

            <h2 id="contact">20. Contact and notices</h2>
            <p>
              Legal notices to OLL must be sent by email and to our registered office. We send notices to the email
              address on your account.
            </p>
            <ul>
              <li>
                <strong>Entity:</strong> {legalName}, LLPIN {llpin}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a className="textlink" href={`mailto:${LEGAL_EMAIL}`}>
                  {LEGAL_EMAIL}
                </a>
              </li>
              <li>
                <strong>Phone:</strong> {phone}
              </li>
              <li>
                <strong>Registered office:</strong> {registeredOffice.full}
              </li>
            </ul>
            <p>
              For privacy questions and grievances, see the{" "}
              <Link className="textlink" href="/privacy#contact">
                Grievance Officer section of our privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
