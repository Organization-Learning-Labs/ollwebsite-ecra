/** About Us page content — sourced from OLL ECRA About Us Content PDF. */

export type LabeledItem = { title: string; body: string };
export type ChainStep = { title: string; body: string };
export type CompareRow = { left: string; right: string };

export const aboutContent = {
  hero: {
    label: "About The Organization Learning Labs",
    h1: "Building the operating system for enterprise reinvention.",
    lede:
      "The Organization Learning Labs (OLL) is building a research-led enterprise capability transformation platform that helps organizations understand change, design future capabilities and develop the capacity to continuously adapt, transform and remain future-ready.",
    chips: ["Research", "Capability", "Reinvention"] as const,
    body: [
      "Organizations today are navigating continuous disruption across industries, technologies, business models, workforce structures and operating environments. Responding to these changes requires more than isolated technology investments or individual training initiatives. It requires organizations to understand what they must become capable of doing, how prepared they are today, and how they can systematically develop the capabilities required for the future.",
      "OLL connects organizational research, enterprise intelligence, future capability architecture, competence blueprints, capability development and transformation frameworks into an integrated approach to enterprise reinvention.",
    ],
    pipeline: [
      "Research",
      "Future Capability Architecture",
      "Readiness Assessment",
      "Transformation",
      "Capability Development",
      "Embedded Organizational Change",
    ] as const,
    vision:
      "Our long-term vision is to help organizations evolve into self-learning and continuously reinventing enterprises through research, learning, experimentation and embedded transformation.",
    mission:
      "Our mission is to research future organizations, design future capability architecture, create learning laboratories, enable capability transformation and build future-ready enterprises.",
  },

  whyReadiness: {
    label: "Why capability readiness matters",
    h2: "Future performance depends on capabilities developed today.",
    paragraphs: [
      "Organizations are often required to respond to changes before the full impact of those changes becomes visible. Emerging technologies, evolving customer expectations, new business models, changing regulatory conditions and workforce transformation can create capability requirements that existing structures were not designed to meet.",
      "An organization may have talented people and established processes, yet still lack the integrated capabilities required to respond effectively to future business demands.",
      "Capability readiness helps organizations examine this gap. It enables leaders to explore what capabilities may be required, whether current capabilities align with strategic priorities, which organizational enablers need attention, and where capability investments may need to be prioritized.",
    ],
    question:
      "What must the organization be capable of doing next, and how prepared is it to do so?",
    note:
      "Capability readiness does not predict the future or guarantee business performance. It provides a structured basis for exploring current preparedness against defined future requirements and identifying areas for further investigation and action.",
  },

  values: {
    label: "Our values",
    h2: "Meaningful reinvention begins with integrity.",
    lede:
      "At The Organization Learning Labs, we believe meaningful enterprise reinvention begins with the integrity of the people and principles behind it. Our values shape how we learn, conduct research, develop frameworks, engage stakeholders and interpret the responsibilities that come with organizational intelligence and capability assessment.",
    items: [
      {
        title: "Honesty",
        principle:
          "Be truthful to ourselves, our family, our team, our work, our craft and our stakeholders at all costs.",
        body: "We value truthfulness, integrity and intellectual honesty. We aim to acknowledge reality as it is, communicate what we know and do not know, and avoid compromising the truth for convenience or short-term gain.",
      },
      {
        title: "Learning Mindset",
        principle: 'Learning begins with acknowledging, "I don\'t know."',
        body: "We see the recognition of what we do not know as the beginning of meaningful learning. We remain open to questions, feedback, evidence and perspectives that challenge our assumptions.",
      },
      {
        title: "Seeking Knowledge",
        principle: "Knowledge can only be sought, not fully attained.",
        body: "We approach knowledge as a continuous pursuit. We encourage inquiry, research, experimentation and intellectual humility, recognizing that our understanding can always be expanded, tested and refined.",
      },
      {
        title: "Purpose of Learning",
        principle:
          "The goal of learning is to see beyond symptoms, but action depends on intent.",
        body: "We seek to understand underlying causes, systems and conditions behind visible problems. We also recognize that knowledge alone does not determine action; action must be guided by purpose, intent, responsibility and judgment.",
      },
      {
        title: "Journey Over Destination",
        principle:
          "The process of learning and growth is more important than the final outcome.",
        body: "We value continuous development, reflection and improvement. Outcomes matter, but sustainable growth is built through the quality of the journey, the lessons gained and the capabilities developed.",
      },
    ] satisfies Array<{ title: string; principle: string; body: string }>,
  },

  pillars: {
    label: "Our pillars of success",
    h2: "How we work and what we commit to.",
    lede:
      "Our Pillars of Success define how we approach our work, commitments, relationships, learning and responsibility to stakeholders. They guide not only what we aim to achieve, but also how we choose to achieve it.",
    items: [
      {
        title: "Honesty",
        body: "We are truthful to ourselves, our family, our team, our work, our craft and our stakeholders at all costs.",
      },
      {
        title: "Clarity of Purpose & Self-Driven",
        body: "We work to secure our own future, which we build with our intent, our focus, our expertise and our tenacity.",
      },
      {
        title: "Value Time, Respect Mine & Yours",
        body: "Time is finite. We value our time at work and in our personal lives, and we respect the time of others.",
      },
      {
        title: "What I Commit, I Deliver",
        body: "All commitments are binding to me—whether they concern deadlines, workflows, the team, myself, family or friends.",
      },
      {
        title: '"No" Is OK',
        body: "We recognize that saying \"no\" can be responsible and necessary. We encourage honest communication about capacity, priorities, boundaries and feasibility.",
      },
      {
        title: "I Bring the Best of Myself to Work",
        body: "We recognize our potential and continuously challenge the boundaries of our knowledge, capability and time.",
      },
      {
        title: "Half the Battle Is Won When We Prepare Well",
        body: "Priority and preparation are essential to success. We prepare ourselves and our teams by considering the perspectives and circumstances of others.",
      },
      {
        title: "Effective Communication Is a Must",
        body: "Our verbal and written communication, as well as our body language, should be relevant, contextual, respectful and precise.",
      },
      {
        title: "Result Orientation",
        body: "Until the desired result is achieved, our responsibility is not complete. We do not limit ourselves to workflows or organizational silos.",
      },
      {
        title: "Learnability Makes Us Relevant",
        body: "Knowledge is sought, not fully attained. We develop through feedback and experience, and we must embrace both.",
      },
    ] satisfies LabeledItem[],
    closing:
      "These pillars support the behaviours and working principles required for continuous organizational development, accountable execution and enterprise reinvention.",
  },

  approach: {
    label: "Our research-to-readiness approach",
    h2: "From understanding disruption to enabling transformation.",
    lede:
      "OLL follows a research-led and decision-oriented approach that connects organizational intelligence with capability development and transformation. Research is not treated as an isolated publication activity. It provides an evidence base for understanding how organizations may need to evolve, what capabilities may become important and where organizational responses require further examination.",
    steps: [
      {
        title: "Research and organizational intelligence",
        body: "Examine industry shifts, workforce evolution, technology developments, AI impact, leadership requirements and organizational readiness.",
      },
      {
        title: "Future capability architecture",
        body: "Translate research insights into future organizational capabilities, role requirements, maturity considerations and competence blueprints.",
      },
      {
        title: "Competence blueprint",
        body: "Identify technical, behavioural, leadership, innovation and AI-readiness competencies that can enable future organizational capability.",
      },
      {
        title: "Capability readiness assessment",
        body: "Explore current readiness against relevant future capability requirements at the enterprise, business unit, function, team or role level.",
      },
      {
        title: "Gap interpretation and decision priorities",
        body: "Examine potential readiness gaps, organizational enablers and areas requiring further evidence, attention or investment.",
      },
      {
        title: "Transformation and capability development",
        body: "Where relevant, translate priorities into organizational development, learning, transformation and capability-building initiatives.",
      },
      {
        title: "Demonstration and embedding",
        body: "Support the longer-term objective of applying, demonstrating and embedding new capabilities in organizational work and decision-making.",
      },
    ] satisfies ChainStep[],
    architectureLabel: "Our integrated transformation architecture",
    architecture: [
      {
        title: "OLL Research",
        body: "Generates intelligence about disruption, future readiness and organizational gaps.",
      },
      {
        title: "Competence Blueprint",
        body: "Defines future capabilities, roles, competencies, behaviours and maturity requirements.",
      },
      {
        title: "Transformation Engine",
        body: "Translates capability design into structured transformation and development methodologies, including LADE: Learn, Apply, Demonstrate, Embed.",
      },
      {
        title: "OLL Academy",
        body: "Supports the operationalization of capability development and business transformation programs.",
      },
      {
        title: "Organization Learning Laboratories",
        body: "Provide a longer-term direction for institutionalizing experimentation, learning and continuous organizational reinvention.",
      },
    ] satisfies LabeledItem[],
  },

  blueprint: {
    label: "From research to competence blueprint",
    h2: "Understanding the external environment. Designing future capabilities. Building enterprise readiness.",
    intro: [
      "Enterprise reinvention begins with understanding how the world around an organization is changing. Changes in technology, customer expectations, industry structures, business models, regulation, geopolitics and workforce dynamics can alter what organizations must be capable of doing.",
      "These changes cannot be understood through internal performance data alone. They require continuous research, dialogue and interpretation involving industry experts, practitioners, academicians and other relevant stakeholders.",
      "At The Organization Learning Labs, we use research to explore how industries and organizations may evolve, what future capabilities may become important, and which competencies individuals and teams may need to develop to support that evolution. This research forms the foundation for our Competence Blueprint.",
    ],
    pullQuote:
      "The Competence Blueprint connects the future enterprise to the people, roles and competencies required to make that future possible.",
    expertHeading: "Research with industry experts and academicians",
    expertBody:
      "Future capability requirements cannot be determined by relying exclusively on existing job descriptions, historical skill inventories or current organizational structures. OLL seeks to understand emerging requirements through research and engagement with relevant knowledge communities. These engagements help explore what structural changes are affecting an industry, how business models and operating models may evolve, which organizational capabilities may become important, what new responsibilities may emerge, and which competencies may need to change, deepen or be combined.",
    processHeading: "Research-to-blueprint process",
    process: [
      {
        title: "Environmental scanning",
        body: "Identify relevant changes in industry, technology, business models, regulation and workforce expectations.",
      },
      {
        title: "Expert inquiry",
        body: "Engage practitioners and academicians to explore implications, competing perspectives and emerging patterns.",
      },
      {
        title: "Organizational interpretation",
        body: "Examine what these developments could mean for organizational design, operating models and strategic execution.",
      },
      {
        title: "Capability formulation",
        body: "Translate relevant insights into proposed future organizational capabilities.",
      },
      {
        title: "Competence mapping",
        body: "Identify competence categories, clusters and role-specific competencies that may enable those capabilities.",
      },
      {
        title: "Framework review",
        body: "Test assumptions through expert review, contextual analysis and ongoing research.",
      },
      {
        title: "Readiness application",
        body: "Use the resulting architecture to inform assessment design and capability development priorities.",
      },
    ] satisfies ChainStep[],
    architectureHeading: "The capability and competence architecture",
    architectureLede:
      "To support a consistent research-to-readiness system, OLL uses a connected architecture that distinguishes between broad organizational capability domains and the competencies that enable them.",
    hierarchy: [
      {
        title: "Capability Family",
        body: "A broad grouping of related capabilities that contribute to a larger area of organizational performance or responsibility.",
      },
      {
        title: "Capability",
        body: "A defined organizational ability, contextualized by industry, business model, operating environment or strategic requirement.",
      },
      {
        title: "Competence Category",
        body: "A broad domain used to organize knowledge, skills, behaviours or judgment required to enable a capability.",
      },
      {
        title: "Competence Cluster",
        body: "A grouping of closely related competencies or evidence areas used to structure assessment and development.",
      },
      {
        title: "Competence",
        body: "A specific ability that an individual or role may need to demonstrate in a relevant context.",
      },
      {
        title: "Competence Blueprint",
        body: "The connected mapping of capability requirements to competence requirements, role profiles, proficiency expectations and development considerations.",
      },
    ] satisfies LabeledItem[],
    distinction:
      "A capability is not simply the sum of individual competencies. Organizational capability also depends on processes, technology, governance, leadership, operating models, collaboration and other enabling conditions.",
    exampleHeading: "From capability to competence blueprint",
    exampleLede:
      "A future organizational capability provides the starting point for determining the competencies that may enable it.",
    exampleTitle: "Illustrative example: AI-Augmented Software Engineering",
    exampleRows: [
      {
        title: "Capability Family",
        body: "Digital Engineering & Technology Delivery",
      },
      {
        title: "Capability",
        body: "AI-Augmented Software Engineering",
      },
      {
        title: "Competence Category",
        body: "Technical & Domain Mastery",
      },
      {
        title: "Competence Cluster",
        body: "AI-assisted development and engineering practices",
      },
      {
        title: "Competence",
        body: "Ability to use AI-enabled development tools responsibly within a defined engineering workflow",
      },
      {
        title: "Role Profile",
        body: "Software engineer, technical lead, architect or engineering manager",
      },
      {
        title: "Evidence",
        body: "Relevant scenarios, work samples, demonstrations, review evidence or other appropriate assessment inputs",
      },
    ] satisfies LabeledItem[],
    exampleNote:
      "This is an illustrative example, not a validated industry benchmark. Actual mappings should be adapted to the organization's industry, operating model, role, strategic priorities and required level of proficiency.",
    whyHeading: "Why the Competence Blueprint matters for enterprise reinvention",
    whyLede:
      "Enterprise reinvention requires organizations to translate strategic intent into organizational ability and then into actionable development priorities. The Competence Blueprint provides a common reference structure for connecting research, future capability design, readiness assessment, learning and development, and longer-term organizational transformation.",
    whyBullets: [
      {
        title: "Research and future capability design",
        body: "Identifies organizational abilities that may become important as industries and operating environments change.",
      },
      {
        title: "Enterprise Capability Readiness Assessment",
        body: "Connects future capability requirements with readiness-oriented questions and relevant competence requirements.",
      },
      {
        title: "Capability development",
        body: "Helps identify which competencies, roles and organizational enablers may require attention.",
      },
      {
        title: "Personalized learning and development",
        body: "Provides a potential basis for role-specific development journeys rather than generic learning interventions.",
      },
      {
        title: "Application and embedding",
        body: "Supports the longer-term objective of applying, demonstrating and embedding capability within workflows, decision-making and organizational practice.",
      },
    ] satisfies LabeledItem[],
    whyQuote:
      "The Competence Blueprint is the bridge between future organizational requirements and the competence development required to support them.",
  },

  ecra: {
    label: "Enterprise Capability Readiness Assessment",
    h2: "Understand your readiness for what comes next.",
    lede:
      "The OLL Enterprise Capability Readiness Assessment (ECRA) is a structured approach for exploring how prepared an organization, business unit, function, team or individual is to meet defined future capability requirements.",
    body: "ECRA connects future organizational requirements with capability models, competence blueprints and readiness-oriented questions. It helps participants and authorized organizational stakeholders develop a clearer understanding of current strengths, potential gaps and areas requiring further attention.",
    examinesHeading: "Depending on the assessment scope, ECRA may examine:",
    examines: [
      "Future organizational capability requirements.",
      "Strategic alignment and business relevance.",
      "Leadership and organizational enablers.",
      "Operating models, processes and governance.",
      "Technology and infrastructure readiness.",
      "Workforce capabilities and enabling competencies.",
      "Collaboration, innovation and adaptability.",
      "Current demonstrated competence and supporting evidence.",
    ],
    levelsHeading: "Assess readiness at the level you make decisions at.",
    levelsLede:
      "Future readiness is not determined by individual skills alone. It depends on how capabilities are developed and applied across the organizational levels where strategic, operational and workforce decisions are made.",
    levels: [
      {
        title: "Enterprise",
        body: "Enterprise-wide capability readiness, strategic alignment and future operating requirements.",
      },
      {
        title: "Business Unit / Organization",
        body: "Readiness of a business unit or organizational entity to support future business outcomes.",
      },
      {
        title: "Function / Capability Area",
        body: "Readiness within a function, capability group or transformation area.",
      },
      {
        title: "Team / Role",
        body: "Role-specific competence, workforce readiness and development needs.",
      },
    ] satisfies LabeledItem[],
    isNotHeading: "What ECRA is—and what it is not.",
    isBody:
      "ECRA is designed to support readiness exploration and capability-related decision-making.",
    isNot: [
      "A training program",
      "A performance appraisal",
      "A guarantee of future organizational performance",
      "A substitute for a comprehensive organizational diagnosis",
      "Proof of enterprise-wide readiness based solely on individual responses",
    ],
    interpretation:
      "Interpretation should consider the assessment level, participation, evidence quality, organizational context and limitations of the assessment design.",
  },

  compare: {
    label: "Enterprise capability vs. individual competence",
    h2: "Understanding the relationship.",
    lede:
      "Enterprise capability and individual competence are closely related, but they are not the same.",
    enterpriseDef:
      "Enterprise capability is what an organization is collectively able to do to achieve a defined business outcome. It depends on the alignment and interaction of people, processes, technology, governance, leadership, culture, collaboration and operating models.",
    individualDef:
      "Individual competence is what a person knows, understands and can demonstrate in a particular context. It may include knowledge, technical skills, practical experience, judgment, behaviours, leadership and collaboration.",
    columns: {
      left: "Enterprise capability",
      right: "Individual competence",
    },
    rows: [
      {
        left: "Collective organizational ability to achieve a business outcome.",
        right: "Individual ability to perform or demonstrate a specific competency.",
      },
      {
        left: "Includes people, processes, technology, governance, leadership and operating models.",
        right: "Includes knowledge, skills, judgment, behaviours and experience.",
      },
      {
        left: "Assessed through organizational practices, systems, evidence and outcomes.",
        right:
          "Assessed through relevant questions, demonstrations, work samples or performance evidence.",
      },
      {
        left: "Requires organizational conditions that enable consistent application.",
        right:
          "Can contribute to organizational capability but does not establish it independently.",
      },
    ] satisfies CompareRow[],
    closing:
      "Individual competence is an enabling component of enterprise capability. However, enterprise capability cannot be established through individual competence alone.",
  },

  reinvention: {
    label: "Enterprise reinvention",
    h2: "From adapting to change to continuously evolving.",
    lede:
      "Enterprise reinvention is the ongoing process through which an organization re-examines and evolves its strategy, operating model, capabilities, leadership, technology, governance and ways of working in response to changing business and environmental conditions.",
    body: "It is broader than digital transformation or workforce training. Reinvention concerns how an organization creates value, makes decisions, organizes work, develops capabilities and sustains relevance over time.",
    perspectiveHeading: "OLL's enterprise reinvention perspective",
    perspectiveLede:
      "OLL approaches enterprise reinvention as a connected system rather than a series of independent initiatives.",
    stages: [
      {
        title: "Sense",
        body: "Understand external shifts, emerging requirements and organizational conditions.",
      },
      {
        title: "Decide",
        body: "Identify strategic choices, priorities and implications for the enterprise.",
      },
      {
        title: "Design",
        body: "Define future organizational capabilities, operating requirements and governance considerations.",
      },
      {
        title: "Transform",
        body: "Translate future design into changes in strategy, processes, technology, operating models and organizational practices.",
      },
      {
        title: "Build",
        body: "Develop competencies, leadership behaviours and organizational enablers required for the new model.",
      },
      {
        title: "Prove",
        body: "Examine whether capabilities are being demonstrated through relevant evidence and practice.",
      },
      {
        title: "Realize",
        body: "Connect capability development with organizational application and intended business outcomes.",
      },
      {
        title: "Reinvent",
        body: "Learn from results and changing conditions, then adapt the organization continuously.",
      },
    ] satisfies ChainStep[],
    ecraRoleHeading: "ECRA's role in enterprise reinvention",
    ecraRole:
      "ECRA contributes primarily to the Sense, Design and Build stages by helping organizations explore future capability requirements, understand current readiness and identify development priorities. ECRA is one component of the broader OLL enterprise reinvention approach. It does not, on its own, constitute a complete enterprise transformation program or establish that transformation outcomes have been achieved.",
    closing:
      "Enterprise reinvention becomes meaningful when future organizational intent is translated into capabilities that are developed, applied, demonstrated and embedded in everyday work.",
  },

  responsible: {
    label: "Our commitment to responsible assessment",
    h2: "Building trust through clarity, context and responsible use.",
    lede:
      "Capability readiness assessments can influence how organizations understand their workforce, development priorities and transformation requirements. OLL therefore believes that assessment should be conducted with clarity about its purpose, evidence, limitations and intended use.",
    grounding:
      "Our commitment to responsible assessment is grounded in our organizational values.",
    commitments: [
      {
        title: "Clear purpose",
        body: "Participants should understand why the assessment is being conducted, what it explores and how findings may be used.",
      },
      {
        title: "Transparency",
        body: "Assessment scope, methodology, interpretation and limitations should be communicated in a clear and accessible manner.",
      },
      {
        title: "Privacy and appropriate access",
        body: "Participant information and results should be managed according to defined privacy arrangements, consent requirements and access permissions.",
      },
      {
        title: "Contextual interpretation",
        body: "Findings should be interpreted in relation to role, organizational context, assessment level, participation and available evidence.",
      },
      {
        title: "Respect for participants",
        body: "ECRA is intended to support learning, readiness exploration and development discussions. It should not automatically be treated as a performance appraisal or employment decision mechanism.",
      },
      {
        title: "Evidence-aware conclusions",
        body: "Organizational conclusions should reflect the quality and breadth of available evidence. Individual responses should not automatically be generalized to represent an entire enterprise.",
      },
      {
        title: "Continuous improvement",
        body: "The assessment framework should be refined through relevant research, expert review, pilot experiences, participant feedback and evaluation of its application.",
      },
    ] satisfies LabeledItem[],
    participantsHeading: "Our commitment to participants and organizations",
    participantsBody:
      "We aim to ensure that ECRA supports informed reflection and better capability-related decisions rather than creating unsupported labels or conclusions. We recognize that a readiness result is not a complete description of an organization or individual; assessment findings depend on scope and evidence quality; capability readiness is contextual and can change over time; and development priorities should be considered alongside organizational realities and strategic objectives.",
    objective:
      "Our objective is to make capability readiness more visible, structured and actionable—helping organizations understand what they may need to become capable of next, where they stand today, and what they can consider doing to prepare.",
  },

  close: {
    label: "Closing perspective",
    h2: "Research. Capability. Reinvention.",
    body: "The future organization must be designed with an understanding of the world it will operate in. Our research helps us explore that world; our capability architecture translates those insights into organizational requirements; and our Competence Blueprint connects those requirements to the people, roles and competencies needed to support enterprise reinvention.",
    org: "The Organization Learning Labs",
    ctaHeading: "Assess readiness at the level you make decisions at.",
    ctaBody:
      "Explore how prepared your organization, unit, function or role is for defined future capability requirements.",
    primaryLabel: "Assess your readiness",
    primaryHref: "https://platform.ollacademy.com/signup",
    secondaryLabel: "See how ECRA works",
    secondaryHref: "/#ecra",
  },
} as const;

export type AboutContent = typeof aboutContent;
