export type ArticleSummary = {
  id: string
  title: string
  description: string
  href: string
  category: string
  publishedAt: string
  updatedAt: string
}

const articles: ArticleSummary[] = [
  {
    id: "ssh-security",
    title: "VPSのSSHセキュリティ設定｜公開前にやるべき初期設定",
    description:
      "VPSを契約したら最初に行うSSHの安全設定を解説。鍵認証への切り替え、パスワードログインとrootログインの無効化、ポート制限、fail2banまでを手順つきでまとめます。",
    href: "/articles/ssh-security/",
    category: "サーバー運用",
    publishedAt: "2026-11-26T00:00:00+09:00",
    updatedAt: "2026-11-26T00:00:00+09:00",
  },
  {
    id: "vps-port-open",
    title: "VPSのポート開放方法｜ufw・firewalldの設定と確認手順",
    description:
      "VPSでWebサーバーやゲームサーバーを公開するためのポート開放手順を解説。ufw（Ubuntu/Debian）とfirewalld（RHEL系）のコマンド、事業者側ファイアウォール、開放できているかの確認方法まで。",
    href: "/articles/vps-port-open/",
    category: "ネットワーク",
    publishedAt: "2026-11-26T00:00:00+09:00",
    updatedAt: "2026-11-26T00:00:00+09:00",
  },
  {
    id: "vpn-vs-vps",
    title: "VPNとVPSの違い｜仕組み・用途・組み合わせ方",
    description:
      "名前が似ているVPNとVPSの違いを解説。VPNは通信を暗号化する仕組み、VPSは仮想サーバー。VPSでVPNサーバーを構築する使い方も紹介します。",
    href: "/articles/vpn-vs-vps/",
    category: "ネットワーク",
    publishedAt: "2026-11-26T00:00:00+09:00",
    updatedAt: "2026-11-26T00:00:00+09:00",
  },
  {
    id: "vps-backup",
    title: "VPSのバックアップ方法｜スナップショットと外部保存の使い分け",
    description:
      "VPSのデータを守るバックアップ方法を解説。事業者のスナップショット・自動バックアップ、データベースのダンプ、オブジェクトストレージへの外部保存、復元テストまで。",
    href: "/articles/vps-backup/",
    category: "サーバー運用",
    publishedAt: "2026-11-26T00:00:00+09:00",
    updatedAt: "2026-11-26T00:00:00+09:00",
  },
  {
    id: "vps-price-trend",
    title: "VPS料金の推移と今後の見通し（2026年）",
    description:
      "2026年4〜6月の料金変動データをもとに、値上がりしたVPS・安定したVPS・円安の影響・今後の動向の見通しを整理した記事です。",
    href: "/articles/vps-price-trend/",
    category: "料金動向",
    publishedAt: "2026-06-04T00:00:00+09:00",
    updatedAt: "2026-06-04T00:00:00+09:00",
  },
  {
    id: "what-is-vps",
    title: "VPSとは何か",
    description:
      "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を解説する記事です。",
    href: "/articles/what-is-vps/",
    category: "基礎知識",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "vps-choice",
    title: "VPSの選び方",
    description:
      "価格、CPU、メモリ、ストレージ、リージョン、用途からVPSを選ぶ基本の考え方を整理した記事です。",
    href: "/articles/vps-choice/",
    category: "基礎知識",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "use-case-recommendations",
    title: "用途別おすすめVPS",
    description:
      "開発、本番、検証、社内利用など、使い方ごとにどんなVPSを選ぶとよいかをまとめています。",
    href: "/articles/use-case-recommendations/",
    category: "用途別",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "beginner-guide",
    title: "初心者向けVPS解説",
    description:
      "VPS初心者が最初に知っておきたいこと、よくある失敗、最初のおすすめ構成を分かりやすく解説します。",
    href: "/articles/beginner-guide/",
    category: "初心者向け",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "object-storage",
    title: "オブジェクトストレージとは何か",
    description:
      "オブジェクトストレージの基本、ファイル/ブロックストレージとの違い、VPSと組み合わせる使い方、向いている用途を解説します。",
    href: "/articles/object-storage/",
    category: "基礎知識",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "docker-compose-small-service",
    title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
    description:
      "APIサーバーとDBを同居させる小規模構成を例に、2GBか4GBかをどう判断するかを解説します。",
    href: "/articles/docker-compose-small-service/",
    category: "実例",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
  {
    id: "when-to-scale-up",
    title: "どの状態になったらVPSをスケールアップすべきか",
    description:
      "CPU、メモリ、ディスク、レスポンス時間、運用のしんどさから、増強タイミングを判断する記事です。",
    href: "/articles/when-to-scale-up/",
    category: "運用",
    publishedAt: "2026-04-30T00:00:00+09:00",
    updatedAt: "2026-05-12T00:00:00+09:00",
  },
]

export const getAllArticles = () => articles

export const getArticleById = (id: string) =>
  articles.find((article) => article.id === id)

/** 同じカテゴリを優先し、なければ新しい順で関連記事を返す */
export const getRelatedArticles = (id: string, limit = 3) => {
  const current = getArticleById(id)
  return articles
    .filter((article) => article.id !== id)
    .sort((left, right) => {
      const leftScore = Number(left.category === current?.category)
      const rightScore = Number(right.category === current?.category)
      return (
        rightScore - leftScore ||
        right.publishedAt.localeCompare(left.publishedAt)
      )
    })
    .slice(0, limit)
}
