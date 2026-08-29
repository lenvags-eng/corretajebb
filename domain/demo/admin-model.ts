import type {
  DemoPublicationStatus,
  DemoRoleId,
  DemoTenant,
  DemoTenantMetrics,
} from "@/domain/demo/admin-types";

export const PUBLICATION_STATUS_LABELS: Record<
  DemoPublicationStatus,
  string
> = {
  draft: "Borrador",
  "pending-review": "Pendiente de revisión",
  approved: "Aprobada",
  scheduled: "Programada",
  active: "Activa",
  paused: "Pausada",
  expired: "Vencida",
  sold: "Vendida",
  rented: "Arrendada",
  withdrawn: "Retirada",
  archived: "Archivada",
};

const TRANSITIONS: Record<
  DemoPublicationStatus,
  readonly DemoPublicationStatus[]
> = {
  draft: ["pending-review"],
  "pending-review": ["draft", "approved"],
  approved: ["scheduled"],
  scheduled: ["active"],
  active: ["paused", "expired", "sold", "rented", "withdrawn"],
  paused: ["active", "withdrawn"],
  expired: ["draft", "archived"],
  sold: ["archived"],
  rented: ["archived"],
  withdrawn: ["archived"],
  archived: [],
};

export function getTenantMetrics(tenant: DemoTenant): DemoTenantMetrics {
  return {
    clients: tenant.clients.length,
    assets: tenant.assets.length,
    activePublications: tenant.publications.filter(
      (publication) => publication.status === "active",
    ).length,
    openLeads: tenant.leads.length,
  };
}

export function getPublicationStatusCounts(tenant: DemoTenant) {
  return Object.entries(PUBLICATION_STATUS_LABELS)
    .map(([status, label]) => ({
      status: status as DemoPublicationStatus,
      label,
      count: tenant.publications.filter(
        (publication) => publication.status === status,
      ).length,
    }))
    .filter((item) => item.count > 0);
}

export function getAllowedPublicationTransitions(
  status: DemoPublicationStatus,
  role: DemoRoleId,
): DemoPublicationStatus[] {
  if (role === "platform-admin" || role === "system-admin") return [];

  return TRANSITIONS[status].filter((nextStatus) => {
    if (nextStatus === "approved" || nextStatus === "scheduled") {
      return role === "agency-admin";
    }

    if (nextStatus === "archived") return role === "agency-admin";

    return true;
  });
}

export function getPublicationProgress(durationDays: number, elapsedDays: number) {
  if (durationDays <= 0) return 0;
  return Math.min(100, Math.round((elapsedDays / durationDays) * 100));
}

export function getPortfolioCompleteness(tenant: DemoTenant) {
  if (tenant.assets.length === 0) return 0;
  const total = tenant.assets.reduce(
    (sum, asset) => sum + asset.completeness,
    0,
  );
  return Math.round(total / tenant.assets.length);
}
