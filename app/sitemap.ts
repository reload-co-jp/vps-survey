import type { MetadataRoute } from "next"
import { getAllServices } from "../lib/vps"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"
const staticPages = ["about"] as const
const lpPages = [
  "conoha",
  "sakura",
  "shin-vps",
  "2026-04-campaign",
  "2026-05-campaign",
] as const
const lastModified = "2026-05-12T00:00:00+09:00"

export const dynamic = "force-static"

const sitemap = (): MetadataRoute.Sitemap => {
  const services = getAllServices()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/vps/${service.id}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...staticPages.map((page) => ({
      url: `${siteUrl}/${page}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...lpPages.map((page) => ({
      url: `${siteUrl}/lp/${page}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]
}

export default sitemap
