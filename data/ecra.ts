/** The ECRA section ("Our Assessment"): the four assessment levels, their profiles and sample outputs. */

import { photos, type SitePhoto } from "@/lib/photos";

export const ECRA_NAV_LABEL = "Our Assessment";

export type LevelSlug = "enterprise" | "business-unit" | "function-capability-area" | "leaders-roles";

export type CompBand = "crit" | "sig" | "mod" | "ok";

export const BAND: Record<CompBand, [string, string]> = {
  crit: ["Critical gap", "b-crit"],
  sig: ["Significant gap", "b-sig"],
  mod: ["Moderate gap", "b-mod"],
  ok: ["On track", "b-ok"],
};

export const BAND_ORDER: CompBand[] = ["crit", "sig", "mod", "ok"];

export const TARGET = 4.0;

/** Band a 1 to 5 score against the 4.0 target. */
export function bandFor(score: number): CompBand {
  if (score < 2.6) return "crit";
  if (score < 3.2) return "sig";
  if (score < 3.8) return "mod";
  return "ok";
}

export type ScoreRow = { name: string; score: number };
export type MaturityRow = { name: string; current: number; target: number };
export type DapOutput = { t: string; d: string };

type DapBase = {
  heading: string;
  lede: string;
  priorities: string[];
  outputs: DapOutput[];
};

export type LevelDap =
  | (DapBase & { kind: "score"; signatureLabel: string; status: string; rows: ScoreRow[] })
  | (DapBase & { kind: "maturity"; rows: MaturityRow[] })
  | (DapBase & { kind: "role"; rows: ScoreRow[]; pills: string[]; profile: string });

export type MaturityStage = { level: number; title: string; desc: string };

export type EcraLevel = {
  slug: LevelSlug;
  href: `/ecra/${LevelSlug}`;
  title: string;
  summary: string;
  photo: SitePhoto;
  purpose: string;
  decisionMaker: string;
  unit: string;
  focus: string;
  params: [string, string][];
  paramsDraft?: boolean;
  maturity?: MaturityStage[];
  dap: LevelDap;
};

export const ecraIntro = {
  label: "Enterprise Capability Readiness Assessment",
  h1: "Assess readiness at the level you make decisions at.",
  lede: "Future readiness is not determined by individual skills alone. It depends on how effectively capabilities are developed and applied across the organizational levels where strategic, operational and workforce decisions are made.",
  perspectives: [
    { who: "Enterprise leaders", need: "need to understand whether the organization can execute its future strategy." },
    { who: "Business and functional leaders", need: "need to identify the capabilities required to deliver their objectives." },
    {
      who: "Team and workforce leaders",
      need: "need to understand whether the relevant roles possess the competencies required for future performance.",
    },
  ],
  connect:
    "ECRA helps connect these perspectives by examining readiness against defined future capability requirements, organizational context and competence blueprints.",
} as const;

export const journey: { photo: SitePhoto; title: string; line: string }[] = [
  { photo: photos.journeyScope, title: "Set the scope", line: "Leaders agree which future capabilities matter most." },
  { photo: photos.journeyAssess, title: "Take the assessment", line: "Participants respond to scenarios set in their industry and role." },
  { photo: photos.journeyReview, title: "Review the evidence", line: "Readiness results are read in context, level by level." },
  { photo: photos.journeyPlan, title: "Plan the priorities", line: "Gaps become accountable development and transformation actions." },
  { photo: photos.journeyTransform, title: "Transform and embed", line: "Capability is built, applied and reassessed over time." },
];

const MATURITY: MaturityStage[] = [
  { level: 1, title: "Initial", desc: "Capability is fragmented, dependent on individuals and inconsistently applied" },
  { level: 2, title: "Emerging", desc: "Basic practices and ownership exist, but application is limited or inconsistent" },
  { level: 3, title: "Established", desc: "Processes, roles, governance and practices are defined and regularly applied" },
  { level: 4, title: "Integrated", desc: "Capability is integrated across relevant functions and produces repeatable outcomes" },
  { level: 5, title: "Adaptive", desc: "Capability continuously evolves, scales and responds to changing requirements" },
];

