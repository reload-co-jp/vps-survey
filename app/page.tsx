import type { Metadata } from "next"
import { VpsExplorer } from "../components/vps-explorer"
import { getAllServices, getLowestPricePlan } from "../lib/vps"

export const metadata: Metadata = {
  title: "VPS比較サイト | 国内・海外VPSおすすめ一覧",
  description:
    "VPS比較サイトの一覧ページです。国内・海外のVPSを価格、CPU、メモリ、リージョン、用途で比較できます。",
  keywords: ["VPS 比較", "VPS おすすめ", "日本 VPS", "海外 VPS", "格安 VPS"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VPS比較サイト | 国内・海外VPSおすすめ一覧",
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
    title: "VPS比較サイト | 国内・海外VPSおすすめ一覧",
  },
}

const Page = () => {
  const services = getAllServices()

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "VPS比較サイト",
    description:
      "国内外の VPS を価格・性能・用途から比較できる一覧ページ。検索、フィルタ、比較、詳細ページへの導線を提供します。",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `/vps/${service.id}/`,
        name: service.name,
      })),
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: services.map((service) => ({
      "@type": "Question",
      name: `${service.name}はどんな用途に向いていますか？`,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${service.summary} 最安プランは¥${getLowestPricePlan(service).price.toLocaleString()}からです。`,
      },
    })),
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />
      <VpsExplorer services={services} />
    </>
  )
}

export default Page
