# Informe de cierre técnico P1.3

**Fecha:** 29 de agosto de 2026  
**Hito:** catálogo, búsqueda, filtros, resultados, fichas y galerías DEMO  
**Estado:** completado técnicamente; pendiente de aceptación humana

## Resultado

P1.3 incorpora una experiencia pública navegable con cuatro publicaciones
completamente ficticias: casa en venta, departamento en arriendo, parcela rural y
predio productivo como activo especial. El catálogo permite buscar por texto,
combinar operación, tipo y comuna, limpiar criterios, visualizar el recuento y
recuperarse desde un estado sin resultados. Cada ficha incluye entre dos y cuatro
fotografías sintéticas locales, galería, características, valor DEMO, ubicación
aproximada y alcance explícito de revisión.

No se incorporaron base de datos, autenticación, servicios externos, formularios,
contacto, analítica, cookies, almacenamiento ni funciones administrativas.

## Siete revisiones internas obligatorias

### 1. Producto y corretaje

- Se cubren venta, arriendo, propiedad rural y activo especial.
- La búsqueda conduce desde el inicio al catálogo y las fichas permiten una
  demostración comercial continua.
- Ninguna publicación acepta carga pública ni afirma existencia, disponibilidad o
  verificación de un activo real.

**Resultado:** conforme para demostración local.

### 2. Arquitectura y datos

- El repositorio privado sintético reside en un módulo de servidor.
- La proyección pública se construye campo por campo mediante un DTO positivo.
- El componente cliente recibe sólo los cuatro objetos públicos y filtra en memoria.
- La arquitectura no crea todavía aislamiento multiempresa, API ni persistencia.

**Resultado:** conforme al ADR-0003.

### 3. UX/UI y accesibilidad

- Se mantiene la paleta B & B, jerarquía editorial, navegación activa y franja DEMO.
- Los controles tienen etiquetas, foco visible y acción de limpieza.
- El recuento usa `aria-live`; el estado vacío ofrece recuperación.
- Las miniaturas son botones con nombre accesible y `aria-pressed`.
- Las doce imágenes incorporan texto alternativo y el movimiento respeta
  `prefers-reduced-motion`.

**Limitación:** la revisión responsive fue estática y mediante build; la validación
visual en navegadores y en el equipo Windows continúa prevista para un hito
posterior.

### 4. Privacidad, contratos y UAF

- No se usaron RUT, teléfonos, correos, direcciones exactas, documentos o personas.
- Todos los precios, ubicaciones, descripciones e imágenes están rotulados como DEMO.
- Cada ficha evita prometer revisión jurídica, técnica, registral o productiva.
- No se simulan contratos, recepción de dinero, ROS, ROE ni decisiones UAF.

**Limitación:** revisión interna; no reemplaza asesoría jurídica chilena independiente.

### 5. AppSec

- No existen llamadas de red, secretos, cookies, persistencia o entrada transmitida.
- Pruebas negativas impiden formularios y servicios externos.
- Pruebas sobre HTML y paquetes del navegador excluyen sentinelas y campos internos.
- La página pública no importa directamente el repositorio administrativo.

**Limitación:** revisión interna; no constituye pentest ni auditoría independiente.

### 6. Implementación y QA

- TypeScript estricto: correcto.
- ESLint: correcto.
- Build de producción Vinext/Vite: correcto.
- Catorce pruebas automatizadas: catorce aprobadas, cero fallos.
- Nueve rutas públicas comprobadas: inicio, catálogo, tres institucionales y cuatro
  fichas dinámicas.
- Doce archivos fotográficos locales comprobados con tamaño mínimo y texto alternativo.

### 7. Revisión adversarial y veredicto

Se intentó detectar exposición de sentinelas privados, uso de datos personales,
formularios activos, solicitudes externas, persistencia, rutas administrativas,
imágenes faltantes y ausencia de rotulación DEMO. Las comprobaciones automatizadas
no encontraron estas condiciones prohibidas.

## Riesgos residuales

- Las imágenes generadas pueden contener pequeñas inconsistencias visuales propias
  de material sintético; no deben confundirse con fotografías documentales.
- El filtrado en memoria demuestra interacción, no rendimiento de un catálogo real.
- No existe aislamiento multiempresa, control de acceso, auditoría ni respaldo.
- La revisión visual en Windows y navegadores reales depende de la aceptación humana.

## Corrección local posterior al paquete inicial

Se corrigió una incompatibilidad observada en Windows: Vinext intentaba optimizar
imágenes locales mediante bindings de Cloudflare que no existen durante la ejecución
local. Las imágenes del prototipo ahora se sirven directamente y el Worker incorpora
una redirección segura, limitada al mismo origen, para neutralizar solicitudes antiguas
del optimizador sin mostrar la ventana de error de Vite.

## Veredicto

`GO LIMITADO` para usar P1.3 como demostración comercial local con datos ficticios.

`NO-GO` para datos reales, publicación en internet, contacto operativo, administración
o inicio de P1.4 sin la puerta explícita
`APROBACIÓN P1.3 — INICIAR P1.4`.