export const ecraLevels: readonly EcraLevel[] = [
  {
    slug: "enterprise",
    href: "/ecra/enterprise",
    title: "Enterprise",
    summary: "Assess enterprise-wide capability readiness, strategic alignment and future operating requirements.",
    photo: photos.ecraEnterprise,
    purpose:
      "Assess whether the enterprise possesses, or can develop, the organizational capabilities required to execute its future strategy and operating model.",
    decisionMaker: "Board, CEO, executive leadership team, enterprise transformation leadership.",
    unit: "The enterprise as an integrated system.",
    focus:
      "To what extent is the enterprise strategically, organizationally, technologically and operationally prepared to deliver its future business model and required enterprise capabilities?",
    params: [
      ["Future strategic alignment", "Connection between future industry changes, enterprise strategy and capability priorities"],
      ["Future business model readiness", "Ability to adapt revenue models, service portfolio and value proposition"],
      ["Enterprise operating model", "Whether organizational structures and workflows support future requirements"],
      ["Enterprise capability portfolio", "Presence, maturity and criticality of strategic capabilities"],
      ["Governance and decision architecture", "Clarity of accountability, escalation, risk and decision rights"],
      ["Technology and data foundation", "Readiness of platforms, architecture, data and AI infrastructure"],
      ["Workforce and talent readiness", "Workforce capacity, critical roles, skill supply and capability development"],
      ["Leadership readiness", "Leadership alignment, transformation ownership and change capacity"],
      ["Innovation and adaptability", "Ability to sense, experiment, scale and learn"],
      ["Enterprise performance and value realization", "Whether strategic capability investments produce measurable outcomes"],
      ["Risk, resilience and responsible transformation", "Ability to manage technology, operational, regulatory and organizational risks"],
    ],
    dap: {
      kind: "score",
      heading: "An enterprise readiness plan that shows where to act first.",
      lede: "The enterprise view scores readiness on every parameter against the future strategy, and ranks the gaps leadership should address first.",
      signatureLabel: "Enterprise readiness signature",
      status: "Developing, gaps in talent and business model",
      rows: [
        { name: "Future strategic alignment", score: 3.4 },
        { name: "Future business model readiness", score: 2.6 },
        { name: "Enterprise operating model", score: 2.9 },
        { name: "Enterprise capability portfolio", score: 3.1 },
        { name: "Governance and decision architecture", score: 3.6 },
        { name: "Technology and data foundation", score: 3.9 },
        { name: "Workforce and talent readiness", score: 2.4 },
        { name: "Leadership readiness", score: 3.3 },
        { name: "Innovation and adaptability", score: 2.7 },
        { name: "Enterprise performance and value realization", score: 3.5 },
        { name: "Risk, resilience and responsible transformation", score: 4.1 },
      ],
      priorities: [
        "Build supply for critical future roles",
        "Adapt the revenue model and service portfolio",
        "Move innovation from experiment to scale",
      ],
      outputs: [
        { t: "Readiness signature", d: "One enterprise score, built from every parameter and read against the future strategy." },
        { t: "Parameter map", d: "Each of the eleven enterprise parameters scored, banded and sorted by gap." },
        { t: "Leadership priorities", d: "A short list of the gaps with the highest strategic impact and urgency." },
        { t: "Decision support", d: "Inputs for capability investment, operating model change and transformation planning." },
      ],
    },
  },
  {
    slug: "business-unit",
    href: "/ecra/business-unit",
    title: "Business Unit / Organization",
    summary: "Explore the readiness of a business unit or organizational entity to deliver future business outcomes.",
    photo: photos.ecraBusinessUnit,
    purpose:
      "Assess whether a business unit or organizational entity can deliver its assigned future business outcomes and contribute to enterprise strategy.",
    decisionMaker: "Business unit head, business president, COO, unit leadership team.",
    unit: "A defined business unit, subsidiary, geography, delivery organization or operating entity.",
    focus:
      "To what extent is the business unit prepared to translate enterprise strategy and future market requirements into sustainable business outcomes through its operating model, capabilities, workforce and delivery practices?",
    params: [
      ["Business-unit strategic alignment", "Alignment between unit priorities and enterprise strategy"],
      ["Market and client relevance", "Ability to respond to changing client needs and market expectations"],
      ["Portfolio readiness", "Readiness of products, services and offerings"],
      ["Operating model effectiveness", "Whether the unit structure supports its future objectives"],
      ["Delivery capability", "Ability to deliver services consistently and at required quality"],
      ["Commercial capability", "Ability to generate sustainable revenue and margin"],
      ["Workforce readiness", "Availability and development of relevant talent"],
      ["Leadership and management", "Effectiveness of unit leadership and management systems"],
      ["Cross-unit collaboration", "Ability to access enterprise capabilities and collaborate with other units"],
      ["Technology and knowledge enablement", "Availability of platforms, assets, reusable knowledge and tools"],
      ["Change capacity", "Ability to execute multiple changes without disrupting delivery"],
    ],
    dap: {
      kind: "score",
      heading: "A unit readiness plan tied to the outcomes it must deliver.",
      lede: "The business unit view shows how ready the unit is to turn enterprise strategy into results, and which gaps put those outcomes at risk.",
      signatureLabel: "Unit readiness signature",
      status: "Developing, strong delivery, weak portfolio",
      rows: [
        { name: "Business-unit strategic alignment", score: 3.7 },
        { name: "Market and client relevance", score: 3.0 },
        { name: "Portfolio readiness", score: 2.5 },
        { name: "Operating model effectiveness", score: 3.2 },
        { name: "Delivery capability", score: 4.0 },
        { name: "Commercial capability", score: 2.8 },
        { name: "Workforce readiness", score: 2.6 },
        { name: "Leadership and management", score: 3.5 },
        { name: "Cross-unit collaboration", score: 2.9 },
        { name: "Technology and knowledge enablement", score: 3.3 },
        { name: "Change capacity", score: 2.4 },
      ],
      priorities: [
        "Protect delivery while running several changes",
        "Refresh the portfolio for changing client needs",
        "Rebuild commercial capability for new pricing models",
      ],
      outputs: [
        { t: "Unit signature", d: "The unit's overall readiness, comparable with other units in the enterprise." },
        { t: "Outcome risk view", d: "Which parameters put the unit's assigned future outcomes at risk." },
        { t: "Shared gaps", d: "Where the unit depends on enterprise capabilities or other units to close a gap." },
        { t: "Unit priorities", d: "A ranked list of actions for the unit leadership team." },
      ],
    },
  },
  {
    slug: "function-capability-area",
    href: "/ecra/function-capability-area",
    title: "Function / Capability Area",
    summary: "Examine readiness within a function, capability group or strategic transformation area.",
    photo: photos.ecraFunction,
    purpose: "Examine the maturity and readiness of a specific function, capability group or strategic transformation area.",
    decisionMaker: "Functional head, capability owner, practice leader, transformation leader.",
    unit: "A function, practice, capability group or defined organizational capability.",
    focus:
      "To what extent does the function or capability area possess the processes, governance, technology, workforce competence and operating practices required to deliver its future contribution?",
    maturity: MATURITY,
    params: [
      ["Capability definition", "Clarity of purpose, scope, outcomes and ownership"],
      ["Strategic relevance", "Connection to business and transformation priorities"],
      ["Capability architecture", "Sub-capabilities, dependencies and role families"],
      ["Process maturity", "Repeatability, standardization and effectiveness of processes"],
      ["Tools and technology", "Availability and suitability of enabling tools"],
      ["Governance and controls", "Standards, decision rights, risk and quality controls"],
      ["Workforce competence", "Coverage and proficiency of relevant roles"],
      ["Knowledge and reusable assets", "Ability to reuse and scale expertise"],
      ["Performance and outcomes", "Whether the capability creates intended results"],
      ["Innovation and improvement", "Ability to evolve with new requirements"],
      ["Ecosystem integration", "Ability to work with other functions and partners"],
    ],
    dap: {
      kind: "maturity",
      heading: "A maturity plan that moves the capability up a level.",
      lede: "The function view places each parameter on the five-level maturity scale, against the level the future contribution requires.",
      rows: [
        { name: "Capability definition", current: 3, target: 4 },
        { name: "Strategic relevance", current: 3, target: 5 },
        { name: "Capability architecture", current: 2, target: 4 },
        { name: "Process maturity", current: 3, target: 4 },
        { name: "Tools and technology", current: 2, target: 4 },
        { name: "Governance and controls", current: 3, target: 4 },
        { name: "Workforce competence", current: 2, target: 4 },
        { name: "Knowledge and reusable assets", current: 1, target: 3 },
        { name: "Performance and outcomes", current: 2, target: 4 },
        { name: "Innovation and improvement", current: 2, target: 4 },
        { name: "Ecosystem integration", current: 3, target: 4 },
      ],
      priorities: [
        "Capture and reuse expertise across the practice",
        "Close workforce competence gaps in key role families",
        "Map sub-capabilities and dependencies",
      ],
      outputs: [
        { t: "Maturity profile", d: "Current and required maturity level for every parameter, on one scale." },
        { t: "Level gaps", d: "How many levels each parameter must move, so effort goes where the gap is widest." },
        { t: "Capability architecture", d: "The sub-capabilities, dependencies and role families behind the function." },
        { t: "Improvement roadmap", d: "A short priority list for the capability owner and practice leaders." },
      ],
    },
  },
  {
    slug: "leaders-roles",
    href: "/ecra/leaders-roles",
    title: "Leaders / Roles",
    summary: "Explore role-specific competence, workforce readiness and capability development needs.",
    photo: photos.ecraRoles,
    purpose:
      "Examine whether teams and individuals possess the competence, behaviours and practical ability required to perform future roles and contribute to organizational capabilities.",
    decisionMaker: "Team leader, practice manager, HR / L&D leader, role owner and individual professional.",
    unit: "Team, role family, job role, grade, belt or individual.",
    focus:
      "To what extent do the relevant teams and role holders possess the demonstrated competencies required to perform future work and contribute to the organization's target capabilities?",
    paramsDraft: true,
    params: [
      ["Role clarity", "Shared understanding of the role's purpose, outcomes and future expectations"],
      ["Domain and technical proficiency", "Depth of the knowledge and skills the role requires"],
      ["Behavioural competencies", "Consistency of the behaviours the role and culture demand"],
      ["Judgment and decision-making", "Quality of decisions in ambiguous, role-specific situations"],
      ["Practical application", "Ability to apply competence in real work, not only in principle"],
      ["AI and digital fluency", "Confidence in using AI and digital tools responsibly in the role"],
      ["Learning agility", "Speed and willingness to learn, unlearn and adapt"],
      ["Collaboration and influence", "Ability to work across teams and influence outcomes"],
      ["Evidence of performance", "Demonstrated results and work samples that support the assessment"],
      ["Development readiness", "Clarity of development needs and commitment to act on them"],
      ["Role mobility", "Readiness to move into adjacent or future roles"],
    ],
    dap: {
      kind: "role",
      heading: "A Development Action Plan that shows where to grow first.",
      lede: "The participant receives a plan that maps every competency their role carries against the role they're growing into, and ranks where to start.",
      rows: [
        { name: "Decision-making under ambiguity", score: 2.2 },
        { name: "Change leadership", score: 2.5 },
        { name: "Systems and strategic thinking", score: 2.9 },
        { name: "Innovation and adaptive learning", score: 3.0 },
        { name: "Stakeholder influence", score: 3.4 },
        { name: "Coaching and developing others", score: 3.5 },
        { name: "Problem solving", score: 3.9 },
        { name: "Customer orientation", score: 4.1 },
        { name: "Digital fluency", score: 4.2 },
        { name: "Collaboration", score: 4.3 },
        { name: "Execution discipline", score: 4.5 },
      ],
      priorities: ["Outcome-based commercial judgment", "AI-assisted delivery oversight", "Client value advisory"],
      pills: ["Execution-anchored", "Risk-cautious", "Consensus-seeking"],
      profile: "Tends to optimize the known path before questioning it.",
      outputs: [
        { t: "Competency map", d: "Every competency the role carries, however many that is, scored and sorted by gap." },
        { t: "Gap bands", d: "Critical, significant or moderate, so effort goes where the gap is widest." },
        { t: "Mental model profile", d: "The assumptions shaping how this person reads problems and decisions." },
        { t: "Focus areas and reading", d: "A short priority list, with reading material unlocked as soon as a gap is flagged." },
      ],
    },
  },
];

