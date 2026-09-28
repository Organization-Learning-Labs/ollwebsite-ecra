import type { CSSProperties } from "react";

type PathwaysMapProps = {
  aHeading: string;
  aSteps: readonly { title: string; body: string }[];
  bHeading: string;
  bBody: string;
  bEntries: readonly string[];
  bSteps: readonly string[];
  chain: readonly string[];
  chainLabel: string;
};

const idx = (i: number) => ({ "--i": i }) as CSSProperties;

function splitHeading(heading: string) {
  const [tag, ...rest] = heading.split(": ");
  return { tag, title: rest.join(": ") || heading };
}

/** Two entry lanes (broad vs focused) converging into one connected architecture. */
export function PathwaysMap({ aHeading, aSteps, bHeading, bBody, bEntries, bSteps, chain, chainLabel }: PathwaysMapProps) {
  const a = splitHeading(aHeading);
  const b = splitHeading(bHeading);

  return (
    <div className="pw">
      <div className="pw-lanes" data-reveal>
        <article className="pw-lane pw-lane--a" aria-label={aHeading}>
          <header className="pw-lane-head">
            <span className="pw-tag">{a.tag}</span>
            <h3>{a.title}</h3>
            <p className="pw-entry">
              Starts with <strong>the whole enterprise</strong>
            </p>
          </header>
          <ol className="pw-track">
            {aSteps.map((s, i) => (
              <li key={s.title} style={idx(i)}>
                <span className="pw-node">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="pw-lane pw-lane--b" aria-label={bHeading}>
          <header className="pw-lane-head">
            <span className="pw-tag">{b.tag}</span>
            <h3>{b.title}</h3>
            <p className="pw-entry">Starts with one focus area</p>
          </header>
          <ul className="pw-entries" aria-label="Possible entry points">
            {bEntries.map((e, i) => (
              <li key={e} style={idx(i)}>
                {e}
              </li>
            ))}
          </ul>
          <ol className="pw-track pw-track--short">
            {bSteps.map((s, i) => (
              <li key={s} style={idx(i)}>
                <span className="pw-node">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{s}</h4>
                </div>
              </li>
            ))}
          </ol>
          <p className="pw-desc">{bBody}</p>
        </article>
      </div>

      <div className="pw-spine" data-reveal>
        <div className="pw-merge" aria-hidden="true" />
        <div className="pw-spine-card">
          <p className="pw-spine-k">{chainLabel}</p>
          <div className="pw-chain-wrap">
            <ol className="pw-chain" aria-label="Connected architecture">
              {chain.map((c, i) => (
                <li key={c} style={idx(i)}>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
            <span className="pw-run" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
