import type { Metadata } from "next"
import Link from "next/link"
import { lastModified } from "../../../lib/site"
import {
  billingLabels,
  formatStorageLabel,
  getAllServices,
  getLowestPricePlan,
} from "../../../lib/vps"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pagePath = "/lp/cheap-vps/"
const pageTitle = "格安VPS比較 | 国内の安いVPSを月額料金・メモリ別に一覧比較"
const pageDescription =
  "国内の格安VPSを最安プランの月額料金順に比較。ConoHa VPS、さくらのVPS、シンVPS、KAGOYA CLOUD VPS、WebARENA Indigoなどの最安値を、メモリ1GB・2GB・4GB別にも整理しています。"
const publishedAt = "2026-10-17T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "国内の安いVPSを最安プラン順に比較。メモリ1GB・2GB・4GB別の最安値もまとめています。",
  path: pagePath,
  keywords: [
    "格安VPS",
    "VPS 安い",
    "VPS 最安",
    "VPS 比較 料金",
    "国内VPS 格安",
    "VPS メモリ 1GB 最安",
    "VPS メモリ 2GB 最安",
  ],
})

// ponytail: 国内のみ。海外は通貨混在(USD/円)のため除外、通貨フィールド追加時に対象拡大
const domesticServices = getAllServices().filter(
  (service) => service.region === "JP"
)

const cheapestByService = domesticServices
  .map((service) => ({ service, plan: getLowestPricePlan(service) }))
  .sort((left, right) => left.plan.price - right.plan.price)

const memoryTiers = [1, 2, 4].map((memory) => {
  const candidates = domesticServices
    .flatMap((service) => {
      const plans = service.plans.filter((plan) => plan.memory >= memory)
      return plans.length
        ? [{ service, plan: getLowestPricePlan({ ...service, plans }) }]
        : []
    })
    .sort((left, right) => left.plan.price - right.plan.price)
  return { memory, top: candidates.slice(0, 3) }
})

const cheapest = cheapestByService[0]
const formatYen = (price: number) => `${price.toLocaleString("ja-JP")}円`
const formatMemory = (memory: number) =>
  memory < 1 ? `${Math.round(memory * 1024)}MB` : `${memory}GB`

const faqs = [
  {
    question: "国内で一番安いVPSはどこですか？",
    answer: `当サイトの掲載データでは、${cheapest.service.name}の${cheapest.plan.name}プラン(${formatYen(cheapest.plan.price)}〜)が最安です。ただし最安プランはメモリが少ないため、用途に合うスペックかを確認してください。`,
  },
  ...memoryTiers.map(({ memory, top }) => ({
    question: `メモリ${memory}GB以上で安いVPSはどれですか？`,
    answer: top[0]
      ? `${top[0].service.name}の${top[0].plan.name}プラン(${formatYen(top[0].plan.price)})が最安です。${top
          .slice(1)
          .map(
            ({ service, plan }) => `${service.name}(${formatYen(plan.price)})`
          )
          .join("、")}も候補になります。`
      : "該当するプランは掲載データにありません。",
  })),
  {
    question: "格安VPSを選ぶときの注意点は？",
    answer:
      "月額料金だけでなく、最低利用期間、初期費用、ストレージ容量、時間課金か月額課金かを確認してください。キャンペーンで実質料金がさらに下がる場合もあります。",
  },
]

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 4 as const,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const cellStyle = {
  borderBottom: "1px solid #e2e8f0",
  padding: "0.7rem 0.6rem",
  textAlign: "left" as const,
  whiteSpace: "nowrap" as const,
}

