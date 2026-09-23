import { NextRequest, NextResponse } from 'next/server';
import {
  createAgentsProvider,
  getAgentsConfig,
  parseAgentChatBody,
} from '@/lib/oll-bot/agents';
import { fetchApprovedSourceContext } from '@/lib/oll-bot/approved-sources';
import { buildGuardedMessage } from '@/lib/oll-bot/guardrails';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = parseAgentChatBody(await request.json());
    const provider = createAgentsProvider(getAgentsConfig());
    const sourceContext = await fetchApprovedSourceContext();

    const upstream = await provider.chatStream({
      message: buildGuardedMessage(body.message, { sourceContext }),
      session_id: body.session_id,
      history: body.history || [],
    });

    return new Response(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Stream request failed';
    const errStatus =
      error && typeof error === 'object' && 'status' in error
        ? Number((error as { status: number }).status)
        : undefined;
    const status = message.includes('not configured')
      ? 503
      : errStatus === 401 || errStatus === 403
        ? 502
        : errStatus && errStatus >= 400
          ? errStatus
          : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
