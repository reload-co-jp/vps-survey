import Link from "next/link"
import type { AffiliatePlacement } from "../lib/analytics"
import {
  formatPrice,
  getCheapestPlanWithMemory,
  getLowestPricePlan,
  type VpsService,
} from "../lib/vps"
import { AffiliateLink } from "./affiliate-link"
import { ServiceIcon } from "./service-icon"
import {
  stickyCellStyle,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  thStyle,
} from "./ui"

type Props = {
  services: VpsService[]
  /** 強調表示するサービス（詳細ページの対象など） */
  highlightId?: string
  /** 比較するメモリ帯 (GB) */
  memoryTiers?: number[]
  /** 並び順の基準にするメモリ帯 (GB) */
  sortByMemory?: number
  placement: AffiliatePlacement
  caption: string
}

/**
 * メモリ帯ごとの最安プランを横並びにした他社比較表。
 * 通貨の異なるサービスを混ぜると比較にならないため、呼び出し側で同一通貨に絞ること。
 */
export const PriceComparisonTable = ({
  services,
  highlightId,
  memoryTiers = [1, 2, 4],
  sortByMemory = 2,
  placement,
  caption,
}: Props) => {
  const rows = services
    .map((service) => ({
      service,
      tiers: memoryTiers.map((memory) =>
        getCheapestPlanWithMemory(service, memory)
      ),
      sortPlan:
        getCheapestPlanWithMemory(service, sortByMemory) ??
        getLowestPricePlan(service),
    }))
    .sort(
      (left, right) =>
        (getCheapestPlanWithMemory(left.service, sortByMemory)?.price ??
          Number.MAX_SAFE_INTEGER) -
        (getCheapestPlanWithMemory(right.service, sortByMemory)?.price ??
          Number.MAX_SAFE_INTEGER)
    )

  return (
    <div style={tableWrapStyle}>
      <table style={tableStyle}>
        <caption
          style={{
            captionSide: "top",
            color: "#64748b",
            fontSize: "0.82rem",
            paddingBottom: "0.5rem",
            textAlign: "left",
          }}
        >
          {caption}
        </caption>
        <thead>
          <tr>
            <th
              scope="col"
              style={{ ...thStyle, ...stickyCellStyle, background: "#f7fafc" }}
            >
              サービス
            </th>
            {memoryTiers.map((memory) => (
              <th key={memory} scope="col" style={thStyle}>
                メモリ{memory}GB以上の最安
              </th>
            ))}
            <th scope="col" style={thStyle}>
              公式サイト
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ service, tiers, sortPlan }) => {
            const isHighlight = service.id === highlightId
            const rowBackground = isHighlight ? "#eff6ff" : "#ffffff"
            return (
              <tr key={service.id} style={{ background: rowBackground }}>
                <th
                  scope="row"
                  style={{
                    ...tdStyle,
                    ...stickyCellStyle,
                    background: rowBackground,
                    fontWeight: isHighlight ? 800 : 600,
                  }}
                >
                  <span
                    style={{
                      alignItems: "center",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <ServiceIcon service={service} size={28} />
                    {isHighlight ? (
                      <span>{service.name}</span>
                    ) : (
                      <Link
                        href={`/vps/${service.id}/`}
                        style={{ color: "#2563eb", textDecoration: "none" }}
                      >
                        {service.name}
                      </Link>
                    )}
                  </span>
                </th>
                {tiers.map((plan, index) => (
                  <td key={memoryTiers[index]} style={tdStyle}>
                    {plan ? (
                      <span style={{ display: "grid", gap: "0.1rem" }}>
                        <strong>{formatPrice(service, plan.price)}</strong>
                        <span style={{ color: "#718096", fontSize: "0.78rem" }}>
                          {plan.name} / {plan.cpu}vCPU
                        </span>
                      </span>
                    ) : (
                      <span style={{ color: "#a0aec0" }}>該当なし</span>
                    )}
                  </td>
                ))}
                <td style={tdStyle}>
                  <AffiliateLink
                    placement={placement}
                    planName={sortPlan.name}
                    service={service}
                    variant="compact"
                  >
                    公式サイトを見る
                  </AffiliateLink>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
