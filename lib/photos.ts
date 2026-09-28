/**
 * Editorial photography for the long-form pages.
 * Local assets in /public/photos - Indian teams at work, generated for this site,
 * one scene per section so each image reflects what that section talks about.
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
  connected: {
    src: "/photos/hub-connected.jpg",
    alt: "Indian cross-functional team around a table with research reports while two colleagues map a connected flow on a whiteboard",
    caption: "Research, capability architecture and transformation, working as one system",
    position: "center 45%",
  },
  purpose: {
    src: "/photos/purpose.jpg",
    alt: "Indian leadership team at a strategy offsite moving cards along a roadmap board",
    caption: "Asking what the organization must become capable of next",
  },
  values: {
    src: "/photos/values.jpg",
    alt: "Circle of Indian colleagues in an open learning conversation over chai, a senior mentor listening",
    caption: "Honesty, a learning mindset and the journey over the destination",
  },
  approach: {
    src: "/photos/approach.jpg",
    alt: "Indian team clustering sticky notes on a glass wall while colleagues review a research report and a laptop",
    caption: "Turning research and expert inquiry into future capabilities",
  },
  ecra: {
    src: "/photos/ecra.jpg",
    alt: "Indian managers reviewing capability readiness results on a wall screen and tablets with a facilitator",
    caption: "Readiness insight that informs capability decisions",
  },
  responsible: {
    src: "/photos/responsible.jpg",
    alt: "Indian HR leader and manager going through a development report with an employee in a private meeting room",
    caption: "Clarity, context and the responsible use of assessment insights",
  },
  blueprint: {
    src: "/photos/blueprint.jpg",
    alt: "Indian capability architects building a wall map that branches from capabilities down to role-level competencies",
    caption: "From capability families to role-level competence",
  },
  reinvention: {
    src: "/photos/reinvention.jpg",
    alt: "Indian team prototyping a new way of working in a learning lab while a senior leader observes and takes notes",
    caption: "Experimenting, learning and continuously evolving",
  },
  levels: {
    src: "/photos/levels.jpg",
    alt: "Indian office seen across levels: leaders in a glass meeting room above, a business-unit huddle and functional teams on the floor below",
    caption: "Enterprise, business unit, function and role",
  },
  ecraEnterprise: {
    src: "/photos/ecra-enterprise.jpg",
    alt: "Indian board and executive team reviewing an enterprise capability dashboard and capability map on a boardroom screen",
    caption: "Enterprise leaders reading readiness against the future strategy",
  },
  ecraBusinessUnit: {
    src: "/photos/ecra-business-unit.jpg",
    alt: "Indian business unit head leading a leadership huddle over a tablet scorecard and printed charts",
    caption: "A business unit testing whether it can deliver its future outcomes",
  },
  ecraFunction: {
    src: "/photos/ecra-function.jpg",
    alt: "Indian practice leader facilitating a functional team workshop with process maps and sticky notes on a whiteboard",
    caption: "A function mapping its capability maturity",
  },
  ecraRoles: {
    src: "/photos/ecra-roles.jpg",
    alt: "Indian team leader coaching a small team around a laptop showing a personal development plan",
    caption: "Role-specific competence and development priorities",
  },
  journeyScope: {
    src: "/photos/journey-scope.jpg",
    alt: "Indian senior leaders arranging cards into a future capability map on a glass wall",
    caption: "Set the scope",
  },
  journeyAssess: {
    src: "/photos/journey-assess.jpg",
    alt: "Indian professionals at a shared desk taking a scenario-based online assessment on laptops",
    caption: "Take the assessment",
  },
  journeyReview: {
    src: "/photos/journey-review.jpg",
    alt: "Indian leadership group reviewing readiness heat maps and charts around a round table",
    caption: "Review the evidence",
  },
  journeyPlan: {
    src: "/photos/journey-plan.jpg",
    alt: "Indian cross-functional team building an action plan with owners on a large timeline wall",
    caption: "Plan the priorities",
  },
  journeyTransform: {
    src: "/photos/journey-transform.jpg",
    alt: "Indian team celebrating a small win while applying a new AI-enabled workflow at a standing desk",
    caption: "Transform and embed",
  },
  engineering: {
    src: "/photos/engineering.jpg",
    alt: "Indian software team mob-programming with an AI assistant on screen while a tech lead coaches and a colleague sketches architecture",
    caption: "AI-augmented software engineering in practice",
  },
} satisfies Record<string, SitePhoto>;
