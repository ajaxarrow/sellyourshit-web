import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Image } from "mdast";

interface Options {
  section: string;
  slug: string;
}

/**
 * Rewrites relative image srcs (e.g. "./images/onboarding-setup/foo.png")
 * to /_docs/{section}/images/... — matching where
 * scripts/sync-docs-images.mjs copies content/docs/**\/images/** at
 * predev/prebuild time (static export can only serve from public/).
 */
export const remarkDocImages: Plugin<[Options], Root> = ({ section }) => {
  return (tree) => {
    visit(tree, "image", (node: Image) => {
      const url = node.url;
      if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(url) || url.startsWith("/")) return;

      const normalized = url.replace(/^\.\//, "");
      node.url = `/_docs/${section}/${normalized}`;
    });
  };
};
