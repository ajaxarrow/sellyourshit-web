"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { DocsNavSection } from "@/lib/docs/getDocs";

export function MobileDocsNav({ sections }: { sections: DocsNavSection[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="sticky top-16 z-40 border-b border-border bg-bg/90 backdrop-blur-sm md:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-6 py-3 font-label text-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
      >
        Browse docs
        <span className="text-accent">☰</span>
      </button>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg">
          <div className="flex items-center justify-between border-b border-border px-6 py-3">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-ink-muted">
              Browse docs
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="font-label text-xs uppercase tracking-[0.2em] text-accent transition-opacity hover:opacity-70"
            >
              × Close
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-6">
            {sections.map((s) => (
              <div key={s.section} className="mb-6 last:mb-0">
                <p className="mb-2 font-label text-xs uppercase tracking-[0.2em] text-ink-faint">
                  {s.title}
                </p>
                <ul className="space-y-1">
                  {s.pages.map((p) => {
                    const href = `/docs/${p.section}/${p.slug}`;
                    const active = pathname === href;
                    return (
                      <li key={p.slug}>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          onClick={() => setOpen(false)}
                          className={`block py-1.5 text-sm transition-colors ${
                            active ? "text-accent" : "text-ink-muted hover:text-ink"
                          }`}
                        >
                          {p.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
