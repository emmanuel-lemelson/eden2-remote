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
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Corporate Retreats", href: "/retreats/" },
            ]}
          />
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Edson Hill Road Area · Stowe, Vermont
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Private Corporate &amp; Executive Retreats in Stowe, Vermont
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Step away from crowded hotel ballrooms. Host your leadership offsite, board summit, or client celebration on 28 secluded Vermont acres with total discretion, high-speed fiber internet, private chef dining, and resort-grade wellness amenities.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
              >
                Plan an Executive Retreat
              </Link>
              <Link
                href="/news/the-lemelson-estate-opens-doors-to-exclusive-corporate-events/"
                className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
              >
                Read Corporate Announcement
              </Link>
            </div>
            <p className="mt-3 text-xs text-stone-600">
              Sleeps up to 20 executives overnight (8BR/8BA) • 250+ tented event capacity • Year-round availability
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
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

      {/* Executive Features Grid */}
      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Built for Leadership Teams
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Complete privacy, executive connectivity, and Vermont hospitality
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Every retreat is structured around your agenda—balancing productive strategy sessions inside quiet mountain workspaces with restorative outdoor and culinary experiences.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {executiveFeatures.map((feat) => (
              <div
                key={feat.title}
                className="rounded-3xl border border-[#d2c4a3]/50 bg-white/90 p-6 shadow-[0_20px_45px_-30px_rgba(58,45,20,0.2)] sm:p-7"
              >
                <h3 className="text-xl font-semibold text-stone-900">{feat.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workspaces & Team Building Gallery */}
      <section className="lux-section bg-white">
        <div className="lux-container space-y-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
                Meeting &amp; Strategy Spaces
              </p>
              <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
                Spaces that spark clear strategic thinking
              </h2>
              <p className="text-base leading-relaxed text-stone-700">
                Gather around the polished hardwood conference and dining table for morning keynotes, break out into sunlit lounges and the Great Room by the fire, and close the day over farm-to-table dining or a fireside wine tasting.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/28"
                  alt="Formal dining and executive meeting table at Eden Estate in Stowe, VT"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2400}
                  height={1600}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/13"
                  alt="Polished dark wood boardroom and formal dining table at Eden"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2400}
                  height={1600}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/Eden-Site%20Photos/98"
                  alt="Great Room fireside gathering space for leadership teams at Eden"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2560}
                  height={1704}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-md">
                <ResponsivePhoto
                  basePath="/gallery/enhanced/96"
                  alt="Private on-site fitness center at Eden: The Lemelson Estate"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width={2400}
                  height={1600}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Corporate & Executive Retreat FAQs"
        description="Key logistical details for executive assistants, chief-of-staff planners, and leadership teams."
        items={retreatFaqs}
      />

      {/* Bottom CTA */}
      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Inquire About Your Stowe Executive Offsite
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Share your preferred dates, team headcount, and retreat goals—our concierge team will prepare a custom private buyout proposal with direct-booking rates.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800"
            >
              Request Retreat Availability
            </Link>
            <Link
              href="/stays/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
            >
              View Full Estate Specs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
