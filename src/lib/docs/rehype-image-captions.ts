import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Root, Element } from "hast";

/**
 * Markdown `![alt](src)` on its own line comes out of remark-rehype as
 * `<p><img></p>`. Since alt text is already written to describe the
 * screenshot, reuse it as a visible <figcaption> instead of asking doc
 * authors to write the caption twice.
 */
export const rehypeImageCaptions: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p" || !parent || index === undefined) return;

      // Only touch a <p> that is *purely* an image — a soft line break
      // tying trailing text to the same paragraph (no blank line in the
      // source) would otherwise get silently discarded below.
      if (node.children.length !== 1) return;
      const [only] = node.children;
      if (only.type !== "element" || only.tagName !== "img") return;

      const img = only;
      const alt = typeof img.properties?.alt === "string" ? img.properties.alt : "";

      const figure: Element = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: alt
          ? [
              img,
              {
                type: "element",
                tagName: "figcaption",
                properties: {},
                children: [{ type: "text", value: alt }],
              },
            ]
          : [img],
      };

      parent.children[index] = figure;
    });
  };
};
