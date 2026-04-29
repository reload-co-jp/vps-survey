import type { Metadata } from "next"
import Link from "next/link"
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildLpMetadata,
} from "../seo"

const pageTitle = "2026年版 シンVPS完全ガイド | コスパで選ぶなら国内VPSの最有力候補"
const pageDescription =
  "シンVPSはNVMe SSD・大容量メモリプランが月540円から使える高コスパ国内VPS。料金・スペック・メリット・おすすめ用途を徹底解説します。"
const publishedAt = "2026-04-18T09:00:00+09:00"

export const metadata: Metadata = buildLpMetadata({
  title: pageTitle,
  description: pageDescription,
  ogDescription:
    "NVMe SSD・大容量メモリプランが月540円から。シンVPSの料金・スペック・特徴を詳しく解説します。",
  path: "/lp/shin-vps/",
  keywords: [
    "シンVPS",
    "シンVPS おすすめ",
    "シンVPS 料金",
    "国内VPS おすすめ",
    "高コスパ VPS",
    "シンVPS 評判",
    "シンVPS 比較",
  ],
})

const affiliateUrl =
  "https://px.a8.net/svt/ejp?a8mat=4B1MHK+CRMNSI+5GDG+NTJWY"
const affiliatePixelUrl =
  "https://www18.a8.net/0.gif?a8mat=4B1MHK+CRMNSI+5GDG+NTJWY"

const memoryPlans = [
  { name: "Memory 1GB", price: 540, cpu: 1, memory: 1, storage: 30 },
  { name: "Memory 2GB", price: 750, cpu: 2, memory: 2, storage: 50 },
  { name: "Memory 4GB", price: 1300, cpu: 3, memory: 4, storage: 50 },
  { name: "Memory 8GB", price: 2500, cpu: 4, memory: 8, storage: 100 },
  { name: "Memory 16GB", price: 4900, cpu: 6, memory: 16, storage: 100 },
  { name: "Memory 32GB", price: 12001, cpu: 8, memory: 32, storage: 100 },
  { name: "Memory 64GB", price: 24000, cpu: 12, memory: 64, storage: 100 },
]

const standardPlans = [
  { name: "Standard 512MB", price: 900, cpu: 1, memory: 0.5, storage: 50 },
  { name: "Standard 1GB", price: 1150, cpu: 2, memory: 1, storage: 100 },
  { name: "Standard 2GB", price: 1850, cpu: 3, memory: 2, storage: 150 },
  { name: "Standard 4GB", price: 3600, cpu: 4, memory: 4, storage: 200 },
  { name: "Standard 8GB", price: 7200, cpu: 6, memory: 8, storage: 400 },
]

const faqs = [
  {
    question: "シンVPSはどんな人に向いていますか？",
    answer:
      "コストを抑えつつ国内向けのWebサービスや個人開発環境を作りたい人に向いています。特にメモリ単価とNVMe SSDの速さを重視する人と相性が良いです。",
  },
  {
    question: "シンVPSの強みは何ですか？",
    answer:
      "月540円から始められるメモリプラン、NVMe SSDによる高速ストレージ、分かりやすい月額料金が強みです。開発環境から小規模本番まで幅広く使えます。",
  },
  {
    question: "シンVPSの注意点はありますか？",
    answer:
      "海外リージョン用途には向かず、時間課金もありません。短期の検証よりも、月額前提で継続利用する環境に向いているサービスです。",
  },
]

