import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle =
  "2026年6月・VPSキャンペーンまとめ | いま国内でお得に始められるサービスはどれ？"
const pageDescription =
  "2026年6月4日時点で確認できた国内VPSのキャンペーンと常設特典をまとめました。ConoHa VPS、XServer VPS、シンVPS、さくらのVPS、WebARENA Indigo、お名前.com VPS、KAGOYA CLOUD VPS、クラウドVPS byGMOの内容を比較できます。"
const publishedAt = "2026-06-04T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "2026年6月4日時点の国内VPSキャンペーンを整理。割引率、終了日、常設特典をまとめて比較できます。",
  path: "/lp/2026-06-campaign/",
  keywords: [
    "VPS キャンペーン 2026年6月",
    "国内VPS キャンペーン",
    "ConoHa VPS キャンペーン",
    "XServer VPS キャンペーン",
    "シンVPS キャンペーン",
    "VPS 割引 2026年6月",
  ],
})

const limitedCampaigns = [
  {
    name: "ConoHa VPS",
    href: "https://vps.conoha.jp/",
    period: "2026年6月25日(木) 16:00まで",
    label: "最大72%OFF",
    body: "契約期間が長いほど割引率が上がる「まとめトク」方式。全プラン対象で、36ヶ月契約で最大72%OFFになります。初回費用を大きく下げたい長期利用向けに最も有利な条件です。",
    note: "1ヶ月契約で28〜46%OFF、12ヶ月で57〜60%OFF、36ヶ月で67〜72%OFF。",
  },
  {
    name: "XServer VPS",
    href: "https://vps.xserver.ne.jp/",
    period: "2026年6月18日(水)まで",
    label: "最大30%キャッシュバック",
    body: "2GB・6GB・12GB の標準3プランが対象。12ヶ月以上の新規・追加・再契約で最大30%キャッシュバックが受けられます。通常990円の2GBプランが693円相当になります。",
    note: "ビジネスプランは別途10%OFF（7月2日まで）。",
  },
  {
    name: "シンVPS",
    href: "https://www.shin-vps.jp/",
    period: "2026年6月11日(木) 17:00まで",
    label: "最大20%オフ",
    body: "12ヶ月以上の新規契約が対象。スタンダードプラン・大容量メモリプランともに初回料金が割引されます。もともとの価格水準が低いシンVPSに割引が乗るため、コスパを重視する構成に向いています。",
    note: "36ヶ月契約で20%オフ、24ヶ月で15%オフ、12ヶ月で10%オフ。",
  },
]

const ongoingOffers = [
  {
    name: "さくらのVPS",
    href: "https://vps.sakura.ad.jp/lp/proven-stability/",
    label: "2週間無料トライアル",
    body: "クレジットカード払い選択時に全プランで2週間の無料トライアルが利用できます。料金を払う前に管理画面や応答速度を確かめたい人向けです。",
  },
  {
    name: "WebARENA Indigo",
    href: "https://web.arena.ne.jp/indigo/spec/coupon.html",
    label: "500円お試しクーポン",
    body: "新規登録者向けにクーポンコード「Indigo500」を利用可能。時間課金方式なので短期の検証環境をコストを抑えて作れます。",
  },
  {
    name: "お名前.com VPS",
    href: "https://www.onamae.com/server/vps/price/",
    label: "1GB・2GB 初期費用無料",
    body: "1GBと2GBプランの初期費用が無料です。ただし6月の調査で月額料金の値上げが確認されているため、申し込み前に最新の料金を公式で確認してください。",
  },
  {
    name: "KAGOYA CLOUD VPS",
    href: "https://www.kagoya.jp/vps/function-plan/",
    label: "初期費用無料",
    body: "期間限定キャンペーンは確認できませんでしたが、通常ページで初期費用無料を確認できます。年額割引を使うとさらにコストを下げやすい構成です。",
  },
  {
    name: "クラウドVPS byGMO",
    href: "https://vps.gmocloud.com/",
    label: "初期費用0円・最大15日お試し",
    body: "初期費用0円と最大15日のお試し期間を案内しています。なお6月の調査で全プランの月額料金が値上げされているため、検討時は最新の料金を確認してください。",
  },
] as const

