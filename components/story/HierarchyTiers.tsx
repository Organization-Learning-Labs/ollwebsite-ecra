import type { CSSProperties } from "react";

type Item = { title: string; body: string };

type HierarchyTiersProps = {
  tiers: readonly Item[];
  example: readonly Item[];
  exampleTitle: string;
  label?: string;
};

/** Broad-to-specific tiers, each paired with the matching row of an illustrative example. */
export function HierarchyTiers({ tiers, example, exampleTitle, label }: HierarchyTiersProps) {
  const tierTitles = new Set(tiers.map((t) => t.title));
  const extras = example.filter((e) => !tierTitles.has(e.title));
  const last = tiers.length - 1;

  return (
    <div className="ht" data-reveal>
      <div className="ht-head" aria-hidden="true">
        <span>Architecture</span>
        <span>{exampleTitle}</span>
      </div>
      <div className="ht-body">
        <div className="ht-axis" aria-hidden="true">
          <span>Broad</span>
          <span>Specific</span>
        </div>
        <ol className="ht-rows" aria-label={label}>
          {tiers.map((t, i) => {
            const match = example.find((e) => e.title === t.title);
            const outs = i === last ? extras : match ? [match] : [];
            return (
              <li key={t.title} style={{ "--i": i } as CSSProperties} className={i === last ? "ht-row ht-row--end" : "ht-row"}>
                <div className="ht-tier">
                  <h4>{t.title}</h4>
                  <p>{t.body}</p>
                </div>
                <div className="ht-ex">
                  {outs.map((o) => (
                    <p key={o.title}>
                      {i === last ? <span className="ht-ex-k">{o.title}</span> : <span className="ht-ex-k ht-ex-k--m">e.g.</span>}
                      {o.body}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
