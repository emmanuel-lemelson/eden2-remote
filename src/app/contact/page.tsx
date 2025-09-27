import { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact | Eden Estate Stowe",
  description:
    "Inquire about Eden Estate in Stowe, Vermont. Share your event details, travel dates, and guest information to begin curating your stay.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="lux-section pb-12">
        <div className="lux-container max-w-4xl">
          <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-stone-900 md:text-5xl">
            Begin your Eden stay.
          </h1>
          <p className="mt-4 text-base text-stone-700">
            Share your desired dates, guest details, and the experiences you envision. Our concierge team will reach out within 24 hours to craft a bespoke proposal.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="lux-container max-w-4xl">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
