type ParamTableProps = {
  rows: readonly [string, string][];
  label: string;
  draft?: boolean;
};

/** "Assessment parameter / What we assess" table with a staggered row reveal. */
export function ParamTable({ rows, label, draft }: ParamTableProps) {
  return (
    <div className="lv-table-wrap">
      <div className="lv-table" role="table" aria-label={label}>
        <div className="lv-tr lv-th" role="row">
          <div role="columnheader">Assessment parameter</div>
          <div role="columnheader">What we assess</div>
        </div>
        <div role="rowgroup" data-stagger>
          {rows.map(([k, v], i) => (
            <div className="lv-tr" role="row" key={k}>
              <div className="lv-td-k" role="rowheader">
                <span className="lv-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {k}
              </div>
              <div className="lv-td-v" role="cell">
                {v}
              </div>
            </div>
          ))}
        </div>
      </div>
      {draft ? (
        <p className="lv-draft">
          <span className="flag">Draft parameters for review</span>
        </p>
      ) : null}
    </div>
  );
}
