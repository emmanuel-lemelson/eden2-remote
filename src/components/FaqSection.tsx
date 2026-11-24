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
 * Renders an editorial hairline FAQ accordion paired with matching FAQPage JSON-LD schema.
 */
export function FaqSection({
  eyebrow = "Questions & Answers",
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
    <section className={`py-20 md:py-28 bg-white ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="lux-container max-w-4xl">
        <div className="mb-12 border-b border-stone-200 pb-8 md:mb-14">
          {eyebrow ? (
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-[#8f7845]">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="divide-y divide-stone-200/90 border-b border-stone-200/90">
          {items.map((item) => (
            <details key={item.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 text-left text-base font-medium text-stone-900 transition-colors hover:text-[#8f7845] sm:text-lg [&::-webkit-details-marker]:hidden">
                <span className="font-serif">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 text-xl font-light text-stone-400 transition-transform duration-200 group-open:rotate-45 group-open:text-[#8f7845]"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-600 sm:text-[0.95rem]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
