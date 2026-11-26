import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../../../components/breadcrumbs"
import { RelatedContent } from "../../../components/related-content"
import {
  BulletList,
  JsonLd,
  Section,
  TableOfContents,
  h1Style,
  h3Style,
  heroStyle,
  leadStyle,
  linkStyle,
  noteStyle,
  pageStackStyle,
  responsiveGrid,
  textStyle,
} from "../../../components/ui"
import {
  objectStorageServices,
  s3CompatibleLabel,
} from "../../../lib/object-storage"
import { absoluteUrl, siteName } from "../../../lib/site"

const path = "/storage/object-storage-comparison/"
const title =
  "オブジェクトストレージ比較｜ConoHa・さくら・Wasabi・Backblaze B2・Cloudflare R2の料金と特徴"
const description =
  "S3互換オブジェクトストレージを料金・転送量（egress）・APIリクエスト料金・最低料金で比較。国内のさくらのクラウド、ConoHa、海外のWasabi・Backblaze B2・Cloudflare R2の違いと、VPSと組み合わせる使い方を解説します。"
const checkedAt = "2026年11月26日"

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "オブジェクトストレージ 比較",
    "オブジェクトストレージ 料金",
    "S3互換 ストレージ 比較",
    "オブジェクトストレージ conoha",
    "Wasabi Backblaze B2 比較",
    "オブジェクトストレージ 低コスト",
  ],
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    type: "article",
    url: path,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  },
}

const fields = [
  { key: "storagePrice", label: "保存料金" },
  { key: "egress", label: "転送量（ダウンロード）" },
  { key: "requests", label: "APIリクエスト" },
  { key: "minimumCharge", label: "最低料金・最低保存期間" },
  { key: "freeTier", label: "無料枠" },
] as const

