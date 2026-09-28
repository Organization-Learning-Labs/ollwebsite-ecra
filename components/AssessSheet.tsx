"use client";

import { useEffect, useRef } from "react";
import { AssessOptions } from "@/components/AssessOptions";

type AssessSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function AssessSheet({ open, onClose }: AssessSheetProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.classList.add("sheet-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("sheet-open");
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div className={`assess-sheet${open ? " open" : ""}`} aria-hidden={!open}>
      <button type="button" className="assess-sheet-backdrop" aria-label="Close" tabIndex={-1} onClick={onClose} />
      <div
        className="assess-sheet-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assess-sheet-title"
        inert={!open}
      >
        <span className="assess-sheet-grip" aria-hidden="true" />
        <div className="assess-sheet-head">
          <p id="assess-sheet-title">Start at the level you decide at</p>
          <button type="button" ref={closeRef} className="assess-sheet-close" aria-label="Close" onClick={onClose}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <AssessOptions onPick={onClose} />
      </div>
    </div>
  );
}
