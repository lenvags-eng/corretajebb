# ADR-0001 — Prototipo local y arquitectura evolutiva

- **Estado:** ACEPTADO
- **Fecha de propuesta:** 27 de agosto de 2026
- **Fecha de aceptación:** 28 de agosto de 2026
- **Decisor:** propietario de B & B Corretaje

## Contexto

B & B necesita demostrar una propuesta profesional y reunir recursos antes de pagar
hosting, base de datos, seguridad externa o desarrollo especializado. El computador
disponible utiliza Windows 11, procesador Intel i5-1235U y 8 GB de RAM. El producto
final será más que un sitio: deberá evolucionar hacia catálogo, CRM, API y plataforma
multiempresa.

## Decisión

Construir la Fase 1 como una aplicación única Next.js + TypeScript, ejecutable en
`localhost`, con datos sintéticos alojados en archivos locales y dos grupos de rutas:

- experiencia pública;
- panel administrativo simulado.

No usar base de datos, Docker, autenticación, almacenamiento remoto, formularios
reales ni servicios pagados.

La aplicación se diseñará mediante interfaces de repositorio y DTO públicos para que
los datos ficticios puedan reemplazarse después por una API sin reescribir la interfaz
completa.

## Consecuencias positivas

- costo incremental de infraestructura $0;
- demostración sin depender de internet;
- uso razonable en equipo con 8 GB de RAM;
- menor superficie de riesgo;
- permite validar marca, navegación y propuesta comercial;
- conserva una ruta de evolución hacia PostgreSQL y PWA.

## Costos y limitaciones

- no administra clientes reales;
- no prueba todavía RLS, MFA, respaldo ni aislamiento multiempresa real;
- dashboard y estados son simulados;
- no recibe contactos;
- no puede presentarse como producto productivo ni como SaaS operativo.

## Alternativas consideradas

1. **React/Vite estático:** más liviano, pero aumenta la probabilidad de rehacer rutas,
   renderizado y capa servidor al evolucionar.
2. **Supabase/PostgreSQL desde Fase 1:** acerca el MVP, pero agrega infraestructura,
   secretos, privacidad y pruebas antes de validar interés; se posterga.
3. **Aplicaciones web, escritorio y móvil simultáneas:** descartada por costo,
   fragmentación y falta de evidencia de uso.

## Ratificación

El propietario ratificó este ADR mediante
`APROBACIÓN FASE 0 — DECISIONES RECOMENDADAS`. La aceptación autoriza únicamente
P1.1 y no habilita datos reales ni servicios productivos.
