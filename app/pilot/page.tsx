import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { OllAgentChat } from '@/components/oll-bot/OllAgentChat';

export const metadata: Metadata = {
  title: 'OLL Diagnostic Pilot',
  description: 'Nominate an employee for an OLL diagnostic assessment.',
  robots: { index: false, follow: false },
};

export default function PilotPage() {
  return (
    <div className="oll-pilot-page">
      <header className="oll-pilot-header">
        <div className="oll-pilot-header-inner">
          <Link href="/" className="flex items-center" aria-label="OLL home">
            <Logo className="oll-logo" />
          </Link>
          <p className="oll-pilot-eyebrow">Diagnostic Pilot</p>
        </div>
      </header>

      <main id="main" className="oll-pilot-main">
        <OllAgentChat variant="pilot" />
      </main>
    </div>
  );
}
