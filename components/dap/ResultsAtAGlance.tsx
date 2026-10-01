import React from 'react';
import { BeltId, DapSection } from '@/lib/dap/types';
import { getBelt } from '@/lib/dap/beltConfig';
import { getBandsForBelt, resolveVerdict } from '@/lib/dap/dapLevels';
import { LevelBoxes } from './LevelBoxes';

interface ResultsAtAGlanceProps {
  sections: DapSection[];
  beltId: BeltId;
}

/**
 * Section · Score · Benchmark · Result. The band ranges printed in the column
 * header are the ones configured for this candidate's belt, so the table can
 * never be read against the wrong scale.
 */
export const ResultsAtAGlance: React.FC<ResultsAtAGlanceProps> = ({
  sections,
  beltId
}) => {
  const belt = getBelt(beltId);
  const bands = getBandsForBelt(beltId);

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-labelledby="results-at-a-glance-heading">
      
      <div className="px-5 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
        <h2
          id="results-at-a-glance-heading"
          className="text-xs font-bold uppercase tracking-wider text-gray-700">
          
          Results at a Glance
        </h2>
        <p className="text-[11px] text-gray-400">
          Bands shown are those configured for {belt.name.toUpperCase()}
        </p>
      </div>

      {/* Landscape A4 gives 273mm of printable width, so the table fits at
           full size — the horizontal scroll container is a screen affordance
           only and must not clip when printed. */}
      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full min-w-[860px] print:min-w-0">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th
                scope="col"
                className="text-left px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 w-[26%]">
                
                Section
              </th>
              <th
                scope="col"
                className="text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 w-[8%]">
                
                Score
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 w-[38%]">
                
                <div className="text-left mb-1">Benchmark</div>
                <div className="grid grid-cols-5 gap-1.5">
                  {bands.map((band) =>
                  <div key={band.id} className="text-center min-w-0">
                      <div className="truncate text-gray-500" title={band.name}>
                        {band.name}
                      </div>
                      <div className="font-medium text-gray-400 tabular-nums">
                        {band.min}–{band.max}
                      </div>
                    </div>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="text-left px-5 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500 w-[28%]">
                
                Result
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sections.map((section) => {
              const verdict = resolveVerdict(section.score, beltId);
              return (
                <tr key={section.number}>
                  <th
                    scope="row"
                    className="text-left px-5 py-3 text-sm font-medium text-gray-900">
                    
                    <span className="text-gray-400 tabular-nums mr-1">
                      {section.number} ·
                    </span>
                    {section.title}
                  </th>
                  <td className="px-3 py-3 text-sm font-extrabold text-gray-900 tabular-nums">
                    {section.score}%
                  </td>
                  <td className="px-3 py-3">
                    <LevelBoxes
                      score={section.score}
                      beltId={beltId}
                      size="sm" />
                    
                  </td>
                  <td
                    className={`px-5 py-3 text-xs font-semibold ${verdict.toneClass}`}>
                    
                    {verdict.label}
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>
    </section>);

};