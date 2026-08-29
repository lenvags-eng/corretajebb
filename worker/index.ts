/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS?: Fetcher;
  DB?: D1Database;
  IMAGES?: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

function redirectToLocalImage(request: Request): Response {
  const requestUrl = new URL(request.url);
  const source = requestUrl.searchParams.get("url");

  if (
    !source ||
    !source.startsWith("/") ||
    source.startsWith("//") ||
    source.includes("\\")
  ) {
    return new Response("Invalid local image path", { status: 400 });
  }

  const target = new URL(source, requestUrl);
  if (target.origin !== requestUrl.origin) {
    return new Response("Invalid local image origin", { status: 400 });
  }

  return Response.redirect(target, 307);
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const assets = env.ASSETS;
      const images = env.IMAGES;

      // Windows local development does not provide Cloudflare's ASSETS or
      // IMAGES bindings. Fall back to the original same-origin file instead
      // of throwing and activating Vite's error overlay.
      if (!assets || !images) {
        return redirectToLocalImage(request);
      }

      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => assets.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await images.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
