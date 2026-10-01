import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata("privacy");

const LAST_UPDATED = "1 October 2026";
const { legalName, llpin, registeredOffice, grievanceOfficer, phone } = siteConfig;

const SECTIONS = [
  ["who", "Who we are"],
  ["role", "Our role"],
  ["collect", "What we collect"],
  ["why", "Why we use it"],
  ["results", "Who sees assessment results"],
  ["aggregate", "Aggregated insight"],
  ["nominated", "People nominated by someone else"],
  ["ollie", "Ollie, our AI assistant"],
  ["share", "Sharing and service providers"],
  ["cookies", "Cookies and browser storage"],
  ["retention", "Retention"],
  ["security", "Security and breaches"],
  ["rights", "Your rights"],
  ["transfers", "Transfers outside India"],
  ["children", "Children"],
  ["changes", "Changes to this policy"],
  ["contact", "Grievance Officer and contact"],
] as const;

export default function PrivacyPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("privacy"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Privacy policy", path: "/privacy" },
          ]),
        ]}
      />
      <div className="phead">
        <div className="wrap narrow">
          <p className="label">Legal</p>
          <h1>Privacy policy</h1>
          <p className="lede">
            How OLL collects, uses, shares and protects personal data when you visit our websites, talk to Ollie, take
            an assessment, or nominate someone else to take one.
          </p>
          <div className="meta-row">
            <span>Last updated: {LAST_UPDATED}</span>
            <span>
              Applies to: theorganizationlearninglabs.com, platform.ollacademy.com, admin.ollacademy.com and
              research.ollacademy.com
            </span>
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
            <h2 id="who">1. Who we are</h2>
            <p>
              This policy is issued by <strong>{legalName}</strong> (LLPIN {llpin}), a limited liability partnership
              registered in India with its registered office at {registeredOffice.full} (&quot;OLL&quot;,
              &quot;we&quot;, &quot;us&quot;).
            </p>
            <p>
              It applies to this website, the OLL assessment platform (platform.ollacademy.com), the organization admin
              portal (admin.ollacademy.com), the OLL Research library (research.ollacademy.com), and Ollie, the AI
              assistant on our websites (together, the &quot;Services&quot;).
            </p>
            <p>
              This policy is published under the Information Technology Act, 2000 and the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and
              is written to meet the Digital Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and the Digital
              Personal Data Protection Rules, 2025 as their obligations come into force.
            </p>

            <h2 id="role">2. Our role</h2>
            <ul>
              <li>
                <strong>When you visit our websites, contact us, use Ollie or sign up on your own,</strong> we decide
                why and how your personal data is processed. We are the Data Fiduciary and you should contact us about
                it.
              </li>
              <li>
                <strong>When your employer or another organization nominates you for an assessment,</strong> that
                organization decides to run the assessment and is the Data Fiduciary. We process your personal data on
                its behalf as its Data Processor, under a contract with it. You can contact either the organization or
                us; where a request belongs to the organization, we will pass it on and tell you we have done so.
              </li>
            </ul>

            <h2 id="collect">3. What we collect</h2>
            <h3>Information you give us</h3>
            <ul>
              <li>
                <strong>Account details:</strong> name, work email, password (stored only in hashed form), organization
                name and phone number where provided.
              </li>
              <li>
                <strong>Role context:</strong> job role, function, department, industry and sub-industry, the role you
                are developing towards, and profiling answers the assessment needs.
              </li>
              <li>
                <strong>Assessment responses:</strong> your answers to scenario, multiple-choice, ranking and task
                questions.
              </li>
              <li>
                <strong>Goals and development inputs:</strong> priorities you set, progress you record and anything you
                submit during a development activity.
              </li>
              <li>
                <strong>Enquiries:</strong> your name, email, organization, phone number and message when you use our
                contact form, write to us or call us.
              </li>
              <li>
                <strong>Ollie conversations:</strong> the messages you type into Ollie and any contact details you
                choose to share with it.
              </li>
              <li>
                <strong>Nominations:</strong> when you nominate someone or ask us to approach a colleague, your name,
                email and role, and the name, role, email and organization of the person you nominate.
              </li>
            </ul>
            <h3>Information generated when you use the Services</h3>
            <ul>
              <li>
                <strong>Results and outputs:</strong> competence scores, level bands, capability signatures and your
                Development Action Plan.
              </li>
              <li>
                <strong>Usage and log data:</strong> pages and features used, time taken, device and browser type, IP
                address and approximate location derived from it, and security logs.
              </li>
              <li>
                <strong>Campaign data:</strong> if you arrive through a link we sent you, an identifier for that
                campaign so we know the link was used.
              </li>
            </ul>
            <p>
              We collect only what the Services need. We do not ask for passwords to other services, financial
              account details, health, biometric, religious or similar sensitive information, and you should not submit
              it in an assessment, a form or to Ollie. Payments, where made online, are handled by our payment provider
              and we do not store your card details.
            </p>

            <h2 id="why">4. Why we use it</h2>
            <ul>
              <li>To create and administer accounts and deliver the assessment relevant to your role and industry.</li>
              <li>To produce your results and Development Action Plan, and help you interpret them.</li>
              <li>
                To report progress and completion to the organization that nominated you, where it has authorized the
                assessment.
              </li>
              <li>To produce aggregated capability insight for that organization, as described in section 6.</li>
              <li>To answer enquiries, respond through Ollie and follow up on requests you make.</li>
              <li>To contact a person you nominate, as described in section 7.</li>
              <li>To improve the assessment architecture, our research and the Services, using de-identified data.</li>
              <li>To keep the Services secure, prevent misuse and meet our legal obligations.</li>
            </ul>
            <p>We process personal data only on a ground the DPDP Act allows:</p>
            <ul>
              <li>
                <strong>Your consent,</strong> which is free, specific, informed and unambiguous, and which you can
                withdraw at any time as easily as you gave it; or
              </li>
              <li>
                <strong>A legitimate use under section 7 of the DPDP Act,</strong> such as information you provide
                voluntarily for a specific purpose (for example, an enquiry), purposes of employment where your employer
                nominates you, or compliance with law, a court order or a government request.
              </li>
            </ul>
            <p>
              Withdrawing consent does not affect processing that took place before you withdrew it. If you withdraw
              consent we need to deliver an assessment, we may be unable to continue it.
            </p>

            <h2 id="results">5. Who sees assessment results</h2>
            <div className="callout">
              <p>
                An individual&apos;s full results and Development Action Plan are not shared with an employer
                automatically. Sharing them requires the participant&apos;s consent and follows the organization&apos;s
                own policy.
              </p>
            </div>
            <ul>
              <li>
                <strong>The participant</strong> sees their full results and Development Action Plan.
              </li>
              <li>
                <strong>OLL assessment staff</strong> access results only where needed to deliver, support and
                quality-assure the assessment, under confidentiality obligations.
              </li>
              <li>
                <strong>The nominating organization</strong> receives progress and completion updates where it has
                authorized the assessment, and aggregated insight as described below.
              </li>
            </ul>
            <p>
              A single participant&apos;s result is an individual-level view. It is not a measure of the whole
              organization and we do not present it as one.
            </p>

            <h2 id="aggregate">6. Aggregated insight</h2>
            <p>
              Department and organization views are built from authorized, aggregated results. We design them so that
              individual results cannot reasonably be identified, including by applying a minimum group size before a
              breakdown is shown. Where a group is too small to aggregate safely, the view is withheld.
            </p>

            <h2 id="nominated">7. People nominated by someone else</h2>
            <p>
              A colleague or your organization may give us your name, role, work email and organization so that we can
              invite you to an assessment or tell you about the Services. When we first contact you, we will say who
              nominated you and why, and link to this policy.
            </p>
            <p>
              You are free to decline. You can ask us at any time to stop contacting you or to delete the details we
              were given, by replying to our message or writing to the Grievance Officer in section 17. If you do not
              respond, we delete nomination details within 12 months of the last contact. A person who nominates
              someone confirms they have a genuine work reason to do so.
            </p>

            <h2 id="ollie">8. Ollie, our AI assistant</h2>
            <ul>
              <li>
                Ollie is an automated assistant. Its answers are generated by an AI model and can be incomplete or
                wrong. They are not professional, legal or employment advice.
              </li>
              <li>
                Your messages are sent to our AI service provider, Anthropic, to generate a reply, and are stored by us
                so the conversation can continue and so we can improve Ollie and follow up on requests.
              </li>
              <li>
                Do not share sensitive personal data, or information about other people you are not entitled to share,
                with Ollie.
              </li>
              <li>
                We keep Ollie conversations for 12 months from your last message, unless you ask us to delete them
                sooner. A small counter in your browser limits the number of messages per day; it holds no content.
              </li>
            </ul>

            <h2 id="share">9. Sharing and service providers</h2>
            <p>We do not sell personal data and we do not share it for advertising. We share it only:</p>
            <ul>
              <li>with the organization that nominated you, to the extent described in section 5;</li>
              <li>
                with service providers who process it on our instructions under contract, including:
                <ul>
                  <li>
                    <strong>Railway</strong>: website and application hosting;
                  </li>
                  <li>
                    <strong>Resend</strong>: sending emails, such as enquiry confirmations;
                  </li>
                  <li>
                    <strong>Anthropic</strong>: the AI model that powers Ollie;
                  </li>
                  <li>providers of cloud hosting, databases, email and payment processing for the platforms;</li>
                </ul>
              </li>
              <li>
                where required by law, a court order or a lawful request from a government authority, or to protect the
                rights, property or safety of our users, OLL or the public;
              </li>
              <li>
                in connection with a merger, acquisition or restructuring, where the recipient is bound by protections
                no less than this policy.
              </li>
            </ul>
            <p>An up-to-date list of service providers is available from the Grievance Officer on request.</p>

            <h2 id="cookies">10. Cookies and browser storage</h2>
            <p>
              Our website does not use advertising, analytics or other tracking cookies. It uses only storage that is
              strictly necessary for features you use:
            </p>
            <ul>
              <li>
                <strong>Local storage</strong> holds Ollie&apos;s daily message counter.
              </li>
              <li>
                <strong>Session storage</strong> holds the details you enter in the pilot or nomination flow until you
                close the tab, so you do not have to retype them.
              </li>
            </ul>
            <p>
              The platforms use essential cookies to keep you signed in and secure. You can clear stored data through
              your browser settings, but some features may then stop working. If we introduce analytics or other
              non-essential cookies, we will update this section and ask for your consent first.
            </p>

            <h2 id="retention">11. Retention</h2>
            <ul>
              <li>
                <strong>Account and assessment data:</strong> while your account is active and for 3 years after it
                closes or the customer contract ends, so development progress remains meaningful and we can meet legal
                and contractual obligations, unless a contract with your organization sets a different period.
              </li>
              <li>
                <strong>Enquiries, Ollie conversations and nominations:</strong> 12 months from the last interaction.
              </li>
              <li>
                <strong>Security logs:</strong> at least 1 year, as required by law.
              </li>
              <li>
                <strong>Tax and accounting records:</strong> for the period Indian tax law requires.
              </li>
            </ul>
            <p>
              When the purpose is served and no law requires us to keep it, we delete personal data or de-identify it.
              Before deleting account data for inactivity, we will give you at least 48 hours&apos; notice so you can
              sign in or download your reports. De-identified and aggregated data may be kept for research.
            </p>

            <h2 id="security">12. Security and breaches</h2>
            <p>
              We use reasonable security safeguards, including access controls, encryption in transit, segregation of
              assessment content and results, restricted and logged access to identifiable results, and contractual
              security obligations on our providers. No system is completely secure, but we work to limit both the
              likelihood and the impact of an incident.
            </p>
            <p>
              If a personal data breach occurs, we will inform affected individuals without delay and notify the Data
              Protection Board of India and CERT-In within the times the law requires, explaining what happened, the
              likely consequences and the steps we are taking.
            </p>

            <h2 id="rights">13. Your rights</h2>
            <p>Under the DPDP Act and other applicable law, you can:</p>
            <ul>
              <li>get a summary of the personal data we hold about you and how we process it;</li>
              <li>ask us to correct, complete or update it;</li>
              <li>ask us to erase it, unless we must keep it to meet a legal obligation;</li>
              <li>withdraw a consent you gave;</li>
              <li>
                nominate another person to exercise your rights if you die or become unable to act, by writing to us
                with that person&apos;s name and contact details;
              </li>
              <li>raise a grievance with us, and then with the Data Protection Board of India.</li>
            </ul>
            <p>
              To use any of these rights, write to the Grievance Officer in section 17. We may need to verify your
              identity first. Where your employer nominated you, we may pass part of your request to them. If the
              General Data Protection Regulation applies to you, you also have the rights it provides, including to
              complain to your supervisory authority.
            </p>

            <h2 id="transfers">14. Transfers outside India</h2>
            <p>
              We are based in India. Some service providers, including our email and AI providers, may store or process
              personal data in other countries. We transfer personal data outside India only under contracts that
              require it to be protected, and never to a country the Government of India has restricted under section
              16 of the DPDP Act.
            </p>

            <h2 id="children">15. Children</h2>
            <p>
              The Services are intended for working professionals aged 18 or over and are not directed at children. We
              do not knowingly process personal data of anyone under 18. If you believe a child has given us personal
              data, contact us and we will delete it.
            </p>

            <h2 id="changes">16. Changes to this policy</h2>
            <p>
              We may update this policy as the Services or the law change. We will post the revised version here with a
              new date and, where a change is significant, tell account holders by email or on the platform before it
              takes effect.
            </p>

            <h2 id="contact">17. Grievance Officer and contact</h2>
            <p>
              For any question about this policy, to use your rights, or to raise a grievance about how your personal
              data has been handled, contact our Grievance Officer:
            </p>
            <ul>
              <li>
                <strong>Name:</strong> {grievanceOfficer.name}, {grievanceOfficer.designation}
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a className="textlink" href={`mailto:${grievanceOfficer.email}`}>
                  {grievanceOfficer.email}
                </a>
              </li>
              <li>
                <strong>Phone:</strong> {phone}
              </li>
              <li>
                <strong>Post:</strong> {legalName}, {registeredOffice.full}
              </li>
            </ul>
            <p>
              We acknowledge grievances within 48 hours and resolve them within 30 days. If you are not satisfied with
              our response, you may complain to the Data Protection Board of India once it is accepting complaints.
            </p>
            <p>
              This policy is published in English. If you need it in another language listed in the Eighth Schedule to
              the Constitution of India, write to us and we will provide it. Our{" "}
              <Link className="textlink" href="/terms">
                terms and conditions
              </Link>{" "}
              also apply to your use of the Services.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
