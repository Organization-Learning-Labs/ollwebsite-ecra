import Image from "next/image";
import Link from "next/link";
import { aboutSections, assessmentLink } from "@/data/about-sections";

export function AboutTiles() {
  const tiles = [...aboutSections, assessmentLink];
  return (
    <ul className="about-tiles" data-stagger>
      {tiles.map((t) => (
        <li key={t.href} className={t.href === assessmentLink.href ? "about-tile-li--wide" : undefined}>
          <Link className={t.href === assessmentLink.href ? "about-tile about-tile--wide" : "about-tile"} href={t.href}>
            <span className="about-tile-media" aria-hidden="true">
              <Image
                src={t.photo.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 380px"
                style={t.photo.position ? { objectPosition: t.photo.position } : undefined}
              />
            </span>
            <span className="about-tile-body">
              <span className="about-tile-t">{t.title}</span>
              <span className="about-tile-s">{t.summary}</span>
              <span className="about-tile-go">
                Explore
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
