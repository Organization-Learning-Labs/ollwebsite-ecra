'use client';

import { useEffect, useMemo, useState } from 'react';
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

  const isSelfAssess = title === 'Self assess' || Boolean(lockIdentity);

  // Nominate: never prefill from the nominator's session — the employee is someone else.
  // Self assess: treat invitation/session fields as suggestions the user can override.
  const knownName = isSelfAssess
    ? nominee_name?.trim() || session.nominator_name?.trim() || ''
    : nominee_name?.trim() || '';
  const knownEmail = isSelfAssess
    ? nominee_email?.trim() || session.nominator_email?.trim() || ''
    : nominee_email?.trim() || '';
  const knownJob = isSelfAssess
    ? nominee_job_title?.trim() || session.nominator_role?.trim() || ''
    : nominee_job_title?.trim() || '';
  const knownCompany = isSelfAssess
    ? nominee_dept?.trim() || session.organization_name?.trim() || ''
    : nominee_dept?.trim() || '';
  const knownIndustry = isSelfAssess
    ? nominee_industry?.trim() || session.industry?.trim() || ''
    : nominee_industry?.trim() || '';
  const fromInvite = Boolean(
    lockIdentity && isSelfAssess && knownName && isValidEmail(knownEmail)
  );

  const [nomineeName, setNomineeName] = useState(() =>
    isSelfAssess ? knownName : nominee_name?.trim() || ''
  );
  const [nomineeEmail, setNomineeEmail] = useState(() =>
    isSelfAssess ? knownEmail : nominee_email?.trim() || ''
  );
  const [industry, setIndustry] = useState<AutocompleteOption | null>(null);
  const [jobRole, setJobRole] = useState<AutocompleteOption | null>(null);
  const [industries, setIndustries] = useState<AutocompleteOption[]>([]);
  const [roles, setRoles] = useState<AutocompleteOption[]>([]);
  const [industriesLoading, setIndustriesLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const effectiveName = nomineeName.trim() || (fromInvite ? knownName : '');
  const effectiveEmail = nomineeEmail.trim() || (fromInvite ? knownEmail : '');
  const identityReady =
    effectiveName.length > 1 && isValidEmail(effectiveEmail);

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
    if (!isSelfAssess) return;
    if (!nomineeName && knownName) setNomineeName(knownName);
    if (!nomineeEmail && knownEmail) setNomineeEmail(knownEmail);
  }, [isSelfAssess, knownName, knownEmail, nomineeName, nomineeEmail]);

  useEffect(() => {
    if (!fromInvite) return;
    if (knownName) setNomineeName(knownName);
    if (knownEmail) setNomineeEmail(knownEmail);
  }, [fromInvite, knownName, knownEmail]);

  useEffect(() => {
    if (!isSelfAssess || industry || industries.length === 0 || !knownIndustry) return;
    const match = findClosestOption(industries, knownIndustry);
    if (match) setIndustry(match);
  }, [isSelfAssess, industries, knownIndustry, industry]);

  useEffect(() => {
    if (!isSelfAssess || jobRole || roles.length === 0 || !knownJob) return;
    const match = findClosestOption(roles, knownJob);
    if (match) setJobRole(match);
  }, [isSelfAssess, roles, knownJob, jobRole]);

  const handleSubmit = async () => {
    if (!identityReady) {
      setError('Enter a valid name and work email to continue.');
      return;
    }
    if (!industry) {
      setError('Select an industry from the list to continue.');
      return;
    }
    if (!jobRole) {
      setError('Select a job role from the list to continue.');
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
          nominee_name: effectiveName,
          nominee_email: effectiveEmail,
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
    <div className="oll-form-card space-y-2.5">
      <div>
        <p className="text-sm font-semibold text-primary-800">{title}</p>
        <p className="mt-1 text-[12px] text-gray-500">{subtitle}</p>
      </div>
      {fromInvite ? (
        <div className="oll-known-person">
          <p className="oll-known-person-kicker">From your invitation</p>
          <p className="oll-known-person-name">{nomineeName || knownName}</p>
          <p className="oll-known-person-email">{nomineeEmail || knownEmail}</p>
          {knownCompany ? (
            <p className="oll-known-person-meta">{knownCompany}</p>
          ) : null}
        </div>
      ) : (
        <>
          <input
            required
            value={nomineeName}
            onChange={(e) => setNomineeName(e.target.value)}
            placeholder={
              isSelfAssess && knownName ? `Your name (suggested: ${knownName})` : 'Nominee full name'
            }
            className="oll-form-field"
          />
          <input
            required
            type="email"
            value={nomineeEmail}
            onChange={(e) => setNomineeEmail(e.target.value)}
            placeholder={
              isSelfAssess && knownEmail
                ? `Your work email (suggested: ${knownEmail})`
                : 'Nominee work email'
            }
            className="oll-form-field"
          />
        </>
      )}
      {identityReady ? (
        <>
          {isSelfAssess && (knownIndustry || knownJob) ? (
            <p className="text-[11px] text-gray-500">
              Suggested from your invitation — change industry or job role below if needed.
            </p>
          ) : null}
          <AutocompleteField
            value={industry}
            options={industries}
            placeholder={
              isSelfAssess && knownIndustry && !industry
                ? `Industry (suggested: ${knownIndustry})`
                : 'Industry'
            }
            loading={industriesLoading}
            emptyText="No matching industry"
            onSelect={setIndustry}
          />
        </>
      ) : null}
      {identityReady && industry ? (
        <AutocompleteField
          value={jobRole}
          options={roles}
          placeholder={
            isSelfAssess && knownJob && !jobRole
              ? `Job role (suggested: ${knownJob})`
              : 'Job role'
          }
          loading={rolesLoading}
          emptyText="No matching job role"
          onSelect={setJobRole}
        />
      ) : null}
      {error ? <p className="text-[11px] text-coral-600">{error}</p> : null}
      <button
        type="button"
        disabled={busy}
        onClick={() => void handleSubmit()}
        className="oll-form-submit"
      >
        {busy ? 'Submitting…' : submitLabel}
      </button>
    </div>
  );
}
