export type NewsSummary = {
  id: string
  title: string
  description: string
  href: string
  category: string
}

const newsItems: NewsSummary[] = [
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
