import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqSection, type FaqItem } from "@/components/FaqSection";
import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export const dynamic = "force-static";

const PRODUCTION_URL = "https://lemelsonestate.com";

export const metadata: Metadata = {
  title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
  description:
    "Explore real weddings and intimate elopements hosted at Eden: The Lemelson Estate in Stowe, VT—from cozy winter Great Room ceremonies to multi-day wedding party estate buyouts.",
  alternates: {
    canonical: `${PRODUCTION_URL}/weddings/real-weddings/`,
  },
  openGraph: {
    title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
    description:
      "Real wedding stories from couples and families who celebrated at Eden: The Lemelson Estate in Stowe, Vermont.",
    url: `${PRODUCTION_URL}/weddings/real-weddings/`,
    type: "website",
    images: [
      {
        url: `${PRODUCTION_URL}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Great Room stone fireplace wedding setting at Eden: The Lemelson Estate in Stowe, Vermont",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LemelsonEstate",
    title: "Real Weddings at Eden | Stowe, Vermont Private Estate Wedding Stories",
    description:
      "See how couples celebrate winter Great Room ceremonies, pet-friendly mountain elopements, and multi-day wedding weekends at Eden in Stowe, VT.",
    images: [`${PRODUCTION_URL}/opengraph-image.png`],
  },
};

const realWeddingFaqs: FaqItem[] = [
  {
    question: "Can we host an indoor winter wedding ceremony at Eden?",
    answer:
      "Yes. For intimate winter weddings of 20 guests or fewer, couples love exchanging vows in front of the Great Room's roaring stone fireplace—while immediate family stays on-site with heated radiant floors, private sauna, steam shower, and stocked wood-burning hearths.",
  },
  {
    question: "Does Eden host intimate elopements and small family weddings?",
    answer:
      "Yes. Couples can reserve our 2-Nights Intimate Wedding package (20 guests or fewer) starting at $12,950 off-peak or $14,950 peak—and pets are welcome when coordinating intimate wedding stays.",
  },
  {
    question: "How does multi-day wedding party lodging work for larger tented weddings?",
    answer:
      "Up to 20 overnight guests—typically the couple, immediate family, and wedding party—stay inside the 8-bedroom estate for the weekend, while up to 100 to 300 guests celebrate outdoors in the Upper Meadow. There is no need to shuttle your closest wedding party between hotels.",
  },
  {
    question: "Where can we view 2026 pricing and download the wedding brochure?",
    answer:
      "Full 2026 package pricing (from Rehearsal Dinner-Only and Mon–Thurs Ceremony-Only up to 7-Night Wedding Weeks) and the downloadable 2026 PDF brochure are published directly on our Stowe Weddings page.",
  },
];

export default function RealWeddingsPage() {
  return (
    <div className="bg-white text-stone-900">
      <section className="pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="lux-container space-y-10">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Weddings", href: "/weddings/" },
              { name: "Real Weddings", href: "/weddings/real-weddings/" },
            ]}
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
                Verified Celebrations · Stowe, Vermont
              </p>
              <h1 className="mt-4 text-4xl font-normal leading-[1.12] tracking-tight text-stone-900 sm:text-5xl">
                Real Weddings &amp; Celebrations at Eden in Stowe, Vermont
              </h1>
            </div>
            <div className="space-y-5 lg:col-span-5">
              <p className="text-base leading-7 text-stone-600">
                From fireside February snowstorm ceremonies in the Great Room to intimate 14-guest mountain elopements and full autumn wedding-party buyouts, see how real couples experience a private estate weekend at Eden.
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="/weddings/#pricing"
                  className="inline-flex items-center bg-stone-950 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
                >
                  2026 Wedding Pricing
                </Link>
                <Link
                  href="/contact/"
                  className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
                >
                  Schedule a Tour
                </Link>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-stone-100">
            <div className="aspect-[16/9] w-full">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/100"
                alt="Roaring stone fireplace in the Great Room at Eden: The Lemelson Estate—setting for intimate winter wedding ceremonies"
                sizes="(min-width: 1280px) 1072px, 100vw"
                width={2560}
                height={1707}
                priority={true}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story 1 */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Winter Great Room Wedding · February
            </p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              Seanna C. — A Fireside Snowstorm Celebration Under One Roof
            </h2>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              Planned in roughly six weeks with responsive coordination from Eden&apos;s staff, Seanna and her immediate family turned a late-February Vermont snowstorm into an unforgettable winter wedding weekend—without a single guest needing rideshares or hotel shuttles.
            </p>
            <ul className="divide-y divide-stone-300/70 border-y border-stone-300/70 text-sm leading-7 text-stone-700">
              <li className="py-3">
                <strong className="font-medium text-stone-900">Getting Ready:</strong> Bridal party prepped in the primary bedroom suite while groomsmen played pool and foosball downstairs.
              </li>
              <li className="py-3">
                <strong className="font-medium text-stone-900">Ceremony &amp; Warmth:</strong> Exchanged vows inside the Great Room before a roaring stocked stone fireplace with heated radiant floors beneath.
              </li>
              <li className="py-3">
                <strong className="font-medium text-stone-900">Custom Culinary &amp; Spa:</strong> Private chef family-style dinner tailored to dietary needs, custom signature cocktails from a private bartender, plus steam shower, cedar sauna, and hot tub relaxation.
              </li>
            </ul>
            <blockquote className="border-l border-[#c2a060] pl-5 font-serif text-base italic leading-relaxed text-stone-800">
              &ldquo;We had our ceremony in the great room with the fireplace roaring—a fiery love story. The steam shower and sauna were a wonderful way to relax in the chill of a late February snow storm... All the bedrooms were utilized for our families to stay in—no need for hiring Uber or transportation. Would suggest Eden for your wedding, small or big.&rdquo;
              <footer className="mt-3 font-sans text-[0.68rem] font-medium not-italic uppercase tracking-[0.2em] text-stone-500">
                Seanna C. · Verified Review (The Knot &amp; Airbnb)
              </footer>
            </blockquote>
          </div>

          <div className="grid gap-4 lg:col-span-6">
            <ResponsivePhoto
              basePath="/gallery/enhanced/68"
              alt="Snowy winter estate setting at Eden in Stowe, Vermont"
              sizes="(min-width: 1024px) 48vw, 100vw"
              width={2400}
              height={1600}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="grid grid-cols-2 gap-4">
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/98"
                alt="Great Room panoramic interior for intimate winter wedding ceremonies"
                sizes="(min-width: 1024px) 24vw, 50vw"
                width={2560}
                height={1704}
                className="aspect-[4/3] w-full object-cover"
              />
              <ResponsivePhoto
                basePath="/gallery/enhanced/70"
                alt="Private cedar sauna for wedding weekend relaxation"
                sizes="(min-width: 1024px) 24vw, 50vw"
                width={2400}
                height={1600}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story 2 */}
      <section className="bg-white py-20 md:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <ResponsivePhoto
              basePath="/gallery/enhanced/78"
              alt="Illuminated winter twilight facade at Eden: The Lemelson Estate"
              sizes="(min-width: 1024px) 24vw, 50vw"
              width={2400}
              height={1600}
              className="aspect-[4/5] w-full object-cover"
            />
            <ResponsivePhoto
              basePath="/gallery/Eden-Site%20Photos/102"
              alt="Vaulted primary king suite for wedding couples at Eden"
              sizes="(min-width: 1024px) 24vw, 50vw"
              width={2560}
              height={1707}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          <div className="space-y-6 lg:col-span-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Intimate Mountain Elopement · February 2026
            </p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              Kayli — 14 Family Members, Two Dogs &amp; A Secluded Winter Elopement
            </h2>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              For couples dreaming of an intimate Stowe elopement without leaving family—or dogs—behind, Kayli&apos;s celebration brought 14 closest relatives and two dogs together for a relaxed weekend surrounded by 28 private acres.
            </p>
            <blockquote className="border-l border-[#c2a060] pl-5 font-serif text-base italic leading-relaxed text-stone-800">
              &ldquo;We had our elopement at Eden this weekend with 14 of our closest family members and our two dogs. From the moment we drove up the driveway to check in we were in awe of how beautiful the property was. Everything was absolutely perfect! We are so grateful that we were able to have our small intimate wedding here.&rdquo;
              <footer className="mt-3 font-sans text-[0.68rem] font-medium not-italic uppercase tracking-[0.2em] text-stone-500">
                Kayli · Verified Review, February 2026 (Airbnb)
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Story 3 */}
      <section className="bg-[#f8f5f0] py-20 md:py-28">
        <div className="lux-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="space-y-6 lg:col-span-6">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
              Wedding Party Lodging &amp; Photography · Autumn &amp; Spring
            </p>
            <h2 className="text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
              John A. &amp; Jeff A. — Wedding Party Estate Buyouts &amp; Portrait Grounds
            </h2>
            <p className="text-sm leading-7 text-stone-600 sm:text-base">
              Families hosting weddings in Stowe repeatedly choose Eden for wedding-party accommodations and portrait photography—taking advantage of the grand curving staircase, opulent living spaces, spring-fed pond, and secluded mountain lawns.
            </p>
            <div className="space-y-6 pt-2">
              <blockquote className="border-l border-[#c2a060] pl-5 font-serif text-base italic leading-relaxed text-stone-800">
                &ldquo;My daughter and her wedding party recently stayed at Eden – The Lemelson Estate, in Stowe, Vermont. The property boasts a secluded setting with beautiful views and yet is close to all Stowe has to offer.&rdquo;
                <footer className="mt-2 font-sans text-[0.68rem] font-medium not-italic uppercase tracking-[0.2em] text-stone-500">
                  John A. · The Knot (Sep 2024)
                </footer>
              </blockquote>
              <blockquote className="border-l border-[#c2a060] pl-5 font-serif text-base italic leading-relaxed text-stone-800">
                &ldquo;The venue itself was spacious and beautiful, with a stunning grand staircase, opulent rooms and gorgeous grounds providing the ideal backdrop for wedding photos.&rdquo;
                <footer className="mt-2 font-sans text-[0.68rem] font-medium not-italic uppercase tracking-[0.2em] text-stone-500">
                  Jeff A. · Zola (Apr 2025)
                </footer>
              </blockquote>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-6">
            <ResponsivePhoto
              basePath="/gallery/enhanced/2"
              alt="Sunset aerial view of Eden Estate's grounds and pond for wedding portraits"
              sizes="(min-width: 1024px) 48vw, 100vw"
              width={2400}
              height={1600}
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="grid grid-cols-2 gap-4">
              <ResponsivePhoto
                basePath="/gallery/enhanced/86"
                alt="Autumn foliage wedding backdrop at Eden in Stowe, Vermont"
                sizes="(min-width: 1024px) 24vw, 50vw"
                width={1024}
                height={1024}
                className="aspect-[4/3] w-full object-cover"
              />
              <ResponsivePhoto
                basePath="/gallery/Eden-Site%20Photos/108"
                alt="Spring-fed pond portrait location at Eden Estate"
                sizes="(min-width: 1024px) 24vw, 50vw"
                width={2560}
                height={1920}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        title="Real Weddings at Eden FAQs"
        description="Answers inspired by real celebrations hosted at The Lemelson Estate."
        items={realWeddingFaqs}
      />

      <section className="border-t border-stone-200 bg-[#f8f5f0] py-20 md:py-24">
        <div className="lux-container max-w-3xl text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.34em] text-[#8f7845]">
            Start Planning
          </p>
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            Start Planning Your Stowe Estate Wedding
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
            Explore transparent 2026 packages, download the full wedding brochure, or request a private estate tour with Tiffany M.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/weddings/#pricing"
              className="inline-flex items-center bg-stone-950 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] !text-white transition hover:bg-stone-800"
            >
              See 2026 Pricing
            </Link>
            <Link
              href="/contact/"
              className="border-b border-stone-900 pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:border-[#8f7845] hover:text-[#8f7845]"
            >
              Inquire About Dates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