const CheapVpsPage = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description: pageDescription,
    path: pagePath,
    datePublished: publishedAt,
    dateModified: lastModified,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "格安VPS比較", path: pagePath },
  ])

  const faqJsonLd = buildFaqJsonLd(faqs)

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />

      <section
        style={{
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 4,
          display: "grid",
          gap: "1rem",
          padding: "clamp(1rem, 3vw, 1.6rem)",
        }}
      >
        <nav
          aria-label="パンくず"
          style={{
            color: "#718096",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "0.88rem",
            gap: "0.5rem",
          }}
        >
          <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            ホーム
          </Link>
          <span>/</span>
          <span>格安VPS比較</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 900 }}>
          <h1
            style={{
              color: "#1a202c",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              lineHeight: 1.08,
            }}
          >
            格安VPS比較
            <br />
            国内の安いVPSを料金順にチェック
          </h1>
          <p
            style={{
              color: "#4a5568",
              fontSize: "clamp(1rem, 2.5vw, 1.12rem)",
              lineHeight: 1.85,
              maxWidth: 760,
            }}
          >
            国内VPS {domesticServices.length}
            サービスの最安プランを月額料金順に並べました。最安は
            {cheapest.service.name}の{formatYen(cheapest.plan.price)}
            〜。メモリ1GB・2GB・4GB以上の最安プランも比較できます。
          </p>
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.85rem" }}>
        <h2
          style={{ color: "#1a202c", fontSize: "clamp(1.35rem, 3vw, 1.8rem)" }}
        >
          国内VPS 最安プラン料金ランキング
        </h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr style={{ color: "#718096", fontSize: "0.85rem" }}>
                <th style={cellStyle}>順位</th>
                <th style={cellStyle}>サービス</th>
                <th style={cellStyle}>最安プラン</th>
                <th style={cellStyle}>料金</th>
                <th style={cellStyle}>CPU</th>
                <th style={cellStyle}>メモリ</th>
                <th style={cellStyle}>ストレージ</th>
                <th style={cellStyle}>課金</th>
              </tr>
            </thead>
            <tbody>
              {cheapestByService.map(({ service, plan }, index) => (
                <tr key={service.id}>
                  <td style={cellStyle}>{index + 1}</td>
                  <td style={cellStyle}>
                    <Link
                      href={`/vps/${service.id}/`}
                      style={{ color: "#3EA8FF", textDecoration: "none" }}
                    >
                      {service.name}
                    </Link>
                  </td>
                  <td style={cellStyle}>{plan.name}</td>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>
                    {formatYen(plan.price)}
                  </td>
                  <td style={cellStyle}>{plan.cpu}コア</td>
                  <td style={cellStyle}>{formatMemory(plan.memory)}</td>
                  <td style={cellStyle}>{formatStorageLabel(plan.storage)}</td>
                  <td style={cellStyle}>{billingLabels[plan.billing]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            color: "#1a202c",
            fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
            paddingInline: "0.25rem",
          }}
        >
          メモリ別 最安VPS
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {memoryTiers.map(({ memory, top }) => (
            <article
              key={memory}
              style={{ ...panelStyle, display: "grid", gap: "0.6rem" }}
            >
              <h3 style={{ fontSize: "1.05rem" }}>メモリ{memory}GB以上</h3>
              <ol
                style={{
                  display: "grid",
                  gap: "0.5rem",
                  paddingLeft: "1.2rem",
                }}
              >
                {top.map(({ service, plan }) => (
                  <li
                    key={plan.id}
                    style={{ color: "#4a5568", lineHeight: 1.6 }}
                  >
                    <Link
                      href={`/vps/${service.id}/`}
                      style={{ color: "#3EA8FF", textDecoration: "none" }}
                    >
                      {service.name}
                    </Link>{" "}
                    {plan.name} / {formatYen(plan.price)}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            color: "#1a202c",
            fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
            paddingInline: "0.25rem",
          }}
        >
          よくある質問
        </h2>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          {faqs.map((faq) => (
            <article
              key={faq.question}
              style={{ ...panelStyle, display: "grid", gap: "0.6rem" }}
            >
              <h3 style={{ fontSize: "1rem", lineHeight: 1.45 }}>
                {faq.question}
              </h3>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.75rem" }}>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
          料金は当サイト掲載時点の目安です。申し込み前に各公式サイトの最新料金を確認してください。
        </p>
        <Link
          href="/"
          style={{ color: "#3EA8FF", fontWeight: 600, textDecoration: "none" }}
        >
          VPS比較一覧を見る →
        </Link>
      </section>
    </div>
  )
}

export default CheapVpsPage
