import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle =
  "2026年4月・VPSキャンペーンまとめ | いまいちばんお得に始められるのはどれ？"
const pageDescription =
  "2026年4月19日時点で確認できた国内VPSのキャンペーンをまとめました。ConoHa VPS、XServer VPS、シンVPS、さくらのVPS、WebARENA Indigo、お名前.com VPSの特典内容と期限を比較できます。"
const publishedAt = "2026-04-19T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "2026年4月19日時点の国内VPSキャンペーンを整理。割引率、期限、向いている人をひと目で確認できます。",
  path: "/lp/2026-04-campaign/",
  keywords: [
    "VPS キャンペーン 2026年4月",
    "国内VPS キャンペーン",
    "ConoHa VPS キャンペーン",
    "XServer VPS キャンペーン",
    "シンVPS キャンペーン",
    "VPS 割引 2026",
  ],
})

const campaignCards = [
  {
    name: "ConoHa VPS",
    href: "https://vps.conoha.jp/campaign/startdash2026/",
    period: "2026年4月23日(木) 16:00まで",
    label: "最大69%OFF",
    body: "長期割引の「まとめトク」が対象。初回料金が大きく下がるタイプで、長めに使う予定がある人と相性が良いです。",
    note: "12GBプランでは時間課金比較で最大69%OFF。",
  },
  {
    name: "XServer VPS",
    href: "https://vps.xserver.ne.jp/support/news_detail.php?view_id=18143",
    period: "2026年6月18日(木)まで",
    label: "最大25%キャッシュバック",
    body: "12ヶ月以上の契約で月額料金の最大25%をキャッシュバック。新規だけでなく追加契約・再契約も対象です。",
    note: "2026年4月16日(水)公開の公式ニュースで案内。",
  },
  {
    name: "シンVPS",
    href: "https://www.shin-vps.jp/campaign/campaign_260402.php",
    period: "2026年6月11日(木) 17:00まで",
    label: "最大20%オフ",
    body: "12ヶ月以上契約の新規申込みが対象。大容量メモリプランとスタンダードプランの両方で割引が入ります。",
    note: "36ヶ月契約で20%オフ、12ヶ月で10%オフ。",
  },
  {
    name: "さくらのVPS",
    href: "https://vps.sakura.ad.jp/lp/proven-stability/",
    period: "常設特典",
    label: "2週間無料トライアル",
    body: "期間限定値引きではありませんが、初回の試用ハードルが低い特典です。まず触って判断したい人に向いています。",
    note: "2026年4月19日時点で期間限定キャンペーンは見当たらず、無料トライアル案内を確認。",
  },
  {
    name: "WebARENA Indigo",
    href: "https://web.arena.ne.jp/indigo/spec/coupon.html",
    period: "常設特典",
    label: "500円お試しクーポン",
    body: "新規登録者向けのクーポンコード「Indigo500」を使える特典です。短期検証やコントロールパネルの確認に向いています。",
    note: "適用から30日間有効。",
  },
  {
    name: "お名前.com VPS",
    href: "https://www.onamae.com/server/vps/?btn_id=header_gm_sub_rs_onamaecom_server_vps",
    period: "常設特典",
    label: "2GBプラン初期費用無料",
    body: "明確な終了日つきキャンペーンではありませんが、初期費用を抑えて始めやすい状態が確認できました。",
    note: "2026年4月19日時点で公式トップページ上に掲載。",
  },
] as const

const noCampaignItems = [
  {
    name: "KAGOYA CLOUD VPS",
    body: "公式で確認できた直近キャンペーンは終了済みでした。現時点では大きな実施中特典は見当たりませんでした。",
  },
  {
    name: "クラウドVPS byGMO",
    body: "過去のキャンペーンページは確認できましたが、2026年4月19日時点で進行中の案内は見当たりませんでした。",
  },
] as const

const faqs = [
  {
    question: "2026年4月時点でいちばん割引率が大きい国内VPSはどこですか？",
    answer:
      "このページで確認できた中では ConoHa VPS のスタートダッシュキャンペーンが最大69%OFFで最も大きいです。ただし長期利用向けの「まとめトク」が前提なので、短期利用なら別のサービスの方が合う場合があります。",
  },
  {
    question: "短期の値引きより、まず試せる国内VPSを選びたい場合は？",
    answer:
      "さくらのVPSの2週間無料トライアルや、WebARENA Indigoの500円クーポンが向いています。料金を大きく下げるより、触って確かめたい用途に相性が良いです。",
  },
  {
    question: "2026年4月19日時点の情報として見るときの注意点はありますか？",
    answer:
      "キャンペーンは予告なく終了することがあります。このページは2026年4月19日に確認できた公式情報をもとにまとめているため、申込み前には必ず各公式ページの最新表示も確認してください。",
  },
]

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12 as const,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const linkCardStyle = {
  ...panelStyle,
  color: "#1a202c",
  display: "grid",
  gap: "0.75rem",
  textDecoration: "none",
}

