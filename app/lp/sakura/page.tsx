import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle = "さくらのVPSおすすめガイド | 老舗国内VPSで安心の学習・検証環境"
const pageDescription =
  "さくらのVPSは月643円から使える国内老舗VPS。情報量の多さ・安定した国内データセンター・学習や検証に向く価格帯を徹底解説します。"
const publishedAt = "2026-04-18T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "月643円から・情報量豊富・国内安定運用。さくらのVPSの料金・スペック・特徴を詳しく解説します。",
  path: "/lp/sakura/",
  keywords: [
    "さくらのVPS",
    "さくらのVPS おすすめ",
    "さくらのVPS 料金",
    "国内VPS おすすめ",
    "老舗 VPS",
    "さくらのVPS 評判",
    "さくらのVPS 比較",
  ],
})

const affiliateUrl =
  "https://px.a8.net/svt/ejp?a8mat=4B1MHK+CS83EA+D8Y+C9YHU"
const affiliatePixelUrl =
  "https://www13.a8.net/0.gif?a8mat=4B1MHK+CS83EA+D8Y+C9YHU"

const plans = [
  { name: "512MB", price: 643, cpu: 1, memory: 0.5, storage: 25 },
  { name: "1G", price: 880, cpu: 2, memory: 1, storage: 50 },
  { name: "2G", price: 1738, cpu: 3, memory: 2, storage: 100 },
  { name: "4G", price: 3520, cpu: 4, memory: 4, storage: 200 },
  { name: "8G", price: 7040, cpu: 6, memory: 8, storage: 400 },
  { name: "16G", price: 13200, cpu: 8, memory: 16, storage: 800 },
  { name: "32G", price: 26400, cpu: 10, memory: 32, storage: 1600 },
]

const faqs = [
  {
    question: "さくらのVPSは初心者や学習用途に向いていますか？",
    answer:
      "向いています。日本語の解説記事や導入事例が多く、困ったときに調べやすいため、LinuxやVPSの学習環境として選びやすいサービスです。",
  },
  {
    question: "さくらのVPSの強みは何ですか？",
    answer:
      "国内老舗としての運用実績、情報量の多さ、上位プランの大容量ストレージが主な強みです。安定性や調べやすさを重視する人に向いています。",
  },
  {
    question: "さくらのVPSを選ぶときの注意点はありますか？",
    answer:
      "最安重視のVPSと比べると価格が少し高めで、海外リージョン用途には向きません。国内向けサイト運用や検証環境として考えると相性が良いです。",
  },
]

