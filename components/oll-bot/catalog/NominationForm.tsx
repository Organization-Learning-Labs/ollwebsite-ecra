'use client';

import { FormEvent, useMemo, useState } from 'react';
import type { NominationFormProps } from '@/lib/oll-bot/catalog';
import {
  readPilotSessionContext,
  type PilotSessionContext,
} from '@/lib/oll-bot/pilot-api';

export function NominationForm({
  title = 'Nominate an employee',
  subtitle = 'Nominate someone for a diagnostic scan. We will provision access and send them an invitation.',
  nominator_name,
  nominator_email,
  nominator_role,
  organization_name,
  campaign_id,
  executive_id,
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

  const [nomineeName, setNomineeName] = useState('');
  const [nomineeEmail, setNomineeEmail] = useState('');
  const [nomineeJobTitle, setNomineeJobTitle] = useState('');
  const [nomineeDept, setNomineeDept] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const orgName =
        organization_name?.trim() ||
        session.organization_name?.trim() ||
        nomineeDept.trim();

      const res = await fetch('/api/agents/nominate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nominee_name: nomineeName.trim(),
          nominee_email: nomineeEmail.trim(),
          nominee_job_title: nomineeJobTitle.trim(),
          nominee_dept: nomineeDept.trim(),
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
      <input
        required
        value={nomineeJobTitle}
        onChange={(e) => setNomineeJobTitle(e.target.value)}
        placeholder="Nominee job title"
        className="oll-form-field"
      />
      <input
        required
        value={nomineeDept}
        onChange={(e) => setNomineeDept(e.target.value)}
        placeholder="Department / organization"
        className="oll-form-field"
      />
      {error ? <p className="text-[11px] text-coral-600">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="oll-form-submit"
      >
        {busy ? 'Submitting…' : 'Nominate for diagnostic scan'}
      </button>
    </form>
  );
}
