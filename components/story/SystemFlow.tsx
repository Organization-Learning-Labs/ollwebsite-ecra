import type { CSSProperties } from "react";

type SystemFlowProps = {
  parts: readonly { title: string; body: string }[];
  journey?: readonly string[];
  journeyLabel?: string;
  label?: string;
};

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

function ladeSteps(body: string) {
  const m = body.match(/LADE: ([^.]+)/);
  return m ? m[1].split(/,\s*/) : null;
}

/** Five connected parts of the OLL architecture, optionally feeding the six-step journey. */
export function SystemFlow({ parts, journey, journeyLabel, label }: SystemFlowProps) {
  return (
    <div className="sf">
      <div className="sf-flow" data-reveal>
        <ol className="sf-parts" aria-label={label}>
          {parts.map((p, i) => {
            const lade = ladeSteps(p.body);
            return (
              <li key={p.title} style={idx(i)} className={lade ? "sf-part sf-part--engine" : "sf-part"}>
                <span className="sf-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                {lade ? (
                  <ul className="sf-lade" aria-hidden="true">
                    {lade.map((step, j) => (
                      <li key={step} style={idx(j)} title={step}>
                        {step[0]}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      {journey ? (
        <div className="pw-spine sf-journey" data-reveal>
          <div className="pw-spine-card">
            {journeyLabel ? <p className="pw-spine-k">{journeyLabel}</p> : null}
            <div className="pw-chain-wrap">
              <ol className="pw-chain" aria-label={journeyLabel}>
                {journey.map((step, i) => (
                  <li key={step} style={idx(i)}>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <span className="pw-run" aria-hidden="true" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
