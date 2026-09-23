'use client';

import type { PossibilityCardProps } from '@/lib/oll-bot/catalog';

export function PossibilityCard({ title, body, status }: PossibilityCardProps) {
  return (
    <div className="rounded-xl border border-primary-100 bg-white p-3.5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-primary-800">{title}</p>
        {status ? (
          <span className="rounded-full bg-secondary-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-700">
            {status}
          </span>
        ) : null}
      </div>
      <p className="text-[13px] leading-relaxed text-gray-600">{body}</p>
    </div>
  );
}
