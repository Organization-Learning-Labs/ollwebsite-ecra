import type { CSSProperties } from "react";

type ReinventionLoopProps = {
  stages: readonly { title: string; body: string }[];
  highlight: readonly string[];
  badge: string;
  centre: string;
  label?: string;
};

const RADIUS = 41;

/** Stages arranged on a continuous loop, with a badge on the stages a product contributes to. */
export function ReinventionLoop({ stages, highlight, badge, centre, label }: ReinventionLoopProps) {
  const n = stages.length;
  return (
    <div className="rl" data-reveal>
      <div className="rl-ring" aria-hidden="true">
        <span className="rl-track" />
        <span className="rl-orbit" />
        <span className="rl-centre">
          <span className="rl-centre-icon">↺</span>
          {centre}
        </span>
        {stages.map((s, i) => {
          const a = ((i / n) * 360 - 90) * (Math.PI / 180);
          const style = {
            "--i": i,
            left: `${50 + RADIUS * Math.cos(a)}%`,
            top: `${50 + RADIUS * Math.sin(a)}%`,
          } as CSSProperties;
          const on = highlight.includes(s.title);
          return (
            <span key={s.title} className={on ? "rl-node is-hl" : "rl-node"} style={style}>
              <b>{String(i + 1).padStart(2, "0")}</b>
              {s.title}
            </span>
          );
        })}
      </div>

      <ol className="rl-list" aria-label={label}>
        {stages.map((s, i) => {
          const on = highlight.includes(s.title);
          return (
            <li key={s.title} style={{ "--i": i } as CSSProperties} className={on ? "is-hl" : undefined}>
              <span className="rl-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h4>
                  {s.title}
                  {on ? <span className="rl-badge">{badge}</span> : null}
                </h4>
                <p>{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
