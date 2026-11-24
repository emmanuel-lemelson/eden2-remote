import Link from "next/link";

const PRODUCTION_URL = "https://lemelsonestate.com";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Renders an accessible breadcrumb trail alongside matching BreadcrumbList JSON-LD schema.
 */
export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: new URL(item.href, PRODUCTION_URL).toString(),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 ${className}`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={item.href} className="inline-flex items-center gap-2">
              {idx > 0 ? (
                <span aria-hidden="true" className="text-[#c2a060]">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-stone-800">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition hover:text-stone-900"
                >
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
