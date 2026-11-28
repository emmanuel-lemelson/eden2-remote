import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { AutoPlayVideo } from "@/components/AutoPlayVideo";
import { WhereToFindUs } from "@/components/WhereToFindUs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

const quickFacts = [
  { value: "8 Bed · 8 Bath", detail: "11,400 sq ft private residence" },
  { value: "Sleeps 20", detail: "Up to 300 for tented events" },
  { value: "28 Acres", detail: "Edson Hill Road area, Stowe" },
  { value: "Pool & 3 Spas", detail: "Heated pool, sauna, tennis & gym" },
  { value: "5 Min to Skiing", detail: "Stowe Mountain Resort & trails" },
  { value: "Pet-Friendly", detail: "Pets welcome on stays" },
];

const experienceCards = [
  {
    title: "Luxury Stays",
    description: "Private Stowe mountain getaways.",
    href: "/stays/",
    cta: "Explore",
    photo: "/gallery/enhanced/87",
    alt: "Twilight view of Eden: The Lemelson Estate pool, stone terrace, and glowing residence",
    imgClass: "h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]",
  },
  {
    title: "Weddings",
    description: "Tented receptions up to 300.",
    href: "/weddings/",
    cta: "Explore",
    photo: "/gallery/Eden-Site%20Photos/83",
    alt: "Bride and groom embracing outside Eden: The Lemelson Estate in Stowe",
    maxWidth: 800 as const,
    imgClass: "h-full w-full object-cover object-[50%_58%] transition duration-700 ease-out group-hover:scale-[1.03]",
  },
  {
    title: "Executive Retreats",
    description: "Discreet leadership offsites.",
    href: "/retreats/",
    cta: "Explore",
    photo: "/gallery/Eden-Site%20Photos/99",
    alt: "Sunlit Great Room with leather Chesterfield sofas, dining area, and arched mountain windows at Eden Estate",
    imgClass: "h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]",
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
      "Yes. Eden welcomes pets on stays so the entire family can enjoy Stowe together. Let our estate team know about your pets when submitting your inquiry.",
  },
  {
    question: "What wellness and family amenities are included?",
    answer:
      "Guests have exclusive access to two large outdoor hot tubs, an indoor spa, private cedar sauna, steam shower, heated outdoor pool, private gym, clay tennis court, game room, children's playroom, and twin spring-fed trout ponds.",
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
    src: "/gallery/Eden-Site%20Photos/103@1200w.webp",
    srcSet:
      "/gallery/Eden-Site%20Photos/103@400w.webp 400w, /gallery/Eden-Site%20Photos/103@800w.webp 800w, /gallery/Eden-Site%20Photos/103@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/Eden-Site%20Photos/103@400w.avif 400w, /gallery/Eden-Site%20Photos/103@800w.avif 800w, /gallery/Eden-Site%20Photos/103@1200w.avif 1200w",
    alt: "Luxury master bathroom en-suite showing a soaking tub set in a dark marble deck under a dramatic arched window framing a mountain sunset.",
  },
  {
    src: "/gallery/Eden-Site%20Photos/71@1200w.webp",
    srcSet:
      "/gallery/Eden-Site%20Photos/71@400w.webp 400w, /gallery/Eden-Site%20Photos/71@800w.webp 800w, /gallery/Eden-Site%20Photos/71@1200w.webp 1200w",
    avifSrcSet:
      "/gallery/Eden-Site%20Photos/71@400w.avif 400w, /gallery/Eden-Site%20Photos/71@800w.avif 800w, /gallery/Eden-Site%20Photos/71@1200w.avif 1200w",
    alt: "Spacious recreation and fitness room featuring a foosball table, air hockey, and exercise equipment.",
  },
];

