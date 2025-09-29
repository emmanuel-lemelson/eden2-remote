import { Metadata } from "next";
import Link from "next/link";

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
            Plan Your Stay
          </h1>
          <p className="mt-4 text-base text-stone-700">
            Planning a family gathering, wedding, or retreat? Tell us your dates, guest count, and plans—our team will work with you to curate an effortless, five-star stay.
          </p>
        </div>
      </section>

      {/* Contact Details and Platforms */}
      <section className="pb-12">
        <div className="lux-container max-w-4xl">
          {/* Contact methods */}
          <div className="rounded-[2.5rem] border border-[rgba(214,202,183,0.85)] bg-gradient-to-br from-white via-[rgba(237,227,208,0.75)] to-[rgba(225,212,186,0.55)] p-5 shadow-[0_28px_60px_-38px_rgba(58,45,20,0.45)] sm:p-8">
            <p className="text-[0.68rem] uppercase tracking-[0.4em] text-stone-500 sm:text-xs">Reach Us</p>
            <div className="mt-4 flex justify-center sm:mt-5">
              <a
                href="mailto:admin@lemelsoncapital.com"
                className="group relative flex w-full max-w-[28rem] items-center gap-4 overflow-hidden rounded-[28px] border border-white/70 bg-white/80 px-4 py-4 shadow-[0_24px_50px_-40px_rgba(58,45,20,0.55)] backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-38px_rgba(58,45,20,0.6)] sm:gap-5 sm:rounded-[32px] sm:px-6 sm:py-5"
                aria-label="Email admin@lemelsoncapital.com"
              >
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/75 via-transparent to-[rgba(232,218,192,0.6)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                <div className="relative flex flex-1 items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(214,202,183,0.32)] text-[var(--color-gold)] shadow-inner shadow-white/40 sm:h-11 sm:w-11">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4.5 w-4.5 sm:h-5 sm:w-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0v.243a2.25 2.25 0 01-1.03 1.9l-6.75 4.218a2.25 2.25 0 01-2.34 0L4.5 8.893a2.25 2.25 0 01-1.03-1.9V6.75"/></svg>
                  </span>
                  <div className="space-y-1">
                    <p className="text-[0.62rem] uppercase tracking-[0.42em] text-[var(--color-gold)] sm:text-[0.68rem]">Email</p>
                    <p className="text-base font-semibold text-[var(--color-charcoal)] break-words sm:text-xl">
                      <span className="inline-block max-w-full truncate align-middle sm:max-w-none">
                        admin@lemelsoncapital.com
                      </span>
                    </p>
                  </div>
                </div>
                <span className="relative ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/85 text-[var(--color-charcoal)] transition duration-300 group-hover:bg-[var(--color-charcoal)] group-hover:text-white sm:h-10 sm:w-10">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M12 6l6 6-6 6"/></svg>
                </span>
              </a>
            </div>

            {/* Platforms (slightly different UI than home, same logos/colors) */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.4em] text-stone-500">Find us on</p>
              <div className="mt-4 grid w-full max-w-4xl grid-cols-2 justify-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5">
                <Link
                  href="https://www.airbnb.com/rooms/42793723?guests=1&adults=1&s=67&unique_share_id=ba8163d3-af1e-4825-ba7d-15abbe902ec4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#FF385C] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#FF4C6E] hover:shadow-xl sm:px-6"
                  aria-label="View Eden on Airbnb"
                >
                  <img
                    src="/Airbnb_Logo_0.svg"
                    alt="Airbnb"
                    className="h-5"
                    width={60}
                    height={20}
                    style={{ transform: "scale(1.15)", transformOrigin: "center" }}
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="https://www.vrbo.com/1958794?referrerId=HOT.HIS.Share.Landed.Copy_Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-stone-100 hover:shadow-xl sm:px-6"
                  aria-label="View Eden on Vrbo"
                >
                  <img
                    src="/Vrbo_idJM8XKT4-_1.svg"
                    alt="Vrbo"
                    className="h-5"
                    width={60}
                    height={20}
                    style={{ transform: "scale(1.15)", transformOrigin: "center" }}
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information?referrerId=HOT.HIS.Share.Landed.Copy_Link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#141D38] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#1D2A52] hover:shadow-xl sm:px-6"
                  aria-label="View Eden on Expedia"
                >
                  <img
                    src="/Expedia_Logo_1.png"
                    alt="Expedia"
                    className="h-5 w-auto"
                    width={70}
                    height={24}
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#FF44CB] px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:px-6"
                  aria-label="View Eden on The Knot"
                >
                  <img
                    src="/idzSo3ACCf_logos.jpeg"
                    alt="The Knot"
                    className="h-5 w-5 rounded-md object-cover"
                    width={40}
                    height={40}
                    style={{ transform: "scale(1.5)", transformOrigin: "center" }}
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/80 hover:shadow-xl sm:px-6"
                  aria-label="View Eden on Zola"
                >
                  <img
                    src="/id56oBQafI_1758992156050.png"
                    alt="Zola"
                    className="h-6 w-auto"
                    width={88}
                    height={24}
                    loading="lazy"
                  />
                </Link>
                <Link
                  href="https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white bg-white px-5 py-3 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#F3FBFB] hover:shadow-xl justify-self-center sm:justify-self-auto sm:px-6"
                  aria-label="View Eden on WeddingWire"
                >
                  <img
                    src="/WeddingWire_idGDCwR69F_1.svg"
                    alt="WeddingWire"
                    className="h-4 w-auto sm:h-5"
                    width={90}
                    height={24}
                    style={{ transform: "scale(1.2)", transformOrigin: "center" }}
                    loading="lazy"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
