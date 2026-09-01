"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SnakeToc.module.css";
import type { Heading } from "@/lib/docs/rehype-collect-headings";

// Same thresholds as the AboutView.vue reference widget: a heading counts
// as "visible" once its bottom has cleared 10% down the viewport and its
// top hasn't yet reached the bottom 20%.
const TOP_MARGIN = 0.1;
const BOTTOM_MARGIN = 0.2;

interface TocItem {
  id: string;
  pathStart: number;
  pathEnd: number;
}

export function SnakeToc({ headings }: { headings: Heading[] }) {
  const pathRef = useRef<SVGPathElement>(null);
  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const tocItemsRef = useRef<TocItem[]>([]);
  const pathLengthRef = useRef(0);
  const lastRangeRef = useRef({ start: 0, end: 0 });
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (headings.length === 0) return;

    const sync = () => {
      const path = pathRef.current;
      if (!path) return;
      const windowHeight = window.innerHeight;

      let pathStart = pathLengthRef.current;
      let pathEnd = 0;
      let visibleCount = 0;
      const nextVisible = new Set<string>();

      for (const item of tocItemsRef.current) {
        const target = document.getElementById(item.id);
        if (!target) continue;
        const rect = target.getBoundingClientRect();
        if (
          rect.bottom > windowHeight * TOP_MARGIN &&
          rect.top < windowHeight * (1 - BOTTOM_MARGIN)
        ) {
          pathStart = Math.min(item.pathStart, pathStart);
          pathEnd = Math.max(item.pathEnd, pathEnd);
          visibleCount += 1;
          nextVisible.add(item.id);
        }
      }

      if (visibleCount > 0 && pathStart < pathEnd) {
        if (pathStart !== lastRangeRef.current.start || pathEnd !== lastRangeRef.current.end) {
          path.setAttribute("stroke-dashoffset", "1");
          path.setAttribute(
            "stroke-dasharray",
            `1, ${pathStart}, ${pathEnd - pathStart}, ${pathLengthRef.current}`,
          );
          path.setAttribute("opacity", "1");
        }
      } else {
        path.setAttribute("opacity", "0");
      }

      lastRangeRef.current = { start: pathStart, end: pathEnd };
      setVisibleIds(nextVisible);
    };

    const drawPath = () => {
      const path = pathRef.current;
      if (!path) return;

      const d: (string | number)[] = [];
      let pathIndent: number | undefined;
      const items: TocItem[] = [];

      headings.forEach((h, i) => {
        const li = itemRefs.current[h.id];
        const anchor = li?.querySelector<HTMLAnchorElement>("a");
        if (!li || !anchor) return;

        const x = anchor.offsetLeft - 5;
        const y = anchor.offsetTop;
        const height = anchor.offsetHeight;

        const item: TocItem = { id: h.id, pathStart: 0, pathEnd: 0 };

        if (i === 0) {
          d.push("M", x, y, "L", x, y + height);
          item.pathStart = 0;
        } else {
          if (pathIndent !== x) d.push("L", pathIndent as number, y);
          d.push("L", x, y);
          path.setAttribute("d", d.join(" "));
          item.pathStart = path.getTotalLength() || 0;
          d.push("L", x, y + height);
        }

        pathIndent = x;
        path.setAttribute("d", d.join(" "));
        item.pathEnd = path.getTotalLength();

        items.push(item);
      });

      tocItemsRef.current = items;
      pathLengthRef.current = path.getTotalLength();
      sync();
    };

    drawPath();
    window.addEventListener("resize", drawPath);
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener("resize", drawPath);
      window.removeEventListener("scroll", sync);
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Table of contents">
      <ul>
        {headings.map((h) => (
          <li
            key={h.id}
            ref={(el) => {
              itemRefs.current[h.id] = el;
            }}
            className={[h.depth === 3 ? styles.sub : "", visibleIds.has(h.id) ? styles.visible : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
      <svg className={styles.tocMarker} width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <path
          ref={pathRef}
          stroke="var(--color-accent)"
          strokeWidth={3}
          fill="transparent"
          strokeDasharray="0, 0, 0, 1000"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(-0.5, -0.5)"
        />
      </svg>
    </nav>
  );
}
