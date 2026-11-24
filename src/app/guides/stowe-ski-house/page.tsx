import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Luxury Stowe Ski House Rental Near Mount Mansfield | 8BR — Eden",
  description:
    "Stay 5 minutes from Stowe Mountain Resort at Eden: an 11,400 sq ft, 8-bedroom luxury Stowe ski house sleeping 20 with heated radiant floors, 3 hot tubs, cedar sauna, steam shower & Wiessner Woods trails.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/stowe-ski-house/`,
  },
  openGraph: {
    title: "Luxury Stowe Ski House Rental Near Mount Mansfield | 8BR — Eden",
    description:
      "8-bedroom, 11,400 sq ft luxury Stowe ski house 5 minutes from Stowe Mountain Resort. Sleeps 20, heated radiant floors, 3 hot tubs, sauna, steam shower & pet-friendly.",
    url: `${PRODUCTION_URL}/guides/stowe-ski-house/`,
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

const winterHighlights = [
  {
    title: "5 Minutes to Mount Mansfield Lifts",
    detail:
      "Located in the Edson Hill Road area, Eden puts your ski group roughly five minutes from Stowe Mountain Resort parking, gondola access, and Spruce Peak Village—without fighting Route 108 town traffic.",
  },
  {
    title: "Heated Radiant Floors & Stocked Fireplaces",
    detail:
      "Come home from cold mountain runs to warm radiant heated floors, wood-burning stone fireplaces stocked with firewood, and soaring Great Room warmth for the whole ski crew.",
  },
  {
    title: "Three Hot Tubs, Cedar Sauna & Steam Shower",
    detail:
      "Unwind après-ski in a year-round 10-person outdoor hot tub steaming in the snow, an indoor 2-person spa, a mountain-view garden spa, a private dry cedar sauna, and a soothing steam shower.",
  },
  {
    title: "Cross-Country Ski & Snowshoe From the Door",
    detail:
      "Walk five minutes to adjoining Wiessner Woods and the Catamount Trail network for tranquil snowshoeing and Nordic skiing, or book winter horse-drawn sleigh rides 2 minutes away at Topnotch Stable.",
  },
];

const winterQuotes = [
  {
    quote:
      "We arrived to a well lit and warm home. The host left wine, snacks and flowers on the kitchen counter, and even put little boxes of chocolate on every bed! The sauna, hot tub, and game room are outstanding.",
    author: "Margot M. · Stayed Feb 2025 (Vrbo)",
  },
  {
    quote:
      "From a family of 4 living in Florida trying to experience snow during their winter vacation, this home in itself IS an experience. The property is spacious, private and yet conveniently close to restaurants, ski resort and town.",
    author: "Angela · Winter Vacation, Feb 2023 (Airbnb)",
  },
  {
    quote:
      "Easy communication with host. Clean property. All exactly as advertised. Skiing Feb 2024.",
    author: "Steven T. · 5-Night Ski Trip, Feb 2024 (Vrbo)",
  },
];

const skiFaqs: FaqItem[] = [
  {
    question: "How far is Eden from Stowe Mountain Resort and Mount Mansfield ski lifts?",
    answer:
      "Eden is approximately a 5-minute drive from Stowe Mountain Resort, Mount Mansfield lifts, and the outdoor ice-skating rink at Spruce Peak, and roughly 5 minutes from restaurants along Main Street in downtown Stowe.",
  },
  {
    question: "How many skiers or families can stay at the estate?",
    answer:
      "Eden sleeps up to 20 guests across 8 bedrooms and 8 full bathrooms within 11,400 square feet—including two primary suites and a private upper-level apartment suite, making it ideal for multi-family ski weeks and holiday trips.",
  },
  {
    question: "What après-ski and wellness amenities stay open in winter?",
    answer:
      "All wellness amenities inside and around the residence operate year-round in winter, including the 10-person outdoor hot tub, 2-person indoor spa, mountain-view garden spa, private dry cedar sauna, steam shower, heated radiant floors, stocked wood-burning fireplaces, fitness center, and game room.",
  },
  {
    question: "Are there winter activities for non-skiers or kids?",
    answer:
      "Yes. Non-skiers enjoy a 5-minute walk to Wiessner Woods for snowshoeing and cross-country skiing, winter sleigh rides 2 minutes away at Topnotch Stable, dogsledding via Umiak Outdoor Outfitters, ice skating at Spruce Peak, an indoor children's playroom, pool table, foosball, and an 86-inch smart TV.",
  },
  {
    question: "Can we book a private chef or pre-stocked groceries for our ski week?",
    answer:
      "Yes. Our complimentary concierge team can pre-stock the Sub-Zero refrigerator before your arrival, arrange private farm-to-table chef dinners, book in-home massages, and coordinate airport transfers from Burlington International Airport (BTV).",
  },
];

export default function StoweSkiHousePage() {
  return (
    <div className="bg-white">
      <section className="bg-white pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="lux-container space-y-8">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Stays", href: "/stays/" },
              { name: "Stowe Ski House", href: "/guides/stowe-ski-house/" },
            ]}
          />

          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[#8f7845]">
              Winter &amp; Ski Lodging · Edson Hill Road Area, Stowe VT
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-stone-900 text-balance sm:text-4xl md:text-5xl">
              Luxury Stowe Ski House Rental — 5 Minutes from Mount Mansfield
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-700 md:text-lg">
              Skip cramped slopeside condos. Gather up to 20 guests across 8 bedrooms and 11,400 sq ft of radiant-heated mountain luxury—complete with three hot tubs, private cedar sauna, steam shower, stocked fireplaces, and adjoining cross-country ski trails.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact/"
                className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition duration-200 hover:bg-stone-800"
              >
                Check Winter &amp; Ski Dates
              </Link>
              <Link
                href="/stays/"
                className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition duration-200 hover:bg-stone-50"
              >
                View Full 8BR Estate Specs
              </Link>
            </div>
            <p className="mt-3 text-xs text-stone-600">
              Book direct with zero Airbnb or Vrbo fees • Pet-friendly stays • Peak ski &amp; holiday weeks available
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-stone-200 shadow-xl">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/enhanced/68"
                alt="Snow-covered luxury Stowe ski house exterior at Eden: The Lemelson Estate in winter"
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

      <section className="lux-section bg-gradient-to-br from-[var(--color-linen)] via-[var(--color-eggshell)] to-[var(--color-cream)]">
        <div className="lux-container space-y-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Built for Vermont Ski Weeks
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              The ultimate Stowe après-ski sanctuary
            </h2>
            <p className="mt-3 text-base leading-relaxed text-stone-700">
              From first-chair powder mornings on Mount Mansfield to fireside evenings in the Great Room, every detail at Eden is built for effortless winter gatherings.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {winterHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#d2c4a3]/50 bg-white/90 p-6 shadow-sm sm:p-7"
              >
                <h3 className="text-xl font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-700 sm:text-base">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/78"
                alt="Illuminated winter night exterior of Eden Estate in Stowe, Vermont"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/100"
                alt="Roaring stone fireplace inside the Great Room at Eden Estate"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2560}
                height={1707}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/90"
                alt="Steaming outdoor hot tub overlooking the pond and winter mountains in Stowe"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/80 shadow-md">
              <ResponsivePhoto
                basePath="/gallery/enhanced/70"
                alt="Private cedar sauna inside the lower-level spa wing at Eden"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="lux-section bg-white">
        <div className="lux-container space-y-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              Verified Winter Reviews
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
              What winter ski &amp; holiday guests say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {winterQuotes.map((q) => (
              <blockquote
                key={q.author}
                className="flex flex-col justify-between rounded-3xl border border-[#d2c4a3]/60 bg-[#fdfbf7] p-6"
              >
                <p className="text-sm italic leading-relaxed text-stone-700">
                  &ldquo;{q.quote}&rdquo;
                </p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#8f7845]">
                  {q.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Ski House FAQs"
        description="Practical winter answers for ski groups, holiday families, and snow-loving guests."
        items={skiFaqs}
      />

      <section className="lux-section border-t border-stone-200/70 bg-[#fdfbf7]">
        <div className="lux-container max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-stone-900 sm:text-4xl">
            Reserve Your Winter Week at Eden Direct
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-stone-700">
            Peak Stowe winter holidays (Christmas, New Year&apos;s, MLK, and Presidents&apos; Week) book 6–12 months ahead. Inquire directly to lock in zero platform fees.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-full bg-[#111111] px-8 py-3.5 text-[0.95rem] font-semibold !text-white transition hover:bg-stone-800"
            >
              Request Winter Dates
            </Link>
            <Link
              href="/guides/stowe-family-reunions/"
              className="inline-flex items-center rounded-full border border-stone-900 px-8 py-3.5 text-[0.95rem] font-semibold text-stone-900 transition hover:bg-stone-50"
            >
              Estate vs. 8 Resort Suites →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
