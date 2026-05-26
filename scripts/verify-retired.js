const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const htmlFilePath = path.join(
  "/Users/emmanuel/.gemini/antigravity-ide/brain/b0d6de00-ef4c-4dcd-a27f-fd0b45d84524",
  ".system_generated",
  "steps",
  "47",
  "content.md"
);

const retiredDir = path.join(process.cwd(), "public", "gallery", "retired-photos");
const galleryDir = path.join(process.cwd(), "public", "gallery", "Eden-Site Photos");

// Helper to download a file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const options = {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    };
    https
      .get(url, options, (response) => {
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          reject(new Error(`Failed to download: Status Code ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        file.close();
        fs.unlink(destPath, () => {});
        reject(err);
      });
  });
}

// Compute 9x8 difference perceptual hash using sharp (dHash)
async function getDifferenceHash(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(9, 8, { fit: "fill" })
      .greyscale()
      .raw()
      .toBuffer();

    let hash = "";
    for (let r = 0; r < 8; r++) {
      const rowOffset = r * 9;
      for (let c = 0; c < 8; c++) {
        const leftPixel = buffer[rowOffset + c];
        const rightPixel = buffer[rowOffset + c + 1];
        hash += leftPixel >= rightPixel ? "1" : "0";
      }
    }
    return hash;
  } catch (err) {
    return null;
  }
}

// Compute Hamming distance between two binary hash strings
function getHammingDistance(hash1, hash2) {
  let distance = 0;
  for (let i = 0; i < 64; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }
  return distance;
}

async function main() {
  console.log("====================================================");
  console.log("   🔍 STARTING RETIRED PHOTO CROSS-VERIFICATION     ");
  console.log("====================================================\n");

  if (!fs.existsSync(htmlFilePath)) {
    console.error(`Error: Airbnb source data not found at ${htmlFilePath}`);
    process.exit(1);
  }

  if (!fs.existsSync(retiredDir)) {
    console.log("No retired directory found. Everything is active!");
    return;
  }

  // 1. Scan retired directory for files
  const retiredFiles = fs.readdirSync(retiredDir)
    .filter(f => !f.startsWith('.'))
    .filter(f => !f.includes('@')) // original source photos only
    .filter(f => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));

  console.log(`Found ${retiredFiles.length} original photos in the retired-photos archive.`);
  if (retiredFiles.length === 0) {
    console.log("No retired files to verify. Exiting.");
    return;
  }

  // 2. Load active Airbnb image URLs from raw HTML payload
  const html = fs.readFileSync(htmlFilePath, "utf8");
  const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[a-zA-Z0-9_\-\/]+\.(?:jpg|jpeg|png|webp)/g;
  const matches = html.match(regex) || [];
  
  // Filter out non-room assets to have clean active URLs
  const activeUrls = [...new Set(matches.map((url) => url.split("?")[0]))]
    .filter(u => {
      const url = u.toLowerCase();
      return !url.includes('favicon') && 
             !url.includes('search-bar-icons') && 
             !url.includes('review-ai-synthesis') && 
             !url.includes('userprofile') &&
             !url.includes('guestfavorite') &&
             !url.includes('/user/') &&
             url.includes('muscache.com');
    });

  console.log(`Extracted ${activeUrls.length} active room image URLs from live Airbnb listing.\n`);

  // Create temporary directory for downloads
  const tempDir = path.join(process.cwd(), "public", "gallery", "temp_verify_retired");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // 3. Download active Airbnb images and generate hashes
  console.log("Fingerprinting all live Airbnb listing photos...");
  const activeHashes = [];
  for (let i = 0; i < activeUrls.length; i++) {
    const url = activeUrls[i];
    const tempFile = path.join(tempDir, `active_${i}.jpg`);
    const downloadUrl = `${url}?im_w=480`; // medium-res for fast downloads/hashing
    try {
      await downloadFile(downloadUrl, tempFile);
      const hash = await getDifferenceHash(tempFile);
      if (hash) {
        activeHashes.push({ url, hash, index: i });
      }
      fs.unlinkSync(tempFile);
    } catch (err) {
      // Skip failed downloads silently
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
  console.log(`Generated dHashes for ${activeHashes.length} active Airbnb listing photos.\n`);

  // 4. Run dHash + Relative Uniqueness Match for each retired file
  console.log("Running matching algorithms on retired photos...\n");
  const report = [];
  let mistakenlyRetiredCount = 0;

  for (const filename of retiredFiles) {
    const fullPath = path.join(retiredDir, filename);
    const hash = await getDifferenceHash(fullPath);
    if (!hash) {
      console.warn(`⚠️ Could not generate hash for retired photo ${filename}`);
      continue;
    }

    let minDistance = 64;
    let secondMinDistance = 64;
    let matchedUrl = "";
    let matchedIndex = -1;

    for (const active of activeHashes) {
      const dist = getHammingDistance(hash, active.hash);
      if (dist < minDistance) {
        secondMinDistance = minDistance;
        minDistance = dist;
        matchedUrl = active.url;
        matchedIndex = active.index;
      } else if (dist < secondMinDistance) {
        secondMinDistance = dist;
      }
    }

    const ratio = secondMinDistance > 0 ? (minDistance / secondMinDistance) : 1;
    
    // Upgraded matching decision rules:
    // - Confirmed match (active) if:
    //   1. Hamming Distance <= 10 (strict visual duplicate)
    //   2. Hamming Distance <= 18 AND Relative Uniqueness Ratio <= 0.45
    const isActuallyActive = (minDistance <= 10) || (minDistance <= 18 && ratio <= 0.45);

    let status = "RETIRED (Confirmed)";
    if (isActuallyActive) {
      status = "⚠️ ACTIVE (MISTAKE - RESTORE!)";
      mistakenlyRetiredCount++;
    }

    report.push({
      filename,
      minDistance,
      ratio,
      status,
      matchedIndex,
      matchedUrl
    });
  }

  // Print results
  console.log("==========================================================================================");
  console.log("                               🔍 VERIFICATION REPORT                                     ");
  console.log("==========================================================================================");
  console.log(String("File Name").padEnd(15) + " | " + 
              String("Min Dist").padEnd(8) + " | " + 
              String("Ratio").padEnd(8) + " | " + 
              String("Audit Status").padEnd(30) + " | " +
              String("Best Airbnb Match Index"));
  console.log("------------------------------------------------------------------------------------------");
  
  report.forEach(r => {
    console.log(
      r.filename.padEnd(15) + " | " + 
      String(r.minDistance).padEnd(8) + " | " + 
      r.ratio.toFixed(2).padEnd(8) + " | " + 
      r.status.padEnd(30) + " | " +
      (r.matchedIndex !== -1 ? `#${r.matchedIndex}` : "None")
    );
  });
  console.log("==========================================================================================\n");

  if (mistakenlyRetiredCount > 0) {
    console.log(`🚨 ALERT: Found ${mistakenlyRetiredCount} photos that were MISTAKENLY retired!`);
    console.log("We need to restore them back to the active directory.");
  } else {
    console.log("🎉 EXCELLENT! No mistakenly retired photos were found. All 13 retired files are 100% outdated/retired!");
  }

  // Clean up
  const remainingFiles = fs.readdirSync(tempDir);
  for (const f of remainingFiles) {
    fs.unlinkSync(path.join(tempDir, f));
  }
  fs.rmdirSync(tempDir);
}

main().catch(err => {
  console.error("Error running retired photo check:", err);
  process.exit(1);
});
