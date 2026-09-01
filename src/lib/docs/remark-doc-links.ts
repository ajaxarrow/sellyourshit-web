import fs from "node:fs";
import path from "node:path";
import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Link } from "mdast";

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

interface Options {
  section: string;
  slug: string;
}

/**
 * Rewrites relative "*.md" links (e.g. "../onboarding/onboarding-setup.md")
 * into their /docs/{section}/{slug} route, resolved relative to the
 * current file's directory — the same links also render correctly in a
 * plain GitHub/VS Code markdown preview. Throws at build time if the
 * target file doesn't exist, as a free broken-link check.
 */
export const remarkDocLinks: Plugin<[Options], Root> = ({ section, slug }) => {
  return (tree) => {
    visit(tree, "link", (node: Link) => {
      const url = node.url;
      if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(url) || url.startsWith("#") || url.startsWith("mailto:")) {
        return;
      }

      const [rawPath, hash] = url.split("#");
      if (!rawPath || !rawPath.endsWith(".md")) return;

      const currentDir = path.join(DOCS_DIR, section);
      const resolved = path.resolve(currentDir, rawPath);

      if (!fs.existsSync(resolved)) {
        throw new Error(
          `Broken doc link in content/docs/${section}/${slug}.md: "${url}" does not resolve to an existing file (${resolved})`,
        );
      }

      const relFromDocs = path.relative(DOCS_DIR, resolved).replace(/\\/g, "/");
      const targetSection = relFromDocs.split("/")[0];
      const targetSlug = path.basename(relFromDocs, ".md");

      node.url = `/docs/${targetSection}/${targetSlug}${hash ? `#${hash}` : ""}`;
    });
  };
};
