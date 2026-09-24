/**
 * Shared helpers for proxying pilot endpoints to the OLL Go backend.
 * NEXT_PUBLIC_API_BASE_URL typically already includes `/api` (e.g. http://localhost:8080/api).
 */

export function getPilotApiBaseUrl(): string {
  const base = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    ''
  )
    .trim()
    .replace(/\/$/, '');

  if (!base) {
    throw new Error(
      'API base URL is not configured. Set NEXT_PUBLIC_API_BASE_URL or API_BASE_URL.'
    );
  }

  return base;
}

export const PILOT_STORAGE = {
  campaignId: 'oll_pilot_campaign_id',
  executiveId: 'oll_pilot_executive_id',
  nominatorRole: 'oll_pilot_nominator_role',
  organizationName: 'oll_pilot_organization_name',
  nominatorName: 'oll_pilot_nominator_name',
  nominatorEmail: 'oll_pilot_nominator_email',
  industry: 'oll_pilot_industry',
} as const;

export type PilotSessionContext = {
  campaign_id?: string;
  executive_id?: string;
  nominator_name?: string;
  nominator_email?: string;
  nominator_role?: string;
  organization_name?: string;
  industry?: string;
};

/** Public outreach track payload (from GET /pilot/outreach/track). */
export type OutreachTrackPayload = {
  status?: string;
  executive_name?: string;
  executive_email?: string;
  executive_job_title?: string;
  company?: string;
  industry?: string;
  campaign_title?: string;
};

function pickString(...values: unknown[]): string | undefined {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
}

export function parseOutreachTrackResponse(data: unknown): OutreachTrackPayload {
  const root = asRecord(data);
  const payload = asRecord(root.data ?? root);
  const executive = asRecord(payload.executive ?? payload.person);
  return {
    status: pickString(payload.status),
    executive_name: pickString(
      payload.executive_name,
      executive.executive_name,
      executive.name,
      payload.name
    ),
    executive_email: pickString(
      payload.executive_email,
      executive.executive_email,
      executive.email,
      payload.email
    ),
    executive_job_title: pickString(
      payload.executive_job_title,
      executive.executive_job_title,
      executive.job_title,
      payload.job_title
    ),
    company: pickString(
      payload.company,
      payload.organization_name,
      executive.company,
      executive.organization_name
    ),
    industry: pickString(payload.industry, executive.industry),
    campaign_title: pickString(payload.campaign_title, payload.campaign),
  };
}

export function persistOutreachTrackContext(track: OutreachTrackPayload) {
  if (track.executive_name) {
    writePilotSessionValue(PILOT_STORAGE.nominatorName, track.executive_name);
  }
  if (track.executive_email) {
    writePilotSessionValue(PILOT_STORAGE.nominatorEmail, track.executive_email);
  }
  if (track.executive_job_title) {
    writePilotSessionValue(PILOT_STORAGE.nominatorRole, track.executive_job_title);
  }
  if (track.company) {
    writePilotSessionValue(PILOT_STORAGE.organizationName, track.company);
  }
  if (track.industry) {
    writePilotSessionValue(PILOT_STORAGE.industry, track.industry);
  }
}

export function readPilotSessionContext(): PilotSessionContext {
  if (typeof window === 'undefined') return {};
  try {
    return {
      campaign_id: sessionStorage.getItem(PILOT_STORAGE.campaignId) || undefined,
      executive_id: sessionStorage.getItem(PILOT_STORAGE.executiveId) || undefined,
      nominator_name: sessionStorage.getItem(PILOT_STORAGE.nominatorName) || undefined,
      nominator_email: sessionStorage.getItem(PILOT_STORAGE.nominatorEmail) || undefined,
      nominator_role: sessionStorage.getItem(PILOT_STORAGE.nominatorRole) || undefined,
      organization_name:
        sessionStorage.getItem(PILOT_STORAGE.organizationName) || undefined,
      industry: sessionStorage.getItem(PILOT_STORAGE.industry) || undefined,
    };
  } catch {
    return {};
  }
}

export function writePilotSessionValue(
  key: (typeof PILOT_STORAGE)[keyof typeof PILOT_STORAGE],
  value: string
) {
  try {
    if (value.trim()) sessionStorage.setItem(key, value.trim());
  } catch {
    // ignore storage failures
  }
}
