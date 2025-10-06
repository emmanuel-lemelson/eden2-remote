const fs = require("fs");
const path = require("path");

const galleryRoot = path.join(process.cwd(), "public", "gallery");
const excludedFilenames = new Set([
  "30-007-wicker-furniture-sunroom-stone-floor.webp",
  "120-014-tagging-error-14.webp",
  "164-030-tagging-error-30.webp",
  "151-072-tagging-error-72.webp",
  "147-011-tagging-error-11.webp",
  "116-077-tagging-error-77.webp",
]);

const captionOverrides = new Map([
  ["01-026-aerial-view-mountain-estate.webp", "Aerial view front"],
  ["06-snowy-house-distant-view.webp", "Back of estate in winter"],
  ["100-026-forest-with-sunbeams-mist.webp", "Backyard with sunbeams mist"],
  ["102-015-starry-night-snowy-trees.webp", "Starry night in winter"],
  ["95-055-green-front-doors-planters.webp", "Front entrance"],
  ["08-grand-living-room-fireplace.webp", "Grand living room and fireplace"],
  ["17-dining-room-with-scenic-view.webp", "Library room/study room"],
  ["14-modern-kitchen-white-cabinets.webp", "Modern primary kitchen"],
  ["168-076-tagging-error-76.webp", "New appliances"],
  ["69-006-pool-patio-blue-cushions.webp", "Pool patio"],
  ["70-020-estate-pool-mountain-backdrop.webp", "Back of estate aerial view during sunset"],
  ["72-044-hot-tub-snowy-landscape.webp", "Hot tub in winter"],
  ["103-016-winter-village-snow-mountains.webp", "Stowe village with mountains in view"],
  ["150-064-tagging-error-64.webp", "St. Katherine Orthodox Chapel (on property)"],
  ["176-079-tagging-error-79.webp", "Front of home"],
  ["84-040-garden-view-pond-flowers.webp", "View of upper spring-fed pond"],
  ["97-053-stone-address-marker.webp", "Driveway entrance"],
  ["106-012-family-sledding-on-snow.webp", "The estate has a wonderful sledding hill"],
  ["108-025-winter-horse-sleigh-ride.webp", "Sleigh rides minutes from the estate"],
  ["105-018-family-enjoying-cross-country-skiing.webp", "The grounds of the estate are great for cross-country skiing"],
  ["107-014-woman-snowshoeing-in-winter.webp", "Snowshoeing is a popular activity around the property"],
  ["111-003-tall-christmas-tree-gifts.webp", "The estate's Christmas tree"],
  ["99-008-sunlit-forest-path.webp", "Sunlit forest path 5 minutes from the estate"],
]);

const gallerySectionConfig = [
  {
    title: "Estate Arrival",
    description: "First impressions of Eden's architecture and mountainous backdrop, captured from every angle.",
    directory: path.join("office", "outdoor shots"),
  },
  {
    title: "Grounds & Gardens",
    description: "Rolling lawns, spring-fed ponds, and lovingly tended gardens surrounding the estate.",
    directory: "grounds",
  },
  {
    title: "Activities & Seasonal Moments",
    description: "From snowy sledding to summer evenings by the fire.",
    directory: path.join("grounds", "activities"),
  },
  {
    title: "Great Room",
    description: "Gathering spaces with soaring ceilings.",
    directory: path.join("office", "great room"),
  },
  {
    title: "Library Study",
    description: "A workspace for private meetings or reading.",
    directory: path.join("office", "library room"),
  },
  {
    title: "Sun Room",
    description: "A great place to relax during all seasons.",
    directory: path.join("sun room"),
  },
  {
    title: "Chef's Kitchen & Dining",
    description: "Gourmet-ready kitchens and elegant dining spaces prepared for curated culinary experiences.",
    directory: path.join("office", "Main Kitchen"),
  },
  {
    title: "Bedrooms & Wardrobes",
    description: "Luxurious bedrooms with extensive storage.",
    directory: path.join("office", "bedroom"),
  },
  {
    title: "Spa & Baths",
    description: "Various spa amenities and bathrooms.",
    directory: path.join("office", "bathrooms"),
  },
  {
    title: "Lower Level Recreation",
    description: "Game rooms, lounges, and wellness areas located on the estate's lower level.",
    directory: path.join("office", "basement"),
  },
  {
    title: "Intimate Celebrations",
    description: "Weddings and special gatherings during any season.",
    directory: "weddings",
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

function loadImages(directory) {
  const directoryPath = path.join(galleryRoot, directory);

  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  return fs
    .readdirSync(directoryPath, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => !entry.name.startsWith("."))
    .filter((entry) => !excludedFilenames.has(entry.name))
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" })
    )
    .map((entry) => {
      const relativePath = path.join(directory, entry.name).split(path.sep).join("/");
      const src = encodeURI(`/gallery/${relativePath}`);
      const override = captionOverrides.get(entry.name);
      return {
        src,
        alt: override ?? buildAltText(entry.name),
      };
    });
}

const gallerySections = gallerySectionConfig
  .map((section) => ({
    ...section,
    images: loadImages(section.directory),
  }))
  .filter((section) => section.images.length > 0);

// Write the generated data to a JSON file
const outputPath = path.join(process.cwd(), "src", "data", "gallery.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(gallerySections, null, 2));

console.log(`Generated gallery data with ${gallerySections.length} sections`);
console.log(`Total images: ${gallerySections.reduce((sum, section) => sum + section.images.length, 0)}`);
