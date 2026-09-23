import { type ReactNode } from 'react';

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    parts.push(
      <strong key={`${keyPrefix}-b-${i}`} className="font-semibold">
        {match[1]}
      </strong>
    );
    last = match.index + match[0].length;
    i += 1;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }

  return parts.length > 0 ? parts : [text];
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'ol' | 'ul'; items: string[] };

function parseBlocks(raw: string): Block[] {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: { type: 'ol' | 'ul'; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const text = paragraph.join(' ').trim();
    if (text) blocks.push({ type: 'p', text });
    paragraph = [];
  };

  const flushList = () => {
    if (!list || list.items.length === 0) {
      list = null;
      return;
    }
    blocks.push(list);
    list = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();
    // Keep lists together across blank lines (avoids every item showing as "1.")
    if (trimmed === '') {
      if (!list) flushParagraph();
      continue;
    }

    const ol = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    const ul = trimmed.match(/^[-*•]\s+(.*)$/);

    if (ol) {
      flushParagraph();
      if (!list || list.type !== 'ol') {
        flushList();
        list = { type: 'ol', items: [] };
      }
      const itemText = ol[2].trim();
      if (itemText) list.items.push(itemText);
      continue;
    }

    if (ul) {
      flushParagraph();
      if (!list || list.type !== 'ul') {
        flushList();
        list = { type: 'ul', items: [] };
      }
      const itemText = ul[1].trim();
      if (itemText) list.items.push(itemText);
      continue;
    }

    // Continuation of previous list item (indented / wrapped line)
    if (list && /^\s{2,}/.test(line)) {
      const last = list.items.length - 1;
      if (last >= 0) {
        list.items[last] = `${list.items[last]} ${trimmed}`;
      }
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();
  return blocks;
}

/** Lightweight markdown for assistant replies: bold, lists, paragraphs. */
export function BotMessageContent({
  text,
  variant = 'assistant',
}: {
  text: string;
  variant?: 'assistant' | 'user';
}) {
  if (variant === 'user') {
    return <span className="whitespace-pre-wrap">{text}</span>;
  }

  const blocks = parseBlocks(text);

  return (
    <div className="space-y-2.5 break-words text-[#1E293B]">
      {blocks.map((block, bi) => {
        if (block.type === 'p') {
          return (
            <p key={`p-${bi}`} className="m-0">
              {renderInline(block.text, `p-${bi}`)}
            </p>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol
              key={`l-${bi}`}
              className="m-0 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary-700"
              start={1}
            >
              {block.items.map((item, ii) => (
                <li key={`l-${bi}-${ii}`} className="pl-1">
                  {renderInline(item, `l-${bi}-${ii}`)}
                </li>
              ))}
            </ol>
          );
        }

        return (
          <ul
            key={`l-${bi}`}
            className="m-0 list-disc space-y-2 pl-5 marker:text-primary-600"
          >
            {block.items.map((item, ii) => (
              <li key={`l-${bi}-${ii}`} className="pl-1">
                {renderInline(item, `l-${bi}-${ii}`)}
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
