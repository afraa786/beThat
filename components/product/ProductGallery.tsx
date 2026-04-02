'use client';

import { useState } from 'react';
import Image from 'next/image';

export interface ModelDetails {
  size: string;
  height: string;
}

export interface GalleryImage {
  imageUrl: string;
  isModelImage: boolean;
  modelDetails?: ModelDetails;
}

interface ProductGalleryProps {
  images: GalleryImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-400">
        No images available
      </div>
    );
  }

  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral-100">
        <Image
          key={activeImage.imageUrl}
          src={activeImage.imageUrl}
          alt={`Product image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={activeIndex === 0}
        />

        {/* Model details overlay — shown only for model images */}
        {activeImage.isModelImage && activeImage.modelDetails && (
          <div className="absolute bottom-3 left-3 rounded bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            Model wears size {activeImage.modelDetails.size} &bull; {activeImage.modelDetails.height}
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1" role="list" aria-label="Product image thumbnails">
          {images.map((img, index) => (
            <button
              key={index}
              role="listitem"
              aria-label={`View image ${index + 1}${img.isModelImage ? ' (model photo)' : ''}`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={[
                'relative h-16 w-12 shrink-0 overflow-hidden rounded border-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black',
                index === activeIndex ? 'border-black' : 'border-neutral-200 hover:border-neutral-400',
              ].join(' ')}
            >
              <Image
                src={img.imageUrl}
                alt={`Thumbnail ${index + 1}`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
