'use client';

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Send, X, Bot, Maximize2, Minimize2 } from 'lucide-react';
import { ollBotQuestions } from '@/lib/oll-bot/questions';
import type { AgentChatReply, AgentHistoryItem } from '@/lib/oll-bot/agents';
import { BotMessageContent } from '@/components/oll-bot/BotMessageContent';
import { CatalogRenderer } from '@/components/oll-bot/catalog/CatalogRenderer';
import { AssessmentCarousel } from '@/components/oll-bot/catalog/AssessmentCarousel';
import { parseOllUi, type CatalogNode } from '@/lib/oll-bot/catalog';
import {
  cleanupOfferReply,
  extractAssessmentOffers,
  type AssessmentOffer,
} from '@/lib/oll-bot/assessment-offers';
import { sanitizeAgentReply, isWebSearchInfraFailure } from '@/lib/oll-bot/guardrails';
import {
  PILOT_STORAGE,
  parseOutreachTrackResponse,
  persistOutreachTrackContext,
  readPilotSessionContext,
  writePilotSessionValue,
  type OutreachTrackPayload,
  type PilotSessionContext,
} from '@/lib/oll-bot/pilot-api';
import { useOllieBotOptional } from '@/components/oll-bot/OllieBotContext';

const NOMINATE_STARTER = 'Nominate an employee for a diagnostic scan';
const SELF_ASSESS_STARTER = 'Self assess';

function messageHasNominationForm(msg: ChatMessage): boolean {
  return (
    msg.role === 'assistant' &&
    (msg.catalog?.some((node) => node.type === 'nomination_form') ?? false)
  );
}

type ChatRole = 'user' | 'assistant' | 'system';

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  refused?: boolean;
  status?: string;
  catalog?: CatalogNode[];
  offers?: AssessmentOffer[];
};

const SESSION_KEY = 'oll_agent_session_id';
const FLOW_KEY = 'oll_agent_flow_step';
const HISTORY_KEY = 'oll_agent_history';
const EXPAND_KEY = 'oll_agent_expanded';

