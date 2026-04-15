import type { MetadataRoute } from "next"

export const dynamic = "force-static"

const manifest = (): MetadataRoute.Manifest => ({
  name: "VPS比較サイト",
  short_name: "VPS比較",
  description:
    "国内・海外のVPSを価格、性能、用途から比較できる比較サイトです。",
  start_url: "/",
  display: "standalone",
  background_color: "#050912",
  theme_color: "#10203e",
  lang: "ja",
  icons: [
    {
      src: "/icon.svg",
      sizes: "any",
      type: "image/svg+xml",
    },
  ],
})

export default manifest
