import Link from "next/link"
import {
  ArticleLayout,
  buildArticleMetadata,
} from "../../../components/article-layout"
import {
  BulletList,
  Section,
  linkStyle,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  textStyle,
  thStyle,
} from "../../../components/ui"

const id = "vpn-vs-vps"

export const metadata = buildArticleMetadata(id)

const rows = [
  ["正式名称", "Virtual Private Network", "Virtual Private Server"],
  [
    "何か",
    "通信を暗号化して安全な経路を作る仕組み",
    "1台の物理サーバーを分割した仮想サーバー",
  ],
  [
    "主な用途",
    "リモートアクセス、公衆Wi-Fiでの通信保護、拠点間接続",
    "Webサイト・アプリの公開、開発環境、ゲームサーバー",
  ],
  [
    "利用形態",
    "VPNサービスの契約、または自分でVPNサーバーを構築",
    "VPS事業者と契約し、OSから自分で管理",
  ],
]

const VpnVsVpsPage = () => (
  <ArticleLayout
    compareLinks={[
      { href: "/use-cases/vpn/", label: "VPN向けVPS比較" },
      { href: "/lp/cheap-vps/", label: "格安VPS比較" },
    ]}
    id={id}
    lead={
      <p>
        VPNとVPSは名前が似ていますが、まったく別のものです。VPNは「通信を安全にする仕組み」、VPSは「インターネット上に借りるサーバー」です。ただし、VPSの上にVPNサーバーを構築するという組み合わせ方もできます。
      </p>
    }
    toc={[
      { id: "diff", label: "VPNとVPSの違い（比較表）" },
      { id: "vpn", label: "VPNとは" },
      { id: "vps", label: "VPSとは" },
      { id: "combine", label: "VPSでVPNサーバーを構築する" },
    ]}
  >
    <Section id="diff" title="VPNとVPSの違い">
      <div style={tableWrapStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th scope="col" style={thStyle}>
                項目
              </th>
              <th scope="col" style={thStyle}>
                VPN
              </th>
              <th scope="col" style={thStyle}>
                VPS
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, vpn, vps]) => (
              <tr key={label}>
                <th scope="row" style={{ ...tdStyle, fontWeight: 600 }}>
                  {label}
                </th>
                <td style={{ ...tdStyle, whiteSpace: "normal" }}>{vpn}</td>
                <td style={{ ...tdStyle, whiteSpace: "normal" }}>{vps}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section id="vpn" title="VPNとは">
      <p style={textStyle}>
        VPNは、インターネット上に暗号化されたトンネルを作り、離れた場所にあるネットワークへ安全に接続する仕組みです。外出先から社内ネットワークや自宅のNASにアクセスする、公衆Wi-Fiでの通信を保護するといった目的で使われます。代表的なソフトウェアにWireGuardやOpenVPNがあります。
      </p>
    </Section>

    <Section id="vps" title="VPSとは">
      <p style={textStyle}>
        VPSは、事業者のデータセンターにある物理サーバーを仮想化して分割し、1台分の専用サーバーのように使えるサービスです。root権限があり、OSやソフトウェアを自由にインストールできます。詳しくは
        <Link href="/articles/what-is-vps/" style={linkStyle}>
          VPSとは何か
        </Link>
        で解説しています。
      </p>
    </Section>

    <Section id="combine" title="VPSでVPNサーバーを構築する">
      <p style={textStyle}>
        VPSにWireGuardなどをインストールすると、自分専用のVPNサーバーとして使えます。
      </p>
      <BulletList
        items={[
          "固定のグローバルIPアドレスを持つ中継点として使い、接続元IPの制限があるサービスに安全にアクセスする",
          "自宅や複数拠点のネットワークをVPS経由で接続する",
          "データベースや管理画面をインターネットに公開せず、VPN経由でのみ接続できるようにする",
        ]}
        marker="check"
      />
      <p style={textStyle}>
        VPNの処理は軽いため、小さなプランでも動かせます。転送量の条件や必要スペックは
        <Link href="/use-cases/vpn/" style={linkStyle}>
          VPN向けVPS比較
        </Link>
        で解説しています。VPSの利用規約で禁止されている使い方がないかも事前に確認してください。
      </p>
    </Section>
  </ArticleLayout>
)

export default VpnVsVpsPage
