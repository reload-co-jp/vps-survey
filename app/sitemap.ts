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
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/llms-full.txt`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.4,
    },
    ...services.map((service) => ({
      url: `${siteUrl}/vps/${service.id}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/articles/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}${article.href}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${siteUrl}/news/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...newsItems.map((news) => ({
      url: `${siteUrl}${news.href}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
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