const CampaignApril2026Page = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description:
      "2026年4月19日時点で確認できた国内VPSキャンペーンと常設特典を一覧で整理したガイドです。",
    path: "/lp/2026-04-campaign/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "2026年4月の国内VPSキャンペーンまとめ", path: "/lp/2026-04-campaign/" },
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
          <span>2026年4月の国内VPSキャンペーンまとめ</span>
        </nav>
        <div style={{ display: "grid", gap: "1rem", maxWidth: 900 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["2026年4月", "国内VPS", "キャンペーン速報"].map((tag) => (
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
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.05 }}
          >
            2026年4月・いまいちばん
            <br />
            お得に始めるVPSはどれ？
          </h1>
          <p
            style={{
              color: "#4a5568",
              fontSize: "clamp(1rem, 2.5vw, 1.12rem)",
              lineHeight: 1.85,
              maxWidth: 760,
            }}
          >
            2026年4月19日時点で、国内VPSの公式サイトに掲載されていたキャンペーンと常設特典を整理しました。
            値引き率だけでなく、終了日や向いている使い方もあわせて見られるようにしています。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
            maxWidth: 720,
          }}
        >
          {[
            { label: "調査日", value: "2026/04/19" },
            { label: "確認できた特典", value: "6件" },
            { label: "最大割引", value: "69%OFF" },
            { label: "最短終了", value: "4/23" },
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
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.4rem", paddingInline: "0.25rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
            いま使えるキャンペーン・特典まとめ
          </h2>
          <p style={{ color: "#718096", lineHeight: 1.8 }}>
            期間限定値引きと、現在申し込み時に使える常設特典をまとめています。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {campaignCards.map((campaign) => (
            <a
              key={campaign.name}
              href={campaign.href}
              rel="noopener noreferrer"
              style={linkCardStyle}
              target="_blank"
            >
              <div
                style={{
                  alignItems: "start",
                  display: "flex",
                  gap: "0.75rem",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <strong style={{ fontSize: "1.05rem", lineHeight: 1.45 }}>
                    {campaign.name}
                  </strong>
                  <span style={{ color: "#718096", fontSize: "0.82rem" }}>
                    {campaign.period}
                  </span>
                </div>
                <span
                  style={{
                    background: "#ebf8ff",
                    border: "1px solid #bee3f8",
                    borderRadius: 999,
                    color: "#3EA8FF",
                    fontSize: "0.78rem",
                    padding: "0.35rem 0.65rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {campaign.label}
                </span>
              </div>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{campaign.body}</p>
              <p style={{ color: "#718096", fontSize: "0.82rem", lineHeight: 1.7 }}>
                {campaign.note}
              </p>
              <span style={{ color: "#3EA8FF" }}>公式ページを見る →</span>
            </a>
          ))}
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.85rem" }}>
        <h2 style={{ fontSize: "clamp(1.35rem, 3vw, 1.8rem)" }}>
          目的別・いまどれを選ぶべきか
        </h2>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          }}
        >
          {[
            {
              title: "割引率重視なら ConoHa VPS",
              body: "最大69%OFFが目立ちます。長く使う前提で、初回費用を大きく抑えたい人向けです。",
            },
            {
              title: "バランス重視なら XServer VPS",
              body: "キャッシュバック率とサービスの安定感のバランスが良く、中長期契約の本番用途に合わせやすいです。",
            },
            {
              title: "コスパ重視なら シンVPS",
              body: "もともとの価格感に加えて最大20%オフがあるため、メモリ重視の構成を安く作りやすいです。",
            },
            {
              title: "まず試すなら さくら / Indigo",
              body: "無料トライアルや少額クーポンがあるため、UIや使い勝手を先に見たい人に向いています。",
            },
          ].map((item) => (
            <article key={item.title} style={{ ...panelStyle, display: "grid", gap: "0.55rem" }}>
              <h3 style={{ fontSize: "1rem", lineHeight: 1.45 }}>{item.title}</h3>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
            paddingInline: "0.25rem",
          }}
        >
          現時点で大きなキャンペーンを確認できなかったサービス
        </h2>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {noCampaignItems.map((item) => (
            <article key={item.name} style={{ ...panelStyle, display: "grid", gap: "0.55rem" }}>
              <h3 style={{ fontSize: "1rem", lineHeight: 1.45 }}>{item.name}</h3>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.35rem, 3vw, 1.8rem)",
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

      <section style={{ ...panelStyle, display: "grid", gap: "0.75rem" }}>
        <p style={{ color: "#718096", lineHeight: 1.8 }}>
          他のVPSとの料金やスペックも含めて見比べたい場合は、VPS一覧ページで横断比較できます。
        </p>
        <Link
          href="/"
          style={{ color: "#3EA8FF", fontWeight: 600, textDecoration: "none" }}
        >
          VPS比較一覧を見る →
        </Link>
      </section>
    </div>
  )
}

export default CampaignApril2026Page
