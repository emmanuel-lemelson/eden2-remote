import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";
import { getEventVenueSchema } from "@/lib/seo-schema";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Corporate & Executive Retreat Venue in Stowe, Vermont — Eden",
  description:
    "Host a private corporate retreat or executive offsite in Stowe, VT on 28 secluded acres. Sleeps 20 guests, fiber-optic internet, breakout rooms, private chef dining & custom mountain itineraries.",
  alternates: {
    canonical: `${PRODUCTION_URL}/retreats/`,
  },
  openGraph: {
    title: "Corporate & Executive Retreat Venue in Stowe, Vermont — Eden",
    description:
      "Host a private corporate retreat or executive offsite in Stowe, VT on 28 secluded acres. Sleeps 20 guests, fiber-optic internet, breakout rooms, private chef dining & custom mountain itineraries.",
    url: `${PRODUCTION_URL}/retreats/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate private corporate retreat venue in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Corporate & Executive Retreat Venue in Stowe, Vermont — Eden",
    description:
      "Full 28-acre private estate stays for executive offsites, board meetings & client retreats in Stowe, VT. Fiber internet, custom dining, sleeps 20.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const retreatSpecs = [
  { label: "Capacity", value: "Up to 20 overnight" },
  { label: "Residence", value: "8 bedrooms, 8 baths" },
  { label: "Living space", value: "11,400 sq ft" },
  { label: "Grounds", value: "28 private acres" },
  { label: "Connectivity", value: "High-speed fiber Wi-Fi" },
  { label: "Airport", value: "45 min from BTV" },
];

const retreatPillars = [
  {
    name: "Meeting spaces & connectivity",
    summary:
      "High-speed fiber-optic Wi-Fi covers the residence alongside dedicated private meeting spaces, breakout rooms, an 86-inch smart TV, Sonos audio, a private second-floor executive study, and quiet gathering areas in the Great Room and three-seasons sunroom.",
    photo: "/gallery/Eden-Site%20Photos/99",
    alt: "Double-height Great Room with leather sofas, dining area, and loft walkway at Eden Estate",
  },
  {
    name: "Chef dining & hospitality",
    summary:
      "Private chef services and curated wine pairings can be arranged featuring local Vermont ingredients, alongside pre-arrival grocery and coffee stocking, full use of the main gourmet kitchen, and outdoor grilling on the stone terrace.",
    photo: "/gallery/enhanced/28",
    alt: "Formal dining and meeting table set for an executive dinner at Eden",
  },
  {
    name: "Offsite recovery & Stowe itineraries",
    summary:
      "Between sessions, step out to Wiessner Woods five minutes on foot, ski Stowe Mountain Resort five minutes away, play on the clay tennis court, or unwind in the private fitness room, dry cedar sauna, steam shower, and outdoor hot tubs.",
    photo: "/gallery/enhanced/90",
    alt: "Outdoor hot tub overlooking the spring-fed pond and Worcester Mountains at Eden",
    imgClassName: "h-full w-full object-cover object-[50%_45%] lg:absolute lg:inset-0",
  },
];

const retreatFaqs: FaqItem[] = [
  {
    question: "If we bring 12 to 18 people, what does the bedroom and bathroom setup look like?",
    answer:
      "The 11,400-square-foot residence has 8 bedrooms and 8 full bathrooms sleeping up to 20 overnight guests, so groups of more than 8 pair some bedrooms (including double-queen and twin layouts) while keeping en-suite convenience. The second floor also includes a self-contained apartment suite with its own kitchen, living room, primary bedroom, and twin bedroom.",
  },
  {
    question: "Where can our team hold working sessions, and how reliable is the Wi-Fi for video calls?",
    answer:
      "High-speed fiber-optic Wi-Fi covers the residence. Full-group discussions gather around the formal dining room table or in the Great Room, paired with an 86-inch smart TV, Sonos audio, a private second-floor executive study, and breakout lounges in the three-seasons sunroom or lower-level game room.",
  },
  {
    question: "How do meals work during an offsite if nobody wants to go out every night?",
    answer:
      "Our concierge team can coordinate pre-arrival grocery and coffee stocking as well as optional private chef dinners with custom menus and wine pairings. Groups also have full use of the main gourmet kitchen and outdoor grill.",
  },
  {
    question: "How far is Eden from Burlington airport, and how do teams coordinate arrivals?",
    answer:
      "Eden sits in the Edson Hill Road area of Stowe, roughly 45 minutes from Burlington International Airport (BTV). Concierge assistance is available for private airport transfers and smooth arrival coordination for staggered team arrivals.",
  },
  {
    question: "What can teams do between meetings, and how many daytime event guests can attend?",
    answer:
      "Between sessions, guests step out to Wiessner Woods (five-minute walk), drive five minutes to Stowe Mountain Resort, play on the clay tennis court, or unwind in the fitness room, cedar sauna, steam shower, and hot tubs. Larger seasonal receptions for 250+ tented guests can also be arranged on the grounds.",
  },
];

export default function RetreatsPage() {
  return (
    <div className="bg-white text-[#1f1b17]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getEventVenueSchema()) }}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Corporate Retreats", href: "/retreats/" },
        ]}
      />

      {/* Hero: Centered editorial headline, subtitle, CTA, and wide centered hero image */}
      <section className="bg-white pb-8 pt-5 md:pb-16 md:pt-12">
        <div className="lux-container">
          <div className="mx-auto max-w-3xl text-center">
            <ScalingHeroTitle className="text-[clamp(2rem,6.5vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-[#1f1b17] md:leading-[0.96]">
              Retreats at Eden
            </ScalingHeroTitle>

            <p className="mx-auto mt-3 max-w-[54ch] text-balance text-[15px] leading-[1.5] text-[#44403c] md:mt-4 md:text-[20px]">
              Located on 28 private acres with open mountain views, Eden opens its doors for leadership offsites, board meetings, and private corporate gatherings in Stowe.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 md:mt-6 md:gap-5">
              <Link
                href="/contact/"
                className="inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-5 py-2.5 text-[14px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98] md:min-h-11 md:px-7 md:py-3 md:text-[15px]"
              >
                Plan a corporate retreat
              </Link>
              <Link
                href="/stays/"
                className="whitespace-nowrap text-[14px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e] md:text-[15px]"
              >
                View estate specs →
              </Link>
            </div>
          </div>
        </div>

        <div className="lux-container mt-5 md:mt-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-[46svh] md:min-h-[300px] md:max-h-[500px] md:rounded-3xl">
            <ResponsivePhoto
              basePath="/gallery/enhanced/87"
              alt="Twilight exterior view of Eden: The Lemelson Estate corporate retreat venue in Stowe, Vermont"
              sizes="(min-width: 1280px) 1152px, 100vw"
              width={2400}
              height={1600}
              priority={true}
              className="h-full w-full object-cover object-[50%_25%]"
            />
          </div>
        </div>
      </section>

      {/* Section 1: Exclusive use overview + quick specs + 3-photo bento grid */}
      <section className="bg-[#f8f3ea] py-12 md:py-24 lg:py-28">
        <div className="lux-container space-y-8 md:space-y-16">
          <RevealBlock className="space-y-4">
            <h2 className="text-2xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Exclusive use of the estate
            </h2>
            <p className="max-w-[54ch] text-[15px] leading-[1.6] text-[#44403c] md:text-[17px]">
              Corporate groups have the entire 11,400-square-foot estate and 28 acres reserved solely for your team. Up to 20 overnight guests stay comfortably across eight bedrooms and eight baths, with space to focus, meet privately, and unwind together.
            </p>
          </RevealBlock>

          <RevealBlock delayMs={40}>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {retreatSpecs.map((spec) => (
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

          {/* Flush 3-photo bento grid */}
          <RevealBlock delayMs={50}>
            <div className="grid gap-4 md:grid-cols-12 md:items-stretch">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl md:col-span-7 md:aspect-auto">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/57"
                  alt="Private wood-paneled executive office and study inside Eden: The Lemelson Estate"
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
                      basePath="/gallery/Eden-Site%20Photos/98"
                      alt="Great Room fireside gathering space for leadership teams at Eden"
                      sizes="(min-width: 768px) 40vw, 50vw"
                      width={2560}
                      height={1704}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[4/3] w-full md:aspect-[16/10]">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/31"
                      alt="Three-seasons sunroom with wicker seating and stone fireplace for breakout conversations"
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

      {/* Section 2: Three retreat pillars paired row-by-row with equal-height photography */}
      <section className="bg-white py-12 md:py-24 lg:py-28">
        <div className="lux-container space-y-8 md:space-y-10">
          <RevealBlock className="space-y-3">
            <h2 className="text-2xl font-semibold leading-[1.12] text-[#1f1b17] md:text-4xl">
              Built for focused offsites
            </h2>
            <p className="max-w-[54ch] text-[15px] leading-[1.6] text-[#44403c] md:text-[17px]">
              From full-team strategy sessions to private chef dinners and mountain recovery, every detail is arranged around your schedule.
            </p>
          </RevealBlock>

          <div className="space-y-5">
            {retreatPillars.map((pillar, idx) => (
              <RevealBlock
                key={pillar.name}
                delayMs={idx * 40}
                className="grid gap-4 lg:grid-cols-12 lg:items-stretch lg:gap-5"
              >
                <div className="flex flex-col justify-center rounded-2xl bg-[#f8f3ea] p-5 sm:p-8 lg:col-span-6">
                  <h3 className="text-xl font-semibold text-[#1f1b17] sm:text-2xl">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-[#44403c] sm:text-[16px]">
                    {pillar.summary}
                  </p>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:col-span-6 lg:aspect-auto lg:min-h-[220px]">
                  <ResponsivePhoto
                    basePath={pillar.photo}
                    alt={pillar.alt}
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    width={2400}
                    height={1600}
                    className={
                      pillar.imgClassName ??
                      "h-full w-full object-cover lg:absolute lg:inset-0"
                    }
                  />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        className="!bg-[#f8f3ea]"
        title="Executive retreat questions"
        details={[
          "Edson Hill Road area, Stowe, Vermont",
          "45 minutes from Burlington International Airport (BTV)",
          "Private corporate and leadership stays across all seasons",
        ]}
        items={retreatFaqs}
        photo={{
          basePath: "/gallery/enhanced/96",
          alt: "Private on-site fitness room at Eden: The Lemelson Estate",
        }}
      />

      {/* Dark Split CTA */}
      <section className="grid bg-[#1f1b17] md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[360px] lg:min-h-[460px]">
          <ResponsivePhoto
            basePath="/gallery/enhanced/3"
            alt="Aerial dusk view of Eden: The Lemelson Estate mountain retreat in Stowe, Vermont"
            sizes="(min-width: 768px) 50vw, 100vw"
            width={2400}
            height={1600}
            className="h-full w-full object-cover md:absolute md:inset-0"
          />
        </div>

        <RevealBlock className="flex flex-col items-start justify-center gap-6 bg-[#1f1b17] px-6 py-12 text-[#f8f3ea] sm:px-10 md:px-10 md:py-12 lg:py-20 lg:pl-16 lg:pr-[max(4rem,calc((100vw-72rem)/2+2.5rem))] xl:pl-20">
          <h2 className="text-3xl font-semibold leading-[1.1] text-white sm:text-4xl">
            Inquire about your retreat
          </h2>
          <p className="max-w-[42ch] text-[16px] leading-[1.6] text-[#e8dac0] md:text-[17px]">
            Share your dates and team size with our hospitality team for availability, custom dining arrangements, and Stowe itinerary planning.
          </p>
          <div className="flex flex-wrap items-center gap-5 pt-1">
            <Link
              href="/contact/"
              className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f8f3ea] px-8 py-3.5 text-[15px] font-semibold !text-[#1f1b17] transition duration-200 hover:bg-white active:scale-[0.98]"
            >
              Request availability
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
