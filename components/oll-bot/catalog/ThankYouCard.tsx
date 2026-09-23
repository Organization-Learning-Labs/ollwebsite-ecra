'use client';

import type { ThankYouCardProps } from '@/lib/oll-bot/catalog';

export function ThankYouCard({ title, body }: ThankYouCardProps) {
  return (
    <div className="rounded-xl border border-secondary-200 bg-secondary-50 p-3.5 shadow-sm">
      <p className="text-sm font-semibold text-secondary-800">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-secondary-900/80">{body}</p>
    </div>
  );
}
