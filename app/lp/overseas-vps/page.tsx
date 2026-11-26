import type { Metadata } from "next"
import { FilteredVpsPage } from "../../../components/filtered-vps-page"
import { BulletList, Section, textStyle } from "../../../components/ui"
import { getAllServices, getLowestPricePlan } from "../../../lib/vps"
import { buildLpMetadata } from "../seo"

const path = "/lp/overseas-vps/"
const title =
  "海外VPS比較｜Amazon Lightsail・DigitalOcean・Linodeの料金とスペック"

export const metadata: Metadata = buildLpMetadata({
  title,
  description:
    "海外事業者のVPS（Amazon Lightsail、DigitalOcean、Linode）を料金・CPU・メモリで比較。国内VPSとの違い、ドル建て料金の注意点、向いている用途を解説します。",
  ogDescription: "海外VPSの料金・スペックと国内VPSとの違いを比較。",
  path,
  keywords: [
    "海外VPS 比較",
    "海外 VPS おすすめ",
    "DigitalOcean 料金",
    "Lightsail 料金",
    "Linode 料金",
  ],
})

const rows = getAllServices()
  .filter((service) => service.region === "GLOBAL")
  .map((service) => ({ service, plan: getLowestPricePlan(service) }))
  .sort((left, right) =>
    left.service.currency === right.service.currency
      ? left.plan.price - right.plan.price
      : left.service.currency === "JPY"
        ? -1
        : 1
  )

const OverseasVpsPage = () => (
  <FilteredVpsPage
    breadcrumbs={[{ name: "海外VPS比較", path }]}
    h1="海外VPS比較｜料金・スペックと国内VPSとの違い"
    lead={
      <p>
        当サイトで掲載している海外事業者のVPS
        {rows.length}
        サービスの最安プランを比較しました。海外VPSは世界各地のリージョンを選べる、英語の技術情報が豊富といった強みがあります。米ドル建ての料金は円に換算せず、ドルのまま表示しています。
      </p>
    }
    path={path}
    related={[
      {
        href: "/lp/domestic-vps/",
        title: "国内VPS比較",
        description: "日本リージョンのVPSを料金順に比較",
      },
      {
        href: "/lp/cheap-vps/",
        title: "格安VPS比較",
        description: "国内の安いVPSをメモリ別に比較",
      },
      {
        href: "/articles/vps-choice/",
        title: "VPSの選び方",
        description: "価格・CPU・メモリ・リージョンの考え方",
      },
    ]}
    rows={rows}
    tableCaption="各サービスの最安プラン（ドル建てのサービスは米ドル表記）"
    tableTitle="海外VPS 最安プラン一覧"
  >
    <Section id="vs-domestic" title="海外VPSと国内VPSの違い">
      <BulletList
        items={[
          "リージョン：海外VPSは北米・欧州・アジアなど複数地域から選べる。日本の利用者向けなら国内リージョンの方が遅延は小さい",
          "料金：米ドル建ての場合、為替レートによって円での支払額が変わる",
          "情報量：英語の公式ドキュメントやチュートリアルが豊富",
          "サポート：問い合わせは英語が中心になることが多い",
        ]}
      />
    </Section>
    <Section id="suitable" title="海外VPSが向いている用途">
      <p style={textStyle}>
        海外の利用者向けサービス、複数リージョンへの分散配置、海外のクラウドサービスと連携する開発などでは海外VPSが候補になります。日本国内向けのWebサイトが中心なら、
        <a href="/lp/domestic-vps/" style={{ color: "#2563eb" }}>
          国内VPS
        </a>
        から選ぶ方が料金・遅延の両面で有利な場合が多いです。
      </p>
    </Section>
  </FilteredVpsPage>
)

export default OverseasVpsPage
