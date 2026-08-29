# B & B Corretaje — prototipo local

Prototipo comercial local de B & B Corretaje. El hito vigente es **P1.4**:
sitio y catálogo público ficticio, más un panel de gestión por escenarios de rol
con dashboard y ciclo de publicaciones simulado.

> **MODO DEMOSTRACIÓN — DATOS FICTICIOS — SIN ENVÍO**

Este proyecto no es un sistema productivo. No contiene base de datos,
autenticación, formularios activos, servicios externos ni datos de clientes o
propiedades reales.

## Pantallas disponibles

- `/`: Inicio.
- `/propiedades`: catálogo DEMO con búsqueda y filtros en memoria.
- `/propiedades/[slug]`: cuatro fichas DEMO con galerías de dos a cuatro
  fotografías sintéticas locales.
- `/servicios`: venta, compra, arriendo, propiedades rurales y activos
  especiales.
- `/empresa`: quiénes somos, misión, visión y valores.
- `/metodo`: captación humana, separación de información y publicación
  controlada.
- `/panel`: espacio de trabajo DEMO con menú, dashboard, clientes, activos,
  publicaciones, leads, actividad, corredoras y arquitectura técnica conceptual.

El panel ofrece cuatro escenarios visuales: corredor, administrador de corredora,
administrador de plataforma y administrador técnico/SGBD. Los selectores no son
login, autorización ni aislamiento multiempresa real.

## Recorrido recomendado del panel

1. Abrir `/panel` y revisar los indicadores de la corredora ficticia seleccionada.
2. Cambiar entre las dos corredoras DEMO y recorrer clientes, activos y leads.
3. Abrir Publicaciones y probar el ciclo en memoria según el rol seleccionado.
4. Cambiar a administrador de plataforma y revisar sólo métricas agregadas.
5. Cambiar a administrador técnico/SGBD y revisar los controles futuros no
   implementados.

Los cambios del simulador desaparecen al recargar la página.

## Requisitos

- Node.js `>=22.13.0`.
- npm incluido con Node.js.
- En Windows 11, PowerShell para desarrollo y Git Bash para la verificación
  completa de los scripts del repositorio.

## Ejecutar en Windows 11

Desde PowerShell, en la carpeta del proyecto:

```powershell
npm.cmd ci
npm.cmd run dev:windows
```

Abrir la dirección local que muestre la consola. Para detener el servidor, usar
`Ctrl+C`.

## Ejecutar en Linux o Git Bash

```bash
npm ci
npm run dev
```

## Verificación de P1.4

En Git Bash o Linux:

```bash
npm run check
```

El comando comprueba tipos, lint, build de producción y pruebas automatizadas.

## Límites aprobados

- Sólo datos sintéticos rotulados como DEMO.
- Sin base de datos, Docker, APIs, analítica ni envío de formularios.
- Sin autenticación, almacenamiento remoto ni publicación en internet.
- Los filtros, selectores de rol y simulador sólo operan datos sintéticos en memoria.
- No ingresar datos personales ni interpretar valores o ubicaciones como ofertas.
- P1.5 no forma parte de este hito y requiere una nueva aprobación humana.

La fuente de verdad del alcance está en `AGENTS.md`, `PLANS.md` y
`docs/PROJECT_STATE.md`.
