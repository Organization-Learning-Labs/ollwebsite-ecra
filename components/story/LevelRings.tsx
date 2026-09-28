import type { CSSProperties } from "react";

type LevelRingsProps = {
  levels: readonly { title: string; body: string }[];
  label?: string;
};

/** Nested organizational levels as concentric rings, outermost first. */
export function LevelRings({ levels, label }: LevelRingsProps) {
  const n = levels.length;
  return (
    <div className="lr" data-reveal>
      <div className="lr-rings" aria-hidden="true">
        {levels.map((l, i) => (
          <span
            key={l.title}
            className="lr-ring"
            style={{ "--i": i, "--r": n - 1 - i, width: `${100 - i * (72 / n)}%` } as CSSProperties}
          >
            <span className="lr-ring-t">{i === n - 1 ? l.title : l.title.split(" / ")[0]}</span>
          </span>
        ))}
      </div>
      <ol className="lr-legend" aria-label={label}>
        {levels.map((l, i) => (
          <li key={l.title} style={{ "--i": i } as CSSProperties}>
            <span className="lr-dot" />
            <div>
              <h3>{l.title}</h3>
              <p>{l.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
