import { StoryCta } from "@/components/story/StoryCta";
import { assessmentSignups, type LevelSlug } from "@/data/ecra";
import { siteConfig } from "@/lib/site";

export function EcraCta({ slug }: { slug?: LevelSlug }) {
  const assessHref = assessmentSignups.find((a) => a.slug === slug)?.signin ?? siteConfig.platform.signup;
  return (
    <StoryCta
      heading="Start at the level you make decisions at."
      body="Create your account, choose the assessment level and invite the right participants. Results are shared only with authorized users."
      actions={[
        { label: "Assess your readiness", href: assessHref, primary: true },
        { label: "All assessment levels", href: "/ecra" },
        { label: "Competence Blueprint", href: "/competence-blueprint" },
      ]}
    />
  );
}
