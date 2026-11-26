import type { Metadata } from "next"
import { FilteredVpsPage } from "../../../components/filtered-vps-page"
import { BulletList, Section, textStyle } from "../../../components/ui"
import { getAllServices, getLowestPricePlan } from "../../../lib/vps"
import { buildLpMetadata } from "../seo"

const path = "/lp/domestic-vps/"
const title = "国内VPS比較｜日本リージョンのVPSを料金・スペックで一覧比較"

export const metadata: Metadata = buildLpMetadata({
  title,
  description:
    "日本国内にサーバーを置ける国内VPSを最安プランの月額料金順に比較。ConoHa VPS、さくらのVPS、XServer VPS、シンVPS、KAGOYA CLOUD VPS、WebARENA Indigoなどの料金・CPU・メモリ・課金方式を確認日つきで掲載。",
  ogDescription: "国内VPSを最安プランの月額料金順に一覧比較。",
  path,
  keywords: [
    "国内VPS 比較",
    "日本 VPS",
    "国内VPS おすすめ",
    "VPS 日本リージョン",
  ],
})

const rows = getAllServices()
  .filter((service) => service.region === "JP")
  .map((service) => ({ service, plan: getLowestPricePlan(service) }))
  .sort((left, right) => left.plan.price - right.plan.price)

const DomesticVpsPage = () => (
  <FilteredVpsPage
    breadcrumbs={[{ name: "国内VPS比較", path }]}
    h1="国内VPS比較｜日本リージョンのVPSを料金順に一覧"
    lead={
      <p>
        日本国内のデータセンターでサーバーを提供している国内VPS
        {rows.length}
        サービスを、最安プランの月額料金順に並べました。国内向けのWebサイトやサービスは、利用者との距離が近い国内リージョンを選ぶと通信の遅延を抑えられます。
      </p>
    }
    path={path}
    related={[
      {
        href: "/lp/cheap-vps/",
        title: "格安VPS比較",
        description: "メモリ1GB・2GB・4GB別の最安プラン",
      },
      {
        href: "/lp/overseas-vps/",
        title: "海外VPS比較",
        description: "海外リージョン・海外事業者のVPS",
      },
      {
        href: "/lp/memory-2gb/",
        title: "メモリ2GBのVPS比較",
        description: "WordPressやDockerの定番構成",
      },
      {
        href: "/use-cases/",
        title: "用途別VPS比較",
        description: "Docker・WordPress・Minecraft・VPN",
      },
    ]}
    rows={rows}
    tableCaption="各サービスの最安プラン（月額・料金が安い順）"
    tableTitle="国内VPS 最安プラン一覧"
  >
    <Section id="merit" title="国内VPSを選ぶメリット">
      <BulletList
        items={[
          "日本の利用者に対して通信の遅延が小さく、Webサイトの表示が速くなりやすい",
          "料金が日本円で、請求書払いなど国内の支払い方法に対応している事業者が多い",
          "管理画面・ドキュメント・サポートが日本語で利用できる",
        ]}
        marker="check"
      />
    </Section>
    <Section id="how-to-choose" title="国内VPSの選び方">
      <p style={textStyle}>
        最安プランの料金だけでなく、必要なメモリ量のプランがいくらかで比べるのが失敗しないコツです。Webサーバーとデータベースを同居させるならメモリ2GB以上、Dockerで複数のコンテナを動かすなら2〜4GBが目安です。短期間の検証なら時間課金・日額課金のサービス、長期運用なら長期契約の割引があるサービスが有利になります。
      </p>
    </Section>
  </FilteredVpsPage>
)

export default DomesticVpsPage
