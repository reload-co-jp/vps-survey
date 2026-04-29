import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VPSとは何か",
  description:
    "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を分かりやすく解説する記事です。",
  alternates: {
    canonical: "/articles/what-is-vps/",
  },
  openGraph: {
    title: "VPSとは何か",
    description:
      "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を分かりやすく解説する記事です。",
    images: [
      {
        alt: "VPSとは何か",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/what-is-vps/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を分かりやすく解説する記事です。",
    images: ["/twitter-image"],
    title: "VPSとは何か",
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

const WhatIsVpsPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "VPSとは何か",
    description:
      "VPSの基本、共有サーバーやクラウドとの違い、メリット・デメリット、向いている用途を分かりやすく解説する記事です。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/what-is-vps/",
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
        name: "VPSとは何か",
        item: "/articles/what-is-vps/",
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
          <span>VPSとは何か</span>
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
            Basic Guide
          </span>
          <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2, color: "#1a202c" }}>
            VPSとは何か
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            VPS は Virtual Private Server の略で、1台の物理サーバーを仮想的に分けて使う仕組みです。
            共有サーバーより自由度が高く、専用サーバーより低コストで始めやすいのが特徴です。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSの基本</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            VPS は、サーバーのCPU、メモリ、ストレージの一部を専有に近い形で使えるサービスです。
            Linux を自由に設定でき、アプリやDB、Webサーバーを自分で構成できるため、
            個人開発から本番運用まで幅広く使われています。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>共有サーバーとの違い</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            共有サーバーは手軽ですが、使えるソフトや設定に制約があります。
            VPS はその制約が少なく、自由に環境を作れるのが大きな違いです。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>共有サーバーは簡単、VPS は自由度が高いです。</li>
            <li style={itemStyle}>VPS は Docker や独自アプリ、DB を動かしやすいです。</li>
            <li style={itemStyle}>そのぶん、VPS では運用やセキュリティ管理も自分で行います。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>クラウドとの違い</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            AWS や Google Cloud のようなクラウドは機能が非常に豊富ですが、
            最初は構成や料金が複雑に感じることがあります。VPS はもっとシンプルで、
            1台のサーバーを借りる感覚で始めやすいのが魅力です。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSのメリット</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>比較的安く、自由なサーバー環境を作れます。</li>
            <li style={itemStyle}>Docker、Node.js、Python、PostgreSQL などを自由に動かせます。</li>
            <li style={itemStyle}>小規模サービスや学習用途にちょうどよいです。</li>
            <li style={itemStyle}>共有サーバーから一歩進んだ運用を学びやすいです。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSのデメリット</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>OS更新、セキュリティ設定、バックアップを自分で考える必要があります。</li>
            <li style={itemStyle}>障害対応や監視の責任が増えます。</li>
            <li style={itemStyle}>大規模サービスになると、単体のVPSでは足りなくなることがあります。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>どんな用途に向いているか</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            VPS は、個人開発、社内ツール、MVP、学習用サーバー、小規模な本番サービスに向いています。
            WordPress のような定番CMSだけでなく、API サーバーや Docker Compose を使う構成とも相性がよいです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>最初はどのくらいのプランを選ぶか</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            最初の1台なら、国内VPSの1〜2GB帯から始める人が多いです。Docker やDB を使うなら2GB以上、
            本番公開するなら4GB前後も候補になります。大事なのは、今の用途だけでなく上位プランへの伸び方も見ることです。
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background: "#eef6ff",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>実際に比較するときの見方</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            まずは国内か海外か、次に価格帯、メモリ、用途で絞ると候補を整理しやすいです。
            そのあと詳細ページで全プランを見れば、将来の拡張も含めて判断できます。
          </p>
          <Link href="/" style={buttonStyle}>
            VPS一覧で比較する
          </Link>
        </article>
      </section>
    </div>
  )
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

export default WhatIsVpsPage
