/**
 * Post-build cleanup for the static export.
 *
 * These gallery folders are dev/tooling-only (rollback archives and audit
 * sources). They are referenced by local scripts (enhance-photo.js,
 * archive-retired.js, rebuild-quality-audit.js) so we keep them in
 * public/gallery, but they should never be deployed — pruning them from out/
 * removes ~9MB of dead weight from production without touching the sources.
 */
const fs = require("fs");
const path = require("path");

// The static export lands in the configured distDir. next.config.ts uses
// ".next-prod" in production and ".next" otherwise; both place exported assets
// at the distDir root. We prune from whichever export dir actually exists.
const candidateRoots = [".next-prod", ".next", "out"];

const devOnlyDirs = ["lowres_archive", "retired-photos"];

let removed = 0;
for (const root of candidateRoots) {
  const galleryRoot = path.join(process.cwd(), root, "gallery");
  if (!fs.existsSync(galleryRoot)) continue;
  for (const dir of devOnlyDirs) {
    const target = path.join(galleryRoot, dir);
    if (fs.existsSync(target)) {
      fs.rmSync(target, { recursive: true, force: true });
      console.log(
        `Pruned ${path.relative(process.cwd(), target)} from build output`,
      );
      removed += 1;
    }
  }
}

if (removed === 0) {
  console.log("prune-output: nothing to prune (no dev-only dirs in export).");
}
