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
    title: "Exterior Views",
    description: "Estate exterior showcasing architecture and grounds.",
    directory: "Eden-Site Photos",
    photos: [2, 3, 112, 1],
  },
  {
    title: "The Great Room",
    description: "Spacious gathering areas with soaring ceilings and elegant furnishings.",
    directory: "Eden-Site Photos",
    photos: [4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101],
  },
  {
    title: "Study Room / Library",
    description: "Private workspace for meetings and reading.",
    directory: "Eden-Site Photos",
    photos: [16],
  },
  {
    title: "Basement / Game Room",
    description: "Lower level recreation and entertainment space.",
    directory: "Eden-Site Photos",
    photos: [18, 93],
  },
  {
    title: "Upstairs Master Suite 1",
    description: "Luxurious master bedroom with premium amenities.",
    directory: "Eden-Site Photos",
    photos: [19, 20, 21],
  },
  {
    title: "Full Kitchen 1",
    description: "Gourmet kitchen with modern appliances and island seating.",
    directory: "Eden-Site Photos",
    photos: [22, 23, 24, 25],
  },
  {
    title: "Full Kitchen 2",
    description: "Additional kitchen space with professional-grade equipment.",
    directory: "Eden-Site Photos",
    photos: [26],
  },
  {
    title: "Great Dining Room",
    description: "Formal dining area for elegant entertaining.",
    directory: "Eden-Site Photos",
    photos: [27, 28],
  },
  {
    title: "Kitchen Dining Room",
    description: "Casual dining space adjacent to the kitchen.",
    directory: "Eden-Site Photos",
    photos: [29, 17],
  },
  {
    title: "Sun Room",
    description: "Bright, airy space with natural light and garden views.",
    directory: "Eden-Site Photos",
    photos: [30, 31, 32],
  },
  {
    title: "Bedroom 1",
    description: "Comfortable guest bedroom with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [33, 34, 35, 36, 102],
  },
  {
    title: "Bedroom 2",
    description: "Additional guest bedroom with elegant furnishings.",
    directory: "Eden-Site Photos",
    photos: [37],
  },
  {
    title: "Bedroom 3",
    description: "Spacious guest room with premium bedding.",
    directory: "Eden-Site Photos",
    photos: [38],
  },
  {
    title: "Bedroom 4",
    description: "Well-appointed guest bedroom with modern decor.",
    directory: "Eden-Site Photos",
    photos: [39],
  },
  {
    title: "Bedroom 5",
    description: "Comfortable guest room with quality furnishings.",
    directory: "Eden-Site Photos",
    photos: [40],
  },
  {
    title: "Bedroom 6",
    description: "Additional guest accommodation with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [41],
  },
  {
    title: "Bedroom 7",
    description: "Spacious guest room with elegant design.",
    directory: "Eden-Site Photos",
    photos: [42],
  },
  {
    title: "Bedroom 8",
    description: "Premium guest suite with luxury amenities.",
    directory: "Eden-Site Photos",
    photos: [43, 44],
  },
  {
    title: "Full Bathroom 1",
    description: "Master bathroom with spa-like features.",
    directory: "Eden-Site Photos",
    photos: [45, 46, 103, 104, 105],
  },
  {
    title: "Full Bathroom 2",
    description: "Guest bathroom with modern fixtures.",
    directory: "Eden-Site Photos",
    photos: [47, 48],
  },
  {
    title: "Full Bathroom 3",
    description: "Additional full bathroom with quality amenities.",
    directory: "Eden-Site Photos",
    photos: [49],
  },
  {
    title: "Full Bathroom 4",
    description: "Well-appointed bathroom with modern design.",
    directory: "Eden-Site Photos",
    photos: [50],
  },
  {
    title: "Lower Level Spa & Bathroom",
    description: "Spacious bathroom with spa amenities including steam shower, jacuzzi, and private sauna.",
    directory: "Eden-Site Photos",
    photos: [51, 52, 53, 106, 70],
  },
  {
    title: "Full Bathroom 6",
    description: "Additional full bathroom with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [54],
  },
  {
    title: "Half Bathroom 1",
    description: "Convenient powder room for guests.",
    directory: "Eden-Site Photos",
    photos: [55],
  },
  {
    title: "Half Bathroom 2",
    description: "Additional powder room with modern fixtures.",
    directory: "Eden-Site Photos",
    photos: [56],
  },
  {
    title: "Office",
    description: "Professional workspace with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [57, 107],
  },
  {
    title: "Backyard",
    description: "Outdoor spaces with gardens, patios, swimming pool, and recreational areas.",
    directory: "Eden-Site Photos",
    photos: [58, 59, 60, 61, 62, 63, 64, 68, 69, 88, 108, 109, 110, 113],
  },
  {
    title: "Home Gym & Recreation",
    description: "Fully equipped home fitness room and lower level recreation space.",
    directory: "Eden-Site Photos",
    photos: [96, 71],
  },
  {
    title: "Exterior",
    description: "Additional exterior views of the estate grounds and architecture.",
    directory: "Eden-Site Photos",
    photos: [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 89],
  },
  {
    title: "Hot Tub",
    description: "Relaxing outdoor hot tub area.",
    directory: "Eden-Site Photos",
    photos: [90, 91, 92],
  },
  {
    title: "Additional Photos",
    description: "Extra views and special features of the estate including winter activities and laundry facilities.",
    directory: "Eden-Site Photos",
    photos: [94, 95, 97, 111],
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
