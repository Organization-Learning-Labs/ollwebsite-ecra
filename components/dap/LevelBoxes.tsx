import React from 'react';
import { BeltId } from '@/lib/dap/types';
import { getVerdict } from '@/lib/dap/beltConfig';
import { getBandsForBelt, resolveBand } from '@/lib/dap/dapLevels';

interface LevelBoxesProps {
  score: number;
  beltId: BeltId;
  /** Render the band names and ranges above the boxes */
  showLabels?: boolean;
  size?: 'sm' | 'md';
}

/**
 * The Benchmark column: five level boxes. The score is printed inside the one
 * box whose range contains it; the other four stay empty. No bars, no ticks,
 * no deltas — it reads instantly and prints cleanly in black and white.
 */
export const LevelBoxes: React.FC<LevelBoxesProps> = ({
  score,
  beltId,
  showLabels = false,
  size = 'md'
}) => {
  const bands = getBandsForBelt(beltId);
  const active = resolveBand(score, beltId);
  const boxHeight = size === 'sm' ? 'h-7' : 'h-10';
  const scoreText = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <div className="grid grid-cols-5 gap-1.5" role="img"
    aria-label={`Score ${score} percent falls in the ${active.name} band (${active.min} to ${active.max}) for this job category`}>
      
      {bands.map((band) => {
        const isActive = band.id === active.id;
        const verdict = getVerdict(band.id);
        return (
          <div key={band.id} className="min-w-0">
            {showLabels &&
            <div className="mb-1 text-center">
                <div
                className={`text-[9px] font-bold uppercase tracking-wide truncate ${
                isActive ? 'text-gray-900' : 'text-gray-400'}`
                }
                title={band.name}>
                
                  {band.name}
                </div>
                <div className="text-[9px] text-gray-400 tabular-nums">
                  {band.min}–{band.max}
                </div>
              </div>
            }
            <div
              className={`${boxHeight} rounded border flex items-center justify-center ${
              isActive ?
              `border-2 font-extrabold ${verdict.boxClass} ${scoreText}` :
              'border-gray-200 bg-gray-50'}`
              }>
              
              {isActive ?
              <span className="tabular-nums">{Math.round(score)}</span> :

              <span className="sr-only">{band.name} — not applicable</span>
              }
            </div>
          </div>);

      })}
    </div>);

};