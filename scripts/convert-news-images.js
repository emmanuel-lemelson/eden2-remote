/* eslint-disable no-console */
/**
 * Convert newsletter images to optimized WebP variants.
 * Generates 1200w, 800w, and 400w sizes at high quality.
 */
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.resolve(__dirname, "..", "public", "newsletter 1");

// Explicit mapping to avoid issues with special characters in filenames
const inputs = [
  {
    src: "DJI_0005.jpg",
    baseOut: "DJI_0005",
  },
  {
    src: "IMG_0954.jpg",
    baseOut: "IMG_0954",
  },
  {
    src: "Screenshot 2025-11-07 at 6.14.59 PM.png",
    baseOut: "Screenshot-2025-11-07-61459PM",
  },
  {
    src: "Screenshot 2025-11-07 at 6.15.19 PM.png",
    baseOut: "Screenshot-2025-11-07-61519PM",
  },
];

const targets = [
  { width: 1200, suffix: "@1200w.webp" },
  { width: 800, suffix: "@800w.webp" },
  { width: 400, suffix: "@400w.webp" },
];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function convertOne(input) {
  const inPath = path.join(baseDir, input.src);
  const results = [];
  for (const t of targets) {
    const outName = `${input.baseOut}${t.suffix}`;
    const outPath = path.join(baseDir, outName);
    await sharp(inPath)
      .resize({ width: t.width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 6 })
      .toFile(outPath);
    results.push({ width: t.width, path: outPath });
  }
  return results;
}

async function main() {
  await ensureDir(baseDir);
  console.log(`Converting images in: ${baseDir}`);
  for (const img of inputs) {
    try {
      const outputs = await convertOne(img);
      console.log(
        `✓ ${img.src} -> ${outputs
          .map((o) => path.basename(o.path))
          .join(", ")}`
      );
    } catch (err) {
      console.error(`✗ Failed to convert ${img.src}:`, err);
      process.exitCode = 1;
    }
  }
}

main();


