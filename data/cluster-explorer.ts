import type { JobRoleClusters } from "@/lib/clusters/types";

/** Seed data until the explorer reads job roles and linked clusters from the platform API. */
export const clusterExplorerRoles: JobRoleClusters[] = [
  {
    id: "6a26718088906a1e5fe58d60",
    jobRole: "AI/ML Solution Architect – Engineering",
    industry: "Information Technology",
    subIndustry: "Robotics & IoT",
    responsibility: "AI Engineering Architecture",
    careerGrade: "L2 - Proficient (4-10 yrs)",
    description:
      "Designs AI/ML solutions integrated into engineering and industrial systems; architects edge AI, predictive maintenance, and computer vision solutions; bridges AI capability with engineering constraints. KPIs: AI solution adoption, prediction accuracy, edge inference performance.",
    clusters: [
      { id: "1022", name: "Analytical Thinking", description: "Ability to analyze operational data, interpret metrics, and evaluate trends to drive informed decision-making." },
      { id: "1025", name: "Continuous Learning", description: "Commitment to staying current with emerging industry trends, new technologies, and continuous professional development." },
      { id: "1028", name: "Strategic Planning", description: "Capability to develop long-term strategies, strategic roadmaps, and execution plans aligned with business goals." },
      { id: "1039", name: "Team Collaboration", description: "Proficiency in fostering cross-functional teamwork, knowledge sharing, and collaborative problem-solving." },
      { id: "1045", name: "Technology Adoption", description: "Capability to evaluate, implement, and leverage modern technologies, tools, and digital platforms." },
      { id: "1248", name: "Systems & Platforms", description: "Advanced knowledge of technology platforms, system integrations, data flows, and technology infrastructure." },
      { id: "1249", name: "Domain Expertise", description: "Comprehensive understanding of domain operations, service delivery models, standards, and operational workflows." },
      { id: "1250", name: "Performance Measurement", description: "Expertise in tracking and evaluating KPIs, establishing performance benchmarks, and monitoring efficiency." },
      { id: "1251", name: "Process Improvement", description: "Proficiency in optimizing workflows, refining standard operating procedures, and driving efficiency improvements." },
      { id: "1252", name: "Cross-Functional Coordination", description: "Ability to orchestrate collaboration across multiple departments to align complex operational requirements." },
      { id: "1254", name: "Stakeholder Management", description: "Expertise in managing relationships with key stakeholders, aligning expectations, and communicating progress." },
      { id: "1256", name: "Financial Acumen", description: "Proficiency in financial analysis, ROI evaluation, budgeting, cost-performance optimization, and value delivery." },
      { id: "1257", name: "Governance & Compliance", description: "Expertise in maintaining regulatory compliance, audit preparedness, documentation, and governance protocols." },
      { id: "1258", name: "Ethical Standards", description: "Commitment to ethical conduct, responsible AI deployment, integrity, and adherence to professional standards." },
      { id: "1260", name: "Goal Achievement", description: "Demonstrated ability to achieve operational objectives, deliver milestones, and translate strategic goals into measurable results." },
      { id: "1261", name: "Professional Excellence", description: "Dedication to team capability development, cross-team coordination, service excellence, and continuous improvement." },
      { id: "1264", name: "Strategic Analysis", description: "Capability to evaluate market dynamics, competitive positioning, demand patterns, and long-term opportunities." },
      { id: "1267", name: "Communication Excellence", description: "Mastery of multi-stakeholder communication, clear technical documentation, and professional alignment." },
      { id: "1270", name: "Technical Proficiency", description: "Expertise in domain-specific technical processes, inventory control, system maintenance, and facility operations." },
      { id: "1271", name: "Risk Assessment", description: "Ability to identify and mitigate operational risks, compliance gaps, safety hazards, and security vulnerabilities." },
      { id: "1272", name: "Influence & Negotiation", description: "Proficiency in negotiating agreements, advising stakeholders, and achieving mutually beneficial outcomes." },
      { id: "1276", name: "Change Management", description: "Expertise in leading operational transitions, system migrations, methodology evolution, and organizational changes." },
    ],
  },
];
