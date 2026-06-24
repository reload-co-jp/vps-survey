import type { MetadataRoute } from "next"
import { siteUrl } from "../lib/site"

export const dynamic = "force-static"

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
  },
  sitemap: `${siteUrl}/sitemap.xml`,
  host: siteUrl,
})

export default robots
