import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

export async function GET(request: NextRequest) {
  try {
    const industryId = request.nextUrl.searchParams.get('industry_id')?.trim() || '';
    const subIndustryId = request.nextUrl.searchParams.get('sub_industry_id')?.trim() || '';
    const page = request.nextUrl.searchParams.get('page')?.trim() || '';
    const pageSize = request.nextUrl.searchParams.get('page_size')?.trim() || '';
    const search = request.nextUrl.searchParams.get('search')?.trim() || '';

    const url = new URL(`${getPilotApiBaseUrl()}/dropdowns/job-roles-with-assessments`);

    if (industryId) {
      url.searchParams.set('industry_id', industryId);
    }
    if (subIndustryId) {
      url.searchParams.set('sub_industry_id', subIndustryId);
    }
    if (page) {
      url.searchParams.set('page', page);
    }
    if (pageSize) {
      url.searchParams.set('page_size', pageSize);
    }
    if (search) {
      url.searchParams.set('search', search);
    }

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
            'Could not load job roles with assessments',
        },
        { status: upstream.status }
      );
    }
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Could not load job roles with assessments';
    const status = message.includes('not configured') ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
