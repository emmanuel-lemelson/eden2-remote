import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
  description:
    "Gather up to 20 guests across 8 bedrooms and 28 private acres in Stowe, VT. See why a private buyout at Eden beats booking 8 suites at a Stowe resort—with kids' playroom, pool, tennis & pet-friendly stays.",
  alternates: {
    canonical: `${PRODUCTION_URL}/guides/stowe-family-reunions/`,
  },
  openGraph: {
    title: "Stowe Family Reunion & Large Group Rental (Sleeps 20) — Eden Estate",
    description:
      "Compare a private 8-bedroom estate buyout in Stowe vs. booking 8 hotel suites. Sleeps 20, heated pool, 3 hot tubs, clay tennis court, playroom & zero platform fees.",
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
      "Gather 20 family members under one roof in Stowe, VT—with kids' playroom, private apartment suite, pool, 3 spas, tennis court & zero platform fees.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const comparisonRows = [
  {
    category: "Privacy & Shared Living",
    eden: "100% exclusive 11,400 sq ft residence & 28 private acres—everyone together in one Great Room",
    resort: "Scattered hotel rooms along public corridors; crowded lobbies and shared hallways",
  },
  {
    category: "Pool, Hot Tubs & Sauna",
    eden: "Private heated pool (May–Sept), 3 private spas (10-person hot tub, indoor spa, garden spa), cedar sauna & steam shower",
    resort: "Shared resort pool hours with outside guests and limited spa slots",
  },
  {
    category: "Group Meals & Kitchens",
    eden: "Sub-Zero & Thermador chef's kitchen, formal dining table, outdoor BBQ & optional private in-house chef",
    resort: "Expensive restaurant checks and split tables for 16–20 people at every meal",
  },
  {
    category: "Multi-Gen & Kid Setup",
    eden: "Dedicated children's playroom, cribs/Pack 'n Play/baby gates, plus a quiet self-contained 2nd-floor apartment suite",
    resort: "Standard hotel bedrooms with no playroom; extra charges for cribs and adjoining suites",
  },
  {
    category: "Outdoor Recreation",
    eden: "Private clay tennis court, twin trout-stocked ponds, 5-min walk to Wiessner Woods trails",
    resort: "Pay-per-hour court rentals and crowded public recreation facilities",
  },
  {
    category: "Pets",
    eden: "Pet-friendly estate so family dogs join the reunion",
    resort: "Strict per-room pet limits, breed caps, or steep nightly pet fees",
  },
  {
    category: "Booking Fees",
    eden: "Direct booking on lemelsonestate.com with zero Airbnb/Vrbo service fees",
    resort: "Per-room nightly resort fees, parking charges, and banquet markups",
  },
];

const generationZones = [
  {
    title: "Toddlers & Young Kids",
    detail:
      "Indoor children's playroom stocked with books and toys for ages 0–10+, standard crib, Pack 'n Play, baby bath, baby safety gates, fireplace guards, kids' bikes, and seasonal pool toys.",
  },
  {
    title: "Teens & Cousins",
    detail:
      "Lower-level recreation wing with pool table, foosball, game console, 86-inch smart TV, Sonos sound, board games, clay tennis court, and trout-stocked ponds.",
  },
  {
    title: "Grandparents & Quiet Seekers",
    detail:
      "Both a first-floor 2nd Primary Suite (minimal stairs) and a private self-contained second-floor Apartment Suite with its own kitchen, living room, primary bedroom, and twin room.",
  },
  {
    title: "Parents & Milestone Hosts",
    detail:
      "Relax in three private spa zones, the cedar sauna, or the private fitness center while our concierge arranges pre-arrival groceries, private chef dinners, and Stowe excursions.",
  },
];

const reunionFaqs: FaqItem[] = [
  {
    question: "How many people can stay at Eden for a Stowe family reunion?",
    answer:
      "Eden comfortably sleeps up to 20 overnight guests across 8 bedrooms and 8 full bathrooms within 11,400 square feet, with sprawling common areas designed so everyone can dine and gather together.",
  },
  {
    question: "Is there a quiet space for grandparents or families with babies?",
    answer:
      "Yes. In addition to first-floor guest bedrooms and a main-level primary suite, the second floor includes a private, self-contained apartment suite with its own kitchen, living area, primary bedroom, and twin bedroom—plus a nursery near the main primary suite.",
  },
  {
    question: "What baby and children's gear is already at the house?",
    answer:
      "Eden stocks a dedicated children's playroom, books and toys for ages 0–10+, a standard crib, Pack 'n Play travel crib, baby bath, baby safety gates, fireplace guards, board games, and kids' bikes so families can pack light.",
  },
  {
    question: "Can we bring dogs to our family reunion?",
    answer:
      "Yes. Eden is pet-friendly for vacation stays, with 28 private acres and neighboring dog-friendly trails at Wiessner Woods just a 5-minute walk away.",
  },
  {
    question: "Can our concierge arrange a private chef or reunion activities?",
    answer:
      "Yes. Our complimentary concierge coordinates multi-course private chef dinners, barbecue cookouts, pre-stocked groceries, horseback rides at Topnotch (2 min away), and Stowe Mountain Resort outings.",
  },
];

