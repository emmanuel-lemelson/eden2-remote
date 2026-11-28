import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { WeddingBentoShowcase } from "@/components/WeddingBentoShowcase";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";
import { PRODUCTION_URL, getEventVenueSchema } from "@/lib/seo-schema";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Stowe, VT Luxury Mansion & Private Estate Wedding Venue | Eden",
  description:
    "Eden: The Lemelson Estate is a luxury mansion & private estate wedding venue in Stowe, Vermont on 28 private acres. Book a Friday–Sunday wedding weekend sleeping 20 overnight across 8 bedrooms with tented meadow receptions up to 300 guests and custom in-house chef menus with zero food & beverage minimums.",
  alternates: {
    canonical: `${PRODUCTION_URL}/weddings/`,
  },
  openGraph: {
    title: "Stowe, VT Luxury Mansion & Private Estate Wedding Venue | Eden",
    description:
      "Luxury mansion & private estate wedding venue in Stowe, Vermont on 28 private acres. Host Friday–Sunday wedding weekends sleeping 20 overnight across 8 bedrooms with tented meadow receptions up to 300 guests and custom in-house chef menus with zero food & beverage minimums.",
    url: `${PRODUCTION_URL}/weddings/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate luxury mansion and private wedding venue in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Stowe, VT Luxury Mansion & Private Estate Wedding Venue | Eden",
    description:
      "Luxury mansion & private estate wedding venue in Stowe, VT on 28 private acres. Friday–Sunday wedding weekends sleeping 20 overnight across 8 bedrooms, tented meadow receptions up to 300 guests & custom in-house chef menus with zero food & beverage minimums.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const weekendChapters = [
  {
    verb: "Concierge",
    caption:
      "Meet Tiffany, your private-estate concierge with 15+ years orchestrating seamless, unforgettable celebrations.",
    photo: "/images/tiffany-concierge.jpg",
    alt: "Tiffany M., private estate concierge at Eden: The Lemelson Estate",
    isStaticImage: true,
    imageClassName: "object-top",
  },
  {
    verb: "Private Chef",
    caption:
      "Enjoy restaurant-level dining in the comfort of the estate with a private chef experience.",
    photo: "/images/private-chef-table.jpg",
    alt: "Candlelit wedding reception table with gold candlesticks, fresh florals, and folded linen napkins at Eden: The Lemelson Estate",
    isStaticImage: true,
    imageClassName: "object-center",
  },
  {
    verb: "Event Coordination",
    caption:
      "Month-of event management and day-of coordination—guiding planning, contract clarity, logistics, setup, and cleanup.",
    photo: "/images/wedding-john-a.jpg",
    alt: "Bride, groom, and wedding party walking across the grounds at Eden: The Lemelson Estate",
    isStaticImage: true,
    imageClassName: "object-center",
  },
];

const coupleStories = [
  {
    quote:
      "The estate is immaculate and luxurious, with every amenity (and more) that one would expect in such a fine setting... Eden is an ideal spot for weddings, family reunions, or just an amazing place to stay and soak up the beauty of Vermont in pampered luxury!",
    credit: "John A. · September 2024",
    photo: "/images/wedding-bride-pond.jpg",
    alt: "Bride walking down stone steps in an ivory long-sleeve gown overlooking the reflective pond at Eden: The Lemelson Estate",
    isStaticImage: true,
  },
  {
    quote:
      "We had our ceremony in the great room with the fireplace roaring. All the bedrooms were utilized for our families, with no need for transportation.",
    credit: "Seanna C. · Winter Great Room wedding",
    photo: "/gallery/Eden-Site%20Photos/83",
    alt: "Bride and groom embracing outside Eden in Stowe snow during a winter wedding",
    isStaticImage: false,
  },
  {
    quote:
      "We held our elopement with 14 family members and our two dogs. From the moment we drove up, everything was absolutely perfect.",
    credit: "Kayli · Intimate 14-guest elopement",
    photo: "/gallery/Eden-Site%20Photos/82",
    alt: "Winter bride outdoors in white gown and fur wrap against snowy Stowe trees",
    isStaticImage: false,
  },
];

const weddingFaqs: FaqItem[] = [
  {
    question: "How does the 20-guest indoor rule work for larger weddings?",
    answer:
      "Intimate gatherings of 20 or fewer may use the Great Room, formal dining room, and upper patio. Above 20 guests (up to 300), celebrations take place outdoors in the Upper Meadow and interior access stays reserved for overnight guests and the wedding party.",
  },
  {
    question: "Can we hold a winter or off-peak ceremony indoors?",
    answer:
      "Yes. Groups of 20 or fewer can host indoor ceremonies year-round, including Mon–Thurs off-peak dates in mid-April to mid-May and mid-October to mid-November.",
  },
  {
    question: "Do you require preset menus or food and beverage minimums?",
    answer:
      "No. Every couple meets with our in-house chef to design a custom menu (passed hors d'oeuvres, plated, family-style, or buffet) with zero minimums.",
  },
  {
    question: "What stay lengths are offered, and how do tours work?",
    answer:
      "We offer Friday–Sunday weekends, 7-night weeks, 2-night intimate stays (≤20), Mon–Thurs off-peak ceremonies, and rehearsal dinners (up to 25). Private tours cover the full grounds and select interior areas.",
  },
];

export default function WeddingsPage() {
  const videoSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Eden: A Journey Over The Lemelson Estate, Aerial & Bingham Falls Tour",
      description:
        "Aerial video tour of Eden: The Lemelson Estate in Stowe, Vermont, including surrounding mountain views and nearby Bingham Falls.",
      thumbnailUrl: ["https://lemelsonestate.com/gallery/enhanced/2@1200w.webp"],
      contentUrl: "https://youtu.be/P8oBq86qhW0",
      embedUrl: "https://www.youtube.com/embed/P8oBq86qhW0",
      uploadDate: "2025-01-01",
    },
    {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Eden: The Lemelson Estate, Interior & Grounds Wedding Tour",
      description:
        "Interior and grounds walkthrough of Eden: The Lemelson Estate's Great Room, bridal suite, dining spaces, and mountain grounds in Stowe, Vermont.",
      thumbnailUrl: ["https://lemelsonestate.com/gallery/Eden-Site%20Photos/98@1200w.webp"],
      contentUrl: "https://youtu.be/xm_uA64KCkE",
      embedUrl: "https://www.youtube.com/embed/xm_uA64KCkE",
      uploadDate: "2025-01-01",
    },
  ];

  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Weddings", href: "/weddings/" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([getEventVenueSchema(), ...videoSchemas]) }}
      />

      {/* 1. Hero: Centered Apple-style headline, punchy subtitle, CTA, and wide centered hero image */}
      <section className="bg-white pb-8 pt-5 md:pb-16 md:pt-12">
        <div className="lux-container">
          <div className="mx-auto max-w-3xl text-center">
            <ScalingHeroTitle className="text-[clamp(2rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1f1b17] md:leading-[0.96]">
              Weddings at Eden
            </ScalingHeroTitle>

            <p className="mx-auto mt-3 max-w-[54ch] text-balance text-[15px] leading-[1.5] text-[#44403c] md:mt-4 md:text-[20px]">
              New England&apos;s most prestigious private estate in Stowe, Vermont.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:mt-6 md:gap-5">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-5 py-2.5 text-[14px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] md:min-h-11 md:px-7 md:py-3 md:text-[15px]"
              >
                Inquire for dates
              </Link>
            </div>
          </div>
        </div>

        <div className="lux-container mt-5 md:mt-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:rounded-3xl">
            <img
              src="/images/wedding-couple-editorial.jpg"
              alt="Bride and groom embracing at golden hour on the grounds of Eden: The Lemelson Estate with a glowing white sailcloth wedding tent and Vermont's Green Mountains behind them"
              width={1376}
              height={768}
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 2. Spaces Across the Estate: 4-tile bento showcase */}
      <section className="bg-[#f8f3ea] py-12 md:py-28">
        <div className="lux-container space-y-7 md:space-y-12">
          <RevealBlock className="space-y-3">
            <h2 className="text-2xl font-semibold leading-[1.1] text-[#1f1b17] lining-nums md:text-4xl">
              A Vermont wedding venue unmatched
            </h2>
          </RevealBlock>

          <RevealBlock delayMs={40}>
            <WeddingBentoShowcase />
          </RevealBlock>
        </div>
      </section>

      {/* 3. Couples' Stories: All three wedding reviews in one row */}
      <section className="bg-white py-12 md:py-28">
        <div className="lux-container space-y-7 md:space-y-12">
          <RevealBlock className="space-y-3">
            <h2 className="text-2xl font-semibold leading-[1.1] text-[#1f1b17] md:text-4xl">
              Celebrations at Eden
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
              5.0-star rating across 62 verified reviews on Airbnb, Vrbo, The Knot, and Zola.
            </p>
          </RevealBlock>

          <div className="grid gap-8 md:grid-cols-3">
            {coupleStories.map((story, idx) => (
              <RevealBlock
                key={story.credit}
                delayMs={idx * 45}
                className="space-y-4"
              >
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/5] w-full">
                    {story.isStaticImage ? (
                      <img
                        src={story.photo}
                        alt={story.alt}
                        width={896}
                        height={1120}
                        className="block h-full w-full object-cover object-center"
                      />
                    ) : (
                      <ResponsivePhoto
                        basePath={story.photo}
                        alt={story.alt}
                        sizes="(min-width: 768px) 32vw, 100vw"
                        width={800}
                        height={1000}
                        maxWidth={800}
                        className="block h-full w-full object-cover object-[50%_18%]"
                      />
                    )}
                  </div>
                </div>
                <blockquote className="text-[16px] leading-[1.6] text-[#1f1b17] text-pretty">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <p className="text-[14px] font-medium text-[#6f5a2e]">
                  {story.credit}
                </p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* 4. The Wedding Weekend: Obsidian chapter */}
      <section className="bg-[#161412] py-12 text-[#f8f3ea] md:py-28">
        <div className="lux-container space-y-7 md:space-y-12">
          <RevealBlock className="space-y-3">
            <h2 className="text-2xl font-semibold leading-[1.1] text-white md:text-4xl">
              Exclusive Amenities and Services
            </h2>
          </RevealBlock>

          <div className="grid gap-8 md:grid-cols-3">
            {weekendChapters.map((chapter, idx) => (
              <RevealBlock key={chapter.verb} delayMs={idx * 45} className="space-y-4">
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full">
                    {chapter.isStaticImage ? (
                      <img
                        src={chapter.photo}
                        alt={chapter.alt}
                        width={1200}
                        height={900}
                        className={`h-full w-full object-cover ${chapter.imageClassName}`}
                      />
                    ) : (
                      <ResponsivePhoto
                        basePath={chapter.photo}
                        alt={chapter.alt}
                        sizes="(min-width: 768px) 33vw, 100vw"
                        width={2400}
                        height={1600}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {chapter.verb}
                </h3>
                <p className="text-[16px] leading-[1.6] text-[#e8dac0]">
                  {chapter.caption}
                </p>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Common Questions: Clean single-column layout */}
      <FaqSection
        className="!bg-[#f8f3ea]"
        title="Common questions"
        items={weddingFaqs}
      />

      {/* 7. Private Brochure CTA */}
      <section id="brochure" className="grid bg-[#161412] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[380px] lg:min-h-[480px]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/87"
            alt="Twilight view of Eden: The Lemelson Estate illuminated rear terrace and grounds"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2400}
            height={1600}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#161412] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Request the private brochure
          </h2>
          <p className="max-w-[44ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Get our 2026 brochure (packages, three-level floor plans, and tent layouts), and schedule a private tour of the grounds and select interior areas.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Schedule a consultation
            </Link>
            <Link
              href="/reviews/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              Read verified reviews →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