const CtaButton = ({ label = "さくらのVPSを見てみる" }: { label?: string }) => (
  <a
    href={affiliateUrl}
    rel="noopener noreferrer"
    style={{
      alignItems: "center",
      background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
      borderRadius: 4,
      color: "#031321",
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
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "clamp(2px, 1vw, 4px)" as const,
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const SakuraLpPage = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description: "さくらのVPSの料金・スペック・メリット・おすすめ用途を徹底解説します。",
    path: "/lp/sakura/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "さくらのVPSおすすめガイド", path: "/lp/sakura/" },
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
          background:
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.28), transparent 40%), linear-gradient(135deg, #18345a 0%, #0e2037 60%, #09111d 100%)",
          border: "1px solid rgba(139, 197, 255, 0.2)",
          borderRadius: "clamp(2px, 1vw, 4px)",
          display: "grid",
          gap: "1.2rem",
          padding: "clamp(1.2rem, 4vw, 2rem)",
        }}
      >
        <Link href="/" style={{ color: "#9edaff", textDecoration: "none" }}>
          ← VPS一覧へ戻る
        </Link>
        <div style={{ display: "grid", gap: "1rem", maxWidth: 860 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["老舗", "コスト重視", "国内向け"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: 999,
                  color: "#bfeeff",
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
            さくらのVPSが
            <br />
            おすすめな理由
          </h1>
          <p
            style={{
              color: "#c7d8ef",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.85,
              maxWidth: 680,
            }}
          >
            国内VPS市場で長く使われてきた老舗サービス。月643円から使え、
            ネット上の情報量が豊富なため、学習・検証・小規模Webサイトに向いた安心の選択肢です。
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
            { label: "最安プラン", value: "¥643 / 月" },
            { label: "最大ストレージ", value: "1,600 GB" },
            { label: "実績", value: "国内老舗" },
            { label: "転送量", value: "無制限" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.11)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                display: "grid",
                gap: "0.3rem",
                padding: "0.9rem",
              }}
            >
              <span style={{ color: "#9cb5d6", fontSize: "0.8rem" }}>
                {label}
              </span>
              <strong style={{ fontSize: "1.15rem" }}>{value}</strong>
            </div>
          ))}
        </div>
        <CtaButton label="さくらのVPS公式ページを見る" />
      </section>

      {/* Why Sakura */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            paddingInline: "0.25rem",
          }}
        >
          さくらのVPSをおすすめする3つの理由
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
              title: "ネット上の情報量が国内VPS最多クラス",
              body: "長年の利用者が多く、セットアップ手順・トラブル対処・構成例など日本語の情報が豊富。調べながら進める学習・検証用途で特に強みを発揮します。",
            },
            {
              num: "02",
              title: "国内データセンターで安定した運用実績",
              body: "石狩・東京・大阪など国内複数拠点を持ち、長年の運用実績があります。国内向けサービスの安定稼働にそのまま使える基盤です。",
            },
            {
              num: "03",
              title: "大容量ストレージプランが充実",
              body: "32Gプランではストレージが1,600GBと国内VPS最大クラス。ログ・バックアップ・静的ファイルを大量に置く用途にも対応できます。",
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
                  color: "#5ab9e0",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                {num}
              </span>
              <h3 style={{ fontSize: "1.1rem", lineHeight: 1.4 }}>{title}</h3>
              <p style={{ color: "#b8cce6", lineHeight: 1.85 }}>{body}</p>
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
            プラン一覧
          </h2>
          <p
            style={{
              color: "#9cb8d8",
              fontSize: "0.9rem",
              marginTop: "0.4rem",
              paddingInline: "0.25rem",
            }}
          >
            512MBの入門プランから32GBの大容量プランまで、ストレージが特に充実しています。
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
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.11)",
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
                    color: "#9edaff",
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
                    <span style={{ color: "#8dacc8", fontSize: "0.78rem" }}>
                      {label}
                    </span>
                    <strong style={{ color: "#eef5ff", fontSize: "0.9rem" }}>
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
          こんな用途に向いています
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
              title: "VPS・Linux学習の入門環境",
              body: "情報量が多く、詰まったときに日本語で調べやすい。512MBから低コストで始められるため、学習用サーバーの定番候補です。",
            },
            {
              title: "社内検証・ステージング環境",
              body: "国内データセンターの安定した環境で、本番前の動作確認や社内向けツールの検証に使いやすいプラン帯が揃っています。",
            },
            {
              title: "小規模Webサイト・ブログ",
              body: "1〜2GBプランで静的サイトやWordPressを運用できます。ストレージが大きめなのでメディアファイルが増えても対応しやすい構成です。",
            },
            {
              title: "ログ・ファイル保管用途",
              body: "上位プランはストレージが400GB〜1,600GBと大容量。バックアップサーバーやファイル置き場としても活用できます。",
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
              <p style={{ color: "#b4c9e3", lineHeight: 1.8 }}>{body}</p>
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
              color: "#d9e7f8",
              display: "grid",
              gap: "0.65rem",
              paddingLeft: "1.2rem",
            }}
          >
            {[
              "日本語の情報・事例が豊富で調べやすい",
              "国内老舗で長年の運用実績がある",
              "上位プランはストレージ容量が大きい",
              "転送量無制限で従量課金なし",
              "国内複数拠点で安定した低遅延",
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
              color: "#d9e7f8",
              display: "grid",
              gap: "0.65rem",
              paddingLeft: "1.2rem",
            }}
          >
            {[
              "管理画面のUIはやや無骨でモダンさは控えめ",
              "最安クラスと比べると価格帯はやや高め",
              "海外リージョンは非対応",
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
          background:
            "linear-gradient(135deg, rgba(123, 225, 255, 0.13), rgba(139, 179, 255, 0.13))",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: "clamp(2px, 1vw, 4px)",
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
            国内VPSを安心して使い始めるなら
            <br />
            さくらのVPSが老舗の定番です
          </h2>
          <p style={{ color: "#c1d5ee", lineHeight: 1.85 }}>
            月643円の入門プランから試せます。情報量が多く、調べながら進めやすい環境です。
          </p>
        </div>
        <CtaButton label="さくらのVPS公式ページを確認する" />
        <p style={{ color: "#7b9bb8", fontSize: "0.78rem" }}>
          ※ 本ページにはアフィリエイトリンクが含まれます。
        </p>
      </section>

      {/* Compare link */}
      <section style={{ ...panelStyle, display: "grid", gap: "0.75rem" }}>
        <p style={{ color: "#a7bfd8", lineHeight: 1.8 }}>
          他のVPSとも比較したい場合は、VPS一覧ページで価格・スペックを並べて確認できます。
        </p>
        <Link
          href="/"
          style={{ color: "#9edaff", fontWeight: 600, textDecoration: "none" }}
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
              <p style={{ color: "#b4c9e3", lineHeight: 1.8 }}>{faq.answer}</p>
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
              href: "/lp/conoha/",
              title: "ConoHa VPS",
              body: "管理画面の分かりやすさと時間課金を重視したい人向け。初心者にも扱いやすい定番です。",
            },
            {
              href: "/lp/shin-vps/",
              title: "シンVPS",
              body: "コストパフォーマンスを重視したい人向け。NVMe SSDと大容量メモリが魅力です。",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: "inherit",
                display: "grid",
                gap: "0.45rem",
                padding: "1rem",
                textDecoration: "none",
              }}
            >
              <strong style={{ color: "#9edaff", fontSize: "1rem" }}>
                {item.title}
              </strong>
              <p style={{ color: "#b4c9e3", lineHeight: 1.75 }}>{item.body}</p>
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

export default SakuraLpPage
