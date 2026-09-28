import Image from "next/image";
import Link from "next/link";
import { blueprintLink } from "@/data/about-sections";
import { nextEcraLevel, type LevelSlug } from "@/data/ecra";

export function EcraNextCard({ current }: { current: LevelSlug }) {
  const next = nextEcraLevel(current) ?? blueprintLink;
  return (
    <Link className="about-next" href={next.href}>
      <span className="about-next-copy">
        <span className="about-next-k">Next</span>
        <span className="about-next-t">{next.title}</span>
        <span className="about-next-s">{next.summary}</span>
      </span>
      <span className="about-next-media" aria-hidden="true">
        <Image
          src={next.photo.src}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 280px"
          style={next.photo.position ? { objectPosition: next.photo.position } : undefined}
        />
      </span>
      <span className="about-next-arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
