type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-4 text-4xl font-semibold text-stone-900 md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-stone-700">
          {description}
        </p>
      ) : null}
    </div>
  );
}
