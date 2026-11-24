import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhereToFindUs } from "@/components/WhereToFindUs";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Book Direct & Inquire | Eden Luxury Estate in Stowe, VT",
  description:
    "Book directly with Eden: The Lemelson Estate in Stowe, Vermont to skip Airbnb and Vrbo fees. Inquire about luxury stays, private estate weddings, or corporate retreats.",
  alternates: {
    canonical: "https://lemelsonestate.com/contact/",
  },
  openGraph: {
    title: "Book Direct & Inquire | Eden Luxury Estate in Stowe, VT",
    description:
      "Connect directly with the Eden Estate team to plan Stowe luxury stays, private weddings, and executive retreats with zero third-party fees.",
    url: "https://lemelsonestate.com/contact/",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Eden: The Lemelson Estate aerial view in Stowe, Vermont",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="pt-8 pb-6">
        <div className="lux-container max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Reserve Direct", href: "/contact/" },
            ]}
            className="mb-4"
          />
          <h1 className="text-3xl font-medium text-stone-900 md:text-4xl tracking-tight">
            Plan Your Stay
          </h1>
          <p className="mt-3 text-sm text-stone-600 max-w-xl leading-relaxed text-pretty">
            Book directly with our estate team to skip third-party platform fees. Submit your desired dates and guest details below to check availability at Eden, or reach us directly via email at{" "}
            <a 
              href="mailto:admin@lemelsoncapital.com" 
              className="font-bold text-stone-900 hover:text-stone-700 transition underline underline-offset-4"
            >
              admin@lemelsoncapital.com
            </a>
          </p>
        </div>
      </section>

      {/* Main Inquiry Form */}
      <section className="pb-10">
        <div className="lux-container max-w-4xl">
          <InquiryForm endpoint="https://formspree.io/f/mlgvzjrj" />
        </div>
      </section>

      {/* Alternative Platforms */}
      <section className="pb-16 pt-2">
        <div className="lux-container max-w-4xl">
          <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-8">
            <WhereToFindUs title="Alternative Booking Platforms" />
          </div>
        </div>
      </section>
    </div>
  );
}
