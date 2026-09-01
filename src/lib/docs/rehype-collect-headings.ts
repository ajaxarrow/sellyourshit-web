import { visit } from "unist-util-visit";
import { toString } from "hast-util-to-string";
import GithubSlugger from "github-slugger";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

export interface Heading {
  id: string;
  depth: 2 | 3;
  text: string;
}

declare module "vfile" {
  interface DataMap {
    headings: Heading[];
  }
}

/**
 * Assigns slug ids to every h2/h3 and collects them into file.data.headings
 * for SnakeToc. Uses one Slugger instance for both, so in-page anchor ids
 * and the ids handed to the TOC can never drift apart.
 */
export const rehypeCollectHeadings: Plugin<[], Root> = () => {
  return (tree, file) => {
    const slugger = new GithubSlugger();
    const headings: Heading[] = [];

    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;

      const text = toString(node);
      const id = slugger.slug(text);
      node.properties = { ...node.properties, id };
      headings.push({ id, depth: node.tagName === "h2" ? 2 : 3, text });
    });

    file.data.headings = headings;
  };
};
