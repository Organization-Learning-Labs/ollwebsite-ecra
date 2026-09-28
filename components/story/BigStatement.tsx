import { SplitWords } from "./SplitWords";

type BigStatementProps = {
  eyebrow?: string;
  statement: string;
  body?: string;
  items?: readonly string[];
  tone?: "tint" | "dark";
  size?: "lg" | "md";
};

/** Manifesto-style banner: one large statement, optional short body and numbered points. */
export function BigStatement({ eyebrow, statement, body, items, tone = "tint", size = "lg" }: BigStatementProps) {
  return (
    <div className={`s-big s-big--${tone} s-big--${size}`} data-reveal>
      {eyebrow ? <p className="s-eyebrow">{eyebrow}</p> : null}
      <p className="s-big-t">
        <SplitWords text={statement} />
      </p>
      {body ? <p className="s-big-b">{body}</p> : null}
      {items?.length ? (
        <ol className="s-big-list" data-stagger>
          {items.map((item, i) => (
            <li key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
