import Link from "next/link";
import { getNavSections, getSectionPages, sectionTitle } from "@/lib/docs/getDocs";

export function DocsSidebar() {
  const sections = getNavSections();

  return (
    <nav className="hidden w-56 shrink-0 border-r border-border px-6 py-28 md:block">
      {sections.map((section) => {
        const pages = getSectionPages(section);
        return (
          <div key={section} className="mb-8">
            <p className="mb-2 font-label text-xs uppercase tracking-[0.2em] text-ink-faint">
              {sectionTitle(section)}
            </p>
            <ul className="space-y-1">
              {pages.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/docs/${p.section}/${p.slug}`}
                    className="block py-0.5 text-sm text-ink-muted hover:text-accent"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
