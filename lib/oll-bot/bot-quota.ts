import { CHAT_DAILY_LIMIT } from '@/lib/oll-bot/rate-limit';

export type BotQuotaScope = 'home' | 'pilot';

const STORAGE_KEYS: Record<
  BotQuotaScope,
  { turns: string; date: string }
> = {
  home: {
    turns: 'oll_home_bot_turns',
    date: 'oll_home_bot_turns_date',
  },
  pilot: {
    turns: 'oll_pilot_bot_turns',
    date: 'oll_pilot_bot_turns_date',
  },
};

export const BOT_LIMIT_MESSAGES: Record<BotQuotaScope, string> = {
  home:
    "That's the chat limit for today. You can still nominate someone, browse the marketplace, or contact the OLL team.",
  pilot:
    "That's the chat limit for today. You can still self-assess, nominate someone, browse the marketplace, or contact the OLL team.",
};

/** @deprecated Use BOT_LIMIT_MESSAGES.home */
export const HOME_BOT_LIMIT_MESSAGE = BOT_LIMIT_MESSAGES.home;

function utcDayKey(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

function readStoredTurns(scope: BotQuotaScope): { date: string; count: number } {
  const keys = STORAGE_KEYS[scope];
  try {
    const date = localStorage.getItem(keys.date) || '';
    const raw = localStorage.getItem(keys.turns);
    const count = raw ? Number.parseInt(raw, 10) : 0;
    return {
      date,
      count: Number.isFinite(count) && count >= 0 ? count : 0,
    };
  } catch {
    return { date: '', count: 0 };
  }
}

function writeStoredTurns(scope: BotQuotaScope, date: string, count: number) {
  const keys = STORAGE_KEYS[scope];
  try {
    localStorage.setItem(keys.date, date);
    localStorage.setItem(keys.turns, String(count));
  } catch {
    // ignore storage failures
  }
}

export function getBotTurnCount(
  scope: BotQuotaScope,
  now = Date.now()
): number {
  const today = utcDayKey(now);
  const stored = readStoredTurns(scope);
  if (stored.date !== today) return 0;
  return stored.count;
}

export function getBotRemainingTurns(
  scope: BotQuotaScope,
  now = Date.now()
): number {
  return Math.max(0, CHAT_DAILY_LIMIT - getBotTurnCount(scope, now));
}

export function isBotQuotaExhausted(
  scope: BotQuotaScope,
  now = Date.now()
): boolean {
  return getBotRemainingTurns(scope, now) <= 0;
}

export function incrementBotTurnCount(
  scope: BotQuotaScope,
  now = Date.now()
): number {
  const today = utcDayKey(now);
  const stored = readStoredTurns(scope);
  const next =
    stored.date === today ? Math.min(stored.count + 1, CHAT_DAILY_LIMIT) : 1;
  writeStoredTurns(scope, today, next);
  return next;
}

export function markBotQuotaExhausted(
  scope: BotQuotaScope,
  now = Date.now()
): void {
  writeStoredTurns(scope, utcDayKey(now), CHAT_DAILY_LIMIT);
}
