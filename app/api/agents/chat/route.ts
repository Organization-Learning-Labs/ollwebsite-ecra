import { NextRequest, NextResponse } from 'next/server';
import {
  createAgentsProvider,
  getAgentsConfig,
  parseAgentChatBody,
} from '@/lib/oll-bot/agents';
import { fetchApprovedSourceContext } from '@/lib/oll-bot/approved-sources';
import {
  buildGuardedMessage,
  buildKnowledgeOnlyRetryMessage,
  isWebSearchInfraFailure,
  sanitizeAgentReply,
} from '@/lib/oll-bot/guardrails';

export const runtime = 'nodejs';
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const body = parseAgentChatBody(await request.json());
    const provider = createAgentsProvider(getAgentsConfig());
    const history = body.history || [];
    const sourceContext = await fetchApprovedSourceContext();
    const opts = { sourceContext };

    let reply = await provider.chat({
      message: buildGuardedMessage(body.message, opts),
      session_id: body.session_id,
      history,
    });

    if (isWebSearchInfraFailure(reply.reply)) {
      reply = await provider.chat({
        message: buildKnowledgeOnlyRetryMessage(body.message, opts),
        session_id: body.session_id,
        history,
      });
    }

    return NextResponse.json({
      ...reply,
      reply: sanitizeAgentReply(reply.reply),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Chat request failed';
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
