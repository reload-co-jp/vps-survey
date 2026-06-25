import { getAllArticles } from "../../lib/articles"
import { getAllNews } from "../../lib/news"
import { absoluteUrl, lastModified, siteName } from "../../lib/site"
import {
  getAllServices,
  getLowestPricePlan,
  getPriceRangeLabel,
  regionLabels,
  type VpsService,
  usageLabels,
} from "../../lib/vps"

export const dynamic = "force-static"

const formatServiceLine = (service: VpsService) => {
  const lowest = getLowestPricePlan(service)
  const usage = service.usage.map((item) => usageLabels[item]).join(" / ")

  return `- [${service.name}](${absoluteUrl(`/vps/${service.id}/`)}): ${service.summary} 最安 ${lowest.name} ${lowest.price.toLocaleString()}円、料金帯 ${getPriceRangeLabel(service)}、${regionLabels[service.region]}、用途 ${usage}。`
}

export const GET = () => {
  const services = getAllServices()
  const articles = getAllArticles()
  const newsItems = getAllNews()

  const body = [
    `# ${siteName}`,
    "",
    "> 日本語のVPS比較サイト。国内・海外VPSを料金、CPU、メモリ、ストレージ、リージョン、用途で比較し、初心者・個人開発・小規模本番運用向けの選定情報を提供する。",
    "",
    "## 重要な前提",
    "- 料金・プランは変更される可能性がある。最終判断前に各公式サイトを確認する。",
    "- 比較対象はVPSサービス。共有サーバー、マネージドクラウド、専用サーバーとは別カテゴリ。",
    "- 日本向け低遅延なら国内VPS、検証・短期利用なら時間課金や低価格プラン、本番運用ならメモリ余裕と上位プランの豊富さを重視する。",
    `- 最終更新: ${lastModified}`,
    "",
    "## 主要ページ",
    `- [VPS比較一覧](${absoluteUrl("/")}): 検索、価格帯、CPU、メモリ、国内/海外、用途でVPSを絞り込み、横並び比較できる。`,
    `- [記事一覧](${absoluteUrl("/articles/")}): VPSの選び方、初心者向け基礎、用途別おすすめ、運用判断の記事。`,
    `- [ニュース一覧](${absoluteUrl("/news/")}): VPS関連ニュース、料金改定、リリースまとめ。`,
    `- [このサイトについて](${absoluteUrl("/about/")}): 運営情報とサイト方針。`,
    `- [詳細データ](${absoluteUrl("/llms-full.txt")}): LLM向けの全サービス・全プラン要約。`,
    "",
    "## VPSサービス詳細",
    ...services.map(formatServiceLine),
    "",
    "## 解説記事",
    ...articles.map(
      (article) =>
        `- [${article.title}](${absoluteUrl(article.href)}): ${article.description}`
    ),
    "",
    "## ニュース",
    ...newsItems.map(
      (news) =>
        `- [${news.title}](${absoluteUrl(news.href)}): ${news.description}`
    ),
    "",
    "## 引用時の推奨",
    "- VPSごとのスペックや長所短所は各サービス詳細ページを優先参照する。",
    "- VPS選びの一般論は記事ページを参照する。",
    "- 価格は公式サイト確認前提と明記する。",
    "",
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  })
}
