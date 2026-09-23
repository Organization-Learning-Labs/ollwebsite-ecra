'use client';

import { FormEvent, useState } from 'react';
import type { LeadCaptureFormProps } from '@/lib/oll-bot/catalog';

export function LeadCaptureForm({
  title = 'Request a consultation',
  subtitle = 'Share your details and the OLL team will follow up.',
  onSuccess,
}: LeadCaptureFormProps & { onSuccess?: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please agree to be contacted.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/agents/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          organization,
          phone: phone || 'Not provided',
          message: `Bot consultation request from ${organization || 'unknown org'}`,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit. Please try again.');
      }
      onSuccess?.();
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
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="oll-form-field"
      />
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Work email"
        className="oll-form-field"
      />
      <input
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
        placeholder="Organization"
        className="oll-form-field"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone (optional)"
        className="oll-form-field"
      />
      <label className="flex items-start gap-2 text-[11px] leading-snug text-gray-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5"
        />
        <span>
          I agree that OLL may contact me about this inquiry. Submitting does not
          guarantee a particular product capability or outcome.
        </span>
      </label>
      {error ? <p className="text-[11px] text-coral-600">{error}</p> : null}
      <button
        type="submit"
        disabled={busy}
        className="oll-form-submit"
      >
        {busy ? 'Sending…' : 'Submit'}
      </button>
    </form>
  );
}
