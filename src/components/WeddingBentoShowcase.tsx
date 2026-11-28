import { ResponsivePhoto } from "@/components/ResponsivePhoto";

interface SpaceTile {
  id: string;
  name: string;
  subtitle: string;
  photo: string;
  alt: string;
  spanClass: string;
  sizes: string;
  imageClassName?: string;
  isStaticImage?: boolean;
}

const spaces: SpaceTile[] = [
  {
    id: "meadow",
    name: "Sprawling Estate",
    subtitle: "28 acres · Up to 300 outdoors",
    photo: "/gallery/enhanced/2",
    alt: "Aerial sunset view of Eden: The Lemelson Estate grounds, pool, and ponds in Stowe",
    spanClass: "aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[300px] lg:min-h-[350px]",
    sizes: "(min-width: 768px) 58vw, 100vw",
    imageClassName: "object-bottom",
  },
  {
    id: "grounds-chapel",
    name: "Tented Receptions",
    subtitle: "Dine with panoramic views of the Green Mountains",
    photo: "/images/weddings-tent-banner.jpg",
    alt: "Illuminated white sailcloth wedding reception tent at twilight beside the hydrangea-lined stone wall at Eden: The Lemelson Estate",
    spanClass: "aspect-[4/3] md:col-span-5 md:aspect-auto md:min-h-[300px] lg:min-h-[350px]",
    sizes: "(min-width: 768px) 42vw, 100vw",
    imageClassName: "object-[58%_55%]",
    isStaticImage: true,
  },
  {
    id: "great-room",
    name: "Interior Grandeur",
    subtitle: "11,400 sq ft · Sleeps up to 20",
    photo: "/gallery/Eden-Site%20Photos/98",
    alt: "Double-height Great Room with soaring arched windows, Chesterfield sofas, grand piano, and dining room beyond at Eden: The Lemelson Estate",
    spanClass: "aspect-[3/2] md:col-span-6",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    id: "bridal-spa",
    name: "Luxury Throughout",
    subtitle: "French-inspired architecture · Spacious rooms & suites",
    photo: "/gallery/Eden-Site%20Photos/103",
    alt: "Primary marble bathroom with soaking tub under arched sunset windows and crystal chandelier at Eden: The Lemelson Estate",
    spanClass: "aspect-[3/2] md:col-span-6",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
];

/**
 * Flush 4-tile bento grid showcasing Eden's four wedding settings with bottom legibility scrims.
 */
export function WeddingBentoShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {spaces.map((space) => (
        <article
          key={space.id}
          className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl ${space.spanClass}`}
        >
          {space.isStaticImage ? (
            <img
              src={space.photo}
              alt={space.alt}
              width={1376}
              height={768}
              className={`h-full w-full object-cover md:absolute md:inset-0 ${space.imageClassName ?? ""}`}
            />
          ) : (
            <ResponsivePhoto
              basePath={space.photo}
              alt={space.alt}
              sizes={space.sizes}
              width={2400}
              height={1600}
              className={`h-full w-full object-cover md:absolute md:inset-0 ${space.imageClassName ?? ""}`}
            />
          )}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black/95 via-black/60 to-transparent md:h-1/2"
          />
          <div className="absolute inset-x-0 bottom-0 p-4 [text-shadow:0_2px_12px_rgba(0,0,0,0.8)] sm:p-6 md:p-7">
            <h3 className="text-xl font-semibold leading-tight text-white sm:text-2xl lg:text-3xl">
              {space.name}
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-[#f8f3ea] sm:text-[14px] md:text-[15px]">
              {space.subtitle}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
