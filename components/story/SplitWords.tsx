import { Fragment, type CSSProperties } from "react";

type SplitWordsProps = {
  text: string;
  /** A word, or a phrase of consecutive words, to mark with the amber highlighter sweep. */
  highlight?: string;
};

const norm = (w: string) => w.replace(/[^\p{L}\p{N}-]/gu, "").toLowerCase();

function markedIndexes(words: string[], highlight?: string): Set<number> {
  const marked = new Set<number>();
  const target = highlight?.split(" ").map(norm).filter(Boolean) ?? [];
  if (!target.length) return marked;
  for (let i = 0; i + target.length <= words.length; i++) {
    if (target.every((t, j) => norm(words[i + j]) === t)) {
      for (let j = 0; j < target.length; j++) marked.add(i + j);
    }
  }
  return marked;
}

/** Renders text as clipped word spans so CSS can animate headlines word by word. */
export function SplitWords({ text, highlight }: SplitWordsProps) {
  const words = text.split(" ");
  const marked = markedIndexes(words, highlight);
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {i > 0 ? " " : null}
          <span className="w" style={{ "--i": i } as CSSProperties}>
            <span className={marked.has(i) ? "w-in s-mark" : "w-in"}>{word}</span>
          </span>
        </Fragment>
      ))}
    </>
  );
}
