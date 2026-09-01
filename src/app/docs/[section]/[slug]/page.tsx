import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllDocParams, getDocBySlug } from "@/lib/docs/getDocs";
import { SnakeToc } from "@/components/docs/SnakeToc";
import { Container } from "@/components/ui/Container";

export function generateStaticParams() {
  return getAllDocParams();
}

interface PageProps {
  params: Promise<{ section: string; slug: string }>;
}

async function loadDoc(params: PageProps["params"]) {
  const { section, slug } = await params;
  try {
    return await getDocBySlug(section, slug);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const doc = await loadDoc(params);
  if (!doc) return {};
  return { title: `${doc.title} — sellyoshit docs` };
}

export default async function DocPage({ params }: PageProps) {
  const doc = await loadDoc(params);
  if (!doc) notFound();

  return (
    <Container bleed className="relative flex gap-16 px-10 py-16">
      <article
        className="doc-content min-w-0 flex-1 max-w-[720px]"
        dangerouslySetInnerHTML={{ __html: doc.html }}
      />
      <SnakeToc headings={doc.headings} />
    </Container>
  );
}
