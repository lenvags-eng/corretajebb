import type { DemoPublicListing } from "@/domain/demo/types";

export const ALL_FILTER_VALUE = "Todas";

export type DemoCatalogFilters = {
  query: string;
  operation: string;
  propertyType: string;
  commune: string;
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-CL");
}

export function filterPublicListings(
  listings: DemoPublicListing[],
  filters: DemoCatalogFilters,
) {
  const normalizedQuery = normalize(filters.query.trim());

  return listings.filter((listing) => {
    const searchableText = normalize(
      [
        listing.title,
        listing.summary,
        listing.operation,
        listing.propertyType,
        listing.approximateLocation,
        listing.commune,
      ].join(" "),
    );

    return (
      (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
      (filters.operation === ALL_FILTER_VALUE ||
        listing.operation === filters.operation) &&
      (filters.propertyType === ALL_FILTER_VALUE ||
        listing.propertyType === filters.propertyType) &&
      (filters.commune === ALL_FILTER_VALUE ||
        listing.commune === filters.commune)
    );
  });
}
