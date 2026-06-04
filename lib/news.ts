export type NewsSummary = {
  id: string
  title: string
  description: string
  href: string
  category: string
}

const newsItems: NewsSummary[] = [
  {
    id: "vps-price-update-2026-06",
    title: "VPS料金改定まとめ（2026年6月）",
    description:
      "クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linodeで料金改定を確認。変更前後の価格と影響をまとめました。",
    href: "/news/vps-price-update-2026-06/",
    category: "料金改定",
  },
  {
    id: "prtimes-vps",
    title: "PR TIMES発のVPSニュースまとめ",
    description:
      "PR TIMESに掲載されたVPS関連リリースから、最近の注目トピックをニュースとして整理したまとめです。",
    href: "/news/prtimes-vps/",
    category: "リリースまとめ",
  },
]

export const getAllNews = () => newsItems
