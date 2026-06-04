import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "VPS料金改定まとめ（2026年6月）｜GMOクラウドVPS・お名前.com VPS・Lightsail・Linode",
  description:
    "2026年6月時点の調査で、クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linodeの料金が改定されていることを確認。各サービスの変更前後の価格をまとめました。",
  keywords: [
    "VPS 値上げ 2026",
    "クラウドVPS byGMO 料金改定",
    "お名前.com VPS 値上げ",
    "Amazon Lightsail 料金改定",
    "Linode Akamai 料金",
    "VPS 料金比較 2026",
  ],
  alternates: {
    canonical: "/news/vps-price-update-2026-06/",
  },
  openGraph: {
    title: "VPS料金改定まとめ（2026年6月）",
    description:
      "クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linodeで料金改定を確認。変更前後の価格をまとめました。",
    images: [
      {
        alt: "VPS料金改定まとめ（2026年6月）",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/news/vps-price-update-2026-06/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linodeで料金改定を確認。変更前後の価格をまとめました。",
    images: ["/twitter-image"],
    title: "VPS料金改定まとめ（2026年6月）",
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

const tableStyle: React.CSSProperties = {
  borderCollapse: "collapse",
  fontSize: "0.9rem",
  width: "100%",
}

const thStyle: React.CSSProperties = {
  background: "#f7fafc",
  border: "1px solid #e2e8f0",
  padding: "0.5rem 0.75rem",
  textAlign: "left",
  whiteSpace: "nowrap",
}

const tdStyle: React.CSSProperties = {
  border: "1px solid #e2e8f0",
  padding: "0.5rem 0.75rem",
}

const tdNewStyle: React.CSSProperties = {
  ...tdStyle,
  color: "#c53030",
  fontWeight: 600,
}

const VpsPriceUpdate202606Page = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "VPS料金改定まとめ（2026年6月）",
    description:
      "クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linodeで料金改定を確認。変更前後の価格をまとめました。",
    inLanguage: "ja",
    datePublished: "2026-06-04T00:00:00+09:00",
    dateModified: "2026-06-04T00:00:00+09:00",
    author: { "@type": "Organization", name: "VPS比較サイト", url: "https://vps.reload.co.jp" },
    publisher: { "@type": "Organization", name: "Reload, Inc.", url: "https://reload.co.jp/" },
    mainEntityOfPage: "/news/vps-price-update-2026-06/",
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "VPS比較サイト", item: "/" },
      { "@type": "ListItem", position: 2, name: "ニュース一覧", item: "/news/" },
      { "@type": "ListItem", position: 3, name: "VPS料金改定まとめ（2026年6月）", item: "/news/vps-price-update-2026-06/" },
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
          <Link href="/news/" style={{ color: "#3EA8FF", textDecoration: "none" }}>
            ニュース一覧
          </Link>
          <span>/</span>
          <span>VPS料金改定まとめ（2026年6月）</span>
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
            News
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}>
            VPS料金改定まとめ（2026年6月）
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 820 }}>
            2026年6月時点の各社公式ページを調査した結果、クラウドVPS byGMO・お名前.com VPS・Amazon Lightsail・Linode（Akamai Cloud）の4サービスで料金改定を確認しました。
            ConoHa VPS・さくらのVPS・XServer VPS・シンVPS・KAGOYA CLOUD VPS・WebARENA Indigoについては変更なしです。
          </p>
          <p style={{ color: "#718096", fontSize: "0.9rem" }}>調査日: 2026年6月4日</p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>クラウドVPS byGMO — 全プラン値上げ</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            クラウドVPS byGMO は全6プランで月額料金が引き上げられています。1GBプランで約220円、12GBプランで約880円の値上げとなり、いずれも約25〜30%の上昇です。
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>プラン</th>
                  <th style={thStyle}>改定前</th>
                  <th style={thStyle}>改定後</th>
                  <th style={thStyle}>差額</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: "1GB", before: 858, after: 1078 },
                  { plan: "2GB", before: 1408, after: 1628 },
                  { plan: "4GB", before: 2618, after: 3113 },
                  { plan: "6GB", before: 5038, after: 5698 },
                  { plan: "8GB", before: 7238, after: 7898 },
                  { plan: "12GB", before: 11528, after: 12408 },
                ].map(({ plan, before, after }) => (
                  <tr key={plan}>
                    <td style={tdStyle}>{plan}</td>
                    <td style={tdStyle}>¥{before.toLocaleString()}</td>
                    <td style={tdNewStyle}>¥{after.toLocaleString()}</td>
                    <td style={tdStyle}>+¥{(after - before).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#718096", fontSize: "0.88rem" }}>
            出典:{" "}
            <a
              href="https://vps.gmocloud.com/vps2015/service/"
              rel="noopener noreferrer nofollow"
              style={{ color: "#3EA8FF", textDecoration: "none" }}
              target="_blank"
            >
              クラウドVPS byGMO 公式サービスページ
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>お名前.com VPS — 全プラン値上げ</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            お名前.com VPS も全5プランで値上げが確認されました。1GBプランで約112円、16GBプランで約2,700円の上昇です。なお、表示料金は12カ月払いの月額換算であり、別途サービス維持調整費が加算される点は変わりありません。
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>プラン</th>
                  <th style={thStyle}>改定前</th>
                  <th style={thStyle}>改定後</th>
                  <th style={thStyle}>差額</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: "1GB", before: 873, after: 985 },
                  { plan: "2GB", before: 1209, after: 1446 },
                  { plan: "4GB", before: 3398, after: 4065 },
                  { plan: "8GB", before: 6899, after: 8255 },
                  { plan: "16GB", before: 13903, after: 16636 },
                ].map(({ plan, before, after }) => (
                  <tr key={plan}>
                    <td style={tdStyle}>{plan}</td>
                    <td style={tdStyle}>¥{before.toLocaleString()}</td>
                    <td style={tdNewStyle}>¥{after.toLocaleString()}</td>
                    <td style={tdStyle}>+¥{(after - before).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#718096", fontSize: "0.88rem" }}>
            出典:{" "}
            <a
              href="https://www.onamae.com/server/vps/"
              rel="noopener noreferrer nofollow"
              style={{ color: "#3EA8FF", textDecoration: "none" }}
              target="_blank"
            >
              お名前.com VPS 公式サービスページ
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>Amazon Lightsail — 料金体系が改定</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            Amazon Lightsail はプラン体系が見直されました。以前の $5/$10/$20（1GB/2GB/4GB）から $7/$12/$24 へと値上げされています。
            USD建て料金の改定に加え、円安の進行も重なり、円換算では以前と比べて大幅な負担増となっています。
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>プラン</th>
                  <th style={thStyle}>改定前（USD）</th>
                  <th style={thStyle}>改定後（USD）</th>
                  <th style={thStyle}>円換算目安（改定後）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: "1GB", before: "$5", after: "$7", jpy: "¥1,050" },
                  { plan: "2GB", before: "$10", after: "$12", jpy: "¥1,800" },
                  { plan: "4GB", before: "$20", after: "$24", jpy: "¥3,600" },
                ].map(({ plan, before, after, jpy }) => (
                  <tr key={plan}>
                    <td style={tdStyle}>{plan}</td>
                    <td style={tdStyle}>{before}/月</td>
                    <td style={tdNewStyle}>{after}/月</td>
                    <td style={tdStyle}>{jpy}〜/月</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#718096", fontSize: "0.88rem", lineHeight: 1.7 }}>
            ※円換算は1USD=150円で計算した目安です。実際の請求は為替レートにより変動します。
          </p>
          <p style={{ color: "#718096", fontSize: "0.88rem" }}>
            出典:{" "}
            <a
              href="https://aws.amazon.com/lightsail/pricing/"
              rel="noopener noreferrer nofollow"
              style={{ color: "#3EA8FF", textDecoration: "none" }}
              target="_blank"
            >
              Amazon Lightsail Pricing
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>Linode（Akamai Cloud Computing）— ブランド統合と料金改定</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            Linode は Akamai Cloud Computing として統合されており、Shared CPU プランの料金が改定されています。
            2GBプランは旧来の $10 から $12 へ、4GBは $20 から $24 へと引き上げられました。
            linode.com は akamai.com へリダイレクトされており、ブランドとして「Linode」の名称は引き続き使われているものの、
            サービスの実体は Akamai Cloud に統合されています。
          </p>
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>プラン</th>
                  <th style={thStyle}>改定前（USD）</th>
                  <th style={thStyle}>改定後（USD）</th>
                  <th style={thStyle}>円換算目安（改定後）</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: "Shared 2GB", before: "$10", after: "$12", jpy: "¥1,800" },
                  { plan: "Shared 4GB", before: "$20", after: "$24", jpy: "¥3,600" },
                  { plan: "Shared 8GB", before: "$40", after: "$48", jpy: "¥7,200" },
                ].map(({ plan, before, after, jpy }) => (
                  <tr key={plan}>
                    <td style={tdStyle}>{plan}</td>
                    <td style={tdStyle}>{before}/月</td>
                    <td style={tdNewStyle}>{after}/月</td>
                    <td style={tdStyle}>{jpy}〜/月</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: "#718096", fontSize: "0.88rem", lineHeight: 1.7 }}>
            ※円換算は1USD=150円で計算した目安です。実際の請求は為替レートにより変動します。
          </p>
          <p style={{ color: "#718096", fontSize: "0.88rem" }}>
            出典:{" "}
            <a
              href="https://techdocs.akamai.com/cloud-computing/docs/shared-cpu-compute-instances"
              rel="noopener noreferrer nofollow"
              style={{ color: "#3EA8FF", textDecoration: "none" }}
              target="_blank"
            >
              Akamai Cloud — Shared CPU Compute Instances
            </a>
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>変更なしのサービス（2026年6月時点）</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            以下のサービスは今回の調査で料金変更を確認しませんでした。
          </p>
          <ul style={{ color: "#4a5568", display: "grid", gap: "0.4rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
            <li><strong>ConoHa VPS</strong> — 512MB〜128GBの全プランで変更なし</li>
            <li><strong>さくらのVPS</strong> — 512MB〜4GBの確認プランで変更なし</li>
            <li><strong>XServer VPS</strong> — 2GB〜96GBの全プランで変更なし</li>
            <li><strong>シンVPS</strong> — スタンダード・メモリ全プランで変更なし</li>
            <li><strong>KAGOYA CLOUD VPS</strong> — 1GB〜32GBの全プランで変更なし</li>
            <li><strong>WebARENA Indigo</strong> — 768MB〜32GBの全プランで変更なし</li>
            <li><strong>DigitalOcean Droplets</strong> — Basic・CPU Optimized・General Purpose・Memory Optimized各プランで変更なし</li>
          </ul>
        </article>

        <article
          style={{
            ...sectionStyle,
            background: "#eef6ff",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>まとめ</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            今回の調査では、国内VPSではクラウドVPS byGMOとお名前.com VPSで約20〜25%の値上げが確認されました。
            一方、ConoHa VPS・さくらのVPS・XServer VPS・シンVPS・KAGOYAといった主要国内VPSは据え置きが続いています。
          </p>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            海外勢（Lightsail・Linode）はUSD建て料金の改定に加えて円安の影響が重なっており、円換算コストは以前より大幅に増加しています。
            国内VPSとの価格差が縮まりつつある点は、海外VPSを選ぶ際の注意点として覚えておく価値があります。
          </p>
          <Link
            href="/"
            style={{
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
            }}
          >
            最新の価格比較を見る
          </Link>
        </article>
      </section>
    </div>
  )
}

export default VpsPriceUpdate202606Page