const CtaButton = ({ label = "シンVPSを見てみる" }: { label?: string }) => (
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

const ShinVpsLpPage = () => {
  const articleJsonLd = buildArticleJsonLd({
    title: pageTitle,
    description: "シンVPSの料金・スペック・メリット・おすすめ用途を徹底解説します。",
    path: "/lp/shin-vps/",
    datePublished: publishedAt,
    dateModified: publishedAt,
    keywords: metadata.keywords as string[],
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "VPS比較サイト", path: "/" },
    { name: "シンVPSおすすめガイド", path: "/lp/shin-vps/" },
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
            {["国内向け", "NVMe", "高コスパ"].map((tag) => (
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
            2026年版・コスパで選ぶなら
            <br />
            シンVPSが最有力候補
          </h1>
          <p
            style={{
              color: "#4a5568",
              fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              lineHeight: 1.85,
              maxWidth: 680,
            }}
          >
            月540円から使えるメモリプランと、NVMe SSDによる高速ストレージが強み。
            国内向けWebサービスの開発・本番運用にコスパよく使える定番の選択肢です。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "0.85rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
            maxWidth: 600,
          }}
        >
          {[
            { label: "最安プラン", value: "¥540 / 月" },
            { label: "最大メモリ", value: "64 GB" },
            { label: "ストレージ", value: "NVMe SSD" },
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
        <CtaButton label="シンVPS公式ページを見る" />
      </section>

      {/* Why Shin VPS */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <h2
          style={{
            fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
            paddingInline: "0.25rem",
          }}
        >
          シンVPSが「安くて速い」と言われる3つの根拠
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
              title: "メモリ単価が国内トップクラス",
              body: "Memoryプランは1GBが月540円から。メモリを多く使うアプリや複数プロセスを動かす環境でも、コストを抑えたまま余裕のある構成が作れます。",
            },
            {
              num: "02",
              title: "NVMe SSDで読み書きが速い",
              body: "全プランにNVMe SSDを採用。DBのクエリ、ビルド、ログの書き込みなど、I/Oが重い処理でも体感的に快適な速度が出ます。",
            },
            {
              num: "03",
              title: "国内リージョンで低遅延・安心の料金体系",
              body: "国内ユーザー向けのWebサービスに適した低遅延環境。日本語のサポート・明快な月額料金で、初めてVPSを借りる方にも分かりやすいサービスです。",
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

      {/* Memory Plans */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              paddingInline: "0.25rem",
            }}
          >
            月540円から。Memoryプラン一覧
          </h2>
          <p
            style={{
              color: "#718096",
              fontSize: "0.9rem",
              marginTop: "0.4rem",
              paddingInline: "0.25rem",
            }}
          >
            メモリ重視の構成を低価格で実現できるシンVPSの看板プランです。
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
          {memoryPlans.map((plan) => (
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
                  ¥{plan.price.toLocaleString()}<span style={{ fontSize: "0.78rem", fontWeight: 400 }}>/月</span>
                </span>
              </div>
              <div style={{ display: "grid", gap: "0.55rem" }}>
                {[
                  { label: "CPU", value: `${plan.cpu} vCPU` },
                  { label: "メモリ", value: `${plan.memory} GB` },
                  { label: "NVMe", value: `${plan.storage} GB` },
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

      {/* Standard Plans */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
              paddingInline: "0.25rem",
            }}
          >
            大容量SSDが欲しいならStandardプラン一覧
          </h2>
          <p
            style={{
              color: "#718096",
              fontSize: "0.9rem",
              marginTop: "0.4rem",
              paddingInline: "0.25rem",
            }}
          >
            ストレージ容量を重視する場合はStandardプランが向いています。
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
          {standardPlans.map((plan) => (
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
                  ¥{plan.price.toLocaleString()}<span style={{ fontSize: "0.78rem", fontWeight: 400 }}>/月</span>
                </span>
              </div>
              <div style={{ display: "grid", gap: "0.55rem" }}>
                {[
                  { label: "CPU", value: `${plan.cpu} vCPU` },
                  { label: "メモリ", value: `${plan.memory} GB` },
                  { label: "NVMe", value: `${plan.storage} GB` },
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
          こんな人にシンVPSが刺さる
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
              title: "国内Webサービスの本番運用",
              body: "低遅延の国内リージョンで、日本向けサービスを安定稼働させたい場合に最適です。",
            },
            {
              title: "Docker / 複数コンテナ環境",
              body: "Memoryプランはメモリ単価が安く、複数コンテナを動かす開発・検証環境を安く維持できます。",
            },
            {
              title: "中規模APIサーバー",
              body: "4GB〜8GBのプランで、トラフィックの増減に合わせてスケールアップしやすい構成が作れます。",
            },
            {
              title: "個人開発の公開・検証",
              body: "Memoryプラン1GBは月540円。個人開発のアプリを公開したり、本番前の動作確認に気軽に使えます。",
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
              "メモリプランのコスパが国内最高水準",
              "NVMe SSDで読み書きが速い",
              "転送量無制限で従量課金なし",
              "国内リージョンで低遅延",
              "分かりやすい料金体系",
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
              "海外リージョンは非対応",
              "クラウド周辺サービス（CDN・LBなど）は限定的",
              "時間課金プランはない（月額のみ）",
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
            安くて速いVPSが欲しいなら、
            <br />
            シンVPSで決まり
          </h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            メモリプランは月540円から試せます。まずは公式ページでプランと料金を確認してみてください。
          </p>
        </div>
        <CtaButton label="シンVPS公式ページを確認する" />
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
              href: "/lp/conoha/",
              title: "ConoHa VPS",
              body: "初めてVPSを使う人向け。管理画面の分かりやすさと時間課金の柔軟さが魅力です。",
            },
            {
              href: "/lp/sakura/",
              title: "さくらのVPS",
              body: "情報量と運用実績を重視する人向け。学習や検証環境として選びやすい老舗です。",
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

export default ShinVpsLpPage
