import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

export async function GET(request: NextRequest) {
  try {
    const industryId = request.nextUrl.searchParams.get('industry_id')?.trim() || '';
    if (!industryId) {
      return NextResponse.json(
        { error: 'industry_id is required' },
        { status: 400 }
      );
    }

    const url = new URL(`${getPilotApiBaseUrl()}/dropdowns/job-roles`);
    url.searchParams.set('industry_id', industryId);

    const upstream = await fetch(url.toString(), {
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
            'Could not load job roles',
        },
        { status: upstream.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not load job roles';
    const status = message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
