import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Best Place to Stay in Stowe, VT for Fall Foliage & October Trips — Eden",
  description:
    "Experience peak Vermont autumn foliage from 28 private acres in Stowe. Eden sleeps 20 across 8 bedrooms—minutes from Smugglers' Notch, Bingham Falls, Wiessner Woods & Stowe Mountain Resort.",
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

const foliageStops = [
  {
    name: "Wiessner Woods & Catamount Trail",
    time: "5 min walk",
    description:
      "Step straight from the estate into mature maple, beech, birch, and hemlock forests glowing with autumn color—zero parking hassles.",
  },
  {
    name: "Topnotch Stable Horseback Rides",
    time: "2 min drive",
    description:
      "Guided autumn trail rides through wooded Stowe bridle paths—available for both adults and children.",
  },
  {
    name: "Bingham Falls (40-ft Waterfall)",
    time: "5 min drive",
    description:
      "A 72-acre forest corridor of northern hardwoods leading to deep gorges and a 40-foot cascading waterfall framed in autumn color.",
  },
  {
    name: "Mount Mansfield Gondola SkyRide & Auto Toll Road",
    time: "5 min drive",
    description:
      "Ride above the Worcester and Green Mountain canopy for sweeping Vermont October vistas across Lake Champlain and the Adirondacks.",
  },
  {
    name: "Smugglers' Notch State Park",
    time: "6 min drive",
    description:
      "Drive the winding 3.5-mile Route 108 scenic pass lined with cliffs and fiery sugar maples, or hike to Sterling Pond.",
  },
  {
    name: "Stowe Recreation Path",
    time: "Minutes away",
    description:
      "Cycle or stroll the famous 5.3-mile paved greenway crisscrossing the West Branch of the Little River from Stowe Village to Mountain Road.",
  },
];

const foliageFaqs: FaqItem[] = [
  {
    question: "When is peak fall foliage in Stowe, Vermont?",
    answer:
      "Peak Stowe fall foliage typically spans late September through mid-October, with the most vibrant reds and oranges around the first two weeks of October. Because October is one of Stowe's highest-demand windows, private 8-bedroom estates often book 6 to 12 months in advance.",
  },
  {
    question: "Why stay at a private 28-acre estate instead of a hotel during October in Stowe?",
    answer:
      "During peak foliage weekends, downtown Stowe hotels and Route 108 experience heavy traffic and busy lobbies. At Eden, you enjoy 28 private wooded acres, Worcester Mountain views from your own garden spa, and a 5-minute walk to Wiessner Woods trails without getting in a car.",
  },
  {
    question: "What autumn amenities are available on-site at Eden?",
    answer:
      "Guests enjoy the 3-Seasons Sunroom with its stone fireplace, wood-burning Great Room hearth, 3 private hot tubs (including the pondside 10-person hot tub and mountain-view garden spa), cedar sauna, clay tennis court, twin spring-fed trout ponds, and optional farm-to-table private chef dinners.",
  },
  {
    question: "Is Eden pet-friendly for autumn leaf-peeping trips?",
    answer:
      "Yes. Eden welcomes pets on vacation stays, and neighboring Wiessner Woods permits leashed dog walking along its forested autumn trails.",
  },
  {
    question: "Can we host an October wedding or family gathering at the estate?",
    answer:
      "Yes. Eden hosts both intimate 20-person indoor gatherings and outdoor tented foliage weddings up to 300 guests, with off-peak wedding rates beginning Mid-October.",
  },
];

export default function StoweFallFoliagePage() {
  return (
    <div className="bg-white">
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Stays", href: "/stays/" },
              { name: "Stowe Fall Foliage", href: "/guides/stowe-fall-foliage/" },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Autumn &amp; October Stays · Edson Hill Road Area, Stowe VT
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Where to Stay in Stowe, Vermont for Peak Fall Foliage
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Trade crowded leaf-peeping hotels for 28 private acres surrounded by Vermont sugar maples and Worcester Mountain views. Sleeps 20 across 8 bedrooms—minutes from Smugglers&apos; Notch, Bingham Falls, and Wiessner Woods.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800"
              >
                Check October &amp; Fall Dates
              </Link>
              <Link
                href="/stays/"
                className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
              >
                Explore All Estate Amenities
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/enhanced/86"
                alt="Eden: The Lemelson Estate surrounded by vibrant orange and red October fall foliage in Stowe, Vermont"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={1024}
                height={1024}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Stowe Foliage Itinerary From Eden
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              Vermont&apos;s best autumn scenery within six minutes of the driveway
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              Start crisp mornings with coffee by the 3-Seasons Sunroom stone fireplace, explore Stowe&apos;s iconic foliage passes before midday crowds arrive, and return to soak in the pondside hot tub under golden foliage.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {foliageStops.map((stop) => (
              <div
                key={stop.name}
                className="rounded-3xl border border-[#d2c4a3]/50 bg-white/90 p-6 shadow-sm"
              >
                <span className="inline-flex rounded-full bg-[#f8f3ea] px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8f7845]">
                  {stop.time}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-stone-900">{stop.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-700">{stop.description}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/2"
                alt="Sunset aerial view over Eden Estate's 28 acres and mountain backdrop"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/108"
                alt="Spring-fed pond reflecting sky and mountain trees on the Eden grounds"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1920}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/31"
                alt="Sunroom with wicker seating and lit stone fireplace for crisp Stowe autumn mornings"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/90"
                alt="Outdoor hot tub beside the spring-fed pond at Eden Estate"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Fall Foliage Rental FAQs"
        description="Planning tips for October foliage trips, leaf-peeping weekends, and autumn estate buyouts."
        items={foliageFaqs}
      />

      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Plan Your Stowe Autumn Escape
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Book directly with Eden to secure peak October dates with zero Airbnb or Vrbo fees, optional private harvest dinners, and space for up to 20 guests.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition hover:bg-stone-800"
            >
              Inquire About Fall Dates
            </Link>
            <Link
              href="/guides/stowe-ski-house/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              Explore Winter Ski Stays →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
