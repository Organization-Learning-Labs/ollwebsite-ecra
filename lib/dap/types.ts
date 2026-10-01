// Development Action Plan (DAP) report + Reading Material vertical types

/** Belt = job category. Describes the KIND of work, never an achievement. */
export type BeltId = 'white' | 'yellow' | 'green' | 'black' | 'blue';

/** Level = score band. Describes HOW WELL. Ranges are configured per belt. */
export type LevelId =
'beginner' |
'intermediate' |
'performer' |
'expert' |
'bestInClass';

export interface Belt {
  id: BeltId;
  name: string;
  /** Short label for the kind of work, e.g. "Execution & Delivery" */
  discipline: string;
  description: string;
  /** Tailwind classes for the belt swatch */
  swatchClass: string;
}

export interface LevelBand {
  id: LevelId;
  name: string;
  min: number;
  max: number;
}

/** The full five-band configuration that belongs to one belt. */
export interface BeltBandConfig {
  beltId: BeltId;
  bands: LevelBand[];
}

/** Result verdict — the exact wording used in the DAP comments. */
export interface ResultVerdict {
  levelId: LevelId;
  label: string;
  toneClass: string;
  boxClass: string;
}

export interface DapCandidate {
  name: string;
  candidateId: string;
  jobRole: string;
  beltId: BeltId;
  industry: string;
  subIndustry: string;
  organization: string;
  department: string;
}

export interface DapProvenance {
  assessmentName: string;
  assessmentId: string;
  assignedOn: string;
  completedOn: string;
  reportId: string;
  reportVersion: string;
  generatedOn: string;
  validUntil: string;
  assessorName: string;
  assessorTitle: string;
  verificationCode: string;
}

export interface DapActionPlan {
  title: string;
  detail: string;
}

export interface DapSection {
  number: number;
  title: string;
  /** Competence key used to resolve a Reading Material dossier */
  competenceId: string;
  score: number;
  comment: string;
  objective: string;
  actionPlans: DapActionPlan[];
}

export interface DapReport {
  candidate: DapCandidate;
  provenance: DapProvenance;
  overallScore: number;
  sections: DapSection[];
}

// ---------------------------------------------------------------------------
// Reading Material
// ---------------------------------------------------------------------------

export interface BehaviorContrast {
  dimension: string;
  right: string;
  wrong: string;
}

export interface ChallengePractice {
  challenge: string;
  practice: string;
}

/**
 * Challenges vary most by what the reader actually does all day, so they are
 * grouped by job title. `jobTitle: null` marks the group that applies to
 * everyone working on this competence regardless of role.
 */
export interface ChallengeGroup {
  jobTitle: string | null;
  items: ChallengePractice[];
}

/** Sub-industry relevance nested under its parent industry. */
export interface SubIndustryRelevance {
  subIndustry: string;
  points: string[];
}

export interface IndustryRelevance {
  industry: string;
  points: string[];
  subIndustries: SubIndustryRelevance[];
}

/** A named job title that appears on a real org chart. */
export interface JobTitleRelevance {
  title: string;
  industry: string;
  subIndustry: string;
  whatItIsUsedFor: string;
}

/**
 * Signs that co-occur, plus the condition they together indicate. Read-only —
 * a named cluster is recognisable in a way an isolated observation is not.
 */
export interface SymptomCluster {
  signs: string[];
  indicates: string;
  explanation: string;
  /** Step number in the build process that addresses this cluster */
  addressedByStep: number;
}

export interface StepTool {
  name: string;
  purpose: string;
}

/** One ordered step in the process of building the competence. */
export interface ProcessStep {
  step: number;
  title: string;
  /** What must already be true before this step is attempted */
  prerequisite: string;
  action: string;
  /** How the reader knows the step has landed */
  completionSignal: string;
  /** Tools branch off the step they serve — never a standalone list */
  tools: StepTool[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ReferenceMaterial {
  title: string;
  source: string;
  kind: 'Research' | 'Book' | 'Course' | 'Article' | 'Standard';
}

/** A dossier keyed to competence alone. */
export interface ReadingMaterial {
  id: string;
  competenceId: string;
  competenceName: string;
  /** Grouping used by the library filter, e.g. "Interpersonal" */
  competenceArea: string;
  readMinutes: number;
  /** 1 · Definition of the competence */
  definition: string;
  /** 2 · Relevance per industry, with sub-industry nested beneath */
  relevance: IndustryRelevance[];
  /** 3 · Named job titles that need this competence */
  jobTitles: JobTitleRelevance[];
  /** 4 + 5 · Demonstrated behaviors at the correct level vs wrong behaviors */
  behaviors: BehaviorContrast[];
  /** 6 · Symptoms of low competence, as diagnostic clusters */
  symptoms: SymptomCluster[];
  /** 7 · Challenges paired with practices, grouped by job title */
  challenges: ChallengeGroup[];
  /** 8 · The ordered process for building this competence */
  process: ProcessStep[];
  /** 9 · Questions people working on this competence actually ask */
  faqs: FaqItem[];
  /** 10 · Reference materials */
  references: ReferenceMaterial[];
}