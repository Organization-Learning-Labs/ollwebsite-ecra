/** @deprecated Import from `@/lib/oll-bot/bot-quota` instead. */
import {
  BOT_LIMIT_MESSAGES,
  getBotRemainingTurns,
  getBotTurnCount,
  incrementBotTurnCount,
  isBotQuotaExhausted,
  markBotQuotaExhausted,
} from '@/lib/oll-bot/bot-quota';

export const HOME_BOT_LIMIT_MESSAGE = BOT_LIMIT_MESSAGES.home;

export function getHomeBotTurnCount(now = Date.now()) {
  return getBotTurnCount('home', now);
}

export function getHomeBotRemainingTurns(now = Date.now()) {
  return getBotRemainingTurns('home', now);
}

export function isHomeBotQuotaExhausted(now = Date.now()) {
  return isBotQuotaExhausted('home', now);
}

export function incrementHomeBotTurnCount(now = Date.now()) {
  return incrementBotTurnCount('home', now);
}

export function markHomeBotQuotaExhausted(now = Date.now()) {
  markBotQuotaExhausted('home', now);
}
