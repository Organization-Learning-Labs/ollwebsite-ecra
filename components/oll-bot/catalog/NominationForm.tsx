'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import type { NominationFormProps } from '@/lib/oll-bot/catalog';
import {
  readPilotSessionContext,
  type PilotSessionContext,
} from '@/lib/oll-bot/pilot-api';
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
  career_grade_code?: string;
  is_active?: boolean;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function findClosestOption(options: AutocompleteOption[], query?: string) {
  const q = query?.trim().toLowerCase();
  if (!q || options.length === 0) return null;
  return (
    options.find((option) => option.label.toLowerCase() === q) ||
    options.find((option) => option.label.toLowerCase().startsWith(q)) ||
    options.find((option) => option.label.toLowerCase().includes(q)) ||
    options.find((option) => option.hint?.toLowerCase().includes(q)) ||
    options.find((option) => q.includes(option.label.toLowerCase())) ||
    null
  );
}

export function NominationForm({
  title = 'Nominate an employee',
  subtitle = 'Nominate someone for a diagnostic scan. We will provision access and send them an invitation.',
  submitLabel = 'Nominate for diagnostic scan',
  nominator_name,
  nominator_email,
  nominator_role,
  organization_name,
  campaign_id,
  executive_id,
  nominee_name,
  nominee_email,
  nominee_job_title,
  nominee_dept,
  nominee_industry,
  lockIdentity,
  pilotContext,
  onSuccess,
}: NominationFormProps & {
  pilotContext?: PilotSessionContext;
  onSuccess?: (result: {
    is_auto_assigned?: boolean;
    message?: string;
    status?: string;
  }) => void;
}) {
  const session = useMemo(
    () => ({ ...readPilotSessionContext(), ...pilotContext }),
    [pilotContext]
  );

  const knownName =
    nominee_name?.trim() || session.nominator_name?.trim() || '';
  const knownEmail =
    nominee_email?.trim() || session.nominator_email?.trim() || '';
  const knownJob =
    nominee_job_title?.trim() || session.nominator_role?.trim() || '';
  const knownCompany =
    nominee_dept?.trim() || session.organization_name?.trim() || '';
  const knownIndustry =
    nominee_industry?.trim() || session.industry?.trim() || '';
  const isSelfAssess = title === 'Self assess' || Boolean(lockIdentity);
  const fromInvite = Boolean(
    isSelfAssess && knownName && isValidEmail(knownEmail)
  );

  const [nomineeName, setNomineeName] = useState(knownName);
  const [nomineeEmail, setNomineeEmail] = useState(knownEmail);
  const [industry, setIndustry] = useState<AutocompleteOption | null>(null);
  const [jobRole, setJobRole] = useState<AutocompleteOption | null>(null);
  const [industries, setIndustries] = useState<AutocompleteOption[]>([]);
  const [roles, setRoles] = useState<AutocompleteOption[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const identityReady = nomineeName.trim().length > 1 && isValidEmail(nomineeEmail);

  useEffect(() => {
    if (!identityReady) return;
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
  }, [identityReady]);

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

  useEffect(() => {
    if (!nomineeName && knownName) setNomineeName(knownName);
    if (!nomineeEmail && knownEmail) setNomineeEmail(knownEmail);
  }, [knownName, knownEmail, nomineeName, nomineeEmail]);

  useEffect(() => {
    if (industry || industries.length === 0) return;
    const match = findClosestOption(industries, knownIndustry);
    if (match) setIndustry(match);
  }, [industries, knownIndustry, industry]);

  useEffect(() => {
    if (jobRole || roles.length === 0) return;
    const match = findClosestOption(roles, knownJob);
    if (match) setJobRole(match);
  }, [roles, knownJob, jobRole]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!industry || !jobRole) {
      setError('Select an industry and job role to continue.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const orgName =
        organization_name?.trim() ||
        session.organization_name?.trim() ||
        nominee_dept?.trim() ||
        industry.label;

      const res = await fetch('/api/agents/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nominee_name: nomineeName.trim(),
          nominee_email: nomineeEmail.trim(),
          nominee_job_title: jobRole.label,
          nominee_dept: orgName,
          industry: industry.label,
          industry_id: industry.id,
          job_role_id: jobRole.id,
          nominator_name:
            nominator_name?.trim() || session.nominator_name?.trim() || '',
          nominator_email:
            nominator_email?.trim() || session.nominator_email?.trim() || '',
          nominator_role:
            nominator_role?.trim() || session.nominator_role?.trim() || '',
          organization_name: orgName,
          campaign_id: campaign_id || session.campaign_id || '',
          executive_id: executive_id || session.executive_id || '',
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        data?: {
          is_auto_assigned?: boolean;
          message?: string;
          status?: string;
        };
        is_auto_assigned?: boolean;
        message?: string;
        status?: string;
      };
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit nomination. Please try again.');
      }
      const payload = data.data ?? data;
      onSuccess?.({
        is_auto_assigned: payload.is_auto_assigned,
        message: payload.message,
        status: payload.status,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="oll-form-card space-y-2.5"
    >
      <div>
        <p className="text-sm font-semibold text-primary-800">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>
      </div>
      {isSelfAssess && (knownName || knownEmail) ? (
        <div className="oll-known-person">
          <p className="oll-known-person-kicker">
            {fromInvite ? 'From your invitation' : 'Your details'}
          </p>
          <p className="oll-known-person-name">{nomineeName || knownName || 'Your name'}</p>
          {nomineeEmail || knownEmail ? (
            <p className="oll-known-person-email">{nomineeEmail || knownEmail}</p>
          ) : null}
          {knownJob || knownIndustry || knownCompany ? (
            <p className="oll-known-person-meta">
              {[knownJob, knownIndustry, knownCompany].filter(Boolean).join(' · ')}
            </p>
          ) : null}
        </div>
      ) : null}
      {fromInvite ? null : (
        <>
          <input
            required
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            placeholder="Nominee full name"
            className="oll-form-field"
          />
          <input
            required
            type="email"
            value={nomineeEmail}
            onChange={(e) => setNomineeEmail(e.target.value)}
            placeholder="Nominee work email"
            className="oll-form-field"
          />
        </>
      )}
      {identityReady ? (
        <AutocompleteField
          value={industry}
          options={industries}
          placeholder="Industry"
          loading={industriesLoading}
          emptyText="No matching industry"
          onSelect={setIndustry}
        />
      ) : null}
      {identityReady && industry ? (
        <AutocompleteField
          value={jobRole}
          options={roles}
          placeholder="Job role"
          loading={rolesLoading}
          emptyText="No matching job role"
          onSelect={setJobRole}
        />
      ) : null}
      {error ? <p className="text-[11px] text-coral-600">{error}</p> : null}
      <button
        type="submit"
        disabled={busy || !identityReady || !industry || !jobRole}
        className="oll-form-submit"
      >
        {busy ? 'Submitting…' : submitLabel}
      </button>
    </form>
  );
}
