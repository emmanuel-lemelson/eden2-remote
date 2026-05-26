const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const url = "https://www.airbnb.com/rooms/42793723";
const galleryDir = path.join(process.cwd(), "public", "gallery", "Eden-Site Photos");

// Helper to fetch live page HTML
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    };
    https.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => { resolve(data); });
    }).on("error", (err) => { reject(err); });
  });
}

// Helper to download a file
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    const options = {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(destPath, () => {});
        reject(new Error(`Failed download: Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(resolve);
      });
    }).on("error", (err) => {
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
  console.log("    🌐 LIVE AIRBNB DYNAMIC SCRAPE & COMPARE         ");
  console.log("====================================================\n");

  console.log(`Fetching live listing page: ${url}...`);
  const html = await fetchPage(url);
  console.log(`Successfully fetched HTML. Length: ${html.length} bytes.`);

  // 1. Extract Airbnb image URLs
  const regex = /https:\/\/a0\.muscache\.com\/im\/pictures\/[a-zA-Z0-9_\-\/]+\.(?:jpg|jpeg|png|webp)/g;
  const matches = html.match(regex) || [];
  
  // Filter out non-room assets to have clean active URLs
  const liveUrls = [...new Set(matches.map((u) => u.split("?")[0]))]
    .filter(u => {
      const urlLower = u.toLowerCase();
      return !urlLower.includes('favicon') && 
             !urlLower.includes('search-bar-icons') && 
             !urlLower.includes('review-ai-synthesis') && 
             !urlLower.includes('userprofile') &&
             !urlLower.includes('guestfavorite') &&
             !urlLower.includes('/user/') &&
             urlLower.includes('muscache.com');
    });

  console.log(`Found ${liveUrls.length} unique active room image URLs on the live page!`);
  if (liveUrls.length === 0) {
    console.log("No room images extracted. Exit.");
    return;
  }

  // 2. Scan existing active gallery images and compute dHashes
  console.log("\nIndexing local gallery photos and calculating dHashes...");
  const activeFiles = fs.readdirSync(galleryDir)
    .filter(f => !f.startsWith('.'))
    .filter(f => !f.includes('@')) // skip resized variants
    .filter(f => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));

  const localHashes = [];
  for (const filename of activeFiles) {
    const fullPath = path.join(galleryDir, filename);
    const hash = await getDifferenceHash(fullPath);
    if (hash) {
      localHashes.push({ filename, hash });
    }
  }
  console.log(`Successfully indexed ${localHashes.length} local gallery photos.\n`);

  // Create temporary directory for downloads
  const tempDir = path.join(process.cwd(), "public", "gallery", "temp_live_scrape");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  // 3. Visual Deduplication against Local Gallery
  console.log("Comparing live Airbnb photos against local gallery...");
  let matchCount = 0;
  let newCount = 0;
  const newPhotosReport = [];

  for (let i = 0; i < liveUrls.length; i++) {
    const baseUrl = liveUrls[i];
    const tempFile = path.join(tempDir, `live_${i}.jpg`);
    const downloadUrl = `${baseUrl}?im_w=480`; // medium-res for fast hashing

    try {
      await downloadFile(downloadUrl, tempFile);
      const hash = await getDifferenceHash(tempFile);
      if (!hash) {
        fs.unlinkSync(tempFile);
        continue;
      }

      // Check against local hashes and find the closest match
      let minDistance = 64;
      let secondMinDistance = 64;
      let matchedFile = "";

      for (const local of localHashes) {
        const dist = getHammingDistance(hash, local.hash);
        if (dist < minDistance) {
          secondMinDistance = minDistance;
          minDistance = dist;
          matchedFile = local.filename;
        } else if (dist < secondMinDistance) {
          secondMinDistance = dist;
        }
      }

      const ratio = secondMinDistance > 0 ? (minDistance / secondMinDistance) : 1;
      
      // Upgraded matching rule:
      // - Confirmed match (duplicate) if distance <= 10 (strict) OR distance <= 18 with relative uniqueness ratio <= 0.45
      const isMatch = (minDistance <= 10) || (minDistance <= 18 && ratio <= 0.45);

      if (isMatch) {
        matchCount++;
        // console.log(`[-] Skiped duplicate Airbnb image #${i} (Matches local ${matchedFile} - Dist: ${minDistance})`);
        fs.unlinkSync(tempFile);
      } else {
        newCount++;
        console.log(`[+] NEW Airbnb photo discovered! Index #${i} (Min Dist to local: ${minDistance}, Ratio: ${ratio.toFixed(2)})`);
        newPhotosReport.push({
          index: i,
          url: baseUrl,
          minDistance,
          ratio
        });
        fs.unlinkSync(tempFile);
      }
    } catch (err) {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }

  console.log("\n====================================================");
  console.log("                 COMPARISON RESULTS                 ");
  console.log("====================================================");
  console.log(`Total live Airbnb photos analyzed: ${liveUrls.length}`);
  console.log(`Visually matched with local gallery: ${matchCount}`);
  console.log(`Truly NEW photos found: ${newCount}`);
  console.log("====================================================\n");

  if (newCount > 0) {
    console.log("Listing of all NEW Airbnb photos found:");
    newPhotosReport.forEach((p, idx) => {
      console.log(`${idx + 1}. Live Photo #${p.index}: ${p.url} (Min Dist: ${p.minDistance}, Ratio: ${p.ratio.toFixed(2)})`);
    });
  } else {
    console.log("🎉 SUCCESS! No new photos found on the live Airbnb listing. Your site is fully synchronized!");
  }

  // Clean up
  const remainingFiles = fs.readdirSync(tempDir);
  for (const f of remainingFiles) {
    fs.unlinkSync(path.join(tempDir, f));
  }
  fs.rmdirSync(tempDir);
}

main().catch(err => {
  console.error("Error in live-scrape script:", err);
  process.exit(1);
});
