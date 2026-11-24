import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
  description:
    "Gather up to 20 guests across 8 bedrooms and 28 private acres in Stowe, VT. Enjoy one private estate with a children's playroom, heated pool, 3 hot tubs, clay tennis court & zero platform fees.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/stowe-family-reunions/`,
  },
  openGraph: {
    title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
    description:
      "Private 8-bedroom estate stay in Stowe sleeping up to 20 across 11,400 sq ft, with heated pool, 3 hot tubs, clay tennis court, kids' playroom & zero platform fees.",
    url: `${PRODUCTION_URL}/guides/stowe-family-reunions/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Backyard heated pool, stone patio, and lawn at Eden: The Lemelson Estate in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
    description:
      "Gather up to 20 family members under one roof in Stowe, VT with children's playroom, private apartment suite, pool, hot tubs, tennis court & zero platform fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const familyReasons = [
  {
    title: "Privacy & shared space",
    detail:
      "11,400 square feet across 28 secluded acres so the whole family stays together under one roof.",
  },
  {
    title: "Pool & wellness spaces",
    detail:
      "Heated outdoor pool, outdoor hot tub, indoor spa, garden spa, cedar sauna, and steam shower.",
  },
  {
    title: "Cooking & gathering together",
    detail:
      "Gourmet chef's kitchen, formal dining room, outdoor gas grill, and optional private-chef service for family dinners.",
  },
  {
    title: "Kids & grandparents",
    detail:
      "Indoor children's playroom and family gear paired with a quiet second-floor apartment suite and a first-floor primary suite.",
  },
  {
    title: "Recreation on the grounds",
    detail:
      "Private clay tennis court, spring-fed trout ponds, lower-level game room, and a five-minute walk to Wiessner Woods trails.",
  },
  {
    title: "Direct stays & pets",
    detail:
      "Pet-friendly stays for family vacations with zero third-party platform fees when reserving directly.",
  },
];

const reunionFaqs: FaqItem[] = [
  {
    question: "We have grandparents who prefer avoiding stairs. Can they sleep and gather on the main level?",
    answer:
      "Yes. The first floor features a second primary suite and three additional guest bedrooms alongside the Great Room, formal dining room, chef's kitchen, and three-seasons sunroom, so older family members can sleep and spend the day comfortably without using stairs.",
  },
  {
    question: "How do parents with babies or toddlers handle early bedtimes and nap schedules?",
    answer:
      "The second floor includes a private, self-contained apartment suite with its own kitchen, living room, primary bedroom, and twin bedroom, as well as a dedicated nursery beside the main primary suite. That separation lets young families rest quietly away from evening conversation downstairs.",
  },
  {
    question: "What keeps kids and teens busy at the estate, and when is the pool open?",
    answer:
      "The heated outdoor swimming pool is open from May through September. Families also enjoy the indoor children's playroom, family gear, lower-level game room with pool and foosball tables, private clay tennis court, spring-fed trout ponds, hot tubs, and easy five-minute walks into Wiessner Woods.",
  },
  {
    question: "How do meals work for a group of 15 to 20 without someone cooking the whole trip?",
    answer:
      "The main gourmet kitchen, formal dining room, and outdoor gas grill make shared family dinners easy, and our concierge can arrange pre-arrival grocery stocking or optional private chef dinners when you want a night off.",
  },
  {
    question: "Can we bring the family dog, and do we save on fees by booking directly?",
    answer:
      "Yes. Dogs are welcome on family vacation stays across the 28 private acres, and reserving directly on lemelsonestate.com avoids third-party Airbnb or Vrbo guest service fees.",
  },
];

export default function StoweFamilyReunionsPage() {
  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Stays", href: "/stays/" },
          { name: "Family Reunions", href: "/guides/stowe-family-reunions/" },
        ]}
      />

      {/* Hero: Pool & patio for multi-gen gatherings */}
      <section className="bg-white">
        <div className="relative h-[42svh] min-h-[260px] max-h-[500px] w-full overflow-hidden md:h-[48svh]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/88"
            alt="Poolside stone patio with wicker lounge seating at Eden: The Lemelson Estate in Stowe, VT"
            sizes="100vw"
            width={2000}
            height={1333}
            priority={true}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="lux-container py-7 md:py-9">
          <ScalingHeroTitle className="text-[clamp(2.5rem,7.8vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[#1f1b17]">
            Gather at Eden
          </ScalingHeroTitle>

          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[18px]">
            Bring three generations together under one roof across eight bedrooms and 28 acres, with a children&apos;s playroom, private apartment suite, heated pool, clay tennis court, and pets welcome.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/contact/"
              className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-7 py-3.5 text-[15px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              Plan your reunion
            </Link>
            <Link
              href="/stays/"
              className="whitespace-nowrap text-[15px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
            >
              Floor-by-floor layout →
            </Link>
          </div>
        </div>
      </section>

      {/* Calm editorial overview + family spaces photo spread (Great Room + Kids bunk room + Game room) */}
      <section className="bg-[#f8f3ea] py-16 md:py-24 lg:py-28">
        <div className="lux-container space-y-12">
          <RevealBlock className="space-y-4">
            <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Why families choose Eden
            </h2>
            <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
              Keep grandparents, parents, and children comfortable across 11,400 square feet of shared living areas, quiet bedroom wings, and 28 private acres.
            </p>
          </RevealBlock>

          <RevealBlock delayMs={40}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {familyReasons.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white p-6">
                  <h3 className="text-lg font-semibold text-[#1f1b17]">{item.title}</h3>
                  <p className="mt-2.5 text-[16px] leading-[1.6] text-[#44403c]">{item.detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delayMs={60}>
            <div className="grid gap-4 md:grid-cols-12 md:items-stretch">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:col-span-7 md:aspect-auto">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/98"
                  alt="Great Room gathering space with leather sofas and grand piano"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  width={2560}
                  height={1704}
                  className="h-full w-full object-cover md:absolute md:inset-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1">
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/Eden-Site%20Photos/41"
                      alt="Children's and family bedroom featuring white bunk beds and twin bed at Eden"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2400}
                      height={1600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/Eden-Site%20Photos/93"
                      alt="Spacious lower-level family recreation and game room"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2560}
                      height={1707}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FaqSection
        title="Family reunion questions"
        details={[
          "8 bedrooms & 8 baths across three levels",
          "Children's playroom, family gear & quiet 2nd-floor suite",
          "Pets welcome for up to 20 overnight guests",
        ]}
        items={reunionFaqs}
        photo={{
          basePath: "/gallery/Eden-Site%20Photos/42",
          alt: "Spacious double-queen family guest bedroom inside Eden Estate in Stowe",
        }}
      />

      {/* Dark Split CTA */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/Eden-Site%20Photos/111"
            alt="Outdoor patio lounge beside the private clay tennis court at Eden Estate"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2560}
            height={1920}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Bring the whole family
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Reserve directly without platform fees, with Stowe concierge assistance for chef dinners, groceries, and activities.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Request reunion dates
            </Link>
            <Link
              href="/stays/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              Explore 8 bedrooms →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
