const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { execSync } = require("child_process");

const rootDir = process.cwd();
const standardDir = path.join(rootDir, "public", "gallery", "Eden-Site Photos");
const enhancedDir = path.join(rootDir, "public", "gallery", "enhanced");
const archiveDir = path.join(rootDir, "public", "gallery", "lowres_archive");
const captionsPath = path.join(rootDir, "src", "data", "captions.json");
const brainDirs = [
  "/Users/emmanuel/.gemini/antigravity-ide/brain",
  "/Users/emmanuel/.gemini/antigravity/brain"
];

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = 1;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Find the most recent generated PNG file for a photo ID in the brain folder
function findNewestGeneratedPng(id) {
  let newestFile = null;
  let newestMtime = 0;

  function traverse(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.isFile() && entry.name.startsWith(`enhanced_${id}`) && entry.name.endsWith(".png")) {
          const stat = fs.statSync(fullPath);
          if (stat.mtimeMs > newestMtime) {
            newestMtime = stat.mtimeMs;
            newestFile = fullPath;
          }
        }
      }
    } catch (err) {
      // Ignore directory read/access errors for missing/blocked dirs
    }
  }

  for (const bDir of brainDirs) {
    if (fs.existsSync(bDir)) {
      traverse(bDir);
    }
  }

  return newestFile;
}

// Prepare photos for enhancement
async function preparePhotos(ids) {
  console.log(`\n🚀 PREPARING ${ids.length} PHOTOS FOR ENHANCEMENT...\n`);

  // Load captions for helper prompts
  let captions = {};
  if (fs.existsSync(captionsPath)) {
    try {
      captions = JSON.parse(fs.readFileSync(captionsPath, "utf-8"));
    } catch (err) {
      console.warn("⚠️ Could not load captions.json:", err.message);
    }
  }

  for (const id of ids) {
    const avifFilename = `${id}.avif`;
    const webpFilename = `${id}.webp`;
    let ext = "avif";
    let srcPath = path.join(standardDir, avifFilename);

    if (!fs.existsSync(srcPath)) {
      srcPath = path.join(standardDir, webpFilename);
      ext = "webp";
    }

    if (!fs.existsSync(srcPath)) {
      console.error(`❌ Source image for ID ${id} not found in ${standardDir} (.avif or .webp)`);
      continue;
    }

    const refPngPath = path.join(standardDir, `${id}_ref.png`);
    console.log(`📸 Converted ${id}.${ext} to temporary reference PNG: ${refPngPath}`);
    
    // Perform conversion
    await sharp(srcPath).png().toFile(refPngPath);

    // Retrieve caption and build custom prompt
    const captionKey = `${id}.${ext}`;
    const caption = captions[captionKey] || captions[`${id}.avif`] || captions[`${id}.webp`] || "";
    
    console.log(`\n📝 AI Upscaling Prompt Helper for Photo ${id}:`);
    console.log("--------------------------------------------------------------------------------");
    console.log(`Please enhance the following photo to professional DSLR quality matching the Eden Estate "Pro Grade" aesthetic:`);
    console.log(`\n- Reference Path: ${refPngPath}`);
    if (caption) {
      console.log(`- Caption Context: ${caption}`);
      
      // Build a premium custom visual prompt
      const cleanCaption = caption.replace(/\[Season:.*?\]/g, "").replace(/\[Lighting:.*?\]/g, "").replace(/\[Content:.*?\]/g, "").trim();
      const seasonMatch = caption.match(/\[Season:\s*(.*?)\]/i);
      const lightingMatch = caption.match(/\[Lighting:\s*(.*?)\]/i);
      const season = seasonMatch ? seasonMatch[1] : "Summer";
      const lighting = lightingMatch ? lightingMatch[1] : "Bright, natural daylight";
      
      console.log(`\n- Generated Prompt for generate_image:`);
      console.log(`  "Professional DSLR high-resolution photo of the Eden Estate. ${cleanCaption} [Season: ${season}] [Lighting: ${lighting}]. Rich, crisp textures, beautifully staged, professional luxury real estate photography. Image-to-image upscale: preserve the exact physical room structure, furniture placement, building outlines, and layout from the input photo exactly, enhancing only the resolution, clarity, color richness, and visual quality."`);
    } else {
      console.log(`\n- Generated Prompt for generate_image:`);
      console.log(`  "Professional DSLR high-resolution architectural photo of the Eden Estate. Rich, crisp textures, beautifully staged, professional luxury real estate photography. Image-to-image upscale: preserve the exact physical structure and layout from the input photo exactly, enhancing only the resolution, clarity, and visual quality."`);
    }
    console.log("--------------------------------------------------------------------------------\n");
  }

  console.log("✅ Preparation complete. Please run generate_image on the generated reference PNG files.");
}

