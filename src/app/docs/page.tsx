import Link from "next/link";
import { getNavSections, getSectionPages, sectionTitle } from "@/lib/docs/getDocs";
import { Container } from "@/components/ui/Container";

export default function DocsIndexPage() {
  const sections = getNavSections();

  return (
    <Container className="py-16">
      <h1 className="mb-10 font-display text-display-md">Documentation</h1>
      <div className="grid gap-8 sm:grid-cols-2">
        {sections.map((section) => {
          const pages = getSectionPages(section);
          return (
            <div key={section} className="border border-border-strong p-6">
              <h2 className="mb-3 font-display text-xl">{sectionTitle(section)}</h2>
              <ul className="space-y-1">
                {pages.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/docs/${p.section}/${p.slug}`}
                      className="text-ink-muted underline underline-offset-2 hover:text-accent"
                    >
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
