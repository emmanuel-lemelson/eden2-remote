import fs from "fs";
import path from "path";

import { SectionHeading } from "@/components/SectionHeading";
import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
};

type GallerySection = {
  title: string;
  description?: string;
  directory: string;
  images: GalleryImage[];
};

const galleryRoot = path.join(process.cwd(), "public", "gallery");
const excludedFilenames = new Set([
  "30-007-wicker-furniture-sunroom-stone-floor.webp",
  "120-014-tagging-error-14.webp",
  "164-030-tagging-error-30.webp",
  "151-072-tagging-error-72.webp",
  "147-011-tagging-error-11.webp",
  "116-077-tagging-error-77.webp",
]);

const captionOverrides = new Map<string, string>([
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

const gallerySectionConfig: Array<Omit<GallerySection, "images">> = [
  {
    title: "Estate Arrival",
    description:
      "First impressions of Eden's architecture and mountainous backdrop, captured from every angle.",
    directory: path.join("office", "outdoor shots"),
  },
  {
    title: "Grounds & Gardens",
    description:
      "Rolling lawns, spring-fed ponds, and lovingly tended gardens surrounding the estate.",
    directory: "grounds",
  },
  {
    title: "Activities & Seasonal Moments",
    description:
      "From snowy sledding to summer evenings by the fire.",
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
    description:
      "Gourmet-ready kitchens and elegant dining spaces prepared for curated culinary experiences.",
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
    description:
      "Game rooms, lounges, and wellness areas located on the estate's lower level.",
    directory: path.join("office", "basement"),
  },
  {
    title: "Intimate Celebrations",
    description: "Weddings and special gatherings during any season.",
    directory: "weddings",
  },
];

const gallerySections: GallerySection[] = gallerySectionConfig
  .map((section) => ({
    ...section,
    images: loadImages(section.directory),
  }))
  .filter((section) => section.images.length > 0);

function loadImages(directory: string): GalleryImage[] {
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

function buildAltText(filename: string): string {
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

export default function GalleryPage() {
  return (
    <div>
      <section className="lux-section pb-10">
        <div className="lux-container">
          <SectionHeading
            eyebrow="Gallery"
            title="Scenes from Eden"
            description="Explore the estate through curated imagery"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="lux-container space-y-24">
          {gallerySections.map((section) => (
            <article key={section.title} className="space-y-8">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold text-stone-900">
                  {section.title}
                </h3>
                {section.description ? (
                  <p className="mt-2 text-base text-stone-700">
                    {section.description}
                  </p>
                ) : null}
              </div>

              <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
                {section.images.map((image) => (
                  <figure
                    key={image.src}
                    className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
                    style={{ contentVisibility: "auto", containIntrinsicSize: "800px 1200px" }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      className="w-full object-cover"
                      loading="lazy"
                      /**
                       * Provide responsive sizes so the browser selects a smaller
                       * file per column layout (1/2/3 columns).
                       */
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      quality={70}
                      width={1200}
                      height={800}
                    />
                    <figcaption className="px-6 pb-6 pt-4 text-sm text-stone-600">
                      {image.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lux-section pt-0">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 text-center md:p-16">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Preview and Planning
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-stone-900">
            Tailored for Every Guest
          </h2>
          <p className="mt-4 text-base text-stone-700">
            From kids’ activities to spa treatments and chef-prepared dinners, there’s something for everyone at Eden.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
          >
            Connect with the Team
          </a>
        </div>
      </section>
    </div>
  );
}
