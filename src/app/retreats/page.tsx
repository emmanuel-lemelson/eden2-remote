import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Corporate & Executive Retreat Venue in Stowe, Vermont — Eden",
  description:
    "Host a private corporate retreat or executive offsite in Stowe, VT on 28 secluded acres. Sleeps 20 leaders, fiber-optic internet, breakout rooms, farm-to-table chef dining & custom mountain itineraries.",
  alternates: {
    canonical: `${PRODUCTION_URL}/retreats/`,
  },
  openGraph: {
    title: "Corporate & Executive Retreat Venue in Stowe, Vermont — Eden",
    description:
      "Host a private corporate retreat or executive offsite in Stowe, VT on 28 secluded acres. Sleeps 20 leaders, fiber-optic internet, breakout rooms, farm-to-table chef dining & custom mountain itineraries.",
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
      "Full 28-acre private estate buyout for executive offsites, board meetings & client retreats in Stowe, VT. Fiber internet, chef dining, sleeps 20.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const executiveFeatures = [
  {
    title: "100% Private Estate Buyout",
    description:
      "Unlike shared conference wings at Stowe resorts, your leadership team holds exclusive control over all 28 acres and 11,400 sq ft—ensuring complete discretion for board reviews, M&A planning, and confidential strategy sessions.",
  },
  {
    title: "Fiber-Optic Connectivity & Workspaces",
    description:
      "Equipped with high-speed fiber-optic Wi-Fi throughout the residence, wired Ethernet, and a dedicated private office with monitor, ergonomic chair, laptop stand, and printer for seamless hybrid presentations.",
  },
  {
    title: "Flexible Boardroom & Breakout Spaces",
    description:
      "Host full-team sessions at the formal dining/conference table or inside the Great Room, then split into smaller working groups across the 3-Seasons Sunroom, Music Room, upper loft lounge, and outdoor stone patio.",
  },
  {
    title: "Chef-Prepared Farm-to-Table Dining",
    description:
      "Skip restaurant logistics. Our culinary team crafts seasonal Vermont farm-to-table breakfasts, working lunches, and multi-course dinners with curated wine pairings right in the estate kitchen.",
  },
  {
    title: "Restorative Wellness & Team Bonding",
    description:
      "After strategy sessions, recharge in the year-round 10-person hot tub, private cedar sauna, steam shower, fitness center, clay tennis court, or game room—or step directly onto Wiessner Woods trails.",
  },
  {
    title: "Turnkey Stowe Concierge Itineraries",
    description:
      "Our concierge team coordinates private transfers from Burlington International Airport (BTV), Stowe Mountain Resort ski passes, mountain golf, guided hikes, and Vermont craft brewery tours.",
  },
];

const retreatFaqs: FaqItem[] = [
  {
    question: "How many executives can stay overnight or attend a corporate event at Eden?",
    answer:
      "Eden accommodates up to 20 overnight guests across 8 bedrooms and 8 full bathrooms within 11,400 sq ft, making it ideal for C-suite offsites, founder retreats, and board summits. For seasonal company galas, client receptions, or holiday parties, outdoor tented capacity extends to 250+ guests.",
  },
  {
    question: "What internet, AV, and meeting room setups are available?",
    answer:
      "The estate features high-speed fiber-optic Wi-Fi throughout, wired Ethernet, an 86-inch smart TV, Sonos surround audio, and a dedicated executive office with a monitor, ergonomic chair, laptop stand, and printer. Teams gather around the long formal dining/conference table, in the Great Room, or across multiple private breakout lounges.",
  },
  {
    question: "Can we arrange private chef catering and dietary accommodations for our team?",
    answer:
      "Yes. Our concierge team arranges private in-house chef service featuring Vermont farm-to-table ingredients and curated wine pairings—covering energizing breakfasts, working lunches, and celebratory evening dinners with full dietary accommodations.",
  },
  {
    question: "Why choose a private estate buyout in Stowe over a hotel conference center?",
    answer:
      "A full buyout of Eden guarantees total privacy with no outside hotel guests, competitors, or passersby. Your team gets uninterrupted focus by day and relaxed, house-party camaraderie around the stone fireplace, hot tubs, and sauna at night.",
  },
  {
    question: "How far is Eden from Burlington International Airport (BTV) and Stowe Mountain Resort?",
    answer:
      "Located in the Edson Hill Road area of Stowe, Vermont, Eden is approximately 5 minutes from Stowe Mountain Resort and downtown Stowe Village, and roughly 45 minutes from Burlington International Airport (BTV) and private FBO aviation terminals.",
  },
  {
    question: "When are corporate and executive retreats available?",
    answer:
      "Corporate retreats, board summits, and leadership offsites are available year-round—from winter ski retreats and spring/summer offsites to peak autumn foliage gatherings. Peak-season dates book early, so we recommend inquiring in advance.",
  },
];

