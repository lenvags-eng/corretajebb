# AGENTS.md — reglas obligatorias de B & B Corretaje

## 1. Autoridad y orden de lectura

Antes de actuar, toda IA o desarrollador debe leer, en este orden:

1. `AGENTS.md`;
2. `PLANS.md`;
3. `docs/PROJECT_STATE.md`;
4. `docs/00_DISCOVERY_V1.md`;
5. los ADR aplicables en `docs/DECISIONS/`.

El repositorio y sus documentos versionados son la fuente de verdad. La memoria de
un chat no reemplaza archivos, pruebas, commits ni decisiones humanas.

## 2. Puerta vigente

- Fase 0 aprobada por el propietario el 28 de agosto de 2026 mediante
  `APROBACIÓN FASE 0 — DECISIONES RECOMENDADAS`.
- P1.1 aceptado por el propietario el 28 de agosto de 2026 mediante
  `APROBACIÓN P1.1 — INICIAR P1.2`.
- P1.2 aceptado por el propietario el 28 de agosto de 2026 mediante
  `APROBACIÓN P1.2 — INICIAR P1.3`.
- P1.3 aceptado por el propietario el 29 de agosto de 2026 mediante
  `APROBACIÓN P1.3 — INICIAR P1.4`.
- Alcance autorizado: exclusivamente P1.4, paneles DEMO, dashboard, clientes,
  activos, leads, actividad y ciclo de publicaciones simulados en memoria.
- P1.5 y todo hito posterior permanecen bloqueados.
- La única puerta que habilita el siguiente hito es
  `APROBACIÓN P1.4 — INICIAR P1.5`.
- Queda prohibido crear infraestructura, cuentas externas, servicios pagados o
  formularios que transmitan información.

## 3. Datos y privacidad

- Usar exclusivamente datos sintéticos, claramente rotulados como `DEMO`.
- No incorporar RUT, teléfonos, correos, direcciones exactas, documentos, contratos,
  respaldos, credenciales, secretos ni propiedades reales.
- No copiar información real desde PDF, WhatsApp, correo, planillas o chats al
  prototipo.
- La capa pública sólo puede usar un DTO o proyección pública explícita.
- Los campos privados no pueden llegar al navegador público, aunque estén ocultos
  visualmente.
- No usar analítica, cookies no esenciales, mapas externos, APIs o fuentes remotas en
  la Fase 1.

## 4. Alcance técnico de la Fase 1

- Aplicación local única, basada en Next.js y TypeScript, con rutas públicas y un
  panel administrativo simulado.
- Repositorio de datos ficticios intercambiable; ninguna base de datos.
- Activos locales para que la demostración pueda funcionar sin internet después de
  instalar dependencias.
- Sin autenticación real, MFA real, subida de archivos, envío de correo, WhatsApp
  API, pagos, firma electrónica ni reportes UAF.
- No Docker en el prototipo, para ajustarse al equipo Windows 11 con 8 GB de RAM.
- No aplicación móvil o de escritorio nativa; el panel se diseña para ser PWA en una
  fase posterior.

## 5. Seguridad de diseño

- Denegar por defecto cuando una función no esté explícitamente aprobada.
- No exponer secretos; mantener `.env.example` sin valores reales si llega a ser
  necesario.
- Prohibido conectar el navegador directamente a tablas privadas.
- Prohibido usar `tenant_id`, `user_id` u otro identificador enviado por el cliente
  como única autorización.
- Separar estado comercial de eliminación: `sold`, `rented`, `withdrawn` o
  `archived` no equivalen a borrar registros.
- No afirmar que una propiedad está jurídicamente verificada. Cada nivel de revisión
  debe explicar qué fue revisado.
- No afirmar cumplimiento, certificación, pentest o asesoría legal independiente.

## 6. Forma de trabajo

- Español de Chile en interfaz y documentación para usuarios.
- Código, identificadores y contratos API pueden usar inglés consistente.
- Un hito, una rama y un cambio acotado a la vez.
- Antes de editar: declarar objetivo, archivos previstos y criterio de término.
- Después de editar: ejecutar build, tipos, lint, pruebas y revisión del diff que
  correspondan.
- No iniciar el siguiente hito sin aprobación humana.
- Registrar decisiones importantes mediante ADR; no dejarlas sólo en el chat.
- No activar cobros ni ingresar tarjetas sin autorización expresa.

## 7. Pasadas obligatorias por hito

Cada hito debe registrar:

1. revisión de producto y corretaje;
2. revisión de arquitectura y datos;
3. revisión UX/UI y accesibilidad;
4. revisión de privacidad, contratos y UAF;
5. revisión AppSec;
6. implementación y QA;
7. revisión adversarial y veredicto `GO`, `GO LIMITADO` o `NO-GO`.

Una autoevaluación de la misma IA debe denominarse `revisión interna`, nunca
`auditoría independiente`.

## 8. Definición mínima de terminado

Un hito sólo termina cuando:

- cumple sus criterios de aceptación;
- no contiene datos reales ni secretos;
- build, tipos, lint y pruebas aplicables finalizan correctamente;
- se revisaron accesibilidad, responsive y estados vacíos/error;
- se documentaron riesgos y limitaciones;
- `docs/PROJECT_STATE.md` y `PLANS.md` reflejan el resultado;
- el responsable humano aprueba el avance.
