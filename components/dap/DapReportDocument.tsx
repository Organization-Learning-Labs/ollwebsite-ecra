'use client';

import React from 'react';
import { dapReport } from '@/lib/dap/dapReport';
import { OLL_ACADEMY_LOGO, OLL_ACADEMY_LOGO_ALT } from '@/lib/dap/brand';
import { findReadingMaterialByCompetence } from '@/lib/dap/readingIndex';
import { ReportIdentityBand } from './ReportIdentityBand';
import { ResultsAtAGlance } from './ResultsAtAGlance';
import { DapSectionBlock } from './DapSectionBlock';
import { JobCategoryExplainer } from './JobCategoryExplainer';
import {
  RecommendedReadingSection,
  MethodologySection,
  RecommendedReading } from
'./ReportClosing';

export const DAP_DOCUMENT_ID = 'dap-report-document';

/** Every page is an explicit break group: identity + results, one per section, reading, methodology. */
export const DAP_TOTAL_PAGES = dapReport.sections.length + 3;

/**
 * Repeats at the top of every printed page, carrying the logo so a page
 * separated from the set is still identifiable.
 */
const RunningHeader: React.FC<{line: string;page: string;}> = ({
  line,
  page
}) =>
<div className="hidden print:flex items-center justify-between gap-3 text-[9px] text-gray-500 border-b border-gray-200 pb-1 mb-3">
    <span className="flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
      src={OLL_ACADEMY_LOGO}
      alt={OLL_ACADEMY_LOGO_ALT}
      className="h-3.5 w-auto" />
    
      <span>{line}</span>
    </span>
    <span>{page}</span>
  </div>;


export function DapReportDocument() {
  const { candidate, provenance, overallScore, sections } = dapReport;

  const resolvedBySection = sections.map((section) => ({
    section,
    material: findReadingMaterialByCompetence(section.competenceId)
  }));

  const recommendedReading: RecommendedReading[] = resolvedBySection.
  filter(({ material }) => material !== undefined).
  map(({ section, material }) => ({
    sectionNumber: section.number,
    sectionTitle: section.title,
    score: section.score,
    materialId: material!.id,
    readLabel: `${material!.readMinutes} min read`
  }));

  const runningLine = `${candidate.name} · ${candidate.candidateId} · ${provenance.reportId}`;
  const totalPages = DAP_TOTAL_PAGES;

  return (
    <main
      id={DAP_DOCUMENT_ID}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6 print:px-0 print:py-0 dap-print-doc">

      {/* Page 1 — identity band and results at a glance */}
      <div id="dap-glance" className="dap-page space-y-6">
        <ReportIdentityBand
          candidate={candidate}
          provenance={provenance}
          overallScore={overallScore} />

        <div>
          <RunningHeader line={runningLine} page={`Page 1 of ${totalPages}`} />
          <ResultsAtAGlance sections={sections} beltId={candidate.beltId} />
        </div>
      </div>

      {/* One page per section */}
      {resolvedBySection.map(({ section, material }, index) =>
      <div key={section.number} id={index === 0 ? 'dap-sections' : undefined} className="dap-page">
          <RunningHeader
          line={runningLine}
          page={`Page ${index + 2} of ${totalPages}`} />

          <DapSectionBlock
          section={section}
          beltId={candidate.beltId}
          readingBadge={
          material ? `${material.readMinutes} min read` : undefined
          }
          readingMaterialId={material?.id} />

        </div>
      )}

      {/* Recommended reading, then the job category explainer — which must
           precede methodology, since the band configuration printed there is
           meaningless until the reader knows what the belt is. */}
      <div id="dap-reading" className="dap-page space-y-6">
        <RunningHeader
          line={runningLine}
          page={`Page ${sections.length + 2} of ${totalPages}`} />

        <RecommendedReadingSection
          beltId={candidate.beltId}
          recommendedReading={recommendedReading} />

        <JobCategoryExplainer beltId={candidate.beltId} />
      </div>

      {/* Methodology and verification */}
      <div id="dap-method" className="dap-page">
        <RunningHeader
          line={runningLine}
          page={`Page ${totalPages} of ${totalPages}`} />

        <MethodologySection
          provenance={provenance}
          beltId={candidate.beltId}
          sections={sections} />

      </div>

      <p className="text-center text-xs text-gray-400 pb-6 print:hidden">
        {runningLine}
      </p>
    </main>);

}
