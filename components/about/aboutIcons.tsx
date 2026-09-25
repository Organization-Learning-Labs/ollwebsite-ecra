import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  Crosshair,
  Eye,
  Focus,
  GitBranch,
  Handshake,
  Layers,
  Lightbulb,
  Lock,
  MessageSquare,
  Network,
  RefreshCw,
  Scale,
  Search,
  Shield,
  Sparkles,
  Target,
  Users,
  Waypoints,
} from "lucide-react";

const STROKE = 1.85;
const SIZE = 16;

type IconKey =
  | "pipeline"
  | "value"
  | "pillar"
  | "approach"
  | "blueprintProcess"
  | "reinvention"
  | "commitment"
  | "level"
  | "section";

const PIPELINE: LucideIcon[] = [
  Search,
  Layers,
  Crosshair,
  GitBranch,
  Lightbulb,
  Network,
];

const VALUES: LucideIcon[] = [Shield, Compass, BookOpen, Eye, Waypoints];

const PILLARS: LucideIcon[] = [
  Shield,
  Focus,
  Clock,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Target,
  Handshake,
  Crosshair,
  RefreshCw,
];

const APPROACH: LucideIcon[] = [
  Search,
  Layers,
  BookOpen,
  Crosshair,
  GitBranch,
  Lightbulb,
  Network,
];

const BLUEPRINT_PROCESS: LucideIcon[] = [
  Compass,
  Users,
  Building2,
  Layers,
  Waypoints,
  Scale,
  Crosshair,
];

const REINVENTION: LucideIcon[] = [
  Eye,
  Focus,
  Layers,
  GitBranch,
  Lightbulb,
  CheckCircle2,
  Target,
  RefreshCw,
];

const COMMITMENTS: LucideIcon[] = [
  Target,
  Eye,
  Lock,
  Compass,
  Handshake,
  Scale,
  RefreshCw,
];

const LEVELS: LucideIcon[] = [Building2, Network, Layers, Users];

const SECTIONS: Record<string, LucideIcon> = {
  why: Compass,
  values: Shield,
  pillars: CheckCircle2,
  approach: Search,
  blueprint: Layers,
  ecra: Crosshair,
  compare: Scale,
  reinvention: RefreshCw,
  responsible: Lock,
  close: Sparkles,
};

export function AboutIconWell({
  icon: Icon,
  className = "",
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span className={`about-icon-well ${className}`.trim()} aria-hidden="true">
      <Icon size={SIZE} strokeWidth={STROKE} />
    </span>
  );
}

export function pipelineIcon(index: number): LucideIcon {
  return PIPELINE[index % PIPELINE.length];
}

export function valueIcon(index: number): LucideIcon {
  return VALUES[index % VALUES.length];
}

export function pillarIcon(index: number): LucideIcon {
  return PILLARS[index % PILLARS.length];
}

export function approachStepIcon(index: number): LucideIcon {
  return APPROACH[index % APPROACH.length];
}

export function blueprintProcessIcon(index: number): LucideIcon {
  return BLUEPRINT_PROCESS[index % BLUEPRINT_PROCESS.length];
}

export function reinventionIcon(index: number): LucideIcon {
  return REINVENTION[index % REINVENTION.length];
}

export function commitmentIcon(index: number): LucideIcon {
  return COMMITMENTS[index % COMMITMENTS.length];
}

export function levelIcon(index: number): LucideIcon {
  return LEVELS[index % LEVELS.length];
}

export function sectionIcon(key: keyof typeof SECTIONS): LucideIcon {
  return SECTIONS[key];
}

export type { IconKey };
