"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, ShieldCheck, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BRAND } from "@/lib/brand";
import { PUBLIC_NAVIGATION } from "@/lib/site-content";
import { cn } from "@/lib/utils";

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="section-shell flex h-[5.25rem] items-center justify-between gap-5">
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3 rounded-md"
          aria-label="Ir al inicio de B & B Corretaje"
        >
          <span className="brand-crest brand-crest-header shrink-0">
            <Image
              src="/brand/bb-logo.png"
              alt=""
              width={68}
              height={68}
              priority
              unoptimized
            />
          </span>
          <span className="min-w-0">
            <span className="brand-wordmark block">B &amp; B</span>
            <span className="block truncate text-[0.64rem] font-bold uppercase tracking-[0.24em] text-primary/65">
              Corretaje
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navegación principal"
        >
          {PUBLIC_NAVIGATION.map((item) => {
            const active = isCurrentPath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn("nav-link", active && "nav-link-active")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="hidden border-primary/20 bg-white/70 px-3 py-1 text-primary md:inline-flex"
          >
            <ShieldCheck aria-hidden="true" />
            {BRAND.phase}
          </Badge>

          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden border-accent/25 bg-white/75 text-accent hover:bg-accent hover:text-white md:inline-flex"
          >
            <Link href="/panel">
              <LayoutDashboard aria-hidden="true" />
              Panel DEMO
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-lg"
                className="border-primary/20 bg-white/75 text-primary lg:hidden"
                aria-label="Abrir menú principal"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="mobile-menu border-primary/15 p-0"
            >
              <SheetHeader className="border-b border-primary/12 px-6 py-6 text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <SheetTitle className="font-serif text-2xl text-primary">
                      Navegación B &amp; B
                    </SheetTitle>
                    <SheetDescription className="mt-1 leading-6">
                      Sitio público y catálogo local de demostración.
                    </SheetDescription>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Cerrar menú principal"
                    >
                      <X aria-hidden="true" />
                    </Button>
                  </SheetClose>
                </div>
              </SheetHeader>

              <nav
                className="flex flex-col gap-2 px-4 py-6"
                aria-label="Navegación móvil"
              >
                {PUBLIC_NAVIGATION.map((item) => {
                  const active = isCurrentPath(pathname, item.href);

                  return (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "mobile-nav-link",
                          active && "mobile-nav-link-active",
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-primary/12 px-6 py-6">
                <Badge
                  variant="outline"
                  className="border-accent/30 bg-white/70 text-accent"
                >
                  {BRAND.phase}
                </Badge>
                <p className="mt-3 text-sm leading-6 text-primary/65">
                  Catálogo y paneles ficticios habilitados. Ninguna función guarda
                  información ni representa un acceso real.
                </p>
                <Button
                  asChild
                  className="mt-4 w-full bg-accent text-white hover:bg-accent/90"
                >
                  <Link href="/panel">
                    <LayoutDashboard aria-hidden="true" />
                    Abrir panel DEMO
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
