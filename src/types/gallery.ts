export type GalleryImageItem = {
  src: string;
  alt: string;
  srcset?: string;
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
