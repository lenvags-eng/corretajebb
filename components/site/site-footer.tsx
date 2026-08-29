import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BRAND } from "@/lib/brand";
import { PUBLIC_NAVIGATION } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_1fr] lg:py-16">
        <div className="max-w-md">
          <div className="flex items-center gap-4">
            <span className="brand-crest h-16 w-16 shrink-0">
              <Image
                src="/brand/bb-logo.png"
                alt="Sello de B & B Corretaje"
                width={64}
                height={64}
                unoptimized
              />
            </span>
            <div>
              <p className="font-serif text-2xl font-semibold text-white">
                B &amp; B Corretaje
              </p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                {BRAND.location}
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/68">
            Corretaje con atención humana, información prudente y publicación
            controlada.
          </p>
        </div>

        <div>
          <p className="footer-heading">Explorar</p>
          <nav className="mt-4 flex flex-col gap-3" aria-label="Navegación del pie">
            {PUBLIC_NAVIGATION.map((item) => (
              <Link key={item.href} href={item.href} className="footer-link">
                {item.label}
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="footer-heading">Estado del prototipo</p>
          <div className="mt-4 rounded-xl border border-white/12 bg-white/[0.055] p-5">
            <p className="text-sm font-semibold text-white">Sitio + panel DEMO · P1.4</p>
            <p className="mt-2 text-sm leading-6 text-white/62">
              Catálogo ficticio y simulador de gestión por roles. Sin contacto,
              autenticación, base de datos ni persistencia.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.13em] text-[#e2afbf]">
              Uso demostrativo local
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="section-shell flex flex-col justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>© 2026 {BRAND.legalDisplayName}</p>
          <p>{BRAND.demoNotice}</p>
        </div>
      </div>
    </footer>
  );
}
