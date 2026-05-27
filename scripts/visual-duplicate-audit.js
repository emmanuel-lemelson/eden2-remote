const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const galleryDir = path.join(process.cwd(), "public", "gallery", "Eden-Site Photos");
const outputHtmlPath = path.join(process.cwd(), "public", "gallery-audit.html");

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

// Format file size in KB/MB
function formatBytes(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = 1;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

async function main() {
  console.log("==============================================");
  console.log("    🔍 GENERATING VISUAL GALLERY AUDIT        ");
  console.log("==============================================");

  if (!fs.existsSync(galleryDir)) {
    console.error(`Error: Gallery directory not found at ${galleryDir}`);
    process.exit(1);
  }

  // 1. Scan directory for original images (ignoring `@` responsive variants)
  const files = fs.readdirSync(galleryDir)
    .filter(f => !f.startsWith('.'))
    .filter(f => !f.includes('@'))
    .filter(f => /\.(avif|webp|jpg|jpeg|png)$/i.test(f));

  console.log(`Analyzing ${files.length} active original images...`);

  // 2. Fetch metadata and hashes
  const images = [];
  for (const filename of files) {
    const fullPath = path.join(galleryDir, filename);
    const hash = await getDifferenceHash(fullPath);
    if (!hash) continue;

    try {
      const meta = await sharp(fullPath).metadata();
      const stats = fs.statSync(fullPath);
      images.push({
        filename,
        hash,
        width: meta.width,
        height: meta.height,
        size: stats.size,
        src: `gallery/Eden-Site%20Photos/${encodeURIComponent(filename)}`
      });
    } catch (err) {
      console.warn(`⚠️ Failed to parse metadata for ${filename}:`, err.message);
    }
  }

  // 3. Compare pairs and find duplicate candidates (Hamming distance < 18)
  const candidates = [];
  const processedPairs = new Set();

  for (let i = 0; i < images.length; i++) {
    for (let j = i + 1; j < images.length; j++) {
      const img1 = images[i];
      const img2 = images[j];
      
      const distance = getHammingDistance(img1.hash, img2.hash);
      
      if (distance < 18) {
        // Classify match level
        let matchClass = "similar-angle";
        let matchLabel = "Similar Camera Angle";
        let statusColor = "#b09a74"; // Warm gold
        
        if (distance === 0) {
          matchClass = "exact-duplicate";
          matchLabel = "100% Identical Visual Duplicate";
          statusColor = "#e06c75"; // Muted red
        } else if (distance <= 8) {
          matchClass = "near-duplicate";
          matchLabel = "Near-Identical Duplicate (Highly Similar)";
          statusColor = "#d19a66"; // Muted orange
        }

        candidates.push({
          img1,
          img2,
          distance,
          matchClass,
          matchLabel,
          statusColor
        });
      }
    }
  }

  // Sort candidates by Hamming distance (exact duplicates first)
  candidates.sort((a, b) => a.distance - b.distance);

  console.log(`Identified ${candidates.length} visual duplicate candidate pairs.`);

  // 4. Generate the premium, interactive HTML file
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gallery Visual Audit | Eden Estate Stowe</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: #f7f5f0;
      --text-color: #292724;
      --accent-color: #c2a060;
      --border-color: rgba(41, 39, 36, 0.08);
      --card-bg: rgba(255, 255, 255, 0.8);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      line-height: 1.6;
      padding: 3rem 1.5rem;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      margin-bottom: 3.5rem;
      text-align: center;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 2.5rem;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 2.75rem;
      font-weight: 500;
      letter-spacing: -0.02em;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      color: #66625c;
      font-size: 1rem;
      font-weight: 400;
      max-width: 600px;
      margin: 0 auto;
    }

    .summary-badge {
      display: inline-block;
      background: white;
      border: 1px solid var(--border-color);
      padding: 0.5rem 1.25rem;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
    }

    .grid-pairs {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      margin-bottom: 4rem;
    }

    .pair-card {
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.6);
      border-radius: 24px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .pair-card:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.05);
    }

    .pair-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border-color);
      padding-bottom: 1rem;
    }

    .pair-title {
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: -0.01em;
    }

    .distance-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.35rem 0.85rem;
      border-radius: 100px;
      color: white;
    }

    .comparison-layout {
      display: grid;
      grid-template-cols: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 768px) {
      .comparison-layout {
        grid-template-cols: 1fr;
      }
    }

    .image-panel {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid var(--border-color);
      position: relative;
    }

    .image-container {
      position: relative;
      aspect-ratio: 4/3;
      background: #efece6;
      overflow: hidden;
      cursor: zoom-in;
    }

    .image-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .image-container:hover img {
      transform: scale(1.06);
    }

    .meta-panel {
      padding: 1.25rem;
      font-size: 0.85rem;
      border-top: 1px solid var(--border-color);
    }

    .meta-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.4rem;
    }

    .meta-label {
      color: #8c8880;
    }

    .meta-value {
      font-weight: 500;
    }

    .action-checkbox {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      background: rgba(224, 108, 117, 0.05);
      border: 1px dashed rgba(224, 108, 117, 0.2);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.85rem;
      color: #d15c64;
      transition: background-color 0.2s;
    }

    .action-checkbox:hover {
      background: rgba(224, 108, 117, 0.1);
    }

    .action-checkbox input {
      accent-color: #d15c64;
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    /* Terminal Console Drawer at Bottom */
    .terminal-console {
      position: fixed;
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 90%;
      max-width: 900px;
      background: #1e1e1e;
      color: #abb2bf;
      border-radius: 16px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.08);
      z-index: 1000;
      overflow: hidden;
      font-family: monospace;
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
    }

    .console-header {
      background: #252526;
      padding: 0.75rem 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }

    .console-title {
      font-weight: 600;
      color: #e06c75;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .console-title::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #e06c75;
    }

    .copy-btn {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff;
      padding: 0.4rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.75rem;
      transition: background-color 0.2s;
    }

    .copy-btn:hover {
      background: rgba(255,255,255,0.15);
    }

    .console-body {
      padding: 1.25rem;
      max-height: 150px;
      overflow-y: auto;
      background: #181818;
    }

    .command-line {
      white-space: pre-wrap;
      word-break: break-all;
      color: #98c379;
    }

    .empty-placeholder {
      color: #5c6370;
      font-style: italic;
    }
  </style>
