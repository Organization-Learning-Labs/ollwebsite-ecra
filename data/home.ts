export type IndustryKey = "it" | "bfsi";

export type Cap = {
  n: string;
  focus: string;
  challenge: string;
  question: string;
};

export type Hero = {
  h1: string;
  intro: string;
  question: string;
  ecraText: string;
};

export type Industry = {
  short: string;
  name: string;
  hero: Hero;
  caps: Cap[];
};

export const IND: Record<IndustryKey, Industry> = {
  it: {
    short: "IT services and consulting",
    name: "IT Services and Consulting",
    hero: {
      h1: "Your next growth model may demand a different kind of IT services organization.",
      intro:
        "AI-augmented engineering, platform-led delivery, outcome-based commercial models and evolving client expectations are redefining how IT services and consulting organizations create value.",
      question:
        "Does your organization have the capabilities, competencies and leadership readiness to compete in what comes next?",
      ecraText:
        "Explore future industry capabilities, understand your organization's current readiness, and identify the workforce competency priorities required for enterprise reinvention.",
    },
    caps: [
      {
        n: "AI-Augmented, Industry-Contextualized Technology & Engineering Capability",
        focus: "AI-enabled engineering, deep technology expertise and industry-specific solution delivery",
        challenge:
          "How can we create an organization-wide environment that continuously develops technology expertise, industry knowledge and AI-enabled engineering capabilities through workforce planning, learning and knowledge sharing?",
        question:
          "To what extent can our organization consistently combine deep technology expertise, industry knowledge and AI-enabled engineering practices to deliver differentiated client outcomes?",
      },
      {
        n: "Enterprise Problem-Solving & Decision Intelligence Capability",
        focus: "Evidence-based problem-solving, systems thinking and decision support for complex enterprise challenges",
        challenge:
          "How can we build a culture of critical thinking, evidence-based decision-making and collaborative problem-solving across the organization?",
        question:
          "How effectively can our teams diagnose ambiguous client and enterprise problems, evaluate alternatives and recommend evidence-based solutions?",
      },
      {
        n: "Continuous Innovation & Adaptive Enterprise Learning Capability",
        focus: "Experimentation, service innovation, continuous learning and adaptation of business models",
        challenge:
          "How can we establish structures, leadership practices and cultural mechanisms that enable experimentation, continuous learning and rapid adaptation?",
        question:
          "Can our organization consistently identify, experiment with and scale new technologies, services and business models before existing offerings become less relevant?",
      },
      {
        n: "Integrated, Ecosystem-Enabled & Client-Centric Collaboration Capability",
        focus: "Connected delivery, cross-functional collaboration, strategic partnerships and client co-creation",
        challenge:
          "How can we design cross-functional teams, collaborative workflows and leadership practices that strengthen client relationships, knowledge exchange and ecosystem partnerships?",
        question:
          "To what extent can our organization integrate teams, functions and external partners to solve complex client problems and consistently deliver shared outcomes?",
      },
      {
        n: "Business-Led Technology Strategy & Outcome-Oriented Consulting Capability",
        focus: "Business value, industry-led strategy, measurable outcomes and commercially sustainable service delivery",
        challenge:
          "How can we align strategy, roles, performance systems and workforce capabilities so that technology and consulting services consistently create measurable business value?",
        question:
          "To what extent can our organization translate client business priorities into technology strategies, consulting solutions and measurable business outcomes?",
      },
      {
        n: "Responsible, Adaptive & Transformation-Oriented Leadership Capability",
        focus: "Responsible transformation, governance, workforce readiness and accountability for outcomes",
        challenge:
          "How can we develop leaders, governance mechanisms and organizational cultures that support responsible transformation, employee development and accountability?",
        question:
          "To what extent do our leaders demonstrate the ability to guide transformation, develop future-ready talent, govern technology responsibly and remain accountable for business outcomes?",
      },
    ],
  },
  bfsi: {
    short: "retail banking",
    name: "Retail Banking",
    hero: {
      h1: "The future of banking depends on more than digital technology. It depends on what your people and organization can do with it.",
      intro:
        "As customer needs evolve and AI changes banking processes, banks must strengthen the capabilities that support trusted advice, seamless service, responsible decisions and resilient operations.",
      question: "Does your workforce have the competencies needed to deliver your bank's future strategy?",
      ecraText:
        "Connect future banking capabilities with role-specific competency requirements and identify development priorities across your organization.",
    },
    caps: [
      {
        n: "Digital, AI-Enabled & Customer-Centric Banking Capability",
        focus: "Personalized, accessible and integrated customer experiences",
        challenge:
          "How can we build an organization-wide environment that integrates digital channels, AI, data and human service capabilities to deliver seamless, personalized and trusted customer experiences?",
        question:
          "To what extent can our bank consistently combine digital platforms, AI, customer insight and workforce capabilities to deliver differentiated, secure and personalized banking experiences?",
      },
      {
        n: "Enterprise Risk Intelligence & Responsible Decision-Making Capability",
        focus: "Proactive risk management and evidence-based decisions",
        challenge:
          "How can we strengthen a culture of evidence-based decision-making, proactive risk identification and responsible use of data and AI across lending, operations, compliance and customer service?",
        question:
          "How effectively can our teams identify emerging risks, evaluate complex customer and business situations, and make timely, evidence-based and responsible decisions?",
      },
      {
        n: "Continuous Innovation & Adaptive Banking Capability",
        focus: "Innovation, experimentation and organizational learning",
        challenge:
          "How can we develop structures, leadership practices and cultural mechanisms that enable the bank to experiment with new financial services, technologies and operating models while managing risk?",
        question:
          "Can our bank consistently identify, test and scale new products, services and operating practices in response to changing customer expectations, technology and market conditions?",
      },
      {
        n: "Integrated, Ecosystem-Enabled & Customer-Responsive Collaboration Capability",
        focus: "Connected channels, functions and ecosystem partnerships",
        challenge:
          "How can we design cross-functional teams, integrated workflows and partnership models that connect branches, digital channels, operations, technology, risk and external ecosystems around customer outcomes?",
        question:
          "To what extent can our bank integrate functions, channels and ecosystem partners to deliver consistent customer experience and resolve complex customer needs effectively?",
      },
      {
        n: "Business-Led Banking Strategy & Outcome-Oriented Service Capability",
        focus: "Customer value, sustainable growth and operational performance",
        challenge:
          "How can we align strategy, products, customer segments, operating models, performance systems and workforce capabilities to create sustainable customer and business value?",
        question:
          "To what extent can our bank translate changing customer and market needs into differentiated products, sustainable growth, operational efficiency and measurable customer outcomes?",
      },
      {
        n: "Responsible, Adaptive & Trust-Centered Banking Leadership Capability",
        focus: "Responsible transformation, trust, governance and workforce readiness",
        challenge:
          "How can we develop leaders, governance mechanisms and organizational cultures that support responsible innovation, workforce transformation, customer trust and accountability?",
        question:
          "To what extent do our leaders demonstrate the ability to guide digital and AI-enabled transformation, develop future-ready talent, protect customer trust and maintain accountability for business outcomes?",
      },
    ],
  },
};

