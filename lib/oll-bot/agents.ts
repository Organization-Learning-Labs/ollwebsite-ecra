/**
 * Cloud-agnostic Agents API client.
 * Host is configured via AGENTS_API_BASE_URL (any cloud); not tied to a single vendor.
 */

import {
  extractAssessmentOffers,
  type AssessmentOffer,
} from '@/lib/oll-bot/assessment-offers';

const MAX_MESSAGE_LENGTH = 4000;
const MAX_HISTORY_ITEMS = 40;

export type { AssessmentOffer };

export type AgentHistoryItem = {
  role: 'user' | 'assistant';
  content: string;
};

export type AgentChatRequest = {
  message: string;
  session_id?: string;
  history?: AgentHistoryItem[];
};

export type AgentChatReply = {
  reply: string;
  run_id?: string;
  status?: string;
  refused: boolean;
  error: string | null;
  references: unknown[];
  assessment_offers?: AssessmentOffer[];
};

export type AgentsConfig = {
  baseUrl: string;
  apiKey: string;
  agentId: string;
};

function trimBaseUrl(url: string) {
  return url.replace(/\/+$/, '');
}

export function getAgentsConfig(): AgentsConfig {
  const baseUrl = process.env.AGENTS_API_BASE_URL?.trim();
  const apiKey = process.env.AGENTS_API_KEY?.trim();
  const agentId = process.env.AGENTS_AGENT_ID?.trim();

  if (!baseUrl || !apiKey || !agentId) {
    throw new Error(
      'Agents API is not configured. Set AGENTS_API_BASE_URL, AGENTS_API_KEY, and AGENTS_AGENT_ID.'
    );
  }

  return {
    baseUrl: trimBaseUrl(baseUrl),
    apiKey,
    agentId,
  };
}

export function parseAgentChatBody(body: unknown): AgentChatRequest {
  if (!body || typeof body !== 'object') {
    throw new Error('Invalid request body');
  }

  const raw = body as Record<string, unknown>;
  const message = typeof raw.message === 'string' ? raw.message.trim() : '';

  if (!message) {
    throw new Error('message is required');
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`message must be at most ${MAX_MESSAGE_LENGTH} characters`);
  }

  const session_id =
    typeof raw.session_id === 'string' && raw.session_id.trim()
      ? raw.session_id.trim()
      : undefined;

  let history: AgentHistoryItem[] | undefined;
  if (Array.isArray(raw.history)) {
    history = raw.history
      .filter(
        (item): item is AgentHistoryItem =>
          !!item &&
          typeof item === 'object' &&
          (item as AgentHistoryItem).role !== undefined &&
          ((item as AgentHistoryItem).role === 'user' ||
            (item as AgentHistoryItem).role === 'assistant') &&
          typeof (item as AgentHistoryItem).content === 'string'
      )
      .map((item) => ({
        role: item.role,
        content: String(item.content).slice(0, MAX_MESSAGE_LENGTH),
      }))
      .slice(-MAX_HISTORY_ITEMS);
  }

  return { message, session_id, history };
}

export function agentsAuthHeaders(apiKey: string): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'X-API-Key': apiKey,
  };
}

export function normalizeAgentReply(payload: Record<string, unknown>): AgentChatReply {
  const result =
    payload.result && typeof payload.result === 'object'
      ? (payload.result as Record<string, unknown>)
      : null;

  const refused =
    !!payload.refused ||
    String(payload.status || '') === 'refused' ||
    !!(result && result.refused);

  const reply = String(
    payload.reply ||
      (result && result.message) ||
      payload.error ||
      (refused ? 'Refused (no reason returned)' : '') ||
      payload.status ||
      ''
  );

  const assessment_offers = extractAssessmentOffers(payload);

  return {
    reply,
    run_id: payload.run_id != null ? String(payload.run_id) : undefined,
    status: payload.status != null ? String(payload.status) : undefined,
    refused,
    error: payload.error != null ? String(payload.error) : null,
    references: Array.isArray(payload.references) ? payload.references : [],
    assessment_offers: assessment_offers.length > 0 ? assessment_offers : undefined,
  };
}

export async function readUpstreamError(response: Response): Promise<string> {
  const text = await response.text();
  try {
    const json = JSON.parse(text) as { detail?: unknown };
    if (typeof json.detail === 'string') return json.detail;
    if (json.detail != null) return JSON.stringify(json.detail);
  } catch {
    // fall through
  }
  return text.trim() || `HTTP ${response.status}`;
}

export type AgentsProvider = {
  chat: (req: AgentChatRequest) => Promise<AgentChatReply>;
  chatStream: (req: AgentChatRequest) => Promise<Response>;
};

/** Default HTTP provider for any agents-api compatible host. */
export function createAgentsProvider(config: AgentsConfig = getAgentsConfig()): AgentsProvider {
  const { baseUrl, apiKey, agentId } = config;
  const agentPath = `${baseUrl}/external/agents/${encodeURIComponent(agentId)}`;

  return {
    async chat(req) {
      const upstream = await fetch(`${agentPath}/chat`, {
        method: 'POST',
        headers: agentsAuthHeaders(apiKey),
        body: JSON.stringify({
          message: req.message,
          wait: true,
          wait_timeout_s: 90,
          session_id: req.session_id,
          history: req.history || [],
        }),
      });

      if (!upstream.ok) {
        throw Object.assign(new Error(await readUpstreamError(upstream)), {
          status: upstream.status,
        });
      }

      const payload = (await upstream.json()) as Record<string, unknown>;
      return normalizeAgentReply(payload);
    },

    async chatStream(req) {
      const upstream = await fetch(`${agentPath}/chat/stream`, {
        method: 'POST',
        headers: agentsAuthHeaders(apiKey),
        body: JSON.stringify({
          message: req.message,
          wait_timeout_s: 90,
          session_id: req.session_id,
          history: req.history || [],
        }),
      });

      if (!upstream.ok) {
        throw Object.assign(new Error(await readUpstreamError(upstream)), {
          status: upstream.status,
        });
      }

      if (!upstream.body) {
        throw Object.assign(new Error('Streaming not supported by upstream'), {
          status: 502,
        });
      }

      return upstream;
    },
  };
}
