import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  billingLabels,
  getAllServices,
  getLowestPricePlan,
  getPriceRangeLabel,
  getServiceById,
  regionLabels,
  usageLabels,
} from "../../../lib/vps"

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
      url: `/vps/${service.id}/`,
      type: "article",
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
    <div style={{ display: "grid", gap: "1.5rem" }}>
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
          background:
            "linear-gradient(135deg, rgba(111, 225, 255, 0.16), rgba(122, 141, 255, 0.12), rgba(255,255,255,0.03))",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 28,
          display: "grid",
          gap: "1rem",
          padding: "1.5rem",
        }}
      >
        <Link href="/" style={{ color: "#9edaff", textDecoration: "none" }}>
          ← 一覧へ戻る
        </Link>
        <div style={{ display: "grid", gap: "0.7rem" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {service.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 999,
                  color: "#bfeeff",
                  fontSize: "0.82rem",
                  padding: "0.35rem 0.7rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{ fontSize: "clamp(2rem, 4vw, 3.6rem)", lineHeight: 1.05 }}
          >
            {service.name}
          </h1>
          <p style={{ color: "#c7d8ef", lineHeight: 1.8, maxWidth: 760 }}>
            {service.summary}
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
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
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "2fr 1fr",
        }}
      >
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>スペック詳細</h2>
          <table style={{ width: "100%" }}>
            <tbody>
              <SpecRow label="サービス名" value={service.name} />
              <SpecRow label="料金帯" value={getPriceRangeLabel(service)} />
              <SpecRow label="最安プラン" value={lowestPricePlan.name} />
              <SpecRow label="最小CPU" value={`${lowestPricePlan.cpu} vCPU`} />
              <SpecRow
                label="最小メモリ"
                value={`${lowestPricePlan.memory} GB`}
              />
              <SpecRow
                label="最小ストレージ"
                value={`${lowestPricePlan.storage} GB`}
              />
              <SpecRow label="転送量" value={lowestPricePlan.traffic} />
              <SpecRow
                label="リージョン"
                value={regionLabels[service.region]}
              />
              <SpecRow
                label="課金方式"
                value={billingLabels[lowestPricePlan.billing]}
              />
              <SpecRow
                label="おすすめ用途"
                value={service.usage
                  .map((usage) => usageLabels[usage])
                  .join(" / ")}
              />
            </tbody>
          </table>
        </article>

        <aside style={panelStyle}>
          <h2 style={panelTitleStyle}>CTA</h2>
          <p
            style={{ color: "#aec4df", lineHeight: 1.8, marginBottom: "1rem" }}
          >
            公式サイトで最新の価格や仕様を確認して、実際のプラン選定に進めます。
          </p>
          <a
            href={service.officialUrl}
            rel="noreferrer"
            style={ctaStyle}
            target="_blank"
          >
            公式サイトを見る
          </a>
        </aside>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        }}
      >
        <article style={panelStyle}>
          <h2 style={panelTitleStyle}>プラン一覧</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 640, width: "100%" }}>
              <thead>
                <tr>
                  {[
                    "プラン名",
                    "料金",
                    "CPU",
                    "メモリ",
                    "ストレージ",
                    "転送量",
                    "課金方式",
                  ].map((label) => (
                    <th key={label} style={planHeadStyle}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {service.plans.map((plan) => (
                  <tr key={plan.id}>
                    <td style={planCellStyle}>{plan.name}</td>
                    <td style={planCellStyle}>
                      ¥{plan.price.toLocaleString()}
                    </td>
                    <td style={planCellStyle}>{plan.cpu} vCPU</td>
                    <td style={planCellStyle}>{plan.memory} GB</td>
                    <td style={planCellStyle}>{plan.storage} GB</td>
                    <td style={planCellStyle}>{plan.traffic}</td>
                    <td style={planCellStyle}>{billingLabels[plan.billing]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
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
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 18,
      display: "grid",
      gap: "0.35rem",
      padding: "0.95rem",
    }}
  >
    <span style={{ color: "#9cb5d6", fontSize: "0.82rem" }}>{label}</span>
    <strong style={{ fontSize: "1.2rem" }}>{value}</strong>
  </div>
)

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <tr>
    <th
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        color: "#a7bfdc",
        padding: "0.9rem 0",
        textAlign: "left",
        width: "180px",
      }}
    >
      {label}
    </th>
    <td
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
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
      color: "#d9e7f8",
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
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 24,
  padding: "1.25rem",
}

const panelTitleStyle = {
  fontSize: "1.25rem",
  marginBottom: "0.9rem",
}

const subTitleStyle = {
  color: "#9bdaf7",
  fontSize: "1rem",
  marginBottom: "0.7rem",
}

const ctaStyle = {
  background: "linear-gradient(135deg, #75efff, #9ca8ff)",
  borderRadius: 999,
  color: "#04111f",
  display: "inline-flex",
  fontWeight: 800,
  padding: "0.85rem 1.15rem",
  textDecoration: "none",
}

const planHeadStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "#9db7d5",
  fontSize: "0.82rem",
  padding: "0.8rem 0",
  textAlign: "left" as const,
}

const planCellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "0.85rem 0",
}

export default VpsDetailPage
