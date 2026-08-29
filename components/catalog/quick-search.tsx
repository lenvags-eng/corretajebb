"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPERATIONS = ["Todas", "Venta", "Arriendo", "Activo especial"] as const;
const TYPES = [
  "Todos",
  "Casa",
  "Departamento",
  "Parcela",
  "Predio productivo",
] as const;

type OperationFilter = (typeof OPERATIONS)[number];
type PropertyTypeFilter = (typeof TYPES)[number];

export function QuickSearch() {
  const [operation, setOperation] = useState<OperationFilter>("Todas");
  const [propertyType, setPropertyType] = useState<PropertyTypeFilter>("Todos");

  const href = useMemo(() => {
    const params = new URLSearchParams();
    if (operation !== "Todas") params.set("operacion", operation);
    if (propertyType !== "Todos") params.set("tipo", propertyType);
    const query = params.toString();
    return `/propiedades${query ? `?${query}` : ""}#catalogo`;
  }, [operation, propertyType]);

  return (
    <div className="quick-search" aria-label="Búsqueda rápida de propiedades DEMO">
      <div>
        <p className="filter-label filter-label-light">Quiero explorar</p>
        <Select
          value={operation}
          onValueChange={(value) => setOperation(value as OperationFilter)}
        >
          <SelectTrigger className="h-12 w-full border-white/18 bg-white text-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OPERATIONS.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="filter-label filter-label-light">Tipo de activo</p>
        <Select
          value={propertyType}
          onValueChange={(value) => setPropertyType(value as PropertyTypeFilter)}
        >
          <SelectTrigger className="h-12 w-full border-white/18 bg-white text-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        asChild
        size="lg"
        className="h-12 self-end bg-accent text-white hover:bg-[#b20a3c]"
      >
        <Link href={href}>
          <Search aria-hidden="true" />
          Buscar en el catálogo
        </Link>
      </Button>
    </div>
  );
}
