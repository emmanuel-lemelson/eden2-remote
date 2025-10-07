import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryViewSwitcher } from "@/components/GalleryViewSwitcher";
import type { GallerySection } from "@/types/gallery";
import galleryData from "@/data/gallery.json";

export const metadata: Metadata = {
  title: "Gallery | Eden Estate Stowe",
  description:
    "Explore photos of Eden, a luxury 8-bedroom estate in Stowe, Vermont featuring spa amenities, pool, tennis, and mountain views.",
  alternates: {
    canonical: "https://www.lemelsonestate.com/gallery",
  },
  openGraph: {
    title: "Eden Estate Gallery | Stowe, Vermont",
    description:
      "Curated images of Eden’s grounds, interiors, and amenities across all seasons.",
    url: "https://www.lemelsonestate.com/gallery",
    type: "website",
    images: [
      {
        url: "https://www.lemelsonestate.com/gallery/office/outdoor%20shots/70-020-estate-pool-mountain-backdrop.webp",
        width: 1600,
        height: 900,
        alt: "Estate pool with mountain backdrop",
      },
    ],
  },
};

export default function GalleryPage() {
  const gallerySections: GallerySection[] = galleryData;

  return (
    <div>
      <section className="lux-section pb-6">
        <div className="lux-container">
          <SectionHeading
            eyebrow="Gallery"
            title="Scenes from Eden"
            description="Explore the estate through curated imagery"
          />
        </div>
      </section>

      <section className="pb-12">
        <GalleryViewSwitcher sections={gallerySections} />
      </section>

      <section className="lux-section pt-0">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 text-center md:p-10">
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
