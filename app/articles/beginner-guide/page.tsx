import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "初心者向けVPS解説",
  description:
    "VPS初心者が最初に知っておきたい基礎知識、選び方、よくある失敗、最初のおすすめ構成を分かりやすく解説した記事です。",
  alternates: {
    canonical: "/articles/beginner-guide/",
  },
  openGraph: {
    title: "初心者向けVPS解説",
    description:
      "VPS初心者が最初に知っておきたい基礎知識、選び方、よくある失敗、最初のおすすめ構成を分かりやすく解説した記事です。",
    images: [
      {
        alt: "初心者向けVPS解説",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/beginner-guide/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "VPS初心者が最初に知っておきたい基礎知識、選び方、よくある失敗、最初のおすすめ構成を分かりやすく解説した記事です。",
    images: ["/twitter-image"],
    title: "初心者向けVPS解説",
  },
}

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const BeginnerGuidePage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "初心者向けVPS解説",
    description:
      "VPS初心者が最初に知っておきたい基礎知識、選び方、よくある失敗、最初のおすすめ構成を分かりやすく解説した記事です。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/beginner-guide/",
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
        name: "初心者向けVPS解説",
        item: "/articles/beginner-guide/",
      },
    ],
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
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
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 12,
          display: "grid",
          gap: "1rem",
          padding: "clamp(1rem, 3vw, 1.6rem)",
        }}
      >
        <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
          ← 一覧へ戻る
        </Link>
        <nav
          aria-label="パンくず"
          style={{
            color: "#718096",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "0.88rem",
            gap: "0.5rem",
          }}
        >
          <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            ホーム
          </Link>
          <span>/</span>
          <Link href="/articles/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            記事一覧
          </Link>
          <span>/</span>
          <span>初心者向けVPS解説</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 860 }}>
          <span
            style={{
              background: "#ebf8ff",
              border: "1px solid #bee3f8",
              borderRadius: 999,
              color: "#2b6cb0",
              display: "inline-flex",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "0.45rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Beginner Guide
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}>
            初心者向けVPS解説
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            VPSは自由度が高い反面、最初は「どのプランを選べばいいか」「共有サーバーと何が違うのか」で迷いやすいです。
            最初に押さえるポイントだけ理解すれば、必要以上に怖がる必要はありません。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSとは何か</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            VPSは、1台の物理サーバーを仮想的に分けて使うサーバーです。共有サーバーより自由度が高く、
            専用サーバーより安く始められるので、個人開発や小規模本番に向いています。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>初心者が最初に選ぶならこの構成</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            迷ったら、国内VPSの2GB前後、月額固定、管理画面が分かりやすいサービスから始めるのが安全です。
            WordPress、軽いAPI、学習用Linux環境ならこの帯で十分なことが多いです。
          </p>
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>メモリ</strong>
              <p style={miniCardTextStyle}>2GB前後を最初の目安にします。</p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>リージョン</strong>
              <p style={miniCardTextStyle}>日本向けなら国内リージョンを選びます。</p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>料金</strong>
              <p style={miniCardTextStyle}>まずは月額固定で分かりやすいものがおすすめです。</p>
            </div>
          </div>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>初心者がよくある失敗</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>最安だけで選んでメモリ不足になる。</li>
            <li style={itemStyle}>海外リージョンを選んで、日本向けサイトの表示速度が落ちる。</li>
            <li style={itemStyle}>時間課金を使いっぱなしにして、思ったより請求が増える。</li>
            <li style={itemStyle}>最初から大きすぎるプランを選び、料金だけ高くなる。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>まずは比較一覧でここを見る</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            最初は「国内」「2GB以上」「人気順」くらいで絞ると見やすいです。
            そのあと詳細ページで、プランの伸び方や上位プランの価格差を見ると将来の判断もしやすくなります。
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background: "#eef6ff",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>最初の1台を探す</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            まずは一覧で価格帯とメモリを絞って、気になるサービスの詳細ページを見比べるのがおすすめです。
          </p>
          <Link href="/" style={buttonStyle}>
            VPS一覧で比較する
          </Link>
        </article>
      </section>
    </div>
  )
}

const miniCardStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 4,
  display: "grid",
  gap: "0.45rem",
  padding: "1rem",
}

const miniCardTextStyle = {
  color: "#718096",
  lineHeight: 1.7,
}

const listStyle = {
  color: "#4a5568",
  display: "grid",
  gap: "0.65rem",
  paddingLeft: "1.2rem",
}

const itemStyle = {
  lineHeight: 1.8,
}

const buttonStyle = {
  alignItems: "center",
  background: "#3EA8FF",
  borderRadius: 4,
  color: "#ffffff",
  display: "inline-flex",
  fontSize: "1rem",
  fontWeight: 600,
  justifyContent: "center",
  minHeight: 54,
  padding: "0.9rem 1.1rem",
  textDecoration: "none",
  width: "fit-content",
}

export default BeginnerGuidePage
