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
    description: "Photos 1-3: Estate exterior showcasing architecture and grounds.",
    directory: "Eden-Site Photos",
    startPhoto: 1,
    endPhoto: 3,
  },
  {
    title: "The Great Room",
    description: "Photos 4-15: Spacious gathering areas with soaring ceilings and elegant furnishings.",
    directory: "Eden-Site Photos",
    photos: [4, 6, 7, 9, 10, 11, 12, 13, 14, 15, 98, 99, 100, 101],
  },
  {
    title: "Study Room / Library",
    description: "Photos 16-17: Private workspace for meetings and reading.",
    directory: "Eden-Site Photos",
    startPhoto: 16,
    endPhoto: 17,
  },
  {
    title: "Basement / Game Room",
    description: "Photo 18: Lower level recreation and entertainment space.",
    directory: "Eden-Site Photos",
    startPhoto: 18,
    endPhoto: 18,
  },
  {
    title: "Upstairs Master Suite 1",
    description: "Photos 19-21: Luxurious master bedroom with premium amenities.",
    directory: "Eden-Site Photos",
    startPhoto: 19,
    endPhoto: 21,
  },
  {
    title: "Full Kitchen 1",
    description: "Photos 22-25: Gourmet kitchen with modern appliances and island seating.",
    directory: "Eden-Site Photos",
    startPhoto: 22,
    endPhoto: 25,
  },
  {
    title: "Full Kitchen 2",
    description: "Photo 26: Additional kitchen space with professional-grade equipment.",
    directory: "Eden-Site Photos",
    startPhoto: 26,
    endPhoto: 26,
  },
  {
    title: "Great Dining Room",
    description: "Photos 27-28: Formal dining area for elegant entertaining.",
    directory: "Eden-Site Photos",
    startPhoto: 27,
    endPhoto: 28,
  },
  {
    title: "Kitchen Dining Room",
    description: "Photo 29: Casual dining space adjacent to the kitchen.",
    directory: "Eden-Site Photos",
    startPhoto: 29,
    endPhoto: 29,
  },
  {
    title: "Sun Room",
    description: "Photos 30-32: Bright, airy space with natural light and garden views.",
    directory: "Eden-Site Photos",
    startPhoto: 30, endPhoto: 32,
  },
  {
    title: "Bedroom 1",
    description: "Photos 33-36: Comfortable guest bedroom with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [33, 34, 35, 36, 102],
  },
  {
    title: "Bedroom 2",
    description: "Photo 37: Additional guest bedroom with elegant furnishings.",
    directory: "Eden-Site Photos",
    startPhoto: 37,
    endPhoto: 37,
  },
  {
    title: "Bedroom 3",
    description: "Photo 38: Spacious guest room with premium bedding.",
    directory: "Eden-Site Photos",
    startPhoto: 38,
    endPhoto: 38,
  },
  {
    title: "Bedroom 4",
    description: "Photo 39: Well-appointed guest bedroom with modern decor.",
    directory: "Eden-Site Photos",
    startPhoto: 39,
    endPhoto: 39,
  },
  {
    title: "Bedroom 5",
    description: "Photo 40: Comfortable guest room with quality furnishings.",
    directory: "Eden-Site Photos",
    startPhoto: 40,
    endPhoto: 40,
  },
  {
    title: "Bedroom 6",
    description: "Photo 41: Additional guest accommodation with modern amenities.",
    directory: "Eden-Site Photos",
    startPhoto: 41,
    endPhoto: 41,
  },
  {
    title: "Bedroom 7",
    description: "Photo 42: Spacious guest room with elegant design.",
    directory: "Eden-Site Photos",
    startPhoto: 42,
    endPhoto: 42,
  },
  {
    title: "Bedroom 8",
    description: "Photos 43-44: Premium guest suite with luxury amenities.",
    directory: "Eden-Site Photos",
    startPhoto: 43,
    endPhoto: 44,
  },
  {
    title: "Full Bathroom 1",
    description: "Photos 45-46: Master bathroom with spa-like features.",
    directory: "Eden-Site Photos",
    photos: [45, 46, 103, 104, 105],
  },
  {
    title: "Full Bathroom 2",
    description: "Photos 47-48: Guest bathroom with modern fixtures.",
    directory: "Eden-Site Photos",
    startPhoto: 47,
    endPhoto: 48,
  },
  {
    title: "Full Bathroom 3",
    description: "Photo 49: Additional full bathroom with quality amenities.",
    directory: "Eden-Site Photos",
    startPhoto: 49,
    endPhoto: 49,
  },
  {
    title: "Full Bathroom 4",
    description: "Photo 50: Well-appointed bathroom with modern design.",
    directory: "Eden-Site Photos",
    startPhoto: 50,
    endPhoto: 50,
  },
  {
    title: "Full Bathroom 5",
    description: "Photos 51-53: Spacious bathroom with luxury features.",
    directory: "Eden-Site Photos",
    photos: [51, 52, 53, 106],
  },
  {
    title: "Full Bathroom 6",
    description: "Photo 54: Additional full bathroom with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [54],
  },
  {
    title: "Half Bathroom 1",
    description: "Photo 55: Convenient powder room for guests.",
    directory: "Eden-Site Photos",
    photos: [55],
  },
  {
    title: "Half Bathroom 2",
    description: "Photo 56: Additional powder room with modern fixtures.",
    directory: "Eden-Site Photos",
    startPhoto: 56,
    endPhoto: 56,
  },
  {
    title: "Office",
    description: "Photo 57: Professional workspace with modern amenities.",
    directory: "Eden-Site Photos",
    photos: [57, 107],
  },
  {
    title: "Backyard",
    description: "Photos 58-69: Outdoor spaces with gardens, patios, and recreational areas.",
    directory: "Eden-Site Photos",
    photos: [58, 59, 60, 61, 62, 63, 64, 68, 69, 108, 109, 110],
  },
  {
    title: "Gym / Game Room",
    description: "Photos 70-71: Fitness and entertainment facilities.",
    directory: "Eden-Site Photos",
    startPhoto: 70,
    endPhoto: 71,
  },
  {
    title: "Exterior",
    description: "Photos 72-87: Additional exterior views of the estate grounds and architecture.",
    directory: "Eden-Site Photos",
    photos: [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 89],
  },
  {
    title: "Hot Tub",
    description: "Photos 90-92: Relaxing outdoor hot tub area.",
    directory: "Eden-Site Photos",
    startPhoto: 90,
    endPhoto: 92,
  },
  {
    title: "Children's Play Room",
    description: "Photo 93: Dedicated play space for younger guests.",
    directory: "Eden-Site Photos",
    startPhoto: 93,
    endPhoto: 93,
  },
  {
    title: "Additional Photos",
    description: "Photos 94-97: Extra views and special features of the estate.",
    directory: "Eden-Site Photos",
    photos: [94, 95, 96, 97, 111, 112],
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
  for (const w of widths) {
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
  const widths = [400, 800, 1200];
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