</head>
<body>

  <div class="container">
    <header>
      <h1>Gallery Visual Audit</h1>
      <p class="subtitle">Interactively compare duplicate candidates identified by perceptual structural hashing. Keep beautiful camera angles and build precise removal scripts for visual clones.</p>
      <div class="summary-badge">
        Found <strong>${candidates.length}</strong> matching candidate duplicate pairs in catalog.
      </div>
    </header>

    <div class="grid-pairs">
      ${candidates.map((pair, idx) => `
      <div class="pair-card" id="pair-${idx}">
        <div class="pair-header">
          <div class="pair-title">Candidate Pair #${idx + 1} &mdash; Hamming Distance: <strong>${pair.distance}</strong></div>
          <div class="distance-tag" style="background-color: ${pair.statusColor}">
            ${pair.matchLabel}
          </div>
        </div>

        <div class="comparison-layout">
          <!-- Image 1 -->
          <div class="image-panel">
            <div class="image-container" onclick="openLightbox('${pair.img1.src}')">
              <img src="${pair.img1.src}" alt="${pair.img1.filename}">
            </div>
            <div class="meta-panel">
              <div class="meta-row">
                <span class="meta-label">File Name</span>
                <span class="meta-value">${pair.img1.filename}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Resolution</span>
                <span class="meta-value">${pair.img1.width} x ${pair.img1.height}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">File Size</span>
                <span class="meta-value">${formatBytes(pair.img1.size)}</span>
              </div>
              
              <label class="action-checkbox">
                <input type="checkbox" class="deletion-trigger" data-filename="${pair.img1.filename}" onchange="updateCommand()">
                <span>Delete ${pair.img1.filename}</span>
              </label>
            </div>
          </div>

          <!-- Image 2 -->
          <div class="image-panel">
            <div class="image-container" onclick="openLightbox('${pair.img2.src}')">
              <img src="${pair.img2.src}" alt="${pair.img2.filename}">
            </div>
            <div class="meta-panel">
              <div class="meta-row">
                <span class="meta-label">File Name</span>
                <span class="meta-value">${pair.img2.filename}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">Resolution</span>
                <span class="meta-value">${pair.img2.width} x ${pair.img2.height}</span>
              </div>
              <div class="meta-row">
                <span class="meta-label">File Size</span>
                <span class="meta-value">${formatBytes(pair.img2.size)}</span>
              </div>
              
              <label class="action-checkbox">
                <input type="checkbox" class="deletion-trigger" data-filename="${pair.img2.filename}" onchange="updateCommand()">
                <span>Delete ${pair.img2.filename}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      `).join("")}
    </div>
  </div>

  <!-- Terminal Console Tool -->
  <div class="terminal-console">
    <div class="console-header">
      <div class="console-title">Archival & Clean-up Script Builder</div>
      <button class="copy-btn" onclick="copyConsole()">Copy Command</button>
    </div>
    <div class="console-body">
      <div class="empty-placeholder" id="placeholder-text">Select one or more duplicate photos above to build the custom deletion bash command...</div>
      <div class="command-line" id="command-text" style="display: none;"></div>
    </div>
  </div>

  <script>
    function updateCommand() {
      const checkboxes = document.querySelectorAll('.deletion-trigger:checked');
      const placeholder = document.getElementById('placeholder-text');
      const commandText = document.getElementById('command-text');
      
      if (checkboxes.length === 0) {
        placeholder.style.display = 'block';
        commandText.style.display = 'none';
        return;
      }
      
      placeholder.style.display = 'none';
      commandText.style.display = 'block';
      
      // Build visual deletion script
      const filenames = Array.from(checkboxes).map(cb => cb.getAttribute('data-filename'));
      
      // Extract numbers (e.g. 73.avif -> 73)
      const ids = filenames.map(name => {
        const match = name.match(/^(\\d+)/);
        return match ? parseInt(match[0], 10) : null;
      }).filter(n => n !== null);
      
      let cmd = '# Copy and run this command in your IDE terminal to safely archive duplicates and rebuild:\\n';
      
      // Build rm string
      const rmTargets = filenames.map(name => {
        const base = name.replace(/\\.[^/.]+$/, "");
        return \`"public/gallery/Eden-Site Photos/\${name}" "public/gallery/Eden-Site Photos/\${base}@*.webp"\`;
      }).join(' ');
      
      cmd += \`rm -f \${rmTargets} && /usr/local/bin/node scripts/generate-gallery-data.js\`;
      
      commandText.innerText = cmd;
    }

    function copyConsole() {
      const commandText = document.getElementById('command-text');
      if (commandText.style.display === 'none') {
        alert('Please check/select at least one duplicate photo first!');
        return;
      }
      
      navigator.clipboard.writeText(commandText.innerText)
        .then(() => {
          alert('Bash command copied to clipboard! You can paste it directly into your terminal.');
        })
        .catch(err => {
          alert('Failed to copy: ' + err);
        });
    }

    function openLightbox(src) {
      window.open(src, '_blank');
    }
  </script>
</body>
</html>
`;

  fs.writeFileSync(outputHtmlPath, htmlContent, "utf8");
  console.log(`\n🎉 Visual Audit Dashboard created successfully at:`);
  console.log(`   file://${outputHtmlPath}`);
  console.log("\n==============================================");
}

main().catch(err => {
  console.error("Error generating visual audit:", err);
  process.exit(1);
});