function newId() {
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function getOrCreateSessionId() {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const id = `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(SESSION_KEY, id);
    return id;
  } catch {
    return `sess_${Date.now().toString(36)}`;
  }
}

function normalizeReply(payload: Record<string, unknown>): AgentChatReply {
  const result =
    payload.result && typeof payload.result === 'object'
      ? (payload.result as Record<string, unknown>)
      : null;
  const refused =
    !!payload.refused ||
    String(payload.status || '') === 'refused' ||
    !!(result && result.refused);
  const assessment_offers = extractAssessmentOffers(payload);
  return {
    reply: String(
      payload.reply ||
        (result && result.message) ||
        payload.error ||
        (refused ? 'Refused (no reason returned)' : '') ||
        payload.status ||
        ''
    ),
    run_id: payload.run_id != null ? String(payload.run_id) : undefined,
    status: payload.status != null ? String(payload.status) : undefined,
    refused,
    error: payload.error != null ? String(payload.error) : null,
    references: Array.isArray(payload.references) ? payload.references : [],
    assessment_offers: assessment_offers.length > 0 ? assessment_offers : undefined,
  };
}

async function waitChat(
  message: string,
  sessionId: string,
  history: AgentHistoryItem[]
): Promise<AgentChatReply> {
  const res = await fetch('/api/agents/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId, history }),
  });
  const data = (await res.json()) as Record<string, unknown>;
  if (!res.ok) {
    throw new Error(String(data.error || `HTTP ${res.status}`));
  }
  return normalizeReply(data);
}

type StreamProgressUpdate = {
  text: string;
  isReply?: boolean;
};

function toolProgressLabel(toolName: string): string {
  switch (toolName) {
    case 'list_assessments_for_sale':
      return 'Searching the assessment catalog…';
    case 'hybrid_search':
      return 'Searching OLL knowledge…';
    case 'list_documents':
      return 'Looking up documents…';
    case 'web_search':
    case 'fetch_page':
      return 'Searching approved sources…';
    default:
      return `Running ${toolName.replace(/_/g, ' ')}…`;
  }
}

function extractStreamProgress(event: Record<string, unknown>): StreamProgressUpdate | null {
  const name = String(event.event || '');

  if (name === 'started') {
    return { text: 'Connecting…' };
  }

  if (name === 'status') {
    const status = String(event.status || '');
    if (status === 'running') return { text: 'Thinking…' };
    return null;
  }

  if (name !== 'progress') return null;

  const harness = event.harness_progress;
  if (!harness || typeof harness !== 'object') return null;

  const progress = harness as Record<string, unknown>;
  const lastAction = String(progress.last_action || '');
  const message = String(progress.message || '').trim();

  if (lastAction === 'finish' && message) {
    return { text: message, isReply: true };
  }

  if (lastAction === 'tool') {
    const trail = Array.isArray(progress.trail) ? progress.trail : [];
    for (let i = trail.length - 1; i >= 0; i -= 1) {
      const hop = trail[i];
      if (!hop || typeof hop !== 'object') continue;
      const item = hop as Record<string, unknown>;
      const plan =
        item.plan && typeof item.plan === 'object'
          ? (item.plan as Record<string, unknown>)
          : null;
      const tool = String(item.tool || plan?.tool || '').trim();
      if (tool) return { text: toolProgressLabel(tool) };
    }
    return { text: 'Working…' };
  }

  const lower = message.toLowerCase();
  if (!message || message === 'tool') return null;
  if (lower.includes('loading memory') || lower.includes('skills/mcp')) {
    return { text: 'Loading context…' };
  }
  if (lower.includes('harness started')) return { text: 'Thinking…' };
  if (lower.includes('executing harness') || lower.includes('in-process')) {
    return { text: 'Starting up…' };
  }

  return { text: message };
}

async function streamChat(
  message: string,
  sessionId: string,
  history: AgentHistoryItem[],
  signal: AbortSignal,
  onProgress?: (update: StreamProgressUpdate) => void
): Promise<AgentChatReply> {
  const res = await fetch('/api/agents/chat/stream', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId, history }),
    signal,
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  if (!res.body) {
    throw new Error('Streaming not supported');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let terminal: AgentChatReply | null = null;
  let streamedOffers: AssessmentOffer[] = [];

  const handleData = (raw: string) => {
    const line = raw.trim();
    if (!line || line === '[DONE]') return;
    let event: Record<string, unknown>;
    try {
      event = JSON.parse(line) as Record<string, unknown>;
    } catch {
      return;
    }

    if (event.done === true) return;

    const extraOffers = extractAssessmentOffers(event);
    if (extraOffers.length > 0) streamedOffers = extraOffers;

    const progress = extractStreamProgress(event);
    if (progress) {
      onProgress?.(progress);
    }

    const name = String(event.event || '');
    if (name === 'started' || name === 'status' || name === 'progress') {
      return;
    }
    if (name === 'completed' || name === 'timeout' || name === 'error') {
      if (name === 'error' && !event.reply) {
        terminal = {
          reply: String(event.detail || 'stream error'),
          refused: false,
          status: 'error',
          error: String(event.detail || 'stream error'),
          references: [],
          assessment_offers: streamedOffers.length > 0 ? streamedOffers : undefined,
        };
      } else {
        terminal = normalizeReply(event);
        if (!terminal.assessment_offers?.length && streamedOffers.length > 0) {
          terminal = { ...terminal, assessment_offers: streamedOffers };
        }
      }
    }
  };

  while (!terminal) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const chunks = buffer.split('\n\n');
    buffer = chunks.pop() || '';
    for (const chunk of chunks) {
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data:')) {
          handleData(line.slice(5).trim());
        }
      }
    }
  }

  if (!terminal) {
    throw new Error('Stream ended without a reply');
  }
  return terminal;
}

function buildInitialMessages(): ChatMessage[] {
  const flow = ollBotQuestions.flow;
  const messages: ChatMessage[] = [
    { id: newId(), role: 'assistant', text: ollBotQuestions.welcome },
  ];
  if (flow[0]) {
    messages.push({ id: newId(), role: 'assistant', text: flow[0].prompt });
  }
  return messages;
}

function buildPilotLandingMessages(track: OutreachTrackPayload): ChatMessage[] {
  const name = track.executive_name?.trim();
  const company = track.company?.trim();
  const campaignTitle = track.campaign_title?.trim();

  let greeting = "You've been invited to OLL's diagnostic pilot.";
  if (name && campaignTitle && company) {
    greeting = `Hi ${name}, ${campaignTitle} is ready for ${company}.`;
  } else if (name && company) {
    greeting = `Hi ${name}, welcome to the OLL diagnostic pilot for ${company}.`;
  } else if (name) {
    greeting = `Hi ${name}, welcome to the OLL diagnostic pilot.`;
  }

  return [
    { id: newId(), role: 'assistant', text: greeting },
    {
      id: newId(),
      role: 'assistant',
      text: 'Nominate an employee below for a diagnostic scan. We will provision access and send them an invitation.',
      catalog: [
        {
          type: 'nomination_form',
          props: {
            title: 'Nominate an employee',
            subtitle:
              'Share the employee details below. We will match them to a diagnostic assessment and send an invitation.',
          },
        },
      ],
    },
  ];
}

export type OllAgentChatProps = {
  /** Full-page pilot concierge (auto-open, skip intake, show nomination form). */
  variant?: 'default' | 'pilot';
  /** Hide built-in FAB when the site Ollie launcher opens this chat. */
  hideLauncher?: boolean;
};

function AssistantAvatar() {
  return (
    <div
      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F0FE]"
      aria-hidden
    >
      <Bot className="h-5 w-5 text-primary-600" strokeWidth={2} />
    </div>
  );
}

function StreamingBubble({
  text,
  isReply,
}: {
  text: string;
  isReply?: boolean;
}) {
  return (
    <div className="oll-msg-in flex items-end gap-2.5">
      <AssistantAvatar />
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-[#EEF2F7] px-4 py-3 text-[14px] leading-relaxed break-words text-[#1E293B]">
        {isReply ? (
          <BotMessageContent text={text} variant="assistant" />
        ) : (
          <p className="m-0 text-[13px] text-slate-600">{text}</p>
        )}
      </div>
    </div>
  );
}

export function OllAgentChat({
  variant = 'default',
  hideLauncher = false,
}: OllAgentChatProps) {
  const pathname = usePathname();
  const isPilotRoom = variant === 'pilot';
  const hide = pathname?.startsWith('/survey');
  const ollieBot = useOllieBotOptional();

  const [open, setOpen] = useState(isPilotRoom);
  const [panelMounted, setPanelMounted] = useState(isPilotRoom);
  const [panelClosing, setPanelClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [streamingIsReply, setStreamingIsReply] = useState(false);
  const [flowStep, setFlowStep] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [agentHistory, setAgentHistory] = useState<AgentHistoryItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [expanded, setExpanded] = useState(isPilotRoom);
  const [pilotContext, setPilotContext] = useState<PilotSessionContext>({});

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flowDone = flowStep >= ollBotQuestions.flow.length;
  const currentFlow = ollBotQuestions.flow[flowStep];

  useEffect(() => {
    if (hide) return;

    let cancelled = false;

    const bootstrap = async () => {
      try {
        const sid = getOrCreateSessionId();
        if (cancelled) return;
        setSessionId(sid);

        if (!isPilotRoom) {
          // Prefer compact panel on this marketing site so header + close FAB stay on-screen
          const wantExpanded = sessionStorage.getItem(EXPAND_KEY) === '1';
          const narrow = window.matchMedia('(max-width: 640px)').matches;
          setExpanded(wantExpanded && !narrow);
        }

        const savedHistory = sessionStorage.getItem(HISTORY_KEY);
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory) as AgentHistoryItem[];
          if (Array.isArray(parsed)) setAgentHistory(parsed);
        }

        const params = new URLSearchParams(window.location.search);
        const campaign = params.get('campaign')?.trim() || '';
        const exec = params.get('exec')?.trim() || '';
        if (campaign) writePilotSessionValue(PILOT_STORAGE.campaignId, campaign);
        if (exec) writePilotSessionValue(PILOT_STORAGE.executiveId, exec);

        let track: OutreachTrackPayload = {};
        if (campaign && exec) {
          try {
            const trackRes = await fetch(
              `/api/agents/outreach-track?campaign=${encodeURIComponent(campaign)}&exec=${encodeURIComponent(exec)}`
            );
            const trackData = await trackRes.json().catch(() => ({}));
            if (trackRes.ok) {
              track = parseOutreachTrackResponse(trackData);
              persistOutreachTrackContext(track);
            }
          } catch {
            // tracking is best-effort; nomination can still proceed
          }
        }

        if (cancelled) return;
        setPilotContext(readPilotSessionContext());

        void fetch('/api/agents/conversations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id: sid,
            campaign_id: campaign || undefined,
            executive_id: exec || undefined,
            state: isPilotRoom ? 'OPTIONAL_NOMINATION' : 'WELCOME',
          }),
        })
          .then((r) => r.json())
          .then((data) => {
            const convId =
              data?.data?.conversation?.id || data?.conversation?.id;
            if (convId) {
              try {
                sessionStorage.setItem('oll_pilot_conversation_id', String(convId));
              } catch {
                /* ignore */
              }
            }
          })
          .catch(() => {
            /* persistence is optional for chat UX */
          });

        if (isPilotRoom) {
          setFlowStep(ollBotQuestions.flow.length);
          setOpen(true);
          setPanelMounted(true);
          setExpanded(true);
          setMessages(
            campaign && exec
              ? buildPilotLandingMessages(track)
              : buildPilotLandingMessages({})
          );
        } else {
          const savedStep = Number(sessionStorage.getItem(FLOW_KEY) || '0');
          const step = Number.isFinite(savedStep) ? Math.max(0, savedStep) : 0;
          setFlowStep(step);

          if (step >= ollBotQuestions.flow.length) {
            setMessages([
              { id: newId(), role: 'assistant', text: ollBotQuestions.welcome },
              {
                id: newId(),
                role: 'assistant',
                text: 'Ask anything about OLL, or tap a suggestion below.',
              },
            ]);
          } else if (step > 0 && ollBotQuestions.flow[step]) {
            setMessages([
              { id: newId(), role: 'assistant', text: ollBotQuestions.welcome },
              {
                id: newId(),
                role: 'assistant',
                text: ollBotQuestions.flow[step].prompt,
              },
            ]);
          } else {
            setMessages(buildInitialMessages());
          }
        }
      } catch {
        if (!cancelled) {
          setSessionId(getOrCreateSessionId());
          setMessages(
            isPilotRoom ? buildPilotLandingMessages({}) : buildInitialMessages()
          );
        }
      } finally {
        if (!cancelled) setHydrated(true);
      }
    };

    void bootstrap();
    return () => {
      cancelled = true;
    };
  }, [hide, isPilotRoom]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(FLOW_KEY, String(flowStep));
      sessionStorage.setItem(HISTORY_KEY, JSON.stringify(agentHistory.slice(-40)));
      sessionStorage.setItem(EXPAND_KEY, expanded ? '1' : '0');
    } catch {
      // ignore storage failures
    }
  }, [flowStep, agentHistory, hydrated, expanded]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy, streamingText, panelMounted]);

  useEffect(() => {
    if (open && panelMounted && !panelClosing) {
      inputRef.current?.focus();
    }
  }, [open, panelMounted, panelClosing]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  // Sync with site Ollie launcher when controlled externally.
  useEffect(() => {
    if (isPilotRoom || !ollieBot || !hideLauncher) return;
    if (ollieBot.open && !open) {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      setPanelClosing(false);
      setPanelMounted(true);
      setOpen(true);
    } else if (!ollieBot.open && open) {
      setOpen(false);
      setPanelClosing(true);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => {
        setPanelMounted(false);
        setPanelClosing(false);
        closeTimerRef.current = null;
      }, 180);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- drive from ollieBot.open only
  }, [ollieBot?.open, isPilotRoom, hideLauncher]);

  const chips = useMemo(() => {
    if (!flowDone && currentFlow?.chips?.length) {
      return currentFlow.chips.map((chip) => ({ label: chip, message: chip }));
    }
    if (flowDone) {
      const asked = new Set(
        messages
          .filter((m) => m.role === 'user')
          .map((m) => m.text.trim().toLowerCase())
      );
      const hasNominationForm = messages.some(messageHasNominationForm);
      const starterPool = isPilotRoom
        ? ollBotQuestions.pilotStarters
        : ollBotQuestions.starters;
      const unused = starterPool.filter((s) => {
        const label = s.label.trim().toLowerCase();
        const message = s.message.trim().toLowerCase();
        if (hasNominationForm && message === NOMINATE_STARTER.toLowerCase()) {
          return false;
        }
        return !asked.has(label) && !asked.has(message);
      });
      // Show up to 3 fresh suggestions so the thread stays focused.
      return unused.slice(0, 3);
    }
    return [];
  }, [flowDone, currentFlow, isPilotRoom, messages]);

  const appendMessage = useCallback((msg: Omit<ChatMessage, 'id'> & { id?: string }) => {
    setMessages((prev) => [...prev, { id: msg.id || newId(), ...msg }]);
  }, []);

  const openPanel = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setPanelClosing(false);
    setPanelMounted(true);
    setOpen(true);
    ollieBot?.setOpen(true);
  };

  const closePanel = () => {
    setOpen(false);
    setPanelClosing(true);
    ollieBot?.setOpen(false);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setPanelMounted(false);
      setPanelClosing(false);
      closeTimerRef.current = null;
    }, 180);
  };

  const togglePanel = () => {
    if (open || panelMounted) {
      closePanel();
    } else {
      openPanel();
    }
  };

  const sendToAgent = useCallback(
    async (text: string) => {
      if (!text.trim() || busy || !sessionId) return;

      const trimmed = text.trim();
      appendMessage({ role: 'user', text: trimmed });
      setStreamingText('');
      setStreamingIsReply(false);
      setBusy(true);

      const historyForRequest = agentHistory.slice();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        let reply: AgentChatReply;
        try {
          reply = await streamChat(
            trimmed,
            sessionId,
            historyForRequest,
            controller.signal,
            (update) => {
              setStreamingText(update.text);
              setStreamingIsReply(!!update.isReply);
            }
          );
        } catch {
          reply = await waitChat(trimmed, sessionId, historyForRequest);
        }

        // Stream path can still return host web-search failures; wait chat retries knowledge-only.
        if (isWebSearchInfraFailure(reply.reply || '')) {
          reply = await waitChat(trimmed, sessionId, historyForRequest);
        }

        const answer = sanitizeAgentReply(
          reply.reply ||
            (reply.refused ? 'Refused (no reason returned)' : '(empty reply)')
        );

        const { text: parsedText, nodes } = parseOllUi(answer);
        const offers = reply.assessment_offers || [];
        const visibleText = cleanupOfferReply(parsedText || answer, offers);

        appendMessage({
          role: 'assistant',
          text: visibleText || (offers.length > 0 ? '' : answer),
          // Agent host often flags tool/search failures as "refused" even when we
          // still show a normal answer — never paint successful bubbles red.
          refused: false,
          status: reply.status,
          catalog: nodes.length > 0 ? nodes : undefined,
          offers: offers.length > 0 ? offers : undefined,
        });

        setAgentHistory((prev) =>
          [
            ...prev,
            { role: 'user' as const, content: trimmed },
            { role: 'assistant' as const, content: visibleText || answer },
          ].slice(-40)
        );
      } catch (err) {
        appendMessage({
          role: 'system',
          text: err instanceof Error ? err.message : 'Something went wrong',
          status: 'error',
        });
      } finally {
        abortRef.current = null;
        setStreamingText('');
        setStreamingIsReply(false);
        setBusy(false);
      }
    },
    [agentHistory, appendMessage, busy, sessionId]
  );

  const handleFlowReply = useCallback(
    (text: string) => {
      if (!text.trim() || busy || flowDone) return;
      const trimmed = text.trim();
      const step = ollBotQuestions.flow[flowStep];
      if (!step) return;

      appendMessage({ role: 'user', text: trimmed });

      // Persist intake answers for nomination nominator context
      if (step.id === 'role') {
        writePilotSessionValue(PILOT_STORAGE.nominatorRole, trimmed);
      } else if (step.id === 'industry') {
        writePilotSessionValue(PILOT_STORAGE.organizationName, trimmed);
      }
      setPilotContext(readPilotSessionContext());

      setAgentHistory((prev) =>
        [
          ...prev,
          { role: 'assistant' as const, content: step.prompt },
          { role: 'user' as const, content: trimmed },
        ].slice(-40)
      );

      const nextStep = flowStep + 1;
      setFlowStep(nextStep);

      if (nextStep < ollBotQuestions.flow.length) {
        const next = ollBotQuestions.flow[nextStep];
        appendMessage({ role: 'assistant', text: next.prompt });
      } else {
        appendMessage({
          role: 'assistant',
          text: 'Thanks — ask anything about OLL, or tap a suggestion below.',
        });
      }
    },
    [appendMessage, busy, flowDone, flowStep]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;
    setInput('');
    if (!flowDone) {
      handleFlowReply(value);
    } else {
      void sendToAgent(value);
    }
  };

  const handleChip = (message: string) => {
    if (busy) return;
    if (!flowDone) {
      handleFlowReply(message);
      return;
    }
    const normalized = message.trim().toLowerCase();

    // Surface nomination form immediately for the dedicated starter chip
    if (normalized === NOMINATE_STARTER.toLowerCase()) {
      appendMessage({ role: 'user', text: message.trim() });
      appendMessage({
        role: 'assistant',
        text: 'Share the employee details below to nominate them for a diagnostic scan.',
        catalog: [
          {
            type: 'nomination_form',
            props: {
              title: 'Nominate an employee',
              subtitle:
                'Nominate someone for a diagnostic scan. We will provision access and send them an invitation.',
            },
          },
        ],
      });
      return;
    }

    if (normalized === SELF_ASSESS_STARTER.toLowerCase()) {
      const ctx = readPilotSessionContext();
      appendMessage({ role: 'user', text: message.trim() });
      appendMessage({
        role: 'assistant',
        text: 'Confirm your details below to start your diagnostic scan.',
        catalog: [
          {
            type: 'nomination_form',
            props: {
              title: 'Self assess',
              subtitle:
                'We will match you to a diagnostic assessment and send you an invitation.',
              submitLabel: 'Start my diagnostic scan',
              nominee_name: ctx.nominator_name,
              nominee_email: ctx.nominator_email,
              nominee_job_title: ctx.nominator_role,
              nominee_dept: ctx.organization_name,
            },
          },
        ],
      });
      return;
    }

    void sendToAgent(message);
  };

  if (hide || !hydrated) return null;

  const panelSizeClass = isPilotRoom
    ? 'h-full min-h-0 w-full flex-1'
    : expanded
      ? 'oll-chat-panel--expanded'
      : '';

  return (
    <div
      className={
        isPilotRoom
          ? 'oll-agent-chat oll-agent-chat--pilot flex min-h-0 w-full flex-1 flex-col font-sans'
          : 'oll-agent-chat fixed bottom-4 right-4 z-[110] flex flex-col items-end justify-end gap-2 font-sans'
      }
    >
      <style>{`
        .oll-agent-chat {
          --oll-ease: cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: no-preference) {
          .oll-agent-chat .oll-launcher-idle {
            animation: oll-float 6s ease-in-out infinite;
          }
          .oll-agent-chat .oll-launcher-ring {
            animation: oll-ring-pulse 2.4s ease-in-out infinite;
          }
          .oll-agent-chat .oll-online-dot {
            animation: oll-online-pulse 2s ease-in-out infinite;
          }
          .oll-agent-chat .oll-panel-enter {
            animation: oll-panel-in 220ms var(--oll-ease) both;
          }
          .oll-agent-chat .oll-panel-exit {
            animation: oll-panel-out 160ms ease-in both;
          }
          .oll-agent-chat .oll-msg-in {
            animation: oll-msg-in 280ms var(--oll-ease) both;
          }
          .oll-agent-chat .oll-msg-delay-1 {
            animation-delay: 40ms;
          }
          .oll-agent-chat .oll-chip-in {
            animation: oll-chip-in 200ms var(--oll-ease) both;
          }
          .oll-agent-chat .oll-typing-dot {
            animation: oll-dot-bounce 1.1s ease-in-out infinite;
          }
          .oll-agent-chat .oll-typing-dot-2 {
            animation-delay: 0.15s;
          }
          .oll-agent-chat .oll-typing-dot-3 {
            animation-delay: 0.3s;
          }
        }

        @keyframes oll-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes oll-ring-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(30, 75, 142, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(30, 75, 142, 0); }
        }
        @keyframes oll-online-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(0.85); }
        }
        @keyframes oll-panel-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes oll-panel-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(10px) scale(0.97); }
        }
        @keyframes oll-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes oll-chip-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes oll-dot-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      {panelMounted && (
        <div
          className={`oll-chat-panel ${panelSizeClass} ${panelClosing ? 'oll-panel-exit' : 'oll-panel-enter'}`}
          role="dialog"
          aria-label={isPilotRoom ? 'The Organization Learning Labs Diagnostic Pilot' : 'The Organization Learning Labs Executive Advisor'}
          aria-modal={isPilotRoom ? undefined : true}
        >
          <header className="oll-chat-header">
            <div className="flex min-w-0 items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/academy-white.svg"
                alt=""
                className="h-7 w-7 object-contain"
                aria-hidden
              />
              <p className="text-[17px] font-bold leading-none tracking-tight text-white">
                The Organization Learning Labs<span className="text-secondary-400">.</span>
                {isPilotRoom ? (
                  <span className="ml-2 text-sm font-semibold text-white/90">
                    Diagnostic Pilot
                  </span>
                ) : null}
              </p>
            </div>
            {!isPilotRoom ? (
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-label={expanded ? 'Collapse chat' : 'Expand chat'}
                >
                  {expanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </button>
                <button type="button" onClick={closePanel} aria-label="Close chat">
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : null}
          </header>

          <div
            ref={scrollRef}
            className="oll-chat-body space-y-4"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, index) => {
              if (msg.role === 'system') {
                return (
                  <p
                    key={msg.id}
                    className="oll-msg-in px-1 text-center text-[11px] text-gray-500"
                  >
                    {msg.text}
                  </p>
                );
              }

              const isUser = msg.role === 'user';
              const isLastAssistant =
                !isUser &&
                !busy &&
                index === messages.map((m) => m.role).lastIndexOf('assistant');
              const showChipsHere = isLastAssistant && chips.length > 0;
              const stagger =
                index < 2 && !isUser
                  ? `oll-msg-in${index === 1 ? ' oll-msg-delay-1' : ''}`
                  : 'oll-msg-in';

              const showBubble = isUser || msg.text.trim().length > 0;

              return (
                <div key={msg.id} className={`${stagger} space-y-3`}>
                  {showBubble ? (
                    <div
                      className={`flex items-end gap-2.5 ${
                        isUser ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {!isUser && <AssistantAvatar />}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed break-words ${
                          isUser
                            ? 'rounded-br-md bg-primary-600 text-white whitespace-pre-wrap'
                            : 'rounded-bl-md bg-[#EEF2F7] text-[#1E293B]'
                        }`}
                      >
                        <BotMessageContent
                          text={msg.text}
                          variant={isUser ? 'user' : 'assistant'}
                        />
                      </div>
                    </div>
                  ) : null}

                  {showChipsHere && (
                    <div className="ml-[46px] flex flex-col gap-2.5">
                      {chips.map((chip, i) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => handleChip(chip.message)}
                          style={{ animationDelay: `${i * 45}ms` }}
                          className="oll-chip oll-chip-in"
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {!isUser && msg.offers && msg.offers.length > 0 ? (
                    <AssessmentCarousel offers={msg.offers} />
                  ) : null}

                  {!isUser && msg.catalog && msg.catalog.length > 0 ? (
                    <CatalogRenderer
                      nodes={msg.catalog}
                      pilotContext={pilotContext}
                    />
                  ) : null}
                </div>
              );
            })}
            {busy ? (
              <StreamingBubble
                text={streamingText || 'Connecting…'}
                isReply={streamingIsReply}
              />
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="oll-chat-footer">
            <div className="flex items-center gap-2 rounded-full border border-[#D6E0F0] bg-white py-1.5 pl-4 pr-1.5 shadow-sm">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
                placeholder="Type your message..."
                className="min-w-0 flex-1 border-0 bg-transparent py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:opacity-60"
                autoComplete="off"
                aria-label="Chat message"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="oll-chat-send"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/*
        When hideLauncher is set, Ollie opens the chat — but once open we still show
        the circular close FAB below the panel (same pattern as Academy).
      */}
      {!isPilotRoom && (!hideLauncher || open || panelMounted) ? (
        <div className="flex items-center gap-2">
          {!hideLauncher && !open && !panelMounted && (
            <span className="pointer-events-none hidden select-none rounded-full border border-primary-100 bg-white/95 px-3 py-1.5 text-xs font-medium text-primary-700 shadow-sm backdrop-blur sm:inline-block">
              Ask The Organization Learning Labs
            </span>
          )}
          <button
            type="button"
            onClick={togglePanel}
            className={`oll-chat-launcher group ${
              open || panelMounted ? '' : 'oll-launcher-idle'
            }`}
            aria-label={open || panelMounted ? 'Close The Organization Learning Labs advisor' : 'Open The Organization Learning Labs advisor'}
            aria-expanded={open || panelMounted}
          >
            <span
              className={`pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary-300/60 ${
                open || panelMounted ? '' : 'oll-launcher-ring'
              }`}
              aria-hidden
            />
            {open || panelMounted || hideLauncher ? (
              <X className="relative h-6 w-6 text-white" strokeWidth={2.25} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/academy-white.svg"
                alt=""
                className="relative h-7 w-7 object-contain transition group-hover:scale-110"
                aria-hidden
              />
            )}
          </button>
        </div>
      ) : null}
    </div>
  );
}
