import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "オブジェクトストレージとは何か",
  description:
    "オブジェクトストレージの基本、ファイルストレージやブロックストレージとの違い、VPSと組み合わせるメリット、向いている用途を分かりやすく解説する記事です。",
  alternates: {
    canonical: "/articles/object-storage/",
  },
  openGraph: {
    title: "オブジェクトストレージとは何か",
    description:
      "オブジェクトストレージの基本、ファイルストレージやブロックストレージとの違い、VPSと組み合わせるメリット、向いている用途を分かりやすく解説する記事です。",
    images: [
      {
        alt: "オブジェクトストレージとは何か",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    type: "article",
    url: "/articles/object-storage/",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "オブジェクトストレージの基本、ファイルストレージやブロックストレージとの違い、VPSと組み合わせるメリット、向いている用途を分かりやすく解説する記事です。",
    images: ["/twitter-image"],
    title: "オブジェクトストレージとは何か",
  },
}

const sectionStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 4,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  display: "grid",
  gap: "0.9rem",
  padding: "clamp(1rem, 3vw, 1.35rem)",
}

const ObjectStoragePage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "オブジェクトストレージとは何か",
    description:
      "オブジェクトストレージの基本、ファイルストレージやブロックストレージとの違い、VPSと組み合わせるメリット、向いている用途を分かりやすく解説する記事です。",
    inLanguage: "ja",
    mainEntityOfPage: "/articles/object-storage/",
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
        name: "オブジェクトストレージとは何か",
        item: "/articles/object-storage/",
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
          borderRadius: 4,
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
          <span>オブジェクトストレージとは何か</span>
        </nav>
        <div style={{ display: "grid", gap: "0.8rem", maxWidth: 860 }}>
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
            Storage Guide
          </span>
          <h1
            style={{
              color: "#1a202c",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            オブジェクトストレージとは何か
          </h1>
          <p style={{ color: "#4a5568", lineHeight: 1.9, maxWidth: 760 }}>
            オブジェクトストレージは、画像、動画、バックアップ、ログのような
            大量ファイルを安く柔軟に置くための仕組みです。VPS本体のディスクと役割を分けることで、
            コストと運用の両方を整理しやすくなります。
          </p>
        </div>
      </section>

      <section style={{ display: "grid", gap: "1rem" }}>
        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>オブジェクトストレージの基本</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            オブジェクトストレージは、データをファイルそのものではなく
            「オブジェクト」として保存するストレージです。各オブジェクトには
            本体データに加えてメタデータや一意な識別子が付いていて、
            URL や API を通じて取得・保存します。
          </p>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            ローカルディスクのようにフォルダへ直接マウントして使うというより、
            HTTP ベースで読み書きする前提の保存先だと考えると分かりやすいです。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>ファイルストレージ・ブロックストレージとの違い</h2>
          <div
            style={{
              display: "grid",
              gap: "0.8rem",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            }}
          >
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>オブジェクトストレージ</strong>
              <p style={miniCardTextStyle}>
                画像、バックアップ、ログ保管向き。API 経由で使い、大量保存を安価にしやすいです。
              </p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>ファイルストレージ</strong>
              <p style={miniCardTextStyle}>
                複数サーバーで共有したいファイル向き。ディレクトリ構造で扱いやすいのが特徴です。
              </p>
            </div>
            <div style={miniCardStyle}>
              <strong style={{ fontSize: "1rem" }}>ブロックストレージ</strong>
              <p style={miniCardTextStyle}>
                VPS に追加ディスクとしてつなぐ用途向き。DB や OS に近いレイヤーで使います。
              </p>
            </div>
          </div>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPSと組み合わせるメリット</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>
              画像や動画を VPS のローカルディスクから切り離し、サーバー本体を軽くできます。
            </li>
            <li style={itemStyle}>
              バックアップを別ストレージに逃がせるので、サーバー障害時のリスク分散になります。
            </li>
            <li style={itemStyle}>
              容量が増えても VPS プランごと上げずに済む場面が多く、コスト管理がしやすくなります。
            </li>
            <li style={itemStyle}>
              CDN と組み合わせれば、静的ファイル配信の速度と負荷分散も行いやすいです。
            </li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>どんな用途に向いているか</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>ユーザー投稿画像、商品画像、ダウンロードファイルの保存</li>
            <li style={itemStyle}>DB ダンプやアプリケーションのバックアップ保管</li>
            <li style={itemStyle}>アクセスログ、分析ログ、アーカイブデータの退避</li>
            <li style={itemStyle}>静的サイトのアセット配信や CDN のオリジン</li>
            <li style={itemStyle}>複数環境で共通して参照する大きなファイルの置き場</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>逆に向かない用途</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            オブジェクトストレージは API 経由でアクセスする前提なので、
            DB のデータファイルや OS のアプリ実行領域のように低レイテンシで細かく読み書きしたい用途には向きません。
            そうした用途では VPS のローカル NVMe やブロックストレージの方が適しています。
          </p>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>料金を見るときのポイント</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>保存容量だけでなく、外向き通信量の課金有無を見る</li>
            <li style={itemStyle}>PUT/GET など API リクエスト課金の有無を確認する</li>
            <li style={itemStyle}>バックアップ保管なら低頻度アクセス向けクラスが使えるかを見る</li>
            <li style={itemStyle}>VPS と同じ事業者でそろえると転送や認証が楽な場合がある</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>初心者がはまりやすいポイント</h2>
          <ul style={listStyle}>
            <li style={itemStyle}>公開設定を広げすぎて、非公開データまで配信してしまう</li>
            <li style={itemStyle}>大量アクセス時の通信量課金を見落とす</li>
            <li style={itemStyle}>画像変換や縮小処理を全部アプリ側で持ち、VPS負荷が高くなる</li>
            <li style={itemStyle}>バックアップ先として使っているのに、世代管理や削除ポリシーを決めていない</li>
          </ul>
        </article>

        <article style={sectionStyle}>
          <h2 style={{ fontSize: "1.3rem" }}>VPS運用での現実的な使い分け</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            小規模サービスなら、アプリ本体と DB は VPS、画像やバックアップはオブジェクトストレージ、
            静的配信は CDN という分け方が分かりやすいです。最初から全部を分離しなくても、
            ファイル量が増え始めた段階でオブジェクトストレージへ逃がすだけでも十分効果があります。
          </p>
        </article>

        <article
          style={{
            ...sectionStyle,
            background: "#eef6ff",
          }}
        >
          <h2 style={{ fontSize: "1.3rem" }}>VPSを選ぶときに一緒に考える</h2>
          <p style={{ color: "#4a5568", lineHeight: 1.85 }}>
            画像やバックアップをオブジェクトストレージへ逃がす前提なら、
            VPS本体は CPU とメモリ重視で選びやすくなります。ディスク容量だけで高いプランを選ぶ必要があるかを一度見直せます。
          </p>
          <Link href="/" style={buttonStyle}>
            VPS一覧で比較する
          </Link>
        </article>
      </section>
    </div>
  )
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

const listStyle = {
  color: "#4a5568",
  display: "grid",
  gap: "0.65rem",
  paddingLeft: "1.2rem",
}

const itemStyle = {
  lineHeight: 1.8,
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

export default ObjectStoragePage
