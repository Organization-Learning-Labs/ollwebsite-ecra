import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

/**
 * Proxies outreach click tracking to the OLL backend.
 * GET /api/agents/outreach-track?campaign=&exec=
 * → GET {API_BASE}/pilot/outreach/track?campaign=&exec=
 */
export async function GET(request: NextRequest) {
  try {
    const campaign = request.nextUrl.searchParams.get('campaign')?.trim() || '';
    const exec = request.nextUrl.searchParams.get('exec')?.trim() || '';

    if (!campaign || !exec) {
      return NextResponse.json(
        { error: 'campaign and exec query params are required' },
        { status: 400 }
      );
    }

    const base = getPilotApiBaseUrl();
    const url = new URL(`${base}/pilot/outreach/track`);
    url.searchParams.set('campaign', campaign);
    url.searchParams.set('exec', exec);

    const upstream = await fetch(url.toString(), { method: 'GET' });
    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      return NextResponse.json(
        {
          error:
            (data as { error?: string; message?: string }).error ||
            (data as { message?: string }).message ||
            'Outreach tracking failed',
        },
        { status: upstream.status }
      );
    }

    return NextResponse.json(data?.ok != null ? data : { ok: true, ...data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Outreach tracking failed';
    const status = message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
