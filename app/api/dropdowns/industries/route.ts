import { NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

export async function GET() {
  try {
    const upstream = await fetch(`${getPilotApiBaseUrl()}/dropdowns/industries`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json(
        {
          error:
            (data as { error?: string; message?: string }).error ||
            (data as { message?: string }).message ||
            'Could not load industries',
        },
        { status: upstream.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not load industries';
    const status = message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
