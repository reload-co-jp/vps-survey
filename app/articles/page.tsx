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
          <span>記事一覧</span>
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
            Articles
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.05 }}>
            VPSの記事一覧
          </h1>
          <p style={{ color: "#c9d8f2", lineHeight: 1.9, maxWidth: 760 }}>
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
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "clamp(2px, 1vw, 4px)",
              display: "grid",
              gap: "0.85rem",
              padding: "clamp(1rem, 3vw, 1.25rem)",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 999,
                color: "#bcd1eb",
                fontSize: "0.78rem",
                padding: "0.35rem 0.65rem",
                width: "fit-content",
              }}
            >
              {article.category}
            </span>
            <h2 style={{ fontSize: "1.2rem", lineHeight: 1.4 }}>
              {article.title}
            </h2>
            <p style={{ color: "#afc3dd", lineHeight: 1.8 }}>
              {article.description}
            </p>
            <Link
              href={article.href}
              style={{
                color: "#9edaff",
                fontSize: "0.95rem",
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
