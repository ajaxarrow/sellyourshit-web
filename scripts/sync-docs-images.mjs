// Copies content/docs/{section}/images/** into public/_docs/{section}/images/**
// so images authored alongside the markdown are reachable under static
// export (which can only serve files under public/). Run automatically via
// the predev/prebuild npm scripts — re-run it after adding a new doc image.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const docsDir = path.join(root, "content", "docs");
const publicDir = path.join(root, "public", "_docs");

function walkFiles(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkFiles(full, onFile);
    else onFile(full);
  }
}

function main() {
  if (!fs.existsSync(docsDir)) return;

  const sections = fs
    .readdirSync(docsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory());

  let copied = 0;

  for (const section of sections) {
    const sectionDir = path.join(docsDir, section.name);
    const imagesDir = path.join(sectionDir, "images");
    if (!fs.existsSync(imagesDir)) continue;

    walkFiles(imagesDir, (file) => {
      const rel = path.relative(sectionDir, file);
      const dest = path.join(publicDir, section.name, rel);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(file, dest);
      copied += 1;
    });
  }

  console.log(`[sync-docs-images] copied ${copied} image(s) from content/docs into public/_docs`);
}

main();
