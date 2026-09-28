import Image from "next/image";
import Link from "next/link";
import { LevelIcon } from "@/components/ecra/LevelIcon";
import { ecraLevels } from "@/data/ecra";

/** Photo tiles linking to the four assessment level pages. */
export function EcraLevelTiles() {
  return (
    <ul className="about-tiles lv-tiles" data-stagger>
      {ecraLevels.map((l, i) => (
        <li key={l.slug}>
          <Link className="about-tile" href={l.href}>
            <span className="about-tile-media" aria-hidden="true">
              <Image
                src={l.photo.src}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 560px"
                style={l.photo.position ? { objectPosition: l.photo.position } : undefined}
              />
              <LevelIcon slug={l.slug} className="lv-icon lv-icon--tile" />
            </span>
            <span className="about-tile-body">
              <span className="lv-tile-k">Level {i + 1}</span>
              <span className="about-tile-t">{l.title}</span>
              <span className="about-tile-s">{l.summary}</span>
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
