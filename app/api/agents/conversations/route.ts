import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

export const runtime = 'nodejs';

function resolvePilotApiBase(): string | null {
  try {
    return getPilotApiBaseUrl();
  } catch {
    return null;
  }
}

/** Best-effort conversation persistence for pilot analytics — optional in local dev. */
export async function POST(req: NextRequest) {
  const base = resolvePilotApiBase();
  if (!base) {
    return NextResponse.json(
      {
        error: 'Conversation tracking is not configured (set NEXT_PUBLIC_API_BASE_URL).',
        skipped: true,
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const res = await fetch(`${base}/pilot/conversations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create conversation' },
      { status: 502 }
    );
  }
}
