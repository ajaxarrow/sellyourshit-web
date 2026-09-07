import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No longer a static export: /api/contact needs a real server to send
  // mail (a POST Route Handler can't run under `output: "export"` — see
  // https://nextjs.org/docs/app/building-your-application/deploying/static-exports#unsupported-features).
  // Deploy this to a Node-capable host (e.g. Vercel) from here on, not a
  // static host like GitHub Pages.
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  // Doc screenshots/gifs (public/_docs, synced from content/docs/**/images
  // by scripts/sync-docs-images.mjs) don't change without a re-sync, so
  // the browser can hold onto them across doc-to-doc navigation instead
  // of re-requesting on every page load.
  async headers() {
    return [
      {
        source: "/_docs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