export default function RetreatsPage() {
  return (
    <div className="bg-white text-stone-900">
      {/* Editorial Hero */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="lux-container space-y-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Corporate Retreats", href: "/retreats/" },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Edson Hill Road Area · Stowe, Vermont
              </p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.12] tracking-tight text-stone-900 sm:text-5xl">
                Private Corporate &amp; Executive Retreats in Stowe, Vermont
              </h1>
            </div>
            <div className="space-y-5 lg:col-span-5">
              <p className="text-base leading-7 text-stone-600">
                Step away from crowded hotel ballrooms. Host your leadership offsite, board summit, or client celebration on 28 secluded Vermont acres with total discretion, high-speed fiber internet, private chef dining, and resort-grade wellness amenities.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/contact/"
                  className="inline-flex items-center bg-stone-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
                >
                  Plan an Offsite
                </Link>
                <Link
                  href="/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/"
                  className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
                >
                  Corporate Announcement
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-stone-100">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/enhanced/87"
                alt="Twilight exterior view of Eden: The Lemelson Estate corporate retreat venue in Stowe, Vermont"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2400}
                height={1600}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Executive Capabilities — Editorial Grid */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container space-y-14">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Built for Leadership Teams
              </p>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                Complete privacy, executive connectivity, and Vermont hospitality
              </h2>
            </div>
            <p className="text-sm leading-7 text-stone-600 sm:text-base lg:col-span-5">
              Every retreat is structured around your agenda—balancing productive strategy sessions inside quiet mountain workspaces with restorative outdoor and culinary experiences.
            </p>
          </div>

          <div className="grid gap-x-10 gap-y-12 border-t border-stone-300/70 pt-12 md:grid-cols-2 lg:grid-cols-3">
            {executiveFeatures.map((feat, idx) => (
              <div key={feat.title} className="space-y-3">
                <span className="text-[0.68rem] font-medium tracking-[0.22em] text-[#8f7845]">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-normal text-stone-900">{feat.title}</h3>
                <p className="text-sm leading-7 text-stone-600">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workspaces & Gathering Spaces */}
      <section className="bg-white py-20 md:py-28">
        <div className="lux-container grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-5">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Meeting &amp; Strategy Spaces
            </p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              Spaces that spark clear strategic thinking
            </h2>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              Gather around the polished hardwood conference and dining table for morning keynotes, break out into sunlit lounges and the Great Room by the fire, and close the day over farm-to-table dining or a fireside wine tasting.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <ResponsivePhoto
              basePath="/gallery/enhanced/28"
              alt="Formal dining and executive meeting table at Eden Estate in Stowe, VT"
              sizes="(min-width: 1024px) 30vw, 50vw"
              width={2400}
              height={1600}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/enhanced/13"
              alt="Polished dark wood boardroom and formal dining table at Eden"
              sizes="(min-width: 1024px) 30vw, 50vw"
              width={2400}
              height={1600}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/98"
              alt="Great Room fireside gathering space for leadership teams at Eden"
              sizes="(min-width: 1024px) 30vw, 50vw"
              width={2560}
              height={1704}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/enhanced/96"
              alt="Private on-site fitness center at Eden: The Lemelson Estate"
              sizes="(min-width: 1024px) 30vw, 50vw"
              width={2400}
              height={1600}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <FaqSection
        title="Corporate & Executive Retreat FAQs"
        description="Key logistical details for executive assistants, chief-of-staff planners, and leadership teams."
        items={retreatFaqs}
      />

      {/* Closing CTA */}
      <section className="border-t border-stone-200 bg-[#f8f5f0] py-20 md:py-24">
        <div className="lux-container max-w-3xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
            Private Buyout Inquiries
          </p>
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            Inquire About Your Stowe Executive Offsite
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Share your preferred dates, team headcount, and retreat goals—our concierge team will prepare a custom private buyout proposal with direct-booking rates.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact/"
              className="inline-flex items-center bg-stone-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
            >
              Request Availability
            </Link>
            <Link
              href="/stays/"
              className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              View Full Estate Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
