import { ArrowLeft, MapPinned } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-shell grid min-h-[58svh] place-items-center py-16 text-center">
      <div className="max-w-xl">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-accent">
          <MapPinned aria-hidden="true" />
        </span>
        <p className="eyebrow mt-6">Página no encontrada</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-primary">
          Esta ruta no forma parte del prototipo.
        </h1>
        <p className="mt-5 text-base leading-7 text-primary/63">
          Utiliza el menú principal para volver a las pantallas públicas o al
          panel de demostración disponibles en P1.4.
        </p>
        <Button asChild className="mt-8 bg-accent text-white hover:bg-accent/90">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </section>
  );
}
