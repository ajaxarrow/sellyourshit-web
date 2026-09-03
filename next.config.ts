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
};

export default nextConfig;
