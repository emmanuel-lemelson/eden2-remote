const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const galleryRoot = path.join(process.cwd(), "public", "gallery");
const excludedFilenames = new Set([
  "30-007-wicker-furniture-sunroom-stone-floor.webp",
  "120-014-tagging-error-14.webp",
  "164-030-tagging-error-30.webp",
  "151-072-tagging-error-72.webp",
  "147-011-tagging-error-11.webp",
  "116-077-tagging-error-77.webp",
]);

// Load captions from external JSON file
let captionOverrides = new Map();
try {
  const captionsPath = path.join(process.cwd(), "src", "data", "captions.json");
  if (fs.existsSync(captionsPath)) {
    const captionsData = JSON.parse(fs.readFileSync(captionsPath, "utf-8"));
    captionOverrides = new Map(Object.entries(captionsData));
  }
} catch (err) {
  console.warn("Could not load captions.json:", err.message);
}

const gallerySectionConfig = [
  {
    title: "The Estate & Grounds",
    description: "Scenic aerials, professional tennis court, spring-fed ponds, landscaped gardens, swimming pool, and outdoor hot tub.",
    directory: "Eden-Site Photos",
    photos: [
      2, 3, 112, 1, // Exterior Views
      75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 89, // Exterior
      58, 59, 61, 62, 63, 64, 68, 69, 88, 108, 109, 110, 113, // Backyard
      90, 91, 92 // Hot Tub
    ],
  },
  {
    title: "Grand Living Spaces",
    description: "Elegant gathering areas featuring soaring ceilings, a massive stone fireplace, sun-drenched sunroom, private study, and dual workspaces.",
    directory: "Eden-Site Photos",
    photos: [
      4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101, // The Great Room
      16, // Study Room / Library
      30, 31, 32, // Sun Room
      57, 107 // Office
    ],
  },
  {
    title: "Gourmet Kitchen & Dining",
    description: "Fully equipped chef's kitchen, professional second kitchen, formal dining room, and an intimate light-filled breakfast nook.",
    directory: "Eden-Site Photos",
    photos: [
      22, 23, 24, 25, // Full Kitchen 1
      26, // Full Kitchen 2
      27, 28, // Great Dining Room
      29, 17 // Kitchen Dining Room
    ],
  },
  {
    title: "Bedrooms & Suites",
    description: "Eight luxury bedrooms, including a palatial master suite, with premium linens, warm fireplaces, and beautiful mountain views.",
    directory: "Eden-Site Photos",
    photos: [
      19, 20, 21, // Upstairs Master Suite 1
      33, 34, 35, 36, 102, // Bedroom 1
      37, // Bedroom 2
      38, // Bedroom 3
      39, // Bedroom 4
      40, // Bedroom 5
      41, // Bedroom 6
      42, // Bedroom 7
      43, 44 // Bedroom 8
    ],
  },
  {
    title: "Spa & Bathrooms",
    description: "Private wellness retreat featuring a dry sauna, multi-head steam shower, indoor jacuzzi, and beautifully designed full and half bathrooms.",
    directory: "Eden-Site Photos",
    photos: [
      52, 53, 106, 70, // Lower Level Spa & Bathroom
      45, 46, 103, 104, 105, // Full Bathroom 1
      47, 48, // Full Bathroom 2
      49, // Full Bathroom 3
      50, // Full Bathroom 4
      54, // Full Bathroom 6
      55, // Half Bathroom 1
      56 // Half Bathroom 2
    ],
  },
  {
    title: "Leisure & Recreation",
    description: "Downstairs game room with billiards, professional home gym, and on-property resort amenities including sledding and smart laundry facilities.",
    directory: "Eden-Site Photos",
    photos: [
      18, 93, // Basement / Game Room
      96, 71, // Home Gym & Recreation
      94, 95, 97, 111 // Additional Photos
    ],
  },
];

