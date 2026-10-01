import React from 'react';
import { BeltId } from '@/lib/dap/types';
import { belts, getBelt } from '@/lib/dap/beltConfig';
import { getBandsForBelt } from '@/lib/dap/dapLevels';

interface JobCategoryExplainerProps {
  beltId: BeltId;
}

/**
 * Sits before Methodology & Verification because the band configuration
 * printed there is meaningless until the reader knows what the belt is.
 *
 * It leads with what a belt is NOT. The single most likely misreading of this
 * document is that White Belt is a low rank and Black Belt a high one, which
 * would invert the meaning of every result in it.
 */
export const JobCategoryExplainer: React.FC<JobCategoryExplainerProps> = ({
  beltId
}) => {
  const belt = getBelt(beltId);
  const bands = getBandsForBelt(beltId);

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-labelledby="job-category-heading">
      
      <div className="px-5 py-3 border-b border-gray-200">
        <h2
          id="job-category-heading"
          className="text-xs font-bold uppercase tracking-wider text-gray-700">
          
          Understanding Your Job Category
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          How to read the belt stated on page one of this report.
        </p>
      </div>

      <div className="px-5 py-4 space-y-5">
        {/* What a belt is, and is not */}
        <div className="bg-gray-50 border-l-4 border-primary-900 px-4 py-3 dap-prose-measure">
          <p className="text-sm text-gray-800 leading-relaxed">
            A job category describes{' '}
            <strong>the kind of work a person does</strong> — not how well they
            performed. It is assigned from the candidate&rsquo;s role. It is not
            earned, not ranked, and not progressed through: no category is
            higher or lower than another.
          </p>
          <p className="text-sm text-gray-700 leading-relaxed mt-2">
            Because each category is scored against its own level bands, scores
            are comparable <strong>within</strong> a category but not across
            them. A Performer in one category and a Performer in another did not
            clear the same numeric bar, so results from reports issued under
            different categories must not be ranked or averaged together.
          </p>
        </div>

        {/* This candidate's category */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            This candidate&rsquo;s category
          </h3>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className={`inline-block w-9 h-3 rounded-sm ${belt.swatchClass}`}
              aria-hidden="true" />
            
            <span className="text-xl font-extrabold text-gray-900">
              {belt.name}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {belt.discipline}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed mt-2 dap-prose-measure">
            {belt.description}
          </p>
        </div>

        {/* The bands configured for this category */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Level bands for {belt.name}
          </h3>
          <ol className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {bands.map((band) =>
            <li
              key={band.id}
              className="border border-gray-300 rounded px-2 py-2 text-center dap-avoid-break">
              
                <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-600">
                  {band.name}
                </span>
                <span className="block text-sm font-extrabold text-gray-900 tabular-nums mt-0.5">
                  {band.min}&ndash;{band.max}
                </span>
              </li>
            )}
          </ol>
          <p className="text-xs text-gray-500 mt-2">
            These are the same ranges used to place every score in this report.
            They are configuration, not constants, and differ by job category.
          </p>
        </div>

        {/* Where this category sits among the five */}
        <div className="pt-3 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            The five job categories
          </h3>
          <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {belts.map((entry) => {
              const isCandidate = entry.id === beltId;
              return (
                <li
                  key={entry.id}
                  className={`flex items-center gap-2 rounded px-2.5 py-1.5 text-xs ${
                  isCandidate ?
                  'bg-gray-100 border border-gray-300' :
                  'border border-transparent'}`
                  }>
                  
                  <span
                    className={`inline-block w-5 h-2.5 rounded-sm flex-shrink-0 ${entry.swatchClass}`}
                    aria-hidden="true" />
                  
                  <span className="font-bold text-gray-900">{entry.name}</span>
                  <span className="text-gray-500 truncate">
                    {entry.discipline}
                  </span>
                  {isCandidate &&
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-primary-800 flex-shrink-0">
                      This report
                    </span>
                  }
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

};

export default JobCategoryExplainer;