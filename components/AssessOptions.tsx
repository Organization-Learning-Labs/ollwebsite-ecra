import { LevelIcon } from "@/components/ecra/LevelIcon";
import { assessmentSignups } from "@/data/ecra";
import { siteConfig } from "@/lib/site";

type AssessOptionsProps = {
  className?: string;
  /** Adds menu semantics when the list sits inside a dropdown. */
  asMenu?: boolean;
  onPick?: () => void;
};

/** The four assessments offered at signup; shared by the header dropdown, phone menu and bottom sheet. */
export function AssessOptions({ className = "assess-opts", asMenu, onPick }: AssessOptionsProps) {
  return (
    <div className={className}>
      {assessmentSignups.map((a) => (
        <a
          key={a.slug}
          href={siteConfig.platform.signup}
          data-level={a.slug}
          role={asMenu ? "menuitem" : undefined}
          onClick={onPick}
        >
          <LevelIcon slug={a.slug} />
          <span className="signup-copy">
            <strong>{a.title}</strong>
            <span>{a.line}</span>
          </span>
        </a>
      ))}
    </div>
  );
}
