import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { docFileExists, getAdjacentDocs, getAllDocParams, getDocBySlug } from "@/lib/docs/getDocs";
import { SnakeToc } from "@/components/docs/SnakeToc";
import { DocsPagination } from "@/components/docs/DocsPagination";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return getAllDocParams();
}

interface PageProps {
  params: Promise<{ section: string; slug: string }>;
}

async function loadDoc(params: PageProps["params"]) {
  const { section, slug } = await params;
  if (!docFileExists(section, slug)) return null;
  return getDocBySlug(section, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = await loadDoc(params);
  if (!doc) return {};
  return { title: `${doc.title} — sellyoshit docs` };
}

export default async function DocPage({ params }: PageProps) {
  const doc = await loadDoc(params);
  if (!doc) notFound();
  const { prev, next } = getAdjacentDocs(doc.section, doc.slug);

  return (
    <Container
      bleed
      className="relative flex gap-8 px-4 py-10 sm:px-6 md:gap-16 md:px-10 md:py-10"
    >
      <div className="min-w-0 flex-1 max-w-[720px]">
        <article className="doc-content" dangerouslySetInnerHTML={{ __html: doc.html }} />
        <DocsPagination prev={prev} next={next} />
      </div>
      <SnakeToc headings={doc.headings} />
    </Container>
  );
}
