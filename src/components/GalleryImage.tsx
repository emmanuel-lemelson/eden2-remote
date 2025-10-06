"use client";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  index?: number;
  sizes?: string;
  srcSet?: string;
};

const PRIORITY_IMAGE_COUNT = 12;
const DEFAULT_SIZES = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw";

export function GalleryImage({
  src,
  alt,
  width,
  height,
  sizes,
  srcSet,
  index = 0,
}: Props) {
  const isPriority = index < PRIORITY_IMAGE_COUNT;
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes ?? DEFAULT_SIZES}
      alt={alt}
      loading={isPriority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={isPriority ? "high" : "low"}
      width={width}
      height={height}
      className="h-auto w-full object-cover"
      style={{
        aspectRatio: `${width} / ${height}`,
        backgroundColor: "var(--color-eggshell)",
      }}
    />
  );
}
