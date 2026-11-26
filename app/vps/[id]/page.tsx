import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  AffiliateLink,
  AffiliatePixel,
  PrDisclosure,
} from "../../../components/affiliate-link"
import { TrackOnMount } from "../../../components/analytics-listener"
import { Breadcrumbs } from "../../../components/breadcrumbs"
import { PriceComparisonTable } from "../../../components/price-comparison-table"
import { ServiceIcon } from "../../../components/service-icon"
import {
  BulletList,
  CtaBox,
  JsonLd,
  Metric,
  Section,
  TableOfContents,
  h1Style,
  h3Style,
  heroStyle,
  leadStyle,
  linkStyle,
  noteStyle,
  pageStackStyle,
  panelStyle,
  responsiveGrid,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  textStyle,
  thStyle,
  type TocItem,
} from "../../../components/ui"
import {
  getProviderContent,
  reputationDisclaimer,
} from "../../../lib/provider-content"
import { absoluteUrl, siteName } from "../../../lib/site"
import {
  billingLabels,
  formatMemoryLabel,
  formatPrice,
  formatPriceCheckedAt,
  formatStorageLabel,
  formatTrafficLabel,
  getActiveCampaigns,
  getAllServices,
  getLowestPricePlan,
  getPriceRangeLabel,
  getServiceById,
  hasAffiliate,
  regionLabels,
  usageLabels,
  type VpsService,
} from "../../../lib/vps"

type Props = {
  params: Promise<{
    id: string
  }>
}

const publishedAt = "2026-05-12T00:00:00+09:00"

export const generateStaticParams = () =>
  getAllServices().map((service) => ({ id: service.id }))

const getSeo = (service: VpsService) => {
  const content = getProviderContent(service.id)
  const lowest = getLowestPricePlan(service)
  const title = content?.seoTitle ?? `${service.name}の料金・評判・スペック比較`
  const description = `${service.name}の料金は月額${formatPrice(service, lowest.price)}から（${formatPriceCheckedAt(service)}確認）。全${service.plans.length}プランのスペック、他社VPSとの料金比較、メリット・デメリット、おすすめ用途を解説します。`
  return { title, description }
}

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

  const { title, description } = getSeo(service)

  return {
    title,
    description,
    keywords: [
      `${service.name} 料金`,
      `${service.name} 評判`,
      `${service.name} スペック`,
      `${service.name} おすすめ`,
      `${service.name} 比較`,
      "VPS 比較",
    ],
    alternates: {
      canonical: `/vps/${service.id}/`,
    },
    openGraph: {
      title,
      description,
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
      description,
      images: [`/vps/${service.id}/twitter-image`],
      title,
    },
  }
}

