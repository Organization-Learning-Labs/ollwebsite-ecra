'use client';

import type { RoleMatchActionsProps } from '@/lib/oll-bot/catalog';

export function RoleMatchActions({
  industry,
  job_role,
  onDiagnose,
}: RoleMatchActionsProps & {
  onDiagnose?: (prefill: { industry?: string; job_role?: string }) => void;
}) {
  return (
    <div className="rounded-xl border border-[#D6E0F0] bg-white p-3.5 shadow-sm">
      <p className="text-sm font-semibold text-[#1E293B]">Next steps</p>
      <p className="mt-1 text-[13px] leading-relaxed text-gray-600">
        {job_role && industry
          ? `Start a diagnostic scan as a ${job_role} in ${industry}, or browse the full marketplace.`
          : 'Start a diagnostic scan or browse the full marketplace.'}
      </p>
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onDiagnose?.({ industry, job_role })}
          className="rounded-full bg-primary-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        >
          Diagnose yourself
        </button>
      </div>
    </div>
  );
}
