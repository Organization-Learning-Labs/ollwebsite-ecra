"use client";

import { useState, type CSSProperties } from "react";
import { BAND, BAND_ORDER, TARGET, bandFor, type CompBand, type LevelDap as Dap, type ScoreRow } from "@/data/ecra";

const VISIBLE_ROWS = 6;

function Track({ fill, target }: { fill: number; target: number }) {
  return (
    <div className="c-track">
      <div className="c-fill" style={{ width: `${fill}%` }} />
      <div className="c-tgt" style={{ left: `${target}%` }} />
    </div>
  );
}

function countBands(rows: ScoreRow[]) {
  return rows.reduce<Record<CompBand, number>>(
    (acc, r) => ({ ...acc, [bandFor(r.score)]: acc[bandFor(r.score)] + 1 }),
    { crit: 0, sig: 0, mod: 0, ok: 0 },
  );
}

function BandSummary({ rows }: { rows: ScoreRow[] }) {
  const counts = countBands(rows);
  return (
    <div className="band-sum">
      {BAND_ORDER.map((k) => (
        <span key={k} className={`bchip ${BAND[k][1]}`}>
          {counts[k]} {BAND[k][0].replace(" gap", "").toLowerCase()}
        </span>
      ))}
    </div>
  );
}

function ScoreList({ rows, open }: { rows: ScoreRow[]; open: boolean }) {
  return (
    <ul className="cmap">
      {rows.map((r, i) => {
        const band = bandFor(r.score);
        return (
          <li key={r.name} hidden={!open && i >= VISIBLE_ROWS} style={{ "--i": i } as CSSProperties}>
            <span className="c-rank">{i + 1}</span>
            <div>
              <div className="c-top">
                <span className="c-name">{r.name}</span>
                <span className="c-meta">
                  <span className={`bchip ${BAND[band][1]}`}>{BAND[band][0]}</span>
                  <span className="c-score">
                    {r.score.toFixed(1)}
                    <span> / 5</span>
                  </span>
                </span>
              </div>
              <Track fill={(r.score / 5) * 100} target={(TARGET / 5) * 100} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function MoreButton({ open, total, onToggle, noun }: { open: boolean; total: number; onToggle: () => void; noun: string }) {
  if (total <= VISIBLE_ROWS) return null;
  return (
    <button className="cmap-more" aria-expanded={open} onClick={onToggle}>
      {open ? "Show fewer" : `Show all ${total} ${noun}`}
    </button>
  );
}

/** Level-specific sample Development Action Plan, with the explanation beside it. */
export function LevelDap({ dap, levelTitle }: { dap: Dap; levelTitle: string }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);

  let screen: React.ReactNode;
  if (dap.kind === "maturity") {
    const rows = [...dap.rows].sort((a, b) => b.target - b.current - (a.target - a.current));
    screen = (
      <>
        <div className="dap-head">
          <div>
            <h5>Maturity profile</h5>
            <p>
              {rows.length} parameters, current level against the level required. Scale 1 to 5.
            </p>
          </div>
          <div className="mt-legend" aria-hidden="true">
            <span><i className="mt-cur" />Current</span>
            <span><i className="mt-tgt" />Required</span>
          </div>
        </div>
        <ul className="cmap">
          {rows.map((r, i) => (
            <li key={r.name} hidden={!open && i >= VISIBLE_ROWS} style={{ "--i": i } as CSSProperties}>
              <span className="c-rank">{i + 1}</span>
              <div>
                <div className="c-top">
                  <span className="c-name">{r.name}</span>
                  <span className="c-meta">
                    <span className={`bchip ${r.target - r.current >= 2 ? "b-crit" : "b-mod"}`}>
                      {`${r.target - r.current} level${r.target - r.current === 1 ? "" : "s"} to go`}
                    </span>
                    <span className="c-score">
                      L{r.current}
                      <span> to L{r.target}</span>
                    </span>
                  </span>
                </div>
                <div className="mt-track" aria-label={`Level ${r.current} of 5, level ${r.target} required`}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className={`${n <= r.current ? "is-cur" : ""}${n > r.current && n <= r.target ? " is-gap" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <MoreButton open={open} total={rows.length} onToggle={toggle} noun="parameters" />
      </>
    );
  } else {
    const rows = [...dap.rows].sort((a, b) => a.score - b.score);
    const avg = rows.reduce((s, r) => s + r.score, 0) / rows.length;
    screen = (
      <>
        {dap.kind === "score" ? (
          <div className="dap-sig">
            <div>
              <div className="mini-label">{dap.signatureLabel}</div>
              <div className="sig-score">
                {Math.round((avg / 5) * 100)}
                <small> / 100</small>
              </div>
            </div>
            <span className="bchip b-mod">{dap.status}</span>
          </div>
        ) : null}
        <div className="dap-head">
          <div>
            <h5>{dap.kind === "role" ? "Your competency map" : "Readiness by parameter"}</h5>
            <p>
              {rows.length} {dap.kind === "role" ? "competencies for this role" : "parameters"}, sorted by gap. Target{" "}
              {TARGET.toFixed(1)} of 5.
            </p>
          </div>
          <BandSummary rows={rows} />
        </div>
        <ScoreList rows={rows} open={open} />
        <MoreButton open={open} total={rows.length} onToggle={toggle} noun={dap.kind === "role" ? "competencies" : "parameters"} />
      </>
    );
  }

  return (
    <div className="dap-grid lv-dap">
      <div className="screen" data-reveal="up">
        <div className="screen-bar">
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
          <span>{dap.kind === "role" ? "Development Action Plan" : `${levelTitle} readiness plan`}</span>
          <span>Sample data</span>
        </div>
        {screen}
        <div className="dap-foot">
          <div>
            <h5>Prioritized focus areas</h5>
            <ul className="focus">
              {dap.priorities.map((f, i) => (
                <li key={f}>
                  <b>{i + 1}</b>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {dap.kind === "role" ? (
            <div>
              <h5>Mental model profile</h5>
              <div className="pills">
                {dap.pills.map((p) => (
                  <span className="pill" key={p}>
                    {p}
                  </span>
                ))}
              </div>
              <p className="lv-profile-note">{dap.profile}</p>
            </div>
          ) : (
            <div>
              <h5>How to read it</h5>
              <p className="lv-profile-note">
                {dap.kind === "maturity"
                  ? "Each parameter sits on the five-level maturity scale. The gap is the number of levels between current and required maturity."
                  : "Each parameter is scored from the assessment evidence and banded against the target. Any gap band marks it for action."}
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="s-head" data-reveal>
          <p className="s-eyebrow">What this level receives</p>
          <h2>{dap.heading}</h2>
          <p className="s-lede">{dap.lede}</p>
        </div>
        <div className="outputs" data-stagger>
          {dap.outputs.map((o) => (
            <div className="output" key={o.t}>
              <h4>{o.t}</h4>
              <p>{o.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
