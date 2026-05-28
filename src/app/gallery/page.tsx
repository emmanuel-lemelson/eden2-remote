import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { GallerySectionGrid } from "@/components/GallerySectionGrid";
import type { GallerySection } from "@/types/gallery";
import galleryData from "@/data/gallery.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Gallery | Eden Estate Stowe",
  description:
    "Explore photos of Eden, a luxury 8-bedroom estate in Stowe, Vermont featuring spa amenities, pool, tennis, and mountain views.",
  alternates: {
    canonical: "https://lemelsonestate.com/gallery/",
  },
  openGraph: {
    title: "Eden Estate Gallery | Stowe, Vermont",
    description:
      "Curated images of Eden’s grounds, interiors, and amenities across all seasons.",
    url: "https://lemelsonestate.com/gallery/",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/gallery/Eden-Site%20Photos/2.avif",
        width: 720,
        height: 480,
        alt: "Eden Estate exterior view",
      },
    ],
  },
};

export default function GalleryPage() {
  const gallerySections: GallerySection[] = galleryData;

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-12 pb-8">
        <div className="lux-container">
          <SectionHeading
            eyebrow="Gallery"
            as="h1"
            title="Scenes from Eden"
            description="Explore the estate through curated imagery"
            align="left"
          />
        </div>
      </section>

      <section className="pb-12">
        <GallerySectionGrid sections={gallerySections} />
      </section>

      <section className="lux-section pt-0">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 text-center md:p-10">
          <h2 className="text-4xl font-semibold text-stone-900">
            Tailored for Every Guest
          </h2>
          <p className="mt-4 text-base text-stone-700">
            From kids’ activities to spa treatments and chef-prepared dinners, there’s something for everyone at Eden.
          </p>
          <Link
            href="/contact"
            prefetch={true}
            className="mt-8 inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
          >
            Connect with the Team
          </Link>
        </div>
      </section>
    </div>
  );
}
