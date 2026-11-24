import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel, PerfectReviewsBadge } from "@/components/TestimonialCarousel";
import { AutoPlayVideo } from "@/components/AutoPlayVideo";
import { WhereToFindUs } from "@/components/WhereToFindUs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";

const quickFacts = [
  { label: "Bedrooms & Baths", value: "8 Bed · 8 Bath" },
  { label: "Overnight / Events", value: "Sleeps 20 · Up to 300 Tented" },
  { label: "Interior & Grounds", value: "11,400 sq ft · 28 Private Acres" },
  { label: "Wellness & Recreation", value: "Heated Pool, 3 Spas, Sauna, Tennis, Gym" },
  { label: "Location", value: "Edson Hill Road Area · 5 Min to Skiing" },
  { label: "Stays", value: "Pet-Friendly · Direct Booking" },
];

const experienceCards = [
  {
    eyebrow: "Vacation & Ski Stays",
    title: "Luxury Stowe Vacation & Ski Stays",
    description:
      "8 bedrooms, sleeps 20, pet-friendly stays just 5 minutes from Stowe Mountain Resort—with 3 hot tubs, sauna, heated pool, playroom, and zero third-party platform fees.",
    href: "/stays/",
    cta: "Explore Luxury Stays",
  },
  {
    eyebrow: "Private Estate Weddings",
    title: "Private Estate Weddings",
    description:
      "28 private acres with Worcester Mountain views, lodging for 20 overnight guests, Upper Meadow tented receptions up to 300, no food & beverage minimums, and transparent 2026 pricing.",
    href: "/weddings/",
    cta: "View 2026 Wedding Pricing",
  },
  {
    eyebrow: "Executive Offsites",
    title: "Corporate & Executive Retreats",
    description:
      "Total privacy for leadership summits and board retreats—featuring high-speed fiber-optic Wi-Fi, breakout spaces, private chef farm-to-table dining, and curated Stowe itineraries.",
    href: "/retreats/",
    cta: "Explore Corporate Retreats",
  },
];

const homeFaqs: FaqItem[] = [
  {
    question: "Where is Eden: The Lemelson Estate located in Stowe, Vermont?",
    answer:
      "Eden sits on 28 private acres in the Edson Hill Road area of Stowe, Vermont—a 5-minute walk from Wiessner Woods trails and roughly a 5-minute drive from Stowe Mountain Resort skiing, Mount Mansfield, and downtown Stowe Village.",
  },
  {
    question: "What are the advantages of booking directly on lemelsonestate.com?",
    answer:
      "Booking directly with our estate team eliminates third-party service fees charged by Airbnb, Vrbo, and Expedia, guarantees the best rate, and connects you directly with our concierge team for custom stays, weddings, and retreats.",
  },
  {
    question: "How many guests can stay overnight or attend an event at the estate?",
    answer:
      "The 11,400 sq ft residence features 8 bedrooms and 8 bathrooms accommodating up to 20 overnight guests. For weddings and corporate galas, outdoor tented meadow receptions accommodate up to 300 guests.",
  },
  {
    question: "Is Eden a pet-friendly vacation rental?",
    answer:
      "Yes. Eden welcomes pets on vacation stays so the entire family can enjoy Stowe together. Let our estate team know about your pets when submitting your inquiry.",
  },
  {
    question: "What wellness and family amenities are included?",
    answer:
      "Guests have exclusive access to a year-round 10-person outdoor hot tub, indoor 2-person spa, mountain-view garden spa, private cedar sauna, steam shower, seasonal heated pool (May–Sept), private gym, clay tennis court, game room, children's playroom, and twin spring-fed trout ponds.",
  },
];

