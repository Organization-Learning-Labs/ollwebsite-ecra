import Image from "next/image";
import { AboutReveal } from "@/components/about/AboutReveal";
import type { SitePhoto } from "@/lib/photos";

type PhotoBandProps = {
  photo: SitePhoto;
  /** Hide the caption when the neighbouring section already names the idea. */
  showCaption?: boolean;
  priority?: boolean;
};

/** Full-width editorial photograph used to break up long-form sections. */
export default function PhotoBand({ photo, showCaption = true, priority = false }: PhotoBandProps) {
  return (
    <AboutReveal className="photo-band">
      <figure className="photo-band-frame">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1240px) 92vw, 1160px"
          className="photo-band-img"
          style={photo.position ? { objectPosition: photo.position } : undefined}
          priority={priority}
        />
      </figure>
      {showCaption ? <p className="about-visual-caption">{photo.caption}</p> : null}
    </AboutReveal>
  );
}
