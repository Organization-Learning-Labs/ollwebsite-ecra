import { DapReport } from './types';

export const dapReport: DapReport = {
  candidate: {
    name: 'Rajesh Tiwari',
    candidateId: 'OLL-INX-004182',
    jobRole: 'Sales Executive',
    beltId: 'white',
    industry: 'BFSI',
    subIndustry: 'Retail Banking',
    organization: 'ABC Enterprises',
    department: 'Accounts'
  },
  provenance: {
    assessmentName: 'Workplace Effectiveness Diagnostic',
    assessmentId: 'ASMT-WE-2026-014',
    assignedOn: '18 Mar 2026',
    completedOn: '06 Aug 2026',
    reportId: 'DAP-2026-00184',
    reportVersion: 'v1.0',
    generatedOn: '10 Aug 2026',
    validUntil: '10 Aug 2027',
    assessorName: 'Dr. Meera Krishnan',
    assessorTitle: 'Lead Assessment Psychologist, OLL Academy',
    verificationCode: 'A7F2-91C4-DD10'
  },
  overallScore: 83.33,
  sections: [
  {
    number: 1,
    title: 'Core Soft Skills',
    competenceId: 'core-soft-skills',
    score: 60,
    comment: 'Steady Competency – Room to Grow',
    objective:
    'Strengthen everyday communication, listening, and interpersonal judgement so that routine interactions with colleagues and customers land consistently rather than occasionally.',
    actionPlans: [
    {
      title: 'Run a structured listening drill each week',
      detail:
      'In one meeting per week, take no notes for the first five minutes. Summarise back what you heard before responding. Log where your summary diverged from what was actually said.'
    },
    {
      title: 'Rehearse the three conversations you avoid',
      detail:
      'Identify the three interactions you most often defer — a pushback, a bad-news update, a request for help. Script and rehearse each one with a peer before the real conversation.'
    },
    {
      title: 'Collect one piece of interaction feedback a fortnight',
      detail:
      'Ask a colleague who watched you in a live interaction for one specific thing to keep and one to change. Track the pattern across six cycles.'
    }]

  },
  {
    number: 2,
    title: 'Data Sensitivity & Communication',
    competenceId: 'data-sensitivity',
    score: 80,
    comment: 'Strong Alignment – Keep Building',
    objective:
    'Sustain disciplined handling of customer and financial data while sharpening how findings are communicated to non-technical stakeholders.',
    actionPlans: [
    {
      title: 'Apply the minimum-disclosure test before every share',
      detail:
      'Before sending any file or extract, ask what the smallest sufficient dataset is for the recipient to act. Redact everything beyond it.'
    },
    {
      title: 'Lead with the decision, not the data',
      detail:
      'Restructure your next three updates so the recommended decision appears first, with supporting figures beneath rather than in front.'
    },
    {
      title: 'Own a quarterly access review',
      detail:
      'Review who holds access to the datasets you administer, revoke what is stale, and document the rationale.'
    }]

  },
  {
    number: 3,
    title: 'Mental Health at Work',
    competenceId: 'mental-health',
    score: 100,
    comment: 'Mastery Level – Continue Leading by Example',
    objective:
    'Continue modelling sustainable working practices and extend that influence to colleagues who have not yet built the same habits.',
    actionPlans: [
    {
      title: 'Make your boundaries visible',
      detail:
      'State your working pattern explicitly in your calendar and status so colleagues can calibrate expectations rather than infer them.'
    },
    {
      title: 'Mentor one colleague on workload design',
      detail:
      'Pair with someone showing early signs of overload and walk them through how you sequence and defend your week.'
    },
    {
      title: 'Raise one systemic blocker per quarter',
      detail:
      'Identify one recurring process that creates avoidable pressure for the team and take it to your manager with a proposed fix.'
    }]

  }]

};

export default dapReport;