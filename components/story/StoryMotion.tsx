"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TARGETS = "[data-reveal]:not(.is-in), [data-stagger]:not(.is-in)";

/**
 * Reveals `[data-reveal]` / `[data-stagger]` blocks once as they scroll into view,
 * and indexes stagger children with `--i`. Blocks React mounts later are picked up too,
 * so a re-rendered section never stays hidden. Renders nothing.
 */
export function StoryMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-on");
    root.classList.remove("reveal-all");

    const index = (scope: ParentNode) => {
      scope.querySelectorAll<HTMLElement>("[data-stagger]").forEach((parent) => {
        Array.from(parent.children).forEach((child, i) => {
          (child as HTMLElement).style.setProperty("--i", String(i));
        });
      });
    };

    const collect = (scope: ParentNode) => {
      const found = Array.from(scope.querySelectorAll<HTMLElement>(TARGETS));
      if (scope instanceof HTMLElement && scope.matches(TARGETS)) found.push(scope);
      return found;
    };

    index(document);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      collect(document).forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || entry.target.classList.contains("is-in")) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    collect(document).forEach((el) => io.observe(el));

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          index(node);
          collect(node).forEach((el) => io.observe(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
