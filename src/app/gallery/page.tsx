import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryImage } from "@/components/GalleryImage";
import galleryData from "@/data/gallery.json";

type GalleryImageItem = {
  src: string;
  alt: string;
  srcset?: string;
  sizes?: string;
  width: number;
  height: number;
};

type GallerySection = {
  title: string;
  description?: string;
  directory: string;
  images: GalleryImageItem[];
};

export const metadata: Metadata = {
  title: "Gallery | Eden Estate Stowe",
  description:
    "Explore photos of Eden, a luxury 8-bedroom estate in Stowe, Vermont featuring spa amenities, pool, tennis, and mountain views.",
  alternates: {
    canonical: "https://lemelsonestate.com/gallery",
  },
  openGraph: {
    title: "Eden Estate Gallery | Stowe, Vermont",
    description:
      "Curated images of Eden’s grounds, interiors, and amenities across all seasons.",
    url: "https://lemelsonestate.com/gallery",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/gallery/office/outdoor%20shots/70-020-estate-pool-mountain-backdrop.webp",
        width: 1600,
        height: 900,
        alt: "Estate pool with mountain backdrop",
      },
    ],
  },
};

export default function GalleryPage() {
  const gallerySections: GallerySection[] = galleryData;

  let globalImageIndex = 0;

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
          {gallerySections.map((section) => {
            const sectionStartIndex = globalImageIndex;
            globalImageIndex += section.images.length;
            return (
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

                <div className="masonry-container">
                  {section.images.map((image, index) => {
                    const absoluteIndex = sectionStartIndex + index;
                    const altText =
                      image.alt && image.alt !== "Eden Estate gallery image"
                        ? image.alt
                        : `${section.title} at Eden Estate`;
                    return (
                    <div
                      key={image.src}
                      className="masonry-item overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
                      style={{ contentVisibility: "auto" }}
                    >
                      <GalleryImage
                        src={image.src}
                        srcSet={image.srcset}
                        alt={altText}
                        width={image.width}
                        height={image.height}
                        sizes={image.sizes}
                        index={absoluteIndex}
                        />
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
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