const ObjectStorageComparisonPage = () => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    inLanguage: "ja",
    datePublished: "2026-11-26T00:00:00+09:00",
    dateModified: "2026-11-26T00:00:00+09:00",
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(path),
  }

  return (
    <div style={pageStackStyle}>
      <JsonLd data={articleJsonLd} />
      <section style={heroStyle}>
        <Breadcrumbs items={[{ name: "オブジェクトストレージ比較", path }]} />
        <h1 style={h1Style}>
          オブジェクトストレージ比較｜料金・転送量・S3互換性
        </h1>
        <p style={leadStyle}>
          オブジェクトストレージは、画像・動画・バックアップなどのファイルを容量無制限に近い形で保存できるストレージです。料金は「保存容量」だけでなく「転送量（egress）」「APIリクエスト数」「最低料金」の組み合わせで決まるため、使い方によって最安のサービスが変わります。
        </p>
        <p style={noteStyle}>
          料金確認日：{checkedAt}
          （各社の公式料金ページを確認）。米ドル建てのサービスは円換算していません。
        </p>
      </section>

      <TableOfContents
        items={[
          { id: "points", label: "オブジェクトストレージの比較ポイント" },
          { id: "compare", label: "主要サービスの料金比較" },
          { id: "conoha", label: "ConoHaのオブジェクトストレージについて" },
          { id: "choose", label: "用途別の選び方" },
          { id: "with-vps", label: "VPSとオブジェクトストレージの組み合わせ" },
        ]}
      />

      <Section id="points" title="オブジェクトストレージの比較ポイント">
        <BulletList
          items={[
            "保存料金：1GBあたり・1TBあたりの月額。少量なら定額プラン、大容量なら容量単価が効きます。",
            "転送量（egress）：保存したファイルをダウンロード・配信するときの料金。配信用途では保存料金より大きくなることがあります。",
            "APIリクエスト料金：アップロード・一覧取得・ダウンロードなどの操作回数に対する料金。",
            "最低料金・最低保存期間：少量しか使わなくても発生する料金や、削除しても一定期間は課金される条件。",
            "S3互換API：Amazon S3互換なら、既存のツールやライブラリ（aws-cli、rclone、各種SDK）をそのまま使えます。",
            "リージョン：国内からのアクセスが中心なら国内リージョンの方が遅延は小さくなります。",
          ]}
        />
      </Section>

      <Section id="compare" title="主要オブジェクトストレージの料金比較">
        <div style={responsiveGrid("300px")}>
          {objectStorageServices.map((service) => (
            <article
              key={service.id}
              style={{
                background: service.unverified ? "#f8fafc" : "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                display: "grid",
                gap: "0.6rem",
                padding: "1rem",
              }}
            >
              <h3 style={h3Style}>{service.name}</h3>
              <p style={noteStyle}>
                提供：{service.provider} ／ 通貨：
                {service.currency === "JPY" ? "日本円" : "米ドル"}
              </p>
              <dl style={{ display: "grid", gap: "0.45rem", margin: 0 }}>
                {fields.map((field) => (
                  <div
                    key={field.key}
                    style={{ display: "grid", gap: "0.1rem" }}
                  >
                    <dt style={{ color: "#718096", fontSize: "0.8rem" }}>
                      {field.label}
                    </dt>
                    <dd
                      style={{
                        color: "#1a202c",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        margin: 0,
                      }}
                    >
                      {service[field.key] ??
                        (service.unverified
                          ? "未確認（公式で確認）"
                          : "記載なし")}
                    </dd>
                  </div>
                ))}
                <div style={{ display: "grid", gap: "0.1rem" }}>
                  <dt style={{ color: "#718096", fontSize: "0.8rem" }}>
                    S3互換API
                  </dt>
                  <dd
                    style={{ color: "#1a202c", fontSize: "0.9rem", margin: 0 }}
                  >
                    {s3CompatibleLabel[service.s3Compatible]}
                  </dd>
                </div>
              </dl>
              {service.note ? <p style={noteStyle}>{service.note}</p> : null}
              <a
                data-affiliate-link-type="official"
                data-affiliate-placement="comparison_table"
                data-affiliate-provider={service.id}
                href={service.pricingUrl}
                rel="noopener noreferrer"
                style={{ ...linkStyle, fontSize: "0.9rem" }}
                target="_blank"
              >
                公式の料金ページを見る ↗
              </a>
            </article>
          ))}
        </div>
        <p style={noteStyle}>
          料金は{checkedAt}
          時点で各公式ページに記載されていた内容です。「記載なし」は確認したページに該当する記載が見当たらなかった項目です。税の扱いや最新の条件は各公式サイトで確認してください。
        </p>
      </Section>

      <Section id="conoha" title="ConoHaのオブジェクトストレージについて">
        <p style={textStyle}>
          「オブジェクトストレージ conoha 料金」「conoha
          比較」といった検索が多く、ConoHa
          VPSと同じ管理画面で使えるオブジェクトストレージを検討している人は少なくありません。ただし、当サイトの確認時点ではConoHaの公式料金ページの内容を取得・確認できなかったため、料金は掲載していません。
        </p>
        <p style={textStyle}>
          ConoHa
          VPSと組み合わせる場合は、公式サイトで保存料金・転送量の課金条件・S3互換APIへの対応状況を確認したうえで、上の比較表のサービスと総額で比べるのがおすすめです。
        </p>
        <p>
          <Link href="/vps/conoha/" style={linkStyle}>
            ConoHa VPSの料金・評判を見る →
          </Link>
        </p>
      </Section>

      <Section id="choose" title="用途別のオブジェクトストレージの選び方">
        <div style={responsiveGrid("240px")}>
          {[
            {
              title: "少量のバックアップ（〜100GB程度）",
              body: "最低料金の小さいサービスや無料枠のあるサービスが有利です。1TB単位の最低料金があるサービスは、少量だと割高になります。",
            },
            {
              title: "大容量のバックアップ・アーカイブ",
              body: "TB単価の安さと、最低保存期間の条件を確認します。頻繁に取り出さないならダウンロード料金の影響は小さくなります。",
            },
            {
              title: "画像・動画などの配信",
              body: "転送量（egress）の料金が総額を左右します。egressが無料・低額のサービスや、CDNとの組み合わせを検討します。",
            },
            {
              title: "国内のVPSと同じ事業者でそろえたい",
              body: "国内事業者のサービスは日本円の請求・日本語サポートで管理しやすく、同じリージョン内の通信は遅延も小さくなります。",
            },
          ].map((item) => (
            <article
              key={item.title}
              style={{
                background: "#f7fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                display: "grid",
                gap: "0.4rem",
                padding: "0.9rem",
              }}
            >
              <h3 style={h3Style}>{item.title}</h3>
              <p style={{ ...textStyle, fontSize: "0.92rem" }}>{item.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="with-vps" title="VPSとオブジェクトストレージの組み合わせ">
        <p style={textStyle}>
          VPSのディスクは容量を増やすとプラン全体の料金が上がるため、増え続けるファイルやバックアップはオブジェクトストレージに逃がすとコストを抑えられます。VPSの障害時にもデータが残るため、バックアップの保存先としても有効です。
        </p>
        <BulletList
          items={[
            "WordPressのメディアファイルやバックアップをオブジェクトストレージに保存する",
            "データベースのダンプを毎日アップロードし、VPSと別の場所に保管する",
            "rclone や aws-cli でVPSのディレクトリを定期的に同期する",
          ]}
          marker="check"
        />
      </Section>

      <RelatedContent
        links={[
          {
            href: "/articles/object-storage/",
            title: "オブジェクトストレージとは",
            description: "ファイル・ブロックストレージとの違い",
          },
          {
            href: "/articles/vps-backup/",
            title: "VPSのバックアップ方法",
            description: "スナップショットと外部保存の使い分け",
          },
          { href: "/use-cases/wordpress/", title: "WordPress向けVPS比較" },
          { href: "/vps/sakura/", title: "さくらのVPSの料金・評判" },
        ]}
      />
    </div>
  )
}

export default ObjectStorageComparisonPage
