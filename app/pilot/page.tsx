import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { OllAgentChat } from '@/components/oll-bot/OllAgentChat';

export const metadata: Metadata = {
  title: ' The Organization Learning Labs Diagnostic Pilot',
  description: 'Nominate an employee for an diagnostic assessment.',
  robots: { index: false, follow: false },
};

export default function PilotPage() {
  return (
    <div className="oll-pilot-page">
      <header className="nav oll-pilot-nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/" aria-label="The Organization Learning Labs home">
            <Logo />
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
