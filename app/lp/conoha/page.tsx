import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle = "2026年版 ConoHa VPS完全ガイド | 初めてのVPSに迷ったら定番の国内VPS"
const pageDescription =
  "ConoHa VPSは月460円から使える初心者向け国内VPS。管理画面のわかりやすさ・時間課金・充実サポートの特徴を徹底解説します。"
const publishedAt = "2026-04-18T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "月460円から・時間課金あり・管理画面わかりやすい。ConoHa VPSの料金・スペック・特徴を詳しく解説します。",
  path: "/lp/conoha/",
  keywords: [
    "ConoHa VPS",
    "ConoHa VPS おすすめ",
    "ConoHa VPS 料金",
    "国内VPS おすすめ",
    "初心者 VPS",
    "ConoHa VPS 評判",
    "ConoHa VPS 比較",
  ],
})

const affiliateUrl =
  "https://px.a8.net/svt/ejp?a8mat=4B1MHK+CTEYLU+50+4Z5JN6"
const affiliatePixelUrl =
  "https://www12.a8.net/0.gif?a8mat=4B1MHK+CTEYLU+50+4Z5JN6"

const plans = [
  { name: "512MB", price: 460, cpu: 1, memory: 0.5, storage: 30 },
  { name: "1GB", price: 763, cpu: 2, memory: 1, storage: 100 },
  { name: "2GB", price: 1144, cpu: 3, memory: 2, storage: 100 },
  { name: "4GB", price: 2189, cpu: 4, memory: 4, storage: 100 },
  { name: "12GB", price: 4302, cpu: 6, memory: 12, storage: 100 },
  { name: "24GB", price: 9552, cpu: 8, memory: 24, storage: 100 },
  { name: "48GB", price: 21658, cpu: 12, memory: 48, storage: 100 },
  { name: "96GB", price: 43315, cpu: 24, memory: 96, storage: 100 },
  { name: "128GB", price: 64820, cpu: 40, memory: 128, storage: 100 },
]

const faqs = [
  {
    question: "ConoHa VPSは初心者でも使いやすいですか？",
    answer:
      "使いやすいです。サーバー作成画面やOSテンプレートの選択が分かりやすく、初めてVPSを契約する人でも迷いにくい構成になっています。",
  },
  {
    question: "ConoHa VPSはどんな用途に向いていますか？",
    answer:
      "個人開発、ポートフォリオ公開、小規模なWebアプリ運用、検証環境の構築に向いています。時間課金があるため短期の試用にも使いやすいです。",
  },
  {
    question: "ConoHa VPSの注意点はありますか？",
    answer:
      "最安特化のVPSと比べると価格は少し高めです。また海外リージョン重視の用途には向きにくいため、国内向け運用を前提に選ぶのが相性のよい使い方です。",
  },
]

