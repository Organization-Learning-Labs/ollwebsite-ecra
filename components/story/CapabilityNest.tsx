import type { CSSProperties } from "react";

type CapabilityNestProps = {
  outerTitle: string;
  outerDef: string;
  outerParts: readonly string[];
  innerTitle: string;
  innerDef: string;
  innerParts: readonly string[];
};

const RADIUS = 37;

/** Individual competence drawn as one enabling part inside enterprise capability. */
export function CapabilityNest({ outerTitle, outerDef, outerParts, innerTitle, innerDef, innerParts }: CapabilityNestProps) {
  const n = outerParts.length;
  return (
    <div className="cn" data-reveal>
      <div className="cn-figure" aria-hidden="true">
        <p className="cn-outer-t">{outerTitle}</p>
        <div className="cn-outer">
          <ul className="cn-parts">
            {outerParts.map((p, i) => {
              const a = ((i / n) * 360 - 90 + 180 / n) * (Math.PI / 180);
              return (
                <li
                  key={p}
                  style={{ "--i": i, left: `${50 + RADIUS * Math.cos(a)}%`, top: `${50 + RADIUS * Math.sin(a)}%` } as CSSProperties}
                >
                  {p}
                </li>
              );
            })}
          </ul>
          <div className="cn-inner">
            <b>{innerTitle}</b>
            <span>{innerParts.join(", ")}</span>
          </div>
        </div>
      </div>
      <div className="cn-defs">
        <div className="cn-def cn-def--outer">
          <h3>{outerTitle}</h3>
          <p>{outerDef}</p>
        </div>
        <div className="cn-def cn-def--inner">
          <h3>{innerTitle}</h3>
          <p>{innerDef}</p>
        </div>
      </div>
    </div>
  );
}
