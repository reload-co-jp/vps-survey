import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  billingLabels,
  formatStorageLabel,
  formatTrafficLabel,
  getAllServices,
  getLowestPricePlan,
  getOutboundUrl,
  getPriceRangeLabel,
  getServiceById,
  regionLabels,
  usageLabels,
} from "../../../lib/vps"

const responsiveGrid = (minWidth: string) => ({
  columnGap: "1rem",
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))`,
  maxWidth: "100%",
  minWidth: "0px",
  rowGap: "1rem",
  width: "100%",
})

type Props = {
  params: Promise<{
    id: string
  }>
}

export const generateStaticParams = () =>
  getAllServices().map((service) => ({ id: service.id }))

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    return {
      title: "VPSが見つかりません",
    }
  }

  return {
    title: service.name,
    description: `${service.name}の価格、スペック、メリット・デメリット、おすすめ用途を掲載した詳細ページです。`,
    keywords: [
      `${service.name} 評判`,
      `${service.name} 料金`,
      `${service.name} VPS`,
      "VPS 比較",
    ],
    alternates: {
      canonical: `/vps/${service.id}/`,
    },
    openGraph: {
      title: `${service.name}の料金・スペック・用途`,
      description: `${service.name}の料金帯、スペック、メリット・デメリット、おすすめ用途を確認できる詳細ページです。`,
      images: [
        {
          alt: `${service.name}のOGP画像`,
          height: 630,
          url: `/vps/${service.id}/opengraph-image`,
          width: 1200,
        },
      ],
      url: `/vps/${service.id}/`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      description: `${service.name}の料金帯、スペック、メリット・デメリット、おすすめ用途を確認できる詳細ページです。`,
      images: [`/vps/${service.id}/twitter-image`],
      title: `${service.name}の料金・スペック・用途`,
    },
  }
}

const VpsDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    notFound()
  }

  const lowestPricePlan = getLowestPricePlan(service)
  const outboundUrl = getOutboundUrl(service)

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: service.name,
    description: service.summary,
    category: "VPS",
    offers: {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: lowestPricePlan.price,
      url: service.officialUrl,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "VPS比較サイト",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: `/vps/${service.id}/`,
      },
    ],
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        maxWidth: "100%",
        minWidth: 0,
        width: "100%",
      }}
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <section
        style={{
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 12,
          display: "grid",
          gap: "1rem",
          padding: "clamp(0.9rem, 3vw, 1.5rem)",
        }}
      >
        <Link href="/" style={{ color: "#3EA8FF", fontSize: "0.9rem", textDecoration: "none" }}>
          ← 一覧へ戻る
        </Link>
        <div style={{ display: "grid", gap: "0.7rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#ebf8ff",
                  border: "1px solid #bee3f8",
                  borderRadius: 999,
                  color: "#2b6cb0",
                  fontSize: "0.82rem",
                  padding: "0.35rem 0.7rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{ color: "#1a202c", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 700, lineHeight: 1.2 }}
          >
            {service.name}
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.8, maxWidth: 760 }}>
            {service.summary}
          </p>
        </div>
        <div
          style={{
            ...responsiveGrid("160px"),
            gap: "0.85rem",
          }}
        >
          <DetailMetric label="料金帯" value={getPriceRangeLabel(service)} />
          <DetailMetric label="最安プラン" value={lowestPricePlan.name} />
          <DetailMetric
            label="最小メモリ"
            value={`${lowestPricePlan.memory} GB`}
          />
          <DetailMetric label="プラン数" value={`${service.plans.length}件`} />
        </div>
        <a
          href={outboundUrl}
          rel="noopener noreferrer"
          style={{
            alignItems: "center",
            background: "#3EA8FF",
            borderRadius: 8,
            color: "#ffffff",
            display: "inline-flex",
            fontSize: "1rem",
            fontWeight: 600,
            justifyContent: "center",
            maxWidth: "320px",
            minHeight: 52,
            padding: "0.9rem 1.2rem",
            textDecoration: "none",
            width: "100%",
          }}
          target="_blank"
        >
          公式ページを見る
        </a>
        {service.affiliatePixelUrl ? (
          <img
            alt=""
            height={1}
            src={service.affiliatePixelUrl}
            style={{ border: 0, height: 1, width: 1 }}
            width={1}
          />
        ) : null}
      </section>

      <section>
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>スペック詳細</h2>
          <table style={{ width: "100%" }}>
            <tbody>
              <SpecRow label="サービス名" value={service.name} />
              <SpecRow label="料金帯" value={getPriceRangeLabel(service)} />
              <SpecRow
                label="リージョン"
                value={regionLabels[service.region]}
              />
              <SpecRow label="プラン数" value={`${service.plans.length}件`} />
              <SpecRow
                label="おすすめ用途"
                value={service.usage
                  .map((usage) => usageLabels[usage])
                  .join(" / ")}
              />
            </tbody>
          </table>
        </article>
      </section>

      <section style={{ overflow: "scroll" }}>
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>プラン比較ビュー</h2>
          <div
            style={{
              WebkitOverflowScrolling: "touch",
              display: "grid",
              gap: "1rem",
              gridAutoColumns: "minmax(240px, 1fr)",
              gridAutoFlow: "column",
              maxWidth: "100%",
              overflowX: "auto",
              width: "100%",
            }}
          >
            {service.plans.map((plan) => (
              <article
                key={plan.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  display: "grid",
                  gap: "0.9rem",
                  maxWidth: "320px",
                  minHeight: "100%",
                  minWidth: "240px",
                  padding: "1rem",
                  width: "100%",
                }}
              >
                <div style={{ display: "grid", gap: "0.3rem" }}>
                  <strong style={{ color: "#1a202c", fontSize: "1.05rem" }}>{plan.name}</strong>
                  <span
                    style={{
                      color: "#3EA8FF",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    ¥{plan.price.toLocaleString()}
                  </span>
                </div>
                <div style={{ display: "grid", gap: "0.7rem" }}>
                  <PlanCompareItem label="CPU" value={`${plan.cpu} vCPU`} />
                  <PlanCompareItem label="メモリ" value={`${plan.memory} GB`} />
                  <PlanCompareItem
                    label="ストレージ"
                    value={formatStorageLabel(plan.storage)}
                  />
                  <PlanCompareItem
                    label="転送量"
                    value={formatTrafficLabel(plan.traffic)}
                  />
                  <PlanCompareItem
                    label="課金方式"
                    value={billingLabels[plan.billing]}
                  />
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section
        style={{
          ...responsiveGrid("260px"),
        }}
      >
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>特徴</h2>
          <BulletList items={service.features} />
        </article>
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>メリット / デメリット</h2>
          <h3 style={subTitleStyle}>メリット</h3>
          <BulletList items={service.pros} />
          <h3 style={{ ...subTitleStyle, marginTop: "1rem" }}>デメリット</h3>
          <BulletList items={service.cons} />
        </article>
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>おすすめ用途</h2>
          <BulletList items={service.recommendedFor} />
        </article>
      </section>
    </div>
  )
}

const DetailMetric = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #bee3f8",
      borderRadius: 8,
      display: "grid",
      gap: "0.35rem",
      padding: "0.95rem",
    }}
  >
    <span style={{ color: "#718096", fontSize: "0.82rem" }}>{label}</span>
    <strong style={{ color: "#1a202c", fontSize: "1.2rem" }}>{value}</strong>
  </div>
)

const PlanCompareItem = ({
  label,
  value,
}: {
  label: string
  value: string
}) => (
  <div style={{ display: "grid", gap: "0.15rem" }}>
    <span style={planCompareCellLabelStyle}>{label}</span>
    <strong style={planCompareCellStyle}>{value}</strong>
  </div>
)

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <tr>
    <th
      style={{
        borderBottom: "1px solid #e2e8f0",
        color: "#718096",
        padding: "0.9rem 0",
        textAlign: "left",
        width: "180px",
      }}
    >
      {label}
    </th>
    <td
      style={{
        borderBottom: "1px solid #e2e8f0",
        color: "#1a202c",
        padding: "0.9rem 0",
      }}
    >
      {value}
    </td>
  </tr>
)

const BulletList = ({ items }: { items: string[] }) => (
  <ul
    style={{
      color: "#4a5568",
      display: "grid",
      gap: "0.7rem",
      paddingLeft: "1.2rem",
    }}
  >
    {items.map((item) => (
      <li key={item} style={{ lineHeight: 1.8 }}>
        {item}
      </li>
    ))}
  </ul>
)

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "clamp(0.9rem, 3vw, 1.25rem)",
  maxWidth: "1180px",
}

const panelTitleStyle = {
  color: "#1a202c",
  fontSize: "1.15rem",
  fontWeight: 700,
  marginBottom: "0.9rem",
}

const subTitleStyle = {
  color: "#3EA8FF",
  fontSize: "0.95rem",
  fontWeight: 600,
  marginBottom: "0.7rem",
}

const planCompareCellLabelStyle = {
  color: "#718096",
  fontSize: "0.82rem",
}

const planCompareCellStyle = {
  color: "#1a202c",
  fontSize: "0.95rem",
}

export default VpsDetailPage
