import type { CSSProperties } from "react";
import type { MaturityStage } from "@/data/ecra";

/** Five-level maturity scale drawn as a rising staircase. */
export function MaturityLadder({ stages }: { stages: readonly MaturityStage[] }) {
  return (
    <ol className="lv-ladder" data-reveal aria-label="Capability maturity stages">
      {stages.map((s, i) => (
        <li key={s.level} style={{ "--i": i, "--lvl": s.level } as CSSProperties}>
          <span className="lv-step" aria-hidden="true">
            <b>{s.level}</b>
          </span>
          <span className="lv-step-copy">
            <strong>
              Level {s.level}: {s.title}
            </strong>
            <span>{s.desc}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
