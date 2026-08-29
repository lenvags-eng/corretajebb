import type { DemoAdminAsset } from "@/domain/demo/types";

/**
 * Repositorio privado totalmente sintético del prototipo.
 *
 * Este módulo sólo puede importarse desde código de servidor. Los campos internos
 * prueban la separación de datos; no representan personas, domicilios ni activos
 * reales y nunca deben serializarse hacia un componente cliente.
 */
export const DEMO_ADMIN_ASSETS: readonly DemoAdminAsset[] = [
  {
    internalAssetId: "INT-DEMO-URB-001",
    internalAgencyKey: "TENANT-DEMO-BB",
    internalOwnerAlias: "PROPIETARIO-SINTETICO-ALFA",
    privateZoneReference: "REFERENCIA-RESERVADA-DEMO-URBANA-A",
    privateNotes: "Antecedente interno ficticio excluido de la proyección pública.",
    publicationWindow: {
      startsOn: "2026-08-01",
      expiresOn: "2026-10-30",
    },
    lifecycleStatus: "active-demo",
    publicContent: {
      id: "BB-DEMO-001",
      slug: "casa-familiar-sector-oriente",
      title: "Casa familiar de líneas cálidas",
      operation: "Venta",
      propertyType: "Casa",
      approximateLocation: "Sector oriente aproximado",
      commune: "Los Ángeles",
      formattedPrice: "$184.000.000",
      priceCaption: "Valor ficticio para demostración",
      summary:
        "Vivienda luminosa con jardín, espacios familiares y una presentación sobria.",
      description:
        "Ejemplo de una casa urbana pensada para una familia que valora espacios conectados, luz natural y un entorno residencial. La ubicación, el valor y cada característica son totalmente ficticios.",
      features: [
        { label: "Superficie construida", value: "148 m²" },
        { label: "Terreno", value: "420 m²" },
        { label: "Dormitorios", value: "4" },
        { label: "Baños", value: "3" },
      ],
      images: [
        {
          src: "/properties/casa-urbana-01.jpg",
          alt: "Exterior ficticio de casa urbana B & B DEMO",
        },
        {
          src: "/properties/casa-urbana-02.jpg",
          alt: "Estar ficticio de casa urbana B & B DEMO",
        },
        {
          src: "/properties/casa-urbana-03.jpg",
          alt: "Cocina ficticia de casa urbana B & B DEMO",
        },
        {
          src: "/properties/casa-urbana-04.jpg",
          alt: "Dormitorio ficticio de casa urbana B & B DEMO",
        },
      ],
      publicStatus: "Disponible — DEMO",
      reviewLabel: "Presentación revisada para demostración",
      reviewScope:
        "Se revisó coherencia visual y comercial del ejemplo. No existe revisión jurídica, técnica ni registral porque el activo no es real.",
      featured: true,
    },
  },
  {
    internalAssetId: "INT-DEMO-DEP-002",
    internalAgencyKey: "TENANT-DEMO-BB",
    internalOwnerAlias: "PROPIETARIO-SINTETICO-BETA",
    privateZoneReference: "REFERENCIA-RESERVADA-DEMO-URBANA-B",
    privateNotes: "Condiciones de arriendo simuladas; no utilizar en una operación.",
    publicationWindow: {
      startsOn: "2026-08-15",
      expiresOn: "2026-09-29",
    },
    lifecycleStatus: "active-demo",
    publicContent: {
      id: "BB-DEMO-002",
      slug: "departamento-luminoso-centro-ampliado",
      title: "Departamento luminoso y funcional",
      operation: "Arriendo",
      propertyType: "Departamento",
      approximateLocation: "Centro ampliado aproximado",
      commune: "Los Ángeles",
      formattedPrice: "$590.000 / mes",
      priceCaption: "Valor ficticio para demostración",
      summary:
        "Alternativa urbana con buena luz, distribución simple y balcón protegido.",
      description:
        "Ejemplo de una ficha de arriendo urbano con información breve y comparable. La aplicación futura deberá someter antecedentes y condiciones a revisión antes de publicar; esta versión sólo demuestra navegación.",
      features: [
        { label: "Superficie total", value: "76 m²" },
        { label: "Dormitorios", value: "2" },
        { label: "Baños", value: "2" },
        { label: "Estacionamiento", value: "1" },
      ],
      images: [
        {
          src: "/properties/departamento-01.jpg",
          alt: "Fachada ficticia de departamento B & B DEMO",
        },
        {
          src: "/properties/departamento-02.jpg",
          alt: "Estar ficticio de departamento B & B DEMO",
        },
        {
          src: "/properties/departamento-03.jpg",
          alt: "Cocina ficticia de departamento B & B DEMO",
        },
        {
          src: "/properties/departamento-04.jpg",
          alt: "Dormitorio ficticio de departamento B & B DEMO",
        },
      ],
      publicStatus: "Disponible — DEMO",
      reviewLabel: "Presentación revisada para demostración",
      reviewScope:
        "Sólo se verificó que el contenido ficticio sea claro y no exponga datos personales, contratos ni una dirección exacta.",
      featured: true,
    },
  },
  {
    internalAssetId: "INT-DEMO-RUR-003",
    internalAgencyKey: "TENANT-DEMO-BB",
    internalOwnerAlias: "PROPIETARIO-SINTETICO-GAMMA",
    privateZoneReference: "REFERENCIA-RESERVADA-DEMO-RURAL-A",
    privateNotes: "Superficies y equipamiento inventados para probar filtros rurales.",
    publicationWindow: {
      startsOn: "2026-08-20",
      expiresOn: "2026-11-18",
    },
    lifecycleStatus: "active-demo",
    publicContent: {
      id: "BB-DEMO-003",
      slug: "parcela-con-casa-entorno-rural",
      title: "Parcela con casa y entorno abierto",
      operation: "Venta",
      propertyType: "Parcela",
      approximateLocation: "Sector rural aproximado",
      commune: "Santa Bárbara",
      formattedPrice: "$96.000.000",
      priceCaption: "Valor ficticio para demostración",
      summary:
        "Ejemplo rural de escala familiar, con vegetación, amplitud y vistas despejadas.",
      description:
        "Esta publicación ficticia demuestra cómo B & B puede presentar un activo rural sin revelar coordenadas ni referencias privadas. Superficies, imágenes, instalaciones y valor son sólo material de prototipo.",
      features: [
        { label: "Superficie de terreno", value: "5.000 m²" },
        { label: "Construcción referencial", value: "112 m²" },
        { label: "Dormitorios", value: "3" },
        { label: "Entorno", value: "Rural" },
      ],
      images: [
        {
          src: "/properties/parcela-01.jpg",
          alt: "Casa rural ficticia en parcela B & B DEMO",
        },
        {
          src: "/properties/parcela-02.jpg",
          alt: "Entorno ficticio de parcela B & B DEMO",
        },
      ],
      publicStatus: "Disponible — DEMO",
      reviewLabel: "Presentación rural preparada para demostración",
      reviewScope:
        "No se revisaron títulos, deslindes, agua, accesos ni permisos. Es un ejemplo visual sin existencia material.",
      featured: true,
    },
  },
  {
    internalAssetId: "INT-DEMO-ESP-004",
    internalAgencyKey: "TENANT-DEMO-BB",
    internalOwnerAlias: "PROPIETARIO-SINTETICO-DELTA",
    privateZoneReference: "REFERENCIA-RESERVADA-DEMO-RURAL-B",
    privateNotes: "Caso sintético de activo especial; evaluación técnica no incluida.",
    publicationWindow: {
      startsOn: "2026-08-22",
      expiresOn: "2026-12-20",
    },
    lifecycleStatus: "active-demo",
    publicContent: {
      id: "BB-DEMO-004",
      slug: "predio-productivo-activo-especial",
      title: "Predio productivo de escala mayor",
      operation: "Activo especial",
      propertyType: "Predio productivo",
      approximateLocation: "Área productiva aproximada",
      commune: "Mulchén",
      formattedPrice: "UF 38.500",
      priceCaption: "Valor ficticio para demostración",
      summary:
        "Presentación prudente de un activo de mayor superficie y evaluación escalonada.",
      description:
        "Ejemplo destinado a mostrar que un activo especial necesita otro nivel de antecedentes, reserva y coordinación. La superficie, el uso, el valor y las imágenes son ficticios y no constituyen una oferta.",
      features: [
        { label: "Superficie referencial", value: "86 ha" },
        { label: "Vocación DEMO", value: "Productiva" },
        { label: "Acceso", value: "Referencia reservada" },
        { label: "Antecedentes", value: "Escalonados" },
      ],
      images: [
        {
          src: "/properties/predio-01.jpg",
          alt: "Vista ficticia de predio productivo B & B DEMO",
        },
        {
          src: "/properties/predio-02.jpg",
          alt: "Paisaje ficticio de activo especial B & B DEMO",
        },
      ],
      publicStatus: "Disponible — DEMO",
      reviewLabel: "Presentación especial preparada para demostración",
      reviewScope:
        "No se verificaron capacidades productivas, permisos, dominio ni riesgos. El caso sólo ilustra un flujo comercial futuro.",
      featured: false,
    },
  },
] as const;
