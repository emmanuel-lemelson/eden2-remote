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
  console.log("==============================================");
  console.log("     🏃 RUNNING SMART AIRBNB GALLERY SYNC     ");
  console.log("==============================================");

  if (!fs.existsSync(htmlFilePath)) {
    console.error(`Error: Fetched HTML file not found at ${htmlFilePath}`);
    process.exit(1);
  }

  // 1. Read fetched HTML and extract Airbnb image URLs
  console.log("Reading fetched Airbnb page HTML...");
  const html = fs.readFileSync(htmlFilePath, "utf8");
  const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[a-zA-Z0-9_\-\/]+\.(?:jpg|jpeg|png|webp)/g;
  const matches = html.match(regex) || [];
  const uniqueBaseUrls = [...new Set(matches.map((url) => url.split("?")[0]))];

  console.log(`Found ${uniqueBaseUrls.length} unique raw Airbnb image URLs.`);

  if (uniqueBaseUrls.length === 0) {
    console.log("No images found in listing. Exiting.");
    return;
  }

  // 2. Scan existing gallery images and compute their pHashes
  console.log("\nIndexing existing gallery images and generating pHashes...");
  const existingFiles = fs
    .readdirSync(galleryDir)
    .filter((f) => !f.startsWith("."))
    .filter((f) => !f.includes("@")) // skip resized variants
    .filter((f) => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));

  const existingHashes = [];
  let maxPhotoNum = 97;

  for (const filename of existingFiles) {
    const fullPath = path.join(galleryDir, filename);
    const hash = await getDifferenceHash(fullPath);
    
    // Track photo numbers to find the next available ID
    const match = filename.match(/^(\d+)\./);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxPhotoNum) {
        maxPhotoNum = num;
      }
    }

    if (hash) {
      existingHashes.push({ filename, hash });
    }
  }

  console.log(`Successfully indexed ${existingHashes.length} existing photos.`);
  console.log(`Current highest photo ID: ${maxPhotoNum}`);
  let nextPhotoNum = maxPhotoNum + 1;

  // Create a temporary folder inside the workspace
  const tempDir = path.join(process.cwd(), "public", "gallery", "temp_sync");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  console.log("\nComparing Airbnb photos against existing gallery using visual dHash...");
  const newPhotosToDownload = [];
  let duplicateCount = 0;

  for (let i = 0; i < uniqueBaseUrls.length; i++) {
    const baseUrl = uniqueBaseUrls[i];
    const tempFile = path.join(tempDir, `temp_${i}.jpg`);
    
    // Download a medium-res version for pHash comparison to keep it extremely fast
    const downloadUrl = `${baseUrl}?im_w=480`;
    
    try {
      await downloadFile(downloadUrl, tempFile);
      const hash = await getDifferenceHash(tempFile);
      
      if (!hash) {
        fs.unlinkSync(tempFile);
        continue;
      }

      // Compare against existing hashes and rank best matching candidates
      let minDistance = 64;
      let secondMinDistance = 64;
      let matchedFile = "";

      for (const existing of existingHashes) {
        const dist = getHammingDistance(hash, existing.hash);
        if (dist < minDistance) {
          secondMinDistance = minDistance;
          minDistance = dist;
          matchedFile = existing.filename;
        } else if (dist < secondMinDistance) {
          secondMinDistance = dist;
        }
      }

      const ratio = secondMinDistance > 0 ? (minDistance / secondMinDistance) : 1;
      
      // Upgrade matching rule:
      // - Confirmed match (duplicate) if distance <= 10 (strict) OR distance <= 18 with relative uniqueness ratio <= 0.45
      const isDuplicate = (minDistance <= 10) || (minDistance <= 18 && ratio <= 0.45);

      if (isDuplicate) {
        duplicateCount++;
        // console.log(`[-] Skip: Airbnb photo #${i} matches existing ${matchedFile} (Dist: ${minDistance}, Ratio: ${ratio.toFixed(2)})`);
        fs.unlinkSync(tempFile);
      } else {
        console.log(`[+] NEW PHOTO DETECTED! (Min Hamming Distance to existing: ${minDistance}, Ratio: ${ratio.toFixed(2)})`);
        newPhotosToDownload.push({ index: i, baseUrl });
        // Keep the temp file for now
      }
    } catch (err) {
      console.warn(`⚠️ Failed to analyze photo ${i}:`, err.message);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }

  console.log(`\nComparison complete:`);
  console.log(`- Duplicates/Screenshots skipped: ${duplicateCount}`);
  console.log(`- Truly new photos discovered: ${newPhotosToDownload.length}`);

  if (newPhotosToDownload.length === 0) {
    console.log("\n🎉 No new photos need to be downloaded! Everything is already synchronized.");
    // Clean up temp directory
    fs.rmdirSync(tempDir);
    return;
  }

  // 3. Download the new photos in ultra high-resolution and convert to .avif
  console.log(`\nDownloading and optimizing ${newPhotosToDownload.length} new photos...`);
  
  for (const newPhoto of newPhotosToDownload) {
    const finalAvifName = `${nextPhotoNum}.avif`;
    const finalAvifPath = path.join(galleryDir, finalAvifName);
    const tempHighResPath = path.join(tempDir, `highres_${newPhoto.index}.jpg`);
    const highResUrl = `${newPhoto.baseUrl}?im_w=2560`; // Ultra-high resolution

    try {
      console.log(`-> Downloading new photo #${newPhoto.index} in ultra-res (2560px)...`);
      await downloadFile(highResUrl, tempHighResPath);
      
      console.log(`-> Converting highres_${newPhoto.index}.jpg to optimized ${finalAvifName}...`);
      await sharp(tempHighResPath)
        .avif({ quality: 65, effort: 4 })
        .toFile(finalAvifPath);
        
      console.log(`✓ Saved ${finalAvifName} successfully!`);
      nextPhotoNum++;
    } catch (err) {
      console.error(`❌ Failed to save new photo:`, err);
    }
  }

  // 4. Cleanup
  console.log("\nCleaning up temporary files...");
  const tempFiles = fs.readdirSync(tempDir);
  for (const f of tempFiles) {
    fs.unlinkSync(path.join(tempDir, f));
  }
  fs.rmdirSync(tempDir);

  console.log("\n==============================================");
  console.log(`🚀 SYNC COMPLETE!`);
  console.log(`New photos saved under public/gallery/Eden-Site Photos/`);
  console.log(`Next task: Run 'npm run generate-data' to generate responsive sizes.`);
  console.log("==============================================");
}

main().catch((err) => {
  console.error("Error in sync-airbnb:", err);
  process.exit(1);
});
