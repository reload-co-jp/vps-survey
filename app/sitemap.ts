import type { MetadataRoute } from "next"
import { getAllServices } from "../lib/vps"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"

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
  ]
}

export default sitemap
