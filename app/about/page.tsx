import type { Metadata } from "next"
import Link from "next/link"

const companyUrl = "https://reload.co.jp/"

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "VPS比較サイトの目的、掲載内容、運営会社について案内するページです。",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: "このサイトについて",
    description:
      "VPS比較サイトの目的、掲載内容、運営会社について案内するページです。",
    images: [
      {
        alt: "このサイトについて",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "website",
    url: "/about/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "VPS比較サイトの目的、掲載内容、運営会社について案内するページです。",
    images: ["/twitter-image"],
    title: "このサイトについて",
  },
}

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 4,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const AboutPage = () => {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "このサイトについて",
    description:
      "VPS比較サイトの目的、掲載内容、運営会社について案内するページです。",
    inLanguage: "ja",
    mainEntityOfPage: "/about/",
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
        name: "このサイトについて",
        item: "/about/",
      },
    ],
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
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
          borderRadius: 4,
          display: "grid",
          gap: "1rem",
          padding: "clamp(1rem, 3vw, 1.6rem)",
        }}
      >
        <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
          ← ホームへ戻る
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
          <span>このサイトについて</span>
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
            About
          </span>
          <h1
            style={{
              color: "#1a202c",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            このサイトについて
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            VPS比較サイトは、国内・海外のVPSを価格、スペック、リージョン、用途などの観点から比較しやすくするための情報サイトです。
            VPS選びで迷いやすいポイントを整理し、一覧比較と記事の両方から判断しやすい導線を用意しています。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>このサイトで扱っている内容</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            VPSサービスの比較一覧、各サービスの詳細情報、初心者向けの基礎記事、運用や選び方に関する記事を掲載しています。
            価格やプラン、特徴をできるだけ横断的に見られるようにし、個人開発から小規模本番まで判断しやすい形を目指しています。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>運営会社</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            本サイトの運営会社は <strong>Reload, Inc.</strong> です。
          </p>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            会社サイト:
            {" "}
            <a
              href={companyUrl}
              rel="noopener noreferrer"
              style={{ color: "#3EA8FF", textDecoration: "none" }}
              target="_blank"
            >
              {companyUrl}
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>掲載情報について</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            掲載内容はできるだけ分かりやすく整理していますが、最新の料金や仕様、キャンペーン、提供条件などは変更される場合があります。
            実際の申込み前には、必ず各公式サイトの最新情報も確認してください。
          </p>
        </article>
      </section>
    </div>
  )
}

export default AboutPage
