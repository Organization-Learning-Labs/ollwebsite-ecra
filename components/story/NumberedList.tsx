import type { CSSProperties } from "react";

type NumberedListProps = {
  items: readonly { title: string; body?: string }[];
  cols?: 1 | 2 | 3;
  label?: string;
};

/** Visible numbered list - replaces accordions so every point is on the page. */
export function NumberedList({ items, cols = 2, label }: NumberedListProps) {
  return (
    <ol className={`s-num s-num--${cols}`} aria-label={label} data-reveal>
      {items.map((item, i) => (
        <li key={item.title} style={{ "--i": i } as CSSProperties}>
          <span className="s-num-n">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{item.title}</h3>
            {item.body ? <p>{item.body}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
