import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata, webPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("about");

export default function AboutPage() {
  return (
    <main id="main">
      <JsonLd
        data={[
          webPageJsonLd("about"),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <div className="phead">
        <div className="wrap">
          <p className="label">About OLL</p>
          <h1>Knowing change is coming is not the same as being ready for it.</h1>
          <p className="lede">
            The Organization Learning Labs helps enterprises work out what they will need to become capable of,
            where they stand today, where the gaps are, and what to do about them. We connect future requirements to
            organizational capabilities, role competencies and individual readiness in one architecture.
          </p>
          <div className="meta-row">
            <span>Founded in Bengaluru</span>
            <span>Research-led</span>
            <span>Industry and sub-industry specific</span>
          </div>
        </div>
      </div>

      <section>
        <div className="wrap">
          <p className="label">What we do</p>
          <h2>Four questions, answered together</h2>
          <p className="lede">
            Most organizations can answer one or two of these. The value is in answering all four in the same
            framework, so the last one follows from the first three.
          </p>
          <div className="q-grid">
            <div className="q-item">
              <div className="q-num">1</div>
              <h3>What will we need to become capable of?</h3>
              <p>Derived from the industry and sub-industry you operate in, not from a generic list of future skills.</p>
            </div>
            <div className="q-item">
              <div className="q-num">2</div>
              <h3>What capabilities, competencies and behaviours will that require?</h3>
              <p>Translated down from organizational capability to the competencies a specific role has to demonstrate.</p>
            </div>
            <div className="q-item">
              <div className="q-num">3</div>
              <h3>Where are we today against what will be required?</h3>
              <p>Measured through contextual assessment at the organization, department and individual level.</p>
            </div>
            <div className="q-item">
              <div className="q-num">4</div>
              <h3>What should we do about the gaps?</h3>
              <p>Turned into prioritized action, because not every gap is a training problem.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap grid-2">
          <div>
            <p className="label">The distinction that matters</p>
            <h2>Readiness is a different question from capability today</h2>
            <p className="lede">
              A conventional assessment asks how capable someone is now. We ask how ready a person, role, function or
              organization is for what will be required next. An organization can perform well today and still be
              losing ground against tomorrow.
            </p>
          </div>
          <div className="defs">
            <div className="def">
              <b>Skill</b>
              <p>What an individual can do. AI literacy, for example.</p>
            </div>
            <div className="def">
              <b>Competency</b>
              <p>
                What a person in a particular role needs to demonstrate consistently. Applying AI appropriately in that
                job.
              </p>
            </div>
            <div className="def">
              <b>Capability</b>
              <p>
                What the organization needs to be able to accomplish repeatedly. Using AI systematically to improve
                business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <p className="label">How the architecture works</p>
          <h2>From strategy to the individual, without losing the thread</h2>
          <p className="lede">
            Each level is derived from the one above it. That is what makes an individual&apos;s development plan
            traceable back to a business requirement rather than to a course catalogue.
          </p>
          <div className="chain">
            <div className="chain-row">
              <b>Future direction</b>
              <span>What the industry, sub-industry or your own strategy implies for the organization</span>
            </div>
            <div className="chain-row">
              <b>Organizational capabilities</b>
              <span>What the enterprise must be able to do repeatedly to get there</span>
            </div>
            <div className="chain-row">
              <b>Functional capabilities</b>
              <span>What each function or department must be able to deliver</span>
            </div>
            <div className="chain-row">
              <b>Role competencies</b>
              <span>What a person in a given role must consistently demonstrate</span>
            </div>
            <div className="chain-row">
              <b>Individual skills and behaviours</b>
              <span>What this person can do today, and what they need next</span>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <p className="label">Establishing the future requirement</p>
          <h2>Three ways in, depending on where you already are</h2>
          <div className="cards">
            <div className="card">
              <span className="k">Industry-led</span>
              <h3>We derive it</h3>
              <p>
                Where the direction isn&apos;t settled, we work from industry and sub-industry research, future
                archetypes and expert input to establish what the organization will need to become capable of.
              </p>
            </div>
            <div className="card">
              <span className="k">Transformation-led</span>
              <h3>We derive it with you</h3>
              <p>
                Where a significant transformation is underway, we start from the future organization and translate it
                into functions, roles, competencies and individuals.
              </p>
            </div>
            <div className="card">
              <span className="k">Organization-led</span>
              <h3>You already know it</h3>
              <p>
                Where the strategic direction is set, you select the capabilities and competencies that matter and we
                map them to functions and roles, then configure the assessments.
              </p>
            </div>
          </div>
          <div className="note" style={{ marginTop: 32 }}>
            <p>
              <strong>We do not set your strategy.</strong> Strategic decisions stay with your leadership. Our work is
              translating either the external environment or your chosen direction into the capabilities and readiness
              required to execute it.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap grid-2">
          <div>
            <p className="label">Two views, not one</p>
            <h2>Organizational maturity and individual competence answer different questions</h2>
            <p>
              Maturity asks how ready the organization is: its systems, processes, governance and operating model.
              Competence asks whether the people in the relevant roles can enable that future.
            </p>
            <p className="lede">
              An enterprise can have capable people and still lack the structures to use them. It can have the
              infrastructure and lack the people capability to run it. Looking at only one side hides the real
              constraint.
            </p>
          </div>
          <div>
            <h3>The six competency categories</h3>
            <p style={{ color: "var(--mute)", fontSize: "15.5px" }}>
              The architecture is consistent; the competencies inside each category are contextualized to the
              industry, sub-industry, role and organization.
            </p>
            <div className="tags">
              <span className="tag">Technical and domain mastery</span>
              <span className="tag">Cognitive and analytical excellence</span>
              <span className="tag">Innovation and adaptive learning</span>
              <span className="tag">Collaboration and influence</span>
              <span className="tag">Strategic and business acumen</span>
              <span className="tag">Leadership and ethical stewardship</span>
            </div>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap grid-2">
          <div>
            <p className="label">Our vision</p>
            <h2>Shape tomorrow&apos;s capabilities inside today&apos;s organizations</h2>
            <p className="lede">
              So they can reinvent themselves continuously rather than in crisis, and maximise their value while doing
              it.
            </p>
          </div>
          <div>
            <p className="label">What we hold to</p>
            <ul className="values">
              <li>
                <b>Honesty</b>
                <span>Be truthful to ourselves, our teams, our craft and our stakeholders, at all costs.</span>
              </li>
              <li>
                <b>Learning mindset</b>
                <span>Learning begins with acknowledging &quot;I don&apos;t know.&quot;</span>
              </li>
              <li>
                <b>Seeking knowledge</b>
                <span>Knowledge can only be sought, never fully attained.</span>
              </li>
              <li>
                <b>Purpose of learning</b>
                <span>The goal is to see beyond symptoms. Action still depends on intent.</span>
              </li>
              <li>
                <b>Journey over destination</b>
                <span>The process of learning and growth matters more than the final outcome.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="cta-band">
            <div>
              <h2>The easiest way to judge this is to try it on one role.</h2>
              <p>
                Nominate one employee in a relevant job role. They complete a contextual assessment in about 20
                minutes and receive a Development Action Plan. You decide from there whether it belongs across the
                organization.
              </p>
            </div>
            <div className="acts">
              <a className="btn btn-primary" href="https://platform.ollacademy.com/signup">
                Nominate an employee
              </a>
              <Link className="btn btn-ghost" href="/#ecra">
                See how the assessment works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
