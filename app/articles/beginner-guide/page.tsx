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
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "clamp(2px, 1vw, 4px)",
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
          background:
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.22), transparent 32%), linear-gradient(135deg, #173052 0%, #0d1c31 55%, #09111d 100%)",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: "clamp(2px, 1vw, 4px)",
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
          <span>初心者向けVPS解説</span>
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
              fontWeight: 600,
              letterSpacing: "0.08em",
              padding: "0.45rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Beginner Guide
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            初心者向けVPS解説
          </h1>
          <p style={{ color: "#c9d8f2", lineHeight: 1.9, maxWidth: 760 }}>
            VPSは自由度が高い反面、最初は「どのプランを選べばいいか」「共有サーバーと何が違うのか」で迷いやすいです。
            最初に押さえるポイントだけ理解すれば、必要以上に怖がる必要はありません。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSとは何か</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            VPSは、1台の物理サーバーを仮想的に分けて使うサーバーです。共有サーバーより自由度が高く、
            専用サーバーより安く始められるので、個人開発や小規模本番に向いています。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>初心者が最初に選ぶならこの構成</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
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
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            最初は「国内」「2GB以上」「人気順」くらいで絞ると見やすいです。
            そのあと詳細ページで、プランの伸び方や上位プランの価格差を見ると将来の判断もしやすくなります。
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background:
              "linear-gradient(135deg, rgba(123, 225, 255, 0.12), rgba(139, 179, 255, 0.12))",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>最初の1台を探す</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
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
  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 4,
  display: "grid",
  gap: "0.45rem",
  padding: "1rem",
}

const miniCardTextStyle = {
  color: "#b8cce6",
  lineHeight: 1.7,
}

const listStyle = {
  color: "#d9e7f8",
  display: "grid",
  gap: "0.65rem",
  paddingLeft: "1.2rem",
}

const itemStyle = {
  lineHeight: 1.8,
}

const buttonStyle = {
  alignItems: "center",
  background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
  borderRadius: 4,
  color: "#031321",
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
