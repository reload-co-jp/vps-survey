import {
  ArticleLayout,
  buildArticleMetadata,
} from "../../../components/article-layout"
import {
  BulletList,
  CodeBlock,
  Section,
  noteStyle,
  textStyle,
} from "../../../components/ui"

const id = "ssh-security"

export const metadata = buildArticleMetadata(id)

const SshSecurityPage = () => (
  <ArticleLayout
    compareLinks={[
      { href: "/lp/cheap-vps/", label: "練習用に安く始められる格安VPS比較" },
      { href: "/lp/domestic-vps/", label: "国内VPSを料金順に比較" },
      { href: "/use-cases/docker/", label: "Docker向けVPS比較" },
    ]}
    id={id}
    lead={
      <p>
        VPSはインターネットに直接つながるため、契約した直後からSSHへの不正ログインの試行を受けます。サービスを公開する前に、ログイン方法を鍵認証に切り替え、不要なログイン経路を閉じておくことが重要です。この記事ではUbuntu・Debianを例に、最初に行うSSHの安全設定を順番に解説します。
      </p>
    }
    toc={[
      { id: "user", label: "1. 作業用ユーザーを作成する" },
      { id: "key", label: "2. 公開鍵認証を設定する" },
      { id: "sshd", label: "3. パスワード・rootログインを無効化する" },
      { id: "firewall", label: "4. ファイアウォールでSSHの接続元を絞る" },
      { id: "fail2ban", label: "5. fail2banで総当たり攻撃を防ぐ" },
      { id: "checklist", label: "設定後のチェックリスト" },
    ]}
  >
    <Section id="user" title="1. 作業用ユーザーを作成する">
      <p style={textStyle}>
        rootで常に作業するのは避け、sudo権限を持つ一般ユーザーを作成します。
      </p>
      <CodeBlock>{`adduser deploy
usermod -aG sudo deploy`}</CodeBlock>
    </Section>

    <Section id="key" title="2. 公開鍵認証を設定する">
      <p style={textStyle}>
        手元のPCで鍵ペアを作り、公開鍵をVPSのユーザーに登録します。秘密鍵はPCから外に出さないでください。
      </p>
      <CodeBlock>{`# 手元のPCで実行
ssh-keygen -t ed25519 -C "your-name"
ssh-copy-id deploy@<VPSのIPアドレス>

# 鍵でログインできることを確認
ssh deploy@<VPSのIPアドレス>`}</CodeBlock>
      <p style={noteStyle}>
        事業者によっては、サーバー作成時に管理画面から公開鍵を登録できます。
      </p>
    </Section>

    <Section id="sshd" title="3. パスワード・rootログインを無効化する">
      <p style={textStyle}>
        鍵でログインできることを確認してから、sshdの設定でパスワード認証とrootの直接ログインを無効にします。設定ファイルは
        /etc/ssh/sshd_config、または /etc/ssh/sshd_config.d/
        以下のファイルです。
      </p>
      <CodeBlock>{`PasswordAuthentication no
PermitRootLogin no
PubkeyAuthentication yes`}</CodeBlock>
      <CodeBlock>{`# 設定ファイルの文法チェック後に再読み込み
sudo sshd -t
sudo systemctl reload ssh   # RHEL系では sshd`}</CodeBlock>
      <p style={textStyle}>
        <strong>今のSSH接続を切らずに</strong>
        、別のターミナルから新しくログインできるかを必ず確認してください。設定を誤るとログインできなくなります。万一の場合は、事業者の管理画面にあるコンソール機能から復旧します。
      </p>
    </Section>

    <Section id="firewall" title="4. ファイアウォールでSSHの接続元を絞る">
      <p style={textStyle}>
        固定IPから接続する場合は、SSH（22番ポート）への接続元をそのIPに限定すると攻撃をほぼ受けなくなります。
      </p>
      <CodeBlock>{`sudo ufw allow from <接続元のIPアドレス> to any port 22 proto tcp
sudo ufw enable
sudo ufw status`}</CodeBlock>
      <p style={textStyle}>
        事業者の管理画面にもファイアウォール（セキュリティグループ）機能がある場合は、そちらでも同じ制限をかけておくと二重の防御になります。ポート開放の詳しい手順は「VPSのポート開放方法」で解説しています。
      </p>
    </Section>

    <Section id="fail2ban" title="5. fail2banで総当たり攻撃を防ぐ">
      <p style={textStyle}>
        接続元を限定できない場合は、ログイン失敗が続いたIPアドレスを一定時間ブロックするfail2banを導入します。
      </p>
      <CodeBlock>{`sudo apt install fail2ban
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd`}</CodeBlock>
    </Section>

    <Section id="checklist" title="設定後のチェックリスト">
      <BulletList
        items={[
          "一般ユーザー＋鍵認証でログインできる",
          "パスワード認証・rootログインが無効になっている",
          "SSHの接続元がファイアウォールで制限されている（または fail2ban が動いている）",
          "OSのセキュリティアップデートを適用している（sudo apt update && sudo apt upgrade）",
          "秘密鍵をパスフレーズ付きで安全に保管している",
        ]}
        marker="check"
      />
    </Section>
  </ArticleLayout>
)

export default SshSecurityPage
