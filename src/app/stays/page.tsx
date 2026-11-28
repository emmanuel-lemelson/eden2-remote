import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
  description:
    "Book direct at Eden: an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental in Stowe, Vermont. Sleeps 20, 5 min from Stowe Mountain Resort, with heated pool, 3 hot tubs, sauna, gym & concierge.",
  alternates: {
    canonical: `${PRODUCTION_URL}/stays/`,
  },
  openGraph: {
    title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
    description:
      "Book direct at Eden: an 11,400 sq ft, 8-bedroom pet-friendly luxury vacation rental in Stowe, Vermont. Sleeps 20, 5 min from Stowe Mountain Resort, with heated pool, 3 hot tubs, sauna, gym & concierge.",
    url: `${PRODUCTION_URL}/stays/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate luxury vacation rental in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Luxury Vacation Rental in Stowe, VT | 8-Bedroom Mountain Estate — Eden",
    description:
      "8-bedroom, 11,400 sq ft pet-friendly luxury estate in Stowe, Vermont. Sleeps 20 guests, 5 min from Stowe Mountain Resort. Book direct with zero platform fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const quickSpecs = [
  { label: "Bedrooms", value: "8 bedrooms, 8 baths" },
  { label: "Capacity", value: "Sleeps up to 20" },
  { label: "Interior", value: "11,400 sq ft" },
  { label: "Property", value: "28 private acres" },
  { label: "Pets", value: "Pet-friendly stays" },
  { label: "Direct booking", value: "Zero platform fees" },
];

const amenities = [
  {
    title: "Pool, sauna & spas",
    detail:
      "Two large outdoor hot tubs, indoor spa, dry cedar sauna, steam shower, and a heated outdoor pool.",
  },
  {
    title: "Gourmet kitchen & dining",
    detail:
      "Well-equipped chef's kitchen, formal dining room, outdoor gas grill, and optional private-chef service.",
  },
  {
    title: "Family & children's spaces",
    detail:
      "Indoor children's playroom, family and baby gear, and spacious living areas across three levels for all ages.",
  },
  {
    title: "Recreation & grounds",
    detail:
      "Private fitness room, clay tennis court, spring-fed trout ponds, lower-level game room, 86-inch smart TV, Sonos, and grand piano.",
  },
  {
    title: "Extended & remote stays",
    detail:
      "High-speed fiber-optic Wi-Fi and a dedicated second-floor workspace, with direct arrival coordination and availability for extended stays.",
  },
  {
    title: "Pet-friendly hospitality",
    detail:
      "Bring the family dog along for stays on 28 secluded acres steps from Wiessner Woods. Our concierge team also arranges pre-arrival groceries, in-home massages, private yoga, lift passes, and Burlington (BTV) airport transfers.",
  },
];

const levels = [
  {
    name: "First floor",
    summary:
      "Double-height Great Room with stone fireplace and grand piano, formal dining room, chef's kitchen, three-seasons sunroom, music room, second primary suite, and three additional guest bedrooms.",
    photo: "/gallery/Eden-Site%20Photos/99",
    alt: "Double-height Great Room with leather Chesterfield sofas, dining area, and loft walkway at Eden Estate",
  },
  {
    name: "Second floor",
    summary:
      "Main Primary Suite with private mountain-view balcony, sitting lounge, and marble soaking tub, plus a nursery, executive office, and a private self-contained apartment suite with kitchen, living room, primary bedroom, and twin bedroom.",
    photo: "/gallery/Eden-Site%20Photos/102",
    alt: "Primary king bedroom suite at Eden Estate in Stowe",
  },
  {
    name: "Lower level",
    summary:
      "Indoor spa suite, dry cedar sauna, steam shower, spacious game and recreation room with pool table and foosball, and private fitness center.",
    photo: "/gallery/Eden-Site%20Photos/18",
    alt: "Lower-level family and media lounge with leather sofas, stone fireplace, and large television at Eden Estate",
  },
];

const distances = [
  { place: "Topnotch Stable & Sleigh Rides", time: "2 min drive" },
  { place: "Notchbrook Swimming Hole", time: "3 min drive" },
  { place: "Wiessner Woods & Catamount Trail", time: "5 min walk" },
  { place: "Stowe Mountain Resort & Mt. Mansfield", time: "5 min drive" },
  { place: "Bingham Falls (40-ft Waterfall)", time: "5 min drive" },
  { place: "Smugglers' Notch State Park", time: "6 min drive" },
];

const staysFaqs: FaqItem[] = [
  {
    question: "Why book directly on lemelsonestate.com instead of through Airbnb or Vrbo?",
    answer:
      "Reserving directly avoids the third-party guest service fees charged by Airbnb, Vrbo, and Expedia, and connects you directly with our local Stowe hospitality team for trip planning and smooth arrival coordination.",
  },
  {
    question: "How are the 8 bedrooms and living areas laid out across the three floors?",
    answer:
      "The first floor includes the double-height Great Room, formal dining room, chef's kitchen, three-seasons sunroom, music room, a second primary suite, and three additional guest bedrooms. The second floor holds the main primary suite, nursery, executive office, and a private self-contained apartment suite (with its own kitchen, living room, primary bedroom, and twin bedroom), while the lower level has the game room, fitness room, indoor spa, cedar sauna, and steam shower.",
  },
  {
    question: "When is the heated outdoor pool open, and are the hot tubs available in cooler months?",
    answer:
      "The heated outdoor swimming pool is open seasonally from May through September. The pondside outdoor hot tub, indoor spa, garden spa, dry cedar sauna, and steam shower are available across autumn and winter stays as well.",
  },
  {
    question: "Can we bring our dogs on a vacation stay?",
    answer:
      "Yes. Pets are welcome on stays at Eden, with 28 secluded acres on site and dog-friendly trails in Wiessner Woods just a five-minute walk down the road.",
  },
  {
    question: "How convenient is the location for skiing, groceries, and airport arrivals?",
    answer:
      "Set in the Edson Hill Road area of Stowe, Eden is roughly a 5-minute drive from Stowe Mountain Resort, Spruce Peak, and Stowe Village, and about 45 minutes from Burlington International Airport (BTV). Before arrival, our concierge team can help coordinate pre-arrival grocery stocking, private chef dinners, in-home massages, or airport transfers.",
  },
];

export default function StaysPage() {
  return (
    <div className="bg-white text-[#1f1b17]">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Stays", href: "/stays/" },
        ]}
      />

      {/* Hero: Centered editorial headline, subtitle, CTA, and wide centered hero image */}
      <section className="bg-white pb-8 pt-5 md:pb-16 md:pt-12">
        <div className="lux-container">
          <div className="mx-auto max-w-3xl text-center">
            <ScalingHeroTitle className="text-[clamp(2rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1f1b17] md:leading-[0.96]">
              Stays at Eden
            </ScalingHeroTitle>

            <p className="mx-auto mt-3 max-w-[54ch] text-balance text-[15px] leading-[1.5] text-[#44403c] md:mt-4 md:text-[20px]">
              Escape to one of Stowe&apos;s most exclusive estates. Set on 28 private acres five minutes from Stowe Mountain Resort, Eden offers 11,400 square feet, eight bedrooms, and room for up to 20 guests. Pets are welcome, and booking direct means no third-party platform fees.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:mt-6 md:gap-5">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-5 py-2.5 text-[14px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] md:min-h-11 md:px-7 md:py-3 md:text-[15px]"
              >
                Book direct
              </Link>
              <Link
                href="/gallery/"
                className="whitespace-nowrap text-[14px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e] md:text-[15px]"
              >
                View gallery →
              </Link>
            </div>
          </div>
        </div>

        <div className="lux-container mt-5 md:mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-[46svh] md:min-h-[300px] md:max-h-[500px] md:rounded-3xl">
            <ResponsivePhoto
              basePath="/gallery/enhanced/2"
              alt="Aerial sunset view of Eden: The Lemelson Estate luxury vacation rental in Stowe, Vermont"
              sizes="(min-width: 1280px) 1152px, 100vw"
              width={2400}
              height={1600}
              priority={true}
              className="h-full w-full object-cover object-[50%_68%]"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Estate at a glance + uneven gallery wall + plain amenities */}
      <section className="bg-[#f8f3ea] py-12 md:py-24 lg:py-28">
        <div className="lux-container space-y-8 md:space-y-16">
          <RevealBlock className="space-y-4">
            <h2 className="text-2xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Estate at a glance
            </h2>
            <p className="max-w-[54ch] text-[15px] leading-[1.6] text-[#44403c] md:text-[17px]">
              Eden pairs the warmth of a private Vermont mountain home with resort amenities reserved solely for your group, backed by 62 five-star reviews across Airbnb and Vrbo.
            </p>
          </RevealBlock>

          <RevealBlock delayMs={40}>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {quickSpecs.map((spec) => (
                <div key={spec.label} className="rounded-xl bg-white p-3.5 sm:p-4">
                  <dt className="text-xs font-medium text-[#6f5a2e] sm:text-sm">
                    {spec.label}
                  </dt>
                  <dd className="mt-0.5 text-[14.5px] font-semibold text-[#1f1b17] text-balance sm:mt-1 sm:text-[16px]">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </RevealBlock>

          {/* Flush 3-photo bento grid with zero dead voids */}
          <RevealBlock delayMs={50}>
            <div className="grid gap-4 md:grid-cols-12 md:items-stretch">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:col-span-7 md:aspect-auto">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/111"
                  alt="Private clay tennis court and shaded stone patio dining table at Eden in Stowe, VT"
                  sizes="(min-width: 768px) 58vw, 100vw"
                  width={2560}
                  height={1920}
                  className="h-full w-full object-cover md:absolute md:inset-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-5 md:grid-cols-1">
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/90"
                      alt="Outdoor hot tub overlooking the spring-fed pond and Worcester Mountains at Eden"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2400}
                      height={1600}
                      className="h-full w-full object-cover object-[50%_45%]"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/70"
                      alt="Private indoor dry cedar sauna inside the lower-level spa wing at Eden"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2400}
                      height={1600}
                      className="h-full w-full object-cover object-[50%_88%]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delayMs={60}>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-8 lg:grid-cols-3">
              {amenities.map((item) => (
                <div key={item.title}>
                  <h3 className="text-lg font-semibold text-[#1f1b17] sm:text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-[1.6] text-[#44403c] sm:mt-2 sm:text-[16px]">{item.detail}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section 2: Three levels paired row-by-row with equal-height level photography */}
      <section className="bg-white py-12 md:py-24 lg:py-28">
        <div className="lux-container space-y-10 md:space-y-16">
          <div className="space-y-6">
            <RevealBlock>
              <h2 className="text-2xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
                Three levels for twenty guests
              </h2>
            </RevealBlock>

            <div className="space-y-5">
              {levels.map((lvl, idx) => (
                <RevealBlock
                  key={lvl.name}
                  delayMs={idx * 40}
                  className="grid gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5"
                >
                  <div className="flex flex-col justify-center rounded-2xl bg-[#f8f3ea] p-6 sm:p-7 lg:col-span-6">
                    <h3 className="text-lg font-semibold text-[#1f1b17]">{lvl.name}</h3>
                    <p className="mt-1.5 text-[16px] leading-[1.6] text-[#44403c]">{lvl.summary}</p>
                  </div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:col-span-6 lg:aspect-auto lg:min-h-[180px]">
                    <ResponsivePhoto
                      basePath={lvl.photo}
                      alt={lvl.alt}
                      sizes="(min-width: 1024px) 48vw, 100vw"
                      width={2560}
                      height={1707}
                      className="h-full w-full object-cover lg:absolute lg:inset-0"
                    />
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>

          <RevealBlock delayMs={50} className="rounded-2xl bg-[#f8f3ea] p-5 sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="space-y-4 lg:col-span-5">
                <h2 className="text-3xl font-semibold leading-[1.1] text-[#1f1b17]">
                  Minutes from Stowe
                </h2>
                <p className="max-w-[46ch] text-[16px] leading-[1.6] text-[#44403c] md:text-[17px]">
                  Located in the quiet Edson Hill Road area with quick access to Mount Mansfield lifts, October foliage drives, and Stowe trails.
                </p>
                <div className="flex flex-col items-start gap-y-2.5 pt-2 text-[15px] font-semibold text-[#1f1b17] sm:flex-row sm:flex-wrap sm:gap-x-6">
                  <Link href="/guides/ski-season/" className="underline underline-offset-4 transition hover:text-[#6f5a2e]">
                    Ski &amp; winter stays →
                  </Link>
                  <Link href="/guides/stowe-fall-foliage/" className="underline underline-offset-4 transition hover:text-[#6f5a2e]">
                    Fall foliage →
                  </Link>
                  <Link href="/guides/stowe-family-reunions/" className="underline underline-offset-4 transition hover:text-[#6f5a2e]">
                    Family reunions →
                  </Link>
                </div>
              </div>

              <dl className="grid gap-2.5 lg:col-span-7">
                {distances.map((d) => (
                  <div
                    key={d.place}
                    className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-[15px]"
                  >
                    <dt className="font-medium text-[#1f1b17] text-pretty">{d.place}</dt>
                    <dd className="whitespace-nowrap font-medium text-[#6f5a2e]">{d.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </RevealBlock>
        </div>
      </section>

      <FaqSection
        className="!pt-4 md:!pt-6"
        title="Stowe stay questions"
        details={[
          "Edson Hill Road area, Stowe, Vermont",
          "Pet-friendly private estate stays",
          "No third-party Airbnb or Vrbo service fees",
        ]}
        items={staysFaqs}
        photo={{
          basePath: "/gallery/enhanced/31",
          alt: "Three-seasons sunroom with stone fireplace and wicker seating at Eden",
        }}
      />

      {/* Dark Split CTA */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/87"
            alt="Twilight exterior view of Eden: The Lemelson Estate in Stowe, Vermont"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2400}
            height={1600}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Reserve Eden direct
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Share your dates and group size with our Stowe concierge team to reserve directly without third-party booking fees.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Check availability
            </Link>
            <Link
              href="/reviews/"
              className="whitespace-nowrap text-[15px] font-medium text-[#f8f3ea] underline underline-offset-4 transition hover:text-white"
            >
              Read 62 reviews →
            </Link>
          </div>
        </RevealBlock>
      </section>
    </div>
  );
}
