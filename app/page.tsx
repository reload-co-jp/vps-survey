import { VpsExplorer } from "../components/vps-explorer"
import { getAllServices } from "../lib/vps"

const Page = () => {
  const services = getAllServices()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "VPS比較サイト",
    description:
      "国内外の VPS を価格・性能・用途から比較できる一覧ページ。検索、フィルタ、比較、詳細ページへの導線を提供します。",
    mainEntity: services.map((service) => ({
      "@type": "Product",
      name: service.name,
      description: service.summary,
      offers: {
        "@type": "Offer",
        priceCurrency: "JPY",
        price: service.price,
        url: service.officialUrl,
      },
    })),
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <VpsExplorer services={services} />
    </>
  )
}

export default Page
