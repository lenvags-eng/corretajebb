import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { DemoPublicListing } from "@/domain/demo/types";

type ListingCardProps = {
  listing: DemoPublicListing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const cover = listing.images[0];

  return (
    <article className="listing-card">
      <Link
        href={`/propiedades/${listing.slug}`}
        className="listing-card-media group"
        aria-label={`Ver ficha DEMO: ${listing.title}`}
      >
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        <span className="listing-demo-stamp">Propiedad ficticia · DEMO</span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="bg-primary text-white">{listing.operation}</Badge>
          <Badge
            variant="outline"
            className="border-primary/15 bg-secondary/55 text-primary"
          >
            {listing.propertyType}
          </Badge>
        </div>
        <h3 className="mt-4 text-2xl font-semibold leading-tight text-primary">
          <Link href={`/propiedades/${listing.slug}`}>{listing.title}</Link>
        </h3>
        <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary/62">
          <MapPin className="size-4 shrink-0 text-accent" aria-hidden="true" />
          {listing.approximateLocation} · {listing.commune}
        </p>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-primary/62">
          {listing.summary}
        </p>
        <div className="mt-auto border-t border-primary/10 pt-5">
          <p className="font-serif text-2xl font-semibold text-primary">
            {listing.formattedPrice}
          </p>
          <p className="mt-1 text-xs text-primary/48">{listing.priceCaption}</p>
          <Link
            href={`/propiedades/${listing.slug}`}
            className="inline-link mt-5"
          >
            Ver ficha y galería
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
