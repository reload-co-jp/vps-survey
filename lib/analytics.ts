// GA4 イベント送信ユーティリティ
// gtag 本体は app/layout.tsx で本番のみ読み込む。ここではタグを追加せず、
// 読み込み済みの window.gtag にイベントを渡すだけにする（二重設置防止）。

export type AffiliatePlacement =
  | "comparison_table"
  | "article_top"
  | "article_middle"
  | "article_bottom"
  | "pricing_table"
  | "floating_cta"
  | "service_card"
  | "campaign"

export type AffiliateLinkType = "affiliate" | "official"

type EventParams = Record<string, string | number | boolean | undefined>

type Gtag = (command: "event", name: string, params?: EventParams) => void

declare global {
  interface Window {
    gtag?: Gtag
  }
}

const isDebugMode = () => {
  try {
    return new URLSearchParams(window.location.search).has("ga_debug")
  } catch {
    return false
  }
}

/**
 * GA4 にイベントを送る。gtag 未読み込み（開発環境・広告ブロッカー）なら何もしない。
 * URL に ?ga_debug=1 を付けると debug_mode を付与し、DebugView で確認できる。
 */
export const trackEvent = (name: string, params: EventParams = {}) => {
  if (typeof window === "undefined") return

  const payload: EventParams = isDebugMode()
    ? { ...params, debug_mode: true }
    : params

  if (process.env.NODE_ENV !== "production") {
    console.debug("[ga4]", name, payload)
  }

  window.gtag?.("event", name, payload)
}