export const OLL_STATEMENT =
  "The Organization Learning Labs examines structural changes affecting industries, business models, operating models and organizational capabilities. These insights inform future capability models and competence blueprints. Enterprise Capability Readiness Assessment (ECRA) uses these models to explore how prepared organizations are to meet future capability requirements.";

export type FaqPart =
  | { p: string }
  | { ul: string[] }
  | { ol: string[] }
  | { table: { head: [string, string]; rows: [string, string][] } };

export type Faq = { q: string; parts: FaqPart[] };

const CAPABILITY_VS_COMPETENCE: FaqPart = {
  table: {
    head: ["Enterprise capability", "Individual competence"],
    rows: [
      [
        "What the organization is collectively able to do to achieve a business outcome.",
        "What an individual knows, understands and can demonstrate in a specific context.",
      ],
      [
        "Depends on people, processes, technology, governance, leadership, culture and operating models.",
        "Depends on knowledge, skills, judgment, behaviors and practical experience.",
      ],
      [
        "Assessed through organizational practices, systems, evidence, performance and outcomes.",
        "Assessed through tests, scenarios, demonstrations, work samples and performance evidence.",
      ],
      [
        "Example: An organization can consistently deliver AI-augmented software engineering at scale.",
        "Example: An engineer can design, develop and deploy AI-enabled software solutions.",
      ],
    ],
  },
};

