"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { SitePhoto } from "@/lib/photos";

type StreamItem = { photo: SitePhoto; title: string; line: string };

type ImageStreamProps = {
  items: readonly StreamItem[];
  label: string;
  interval?: number;
  sizes?: string;
  className?: string;
};

/**
 * Auto-advancing crossfade of journey photos with captions and progress ticks.
 * The active tick's fill animation drives the advance, so hover pauses both together
 * and reduced motion (no animation) leaves the stream still.
 */
export function ImageStream({
  items,
  label,
  interval = 4800,
  sizes = "(max-width: 960px) 100vw, 560px",
  className = "",
}: ImageStreamProps) {
  const [idx, setIdx] = useState(0);
  const [hold, setHold] = useState(false);
  const current = items[idx];

  return (
    <div
      className={`istream${hold ? " is-held" : ""}${className ? ` ${className}` : ""}`}
      style={{ "--stream-ms": `${interval}ms` } as CSSProperties}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
      onBlur={() => setHold(false)}
    >
      <div className="istream-stage">
        {items.map((it, i) => (
          <figure key={it.photo.src} className={`istream-slide${i === idx ? " on" : ""}`} aria-hidden={i !== idx}>
            <Image
              src={it.photo.src}
              alt={it.photo.alt}
              fill
              sizes={sizes}
              style={it.photo.position ? { objectPosition: it.photo.position } : undefined}
            />
          </figure>
        ))}
        <div className="istream-cap" aria-live="polite" key={idx}>
          <span className="istream-n">{String(idx + 1).padStart(2, "0")}</span>
          <strong>{current.title}</strong>
          <span>{current.line}</span>
        </div>
      </div>
      <div className="istream-ticks" role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <button
            key={it.title}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={`${i + 1}. ${it.title}`}
            className={i < idx ? "is-done" : undefined}
            onClick={() => setIdx(i)}
          >
            <span className="istream-bar">
              {i === idx ? (
                <i key={`run-${idx}`} onAnimationEnd={() => setIdx((n) => (n + 1) % items.length)} />
              ) : (
                <i />
              )}
            </span>
            <span className="istream-t">{it.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
