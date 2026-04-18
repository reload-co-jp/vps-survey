import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "PR TIMES発のVPSニュースまとめ",
  description:
    "PR TIMESに掲載されたVPS関連のリリースから、注目しやすい動きをニュース記事として分かりやすく整理したまとめです。",
  alternates: {
    canonical: "/news/prtimes-vps/",
  },
  openGraph: {
    title: "PR TIMES発のVPSニュースまとめ",
    description:
      "PR TIMESに掲載されたVPS関連のリリースから、注目しやすい動きをニュース記事として分かりやすく整理したまとめです。",
    images: [
      {
        alt: "PR TIMES発のVPSニュースまとめ",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/news/prtimes-vps/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "PR TIMESに掲載されたVPS関連のリリースから、注目しやすい動きをニュース記事として分かりやすく整理したまとめです。",
    images: ["/twitter-image"],
    title: "PR TIMES発のVPSニュースまとめ",
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

const sourceLinkStyle = {
  color: "#9edaff",
  textDecoration: "none",
}

const PrtimesVpsNewsPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "PR TIMES発のVPSニュースまとめ",
    description:
      "PR TIMESに掲載されたVPS関連のリリースから、注目しやすい動きをニュース記事として分かりやすく整理したまとめです。",
    inLanguage: "ja",
    mainEntityOfPage: "/news/prtimes-vps/",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "PR TIMES発のVPSニュースまとめ",
        item: "/news/prtimes-vps/",
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
          <Link href="/news/" style={{ color: "#9edaff", textDecoration: "none" }}>
            ニュース一覧
          </Link>
          <span>/</span>
          <span>PR TIMES発のVPSニュースまとめ</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 920 }}>
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
            News
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}>
            PR TIMES発のVPSニュースまとめ
          </h1>
          <p style={{ color: "#c9d8f2", lineHeight: 1.9, maxWidth: 820 }}>
            PR TIMESで公開されているVPS関連リリースの中から、最近の動きとして注目しやすい話題を整理しました。
            ここでは2026年3月6日、2026年3月17日、2026年3月18日の3件をニュースとしてまとめています。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>
            2026年3月18日: NHN テコラスが「Forwardy ビジネスVPS」を提供開始
          </h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            NHN テコラスは、AWS をパッケージ型で使いやすくする新サービスとして
            「Forwardy ビジネスVPS」を発表しました。リリースの主眼は、
            専任エンジニアがいない中堅・中小企業でも、専用サーバーの感覚に近い形で
            AWS を使いやすくすることにあります。
          </p>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            VPS比較の観点では、単なる価格勝負ではなく、「クラウドの中身を隠して運用しやすくする」
            方向の提案が出てきた点がニュースです。今後は、VPS とクラウドの中間のような立ち位置の
            サービスが増える流れも見えます。
          </p>
          <p style={{ color: "#b8cce6", lineHeight: 1.8 }}>
            出典:{" "}
            <a
              href="https://prtimes.jp/main/html/rd/p/000000107.000045365.html"
              rel="noopener noreferrer nofollow"
              style={sourceLinkStyle}
              target="_blank"
            >
              NHN テコラス、専用サーバー感覚で AWS を利用できる「Forwardy ビジネスVPS」を提供開始
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>
            2026年3月17日: ConoHa VPS byGMO が「KUSANAGI」の上位エディションを提供開始
          </h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            GMOインターネットは、ConoHa VPS byGMO 上で、GMOプライム・ストラテジーの
            「KUSANAGI」の上位エディションを提供開始しました。高速CMS実行環境を、
            ライセンス込みで使いやすくしたのがポイントです。
          </p>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            これは VPS を単なるサーバーとして売るだけでなく、WordPress やCMS運用を
            すぐ始めやすい「用途特化型」の提供へ広げる動きとして見られます。
            初心者や事業者にとっては、構築難易度を下げつつ高速実行環境を利用しやすくなる点が魅力です。
          </p>
          <p style={{ color: "#b8cce6", lineHeight: 1.8 }}>
            出典:{" "}
            <a
              href="https://www.prime-strategy.co.jp/information/conoha-vps-kusanagi-editions/"
              rel="noopener noreferrer nofollow"
              style={sourceLinkStyle}
              target="_blank"
            >
              GMOインターネットの『ConoHa VPS byGMO』、GMOプライム・ストラテジーと協業し、「KUSANAGI」の上位エディションの提供を開始
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>
            2026年3月6日: ConoHa VPS byGMO が「Terraform ConoHa VPS Provider」を提供開始
          </h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            GMOインターネットは、ConoHa VPS byGMO 向けに Terraform プロバイダーを提供開始しました。
            これにより、手作業で行っていたサーバーやネットワーク設定をコードで管理しやすくなります。
          </p>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            ニュースとして重要なのは、国内VPSでも IaC の流れがさらに強まっていることです。
            これまでクラウド寄りと思われていた Terraform 運用が、国内VPSの比較ポイントにも入り始めたと見られます。
            開発チームや複数環境を持つサービスでは、再現性と自動化の面で価値が大きい動きです。
          </p>
          <p style={{ color: "#b8cce6", lineHeight: 1.8 }}>
            出典:{" "}
            <a
              href="https://prtimes.jp/main/html/rd/p/000005270.000000136.html"
              rel="noopener noreferrer nofollow"
              style={sourceLinkStyle}
              target="_blank"
            >
              GMOインターネットの『ConoHa VPS byGMO』「Terraform ConoHa VPS Provider」を提供開始
            </a>
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background:
              "linear-gradient(135deg, rgba(123, 225, 255, 0.12), rgba(139, 179, 255, 0.12))",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>今回のまとめ</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            直近のPR TIMESを見ると、VPS市場は単純な価格競争だけでなく、
            「クラウドの使いやすさ」「用途特化」「IaC対応」の方向に広がっていることが分かります。
            VPS比較でも、今後は価格やメモリに加えて、運用自動化や用途特化の機能まで含めて見る価値が高まりそうです。
          </p>
          <Link href="/news/" style={buttonStyle}>
            ニュース一覧を見る
          </Link>
        </article>
      </section>
    </div>
  )
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

export default PrtimesVpsNewsPage
