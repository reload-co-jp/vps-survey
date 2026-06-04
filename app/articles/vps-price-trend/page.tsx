import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VPS料金の推移と今後の見通し（2026年）",
  description:
    "国内・海外VPSの料金推移を2026年4月から6月にかけての変動データを元に整理。値上がりしたサービス、据え置きのサービス、円安の影響、今後の料金動向の見通しをまとめます。",
  keywords: [
    "VPS 料金推移",
    "VPS 値上がり",
    "VPS 料金比較 2026",
    "クラウドVPS byGMO 値上げ",
    "お名前.com VPS 値上げ",
    "Lightsail 値上げ",
    "Linode Akamai 料金変更",
    "VPS 円安 影響",
  ],
  alternates: {
    canonical: "/articles/vps-price-trend/",
  },
  openGraph: {
    title: "VPS料金の推移と今後の見通し（2026年）",
    description:
      "2026年4〜6月の料金変動データをもとに、値上がりしたVPS・安定したVPS・円安の影響・今後の見通しを整理します。",
    images: [
      {
        alt: "VPS料金の推移と今後の見通し（2026年）",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/vps-price-trend/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "2026年4〜6月の料金変動データをもとに、値上がりしたVPS・安定したVPS・円安の影響・今後の見通しを整理します。",
    images: ["/twitter-image"],
    title: "VPS料金の推移と今後の見通し（2026年）",
  },
}

// ---- price history data ----

const changedServices = [
  {
    name: "クラウドVPS byGMO",
    href: "https://vps.gmocloud.com/vps2015/service/",
    currency: "JPY",
    plans: [
      { label: "1GB", before: 858, after: 1078 },
      { label: "2GB", before: 1408, after: 1628 },
      { label: "4GB", before: 2618, after: 3113 },
      { label: "6GB", before: 5038, after: 5698 },
      { label: "8GB", before: 7238, after: 7898 },
      { label: "12GB", before: 11528, after: 12408 },
    ],
    note: "全6プランで約20〜25%の値上げ。12カ月契約ベースの表示価格。",
    reason: "運用コストの上昇と電力費・インフラ費の反映と見られる。",
  },
  {
    name: "お名前.com VPS",
    href: "https://www.onamae.com/server/vps/",
    currency: "JPY",
    plans: [
      { label: "1GB", before: 873, after: 985 },
      { label: "2GB", before: 1209, after: 1446 },
      { label: "4GB", before: 3398, after: 4065 },
      { label: "8GB", before: 6899, after: 8255 },
      { label: "16GB", before: 13903, after: 16636 },
    ],
    note: "全5プランで約13〜20%の値上げ。12カ月払い月額換算。別途サービス維持調整費あり。",
    reason: "同グループのインフラコスト見直しに連動した改定と見られる。",
  },
  {
    name: "Amazon Lightsail",
    href: "https://aws.amazon.com/lightsail/pricing/",
    currency: "USD",
    plans: [
      { label: "1GB", before: 5, after: 7 },
      { label: "2GB", before: 10, after: 12 },
      { label: "4GB", before: 20, after: 24 },
    ],
    note: "USD建て料金の改定。円安（¥150/USD換算）での実質負担増は旧¥550→新¥1,050（1GBプラン）。",
    reason: "AWSのグローバルな価格見直しに加え、円安による円ベースコストの上昇が重なっている。",
  },
  {
    name: "Linode（Akamai Cloud）",
    href: "https://techdocs.akamai.com/cloud-computing/docs/shared-cpu-compute-instances",
    currency: "USD",
    plans: [
      { label: "2GB", before: 10, after: 12 },
      { label: "4GB", before: 20, after: 24 },
      { label: "8GB", before: 40, after: 48 },
    ],
    note: "Akamai統合後に料金改定。円換算（¥150/USD）で2GBは¥720→¥1,800相当と大幅増。",
    reason: "Akamai統合時のプラットフォーム移行コスト反映と、USD価格の20%引き上げ。",
  },
]

const stableServices = [
  { name: "ConoHa VPS", since: "2026年4月", minPrice: 460, note: "512MB〜128GB全プラン据え置き" },
  { name: "さくらのVPS", since: "2026年4月", minPrice: 643, note: "512MB〜32GB全プラン据え置き" },
  { name: "XServer VPS", since: "2026年4月", minPrice: 1496, note: "2GB〜96GB全プラン据え置き（月払い）" },
  { name: "シンVPS", since: "2026年4月", minPrice: 540, note: "スタンダード・メモリ全プラン据え置き" },
  { name: "KAGOYA CLOUD VPS", since: "2026年4月", minPrice: 550, note: "1GB〜32GB全プラン据え置き" },
  { name: "WebARENA Indigo", since: "2026年4月", minPrice: 319, note: "768MB〜32GB全プラン据え置き" },
  { name: "DigitalOcean", since: "2026年4月", minPrice: 4, note: "BasicはUSD $4〜据え置き（USD建て）" },
]

// ---- styles ----

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  fontSize: "0.88rem",
  width: "100%",
}

