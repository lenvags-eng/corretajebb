export type DemoRoleId =
  | "broker"
  | "agency-admin"
  | "platform-admin"
  | "system-admin";

export type DemoAdminSection =
  | "dashboard"
  | "clients"
  | "assets"
  | "publications"
  | "leads"
  | "audit"
  | "tenants"
  | "system";

export type DemoPublicationStatus =
  | "draft"
  | "pending-review"
  | "approved"
  | "scheduled"
  | "active"
  | "paused"
  | "expired"
  | "sold"
  | "rented"
  | "withdrawn"
  | "archived";

export type DemoRole = {
  id: DemoRoleId;
  label: string;
  shortLabel: string;
  description: string;
  boundary: string;
  allowedSections: DemoAdminSection[];
};

export type DemoClient = {
  id: string;
  alias: string;
  requirement: string;
  operation: string;
  stage: "Nuevo" | "Calificado" | "En búsqueda" | "En negociación";
  assignedTeam: string;
  nextAction: string;
};

export type DemoAdminAssetRecord = {
  id: string;
  label: string;
  propertyType: string;
  operation: string;
  commune: string;
  stage: "Captación" | "En revisión" | "Publicable" | "En gestión";
  completeness: number;
  assignedTeam: string;
};

export type DemoPublication = {
  id: string;
  title: string;
  assetId: string;
  status: DemoPublicationStatus;
  startsOn: string;
  endsOn: string;
  durationDays: number;
  elapsedDays: number;
  channel: "Sitio B & B DEMO" | "Borrador interno DEMO";
};

export type DemoLead = {
  id: string;
  alias: string;
  interest: string;
  stage: "Nuevo" | "Contactado" | "Visita DEMO" | "Seguimiento";
  source: "Sitio DEMO" | "Referencia DEMO" | "Oficina DEMO";
  ageDays: number;
  nextAction: string;
};

export type DemoAuditEvent = {
  id: string;
  occurredAt: string;
  actorRole: string;
  action: string;
  scope: string;
  result: "Registrado" | "Bloqueado" | "Revisado";
};

export type DemoTenant = {
  id: string;
  name: string;
  area: string;
  status: "Piloto DEMO" | "Escenario DEMO";
  members: number;
  clients: DemoClient[];
  assets: DemoAdminAssetRecord[];
  publications: DemoPublication[];
  leads: DemoLead[];
  auditEvents: DemoAuditEvent[];
};

export type DemoSystemCheck = {
  id: string;
  component: string;
  futurePurpose: string;
  state: "Diseñado" | "No implementado" | "Bloqueado";
  note: string;
};

export type DemoTenantMetrics = {
  clients: number;
  assets: number;
  activePublications: number;
  openLeads: number;
};
