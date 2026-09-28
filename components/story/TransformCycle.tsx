import type { CSSProperties } from "react";

type TransformCycleProps = {
  stages: readonly { title: string; body: string }[];
  loopLabel: string;
  label?: string;
};

/** Stage track with a feedback loop from the last stage back to the first. */
export function TransformCycle({ stages, loopLabel, label }: TransformCycleProps) {
  return (
    <div className="tc" data-reveal>
      <div className="tc-rail">
        <ol className="tc-track" aria-label={label}>
          {stages.map((s, i) => (
            <li key={s.title} style={{ "--i": i } as CSSProperties}>
              <span className="tc-node">{String(i + 1).padStart(2, "0")}</span>
              <div className="tc-card">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <span className="tc-run" aria-hidden="true" />
      </div>
      <div className="tc-loop">
        <span className="tc-loop-label">
          <span aria-hidden="true">↺</span> {loopLabel}
        </span>
      </div>
    </div>
  );
}
