import type { Photo } from '@/lib/images';

interface PictureProps {
  photo: Photo;
  /** Layout hint for the browser to pick a variant, e.g. "(min-width: 1024px) 33vw, 100vw". */
  sizes: string;
  className?: string;
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean;
  /** Overrides the photo's alt text; pass "" when the image is decorative. */
  alt?: string;
}

/** Responsive WebP image with explicit dimensions (RULES.md §6.4). */
export function Picture({ photo, sizes, className = '', priority = false, alt }: PictureProps) {
  const largest = photo.variants[photo.variants.length - 1];
  const srcSet = photo.variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ');
  return (
    <img
      src={largest?.src}
      srcSet={srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={alt ?? photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
