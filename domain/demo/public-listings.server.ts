import { DEMO_ADMIN_ASSETS } from "@/domain/demo/admin-assets.server";
import type {
  DemoAdminAsset,
  DemoPublicListing,
} from "@/domain/demo/types";

function projectPublicListing(asset: DemoAdminAsset): DemoPublicListing {
  const source = asset.publicContent;

  return {
    id: source.id,
    slug: source.slug,
    title: source.title,
    operation: source.operation,
    propertyType: source.propertyType,
    approximateLocation: source.approximateLocation,
    commune: source.commune,
    formattedPrice: source.formattedPrice,
    priceCaption: source.priceCaption,
    summary: source.summary,
    description: source.description,
    features: source.features.map((feature) => ({
      label: feature.label,
      value: feature.value,
    })),
    images: source.images.map((image) => ({
      src: image.src,
      alt: image.alt,
    })),
    publicStatus: source.publicStatus,
    reviewLabel: source.reviewLabel,
    reviewScope: source.reviewScope,
    featured: source.featured,
  };
}

export function getPublicListings(): DemoPublicListing[] {
  return DEMO_ADMIN_ASSETS.map(projectPublicListing);
}

export function getPublicListingBySlug(
  slug: string,
): DemoPublicListing | undefined {
  const asset = DEMO_ADMIN_ASSETS.find(
    (candidate) => candidate.publicContent.slug === slug,
  );

  return asset ? projectPublicListing(asset) : undefined;
}

export function getPublicListingSlugs(): string[] {
  return DEMO_ADMIN_ASSETS.map((asset) => asset.publicContent.slug);
}
