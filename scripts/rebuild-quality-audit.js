const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const rootDir = process.cwd();
const standardDir = path.join(rootDir, "public", "gallery", "Eden-Site Photos");
const enhancedDir = path.join(rootDir, "public", "gallery", "enhanced");
const archiveDir = path.join(rootDir, "public", "gallery", "lowres_archive");
const captionsPath = path.join(rootDir, "src", "data", "captions.json");
const outputHtmlPath = path.join(rootDir, "public", "quality-audit.html");

const excludedFilenames = new Set([
  "30-007-wicker-furniture-sunroom-stone-floor.webp",
  "120-014-tagging-error-14.webp",
  "164-030-tagging-error-30.webp",
  "151-072-tagging-error-72.webp",
  "147-011-tagging-error-11.webp",
  "116-077-tagging-error-77.webp",
]);

// Format file size
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
  console.log("    🔍 REBUILDING GALLERY QUALITY AUDIT V2    ");
  console.log("==============================================");

  // 1. Load captions
  let captions = {};
  if (fs.existsSync(captionsPath)) {
    try {
      captions = JSON.parse(fs.readFileSync(captionsPath, "utf-8"));
    } catch (err) {
      console.warn("⚠️ Failed to load captions:", err.message);
    }
  }

  // 2. Scan directories
  const standardFiles = fs.existsSync(standardDir)
    ? fs.readdirSync(standardDir).filter(f => !f.startsWith(".") && !f.includes("@") && !excludedFilenames.has(f) && /\.(avif|webp|jpg|jpeg|png)$/i.test(f))
    : [];
    
  const enhancedFiles = fs.existsSync(enhancedDir)
    ? fs.readdirSync(enhancedDir).filter(f => !f.startsWith(".") && !f.includes("@") && !excludedFilenames.has(f) && /\.(avif|webp|jpg|jpeg|png)$/i.test(f))
    : [];

  // Create a combined map of all unique image numbers
  const allImagesMap = new Map();

  // Load enhanced images first
  for (const filename of enhancedFiles) {
    const fullPath = path.join(enhancedDir, filename);
    const meta = await sharp(fullPath).metadata();
    const stats = fs.statSync(fullPath);
    
    allImagesMap.set(filename, {
      filename,
      isEnhanced: true,
      width: meta.width,
      height: meta.height,
      size: stats.size,
      src: `/gallery/enhanced/${filename}`,
      originalSrc: fs.existsSync(path.join(archiveDir, filename)) ? `/gallery/lowres_archive/${filename}` : `/gallery/enhanced/${filename}`
    });
  }

  // Load standard images (only if not already loaded as enhanced)
  for (const filename of standardFiles) {
    if (allImagesMap.has(filename)) continue;
    
    const fullPath = path.join(standardDir, filename);
    const meta = await sharp(fullPath).metadata();
    const stats = fs.statSync(fullPath);
    
    allImagesMap.set(filename, {
      filename,
      isEnhanced: false,
      width: meta.width,
      height: meta.height,
      size: stats.size,
      src: `/gallery/Eden-Site%20Photos/${filename}`,
    });
  }

  // Convert to array and sort alphabetically by key
  const images = Array.from(allImagesMap.values()).sort((a, b) => 
    a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' })
  );

  console.log(`Parsed ${images.length} unique gallery images.`);

  // 3. Classify images and compute stats
  let totalPhotos = images.length;
  let swappedCount = 0;
  let remainingSwapsCount = 0;
  let portfolioCount = 0;
  let proGradeCount = 0;
  const remainingSwapsList = [];

  const cardsHtml = [];

  for (const img of images) {
    const caption = captions[img.filename] || "Eden Estate luxury view.";
    const aspect = `${img.width}:${img.height}`;
    const sizeStr = formatBytes(img.size);
    
    let qualityClass = "";
    let badgeText = "";
    let badgeClass = "";
    let recText = "";
    let recClass = "";
    let isFlagged = false;
    let viewBtnHtml = "";
    let badgeBarExtra = "";

    if (img.isEnhanced) {
      swappedCount++;
      qualityClass = "pro";
      badgeText = "✨ Enhanced (Pro)";
      badgeClass = "status-pro";
      recText = "✨ Enhanced (Pro Grade)";
      recClass = "status-pro-text";
      viewBtnHtml = `
        <button class="view-btn" style="background: var(--accent-gold); color: #000; font-weight: 600; border: none; cursor: pointer;" onclick="openCompareModal('${img.filename}', '${img.originalSrc}', '${img.src}')">🔍 Full-Screen Compare</button>
        <a href="${img.src}" target="_blank" class="view-btn">Open Original High-Res File</a>
      `;
      badgeBarExtra = `<button class="queue-btn" style="background: rgba(16, 185, 129, 0.2); color: var(--color-pro); border: 1px solid var(--color-pro);" onclick="toggleImageCompare('${img.filename}', this)">🔄 Compare Live (Before vs After)</button>`;
    } else if (img.width >= 2000) {
      proGradeCount++;
      qualityClass = "pro";
      badgeText = "Pro Grade (2560px)";
      badgeClass = "status-pro";
      recText = "Excellent";
      recClass = "status-pro-text";
      viewBtnHtml = `<a href="${img.src}" target="_blank" class="view-btn">View Original</a>`;
    } else if (img.width >= 1200) {
      portfolioCount++;
      qualityClass = "medium";
      badgeText = "Portfolio (1200px)";
      badgeClass = "status-medium";
      recText = "Good";
      recClass = "status-medium-text";
      viewBtnHtml = `<a href="${img.src}" target="_blank" class="view-btn">View Original</a>`;
    } else {
      remainingSwapsCount++;
      qualityClass = "low";
      badgeText = "Low Res (720px)";
      badgeClass = "status-low";
      recText = "🔴 Flagged for Swap";
      recClass = "status-low-text";
      isFlagged = true;
      remainingSwapsList.push(img.filename);
      viewBtnHtml = `<a href="${img.src}" target="_blank" class="view-btn">View Original</a>`;
    }

    const cardClass = isFlagged ? "card flagged" : (img.isEnhanced ? "card enhanced" : "card");

    let imageContainerHtml = "";
    if (img.isEnhanced) {
      imageContainerHtml = `
        <div class="comparison-slider">
          <!-- Before (Original) -->
          <img class="img-before" src="${img.originalSrc}" alt="Before ${img.filename}" loading="lazy">
          <!-- After (Enhanced) -->
          <div class="resize-container" id="resize-${img.filename}">
            <img class="img-after" src="${img.src}" alt="After ${img.filename}" loading="lazy">
          </div>
          <!-- Slider Handle -->
          <div class="slider-handle" id="handle-${img.filename}"></div>
          <input type="range" min="0" max="100" value="50" class="comparison-range" oninput="updateComparisonSlider('${img.filename}', this.value)">
          <div class="badge-bar" style="pointer-events: none;">
            <span class="badge ${badgeClass}">${badgeText}</span>
            <span class="badge" style="background: rgba(0,0,0,0.7); color: #fff; border: 1px solid rgba(255,255,255,0.2);">↔ Slide to Compare</span>
          </div>
        </div>
      `;
    } else {
      imageContainerHtml = `
        <div class="img-container">
          <img id="img-${img.filename}" src="${img.src}" alt="${img.filename}" loading="lazy">
          <div class="badge-bar">
            <span class="badge ${badgeClass}">${badgeText}</span>
            <div class="checkbox-container" title="Add to Swap Queue" onclick="toggleQueue('${img.filename}', event)">
              <input type="checkbox" id="check-${img.filename}" onclick="event.stopPropagation(); syncCheckbox('${img.filename}')">
            </div>
          </div>
        </div>
      `;
    }

    cardsHtml.push(`
      <div class="${cardClass}" data-quality="${qualityClass}">
        ${imageContainerHtml}
        <div class="card-body">
          <div class="card-header">
            <span class="filename">${img.filename}</span>
            <button class="copy-btn" onclick="copyText('${img.filename}')">Copy File</button>
          </div>
          <div class="metadata-list">
            <div class="meta-item">
              <span class="meta-label">Resolution</span>
              <span class="meta-value">${img.width} x ${img.height}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Size</span>
              <span class="meta-value">${sizeStr}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Aspect Ratio</span>
              <span class="meta-value">${aspect}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Audit Recommendation</span>
              <span class="meta-value ${recClass}">${recText}</span>
            </div>
          </div>
          <div class="caption-box" title="${caption.replace(/"/g, "&quot;")}">
            ${caption}
          </div>
          <div class="card-footer" style="flex-direction: column; gap: 8px;">
            ${viewBtnHtml}
          </div>
        </div>
      </div>`);
  }

  // Recalculate original total low-res target count
  const totalLowResTarget = swappedCount + remainingSwapsCount;
  const progressPercent = totalLowResTarget > 0 
    ? ((swappedCount / totalLowResTarget) * 100).toFixed(1)
    : "100.0";

  console.log(`Progress: ${swappedCount} / ${totalLowResTarget} swapped (${progressPercent}% complete)`);
  console.log(`Remaining flagged low-res: ${remainingSwapsCount}`);

  // Build the remaining tags list
  const tagsHtml = remainingSwapsList.map(filename => `
        <span class="remaining-tag" onclick="copyText('${filename}')" style="cursor: pointer;" title="Click to copy filename">
          ${filename} <span style="font-size: 0.65rem; opacity: 0.7;">📋</span>
        </span>`).join("");

  // 4. Construct complete premium HTML
  const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Eden Estate - Gallery Quality Audit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-dark: #0f1115;
      --panel-dark: rgba(22, 26, 33, 0.7);
      --border-dark: rgba(255, 255, 255, 0.08);
      --accent-gold: #c5a880;
      --text-main: #f3f4f6;
      --text-muted: #9ca3af;
      
      --color-pro: #10b981;
      --bg-pro: rgba(16, 185, 129, 0.15);
      --color-medium: #eab308;
      --bg-medium: rgba(234, 179, 8, 0.15);
      --color-low: #ef4444;
      --bg-low: rgba(239, 68, 68, 0.15);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-dark);
      color: var(--text-main);
      font-family: 'Outfit', sans-serif;
      padding: 40px 20px;
      line-height: 1.5;
    }

    header {
      max-width: 1400px;
      margin: 0 auto 30px;
      text-align: center;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 30px;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      font-size: 2.8rem;
      letter-spacing: 0.03em;
      color: var(--text-main);
      margin-bottom: 8px;
    }

    h1 span {
      color: var(--accent-gold);
    }

    .subtitle {
      color: var(--text-muted);
      font-size: 1.1rem;
      font-weight: 300;
      max-width: 800px;
      margin: 0 auto 20px;
    }

    .progress-section {
      max-width: 800px;
      margin: 0 auto 20px;
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border-dark);
      padding: 20px;
      border-radius: 12px;
      text-align: left;
    }

    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      font-size: 0.95rem;
    }

    .progress-bar-bg {
      width: 100%;
      height: 10px;
      background: rgba(255,255,255,0.05);
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 10px;
    }

    .progress-bar-fill {
      height: 100%;
      width: ${progressPercent}%;
      background: var(--accent-gold);
      border-radius: 10px;
      transition: width 0.5s ease;
    }

    .progress-stats {
      font-size: 0.85rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
    }

    .summary-badges {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      margin-top: 25px;
    }

    .summary-card {
      background: var(--panel-dark);
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      padding: 12px 24px;
      backdrop-filter: blur(12px);
      text-align: center;
    }

    .summary-num {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--accent-gold);
    }

    .summary-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-top: 2px;
    }

    .controls {
      max-width: 1400px;
      margin: 0 auto 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }

    .tabs {
      display: flex;
      gap: 10px;
      background: rgba(255, 255, 255, 0.03);
      padding: 6px;
      border-radius: 10px;
      border: 1px solid var(--border-dark);
    }

    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 8px 20px;
      font-size: 0.95rem;
      font-weight: 500;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .tab-btn:hover {
      color: var(--text-main);
      background: rgba(255, 255, 255, 0.03);
    }

    .tab-btn.active {
      background: var(--accent-gold);
      color: #000;
      font-weight: 600;
    }

    .queue-panel {
      background: var(--panel-dark);
      border: 1px solid rgba(197, 168, 128, 0.2);
      padding: 12px 24px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 15px;
      backdrop-filter: blur(12px);
    }

    .queue-title {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--accent-gold);
    }

    .queue-count {
      background: rgba(197, 168, 128, 0.15);
      color: var(--accent-gold);
      border: 1px solid var(--accent-gold);
      padding: 2px 10px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 700;
    }

    .queue-btn {
      background: var(--accent-gold);
      border: none;
      color: #000;
      font-weight: 600;
      font-size: 0.85rem;
      padding: 6px 16px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .queue-btn:hover {
      opacity: 0.9;
    }

    .audit-summary-box {
      max-width: 1400px;
      margin: 0 auto 30px;
      background: rgba(239, 68, 68, 0.05);
      border: 1px solid rgba(239, 68, 68, 0.15);
      padding: 20px;
      border-radius: 12px;
    }

    .audit-summary-box h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      color: var(--color-low);
      margin-bottom: 10px;
    }

    .audit-summary-box p {
      font-size: 0.95rem;
      color: var(--text-main);
      margin-bottom: 15px;
    }

    .remaining-tag-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      max-height: 120px;
      overflow-y: auto;
      background: rgba(0,0,0,0.2);
      padding: 12px;
      border-radius: 8px;
      border: 1px solid var(--border-dark);
    }

    .remaining-tag {
      background: rgba(239, 68, 68, 0.1);
      color: var(--color-low);
      border: 1px solid rgba(239, 68, 68, 0.2);
      font-size: 0.8rem;
      font-weight: 500;
      padding: 3px 10px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .grid {
      max-width: 1400px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
    }

    .card {
      background: var(--panel-dark);
      border: 1px solid var(--border-dark);
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(12px);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .card.flagged {
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .card.enhanced {
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .img-container {
      position: relative;
      width: 100%;
      padding-top: 66.67%; /* 3:2 standard landscape aspect */
      background: #000;
      overflow: hidden;
    }

    .img-container img {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
      transition: transform 0.5s ease;
    }

    .card:hover .img-container img {
      transform: translate(-50%, -50%) scale(1.05);
    }

    /* Before/After Comparison Slider Styles */
    .comparison-slider {
      position: relative;
      width: 100%;
      padding-top: 66.67%; /* Keep same 3:2 standard aspect ratio */
      overflow: hidden;
      background: #000;
    }

    .comparison-slider img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
    }

    .comparison-slider .img-before {
      z-index: 1;
    }

    .comparison-slider .resize-container {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 50%;
      z-index: 2;
      overflow: hidden;
      border-right: 2px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 0 10px rgba(0,0,0,0.5);
    }

    .comparison-slider .resize-container img {
      width: 100%;
      height: 100%;
      max-width: none;
      object-fit: cover;
    }

    .comparison-slider .slider-handle {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      width: 2px;
      background: #fff;
      z-index: 4;
      pointer-events: none;
      transform: translateX(-50%);
    }

    .comparison-slider .slider-handle::after {
      content: "↔";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 34px;
      height: 34px;
      background: var(--accent-gold);
      border: 2px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 700;
      font-size: 1rem;
      box-shadow: 0 4px 10px rgba(0,0,0,0.4);
    }

    .comparison-slider .comparison-range {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: ew-resize;
      z-index: 5;
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    .comparison-slider .comparison-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 40px;
      height: 350px;
      cursor: ew-resize;
    }

    .comparison-slider .comparison-range::-moz-range-thumb {
      width: 40px;
      height: 350px;
      cursor: ew-resize;
    }

    .badge-bar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
    }

    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 4px 10px;
      border-radius: 6px;
      pointer-events: auto;
    }

    .status-pro {
      background: var(--bg-pro);
      color: var(--color-pro);
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .status-medium {
      background: var(--bg-medium);
      color: var(--color-medium);
      border: 1px solid rgba(234, 179, 8, 0.3);
    }

    .status-low {
      background: var(--bg-low);
      color: var(--color-low);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .checkbox-container {
      background: rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-dark);
      pointer-events: auto;
      cursor: pointer;
    }

    .checkbox-container input {
      cursor: pointer;
    }

    .card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .filename {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--text-main);
    }

    .copy-btn {
      background: transparent;
      border: 1px solid var(--border-dark);
      color: var(--text-muted);
      font-size: 0.75rem;
      padding: 2px 8px;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      color: var(--accent-gold);
      border-color: var(--accent-gold);
    }

    .metadata-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;
      font-size: 0.85rem;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 15px;
    }

    .meta-item {
      display: flex;
      flex-direction: column;
    }

    .meta-label {
      color: var(--text-muted);
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .meta-value {
      font-weight: 500;
      color: var(--text-main);
    }

    .meta-value.status-pro-text { color: var(--color-pro); font-weight: 600; }
    .meta-value.status-medium-text { color: var(--color-medium); }
    .meta-value.status-low-text { color: var(--color-low); font-weight: 600; }

    .caption-box {
      font-size: 0.85rem;
      color: var(--text-muted);
      font-weight: 300;
      line-height: 1.4;
      flex-grow: 1;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-bottom: 15px;
    }

    .card-footer {
      display: flex;
      gap: 10px;
    }

    .view-btn {
      flex-grow: 1;
      text-align: center;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-dark);
      color: var(--text-main);
      padding: 8px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.2s;
    }

    .view-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* Modal for Queue Compilation */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.85);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(8px);
    }

    .modal {
      background: #161a21;
      border: 1px solid var(--border-dark);
      border-radius: 16px;
      width: 90%;
      max-width: 600px;
      padding: 30px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-dark);
      padding-bottom: 15px;
    }

    .modal-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.6rem;
      color: var(--text-main);
    }

    .modal-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
    }

    .modal-close:hover {
      color: var(--text-main);
    }

    .modal-body textarea {
      width: 100%;
      height: 250px;
      background: #0f1115;
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      color: var(--color-medium);
      font-family: monospace;
      padding: 15px;
      font-size: 0.9rem;
      resize: none;
      margin-bottom: 20px;
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 15px;
    }

    .action-btn {
      background: var(--accent-gold);
      border: none;
      color: #000;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .action-btn:hover {
      opacity: 0.9;
    }

    /* Compare Modal Overlay */
    .compare-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      backdrop-filter: blur(15px);
      padding: 20px;
    }

    .compare-modal {
      background: #12151c;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 20px;
      width: 95vw;
      max-width: 1200px;
      max-height: 95vh;
      padding: 24px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 30px 60px rgba(0,0,0,0.8);
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .full-slider {
      position: relative;
      width: 100%;
      height: 70vh; /* Large immersive height */
      background: #050608;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border-dark);
    }

    .full-slider img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain; /* PERFECT: shows the entire photo, no crop! */
    }

    .full-slider .slider-handle {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      width: 2px;
      background: #fff;
      z-index: 4;
      pointer-events: none;
      transform: translateX(-50%);
    }

    .full-slider .slider-handle::after {
      content: "↔";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      background: var(--accent-gold);
      border: 2px solid #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 700;
      font-size: 1.2rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }

    .full-slider .comparison-range {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: ew-resize;
      z-index: 5;
      margin: 0;
      -webkit-appearance: none;
      appearance: none;
    }

    .full-slider .comparison-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 50px;
      height: 70vh;
      cursor: ew-resize;
    }
    
    .full-slider .comparison-range::-moz-range-thumb {
      width: 50px;
      height: 70vh;
      cursor: ew-resize;
    }
  </style>
