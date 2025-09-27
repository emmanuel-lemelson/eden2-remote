import { SectionHeading } from "@/components/SectionHeading";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    alt: "Great room with mountain view",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor terrace at dusk",
    width: 1200,
    height: 1600,
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1600&q=80",
    alt: "Spa hydrotherapy suite",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80",
    alt: "Chef's kitchen detail",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
    alt: "Luxury bedroom suite",
    width: 1200,
    height: 1600,
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1600&q=80",
    alt: "Private woodland trail",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=1600&q=80",
    alt: "Private cinema room",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1616628188496-cb9e1a6f4441?auto=format&fit=crop&w=1600&q=80",
    alt: "Heated pool at twilight",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
    alt: "Dining pavilion",
    width: 1200,
    height: 1600,
    orientation: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    alt: "Sunrise over Stowe valley",
    width: 1600,
    height: 1200,
    orientation: "landscape",
  },
];

export default function GalleryPage() {
  return (
    <div>
      <section className="lux-section pb-10">
        <div className="lux-container">
          <SectionHeading
            eyebrow="Gallery"
            title="Scenes from Eden"
            description="Explore the estate through curated imagery that captures the warmth, scale, and detail of every crafted space."
            align="center"
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="lux-container">
          <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
            {galleryImages.map((image) => (
              <figure
                key={image.src}
                className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-white/60 bg-white/70 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover"
                  loading="lazy"
                  width={image.width}
                  height={image.height}
                />
                <figcaption className="px-6 pb-6 pt-4 text-sm text-stone-600">
                  {image.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section pt-0">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 text-center md:p-16">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Preview and Planning
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-stone-900">
            Bespoke itineraries, available upon request.
          </h2>
          <p className="mt-4 text-base text-stone-700">
            A dedicated Eden curator will tailor every detail of your stay—from culinary experiences to alpine adventures.
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
