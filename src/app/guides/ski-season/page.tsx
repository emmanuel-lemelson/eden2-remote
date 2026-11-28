import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Luxury Stowe Ski House Rental Near Mount Mansfield | 8BR — Eden",
  description:
    "Stay 5 minutes from Stowe Mountain Resort at Eden: an 11,400 sq ft, 8-bedroom luxury Stowe ski house sleeping 20 with heated radiant floors, 3 hot tubs, cedar sauna, steam shower & Wiessner Woods trails.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/ski-season/`,
  },
  openGraph: {
    title: "Luxury Stowe Ski House Rental Near Mount Mansfield | 8BR — Eden",
    description:
      "8-bedroom, 11,400 sq ft luxury Stowe ski house 5 minutes from Stowe Mountain Resort. Sleeps 20, heated radiant floors, 3 hot tubs, sauna, steam shower & pet-friendly.",
    url: `${PRODUCTION_URL}/guides/ski-season/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Snow-covered winter exterior of Eden: The Lemelson Estate in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Luxury Stowe Ski House Rental Near Mount Mansfield | 8BR — Eden",
    description:
      "8-bedroom luxury Stowe ski house 5 min from Mount Mansfield lifts. Sleeps 20, heated radiant floors, 3 hot tubs, cedar sauna & zero third-party fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const highlights = [
  {
    title: "5 minutes to Mount Mansfield",
    detail: "Quick drive to Stowe Mountain Resort lifts, Spruce Peak ice skating, and Stowe Village.",
  },
  {
    title: "Radiant floors & fireplaces",
    detail: "Radiant heated floors and wood-burning fireplaces throughout the residence.",
  },
  {
    title: "Hot tubs, sauna & steam",
    detail: "Two large outdoor hot tubs, indoor spa, dry cedar sauna, and steam shower.",
  },
  {
    title: "Trails & sleigh rides nearby",
    detail: "Five-minute walk to Wiessner Woods Nordic trails and snowshoeing; two minutes to Topnotch sleigh rides.",
  },
];

const skiFaqs: FaqItem[] = [
  {
    question: "How quickly can our group reach the Mount Mansfield lifts and Nordic trails?",
    answer:
      "Eden sits in the Edson Hill Road area, roughly a 5-minute drive from Stowe Mountain Resort lifts, Spruce Peak ice skating, and Stowe Village. If anyone in your group prefers Nordic skiing or snowshoeing, Wiessner Woods and Catamount Trail access are a five-minute walk away, and Topnotch sleigh rides are two minutes down the road.",
  },
  {
    question: "What does warming up at the house look like after a full day on the mountain?",
    answer:
      "The residence features radiant heated floors and wood-burning fireplaces, including the stone hearth in the Great Room, alongside a dry cedar sauna, steam shower, indoor spa, garden spa, and an outdoor hot tub. Downstairs, the game room keeps groups entertained into the evening.",
  },
  {
    question: "Can our ski group split up bedrooms cleanly for couples, singles, and kids?",
    answer:
      "Yes. With 8 bedrooms, 8 full bathrooms, and 11,400 square feet across three levels, up to 20 guests have plenty of room, including two primary suites, guest rooms with queen, twin, and bunk setups, and a quiet second-floor apartment suite with its own kitchen and living room.",
  },
  {
    question: "Can we stock groceries, arrange lift passes, or bring our dog on a ski trip?",
    answer:
      "Pets are welcome on stays, and our concierge team can help coordinate pre-arrival grocery stocking, lift passes, private chef dinners, in-home massages, and transfers from Burlington International Airport (BTV), about 45 minutes away.",
  },
  {
    question: "Why reserve a winter week directly here instead of through Airbnb or Vrbo?",
    answer:
      "Booking direct on lemelsonestate.com avoids third-party guest service fees and puts your trip organizer in direct contact with our Stowe hospitality team for smooth arrival coordination.",
  },
];

export default function StoweSkiHousePage() {
  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Stays", href: "/stays/" },
          { name: "Ski Season", href: "/guides/ski-season/" },
        ]}
      />

      {/* Hero: Centered editorial headline, subtitle, CTA, and wide centered snowy exterior */}
      <section className="bg-white pb-8 pt-5 md:pb-16 md:pt-12">
        <div className="lux-container">
          <div className="mx-auto max-w-3xl text-center">
            <ScalingHeroTitle className="text-[clamp(2rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1f1b17] md:leading-[0.96]">
              Skiing near Eden
            </ScalingHeroTitle>

            <p className="mx-auto mt-3 max-w-[54ch] text-balance text-[15px] leading-[1.5] text-[#44403c] md:mt-4 md:text-[20px]">
              Five minutes from Mount Mansfield lifts, Eden offers 11,400 square feet and eight bedrooms for up to 20 guests, with radiant heated floors, wood fires, three spas, and pets welcome.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:mt-6 md:gap-5">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-5 py-2.5 text-[14px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] md:min-h-11 md:px-7 md:py-3 md:text-[15px]"
              >
                Check winter dates
              </Link>
              <Link
                href="/stays/"
                className="whitespace-nowrap text-[14px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e] md:text-[15px]"
              >
                Full estate specs →
              </Link>
            </div>
          </div>
        </div>

        <div className="lux-container mt-5 md:mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-[46svh] md:min-h-[300px] md:max-h-[500px] md:rounded-3xl">
            <ResponsivePhoto
              basePath="/gallery/enhanced/68"
              alt="Snow-covered luxury Stowe ski house exterior at Eden: The Lemelson Estate in winter"
              sizes="(min-width: 1280px) 1152px, 100vw"
              width={2400}
              height={1600}
              priority={true}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* Winter highlights & 100% winter/ski asymmetric 3-photo spread */}
      <section className="bg-[#f8f3ea] py-12 md:py-24 lg:py-28">
        <div className="lux-container space-y-8 md:space-y-12">
          <RevealBlock className="space-y-4">
            <h2 className="text-2xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Five minutes to Mount Mansfield
            </h2>
            <p className="max-w-[54ch] text-[15px] leading-[1.6] text-[#44403c] md:text-[17px]">
              Spend the morning on the mountain or Nordic skiing next door in Wiessner Woods, then come home to a warm fire, cedar sauna, and steaming outdoor hot tub.
            </p>
          </RevealBlock>

          <RevealBlock delayMs={40}>
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.title} className="rounded-2xl bg-white p-4 sm:p-6">
                  <h3 className="text-[16px] font-semibold text-[#1f1b17] sm:text-lg">{h.title}</h3>
                  <p className="mt-1.5 text-[14.5px] leading-[1.6] text-[#44403c] sm:mt-2.5 sm:text-[16px]">{h.detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delayMs={60}>
            <div className="grid gap-4 md:grid-cols-12 md:items-stretch">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:col-span-7 md:aspect-auto">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/114"
                  alt="Stowe Mountain Resort gondola carrying skiers up Mount Mansfield five minutes from Eden"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  width={2400}
                  height={1600}
                  className="h-full w-full object-cover md:absolute md:inset-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1">
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/92"
                      alt="Outdoor hot tub steaming in winter snow surrounded by Stowe evergreens"
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
                      basePath="/gallery/Eden-Site%20Photos/61"
                      alt="Cross-country skier gliding across snow-covered meadows near Stowe at sunset"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2400}
                      height={1600}
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
        title="Winter & ski stay questions"
        details={[
          "5-minute drive to Stowe Mountain Resort",
          "5-minute walk to Wiessner Woods Nordic trails",
          "Pet-friendly stays for up to 20 guests",
        ]}
        items={skiFaqs}
        photo={{
          basePath: "/gallery/enhanced/78",
          alt: "Winter evening facade of Eden: The Lemelson Estate glowing in snow",
        }}
      />

      {/* Dark Split CTA */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/Eden-Site%20Photos/100"
            alt="Warm Great Room hearth at Eden: The Lemelson Estate after skiing"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2560}
            height={1707}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Reserve your winter week
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Book directly for winter ski weeks and holiday gatherings with zero third-party platform fees.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Request winter dates
            </Link>
            <Link
              href="/stays/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              See all 8 bedrooms →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
