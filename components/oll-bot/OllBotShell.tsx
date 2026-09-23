'use client';

import { OllAgentChat } from '@/components/oll-bot/OllAgentChat';

/** Floating OLL advisor; launcher is the site Ollie FAB. */
export function OllBotShell() {
  return <OllAgentChat hideLauncher />;
}
