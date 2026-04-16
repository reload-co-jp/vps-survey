import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VPSの選び方",
  description:
    "VPSを選ぶときに見るべき価格、CPU、メモリ、ストレージ、リージョン、用途の考え方を初心者向けにまとめた記事です。",
  alternates: {
    canonical: "/articles/vps-choice/",
  },
  openGraph: {
    title: "VPSの選び方",
    description:
      "価格、CPU、メモリ、ストレージ、リージョン、用途からVPSを選ぶポイントを分かりやすく解説します。",
    images: [
      {
        alt: "VPSの選び方",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/vps-choice/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "価格、CPU、メモリ、ストレージ、リージョン、用途からVPSを選ぶポイントを分かりやすく解説します。",
    images: ["/twitter-image"],
    title: "VPSの選び方",
  },
}

const articleSectionStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "clamp(20px, 4vw, 24px)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const VpsChoiceArticlePage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "VPSの選び方",
    description:
      "VPSを選ぶときに見るべき価格、CPU、メモリ、ストレージ、リージョン、用途の考え方を初心者向けにまとめた記事です。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/vps-choice/",
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "VPS比較サイト",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "記事一覧",
        item: "/articles/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "VPSの選び方",
        item: "/articles/vps-choice/",
      },
    ],
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        maxWidth: "100%",
        minWidth: 0,
        width: "100%",
      }}
    >
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        type="application/ld+json"
      />

      <section
        style={{
          background:
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.22), transparent 32%), linear-gradient(135deg, #10203e 0%, #07101f 55%, #040812 100%)",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: "clamp(20px, 4vw, 32px)",
          display: "grid",
          gap: "1rem",
          padding: "clamp(1rem, 3vw, 1.6rem)",
        }}
      >
        <Link href="/" style={{ color: "#9edaff", textDecoration: "none" }}>
          ← 一覧へ戻る
        </Link>
        <nav
          aria-label="パンくず"
          style={{
            color: "#9cb6d8",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "0.88rem",
            gap: "0.5rem",
          }}
        >
          <Link href="/" style={{ color: "#9edaff", textDecoration: "none" }}>
            ホーム
          </Link>
          <span>/</span>
          <Link href="/articles/" style={{ color: "#9edaff", textDecoration: "none" }}>
            記事一覧
          </Link>
          <span>/</span>
          <span>VPSの選び方</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 860 }}>
          <span
            style={{
              background: "rgba(112, 214, 255, 0.14)",
              border: "1px solid rgba(112, 214, 255, 0.25)",
              borderRadius: 999,
              color: "#9ee9ff",
              display: "inline-flex",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "0.45rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            VPS Guide
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            VPSの選び方
          </h1>
          <p style={{ color: "#c9d8f2", lineHeight: 1.9, maxWidth: 760 }}>
            VPSは価格だけで選ぶと、あとからCPU不足やメモリ不足で移行が必要になることがあります。
            最初に見るべき軸を決めておくと、開発用・本番用・検証用のどれでも失敗しにくくなります。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={articleSectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>最初に決めるべき3つのこと</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            まずは「何を動かすか」「どれくらい安定性が必要か」「予算はいくらか」を決めます。
            個人開発の検証なら最安プランから始めやすいですが、本番公開するWebサービスなら、
            突発的なアクセス増にも耐えられる余裕を持った構成が安心です。
          </p>
          <ul style={{ color: "#d9e7f8", display: "grid", gap: "0.65rem", paddingLeft: "1.2rem" }}>
            <li style={{ lineHeight: 1.8 }}>学習や検証なら、まずは低価格帯で十分です。</li>
            <li style={{ lineHeight: 1.8 }}>本番運用なら、国内リージョンと安定性を優先すると失敗しにくいです。</li>
            <li style={{ lineHeight: 1.8 }}>将来的に拡張するなら、上位プランが豊富なサービスを選ぶと移行負担を減らせます。</li>
          </ul>
        </article>

        <article style={articleSectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>価格だけでなくCPU・メモリも見る</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            VPS比較では月額料金が目に入りやすいですが、快適さを左右するのはCPUとメモリです。
            小さなWebサイトなら1〜2GBでも動きますが、Dockerや複数プロセスを動かす開発環境では
            2〜4GBから見たほうが余裕があります。
          </p>
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>1〜2GB帯</strong>
              <p style={miniCardTextStyle}>学習用、軽いブログ、検証用途向け。</p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>2〜4GB帯</strong>
              <p style={miniCardTextStyle}>個人開発、API、管理画面つきサービス向け。</p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>8GB以上</strong>
              <p style={miniCardTextStyle}>本番運用、DB併用、複数コンテナ運用向け。</p>
            </div>
          </div>
        </article>

        <article style={articleSectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>リージョンと用途の相性を考える</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            日本向けサービスなら、まずは国内リージョンのVPSが候補です。表示速度だけでなく、
            サポートや請求の分かりやすさでも有利です。逆に海外ユーザー向けや開発者向けサービスなら、
            海外VPSの選択肢も強くなります。
          </p>
          <ul style={{ color: "#d9e7f8", display: "grid", gap: "0.65rem", paddingLeft: "1.2rem" }}>
            <li style={{ lineHeight: 1.8 }}>国内向けメディアやコーポレートサイトなら国内VPSが無難です。</li>
            <li style={{ lineHeight: 1.8 }}>検証や短期利用なら、時間課金プランがあるサービスが便利です。</li>
            <li style={{ lineHeight: 1.8 }}>海外配信や英語圏向けなら、海外リージョンの豊富さも比較ポイントになります。</li>
          </ul>
        </article>

        <article style={articleSectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>迷ったらこの順で選ぶ</h2>
          <ol style={{ color: "#d9e7f8", display: "grid", gap: "0.75rem", paddingLeft: "1.2rem" }}>
            <li style={{ lineHeight: 1.8 }}>用途を決める: 開発、本番、検証のどれが中心かを決めます。</li>
            <li style={{ lineHeight: 1.8 }}>国内か海外かを決める: 日本向けなら国内を優先します。</li>
            <li style={{ lineHeight: 1.8 }}>最低メモリを決める: 迷ったら2GB以上から比較します。</li>
            <li style={{ lineHeight: 1.8 }}>価格帯で絞る: 上限予算を決めて候補を減らします。</li>
            <li style={{ lineHeight: 1.8 }}>詳細ページで全プランを見る: 将来の拡張余地まで確認します。</li>
          </ol>
        </article>

        <article
          style={{
            ...articleSectionStyle,
            background:
              "linear-gradient(135deg, rgba(123, 225, 255, 0.12), rgba(139, 179, 255, 0.12))",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>比較一覧でチェックするときの見方</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            このサイトでは、価格帯、最安プラン、CPU、メモリ、リージョン、用途で絞り込めます。
            まず国内VPSだけに絞り、次にメモリ2GB以上、最後に価格順で並べると候補がかなり見やすくなります。
          </p>
          <Link
            href="/"
            style={{
              alignItems: "center",
              background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
              borderRadius: 18,
              color: "#031321",
              display: "inline-flex",
              fontSize: "1rem",
              fontWeight: 800,
              justifyContent: "center",
              minHeight: 54,
              padding: "0.9rem 1.1rem",
              textDecoration: "none",
              width: "fit-content",
            }}
          >
            VPS一覧で比較する
          </Link>
        </article>
      </section>
    </div>
  )
}

const miniCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  display: "grid",
  gap: "0.45rem",
  padding: "1rem",
}

const miniCardTextStyle = {
  color: "#b8cce6",
  lineHeight: 1.7,
}

export default VpsChoiceArticlePage
