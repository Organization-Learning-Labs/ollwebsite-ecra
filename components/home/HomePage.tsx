"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import type { HomeContent } from "@/lib/content";
import type { CardItem, CaseStudy, FaqPart, IndustryKey } from "@/data/home";
import { ecraIntro, ecraLevels, journey } from "@/data/ecra";
import { AssessSheet } from "@/components/AssessSheet";
import { ImageStream } from "@/components/ecra/ImageStream";
import { LevelIcon } from "@/components/ecra/LevelIcon";
import { SplitWords } from "@/components/story/SplitWords";
import { StoryMotion } from "@/components/story/StoryMotion";
import { marketplaceViewAllUrl } from "@/lib/marketplace";

const INDUSTRIES: IndustryKey[] = ["it", "bfsi"];

const BAND_FLOW = [
  { t: "Research structural change", d: "M4 19V5M4 19h16M8 15l3-4 3 2 5-7" },
  { t: "Capability models and competence blueprints", d: "M12 3l8 4.5-8 4.5-8-4.5zM4 12l8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" },
  { t: "ECRA readiness", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01" },
] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const STORY_TABS: Record<IndustryKey, { n: string; title: string; sub: string }> = {
  it: { n: "01", title: "IT Services and Consulting", sub: "AI broke the business model" },
  bfsi: { n: "02", title: "Retail Banking", sub: "AI broke the risk model" },
};

function Seg({ industry, onSelect }: { industry: IndustryKey; onSelect: (k: IndustryKey) => void }) {
  return (
    <div className="seg" role="group" aria-label="Industry" data-active={industry}>
      <span className="seg-pill" aria-hidden="true" />
      <button data-ind="it" aria-pressed={industry === "it"} onClick={() => onSelect("it")}>
        IT Services
      </button>
      <button data-ind="bfsi" aria-pressed={industry === "bfsi"} onClick={() => onSelect("bfsi")}>
        Retail Banking
      </button>
    </div>
  );
}

function ResCard({ r, read, external, i = 0 }: { r: CardItem; read: string; external?: boolean; i?: number }) {
  return (
    <a
      className="res-card"
      href={r.u}
      style={{ "--i": i } as CSSProperties}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
    >
      <div className="res-img">
        {r.img ? (
          <span className="res-img-in" style={{ backgroundImage: `url('${r.img}')` }} />
        ) : (
          <span className="res-img-fb" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 4h10l4 4v12H5zM15 4v4h4M8.5 12.5h7M8.5 16h5" />
            </svg>
          </span>
        )}
      </div>
      <div className="res-body">
        <span className="res-tag">{r.tag}</span>
        <h3>{r.t}</h3>
        <p>{r.d}</p>
        <span className="res-read">
          {read}
          <Arrow />
        </span>
        <div className="res-meta">
          <span>{r.by}</span>
          <span>{r.on}</span>
        </div>
      </div>
    </a>
  );
}

/** Distance between the starts of two neighbouring cards in a slider track. */
function trackStep(track: HTMLElement | null) {
  const card = track?.firstElementChild as HTMLElement | null;
  if (!track || !card) return 0;
  return card.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 0);
}

