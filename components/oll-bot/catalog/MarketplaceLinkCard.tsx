'use client';

import type { MarketplaceLinkProps } from '@/lib/oll-bot/catalog';
import { platformMarketplaceUrl } from '@/lib/marketplace';

export function MarketplaceLinkCard({
  title = 'OLL Academy marketplace',
  body = 'Browse assessments, research, and best practices on the OLL Academy marketplace.',
  buttonLabel = 'Open marketplace',
}: MarketplaceLinkProps) {
  const href = platformMarketplaceUrl();

  return (
    <div className="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-3.5 shadow-sm">
      <p className="text-sm font-semibold text-primary-800">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">{body}</p>
      <div className="mt-3">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-full bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
}
