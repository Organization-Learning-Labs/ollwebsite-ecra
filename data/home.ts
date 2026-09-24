export type IndustryKey = "it" | "bfsi";

export type Cap = {
  n: string;
  slug: string;
  why: string;
  org: string;
  work: string;
  roles: string;
};

export type Industry = {
  short: string;
  name: string;
  shiftLede: string;
  caps: Cap[];
  shift: [string, string, string][];
  q: { comp: string; text: string; opts: string[] };
  focus: string[];
};

export const ART_BASE =
  "https://theorganizationlearninglabs.com/research/capabilities/";

export const IND: Record<IndustryKey, Industry> = {
  it: {
    short: "technology services",
    name: "Technology and IT",
    shiftLede:
      "How IT services firms work today, and the operating model AI-assisted delivery is pushing them toward.",
    caps: [
      {
        n: "AI-augmented delivery",
        slug: "ai-augmented-delivery",
        why: "Delivery work is splitting between people and AI systems, and team structures haven't caught up.",
        org: "Governance for AI in delivery, quality assurance of AI output, human review built into the workflow.",
        work: "Directing and reviewing AI-generated work, judgment on output, explaining trade-offs to clients.",
        roles: "Delivery managers, engineers, QA leads",
      },
      {
        n: "Outcome-based pricing",
        slug: "outcome-based-pricing",
        why: "When AI cuts the hours, billing by the hour cuts the revenue.",
        org: "Value measurement, risk-sharing contracts, cost models that include AI consumption.",
        work: "Framing business cases, negotiating on outcomes, managing delivery risk.",
        roles: "Account leaders, deal teams, finance partners",
      },
      {
        n: "Talent re-architecture",
        slug: "talent-re-architecture",
        why: "The bench-heavy pyramid made sense when demand was measured in people.",
        org: "Capability-based workforce planning, new career paths, faster redeployment.",
        work: "Continuous reskilling, moving between roles as demand shifts, coaching others.",
        roles: "HR leaders, practice heads, first-line managers",
      },
      {
        n: "Client value advisory",
        slug: "client-value-advisory",
        why: "Clients increasingly expect a point of view, not just capacity.",
        org: "Industry insight functions, advisory offerings, outcome accountability.",
        work: "Consultative selling, industry fluency, trusted-advisor relationships.",
        roles: "Client partners, pre-sales, domain consultants",
      },
    ],
    shift: [
      ["How work is priced", "Billed per man-hour", "Priced on outcomes and delivered value"],
      [
        "How capacity is held",
        "Large benches waiting for demand",
        "Smaller AI-assisted teams deployed on demand",
      ],
      [
        "What people do",
        "Configure and customize by hand",
        "Direct, review and assure AI-generated work",
      ],
      [
        "Where margin comes from",
        "Utilization of people",
        "Productivity of people and AI, with AI costs managed",
      ],
      ["What clients buy", "Capacity and effort", "Advice, accountability and results"],
      [
        "How talent grows",
        "Entry-level-heavy pyramid",
        "Fewer, deeper roles with continuous reskilling",
      ],
    ],
    q: {
      comp: "Commercial judgment",
      text: "A long-standing client asks to move a renewal from man-hour billing to a fixed outcome price, because AI has cut the effort involved. What do you do first?",
      opts: [
        "Hold the current rate card and defend the hours",
        "Model the outcome price with delivery and finance, including AI costs and risk",
        "Accept the client's number to protect the relationship",
        "Escalate to leadership and wait for a policy",
      ],
    },
    focus: [
      "Outcome-based commercial judgment",
      "AI-assisted delivery oversight",
      "Client value advisory",
    ],
  },
  bfsi: {
    short: "BFSI",
    name: "BFSI",
    shiftLede:
      "How banks and insurers work today, and the operating model digital channels and AI-enabled threats demand.",
    caps: [
      {
        n: "Workforce cyber resilience",
        slug: "workforce-cyber-resilience",
        why: "Attackers target people first, and AI makes the attempt more convincing.",
        org: "Security culture beyond the IT team, clear escalation paths, regular simulations.",
        work: "Spotting social engineering and deepfakes, verification discipline, reporting fast.",
        roles: "Branch, operations and service teams",
      },
      {
        n: "Risk-aware AI adoption",
        slug: "risk-aware-ai-adoption",
        why: "AI is entering credit, underwriting and service decisions, carrying model and conduct risk with it.",
        org: "Model risk governance, explainability standards, joint risk and product teams.",
        work: "Data literacy, questioning model output, explaining risk in plain terms.",
        roles: "Risk officers, underwriters, product managers",
      },
      {
        n: "Third-party and vendor governance",
        slug: "vendor-governance",
        why: "Most institutions rely on outside vendors for cyber functions, so a single provider's failure can spread.",
        org: "Vendor risk frameworks, concentration monitoring, exit and fallback plans.",
        work: "Contract and SLA judgment, assessing vendor security, owning outcomes you outsource.",
        roles: "CIOs, CISOs, procurement, vendor managers",
      },
      {
        n: "Incident and forensic readiness",
        slug: "incident-forensic-readiness",
        why: "The regulator flags forensic preparedness as an area that needs to improve.",
        org: "Incident playbooks, evidence preservation, rehearsed regulatory reporting.",
        work: "Calm decisions under pressure, cross-team coordination, clear communication.",
        roles: "Security operations, compliance, communications",
      },
    ],
    shift: [
      ["Where trust lives", "Branches, vaults and signatures", "Apps, APIs and digital identity"],
      [
        "Who owns security",
        "The IT and info-sec team",
        "Every employee, with board-level ownership",
      ],
      [
        "How attacks arrive",
        "Forged paper and physical fraud",
        "AI-generated phishing, deepfakes, automated intrusion",
      ],
      [
        "Security skills",
        "Managerial oversight of vendors",
        "In-house depth plus strong vendor governance",
      ],
      [
        "Workforce shape",
        "Clerical and processing roles",
        "Fewer roles carrying digital and risk judgment",
      ],
      [
        "Incident response",
        "Report and recover",
        "Detect early, preserve evidence, respond fast",
      ],
    ],
    q: {
      comp: "Risk judgment",
      text: "A branch manager gets a video call from someone who looks and sounds like a senior executive, asking to approve an urgent transfer before a deadline. What should happen first?",
      opts: [
        "Approve it, since the caller is clearly recognizable",
        "Verify through a separate, known channel before acting",
        "Ask a colleague on the call to confirm",
        "Approve a smaller amount now and the rest later",
      ],
    },
    focus: [
      "Social engineering and deepfake awareness",
      "Verification discipline",
      "Incident escalation",
    ],
  },
};

