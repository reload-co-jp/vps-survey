import Link from "next/link"
import type { ReactNode } from "react"
import type { BreadcrumbItem } from "./breadcrumbs"
import { AffiliateLink, PrDisclosure } from "./affiliate-link"
import { Breadcrumbs } from "./breadcrumbs"
import { RelatedContent, type RelatedLink } from "./related-content"
import { ServiceIcon } from "./service-icon"
import {
  JsonLd,
  Section,
  h1Style,
  heroStyle,
  leadStyle,
  linkStyle,
  noteStyle,
  pageStackStyle,
  stickyCellStyle,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  textStyle,
  thStyle,
} from "./ui"
import { absoluteUrl } from "../lib/site"
import {
  billingLabels,
  formatMemoryLabel,
  formatPrice,
  formatPriceCheckedAt,
  formatStorageLabel,
  type VpsPlan,
  type VpsService,
} from "../lib/vps"

export type FilteredRow = {
  service: VpsService
  plan: VpsPlan
}

type Props = {
  path: string
  breadcrumbs: BreadcrumbItem[]
  h1: string
  lead: ReactNode
  tableTitle: string
  tableCaption: string
  rows: FilteredRow[]
  /** 表の上に置く解説セクション */
  beforeTable?: ReactNode
  /** 表の下に置く解説セクション */
  children?: ReactNode
  related: RelatedLink[]
}

/**
 * 条件別の比較ページ（国内VPS・海外VPS・メモリ別など）の共通テンプレート。
 * 検索需要のある条件だけ固定URLで用意し、フィルタの全組み合わせは作らない。
 */
export const FilteredVpsPage = ({
  path,
  breadcrumbs,
  h1,
  lead,
  tableTitle,
  tableCaption,
  rows,
  beforeTable,
  children,
  related,
}: Props) => {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tableTitle,
    url: absoluteUrl(path),
    itemListElement: rows.map(({ service }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.name,
      url: absoluteUrl(`/vps/${service.id}/`),
    })),
  }

  return (
    <div style={pageStackStyle}>
      <JsonLd data={itemListJsonLd} />
      <section style={heroStyle}>
        <Breadcrumbs items={breadcrumbs} />
        <h1 style={h1Style}>{h1}</h1>
        <div style={leadStyle}>{lead}</div>
        <PrDisclosure />
      </section>

      {beforeTable}

      <Section id="table" title={tableTitle}>
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
              {tableCaption}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    ...thStyle,
                    ...stickyCellStyle,
                    background: "#f7fafc",
                  }}
                >
                  サービス
                </th>
                <th scope="col" style={thStyle}>
                  対象プラン
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
                  課金
                </th>
                <th scope="col" style={thStyle}>
                  料金確認日
                </th>
                <th scope="col" style={thStyle}>
                  公式サイト
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ service, plan }) => (
                <tr key={service.id}>
                  <th scope="row" style={{ ...tdStyle, ...stickyCellStyle }}>
                    <span
                      style={{
                        alignItems: "center",
                        display: "flex",
                        gap: "0.5rem",
                      }}
                    >
                      <ServiceIcon service={service} size={28} />
                      <Link
                        href={`/vps/${service.id}/`}
                        style={{ color: "#2563eb", textDecoration: "none" }}
                      >
                        {service.name}
                      </Link>
                    </span>
                  </th>
                  <td style={tdStyle}>{plan.name}</td>
                  <td style={{ ...tdStyle, color: "#c2410c", fontWeight: 700 }}>
                    {formatPrice(service, plan.price)}
                  </td>
                  <td style={tdStyle}>{plan.cpu} vCPU</td>
                  <td style={tdStyle}>{formatMemoryLabel(plan.memory)}</td>
                  <td style={tdStyle}>{formatStorageLabel(plan.storage)}</td>
                  <td style={tdStyle}>{billingLabels[plan.billing]}</td>
                  <td
                    style={{ ...tdStyle, color: "#718096", fontSize: "0.8rem" }}
                  >
                    {formatPriceCheckedAt(service)}
                  </td>
                  <td style={tdStyle}>
                    <AffiliateLink
                      placement="comparison_table"
                      planName={plan.name}
                      service={service}
                      variant="compact"
                    >
                      公式で料金を確認
                    </AffiliateLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={noteStyle}>
          料金は各公式サイトの掲載額を確認日時点で転記したものです。契約期間・支払い方法・キャンペーンで実際の金額は変わります。
        </p>
        <p style={textStyle}>
          <Link href="/" style={linkStyle}>
            価格帯・CPU・用途で絞り込んで比較する →
          </Link>
        </p>
      </Section>

      {children}

      <RelatedContent links={related} />
    </div>
  )
}
