import Image from "next/image";
import { AboutReveal } from "@/components/about/AboutReveal";
import type { SitePhoto } from "@/lib/photos";

type SplitMediaProps = {
  photo: SitePhoto;
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
};

/** Copy + photo side-by-side; stacks on mobile. */
export function SplitMedia({ photo, reverse = false, children, className = "" }: SplitMediaProps) {
  return (
    <AboutReveal className={`split${reverse ? " split--rev" : ""} ${className}`.trim()}>
      <div className="split-copy">{children}</div>
      <figure className="split-media">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 960px) 100vw, 520px"
          className="split-media-img"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      </figure>
    </AboutReveal>
  );
}
