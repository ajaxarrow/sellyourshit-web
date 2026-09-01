import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { remarkDocLinks } from "./remark-doc-links";
import { remarkDocImages } from "./remark-doc-images";
import { rehypeCollectHeadings, type Heading } from "./rehype-collect-headings";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

export interface DocMeta {
  section: string;
  slug: string;
  title: string;
  order: number;
}

export interface DocPage extends DocMeta {
  html: string;
  headings: Heading[];
}

/** The nav.json content — a flat array of section folder ids, in display order. */
export function getNavSections(): string[] {
  const raw = fs.readFileSync(path.join(DOCS_DIR, "nav.json"), "utf8");
  return JSON.parse(raw) as string[];
}

function docSlugsInSection(section: string): string[] {
  const dir = path.join(DOCS_DIR, section);
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllDocParams(): { section: string; slug: string }[] {
  return getNavSections().flatMap((section) =>
    docSlugsInSection(section).map((slug) => ({ section, slug })),
  );
}

function readRaw(section: string, slug: string) {
  const filePath = path.join(DOCS_DIR, section, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function extractTitle(content: string, frontmatterTitle?: unknown): string {
  if (typeof frontmatterTitle === "string" && frontmatterTitle.trim()) {
    return frontmatterTitle.trim();
  }
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : "Untitled";
}

function extractOrder(order: unknown): number {
  return typeof order === "number" ? order : 0;
}

/** Section display title, when nav.json's id isn't already presentable ("onboarding" -> "Onboarding"). */
export function sectionTitle(section: string): string {
  return section
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function getSectionPages(section: string): DocMeta[] {
  return docSlugsInSection(section)
    .map((slug) => {
      const { data, content } = readRaw(section, slug);
      return {
        section,
        slug,
        title: extractTitle(content, data.title),
        order: extractOrder(data.order),
      };
    })
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getDocBySlug(section: string, slug: string): Promise<DocPage> {
  const { data, content } = readRaw(section, slug);
  const title = extractTitle(content, data.title);

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkDocLinks, { section, slug })
    .use(remarkDocImages, { section, slug })
    .use(remarkRehype)
    .use(rehypeCollectHeadings)
    .use(rehypeStringify)
    .process(content);

  return {
    section,
    slug,
    title,
    order: extractOrder(data.order),
    html: String(file),
    headings: file.data.headings ?? [],
  };
}