const galleryPreview = [
  {
    src: "/gallery/enhanced/2@1200w.webp",
    srcSet:
      "/gallery/enhanced/2@400w.webp 400w, /gallery/enhanced/2@800w.webp 800w, /gallery/enhanced/2@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/enhanced/2@400w.avif 400w, /gallery/enhanced/2@800w.avif 800w, /gallery/enhanced/2@1200w.avif 1200w",
    alt: "Breathtaking high-altitude sunset aerial view of the entire luxury estate, showing the main residence, swimming pool, and spring-fed pond.",
  },
  {
    src: "/gallery/Eden-Site%20Photos/98@1200w.webp",
    srcSet:
      "/gallery/Eden-Site%20Photos/98@400w.webp 400w, /gallery/Eden-Site%20Photos/98@800w.webp 800w, /gallery/Eden-Site%20Photos/98@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/Eden-Site%20Photos/98@400w.avif 400w, /gallery/Eden-Site%20Photos/98@800w.avif 800w, /gallery/Eden-Site%20Photos/98@1200w.avif 1200w",
    alt: "Wide-angle interior view of the magnificent Great Room featuring soaring timber trusses, a massive stone fireplace, two Chesterfield leather sofas, and a grand piano.",
  },
  {
    src: "/gallery/Eden-Site%20Photos/103@1200w.webp",
    srcSet:
      "/gallery/Eden-Site%20Photos/103@400w.webp 400w, /gallery/Eden-Site%20Photos/103@800w.webp 800w, /gallery/Eden-Site%20Photos/103@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/Eden-Site%20Photos/103@400w.avif 400w, /gallery/Eden-Site%20Photos/103@800w.avif 800w, /gallery/Eden-Site%20Photos/103@1200w.avif 1200w",
    alt: "Luxury master bathroom en-suite showing a soaking tub set in a dark marble deck under a dramatic arched window framing a mountain sunset.",
  },
  {
    src: "/gallery/enhanced/87@1200w.webp",
    srcSet:
      "/gallery/enhanced/87@400w.webp 400w, /gallery/enhanced/87@800w.webp 800w, /gallery/enhanced/87@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/enhanced/87@400w.avif 400w, /gallery/enhanced/87@800w.avif 800w, /gallery/enhanced/87@1200w.avif 1200w",
    alt: "Rear exterior twilight view of the estate, showcasing the glowing warm windows overlooking the stone-paved patio and private swimming pool.",
  },
];

const testimonials = [
  {
    quote:
      "Absolutely loved this place, worth every single penny. Secluded, beautiful, fun, and spacious. The service was the best I’ve EVER experienced, with nonstop communication and instant responses. I truly felt like a guest, not a client.",
    name: "Joshua",
    detail: "Stayed Jul 2025, Group Trip",
    platform: "Airbnb",
  },
  {
    quote:
      "This magnificent estate is impeccably clean and well cared for. The host left wine, snacks, and flowers on the kitchen counter, and even put little boxes of chocolate on every bed! The sauna, hot tub, and game room are outstanding.",
    name: "Margot M.",
    detail: "Stayed Feb 2025, VRBO Guest",
    platform: "Vrbo",
  },
  {
    quote:
      "Perfect house for a large family or group. Extremely clean and in perfect order. The pool, hot tub, and clay tennis court were fantastic with beautiful views of the mountains, gardens, and the most awesome sunsets! I highly recommend this house.",
    name: "Susan C. W.",
    detail: "Stayed Jul 2023, VRBO Guest",
    platform: "Vrbo",
  },
  {
    quote:
      "This incredible property is a unique combination of the luxury, amenities and benefits of a 5-star resort with the intimacy and privacy that comes with renting a vacation home. The experience was flawless and exceeded our expectations—no detail was overlooked.",
    name: "Nazzic K.",
    detail: "Christmas Getaway, Dec 2021",
    platform: "Vrbo",
  },
  {
    quote:
      "We had our wedding ceremony in the great room and enjoyed the weekend with our family. It was absolutely beautiful throughout the house and had so many perks and special amenities—we definitely felt like we were staying in a very luxurious place.",
    name: "Seanna",
    detail: "Winter Wedding, Feb 2023",
    platform: "Airbnb",
  },
];

