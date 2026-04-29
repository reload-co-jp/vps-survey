import type { Metadata } from "next"
import Link from "next/link"
import { getAllNews } from "../../lib/news"

export const metadata: Metadata = {
  title: "ニュース一覧",
  description:
    "VPSに関するニュースやリリースまとめを読める一覧ページです。",
  alternates: {
    canonical: "/news/",
  },
  openGraph: {
    title: "ニュース一覧",
    description: "VPSに関するニュースやリリースまとめを読める一覧ページです。",
    images: [
      {
        alt: "ニュース一覧",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "website",
    url: "/news/",
  },
  twitter: {
    card: "summary_large_image",
    description: "VPSに関するニュースやリリースまとめを読める一覧ページです。",
    images: ["/twitter-image"],
    title: "ニュース一覧",
  },
}

const NewsPage = () => {
  const newsItems = getAllNews()

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ニュース一覧",
    description: "VPSに関するニュースやリリースまとめを読める一覧ページです。",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: newsItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.href,
        name: item.title,
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
        name: "ニュース一覧",
        item: "/news/",
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
          <span>ニュース一覧</span>
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
            News
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}>
            VPSのニュース一覧
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            VPSに関するニュースやリリースのまとめを掲載しています。
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
        {newsItems.map((item) => (
          <article
            key={item.id}
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
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 999,
                color: "#718096",
                fontSize: "0.78rem",
                padding: "0.35rem 0.65rem",
                width: "fit-content",
              }}
            >
              {item.category}
            </span>
            <h2 style={{ fontSize: "1.2rem", lineHeight: 1.4 }}>{item.title}</h2>
            <p style={{ color: "#718096", lineHeight: 1.8 }}>{item.description}</p>
            <Link
              href={item.href}
              style={{
                color: "#3EA8FF",
                fontSize: "0.95rem",
                fontWeight: 600,
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              ニュースを読む →
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}

export default NewsPage
