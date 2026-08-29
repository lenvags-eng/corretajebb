/**
 * Minimal compile-time surface used by the local Vinext worker.
 * No Cloudflare service is enabled in P1.1; hosting bindings remain null.
 */
interface Fetcher {
  fetch(input: Request | string | URL, init?: RequestInit): Promise<Response>;
}

interface D1Database {
  readonly __runtimeType?: "D1Database";
}

interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: Record<string, unknown>;
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}
