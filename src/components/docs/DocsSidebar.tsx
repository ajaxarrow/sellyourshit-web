"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { DocsNavSection } from "@/lib/docs/getDocs";

export function DocsSidebar({ sections }: { sections: DocsNavSection[] }) {
  const pathname = usePathname();

  return (
    <nav className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 self-start overflow-y-auto border-r border-border px-6 py-10 md:block">
      {sections.map((s) => (
        <div key={s.section} className="mb-9">
          <p className="mb-3 font-label text-xs uppercase tracking-[0.25em] text-ink-faint">
            {s.title}
          </p>
          <ul className="flex flex-col gap-0.5 border-l border-border">
            {s.pages.map((p) => {
              const href = `/docs/${p.section}/${p.slug}`;
              const active = pathname === href;
              return (
                <li key={p.slug}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block py-1.5 pl-4 font-body text-sm transition-colors ${
                      active
                        ? "text-accent"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 -left-px h-full w-0.5 transition-colors ${
                        active ? "bg-accent" : "bg-transparent group-hover:bg-border-strong"
                      }`}
                    />
                    {p.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
