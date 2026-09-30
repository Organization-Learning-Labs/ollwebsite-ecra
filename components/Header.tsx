"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { aboutContent } from "@/data/about";
import { aboutSections } from "@/data/about-sections";
import { AssessOptions } from "@/components/AssessOptions";
import { ECRA_NAV_LABEL, ecraLevels } from "@/data/ecra";
import { RESEARCH } from "@/data/home";
import { LevelIcon } from "@/components/ecra/LevelIcon";
import { siteConfig } from "@/lib/site";

function useMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    setCanHover(window.matchMedia("(hover:hover)").matches);

    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const wrapProps = {
    ref: wrapRef,
    onMouseEnter: canHover ? () => setOpen(true) : undefined,
    onMouseLeave: canHover ? () => setOpen(false) : undefined,
  };

  const btnProps = {
    "aria-expanded": open,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen((o) => !o);
    },
  };

  return { open, setOpen, wrapProps, btnProps };
}

const NAV = [
  { href: "/competence-blueprint", label: "Competence Blueprint" },
  { href: "/contact", label: "Contact Us" },
] as const;

const RESEARCH_URL = siteConfig.research;

const ABOUT_LINKS = aboutSections.map((s) => ({ href: s.href, label: s.title }));

const RESEARCH_ICON = {
  paper: (
    <>
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4M10 12h5M10 16h5" />
    </>
  ),
  case: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
    </>
  ),
  practice: (
    <>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="8.5" />
    </>
  ),
};

const RESEARCH_LINKS = [
  { icon: "paper", title: "Whitepapers", line: "Sector research on the capabilities enterprises will need next." },
  { icon: "case", title: "Case Studies", line: "What changed inside organizations that rebuilt a capability." },
  { icon: "practice", title: "Best Practices", line: "Field-tested practice notes for leaders running the change." },
] as const;

const ABOUT_NEWS = RESEARCH.all.slice(0, 3);

