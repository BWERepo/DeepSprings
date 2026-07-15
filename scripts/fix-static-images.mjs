// next/og's icon.tsx/opengraph-image.tsx conventions produce extensionless
// files (e.g. out/icon, out/opengraph-image) referenced via a query string.
// Next's own server sets the Content-Type header correctly for these, but a
// plain static host (Apache on Hostinger) infers Content-Type from the file
// extension — an extensionless file gets served as
// application/octet-stream and browsers/link-preview crawlers won't render
// it as an image. This script renames the generated files to add a .png
// extension and rewrites the matching href/content attributes in every
// exported HTML file to point at the renamed file (dropping the query
// string, which a static host ignores anyway).
import { readdir, rename, readFile, writeFile, stat } from "node:fs/promises";
import { join, relative } from "node:path";

const OUT_DIR = join(import.meta.dirname, "..", "out");
const IMAGE_ROUTE_NAMES = ["icon", "apple-icon", "opengraph-image"];

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const allFiles = await walk(OUT_DIR);

  // Rename extensionless image-route files to add .png, tracking old->new
  // remote-path pairs (POSIX-style, relative to OUT_DIR) for the HTML rewrite.
  const renames = [];
  for (const file of allFiles) {
    const base = file.split(/[\\/]/).pop();
    if (IMAGE_ROUTE_NAMES.includes(base)) {
      const info = await stat(file);
      if (!info.isFile()) continue;
      const newFile = `${file}.png`;
      await rename(file, newFile);
      const oldRel = relative(OUT_DIR, file).replace(/\\/g, "/");
      const newRel = relative(OUT_DIR, newFile).replace(/\\/g, "/");
      renames.push([oldRel, newRel]);
    }
  }

  if (renames.length === 0) {
    console.log("fix-static-images: no extensionless image routes found.");
    return;
  }

  const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
  let editedCount = 0;
  for (const file of htmlFiles) {
    let text = await readFile(file, "utf8");
    let changed = false;
    for (const [oldRel, newRel] of renames) {
      // Matches href="/icon?hash" or content="https://host/opengraph-image?hash"
      // — always followed by a query string in Next's generated HTML.
      const pattern = new RegExp(
        `(["'/])${oldRel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\?[a-zA-Z0-9]*(["'])`,
        "g"
      );
      const next = text.replace(pattern, `$1${newRel}$2`);
      if (next !== text) changed = true;
      text = next;
    }
    if (changed) {
      await writeFile(file, text, "utf8");
      editedCount++;
    }
  }

  console.log(
    `fix-static-images: renamed ${renames.length} file(s), updated ${editedCount} HTML file(s).`
  );
}

main();