const testimonials = [
  {
    title: "Worth Every Penny",
    quote:
      "Absolutely loved this place, worth every single penny. Secluded, beautiful, fun, and spacious. The service was the best I’ve EVER experienced, with nonstop communication and instant responses. I truly felt like a guest, not a client.",
    name: "Joshua",
    month: "Jul",
    year: "2025",
    platform: "Airbnb",
  },
  {
    title: "Stowe Spectacular",
    quote:
      "This magnificent estate is impeccably clean and well cared for. The host left wine, snacks, and flowers on the kitchen counter, and even put little boxes of chocolate on every bed! The sauna, hot tub, and game room are outstanding.",
    name: "Margot M.",
    month: "Feb",
    year: "2025",
    platform: "Vrbo",
  },
  {
    title: "Exceptionally Beautiful Home and Property",
    quote:
      "Perfect house for a large family or group. Extremely clean and in perfect order. The pool, hot tub, and clay tennis court were fantastic with beautiful views of the mountains, gardens, and the most awesome sunsets! I highly recommend this house.",
    name: "Susan C. W.",
    month: "Jul",
    year: "2023",
    platform: "Vrbo",
  },
  {
    title: "A Christmas to Remember",
    quote:
      "This incredible property is a unique combination of the luxury, amenities and benefits of a 5-star resort with the intimacy and privacy that comes with renting a vacation home. The experience was flawless and exceeded our expectations—no detail was overlooked.",
    name: "Nazzic K.",
    month: "Dec",
    year: "2021",
    platform: "Vrbo",
  },
  {
    title: "Luxury Winter Wedding",
    quote:
      "We had our wedding ceremony in the great room and enjoyed the weekend with our family. It was absolutely beautiful throughout the house and had so many perks and special amenities—we definitely felt like we were staying in a very luxurious place.",
    name: "Seanna",
    month: "Feb",
    year: "2023",
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
            <h1 className="text-4xl font-semibold leading-tight text-balance md:text-5xl">The Lemelson Estate Welcomes You</h1>
            <p className="text-xs uppercase tracking-[0.35em] text-stone-700 sm:text-sm md:text-base">Bespoke Luxury in Stowe, Vermont</p>
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
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-medium tracking-[0.03em] text-stone-700 sm:text-[0.8125rem]"
            >
              {["Book directly", "No 3rd party platform fees", "Best rate guaranteed"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
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
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container py-8 md:py-10">
          <WhereToFindUs title="As Seen On" />
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white animate-fade-up fade-delay-1">
        <div className="lux-container space-y-8 md:space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
              Estate at a glance.
            </h2>
            <p className="text-base text-stone-700">
              One of Stowe’s most exclusive private mountain estates.
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3">
            {quickFacts.map((fact) => (
              <div
                key={fact.value}
                className="rounded-2xl bg-[#faf6ef] p-5 sm:p-6"
              >
                <dt className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                  {fact.value}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-stone-700">
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-[#f8f3ea]/70 animate-fade-up fade-delay-1">
        <div className="lux-container space-y-8">
          <SectionHeading
            title="Luxury stays, weddings, executive retreats"
          />

          <div className="grid gap-4 md:grid-cols-3 md:gap-5">
            {experienceCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-28px_rgba(58,45,20,0.18)] transition duration-300 hover:shadow-[0_24px_48px_-28px_rgba(58,45,20,0.28)]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <ResponsivePhoto
                    basePath={card.photo}
                    alt={card.alt}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    maxWidth={card.maxWidth ?? 1200}
                    className={card.imgClass}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
                      {card.description}
                    </p>
                  </div>
                  <div className="pt-5">
                    <span className="inline-flex items-center rounded-full bg-[#111111] px-5 py-2 text-xs font-semibold text-white transition duration-200 group-hover:bg-stone-800">
                      {card.cta}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-start gap-2.5 pt-1">
            <span className="mr-1 text-sm font-medium text-stone-700">Guides:</span>
            {[
              { label: "Ski Season", href: "/guides/ski-season/" },
              { label: "Fall Foliage", href: "/guides/stowe-fall-foliage/" },
              { label: "Family Reunions", href: "/guides/stowe-family-reunions/" },
            ].map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-stone-900 shadow-sm transition hover:bg-white"
              >
                {guide.label} <span aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-white animate-fade-up fade-delay-2">
        <div className="lux-container space-y-8">
          <SectionHeading
            eyebrow="Gallery"
            title="A glimpse of Eden"
            description="Your Private Vermont Resort"
          />

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 sm:gap-5">
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

      <section className="py-10 md:py-14 bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)] animate-fade-up">
        <div className="lux-container flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 text-center max-w-3xl">
            <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">What Our Guests Say</h2>
            <p className="flex items-center gap-2 text-base font-medium text-stone-700">
              <span className="flex items-center gap-0.5 text-[#8f7845]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d="M12 2.25l2.35 6.36 6.9.22-5.38 4.26 1.89 6.66-5.76-3.67-5.76 3.67 1.89-6.66-5.38-4.26 6.9-.22L12 2.25z" />
                  </svg>
                ))}
              </span>
              <span>5.0 across 62 verified reviews</span>
            </p>
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
        className="!py-10 md:!py-14"
      />

      <section className="py-10 md:py-14 bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)] animate-fade-up fade-delay-2">
        <div className="lux-container overflow-hidden rounded-3xl border border-white/70 bg-white/90 p-8 text-center shadow-[0_24px_48px_-32px_rgba(58,45,20,0.18)] md:p-12">
          <h2 className="text-3xl font-semibold text-stone-900 md:text-4xl">
            Reserve Eden for your next gathering.
          </h2>
          <p className="mt-4 text-base text-stone-700">
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
