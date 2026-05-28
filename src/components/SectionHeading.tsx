type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
}: SectionHeadingProps) {
  const HeadingTag = as;

  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <HeadingTag className="mt-2 text-4xl font-semibold text-stone-900 md:text-5xl">
        {title}
      </HeadingTag>
      {description ? (
        <p className="mt-4 text-base leading-7 text-stone-700">
          {description}
        </p>
      ) : null}
    </div>
  );
}
