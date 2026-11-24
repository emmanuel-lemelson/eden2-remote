import { ResponsivePhoto } from "@/components/ResponsivePhoto";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqPhoto {
  basePath: string;
  alt: string;
  width?: number;
  height?: number;
  maxWidth?: 800 | 1200;
  imgClassName?: string;
}

interface FaqSectionProps {
  title: string;
  description?: string;
  details?: string[];
  items: FaqItem[];
  photo?: FaqPhoto;
  className?: string;
}

/**
 * Renders an unlined editorial FAQ accordion paired with matching FAQPage JSON-LD schema.
 */
export function FaqSection({
  title,
  description,
  details,
  items,
  photo,
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
    <section className={`bg-white pb-14 pt-16 md:pb-20 md:pt-24 lg:pb-24 lg:pt-28 ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="lux-container">
        {photo ? (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="space-y-8 lg:col-span-7">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold leading-[1.12] text-stone-900 md:text-4xl">
                  {title}
                </h2>
                {description ? (
                  <p className="max-w-[52ch] text-base leading-7 text-stone-700 text-pretty">
                    {description}
                  </p>
                ) : null}
                {details && details.length > 0 ? (
                  <ul className="space-y-1.5 text-base leading-7 text-stone-700">
                    {details.map((line) => (
                      <li key={line} className="flex items-baseline gap-3">
                        <span aria-hidden="true" className="h-px w-4 shrink-0 translate-y-[-0.3em] bg-[#b59a62]" />
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="space-y-6 pt-1">
                {items.map((item) => (
                  <details key={item.question} className="group">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold leading-snug text-stone-900 md:text-lg [&::-webkit-details-marker]:hidden">
                      <span className="text-pretty">{item.question}</span>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 text-xl font-normal text-[#6f5a2e] transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-2.5 max-w-[56ch] text-base leading-7 text-stone-700 text-pretty">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div
                className={`overflow-hidden rounded-2xl ${
                  (photo.height ?? 1600) > (photo.width ?? 2400) ? "mx-auto max-w-md lg:max-w-none" : ""
                }`}
              >
                <div
                  className={`w-full ${
                    (photo.height ?? 1600) > (photo.width ?? 2400)
                      ? "aspect-[4/5] lg:aspect-[3/4]"
                      : "aspect-[16/10] lg:aspect-[4/3]"
                  }`}
                >
                  <ResponsivePhoto
                    basePath={photo.basePath}
                    alt={photo.alt}
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    width={photo.width ?? 2400}
                    height={photo.height ?? 1600}
                    maxWidth={photo.maxWidth ?? 1200}
                    className={photo.imgClassName ?? "h-full w-full object-cover"}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold leading-[1.12] text-stone-900 md:text-4xl">
                {title}
              </h2>
              {description ? (
                <p className="max-w-[54ch] text-base leading-7 text-stone-700">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="space-y-6">
              {items.map((item) => (
                <details key={item.question} className="group">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-base font-semibold leading-snug text-stone-900 md:text-lg [&::-webkit-details-marker]:hidden">
                    <span className="text-pretty">{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex-shrink-0 text-xl font-normal text-[#6f5a2e] transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-2.5 max-w-[56ch] text-base leading-7 text-stone-700 text-pretty">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
