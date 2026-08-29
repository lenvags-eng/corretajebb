import type { Metadata } from "next";
import { ArrowRight, MapPin, Scale, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { BRAND_VALUES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "B & B | B & B Corretaje",
  description:
    "Quiénes somos, misión, visión y valores de B & B Corretaje en la Región del Biobío.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiénes somos"
        title="Una propuesta local construida para inspirar confianza."
        description="B & B Corretaje es una iniciativa dirigida por Patricio Baeza Jiménez para acompañar decisiones inmobiliarias con cercanía, orden y una presentación responsable de la información."
        aside={
          <div className="page-aside-note">
            <MapPin className="size-5 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-primary">Ámbito inicial</p>
              <p className="mt-1 text-sm text-primary/60">{BRAND.location}</p>
            </div>
          </div>
        }
      />

      <section className="section-shell section-block">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="statement-card statement-card-primary">
            <p className="eyebrow eyebrow-light">Misión</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.025em] text-white sm:text-4xl">
              Facilitar decisiones inmobiliarias mediante atención cercana,
              información clara y procesos ordenados.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              Buscamos que propietarios e interesados comprendan el alcance de
              cada gestión y sepan qué información se utiliza en el proceso.
            </p>
          </article>

          <article className="statement-card">
            <p className="eyebrow">Visión</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.025em] text-primary sm:text-4xl">
              Consolidar desde el Biobío una red de corretaje confiable y
              preparada para colaborar.
            </h2>
            <p className="mt-6 text-base leading-8 text-primary/65">
              El crecimiento futuro deberá proteger la información de cada
              corredora y mantener una relación humana con sus clientes.
            </p>
          </article>
        </div>
      </section>

      <section className="values-section">
        <div className="section-shell py-14 sm:py-18">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Nuestros valores</p>
              <h2 className="section-title">Principios que orientan cada etapa</h2>
            </div>
            <p className="section-copy">
              La imagen de seriedad debe estar acompañada por decisiones
              consistentes respecto de los datos y las expectativas comerciales.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND_VALUES.map((value, index) => (
              <article key={value.title} className="value-card">
                <span className="text-xs font-bold tracking-[0.16em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-primary/62">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell section-block">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Compromiso institucional</p>
            <h2 className="section-title">
              La confianza también depende de lo que decidimos no hacer
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                icon: Users,
                title: "Sin autopublicación anónima",
                copy: "La captación comienza con una relación humana, no con la carga automática de un aviso.",
              },
              {
                icon: ShieldCheck,
                title: "Sin exposición innecesaria",
                copy: "La dirección exacta, documentos y datos personales no se convierten en contenido público por defecto.",
              },
              {
                icon: Scale,
                title: "Sin promesas absolutas",
                copy: "Una revisión comercial no equivale a garantizar la situación jurídica, técnica o financiera de un activo.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className="commitment-row">
                  <span className="service-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-primary/62">
                      {item.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <Button asChild variant="outline" className="border-primary/20 bg-white">
            <Link href="/metodo">
              Revisar el método
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
