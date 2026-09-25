/**
 * Editorial photography for the long-form pages.
 * Local assets in /public/photos — Indian professionals, generated for this site.
 */

export type SitePhoto = {
  /** Path under /public, e.g. /photos/research.jpg */
  src: string;
  alt: string;
  caption: string;
  /** CSS object-position, for photos whose subject is off-centre in a wide crop. */
  position?: string;
};

export const photos = {
  research: {
    src: "/photos/research.jpg",
    alt: "Indian professionals taking notes around a table in a daylit working session",
    caption: "Research with practitioners, experts and academicians",
  },
  workshop: {
    src: "/photos/workshop.jpg",
    alt: "Indian facilitator mapping ideas on a wall of sticky notes while colleagues look on",
    caption: "Translating research into capability architecture",
  },
  blueprint: {
    src: "/photos/blueprint.jpg",
    alt: "Indian engineer reviewing architecture diagrams at a workbench",
    caption: "From capability families to role-level competence",
    position: "center 40%",
  },
  boardroom: {
    src: "/photos/boardroom.jpg",
    alt: "Indian leadership team in a boardroom working through a presentation",
    caption: "Enterprise decisions, not training alone",
  },
  levels: {
    src: "/photos/levels.jpg",
    alt: "Modern Indian open-plan office with teams working across the floor",
    caption: "Enterprise, business unit, function and role",
  },
  engineering: {
    src: "/photos/engineering.jpg",
    alt: "Two Indian engineers reviewing code together at a monitor",
    caption: "An illustrative capability in practice",
    position: "center 35%",
  },
  planning: {
    src: "/photos/planning.jpg",
    alt: "Two Indian colleagues sketching a plan on paper beside open laptops",
    caption: "Diagnose, design, transform, develop, embed",
    position: "center 45%",
  },
} satisfies Record<string, SitePhoto>;
