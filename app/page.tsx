import type { Metadata } from "next"
import { VpsExplorer } from "../components/vps-explorer"
import { absoluteUrl, siteName } from "../lib/site"
import { getAllServices } from "../lib/vps"

export const metadata: Metadata = {
  title: {
    absolute:
      "VPS比較｜国内・海外VPSを料金・スペック・用途で比較 | VPS比較サイト",
  },
  description:
    "国内・海外の主要VPSを月額料金・CPU・メモリ・用途で比較。ConoHa VPS、さくらのVPS、XServer VPS、シンVPS、KAGOYA、WebARENA Indigoなどの全プランを確認日つきで横並び比較できます。",
  keywords: ["VPS 比較", "VPS おすすめ", "日本 VPS", "海外 VPS", "格安 VPS"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VPS比較｜国内・海外VPSを料金・スペック・用途で比較",
    description:
      "国内・海外のVPSを価格、CPU、メモリ、リージョン、用途で比較できる一覧ページ。",
    images: [
      {
        alt: "VPS比較サイト 一覧ページ OGP画像",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "国内・海外のVPSを価格、CPU、メモリ、リージョン、用途で比較できる一覧ページ。",
    images: ["/twitter-image"],
    title: "VPS比較｜国内・海外VPSを料金・スペック・用途で比較",
  },
}

const Page = () => {
  const services = getAllServices()

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "VPS比較サイト",
    url: absoluteUrl("/"),
    mainEntityOfPage: absoluteUrl("/"),
    inLanguage: "ja",
    description:
      "国内外の VPS を価格・性能・用途から比較できる一覧ページ。検索、フィルタ、比較、詳細ページへの導線を提供します。",
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/vps/${service.id}/`),
        name: service.name,
      })),
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteName,
        item: absoluteUrl("/"),
      },
    ],
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <VpsExplorer services={services} />
    </>
  )
}

export default Page
