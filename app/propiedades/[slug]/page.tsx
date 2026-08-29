import type { Metadata } from "next";
import { ArrowLeft, Check, Info, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ListingGallery } from "@/components/catalog/listing-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getPublicListingBySlug,
  getPublicListingSlugs,
} from "@/domain/demo/public-listings.server";

type PropertyDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublicListingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PropertyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getPublicListingBySlug(slug);

  if (!listing) return {};

  return {
    title: `${listing.title} · DEMO | B & B Corretaje`,
    description: listing.summary,
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyDetailPageProps) {
  const { slug } = await params;
  const listing = getPublicListingBySlug(slug);

  if (!listing) notFound();

  return (
    <>
      <section className="property-detail-heading brand-grid">
        <div className="section-shell py-9 sm:py-12">
          <Link href="/propiedades" className="inline-link">
            <ArrowLeft aria-hidden="true" />
            Volver al catálogo
          </Link>
          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-white">{listing.operation}</Badge>
                <Badge variant="outline" className="border-primary/18 bg-white/65">
                  {listing.propertyType}
                </Badge>
                <Badge variant="outline" className="border-accent/20 bg-white/65 text-accent">
                  {listing.publicStatus}
                </Badge>
              </div>
              <h1 className="mt-5 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-primary sm:text-6xl">
                {listing.title}
              </h1>
              <p className="mt-5 flex items-center gap-2 text-base font-semibold text-primary/62">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {listing.approximateLocation} · {listing.commune}
              </p>
            </div>
            <div className="detail-price-panel">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                Valor DEMO
              </p>
              <p className="mt-2 font-serif text-3xl font-semibold text-primary">
                {listing.formattedPrice}
              </p>
              <p className="mt-1 text-xs text-primary/50">{listing.priceCaption}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8 sm:py-12">
        <ListingGallery images={listing.images} title={listing.title} />

        <div className="detail-layout">
          <div>
            <p className="eyebrow">Descripción ficticia</p>
            <h2 className="mt-4 text-3xl font-semibold text-primary">
              Una ficha clara, sin exponer información reservada
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-primary/65">
              {listing.description}
            </p>

            <div className="feature-grid">
              {listing.features.map((feature) => (
                <div key={feature.label} className="feature-tile">
                  <Check className="size-4 text-accent" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary/45">
                      {feature.label}
                    </p>
                    <p className="mt-1 font-serif text-xl font-semibold text-primary">
                      {feature.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="review-scope">
              <ShieldCheck className="size-6 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-semibold text-primary">{listing.reviewLabel}</p>
                <p className="mt-2 text-sm leading-7 text-primary/62">
                  {listing.reviewScope}
                </p>
              </div>
            </div>
          </div>

          <aside className="detail-contact-demo">
            <Info className="size-6 text-accent" aria-hidden="true" />
            <p className="mt-5 font-serif text-2xl font-semibold text-primary">
              ¿Te interesaría una ficha como ésta?
            </p>
            <p className="mt-3 text-sm leading-7 text-primary/62">
              En esta etapa el contacto no transmite información. La atención y
              coordinación simuladas se incorporarán en un hito posterior.
            </p>
            <Button type="button" disabled className="mt-6 w-full bg-accent text-white">
              Contacto DEMO — disponible en P1.5
            </Button>
            <p className="mt-4 text-xs leading-5 text-primary/48">
              No ingreses datos personales en este prototipo local.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