// Finalize photos after enhancement
async function finalizePhotos(ids) {
  console.log(`\n🚀 FINALIZING ${ids.length} ENHANCED PHOTOS...\n`);

  fs.mkdirSync(enhancedDir, { recursive: true });
  fs.mkdirSync(archiveDir, { recursive: true });

  let successCount = 0;

  for (const id of ids) {
    const newestPng = findNewestGeneratedPng(id);
    if (!newestPng) {
      console.error(`❌ Could not find any generated PNG file for ID ${id} in brain directory.`);
      continue;
    }

    console.log(`✨ Found upscaled source for ID ${id}: ${newestPng}`);
    
    // Save to enhanced AVIF
    const destAvifPath = path.join(enhancedDir, `${id}.avif`);
    console.log(`🔄 Converting upscaled PNG to optimized AVIF: ${destAvifPath}`);
    
    await sharp(newestPng)
      .avif({ quality: 80, effort: 4 })
      .toFile(destAvifPath);

    // Archive original lowres
    let origExt = "avif";
    let origPath = path.join(standardDir, `${id}.avif`);
    if (!fs.existsSync(origPath)) {
      origPath = path.join(standardDir, `${id}.webp`);
      origExt = "webp";
    }

    if (fs.existsSync(origPath)) {
      const destArchivePath = path.join(archiveDir, `${id}.${origExt}`);
      console.log(`📦 Archiving original lowres: ${origPath} -> ${destArchivePath}`);
      fs.renameSync(origPath, destArchivePath);
    }

    // Delete stale responsive webp files in standard directory
    const filesInStandard = fs.readdirSync(standardDir);
    for (const file of filesInStandard) {
      if (file.startsWith(`${id}@`) && file.endsWith(".webp")) {
        const filePath = path.join(standardDir, file);
        console.log(`🗑️ Deleting stale responsive file: ${filePath}`);
        fs.unlinkSync(filePath);
      }
    }

    // Delete temporary references
    const refPng = path.join(standardDir, `${id}_ref.png`);
    if (fs.existsSync(refPng)) {
      console.log(`🗑️ Deleting temporary reference PNG: ${refPng}`);
      fs.unlinkSync(refPng);
    }
    const standardPng = path.join(standardDir, `${id}.png`);
    if (fs.existsSync(standardPng)) {
      console.log(`🗑️ Deleting temporary draft PNG: ${standardPng}`);
      fs.unlinkSync(standardPng);
    }

    successCount++;
    console.log(`✅ Photo ${id} successfully swapped and finalized!\n`);
  }

  if (successCount > 0) {
    console.log("⚡ Rebuilding Gallery JSON Data...");
    execSync("node scripts/generate-gallery-data.js", { stdio: "inherit" });

    console.log("\n⚡ Rebuilding Quality Audit Dashboard V2...");
    execSync("node scripts/rebuild-quality-audit.js", { stdio: "inherit" });

    console.log("\n🎉 Rebuild complete! All assets are fully upscaled and registered.");
  } else {
    console.warn("⚠️ No photos were successfully finalized. Skipping asset rebuild.");
  }
}

// CLI entrypoint
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log("Usage:");
    console.log("  node scripts/enhance-photo.js --prepare <ID1> <ID2> <ID3> ...");
    console.log("  node scripts/enhance-photo.js --finalize <ID1> <ID2> <ID3> ...");
    process.exit(1);
  }

  const mode = args[0];
  const ids = args.slice(1);

  if (mode === "--prepare") {
    await preparePhotos(ids);
  } else if (mode === "--finalize") {
    await finalizePhotos(ids);
  } else {
    console.error(`❌ Unknown mode: ${mode}. Use --prepare or --finalize.`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error("❌ Orchestrator script encountered an error:", err);
  process.exit(1);
});