const CtaButton = ({ label = "ConoHa VPSを見てみる" }: { label?: string }) => (
  <a
    href={affiliateUrl}
    rel="noopener noreferrer"
    style={{
      alignItems: "center",
      background: "#3EA8FF",
      borderRadius: 4,
      color: "#ffffff",
      display: "inline-flex",
      fontSize: "1.05rem",
      fontWeight: 600,
      justifyContent: "center",
      minHeight: 58,
      padding: "1rem 1.4rem",
      textDecoration: "none",
      width: "fit-content",
    }}
    target="_blank"
  >
    {label} →
  </a>
)

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12 as const,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const ConohaLpPage = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description: "ConoHa VPSの料金・スペック・メリット・おすすめ用途を徹底解説します。",
    path: "/lp/conoha/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "ConoHa VPSおすすめガイド", path: "/lp/conoha/" },
  ])

  const faqJsonLd = buildFaqJsonLd(faqs)

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
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        type="application/ld+json"
      />

      {/* Hero */}
      <section
        style={{
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 12,
          display: "grid",
          gap: "1.2rem",
          padding: "clamp(1.2rem, 4vw, 2rem)",
        }}
      >
        <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
          ← VPS一覧へ戻る
        </Link>
        <div style={{ display: "grid", gap: "1rem", maxWidth: 860 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["初心者向け", "表示が分かりやすい", "国内向け"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#ffffff",
                  borderRadius: 999,
                  color: "#2b6cb0",
                  fontSize: "0.82rem",
                  padding: "0.35rem 0.7rem",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <h1
            style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", lineHeight: 1.05 }}
          >
            2026年版・初めてのVPSに
            <br />
            迷ったらConoHa VPS
          </h1>
          <p
            style={{
              color: "#4a5568",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.85,
              maxWidth: 680,
            }}
          >
            月460円から使える国内定番VPS。管理画面のわかりやすさと時間課金の柔軟さで、
            VPS初心者から個人開発・小規模本番運用まで幅広く選ばれています。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
            maxWidth: 600,
          }}
        >
          {[
            { label: "最安プラン", value: "¥460 / 月" },
            { label: "最大メモリ", value: "128 GB" },
            { label: "課金方式", value: "時間 / 月額" },
            { label: "転送量", value: "無制限" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 4,
                display: "grid",
                gap: "0.3rem",
                padding: "0.9rem",
              }}
            >
              <span style={{ color: "#718096", fontSize: "0.8rem" }}>
                {label}
              </span>
              <strong style={{ fontSize: "1.15rem" }}>{value}</strong>
            </div>
          ))}
        </div>
        <CtaButton label="ConoHa VPS公式ページを見る" />
      </section>

      {/* Why ConoHa */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            paddingInline: "0.25rem",
          }}
        >
          ConoHaが初心者に選ばれ続ける3つの理由
        </h2>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {[
            {
              num: "01",
              title: "管理画面が国内トップクラスにわかりやすい",
              body: "サーバー作成からOS選択・SSH鍵設定まで、迷わずできる設計。VPS初心者が「最初に使うサービス」として選ぶ理由のひとつです。",
            },
            {
              num: "02",
              title: "時間課金と月額課金を選べる柔軟さ",
              body: "検証や短期利用は時間課金、長期運用は月額課金と使い分けられます。試してから本番移行という流れが自然に組めます。",
            },
            {
              num: "03",
              title: "国内リージョンで低遅延・安心の日本語サポート",
              body: "東京・大阪リージョンを選択可能。日本語のサポートと明快な料金体系で、国内向けWebサービスの運用に迷いなく使えます。",
            },
          ].map(({ num, title, body }) => (
            <article
              key={num}
              style={{
                ...panelStyle,
                display: "grid",
                gap: "0.8rem",
              }}
            >
              <span
                style={{
                  color: "#2b6cb0",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                {num}
              </span>
              <h3 style={{ fontSize: "1.1rem", lineHeight: 1.4 }}>{title}</h3>
              <p style={{ color: "#718096", lineHeight: 1.85 }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              paddingInline: "0.25rem",
            }}
          >
            月460円から。ConoHaのプラン一覧
          </h2>
          <p
            style={{
              color: "#718096",
              fontSize: "0.9rem",
              marginTop: "0.4rem",
              paddingInline: "0.25rem",
            }}
          >
            512MBの入門プランから128GBの大規模プランまで、用途に応じて選べます。
          </p>
        </div>
        <div
          style={{
            WebkitOverflowScrolling: "touch" as const,
            display: "grid",
            gap: "0.85rem",
            gridAutoColumns: "minmax(200px, 1fr)",
            gridAutoFlow: "column" as const,
            overflowX: "auto",
          }}
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 4,
                display: "grid",
                gap: "0.85rem",
                minWidth: "200px",
                padding: "1rem",
              }}
            >
              <div style={{ display: "grid", gap: "0.2rem" }}>
                <strong style={{ fontSize: "0.95rem" }}>{plan.name}</strong>
                <span
                  style={{
                    color: "#3EA8FF",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                  }}
                >
                  ¥{plan.price.toLocaleString()}
                  <span style={{ fontSize: "0.78rem", fontWeight: 400 }}>
                    /月
                  </span>
                </span>
              </div>
              <div style={{ display: "grid", gap: "0.55rem" }}>
                {[
                  { label: "CPU", value: `${plan.cpu} vCPU` },
                  { label: "メモリ", value: `${plan.memory} GB` },
                  { label: "SSD", value: `${plan.storage} GB` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "grid", gap: "0.1rem" }}>
                    <span style={{ color: "#718096", fontSize: "0.78rem" }}>
                      {label}
                    </span>
                    <strong style={{ color: "#1a202c", fontSize: "0.9rem" }}>
                      {value}
                    </strong>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            paddingInline: "0.25rem",
          }}
        >
          こんな人に刺さるConoHa VPS
        </h2>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
          }}
        >
          {[
            {
              title: "VPSをはじめて使う初心者",
              body: "管理画面が直感的で、OSのインストールからSSH接続まで手順が明快。初めてのVPSとして最初に試す候補として選ばれています。",
            },
            {
              title: "個人開発・ポートフォリオ公開",
              body: "月763円の1GBプランから本番公開が可能。時間課金を使えば検証環境を低コストで立ち上げてすぐ削除できます。",
            },
            {
              title: "国内向けWebアプリ本番運用",
              body: "東京リージョンで低遅延を確保。2〜4GBプランはAPIサーバーや管理画面付きサービスの本番環境として十分なスペックです。",
            },
            {
              title: "短期・検証目的の利用",
              body: "時間課金があるため、機能検証やステージング環境として一時的に使い、終わったら削除するという使い方が自然に組めます。",
            },
          ].map(({ title, body }) => (
            <article
              key={title}
              style={{
                ...panelStyle,
                display: "grid",
                gap: "0.65rem",
              }}
            >
              <h3 style={{ fontSize: "1rem", lineHeight: 1.45 }}>{title}</h3>
              <p style={{ color: "#718096", lineHeight: 1.8 }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pros / Cons */}
      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
        }}
      >
        <article style={{ ...panelStyle, display: "grid", gap: "0.8rem" }}>
          <h2 style={{ fontSize: "1.2rem" }}>メリット</h2>
          <ul
            style={{
              color: "#4a5568",
              display: "grid",
              gap: "0.65rem",
              paddingLeft: "1.2rem",
            }}
          >
            {[
              "管理画面がわかりやすく初心者でもすぐ使える",
              "時間課金と月額課金を目的に応じて使い分けられる",
              "国内リージョン（東京・大阪）で低遅延",
              "転送量無制限で従量課金なし",
              "セットアップが簡単でOSテンプレートが豊富",
            ].map((item) => (
              <li key={item} style={{ lineHeight: 1.8 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
        <article style={{ ...panelStyle, display: "grid", gap: "0.8rem" }}>
          <h2 style={{ fontSize: "1.2rem" }}>デメリット・注意点</h2>
          <ul
            style={{
              color: "#4a5568",
              display: "grid",
              gap: "0.65rem",
              paddingLeft: "1.2rem",
            }}
          >
            {[
              "超低価格帯ではなく、最安クラスとは差がある",
              "海外リージョンの選択肢は少なめ",
              "クラウド周辺サービスは他社より限定的",
            ].map((item) => (
              <li key={item} style={{ lineHeight: 1.8 }}>
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Final CTA */}
      <section
        style={{
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 12,
          display: "grid",
          gap: "1.2rem",
          padding: "clamp(1.2rem, 4vw, 2rem)",
        }}
      >
        <div style={{ display: "grid", gap: "0.7rem", maxWidth: 700 }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)",
              lineHeight: 1.15,
            }}
          >
            迷ったらConoHa。月460円から、
            <br />
            いつでも気軽に始められる
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            月460円の入門プランから試せます。時間課金で気軽に始め、必要に応じてスケールアップも可能です。
          </p>
        </div>
        <CtaButton label="ConoHa VPS公式ページを確認する" />
        <p style={{ color: "#a0aec0", fontSize: "0.78rem" }}>
          ※ 本ページにはアフィリエイトリンクが含まれます。
        </p>
      </section>

      {/* Compare link */}
      <section
        style={{
          ...panelStyle,
          display: "grid",
          gap: "0.75rem",
        }}
      >
        <p style={{ color: "#718096", lineHeight: 1.8 }}>
          他のVPSとも比較したい場合は、VPS一覧ページで価格・スペックを並べて確認できます。
        </p>
        <Link
          href="/"
          style={{ color: "#3EA8FF", fontWeight: 600, textDecoration: "none" }}
        >
          VPS比較一覧を見る →
        </Link>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            paddingInline: "0.25rem",
          }}
        >
          よくある質問
        </h2>
        <div style={{ display: "grid", gap: "0.85rem" }}>
          {faqs.map((faq) => (
            <article
              key={faq.question}
              style={{ ...panelStyle, display: "grid", gap: "0.6rem" }}
            >
              <h3 style={{ fontSize: "1rem", lineHeight: 1.45 }}>
                {faq.question}
              </h3>
              <p style={{ color: "#718096", lineHeight: 1.8 }}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.85rem" }}>
        <h2 style={{ fontSize: "1.2rem" }}>他の国内VPSも見る</h2>
        <div
          style={{
            display: "grid",
            gap: "0.75rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          }}
        >
          {[
            {
              href: "/lp/shin-vps/",
              title: "シンVPS",
              body: "高コスパ重視で選びたい人向け。NVMe SSDとメモリ単価の強さが魅力です。",
            },
            {
              href: "/lp/sakura/",
              title: "さくらのVPS",
              body: "情報量と運用実績を重視したい人向け。学習用や検証用途との相性が良い定番です。",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 4,
                color: "#1a202c",
                display: "grid",
                gap: "0.45rem",
                padding: "1rem",
                textDecoration: "none",
              }}
            >
              <strong style={{ color: "#3EA8FF", fontSize: "1rem" }}>
                {item.title}
              </strong>
              <p style={{ color: "#718096", lineHeight: 1.75 }}>{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <img
        alt=""
        height={1}
        src={affiliatePixelUrl}
        style={{ border: 0, height: 1, width: 1 }}
        width={1}
      />
    </div>
  )
}

export default ConohaLpPage
