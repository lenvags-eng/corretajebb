"use client";

import Image from "next/image";
import { useState } from "react";

import type { DemoListingImage } from "@/domain/demo/types";
import { cn } from "@/lib/utils";

type ListingGalleryProps = {
  images: DemoListingImage[];
  title: string;
};

export function ListingGallery({ images, title }: ListingGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return (
    <div className="listing-gallery">
      <div className="gallery-main">
        <Image
          src={selected.src}
          alt={selected.alt}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="object-cover"
        />
        <span className="listing-demo-stamp">Galería ficticia · DEMO</span>
        <span className="gallery-counter" aria-live="polite">
          {selectedIndex + 1} / {images.length}
        </span>
      </div>
      <div className="gallery-thumbnails" aria-label={`Galería de ${title}`}>
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`Mostrar imagen ${index + 1}: ${image.alt}`}
            aria-pressed={selectedIndex === index}
            className={cn(
              "gallery-thumbnail",
              selectedIndex === index && "gallery-thumbnail-active",
            )}
          >
            <Image
              src={image.src}
              alt=""
              fill
              unoptimized
              sizes="9rem"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
