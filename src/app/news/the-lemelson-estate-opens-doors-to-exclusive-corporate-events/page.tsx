import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The Lemelson Estate Opens Doors to Exclusive Corporate Events",
  description:
    "Eden: The Lemelson Estate introduces bespoke corporate retreats and private gatherings in Stowe, Vermont.",
  alternates: {
    canonical:
      "https://lemelsonestate.com/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/",
  },
  openGraph: {
    title:
      "The Lemelson Estate Opens Doors to Exclusive Corporate Events",
    description:
      "Eden introduces bespoke corporate retreats and private gatherings in Stowe, Vermont.",
    url:
      "https://lemelsonestate.com/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/",
    images: [
      {
        url: "https://lemelsonestate.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden Estate exterior view",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Lemelson Estate Opens Doors to Exclusive Corporate Events",
    description:
      "Eden introduces bespoke corporate retreats and private gatherings in Stowe, Vermont.",
    images: ["https://lemelsonestate.com/opengraph-image.png"],
  },
};

export default function CorporateEventsArticle() {
  const articlePublished = "2025-11-06";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline:
      "The Lemelson Estate Opens Doors to Exclusive Corporate Events",
    datePublished: articlePublished,
    dateModified: articlePublished,
    image: [
      "https://lemelsonestate.com/newsletter%201/DJI_0005.jpg",
      "https://lemelsonestate.com/newsletter%201/IMG_0954.jpg",
      "https://lemelsonestate.com/newsletter%201/Screenshot%202025-11-07%20at%206.14.59%E2%80%AFPM.png",
      "https://lemelsonestate.com/newsletter%201/Screenshot%202025-11-07%20at%206.15.19%E2%80%AFPM.png",
    ],
    mainEntityOfPage:
      "https://lemelsonestate.com/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/",
    publisher: {
      "@type": "Organization",
      name: "Eden: The Lemelson Estate",
      logo: {
        "@type": "ImageObject",
        url: "https://lemelsonestate.com/The%20Lemelson%20Estate%20(1).png",
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-white via-[#fdfbf7] to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="lux-container py-10 md:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-stone-500 transition-colors hover:text-stone-900"
            prefetch={true}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-3 w-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back to News
          </Link>
        </div>

        <header className="mb-12 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.5em] text-[var(--color-gold)] font-semibold">
            Press Release
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-stone-900 md:text-5xl">
            The Lemelson Estate Opens Doors to Exclusive Corporate Events
          </h1>
          <time
            dateTime={articlePublished}
            className="mt-4 block text-sm text-stone-500"
          >
            {new Date(articlePublished).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        {/* Intro section: text left, image right (like the PDF) */}
        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col justify-center prose prose-stone prose-lg max-w-none leading-relaxed">
            <p className="text-stone-700">
              STOWE, Vt., November 6, 2025 — 
              <strong className="text-stone-900">Eden – The Lemelson Estate</strong>{" "}
              (<a href="https://lemelsonestate.com/" target="_blank" rel="noopener noreferrer" className="!text-blue-600 hover:!underline cursor-pointer">https://lemelsonestate.com/</a>),
              known for its ultra‑luxury weddings and private stays, is pleased to announce the expansion of its offerings to include corporate events, executive retreats, and seasonal celebrations. The secluded{" "}
              <strong className="text-stone-900">28‑acre property</strong>, just five minutes from Stowe Mountain Resort and the charming village of Stowe, now welcomes companies seeking a distinctive and private venue for strategy sessions, client entertainment, and high‑end festivities.
            </p>
          </div>
          <figure className="w-full flex flex-col">
            <div className="overflow-hidden rounded-2xl border border-stone-200/60 shadow-[0_20px_60px_-20px_rgba(58,45,20,0.3)] flex-1">
              <div className="relative aspect-[4/3] w-full h-full">
                <Image
                  src="/gallery/Eden-Site%20Photos/2@1200w.webp"
                  alt="Aerial view of Eden Estate in Stowe, Vermont"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority={true}
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-xs italic text-stone-500">
              Eden–The Lemelson Estate Stowe, VT
            </figcaption>
          </figure>
        </section>

        {/* Nestled in Vermont paragraph with golfing image */}
        <section className="mt-16 grid gap-8 md:grid-cols-2 md:items-stretch">
          <figure className="order-2 md:order-1 w-full flex flex-col">
            <div className="relative w-full overflow-hidden rounded-xl border border-stone-200/60 bg-stone-50 shadow-[0_8px_24px_-8px_rgba(58,45,20,0.2)] flex-1">
              <div className="relative aspect-[4/3] w-full h-full">
                <Image
                  src="/newsletter%201/Screenshot-2025-11-07-61519PM@1200w.webp"
                  alt="Skiing at Stowe Mountain Resort and seasonal activities nearby"
                  fill
                  className="object-contain p-2"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-xs italic text-stone-500">
              Skiing at Stowe Mountain Resort
            </figcaption>
          </figure>
          <div className="order-1 md:order-2 flex flex-col justify-center prose prose-stone prose-lg max-w-none leading-relaxed">
            <p className="text-stone-700">
              Nestled in Vermont&apos;s Green Mountains with sweeping views of Mount Mansfield, Eden blends refined hospitality with absolute privacy. The estate offers elegant interiors, dedicated private meeting spaces, breakout rooms, and state-of-the-art support, including high-speed fiber-optic internet throughout. With accommodations for up to <strong className="text-stone-900">20 overnight guests</strong> and capacity for over <strong className="text-stone-900">250+ when tented</strong>, Eden is perfectly suited for gatherings ranging from intimate board meetings to large corporate galas.
            </p>
          </div>
        </section>

        {/* Quote + interior image pairing */}
        <section className="mt-16 grid gap-8 md:grid-cols-2 md:items-stretch">
          <div className="flex flex-col justify-center pr-4">
            <blockquote className="relative border-l-4 border-[var(--color-gold)] pl-8 pr-6 py-6">
              <p className="text-xl leading-relaxed text-stone-800 font-light italic mb-6">
                Corporate guests come to Eden for inspiration, connection, and
                absolute discretion. We set the stage for teams to reset
                and collaborate, ensuring every detail—from chef‑prepared dining to
                custom activity itineraries—is handled through personalized,
                white‑glove service.
              </p>
              <footer className="text-sm text-stone-600 font-medium not-italic">
                <cite className="not-italic">
                  — <span className="text-stone-900">Heather Marie</span>, Luxury Guest Experience Manager
                </cite>
              </footer>
            </blockquote>
          </div>
          <figure className="w-full flex flex-col">
            <div className="overflow-hidden rounded-xl border border-stone-200/60 shadow-[0_8px_24px_-8px_rgba(58,45,20,0.2)] flex-1">
              <div className="relative aspect-[4/3] w-full h-full">
                <Image
                  src="/newsletter%201/IMG_0954@1200w.webp"
                  alt="Warm, contemporary interior at Eden ideal for executive retreats"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
            </div>
            <figcaption className="mt-3 text-xs italic text-stone-500">
              Golfing at Stowe Mountain Resort
            </figcaption>
          </figure>
        </section>

        {/* Location and capacity alongside local activities (skiing image) */}
        <section className="mt-16 grid gap-6 md:grid-cols-2 md:items-stretch">
          <figure className="order-2 md:order-1 w-full flex flex-col">
            <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-xl border border-stone-200/60 shadow-[0_8px_24px_-8px_rgba(58,45,20,0.2)] flex-1">
              <Image
                src="/newsletter%201/Screenshot-2025-11-07-61459PM@1200w.webp"
                alt="Chef Emma's seared scallops with summer succotash"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 300px, 100vw"
                loading="lazy"
                fetchPriority="low"
              />
            </div>
            <figcaption className="mt-3 text-xs italic text-stone-500">
              Chef Emma&apos;s seared scallops with summer succotash
            </figcaption>
          </figure>
          <div className="order-1 md:order-2 flex flex-col justify-center prose prose-stone prose-lg max-w-none leading-relaxed">
            <p className="text-stone-700">
              Events include chef‑led farm‑to‑table menus featuring Vermont&apos;s finest local ingredients and wine pairings, tailored to match the season—from summer soirées to winter gatherings by roaring fireplaces. The concierge team curates custom itineraries with activities such as skiing, hiking, golf, and local brewery tours.
            </p>
            <p className="text-stone-700 mt-4">
              <strong className="text-stone-900">Booking &amp; Availability:</strong> Corporate retreats and holiday events are available year‑round, with limited peak‑season availability.
            </p>
          </div>
        </section>

        <div className="mt-16 flex justify-center border-t border-stone-200/60 pt-12">
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 md:gap-3 rounded-full border-2 border-[var(--color-gold)] bg-white px-6 py-3.5 md:px-8 md:py-4 text-base md:text-sm font-semibold uppercase tracking-[0.2em] md:tracking-[0.35em] text-stone-900 shadow-[0_4px_12px_-4px_rgba(194,160,96,0.4)] transition-all hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 hover:shadow-[0_8px_20px_-6px_rgba(194,160,96,0.5)] w-full max-w-sm md:w-auto md:max-w-none"
            prefetch={true}
          >
            <span className="text-center">Inquire About Corporate Events</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5 md:h-4 md:w-4 transition-transform group-hover:translate-x-1 flex-shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Media & Booking Inquiries and About Section */}
        <section className="mt-16 border-t border-stone-200/60 pt-12">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Media & Booking Inquiries */}
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Media &amp; Booking Inquiries:
              </h2>
              <div className="space-y-2 text-stone-700">
                <p className="leading-relaxed">
                  Heather Marie | Luxury Guest Experience Manager<br />
                  Eden – The Lemelson Estate
                </p>
                <p>
                  <a
                    href="mailto:admin@lemelsoncapital.com"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    admin@lemelsoncapital.com
                  </a>
                </p>
              </div>
            </div>

            {/* About Eden—The Lemelson Estate */}
            <div>
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                About Eden—The Lemelson Estate:
              </h2>
              <p className="text-stone-700 leading-relaxed">
                Eden—The Lemelson Estate is a premier luxury property in Stowe, Vermont, offering curated stays, weddings, and corporate gatherings. Located on 28 private acres with panoramic mountain views, the estate combines modern elegance with Vermont&apos;s natural charm.
              </p>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}


