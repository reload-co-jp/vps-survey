export type ArticleSummary = {
  id: string
  title: string
  description: string
  href: string
  category: string
}

const articles: ArticleSummary[] = [
  {
    id: "what-is-vps",
    title: "VPSとは何か",
    description:
      "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を解説する記事です。",
    href: "/articles/what-is-vps/",
    category: "基礎知識",
  },
  {
    id: "vps-choice",
    title: "VPSの選び方",
    description:
      "価格、CPU、メモリ、ストレージ、リージョン、用途からVPSを選ぶ基本の考え方を整理した記事です。",
    href: "/articles/vps-choice/",
    category: "基礎知識",
  },
  {
    id: "use-case-recommendations",
    title: "用途別おすすめVPS",
    description:
      "開発、本番、検証、社内利用など、使い方ごとにどんなVPSを選ぶとよいかをまとめています。",
    href: "/articles/use-case-recommendations/",
    category: "用途別",
  },
  {
    id: "beginner-guide",
    title: "初心者向けVPS解説",
    description:
      "VPS初心者が最初に知っておきたいこと、よくある失敗、最初のおすすめ構成を分かりやすく解説します。",
    href: "/articles/beginner-guide/",
    category: "初心者向け",
  },
  {
    id: "docker-compose-small-service",
    title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
    description:
      "APIサーバーとDBを同居させる小規模構成を例に、2GBか4GBかをどう判断するかを解説します。",
    href: "/articles/docker-compose-small-service/",
    category: "実例",
  },
  {
    id: "when-to-scale-up",
    title: "どの状態になったらVPSをスケールアップすべきか",
    description:
      "CPU、メモリ、ディスク、レスポンス時間、運用のしんどさから、増強タイミングを判断する記事です。",
    href: "/articles/when-to-scale-up/",
    category: "運用",
  },
]

export const getAllArticles = () => articles