const faqs = [
  {
    question: "2026年6月時点でいちばん割引率が大きい国内VPSはどこですか？",
    answer:
      "このページで確認できた中では ConoHa VPS の最大72%OFFが最も大きいです。ただし長期利用向けの「まとめトク」方式が前提のため、短期利用なら XServer VPS の30%キャッシュバックや シンVPS の20%オフのほうが合う場合があります。",
  },
  {
    question: "XServer VPS のキャンペーンは6月中に終わりますか？",
    answer:
      "標準プランの30%キャッシュバックキャンペーンは2026年6月18日（水）まで、ビジネスプランの10%OFFは7月2日までです。月内に契約を決めるなら早めに動くのが確実です。",
  },
  {
    question: "シンVPS のキャンペーンはまだ間に合いますか？",
    answer:
      "2026年6月11日（木）17:00が終了予定です。このページの調査日（6月4日）時点では有効です。申し込み前に公式サイトで期間を確認してください。",
  },
  {
    question: "このページの情報はいつ時点のものですか？",
    answer:
      "このページは2026年6月4日に公式サイト上で確認できた情報をもとにまとめています。申し込み前には各サービスの最新表示も必ず確認してください。",
  },
]

const panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 4 as const,
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

const CampaignJune2026Page = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description:
      "2026年6月4日時点で確認できた国内VPSキャンペーンと常設特典を一覧で整理したガイドです。",
    path: "/lp/2026-06-campaign/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "2026年6月の国内VPSキャンペーンまとめ", path: "/lp/2026-06-campaign/" },
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
          borderRadius: 4,
          display: "grid",
          gap: "1rem",
          padding: "clamp(1rem, 3vw, 1.6rem)",
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
          <span>2026年6月の国内VPSキャンペーンまとめ</span>
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
            Campaign Roundup
          </span>
          <h1
            style={{
              color: "#1a202c",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              lineHeight: 1.08,
            }}
          >
            2026年6月の国内VPS、
            <br />
            いまお得に始めるならどれ？
          </h1>
          <p
            style={{
              color: "#4a5568",
              fontSize: "clamp(1rem, 2.5vw, 1.12rem)",
              lineHeight: 1.85,
              maxWidth: 760,
            }}
          >
            2026年6月4日時点で、国内VPSの公式サイトに掲載されていたキャンペーンと常設特典を整理しました。
            ConoHa VPS・XServer VPS・シンVPSで期間限定の割引が動いており、6月中旬から月末にかけて順次終了予定です。
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
            { label: "調査日", value: "2026/06/04" },
            { label: "限定キャンペーン", value: "3件" },
            { label: "常設特典", value: "5件" },
            { label: "最大割引", value: "72%OFF" },
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
          <h2 style={{ color: "#1a202c", fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
            期間限定で実施中のキャンペーン
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            明確な終了日がある、いま申し込むタイミングで効くキャンペーンです。
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
          {limitedCampaigns.map((campaign) => (
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
                    color: "#2b6cb0",
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

      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.4rem", paddingInline: "0.25rem" }}>
          <h2 style={{ color: "#1a202c", fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>
            常設の特典・試しやすい条件
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            期間限定値引きではないものの、初期費用無料やトライアルで始めやすいサービスです。
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
          {ongoingOffers.map((offer) => (
            <a
              key={offer.name}
              href={offer.href}
              rel="noopener noreferrer"
              style={linkCardStyle}
              target="_blank"
            >
              <div style={{ display: "grid", gap: "0.35rem" }}>
                <strong style={{ fontSize: "1.05rem", lineHeight: 1.45 }}>
                  {offer.name}
                </strong>
                <span style={{ color: "#2b6cb0", fontSize: "0.82rem" }}>
                  {offer.label}
                </span>
              </div>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{offer.body}</p>
              <span style={{ color: "#3EA8FF" }}>公式ページを見る →</span>
            </a>
          ))}
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.85rem" }}>
        <h2 style={{ color: "#1a202c", fontSize: "clamp(1.35rem, 3vw, 1.8rem)" }}>
          6月に選ぶならどれが向いているか
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
              body: "最大72%OFFがもっとも強く、長期利用前提なら初回費用を大きく下げやすいです。6月25日まで有効。",
            },
            {
              title: "実質負担で選ぶなら XServer VPS",
              body: "30%キャッシュバックが6月18日まで有効。本番向けの長期契約と相性が良く、ビジネスプランも10%OFFが7月まで続きます。",
            },
            {
              title: "コスパ重視なら シンVPS",
              body: "もともとの価格水準が低いシンVPSに最大20%オフが乗っています。6月11日まで。大容量メモリプランを安く抑えたい場合に有効です。",
            },
            {
              title: "まず試すなら さくら / Indigo / byGMO",
              body: "無料トライアルや少額クーポンを使って、使い勝手を先に確かめてから決めたい人向けです。",
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
            color: "#1a202c",
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
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ ...panelStyle, display: "grid", gap: "0.75rem" }}>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
          価格やスペックも含めて比べたい場合は、VPS一覧ページで横断比較できます。
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

export default CampaignJune2026Page
