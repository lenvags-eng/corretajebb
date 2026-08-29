"use client";

import type { ReactNode } from "react";
import {
  Activity,
  Archive,
  Building2,
  CalendarClock,
  CircleAlert,
  Database,
  FileCheck2,
  FolderKanban,
  House,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  PublicationWorkflow,
  statusTone,
} from "@/components/admin/publication-workflow";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DEMO_PLATFORM_AUDIT,
  DEMO_SYSTEM_CHECKS,
  DEMO_TENANTS,
} from "@/domain/demo/admin-data";
import {
  getPortfolioCompleteness,
  getPublicationProgress,
  getPublicationStatusCounts,
  getTenantMetrics,
  PUBLICATION_STATUS_LABELS,
} from "@/domain/demo/admin-model";
import type {
  DemoAdminSection,
  DemoAuditEvent,
  DemoRoleId,
  DemoTenant,
} from "@/domain/demo/admin-types";
import { cn } from "@/lib/utils";

type AdminPanelViewProps = {
  section: DemoAdminSection;
  roleId: DemoRoleId;
  tenant: DemoTenant;
};

type PanelHeadingProps = {
  kicker: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

function PanelHeading({ kicker, title, description, aside }: PanelHeadingProps) {
  return (
    <div className="admin-page-heading">
      <div>
        <p className="admin-kicker">{kicker}</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-[-0.025em] text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-primary/60">
          {description}
        </p>
      </div>
      {aside}
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  icon: Icon,
}: {
  label: string;
  value: number | string;
  note: string;
  icon: typeof Users;
}) {
  return (
    <Card className="admin-metric-card">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/45">
            {label}
          </p>
          <CardTitle className="mt-3 font-serif text-4xl text-primary">
            {value}
          </CardTitle>
        </div>
        <span className="admin-metric-icon">
          <Icon aria-hidden="true" />
        </span>
      </CardHeader>
      <CardContent>
        <p className="text-xs leading-5 text-primary/55">{note}</p>
      </CardContent>
    </Card>
  );
}

function AgencyDashboard({ tenant }: { tenant: DemoTenant }) {
  const metrics = getTenantMetrics(tenant);
  const statusData = getPublicationStatusCounts(tenant);
  const completeness = getPortfolioCompleteness(tenant);

  return (
    <>
      <PanelHeading
        kicker="Resumen operativo"
        title={`Dashboard · ${tenant.name}`}
        description="Indicadores coherentes con el repositorio ficticio seleccionado. No representan producción, ingresos ni actividad de personas reales."
        aside={
          <Badge variant="outline" className="border-accent/20 bg-white text-accent">
            Corte DEMO · 29 agosto 2026
          </Badge>
        }
      />

      <div className="admin-metric-grid">
        <MetricCard
          label="Clientes activos"
          value={metrics.clients}
          note="Alias sin información identificable"
          icon={Users}
        />
        <MetricCard
          label="Activos en cartera"
          value={metrics.assets}
          note={`${completeness}% de completitud promedio`}
          icon={House}
        />
        <MetricCard
          label="Publicaciones activas"
          value={metrics.activePublications}
          note={`${tenant.publications.length} publicaciones en total`}
          icon={FileCheck2}
        />
        <MetricCard
          label="Leads por atender"
          value={metrics.openLeads}
          note="Interacciones sólo demostrativas"
          icon={MessageSquareText}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="admin-surface p-5 sm:p-6" aria-labelledby="status-chart-title">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="admin-kicker">Distribución editorial</p>
              <h2 id="status-chart-title" className="mt-2 text-2xl font-semibold text-primary">
                Publicaciones por estado
              </h2>
            </div>
            <Badge variant="outline">{tenant.publications.length} registros DEMO</Badge>
          </div>
          <ChartContainer
            config={{ count: { label: "Publicaciones", color: "#A00634" } }}
            className="mt-6 h-[260px] w-full"
            initialDimension={{ width: 620, height: 260 }}
          >
            <BarChart data={statusData} accessibilityLayer margin={{ left: -18, right: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                  String(value).replace("Pendiente de revisión", "Pendiente")
                }
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </section>

        <section className="admin-surface p-5 sm:p-6" aria-labelledby="agenda-title">
          <p className="admin-kicker">Próximas acciones</p>
          <h2 id="agenda-title" className="mt-2 text-2xl font-semibold text-primary">
            Agenda comercial ficticia
          </h2>
          <div className="mt-5 grid gap-3">
            {tenant.leads.slice(0, 4).map((lead) => (
              <article key={lead.id} className="admin-agenda-item">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary text-accent">
                  <CalendarClock className="size-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary">
                    {lead.alias} · {lead.stage}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-primary/55">
                    {lead.nextAction}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function PlatformDashboard() {
  const totals = DEMO_TENANTS.reduce(
    (current, tenant) => {
      const metrics = getTenantMetrics(tenant);
      return {
        clients: current.clients + metrics.clients,
        assets: current.assets + metrics.assets,
        publications: current.publications + tenant.publications.length,
        leads: current.leads + metrics.openLeads,
      };
    },
    { clients: 0, assets: 0, publications: 0, leads: 0 },
  );

  return (
    <>
      <PanelHeading
        kicker="Operación agregada"
        title="Dashboard de plataforma · DEMO"
        description="La plataforma visualiza volúmenes necesarios para soporte, sin abrir por defecto la cartera comercial de cada corredora."
        aside={<Badge className="bg-primary">2 corredoras ficticias</Badge>}
      />
      <div className="admin-metric-grid">
        <MetricCard label="Corredoras" value={DEMO_TENANTS.length} note="Escenarios, no cuentas reales" icon={Building2} />
        <MetricCard label="Activos agregados" value={totals.assets} note="Sin detalle comercial global" icon={FolderKanban} />
        <MetricCard label="Publicaciones" value={totals.publications} note="Conteo operativo DEMO" icon={FileCheck2} />
        <MetricCard label="Leads abiertos" value={totals.leads} note="Sólo cantidad agregada" icon={MessageSquareText} />
      </div>
      <div className="admin-boundary-card mt-5">
        <LockKeyhole className="size-6 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary">Mínimo privilegio como propuesta</p>
          <p className="mt-2 text-sm leading-7 text-primary/60">
            Que la plataforma preste soporte no significa que pueda explorar clientes,
            documentos o propiedades. Ese límite requerirá controles reales en el MVP.
          </p>
        </div>
      </div>
    </>
  );
}

function SystemDashboard() {
  const pendingControls = DEMO_SYSTEM_CHECKS.length;

  return (
    <>
      <PanelHeading
        kicker="Vista técnica conceptual"
        title="Sistema y SGBD · sin conexión real"
        description="Esta pantalla explica responsabilidades futuras; no administra servidores, credenciales, respaldos ni bases de datos."
        aside={<Badge variant="outline" className="border-accent/25 text-accent">0 servicios conectados</Badge>}
      />
      <div className="admin-metric-grid">
        <MetricCard label="Bases reales" value="0" note="Repositorio fijo en código" icon={Database} />
        <MetricCard label="APIs activas" value="0" note="Sin solicitudes externas" icon={Activity} />
        <MetricCard label="Respaldos operativos" value="0" note="No existen datos que respaldar" icon={Archive} />
        <MetricCard label="Controles pendientes" value={pendingControls} note="Indicadores conceptuales" icon={CircleAlert} />
      </div>
      <div className="admin-boundary-card mt-5">
        <ShieldCheck className="size-6 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary">Administrar el sistema no equivale a leer el negocio</p>
          <p className="mt-2 text-sm leading-7 text-primary/60">
            La futura cuenta técnica deberá operar infraestructura y evidencias mínimas,
            con acceso excepcional, temporal, justificado y auditado cuando corresponda.
          </p>
        </div>
      </div>
    </>
  );
}

function ClientsView({ tenant }: { tenant: DemoTenant }) {
  return (
    <>
      <PanelHeading
        kicker="CRM básico · DEMO"
        title="Clientes y necesidades"
        description="Los registros usan alias y no contienen contactos, RUT, direcciones ni documentos."
        aside={<Badge variant="outline">{tenant.clients.length} clientes ficticios</Badge>}
      />
      <section className="admin-surface mt-5 p-4 sm:p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Necesidad</TableHead>
              <TableHead>Operación</TableHead>
              <TableHead>Etapa</TableHead>
              <TableHead>Equipo</TableHead>
              <TableHead>Próxima acción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenant.clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <p className="font-semibold text-primary">{client.alias}</p>
                  <p className="mt-1 text-xs text-primary/45">{client.id}</p>
                </TableCell>
                <TableCell>{client.requirement}</TableCell>
                <TableCell>{client.operation}</TableCell>
                <TableCell><Badge variant="outline">{client.stage}</Badge></TableCell>
                <TableCell>{client.assignedTeam}</TableCell>
                <TableCell className="max-w-64 whitespace-normal text-primary/58">
                  {client.nextAction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

function AssetsView({ tenant }: { tenant: DemoTenant }) {
  return (
    <>
      <PanelHeading
        kicker="Inventario privado ficticio"
        title="Activos y preparación comercial"
        description="La completitud indica cuánto material DEMO está preparado; no corresponde a una revisión legal o técnica."
        aside={<Badge variant="outline">{tenant.assets.length} activos DEMO</Badge>}
      />
      <div className="admin-asset-grid mt-5">
        {tenant.assets.map((asset) => (
          <article key={asset.id} className="admin-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="admin-record-icon"><House aria-hidden="true" /></span>
              <Badge variant="outline">{asset.stage}</Badge>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-primary/42">
              {asset.id}
            </p>
            <h2 className="mt-2 text-xl font-semibold text-primary">{asset.label}</h2>
            <p className="mt-2 text-sm text-primary/58">
              {asset.propertyType} · {asset.operation} · {asset.commune}
            </p>
            <div className="mt-5">
              <div className="flex justify-between gap-3 text-xs text-primary/55">
                <span>Completitud comercial DEMO</span>
                <strong>{asset.completeness}%</strong>
              </div>
              <Progress value={asset.completeness} className="mt-2" aria-label={`${asset.completeness}% de completitud para ${asset.label}`} />
            </div>
            <p className="mt-4 border-t border-primary/10 pt-4 text-xs text-primary/50">
              Asignado: {asset.assignedTeam}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}

function PublicationsView({ tenant, roleId }: { tenant: DemoTenant; roleId: DemoRoleId }) {
  return (
    <>
      <PanelHeading
        kicker="Control editorial"
        title="Publicaciones, vigencia y estados"
        description="El estado comercial, la duración y el archivo se modelan por separado. Las acciones del simulador sólo viven en esta pantalla."
        aside={<Badge variant="outline">{tenant.publications.length} publicaciones DEMO</Badge>}
      />
      <div className="mt-5">
        <PublicationWorkflow roleId={roleId} />
      </div>
      <section className="admin-surface mt-5 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-primary">Calendario editorial ficticio</h2>
          <p className="text-xs text-primary/50">Los registros de esta tabla no cambian con el simulador.</p>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publicación</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Inicio / término</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead>Avance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenant.publications.map((publication) => {
              const progress = getPublicationProgress(
                publication.durationDays,
                publication.elapsedDays,
              );
              return (
                <TableRow key={publication.id}>
                  <TableCell>
                    <p className="font-semibold text-primary">{publication.title}</p>
                    <p className="mt-1 text-xs text-primary/45">{publication.id}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("status-badge", statusTone(publication.status))}>
                      {PUBLICATION_STATUS_LABELS[publication.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p>{publication.startsOn}</p>
                    <p className="mt-1 text-xs text-primary/48">hasta {publication.endsOn}</p>
                  </TableCell>
                  <TableCell>{publication.durationDays} días</TableCell>
                  <TableCell className="min-w-36">
                    <div className="flex items-center gap-3">
                      <Progress value={progress} aria-label={`${progress}% utilizado`} />
                      <span className="w-8 text-xs text-primary/50">{progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}

function LeadsView({ tenant }: { tenant: DemoTenant }) {
  const stages = ["Nuevo", "Contactado", "Visita DEMO", "Seguimiento"] as const;
  return (
    <>
      <PanelHeading
        kicker="Seguimiento comercial"
        title="Leads y agenda DEMO"
        description="El tablero ilustra prioridades sin enviar correos, WhatsApp o notificaciones."
        aside={<Badge variant="outline">{tenant.leads.length} interesados ficticios</Badge>}
      />
      <div className="admin-kanban mt-5">
        {stages.map((stage) => {
          const leads = tenant.leads.filter((lead) => lead.stage === stage);
          return (
            <section key={stage} className="admin-kanban-column" aria-labelledby={`lead-${stage}`}>
              <div className="flex items-center justify-between gap-3">
                <h2 id={`lead-${stage}`} className="font-semibold text-primary">{stage}</h2>
                <Badge variant="outline">{leads.length}</Badge>
              </div>
              <div className="mt-4 grid gap-3">
                {leads.length > 0 ? leads.map((lead) => (
                  <article key={lead.id} className="admin-lead-card">
                    <p className="text-sm font-semibold text-primary">{lead.alias}</p>
                    <p className="mt-2 text-xs leading-5 text-primary/58">{lead.interest}</p>
                    <div className="mt-4 border-t border-primary/10 pt-3 text-xs text-primary/50">
                      <p>{lead.source} · {lead.ageDays} días</p>
                      <p className="mt-2 font-semibold text-accent">{lead.nextAction}</p>
                    </div>
                  </article>
                )) : (
                  <div className="rounded-lg border border-dashed border-primary/15 p-4 text-center text-xs text-primary/45">
                    Sin registros en esta etapa
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}

function AuditTable({ events }: { events: readonly DemoAuditEvent[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Momento</TableHead>
          <TableHead>Escenario de rol</TableHead>
          <TableHead>Acción</TableHead>
          <TableHead>Alcance</TableHead>
          <TableHead>Resultado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.occurredAt}</TableCell>
            <TableCell>{event.actorRole}</TableCell>
            <TableCell className="font-semibold text-primary">{event.action}</TableCell>
            <TableCell>{event.scope}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  event.result === "Bloqueado" && "border-accent/25 text-accent",
                )}
              >
                {event.result}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function AuditView({ tenant, roleId }: { tenant: DemoTenant; roleId: DemoRoleId }) {
  const platformView = roleId === "platform-admin" || roleId === "system-admin";
  const events = platformView ? DEMO_PLATFORM_AUDIT : tenant.auditEvents;
  return (
    <>
      <PanelHeading
        kicker="Trazabilidad ilustrativa"
        title="Actividad y auditoría DEMO"
        description="Los eventos son ejemplos fijos. No constituyen logs protegidos, evidencia forense ni auditoría independiente."
        aside={<Badge variant="outline">{events.length} eventos sintéticos</Badge>}
      />
      <section className="admin-surface mt-5 p-4 sm:p-6">
        <AuditTable events={events} />
      </section>
    </>
  );
}

function TenantsView() {
  return (
    <>
      <PanelHeading
        kicker="Multiempresa conceptual"
        title="Corredoras y límites operativos"
        description="La comparación utiliza sólo totales DEMO. No existe aislamiento real, administración de cuentas ni acceso de terceros."
        aside={<Badge className="bg-primary">Vista agregada</Badge>}
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {DEMO_TENANTS.map((tenant) => {
          const metrics = getTenantMetrics(tenant);
          return (
            <article key={tenant.id} className="admin-surface overflow-hidden">
              <div className="border-b border-primary/10 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <span className="admin-record-icon"><Building2 aria-hidden="true" /></span>
                  <Badge variant="outline">{tenant.status}</Badge>
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-primary">{tenant.name}</h2>
                <p className="mt-2 text-sm text-primary/58">{tenant.area}</p>
              </div>
              <dl className="grid grid-cols-2 gap-px bg-primary/10 sm:grid-cols-4">
                {[
                  ["Miembros", tenant.members],
                  ["Clientes", metrics.clients],
                  ["Activos", metrics.assets],
                  ["Publicaciones", tenant.publications.length],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/90 p-4">
                    <dt className="text-xs text-primary/48">{label}</dt>
                    <dd className="mt-1 font-serif text-2xl font-semibold text-primary">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
      <div className="admin-boundary-card mt-5">
        <LockKeyhole className="size-6 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary">Lo que esta pantalla no demuestra</p>
          <p className="mt-2 text-sm leading-7 text-primary/60">
            Cambiar una empresa en un selector no es seguridad. El MVP deberá aplicar
            autorización de servidor, `tenant_id`, RLS, pruebas IDOR y auditoría.
          </p>
        </div>
      </div>
    </>
  );
}

function SystemView() {
  return (
    <>
      <PanelHeading
        kicker="Arquitectura futura"
        title="Administración técnica y SGBD"
        description="Inventario conceptual de controles necesarios para operar. Todos los estados describen planificación, no servicios existentes."
        aside={<Badge variant="outline" className="border-accent/25 text-accent">SIN SGBD REAL</Badge>}
      />
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {DEMO_SYSTEM_CHECKS.map((check) => (
          <article key={check.id} className="admin-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="admin-record-icon"><Database aria-hidden="true" /></span>
              <Badge
                variant="outline"
                className={cn(
                  check.state === "Bloqueado" && "border-accent/25 text-accent",
                )}
              >
                {check.state}
              </Badge>
            </div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.1em] text-primary/42">{check.id}</p>
            <h2 className="mt-2 text-xl font-semibold text-primary">{check.component}</h2>
            <p className="mt-3 text-sm leading-6 text-primary/62">{check.futurePurpose}</p>
            <p className="mt-4 border-t border-primary/10 pt-4 text-xs leading-5 text-primary/50">{check.note}</p>
          </article>
        ))}
      </div>
      <div className="admin-boundary-card mt-5">
        <UserRoundCheck className="size-6 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-semibold text-primary">Separación de funciones recomendada</p>
          <p className="mt-2 text-sm leading-7 text-primary/60">
            Plataforma, soporte, SGBD, privacidad y corretaje no deben compartir una
            cuenta omnipotente. Los accesos futuros requieren propósito y trazabilidad.
          </p>
        </div>
      </div>
    </>
  );
}

export function AdminPanelView({ section, roleId, tenant }: AdminPanelViewProps) {
  if (section === "dashboard") {
    if (roleId === "platform-admin") return <PlatformDashboard />;
    if (roleId === "system-admin") return <SystemDashboard />;
    return <AgencyDashboard tenant={tenant} />;
  }
  if (section === "clients") return <ClientsView tenant={tenant} />;
  if (section === "assets") return <AssetsView tenant={tenant} />;
  if (section === "publications") {
    return <PublicationsView tenant={tenant} roleId={roleId} />;
  }
  if (section === "leads") return <LeadsView tenant={tenant} />;
  if (section === "audit") return <AuditView tenant={tenant} roleId={roleId} />;
  if (section === "tenants") return <TenantsView />;
  return <SystemView />;
}
