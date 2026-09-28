"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Reveals `[data-reveal]` / `[data-stagger]` blocks once as they scroll into view,
 * and indexes stagger children with `--i`. Renders nothing.
 */
export function StoryMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-on");
    root.classList.remove("reveal-all");

    document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
      Array.from(parent.children).forEach((child, i) => {
        (child as HTMLElement).style.setProperty("--i", String(i));
      });
    });

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    let remaining = targets.length;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.target.classList.contains("is-in")) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
          remaining -= 1;
        }
        if (remaining <= 0) io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
