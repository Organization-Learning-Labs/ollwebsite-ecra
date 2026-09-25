import type { NextRequest } from 'next/server';

/** Max agent chat requests per IP in a short burst window. */
export const CHAT_BURST_LIMIT = 5;

/** Burst window length in milliseconds (3 minutes). */
export const CHAT_BURST_WINDOW_MS = 3 * 60 * 1000;

/** Max agent chat requests per IP per UTC day. */
export const CHAT_DAILY_LIMIT = 20;

export type ChatQuotaReason = 'burst' | 'daily';

export type ChatQuotaResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number; reason: ChatQuotaReason };

type IpQuotaState = {
  burstTimestamps: number[];
  dailyDate: string;
  dailyCount: number;
};

const quotaStore = new Map<string, IpQuotaState>();

function utcDayKey(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

function secondsUntilUtcMidnight(now = Date.now()): number {
  const midnight = Date.UTC(
    new Date(now).getUTCFullYear(),
    new Date(now).getUTCMonth(),
    new Date(now).getUTCDate() + 1
  );
  return Math.max(1, Math.ceil((midnight - now) / 1000));
}

function getOrCreateState(ip: string, now = Date.now()): IpQuotaState {
  const today = utcDayKey(now);
  let state = quotaStore.get(ip);
  if (!state) {
    state = { burstTimestamps: [], dailyDate: today, dailyCount: 0 };
    quotaStore.set(ip, state);
    return state;
  }
  if (state.dailyDate !== today) {
    state.dailyDate = today;
    state.dailyCount = 0;
  }
  return state;
}

/** Resolve client IP from proxy headers (best-effort on serverless). */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;
  return 'unknown';
}

/** Consume one chat quota slot for the given IP. */
export function consumeChatQuota(ip: string, now = Date.now()): ChatQuotaResult {
  const state = getOrCreateState(ip, now);

  if (state.dailyCount >= CHAT_DAILY_LIMIT) {
    return {
      ok: false,
      retryAfterSec: secondsUntilUtcMidnight(now),
      reason: 'daily',
    };
  }

  state.burstTimestamps = state.burstTimestamps.filter(
    (timestamp) => now - timestamp < CHAT_BURST_WINDOW_MS
  );

  if (state.burstTimestamps.length >= CHAT_BURST_LIMIT) {
    const oldest = state.burstTimestamps[0] ?? now;
    const retryAfterSec = Math.ceil(
      (oldest + CHAT_BURST_WINDOW_MS - now) / 1000
    );
    return {
      ok: false,
      retryAfterSec: Math.max(1, retryAfterSec),
      reason: 'burst',
    };
  }

  state.burstTimestamps.push(now);
  state.dailyCount += 1;
  return { ok: true };
}

export function chatQuotaErrorMessage(reason: ChatQuotaReason): string {
  if (reason === 'burst') {
    return 'Too many messages in a short time. Please wait a moment and try again.';
  }
  return "That's the chat limit for today. You can still nominate someone, browse the marketplace, or contact the OLL team.";
}
