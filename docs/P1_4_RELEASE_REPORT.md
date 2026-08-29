# Informe de cierre técnico P1.4

**Fecha:** 29 de agosto de 2026  
**Hito:** panel, roles, dashboard y ciclo de publicaciones DEMO  
**Estado:** completado técnicamente; pendiente de aceptación humana

## Resultado

P1.4 incorpora `/panel` como espacio de trabajo local para demostrar cómo se
organizarían una corredora y una futura plataforma multiempresa. Incluye cuatro
escenarios visuales de rol, dos corredoras ficticias, dashboard, clientes, activos,
publicaciones, leads, actividad, comparación agregada y una vista técnica/SGBD
conceptual. El simulador editorial permite recorrer estados según el escenario de
rol y conserva su historial sólo durante la sesión de la pantalla.

No se incorporaron autenticación, permisos, API, base de datos, almacenamiento,
cookies de aplicación, formularios, archivos, mensajería, analítica, servicios
externos ni datos reales. Los selectores de empresa y rol son demostrativos y no
prueban aislamiento multiempresa.

## Siete revisiones internas obligatorias

### 1. Producto y corretaje

- El menú permite explicar una operación completa: clientes, necesidades, activos,
  publicaciones, interesados y trazabilidad.
- El dashboard ofrece indicadores, distribución editorial y próximas acciones con
  datos consistentes dentro de cada corredora ficticia.
- La duración y los estados cubren borrador, revisión, aprobación, programación,
  actividad, pausa, vencimiento, venta, arriendo, retiro y archivo.
- Vendida, arrendada, retirada y archivada se separan expresamente de eliminación.
- No existe autopublicación pública ni carga de propiedades por desconocidos.

**Resultado:** conforme para demostración comercial local.

### 2. Arquitectura y datos

- Dos repositorios sintéticos permiten explicar multiempresa sin afirmar que existe.
- Las vistas comerciales operan una corredora a la vez; plataforma muestra agregados
  y sistema sólo arquitectura futura.
- Los cambios del flujo viven únicamente en memoria y se reinician al recargar.
- La decisión y sus límites quedaron registrados en ADR-0004.
- El MVP real queda condicionado a autorización de servidor, PostgreSQL, RLS,
  pruebas IDOR y revisión independiente.

**Resultado:** conforme para simulación; sin aislamiento real.

### 3. UX/UI y accesibilidad

- Se mantuvo la identidad B & B: marino, burdeos, papel cálido, tipografía editorial
  y superficies sobrias.
- El panel distingue sitio público y espacio de trabajo, con retorno visible al sitio.
- La navegación lateral se adapta a móvil y todos los botones principales tienen
  nombre accesible.
- Tablas, barras de progreso, estados y gráfico agregan texto semántico; la
  información no depende sólo del color.
- El aviso sobre rol y límites permanece visible sobre todas las vistas.

**Limitación:** revisión estática y automatizada; no se realizó validación visual en
el equipo Windows ni con tecnologías de asistencia reales.

### 4. Privacidad, contratos y UAF

- Clientes y leads usan alias DEMO sin nombres, RUT, teléfonos o correos.
- No hay direcciones exactas, contratos, documentos, pagos, comisiones ni recepción
  de fondos.
- No se implementan reportes, decisiones o automatizaciones UAF.
- Los eventos de actividad son ejemplos fijos y no se presentan como evidencia.

**Limitación:** revisión interna; no reemplaza asesoría jurídica chilena.

### 5. AppSec

- El código de aplicación no realiza `fetch`, no usa URLs externas y no guarda en
  `localStorage`, `sessionStorage` ni cookies de aplicación.
- No hay formularios, subida de archivos, credenciales, secretos o endpoints.
- Los escenarios técnicos y de plataforma no reciben acceso comercial en el menú.
- Se prueba que los administradores técnicos no pueden accionar el flujo editorial.
- La compatibilidad de imágenes locales mantiene el rechazo de destinos externos.

**Limitación:** revisión interna; no constituye pentest ni auditoría independiente.

### 6. Implementación y QA

- TypeScript estricto: correcto.
- ESLint: correcto.
- Build de producción Vinext/Vite: correcto.
- Dieciocho pruebas automatizadas: dieciocho aprobadas, cero fallos.
- Diez recorridos HTML comprobados: nueve rutas públicas y `/panel`.
- Contratos automatizados verifican roles, métricas, estados, transiciones, datos
  sintéticos, ausencia de persistencia y exclusión de sentinelas privados previos.

### 7. Revisión adversarial y veredicto

Se intentó detectar datos identificables, acceso comercial desde roles técnicos,
autoaprobación del corredor, estado de eliminación, persistencia, formularios,
solicitudes externas, falta de rotulación DEMO, rutas rotas y regresión del servicio
local de imágenes. Las comprobaciones no encontraron esas condiciones prohibidas.

## Riesgos residuales

- Un visitante puede confundir un selector visual con permisos reales si omite el
  aviso; la demostración debe explicar esa diferencia.
- Los totales y actividades son estáticos y no miden rendimiento real del negocio.
- No existen autenticación, aislamiento, auditoría inmutable, respaldo o restauración.
- El flujo en memoria valida interacción, no concurrencia ni reglas de servidor.
- La validación visual final en Windows depende de la revisión humana del paquete.

## Veredicto

`GO LIMITADO` para usar P1.4 como demostración comercial local con datos ficticios.

`NO-GO` para datos reales, publicación en internet, contacto operativo o inicio de
P1.5 sin la puerta explícita `APROBACIÓN P1.4 — INICIAR P1.5`.
