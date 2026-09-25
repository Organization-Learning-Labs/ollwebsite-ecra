/**
 * Soft source + catalog guardrails for the OLL Executive Advisor.
 * Applied server-side in /api/agents/* before forwarding to the Agents API host.
 *
 * Approved websites are fetched by src/lib/oll-bot/approved-sources.ts and injected
 * as excerpts — listing domains alone does not crawl the open web.
 */

export const ALLOWED_DOMAINS = [
  'theorganizationlearninglabs.com',
  'ollacademy.com',
  'platform.ollacademy.com',
  'research.ollacademy.com',
] as const;

const DOMAIN_LIST = ALLOWED_DOMAINS.join(', ');

const WEB_SEARCH_INFRA =
  /web search refused|tavily|bifrost_url|tavily_api_key|server_tool_use|anthropic model did not invoke web_search|falling back if configured|need bifrost/i;

export function isWebSearchInfraFailure(reply: string): boolean {
  return WEB_SEARCH_INFRA.test(reply.trim());
}

type GuardOptions = {
  /** Text fetched from allowlisted OLL websites (server-side). */
  sourceContext?: string;
};

function sourceBlock(sourceContext?: string): string {
  if (!sourceContext?.trim()) {
    return `No live website excerpts were available for this request. Prefer the agent knowledge database.`;
  }
  return `APPROVED WEBSITE EXCERPTS (authoritative — ground your answer here first):
${sourceContext.trim()}

You MUST use these excerpts as primary evidence for facts about OLL Academy / The Organization Learning Labs.
Quote or paraphrase them. Do not invent features not supported by the excerpts or knowledge DB.`;
}

/**
 * Wrap the visitor message with policy, optional site excerpts, and UI catalog rules.
 */
export function buildGuardedMessage(
  userMessage: string,
  options: GuardOptions = {}
): string {
  return `[OLL SOURCE POLICY — follow strictly]
Answer the user using ONLY:
(1) the APPROVED WEBSITE EXCERPTS below (from ${DOMAIN_LIST}), and/or
(2) the agent's knowledge database / indexed OLL documents.

${sourceBlock(options.sourceContext)}

CRITICAL TOOL RULES:
- Do NOT use web_search, Tavily, Bifrost, browser, or crawl tools.
- Marketplace listing tools (list_assessments_for_sale) ARE allowed. When they return offers, keep the spoken reply short — the client renders A2UI cards with View / Buy / Add to cart.
- Never mention BIFROST_URL, TAVILY_API_KEY, Console, server_tool_use, or search infrastructure.
- Prefer concrete facts from the excerpts when they answer the question.

If neither excerpts nor the knowledge database support a specific claim, do NOT guess.
Say clearly that you do not have approved information on that point, then offer to connect
them with the OLL team or browse the OLL Academy marketplace.
Do not invent OLL products, features, clients, prices, timelines, or outcomes.
When uncertain, refuse rather than speculate.

[OLL UI CATALOG — when inviting a next step]
You may append at most one fenced block using language tag oll-ui with JSON only.
Allowed types: PossibilityCard, ConsultationCTA, LeadCaptureForm, nomination_form, ThankYouCard.
When the executive asks to nominate an employee or start a diagnostic scan, emit a nomination_form block:
\`\`\`oll-ui
{"type":"nomination_form","props":{"title":"Nominate an employee","subtitle":"Share the nominee details to launch a diagnostic scan."}}
\`\`\`
Example consultation CTA:
\`\`\`oll-ui
{"type":"ConsultationCTA","props":{"title":"Talk to OLL","primaryLabel":"Request a consultation"}}
\`\`\`
Do not invent other component types or emit HTML/JavaScript.

User message:
${userMessage}`;
}

/** Second attempt after the host wasted a turn on failed web search. */
export function buildKnowledgeOnlyRetryMessage(
  userMessage: string,
  options: GuardOptions = {}
): string {
  return `[CRITICAL RETRY — ANSWER WITHOUT TOOLS]
A previous attempt tried web search and failed. That path is disabled for OLL.
Do not call any tools. Do not mention Tavily, Bifrost, API keys, or web search.
Answer using ONLY the approved excerpts and/or knowledge database.
If sources do not support a claim, say you do not have approved information—do not guess or invent.

${sourceBlock(options.sourceContext)}

User question:
${userMessage}`;
}

/** Last-resort visitor copy when the host still returns infra errors. */
export function sanitizeAgentReply(reply: string): string {
  const trimmed = reply.trim();
  if (!trimmed) return trimmed;
  if (!isWebSearchInfraFailure(trimmed)) return reply;

  return (
    'I could not complete that answer from approved OLL sources just now. ' +
    'Please try again, or request a consultation and the OLL team can follow up.\n\n' +
    '```oll-ui\n' +
    JSON.stringify({
      type: 'ConsultationCTA',
      props: {
        title: 'Talk with the OLL team',
        primaryLabel: 'Request a consultation',
        secondaryLabel: 'Try again later',
      },
    }) +
    '\n```'
  );
}
