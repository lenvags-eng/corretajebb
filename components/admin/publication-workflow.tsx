"use client";

import { Archive, ArrowRight, RotateCcw, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getAllowedPublicationTransitions,
  PUBLICATION_STATUS_LABELS,
} from "@/domain/demo/admin-model";
import type {
  DemoPublicationStatus,
  DemoRoleId,
} from "@/domain/demo/admin-types";
import { cn } from "@/lib/utils";

type PublicationWorkflowProps = {
  roleId: DemoRoleId;
};

const PHASES: Array<{
  label: string;
  statuses: DemoPublicationStatus[];
}> = [
  {
    label: "Preparación",
    statuses: ["draft", "pending-review", "approved"],
  },
  {
    label: "Difusión",
    statuses: ["scheduled", "active", "paused", "expired"],
  },
  {
    label: "Resultado y archivo",
    statuses: ["sold", "rented", "withdrawn", "archived"],
  },
];

export function statusTone(status: DemoPublicationStatus) {
  if (status === "active") return "status-active";
  if (status === "pending-review" || status === "approved") {
    return "status-review";
  }
  if (status === "sold" || status === "rented") return "status-success";
  if (status === "expired" || status === "withdrawn") return "status-muted";
  if (status === "paused") return "status-paused";
  return "status-draft";
}

export function PublicationWorkflow({ roleId }: PublicationWorkflowProps) {
  const [status, setStatus] = useState<DemoPublicationStatus>("draft");
  const [history, setHistory] = useState<DemoPublicationStatus[]>(["draft"]);
  const transitions = getAllowedPublicationTransitions(status, roleId);
  const simulatedProgress = status === "active" || status === "paused" ? 30 : 0;

  function transitionTo(nextStatus: DemoPublicationStatus) {
    setStatus(nextStatus);
    setHistory((current) => [...current, nextStatus]);
  }

  function resetDemo() {
    setStatus("draft");
    setHistory(["draft"]);
  }

  return (
    <section className="admin-surface workflow-simulator" aria-labelledby="workflow-title">
      <div className="flex flex-col gap-5 border-b border-primary/10 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div>
          <p className="admin-kicker">Simulador en memoria</p>
          <h2 id="workflow-title" className="mt-2 text-2xl font-semibold text-primary">
            Ciclo de publicación DEMO P-900
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-primary/60">
            Prueba responsabilidades y estados. No modifica el catálogo público y
            vuelve a Borrador al recargar.
          </p>
        </div>
        <Badge className={cn("status-badge", statusTone(status))}>
          {PUBLICATION_STATUS_LABELS[status]}
        </Badge>
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1fr_0.82fr]">
        <div>
          <div className="grid gap-3 md:grid-cols-3">
            {PHASES.map((phase) => {
              const containsCurrent = phase.statuses.includes(status);
              return (
                <div
                  key={phase.label}
                  className={cn(
                    "workflow-phase",
                    containsCurrent && "workflow-phase-active",
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/45">
                    {phase.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-primary/65">
                    {phase.statuses
                      .map((item) => PUBLICATION_STATUS_LABELS[item])
                      .join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-primary/10 bg-secondary/35 p-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="font-semibold text-primary">Vigencia simulada</span>
              <span className="text-primary/55">18 de 60 días</span>
            </div>
            <Progress
              value={simulatedProgress}
              aria-label={`${simulatedProgress}% de vigencia demostrativa utilizada`}
              className="mt-3"
            />
            <div className="mt-4 grid gap-2 text-xs text-primary/55 sm:grid-cols-3">
              <span>Inicio: al activar</span>
              <span>Término: +60 días</span>
              <span>Renovación: manual DEMO</span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary/45">
              Historial de esta sesión
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-2">
              {history.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-center gap-2 text-xs text-primary/62">
                  {index > 0 ? <ArrowRight className="size-3" aria-hidden="true" /> : null}
                  <span className="rounded-full border border-primary/12 bg-white px-2.5 py-1">
                    {PUBLICATION_STATUS_LABELS[item]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <aside className="workflow-actions">
          <p className="font-semibold text-primary">Acciones permitidas para esta vista</p>
          {transitions.length > 0 ? (
            <div className="mt-4 grid gap-2">
              {transitions.map((nextStatus) => (
                <Button
                  key={nextStatus}
                  type="button"
                  variant="outline"
                  onClick={() => transitionTo(nextStatus)}
                  className="h-auto justify-between border-primary/14 bg-white px-4 py-3 text-left text-primary"
                >
                  Cambiar a {PUBLICATION_STATUS_LABELS[nextStatus]}
                  <ArrowRight aria-hidden="true" />
                </Button>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-accent/16 bg-accent/[0.045] p-4">
              <ShieldAlert className="size-5 text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-primary">
                Sin transición autorizada en este escenario
              </p>
              <p className="mt-2 text-xs leading-5 text-primary/58">
                El corredor no aprueba su propio contenido y los administradores
                de plataforma o sistema no operan la cartera comercial.
              </p>
            </div>
          )}
          <Button
            type="button"
            variant="ghost"
            onClick={resetDemo}
            className="mt-4 w-full text-primary/65"
          >
            <RotateCcw aria-hidden="true" />
            Reiniciar simulador
          </Button>
          <div className="mt-4 flex items-start gap-2 border-t border-primary/10 pt-4 text-xs leading-5 text-primary/55">
            <Archive className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            Vendida, arrendada, retirada o archivada no significa eliminada. P1.4
            no ofrece borrado.
          </div>
        </aside>
      </div>
    </section>
  );
}