export const FAQS: Faq[] = [
  {
    q: "Why should an organization assess capability readiness now?",
    parts: [
      { p: "Because future business performance depends on capabilities that must often be developed before they are urgently needed." },
      { p: "Capability Readiness Assessment helps an organization to:" },
      {
        ul: [
          "Identify emerging industry, technology and business-model requirements.",
          "Determine whether its current capabilities are sufficient for future strategic priorities.",
          "Detect critical gaps in workforce, operating models, technology, leadership and governance.",
          "Prioritize capability investments based on business impact and urgency.",
          "Move from reactive skill development to proactive organizational preparedness.",
        ],
      },
      {
        p: "In short: assess readiness now to understand what the organization must be capable of doing next, how prepared it is today, and what must change to remain competitive and resilient.",
      },
    ],
  },
  {
    q: "What is the difference between enterprise capability and individual competence?",
    parts: [
      CAPABILITY_VS_COMPETENCE,
      {
        p: "The relationship: individual competence is an enabling component of enterprise capability, but enterprise capability cannot be established by individual competence alone.",
      },
      {
        p: "An organization may have highly competent individuals but still lack the processes, governance, technology, collaboration mechanisms or leadership alignment required to convert that competence into consistent enterprise outcomes.",
      },
    ],
  },
  {
    q: "What does The Organization Learning Labs actually do?",
    parts: [
      { p: "The Organization Learning Labs (OLL) helps organizations understand, design and build the capabilities they need to remain future-ready." },
      {
        p: "The Organization Learning Labs studies change in industries, technologies, business models and operating environments to identify future organizational requirements. It translates these insights into capability models, competence blueprints, readiness assessments and transformation-oriented recommendations that help organizations understand where they stand today and what they need to develop next.",
      },
    ],
  },
  {
    q: "Is this a training program?",
    parts: [
      { p: "No. The Enterprise Capability Readiness Assessment (ECRA) is not a training program." },
      {
        p: "It is a structured assessment designed to explore an organization's readiness to meet future capability requirements. It helps identify capability strengths, gaps and development priorities.",
      },
      {
        p: "The assessment may inform future learning, capability-building or transformation initiatives, but completing the assessment does not itself constitute training or certification.",
      },
    ],
  },
  {
    q: "Can I take the assessment for myself?",
    parts: [
      { p: "Yes, where the assessment option is made available for individual participation." },
      { p: "You can explore your own competence, readiness and development needs in the context of a particular role, function or capability area." },
      {
        p: "However, an individual assessment reflects the participant's responses and evidence. It should not automatically be interpreted as an assessment of the entire organization's capability readiness.",
      },
    ],
  },
  {
    q: "Who should I nominate?",
    parts: [
      { p: "You should nominate people who can provide relevant and reliable perspectives on the capability being explored." },
      { p: "Depending on the assessment level, suitable nominees may include:" },
      {
        ul: [
          "Senior leaders: individuals responsible for business strategy, organizational capability or transformation.",
          "Functional leaders: heads of technology, operations, HR, risk, delivery or other relevant functions.",
          "Managers: individuals who understand team capability, operating practices and workforce readiness.",
          "Practitioners and employees: people who can provide role-specific insights into competence, practices and development needs.",
          "Subject matter experts: individuals with relevant experience in the capability or industry being assessed.",
        ],
      },
      { p: "Nominees should be selected based on relevance, role context and the assessment objective, rather than simply organizational seniority." },
    ],
  },
  {
    q: "Will I see my nominee's results?",
    parts: [
      { p: "Access to nominee results depends on the assessment design, consent arrangements and permissions established by the organization." },
      { p: "Where an assessment is conducted through an organization:" },
      {
        ul: [
          "The nominee should be informed about how their responses and results will be used.",
          "Individual-level results should be shared only with authorized users and in accordance with the stated privacy arrangements.",
          "Aggregated findings may be used to understand organizational or workforce-level patterns.",
        ],
      },
      {
        p: "The final ECRA implementation should clearly specify whether nominators receive individual results, aggregated insights, or both. This should not be assumed without a defined results-sharing policy.",
      },
    ],
  },
  {
    q: "How was the framework developed?",
    parts: [
      { p: "The proposed Enterprise Capability Readiness Assessment framework is developed through The Organization Learning Labs' research-led approach:" },
      {
        ol: [
          "Research: examine structural changes in industries, technologies, business models and operating environments.",
          "Future requirements: identify the capabilities organizations may need to address these changes.",
          "Capability model: translate future requirements into future organizational capabilities.",
          "Competence blueprint: identify the knowledge, skills, behaviours and competencies that enable those capabilities.",
          "Assessment design: develop readiness questions, indicators and evidence requirements appropriate to the assessment level.",
          "Readiness analysis: explore current capability, required capability and potential gaps.",
          "Decision priorities: translate findings into organizational capability-building and transformation priorities.",
        ],
      },
      {
        p: "The framework should be validated and refined through expert review, pilot assessments, participant feedback and evidence from participating organizations. It should therefore be presented as an evolving OLL methodology rather than a universally validated benchmark unless validation has been completed.",
      },
    ],
  },
  {
    q: "Is this a performance appraisal?",
    parts: [
      { p: "No. Enterprise Capability Readiness Assessment is not intended to replace an employee performance appraisal." },
      {
        table: {
          head: ["Enterprise Capability Readiness Assessment", "Performance appraisal"],
          rows: [
            [
              "Focuses on organizational capability, workforce competence and development priorities.",
              "Focuses on an individual's performance, contribution and achievement.",
            ],
            [
              "Supports strategic capability planning and transformation decisions.",
              "Supports performance feedback, development discussions and HR processes.",
            ],
            [
              "May use aggregated organizational insights.",
              "Usually concerns an individual's performance within a defined review period.",
            ],
          ],
        },
      },
      {
        p: "ECRA may identify competence-development needs, but it should not automatically be used for compensation, promotion, disciplinary action or employment decisions unless a separate, explicitly governed process is established.",
      },
    ],
  },
  {
    q: "How long does the assessment take?",
    parts: [
      { p: "The exact duration depends on the assessment level, scope, number of questions and evidence required. For example:" },
      {
        ul: [
          "Individual or role-level assessment: may be completed in a relatively short session.",
          "Team or functional assessment: may require additional inputs, evidence and discussion.",
          "Enterprise-level assessment: may require multiple participants, supporting documentation, interviews and leadership validation.",
        ],
      },
      {
        p: "The final assessment experience should display an estimated completion time before participants begin. A confirmed duration should only be communicated after the assessment questionnaire and workflow have been finalized and tested.",
      },
    ],
  },
  {
    q: "Who sees the assessment results?",
    parts: [
      { p: "Results should be accessible only to authorized users in accordance with the assessment's privacy, consent and governance arrangements." },
      { p: "Depending on the assessment design, this may include:" },
      {
        ul: [
          "The individual participant.",
          "The authorized nominator or assessment sponsor.",
          "Designated organizational leaders.",
          "Authorized HR, capability or transformation teams.",
          "OLL assessment administrators or analysts, where required to deliver the assessment.",
          "Relevant research or reporting teams, subject to the stated consent and data-use arrangements.",
        ],
      },
      {
        p: "Results should be presented with appropriate safeguards, including access controls, purpose limitation, confidentiality and clear distinction between individual and aggregated findings.",
      },
    ],
  },
  {
    q: "What does the organization receive?",
    parts: [
      { p: "The organization's output depends on the assessment level, scope and features implemented. Potential outputs include:" },
      {
        ul: [
          "Capability readiness profile: an overview of current readiness against selected future capabilities.",
          "Capability gap analysis: differences between required capability and current demonstrated readiness.",
          "Competence insights: workforce-level patterns relating to relevant competencies.",
          "Readiness priorities: areas requiring attention based on strategic relevance, urgency and evidence.",
          "Leadership insights: questions and considerations for leadership teams.",
          "Development priorities: potential areas for capability-building, workforce development or organizational intervention.",
          "Decision support: inputs for capability investment, transformation planning and future-readiness initiatives.",
        ],
      },
      {
        p: "Results should include appropriate limitations, evidence confidence and contextual interpretation. An assessment should not claim to represent the entire organization unless the participation and evidence are sufficient to support that conclusion.",
      },
    ],
  },
  {
    q: "What happens after the assessment?",
    parts: [
      { p: "After the assessment, the results can support a structured process:" },
      {
        ol: [
          "Review the findings: participants and authorized organizational stakeholders examine the readiness results and key observations.",
          "Interpret capability gaps: identify the difference between future requirements and current capability, including the organizational factors contributing to the gap.",
          "Prioritize decisions: determine which capability gaps require attention based on business impact, strategic relevance, urgency and evidence confidence.",
          "Define development or transformation actions: identify appropriate interventions, which may include competence development, operating-model changes, governance improvements, technology investments or leadership actions.",
          "Establish an action plan: translate priorities into accountable actions, ownership, timelines and expected outcomes.",
          "Review progress: where supported by The Organization Learning Labs implementation, reassess readiness and examine evidence of capability development and application over time.",
        ],
      },
      { p: "The assessment is the starting point for informed capability and transformation decisions, not the end of the process." },
    ],
  },
];

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

export const HERO_IMAGES: Record<IndustryKey, string> = {
  it: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2400&q=75",
  bfsi: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=75",
};
