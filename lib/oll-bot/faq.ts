/**
 * Pinned answers for common starter chips.
 * Copy is aligned with the homepage FAQ (components/home/HomePage.tsx).
 * Exact match on chip message strings — typed questions still go to the agent.
 */

const FAQ_ANSWERS: Record<string, string> = {
  'What is OLL Academy?': `OLL Academy is the platform from The Organization Learning Labs. OLL develops research-led frameworks, diagnostics, capability architectures, and development systems that help enterprises build the capabilities their future strategy depends on.

This is not a standard training program or course catalogue. The starting point is the capability your organization will need. Learning comes in only once that capability and the gap to it are clear.`,

  'What is a diagnostic scan on OLL Academy?': `A diagnostic scan on OLL Academy is a 20 to 30 minute assessment. It uses scenario, multiple-choice, ranking, and short task questions set in the participant's industry.

You can assess at three levels:
• Organization — structural and governance maturity
• Department or business unit — where capability gaps sit inside a unit
• Individual role — which leaders and employees need development

Wider views are built from authorized, aggregated results of the individual assessments beneath them.`,

  'How does future readiness work?': `Future readiness starts with the capabilities your organization will need—not a course catalogue.

OLL uses research-led diagnostics to measure readiness at organization, department, or role level. Once the gaps are clear, prescriptive learning and development paths follow. The goal is capability your strategy depends on, not content for its own sake.`,

  'How do I get started on the OLL Academy platform?': `You can get started in a few ways:

• As an individual — sign up directly and receive your own Development Action Plan. Nothing reaches an employer unless you choose to share it.
• Nominate someone — a leader can nominate an employee for a diagnostic scan; we match them to an assessment and send an invitation.
• Browse the marketplace — explore assessments, research, and best practices on the OLL Academy platform.

Tap a suggestion below to nominate, self-assess, or open the marketplace.`,

  'What makes OLL Academy different from a standard content library?': `OLL Academy is not a standard content library or training catalogue.

The starting point is the capability your organization will need. OLL develops research-led frameworks, diagnostics, and development systems—not generic courses. Learning comes in only once that capability and the gap to it are clear.`,
};

/** Return pinned copy when the chip message matches a FAQ entry (case-insensitive). */
export function getPinnedFaqAnswer(message: string): string | null {
  const normalized = message.trim().toLowerCase();
  if (!normalized) return null;

  for (const [question, answer] of Object.entries(FAQ_ANSWERS)) {
    if (question.trim().toLowerCase() === normalized) {
      return answer;
    }
  }
  return null;
}
