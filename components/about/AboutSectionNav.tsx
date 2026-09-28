import Link from "next/link";
import { aboutSections, type AboutSectionSlug } from "@/data/about-sections";

type AboutSectionNavProps = {
  current?: AboutSectionSlug;
};

/** "In this section" tab row shared by the About hub and its sub-pages. */
export function AboutSectionNav({ current }: AboutSectionNavProps) {
  return (
    <nav className="about-secnav" aria-label="About us sections">
      <div className="wrap about-secnav-inner">
        <span className="about-secnav-k">In this section</span>
        <ul>
          <li>
            <Link href="/about" aria-current={current ? undefined : "page"}>
              Overview
            </Link>
          </li>
          {aboutSections.map((s) => (
            <li key={s.slug}>
              <Link href={s.href} aria-current={s.slug === current ? "page" : undefined}>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
