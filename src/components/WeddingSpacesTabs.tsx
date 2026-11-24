"use client";

import Link from "next/link";
import { useState } from "react";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

interface SpaceItem {
  id: string;
  tabLabel: string;
  name: string;
  capacity: string;
  description: string;
  photo: string;
  maxWidth?: 800 | 1200;
  alt: string;
}

const spaces: SpaceItem[] = [
  {
    id: "meadow",
    tabLabel: "Upper Meadow",
    name: "The Upper Meadow",
    capacity: "Up to 300 guests outdoors",
    description:
      "Surrounded by open views of the Worcester Mountain Range, the manicured Upper Meadow accommodates cocktail hours, tented receptions, and evening celebrations with separate driveway access for caterers and tent crews.",
    photo: "/gallery/enhanced/3",
    alt: "Aerial dusk view of Eden: The Lemelson Estate grounds and Upper Meadow wedding setting in Stowe",
  },
  {
    id: "great-room",
    tabLabel: "Great Room & Hearth",
    name: "The Great Room & Hearth",
    capacity: "Up to 20 guests indoors",
    description:
      "Timber trusses, a grand piano, and a wood-burning stone fireplace offer a warm, quiet setting for winter ceremonies, rehearsal dinners by the fire, and family toasts.",
    photo: "/gallery/Eden-Site%20Photos/100",
    alt: "Roaring stone fireplace inside the Great Room at Eden: The Lemelson Estate",
  },
  {
    id: "residence",
    tabLabel: "Residence & Bridal Suite",
    name: "The Residence & Bridal Suite",
    capacity: "20 overnight guests across 8 bedrooms and 8 baths",
    description:
      "Keep immediate family and the wedding party together across 11,400 square feet, with a private dressing suite, marble-topped island, cedar sauna, steam shower, three hot tubs, and lower-level game room.",
    photo: "/gallery/Eden-Site%20Photos/36",
    alt: "Spacious custom walk-in bridal dressing suite with marble-topped center island at Eden",
  },
  {
    id: "grounds",
    tabLabel: "Grounds & Chapel",
    name: "The Grounds, Pond & Chapel",
    capacity: "28 private acres",
    description:
      "Step outside for portraits beside the spring-fed ponds, walk straight into the neighboring trails of Wiessner Woods, and visit St. Katherine Orthodox Chapel on the estate grounds.",
    photo: "/gallery/enhanced/84",
    alt: "St. Katherine Orthodox Chapel surrounded by green lawns and pines on the Eden estate grounds",
  },
];

export function WeddingSpacesTabs() {
  const [activeId, setActiveId] = useState<string>(spaces[0].id);

  return (
    <div className="space-y-8 md:space-y-10">
      <div
        role="tablist"
        aria-label="Wedding spaces across Eden"
        className="grid grid-cols-2 gap-2 md:inline-flex md:flex-nowrap md:items-center md:gap-2 lg:gap-2.5"
      >
        {spaces.map((space) => {
          const isActive = space.id === activeId;
          return (
            <button
              key={space.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${space.id}`}
              id={`tab-${space.id}`}
              onClick={() => setActiveId(space.id)}
              className={`cursor-pointer whitespace-nowrap rounded-full min-h-11 px-3.5 py-2 text-[14px] font-medium transition-colors duration-200 md:px-4 md:py-2 lg:px-5 lg:py-2.5 lg:text-[15px] ${
                isActive
                  ? "border border-[#d9c7a6] bg-[#f2e8da] text-[#1f1b17]"
                  : "border border-[#1f1b17]/10 bg-transparent text-[#44403c] hover:bg-[#f8f3ea] hover:text-[#1f1b17]"
              }`}
            >
              {space.tabLabel}
            </button>
          );
        })}
      </div>

      {/* Keep all 4 panels in static HTML for SEO/LLM crawlability */}
      <div>
        {spaces.map((space) => {
          const isActive = space.id === activeId;
          return (
            <div
              key={space.id}
              id={`panel-${space.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${space.id}`}
              className={
                isActive
                  ? "grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10"
                  : "hidden"
              }
            >
              <div className="space-y-4 lg:col-span-5 lg:pr-4">
                <h3 className="text-2xl font-semibold leading-tight text-[#1f1b17] sm:text-3xl">
                  {space.name}
                </h3>
                <p className="text-sm font-medium text-[#6f5a2e]">
                  {space.capacity}
                </p>
                <p className="max-w-[54ch] text-[16px] leading-[1.6] text-[#1f1b17] md:text-[17px]">
                  {space.description}
                </p>
                <div className="flex flex-wrap items-center gap-5 pt-2">
                  <Link
                    href="/contact/"
                    className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#111111] px-7 py-3.5 text-[15px] font-medium !text-white transition duration-200 hover:bg-stone-800 active:scale-[0.98]"
                  >
                    Inquire about this space
                  </Link>
                  <Link
                    href="/gallery/"
                    className="whitespace-nowrap text-[15px] font-medium text-[#1f1b17] underline underline-offset-4 transition hover:text-[#6f5a2e]"
                  >
                    Full gallery →
                  </Link>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl lg:col-span-7">
                <div className="aspect-[16/10] w-full">
                  <ResponsivePhoto
                    basePath={space.photo}
                    alt={space.alt}
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    width={2400}
                    height={1600}
                    maxWidth={space.maxWidth ?? 1200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-sm text-[#44403c]">
        *When more than 20 wedding guests are present, interior access to the residence is reserved exclusively for the wedding party and overnight guests.
      </p>
    </div>
  );
}
