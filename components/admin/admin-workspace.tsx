"use client";

import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Building2,
  Database,
  Eye,
  FileCheck2,
  FolderKanban,
  Gauge,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { AdminPanelView } from "@/components/admin/admin-views";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { DEMO_ROLES, DEMO_TENANTS } from "@/domain/demo/admin-data";
import type {
  DemoAdminSection,
  DemoRoleId,
} from "@/domain/demo/admin-types";
import { BRAND } from "@/lib/brand";

type NavigationItem = {
  id: DemoAdminSection;
  label: string;
  icon: LucideIcon;
};

const NAVIGATION: readonly NavigationItem[] = [
  { id: "dashboard", label: "Resumen", icon: Gauge },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "assets", label: "Activos", icon: FolderKanban },
  { id: "publications", label: "Publicaciones", icon: FileCheck2 },
  { id: "leads", label: "Leads y agenda", icon: MessageSquareText },
  { id: "audit", label: "Actividad", icon: Activity },
  { id: "tenants", label: "Corredoras", icon: Building2 },
  { id: "system", label: "Sistema y SGBD", icon: Database },
] as const;

type PanelSidebarProps = {
  activeSection: DemoAdminSection;
  allowedSections: DemoAdminSection[];
  onSectionChange: (section: DemoAdminSection) => void;
  publicationCount: number;
  leadCount: number;
};

function PanelSidebar({
  activeSection,
  allowedSections,
  onSectionChange,
  publicationCount,
  leadCount,
}: PanelSidebarProps) {
  const { setOpenMobile } = useSidebar();
  const items = NAVIGATION.filter((item) => allowedSections.includes(item.id));

  function selectSection(section: DemoAdminSection) {
    onSectionChange(section);
    setOpenMobile(false);
  }

  return (
    <Sidebar className="admin-sidebar" collapsible="offcanvas">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link href="/" className="flex items-center gap-3 rounded-md" aria-label="Volver al sitio público B & B">
          <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/15 bg-white">
            <Image
              src="/brand/bb-logo.png"
              alt=""
              width={44}
              height={44}
              unoptimized
            />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-lg font-semibold leading-none text-primary">B &amp; B</span>
            <span className="mt-1 block truncate text-[0.62rem] font-bold uppercase tracking-[0.16em] text-primary/48">Operaciones DEMO</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="pt-4">
          <SidebarGroupLabel>Espacios disponibles</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const count =
                  item.id === "publications"
                    ? publicationCount
                    : item.id === "leads"
                      ? leadCount
                      : null;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      type="button"
                      isActive={activeSection === item.id}
                      onClick={() => selectSection(item.id)}
                      tooltip={item.label}
                      className="h-10"
                    >
                      <Icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                    {count !== null ? <SidebarMenuBadge>{count}</SidebarMenuBadge> : null}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Badge variant="outline" className="border-accent/20 text-accent">
          <ShieldCheck aria-hidden="true" />
          {BRAND.phase}
        </Badge>
        <Button asChild variant="ghost" className="mt-2 justify-start text-primary/65">
          <Link href="/">
            <Eye aria-hidden="true" />
            Volver al sitio público
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

function MobileMenuButton() {
  const { setOpenMobile } = useSidebar();
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={() => setOpenMobile(true)}
      className="border-primary/15 bg-white text-primary md:hidden"
      aria-label="Abrir menú del panel"
    >
      <Menu aria-hidden="true" />
    </Button>
  );
}

export function AdminWorkspace() {
  const [roleId, setRoleId] = useState<DemoRoleId>("agency-admin");
  const [tenantId, setTenantId] = useState(DEMO_TENANTS[0].id);
  const [activeSection, setActiveSection] =
    useState<DemoAdminSection>("dashboard");

  const role = DEMO_ROLES.find((candidate) => candidate.id === roleId) ?? DEMO_ROLES[0];
  const tenant =
    DEMO_TENANTS.find((candidate) => candidate.id === tenantId) ?? DEMO_TENANTS[0];
  const usesTenant = roleId === "broker" || roleId === "agency-admin";

  function changeRole(nextRoleId: string) {
    const nextRole = DEMO_ROLES.find((candidate) => candidate.id === nextRoleId);
    if (!nextRole) return;
    setRoleId(nextRole.id);
    setActiveSection("dashboard");
  }

  return (
    <SidebarProvider
      open
      onOpenChange={() => undefined}
      persistState={false}
      enableKeyboardShortcut={false}
    >
      <PanelSidebar
        activeSection={activeSection}
        allowedSections={role.allowedSections}
        onSectionChange={setActiveSection}
        publicationCount={usesTenant ? tenant.publications.length : 0}
        leadCount={usesTenant ? tenant.leads.length : 0}
      />
      <SidebarInset className="admin-panel-inset">
        <header className="admin-topbar">
          <div className="flex items-center gap-3">
            <MobileMenuButton />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">Vista de trabajo</p>
              <p className="mt-1 text-sm font-semibold text-primary">{role.shortLabel}</p>
            </div>
          </div>

          <div className="admin-context-selectors">
            {usesTenant ? (
              <div>
                <span className="admin-select-label">Empresa DEMO</span>
                <Select value={tenant.id} onValueChange={setTenantId}>
                  <SelectTrigger className="h-10 w-full bg-white sm:w-64" aria-label="Cambiar empresa de demostración">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DEMO_TENANTS.map((item) => (
                      <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : null}
            <div>
              <span className="admin-select-label">Escenario de rol</span>
              <Select value={role.id} onValueChange={changeRole}>
                <SelectTrigger className="h-10 w-full bg-white sm:w-72" aria-label="Cambiar escenario de rol">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DEMO_ROLES.map((item) => (
                    <SelectItem key={item.id} value={item.id}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        <div className="admin-role-notice" role="note">
          <ShieldCheck className="size-5 shrink-0 text-accent" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-primary">{role.description}</p>
            <p className="mt-1 text-xs leading-5 text-primary/55">
              {role.boundary} Selector exclusivamente visual: sin login, permisos ni persistencia.
            </p>
          </div>
        </div>

        <div className="admin-content-shell">
          <AdminPanelView section={activeSection} roleId={role.id} tenant={tenant} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
