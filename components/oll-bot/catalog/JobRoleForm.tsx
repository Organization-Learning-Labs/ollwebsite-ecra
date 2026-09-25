'use client';

import { useEffect, useState } from 'react';
import type { JobRoleFormProps, JobRoleSubmitPayload } from '@/lib/oll-bot/catalog';
import {
  AutocompleteField,
  type AutocompleteOption,
} from './AutocompleteField';

type IndustryRow = {
  id?: string;
  industry?: string;
  is_active?: boolean;
};

type JobRoleRow = {
  id?: string;
  job_role?: string;
  industry?: string;
  industry_id?: string;
  sub_industry?: string;
  career_grade_label?: string;
  is_active?: boolean;
};

export function JobRoleForm({
  title = 'Tell us your job role',
  subtitle = 'We will match assessments you can use to diagnose yourself.',
  submitLabel = 'Show matching assessments',
  onSubmit,
}: JobRoleFormProps & {
  onSubmit?: (payload: JobRoleSubmitPayload) => void;
}) {
  const [industry, setIndustry] = useState<AutocompleteOption | null>(null);
  const [jobRole, setJobRole] = useState<AutocompleteOption | null>(null);
  const [industries, setIndustries] = useState<AutocompleteOption[]>([]);
  const [roles, setRoles] = useState<AutocompleteOption[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

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
    if (!industry) {
      setRoles([]);
      setJobRole(null);
      return;
    }
    let cancelled = false;
    setRolesLoading(true);
    setJobRole(null);
    setRoles([]);
    fetch(`/api/dropdowns/job-roles?industry_id=${encodeURIComponent(industry.id)}`)
      .then(async (res) => {
        const payload = (await res.json().catch(() => ({}))) as {
          data?: JobRoleRow[];
          error?: string;
        };
        if (!res.ok) throw new Error(payload.error || 'Could not load job roles');
        const options = (payload.data || [])
          .filter((row) => row.is_active !== false && row.id && row.job_role)
          .map((row) => ({
            id: String(row.id),
            label: String(row.job_role),
            hint: [row.sub_industry, row.career_grade_label].filter(Boolean).join(' · '),
          }));
        if (!cancelled) setRoles(options);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Could not load job roles');
        }
      })
      .finally(() => {
        if (!cancelled) setRolesLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [industry]);

  const handleSubmit = () => {
    if (!industry) {
      setError('Select an industry to continue.');
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
      job_role: jobRole.label,
      job_role_id: jobRole.id,
    });
    setBusy(false);
  };

  return (
    <div className="rounded-xl border border-[#D6E0F0] bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-[#1E293B]">{title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-gray-600">{subtitle}</p>

      <div className="mt-4 space-y-3">
        <AutocompleteField
          placeholder="Industry"
          options={industries}
          value={industry}
          onSelect={setIndustry}
          loading={industriesLoading}
          emptyText="No matching industry"
        />
        {industry ? (
          <AutocompleteField
            placeholder="Job role"
            options={roles}
            value={jobRole}
            onSelect={setJobRole}
            loading={rolesLoading}
            emptyText="No matching job role"
          />
        ) : null}
      </div>

      {error ? (
        <p className="mt-3 text-[13px] text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        disabled={busy || !industry || !jobRole}
        onClick={handleSubmit}
        className="mt-4 w-full rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        {busy ? 'Matching…' : submitLabel}
      </button>
    </div>
  );
}
