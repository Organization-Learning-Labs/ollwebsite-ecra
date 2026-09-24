import { NextRequest, NextResponse } from 'next/server';

/**
 * Thin lead endpoint for the bot catalog LeadCaptureForm.
 * Forwards to the existing contact mailer shape.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      organization?: string;
      phone?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const upstream = await fetch(new URL('/api/contact', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inquiryType: 'consultation',
        name,
        email,
        phone: body.phone?.trim() || 'Not provided',
        message:
          body.message?.trim() ||
          `Consultation request via The Organization Learning Labs Executive Advisor${
            body.organization ? ` (${body.organization})` : ''
          }`,
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return NextResponse.json(
        { error: (data as { error?: string }).error || 'Lead submission failed' },
        { status: upstream.status }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Lead submission failed' },
      { status: 500 }
    );
  }
}
