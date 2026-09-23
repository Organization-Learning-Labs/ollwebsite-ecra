'use client';

import { usePathname } from 'next/navigation';
import { OllBotShell } from '@/components/oll-bot/OllBotShell';

/** Hide the global floating bot on dedicated pilot concierge routes. */
export function BotShellGate() {
  const pathname = usePathname();
  if (pathname?.startsWith('/pilot')) return null;
  return <OllBotShell />;
}
