import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

/**
 * Thin nomination proxy for the bot catalog NominationForm.
 * Forwards to the OLL backend POST /api/pilot/nominate.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const nomineeName =
      typeof body.nominee_name === 'string' ? body.nominee_name.trim() : '';
    const nomineeEmail =
      typeof body.nominee_email === 'string' ? body.nominee_email.trim() : '';
    const nomineeJobTitle =
      typeof body.nominee_job_title === 'string'
        ? body.nominee_job_title.trim()
        : '';

    if (!nomineeName || !nomineeEmail || !nomineeJobTitle) {
      return NextResponse.json(
        { error: 'Nominee name, email, and job title are required' },
        { status: 400 }
      );
    }

    const base = getPilotApiBaseUrl();
    const upstream = await fetch(`${base}/pilot/nominate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json(
        {
          error:
            (data as { error?: string; message?: string }).error ||
            (data as { message?: string }).message ||
            'Nomination submission failed',
        },
        { status: upstream.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Nomination submission failed';
    const status = message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
