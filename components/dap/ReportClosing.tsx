import React from 'react';
import { BookOpenIcon, ShieldCheckIcon } from 'lucide-react';
import { BeltId, DapProvenance, DapSection } from '@/lib/dap/types';
import { getBelt } from '@/lib/dap/beltConfig';
import {
  describeBandConfig,
  orderByWeakestBand,
  resolveBand } from
'@/lib/dap/dapLevels';

export interface RecommendedReading {
  sectionNumber: number;
  sectionTitle: string;
  score: number;
  materialId: string;
  readLabel: string;
}

interface RecommendedReadingSectionProps {
  beltId: BeltId;
  recommendedReading: RecommendedReading[];
}

export const RecommendedReadingSection: React.FC<
  RecommendedReadingSectionProps> =
({ beltId, recommendedReading }) => {
  const ordered = orderByWeakestBand(recommendedReading);
  if (ordered.length === 0) return null;

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-labelledby="recommended-reading-heading">
      
      <div className="px-5 py-3 border-b border-gray-200">
        <h2
          id="recommended-reading-heading"
          className="text-xs font-bold uppercase tracking-wider text-gray-700">
          
          Recommended Reading
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Ordered weakest band first. Each dossier explains the competence in
          the language of your industry and role.
        </p>
      </div>
      <ul className="divide-y divide-gray-100">
        {ordered.map((item) => {
          const band = resolveBand(item.score, beltId);
          return (
            <li key={item.materialId}>
              <div
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 hover:bg-gray-50">
                
                <span className="flex items-center gap-3 min-w-0">
                  <BookOpenIcon
                    className="h-4 w-4 text-primary-600 flex-shrink-0"
                    aria-hidden="true" />
                  
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-gray-900 truncate">
                      {item.sectionTitle}
                    </span>
                    <span className="block text-xs text-gray-500">
                      Section {item.sectionNumber} · {item.score}% · {band.name}
                    </span>
                  </span>
                </span>
                <span className="text-[11px] font-medium text-gray-500 bg-gray-50 border border-gray-200 rounded-full px-2 py-0.5">
                  {item.readLabel}
                </span>
              </div>
              <p className="px-5 pb-3 -mt-1 text-[11px] text-gray-400 hidden print:block">
                oll.academy/reading-material/{item.materialId}
              </p>
            </li>);

        })}
      </ul>
    </section>);

};

interface MethodologySectionProps {
  provenance: DapProvenance;
  beltId: BeltId;
  sections: DapSection[];
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  provenance,
  beltId,
  sections
}) => {
  const belt = getBelt(beltId);

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-labelledby="methodology-heading">
      
      <div className="px-5 py-3 border-b border-gray-200">
        <h2
          id="methodology-heading"
          className="text-xs font-bold uppercase tracking-wider text-gray-700">
          
          Methodology &amp; Verification
        </h2>
      </div>

      <div className="px-5 py-4 space-y-4">
        <div className="dap-prose-measure">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Band configuration applied
          </h3>
          <p className="text-sm text-gray-700">
            This report was scored against the level bands configured for{' '}
            <strong>{belt.name}</strong> ({belt.discipline}). Band ranges are
            set per job category, so these figures are not comparable with a
            report issued under a different belt.
          </p>
          <p className="mt-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded px-3 py-2 tabular-nums">
            {describeBandConfig(beltId)}
          </p>
        </div>

        <div className="dap-prose-measure">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            How results are derived
          </h3>
          <p className="text-sm text-gray-700">
            Each of the {sections.length} sections is scored as a percentage of
            attainable points. The Benchmark column places that score into the
            level band whose range contains it. The Result verdict follows
            directly from that band, so the summary table and the section detail
            always state the same finding.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-gray-100">
          <div className="dap-avoid-break">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Assessor
            </h3>
            <p className="text-sm font-semibold text-gray-900">
              {provenance.assessorName}
            </p>
            <p className="text-xs text-gray-500">{provenance.assessorTitle}</p>
            <div
              className="mt-3 h-10 border-b border-gray-300 w-48"
              aria-hidden="true" />
            
            <p className="text-[10px] text-gray-400 mt-1">Signature</p>
          </div>
          <div className="dap-avoid-break">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Verification
            </h3>
            <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <ShieldCheckIcon
                className="h-4 w-4 text-green-600"
                aria-hidden="true" />
              
              <span className="tabular-nums">
                {provenance.verificationCode}
              </span>
            </p>
            <dl className="mt-2 space-y-1 text-xs text-gray-600">
              <div className="flex gap-2">
                <dt className="text-gray-400">Assessment</dt>
                <dd className="tabular-nums">{provenance.assessmentId}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Report</dt>
                <dd className="tabular-nums">
                  {provenance.reportId} · {provenance.reportVersion}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-gray-400">Valid until</dt>
                <dd>{provenance.validUntil}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 pt-3 border-t border-gray-100 dap-prose-measure">
          <strong>Confidential.</strong> This report contains personal
          assessment data. It is intended solely for the named candidate and
          authorised personnel within the issuing organisation. Do not
          distribute without consent.
        </p>
      </div>
    </section>);

};