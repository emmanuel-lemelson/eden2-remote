import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { GallerySectionGrid } from "@/components/GallerySectionGrid";
import type { GallerySection } from "@/types/gallery";
import galleryData from "@/data/gallery.json";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Photo Gallery | Eden Luxury 8-Bedroom Estate in Stowe, VT",
  description:
    "Explore photos of Eden, a luxury 8-bedroom estate in Stowe, Vermont featuring spa amenities, heated pool, cedar sauna, clay tennis court, and Worcester Mountain views.",
  alternates: {
    canonical: "https://lemelsonestate.com/gallery/",
  },
  openGraph: {
    title: "Photo Gallery | Eden Luxury 8-Bedroom Estate in Stowe, VT",
    description:
      "Curated images of Eden’s grounds, interiors, bedrooms, and spa amenities across all seasons in Stowe, Vermont.",
    url: "https://lemelsonestate.com/gallery/",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate aerial view in Stowe, Vermont",
      },
    ],
  },
};

export default function GalleryPage() {
  const gallerySections: GallerySection[] = galleryData;

  return (
    <div>
      <section className="pt-8 pb-8">
        <div className="lux-container space-y-4">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Gallery", href: "/gallery/" },
            ]}
          />
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

      <section className="lux-section !pt-4 md:!pt-8">
        <div className="lux-container">
          <div className="overflow-hidden rounded-3xl border border-stone-200/70 bg-white/80 px-6 py-10 text-center md:px-12 md:py-14">
          <h2 className="text-3xl font-semibold text-stone-900 text-balance md:text-4xl">
            Tailored for Every Guest
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-700 text-pretty">
            From kids’ activities to spa treatments and chef-prepared dinners, there’s something for everyone at Eden.
          </p>
          <Link
            href="/contact"
            prefetch={true}
            className="mt-8 inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
          >
            Connect with the Team
          </Link>
        </div>
          </div>
      </section>
    </div>
  );
}