const VpsDetailPage = async ({ params }: Props) => {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    notFound()
  }

  const content = getProviderContent(service.id)
  const { title, description } = getSeo(service)
  const lowestPricePlan = getLowestPricePlan(service)
  const checkedAt = formatPriceCheckedAt(service)
  const activeCampaigns = getActiveCampaigns(service)
  const allServices = getAllServices()
  const sameCurrencyServices = allServices.filter(
    (item) =>
      item.currency === service.currency && item.region === service.region
  )
  const relatedServices = allServices
    .filter((item) => item.id !== service.id)
    .sort((left, right) => {
      const leftScore =
        Number(left.region === service.region) * 2 +
        left.usage.filter((usage) => service.usage.includes(usage)).length
      const rightScore =
        Number(right.region === service.region) * 2 +
        right.usage.filter((usage) => service.usage.includes(usage)).length

      return rightScore - leftScore || right.popularity - left.popularity
    })
    .slice(0, 3)

  const billingTypes =
    content?.billingLabel ??
    [...new Set(service.plans.map((plan) => billingLabels[plan.billing]))].join(
      " / "
    )
  const maxMemory = Math.max(...service.plans.map((plan) => plan.memory))

  const useCaseGuide = (content?.useCaseGuide ?? [])
    .map((guide) => ({
      ...guide,
      plan: service.plans.find((plan) => plan.id === guide.planId),
    }))
    .filter((guide) => guide.plan)

  const faqs = [
    ...(content?.faqs ?? []),
    {
      question: `${service.name}はどんな用途に向いていますか？`,
      answer: `${service.summary} 主なおすすめ用途は${service.recommendedFor.join("、")}です。`,
    },
    {
      question: `${service.name}の注意点は何ですか？`,
      answer: `${service.cons.join("、")}。申し込み前に公式サイトで最新の仕様を確認してください。`,
    },
  ]

  const toc: TocItem[] = [
    { id: "features", label: `${service.name}の特徴・おすすめポイント` },
    { id: "pricing", label: "料金プラン一覧・スペック比較" },
    ...(content?.sections ?? []).map((section, index) => ({
      id: `topic-${index + 1}`,
      label: section.heading,
    })),
    { id: "campaign", label: "キャンペーン情報" },
    { id: "compare", label: "他社VPSとの料金比較" },
    { id: "pros-cons", label: "メリット・デメリット" },
    { id: "reputation", label: "評判を確認するときのポイント" },
    { id: "users", label: "おすすめできる人・できない人" },
    ...(useCaseGuide.length
      ? [{ id: "use-cases", label: "用途別のおすすめプラン" }]
      : []),
    { id: "faq", label: "よくある質問" },
    { id: "related", label: "関連サービス・関連ページ" },
  ]

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: service.name,
    description: service.summary,
    url: absoluteUrl(`/vps/${service.id}/`),
    image: absoluteUrl(`/vps/${service.id}/opengraph-image`),
    category: "VPS",
    sameAs: service.officialUrl,
    brand: {
      "@type": "Brand",
      name: service.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: service.currency,
      lowPrice: lowestPricePlan.price,
      highPrice: Math.max(...service.plans.map((plan) => plan.price)),
      offerCount: service.plans.length,
      url: service.officialUrl,
    },
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }

  const dateModified = [content?.updatedAt, service.priceCheckedAt]
    .filter(Boolean)
    .sort()
    .reverse()[0]

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ja",
    datePublished: publishedAt,
    dateModified: `${dateModified}T00:00:00+09:00`,
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/vps/${service.id}/`),
  }

  return (
    <div style={pageStackStyle}>
      <JsonLd data={productJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <TrackOnMount
        name="provider_detail_view"
        params={{
          provider_name: service.id,
          page_path: `/vps/${service.id}/`,
        }}
      />

      <section style={{ ...heroStyle, position: "relative" }}>
        <Breadcrumbs
          items={[{ name: service.name, path: `/vps/${service.id}/` }]}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {service.tags.map((tag) => (
            <span
              key={tag}
              style={{
                background: "#ffffff",
                border: "1px solid #bee3f8",
                borderRadius: 999,
                color: "#2b6cb0",
                fontSize: "0.8rem",
                padding: "0.3rem 0.65rem",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: "0.8rem" }}>
          <ServiceIcon service={service} size={48} />
          <h1 style={h1Style}>
            {content?.h1 ?? `${service.name}の料金・評判`}
          </h1>
        </div>
        <p style={leadStyle}>{content?.lead ?? service.summary}</p>
        <div style={{ ...responsiveGrid("150px"), gap: "0.75rem" }}>
          <Metric
            label="最安料金（月額）"
            value={`${formatPrice(service, lowestPricePlan.price)}〜`}
          />
          <Metric label="プラン数" value={`${service.plans.length}件`} />
          <Metric label="最大メモリ" value={formatMemoryLabel(maxMemory)} />
          <Metric label="課金方式" value={billingTypes} />
          <Metric label="リージョン" value={regionLabels[service.region]} />
        </div>
        <p style={noteStyle}>
          料金確認日：{checkedAt}（各公式サイトの料金ページを確認）
          {service.currency === "USD" ? "・料金は米ドル表記" : ""}
          {content?.operator ? `・提供：${content.operator}` : ""}
        </p>
        <AffiliateLink
          placement="article_top"
          planName={lowestPricePlan.name}
          service={service}
        >
          {service.name}の公式サイトで料金を確認
        </AffiliateLink>
        {hasAffiliate(service) ? <PrDisclosure /> : null}
        <AffiliatePixel service={service} />
      </section>

      <TableOfContents items={toc} />

      <Section id="features" title={`${service.name}の特徴・おすすめポイント`}>
        <p style={textStyle}>{service.summary}</p>
        <BulletList items={service.features} marker="check" />
      </Section>

      <Section
        id="pricing"
        title={`${service.name}の料金プラン一覧・スペック比較`}
      >
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <caption
              style={{
                captionSide: "top",
                ...noteStyle,
                paddingBottom: "0.5rem",
                textAlign: "left",
              }}
            >
              {service.name}の全{service.plans.length}プラン（{checkedAt}確認）
            </caption>
            <thead>
              <tr>
                <th scope="col" style={thStyle}>
                  プラン
                </th>
                <th scope="col" style={thStyle}>
                  月額料金
                </th>
                <th scope="col" style={thStyle}>
                  CPU
                </th>
                <th scope="col" style={thStyle}>
                  メモリ
                </th>
                <th scope="col" style={thStyle}>
                  ストレージ
                </th>
                <th scope="col" style={thStyle}>
                  転送量
                </th>
                <th scope="col" style={thStyle}>
                  課金方式
                </th>
              </tr>
            </thead>
            <tbody>
              {service.plans.map((plan) => (
                <tr key={plan.id}>
                  <th scope="row" style={{ ...tdStyle, fontWeight: 600 }}>
                    {plan.name}
                  </th>
                  <td style={{ ...tdStyle, color: "#c2410c", fontWeight: 700 }}>
                    {formatPrice(service, plan.price)}
                  </td>
                  <td style={tdStyle}>{plan.cpu} vCPU</td>
                  <td style={tdStyle}>{formatMemoryLabel(plan.memory)}</td>
                  <td style={tdStyle}>{formatStorageLabel(plan.storage)}</td>
                  <td style={tdStyle}>{formatTrafficLabel(plan.traffic)}</td>
                  <td style={tdStyle}>
                    {content?.billingLabel ?? billingLabels[plan.billing]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={noteStyle}>
          料金は当サイトが{checkedAt}
          時点で確認した公式サイトの掲載額です。契約期間・支払い方法・キャンペーンにより実際の支払額は変わる場合があります。
        </p>
        <CtaBox note="リンク先：公式サイトの料金・プランページ">
          <AffiliateLink
            placement="pricing_table"
            planName={lowestPricePlan.name}
            service={service}
          >
            公式サイトで最新の料金プランを確認
          </AffiliateLink>
        </CtaBox>
      </Section>

      {(content?.sections ?? []).map((section, index) => (
        <Section
          id={`topic-${index + 1}`}
          key={section.heading}
          title={section.heading}
        >
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} style={textStyle}>
              {paragraph}
            </p>
          ))}
          {service.id === "conoha" && index === 0 ? (
            <Link href="/lp/conoha/" style={linkStyle}>
              ConoHa VPS完全ガイドを読む →
            </Link>
          ) : null}
        </Section>
      ))}

      <Section id="campaign" title={`${service.name}のキャンペーン情報`}>
        {activeCampaigns.length ? (
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {activeCampaigns.map((campaign) => (
              <article
                key={campaign.title}
                style={{
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                  borderRadius: 8,
                  display: "grid",
                  gap: "0.4rem",
                  padding: "0.9rem",
                }}
              >
                <h3 style={h3Style}>{campaign.title}</h3>
                <p style={textStyle}>{campaign.description}</p>
                <p style={noteStyle}>
                  期間：{campaign.startDate}〜{campaign.endDate}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p style={textStyle}>
            {checkedAt}
            時点で当サイトが確認できた開催中のキャンペーンはありません。終了したキャンペーンは掲載していません。キャンペーンは不定期に実施されるため、最新情報は公式サイトで確認してください。
          </p>
        )}
      </Section>

      <Section id="compare" title={`${service.name}と他社VPSの料金比較`}>
        <p style={textStyle}>
          {regionLabels[service.region]}
          VPSの中から、同じメモリ容量で選べる最安プランを並べました。
          {service.name}
          の行を青で強調しています。メモリ2GB帯の料金が安い順です。
        </p>
        <PriceComparisonTable
          caption={`メモリ帯別の最安プラン（${regionLabels[service.region]}VPS・月額）`}
          highlightId={service.id}
          placement="comparison_table"
          services={sameCurrencyServices}
        />
        <p style={noteStyle}>
          各社の料金確認日は詳細ページに記載しています。料金体系（時間課金・日額課金・長期契約割引など）が異なるため、最終的な金額は各公式サイトで確認してください。
        </p>
        <p>
          <Link href="/" style={linkStyle}>
            条件を指定して全サービスを比較する →
          </Link>
        </p>
      </Section>

      <Section id="pros-cons" title={`${service.name}のメリット・デメリット`}>
        <div style={responsiveGrid("260px")}>
          <div
            style={{ display: "grid", gap: "0.6rem", alignContent: "start" }}
          >
            <h3 style={{ ...h3Style, color: "#15803d" }}>メリット</h3>
            <BulletList items={service.pros} marker="check" />
          </div>
          <div
            style={{ display: "grid", gap: "0.6rem", alignContent: "start" }}
          >
            <h3 style={{ ...h3Style, color: "#b91c1c" }}>デメリット・注意点</h3>
            <BulletList items={service.cons} marker="cross" />
          </div>
        </div>
        <CtaBox>
          <AffiliateLink
            placement="article_middle"
            planName={lowestPricePlan.name}
            service={service}
            variant="secondary"
          >
            {service.name}のプラン詳細を見る（公式）
          </AffiliateLink>
        </CtaBox>
      </Section>

      <Section
        id="reputation"
        title={`${service.name}の評判を確認するときのポイント`}
      >
        <p style={textStyle}>{reputationDisclaimer}</p>
        <ul
          style={{
            ...textStyle,
            display: "grid",
            gap: "0.4rem",
            paddingLeft: "1.2rem",
          }}
        >
          <li>
            料金：最安プランは{lowestPricePlan.name}で月額
            {formatPrice(service, lowestPricePlan.price)}。料金帯は
            {getPriceRangeLabel(service)}です。
          </li>
          <li>
            プランの幅：全{service.plans.length}プラン、最大メモリ
            {formatMemoryLabel(maxMemory)}まで選べます。
          </li>
          <li>課金方式：{billingTypes}</li>
          <li>
            向いている用途：
            {service.usage.map((usage) => usageLabels[usage]).join("・")}
          </li>
        </ul>
      </Section>

      <Section
        id="users"
        title={`${service.name}がおすすめできる人・できない人`}
      >
        <div style={responsiveGrid("260px")}>
          <div
            style={{ display: "grid", gap: "0.6rem", alignContent: "start" }}
          >
            <h3 style={h3Style}>おすすめできる人</h3>
            <BulletList
              items={service.recommendedFor.map(
                (item) => `${item}に使いたい人`
              )}
              marker="check"
            />
          </div>
          <div
            style={{ display: "grid", gap: "0.6rem", alignContent: "start" }}
          >
            <h3 style={h3Style}>おすすめできない人</h3>
            <BulletList
              items={
                content?.notRecommendedFor ??
                service.cons.map((item) => `「${item}」が気になる人`)
              }
              marker="cross"
            />
          </div>
        </div>
      </Section>

      {useCaseGuide.length ? (
        <Section id="use-cases" title={`用途別の${service.name}おすすめプラン`}>
          <div style={responsiveGrid("240px")}>
            {useCaseGuide.map(({ useCase, plan, reason }) =>
              plan ? (
                <article
                  key={useCase}
                  style={{
                    background: "#f7fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    display: "grid",
                    gap: "0.45rem",
                    padding: "0.9rem",
                  }}
                >
                  <h3 style={h3Style}>{useCase}</h3>
                  <p style={{ color: "#c2410c", fontWeight: 700 }}>
                    {plan.name}（{formatPrice(service, plan.price)}/月）
                  </p>
                  <p style={noteStyle}>
                    {plan.cpu}vCPU / {formatMemoryLabel(plan.memory)} /{" "}
                    {formatStorageLabel(plan.storage)}
                  </p>
                  <p style={{ ...textStyle, fontSize: "0.92rem" }}>{reason}</p>
                </article>
              ) : null
            )}
          </div>
          <p style={noteStyle}>
            用途ごとの必要スペックの考え方は
            <Link href="/use-cases/" style={linkStyle}>
              用途別VPS比較
            </Link>
            で解説しています。
          </p>
        </Section>
      ) : null}

      <Section id="faq" title={`${service.name}のよくある質問`}>
        <div style={{ display: "grid", gap: "1rem" }}>
          {faqs.map((faq) => (
            <div key={faq.question} style={{ display: "grid", gap: "0.35rem" }}>
              <h3 style={h3Style}>Q. {faq.question}</h3>
              <p style={textStyle}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="related"
        title={`${service.name}と比較したいVPS・関連ページ`}
      >
        <div style={responsiveGrid("220px")}>
          {relatedServices.map((item) => {
            const plan = getLowestPricePlan(item)

            return (
              <Link
                href={`/vps/${item.id}/`}
                key={item.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  color: "#1a202c",
                  display: "grid",
                  gap: "0.45rem",
                  padding: "1rem",
                  textDecoration: "none",
                }}
              >
                <span
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <ServiceIcon service={item} size={32} />
                  <strong style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                    {item.name}の料金・スペック
                  </strong>
                </span>
                <span
                  style={{
                    color: "#4a5568",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}
                >
                  月額{formatPrice(item, plan.price)}から /{" "}
                  {regionLabels[item.region]} /{" "}
                  {item.usage.map((usage) => usageLabels[usage]).join("・")}
                </span>
              </Link>
            )
          })}
        </div>
        {content?.relatedLinks.length ? (
          <ul style={{ display: "grid", gap: "0.4rem", paddingLeft: "1.2rem" }}>
            {content.relatedLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} style={linkStyle}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      <section
        style={{ ...panelStyle, justifyItems: "center", textAlign: "center" }}
      >
        <p style={{ ...h3Style, fontSize: "1.1rem" }}>
          {service.name}の最新料金・申し込み条件は公式サイトで
        </p>
        <AffiliateLink
          placement="article_bottom"
          planName={lowestPricePlan.name}
          service={service}
        >
          {service.name}の公式サイトで料金を確認
        </AffiliateLink>
        <Link href="/" style={linkStyle}>
          他のVPSと比較する →
        </Link>
      </section>
    </div>
  )
}

export default VpsDetailPage
