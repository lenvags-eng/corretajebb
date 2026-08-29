import assert from "node:assert/strict";
import test from "node:test";

const forbiddenPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])[^>]*>/i;
const rutPattern = /\b\d{1,2}\.\d{3}\.\d{3}-[\dkK]\b/;
const chilePhonePattern =
  /(?:\+56\s?(?:9\s?)?\d{4}[\s.-]?\d{4}|\b9\s?\d{4}[\s.-]?\d{4}\b)/;
const emailPattern = /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i;

const routes = [
  {
    path: "/",
    expected: ["Corretaje cercano.", "Propiedades de muestra", "Buscar en el catálogo"],
  },
  {
    path: "/propiedades",
    expected: [
      "Buscar debe sentirse simple.",
      "Catálogo de demostración",
      "4 de 4 publicaciones DEMO",
    ],
  },
  {
    path: "/servicios",
    expected: ["Acompañamiento para vender, comprar y arrendar.", "Sin autopublicación"],
  },
  {
    path: "/empresa",
    expected: ["Una propuesta local construida para inspirar confianza.", "Misión", "Visión"],
  },
  {
    path: "/metodo",
    expected: ["La tecnología organiza.", "Lo público no es una copia"],
  },
  {
    path: "/propiedades/casa-familiar-sector-oriente",
    expected: ["Casa familiar de líneas cálidas", "Valor DEMO", "Galería ficticia"],
  },
  {
    path: "/propiedades/departamento-luminoso-centro-ampliado",
    expected: ["Departamento luminoso y funcional", "Valor DEMO", "Galería ficticia"],
  },
  {
    path: "/propiedades/parcela-con-casa-entorno-rural",
    expected: ["Parcela con casa y entorno abierto", "Valor DEMO", "Galería ficticia"],
  },
  {
    path: "/propiedades/predio-productivo-activo-especial",
    expected: ["Predio productivo de escala mayor", "Valor DEMO", "Galería ficticia"],
  },
  {
    path: "/panel",
    panel: true,
    expected: [
      "Dashboard · B & B Corretaje · DEMO",
      "Admin corredora",
      "Selector exclusivamente visual",
      "Clientes activos",
      "Publicaciones activas",
    ],
  },
];

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("renders every authorized P1.4 route safely", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  for (const route of routes) {
    const response = await worker.fetch(
      new Request(`http://localhost${route.path}`, {
        headers: { accept: "text/html" },
      }),
      {
        ASSETS: {
          fetch: async () => new Response("Not found", { status: 404 }),
        },
      },
      {
        waitUntil() {},
        passThroughOnException() {},
      },
    );

    assert.equal(response.status, 200, route.path);
    assert.match(
      response.headers.get("content-type") ?? "",
      /^text\/html\b/i,
      route.path,
    );

    const html = await response.text();
    const text = visibleText(html);

    assert.match(html, /<html[^>]+lang=["']es-CL["']/i);
    assert.match(html, /B &amp; B Corretaje/);
    assert.match(html, /MODO DEMOSTRACIÓN/);
    assert.match(html, /DATOS FICTICIOS/);
    assert.match(html, /Hito P1\.4/);
    assert.match(html, /src=["']\/brand\/bb-logo\.png["']/);
    assert.doesNotMatch(html, /\/_vinext\/image\?/);
    assert.doesNotMatch(html, forbiddenPreviewMeta);
    assert.doesNotMatch(html, /<form\b/i);
    assert.doesNotMatch(html, /INT-DEMO-|TENANT-DEMO-BB|PROPIETARIO-SINTETICO/);
    assert.doesNotMatch(html, /privateNotes|internalOwnerAlias|privateZoneReference/);

    if (route.panel) {
      assert.doesNotMatch(html, /aria-label=["']Navegación principal["']/);
      assert.doesNotMatch(text, /Estado del prototipo/);
      assert.match(text, /sin login, permisos ni persistencia/i);
    } else {
      assert.match(html, /href=["']\/propiedades["']/);
      assert.match(html, /href=["']\/servicios["']/);
      assert.match(html, /href=["']\/empresa["']/);
      assert.match(html, /href=["']\/metodo["']/);
      assert.match(html, /href=["']\/panel["']/);
    }

    for (const expected of route.expected) {
      assert.match(text, new RegExp(escapeRegExp(expected)));
    }

    assert.doesNotMatch(text, rutPattern);
    assert.doesNotMatch(text, chilePhonePattern);
    assert.doesNotMatch(text, emailPattern);
  }
});

test("falls back safely when local image bindings are unavailable", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("image-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const response = await worker.fetch(
    new Request(
      "http://localhost/_vinext/image?url=%2Fproperties%2Fcasa-urbana-01.jpg&w=640&q=75",
    ),
    {},
    context,
  );

  assert.equal(response.status, 307);
  assert.equal(
    response.headers.get("location"),
    "http://localhost/properties/casa-urbana-01.jpg",
  );

  const rejected = await worker.fetch(
    new Request(
      "http://localhost/_vinext/image?url=https%3A%2F%2Fexample.invalid%2Fimage.jpg&w=640&q=75",
    ),
    {},
    context,
  );

  assert.equal(rejected.status, 400);
});