function ResSlider({
  items,
  label,
  read,
  children,
}: {
  items: CardItem[];
  label: string;
  read: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [stops, setStops] = useState(1);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const s = trackStep(track);
    if (!track || !s) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setStops(maxScroll > 2 ? Math.round(maxScroll / s) + 1 : 1);
    setPos(maxScroll > 2 && track.scrollLeft >= maxScroll - 2 ? Math.round(maxScroll / s) : Math.round(track.scrollLeft / s));
  }, []);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [measure, items.length]);

  const go = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: Math.max(0, Math.min(i, stops - 1)) * trackStep(track), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="res-slider">
      <div className="res-track" ref={trackRef} role="region" aria-label={label} tabIndex={-1} data-stagger>
        {items.map((r, i) => (
          <ResCard key={r.u || r.t} r={r} i={i} read={read} external />
        ))}
      </div>
      <div className="res-ctrl">
        {stops > 1 ? (
          <div className="res-nav">
            <button className="res-arrow" aria-label="Previous articles" disabled={pos <= 0} onClick={() => go(pos - 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
            </button>
            <div className="res-dots" role="group" aria-label="Choose position">
              {Array.from({ length: stops }, (_, i) => (
                <button
                  key={i}
                  aria-label={`Show articles ${i + 1} onwards`}
                  aria-current={i === pos ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className="res-arrow" aria-label="Next articles" disabled={pos >= stops - 1} onClick={() => go(pos + 1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        ) : (
          <span />
        )}
        {children}
      </div>
    </div>
  );
}

function FaqBody({ parts }: { parts: FaqPart[] }) {
  return (
    <div className="faq-a">
      {parts.map((part, i) => {
        if ("p" in part) return <p key={i}>{part.p}</p>;
        if ("ul" in part)
          return (
            <ul key={i}>
              {part.ul.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        if ("ol" in part)
          return (
            <ol key={i}>
              {part.ol.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ol>
          );
        return (
          <div className="faq-table-wrap" key={i}>
            <table className="faq-table">
              <thead>
                <tr>
                  <th scope="col">{part.table.head[0]}</th>
                  <th scope="col">{part.table.head[1]}</th>
                </tr>
              </thead>
              <tbody>
                {part.table.rows.map(([a, b]) => (
                  <tr key={a}>
                    <td>{a}</td>
                    <td>{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
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
    statement,
    faqs,
    heroImages: HERO_IMAGES,
    contentSource,
  } = content;

  const [industry, setIndustryState] = useState<IndustryKey>(initialIndustry);
  const [heroLoaded, setHeroLoaded] = useState<Record<IndustryKey, boolean>>({ it: false, bfsi: false });
  const [stickyShow, setStickyShow] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const [caseIdx, setCaseIdx] = useState(0);
  const [casePaused, setCasePaused] = useState(false);
  const [caseHold, setCaseHold] = useState(false);
  const [caseNonce, setCaseNonce] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const stabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const d = IND[industry];
  const cases = CASES[industry] ?? [];
  const research = RESEARCH[industry]?.length ? RESEARCH[industry] : RESEARCH.all;
  const practices = PRACTICES[industry] ?? [];
  const liveResearch = contentSource.research[industry] === "live";

  const caseHasMetrics = (c: CaseStudy) =>
    Boolean((c.m1 && c.l1) || (c.m2 && c.l2));

  const setIndustry = useCallback((ind: IndustryKey, fromUser: boolean) => {
    setIndustryState(ind);
    setCaseIdx(0);
    setCaseNonce((n) => n + 1);
    if (fromUser) {
      try {
        const u = new URL(window.location.href);
        u.searchParams.set("industry", ind);
        window.history.replaceState(null, "", u);
      } catch {}
    }
  }, []);
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

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || reduceMotion || !window.matchMedia?.("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    };
    hero.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onMove);
    };
  }, [reduceMotion]);

  const onStabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const n = (i + 1) % INDUSTRIES.length;
      stabRefs.current[n]?.focus();
      setIndustry(INDUSTRIES[n], true);
    }
  };

  const heroImgStyle = (k: IndustryKey) =>
    heroLoaded[k] ? { backgroundImage: `url('${HERO_IMAGES[k]}')` } : undefined;

  return (
    <>
      <StoryMotion />
      <main id="main">
        <div id="top" />
        {/* ============ HERO ============ */}
        <section className="hero" aria-label="Industry readiness" style={{ padding: 0 }} ref={heroRef}>
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
            <div className="hero-fx">
              <span className="hero-blob b1" />
              <span className="hero-blob b2" />
              <span className="hero-blob b3" />
              <span className="hero-dots" />
              <svg className="hero-shape s-ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" /></svg>
              <svg className="hero-shape s-plus" viewBox="0 0 40 40"><path d="M20 6v28M6 20h28" /></svg>
              <svg className="hero-shape s-squig" viewBox="0 0 120 30"><path d="M4 15c10-12 20-12 28 0s18 12 28 0 18-12 28 0 18 12 28 0" /></svg>
              <span className="hero-shape s-dot" />
              <span className="hero-shape s-pill" />
            </div>
          </div>
          <span className="img-note">
            <span className="flag">Dummy Unsplash images, replace before launch</span>
          </span>

          <div className="wrap">
            <div className="story-tabs" role="tablist" aria-label="Choose an industry">
              {INDUSTRIES.map((k, i) => (
                <button
                  key={k}
                  className="stab"
                  id={`stab-${k}`}
                  role="tab"
                  data-ind={k}
                  aria-controls={`story-${k}`}
                  aria-selected={industry === k}
                  tabIndex={industry === k ? 0 : -1}
                  ref={(el) => { stabRefs.current[i] = el; }}
                  onClick={() => setIndustry(k, true)}
                  onKeyDown={(e) => onStabKey(e, i)}
                >
                  <span className="n">{STORY_TABS[k].n}</span>
                  <span><strong>{STORY_TABS[k].title}</strong><small>{STORY_TABS[k].sub}</small></span>
                </button>
              ))}
            </div>

            <div className="hero-body">
              <div>
                {INDUSTRIES.map((k) => {
                  const h = IND[k].hero;
                  return (
                    <article
                      key={k}
                      className={`story${industry === k ? " on" : ""}`}
                      id={`story-${k}`}
                      data-ind={k}
                      role="tabpanel"
                      aria-labelledby={`stab-${k}`}
                    >
                      <h1 aria-label={h.h1}><span aria-hidden="true"><SplitWords text={h.h1} /></span></h1>
                      <p className="hero-intro">{h.intro}</p>
                      <p className="hero-q">{h.question}</p>
                      <div className="hero-ecra">
                        <span className="hero-ecra-ic" aria-hidden="true">
                          <svg viewBox="0 0 24 24"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01" /></svg>
                        </span>
                        <div>
                          <strong>Enterprise Capability Readiness Assessment</strong>
                          <span>{h.ecraText}</span>
                        </div>
                      </div>
                      <div className="hero-ctas">
                        <a className="btn btn-light hero-cta-main" href="#capabilities">Explore future capabilities<Arrow /></a>
                        <a className="btn btn-outline-light" href="#ecra">Understand the assessment</a>
                      </div>
                    </article>
                  );
                })}
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
                              1600&times;900
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
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 80V46c160-30 320-44 520-28s380 44 560 36 260-26 360-40v66z" />
          </svg>
        </section>

        {/* ============ CAPABILITIES ============ */}
        <section id="capabilities" aria-labelledby="cap-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div>
                <p className="label">Capabilities in focus</p>
                <h2 id="cap-title">What <span data-ind-short="">{d.short}</span> needs to build next</h2>
                <p className="lede">
                  The capability shifts our research is tracking, and what each one asks of the organization and its people.
                </p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            <div className="caps" id="caps" data-stagger>
              {d.caps.map((c, i) => (
                <article className="cap" key={`${industry}-${i}`} style={{ "--i": i } as CSSProperties}>
                  <span className="cap-ghost" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <div className="cap-top">
                    <span className="cap-num">{i + 1}</span>
                    <h3>{c.n}</h3>
                  </div>
                  <p className="cap-focus">{c.focus}</p>
                  <dl className="cap-blocks">
                    <div>
                      <dt>Challenge for leadership team</dt>
                      <dd>{c.challenge}</dd>
                    </div>
                    <div className="cap-rq">
                      <dt>Readiness question</dt>
                      <dd>{c.question}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ STATEMENT BAND ============ */}
        <section className="oll-band" aria-label="How OLL research informs the assessment" data-reveal>
          <div className="wrap">
            <p>
              <SplitWords text={statement} highlight="Enterprise Capability Readiness Assessment (ECRA)" />
            </p>
            <ol className="band-flow" aria-label="From research to readiness">
              {BAND_FLOW.map((step, i) => (
                <li key={step.t} style={{ "--i": i } as CSSProperties}>
                  <span className="band-flow-ic">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={step.d} />
                    </svg>
                  </span>
                  {step.t}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ============ RESEARCH ============ */}
        <section id="research" className="alt" aria-labelledby="res-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
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
            <ResSlider key={industry} items={research} label="Research articles" read="Read synopsis">
              <a
                className="btn btn-ghost btn-arrow"
                href={marketplaceViewAllUrl("research_synopsis")}
                target="_blank"
                rel="noopener"
              >
                View all research
                <Arrow />
              </a>
            </ResSlider>
          </div>
        </section>

        {/* ============ ECRA TEASER ============ */}
        <section id="ecra" aria-labelledby="ecra-title">
          <div className="wrap">
            <div className="ecra-teaser">
              <div data-reveal className="ecra-teaser-main">
                <p className="label">{ecraIntro.label}</p>
                <h2 id="ecra-title">{ecraIntro.h1}</h2>
                <div className="ecra-copy" style={{ marginTop: 18 }}>
                  <p>{ecraIntro.lede}</p>
                  <ul className="ecra-persp-mini" data-stagger>
                    {ecraIntro.perspectives.map((p) => (
                      <li key={p.who}>
                        <strong>{p.who}</strong> {p.need}
                      </li>
                    ))}
                  </ul>
                  <p>{ecraIntro.connect}</p>
                </div>
              </div>
              <div className="ecra-teaser-side">
                <ImageStream items={journey} label="The assessment and transformation journey" />
              </div>
            </div>
            <div className="lv-row" data-reveal>
              <div className="lv-row-axis" aria-hidden="true">
                <span>Wide view</span>
                <i />
                <span>Close view</span>
              </div>
              <ul className="lv-cards lv-cards--row" data-stagger aria-label="Assessment levels">
                {ecraLevels.map((l, i) => (
                  <li key={l.slug}>
                    <Link className="lv-card" href={l.href}>
                      <LevelIcon slug={l.slug} />
                      <span className="lv-card-k">Level {i + 1}</span>
                      <strong>{l.title}</strong>
                      <span className="lv-card-s">{l.summary}</span>
                      <span className="lv-card-go">
                        Explore
                        <Arrow />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ecra-teaser-cta">
              <Link className="btn btn-primary btn-arrow" href="/ecra">
                Explore the assessment
                <Arrow />
              </Link>
              <a className="btn btn-ghost" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
            </div>
          </div>
        </section>

        {/* ============ BEST PRACTICES ============ */}
        <section id="best-practices" className="alt" aria-labelledby="bp-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <div>
                <p className="label">Best practices</p>
                <h2 id="bp-title">What works, tested over time in <span data-ind-short="">{d.short}</span></h2>
                <p className="lede">
                  Proven methods, techniques and frameworks that hold up in practice, written for the leaders who have to run them.
                </p>
              </div>
              <Seg industry={industry} onSelect={selectIndustry} />
            </div>
            <div className="bp-body" data-reveal>
            {practices.length ? (
              <ResSlider key={industry} items={practices} label="Best practice notes" read="Read the practice note">
                <a
                  className="btn btn-ghost btn-arrow"
                  href={marketplaceViewAllUrl("best_practice")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View all best practices
                  <Arrow />
                </a>
              </ResSlider>
            ) : (
              <div className="bp-empty">
                <span className="bp-empty-ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M5 4h10l4 4v12H5zM15 4v4h4M8.5 12.5h7M8.5 16h5" />
                  </svg>
                </span>
                <div className="bp-empty-copy">
                  <strong>Practice notes for {d.short} are on the way</strong>
                  <p>Our team is writing up methods that hold up in practice for this industry. Browse the full library in the meantime.</p>
                </div>
                <a
                  className="btn btn-ghost btn-arrow"
                  href={marketplaceViewAllUrl("best_practice")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Browse the library
                  <Arrow />
                </a>
              </div>
            )}
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" aria-labelledby="faq-title">
          <div className="wrap faq-grid">
            <div className="faq-intro" data-reveal>
              <p className="label">Questions</p>
              <h2 id="faq-title">What leaders usually ask first.</h2>
              <p className="lede">Something else on your mind? Call the team on +91 76766 46518.</p>
              <div style={{ marginTop: 28 }}>
                <a className="btn btn-primary" href="https://platform.ollacademy.com/signup">Assess your readiness</a>
              </div>
            </div>
            <div className="faq" id="faqlist">
              {faqs.map((f, i) => (
                <details key={f.q}>
                  <summary>
                    <span className="faq-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span>{f.q}</span>
                  </summary>
                  <FaqBody parts={f.parts} />
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className={`sticky-cta${stickyShow ? " show" : ""}`} id="sticky">
        <button
          type="button"
          className="btn btn-primary"
          aria-haspopup="dialog"
          aria-expanded={sheetOpen}
          onClick={() => setSheetOpen(true)}
        >
          Assess your readiness
        </button>
      </div>
      <AssessSheet open={sheetOpen} onClose={closeSheet} />
    </>
  );
}
