import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Info,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { PageHero } from "@/components/site/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DISCLOSURE_ROWS, METHOD_STEPS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Nuestro método | B & B Corretaje",
  description:
    "Proceso de captación humana, revisión prudente y publicación controlada de B & B Corretaje.",
};

export default function MethodPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestro método"
        title="La tecnología organiza. La decisión de publicar sigue siendo humana."
        description="Nuestro enfoque separa la relación privada con el cliente de la información autorizada para una presentación pública."
        aside={
          <Badge
            variant="outline"
            className="border-accent/25 bg-white/65 px-4 py-2 text-accent"
          >
            Proceso representativo DEMO
          </Badge>
        }
      />

      <section className="section-shell section-block" aria-labelledby="steps-title">
        <div className="section-intro">
          <div>
            <p className="eyebrow">Seis etapas</p>
            <h2 id="steps-title" className="section-title">
              De la necesidad inicial al seguimiento comercial
            </h2>
          </div>
          <p className="section-copy">
            El proceso definitivo deberá ajustarse al tipo de encargo y a los
            documentos que correspondan en cada caso.
          </p>
        </div>

        <ol className="method-timeline mt-12">
          {METHOD_STEPS.map((step) => (
            <li key={step.number} className="method-step">
              <div className="method-step-marker">{step.number}</div>
              <div className="method-step-content">
                <h3 className="text-2xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-primary/64">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="disclosure-section">
        <div className="section-shell py-14 sm:py-18">
          <div className="section-intro">
            <div>
              <p className="eyebrow">Separación de información</p>
              <h2 className="section-title">
                Lo público no es una copia de la carpeta privada
              </h2>
            </div>
            <p className="section-copy">
              La futura web utilizará una selección positiva de campos
              autorizados. Ocultar visualmente un dato no será suficiente.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl border border-primary/14 bg-white/75 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary text-white hover:bg-primary">
                  <TableHead className="px-5 text-white">Información</TableHead>
                  <TableHead className="px-5 text-white">Vista pública</TableHead>
                  <TableHead className="px-5 text-white">Tratamiento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {DISCLOSURE_ROWS.map((row) => (
                  <TableRow key={row.information} className="hover:bg-secondary/45">
                    <TableCell className="min-w-64 px-5 py-4 font-semibold text-primary">
                      {row.information}
                    </TableCell>
                    <TableCell className="min-w-40 px-5 py-4 text-primary/70">
                      {row.publicUse}
                    </TableCell>
                    <TableCell className="min-w-56 px-5 py-4 text-primary/62">
                      {row.reservedUse}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>

      <section className="section-shell section-block" aria-labelledby="review-title">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Lenguaje responsable</p>
            <h2 id="review-title" className="section-title">
              Revisada no significa garantizada
            </h2>
            <p className="mt-5 text-sm leading-7 text-primary/63">
              Cada etiqueta deberá explicar exactamente el control realizado.
              Ninguna reemplaza una revisión jurídica o técnica profesional.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: Info,
                title: "Información recibida",
                copy: "El antecedente fue incorporado al proceso, pero puede estar pendiente de revisión.",
              },
              {
                icon: Eye,
                title: "Revisión comercial",
                copy: "Se revisó la coherencia de la presentación y su relación con el encargo.",
              },
              {
                icon: CheckCircle2,
                title: "Aprobada para publicación",
                copy: "Una persona autorizó la versión pública y sus condiciones de difusión.",
              },
            ].map((level) => {
              const Icon = level.icon;

              return (
                <article key={level.title} className="review-level">
                  <Icon className="size-5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <h3 className="font-semibold text-primary">{level.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-primary/60">
                      {level.copy}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <div className="scope-warning">
          <EyeOff className="size-6 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <h2 className="font-serif text-2xl font-semibold text-primary">
              Este prototipo no recibe antecedentes
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-primary/65">
              En esta etapa no se cargan documentos, direcciones, contactos ni
              propiedades. La pantalla sólo explica el proceso que podría
              implementarse posteriormente.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 text-sm font-semibold text-primary/62">
            <ShieldCheck className="size-4 text-accent" aria-hidden="true" />
            Privacidad desde el diseño, no como corrección posterior.
          </p>
          <Button asChild variant="outline" className="border-primary/20 bg-white">
            <Link href="/servicios">
              Revisar servicios
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
