import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "News | Eden: The Lemelson Estate",
  description:
    "Latest updates and press from Eden—The Lemelson Estate in Stowe, Vermont.",
  alternates: {
    canonical: "https://lemelsonestate.com/news/",
  },
  openGraph: {
    title: "News | Eden: The Lemelson Estate",
    description:
      "Latest updates and press from Eden—The Lemelson Estate in Stowe, Vermont.",
    url: "https://lemelsonestate.com/news/",
    images: [
      {
        url: "https://lemelsonestate.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden Estate exterior view",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "News | Eden: The Lemelson Estate",
    description:
      "Latest updates and press from Eden—The Lemelson Estate in Stowe, Vermont.",
    images: ["https://lemelsonestate.com/opengraph-image.png"],
  },
};

const articles = [
  {
    title: "The Lemelson Estate Opens Doors to Exclusive Corporate Events",
    slug: "the-lemelson-estate-opens-doors-to-exclusive-corporate-events",
    date: "2025-11-06",
    dek:
      "Eden introduces bespoke corporate retreats with private spa amenities, executive meeting spaces, and concierge experiences in Stowe, Vermont.",
    // Use a pre-optimized asset generated for the gallery to ensure instant load
    image: "/gallery/Eden-Site%20Photos/2@1200w.webp",
    imageAlt: "Aerial view of Eden Estate in Stowe, Vermont",
  },
];

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="lux-container pt-12 pb-10 md:pb-14">
        <div className="mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.5em] text-stone-600">Updates</p>
            <h1 className="mt-2 text-3xl font-semibold text-stone-900 md:text-4xl">News</h1>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((a) => (
            <article
              key={a.slug}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_24px_48px_-32px_rgba(58,45,20,0.45)]"
            >
              <Link 
                href={`/news/${a.slug}/`} 
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c2a060]"
                prefetch={true}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={true}
                    fetchPriority="high"
                    loading="eager"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <time dateTime={a.date} className="text-[0.65rem] uppercase tracking-[0.4em] text-stone-500">
                    {new Date(a.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                  <h2 className="mt-2 text-xl font-semibold text-stone-900 sm:text-2xl">
                    {a.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-stone-700">{a.dek}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-stone-700">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}







