"use client";

import { useState } from "react";
import type { GallerySection } from "@/types/gallery";
import { GallerySectionGrid } from "@/components/GallerySectionGrid";

type Variant = "masonry" | "grouped";

type Props = {
  sections: GallerySection[];
};

const VIEW_OPTIONS: Array<{ key: Variant; label: string }> = [
  { key: "masonry", label: "All Photos" },
  { key: "grouped", label: "By Section" },
];

export function GalleryViewSwitcher({ sections }: Props) {
  const [variant, setVariant] = useState<Variant>("masonry");

  return (
    <div className="space-y-6">
      <div className="lux-container flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-2 rounded-full border border-stone-300 bg-white p-1">
          {VIEW_OPTIONS.map((option) => {
            const isActive = option.key === variant;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setVariant(option.key)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-stone-900 text-white shadow-sm"
                    : "text-stone-600 hover:bg-stone-100"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <GallerySectionGrid sections={sections} variant={variant} />
    </div>
  );
}
