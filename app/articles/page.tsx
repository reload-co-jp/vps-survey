import type { Metadata } from "next"
import Link from "next/link"
import { getAllArticles } from "../../lib/articles"

export const metadata: Metadata = {
  title: "記事一覧",
  description:
    "VPSの選び方、用途別おすすめ、初心者向け解説、実例記事をまとめて読める一覧ページです。",
  alternates: {
    canonical: "/articles/",
  },
  openGraph: {
    title: "記事一覧",
    description:
      "VPSの選び方、用途別おすすめ、初心者向け解説、実例記事をまとめて読める一覧ページです。",
    images: [
      {
        alt: "記事一覧",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "website",
    url: "/articles/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "VPSの選び方、用途別おすすめ、初心者向け解説、実例記事をまとめて読める一覧ページです。",
    images: ["/twitter-image"],
    title: "記事一覧",
  },
}

const ArticlesPage = () => {
  const articles = getAllArticles()

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "記事一覧",
    description:
      "VPSの選び方、用途別おすすめ、初心者向け解説、実例記事をまとめて読める一覧ページです。",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: article.href,
        name: article.title,
      })),
    },
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
    ],
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem", width: "100%" }}>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
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
        <Link href="/" style={{ color: "#3EA8FF", fontSize: "0.9rem", textDecoration: "none" }}>
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
          <span>記事一覧</span>
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
              padding: "0.35rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Articles
          </span>
          <h1 style={{ color: "#1a202c", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2 }}>
            VPSの記事一覧
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            VPSの選び方から、用途別の考え方、初心者向けの基礎、実際の構成例まで、まとめて読める記事一覧です。
          </p>
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        }}
      >
        {articles.map((article) => (
          <article
            key={article.id}
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              display: "grid",
              gap: "0.85rem",
              padding: "clamp(1rem, 3vw, 1.25rem)",
            }}
          >
            <span
              style={{
                background: "#ebf8ff",
                border: "1px solid #bee3f8",
                borderRadius: 999,
                color: "#2b6cb0",
                fontSize: "0.78rem",
                fontWeight: 500,
                padding: "0.35rem 0.65rem",
                width: "fit-content",
              }}
            >
              {article.category}
            </span>
            <h2 style={{ color: "#1a202c", fontSize: "1.1rem", fontWeight: 700, lineHeight: 1.4 }}>
              {article.title}
            </h2>
            <p style={{ color: "#718096", lineHeight: 1.8 }}>
              {article.description}
            </p>
            <Link
              href={article.href}
              style={{
                color: "#3EA8FF",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              記事を読む →
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}

export default ArticlesPage
