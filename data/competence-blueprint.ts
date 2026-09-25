/** Competence Blueprint page content — sourced from OLL Competence Blueprint PDF. */

export type LabeledItem = { title: string; body: string };
export type ChainStep = { title: string; body: string };

export const competenceBlueprintContent = {
  hero: {
    label: "Competence Blueprint",
    h1: "From Future Organization Archetypes to Embedded Enterprise Capability",
    lede:
      "A research-led architecture connecting organizational strategy, future capabilities, workforce competence and enterprise reinvention.",
    chips: ["Strategy", "Capability", "Competence", "Reinvention"] as const,
    intro: [
      "Enterprise reinvention begins before transformation starts. It begins with understanding how the external environment is changing, how industries and business models are evolving, and what organizations must become capable of doing next.",
      "OLL conducts research with industry experts, practitioners and academicians to examine emerging organizational patterns, operating models, technology shifts, workforce requirements and leadership challenges. These insights inform the design of future organization archetypes and the capabilities required to support them.",
      "The strategic question is not simply whether an organization has skilled people or modern technology. It is whether the organization can consistently convert strategy, people, processes, technology, governance and resources into the capabilities required to remain relevant and effective.",
    ],
    pullQuote:
      "The OLL Competence Blueprint connects external change to organizational capability, role-based competence and transformation action.",
  },

  whatIs: {
    label: "What is the OLL Competence Blueprint?",
    h2: "A common language between enterprise strategy and workforce execution.",
    paragraphs: [
      "The OLL Competence Blueprint translates future organizational requirements into a connected architecture of capability families, capabilities, competence categories, competence clusters and role-specific competencies.",
      "Its strategic significance is that it creates a common language between enterprise strategy and workforce execution. It moves organizations beyond disconnected skill inventories and isolated training toward a structured understanding of what the organization must be capable of doing, which functions and roles enable that capability, and what must change to support the desired future state.",
      "The blueprint provides a reference foundation for readiness assessment, transformation design, capability development, leadership development and the embedding of new organizational practices.",
    ],
    pullQuote:
      "The Competence Blueprint is not merely a catalogue of competencies. It is the bridge between the future organization an enterprise intends to become and the capabilities and competencies required to make that future possible.",
  },

  architecture: {
    label: "Capability and competence architecture",
    h2: "Connecting enterprise requirements with function and role execution.",
    lede:
      "The architecture connects enterprise-level requirements with function-level and role-level execution. Each layer adds context and precision while preserving the relationship between organizational outcomes and individual contribution.",
    layers: [
      {
        title: "Capability Family",
        body: "A broad grouping of related capabilities contributing to organizational performance, value creation or transformation.",
      },
      {
        title: "Capability",
        body: "A defined organizational ability required to achieve a business outcome, contextualized by industry, operating model and strategy.",
      },
      {
        title: "Competence Category",
        body: "A broad domain through which enabling knowledge, skills, behaviours and judgment are organized.",
      },
      {
        title: "Competence Cluster",
        body: "A group of related competencies supporting a capability, function, role or development requirement.",
      },
      {
        title: "Competence",
        body: "A specific ability an individual or role may need to demonstrate in a defined context.",
      },
      {
        title: "Role / Leadership Profile",
        body: "The job role, job family or leadership level to which competence requirements and proficiency expectations are mapped.",
      },
    ] satisfies LabeledItem[],
    pipeline: [
      "Capability Family",
      "Capability",
      "Competence Category",
      "Competence Cluster",
      "Competence",
      "Role / Leadership",
    ] as const,
    note:
      "Individual competence contributes to organizational capability, but does not establish it alone. Processes, technology, governance, leadership, culture, collaboration and operating models must also enable consistent performance.",
  },

  categories: {
    label: "Six competence categories",
    h2: "Future readiness is not reduced to technical skills alone.",
    lede:
      "The six categories provide a common organizing structure so that future readiness is not reduced to technical skills alone.",
    items: [
      {
        title: "Technical & Domain Mastery",
        body: "Technical expertise, professional knowledge and industry understanding.",
      },
      {
        title: "Cognitive & Analytical Excellence",
        body: "Reasoning, analysis, problem-solving, judgment and navigating complexity.",
      },
      {
        title: "Innovation & Adaptive Learning",
        body: "Continuous learning, experimentation and response to emerging requirements.",
      },
      {
        title: "Collaboration & Influence",
        body: "Communication, relationship-building, collaboration and influence across ecosystems.",
      },
      {
        title: "Strategic & Business Acumen",
        body: "Connecting work to business priorities, decisions and outcomes.",
      },
      {
        title: "Leadership & Ethical Stewardship",
        body: "Direction-setting, responsible judgment, people development and change leadership.",
      },
    ] satisfies LabeledItem[],
    closing:
      "Specific clusters, competencies and proficiency expectations must be adapted to the industry, organization archetype, capability, role and leadership level.",
  },

  levels: {
    label: "Four levels of application",
    h2: "Connecting strategic intent with where decisions and development occur.",
    lede:
      "The blueprint operates across four levels because enterprise reinvention must connect strategic intent with the levels where decisions, work and capability development occur.",
    items: [
      {
        title: "Enterprise",
        body: "Enterprise-wide archetype, strategic alignment, capability portfolio, operating model and transformation priorities.",
      },
      {
        title: "Business Unit / Organization",
        body: "Readiness and capability requirements of a business unit, subsidiary, geography or organizational entity.",
      },
      {
        title: "Function Area / Capability",
        body: "A specific function, capability group or transformation area, including processes, governance, tools, roles and enablers.",
      },
      {
        title: "Leader / Role",
        body: "Competence requirements for job roles, job families or leadership levels enabling the capability or future operating model.",
      },
    ] satisfies LabeledItem[],
    closing:
      "The levels may be used independently or connected as a cascading architecture. Enterprise transformation can be translated into business-unit, function and role requirements; a focused role initiative can also be examined for its wider organizational implications.",
  },

  pathways: {
    label: "Two pathways to apply the blueprint",
    h2: "Broad transformation or focused intervention—same connected architecture.",
    lede:
      "The blueprint supports both broad enterprise transformation and focused capability or role-based interventions. The starting point may differ, but the architecture remains connected.",
    pathwayAHeading: "Pathway A: Organization Transformation",
    pathwayA: [
      {
        title: "Understand the current organization archetype",
        body: "Clarify how the organization currently creates value, operates and governs execution.",
      },
      {
        title: "Define the desired future organization archetype",
        body: "Set the organizational configuration the enterprise intends to develop.",
      },
      {
        title: "Identify target organizational capabilities",
        body: "Select the capabilities required for the transition.",
      },
      {
        title: "Translate into functional, cluster and role requirements",
        body: "Map capabilities into competence architecture and role expectations.",
      },
      {
        title: "Design and execute transformation",
        body: "Change operating model, governance, technology, leadership, processes and workforce capability.",
      },
      {
        title: "Develop, apply, demonstrate and embed",
        body: "Establish the new state in organizational work.",
      },
    ] satisfies ChainStep[],
    pathwayBHeading: "Pathway B: Focused Capability or Role Transformation",
    pathwayB:
      "An organization may select a specific capability area, function, job role or leadership level. The blueprint can define the relevant requirements, identify competence clusters, assess readiness and design a focused development or transformation program.",
    pullQuote:
      "The entry point may differ. The architecture remains connected: future requirement → capability → competence → role → development → application and embedding.",
  },

  archetypes: {
    label: "Current vs. future organization archetypes",
    h2: "Strategic context for selecting target capabilities.",
    lede:
      "Comparing the current and desired organization archetypes provides the strategic context for selecting target capabilities. It prevents capability development from becoming an abstract exercise disconnected from business direction.",
    currentTitle: "Current organization archetype",
    currentBody:
      "How the organization currently creates value, operates, makes decisions, organizes work, deploys technology, develops people and governs execution.",
    futureTitle: "Desired future organization archetype",
    futureBody:
      "The organizational configuration the enterprise intends to develop in response to strategic objectives and external changes.",
    comparison:
      "The comparison helps explore which capabilities exist, which require strengthening or redesign, what new capabilities may be needed, which roles and leadership levels are affected, and which enablers may support or constrain the transition.",
    note:
      "The desired archetype is a contextual design objective—not a universal model—and must reflect the organization's industry, business model, geography, maturity and strategic ambition.",
  },

  toCompetencies: {
    label: "From capabilities to competencies",
    h2: "Where strategic intent becomes actionable for development.",
    lede:
      "Once target capabilities are identified, they can be translated into competence requirements at function, role and leadership levels. This is where strategic intent becomes actionable for organizational development.",
    exampleTitle: "Illustrative example: AI-Augmented Software Engineering",
    exampleRows: [
      {
        title: "Future archetype",
        body: "AI-augmented engineering organization with integrated platforms, responsible AI practices and outcome-oriented delivery.",
      },
      {
        title: "Target capability",
        body: "AI-Augmented Software Engineering.",
      },
      {
        title: "Functional requirement",
        body: "Engineering can establish AI-enabled delivery practices, governance, quality controls and repeatable workflows.",
      },
      {
        title: "Competence cluster",
        body: "AI-assisted development, engineering judgment, responsible AI use and platform-enabled delivery.",
      },
      {
        title: "Role requirement",
        body: "Engineers, architects and engineering leaders demonstrate contextually relevant AI-enabled engineering competence.",
      },
      {
        title: "Transformation response",
        body: "Develop tools, workflows, governance, leadership practices and role-based competence, then embed them in daily engineering work.",
      },
    ] satisfies LabeledItem[],
    note:
      "This example is illustrative, not a validated industry benchmark. Actual mappings should be defined through research, expert review, organizational context and the requirements of the selected role or capability.",
  },

  transformation: {
    label: "From blueprint to transformation",
    h2: "Supporting decisions about what must change.",
    lede:
      "The strategic purpose of the blueprint is not only to describe requirements. It supports decisions about what must change and how the organization can develop and embed the required future state.",
    stages: [
      {
        title: "Diagnose",
        body: "Understand current archetype, existing capabilities, competence coverage and organizational enablers.",
      },
      {
        title: "Design",
        body: "Define future archetype, target capabilities, functional requirements and role-based expectations.",
      },
      {
        title: "Transform",
        body: "Change operating models, processes, technology, governance, leadership practices and structures where required.",
      },
      {
        title: "Develop",
        body: "Build competence through learning, practice, application, coaching, experimentation and role-based development.",
      },
      {
        title: "Embed and review",
        body: "Examine whether new capabilities and behaviours are applied in work and decision-making; refine based on evidence.",
      },
    ] satisfies ChainStep[],
    note:
      "Transformation may require governance, process redesign, technology enablement, leadership alignment, role redesign, performance measures, collaboration mechanisms and organizational change—not training alone.",
    pullQuote:
      "Capability is embedded when the new way of working becomes part of how the organization makes decisions, performs work and delivers outcomes—not merely when people complete learning activities.",
  },

  ecra: {
    label: "Connection with ECRA",
    h2: "Blueprint clarifies requirements. ECRA explores readiness.",
    lede:
      "The Enterprise Capability Readiness Assessment (ECRA) uses the Competence Blueprint as a reference architecture for exploring readiness against defined future requirements.",
    body:
      "ECRA can be applied at the enterprise, business unit or organization, function area or capability, and leader or role level. Its focus may originate from a current-versus-future archetype comparison, a specific capability, a function, a job role or a leadership level.",
    trio: [
      {
        title: "Competence Blueprint",
        body: "Clarifies what capabilities and competencies may be required.",
      },
      {
        title: "ECRA",
        body: "Explores current readiness against defined requirements.",
      },
      {
        title: "Transformation Program",
        body: "Converts priorities into organizational action and embedding.",
      },
    ] satisfies LabeledItem[],
    caveat:
      "ECRA does not establish enterprise-wide readiness from individual responses alone. Interpretation must account for scope, participation, evidence quality, organizational context and methodological limitations.",
  },

  foundation: {
    label: "Foundation for enterprise reinvention",
    h2: "A living architecture—not a static catalogue.",
    lede:
      "Enterprise reinvention requires a continuous connection between external intelligence, strategic choices, organizational design, capability development and embedded execution. The Competence Blueprint provides the connective architecture for that system.",
    pipeline: [
      "Research",
      "Organization Archetypes",
      "Target Capabilities",
      "Competence Blueprint",
      "Readiness",
      "Transformation",
      "Application",
      "Embedding",
      "Organizational Outcomes",
    ] as const,
    significanceHeading: "Its strategic significance is threefold:",
    significance: [
      {
        title: "It connects strategy with execution",
        body: "Future organizational intent becomes capabilities and role-based requirements that guide practical action.",
      },
      {
        title: "It connects organizational and individual development",
        body: "Workforce competence is considered alongside the systems, processes, governance and leadership required for enterprise capability.",
      },
      {
        title: "It supports multiple entry points",
        body: "Organizations can pursue enterprise-wide reinvention or focus on a business unit, capability area, function, role or leadership level while retaining a coherent architecture.",
      },
    ] satisfies LabeledItem[],
    living:
      "The blueprint should evolve as research develops, industries change, organizational priorities shift and new evidence becomes available. It is a living architecture rather than a static catalogue.",
    closingQuotes: [
      "The Competence Blueprint is the bridge between the organization an enterprise is today and the organization it intends to become.",
      "It transforms research into capability requirements, capability requirements into competence architecture, and competence architecture into a foundation for readiness, transformation and enterprise reinvention.",
    ],
  },

  close: {
    ctaHeading: "Assess readiness against the blueprint.",
    ctaBody:
      "Explore how prepared your organization, unit, function or role is for defined future capability requirements.",
    primaryLabel: "Assess your readiness",
    primaryHref: "https://platform.ollacademy.com/signup",
    secondaryLabel: "See how ECRA works",
    secondaryHref: "/#ecra",
    tertiaryLabel: "About OLL",
    tertiaryHref: "/about",
  },
} as const;

export type CompetenceBlueprintContent = typeof competenceBlueprintContent;
