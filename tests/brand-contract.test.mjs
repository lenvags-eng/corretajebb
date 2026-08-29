import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true, hmr: false },
});

after(async () => {
  await vite.close();
});

function channelToLinear(channel) {
  const normalized = channel / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => channelToLinear(Number.parseInt(channel, 16)));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const lighter = Math.max(luminance(first), luminance(second));
  const darker = Math.min(luminance(first), luminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

test("keeps the brand source of truth and demo guardrails", async () => {
  const { BRAND, BRAND_COLORS } = await vite.ssrLoadModule("/lib/brand.ts");

  assert.equal(BRAND.name, "B & B Corretaje");
  assert.equal(BRAND.phase, "Hito P1.4");
  assert.equal(
    BRAND.demoNotice,
    "MODO DEMOSTRACIÓN — DATOS FICTICIOS — SIN ENVÍO",
  );
  assert.ok(contrast(BRAND_COLORS.navy, BRAND_COLORS.paper) >= 7);
  assert.ok(contrast(BRAND_COLORS.burgundy, BRAND_COLORS.paper) >= 4.5);
});

test("limits public navigation and content to the authorized P1.4 surface", async () => {
  const {
    PUBLIC_NAVIGATION,
    SERVICES,
    METHOD_STEPS,
    BRAND_VALUES,
  } = await vite.ssrLoadModule("/lib/site-content.ts");

  assert.deepEqual(
    PUBLIC_NAVIGATION.map((item) => item.href),
    ["/", "/propiedades", "/servicios", "/empresa", "/metodo"],
  );
  assert.equal(SERVICES.length, 6);
  assert.equal(METHOD_STEPS.length, 6);
  assert.equal(BRAND_VALUES.length, 4);
  assert.doesNotMatch(
    JSON.stringify(PUBLIC_NAVIGATION),
    /admin|panel|contacto/i,
  );

  const header = await readFile(`${root}/components/site/site-header.tsx`, "utf8");
  assert.match(header, /href="\/panel"/);
  assert.match(header, /Panel DEMO/);
});

test("keeps CSS tokens synchronized with the canonical palette", async () => {
  const { BRAND_COLORS } = await vite.ssrLoadModule("/lib/brand.ts");
  const css = (await readFile(`${root}/app/globals.css`, "utf8")).toLowerCase();

  for (const color of Object.values(BRAND_COLORS)) {
    assert.ok(css.includes(color.toLowerCase()), `Missing CSS token ${color}`);
  }
});
