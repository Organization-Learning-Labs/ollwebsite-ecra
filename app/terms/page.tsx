import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("terms");

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
            The agreement between you and OLL when you use this website, the OLL platform, the research library, or
            take part in an assessment.
          </p>
          <div className="meta-row">
            <span>Last updated: [date]</span>
            <span>Governing law: India</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap legal">
          <nav className="toc" aria-label="On this page">
            <h4>On this page</h4>
            <a href="#accept">1. Agreement</a>
            <a href="#defs">2. Definitions</a>
            <a href="#accounts">3. Accounts and eligibility</a>
            <a href="#nomination">4. Nomination and authority</a>
            <a href="#use">5. Acceptable use</a>
            <a href="#integrity">6. Assessment integrity</a>
            <a href="#outputs">7. Results and how to use them</a>
            <a href="#ip">8. Intellectual property</a>
            <a href="#fees">9. Fees</a>
            <a href="#availability">10. Availability and changes</a>
            <a href="#warranty">11. Disclaimers</a>
            <a href="#liability">12. Liability</a>
            <a href="#indemnity">13. Indemnity</a>
            <a href="#term">14. Suspension and termination</a>
            <a href="#law">15. Governing law and disputes</a>
            <a href="#contact">16. Contact</a>
          </nav>

          <div className="legal-body">
            <div className="note">
              <p>
                <span className="flag">Draft for legal review</span> Written to match how the platform works today.
                Bracketed items need your entity details, commercial terms and counsel&apos;s review before
                publication.
              </p>
            </div>

            <h2 id="accept">1. Agreement</h2>
            <p>
              These terms form an agreement between you and <strong>[Registered entity name]</strong>{" "}
              (&quot;OLL&quot;, &quot;we&quot;, &quot;us&quot;). By accessing our websites, creating an account or
              taking an assessment, you accept them. If you are accepting on behalf of an organization, you confirm you
              are authorized to bind it, and &quot;you&quot; includes that organization.
            </p>
            <p>
              Where OLL and your organization have signed a separate written agreement, that agreement prevails over
              these terms to the extent of any conflict.
            </p>

            <h2 id="defs">2. Definitions</h2>
            <ul>
              <li>
                <strong>Platform:</strong> the OLL platform, including assessments, Development Action Plans and related
                tools.
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
                <strong>Content:</strong> our frameworks, competency blueprints, assessment items, reports, research and
                all other material we make available.
              </li>
            </ul>

            <h2 id="accounts">3. Accounts and eligibility</h2>
            <p>
              You must be 18 or older and provide accurate information. You are responsible for your credentials and
              for activity under your account. Accounts are personal and may not be shared. Tell us promptly if you
              suspect unauthorized use.
            </p>

            <h2 id="nomination">4. Nomination and authority</h2>
            <p>
              Where a Customer nominates a participant, the Customer confirms it has the authority and any necessary
              consents to do so and to provide us the participant&apos;s details, and that it will tell the participant
              what the assessment is for. A participant is free to decline.
            </p>
            <p>
              The Customer receives progress and completion information where it has authorized the assessment, and
              aggregated insight. Individual results and DAPs are released to the Customer only with the
              participant&apos;s consent, as set out in our{" "}
              <Link className="textlink" href="/privacy">
                privacy policy
              </Link>
              .
            </p>

            <h2 id="use">5. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>
                copy, resell, sublicense or redistribute the Content, or use it to build a competing product;
              </li>
              <li>reverse engineer the platform, or scrape, crawl or bulk-extract material from it;</li>
              <li>upload malicious code, attempt to gain unauthorized access, or interfere with the service;</li>
              <li>misrepresent your identity, role or organization;</li>
              <li>use the platform in breach of any applicable law.</li>
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
              applying employment, equal opportunity and data protection law in your jurisdiction.
            </p>

            <h2 id="ip">8. Intellectual property</h2>
            <p>
              The Content, including the competency blueprints, capability architecture, assessment items, reporting
              formats and research, belongs to OLL or our licensors. Subject to these terms and any applicable fees, we
              grant you a non-exclusive, non-transferable, revocable licence to use the platform and to use reports we
              issue to you internally for your own capability development purposes.
            </p>
            <p>
              Information you submit remains yours. You grant us the rights needed to operate the service, produce your
              results and, in de-identified and aggregated form, improve our research and the assessment architecture.
            </p>

            <h2 id="fees">9. Fees</h2>
            <p>
              Where the platform or a programme is paid for, fees, billing frequency, taxes and refund terms are as set
              out in the applicable order form or plan description. <strong>[Insert commercial terms]</strong> Unless
              stated otherwise, fees are exclusive of applicable taxes and are non-refundable once an assessment has
              been issued.
            </p>

            <h2 id="availability">10. Availability and changes</h2>
            <p>
              We work to keep the platform available but do not guarantee uninterrupted access. We may change, suspend
              or withdraw features, and will give reasonable notice of material changes affecting a paid service.
            </p>

            <h2 id="warranty">11. Disclaimers</h2>
            <p>
              The platform and Content are provided &quot;as is&quot; and &quot;as available&quot;. To the extent
              permitted by law, we exclude implied warranties of merchantability, fitness for a particular purpose and
              non-infringement. We do not warrant any particular business outcome, capability improvement or result
              from using the platform.
            </p>

            <h2 id="liability">12. Liability</h2>
            <p>
              To the extent permitted by law, neither party is liable for indirect, incidental, special or
              consequential loss, or for loss of profit, revenue, goodwill or anticipated savings. Our total liability
              arising out of or in connection with these terms is limited to{" "}
              <strong>[the amount paid to us in the twelve months preceding the claim]</strong>. Nothing here limits
              liability that cannot be limited by law.
            </p>

            <h2 id="indemnity">13. Indemnity</h2>
            <p>
              You will indemnify us against claims arising from your breach of these terms, your misuse of the
              platform, or your use of results in a way these terms do not permit.
            </p>

            <h2 id="term">14. Suspension and termination</h2>
            <p>
              You may close your account at any time. We may suspend or terminate access where you materially breach
              these terms, where required by law, or where continued access poses a security risk. On termination, the
              licence in section 8 ends; reports already issued may be retained for your internal use. Provisions that
              by their nature survive, including sections 7, 8, 11, 12, 13 and 15, continue to apply.
            </p>

            <h2 id="law">15. Governing law and disputes</h2>
            <p>
              These terms are governed by the laws of India. The courts at Bengaluru, Karnataka have exclusive
              jurisdiction, subject to any agreed arbitration. <strong>[Insert arbitration clause if required]</strong>{" "}
              We encourage you to contact us first so we can try to resolve the matter directly.
            </p>

            <h2 id="contact">16. Contact</h2>
            <ul>
              <li>
                <strong>Email:</strong> [legal email]
              </li>
              <li>
                <strong>Phone:</strong> +91 76766 46518
              </li>
              <li>
                <strong>Post:</strong> [registered address], Bengaluru, India
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
