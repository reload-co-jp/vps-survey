import {
  ArticleLayout,
  buildArticleMetadata,
} from "../../../components/article-layout"
import {
  BulletList,
  CodeBlock,
  Section,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  textStyle,
  thStyle,
} from "../../../components/ui"

const id = "vps-port-open"

export const metadata = buildArticleMetadata(id)

const ports = [
  ["SSH", "TCP 22"],
  ["HTTP", "TCP 80"],
  ["HTTPS", "TCP 443"],
  ["Minecraft（Java版）", "TCP 25565"],
  ["Minecraft（統合版）", "UDP 19132"],
  ["WireGuard", "UDP 51820"],
]

const VpsPortOpenPage = () => (
  <ArticleLayout
    compareLinks={[
      { href: "/use-cases/minecraft/", label: "Minecraftサーバー向けVPS比較" },
      { href: "/use-cases/vpn/", label: "VPN向けVPS比較" },
      { href: "/lp/domestic-vps/", label: "国内VPSを料金順に比較" },
    ]}
    id={id}
    lead={
      <p>
        VPSでWebサイトやゲームサーバーを公開するには、外部からの通信を受け付けるポートを開放する必要があります。VPSでは「OSのファイアウォール」と「事業者側のファイアウォール」の2か所で通信が制御されていることが多く、片方だけ設定してつながらないというトラブルがよく起こります。
      </p>
    }
    toc={[
      { id: "layers", label: "ポート開放が必要な2つの場所" },
      { id: "ports", label: "よく使うポート番号" },
      { id: "ufw", label: "ufwでポートを開放する（Ubuntu/Debian）" },
      { id: "firewalld", label: "firewalldでポートを開放する（RHEL系）" },
      { id: "check", label: "ポートが開いているか確認する" },
      { id: "safety", label: "安全にポートを開放するための注意点" },
    ]}
  >
    <Section id="layers" title="ポート開放が必要な2つの場所">
      <BulletList
        items={[
          "OSのファイアウォール：ufw（Ubuntu/Debian）、firewalld（AlmaLinux・Rocky Linuxなど）",
          "事業者側のファイアウォール：管理画面の「セキュリティグループ」「パケットフィルター」などの機能",
        ]}
      />
      <p style={textStyle}>
        どちらかで通信が拒否されていると外部からは接続できません。さらに、アプリケーション自体がそのポートで待ち受けていることも必要です。
      </p>
    </Section>

    <Section id="ports" title="よく使うポート番号">
      <div style={tableWrapStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th scope="col" style={thStyle}>
                用途
              </th>
              <th scope="col" style={thStyle}>
                プロトコル・ポート（既定値）
              </th>
            </tr>
          </thead>
          <tbody>
            {ports.map(([name, port]) => (
              <tr key={name}>
                <th scope="row" style={{ ...tdStyle, fontWeight: 600 }}>
                  {name}
                </th>
                <td style={tdStyle}>{port}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>

    <Section id="ufw" title="ufwでポートを開放する（Ubuntu/Debian）">
      <p style={textStyle}>
        ufwを有効にする前に、SSHの許可を必ず追加してください。先に有効化するとSSH接続が切れてログインできなくなります。
      </p>
      <CodeBlock>{`sudo ufw allow 22/tcp      # SSH（先に許可）
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status numbered`}</CodeBlock>
    </Section>

    <Section id="firewalld" title="firewalldでポートを開放する（RHEL系）">
      <CodeBlock>{`sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --permanent --add-port=25565/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-all`}</CodeBlock>
    </Section>

    <Section id="check" title="ポートが開いているか確認する">
      <p style={textStyle}>
        まずVPS上でアプリケーションが待ち受けているかを確認し、次に外部のPCから接続を試します。
      </p>
      <CodeBlock>{`# VPS上：待ち受けているポートの一覧
sudo ss -tulpn

# 手元のPC：TCPポートへの接続確認
nc -vz <VPSのIPアドレス> 443`}</CodeBlock>
    </Section>

    <Section id="safety" title="安全にポートを開放するための注意点">
      <BulletList
        items={[
          "必要なポートだけを開放し、使わなくなったら閉じる",
          "データベース（MySQL 3306、PostgreSQL 5432など）は外部に公開せず、ローカルまたはVPN経由で接続する",
          "Dockerで公開したポートは ufw の設定を経由せずに外部へ公開される場合があるため、127.0.0.1 へのバインドや事業者側のファイアウォールで制御する",
          "SSHは接続元IPの制限や鍵認証と組み合わせる",
        ]}
        marker="check"
      />
    </Section>
  </ArticleLayout>
)

export default VpsPortOpenPage
