import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Best Place to Stay in Stowe, VT for Fall Foliage & October Trips — Eden",
  description:
    "Experience peak Vermont autumn foliage from 28 private acres in Stowe. Eden sleeps 20 across 8 bedrooms, minutes from Smugglers' Notch, Bingham Falls, Wiessner Woods & Stowe Mountain Resort.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/stowe-fall-foliage/`,
  },
  openGraph: {
    title: "Best Place to Stay in Stowe, VT for Fall Foliage & October Trips — Eden",
    description:
      "Private 28-acre luxury estate surrounded by peak Stowe autumn foliage. Sleeps 20, 5 min walk to Wiessner Woods, 6 min to Smugglers' Notch.",
    url: `${PRODUCTION_URL}/guides/stowe-fall-foliage/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate surrounded by autumn foliage in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Best Place to Stay in Stowe, VT for Fall Foliage & October Trips — Eden",
    description:
      "Private 28-acre 8-bedroom estate in Stowe, Vermont for October leaf-peeping, hiking, and private chef harvest dinners.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const stops = [
  { name: "Wiessner Woods & Catamount Trail", time: "5 min walk" },
  { name: "Topnotch Horseback Trail Rides", time: "2 min drive" },
  { name: "Bingham Falls (40-ft Waterfall)", time: "5 min drive" },
  { name: "Mt. Mansfield Gondola SkyRide", time: "5 min drive" },
  { name: "Smugglers' Notch Scenic Pass", time: "6 min drive" },
  { name: "Stowe Recreation Path (5.3 Miles)", time: "Minutes away" },
];

const foliageFaqs: FaqItem[] = [
  {
    question: "When do Stowe's fall colors usually peak, and how early should we plan an October stay?",
    answer:
      "Foliage around Stowe generally peaks from late September through mid-October, with the deepest reds and golds often appearing during the first two weeks of October. Peak October dates are limited, so we recommend reaching out early.",
  },
  {
    question: "What trails and foliage drives are closest to Eden?",
    answer:
      "From the Edson Hill Road area, your group can walk five minutes straight into Wiessner Woods and the Catamount Trail without needing to drive into town first, or take short drives: five minutes to Bingham Falls and the Mount Mansfield Gondola SkyRide, and six minutes to Smugglers' Notch.",
  },
  {
    question: "Is the outdoor pool still open in October, or what amenities do guests enjoy in crisp fall weather?",
    answer:
      "The heated outdoor pool closes after September (it operates May through September). In October, groups spend mornings beside the lit stone fireplace in the three-seasons sunroom and evenings in the outdoor hot tub, dry cedar sauna, steam shower, indoor spa, and garden spa.",
  },
  {
    question: "Can we bring our dogs and arrange autumn dinners or airport transfers for a fall trip?",
    answer:
      "Yes. Pets are welcome on stays, and neighboring Wiessner Woods permits leashed dogs. Our concierge can also coordinate pre-arrival grocery stocking, private chef dinners, and transfers from Burlington International Airport (BTV), about 45 minutes away, with zero third-party platform fees when booking directly.",
  },
  {
    question: "Can Eden host an October foliage wedding as well as family trips?",
    answer:
      "Yes. Couples book Eden for intimate indoor weddings of 20 guests or fewer or tented Upper Meadow receptions up to 300 guests, with custom Vermont menus available by arrangement and no food and beverage minimums.",
  },
];

export default function StoweFallFoliagePage() {
  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Stays", href: "/stays/" },
          { name: "Stowe Fall Foliage", href: "/guides/stowe-fall-foliage/" },
        ]}
      />

      {/* Hero: Widescreen autumn entrance framed by golden-orange trees */}
      <section className="bg-white">
        <div className="relative h-[42svh] min-h-[260px] max-h-[500px] w-full overflow-hidden md:h-[48svh]">
          <ResponsivePhoto
            basePath="/gallery/Eden-Site%20Photos/1"
            alt="Front entrance of Eden: The Lemelson Estate framed by vibrant golden autumn trees in Stowe, Vermont"
            sizes="100vw"
            width={2560}
            height={1704}
            priority={true}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="lux-container py-7 md:py-9">
          <ScalingHeroTitle className="text-[clamp(2.5rem,7.8vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.03em] text-[#1f1b17]">
            Autumn at Eden
          </ScalingHeroTitle>

          <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[18px]">
            Surrounded by autumn woods across 28 private acres, Eden gives families and friends room for up to 20 guests minutes from Smugglers&apos; Notch, Bingham Falls, and Wiessner Woods.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Link
              href="/contact/"
              className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-7 py-3.5 text-[15px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
            >
              Check October dates
            </Link>
            <Link
              href="/stays/"
              className="whitespace-nowrap text-[15px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
            >
              Explore all amenities →
            </Link>
          </div>
        </div>
      </section>

      {/* Autumn stops + crisp autumn & fireside asymmetric 3-photo spread (no summer pool repetition) */}
      <section className="bg-[#f8f3ea] py-16 md:py-24 lg:py-28">
        <div className="lux-container space-y-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <RevealBlock className="space-y-4 lg:col-span-5">
              <h2 className="text-3xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
                Stowe&apos;s best autumn scenery
              </h2>
              <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
                Start crisp October mornings beside the three-seasons sunroom fireplace, walk wooded trails steps from the driveway, and unwind in the outdoor hot tub and cedar sauna.
              </p>
            </RevealBlock>

            <RevealBlock delayMs={50} className="lg:col-span-7">
              <dl className="grid gap-2.5 sm:grid-cols-2">
                {stops.map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-[15px]"
                  >
                    <dt className="font-medium text-[#1f1b17]">{s.name}</dt>
                    <dd className="whitespace-nowrap font-medium text-[#6f5a2e]">{s.time}</dd>
                  </div>
                ))}
              </dl>
            </RevealBlock>
          </div>

          <RevealBlock delayMs={60}>
            <div className="grid gap-4 md:grid-cols-12 md:items-stretch">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:col-span-7 md:aspect-auto">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/86"
                  alt="Eden Estate surrounded by peak orange and crimson October foliage in Stowe"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover md:absolute md:inset-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1">
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/88"
                      alt="Outdoor hot tub overlooking the spring-fed pond and autumn trees at Eden"
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
                      basePath="/gallery/enhanced/31"
                      alt="Sunlit three-seasons porch with wicker seating and lit stone fireplace"
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
        title="Fall foliage questions"
        details={[
          "Peak Vermont foliage late September through October",
          "Five-minute walk to Wiessner Woods trails",
          "Sleeps 20 with pets welcome",
        ]}
        items={foliageFaqs}
        photo={{
          basePath: "/gallery/Eden-Site%20Photos/108",
          alt: "Spring-fed pond reflecting trees and mountains on the Eden grounds",
        }}
      />

      {/* Dark Split CTA */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/87"
            alt="Warm evening view of Eden: The Lemelson Estate rear terrace and glowing windows"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2400}
            height={1600}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Plan your autumn escape
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Reserve directly for peak foliage dates in Stowe with zero Airbnb or Vrbo platform fees.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Inquire about fall dates
            </Link>
            <Link
              href="/weddings/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              Autumn weddings →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
