import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";
import { RevealBlock, ScalingHeroTitle } from "@/components/WeddingMotion";

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
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Corporate Retreats", href: "/retreats/" },
        ]}
      />

      {/* Split stage: fixed sticky estate view on desktop paired with calm reading column */}
      <section className="bg-white">
        <div className="grid lg:grid-cols-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-6 lg:aspect-auto lg:sticky lg:top-20 lg:h-[calc(100svh-5rem)]">
            <ResponsivePhoto
              basePath="/gallery/enhanced/87"
              alt="Twilight exterior view of Eden: The Lemelson Estate corporate retreat venue in Stowe, Vermont"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={2400}
              height={1600}
              priority={true}
              className="h-full w-full object-cover lg:absolute lg:inset-0"
            />
          </div>

          <div className="lg:col-span-6">
            <div className="lux-container space-y-10 py-10 md:space-y-12 md:py-14 lg:mx-0 lg:max-w-none lg:space-y-14 lg:py-16 lg:!pl-12 lg:!pr-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))] xl:!pl-16">
              {/* Hero title + subtext + button stacked directly below */}
              <div>
                <ScalingHeroTitle className="text-[clamp(2.5rem,6.4vw,5rem)] lg:text-[clamp(3rem,4.4vw,4.5rem)] font-semibold text-balance leading-[0.94] tracking-[-0.03em] text-[#1f1b17]">
                  Retreats at Eden
                </ScalingHeroTitle>

                <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[18px]">
                  Located on 28 private acres with open mountain views, Eden opens its doors for leadership offsites, board meetings, and private corporate gatherings in Stowe.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <Link
                    href="/contact/"
                    className="inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-7 py-3.5 text-[15px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
                  >
                    Plan a corporate retreat
                  </Link>
                  <Link
                    href="/stays/"
                    className="whitespace-nowrap text-[15px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
                  >
                    View estate specs →
                  </Link>
                </div>
              </div>

              {/* Section 1 */}
              <RevealBlock className="space-y-4 rounded-2xl bg-[#f8f3ea] p-6 sm:p-8">
                <h2 className="text-2xl font-semibold leading-[1.15] text-[#1f1b17] sm:text-3xl">
                  Exclusive use of the estate
                </h2>
                <p className="text-[16px] leading-[1.6] text-[#44403c]">
                  Corporate groups have the entire 11,400-square-foot estate and 28 acres reserved solely for your group. Up to 20 overnight guests stay comfortably across eight bedrooms and eight baths, giving teams space to focus, meet privately, and unwind together.
                </p>
              </RevealBlock>

              {/* Section 2 + Exact matching executive study photograph */}
              <RevealBlock delayMs={40} className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold leading-[1.15] text-[#1f1b17] sm:text-3xl">
                    Meeting spaces &amp; connectivity
                  </h2>
                  <p className="text-[16px] leading-[1.6] text-[#44403c]">
                    High-speed fiber-optic Wi-Fi covers the residence alongside dedicated private meeting spaces, breakout rooms, formal dining, a second-floor workspace, and quiet gathering areas in the Great Room and three-seasons sunroom.
                  </p>
                </div>
                <div className="overflow-hidden rounded-2xl">
                  <div className="aspect-[16/10] w-full">
                    <ResponsivePhoto
                      basePath="/gallery/enhanced/57"
                      alt="Private wood-paneled executive office and study inside Eden: The Lemelson Estate"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      width={2400}
                      height={1600}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </RevealBlock>

              {/* Section 3 + Formal dining + Great Room breakout photos */}
              <RevealBlock delayMs={50} className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold leading-[1.15] text-[#1f1b17] sm:text-3xl">
                    Chef dining &amp; team itineraries
                  </h2>
                  <p className="text-[16px] leading-[1.6] text-[#44403c]">
                    Private chef services and curated wine pairings can be arranged featuring local Vermont ingredients, alongside afternoon skiing at Stowe Mountain Resort, hiking in Wiessner Woods, clay tennis, brewery visits, and recovery in the cedar sauna and hot tubs.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-2xl">
                    <div className="aspect-[4/3] w-full">
                      <ResponsivePhoto
                        basePath="/gallery/enhanced/28"
                        alt="Formal dining and meeting table set for an executive dinner at Eden"
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        width={2400}
                        height={1600}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <div className="aspect-[4/3] w-full">
                      <ResponsivePhoto
                        basePath="/gallery/Eden-Site%20Photos/98"
                        alt="Great Room fireside gathering space for leadership teams"
                        sizes="(min-width: 1024px) 22vw, 50vw"
                        width={2560}
                        height={1704}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
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
