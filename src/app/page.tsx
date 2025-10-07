import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { AutoPlayVideo } from "@/components/AutoPlayVideo";
import { WhereToFindUs } from "@/components/WhereToFindUs";

const quickFacts = [
  { label: "Bedrooms", value: "8" },
  { label: "Bathrooms", value: "8" },
  { label: "Interior", value: "11,400 sq ft" },
  { label: "Property", value: "28 acres" },
  { label: "Amenities", value: "Pool, spa, tennis, game room" },
  { label: "Style", value: "Luxury mountain estate" },
];

const galleryPreview = [
  {
    src: "/gallery/Eden-Site Photos/1.webp",
    alt: "Eden Estate exterior view",
  },
  {
    src: "/gallery/Eden-Site Photos/2.avif",
    alt: "Eden Estate exterior view",
  },
  {
    src: "/gallery/Eden-Site Photos/3.avif",
    alt: "Eden Estate exterior view",
  },
  {
    src: "/gallery/Eden-Site Photos/5.avif",
    alt: "Eden Estate interior view",
  },
];

const testimonials = [
  {
    quote:
      "Absolutely loved this place, worth every single penny…. Secluded, beautiful, fun, and spacious. The service was the best I’ve EVER experienced, nonstop communication, and instant responses.",
    name: "Joshua",
    detail: "Stayed Jul 2025, Group Trip",
  },
  {
    quote:
      "We were fortunate enough to stay at this magnificent estate for a long weekend. The house is impeccably clean and well cared for… Five star hosts and five star house. Highly recommend and would love to return.",
    name: "Margot M.",
    detail: "Stayed Feb 2025, VRBO Guest",
  },
  {
    quote:
      "We had our wedding ceremony in the great room and enjoyed the weekend with our family. It was absolutely beautiful throughout the house and had so many perks and special amenities—we definitely felt like we were staying in a very luxurious place.",
    name: "Seanna",
    detail: "Winter Wedding, Feb 2023",
  },
];

export default function Home() {
  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HOME_VIDEO_URL ||
    "/Eden_%20A%20Journey%20Over%20The%20Lemelson%20Estate.mp4";

  return (
    <>
      <section className="bg-white">
        <div className="lux-container flex flex-col items-center gap-5 pb-8 pt-0 text-center text-stone-900 md:gap-7 md:pb-10 md:pt-2">
          <div className="flex flex-col items-center gap-3 md:gap-5">
            <Image
              src="/The Lemelson Estate (1).png"
              alt="The Lemelson Estate wordmark"
              width={680}
              height={680}
              className="h-48 w-auto -mt-10 -mb-6 md:h-72 md:-mt-12 md:-mb-8"
              priority
            />
            <h1 className="text-3xl font-semibold leading-tight sm:text-[2.35rem] md:text-5xl">The Lemelson Estate Welcomes You</h1>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-600 sm:text-sm md:text-base">Bespoke Luxury in Stowe, Vermont</p>
          </div>

          <div className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
              <div className="aspect-[16/9] w-full">
                {heroVideoUrl ? (
                  <AutoPlayVideo
                    className="h-full w-full origin-center transform object-cover scale-110"
                    src={heroVideoUrl}
                    poster="/gallery/Eden-Site Photos/1.webp"
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/gallery/Eden-Site Photos/2.avif')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/45" />
                    <div className="relative z-10 flex flex-col items-center gap-3 px-6 text-white">
                      <span className="text-xs uppercase tracking-[0.4em] text-white/70">
                        Eden Estate
                      </span>
                      <p className="text-3xl font-semibold md:text-4xl">A Journey Above The Lemelson Estate</p>
                      <p className="max-w-xl text-sm text-white/80 md:text-base">
                        Upload your cinematic tour by updating the `heroVideoUrl` with a Vercel Blob link. The video will play here automatically once available.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container py-10 md:py-14">
          <WhereToFindUs />
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-1">
        <div className="lux-container !px-4 sm:!px-6">
          <div className="relative grid gap-6 overflow-hidden rounded-[2.75rem] border border-[color:rgba(217,209,195,0.6)] bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[color:rgba(210,196,163,0.2)] px-3 py-7 shadow-[0_32px_68px_-42px_rgba(58,45,20,0.55)] sm:px-10 sm:py-10 md:grid-cols-3 md:p-14">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[color:rgba(210,196,163,0.25)]"
              aria-hidden
            />

            <div className="relative md:col-span-1">
              <p className="text-xs uppercase tracking-[0.55em] text-[var(--color-gold)] sm:text-sm">
                Welcome to Eden
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--color-charcoal)] sm:mt-4 sm:text-[2.5rem]">
                Estate at a glance
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:mt-4 sm:text-base">
                Escape to one of Stowe’s most exclusive estates. With 11,400 square
                feet of living space, Eden offers room for up to 20 guests to gather in
                comfort and style.
              </p>
            </div>

            <dl className="relative grid grid-cols-2 gap-3 sm:gap-4 md:col-span-2 md:grid-cols-2">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-4 shadow-[0_24px_44px_-32px_rgba(58,45,20,0.55)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_64px_-36px_rgba(58,45,20,0.6)] sm:p-6"
                >
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-[color:rgba(232,218,192,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <dt className="relative text-[0.7rem] uppercase tracking-[0.35em] text-[var(--color-gold)] font-semibold drop-shadow-[0_1px_0_rgba(255,255,255,0.75)]">
                    {fact.label}
                  </dt>
                  <dd className="relative mt-2 text-lg font-semibold text-[var(--color-charcoal)] sm:mt-3 sm:text-2xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white/80 animate-fade-up fade-delay-2">
        <div className="lux-container space-y-8">
          <SectionHeading
            eyebrow="Gallery"
            title="A glimpse of Eden"
            description="Your Private Vermont Resort"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {galleryPreview.map((item) => (
              <div
                key={item.src}
                className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_24px_48px_-32px_rgba(58,45,20,0.55)]"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="pointer-events-none object-cover"
                  />
                  <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/15 opacity-40" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
            >
              View More Photos
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white/80 animate-fade-up">
        <div className="lux-container">
          <TestimonialCarousel testimonials={testimonials} />
          <div className="mt-8 flex justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-7 py-2.5 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
            >
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-2">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 text-center md:p-16">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Plan Your Stay
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-stone-900 md:text-5xl">
            Reserve Eden for your next gathering.
          </h2>
          <p className="mt-4 text-base text-stone-700 md:text-lg">
            Share your vision with us, and we&apos;ll work with you to craft an unforgettable experience that exceeds your expectations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-stone-800 transition hover:border-stone-400 hover:bg-white/80"
            >
              Start a Conversation
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 transition hover:text-stone-900"
            >
              Explore the Estate
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