</head>
<body>

  <header>
    <h1>Eden Estate <span>Gallery Quality Audit</span></h1>
    <p class="subtitle">Interactive visualization dashboard of all ${totalPhotos} active photos. We have categorized the images by resolution to identify low-quality or highly compressed vertical shots that should be queued for swapping.</p>
    
    <div class="progress-section">
      <div class="progress-header">
        <span style="font-weight: 600; color: var(--text-main);">AI-Enhanced Swapping Progress</span>
        <span style="font-weight: 700; color: var(--accent-gold);">${progressPercent}% Complete</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill"></div>
      </div>
      <div class="progress-stats">
        <span>Swapped & Enhanced: <strong>${swappedCount}</strong> / ${totalLowResTarget} low-res files</span>
        <span>Remaining Flagged: <strong>${remainingSwapsCount}</strong> photos left to replace</span>
      </div>
    </div>

    <div class="summary-badges">
      <div class="summary-card">
        <div class="summary-num">${totalPhotos}</div>
        <div class="summary-label">Total Gallery Photos</div>
      </div>
      <div class="summary-card" style="border-color: rgba(16, 185, 129, 0.4);">
        <div class="summary-num" style="color: var(--color-pro);">${swappedCount}</div>
        <div class="summary-label">Swapped & Enhanced</div>
      </div>
      <div class="summary-card" style="border-color: rgba(239, 68, 68, 0.4);">
        <div class="summary-num" style="color: var(--color-low);">${remainingSwapsCount}</div>
        <div class="summary-label">Remaining Swaps</div>
      </div>
      <div class="summary-card" style="border-color: rgba(234, 179, 8, 0.4);">
        <div class="summary-num" style="color: var(--color-medium);">${portfolioCount}</div>
        <div class="summary-label">Portfolio (1200px)</div>
      </div>
      <div class="summary-card" style="border-color: rgba(16, 185, 129, 0.4);">
        <div class="summary-num" style="color: var(--color-pro);">${proGradeCount}</div>
        <div class="summary-label">Pro Grade (2560px)</div>
      </div>
    </div>
  </header>

  ${remainingSwapsCount > 0 ? `
  <div class="audit-summary-box">
    <h3>🔴 Swaps Left to Update (${remainingSwapsCount} photos)</h3>
    <p>The following ${remainingSwapsCount} photos are still low-resolution (720px wide) and require swapping to reach Pro Grade luxury standards. You can copy the list below or check them off as you swap them out.</p>
    <div class="remaining-tag-container">
      ${tagsHtml}
    </div>
  </div>` : `
  <div class="audit-summary-box" style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.15);">
    <h3 style="color: var(--color-pro);">🎉 All Swaps Completed!</h3>
    <p>Every single one of the original low-resolution gallery photos has been enhanced to Pro Grade DSLR luxury standard. Excellent work!</p>
  </div>`}

  <div class="controls">
    <div class="tabs">
      <button class="tab-btn active" onclick="filterGallery('all', this)">All (${totalPhotos})</button>
      <button class="tab-btn" onclick="filterGallery('low', this)">Remaining Swaps (${remainingSwapsCount})</button>
      <button class="tab-btn" style="color: var(--color-pro);" onclick="filterGallery('enhanced', this)">Swapped & Enhanced (${swappedCount})</button>
      <button class="tab-btn" onclick="filterGallery('medium', this)">Portfolio (${portfolioCount})</button>
      <button class="tab-btn" onclick="filterGallery('pro', this)">Pro Grade (${proGradeCount + swappedCount})</button>
    </div>

    <div class="queue-panel">
      <span class="queue-title">📋 Swap Queue Builder</span>
      <span class="queue-count" id="queueCount">0</span>
      <button class="queue-btn" onclick="openQueueModal()">View Queue JSON</button>
    </div>
  </div>

  <div class="grid">
    ${cardsHtml.join("")}
  </div>

  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <div class="modal-header">
        <h2 class="modal-title">Swapping Queue Compiled JSON</h2>
        <button class="modal-close" onclick="closeQueueModal()">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 12px;">This is the compiled list of photo filenames queued for replacement. You can copy this JSON block and send it to your photographer or use it to automate the swap.</p>
        <textarea id="jsonOutput" readonly></textarea>
      </div>
      <div class="modal-footer">
        <button class="action-btn" onclick="copyQueueJson()">Copy JSON Block</button>
      </div>
    </div>
  </div>

  <!-- Interactive Before/After Compare Lightbox Modal -->
  <div class="compare-modal-overlay" id="compareModalOverlay" onclick="closeCompareModal()">
    <div class="compare-modal" onclick="event.stopPropagation()">
      <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid var(--border-dark); padding-bottom: 10px;">
        <h2 class="modal-title" id="compareModalTitle">DSLR Pro Grade Image Comparison</h2>
        <button class="modal-close" onclick="closeCompareModal()">&times;</button>
      </div>
      <div class="modal-body" style="padding: 0;">
        <div class="full-slider" id="compareSliderContainer">
          <!-- Dynamically populated via JS to avoid bloat -->
        </div>
      </div>
      <div class="modal-footer" style="padding-top: 15px; border-top: 1px solid var(--border-dark); margin-top: 15px; display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.85rem; color: var(--text-muted);">↔ Drag the middle slider back and forth to inspect the full, uncropped photo details side-by-side.</span>
        <button class="action-btn" style="background: rgba(255,255,255,0.05); color: #fff; border: 1px solid var(--border-dark);" onclick="closeCompareModal()">Close Comparison</button>
      </div>
    </div>
  </div>

  <script>
    let queue = new Set(JSON.parse(localStorage.getItem('swapQueue') || '[]'));
    
    // Initialize checkboxes on page load
    document.addEventListener('DOMContentLoaded', () => {
      queue.forEach(file => {
        const checkbox = document.getElementById('check-' + file);
        if (checkbox) checkbox.checked = true;
      });
      updateQueueUI();
    });

    function toggleImageCompare(file, btn) {
      const img = document.getElementById('img-' + file);
      const isOriginal = img.src.includes('lowres_archive');
      if (!isOriginal) {
        img.src = '/gallery/lowres_archive/' + file;
        btn.innerText = '👉 Showing: ORIGINAL (Before)';
        btn.style.background = 'rgba(239, 68, 68, 0.2)';
        btn.style.color = 'var(--color-low)';
      } else {
        img.src = '/gallery/enhanced/' + file;
        btn.innerText = '🔄 Compare Live (Before vs After)';
        btn.style.background = 'rgba(255, 255, 255, 0.03)';
        btn.style.color = 'var(--accent-gold)';
      }
    }

    function updateComparisonSlider(file, val) {
      const resizeContainer = document.getElementById('resize-' + file);
      const handle = document.getElementById('handle-' + file);
      if (resizeContainer && handle) {
        resizeContainer.style.width = val + '%';
        handle.style.left = val + '%';
      }
    }

    function filterGallery(quality, button) {
      // Toggle button active classes
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const cards = document.querySelectorAll('.card');
      cards.forEach(card => {
        if (quality === 'all') {
          card.style.display = 'flex';
        } else if (quality === 'enhanced') {
          if (card.classList.contains('enhanced')) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        } else {
          // Standard filters
          if (card.dataset.quality === quality && !card.classList.contains('enhanced')) {
            card.style.display = 'flex';
          } else if (quality === 'pro' && card.classList.contains('enhanced')) {
            card.style.display = 'flex'; // Enhanced are also Pro Grade
          } else {
            card.style.display = 'none';
          }
        }
      });
    }

    function toggleQueue(file, event) {
      if (event) event.stopPropagation();
      const checkbox = document.getElementById('check-' + file);
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        syncCheckbox(file);
      }
    }

    function syncCheckbox(file) {
      const checkbox = document.getElementById('check-' + file);
      if (checkbox.checked) {
        queue.add(file);
      } else {
        queue.delete(file);
      }
      localStorage.setItem('swapQueue', JSON.stringify(Array.from(queue)));
      updateQueueUI();
    }

    function updateQueueUI() {
      document.getElementById('queueCount').innerText = queue.size;
    }

    function openQueueModal() {
      const array = Array.from(queue);
      const output = {
        queueCount: array.length,
        itemsToReplace: array,
        recommendedReplacements: array.map(file => {
          return {
            filename: file,
            recommendation: "Ensure high resolution (2560px wide) landscape DSLR image to replace " + file
          };
        })
      };
      document.getElementById('jsonOutput').value = JSON.stringify(output, null, 2);
      document.getElementById('modalOverlay').style.display = 'flex';
    }

    function closeQueueModal() {
      document.getElementById('modalOverlay').style.display = 'none';
    }

    function copyQueueJson() {
      const textarea = document.getElementById('jsonOutput');
      textarea.select();
      document.execCommand('copy');
      alert('Swapping Queue JSON copied to clipboard!');
    }

    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied filename: ' + text);
      }).catch(err => {
        alert('Could not copy filename: ' + text);
      });
    }

    function openCompareModal(filename, beforeSrc, afterSrc) {
      document.getElementById('compareModalTitle').innerText = 'Compare: ' + filename;
      
      const container = document.getElementById('compareSliderContainer');
      container.innerHTML = \`
        <img class="img-before" src="\${beforeSrc}" alt="Before \${filename}">
        <img class="img-after" id="after-modal" src="\${afterSrc}" alt="After \${filename}" style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%); z-index: 2;">
        <div class="slider-handle" id="handle-modal"></div>
        <input type="range" min="0" max="100" value="50" class="comparison-range" oninput="updateModalSlider(this.value)">
        <div class="badge-bar" style="pointer-events: none;">
          <span class="badge" style="background: rgba(239, 68, 68, 0.85); color: #fff; border: 1px solid rgba(239,68,68,0.3);">🔴 Original (Before)</span>
          <span class="badge" style="background: rgba(16, 185, 129, 0.85); color: #fff; border: 1px solid rgba(16,185,129,0.3);">✨ DSLR Enhanced (After)</span>
        </div>
      \`;
      
      document.getElementById('compareModalOverlay').style.display = 'flex';
    }

    function closeCompareModal() {
      document.getElementById('compareModalOverlay').style.display = 'none';
      document.getElementById('compareSliderContainer').innerHTML = '';
    }

    function updateModalSlider(val) {
      const imgAfter = document.getElementById('after-modal');
      const handle = document.getElementById('handle-modal');
      if (imgAfter && handle) {
        imgAfter.style.clipPath = \`polygon(0 0, \${val}% 0, \${val}% 100%, 0 100%)\`;
        handle.style.left = val + '%';
      }
    }
  </script>
</body>
</html>
`;

  fs.writeFileSync(outputHtmlPath, finalHtml, "utf8");
  console.log(`\n🎉 Quality Audit Dashboard (V2) successfully rebuilt at:`);
  console.log(`   file://${outputHtmlPath}`);
  console.log("==============================================");
}

main().catch(err => {
  console.error("❌ Error rebuilding quality audit dashboard:", err);
  process.exit(1);
});
