import type { MetadataRoute } from "next"
import { getAllArticles } from "../lib/articles"
import { getAllNews } from "../lib/news"
import { lastModified, siteUrl } from "../lib/site"
import { getAllServices } from "../lib/vps"

const staticPages = ["about"] as const
const lpPages = [
  "conoha",
  "sakura",
  "shin-vps",
  "2026-04-campaign",
  "2026-05-campaign",
  "2026-06-campaign",
  "2026-07-campaign",
  "2026-08-campaign",
] as const

export const dynamic = "force-static"

const sitemap = (): MetadataRoute.Sitemap => {
  const services = getAllServices()
  const articles = getAllArticles()
  const newsItems = getAllNews()

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${siteUrl}/opengraph-image`],
    },
    ...services.map((service) => ({
      url: `${siteUrl}/vps/${service.id}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${siteUrl}/vps/${service.id}/opengraph-image`],
    })),
    {
      url: `${siteUrl}/articles/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [`${siteUrl}/opengraph-image`],
    },
    ...articles.map((article) => ({
      url: `${siteUrl}${article.href}`,
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [`${siteUrl}/opengraph-image`],
    })),
    {
      url: `${siteUrl}/news/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [`${siteUrl}/opengraph-image`],
    },
    ...newsItems.map((news) => ({
      url: `${siteUrl}${news.href}`,
      lastModified: news.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
      images: [`${siteUrl}/opengraph-image`],
    })),
    ...staticPages.map((page) => ({
      url: `${siteUrl}/${page}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      images: [`${siteUrl}/opengraph-image`],
    })),
    ...lpPages.map((page) => ({
      url: `${siteUrl}/lp/${page}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [`${siteUrl}/opengraph-image`],
    })),
  ]
}

export default sitemap
