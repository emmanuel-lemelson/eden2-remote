export type GalleryImageItem = {
  src: string;
  alt: string;
  srcset?: string;
  avifSrcset?: string;
  sizes?: string;
  width: number;
  height: number;
};

export type GallerySection = {
  title: string;
  description?: string;
  directory: string;
  images: GalleryImageItem[];
};
