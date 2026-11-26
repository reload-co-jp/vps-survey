import type { CSSProperties, ReactNode } from "react"
import type { AffiliatePlacement } from "../lib/analytics"
import { getOutboundUrl, hasAffiliate, type VpsService } from "../lib/vps"

type Variant = "primary" | "secondary" | "compact" | "text"

type Props = {
  service: VpsService
  placement: AffiliatePlacement
  planName?: string
  variant?: Variant
  children?: ReactNode
  style?: CSSProperties
}

/**
 * 公式サイトへの外部リンク。
 * - URL は data/vps.json の affiliateUrl / officialUrl のみを使う（ソースに直書きしない）
 * - アフィリエイトリンクには rel="sponsored nofollow" を付ける
 * - クリック計測は components/analytics-listener.tsx が data 属性を見て行う
 */
export const AffiliateLink = ({
  service,
  placement,
  planName,
  variant = "primary",
  children,
  style,
}: Props) => {
  const isAffiliate = hasAffiliate(service)
  return (
    <a
      data-affiliate-link-type={isAffiliate ? "affiliate" : "official"}
      data-affiliate-placement={placement}
      data-affiliate-plan={planName}
      data-affiliate-provider={service.id}
      href={getOutboundUrl(service)}
      rel={
        isAffiliate
          ? "sponsored nofollow noopener noreferrer"
          : "noopener noreferrer"
      }
      style={{ ...variantStyles[variant], ...style }}
      target="_blank"
    >
      {children ?? `${service.name}の公式サイトで料金を確認`}
      {variant === "text" ? null : (
        <span aria-hidden="true" style={{ marginLeft: "0.35rem" }}>
          ↗
        </span>
      )}
    </a>
  )
}

/** 1px の A8 インプレッション計測ピクセル。ページ内で 1 回だけ出す */
export const AffiliatePixel = ({ service }: { service: VpsService }) =>
  service.affiliatePixelUrl ? (
    <img
      alt=""
      height={1}
      src={service.affiliatePixelUrl}
      style={{ border: 0, height: 1, position: "absolute", width: 1 }}
      width={1}
    />
  ) : null

/** ステマ規制対応の広告表記 */
export const PrDisclosure = ({ style }: { style?: CSSProperties }) => (
  <p
    style={{
      color: "#64748b",
      fontSize: "0.8rem",
      lineHeight: 1.6,
      ...style,
    }}
  >
    <span
      style={{
        border: "1px solid #cbd5e1",
        borderRadius: 4,
        fontSize: "0.72rem",
        fontWeight: 600,
        marginRight: "0.4rem",
        padding: "0.05rem 0.35rem",
      }}
    >
      PR
    </span>
    本ページには広告（アフィリエイトリンク）が含まれます。リンク先で申し込みがあった場合、当サイトが報酬を受け取ることがあります。料金・スペックは各公式サイトの情報をもとに掲載しています。
  </p>
)

const baseButton: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  display: "inline-flex",
  fontWeight: 700,
  justifyContent: "center",
  lineHeight: 1.4,
  textAlign: "center",
  textDecoration: "none",
}

const variantStyles: Record<Variant, CSSProperties> = {
  primary: {
    ...baseButton,
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    boxShadow: "0 4px 14px rgba(234, 88, 12, 0.25)",
    color: "#ffffff",
    fontSize: "1rem",
    maxWidth: 420,
    minHeight: 52,
    padding: "0.85rem 1.25rem",
    width: "100%",
  },
  secondary: {
    ...baseButton,
    background: "#ffffff",
    border: "2px solid #ea580c",
    color: "#c2410c",
    fontSize: "0.95rem",
    maxWidth: 420,
    minHeight: 48,
    padding: "0.7rem 1.1rem",
    width: "100%",
  },
  compact: {
    ...baseButton,
    background: "#ea580c",
    borderRadius: 6,
    color: "#ffffff",
    fontSize: "0.82rem",
    minHeight: 40,
    padding: "0.5rem 0.75rem",
    whiteSpace: "nowrap",
  },
  text: {
    color: "#c2410c",
    fontWeight: 600,
    textDecoration: "underline",
  },
}
