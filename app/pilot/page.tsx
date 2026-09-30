import type { Metadata } from 'next';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { OllAgentChat } from '@/components/oll-bot/OllAgentChat';

export const metadata: Metadata = {
  title: { absolute: 'Diagnostic Pilot | The Organization Learning Labs' },
  description: 'Nominate an employee for a diagnostic assessment.',
  robots: { index: false, follow: false },
};

export default function PilotPage() {
  return (
    <div className="oll-pilot-page">
      <div className="oll-pilot-fx" aria-hidden="true">
        <span className="oll-pilot-grid" />
        <span className="oll-pilot-glow" />
        <span className="oll-pilot-glow oll-pilot-glow--amber" />
      </div>

      <header className="nav oll-pilot-nav">
        <div className="wrap nav-inner">
          <Link className="brand" href="/" aria-label="The Organization Learning Labs home">
            <Logo />
          </Link>
          <p className="oll-pilot-eyebrow">
            <span className="oll-pilot-eyebrow-dot" aria-hidden="true" />
            Diagnostic Pilot
          </p>
        </div>
      </header>

      <main id="main" className="oll-pilot-main">
        <OllAgentChat variant="pilot" />
      </main>
    </div>
  );
}