function buildAltText(filename) {
  const base = filename.replace(/\.[^/.]+$/, "");

  if (base.includes("tagging-error")) {
    return "Sunroom";
  }

  const tokens = base
    .split("-")
    .filter((token, index) => !(index <= 1 && /^\d+$/.test(token)))
    .map((token) => token.replace(/\d+/g, ""))
    .filter(Boolean);

  if (tokens.length === 0) {
    return "Eden Estate gallery image";
  }

  const sentence = tokens.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

async function ensureVariantsForImage(absSrcPath, widths) {
  const ext = path.extname(absSrcPath).toLowerCase();
  const base = absSrcPath.slice(0, -ext.length);
  const out = [];
  const metadata = await sharp(absSrcPath).metadata();
  
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    
    // Only generate this variant if the target width is smaller than or equal to the original width,
    // OR if this is the first breakpoint that is larger than the original image's width.
    // This ensures we always have at least one WebP variant capturing full resolution, but no oversized duplicates.
    if (w > metadata.width && i > 0) {
      const previousWidth = widths[i - 1];
      if (previousWidth >= metadata.width) {
        continue;
      }
    }

    const outPath = `${base}@${w}w.webp`;
    // Generate variant if missing
    if (!fs.existsSync(outPath)) {
      await sharp(absSrcPath).resize({ width: w, withoutEnlargement: true }).webp({ quality: 70 }).toFile(outPath);
    }
    // Record public path
    const relFromPublic = outPath.split(path.join(process.cwd(), "public"))[1];
    out.push(relFromPublic.replace(/\\/g, "/"));
  }
  return { variants: out, width: metadata.width ?? widths[widths.length - 1], height: metadata.height ?? widths[widths.length - 1] };
}

function loadImagesSync(section) {
  const { directory, startPhoto, endPhoto, photos } = section;
  const directoryPath = path.join(galleryRoot, directory);

  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  // Get all files
  const allFiles = fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => !entry.name.startsWith("."))
    .filter((entry) => !entry.name.includes("@")) // Exclude resized variants
    .filter((entry) => !excludedFilenames.has(entry.name));

  // Extract photo numbers from filenames
  const parsedFiles = allFiles.map((entry) => {
    const match = entry.name.match(/^(\d+)/);
    const photoNum = match ? parseInt(match[1], 10) : 0;
    return { entry, photoNum };
  });

  // Filter based on explicit list or range
  let filesInRange;
  if (Array.isArray(photos)) {
    // Retain exact order defined in the photos array
    filesInRange = [];
    photos.forEach((num) => {
      const found = parsedFiles.find((p) => p.photoNum === num);
      if (found) {
        filesInRange.push(found);
      }
    });
  } else {
    filesInRange = parsedFiles
      .filter(({ photoNum }) => photoNum >= startPhoto && photoNum <= endPhoto)
      .sort((a, b) => a.photoNum - b.photoNum);
  }

  const result = filesInRange.map(({ entry }) => {
    const relativePath = path.join(directory, entry.name).split(path.sep).join("/");
    const src = encodeURI(`/gallery/${relativePath}`);
    const override = captionOverrides.get(entry.name);
    return { 
      src, 
      alt: override ?? buildAltText(entry.name), 
      filename: entry.name, 
      rel: relativePath 
    };
  });

  return result;
}

async function buildGallery() {
  const widths = [400, 800, 1200, 1600, 2000, 2400];
  const sections = [];
  for (const section of gallerySectionConfig) {
    const images = loadImagesSync(section);
    if (images.length === 0) continue;
    const processed = [];
    for (const img of images) {
      const absPath = path.join(galleryRoot, img.rel);
      const { variants: variantPaths, width, height } = await ensureVariantsForImage(absPath, widths);
      const srcset = variantPaths
        .map((rel) => `${encodeURI(rel)} ${rel.match(/@(\d+)w\./)?.[1]}w`)
        .join(", ");
      processed.push({
        src: encodeURI(`/gallery/${img.rel}`),
        alt: img.alt,
        srcset,
        sizes: "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
        width,
        height,
      });
    }
    sections.push({ ...section, images: processed });
  }
  return sections;
}

async function main() {
  const gallerySections = await buildGallery();
  const outputPath = path.join(process.cwd(), "src", "data", "gallery.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(gallerySections, null, 2));
  console.log(`Generated gallery data with ${gallerySections.length} sections`);
  console.log(
    `Total images: ${gallerySections.reduce((sum, section) => sum + section.images.length, 0)}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
