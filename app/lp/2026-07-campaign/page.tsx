import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle =
  "2026年7月・VPSキャンペーンまとめ | いま国内でお得に始められるサービスはどれ？"
const pageDescription =
  "2026年6月24日時点で確認できた、7月も使える国内VPSのキャンペーンと常設特典をまとめました。XServer VPS、シンVPS、ConoHa VPS、さくらのVPS、WebARENA Indigo、お名前.com VPS、KAGOYA CLOUD VPS、クラウドVPS byGMOの内容を比較できます。"
const publishedAt = "2026-06-24T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "2026年7月も使える国内VPSキャンペーンを整理。割引率、終了日、常設特典をまとめて比較できます。",
  path: "/lp/2026-07-campaign/",
  keywords: [
    "VPS キャンペーン 2026年7月",
    "国内VPS キャンペーン",
    "XServer VPS キャンペーン",
    "シンVPS キャンペーン",
    "ConoHa VPS キャンペーン",
    "VPS 割引 2026年7月",
  ],
})

const limitedCampaigns = [
  {
    name: "XServer VPS",
    href: "https://vps.xserver.ne.jp/",
    period: "2026年9月3日(木)まで",
    label: "最大20%オフ",
    body: "2GB・6GB・12GB の主要プランで初回利用料金が割引されます。2GBプランは月額792円から、6GBプランは月額1,359円から、12GBプランは月額2,560円から使えます。",
    note: "ビジネスプランは2026年7月2日まで最大10%オフ。7月前半の法人利用では先に確認したい枠です。",
  },
  {
    name: "シンVPS",
    href: "https://www.shin-vps.jp/",
    period: "2026年8月20日(木)まで",
    label: "実質30%オフ",
    body: "大容量メモリプランの2GB以上でキャッシュバックを実施中です。2GBは実質月額504円から、4GBは実質月額840円から、8GBは実質月額1,610円から使えます。",
    note: "1GB大容量メモリプランは月額325円から。初期費用無料と低い月額を重視する構成に向いています。",
  },
] as const

const watchItems = [
  {
    name: "ConoHa VPS",
    href: "https://vps.conoha.jp/campaign/active2026/",
    label: "6月25日まで最大72%OFF",
    body: "確認時点のアクティブキャンペーンは2026年6月25日16時までです。7月に入ってから新しい月次キャンペーンが出る可能性があるため、申込み直前に公式のキャンペーンページを確認してください。",
  },
] as const

const ongoingOffers = [
  {
    name: "さくらのVPS",
    href: "https://vps.sakura.ad.jp/lp/proven-stability/",
    label: "2週間無料トライアル",
    body: "クレジットカード払い選択時に無料トライアルが利用できます。初期費用無料で、料金を払う前に管理画面や応答速度を確かめたい人向けです。",
  },
  {
    name: "WebARENA Indigo",
    href: "https://web.arena.ne.jp/indigo/spec/coupon.html",
    label: "500円お試しクーポン",
    body: "新規登録者向けにクーポンコード「Indigo500」を利用可能。適用から30日間有効で、短期検証環境を低コストで作れます。",
  },
  {
    name: "お名前.com VPS",
    href: "https://www.onamae.com/server/vps/price/",
    label: "1GB・2GB 初期費用無料",
    body: "料金表で1GBと2GBプランの初期費用無料を確認できます。最低利用期間は3ヶ月のため、短期検証より数ヶ月使う前提に向いています。",
  },
  {
    name: "KAGOYA CLOUD VPS",
    href: "https://www.kagoya.jp/vps/function-plan/",
    label: "月額上限・年額割引",
    body: "1GBは日額20円・月額上限550円、年額では月額換算506円です。日額課金と月額上限を使い分けたい場合に比較しやすいサービスです。",
  },
  {
    name: "クラウドVPS byGMO",
    href: "https://vps.gmocloud.com/",
    label: "初期費用0円・最大15日お試し",
    body: "Vシリーズで初期費用0円、最大15日間の無料お試しを案内しています。サポート付き定額VPSを試したい人向けです。",
  },
] as const

const faqs = [
  {
    question: "2026年7月時点で割引率が大きい国内VPSはどこですか？",
    answer:
      "2026年6月24日時点で7月中も使えるものとして確認できた中では、シンVPSの実質30%オフが最も大きいです。XServer VPSも9月3日まで最大20%オフです。",
  },
  {
    question: "XServer VPS の7月キャンペーンはいつまでですか？",
    answer:
      "標準プランの最大20%オフは2026年9月3日までです。ビジネスプランの最大10%オフは2026年7月2日までなので、法人向けプランを検討する場合は7月上旬に確認してください。",
  },
  {
    question: "ConoHa VPS の7月キャンペーンはありますか？",
    answer:
      "2026年6月24日時点で確認できたキャンペーンは、6月25日16時までのアクティブキャンペーンです。7月向けの新キャンペーンは、申し込み前に公式ページで最新表示を確認してください。",
  },
  {
    question: "このページの情報はいつ時点のものですか？",
    answer:
      "このページは2026年6月24日に公式サイト上で確認できた情報をもとにまとめています。申し込み前には各サービスの最新表示も必ず確認してください。",
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

const CampaignJuly2026Page = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description:
      "2026年6月24日時点で確認できた、7月も使える国内VPSキャンペーンと常設特典を一覧で整理したガイドです。",
    path: "/lp/2026-07-campaign/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "2026年7月の国内VPSキャンペーンまとめ", path: "/lp/2026-07-campaign/" },
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
          <span>2026年7月の国内VPSキャンペーンまとめ</span>
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
            2026年7月の国内VPS、
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
            2026年6月24日時点で、7月も利用できる国内VPSのキャンペーンと常設特典を整理しました。
            XServer VPS とシンVPSでは、7月中も続く割引が確認できます。
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
            { label: "調査日", value: "2026/06/24" },
            { label: "限定キャンペーン", value: "2件" },
            { label: "常設特典", value: "5件" },
            { label: "最大割引", value: "実質30%OFF" },
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
            7月も使える期間限定キャンペーン
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            明確な終了日があり、7月中も申し込みタイミングで効くキャンペーンです。
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
            7月前に確認したいキャンペーン
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            6月末で終了予定のため、7月契約では更新状況の確認が必要です。
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
          {watchItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              rel="noopener noreferrer"
              style={linkCardStyle}
              target="_blank"
            >
              <div style={{ display: "grid", gap: "0.35rem" }}>
                <strong style={{ fontSize: "1.05rem", lineHeight: 1.45 }}>
                  {item.name}
                </strong>
                <span style={{ color: "#2b6cb0", fontSize: "0.82rem" }}>
                  {item.label}
                </span>
              </div>
              <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{item.body}</p>
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
          7月に選ぶならどれが向いているか
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
              title: "割引率重視なら シンVPS",
              body: "実質30%オフが8月20日まで続きます。月額を低く抑えたい個人開発や検証環境に向いています。",
            },
            {
              title: "本番利用も意識するなら XServer VPS",
              body: "最大20%オフが9月3日まで続きます。標準プランの性能とサポートを重視する場合に候補になります。",
            },
            {
              title: "法人向けなら XServer ビジネスプラン",
              body: "自動バックアップやSLAを重視する場合の候補です。ただし最大10%オフは7月2日までなので早めの確認が必要です。",
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

export default CampaignJuly2026Page
