"use client";

import { RotateCcw, Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";

import { ListingCard } from "@/components/catalog/listing-card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DemoPublicListing } from "@/domain/demo/types";
import {
  ALL_FILTER_VALUE,
  filterPublicListings,
} from "@/domain/demo/catalog-filters";

type CatalogExplorerProps = {
  listings: DemoPublicListing[];
  initialOperation?: string;
  initialPropertyType?: string;
};

export function CatalogExplorer({
  listings,
  initialOperation,
  initialPropertyType,
}: CatalogExplorerProps) {
  const [query, setQuery] = useState("");
  const [operation, setOperation] = useState(() =>
    initialOperation &&
    listings.some((listing) => listing.operation === initialOperation)
      ? initialOperation
      : ALL_FILTER_VALUE,
  );
  const [propertyType, setPropertyType] = useState(() =>
    initialPropertyType &&
    listings.some((listing) => listing.propertyType === initialPropertyType)
      ? initialPropertyType
      : ALL_FILTER_VALUE,
  );
  const [commune, setCommune] = useState(ALL_FILTER_VALUE);

  const operations = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.operation))),
    [listings],
  );
  const propertyTypes = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.propertyType))),
    [listings],
  );
  const communes = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.commune))),
    [listings],
  );

  const filteredListings = useMemo(() => {
    return filterPublicListings(listings, {
      query,
      operation,
      propertyType,
      commune,
    });
  }, [commune, listings, operation, propertyType, query]);

  function resetFilters() {
    setQuery("");
    setOperation(ALL_FILTER_VALUE);
    setPropertyType(ALL_FILTER_VALUE);
    setCommune(ALL_FILTER_VALUE);
  }

  return (
    <div id="catalogo" className="catalog-explorer">
      <div className="catalog-filter-panel" aria-label="Filtros del catálogo DEMO">
        <div className="catalog-search-field">
          <label htmlFor="catalog-search" className="filter-label">
            Buscar por palabra
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-primary/45"
              aria-hidden="true"
            />
            <Input
              id="catalog-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ej.: rural, casa o Los Ángeles"
              className="h-11 bg-white pl-10"
            />
          </div>
        </div>

        <div>
          <label htmlFor="operation-filter" className="filter-label">
            Operación
          </label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger id="operation-filter" className="h-11 w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FILTER_VALUE}>Todas</SelectItem>
              {operations.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="type-filter" className="filter-label">
            Tipo
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="type-filter" className="h-11 w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FILTER_VALUE}>Todos</SelectItem>
              {propertyTypes.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="commune-filter" className="filter-label">
            Comuna
          </label>
          <Select value={commune} onValueChange={setCommune}>
            <SelectTrigger id="commune-filter" className="h-11 w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_FILTER_VALUE}>Todas</SelectItem>
              {communes.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={resetFilters}
          className="h-11 self-end border-primary/18 bg-white text-primary"
        >
          <RotateCcw aria-hidden="true" />
          Limpiar
        </Button>
      </div>

      <div className="catalog-result-heading">
        <div>
          <p className="eyebrow">Resultados ficticios</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary">
            Catálogo de demostración
          </h2>
        </div>
        <p className="result-count" aria-live="polite">
          {filteredListings.length} de {listings.length} publicaciones DEMO
        </p>
      </div>

      {filteredListings.length > 0 ? (
        <div className="listing-grid">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <Empty className="catalog-empty border border-primary/15 bg-white/70">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>No encontramos coincidencias</EmptyTitle>
            <EmptyDescription>
              Prueba otra palabra o limpia los filtros. Todos los resultados de
              esta pantalla son ficticios.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button type="button" variant="outline" onClick={resetFilters}>
              <RotateCcw aria-hidden="true" />
              Restablecer catálogo
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
