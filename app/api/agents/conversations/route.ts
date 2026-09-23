import { NextRequest, NextResponse } from 'next/server';
import { getPilotApiBaseUrl } from '@/lib/oll-bot/pilot-api';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const base = getPilotApiBaseUrl();
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
      { status: 500 }
    );
  }
}
