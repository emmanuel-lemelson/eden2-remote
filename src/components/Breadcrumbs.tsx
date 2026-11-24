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
 * Renders a quiet editorial breadcrumb trail alongside matching BreadcrumbList JSON-LD schema.
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
        className={`flex flex-wrap items-center gap-2.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-stone-400 ${className}`}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <span key={item.href} className="inline-flex items-center gap-2.5">
              {idx > 0 ? (
                <span aria-hidden="true" className="text-stone-300">
                  /
                </span>
              ) : null}
              {isLast ? (
                <span aria-current="page" className="text-stone-700">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-stone-900"
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
