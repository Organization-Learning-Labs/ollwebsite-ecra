'use client';

import type { ConsultationCTAProps } from '@/lib/oll-bot/catalog';

export function ConsultationCTA({
  title,
  body,
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
}: ConsultationCTAProps & {
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <div className="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-3.5 shadow-sm">
      <p className="text-sm font-semibold text-primary-800">{title}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-gray-600">{body}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPrimary}
          className="rounded-full bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          {primaryLabel}
        </button>
        {secondaryLabel ? (
          <button
            type="button"
            onClick={onSecondary}
            className="rounded-full border border-primary-200 bg-white px-3.5 py-2 text-xs font-medium text-primary-700 transition hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            {secondaryLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
}
