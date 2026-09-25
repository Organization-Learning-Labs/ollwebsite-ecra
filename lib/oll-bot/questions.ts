/**
 * Editable OLL bot question catalog.
 * Change welcome copy, scripted flow, and starter chips here.
 * Answers still come from the Railway agent DB — do not put Q&A pairs here.
 *
 * Starters that the visitor already asked are hidden; keep this list long enough
 * that there are always fresh suggestions.
 */

export type FlowStep = {
  id: string;
  prompt: string;
  chips?: string[];
};

export type StarterQuestion = {
  label: string;
  message: string;
};

export const ollBotQuestions = {
  welcome:
    "Hi! I'm Ollie, the Executive Advisor at The Organization Learning Labs. Let's explore how future readiness could support your organization.",

  /** Shown on home bot open after welcome (intake skipped). */
  homeSuggestion: 'Tap a suggestion, or type a question.',

  flow: [
    {
      id: 'role',
      prompt:
        'Are you exploring this for yourself, a team, or the whole organization?',
      chips: ['Myself', 'A team', 'The organization'],
    },
    {
      id: 'industry',
      prompt:
        'Thanks for sharing! Which industry does your organization operate in?',
      chips: [
        'IT Services & Consulting',
        'Banking & Financial Services',
        'Healthcare & Life Sciences',
        'Manufacturing',
        'Retail & Consumer Goods',
        'Other',
      ],
    },
  ] satisfies FlowStep[],

  /** Pilot concierge — landing shows nominate form; Self assess chip switches to self-assess flow. */
  pilotStarters: [
    {
      label: 'Self assess',
      message: 'Self assess',
    },
    {
      label: 'Tell us your job role',
      message: 'Tell us your job role',
    },
    {
      label: 'Go to marketplace',
      message: 'Go to marketplace',
    },
    {
      label: 'What is OLL Academy?',
      message: 'What is OLL Academy?',
    },
    {
      label: 'How does future readiness work?',
      message: 'How does future readiness work?',
    },
    {
      label: 'What makes OLL different?',
      message: 'What makes OLL Academy different from a standard content library?',
    },
    {
      label: 'Connect with OLL',
      message: 'I would like to connect with the OLL team.',
    },
  ] satisfies StarterQuestion[],

  starters: [
    {
      label: 'Show assessments for my role',
      message: 'Tell us your job role',
    },
    {
      label: 'What is OLL Academy?',
      message: 'What is OLL Academy?',
    },
    {
      label: 'Browse the marketplace',
      message: 'Go to marketplace',
    },
    {
      label: 'What is a diagnostic scan?',
      message: 'What is a diagnostic scan on OLL Academy?',
    },
    {
      label: 'Nominate someone for a diagnostic',
      message: 'Nominate an employee for a diagnostic scan',
    },
    {
      label: 'How does future readiness work?',
      message: 'How does future readiness work?',
    },
    {
      label: 'How do I get started?',
      message: 'How do I get started on the OLL Academy platform?',
    },
    {
      label: 'Connect with OLL',
      message: 'I would like to connect with the OLL team.',
    },
  ] satisfies StarterQuestion[],
};
