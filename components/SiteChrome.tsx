'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Ollie from '@/components/Ollie';
import { BotShellGate } from '@/components/oll-bot/BotShellGate';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPilot = pathname?.startsWith('/pilot');

  const isDapReport = pathname?.startsWith('/dap-report');

  if (isPilot) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      {isDapReport ? null : (
        <>
          <BotShellGate />
          <Ollie />
        </>
      )}
    </>
  );
}
