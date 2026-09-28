import Link from "next/link";
import { ECRA_NAV_LABEL, ecraLevels, type LevelSlug } from "@/data/ecra";

/** "In this section" tab row shared by the ECRA hub and its level pages. */
export function EcraSectionNav({ current }: { current?: LevelSlug }) {
  return (
    <nav className="about-secnav" aria-label={`${ECRA_NAV_LABEL} sections`}>
      <div className="wrap about-secnav-inner">
        <span className="about-secnav-k">{ECRA_NAV_LABEL}</span>
        <ul>
          <li>
            <Link href="/ecra" aria-current={current ? undefined : "page"}>
              Overview
            </Link>
          </li>
          {ecraLevels.map((l) => (
            <li key={l.slug}>
              <Link href={l.href} aria-current={l.slug === current ? "page" : undefined}>
                {l.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
