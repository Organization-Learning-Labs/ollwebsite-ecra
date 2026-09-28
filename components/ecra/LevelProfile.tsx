import type { EcraLevel } from "@/data/ecra";

const ICONS = {
  purpose: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r=".6" />
    </>
  ),
  decision: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M9 3.5l1.5 1.3L12 3l1.5 1.8L15 3.5" />
    </>
  ),
  unit: (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  focus: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4.5-4.5" />
      <path d="M11 8v6M8 11h6" />
    </>
  ),
};

/** Purpose, decision-maker, unit of analysis and focus of one assessment level. */
export function LevelProfile({ level }: { level: EcraLevel }) {
  const cells = [
    { k: "purpose", t: "Purpose", v: level.purpose },
    { k: "decision", t: "Primary decision-maker", v: level.decisionMaker },
    { k: "unit", t: "Unit of analysis", v: level.unit },
    { k: "focus", t: "Focus of assessment", v: level.focus },
  ] as const;
  return (
    <dl className="lv-profile" data-stagger>
      {cells.map((c) => (
        <div key={c.k} className={`lv-cell lv-cell--${c.k}`}>
          <span className="lv-cell-ic" aria-hidden="true">
            <svg viewBox="0 0 24 24">{ICONS[c.k]}</svg>
          </span>
          <dt>{c.t}</dt>
          <dd>{c.v}</dd>
        </div>
      ))}
    </dl>
  );
}
