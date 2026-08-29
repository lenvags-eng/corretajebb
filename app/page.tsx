import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Compass,
  Handshake,
  House,
  KeyRound,
  LandPlot,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ListingCard } from "@/components/catalog/listing-card";
import { QuickSearch } from "@/components/catalog/quick-search";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BRAND } from "@/lib/brand";
import { getPublicListings } from "@/domain/demo/public-listings.server";
import {
  BRAND_VALUES,
  METHOD_STEPS,
  SERVICES,
  TRUST_SIGNALS,
} from "@/lib/site-content";

const SERVICE_ICONS: Record<(typeof SERVICES)[number]["id"], LucideIcon> = {
  vender: House,
  "dar-en-arriendo": KeyRound,
  comprar: SearchCheck,
  arrendar: Building2,
  rurales: LandPlot,
  especiales: Compass,
};

export default function Home() {
  const featuredListings = getPublicListings()
    .filter((listing) => listing.featured)
    .slice(0, 3);

  return (
    <>
      <section className="home-hero brand-grid">
        <div className="section-shell grid gap-12 py-12 sm:py-16 lg:grid-cols-[1.16fr_0.84fr] lg:items-center lg:py-20">
          <div>
            <Badge
              variant="outline"
              className="border-accent/25 bg-white/65 px-3 py-1 text-accent"
            >
              {BRAND.location}
            </Badge>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.045em] text-primary sm:text-6xl lg:text-7xl">
              Corretaje cercano.
              <span className="block text-accent">Decisiones más claras.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-primary/70">
              Acompañamos procesos de venta, compra y arriendo con atención
              humana, información prudente y una publicación controlada desde
              Los Ángeles para la provincia del Biobío.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 bg-accent px-6 text-white hover:bg-accent/90"
              >
                <Link href="/propiedades">
                  Explorar propiedades DEMO
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 border-primary/20 bg-white/65 px-6 text-primary hover:bg-primary hover:text-white"
              >
                <Link href="/servicios">Conocer nuestros servicios</Link>
              </Button>
            </div>
            <p className="mt-5 flex max-w-xl items-start gap-2 text-sm leading-6 text-primary/60">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              No aceptamos autopublicaciones anónimas. Cada relación comienza
              mediante contacto y revisión humana.
            </p>
          </div>

          <aside className="hero-seal-panel" aria-label="Compromiso de publicación">
            <div className="hero-seal-orbit" aria-hidden="true" />
            <div className="relative">
              <div className="mx-auto w-fit rounded-full bg-white p-3 shadow-[0_24px_70px_rgba(8,47,82,0.16)]">
                <Image
                  src="/brand/bb-logo.png"
                  alt="Sello de B & B Corretaje"
                  width={230}
                  height={230}
                  priority
                  unoptimized
                  className="h-44 w-44 rounded-full sm:h-56 sm:w-56"
                />
              </div>
              <div className="mt-8 border-t border-primary/15 pt-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Antes de publicar
                </p>
                <ol className="mt-4 grid gap-3">
                  {[
                    "Conocemos el encargo",
                    "Separamos información pública y reservada",
                    "Aprobamos humanamente la presentación",
                  ].map((item, index) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-semibold text-primary/75"
                    >
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-[0.68rem] text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="home-search-band" aria-labelledby="quick-search-title">
        <div className="section-shell py-7 sm:py-9">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div>
              <p className="eyebrow eyebrow-light">Búsqueda rápida · DEMO</p>
              <h2 id="quick-search-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Encuentra un ejemplo en pocos pasos
              </h2>
            </div>
            <QuickSearch />
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Principios de servicio">
        <div className="section-shell grid divide-y divide-primary/12 md:grid-cols-3 md:divide-x md:divide-y-0">
          {TRUST_SIGNALS.map((signal) => (
            <div key={signal.title} className="px-0 py-6 md:px-7 lg:px-10">
              <p className="flex items-center gap-2 font-serif text-lg font-semibold text-primary">
                <Check className="size-4 text-accent" aria-hidden="true" />
                {signal.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-primary/62">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell section-block" aria-labelledby="featured-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Selección B &amp; B · DEMO</p>
            <h2 id="featured-title" className="section-title">
              Propiedades de muestra para recorrer la experiencia
            </h2>
          </div>
          <div className="section-copy">
            <p>
              Cada publicación, valor, ubicación e imagen es ficticia y sirve para
              mostrar cómo se presentaría un catálogo controlado.
            </p>
            <Link href="/propiedades" className="inline-link mt-4">
              Ver las cuatro publicaciones
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="listing-grid mt-10">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section-shell section-block" aria-labelledby="services-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Servicios de corretaje</p>
            <h2 id="services-title" className="section-title">
              Distintos objetivos, un acompañamiento ordenado
            </h2>
          </div>
          <p className="section-copy">
            Atendemos necesidades habitacionales, rurales y especiales sin
            convertir la información del cliente en una publicación automática.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id];

            return (
              <Card key={service.id} className="service-card">
                <CardHeader className="gap-4">
                  <div className="flex items-center justify-between">
                    <span className="service-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="text-xs font-bold tracking-[0.15em] text-primary/35">
                      {service.number}
                    </span>
                  </div>
                  <CardTitle className="font-serif text-2xl leading-tight text-primary">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-primary/65">
                    {service.summary}
                  </p>
                  <Link
                    href={`/servicios#${service.id}`}
                    className="inline-link mt-6"
                  >
                    Revisar servicio
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="institutional-band">
        <div className="section-shell grid gap-12 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow eyebrow-light">Una forma responsable de crecer</p>
            <h2 className="mt-5 text-balance text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              La confianza se construye mostrando límites.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/68">
              B &amp; B busca consolidar una presencia local seria y preparar,
              progresivamente, una colaboración segura con otros corredores.
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="mt-8 border-white/20 bg-white/5 text-white hover:bg-white hover:text-primary"
            >
              <Link href="/empresa">
                Conocer B &amp; B
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {BRAND_VALUES.map((value) => (
              <article key={value.title} className="value-tile">
                <p className="font-serif text-xl font-semibold text-white">
                  {value.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/62">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-block" aria-labelledby="method-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Método de trabajo</p>
            <h2 id="method-title" className="section-title">
              De la conversación a una publicación controlada
            </h2>
          </div>
          <p className="section-copy">
            El prototipo representa un proceso en que la tecnología organiza,
            pero la decisión de publicar sigue siendo humana.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.slice(0, 4).map((step) => (
            <li key={step.number} className="method-preview">
              <span className="method-number">{step.number}</span>
              <h3 className="mt-5 text-xl font-semibold text-primary">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-primary/62">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex justify-end">
          <Button asChild variant="outline" className="border-primary/20 bg-white">
            <Link href="/metodo">
              Ver el proceso completo
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="closing-panel">
          <div>
            <p className="eyebrow">Prototipo institucional</p>
            <h2 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-[-0.025em] text-primary sm:text-4xl">
              Una demostración clara, sin simular funciones que todavía no existen.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-7 text-primary/65">
              El catálogo público permite buscar, filtrar y recorrer galerías. El
              panel P1.4 permite explorar roles, cartera y estados sin guardar datos.
            </p>
            <Button asChild className="mt-5 bg-accent text-white hover:bg-accent/90">
              <Link href="/panel">
                Explorar panel DEMO
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.13em] text-accent">
              <Handshake className="size-4" aria-hidden="true" />
              Desarrollo por etapas verificables
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
