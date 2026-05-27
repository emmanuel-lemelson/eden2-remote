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
    title: "Estate & Grounds",
    description: "Aerial views, private tennis court, spring-fed ponds, manicured gardens, and the swimming pool.",
    directory: "Eden-Site Photos",
    photos: [
      112, // Panoramic High-Altitude Aerial view of entire estate (Cover Shot)
      2,   // High-altitude aerial view of pool and residence at sunset
      3,   // High-angle aerial of front entrance approach at dusk
      1,   // Exterior daytime view of grand front entrance (autumn foliage)
      86,  // High-angle view of estate nestled in red/orange autumn foliage
      87,  // Rear twilight view highlighting pool and warm windows
      113, // Resort-style pool patio with circular hot tub at dusk
      88,  // Pool patio wicker furniture with royal blue cushions
      69,  // Stone pool patio wicker lounge with dark red cushions
      89,  // Swimming pool deck in early morning mist and sunbeams
      111, // Outdoor dining table next to private tennis court
      108, // Sun-drenched spring-fed pond, boulders, tall grasses
      58,  // Spring-fed pond with pink/purple wildflowers, estate in background
      75,  // Beautiful landscape shot of a calm pond at sunset/dusk
      79,  // Garden pond, yellow wildflowers, mature shade trees
      59,  // Dry stone garden wall and wildflowers in front of sunroom
      64,  // Magical woodland path boardwalk through dense forest with sunbeams
      110, // Landscaped stone steps leading up terraced lawn
      80,  // Whimsical copper giraffe sculptures in garden
      76,  // Carved cherub stone planters with red roses in garden
      77,  // Rustic white urn planter with pink roses
      109, // Cherub stone planters with yellow/red roses, pond background
      68,  // Wide winter exterior elevation under clear blue sky
      78   // Winter night-time view of rear facade illuminated
    ],
  },
  {
    title: "Living Spaces",
    description: "The Great Room, stone fireplaces, sunroom, and library workspaces.",
    directory: "Eden-Site Photos",
    photos: [
      98,  // Great Room panoramic showing soaring double-height ceilings, timber trusses, Chesterfield sofas (Cover)
      99,  // Great Room showing sofas, staircase, loft walkway
      4,   // Great Room looking down from loft walkway onto conversation area
      101, // Great Room conversation seating next to grand piano and tall windows
      100, // Great Room massive stone fireplace and dark wood paneling
      6,   // Great Room cozy fireplace close-up with plush damask armchairs
      12,  // Stack of birch logs inside copper log bucket
      9,   // Wood-carved stag sculpture on starburst inlaid table
      10,  // Upper-level loft landing with dark wrought-iron chandelier
      11,  // Christmas tree glowing with warm lights next to snowy forest window
      7,   // Symmetrical windows looking out at serene winter mountain landscape
      15,  // Macro detail shot of gold-leaf and silver hand-carved woodwork
      20,  // Entryway polished console table, ornate oval mirror, crystal lamp
      19,  // Silver-threaded damask sofa detail against classic white wainscoting
      30,  // Sunroom featuring custom wicker furniture, stone-tiled floor
      31,  // Sunroom wicker seating showing stone fireplace and lit fire
      16,  // Warm, cozy study/media room and library bookshelves
      57,  // Spacious home office/library with wooden desk, stained-glass lamp
      107  // Executive study/office on upper level with circular window
    ],
  },
  {
    title: "Kitchen & Dining",
    description: "Gourmet chef's kitchen, prep kitchen, formal dining room, and breakfast nooks.",
    directory: "Eden-Site Photos",
    photos: [
      22,  // Gourmet kitchen wide view with vaulted ceilings, island (Cover)
      24,  // Gourmet kitchen highlighting custom white cabinets, built-in ovens
      23,  // Kitchen sink window view overlooking green backyard lawn and pond
      25,  // Close-up of professional built-in stainless steel wall ovens
      26,  // Prep kitchen with warm wood cabinets, bar counter
      27,  // Formal Great Dining Room table set with crystal (daytime)
      28,  // Formal Great Dining Room set for a dinner party, crystal chandelier
      13,  // Dining table close-up with red wine and leather nailhead chairs
      17,  // Casual dining nook in bay alcove looking at spring blossoms
      29   // Breakfast nook bay windows under high octagonal wood-paneled ceiling
    ],
  },
  {
    title: "Bedrooms",
    description: "The master suite, guest bedrooms, bunk rooms, and cozy reading alcoves.",
    directory: "Eden-Site Photos",
    photos: [
      102, // Palatial Master Suite with king bed and private deck exit (Cover)
      36,  // Spacious custom walk-in dressing room/closet with marble island
      34,  // Luxurious guest bedroom with king bed, ornate headboard
      37,  // Spacious guest bedroom with king bed and streaming sunbeams
      33,  // Sunlit window seat alcove in a guest bedroom (reading nook)
      40,  // Guest bedroom under vaulted ceiling with arched window
      42,  // Double queen bedroom with premium white linens and wood console
      43,  // Cozy guest bedroom with queen bed and grey upholstered armchair
      38,  // Whimsical yellow bedroom with white metal canopy four-poster queen bed
      39,  // Charming guest bedroom with twin beds and patterned quilts
      41,  // Children's bedroom with white twin bunk bed plus twin bed
      44,  // Cozy nursery corner with grey armchair and baby crib
      35   // Bed detail showing pillows and Mount Mansfield chocolates welcome gift
    ],
  },
  {
    title: "Spa & Bathrooms",
    description: "Cedar sauna, master soaking tub, en-suite bathrooms, and powder rooms.",
    directory: "Eden-Site Photos",
    photos: [
      103, // Ensuite master bath soaking tub under sunset window (Cover)
      104, // Master Bathroom soaking tub and sunset window reflection
      106, // Indoor spa area showing white soaking tub with lit candles
      46,  // Luxury en-suite bathroom with white jacuzzi tub under wide windows
      48,  // Ensuite bathroom soaking tub in grey marble deck under windows
      70,  // Cedar sauna close-up with warm wood and sauna accessories
      53,  // Wooden spa console table with rolled towels and water bottles
      105, // Master Bathroom double vanity with marble counter
      45,  // Master en-suite bathroom vanity close-up, gold faucets
      47,  // Pristine guest bathroom with long double-sink vanity
      50,  // Ensuite guest bathroom, white vanity, marble shower
      49,  // Modern bathroom double vanity with green glass vessel sinks
      52,  // Close-up of mosaic glass tiles on shower wall
      54,  // Ensuite guest bathroom under sloped ceiling with skylight
      55,  // Powder room with deep reddish-pink walls, antique vanity
      56   // Powder room with dark wood vanity, white marble top
    ],
  },
  {
    title: "Activities",
    description: "Billiards game room, home gym, cross-country skiing, horse-drawn sleigh rides, and weddings.",
    directory: "Eden-Site Photos",
    photos: [
      18,  // Downstairs family and recreation room with lit fireplace (Cover)
      93,  // Downstairs family room wide view showing pool table
      71,  // Recreation room with wooden foosball table
      96,  // Professional home gym/fitness center fully equipped
      97,  // Spacious high-end laundry room with smart washers/dryers
      90,  // Bubbling outdoor hot tub steaming in summer next to pond
      91,  // Person soaking in winter steaming hot tub looking at golden sun
      92,  // Steaming outdoor hot tub in winter snow landscape
      32,  // Roaring outdoor campfire/fire pit with roasting marshmallows
      61,  // Guest cross-country skiing under warm winter golden hour sunset
      94,  // Four guests cross-country skiing along snow-covered forest path
      95,  // Traditional horse-drawn red sleigh ride across snow field
      62,  // Parent pulling two kids on a sled down a snowy slope
      81,  // Serene winter landscape, snow stream, classic white church steeple
      63,  // Magical winter night snow-laden pine forest under starry night sky
      84,  // Rustic wooden chapel in snowy pine forest with sun rays
      82,  // Winter bride in white wedding gown and white fur wrap
      83,  // Bride and groom embracing in snow courtyard of estate
      14,  // Indoor portrait of bride and groom on grand wooden staircase
      21   // Indoor portrait of bride standing next to console table
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
