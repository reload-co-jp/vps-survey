import type { MetadataRoute } from "next"
import { getAllServices } from "../lib/vps"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"
const lpPages = ["conoha", "sakura", "shin-vps"] as const

export const dynamic = "force-static"

const sitemap = (): MetadataRoute.Sitemap => {
  const services = getAllServices()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/vps/${service.id}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...lpPages.map((page) => ({
      url: `${siteUrl}/lp/${page}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}

export default sitemap
