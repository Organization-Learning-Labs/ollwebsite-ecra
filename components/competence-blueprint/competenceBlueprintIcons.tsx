import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CheckCircle2,
  Compass,
  Crosshair,
  GitBranch,
  Layers,
  Lightbulb,
  Network,
  RefreshCw,
  Scale,
  Search,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

const ARCHITECTURE: LucideIcon[] = [
  Layers,
  Target,
  Compass,
  GitBranch,
  Lightbulb,
  Users,
];

const CATEGORIES: LucideIcon[] = [
  Crosshair,
  Search,
  RefreshCw,
  Network,
  Scale,
  Waypoints,
];

const LEVELS: LucideIcon[] = [Building2, Network, Layers, Users];

const PATHWAY_A: LucideIcon[] = [
  Compass,
  Target,
  Layers,
  GitBranch,
  Lightbulb,
  CheckCircle2,
];

const TRANSFORM: LucideIcon[] = [
  Search,
  Compass,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
];

const FOUNDATION: LucideIcon[] = [
  Search,
  Building2,
  Target,
  Layers,
  Crosshair,
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  Waypoints,
];

const SIGNIFICANCE: LucideIcon[] = [Waypoints, Network, GitBranch];

const SECTIONS = {
  whatIs: Compass,
  architecture: Layers,
  categories: Scale,
  levels: Building2,
  pathways: GitBranch,
  archetypes: Scale,
  toCompetencies: Waypoints,
  transformation: RefreshCw,
  ecra: Crosshair,
  foundation: Target,
  close: Lightbulb,
} as const;

export type CbSectionKey = keyof typeof SECTIONS;

export function cbArchitectureIcon(index: number): LucideIcon {
  return ARCHITECTURE[index % ARCHITECTURE.length];
}

export function cbCategoryIcon(index: number): LucideIcon {
  return CATEGORIES[index % CATEGORIES.length];
}

export function cbLevelIcon(index: number): LucideIcon {
  return LEVELS[index % LEVELS.length];
}

export function cbPathwayAIcon(index: number): LucideIcon {
  return PATHWAY_A[index % PATHWAY_A.length];
}

export function cbTransformIcon(index: number): LucideIcon {
  return TRANSFORM[index % TRANSFORM.length];
}

export function cbFoundationIcon(index: number): LucideIcon {
  return FOUNDATION[index % FOUNDATION.length];
}

export function cbSignificanceIcon(index: number): LucideIcon {
  return SIGNIFICANCE[index % SIGNIFICANCE.length];
}

export function cbSectionIcon(key: CbSectionKey): LucideIcon {
  return SECTIONS[key];
}
