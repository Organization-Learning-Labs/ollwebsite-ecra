"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { HomeContent } from "@/lib/content";
import type { CardItem, CaseStudy, CompBand, IndustryKey } from "@/data/home";
import { marketplaceViewAllUrl } from "@/lib/marketplace";

type PathKey = "org" | "dept" | "ind";

const INDUSTRIES: IndustryKey[] = ["it", "bfsi"];
const PATHS: PathKey[] = ["org", "dept", "ind"];
const BAND_ORDER: CompBand[] = ["crit", "sig", "mod", "ok"];

const OUT_TITLE: Record<PathKey, string> = {
  org: "Organization readiness view",
  dept: "Department capability signature",
  ind: "Development Action Plan",
};
const ECRA_BTN: Record<PathKey, string> = {
  org: "Assess your organization",
  dept: "Assess a department",
  ind: "Assess a role",
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Seg({ industry, onSelect }: { industry: IndustryKey; onSelect: (k: IndustryKey) => void }) {
  return (
    <div className="seg" role="group" aria-label="Industry">
      <button data-ind="it" aria-pressed={industry === "it"} onClick={() => onSelect("it")}>
        Technology and IT
      </button>
      <button data-ind="bfsi" aria-pressed={industry === "bfsi"} onClick={() => onSelect("bfsi")}>
        BFSI
      </button>
    </div>
  );
}

function ResCard({ r, read, external }: { r: CardItem; read: string; external?: boolean }) {
  return (
    <a
      className="res-card"
      href={r.u}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      <div className="res-img" style={r.img ? { backgroundImage: `url('${r.img}')` } : undefined}>
        {r.img ? null : "Image 1600\u00d7900"}
      </div>
      <div className="res-body">
        <span className="res-tag">{r.tag}</span>
        <h3>{r.t}</h3>
        <p>{r.d}</p>
        <span className="res-read">{read}</span>
        <div className="res-meta">
          <span>{r.by}</span>
          <span>{r.on}</span>
        </div>
      </div>
    </a>
  );
}

function Track({ fill, target = 80 }: { fill: number; target?: number }) {
  return (
    <div className="c-track">
      <div className="c-fill" style={{ width: `${fill}%` }} />
      <div className="c-tgt" style={{ left: `${target}%` }} />
    </div>
  );
}

export default function HomePage({
  initialIndustry,
  content,
}: {
  initialIndustry: IndustryKey;
  content: HomeContent;
}) {
  const {
    industries: IND,
    cases: CASES,
    research: RESEARCH,
    practices: PRACTICES,
    comps: COMPS,
    band: BAND,
    target: TARGET,
    visibleComps: VISIBLE_COMPS,
    heroImages: HERO_IMAGES,
    artBase: ART_BASE,
    contentSource,
  } = content;

  const [industry, setIndustryState] = useState<IndustryKey>(initialIndustry);

  // Keep in sync when ?industry= changes via Next.js client navigation (footer links, etc.).
  useEffect(() => {
    setIndustryState(initialIndustry);
    setCaseIdx(0);
    setPicked(null);
    setCaseNonce((n) => n + 1);
  }, [initialIndustry]);
  const [heroLoaded, setHeroLoaded] = useState<Record<IndustryKey, boolean>>({ it: false, bfsi: false });
  const [path, setPath] = useState<PathKey>("org");
  const [picked, setPicked] = useState<number | null>(null);
  const [compsOpen, setCompsOpen] = useState(false);
  const [stickyShow, setStickyShow] = useState(false);

  const [caseIdx, setCaseIdx] = useState(0);
  const [casePaused, setCasePaused] = useState(false);
  const [caseHold, setCaseHold] = useState(false);
  const [caseNonce, setCaseNonce] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const stabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pathRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const d = IND[industry];
  const cases = CASES[industry] ?? [];
  const research = (RESEARCH[industry] ?? RESEARCH.all).slice(0, 3);
  const practices = PRACTICES[industry] ?? [];
  const liveResearch = contentSource.research[industry] === "live";

  const caseHasMetrics = (c: CaseStudy) =>
    Boolean((c.m1 && c.l1) || (c.m2 && c.l2));

  const setIndustry = useCallback((ind: IndustryKey, fromUser: boolean) => {
    setIndustryState(ind);
    setPicked(null);
    setCaseIdx(0);
    setCaseNonce((n) => n + 1);
    if (fromUser && typeof document !== "undefined") {
      const label = IND[ind].name;
      document.title = `The Organization Learning Labs — Capability readiness for ${label}`;
      try {
        const u = new URL(window.location.href);
        if (ind === "it") u.searchParams.delete("industry");
        else u.searchParams.set("industry", ind);
        window.history.replaceState(null, "", u);
      } catch {}
    }
  }, [IND]);
  const selectIndustry = useCallback((ind: IndustryKey) => setIndustry(ind, true), [setIndustry]);

  // Swap in stock photos; if an image can't load, the designed gradient stays in place.
  useEffect(() => {
    const imgs = INDUSTRIES.map((k) => {
      const img = new Image();
      img.onload = () => setHeroLoaded((s) => ({ ...s, [k]: true }));
      img.src = HERO_IMAGES[k];
      return img;
    });
    return () => imgs.forEach((img) => (img.onload = null));
  }, [HERO_IMAGES]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  // Case carousel auto-advance
  useEffect(() => {
    if (reduceMotion || casePaused || caseHold || cases.length < 2) return;
    const t = setInterval(() => setCaseIdx((i) => (i + 1) % cases.length), 6000);
    return () => clearInterval(t);
  }, [reduceMotion, casePaused, caseHold, cases.length, caseNonce]);

  const showCase = (i: number) => {
    if (!cases.length) return;
    setCaseIdx((i + cases.length) % cases.length);
    setCaseNonce((n) => n + 1);
  };

  // Sticky mobile CTA once the hero is out of view
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((e) => setStickyShow(!e[0].isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const onStabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = (i + 1) % INDUSTRIES.length;
      stabRefs.current[n]?.focus();
      setIndustry(INDUSTRIES[n], true);
    }
  };

  const onPathKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = (i + 1) % PATHS.length;
      pathRefs.current[n]?.focus();
      setPath(PATHS[n]);
    }
  };

  const counts = COMPS.reduce<Record<CompBand, number>>(
    (acc, c) => ({ ...acc, [c[2]]: acc[c[2]] + 1 }),
    { crit: 0, sig: 0, mod: 0, ok: 0 }
  );

  const heroImgStyle = (k: IndustryKey) =>
    heroLoaded[k] ? { backgroundImage: `url('${HERO_IMAGES[k]}')` } : undefined;

  return (
    <>
      <main id="main">
        <div id="top" />
        {/* ============ HERO ============ */}
        <section className="hero" aria-label="Industry disruption stories" style={{ padding: 0 }} ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            {INDUSTRIES.map((k) => (
              <div
                key={k}
                className={`hero-img${industry === k ? " on" : ""}${heroLoaded[k] ? " loaded" : ""}`}
                data-ind={k}
                data-src={HERO_IMAGES[k]}
                style={heroImgStyle(k)}
              />
            ))}
            <div className="hero-scrim" />
          </div>
          <span className="img-note">
            <span className="flag">Dummy Unsplash images, replace before launch</span>
          </span>

          <div className="wrap">
            <div className="hero-body">
              <div>
                {/* IT story */}
                <article
                  className={`story${industry === "it" ? " on" : ""}`}
                  id="story-it"
                  data-ind="it"
                  role="tabpanel"
                  aria-labelledby="stab-it"
                >
                  <span className="eyebrow">
                    <b>Disruption</b>Technology and IT services
                  </span>
                  <h1>The work is still coming. The economics of doing it aren&apos;t.</h1>
                  <div className="beats">
                    <details className="beat" open>
                      <summary>
                        <span className="beat-k"><span>1</span>How it worked</span>
                        <em>Benches, billed by the hour</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>Enterprises bought ERP and paid IT services firms to customize it. Firms kept large benches ready for demand and billed by the man-hour.</p>
                    </details>
                    <details className="beat">
                      <summary>
                        <span className="beat-k"><span>2</span>What broke</span>
                        <em>AI cut the hours, not the value</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>AI now does much of the configuration and code itself. When a task takes a fraction of the hours, hours stop being a fair way to price it.</p>
                    </details>
                    <details className="beat">
                      <summary>
                        <span className="beat-k"><span>3</span>The squeeze</span>
                        <em>Work rises, margin falls</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>AI gets sold as a separate line, but its costs keep moving. Work keeps arriving while margins go the other way, and headcount becomes the adjustment.</p>
                    </details>
                    <details className="beat gap">
                      <summary>
                        <span className="beat-k"><span>4</span>The capability gap</span>
                        <em>Hour-built roles don&apos;t fit AI delivery</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>Roles, skills and pricing built for billable hours don&apos;t fit AI-assisted delivery. The question is what replaces them, and whether your people can build it.</p>
                    </details>
                  </div>
                  <div className="hero-ctas">
                    <a className="btn btn-light" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
                    <a className="btn btn-outline-light" href="#capabilities">See what IT needs to build</a>
                    <span className="hero-micro">Create your account, then start the assessment. About 20 to 30 minutes.</span>
                  </div>
                </article>

                {/* BFSI story */}
                <article
                  className={`story${industry === "bfsi" ? " on" : ""}`}
                  id="story-bfsi"
                  data-ind="bfsi"
                  role="tabpanel"
                  aria-labelledby="stab-bfsi"
                >
                  <span className="eyebrow">
                    <b>Disruption</b>Banking, financial services and insurance
                  </span>
                  <h1>The bank went digital. Its risk model didn&apos;t come with it.</h1>
                  <div className="beats">
                    <details className="beat" open>
                      <summary>
                        <span className="beat-k"><span>1</span>How it worked</span>
                        <em>Trust lived in branches and paper</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>Trust lived in branches, vaults, paper and signatures. Security meant physical custody and process discipline, and the workforce was built around that.</p>
                    </details>
                    <details className="beat">
                      <summary>
                        <span className="beat-k"><span>2</span>What changed</span>
                        <em>79% of transactions are now digital</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>Around 79% of customer transactions are now digital. The RBI names AI-enabled cyberattacks as the most important near-term threat to the system.</p>
                    </details>
                    <details className="beat">
                      <summary>
                        <span className="beat-k"><span>3</span>Where it breaks</span>
                        <em>The weak point is people, not tech</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>The RBI&apos;s own survey flags employee cyber awareness, training and forensic readiness as the weak points, and most institutions lean on outside vendors for cyber functions.</p>
                    </details>
                    <details className="beat gap">
                      <summary>
                        <span className="beat-k"><span>4</span>The capability gap</span>
                        <em>Security is a workforce capability now</em>
                        <i className="chev" aria-hidden="true" />
                      </summary>
                      <p>Security is no longer an IT function. It&apos;s a workforce capability, carried by people whose roles were designed for paper.</p>
                    </details>
                  </div>
                  <p className="sources">
                    Sources:{" "}
                    <a
                      href="https://www.outlookmoney.com/personal-finance/ai-enabled-cyber-threats-seen-as-biggest-risk-in-the-next-12-months-rbi"
                      target="_blank"
                      rel="noopener"
                    >
                      RBI Financial Stability Report, June 2026
                    </a>
                  </p>
                  <div className="hero-ctas">
                    <a className="btn btn-light" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
                    <a className="btn btn-outline-light" href="#capabilities">See what BFSI needs to build</a>
                    <span className="hero-micro">Create your account, then start the assessment. About 20 to 30 minutes.</span>
                  </div>
                </article>
              </div>

              {/* Case study cards */}
              <div>
                <div
                  className="case-deck"
                  id="case-deck"
                  onMouseEnter={() => setCaseHold(true)}
                  onMouseLeave={() => setCaseHold(false)}
                  onFocus={() => setCaseHold(true)}
                  onBlur={() => setCaseHold(false)}
                >
                  <div className="case-head">
                    <span className="case-count" id="case-count">
                      {cases.length ? `Case study ${caseIdx + 1} of ${cases.length}` : "No case studies yet"}
                    </span>
                    {cases.length > 1 ? (
                    <div className="case-nav">
                      <button className="cbtn" id="case-prev" aria-label="Previous case study" onClick={() => showCase(caseIdx - 1)}>
                        <svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></svg>
                      </button>
                      <button
                        className="cbtn"
                        id="case-play"
                        aria-label={casePaused ? "Resume auto-advance" : "Pause auto-advance"}
                        aria-pressed={casePaused}
                        onClick={() => setCasePaused((p) => !p)}
                      >
                        {casePaused ? (
                          <svg viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none" /></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="ic-pause"><path d="M8 5h3v14H8zM13 5h3v14h-3z" fill="currentColor" stroke="none" /></svg>
                        )}
                      </button>
                      <button className="cbtn" id="case-next" aria-label="Next case study" onClick={() => showCase(caseIdx + 1)}>
                        <svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
                      </button>
                    </div>
                    ) : null}
                  </div>
                  {cases.length === 0 ? (
                    <p className="case-empty">No case studies are available for this industry yet.</p>
                  ) : (
                  <div className="case-stack" id="case-stack" aria-live="polite">
                    {cases.map((c, i) => (
                      <article key={`${industry}-${i}`} className={`case${i === caseIdx ? " on" : ""}`}>
                        <div className={`case-img${c.img ? " loaded" : ""}`}>
                          {c.img ? (
                            <img src={c.img} alt="" loading="lazy" decoding="async" />
                          ) : (
                            <>
                              Case study image
                              <br />
                              1200&times;680
                            </>
                          )}
                        </div>
                        <div className="case-body">
                          <div className="case-tag">Case study &middot; {c.tag}</div>
                          <h3>{c.t}</h3>
                          <p>{c.d}</p>
                          {caseHasMetrics(c) ? (
                            <div className="case-out">
                              {c.m1 && c.l1 ? (
                                <div><b>{c.m1}</b><span>{c.l1}</span></div>
                              ) : null}
                              {c.m2 && c.l2 ? (
                                <div><b>{c.m2}</b><span>{c.l2}</span></div>
                              ) : null}
                            </div>
                          ) : null}
                          {c.u ? (
                            <a
                              className="textlink"
                              href={c.u}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Read the case study
                            </a>
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                  )}
                  {cases.length > 1 ? (
                  <div className="case-dots" id="case-dots" role="tablist" aria-label="Case studies">
                    {cases.map((_, i) => (
                      <button
                        key={i}
                        role="tab"
                        aria-selected={i === caseIdx}
                        aria-label={`Case study ${i + 1}`}
                        onClick={() => showCase(i)}
                      />
                    ))}
                  </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="story-tabs" role="tablist" aria-label="Choose an industry">
              <button
                className="stab"
                id="stab-it"
                role="tab"
                data-ind="it"
                aria-controls="story-it"
                aria-selected={industry === "it"}
                tabIndex={industry === "it" ? 0 : -1}
                ref={(el) => { stabRefs.current[0] = el; }}
                onClick={() => setIndustry("it", true)}
                onKeyDown={(e) => onStabKey(e, 0)}
              >
                <span className="n">01</span>
                <span><strong>Technology and IT services</strong><small>AI broke the business model</small></span>
              </button>
              <button
                className="stab"
                id="stab-bfsi"
                role="tab"
                data-ind="bfsi"
                aria-controls="story-bfsi"
                aria-selected={industry === "bfsi"}
                tabIndex={industry === "bfsi" ? 0 : -1}
                ref={(el) => { stabRefs.current[1] = el; }}
                onClick={() => setIndustry("bfsi", true)}
                onKeyDown={(e) => onStabKey(e, 1)}
              >
                <span className="n">02</span>
                <span><strong>Banking, financial services and insurance</strong><small>AI broke the risk model</small></span>
              </button>
            </div>
          </div>
        </section>

        {/* ============ CAPABILITIES ============ */}
        <section id="capabilities" aria-labelledby="cap-title">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">Capabilities in focus</p>
                <h2 id="cap-title">What <span data-ind-short="">{d.short}</span> needs to build next</h2>
                <p className="lede">
                  The capability shifts our research is tracking, and what each one asks of the organization and its people.{" "}
                  <span className="flag">Draft framing, validate against OLL research</span>
                </p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            <div className="caps" id="caps">
              {d.caps.map((c, i) => (
                <article className="cap" key={c.slug}>
                  <div className="cap-top">
                    <span className="cap-num">{i + 1}</span>
                    <h3>{c.n}</h3>
                  </div>
                  <p className="why">{c.why}</p>
                  <dl>
                    <div><dt>Organizational capabilities</dt><dd>{c.org}</dd></div>
                    <div><dt>Workforce competencies</dt><dd>{c.work}</dd></div>
                  </dl>
                  <div className="cap-foot">
                    <span className="roles">Roles most affected: {c.roles}</span>
                    <a className="textlink" href={`${ART_BASE}${industry}/${c.slug}`} aria-label={`Read more about ${c.n}`}>
                      Read more
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ RESEARCH ============ */}
        <section id="research" className="alt" aria-labelledby="res-title">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">From the research library</p>
                <h2 id="res-title">The research behind <span data-ind-short="">{d.short}</span></h2>
                <p className="lede">
                  Peer-reviewed studies, whitepapers and sector analysis from the OLL Research Academy.
                  {!liveResearch ? (
                    <>{" "}<span className="flag">Showing live library items; supply IT and BFSI URLs to swap</span></>
                  ) : null}
                </p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            <div className="res-grid" id="res-grid">
              {research.map((r) => (
                <ResCard key={r.u} r={r} read="Read synopsis" external />
              ))}
            </div>
            <div className="sec-foot">
              <a
                className="btn btn-ghost"
                href={marketplaceViewAllUrl("research_synopsis")}
                target="_blank"
                rel="noopener"
              >
                View all research
              </a>
            </div>
          </div>
        </section>

        {/* ============ AS-IS vs TO-BE ============ */}
        <section id="shift" className="alt" aria-labelledby="shift-title">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">The operating model, then and next</p>
                <h2 id="shift-title">What it is, and what it&apos;s going to be.</h2>
                <p className="lede" id="shift-lede">{d.shiftLede}</p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            <div className="shift" role="table" aria-label="Operating model today and next">
              <div className="shift-head" role="row">
                <div role="columnheader">Dimension</div>
                <div role="columnheader">What it is today</div>
                <div aria-hidden="true" />
                <div className="to" role="columnheader">What it&apos;s going to be</div>
              </div>
              <div id="shift-rows">
                {d.shift.map((r) => (
                  <div className="shift-row" role="row" key={r[0]}>
                    <div className="shift-dim" role="rowheader">{r[0]}</div>
                    <div className="shift-is" role="cell">{r[1]}</div>
                    <div className="shift-arrow" aria-hidden="true"><Arrow /></div>
                    <div className="shift-to" role="cell">{r[2]}</div>
                  </div>
                ))}
              </div>
            </div>
            <p className="shift-note">
              Every shift in the right-hand column is a capability someone has to build. The assessment shows which ones your organization is ready for.
            </p>
          </div>
        </section>

        {/* ============ BEST PRACTICES ============ */}
        <section id="best-practices" aria-labelledby="bp-title">
          <div className="wrap">
            <div className="sec-head">
              <div>
                <p className="label">Best practices</p>
                <h2 id="bp-title">What works, tested over time in <span data-ind-short="">{d.short}</span></h2>
                <p className="lede">
                  Proven methods, techniques and frameworks that hold up in practice, written for the leaders who have to run them.
                </p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            {practices.length ? (
            <div className="res-grid" id="bp-grid">
              {practices.map((r) => (
                <ResCard key={r.u || r.t} r={r} read="Read the practice note" external />
              ))}
            </div>
            ) : (
              <p className="content-empty">No best practices are available for this industry yet.</p>
            )}
            <div className="sec-foot">
              <a
                className="btn btn-ghost"
                href={marketplaceViewAllUrl("best_practice")}
                target="_blank"
                rel="noopener noreferrer"
              >
                View all best practices
              </a>
            </div>
          </div>
        </section>

        {/* ============ ECRA ============ */}
        <section id="ecra" aria-labelledby="ecra-title">
          <div className="wrap ecra-grid">
            <div>
              <p className="label">Enterprise Capability Readiness Assessment</p>
              <h2 id="ecra-title">Assess readiness at the level you make decisions at.</h2>
              <p className="lede">
                The ECRA identifies the capabilities your future depends on and measures readiness against them, at three levels: the organization as a whole, a department or business unit, and the individual roles inside it.
              </p>

              <div className="path-switch" role="tablist" aria-label="Assessment level">
                {(
                  [
                    ["org", "Organization", "Structural and governance maturity"],
                    ["dept", "Department or business unit", "Where the capability gaps sit"],
                    ["ind", "Leaders and teams", "Which roles need development"],
                  ] as const
                ).map(([k, title, sub], i) => (
                  <button
                    key={k}
                    className="path"
                    role="tab"
                    id={`path-${k}`}
                    data-path={k}
                    aria-selected={path === k}
                    aria-controls={`pp-${k}`}
                    tabIndex={path === k ? 0 : -1}
                    ref={(el) => { pathRefs.current[i] = el; }}
                    onClick={() => setPath(k)}
                    onKeyDown={(e) => onPathKey(e, i)}
                  >
                    <strong>{title}</strong>
                    <span>{sub}</span>
                  </button>
                ))}
              </div>

              <div className={`path-panel${path === "org" ? " on" : ""}`} id="pp-org" role="tabpanel" aria-labelledby="path-org">
                <p className="path-q">How ready is your organization, structurally, for the shift ahead?</p>
                <ol className="steps">
                  <li><span className="n">1</span><div><h4>Set the scope</h4><p>A senior executive defines which functions and which capabilities the future operating model depends on.</p></div></li>
                  <li><span className="n">2</span><div><h4>Leaders across functions take part</h4><p>20 to 30 minutes each, in scenarios set in your industry.</p></div></li>
                  <li><span className="n">3</span><div><h4>Read organization and governance maturity</h4><p>An is vs to-be view of structural readiness, built from authorized, aggregated results.</p></div></li>
                </ol>
                <div className="gets">
                  <div><b>Organization capability signature</b><span>Readiness across the capabilities your strategy depends on.</span></div>
                  <div><b>Governance maturity view</b><span>Whether decisions, ownership and accountability can carry the change.</span></div>
                </div>
                <p className="limit">The organization view gets stronger with each participant. A single result is an individual perspective, not a verdict on the organization.</p>
              </div>

              <div className={`path-panel${path === "dept" ? " on" : ""}`} id="pp-dept" role="tabpanel" aria-labelledby="path-dept">
                <p className="path-q">At department and business unit level, where are the capability gaps?</p>
                <ol className="steps">
                  <li><span className="n">1</span><div><h4>Pick the unit</h4><p>A business unit or department head nominates the team whose work sits closest to the shift.</p></div></li>
                  <li><span className="n">2</span><div><h4>The team takes the assessment</h4><p>Each person completes it in 20 to 30 minutes, in scenarios set in their role.</p></div></li>
                  <li><span className="n">3</span><div><h4>See the unit&apos;s capability signature</h4><p>Where this unit is strong, where it trails the rest of the organization, and which gaps are shared across the team.</p></div></li>
                </ol>
                <div className="gets">
                  <div><b>Department capability signature</b><span>The unit&apos;s readiness, comparable across departments.</span></div>
                  <div><b>Shared gap view</b><span>The competencies most of the team is missing, not just one person.</span></div>
                </div>
              </div>

              <div className={`path-panel${path === "ind" ? " on" : ""}`} id="pp-ind" role="tabpanel" aria-labelledby="path-ind">
                <p className="path-q">Which leaders and employees need capability development, and in what?</p>
                <ol className="steps">
                  <li><span className="n">1</span><div><h4>Create an account</h4><p>A leader nominates someone, or an individual signs up directly with their current and aspirational role.</p></div></li>
                  <li><span className="n">2</span><div><h4>Take the assessment</h4><p>20 to 30 minutes, adapted to the role and industry.</p></div></li>
                  <li><span className="n">3</span><div><h4>Get the Development Action Plan</h4><p>Every competency the role carries, scored, banded and ranked by where to start.</p></div></li>
                </ol>
                <div className="gets">
                  <div><b>Personal competency map</b><span>Current capability against the role they&apos;re growing into.</span></div>
                  <div><b>Theirs to keep</b><span>Results reach an employer only with the participant&apos;s consent.</span></div>
                </div>
              </div>

              <div className="ecra-cta">
                <a className="btn btn-primary" id="ecra-btn" href="https://platform.ollacademy.com/signup">{ECRA_BTN[path]}</a>
                <span className="micro" id="ecra-micro">
                  {path === "ind"
                    ? "Create your account, then start the assessment. About 20 to 30 minutes."
                    : "Create your account, then set the scope and invite participants."}
                </span>
              </div>
            </div>

            <div className="ecra-visual">
              <div className="screen">
                <div className="screen-bar">
                  <span className="dots"><i /><i /><i /></span>
                  <span>ECRA</span>
                  <span id="q-ind">{d.name}</span>
                </div>
                <div className="screen-body">
                  <div className="q-meta"><span>Question 12 of 28</span><span id="q-comp">{d.q.comp}</span></div>
                  <div className="progress"><i /></div>
                  <div className="q-text" id="q-text">{d.q.text}</div>
                  <div className="opts" id="q-opts">
                    {d.q.opts.map((o, i) => (
                      <button key={o} className="opt" aria-pressed={picked === i} onClick={() => setPicked(i)}>
                        <b>{"ABCD"[i]}</b>
                        <span>{o}</span>
                      </button>
                    ))}
                  </div>
                  <div className="q-foot">Try it: pick an answer. There&apos;s no scoring in this preview.</div>
                </div>
              </div>

              <div className="screen out-screen">
                <div className="screen-bar">
                  <span className="dots"><i /><i /><i /></span>
                  <span id="out-title">{OUT_TITLE[path]}</span>
                  <span>Sample data</span>
                </div>

                <div className={`out${path === "org" ? " on" : ""}`} id="out-org">
                  <div className="screen-body">
                    <div className="sig-row">
                      <div>
                        <div className="mini-label">Organization signature</div>
                        <div className="sig-score">68<small> / 100</small></div>
                      </div>
                      <span className="bchip b-mod">Developing, upward trend</span>
                    </div>
                    <div className="sig-grid">
                      <div className="sig-cell"><b>74</b><span>Learnability</span></div>
                      <div className="sig-cell"><b>61</b><span>Mental models</span></div>
                      <div className="sig-cell"><b>70</b><span>Team learning</span></div>
                      <div className="sig-cell"><b>66</b><span>Job-holder maturity</span></div>
                    </div>
                    <div className="mini-label" style={{ marginTop: 18 }}>Governance maturity</div>
                    <div className="mini-rows">
                      <div className="mini-row"><span>Decision rights</span><Track fill={58} /><em>Level 3</em></div>
                      <div className="mini-row"><span>Accountability</span><Track fill={71} /><em>Level 4</em></div>
                      <div className="mini-row"><span>Evidence and review</span><Track fill={44} /><em>Level 2</em></div>
                    </div>
                  </div>
                </div>

                <div className={`out${path === "dept" ? " on" : ""}`} id="out-dept">
                  <div className="screen-body">
                    <div className="mini-label">Capability signature by unit</div>
                    <div className="mini-rows">
                      <div className="mini-row"><span>Delivery</span><Track fill={52} /><em>2.6</em></div>
                      <div className="mini-row sel"><span>Risk and compliance</span><Track fill={46} /><em>2.3</em></div>
                      <div className="mini-row"><span>Technology</span><Track fill={68} /><em>3.4</em></div>
                      <div className="mini-row"><span>Operations</span><Track fill={74} /><em>3.7</em></div>
                    </div>
                    <div className="mini-label" style={{ marginTop: 18 }}>Gaps shared across the selected unit</div>
                    <div className="shared-gaps">
                      <div className="sg"><b>8 of 11</b><span>Decision-making under ambiguity</span></div>
                      <div className="sg"><b>7 of 11</b><span>Change leadership</span></div>
                      <div className="sg"><b>5 of 11</b><span>Systems thinking</span></div>
                    </div>
                  </div>
                </div>

                <div className={`out${path === "ind" ? " on" : ""}`} id="out-ind">
                  <div className="screen-body">
                    <div className="mini-label">Development Action Plan, top gaps</div>
                    <div className="mini-rows">
                      <div className="mini-row"><span>Decision under ambiguity</span><Track fill={44} /><em className="b-crit">Critical</em></div>
                      <div className="mini-row"><span>Change leadership</span><Track fill={50} /><em className="b-crit">Critical</em></div>
                      <div className="mini-row"><span>Strategic thinking</span><Track fill={58} /><em className="b-sig">Significant</em></div>
                      <div className="mini-row"><span>Digital fluency</span><Track fill={84} /><em className="b-ok">On track</em></div>
                    </div>
                    <div className="mini-label" style={{ marginTop: 18 }}>Mental model profile</div>
                    <div className="pills">
                      <span className="pill">Execution-anchored</span>
                      <span className="pill">Risk-cautious</span>
                      <span className="pill">Consensus-seeking</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="caption-src">Illustrative preview. The assessment format and outputs shown use sample data.</div>
            </div>
          </div>
        </section>

        {/* ============ DAP ============ */}
        <section id="dap" className="alt" aria-labelledby="dap-title">
          <div className="wrap dap-grid">
            <div className="screen">
              <div className="screen-bar">
                <span className="dots"><i /><i /><i /></span>
                <span>Development Action Plan</span>
                <span>Sample data</span>
              </div>
              <div className="dap-head">
                <div>
                  <h5>Your competency map</h5>
                  <p id="cmap-sub">
                    {COMPS.length} competencies for this role, sorted by gap. Target {TARGET.toFixed(1)} of 5.
                  </p>
                </div>
                <div className="band-sum" id="band-sum">
                  {BAND_ORDER.map((k) => (
                    <span key={k} className={`bchip ${BAND[k][1]}`}>
                      {counts[k]} {BAND[k][0].replace(" gap", "").toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="cmap" id="cmap">
                {COMPS.map(([name, score, band], i) => (
                  <li key={name} hidden={!compsOpen && i >= VISIBLE_COMPS}>
                    <span className="c-rank">{i + 1}</span>
                    <div>
                      <div className="c-top">
                        <span className="c-name">{name}</span>
                        <span className="c-meta">
                          <span className={`bchip ${BAND[band][1]}`}>{BAND[band][0]}</span>
                          <span className="c-score">
                            {score.toFixed(1)}
                            <span> / 5</span>
                          </span>
                        </span>
                      </div>
                      <Track fill={(score / 5) * 100} target={(TARGET / 5) * 100} />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="cmap-more" id="cmap-more" aria-expanded={compsOpen} onClick={() => setCompsOpen((o) => !o)}>
                {compsOpen ? "Show fewer" : `Show all ${COMPS.length} competencies`}
              </button>
              <div className="dap-foot">
                <div>
                  <h5>Prioritized focus areas</h5>
                  <ul className="focus" id="focus">
                    {d.focus.map((f, i) => (
                      <li key={f}><b>{i + 1}</b>{f}</li>
                    ))}
                  </ul>
                  <p className="rm-note" id="rm-note">
                    Reading material unlocked for {COMPS.length - counts.ok} flagged gaps
                  </p>
                </div>
                <div>
                  <h5>Mental model profile</h5>
                  <div className="pills">
                    <span className="pill">Execution-anchored</span>
                    <span className="pill">Risk-cautious</span>
                    <span className="pill">Consensus-seeking</span>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--mute)", margin: "10px 0 0" }}>
                    Tends to optimize the known path before questioning it.
                  </p>
                </div>
              </div>
              <div className="derive">
                <b>How this is scored.</b> Each competency the role carries is scored from the assessment and placed in a band. Any gap band, critical, significant or moderate, marks it for development.
              </div>
            </div>
            <div>
              <p className="label">What every participant gets</p>
              <h2 id="dap-title">A Development Action Plan that shows where to grow first.</h2>
              <p className="lede">
                The assessment doesn&apos;t end at a score. The participant receives a plan that maps every competency their role carries against the role they&apos;re growing into, and ranks where to start.
              </p>
              <div className="outputs">
                <div className="output"><h4>Competency map</h4><p>Every competency the role carries, however many that is, scored and sorted by gap.</p></div>
                <div className="output"><h4>Gap bands</h4><p>Critical, significant or moderate, so effort goes where the gap is widest.</p></div>
                <div className="output"><h4>Mental model profile</h4><p>The assumptions shaping how this person reads problems and decisions.</p></div>
                <div className="output"><h4>Focus areas and reading</h4><p>A short priority list, with reading material unlocked as soon as a gap is flagged.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div>
              <p className="label">Questions</p>
              <h2 id="faq-title">What leaders usually ask first.</h2>
              <p className="lede">Something else on your mind? Call the team on +91 76766 46518.</p>
              <div style={{ marginTop: 28 }}>
                <a className="btn btn-primary" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
              </div>
            </div>
            <div className="faq" id="faqlist">
              <details><summary>What does OLL actually do?</summary><p>OLL develops research-led frameworks, diagnostics, capability architectures and development systems that help enterprises build the capabilities their future strategy depends on.</p></details>
              <details><summary>Is this a training program?</summary><p>No. The starting point is the capability your organization will need, not a course catalogue. Learning comes in only once that capability and the gap to it are clear.</p></details>
              <details><summary>How long does the assessment take?</summary><p>20 to 30 minutes. It uses scenario, multiple-choice, ranking and short task questions set in the participant&apos;s industry.</p></details>
              <details><summary>What can be assessed: the organization, a department, or a person?</summary><p>All three. Organization level looks at structural and governance maturity, department level shows where the capability gaps sit inside a unit, and role level shows which leaders and employees need development. Each wider view is built from authorized, aggregated results of the individual assessments beneath it.</p></details>
              <details><summary>Can I take the assessment for myself?</summary><p>Yes. An individual can sign up directly and receive their own Development Action Plan. Nothing reaches an employer unless the participant chooses to share it.</p></details>
              <details><summary>Who should I nominate?</summary><p>Someone whose role sits close to the shift your industry is going through: a delivery, product, risk, operations or transformation leader, for example.</p></details>
              <details><summary>Will I see my nominee&apos;s results?</summary><p>Not automatically. The participant owns their Development Action Plan, and it is shared only with their consent and in line with your organization&apos;s policy.</p></details>
              <details data-ind="it" hidden={industry !== "it"}>
                <summary>How does this apply to IT services firms?<span className="ind-tag">Technology</span></summary>
                <p>Scenarios and competencies reflect the move away from effort-based delivery: pricing, AI-assisted delivery, talent structure and client advisory. <span className="flag">Expand with approved answer</span></p>
              </details>
              <details data-ind="bfsi" hidden={industry !== "bfsi"}>
                <summary>How does this handle cyber and regulatory risk in BFSI?<span className="ind-tag">BFSI</span></summary>
                <p>Scenarios and competencies reflect risk, compliance and cyber contexts, including AI-enabled fraud and social engineering. <span className="flag">Expand with approved answer</span></p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <div className={`sticky-cta${stickyShow ? " show" : ""}`} id="sticky">
        <a className="btn btn-primary" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
      </div>
    </>
  );
}
