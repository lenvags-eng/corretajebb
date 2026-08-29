import assert from "node:assert/strict";
import { stat } from "node:fs/promises";
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

const publicKeys = [
  "approximateLocation",
  "commune",
  "description",
  "featured",
  "features",
  "formattedPrice",
  "id",
  "images",
  "operation",
  "priceCaption",
  "propertyType",
  "publicStatus",
  "reviewLabel",
  "reviewScope",
  "slug",
  "summary",
  "title",
];

test("projects exactly four synthetic listings through an explicit public DTO", async () => {
  const { getPublicListings } = await vite.ssrLoadModule(
    "/domain/demo/public-listings.server.ts",
  );
  const listings = getPublicListings();

  assert.equal(listings.length, 4);
  assert.deepEqual(
    Array.from(new Set(listings.map((listing) => listing.operation))).sort(),
    ["Activo especial", "Arriendo", "Venta"],
  );

  for (const listing of listings) {
    assert.deepEqual(Object.keys(listing).sort(), publicKeys);
    assert.match(listing.id, /^BB-DEMO-/);
    assert.match(listing.publicStatus, /DEMO/);
    assert.match(listing.priceCaption, /ficticio/i);
    assert.ok(listing.images.length >= 2);
    assert.ok(listing.features.length >= 4);
  }

  const serialized = JSON.stringify(listings);
  assert.doesNotMatch(serialized, /internalAssetId|internalAgencyKey/);
  assert.doesNotMatch(serialized, /internalOwnerAlias|privateZoneReference/);
  assert.doesNotMatch(serialized, /privateNotes|publicationWindow|lifecycleStatus/);
  assert.doesNotMatch(serialized, /INT-DEMO-|TENANT-DEMO-BB/);
});

test("ships every catalog image locally with meaningful alternative text", async () => {
  const { getPublicListings } = await vite.ssrLoadModule(
    "/domain/demo/public-listings.server.ts",
  );

  for (const listing of getPublicListings()) {
    for (const image of listing.images) {
      assert.match(image.src, /^\/properties\/[a-z0-9-]+\.jpg$/);
      assert.match(image.alt, /fictici[oa]|DEMO/i);
      const file = await stat(`${root}/public${image.src}`);
      assert.ok(file.size > 50_000, `${image.src} appears incomplete`);
    }
  }
});

test("combines text, operation, type and commune filters deterministically", async () => {
  const { getPublicListings } = await vite.ssrLoadModule(
    "/domain/demo/public-listings.server.ts",
  );
  const { ALL_FILTER_VALUE, filterPublicListings } = await vite.ssrLoadModule(
    "/domain/demo/catalog-filters.ts",
  );
  const listings = getPublicListings();
  const base = {
    query: "",
    operation: ALL_FILTER_VALUE,
    propertyType: ALL_FILTER_VALUE,
    commune: ALL_FILTER_VALUE,
  };

  assert.equal(filterPublicListings(listings, { ...base, query: "rural" }).length, 1);
  assert.equal(
    filterPublicListings(listings, {
      ...base,
      operation: "Venta",
      propertyType: "Casa",
      commune: "Los Ángeles",
    })[0].id,
    "BB-DEMO-001",
  );
  assert.equal(
    filterPublicListings(listings, {
      ...base,
      operation: "Arriendo",
      commune: "Mulchén",
    }).length,
    0,
  );
});