export type CardItem = {
  tag: string;
  t: string;
  d: string;
  by: string;
  on: string;
  u: string;
  img?: string;
};

export const PRACTICES: Record<IndustryKey, CardItem[]> = {
  it: [
    {
      tag: "Delivery",
      t: "Running a capability review before a pricing change",
      d: "A practical sequence for testing whether delivery teams can carry outcome-based commitments before the commercial model moves.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
    {
      tag: "Talent",
      t: "Redeploying a bench without losing institutional knowledge",
      d: "How to move people between roles as demand shifts, and what to keep documented so the experience does not leave with them.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
    {
      tag: "AI adoption",
      t: "Human review checkpoints for AI-assisted delivery",
      d: "Where to place review, who owns the judgment, and how to keep quality assurance meaningful as volume rises.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
  ],
  bfsi: [
    {
      tag: "Cyber",
      t: "Verification discipline on the front line",
      d: "A repeatable process for confirming instructions through a second channel, and how to rehearse it so it holds under pressure.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
    {
      tag: "Risk",
      t: "Bringing risk into product design rather than the approval gate",
      d: "Working practices that move risk and compliance upstream without slowing the build to a halt.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
    {
      tag: "Governance",
      t: "Running an incident rehearsal that produces evidence",
      d: "How to structure a drill so the organization learns something and the record stands up to regulatory scrutiny.",
      by: "OLL practice note",
      on: "[Date]",
      u: "#",
    },
  ],
};

const RESEARCH_ALL: CardItem[] = [
  {
    tag: "Transportation & Logistics",
    t: "Sustainable Transport Capability for Leaders",
    d: "A leadership guide to building practical ESG and sustainable transport capability that turns emissions targets into route, fleet, and behavior change.",
    by: "Organization Learning Labs",
    on: "Jul 24, 2026",
    u: "https://research.ollacademy.com/research?type=internal",
  },
  {
    tag: "Transportation & Logistics",
    t: "Control Tower and Data-Driven Decision Capability",
    d: "A leadership guide to moving beyond dashboards toward real-time, data-driven decision capability across transportation and logistics networks.",
    by: "Organization Learning Labs",
    on: "Jul 23, 2026",
    u: "https://research.ollacademy.com/research/control-tower-and-data-driven-decision-capability",
  },
  {
    tag: "Transportation & Logistics",
    t: "Building a Transportation Talent Capability System",
    d: "A leadership guide to building a skills-based talent and learning system for transportation and logistics teams, mapped to a 2035 capability horizon ahead.",
    by: "Organization Learning Labs",
    on: "Jul 23, 2026",
    u: "https://research.ollacademy.com/research/building-a-transportation-talent-capability-system",
  },
  {
    tag: "Transportation & Logistics",
    t: "Cross-Border Trade Compliance Capability Guide",
    d: "A leadership guide to building cross-border logistics and trade compliance capability that turns tariff volatility into a manageable, governed process.",
    by: "Organization Learning Labs",
    on: "Jul 23, 2026",
    u: "https://research.ollacademy.com/research/cross-border-trade-compliance-capability-guide",
  },
  {
    tag: "Transportation & Logistics",
    t: "Urban Logistics Network Design Capability",
    d: "A leadership guide to building urban logistics capability for congestion, low-emission zones, curb access, and hyper-local city delivery through 2035.",
    by: "Organization Learning Labs",
    on: "Jul 24, 2026",
    u: "https://research.ollacademy.com/research/urban-logistics-network-design-capability",
  },
  {
    tag: "Transportation & Logistics",
    t: "Warehouse and Fulfilment Capability Building Guide",
    d: "A leadership guide to building warehouse and fulfilment capability through lean practice, WMS-led execution, and frontline upskilling for the decade ahead.",
    by: "Organization Learning Labs",
    on: "Jul 23, 2026",
    u: "https://research.ollacademy.com/research/warehouse-and-fulfilment-capability-building-guide",
  },
];

export const RESEARCH: Record<IndustryKey | "all", CardItem[]> = {
  all: RESEARCH_ALL,
  it: RESEARCH_ALL,
  bfsi: RESEARCH_ALL,
};

export type CaseStudy = {
  tag: string;
  t: string;
  d: string;
  u?: string;
  img?: string;
  m1?: string;
  l1?: string;
  m2?: string;
  l2?: string;
};

function makeCases(): CaseStudy[] {
  return [1, 2, 3].map((i) => ({
    tag: "[Client name]",
    t: `[Case ${i}: the capability that had to change]`,
    d: "[Two-line summary: what the organization did, and what it changed.]",
    m1: "[Metric]",
    l1: "[Verified outcome]",
    m2: "[Metric]",
    l2: "[Verified outcome]",
  }));
}

export const CASES: Record<IndustryKey, CaseStudy[]> = {
  it: makeCases(),
  bfsi: makeCases(),
};

export type CompBand = "crit" | "sig" | "mod" | "ok";

export const COMPS: [string, number, CompBand][] = [
  ["Decision-making under ambiguity", 2.2, "crit"],
  ["Change leadership", 2.5, "crit"],
  ["Systems and strategic thinking", 2.9, "sig"],
  ["Innovation and adaptive learning", 3.0, "sig"],
  ["Stakeholder influence", 3.4, "mod"],
  ["Coaching and developing others", 3.5, "mod"],
  ["Problem solving", 3.9, "ok"],
  ["Customer orientation", 4.1, "ok"],
  ["Digital fluency", 4.2, "ok"],
  ["Collaboration", 4.3, "ok"],
  ["Execution discipline", 4.5, "ok"],
];

export const BAND: Record<CompBand, [string, string]> = {
  crit: ["Critical gap", "b-crit"],
  sig: ["Significant gap", "b-sig"],
  mod: ["Moderate gap", "b-mod"],
  ok: ["On track", "b-ok"],
};

export const TARGET = 4.0;
export const VISIBLE_COMPS = 6;

export const HERO_IMAGES: Record<IndustryKey, string> = {
  it: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=75",
  bfsi: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=75",
};
