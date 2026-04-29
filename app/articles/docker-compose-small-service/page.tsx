import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
  description:
    "Docker ComposeでAPIサーバーとDBを立てる小規模Webサービスを例に、必要なVPSスペックと選び方を具体的に解説します。",
  alternates: {
    canonical: "/articles/docker-compose-small-service/",
  },
  openGraph: {
    title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
    description:
      "APIサーバーとDBをDocker Composeで動かす構成を例に、必要なメモリ、CPU、ストレージの考え方を解説します。",
    images: [
      {
        alt: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/docker-compose-small-service/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "APIサーバーとDBをDocker Composeで動かす構成を例に、必要なメモリ、CPU、ストレージの考え方を解説します。",
    images: ["/twitter-image"],
    title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
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

const codeStyle = {
  background: "#f7fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 4,
  color: "#2d3748",
  fontFamily: "monospace",
  fontSize: "0.92rem",
  lineHeight: 1.7,
  overflowX: "auto" as const,
  padding: "1rem",
  whiteSpace: "pre-wrap" as const,
}

const DockerComposeSmallServicePage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
    description:
      "Docker ComposeでAPIサーバーとDBを立てる小規模Webサービスを例に、必要なVPSスペックと選び方を具体的に解説します。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/docker-compose-small-service/",
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
        name: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
        item: "/articles/docker-compose-small-service/",
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
          <span>Docker Composeで小規模Webサービスを動かすときのVPS選び</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 900 }}>
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
            Practical Example
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}>
            Docker ComposeでDBとAPIを立てる
            <br />
            小規模WebサービスのVPS選び
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 820 }}>
            FastAPIやNode.jsのAPIサーバーとPostgreSQLをDocker Composeでまとめて立てる、
            小規模Webサービスを例にします。実際にどのくらいのメモリが必要か、2GBで足りるのか、
            4GBにしたほうがよいのかを具体的に考えます。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>想定する構成</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            ここでは、APIサーバー1つ、DB1つ、必要ならNginxかCaddyを1つ置く構成を想定します。
            いわゆるMVPや小規模な社内ツール、予約フォーム、会員制サイトの初期構成に近いです。
          </p>
          <div style={codeStyle}>
            {`services:
  app:
    build: .
    ports:
      - "8000:8000"
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
  web:
    image: nginx:alpine
    ports:
      - "80:80"

volumes:
  db-data:`}
          </div>
          <p style={{ color: "#718096", lineHeight: 1.8 }}>
            実際には Redis やワーカーを足すこともありますが、まずはこの最小構成で考えると必要スペックが分かりやすいです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>2GBで足りるか</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            結論から言うと、2GBでも動くケースはあります。ただし、Dockerデーモン、
            APIアプリ、PostgreSQL、OSのキャッシュを全部同居させるので、余裕はかなり少なめです。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>アクセスが少ないMVPや社内ツールなら2GBでも始められます。</li>
            <li style={itemStyle}>DBのメモリ使用量が増えると、すぐに窮屈になります。</li>
            <li style={itemStyle}>CIや追加コンテナを同居させるなら、2GBは厳しくなりやすいです。</li>
          </ul>
          <p style={{ color: "#718096", lineHeight: 1.8 }}>
            個人開発の初期リリースなら2GBから始めて、監視しながら4GBへ上げる考え方は十分現実的です。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>最初から4GBを選ぶと安心なケース</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            小規模でも、管理画面、バッチ処理、画像処理、メール送信、監視エージェントなどが入ると
            コンテナ数は増えます。そうなると4GBの安心感がかなり大きいです。
          </p>
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>2GB向き</strong>
              <p style={miniCardTextStyle}>
                個人開発のMVP、少人数利用、API + DBだけの最小構成。
              </p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>4GB向き</strong>
              <p style={miniCardTextStyle}>
                管理画面あり、バッチあり、複数コンテナあり、本番公開前提。
              </p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>8GB以上向き</strong>
              <p style={miniCardTextStyle}>
                DB負荷が高い、Redis併用、大きめの本番運用。
              </p>
            </div>
          </div>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>CPUより先にメモリを見る</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            この構成では、最初に不足しやすいのはCPUよりメモリです。APIの処理が重くない限り、
            小規模サービスでは2〜3 vCPUでも足りることが多いです。一方でメモリ不足はコンテナ再起動や
            体感速度の低下につながりやすいので、まずはメモリ帯で比較するほうが失敗しにくいです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>ディスクはSSD/NVMeと容量の両方を見る</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            DBを同居させるなら、ストレージ性能も大事です。ログ、DBデータ、Dockerイメージ、
            バックアップを考えると、50GBより100GBあるほうがかなり安心です。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>MVPでも 50GB は早めに埋まることがあります。</li>
            <li style={itemStyle}>DBを持つなら 100GB 以上あると運用しやすいです。</li>
            <li style={itemStyle}>NVMe表記があるプランは、体感の安心感が高いです。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>このケースならどんなVPSを選ぶか</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            日本向けの小規模Webサービスなら、国内リージョン、2GB〜4GB、できればNVMe SSD、
            将来的に8GB以上へ素直に拡張できるサービスがおすすめです。初期費用を抑えたいなら2GB、
            本番で最初から安定性を取りたいなら4GBから見るのが分かりやすいです。
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background: "#eef6ff",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>比較一覧で候補を絞るなら</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            まず国内VPSに絞り、最小メモリを2GB以上にして、価格順または人気順で並べると候補を探しやすいです。
            そのあと詳細ページでプランの伸び方を見れば、2GBから始めるか4GBから始めるか判断しやすくなります。
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

export default DockerComposeSmallServicePage
