'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';

export type AutocompleteOption = {
  id: string;
  label: string;
  hint?: string;
};

const DEFAULT_MAX_VISIBLE = 40;

export function AutocompleteField({
  value,
  options,
  placeholder,
  disabled,
  loading,
  loadingMore,
  emptyText = 'No matches',
  maxVisible = DEFAULT_MAX_VISIBLE,
  hasMore,
  onLoadMore,
  onSelect,
}: {
  value: AutocompleteOption | null;
  options: AutocompleteOption[];
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
  loadingMore?: boolean;
  emptyText?: string;
  /** Max options shown in the list. Use 0 for no cap (search still filters). */
  maxVisible?: number;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSelect: (option: AutocompleteOption | null) => void;
}) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value?.label ?? '');
  const [highlight, setHighlight] = useState(0);

  useEffect(() => {
    setQuery(value?.label ?? '');
  }, [value?.id, value?.label]);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? options.filter(
          (option) =>
            option.label.toLowerCase().includes(q) ||
            option.hint?.toLowerCase().includes(q)
        )
      : options;
    if (maxVisible <= 0) return filtered;
    return filtered.slice(0, maxVisible);
  }, [maxVisible, options, query]);

  const showList = open && !disabled && !loading;

  const handleListScroll = () => {
    const el = listRef.current;
    if (!el || !onLoadMore || !hasMore || loadingMore) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 16) {
      onLoadMore();
    }
  };

  const pick = (option: AutocompleteOption) => {
    onSelect(option);
    setQuery(option.label);
    setOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="oll-ac">
      <input
        ref={inputRef}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        autoComplete="off"
        disabled={disabled}
        value={loading ? 'Loading…' : query}
        placeholder={placeholder}
        className="oll-form-field"
        onFocus={() => {
          if (!disabled && !loading) setOpen(true);
        }}
        onChange={(event) => {
          const next = event.target.value;
          setQuery(next);
          setHighlight(0);
          setOpen(true);
          if (value && next.trim() !== value.label) onSelect(null);
        }}
        onKeyDown={(event) => {
          if (!showList) return;
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setHighlight((i) => Math.min(i + 1, Math.max(matches.length - 1, 0)));
          } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setHighlight((i) => Math.max(i - 1, 0));
          } else if (event.key === 'Enter') {
            const option = matches[highlight];
            if (option) {
              event.preventDefault();
              pick(option);
            }
          } else if (event.key === 'Escape') {
            setOpen(false);
          }
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setOpen(false);
            if (value || !query.trim() || options.length === 0) return;
            const q = query.trim().toLowerCase();
            const exact = options.find((option) => option.label.toLowerCase() === q);
            const startsWith = options.find((option) =>
              option.label.toLowerCase().startsWith(q)
            );
            const onlyMatch = matches.length === 1 ? matches[0] : null;
            const best = exact || onlyMatch || startsWith;
            if (best) pick(best);
          }, 120);
        }}
      />
      {showList ? (
        <ul
          id={listId}
          ref={listRef}
          role="listbox"
          className="oll-ac-list"
          onScroll={handleListScroll}
        >
          {matches.length === 0 ? (
            <li className="oll-ac-empty">{emptyText}</li>
          ) : (
            matches.map((option, index) => (
              <li key={option.id} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={index === highlight}
                  className="oll-ac-option"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(option)}
                  onMouseEnter={() => setHighlight(index)}
                >
                  <span>{option.label}</span>
                  {option.hint ? <small>{option.hint}</small> : null}
                </button>
              </li>
            ))
          )}
          {loadingMore ? <li className="oll-ac-empty">Loading more…</li> : null}
        </ul>
      ) : null}
    </div>
  );
}
