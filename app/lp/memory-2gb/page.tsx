import type { Metadata } from "next"
import { FilteredVpsPage } from "../../../components/filtered-vps-page"
import { BulletList, Section, textStyle } from "../../../components/ui"
import { getAllServices } from "../../../lib/vps"
import { buildLpMetadata } from "../seo"

const path = "/lp/memory-2gb/"
const title = "メモリ2GBのVPS比較｜2GBプランの月額料金・CPU・ストレージ一覧"

export const metadata: Metadata = buildLpMetadata({
  title,
  description:
    "メモリ2GBのVPSプランを月額料金順に比較。WordPressやDocker、小規模なWebアプリで定番の2GB構成について、各社のCPU・ストレージ・課金方式の違いを確認日つきで一覧にしています。",
  ogDescription: "メモリ2GBのVPSプランを月額料金順に比較。",
  path,
  keywords: [
    "VPS 2GB",
    "VPS メモリ2GB 比較",
    "VPS 2GB 安い",
    "VPS 2GB おすすめ",
  ],
})

// 2GB ちょうどのプランのみ対象（2GB以上の最安は格安VPS比較で扱う）
const rows = getAllServices()
  .flatMap((service) => {
    const plan = service.plans
      .filter((item) => item.memory === 2)
      .sort((left, right) => left.price - right.price)[0]
    return plan ? [{ service, plan }] : []
  })
  .sort((left, right) =>
    left.service.currency === right.service.currency
      ? left.plan.price - right.plan.price
      : left.service.currency === "JPY"
        ? -1
        : 1
  )

const Memory2gbPage = () => (
  <FilteredVpsPage
    breadcrumbs={[{ name: "メモリ2GBのVPS比較", path }]}
    h1="メモリ2GBのVPS比較｜各社の2GBプランを料金順に一覧"
    lead={
      <p>
        メモリ2GBのプランがある{rows.length}
        サービスを、月額料金の安い順に並べました。同じ2GBでもCPUコア数やストレージ容量、課金方式はサービスによって異なります。
      </p>
    }
    path={path}
    related={[
      {
        href: "/use-cases/wordpress/",
        title: "WordPress向けVPS比較",
        description: "必要スペックの目安とおすすめ構成",
      },
      {
        href: "/use-cases/docker/",
        title: "Docker向けVPS比較",
        description: "コンテナ数とメモリの考え方",
      },
      {
        href: "/lp/cheap-vps/",
        title: "格安VPS比較",
        description: "メモリ1GB・2GB・4GB別の最安",
      },
      {
        href: "/articles/when-to-scale-up/",
        title: "VPSをスケールアップすべきタイミング",
        description: "2GBから4GBに上げる判断基準",
      },
    ]}
    rows={rows}
    tableCaption="メモリ2GBプランの月額料金（安い順・ドル建ては後ろに表示）"
    tableTitle="メモリ2GBのVPSプラン一覧"
  >
    <Section id="usage" title="メモリ2GBのVPSでできること">
      <BulletList
        items={[
          "WordPressなどのCMS（Webサーバー＋PHP＋MySQLの同居）",
          "Docker Composeで2〜3個程度の軽量コンテナを動かす開発・検証環境",
          "小規模なWeb APIやBot、定期実行のバッチ処理",
        ]}
        marker="check"
      />
      <p style={textStyle}>
        データベースを大きく使う、ビルド処理を頻繁に行う、同時アクセスが多いといった場合は4GB以上も検討してください。メモリ使用量が常に8割を超えるようならスケールアップのタイミングです。
      </p>
    </Section>
  </FilteredVpsPage>
)

export default Memory2gbPage
