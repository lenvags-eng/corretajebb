import { DatabaseZap, ShieldCheck } from "lucide-react";

import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { PageHero } from "@/components/site/page-hero";
import { Badge } from "@/components/ui/badge";
import { getPublicListings } from "@/domain/demo/public-listings.server";

export const metadata = {
  title: "Propiedades DEMO | B & B Corretaje",
  description:
    "Catálogo local ficticio con búsqueda y filtros para demostrar la experiencia B & B Corretaje.",
};

type PropertiesPageProps = {
  searchParams: Promise<{
    operacion?: string;
    tipo?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const listings = getPublicListings();
  const filters = await searchParams;

  return (
    <>
      <PageHero
        eyebrow="Propiedades y activos · DEMO"
        title="Buscar debe sentirse simple. Publicar debe ser responsable."
        description="Explora ejemplos totalmente ficticios de venta, arriendo, propiedades rurales y activos especiales. Ninguna ficha representa una oferta real."
        aside={
          <div className="page-aside-note max-w-sm">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-semibold text-primary">Proyección pública acotada</p>
              <p className="mt-1 text-sm leading-6 text-primary/60">
                Sólo esta información ficticia llega a la vista pública; los campos
                internos de prueba permanecen fuera del navegador.
              </p>
            </div>
          </div>
        }
      />

      <section className="section-shell py-10 sm:py-14">
        <div className="catalog-scope-note">
          <DatabaseZap className="size-5 shrink-0 text-accent" aria-hidden="true" />
          <p>
            <strong>Sin base de datos ni envío:</strong> los filtros funcionan sólo
            en memoria y vuelven a su estado inicial al recargar. Valores, ubicaciones,
            textos e imágenes son material DEMO.
          </p>
          <Badge variant="outline" className="border-accent/20 text-accent">
            4 casos ficticios
          </Badge>
        </div>
        <CatalogExplorer
          listings={listings}
          initialOperation={filters.operacion}
          initialPropertyType={filters.tipo}
        />
      </section>
    </>
  );
}
