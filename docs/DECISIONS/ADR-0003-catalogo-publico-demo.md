# ADR-0003 — Catálogo público DEMO y proyección positiva

**Estado:** aceptado para P1.3  
**Fecha:** 28 de agosto de 2026

## Contexto

P1.3 debe demostrar búsqueda, filtros, resultados, fichas y fotografías sin usar
una base de datos, servicios externos ni información de propiedades o personas
reales. También debe hacer visible la separación que el producto futuro mantendrá
entre la gestión privada del corredor y la publicación pública.

## Decisión

- Mantener un repositorio local e intercambiable de activos totalmente ficticios.
- Crear una proyección pública positiva: el objeto público se construye campo por
  campo y nunca se obtiene eliminando campos desde un registro privado.
- Exponer sólo identificador público, slug, título, operación, tipo, comuna o sector
  aproximado, precio demostrativo, resumen, características, fotografías locales,
  estado público y alcance de revisión.
- Conservar los campos internos sintéticos en un módulo exclusivo del servidor y
  comprobar mediante pruebas que no aparecen en el DTO, HTML ni JSON públicos.
- Resolver búsqueda y filtros en memoria, dentro del navegador, sin persistencia,
  cookies, analítica, APIs o formularios activos.
- Incorporar cuatro publicaciones DEMO —casa, departamento, parcela y activo
  especial— con al menos dos fotografías sintéticas por ficha.

## Consecuencias

El prototipo podrá comunicar la experiencia comercial y el principio de mínima
exposición sin aparentar que ya dispone de seguridad multiempresa, autenticación o
persistencia. Las fotografías, valores, ubicaciones y descripciones no representan
ofertas reales. Contacto, administración, ciclo editorial y perfiles quedan fuera
de P1.3 y bloqueados hasta sus respectivas puertas.
