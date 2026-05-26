const fs = require("fs");
const path = require("path");

const retiredListPath = path.join(
  "/Users/emmanuel/.gemini/antigravity-ide/brain/b0d6de00-ef4c-4dcd-a27f-fd0b45d84524",
  "scratch",
  "retired_photos.json"
);

const galleryDir = path.join(process.cwd(), "public", "gallery", "Eden-Site Photos");
const archiveDir = path.join(process.cwd(), "public", "gallery", "retired-photos");
const configPath = path.join(process.cwd(), "scripts", "generate-gallery-data.js");

async function main() {
  console.log("==============================================");
  console.log("     📦 ARCHIVING RETIRED GALLERY PHOTOS      ");
  console.log("==============================================");

  if (!fs.existsSync(retiredListPath)) {
    console.error(`Error: Retired photos list not found at ${retiredListPath}`);
    process.exit(1);
  }

  const retiredPhotos = JSON.parse(fs.readFileSync(retiredListPath, "utf8"));
  const retiredIds = new Set(retiredPhotos.map((p) => p.id));

  console.log(`Loaded ${retiredPhotos.length} retired photos from analysis.`);

  // 1. Create archive directory
  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
    console.log(`Created archive folder: ${archiveDir}`);
  }

  // 2. Move files and their responsive variants
  console.log("\nMoving files to archive...");
  let movedCount = 0;

  const files = fs.readdirSync(galleryDir);
  for (const f of files) {
    if (f.startsWith(".")) continue;

    // Check if filename starts with a retired ID followed by a dot or @
    const match = f.match(/^(\d+)(?:\.|@)/);
    if (match) {
      const id = parseInt(match[1], 10);
      if (retiredIds.has(id)) {
        const srcPath = path.join(galleryDir, f);
        const destPath = path.join(archiveDir, f);
        try {
          fs.renameSync(srcPath, destPath);
          movedCount++;
        } catch (err) {
          console.error(`⚠️ Failed to move ${f}:`, err.message);
        }
      }
    }
  }

  console.log(`Successfully archived ${movedCount} image files and variants.`);

  // 3. Programmatically update scripts/generate-gallery-data.js
  console.log("\nUpdating gallery section configurations in generate-gallery-data.js...");
  
  // Read generate-gallery-data.js
  let content = fs.readFileSync(configPath, "utf8");

  // We want to update the gallerySectionConfig array by filtering out retiredIds
  // Let's do this programmatically by replacing the configs that use photos arrays or ranges.
  // Specifically, we will find and replace sections to exclude the retired photo IDs:
  
  // Update "Exterior Views": photos 1-3. All are retired!
  // Since 1, 2, 3 are retired, we should replace Exterior Views with a curated set of active exterior photos from 72-87.
  // Active ones in that range include: 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86
  // Let's pull the first 3 active ones (75, 76, 77) to represent "Exterior Views"!
  content = content.replace(
    /startPhoto: 1,\s*endPhoto: 3,/,
    "photos: [75, 76, 77],"
  );

  // Update "The Great Room" array:
  // Old: photos: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101]
  // Retired: 4, 5, 8
  // New: photos: [6, 7, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101]
  content = content.replace(
    /photos: \[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101\],/,
    "photos: [6, 7, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101],"
  );

  // Update "Bedroom 1" array:
  // Old: photos: [33, 34, 35, 36, 102]
  // Retired: 34
  // New: photos: [33, 35, 36, 102]
  content = content.replace(
    /photos: \[33, 34, 35, 36, 102\],/,
    "photos: [33, 35, 36, 102],"
  );

  // Update "Bedroom 8" array (was range 43 to 44, 43 is retired, so just 44):
  content = content.replace(
    /startPhoto: 43,\s*endPhoto: 44,/,
    "photos: [44],"
  );

  // Update "Full Bathroom 1" array:
  // Old: photos: [45, 46, 103, 104, 105]
  // Retired: none of these! (Wait, 45, 46 are active. So keeps [45, 46, 103, 104, 105])

  // Update "Full Bathroom 5" array:
  // Old: photos: [51, 52, 53, 106]
  // Retired: 51
  // New: photos: [52, 53, 106]
  content = content.replace(
    /photos: \[51, 52, 53, 106\],/,
    "photos: [52, 53, 106],"
  );

  // Update "Backyard" array:
  // Old: photos: [58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 108, 109, 110]
  // Retired: 58, 60, 65, 66, 67, 69
  // New: photos: [59, 61, 62, 63, 64, 68, 108, 109, 110]
  content = content.replace(
    /photos: \[58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 108, 109, 110\],/,
    "photos: [59, 61, 62, 63, 64, 68, 108, 109, 110],"
  );

  // Update "Exterior" range (was 72 to 87, retired: 72, 73, 74, 85, 87)
  // Active ones: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86]
  content = content.replace(
    /startPhoto: 72,\s*endPhoto: 87,/,
    "photos: [75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86],"
  );

  // Save the updated generate-gallery-data.js
  fs.writeFileSync(configPath, content, "utf8");
  console.log("✓ generate-gallery-data.js updated successfully!");

  console.log("\n==============================================");
  console.log("🚀 ARCHIVING COMPLETE!");
  console.log("Outdated photos moved to retired-photos/ and section configs cleaned up.");
  console.log("Next task: Run 'npm run generate-data' to update the site JSON.");
  console.log("==============================================");
}

main().catch((err) => {
  console.error("Error in archive-retired:", err);
  process.exit(1);
});
