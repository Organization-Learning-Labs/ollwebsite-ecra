import type { CSSProperties } from "react";

type WordGridProps = {
  items: readonly { title: string; line: string; sub?: string }[];
};

/** Values-style grid: a bold word, a one-line principle and an optional smaller line. */
export function WordGrid({ items }: WordGridProps) {
  return (
    <ul className="s-words" data-reveal>
      {items.map((item, i) => (
        <li key={item.title} style={{ "--i": i } as CSSProperties}>
          <h3>{item.title}</h3>
          <p className="s-words-line">{item.line}</p>
          {item.sub ? <p className="s-words-sub">{item.sub}</p> : null}
        </li>
      ))}
    </ul>
  );
}
