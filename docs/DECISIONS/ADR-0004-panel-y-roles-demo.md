# ADR-0004 — Panel, roles y ciclo comercial exclusivamente DEMO

**Estado:** aceptado para P1.4  
**Fecha:** 29 de agosto de 2026

## Contexto

P1.4 debe mostrar cómo un corredor ordenaría clientes, necesidades, activos,
publicaciones, leads y actividad, y cómo se distinguirían las vistas de una
corredora, la plataforma y la administración técnica. La Fase 1 no autoriza
autenticación, base de datos, API ni empresas reales.

## Decisión

- Crear una única ruta local `/panel` como superficie de trabajo DEMO.
- Incorporar cuatro escenarios de rol: corredor, administrador de corredora,
  administrador de plataforma y administrador técnico/SGBD.
- Tratar los selectores de rol y empresa sólo como herramientas de demostración;
  no representan login, autorización ni aislamiento de datos.
- Usar dos corredoras, clientes, activos, leads, eventos y publicaciones totalmente
  sintéticos, sin nombres de personas, contactos, RUT o direcciones.
- Limitar las vistas de plataforma a métricas agregadas y las vistas técnicas a
  arquitectura y estados conceptuales, sin acceso comercial permanente.
- Simular en memoria un ciclo editorial con transiciones permitidas por escenario.
  Un corredor no puede aprobar su propia publicación; la aprobación corresponde al
  escenario administrador de corredora.
- Separar el estado comercial de la eliminación. `Vendida`, `Arrendada`, `Retirada`
  y `Archivada` no equivalen a borrar, y P1.4 no ofrece eliminación.
- Mostrar inicio, término, duración y avance de vigencia sin guardar cambios. Toda
  interacción vuelve a su estado inicial al recargar.
- Mantener el sitio y panel sin formularios, cargas, red, cookies de aplicación,
  almacenamiento, documentos, autenticación o datos reales.

## Consecuencias

El prototipo podrá explicar menús, dashboards, separación de responsabilidades y
ciclo de publicación sin afirmar que ya existe un SaaS seguro. La selección visual
de una corredora no prueba aislamiento multiempresa; éste requerirá autorización en
servidor, PostgreSQL/RLS, pruebas cruzadas y revisión independiente durante el MVP.
Contacto simulado y terminación de la experiencia corresponden a P1.5.
