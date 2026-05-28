import { Metadata } from "next";
import { WhereToFindUs } from "@/components/WhereToFindUs";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = {
  title: "Contact | Eden Estate Stowe",
  description:
    "Inquire about Eden Estate in Stowe, Vermont. Share your event details, travel dates, and guest information to begin curating your stay.",
  alternates: {
    canonical: "https://lemelsonestate.com/contact/",
  },
  openGraph: {
    title: "Contact Eden Estate Stowe",
    description:
      "Connect with the Eden Estate team to plan weddings, retreats, and family gatherings in Stowe, Vermont.",
    url: "https://lemelsonestate.com/contact/",
    type: "website",
    images: [
      {
        url: "https://lemelsonestate.com/gallery/Eden-Site%20Photos/2.avif",
        width: 720,
        height: 480,
        alt: "Eden Estate exterior view",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      <section className="pt-12 pb-6">
        <div className="lux-container max-w-4xl">
          <h1 className="text-3xl font-medium text-stone-900 md:text-4xl tracking-tight">
            Plan Your Stay
          </h1>
          <p className="mt-3 text-sm text-stone-600 max-w-xl leading-relaxed">
            Please submit your desired dates and guest details below to check availability at Eden. You can also reach us directly via email at{" "}
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