export default function Header() {
  const mega = useMenu();
  const about = useMenu();
  const assess = useMenu();
  const signup = useMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMega = () => mega.setOpen(false);
  const closeAbout = () => about.setOpen(false);
  const closeAssess = () => assess.setOpen(false);
  const pathname = usePathname();
  const isCurrent = (href: string) => pathname === href;
  const aboutActive = pathname.startsWith("/about");
  const assessActive = pathname === "/ecra" || pathname.startsWith("/ecra/");

  useEffect(() => {
    document.body.classList.toggle("nav-open", mobileOpen);
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const signupOpen = signup.open;
  const setSignupOpen = signup.setOpen;
  useEffect(() => {
    if (signupOpen) setMobileOpen(false);
  }, [signupOpen]);
  useEffect(() => {
    if (mobileOpen) setSignupOpen(false);
  }, [mobileOpen, setSignupOpen]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/" aria-label="The Organization Learning Labs home" onClick={closeMobile}>
          <Logo />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <div className="mega-wrap mega-wrap--about" {...about.wrapProps}>
            <button
              className="mega-btn"
              id="about-btn"
              aria-controls="about-mega"
              data-active={aboutActive || undefined}
              {...about.btnProps}
            >
              About us
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`mega mega--about${about.open ? " open" : ""}`}
              id="about-mega"
              role="region"
              aria-labelledby="about-btn"
            >
              <div className="mega-about">
                <div className="mega-about-intro">
                  <h4>About us</h4>
                  <p>{aboutContent.hero.lede}</p>
                  <Link className="btn btn-ghost mega-about-explore" href="/about" onClick={closeAbout}>
                    Explore
                  </Link>
                </div>
                <ul className="mega-about-links">
                  {ABOUT_LINKS.map((l, i) => (
                    <li key={l.href} style={{ "--i": i } as CSSProperties}>
                      <Link href={l.href} onClick={closeAbout}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mega-about-news">
                  <h5>Latest research</h5>
                  <ul>
                    {ABOUT_NEWS.map((n, i) => (
                      <li key={n.u} style={{ "--i": i + ABOUT_LINKS.length } as CSSProperties}>
                        <span className="mega-about-news-k">{n.tag}</span>
                        <a href={n.u} target="_blank" rel="noopener" onClick={closeAbout}>
                          {n.t}
                        </a>
                        <span className="mega-about-news-d">
                          {n.on} <i aria-hidden="true" /> {n.by}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mega-wrap mega-wrap--about" {...mega.wrapProps}>
            <button className="mega-btn" id="mega-btn" aria-controls="mega" {...mega.btnProps}>
              Our Research
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`mega mega--about${mega.open ? " open" : ""}`}
              id="mega"
              role="region"
              aria-labelledby="mega-btn"
            >
              <div className="mega-about mega-about--assess">
                <div className="mega-about-intro">
                  <h4>Our Research</h4>
                  <p>
                    Peer-reviewed studies, whitepapers, case studies and practice notes from the OLL Research Academy,
                    on the capabilities industries will need next.
                  </p>
                  <a className="btn btn-ghost mega-about-explore" href={RESEARCH_URL} target="_blank" rel="noopener" onClick={closeMega}>
                    Explore the library
                  </a>
                </div>
                <ul className="mega-levels mega-levels--3">
                  {RESEARCH_LINKS.map((r, i) => (
                    <li key={r.title} style={{ "--i": i } as CSSProperties}>
                      <a href={RESEARCH_URL} target="_blank" rel="noopener" onClick={closeMega}>
                        <span className="lv-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24">{RESEARCH_ICON[r.icon]}</svg>
                        </span>
                        <span>
                          <strong>{r.title}</strong>
                          <small>{r.line}</small>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mega-wrap mega-wrap--about" {...assess.wrapProps}>
            <button
              className="mega-btn"
              id="assess-btn"
              aria-controls="assess-mega"
              data-active={assessActive || undefined}
              {...assess.btnProps}
            >
              {ECRA_NAV_LABEL}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`mega mega--about${assess.open ? " open" : ""}`}
              id="assess-mega"
              role="region"
              aria-labelledby="assess-btn"
            >
              <div className="mega-about mega-about--assess">
                <div className="mega-about-intro">
                  <h4>{ECRA_NAV_LABEL}</h4>
                  <p>{aboutContent.ecra.shortLede}</p>
                  <Link className="btn btn-ghost mega-about-explore" href="/ecra" onClick={closeAssess}>
                    Explore
                  </Link>
                </div>
                <ul className="mega-levels">
                  {ecraLevels.map((l, i) => (
                    <li key={l.slug} style={{ "--i": i } as CSSProperties}>
                      <Link href={l.href} onClick={closeAssess} aria-current={isCurrent(l.href) ? "page" : undefined}>
                        <LevelIcon slug={l.slug} />
                        <span>
                          <strong>{l.title}</strong>
                          <small>{l.summary}</small>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta">
          <div className="signup-wrap" {...signup.wrapProps}>
            <button
              className="btn btn-primary"
              id="signup-btn"
              aria-controls="signup-menu"
              {...signup.btnProps}
            >
              Assess your readiness
              <svg className="caret" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`signup-menu${signup.open ? " open" : ""}`}
              id="signup-menu"
              role="menu"
              aria-labelledby="signup-btn"
            >
              <p className="signup-head">Start at the level you decide at</p>
              <AssessOptions asMenu onPick={() => signup.setOpen(false)} />
            </div>
          </div>
          <button
            type="button"
            className={`nav-toggle${mobileOpen ? " open" : ""}`}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobile-nav${mobileOpen ? " open" : ""}`}
        id="mobile-nav"
        hidden={!mobileOpen}
      >
        <nav className="mobile-nav-links" aria-label="Mobile">
          <p className="mobile-nav-group">About us</p>
          <Link href="/about" onClick={closeMobile} aria-current={isCurrent("/about") ? "page" : undefined}>
            Overview
          </Link>
          {ABOUT_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={closeMobile} aria-current={isCurrent(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
          <p className="mobile-nav-group">Our Research</p>
          {RESEARCH_LINKS.map((r) => (
            <a key={r.title} href={RESEARCH_URL} target="_blank" rel="noopener" onClick={closeMobile}>
              {r.title}
            </a>
          ))}
          <p className="mobile-nav-group">{ECRA_NAV_LABEL}</p>
          <Link href="/ecra" onClick={closeMobile} aria-current={isCurrent("/ecra") ? "page" : undefined}>
            Overview
          </Link>
          {ecraLevels.map((l) => (
            <Link key={l.slug} href={l.href} onClick={closeMobile} aria-current={isCurrent(l.href) ? "page" : undefined}>
              {l.title}
            </Link>
          ))}
          {NAV.map((item) => (
            <Link
              key={item.href}
              className="mobile-nav-solo"
              href={item.href}
              onClick={closeMobile}
              aria-current={isCurrent(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <p className="mobile-nav-group">Assess your readiness</p>
          <AssessOptions className="assess-opts assess-opts--compact" onPick={closeMobile} />
        </nav>
      </div>
      {mobileOpen ? (
        <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={closeMobile} />
      ) : null}
    </header>
  );
}
