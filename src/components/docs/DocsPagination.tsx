import Link from "next/link";
import type { DocNavItem } from "@/lib/docs/getDocs";
import { sectionTitle } from "@/lib/docs/getDocs";

function PaginationLink({ item, direction }: { item: DocNavItem; direction: "prev" | "next" }) {
  return (
    <Link
      href={`/docs/${item.section}/${item.slug}`}
      className={`group flex min-w-0 flex-col items-start gap-1 border border-border px-5 py-4 text-left transition-colors hover:border-accent ${
        direction === "next" ? "sm:items-end sm:text-right" : ""
      }`}
    >
      <span className="font-label text-xs uppercase tracking-[0.2em] text-ink-faint">
        {direction === "prev" ? "← Previous" : "Next →"} · {sectionTitle(item.section)}
      </span>
      <span className="truncate text-sm text-ink group-hover:text-accent">{item.title}</span>
    </Link>
  );
}

export function DocsPagination({
  prev,
  next,
}: {
  prev: DocNavItem | null;
  next: DocNavItem | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Doc pagination"
      className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
    >
      <div>{prev && <PaginationLink item={prev} direction="prev" />}</div>
      <div>{next && <PaginationLink item={next} direction="next" />}</div>
    </nav>
  );
}
