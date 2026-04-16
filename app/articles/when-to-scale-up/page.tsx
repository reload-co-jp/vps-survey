import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "どの状態になったらVPSをスケールアップすべきか",
  description:
    "CPU、メモリ、ディスク、レスポンス時間、DB負荷などから、VPSをスケールアップする判断基準を分かりやすく解説します。",
  alternates: {
    canonical: "/articles/when-to-scale-up/",
  },
  openGraph: {
    title: "どの状態になったらVPSをスケールアップすべきか",
    description:
      "CPU、メモリ、ディスク、レスポンス時間、DB負荷などから、VPSをスケールアップする判断基準を分かりやすく解説します。",
    images: [
      {
        alt: "どの状態になったらVPSをスケールアップすべきか",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/when-to-scale-up/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "CPU、メモリ、ディスク、レスポンス時間、DB負荷などから、VPSをスケールアップする判断基準を分かりやすく解説します。",
    images: ["/twitter-image"],
    title: "どの状態になったらVPSをスケールアップすべきか",
  },
}

const sectionStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "clamp(20px, 4vw, 24px)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const alertCardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18,
  display: "grid",
  gap: "0.45rem",
  padding: "1rem",
}

const WhenToScaleUpPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "どの状態になったらVPSをスケールアップすべきか",
    description:
      "CPU、メモリ、ディスク、レスポンス時間、DB負荷などから、VPSをスケールアップする判断基準を分かりやすく解説します。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/when-to-scale-up/",
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
        name: "どの状態になったらVPSをスケールアップすべきか",
        item: "/articles/when-to-scale-up/",
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
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.22), transparent 32%), linear-gradient(135deg, #10203e 0%, #07101f 55%, #040812 100%)",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: "clamp(20px, 4vw, 32px)",
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
          <Link href="/articles/" style={{ color: "#9edaff", textDecoration: "none" }}>
            記事一覧
          </Link>
          <span>/</span>
          <span>どの状態になったらVPSをスケールアップすべきか</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 900 }}>
          <span
            style={{
              background: "rgba(112, 214, 255, 0.14)",
              border: "1px solid rgba(112, 214, 255, 0.25)",
              borderRadius: 999,
              color: "#9ee9ff",
              display: "inline-flex",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "0.45rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            Scaling Guide
          </span>
          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", lineHeight: 1.08 }}>
            どの状態になったら
            <br />
            VPSをスケールアップすべきか
          </h1>
          <p style={{ color: "#c9d8f2", lineHeight: 1.9, maxWidth: 820 }}>
            VPSは早すぎる増強も、遅すぎる増強もコストにつながります。CPU使用率が高いだけではなく、
            メモリ不足、レスポンス悪化、ディスク逼迫、運用のしんどさまで含めて判断すると失敗しにくくなります。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>まず見るべきはCPUよりメモリ</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            小規模Webサービスでは、CPUが少し高いだけでは即スケールアップとは限りません。
            それよりも、メモリ不足でスワップが発生している状態のほうが深刻です。コンテナ再起動、
            DBの不安定化、レスポンス低下につながりやすいからです。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>メモリ使用率が常時80〜90%を超える。</li>
            <li style={itemStyle}>スワップが継続的に使われる。</li>
            <li style={itemStyle}>DBやAPIがメモリ不足で落ちることがある。</li>
          </ul>
          <p style={{ color: "#b8cce6", lineHeight: 1.8 }}>
            この状態なら、まずは1段階上のメモリ帯を検討したほうが効果が出やすいです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>CPU使用率が高いときの見方</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            CPU使用率が一瞬高いだけなら、ただのピークかもしれません。問題なのは、
            平常時でも高止まりしているケースです。特にAPIサーバーやワーカーが常に忙しいなら、
            スケールアップの優先度は高くなります。
          </p>
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            <div style={alertCardStyle}>
              <strong style={{ fontSize: "1rem" }}>すぐ増強しなくてよい例</strong>
              <p style={cardTextStyle}>
                デプロイ直後やバッチ実行時だけ一時的にCPUが上がる。
              </p>
            </div>
            <div style={alertCardStyle}>
              <strong style={{ fontSize: "1rem" }}>増強を考える例</strong>
              <p style={cardTextStyle}>
                平常時でもCPUが70〜80%前後で張り付き、応答が遅くなる。
              </p>
            </div>
          </div>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>レスポンスが落ちてきたら要注意</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            ユーザー視点でいちばん分かりやすいサインは、ページ表示やAPIレスポンスの遅さです。
            サーバー監視だけでなく、アプリ側の体感速度も重要な判断材料になります。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>アクセス増加時にタイムアウトが増える。</li>
            <li style={itemStyle}>普段よりAPI応答が明らかに遅くなる。</li>
            <li style={itemStyle}>DBクエリが詰まりやすくなる。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>ディスク容量とIOも見落とさない</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            DB、ログ、Dockerイメージ、バックアップを同居させていると、ストレージは意外と早く埋まります。
            空き容量が少なくなると、更新やバックアップの失敗が起きやすくなります。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>空き容量が20%を切ってきた。</li>
            <li style={itemStyle}>ログローテーションしても圧迫感がある。</li>
            <li style={itemStyle}>DBサイズの成長が明らかに見えている。</li>
          </ul>
          <p style={{ color: "#b8cce6", lineHeight: 1.8 }}>
            この場合はCPUやメモリだけでなく、ストレージ容量が大きい上位プランを見るべきです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>運用がしんどくなったら、それもサイン</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            毎回リリース前に不要コンテナを消したり、メモリ節約のためにサービスを止めたりしているなら、
            すでに小さすぎる可能性があります。技術的には動いていても、運用コストが高い状態です。
          </p>
          <ul style={listStyle}>
            <li style={itemStyle}>監視のたびにメモリ残量を気にする。</li>
            <li style={itemStyle}>デプロイのたびにリソース不足が不安になる。</li>
            <li style={itemStyle}>ログやDBの整理を頻繁にしないと安定しない。</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>判断に迷ったらこの順番</h2>
          <ol style={orderedListStyle}>
            <li style={itemStyle}>メモリ使用率とスワップを確認する。</li>
            <li style={itemStyle}>平常時のCPU使用率を見る。</li>
            <li style={itemStyle}>レスポンス時間とタイムアウトを確認する。</li>
            <li style={itemStyle}>ディスク残量とDBサイズの伸びを見る。</li>
            <li style={itemStyle}>運用上の我慢が増えていないか振り返る。</li>
          </ol>
        </article>

        <article
          style={{
            ...sectionStyle,
            background:
              "linear-gradient(135deg, rgba(123, 225, 255, 0.12), rgba(139, 179, 255, 0.12))",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>実際に比較するときの見方</h2>
          <p style={{ color: "#d4e1f3", lineHeight: 1.85 }}>
            いま使っている構成より、1段階上のメモリ帯とストレージ帯を持つプランを見比べると判断しやすいです。
            特に2GBから4GB、4GBから8GBは変化が大きく、体感も変わりやすい帯です。
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
  color: "#d9e7f8",
  display: "grid",
  gap: "0.65rem",
  paddingLeft: "1.2rem",
}

const orderedListStyle = {
  color: "#d9e7f8",
  display: "grid",
  gap: "0.75rem",
  paddingLeft: "1.2rem",
}

const itemStyle = {
  lineHeight: 1.8,
}

const cardTextStyle = {
  color: "#b8cce6",
  lineHeight: 1.7,
}

const buttonStyle = {
  alignItems: "center",
  background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
  borderRadius: 18,
  color: "#031321",
  display: "inline-flex",
  fontSize: "1rem",
  fontWeight: 800,
  justifyContent: "center",
  minHeight: 54,
  padding: "0.9rem 1.1rem",
  textDecoration: "none",
  width: "fit-content",
}

export default WhenToScaleUpPage
