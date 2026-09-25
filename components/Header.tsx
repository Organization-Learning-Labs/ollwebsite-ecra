"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/Logo";
import { siteConfig } from "@/lib/site";

const SIGNUP_URL = siteConfig.platform.signup;

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
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#research", label: "Research" },
  { href: "/#best-practices", label: "Best practices" },
  { href: "/#shift", label: "Operating model" },
  { href: "/#ecra", label: "Assessment" },
  { href: "/competence-blueprint", label: "Blueprint", ariaLabel: "Competence Blueprint" },
  { href: "/#dap", label: "DAP" },
  { href: "/about", label: "About us" },
] as const;

export default function Header() {
  const mega = useMenu();
  const signup = useMenu();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMega = () => mega.setOpen(false);

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

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link className="brand" href="/#top" aria-label="The Organization Learning Labs home" onClick={closeMobile}>
          <Logo />
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#capabilities">Capabilities</Link>
          <div className="mega-wrap" {...mega.wrapProps}>
            <button className="mega-btn" id="mega-btn" aria-controls="mega" {...mega.btnProps}>
              Our Research
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              className={`mega${mega.open ? " open" : ""}`}
              id="mega"
              role="region"
              aria-labelledby="mega-btn"
            >
              <div className="mega-inner">
                <a className="mega-col" href="#" onClick={closeMega}>
                  <h4>Whitepapers</h4>
                  <p>Sector research on the capabilities enterprises will need next.</p>
                  <span className="mega-eg">Future of IT services delivery</span>
                  <span className="mega-eg">Cyber readiness as a workforce capability</span>
                  <span className="mega-link">Browse whitepapers</span>
                </a>
                <Link className="mega-col" href="/#research" onClick={closeMega}>
                  <h4>Case Studies</h4>
                  <p>What changed inside organizations that rebuilt a capability.</p>
                  <span className="mega-eg">From billable hours to outcomes</span>
                  <span className="mega-eg">Building cyber judgment on the front line</span>
                  <span className="mega-link">Browse case studies</span>
                </Link>
                <Link className="mega-col" href="/#best-practices" onClick={closeMega}>
                  <h4>Best Practices</h4>
                  <p>Field-tested practice notes for leaders running the change.</p>
                  <span className="mega-eg">Running a capability review</span>
                  <span className="mega-eg">Nominating the right participants</span>
                  <span className="mega-link">Browse best practices</span>
                </Link>
              </div>
              <div className="mega-foot">
                <span className="flag">Links to be supplied</span>
                <a href={siteConfig.research} target="_blank" rel="noopener">
                  Go to the full research library
                </a>
              </div>
            </div>
          </div>
          <Link href="/#shift">Operating model</Link>
          <Link href="/#ecra">Assessment</Link>
          <Link href="/competence-blueprint" aria-label="Competence Blueprint">
            Blueprint
          </Link>
          <Link href="/#dap">DAP</Link>
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
              <a role="menuitem" href={SIGNUP_URL} data-level="org">
                <strong>Sign up as an organization</strong>
                <span>Structural and governance maturity</span>
              </a>
              <a role="menuitem" href={SIGNUP_URL} data-level="dept">
                <strong>Sign up as a department</strong>
                <span>Where the capability gaps sit in a unit</span>
              </a>
              <a role="menuitem" href={SIGNUP_URL} data-level="ind">
                <strong>Sign up as an individual</strong>
                <span>Your own Development Action Plan</span>
              </a>
              <div className="signup-foot">
                <span className="flag">Three signup URLs to be supplied</span>
              </div>
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
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={"ariaLabel" in item ? item.ariaLabel : undefined}
              onClick={closeMobile}
            >
              {item.label}
            </Link>
          ))}
          <a className="btn btn-primary mobile-nav-cta" href={SIGNUP_URL} onClick={closeMobile}>
            Assess your readiness
          </a>
        </nav>
      </div>
      {mobileOpen ? (
        <button type="button" className="mobile-nav-backdrop" aria-label="Close menu" onClick={closeMobile} />
      ) : null}
    </header>
  );
}
