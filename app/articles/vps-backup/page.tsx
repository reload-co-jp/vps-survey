import Link from "next/link"
import {
  ArticleLayout,
  buildArticleMetadata,
} from "../../../components/article-layout"
import {
  BulletList,
  CodeBlock,
  Section,
  linkStyle,
  textStyle,
} from "../../../components/ui"

const id = "vps-backup"

export const metadata = buildArticleMetadata(id)

const VpsBackupPage = () => (
  <ArticleLayout
    compareLinks={[
      {
        href: "/storage/object-storage-comparison/",
        label: "バックアップ先に使えるオブジェクトストレージ比較",
      },
      { href: "/lp/domestic-vps/", label: "国内VPSを料金順に比較" },
    ]}
    id={id}
    lead={
      <p>
        VPSでは、OSやデータの管理は利用者の責任です。誤操作・アップデートの失敗・不正アクセス・事業者側の障害に備えて、復元できるバックアップを用意しておく必要があります。この記事では、VPSで使える主なバックアップ方法と使い分けを解説します。
      </p>
    }
    toc={[
      { id: "methods", label: "VPSのバックアップ方法は3種類" },
      { id: "snapshot", label: "スナップショット・自動バックアップ" },
      { id: "data", label: "データベース・ファイルのバックアップ" },
      { id: "offsite", label: "VPSの外に保存する" },
      { id: "restore", label: "復元テストを行う" },
    ]}
  >
    <Section id="methods" title="VPSのバックアップ方法は3種類">
      <BulletList
        items={[
          "事業者のスナップショット・イメージ保存機能（サーバー全体を丸ごと保存）",
          "事業者の自動バックアップオプション（有料のことが多い）",
          "自分でデータベースのダンプやファイルを取得し、外部に保存する方法",
        ]}
      />
      <p style={textStyle}>
        スナップショットはサーバー全体をすぐ戻せる一方、同じ事業者の中に保存されます。重要なデータは、事業者とは別の場所にも保存しておくと安心です。提供される機能や料金は事業者ごとに異なるため、各社の公式サイトで確認してください。
      </p>
    </Section>

    <Section id="snapshot" title="スナップショット・自動バックアップ">
      <p style={textStyle}>
        OSのアップグレードや大きな設定変更の前にスナップショットを取っておくと、失敗したときにすぐ元の状態に戻せます。データベースが動いている最中のスナップショットは整合性が取れない場合があるため、可能ならサービスを停止するか、次に紹介するダンプと併用します。
      </p>
    </Section>

    <Section id="data" title="データベース・ファイルのバックアップ">
      <CodeBlock>{`# MySQL / MariaDB
mysqldump --single-transaction -u root -p mydb | gzip > mydb-$(date +%F).sql.gz

# PostgreSQL
pg_dump -U postgres mydb | gzip > mydb-$(date +%F).sql.gz

# アップロードファイルなどのディレクトリ
tar czf files-$(date +%F).tar.gz /var/www/html/wp-content/uploads`}</CodeBlock>
      <p style={textStyle}>
        cron や systemd timer
        で毎日自動実行し、古いバックアップは一定期間で削除するようにします。
      </p>
    </Section>

    <Section id="offsite" title="VPSの外に保存する">
      <p style={textStyle}>
        取得したバックアップは、オブジェクトストレージなどVPSとは別の場所に保存します。rclone
        や aws-cli を使うと、S3互換のストレージへ簡単にアップロードできます。
      </p>
      <CodeBlock>{`rclone copy /var/backups remote:my-backup-bucket/$(hostname)`}</CodeBlock>
      <p style={textStyle}>
        保存先の料金や転送量の条件は
        <Link href="/storage/object-storage-comparison/" style={linkStyle}>
          オブジェクトストレージ比較
        </Link>
        で整理しています。
      </p>
    </Section>

    <Section id="restore" title="復元テストを行う">
      <p style={textStyle}>
        バックアップは「戻せること」を確認して初めて意味があります。定期的に検証用のVPSを作成し、バックアップから実際に復元できるかを試しておきましょう。時間課金・日額課金のVPSなら、テスト用のサーバーを短時間だけ作って費用を抑えられます。
      </p>
    </Section>
  </ArticleLayout>
)

export default VpsBackupPage
