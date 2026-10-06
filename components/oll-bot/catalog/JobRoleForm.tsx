'use client';

import { useEffect, useMemo, useState } from 'react';
import type { JobRoleFormProps, JobRoleSubmitPayload } from '@/lib/oll-bot/catalog';
import {
  readPilotSessionContext,
  type PilotSessionContext,
} from '@/lib/oll-bot/pilot-api';
import { usePaginatedJobRoles } from '@/lib/oll-bot/use-paginated-job-roles';
import {
  AutocompleteField,
  type AutocompleteOption,
} from './AutocompleteField';

type IndustryRow = {
  id?: string;
  industry?: string;
  is_active?: boolean;
};

type SubIndustryRow = {
  id?: string;
  sub_industry?: string;
  industry_id?: string;
  is_active?: boolean;
};

function findClosestOption(options: AutocompleteOption[], query?: string) {
  const q = query?.trim().toLowerCase();
  if (!q || options.length === 0) return null;
  return (
    options.find((option) => option.label.toLowerCase() === q) ||
    options.find((option) => option.label.toLowerCase().startsWith(q)) ||
    options.find((option) => option.label.toLowerCase().includes(q)) ||
    options.find((option) => q.includes(option.label.toLowerCase())) ||
    null
  );
}

export function JobRoleForm({
  title = 'Tell us your job role',
  subtitle = 'We will match assessments you can use to diagnose yourself.',
  submitLabel = 'Show matching assessments',
  pilotContext,
  onSubmit,
}: JobRoleFormProps & {
  pilotContext?: PilotSessionContext;
  onSubmit?: (payload: JobRoleSubmitPayload) => void;
}) {
  const session = useMemo(
    () => ({ ...readPilotSessionContext(), ...pilotContext }),
    [pilotContext]
  );

  const knownIndustry = session.industry?.trim() || '';
  const knownSubIndustry = session.sub_industry?.trim() || '';
  const fromCampaign = Boolean(session.campaign_id && session.executive_id);
  const skipIndustry = fromCampaign && Boolean(knownIndustry);
  const skipSubIndustry = fromCampaign && Boolean(knownSubIndustry);
  const inviteContextLabel = [knownIndustry, knownSubIndustry].filter(Boolean).join(' · ');

  const [industry, setIndustry] = useState<AutocompleteOption | null>(null);
  const [subIndustry, setSubIndustry] = useState<AutocompleteOption | null>(null);
  const [jobRole, setJobRole] = useState<AutocompleteOption | null>(null);
  const [industries, setIndustries] = useState<AutocompleteOption[]>([]);
  const [subIndustries, setSubIndustries] = useState<AutocompleteOption[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(false);
  const [subIndustriesLoading, setSubIndustriesLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const showSubIndustryField = Boolean(industry) && !skipSubIndustry;
  const showJobRoleField = skipSubIndustry ? Boolean(industry) : Boolean(subIndustry);

  const {
    roles,
    loading: rolesLoading,
    loadingMore: rolesLoadingMore,
    hasMore: rolesHasMore,
    error: rolesError,
    loadMore: loadMoreRoles,
  } = usePaginatedJobRoles({
    industryId: skipSubIndustry ? industry?.id : undefined,
    subIndustryId: skipSubIndustry ? undefined : subIndustry?.id,
    knownSubIndustry: skipSubIndustry ? knownSubIndustry : undefined,
    enabled: showJobRoleField,
  });

  useEffect(() => {
    let cancelled = false;
    setIndustriesLoading(true);
    fetch('/api/dropdowns/industries')
      .then(async (res) => {
        const payload = (await res.json().catch(() => ({}))) as {
          data?: IndustryRow[];
          error?: string;
        };
        if (!res.ok) throw new Error(payload.error || 'Could not load industries');
        const options = (payload.data || [])
          .filter((row) => row.is_active !== false && row.id && row.industry)
          .map((row) => ({ id: String(row.id), label: String(row.industry) }));
        if (!cancelled) setIndustries(options);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load industries');
        }
      })
      .finally(() => {
        if (!cancelled) setIndustriesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (industry || industries.length === 0 || !knownIndustry || !skipIndustry) return;
    const match = findClosestOption(industries, knownIndustry);
    if (match) setIndustry(match);
  }, [industries, industry, knownIndustry, skipIndustry]);

  useEffect(() => {
    if (!industry || skipSubIndustry) {
      setSubIndustries([]);
      setSubIndustry(null);
      return;
    }

    let cancelled = false;
    setSubIndustriesLoading(true);
    setSubIndustry(null);
    setSubIndustries([]);
    fetch(`/api/dropdowns/sub-industries?industry_id=${encodeURIComponent(industry.id)}`)
      .then(async (res) => {
        const payload = (await res.json().catch(() => ({}))) as {
          data?: SubIndustryRow[];
          error?: string;
        };
        if (!res.ok) throw new Error(payload.error || 'Could not load sub-industries');
        const options = (payload.data || [])
          .filter((row) => row.is_active !== false && row.id && row.sub_industry)
          .map((row) => ({ id: String(row.id), label: String(row.sub_industry) }));
        if (!cancelled) {
          setSubIndustries(options);
          if (options.length === 1) setSubIndustry(options[0]);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load sub-industries');
        }
      })
      .finally(() => {
        if (!cancelled) setSubIndustriesLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [industry, skipSubIndustry]);

  useEffect(() => {
    setJobRole(null);
  }, [industry?.id, subIndustry?.id, skipSubIndustry, knownSubIndustry]);

  const handleSubmit = () => {
    if (!industry) {
      setError('Select an industry to continue.');
      return;
    }
    if (!skipSubIndustry && !subIndustry) {
      setError('Select a sub-industry to continue.');
      return;
    }
    if (!jobRole) {
      setError('Select a job role to continue.');
      return;
    }
    setError('');
    setBusy(true);
    onSubmit?.({
      industry: industry.label,
      industry_id: industry.id,
      sub_industry: subIndustry?.label || knownSubIndustry || undefined,
      sub_industry_id: subIndustry?.id,
      job_role: jobRole.label,
      job_role_id: jobRole.id,
    });
    setBusy(false);
  };

  return (
    <div className="rounded-xl border border-[#D6E0F0] bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#1E293B]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-gray-600">{subtitle}</p>

      {skipIndustry && inviteContextLabel ? (
        <div className="oll-known-person mt-4">
          <p className="oll-known-person-kicker">Organization context</p>
          <p className="oll-known-person-meta">{inviteContextLabel}</p>
        </div>
      ) : null}

      <div className="mt-4 space-y-3">
        {!skipIndustry ? (
          <AutocompleteField
            placeholder="Industry"
            options={industries}
            value={industry}
            onSelect={(option) => {
              setIndustry(option);
              setSubIndustry(null);
              setJobRole(null);
            }}
            loading={industriesLoading}
            emptyText="No matching industry"
          />
        ) : null}
        {showSubIndustryField ? (
          <AutocompleteField
            placeholder="Sub-industry"
            options={subIndustries}
            value={subIndustry}
            onSelect={(option) => {
              setSubIndustry(option);
              setJobRole(null);
            }}
            loading={subIndustriesLoading}
            emptyText="No matching sub-industry"
          />
        ) : null}
        {showJobRoleField ? (
          <AutocompleteField
            placeholder="Job role"
            options={roles}
            value={jobRole}
            onSelect={setJobRole}
            loading={rolesLoading}
            loadingMore={rolesLoadingMore}
            hasMore={rolesHasMore}
            onLoadMore={loadMoreRoles}
            emptyText="No matching job role"
            maxVisible={0}
          />
        ) : null}
      </div>

      {(error || rolesError) ? (
        <p className="mt-3 text-[13px] text-red-600" role="alert">
          {error || rolesError}
        </p>
      ) : null}

      <button
        type="button"
        disabled={busy || !industry || (!skipSubIndustry && !subIndustry) || !jobRole}
        onClick={handleSubmit}
        className="mt-4 w-full rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        {busy ? 'Matching…' : submitLabel}
      </button>
    </div>
  );
}
