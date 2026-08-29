import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function readSourceTree(directory, options = {}) {
  const entries = await readdir(directory, { withFileTypes: true });
  const chunks = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return readSourceTree(entryPath, options);
      }

      if (entry.name === "chatgpt-auth.ts" || options.exclude?.has(entry.name)) {
        return "";
      }

      return /\.(ts|tsx|js|css|html|json)$/.test(entry.name)
        ? readFile(entryPath, "utf8")
        : "";
    }),
  );

  return chunks.join("\n");
}

test("keeps P1.4 local, synthetic and free of external calls", async () => {
  const catalogComponents = await readSourceTree(
    path.join(root, "components", "catalog"),
  );
  const adminComponents = await readSourceTree(
    path.join(root, "components", "admin"),
  );
  const source = [
    await readSourceTree(path.join(root, "app")),
    await readSourceTree(path.join(root, "components", "site")),
    catalogComponents,
    adminComponents,
    await readSourceTree(path.join(root, "lib")),
    await readSourceTree(path.join(root, "domain", "demo"), {
      exclude: new Set(["admin-assets.server.ts"]),
    }),
  ].join("\n");

  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /https?:\/\//);
  assert.doesNotMatch(source, /<form\b/i);
  assert.doesNotMatch(source, /<textarea\b/i);
  assert.doesNotMatch(source, /localStorage|sessionStorage|document\.cookie/);
  assert.doesNotMatch(catalogComponents, /admin-assets\.server/);
  assert.doesNotMatch(adminComponents, /admin-assets\.server/);
  assert.match(adminComponents, /persistState=\{false\}/);
  assert.match(adminComponents, /enableKeyboardShortcut=\{false\}/);
});

test("keeps private demo sentinels outside browser bundles", async () => {
  const clientBundle = await readSourceTree(path.join(root, "dist", "client"));

  assert.doesNotMatch(clientBundle, /INT-DEMO-/);
  assert.doesNotMatch(clientBundle, /TENANT-DEMO-BB/);
  assert.doesNotMatch(clientBundle, /PROPIETARIO-SINTETICO/);
  assert.doesNotMatch(clientBundle, /REFERENCIA-RESERVADA-DEMO/);
  assert.doesNotMatch(clientBundle, /privateNotes|internalOwnerAlias/);
});
