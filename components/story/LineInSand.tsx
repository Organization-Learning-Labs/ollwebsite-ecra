import Link from "next/link";
import type { CSSProperties } from "react";

type LineInSandProps = {
  eyebrow?: string;
  title: string;
  quote?: string;
  lead?: string;
  negations: readonly string[];
  body?: string;
  links?: readonly { href: string; label: string }[];
};

/** "Where we draw the line": quote, bold negations, supporting line. */
export function LineInSand({ eyebrow, title, quote, lead, negations, body, links }: LineInSandProps) {
  return (
    <div className="s-line" data-reveal>
      <div className="s-line-l">
        {eyebrow ? <p className="s-eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {quote ? <blockquote className="s-line-q">{quote}</blockquote> : null}
      </div>
      <div className="s-line-r">
        {lead ? <p className="s-line-lead">{lead}</p> : null}
        <ul className="s-line-no">
          {negations.map((n, i) => (
            <li key={n} style={{ "--i": i } as CSSProperties}>
              <span className="s-line-x" aria-hidden="true">
                ×
              </span>
              <span>
                <span className="s-line-not">Not</span> {n.charAt(0).toLowerCase() + n.slice(1)}.
              </span>
            </li>
          ))}
        </ul>
        {body ? <p className="s-line-b">{body}</p> : null}
        {links?.length ? (
          <p className="s-line-links">
            {links.map((l) => (
              <Link key={l.href} className="inline-link" href={l.href}>
                {l.label} →
              </Link>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  );
}
