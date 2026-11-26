"use client"

import { useEffect } from "react"
import { trackEvent } from "../lib/analytics"

// 比較・検討ページとして扱うパス
const comparePathPattern = /^\/($|vps\/|lp\/|use-cases\/|storage\/)/
// 技術記事・ニュースなど「読み物」側のパス
const articlePathPattern = /^\/(articles|news)\//

/**
 * サイト全体のクリックを委譲で監視し、以下の GA4 イベントを送る。
 * - affiliate_click: data-affiliate-provider を持つリンク
 * - article_to_compare: 記事ページから比較・サービスページへの内部遷移
 *
 * サーバーコンポーネントのリンクにも data 属性だけで計測を付けられるよう、
 * 個々のリンクに onClick を書かずここで一元処理する。
 */
export const AnalyticsListener = () => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // 左クリックと中クリック（新規タブ）のみ対象
      if (event.button !== 0 && event.button !== 1) return

      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest("a")
      if (!anchor) return

      const pagePath = window.location.pathname
      const { dataset } = anchor

      if (dataset.affiliateProvider) {
        trackEvent("affiliate_click", {
          provider_name: dataset.affiliateProvider,
          page_path: pagePath,
          placement: dataset.affiliatePlacement ?? "unknown",
          plan_name: dataset.affiliatePlan ?? "",
          link_type: dataset.affiliateLinkType ?? "affiliate",
        })
        return
      }

      if (!articlePathPattern.test(pagePath)) return

      let destination: URL
      try {
        destination = new URL(anchor.href, window.location.href)
      } catch {
        return
      }

      if (
        destination.origin === window.location.origin &&
        comparePathPattern.test(destination.pathname)
      ) {
        trackEvent("article_to_compare", {
          page_path: pagePath,
          destination_path: destination.pathname,
        })
      }
    }

    document.addEventListener("click", handleClick, { capture: true })
    document.addEventListener("auxclick", handleClick, { capture: true })

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
      document.removeEventListener("auxclick", handleClick, { capture: true })
    }
  }, [])

  return null
}

/** マウント時に 1 回だけイベントを送る（provider_detail_view など） */
export const TrackOnMount = ({
  name,
  params,
}: {
  name: string
  params: Record<string, string | number>
}) => {
  const serialized = JSON.stringify(params)

  useEffect(() => {
    trackEvent(name, JSON.parse(serialized) as Record<string, string | number>)
  }, [name, serialized])

  return null
}