const SIGNUP_LINES: Record<LevelSlug, string> = {
  enterprise: "Enterprise-wide readiness and strategic alignment",
  "business-unit": "Readiness of a business unit or organizational entity",
  "function-capability-area": "Readiness of a function, capability group or area",
  "leaders-roles": "Role-specific competence and a Development Action Plan",
};

const ORG_AUTH = {
  signin: "https://admin.ollacademy.com/auth/signin",
  signup: "https://admin.ollacademy.com/auth/orgSignup",
};
const INDIVIDUAL_AUTH = {
  signin: "https://platform.ollacademy.com/login",
  signup: "https://platform.ollacademy.com/signup",
};

/** Organization-level assessments use the admin portal; Leaders / Roles uses the learner platform. */
const SIGNUP_AUTH: Record<LevelSlug, { signin: string; signup: string }> = {
  enterprise: ORG_AUTH,
  "business-unit": ORG_AUTH,
  "function-capability-area": ORG_AUTH,
  "leaders-roles": INDIVIDUAL_AUTH,
};

/** The four assessments offered at signup, in level order. */
export const assessmentSignups = ecraLevels.map((l) => ({
  slug: l.slug,
  title: l.title,
  line: SIGNUP_LINES[l.slug],
  ...SIGNUP_AUTH[l.slug],
}));

export function ecraLevel(slug: LevelSlug): EcraLevel {
  const found = ecraLevels.find((l) => l.slug === slug);
  if (!found) throw new Error(`Unknown ECRA level: ${slug}`);
  return found;
}

export function nextEcraLevel(slug: LevelSlug): EcraLevel | null {
  const i = ecraLevels.findIndex((l) => l.slug === slug);
  return i >= 0 && i < ecraLevels.length - 1 ? ecraLevels[i + 1] : null;
}
