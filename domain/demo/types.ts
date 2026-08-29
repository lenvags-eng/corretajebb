export type DemoOperation = "Venta" | "Arriendo" | "Activo especial";

export type DemoPropertyType =
  | "Casa"
  | "Departamento"
  | "Parcela"
  | "Predio productivo";

export type DemoListingImage = {
  src: string;
  alt: string;
};

export type DemoListingFeature = {
  label: string;
  value: string;
};

export type DemoPublicListing = {
  id: string;
  slug: string;
  title: string;
  operation: DemoOperation;
  propertyType: DemoPropertyType;
  approximateLocation: string;
  commune: string;
  formattedPrice: string;
  priceCaption: string;
  summary: string;
  description: string;
  features: DemoListingFeature[];
  images: DemoListingImage[];
  publicStatus: "Disponible — DEMO";
  reviewLabel: string;
  reviewScope: string;
  featured: boolean;
};

export type DemoAdminAsset = {
  internalAssetId: string;
  internalAgencyKey: string;
  internalOwnerAlias: string;
  privateZoneReference: string;
  privateNotes: string;
  publicationWindow: {
    startsOn: string;
    expiresOn: string;
  };
  lifecycleStatus: "active-demo";
  publicContent: DemoPublicListing;
};
