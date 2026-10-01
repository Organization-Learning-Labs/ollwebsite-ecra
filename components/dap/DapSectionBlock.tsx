import React from 'react';
import { BookOpenIcon, TargetIcon, ArrowRightIcon } from 'lucide-react';
import { BeltId, DapSection } from '@/lib/dap/types';
import { resolveBand, resolveVerdict } from '@/lib/dap/dapLevels';
import { LevelBoxes } from './LevelBoxes';

interface DapSectionBlockProps {
  section: DapSection;
  beltId: BeltId;
  readingBadge?: string;
  readingMaterialId?: string;
}

export const DapSectionBlock: React.FC<DapSectionBlockProps> = ({
  section,
  beltId,
  readingBadge,
  readingMaterialId
}) => {
  const band = resolveBand(section.score, beltId);
  const verdict = resolveVerdict(section.score, beltId);

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-labelledby={`section-${section.number}-heading`}>
      
      <div className="px-5 py-4 border-b border-gray-200 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Section {section.number}
          </p>
          <h2
            id={`section-${section.number}-heading`}
            className="text-lg font-bold text-gray-900 mt-0.5">
            
            {section.title}
          </h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-gray-900 tabular-nums">
            {section.score}%
          </div>
          <div className={`text-xs font-bold ${verdict.toneClass}`}>
            {band.name}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
          Benchmark
        </p>
        <LevelBoxes score={section.score} beltId={beltId} showLabels />
      </div>

      <div className="px-5 py-4 grid gap-4 md:grid-cols-2 border-b border-gray-100">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Comment
          </p>
          <p className={`text-sm font-semibold ${verdict.toneClass}`}>
            {section.comment}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            Objective
          </p>
          <p className="text-sm text-gray-700">{section.objective}</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-3">
          Action Plan
        </p>
        <ol className="space-y-3 dap-prose-measure">
          {section.actionPlans.map((plan, index) =>
          <li key={plan.title} className="flex gap-3 dap-avoid-break">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary-700 text-xs font-bold flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                  <TargetIcon className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
                  {plan.title}
                </h3>
                <p className="text-sm text-gray-600 mt-0.5">{plan.detail}</p>
              </div>
            </li>
          )}
        </ol>
      </div>

      {readingMaterialId &&
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200">
          <div
          className="group flex flex-wrap items-center justify-between gap-2 text-sm">
          
            <span className="flex items-center gap-2 font-semibold text-primary-700 group-hover:text-primary-800">
              <BookOpenIcon className="h-4 w-4" aria-hidden="true" />
              Read about {section.title}
            </span>
            <span className="flex items-center gap-2">
              {readingBadge &&
            <span className="text-[11px] font-medium text-gray-500 bg-white border border-gray-200 rounded-full px-2 py-0.5">
                  {readingBadge}
                </span>
            }
              <ArrowRightIcon
              className="h-4 w-4 text-primary-700 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true" />
            
            </span>
          </div>
        </div>
      }
    </section>);

};