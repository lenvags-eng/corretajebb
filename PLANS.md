# PLANS.md — plan maestro por puertas

## Reglas del plan

- No ejecutar dos hitos simultáneamente.
- Un hito aprobado no autoriza el siguiente.
- Todo cambio de alcance requiere actualizar Descubrimiento, ADR y estado.
- Las estimaciones son rangos de planificación, no compromisos de calendario.

## Fase 0 — Descubrimiento

| Hito | Entregable | Estado |
|---|---|---|
| P0.1 | Recuperar Prompt Maestro y documentos operativos | COMPLETADO |
| P0.2 | Descubrimiento de producto y modelo comercial | COMPLETADO |
| P0.3 | Arquitectura, datos, privacidad y seguridad | COMPLETADO |
| P0.4 | Backlog, costos, TCO y criterios del prototipo | COMPLETADO |
| HP-0 | Aprobación de las cinco decisiones | COMPLETADO — 28-08-2026 |

Puerta recibida: `APROBACIÓN FASE 0 — DECISIONES RECOMENDADAS`.

## Fase 1 — Prototipo local navegable

| Hito | Resultado verificable | Dependencia | Estado |
|---|---|---|---|
| P1.1 | Repositorio, Next.js/TypeScript, pruebas y sistema visual B & B | HP-0 | ACEPTADO — 28-08-2026 |
| P1.2 | Inicio, servicios, empresa, misión, visión y navegación pública | P1.1 | ACEPTADO — 28-08-2026 |
| P1.3 | Búsqueda, filtros, resultados y ficha con datos DEMO | P1.2 | ACEPTADO — 29-08-2026 |
| P1.4 | Panel corredor y ciclo de publicaciones simulado | P1.3 | COMPLETADO TÉCNICAMENTE — PENDIENTE ACEPTACIÓN |
| P1.5 | Contacto simulado, responsive, accesibilidad y rendimiento | P1.4 | BLOQUEADO |
| P1.6 | Pruebas, revisión adversarial, guía local y paquete demostrable | P1.5 | BLOQUEADO |
| HP-1 | `APROBACIÓN FASE 1` | P1.6 | BLOQUEADO |

Puertas recibidas: `APROBACIÓN P1.1 — INICIAR P1.2`,
`APROBACIÓN P1.2 — INICIAR P1.3` y
`APROBACIÓN P1.3 — INICIAR P1.4`.

Puerta posterior a P1.4: `APROBACIÓN P1.4 — INICIAR P1.5`.

### Objetivo comercial de P1

Permitir una demostración de cinco a diez minutos ante propietarios, corredores
colaboradores o posibles financiadores, mostrando:

1. presencia formal de la marca;
2. catálogo claro y verificable;
3. separación entre información pública y privada;
4. control del ciclo de una publicación;
5. potencial multiempresa sin afirmar que ya está operativo.

## Fase 2 — MVP seguro

Permanece bloqueada hasta HP-1. Su alcance preliminar incluye autenticación, API,
PostgreSQL, RLS, almacenamiento privado, CRM básico, catálogo público saneado,
leads, auditoría, respaldo, restauración, monitoreo y pruebas de aislamiento.

Puerta posterior: `APROBACIÓN PILOTO B & B`.

## Fases futuras no autorizadas

- cuentas reales de otras corredoras;
- suscripciones o cobros;
- aplicación móvil nativa;
- escritorio nativo;
- automatización de ROS/ROE o decisiones UAF;
- firma electrónica, pagos o recepción de dineros;
- publicación directa por propietarios o público general.
