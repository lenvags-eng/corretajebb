import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Building2,
  Check,
  Compass,
  House,
  KeyRound,
  LandPlot,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Servicios | B & B Corretaje",
  description:
    "Servicios de venta, compra, arriendo, propiedades rurales y activos especiales de B & B Corretaje.",
};

const SERVICE_ICONS: Record<(typeof SERVICES)[number]["id"], LucideIcon> = {
  vender: House,
  "dar-en-arriendo": KeyRound,
  comprar: SearchCheck,
  arrendar: Building2,
  rurales: LandPlot,
  especiales: Compass,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios B & B"
        title="Acompañamiento para vender, comprar y arrendar."
        description="Cada necesidad se aborda como un encargo humano y ordenado. Este prototipo explica el alcance comercial; no recibe solicitudes ni documentación."
        aside={
          <Badge
            variant="outline"
            className="border-accent/25 bg-white/65 px-4 py-2 text-accent"
          >
            Sin autopublicación
          </Badge>
        }
      />

      <section className="section-shell section-block" aria-label="Servicios disponibles">
        <div className="grid gap-5 lg:grid-cols-2">
          {SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id];

            return (
              <article id={service.id} key={service.id} className="service-detail">
                <div className="flex items-start justify-between gap-4">
                  <span className="service-icon service-icon-large">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="text-xs font-bold tracking-[0.16em] text-primary/35">
                    {service.number}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-semibold tracking-[-0.025em] text-primary">
                  {service.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-primary/65">
                  {service.summary}
                </p>
                <div className="mt-6 border-t border-primary/12 pt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                    Puede considerar
                  </p>
                  <ul className="mt-4 grid gap-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-6 text-primary/68"
                      >
                        <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                        <span className="first-letter:uppercase">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="scope-warning">
          <ShieldAlert className="size-6 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Alcance prudente del servicio
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-primary/65">
              La intermediación comercial no reemplaza estudios de títulos,
              tasaciones profesionales, asesoría jurídica, evaluación técnica o
              decisiones de financiamiento. Cuando correspondan, deben realizarse
              por profesionales competentes.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Button asChild className="bg-accent text-white hover:bg-accent/90">
            <Link href="/metodo">
              Conocer nuestro método
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