export default function Home() {
  const heroVideoUrl =
    process.env.NEXT_PUBLIC_HOME_VIDEO_URL ||
    "/Eden_%20A%20Journey%20Over%20The%20Lemelson%20Estate.mp4?v=2";

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: "Eden: A Journey Over The Lemelson Estate — Stowe, Vermont",
    description:
      "Aerial tour over Eden: The Lemelson Estate's 28 private acres, residence, heated swimming pool, spring-fed trout ponds, and Worcester Mountain views in Stowe, Vermont.",
    thumbnailUrl: ["https://lemelsonestate.com/gallery/enhanced/2@1200w.webp"],
    contentUrl:
      "https://lemelsonestate.com/Eden_%20A%20Journey%20Over%20The%20Lemelson%20Estate.mp4",
    uploadDate: "2025-11-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
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
            <h1 className="text-3xl font-semibold leading-tight text-balance sm:text-[2.35rem] md:text-5xl">The Lemelson Estate Welcomes You</h1>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-600 sm:text-sm md:text-base">Luxury Vacation Rental, Private Wedding &amp; Retreat Estate in Stowe, Vermont</p>
          </div>

          <div className="w-full">
            <div className="relative overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
              <div className="aspect-[16/9] w-full">
                {heroVideoUrl ? (
                  <AutoPlayVideo
                    className="h-full w-full object-cover"
                    src={heroVideoUrl}
                    poster="/gallery/Eden-Site Photos/1.webp"
                  />
                ) : (
                  <div
                    className="relative flex h-full w-full flex-col items-center justify-center gap-4 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/gallery/enhanced/2.avif')",
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

          <div className="mt-4 flex flex-col items-center gap-3">
            <Link
              href="/contact"
              aria-describedby="hero-direct-booking-note"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#8f7845]"
            >
              Reserve Now
            </Link>
            <p
              id="hero-direct-booking-note"
              className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-medium tracking-[0.03em] text-stone-600 sm:text-[0.8125rem]"
            >
              <span className="inline-flex items-center gap-1.5 text-stone-800">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  className="h-3.5 w-3.5 text-[#8f7845]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5l3.5 3.5 7.5-8" />
                </svg>
                Book directly with the estate
              </span>
              <span aria-hidden="true" className="text-[#c2a060]">•</span>
              <span>Zero third-party platform fees</span>
              <span aria-hidden="true" className="text-[#c2a060]">•</span>
              <span>Best rate guaranteed</span>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container py-10 md:py-14">
          <WhereToFindUs title="As Seen On" />
        </div>
      </section>

      <section className="lux-section bg-white animate-fade-up fade-delay-1">
        <div className="lux-container !px-4 sm:!px-6">
          <div className="relative grid gap-6 overflow-hidden rounded-[2.75rem] border border-[color:rgba(217,209,195,0.4)] bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[color:rgba(210,196,163,0.15)] px-3 py-7 shadow-[0_32px_64px_-40px_rgba(58,45,20,0.18)] sm:px-10 sm:py-10 md:grid-cols-3 md:p-14">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[color:rgba(210,196,163,0.15)]"
              aria-hidden
            />

            <div className="relative md:col-span-1">
              <h2 className="text-3xl font-semibold text-[var(--color-charcoal)] sm:text-[2.5rem]">
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
                  className="relative overflow-hidden rounded-2xl border border-[var(--color-gold)]/25 bg-white/45 p-5 shadow-[0_12px_30px_-15px_rgba(58,45,20,0.02)] backdrop-blur-md sm:p-6"
                >
                  <dt className="relative text-[0.62rem] font-bold uppercase tracking-[0.2em] text-stone-500 sm:text-xs">
                    {fact.label}
                  </dt>
                  <dd className="relative mt-1 text-base font-semibold text-stone-900 sm:mt-2 sm:text-lg md:text-xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="lux-section !pt-4 !pb-12 bg-white animate-fade-up fade-delay-1">
        <div className="lux-container space-y-12">
          <SectionHeading
            eyebrow="Experience Eden"
            title="Tailored for Stays, Weddings & Retreats"
            description="Discover how guests reserve Eden directly for mountain getaways, full-weekend estate weddings, and executive offsites in Stowe, Vermont."
            align="center"
          />

          <div className="grid gap-10 border-y border-stone-200 py-12 md:grid-cols-3 md:gap-8">
            {experienceCards.map((card, idx) => (
              <div
                key={card.href}
                className="flex flex-col justify-between space-y-6 md:border-r md:border-stone-200 md:pr-8 last:md:border-r-0 last:md:pr-0"
              >
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#8f7845]">
                    0{idx + 1} · {card.eyebrow}
                  </p>
                  <h3 className="text-2xl font-normal text-stone-900">
                    {card.title}
                  </h3>
                  <p className="text-sm leading-7 text-stone-600">
                    {card.description}
                  </p>
                </div>
                <div>
                  <Link
                    href={card.href}
                    className="inline-block border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
                  >
                    {card.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-medium uppercase tracking-[0.2em] text-stone-600">
            <span className="text-stone-400">Seasonal &amp; Group Guides</span>
            <Link
              href="/guides/stowe-ski-house/"
              className="border-b border-transparent pb-0.5 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Stowe Ski House
            </Link>
            <Link
              href="/guides/stowe-fall-foliage/"
              className="border-b border-transparent pb-0.5 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              October Fall Foliage
            </Link>
            <Link
              href="/guides/stowe-family-reunions/"
              className="border-b border-transparent pb-0.5 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Family Reunions
            </Link>
            <Link
              href="/weddings/real-weddings/"
              className="border-b border-transparent pb-0.5 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Real Weddings
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section !pb-8 md:!pb-12 bg-white/80 animate-fade-up fade-delay-2">
        <div className="lux-container space-y-8">
          <SectionHeading
            eyebrow="Gallery"
            title="A glimpse of Eden"
            description="Your Private Vermont Resort"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
            {galleryPreview.map((item) => {
              return (
                <div
                  key={item.src}
                  className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/60 shadow-[0_24px_48px_-32px_rgba(58,45,20,0.55)]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={item.avifSrcSet}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <source
                        type="image/webp"
                        srcSet={item.srcSet}
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      />
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="eager"
                        fetchPriority="low"
                        decoding="async"
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                      />
                    </picture>
                    <span className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/25 via-transparent to-black/15 opacity-40" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              View More Photos
            </Link>
          </div>
        </div>
      </section>

      <section className="lux-section !pt-4 md:!pt-6 bg-white/80 animate-fade-up">
        <div className="lux-container flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
            <h2 className="text-4xl font-semibold text-stone-900 md:text-5xl">What Our Guests Say</h2>
            <div className="mt-2 flex justify-center">
              <PerfectReviewsBadge reviewCount={62} countLabel="REVIEWS" />
            </div>
          </div>
          
          <div className="w-full">
            <TestimonialCarousel testimonials={testimonials} />
          </div>

          <div className="mt-2 flex justify-center">
            <Link
              href="/reviews"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              Read More Reviews
            </Link>
          </div>
        </div>
      </section>

      <FaqSection
        title="Questions About Eden in Stowe"
        description="Key facts for guests planning a Stowe vacation rental stay, private estate wedding, or executive retreat."
        items={homeFaqs}
      />

      <section className="lux-section bg-white animate-fade-up fade-delay-2">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-10 text-center md:p-16">
          <h2 className="text-4xl font-semibold text-stone-900 md:text-5xl">
            Reserve Eden for your next gathering.
          </h2>
          <p className="mt-4 text-base text-stone-700 md:text-lg">
            Share your vision with us, and we&apos;ll work with you to craft an unforgettable experience that exceeds your expectations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              Reserve Now
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center rounded-full border border-black bg-transparent px-8 py-3.5 text-[0.95rem] font-semibold text-black transition duration-200 hover:bg-black/5 active:scale-[0.98]"
            >
              Explore the Estate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
