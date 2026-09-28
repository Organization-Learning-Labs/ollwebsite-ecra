import type { CSSProperties } from "react";

type ProcessFunnelProps = {
  steps: readonly { title: string; body: string }[];
  label?: string;
};

/** Steps that narrow from broad external scanning to a focused, applied output. */
export function ProcessFunnel({ steps, label }: ProcessFunnelProps) {
  const n = steps.length;
  return (
    <ol className="pf" data-reveal aria-label={label}>
      {steps.map((s, i) => (
        <li key={s.title} style={{ "--i": i, "--w": `${100 - i * (44 / (n - 1))}%` } as CSSProperties}>
          <div className="pf-band-wrap">
            <span className="pf-band">
              <b>{String(i + 1).padStart(2, "0")}</b>
              {s.title}
            </span>
          </div>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
