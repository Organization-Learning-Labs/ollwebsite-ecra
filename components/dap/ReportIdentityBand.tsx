import React from 'react';
import { DapCandidate, DapProvenance } from '@/lib/dap/types';
import { getBelt } from '@/lib/dap/beltConfig';
import { OLL_ACADEMY_LOGO, OLL_ACADEMY_LOGO_ALT } from '@/lib/dap/brand';
import { resolveBand, resolveVerdict, formatScore } from '@/lib/dap/dapLevels';

interface ReportIdentityBandProps {
  candidate: DapCandidate;
  provenance: DapProvenance;
  overallScore: number;
}

const Field: React.FC<{label: string;value: string;sub?: string;}> = ({
  label,
  value,
  sub
}) =>
<div>
    <dt className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
      {label}
    </dt>
    <dd className="text-sm font-semibold text-gray-900 mt-0.5">{value}</dd>
    {sub && <dd className="text-xs text-gray-500">{sub}</dd>}
  </div>;


/**
 * The formal identity band. Everything HR needs in order to file this document
 * and still interpret it a year later.
 */
export const ReportIdentityBand: React.FC<ReportIdentityBandProps> = ({
  candidate,
  provenance,
  overallScore
}) => {
  const belt = getBelt(candidate.beltId);
  const band = resolveBand(overallScore, candidate.beltId);
  const verdict = resolveVerdict(overallScore, candidate.beltId);

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg overflow-hidden dap-avoid-break"
      aria-label="Report identity and overall result">
      
      {/* Branded report bar — white rather than a full-bleed dark band, so it
           prints without flooding the page with toner and reads in the register
           of a filed clinical document. */}
      <div className="bg-white border-b-2 border-primary-900 px-5 py-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-4 min-w-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={OLL_ACADEMY_LOGO}
            alt={OLL_ACADEMY_LOGO_ALT}
            className="h-9 w-auto flex-shrink-0" />
          
          <span
            className="hidden sm:block w-px h-8 bg-gray-300 flex-shrink-0"
            aria-hidden="true" />
          
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold tracking-wide text-gray-900">
              DEVELOPMENT ACTION PLAN
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
              Diagnostic Assessment Profile
            </p>
          </div>
        </div>
        <div className="sm:text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Report ID
          </p>
          <p className="text-xs font-semibold text-gray-900 tabular-nums">
            {provenance.reportId} · {provenance.reportVersion}
          </p>
        </div>
      </div>

      {/* Identity fields */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b-2 border-primary-900 bg-gray-50 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        <div className="p-4">
          <Field
            label="Candidate"
            value={candidate.name}
            sub={`ID · ${candidate.candidateId}`} />
          
        </div>
        <div className="p-4">
          <Field
            label="Role / Industry"
            value={candidate.jobRole}
            sub={`${candidate.industry} · ${candidate.subIndustry}`} />
          
        </div>
        <div className="p-4">
          <Field
            label="Organization"
            value={candidate.organization}
            sub={candidate.department} />
          
        </div>
        <div className="p-4">
          <Field
            label="Assessment Window"
            value={`${provenance.assignedOn} – ${provenance.completedOn}`}
            sub={`Generated ${provenance.generatedOn} · valid to ${provenance.validUntil}`} />
          
        </div>
      </dl>

      {/* Job category + overall score and level */}
      <div className="px-5 py-4 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
        <div className="lg:pr-6 lg:border-r border-gray-200">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Job Category
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`inline-block w-7 h-2.5 rounded-sm ${belt.swatchClass}`}
              aria-hidden="true" />
            
            <span className="text-lg font-extrabold text-gray-900">
              {belt.name}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Overall Score &amp; Level
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-0.5">
            <span className="text-3xl font-extrabold text-primary-900 tabular-nums">
              {formatScore(overallScore)}
            </span>
            <span className={`text-base font-bold ${verdict.toneClass}`}>
              {band.name}
            </span>
            <span className="text-xs text-gray-400 tabular-nums">
              band {band.min}–{band.max} for {belt.name}
            </span>
          </div>
        </div>

        <div className="lg:text-right">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            Result
          </div>
          <div className={`text-sm font-bold mt-1 ${verdict.toneClass}`}>
            {verdict.label}
          </div>
        </div>
      </div>
    </section>);

};