export default function StoweFamilyReunionsPage() {
  return (
    <div className="bg-white text-stone-900">
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="lux-container space-y-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Stays", href: "/stays/" },
              { name: "Family Reunions", href: "/guides/stowe-family-reunions/" },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Multi-Gen &amp; Large Group Stays · Stowe, Vermont
              </p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.12] tracking-tight text-stone-900 sm:text-5xl">
                Stowe Family Reunion &amp; Large-Group Luxury Estate (Sleeps 20)
              </h1>
            </div>
            <div className="space-y-5 lg:col-span-5">
              <p className="text-base leading-7 text-stone-600">
                Bring three generations together under one roof on 28 secluded acres in Stowe. Enjoy 8 bedrooms, 8 bathrooms, a kids&apos; playroom, private apartment suite, heated pool, 3 hot tubs, clay tennis court, and pet-friendly stays.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/contact/"
                  className="inline-flex items-center bg-stone-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
                >
                  Plan Your Reunion
                </Link>
                <Link
                  href="/stays/"
                  className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
                >
                  Floor-by-Floor Layout
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-stone-100">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/113"
                alt="Resort-style backyard stone patio, heated pool, and circular spa at Eden Estate in Stowe, VT"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2560}
                height={1920}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Architectural Comparison Table */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container max-w-5xl space-y-12">
          <div className="grid gap-6 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Side-by-Side Comparison
              </p>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
                Private Estate Buyout at Eden vs. Booking 8 Suites at a Stowe Resort
              </h2>
            </div>
            <p className="text-sm leading-7 text-stone-600 md:col-span-5">
              Why multi-family vacations, milestone birthdays, and reunions get dramatically more space, privacy, and value with one private estate buyout.
            </p>
          </div>

          <div className="overflow-x-auto border-y border-stone-900/15 bg-white">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-stone-200 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  <th className="py-4 pl-6 pr-4">Feature</th>
                  <th className="px-6 py-4 text-[#8f7845]">Eden: The Lemelson Estate</th>
                  <th className="py-4 pl-6 pr-6">8 Separate Stowe Resort Suites</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm">
                {comparisonRows.map((row) => (
                  <tr key={row.category} className="align-top">
                    <td className="py-5 pl-6 pr-4 font-serif text-base text-stone-900 whitespace-nowrap">
                      {row.category}
                    </td>
                    <td className="bg-[#fdfbf7] px-6 py-5 leading-6 text-stone-800">
                      {row.eden}
                    </td>
                    <td className="py-5 pl-6 pr-6 leading-6 text-stone-500">
                      {row.resort}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Multi-Gen Zones */}
      <section className="bg-white py-20 md:py-28">
        <div className="lux-container space-y-14">
          <div className="max-w-2xl">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Every Age Covered
            </p>
            <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              Designed for every generation, from toddlers to grandparents
            </h2>
          </div>

          <div className="grid gap-x-10 gap-y-10 border-t border-stone-200 pt-12 md:grid-cols-2 lg:grid-cols-4">
            {generationZones.map((zone, idx) => (
              <div key={zone.title} className="space-y-3">
                <span className="text-[0.68rem] font-medium tracking-[0.22em] text-[#8f7845]">
                  0{idx + 1}
                </span>
                <h3 className="text-xl font-normal text-stone-900">{zone.title}</h3>
                <p className="text-sm leading-7 text-stone-600">{zone.detail}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/98"
              alt="Great Room gathering space with leather sofas and grand piano"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              width={2560}
              height={1704}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/enhanced/28"
              alt="Formal dining table prepared for large family reunion dinners"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              width={2400}
              height={1600}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/93"
              alt="Spacious lower-level family recreation and game room"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              width={2560}
              height={1707}
              className="aspect-[4/3] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/111"
              alt="Outdoor patio seating beside the private clay tennis court"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              width={2560}
              height={1920}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <FaqSection
        title="Stowe Family Reunion FAQs"
        description="Common questions from reunion planners organizing multi-family stays in Stowe."
        items={reunionFaqs}
      />

      <section className="border-t border-stone-200 bg-[#f8f5f0] py-20 md:py-24">
        <div className="lux-container max-w-3xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
            Family Gatherings
          </p>
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            Bring the Whole Family to Eden
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Book direct to save third-party platform fees and let our concierge tailor your family reunion itinerary.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/contact/"
              className="inline-flex items-center bg-stone-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
            >
              Request Reunion Dates
            </Link>
            <Link
              href="/reviews/"
              className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Read 62 Five-Star Reviews
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
