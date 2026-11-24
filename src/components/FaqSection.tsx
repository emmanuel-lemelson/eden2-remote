export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FaqItem[];
  className?: string;
}

/**
 * Renders a visible FAQ accordion paired with matching FAQPage JSON-LD schema.
 */
export function FaqSection({
  eyebrow = "Frequently Asked Questions",
  title,
  description,
  items,
  className = "",
}: FaqSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className={`lux-section bg-white ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="lux-container max-w-4xl">
        <div className="mb-8 text-center md:mb-10">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8f7845]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-2 text-3xl font-semibold text-stone-900 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="divide-y divide-stone-200/80 overflow-hidden rounded-3xl border border-[#d2c4a3]/50 bg-[#fdfbf7] shadow-[0_20px_50px_-34px_rgba(58,45,20,0.2)]">
          {items.map((item) => (
            <details key={item.question} className="group px-6 py-5 sm:px-8 sm:py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-stone-900 sm:text-lg [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#c2a060]/40 bg-white text-[#8f7845] transition-transform duration-200 group-open:rotate-45"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    className="h-4 w-4"
                  >
                    <path strokeLinecap="round" d="M10 4v12M4 10h12" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 pr-8 text-sm leading-relaxed text-stone-700 sm:text-base">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