const thStyle: React.CSSProperties = {
  background: "#f7fafc",
  border: "1px solid #e2e8f0",
  padding: "0.45rem 0.7rem",
  textAlign: "left",
  whiteSpace: "nowrap",
}

const tdStyle: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  padding: "0.45rem 0.7rem",
}

const pct = (before: number, after: number) =>
  `+${Math.round(((after - before) / before) * 100)}%`

const BarChart = ({
  before,
  after,
  currency,
}: {
  before: number
  after: number
  currency: string
}) => {
  const prefix = currency === "JPY" ? "¥" : "$"
  const max = after * 1.1
  const beforePct = Math.round((before / max) * 100)
  const afterPct = Math.round((after / max) * 100)
  return (
    <div style={{ display: "grid", gap: "0.35rem" }}>
      <div style={{ alignItems: "center", display: "flex", gap: "0.6rem" }}>
        <span style={{ color: "#718096", fontSize: "0.78rem", minWidth: 32 }}>改定前</span>
        <div
          style={{
            background: "#a0aec0",
            borderRadius: 2,
            height: 14,
            width: `${beforePct}%`,
          }}
        />
        <span style={{ color: "#718096", fontSize: "0.82rem" }}>
          {prefix}{before.toLocaleString()}
        </span>
      </div>
      <div style={{ alignItems: "center", display: "flex", gap: "0.6rem" }}>
        <span style={{ color: "#718096", fontSize: "0.78rem", minWidth: 32 }}>改定後</span>
        <div
          style={{
            background: "#e53e3e",
            borderRadius: 2,
            height: 14,
            width: `${afterPct}%`,
          }}
        />
        <span style={{ color: "#c53030", fontSize: "0.82rem", fontWeight: 600 }}>
          {prefix}{after.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

const VpsPriceTrendPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "VPS料金の推移と今後の見通し（2026年）",
    description:
      "国内・海外VPSの料金推移を2026年4月から6月の変動データをもとに整理した記事です。",
    inLanguage: "ja",
    datePublished: "2026-06-04T00:00:00+09:00",
    dateModified: "2026-06-04T00:00:00+09:00",
    author: { "@type": "Organization", name: "VPS比較サイト", url: "https://vps.reload.co.jp" },
    publisher: { "@type": "Organization", name: "Reload, Inc.", url: "https://reload.co.jp/" },
    mainEntityOfPage: "/articles/vps-price-trend/",
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "VPS比較サイト", item: "/" },
      { "@type": "ListItem", position: 2, name: "記事一覧", item: "/articles/" },
      { "@type": "ListItem", position: 3, name: "VPS料金の推移と今後の見通し（2026年）", item: "/articles/vps-price-trend/" },
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

      {/* header */}
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
        <Link href="/articles/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
          ← 記事一覧へ戻る
        </Link>
        <nav
          aria-label="パンくず"
          style={{ color: "#718096", display: "flex", flexWrap: "wrap", fontSize: "0.88rem", gap: "0.5rem" }}
        >
          <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>ホーム</Link>
          <span>/</span>
          <Link href="/articles/" style={{ color: "#3EA8FF", textDecoration: "none" }}>記事一覧</Link>
          <span>/</span>
          <span>VPS料金の推移と今後の見通し（2026年）</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 920 }}>
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
            Price Trend
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}>
            VPS料金の推移と今後の見通し（2026年）
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 820 }}>
            このサイトで管理している国内・海外VPSの料金データをもとに、2026年4月のサイト開設から6月にかけての価格変動を整理しました。
            値上がりしたサービス・据え置きのサービス・背景となる要因・今後の動向の見通しをまとめています。
          </p>
          <p style={{ color: "#718096", fontSize: "0.88rem" }}>調査・更新: 2026年6月4日</p>
        </div>
      </section>

      {/* overview */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.4rem", paddingInline: "0.25rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>変動の概況</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            2026年4月から6月にかけて確認できた変動パターンは大きく3つです。
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          }}
        >
          {[
            {
              label: "国内VPS（値上げあり）",
              count: "2サービス",
              desc: "クラウドVPS byGMO・お名前.com VPS が全プランで値上げ。上昇幅は13〜25%。",
              color: "#fff5f5",
              border: "#fed7d7",
              textColor: "#c53030",
            },
            {
              label: "海外VPS（USD改定）",
              count: "2サービス",
              desc: "Lightsail・Linodeがそれぞれ20%のUSD値上げ。円安との複合で円換算コストは大幅増。",
              color: "#fffaf0",
              border: "#fbd38d",
              textColor: "#c05621",
            },
            {
              label: "据え置き",
              count: "7サービス",
              desc: "ConoHa・さくら・XServer・シンVPS・KAGOYA・WebARENA Indigo・DigitalOceanは変動なし。",
              color: "#f0fff4",
              border: "#9ae6b4",
              textColor: "#276749",
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: item.color,
                border: `1px solid ${item.border}`,
                borderRadius: 8,
                display: "grid",
                gap: "0.5rem",
                padding: "1rem",
              }}
            >
              <div style={{ alignItems: "center", display: "flex", gap: "0.6rem" }}>
                <strong style={{ color: item.textColor, fontSize: "1.05rem" }}>{item.label}</strong>
                <span
                  style={{
                    background: "#ffffff",
                    border: `1px solid ${item.border}`,
                    borderRadius: 999,
                    color: item.textColor,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    padding: "0.2rem 0.6rem",
                  }}
                >
                  {item.count}
                </span>
              </div>
              <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.75 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* timeline */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)" }}>変動タイムライン</h2>
        <div style={{ display: "grid", gap: "0" }}>
          {[
            {
              date: "2026年4月",
              title: "サイト開設・初期データ収集",
              desc: "国内外11サービスの料金を記録。この時点の価格が「改定前」の基準値。",
              changed: false,
            },
            {
              date: "2026年6月4日",
              title: "料金改定を確認・データ更新",
              desc: "クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linode（Akamai）の4サービスで改定を確認。サイトのデータを最新情報に更新。",
              changed: true,
            },
          ].map((item, i, arr) => (
            <div key={item.date} style={{ display: "flex", gap: "1rem" }}>
              <div style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    background: item.changed ? "#e53e3e" : "#4a5568",
                    borderRadius: "50%",
                    flexShrink: 0,
                    height: 12,
                    marginTop: 6,
                    width: 12,
                  }}
                />
                {i < arr.length - 1 && (
                  <div style={{ background: "#e2e8f0", flexGrow: 1, marginBlock: 4, width: 2 }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? "1.25rem" : 0 }}>
                <span style={{ color: "#718096", fontSize: "0.82rem" }}>{item.date}</span>
                <p style={{ fontWeight: 600, lineHeight: 1.4, marginTop: 2 }}>{item.title}</p>
                <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.75, marginTop: 4 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* changed services */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.4rem", paddingInline: "0.25rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>値上がりしたサービスの詳細</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
            プランごとの変動幅と背景をまとめました。
          </p>
        </div>
        {changedServices.map((service) => (
          <article key={service.name} style={sectionStyle}>
            <div style={{ alignItems: "flex-start", display: "flex", flexWrap: "wrap", gap: "0.6rem", justifyContent: "space-between" }}>
              <h3 style={{ fontSize: "1.2rem" }}>{service.name}</h3>
              <a
                href={service.href}
                rel="noopener noreferrer nofollow"
                style={{ color: "#3EA8FF", fontSize: "0.85rem", textDecoration: "none" }}
                target="_blank"
              >
                公式ページ →
              </a>
            </div>

            {/* bar chart per plan */}
            <div style={{ display: "grid", gap: "1rem" }}>
              {service.plans.map((plan) => (
                <div key={plan.label}>
                  <div style={{ alignItems: "center", display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>{plan.label}</span>
                    <span
                      style={{
                        background: "#fff5f5",
                        border: "1px solid #fed7d7",
                        borderRadius: 999,
                        color: "#c53030",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "0.15rem 0.5rem",
                      }}
                    >
                      {pct(plan.before, plan.after)}
                    </span>
                  </div>
                  <BarChart before={plan.before} after={plan.after} currency={service.currency} />
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #e2e8f0", display: "grid", gap: "0.4rem", paddingTop: "0.75rem" }}>
              <p style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.75 }}>
                <strong>変動幅: </strong>{service.note}
              </p>
              <p style={{ color: "#718096", fontSize: "0.88rem", lineHeight: 1.75 }}>
                <strong>背景: </strong>{service.reason}
              </p>
            </div>

            {/* summary table */}
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>プラン</th>
                    <th style={thStyle}>改定前</th>
                    <th style={thStyle}>改定後</th>
                    <th style={thStyle}>増加額</th>
                    <th style={thStyle}>増加率</th>
                  </tr>
                </thead>
                <tbody>
                  {service.plans.map((plan) => {
                    const prefix = service.currency === "JPY" ? "¥" : "$"
                    return (
                      <tr key={plan.label}>
                        <td style={tdStyle}>{plan.label}</td>
                        <td style={tdStyle}>{prefix}{plan.before.toLocaleString()}</td>
                        <td style={{ ...tdStyle, color: "#c53030", fontWeight: 600 }}>
                          {prefix}{plan.after.toLocaleString()}
                        </td>
                        <td style={tdStyle}>+{prefix}{(plan.after - plan.before).toLocaleString()}</td>
                        <td style={{ ...tdStyle, color: "#c53030" }}>{pct(plan.before, plan.after)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </section>

      {/* stable services */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)" }}>据え置きのサービス（2026年4月→6月）</h2>
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>
          以下のサービスは2026年4月のデータ収集以降、料金変更を確認していません。
        </p>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          {stableServices.map((s) => (
            <div
              key={s.name}
              style={{
                alignItems: "center",
                background: "#f0fff4",
                border: "1px solid #9ae6b4",
                borderRadius: 6,
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                padding: "0.65rem 0.9rem",
              }}
            >
              <span style={{ fontWeight: 600, minWidth: 160 }}>{s.name}</span>
              <span
                style={{
                  background: "#ffffff",
                  border: "1px solid #9ae6b4",
                  borderRadius: 999,
                  color: "#276749",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  padding: "0.15rem 0.55rem",
                }}
              >
                据え置き
              </span>
              <span style={{ color: "#4a5568", fontSize: "0.88rem" }}>{s.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* background / analysis */}
      <section style={{ display: "grid", gap: "1rem" }}>
        <div style={{ display: "grid", gap: "0.4rem", paddingInline: "0.25rem" }}>
          <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)" }}>料金変動の背景</h2>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
          }}
        >
          {[
            {
              title: "国内VPSのコスト上昇",
              body: "データセンターの電力費・冷却費・人件費は国内でも上昇基調にあります。クラウドVPS byGMOとお名前.com VPSは同傾向のなかで13〜25%の価格転嫁を実施しました。ConoHa・さくら・XServerなど主要各社は現時点では価格を据え置いていますが、同様のコスト圧力を受けていることは変わりありません。",
            },
            {
              title: "円安による海外VPSのコスト増",
              body: "Lightsail・LinodeはUSD建て料金の改定（20%）と円安（¥110→¥150水準）の複合で、円ベースのコストが旧来比2〜2.5倍近くになっているケースもあります。たとえばLightsail 1GBは旧¥550相当（$5×¥110）から現¥1,050相当（$7×¥150）へと約1.9倍に上昇しています。",
            },
            {
              title: "DigitalOceanの注意点",
              body: "DigitalOcean Dropletsは当サイトのデータ上は $4〜と記録されており、USD建て表示のままです。円安水準を考慮すると1GB Basicで実質¥900相当（$6×¥150）となり、国内VPS最安帯と比較しても割高感が増しています。為替の動向によっては、海外VPSの選択理由を改めて検討する価値があります。",
            },
          ].map((item) => (
            <article key={item.title} style={sectionStyle}>
              <h3 style={{ fontSize: "1.05rem", lineHeight: 1.4 }}>{item.title}</h3>
              <p style={{ color: "#4a5568", lineHeight: 1.85 }}>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* outlook */}
      <section style={sectionStyle}>
        <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.7rem)" }}>今後の料金動向の見通し</h2>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {[
            {
              icon: "▲",
              color: "#c53030",
              title: "国内VPS — コスト転嫁が波及する可能性あり",
              body: "byGMO・お名前.comで先行した値上げが、他の国内VPSに波及するかどうかが注目点です。ConoHa・XServer・シンVPS・KAGOYAは現時点で据え置きですが、インフラコストの上昇圧力は同様にかかっています。今後1〜2年で改定が起きる可能性は否定できません。",
            },
            {
              icon: "▲",
              color: "#c05621",
              title: "海外VPS — 円安が続く限り割高感は続く",
              body: "USD建て料金が改定された後も、為替が¥150前後で推移する限り、海外VPSの円換算コストは国内と比べて高い水準が続きます。海外リージョンや特定のクラウドサービスとの連携が目的でない限り、国内VPSの方がコスト面で有利な状況が続く見通しです。",
            },
            {
              icon: "→",
              color: "#2b6cb0",
              title: "選択のポイント — 長期契約よりも乗り換えやすさを意識する",
              body: "料金変動が続く環境では、長期契約割引で初期費用を下げつつも、途中解約のコスト（残余分の扱い）やデータ移行のしやすさを事前に確認しておくことが重要です。特に複数年契約は将来の値上げ時に有利ですが、サービス品質の変化リスクも伴います。",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                borderLeft: `3px solid ${item.color}`,
                display: "grid",
                gap: "0.4rem",
                paddingLeft: "0.9rem",
              }}
            >
              <h3 style={{ color: item.color, fontSize: "1rem", lineHeight: 1.4 }}>
                {item.icon} {item.title}
              </h3>
              <p style={{ color: "#4a5568", lineHeight: 1.85 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* related links */}
      <section
        style={{
          ...sectionStyle,
          background: "#eef6ff",
          border: "1px solid #bee3f8",
        }}
      >
        <h2 style={{ fontSize: "1.15rem" }}>関連ページ</h2>
        <div style={{ display: "grid", gap: "0.5rem" }}>
          <Link href="/news/vps-price-update-2026-06/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            → VPS料金改定まとめ（2026年6月）— 変更前後の価格を一覧で確認
          </Link>
          <Link href="/lp/2026-06-campaign/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            → 2026年6月のVPSキャンペーンまとめ — 現在有効な割引情報
          </Link>
          <Link href="/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            → VPS比較一覧 — 最新料金での横断比較
          </Link>
        </div>
      </section>
    </div>
  )
}

export default VpsPriceTrendPage
