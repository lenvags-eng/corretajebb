# Sistema visual B & B — P1.4

## Tesis visual

B & B debe verse como una corredora local consolidada: seria, clara y cercana. El
sistema toma del sello original su azul marino y su burdeos, los combina con una
superficie papel y usa una composición editorial inspirada en documentos
inmobiliarios formales.

No se pretende aparentar que el prototipo ya es un portal operativo. La franja DEMO
forma parte permanente de la identidad de Fase 1.

## Fuente de verdad

Los valores canónicos viven en `lib/brand.ts` y se reflejan en
`app/globals.css`.

| Token | Valor | Uso principal |
|---|---|---|
| Navy | `#082F52` | texto, estructura, confianza |
| Burgundy | `#A00634` | énfasis y acentos |
| Paper | `#F8F6F1` | fondo cálido |
| White | `#FFFFFF` | tarjetas y contraste |

Los pares navy/paper y burgundy/paper deben mantener contraste WCAG AA; el primero
también debe superar 7:1 para texto normal.

## Tipografía

- Interfaz: Aptos, Segoe UI y Arial como alternativas locales.
- Títulos: Georgia, Cambria y Times New Roman.
- Datos técnicos: Cascadia Code o Consolas.
- No se descargan fuentes externas en el prototipo.

## Forma, espaciado y movimiento

- Radio base: 12 px; tarjetas sobrias, sin cápsulas excesivas.
- Bordes marino de baja opacidad y sombras contenidas.
- Transiciones de interfaz: máximo 160 ms.
- `prefers-reduced-motion` desactiva desplazamiento y animación no esencial.
- El foco visible usa un contorno burdeos contrastante.

## Uso del sello

- Conservar proporciones y colores originales.
- No alterar, inclinar, recortar internamente ni superponer texto.
- Usar fondo blanco y aire perimetral cuando sea posible.
- El archivo local aprobado es `public/brand/bb-logo.png`.

## Contrato de demostración

Toda pantalla de Fase 1 debe conservar visible:

`MODO DEMOSTRACIÓN — DATOS FICTICIOS — SIN ENVÍO`

## Navegación pública

- La franja DEMO y la cabecera permanecen visibles al desplazarse.
- El menú principal contiene sólo rutas activas y autorizadas.
- La ruta actual se distingue visualmente y mediante `aria-current="page"`.
- En pantallas pequeñas el menú utiliza un panel lateral con cierre explícito.
- Todas las rutas comparten pie, identidad y lenguaje de límites.
- El enlace de salto permite llegar directamente al contenido principal.

## Catálogo y fichas

- Las tarjetas usan fotografía 3:2, operación, tipo, ubicación aproximada, valor
  DEMO y una acción inequívoca hacia la ficha.
- Toda fotografía lleva texto alternativo y un sello visible de propiedad ficticia.
- Los filtros incluyen etiqueta persistente, foco visible, recuento anunciado con
  `aria-live`, limpieza explícita y un estado vacío recuperable.
- La galería utiliza una imagen principal y miniaturas operables con teclado; la
  selección expone `aria-pressed` y un contador visible.
- Los valores se presentan como demostrativos y no como una oferta vigente.
- El alcance de revisión se explica en cada ficha sin afirmar verificación jurídica,
  técnica o registral.
- En móvil, los filtros se apilan, las miniaturas forman dos columnas y las tarjetas
  conservan una única secuencia de lectura.

## Panel de gestión DEMO

- El panel mantiene la franja DEMO y reemplaza la navegación pública por una barra
  lateral de trabajo; siempre ofrece retorno explícito al sitio.
- Las superficies de datos son blancas sobre papel cálido, con jerarquía marino y
  acentos burdeos. Los dashboards conservan un tono formal, no lúdico.
- En pantallas pequeñas el menú lateral se abre mediante un botón con nombre
  accesible y se cierra al seleccionar una sección.
- Los selectores de corredora y rol se rotulan como escenarios DEMO; un aviso
  persistente explica que no constituyen autenticación ni permisos.
- Las métricas usan texto además de gráficos. Los estados de publicación nunca
  dependen sólo del color.
- El flujo editorial separa preparación, difusión, resultado y archivo. Los cambios
  se guardan sólo en el estado de React y se reinician al recargar.
- Las tablas conservan encabezados semánticos y desplazamiento horizontal cuando no
  caben. El tablero de leads pasa de una a cuatro columnas según el ancho disponible.
- Los perfiles de plataforma y sistema muestran sólo agregados o controles
  conceptuales; no se diseñan como cuentas omnipotentes.

P1.4 no incluye autenticación, persistencia, aislamiento multiempresa, captura de
datos, contacto activo ni acciones operativas. Esas capacidades permanecen
bloqueadas.
