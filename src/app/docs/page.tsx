import Link from "next/link";
import { getNavSections, getSectionPages, sectionTitle } from "@/lib/docs/getDocs";
import { Container } from "@/components/ui/Container";

export default function DocsIndexPage() {
  const sections = getNavSections();

  return (
    <Container className="py-10">
      <p className="mb-4 flex items-center gap-3 font-label text-xs uppercase tracking-[0.3em] text-ink-faint">
        <span className="inline-block h-[0.35em] w-[0.35em] bg-accent" aria-hidden="true" />
        {sections.length} sections
      </p>
      <h1 className="mb-10 font-display text-display-md">Documentation</h1>
      <div className="grid gap-8 sm:grid-cols-2">
        {sections.map((section, i) => {
          const pages = getSectionPages(section);
          return (
            <div
              key={section}
              className="relative border border-border-strong p-6 pt-8 transition-colors hover:border-accent"
            >
              <span
                className="absolute top-0 left-0 h-1 w-10 bg-accent"
                aria-hidden="true"
              />
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h2 className="font-display text-xl">{sectionTitle(section)}</h2>
                <span className="font-label text-xs text-ink-faint">
                  {String(i + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="space-y-2">
                {pages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/docs/${p.section}/${p.slug}`}
                      className="group/link flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      <span className="inline-block h-1 w-1 shrink-0 bg-border-strong transition-colors group-hover/link:bg-accent" />
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
