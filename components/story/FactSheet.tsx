import type { CSSProperties } from "react";

type FactSheetProps = {
  title?: string;
  rows: readonly { k: string; v: string }[];
};

/** TLDR fact sheet: bold keys, short values. */
export function FactSheet({ title = "TLDR", rows }: FactSheetProps) {
  return (
    <div className="s-facts" data-reveal>
      <h2>{title}</h2>
      <dl>
        {rows.map((r, i) => (
          <div key={r.k} style={{ "--i": i } as CSSProperties}>
            <dt>{r.k}</dt>
            <dd>{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
