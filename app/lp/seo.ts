import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"
const publisherName = "VPS Survey"
const publisherLogoUrl = `${siteUrl}/icon.svg`

type LpMetadataInput = {
  description: string
  keywords: string[]
  ogDescription: string
  path: string
  title: string
}

type ArticleJsonLdInput = {
  dateModified: string
  datePublished: string
  description: string
  keywords: string[]
  path: string
  title: string
}

type BreadcrumbItem = {
  name: string
  path: string
}

type FaqItem = {
  answer: string
  question: string
}

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${siteUrl}${path}`

export const buildLpMetadata = ({
  description,
  keywords,
  ogDescription,
  path,
  title,
}: LpMetadataInput): Metadata => ({
  title,
  description,
  keywords,
  alternates: {
    canonical: absoluteUrl(path),
  },
  category: "technology",
  authors: [{ name: publisherName }],
  creator: publisherName,
  publisher: publisherName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title,
    description: ogDescription,
    type: "article",
    url: absoluteUrl(path),
    locale: "ja_JP",
    siteName: "VPS比較サイト",
    images: [
      {
        alt: title,
        height: 630,
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ogDescription,
    images: [absoluteUrl("/twitter-image")],
  },
})

export const buildArticleJsonLd = ({
  dateModified,
  datePublished,
  description,
  keywords,
  path,
  title,
}: ArticleJsonLdInput) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  inLanguage: "ja",
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished,
  dateModified,
  author: {
    "@type": "Organization",
    name: publisherName,
  },
  publisher: {
    "@type": "Organization",
    name: publisherName,
    logo: {
      "@type": "ImageObject",
      url: publisherLogoUrl,
    },
  },
  keywords,
})

export const buildBreadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

export const buildFaqJsonLd = (items: FaqItem[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
})
