import assert from "node:assert/strict";
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

const rutPattern = /\b\d{1,2}\.\d{3}\.\d{3}-[\dkK]\b/;
const emailPattern = /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i;

test("models four bounded role scenarios and two synthetic tenants", async () => {
  const { DEMO_ROLES, DEMO_TENANTS } = await vite.ssrLoadModule(
    "/domain/demo/admin-data.ts",
  );
  const { getTenantMetrics } = await vite.ssrLoadModule(
    "/domain/demo/admin-model.ts",
  );

  assert.equal(DEMO_ROLES.length, 4);
  assert.deepEqual(
    DEMO_ROLES.map((role) => role.id),
    ["broker", "agency-admin", "platform-admin", "system-admin"],
  );
  assert.equal(DEMO_TENANTS.length, 2);
  assert.equal(new Set(DEMO_TENANTS.map((tenant) => tenant.id)).size, 2);

  for (const tenant of DEMO_TENANTS) {
    const serialized = JSON.stringify(tenant);
    const metrics = getTenantMetrics(tenant);

    assert.match(tenant.name, /DEMO/);
    assert.doesNotMatch(serialized, rutPattern);
    assert.doesNotMatch(serialized, emailPattern);
    assert.equal(metrics.clients, tenant.clients.length);
    assert.equal(metrics.assets, tenant.assets.length);
    assert.equal(metrics.openLeads, tenant.leads.length);
    assert.equal(
      metrics.activePublications,
      tenant.publications.filter((publication) => publication.status === "active").length,
    );

    for (const client of tenant.clients) assert.match(client.alias, /DEMO/);
    for (const lead of tenant.leads) assert.match(lead.alias, /DEMO/);
    for (const asset of tenant.assets) {
      assert.ok(asset.completeness >= 0 && asset.completeness <= 100);
    }
    for (const publication of tenant.publications) {
      assert.ok(publication.durationDays > 0);
      assert.ok(publication.elapsedDays >= 0);
      assert.ok(publication.elapsedDays <= publication.durationDays);
    }
  }
});

test("separates commercial roles from platform and system administration", async () => {
  const { DEMO_ROLES } = await vite.ssrLoadModule(
    "/domain/demo/admin-data.ts",
  );
  const role = (id) => DEMO_ROLES.find((candidate) => candidate.id === id);

  for (const id of ["platform-admin", "system-admin"]) {
    assert.ok(role(id));
    assert.doesNotMatch(
      role(id).allowedSections.join(" "),
      /clients|assets|publications|leads/,
    );
  }

  assert.doesNotMatch(role("broker").allowedSections.join(" "), /tenants|system/);
  assert.doesNotMatch(
    role("agency-admin").allowedSections.join(" "),
    /tenants|system/,
  );
});

test("enforces the demonstrative publication transition contract", async () => {
  const {
    getAllowedPublicationTransitions,
    PUBLICATION_STATUS_LABELS,
  } = await vite.ssrLoadModule("/domain/demo/admin-model.ts");

  assert.deepEqual(
    getAllowedPublicationTransitions("draft", "broker"),
    ["pending-review"],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("pending-review", "broker"),
    ["draft"],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("pending-review", "agency-admin"),
    ["draft", "approved"],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("sold", "agency-admin"),
    ["archived"],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("archived", "agency-admin"),
    [],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("active", "platform-admin"),
    [],
  );
  assert.deepEqual(
    getAllowedPublicationTransitions("active", "system-admin"),
    [],
  );
  assert.doesNotMatch(
    `${Object.keys(PUBLICATION_STATUS_LABELS).join(" ")} ${Object.values(PUBLICATION_STATUS_LABELS).join(" ")}`,
    /delete|deleted|eliminad/i,
  );
});

test("labels every future infrastructure control as non-operational", async () => {
  const { DEMO_SYSTEM_CHECKS } = await vite.ssrLoadModule(
    "/domain/demo/admin-data.ts",
  );

  assert.ok(DEMO_SYSTEM_CHECKS.length >= 5);
  for (const check of DEMO_SYSTEM_CHECKS) {
    assert.match(check.state, /Diseñado|No implementado|Bloqueado/);
    assert.doesNotMatch(`${check.state} ${check.note}`, /operativo|en producción/i);
  }
});
