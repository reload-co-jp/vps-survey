// 用途別VPS比較ページ（/use-cases/[slug]/）のデータ。
// 推奨スペックは一般的な目安と根拠を示すもので、当サイトでの実測値ではない。

export type UseCaseSpec = {
  label: string
  minimum: string
  recommended: string
}

export type UseCase = {
  slug: string
  name: string
  title: string
  description: string
  h1: string
  lead: string
  /** 候補プランの抽出条件（国内VPSの中から条件を満たす最安プランを選ぶ） */
  minMemory: number
  minCpu: number
  specs: UseCaseSpec[]
  rationale: string[]
  cautions: string[]
  related: { href: string; title: string; description?: string }[]
  updatedAt: string
}

const useCases: UseCase[] = [
  {
    slug: "docker",
    name: "Docker",
    title: "Docker向けVPS比較｜必要スペックの目安とおすすめプラン",
    description:
      "Docker・Docker Composeを動かすVPSに必要なCPU・メモリ・ストレージの目安と根拠を解説し、条件を満たす国内VPSのプランを月額料金順に比較します。",
    h1: "Docker向けVPS比較｜必要スペックと選び方",
    lead: "Dockerは1台のVPS上で複数のアプリやミドルウェアをコンテナとして動かせるため、個人開発から小規模な本番運用まで広く使われています。コンテナの数と種類によって必要なメモリが大きく変わるのがポイントです。",
    minMemory: 2,
    minCpu: 2,
    specs: [
      {
        label: "CPU",
        minimum: "1vCPU",
        recommended: "2vCPU以上（イメージをビルドする場合）",
      },
      {
        label: "メモリ",
        minimum: "1GB（軽量コンテナ1〜2個）",
        recommended: "2〜4GB（Web＋DBなど複数コンテナ）",
      },
      {
        label: "ストレージ",
        minimum: "20GB",
        recommended: "50GB以上（イメージ・ボリューム・ログ）",
      },
    ],
    rationale: [
      "コンテナはホストのメモリを共有するため、動かすプロセスの合計メモリ＋OS分が必要です。WebアプリとPostgreSQL/MySQLを同居させると、1GBではスワップが発生しやすくなります。",
      "docker build は依存パッケージのインストールやコンパイルでCPUを使うため、1vCPUだとビルドに時間がかかります。",
      "イメージやビルドキャッシュ、コンテナのログはディスクを消費し続けるため、ストレージには余裕を持たせます。",
    ],
    cautions: [
      "docker run -p で公開したポートは、ufw などのホスト側ファイアウォール設定を経由せずに外部へ公開される場合があります。公開範囲は 127.0.0.1 へのバインドやクラウド側のファイアウォールで制御してください。",
      "コンテナのログは既定では上限なく増えるため、ログドライバーの max-size / max-file を設定します。",
      "データベースのデータは名前付きボリュームに保存し、定期的にバックアップを取ります。",
    ],
    related: [
      {
        href: "/articles/docker-compose-small-service/",
        title: "Docker Composeで小規模Webサービスを動かすときのVPS選び",
        description: "2GBか4GBかの判断方法",
      },
      {
        href: "/articles/ssh-security/",
        title: "VPSのSSHセキュリティ設定",
        description: "公開前に必ず行う初期設定",
      },
      { href: "/lp/memory-2gb/", title: "メモリ2GBのVPS比較" },
    ],
    updatedAt: "2026-11-26",
  },
  {
    slug: "wordpress",
    name: "WordPress",
    title: "WordPress向けVPS比較｜必要スペックとおすすめプラン",
    description:
      "WordPressをVPSで運用するときに必要なCPU・メモリ・ストレージの目安と根拠、レンタルサーバーとの違い、条件を満たす国内VPSのプランを料金順に比較します。",
    h1: "WordPress向けVPS比較｜必要スペックと選び方",
    lead: "WordPressはWebサーバー（NginxやApache）、PHP、MySQL/MariaDBの組み合わせで動きます。VPSならサーバー設定を自由に調整できる一方、OSやミドルウェアの更新・バックアップは自分で行う必要があります。",
    minMemory: 2,
    minCpu: 2,
    specs: [
      { label: "CPU", minimum: "1vCPU", recommended: "2vCPU以上" },
      {
        label: "メモリ",
        minimum: "1GB（小規模ブログ）",
        recommended: "2GB以上（DB同居・プラグイン多め）",
      },
      {
        label: "ストレージ",
        minimum: "20GB",
        recommended: "50GB以上（画像・バックアップ）",
      },
    ],
    rationale: [
      "PHPの実行プロセス（PHP-FPM）とMySQL/MariaDBはどちらもメモリを使います。1台に同居させる場合、1GBでは同時アクセス時にメモリが不足しやすくなります。",
      "画像のアップロードや自動バックアップでストレージ使用量は増えていくため、容量に余裕のあるプランが安心です。",
      "PHP・MySQL/MariaDBの対応バージョンはWordPress公式の推奨環境を確認し、OSのパッケージで要件を満たせるか確かめてください。",
    ],
    cautions: [
      "SSL証明書（Let's Encryptなど）の設定と自動更新を行います。",
      "WordPress本体・テーマ・プラグイン・OSの更新を定期的に行う必要があります。運用の手間を減らしたい場合はレンタルサーバーも選択肢です。",
      "データベースとアップロードファイルのバックアップを、VPSとは別の場所（オブジェクトストレージなど）に保存します。",
    ],
    related: [
      {
        href: "/storage/object-storage-comparison/",
        title: "オブジェクトストレージ比較",
        description: "バックアップの保存先に",
      },
      { href: "/articles/ssh-security/", title: "VPSのSSHセキュリティ設定" },
      { href: "/lp/memory-2gb/", title: "メモリ2GBのVPS比較" },
    ],
    updatedAt: "2026-11-26",
  },
  {
    slug: "minecraft",
    name: "Minecraft",
    title: "Minecraftサーバー向けVPS比較｜人数別のメモリ目安とおすすめプラン",
    description:
      "Minecraft（Java版）のマルチプレイサーバーをVPSで立てるときのメモリ・CPUの目安と根拠、条件を満たす国内VPSのプランを料金順に比較します。",
    h1: "Minecraftサーバー向けVPS比較｜必要スペックと選び方",
    lead: "Minecraftのマルチプレイサーバーは、遊ぶ人数・読み込むワールドの広さ・MODやプラグインの数によって必要なメモリが大きく変わります。国内の友人と遊ぶなら、遅延の小さい国内VPSが向いています。",
    minMemory: 4,
    minCpu: 2,
    specs: [
      {
        label: "CPU",
        minimum: "2vCPU",
        recommended: "4vCPU以上（MOD・大人数）",
      },
      {
        label: "メモリ",
        minimum: "2GB（数人・バニラ）",
        recommended: "4GB以上（5人以上・MOD/プラグイン）",
      },
      {
        label: "ストレージ",
        minimum: "20GB",
        recommended: "50GB以上（ワールドデータ・バックアップ）",
      },
    ],
    rationale: [
      "Java版サーバーはJavaのヒープメモリ（-Xmx）上にワールドやエンティティを保持します。OS分を差し引いてヒープを割り当てるため、VPSのメモリはヒープ量より多めに必要です。",
      "サーバーのメイン処理は主に1スレッドで動くため、コア数より1コアあたりの性能が効きます。ただしチャンク生成や周辺処理にはコア数も影響します。",
      "プレイ時間が長くなるほどワールドデータが大きくなり、バックアップも含めてストレージを消費します。",
    ],
    cautions: [
      "Java版の既定ポートはTCP 25565、統合版（Bedrock）はUDP 19132です。VPS側のファイアウォールで必要なポートだけを開放します。",
      "ホワイトリスト（whitelist）を有効にし、知らない人が接続できないようにします。",
      "ワールドデータは定期的にバックアップします。",
    ],
    related: [
      {
        href: "/articles/vps-port-open/",
        title: "VPSのポート開放方法",
        description: "ufw・firewalldでの設定手順",
      },
      {
        href: "/articles/when-to-scale-up/",
        title: "VPSをスケールアップすべきタイミング",
      },
      { href: "/vps/xserver/", title: "XServer VPSの料金・評判" },
    ],
    updatedAt: "2026-11-26",
  },
  {
    slug: "vpn",
    name: "VPN",
    title: "VPN向けVPS比較｜WireGuardを動かすVPSの選び方とおすすめプラン",
    description:
      "WireGuardなどで自分専用のVPNサーバーをVPSに構築するときの必要スペックと根拠、転送量や利用規約の注意点、条件を満たす国内VPSのプランを料金順に比較します。",
    h1: "VPN向けVPS比較｜必要スペックと選び方",
    lead: "VPSにWireGuardなどのVPNソフトウェアを入れると、外出先から自宅や社内ネットワークへ安全に接続する経路を作れます。VPNの処理は軽いため、スペックよりも転送量の条件と料金の安さが選び方のポイントです。",
    minMemory: 1,
    minCpu: 1,
    specs: [
      { label: "CPU", minimum: "1vCPU", recommended: "1〜2vCPU" },
      { label: "メモリ", minimum: "512MB〜1GB", recommended: "1GB" },
      {
        label: "転送量",
        minimum: "利用量に応じて",
        recommended: "無制限または十分な上限",
      },
    ],
    rationale: [
      "WireGuardはLinuxカーネル内で動作する軽量なVPNで、数人程度の利用なら最小クラスのプランでも処理能力が足りることが多いです。",
      "VPN経由の通信はすべてVPSを通るため、転送量の上限や超過料金があるサービスでは利用量に注意が必要です。",
    ],
    cautions: [
      "WireGuardの既定ポートはUDP 51820です。ファイアウォールで必要なポートだけを開放します。",
      "VPSの利用規約で禁止されている用途がないか、契約前に確認してください。",
      "VPSとVPNの違いについては関連記事で解説しています。",
    ],
    related: [
      {
        href: "/articles/vpn-vs-vps/",
        title: "VPNとVPSの違い",
        description: "仕組みと使い分け",
      },
      { href: "/articles/vps-port-open/", title: "VPSのポート開放方法" },
      { href: "/lp/cheap-vps/", title: "格安VPS比較" },
    ],
    updatedAt: "2026-11-26",
  },
]

export const getAllUseCases = () => useCases

export const getUseCaseBySlug = (slug: string) =>
  useCases.find((useCase) => useCase.slug === slug)
