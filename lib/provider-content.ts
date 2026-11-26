// VPS 事業者詳細ページ（/vps/[id]/）の編集コンテンツ。
// 料金・スペックは data/vps.json を正とし、ここには数値を直書きしない。
// 実測・利用レビュー・口コミのような未検証情報は載せない。

export type ProviderSection = {
  heading: string
  paragraphs: string[]
}

export type UseCaseGuide = {
  useCase: string
  /** data/vps.json の plan.id */
  planId: string
  reason: string
}

export type ProviderContent = {
  /** <title>。サイト名はテンプレートで付与される */
  seoTitle: string
  h1: string
  /** 冒頭リード。数値は含めず、料金は自動生成のサマリーで出す */
  lead: string
  operator?: string
  /** data/vps.json の billing（monthly/hourly）では表せない課金方式の説明 */
  billingLabel?: string
  notRecommendedFor: string[]
  useCaseGuide: UseCaseGuide[]
  /** サービス固有の補足セクション（料金表の下に表示） */
  sections?: ProviderSection[]
  faqs: { question: string; answer: string }[]
  /** 関連ページ（LP・記事など） */
  relatedLinks: { href: string; label: string }[]
  /** 編集コンテンツの更新日 (YYYY-MM-DD) */
  updatedAt: string
}

const reputationNote =
  "当サイトでは実機での長期検証や利用者アンケートは行っていないため、個人の口コミや体感速度の評価は掲載していません。公式に公開されている料金・スペック・仕様を他社と同じ基準で比較した結果を「評判を確認する際の判断材料」として整理しています。"

export const reputationDisclaimer = reputationNote

const contents: Record<string, ProviderContent> = {
  "webarena-indigo": {
    seoTitle:
      "WebARENA Indigoの料金・評判を徹底比較｜メリット・デメリットとおすすめプラン",
    h1: "WebARENA Indigoの料金・評判・おすすめプラン",
    lead: "WebARENA Indigoは、時間単位の従量課金に月額上限が設定された国内VPSです。使った時間分だけ課金され、月の上限額を超えないため、検証や短期利用で無駄が出にくいのが特徴です。最小の768MBプランはIPv6専用のため、IPv4での公開が必要な場合は1GB以上を選びます。",
    operator: "NTTPCコミュニケーションズ",
    billingLabel: "時間課金（月額上限あり）",
    notRecommendedFor: [
      "東京以外のリージョン（大阪・海外）にサーバーを置きたい人",
      "768MBプランでIPv4のWebサイトを公開したい人（768MBはIPv6専用）",
      "管理画面の手厚い日本語サポートやアプリテンプレートの豊富さを最重視する人",
    ],
    useCaseGuide: [
      {
        useCase: "Linux学習・コマンド練習",
        planId: "webarena-indigo-1gb",
        reason:
          "IPv4が使える最小構成。時間課金なので、使わない期間は削除すれば費用を抑えられます。",
      },
      {
        useCase: "個人開発・Docker検証",
        planId: "webarena-indigo-2gb",
        reason:
          "Dockerで複数コンテナを動かすなら2GBが目安。2vCPUでビルドも現実的な時間で終わります。",
      },
      {
        useCase: "小規模Webサービスの本番運用",
        planId: "webarena-indigo-4gb",
        reason:
          "アプリとDBを同居させる構成でもメモリに余裕を持たせやすいプランです。",
      },
    ],
    sections: [
      {
        heading: "WebARENA Indigoの料金体系（時間課金と月額上限）",
        paragraphs: [
          "当サイトの料金表に掲載している金額は、各プランを1か月使い続けた場合の上限額です。実際の請求は利用時間に応じた従量課金となり、月の途中で作成・削除した場合は上限より安くなります。",
          "時間単価や端数処理、IPアドレスの扱いなど細かな条件は変更される可能性があるため、申し込み前に公式の料金ページで最新情報を確認してください。",
        ],
      },
    ],
    faqs: [
      {
        question: "WebARENA Indigoの料金はいくらですか？",
        answer:
          "当サイト掲載時点で最安は768MBプランです。料金は時間課金で、表示額は月額の上限です。IPv4を使う場合の最安は1GBプランになります。最新の料金は公式サイトで確認してください。",
      },
      {
        question: "WebARENA Indigoの768MBプランの注意点は？",
        answer:
          "768MBプランはIPv6専用です。IPv4でアクセスされる一般的なWebサイトの公開には向かないため、用途を確認してから選んでください。",
      },
      {
        question: "WebARENA Indigoは他社VPSより安いですか？",
        answer:
          "当サイトの掲載データでは、メモリ1GB・2GB帯で国内VPSの中でも安い部類です。ページ内の「他社VPSとの料金比較」で同じメモリ帯の最安プランを並べています。",
      },
    ],
    relatedLinks: [
      {
        href: "/lp/cheap-vps/",
        label: "格安VPS比較（国内VPSの最安プラン一覧）",
      },
      { href: "/vps/kagoya/", label: "KAGOYA CLOUD VPSの料金・評判" },
      { href: "/vps/conoha/", label: "ConoHa VPSの料金・評判" },
      { href: "/articles/vps-choice/", label: "VPSの選び方" },
    ],
    updatedAt: "2026-11-26",
  },
  kagoya: {
    seoTitle:
      "KAGOYA CLOUD VPS（KAGOYA VPS）の料金・評判｜プラン別スペックと他社比較",
    h1: "KAGOYA CLOUD VPSの料金・評判・プラン比較",
    lead: "KAGOYA CLOUD VPSは、カゴヤ・ジャパンが提供する国内VPSです。日額課金に月額上限が設定されており、短期間の検証から常時稼働の本番運用まで使えます。全プランでNVMe SSDを採用しているのも特徴です。",
    operator: "カゴヤ・ジャパン",
    billingLabel: "日額課金（月額上限あり）",
    notRecommendedFor: [
      "海外リージョンにサーバーを置きたい人",
      "転送量の上限を事前に厳密に把握しておきたい人（当サイトでは未確認のため公式で要確認）",
      "時間単位で細かく作成・削除を繰り返したい人（日額課金のため）",
    ],
    useCaseGuide: [
      {
        useCase: "開発環境・学習用",
        planId: "kagoya-1gb",
        reason:
          "国内VPSの中でも安い価格帯から始められ、ストレージ容量にも余裕があります。",
      },
      {
        useCase: "WordPressやDocker環境",
        planId: "kagoya-2gb",
        reason:
          "2GBあればWebサーバーとDBの同居や小規模なコンテナ構成も動かしやすくなります。",
      },
      {
        useCase: "中規模の本番運用",
        planId: "kagoya-4gb",
        reason:
          "4vCPU・4GBで、アクセスが増えてきたサービスの受け皿になります。",
      },
    ],
    sections: [
      {
        heading: "KAGOYA VPSとKAGOYA CLOUD VPSの違い",
        paragraphs: [
          "検索では「KAGOYA VPS」「KAGOYA CLOUD VPS」の両方の呼び方が使われています。当サイトで料金・スペックを掲載しているのは、カゴヤ・ジャパン公式サイトの「KAGOYA CLOUD VPS」の機能・プランページに記載されたプランです。",
          "カゴヤ・ジャパンはVPS以外にもレンタルサーバーや専用サーバーなど複数のサービスを提供しています。申し込み時は、サービス名とプラン名が当ページの比較対象と一致しているかを公式サイトで確認してください。",
        ],
      },
      {
        heading: "KAGOYA CLOUD VPSの課金方式",
        paragraphs: [
          "KAGOYA CLOUD VPSは日額課金で、月額の上限が設定されています。当サイトの料金表は月額上限の金額です。月の途中で利用を開始・終了した場合は日割りに近い金額になります。",
        ],
      },
    ],
    faqs: [
      {
        question: "KAGOYA CLOUD VPSの料金はいくらですか？",
        answer:
          "当サイト掲載時点の最安は1GBプランです。日額課金で月額上限があり、料金表の金額は月額上限です。最新の料金は公式サイトで確認してください。",
      },
      {
        question: "KAGOYA VPSとKAGOYA CLOUD VPSは別のサービスですか？",
        answer:
          "当サイトでは、カゴヤ・ジャパン公式の「KAGOYA CLOUD VPS」を比較対象にしています。「KAGOYA VPS」はこのサービスを指して検索されることが多い呼び方です。契約時は公式サイトのサービス名を確認してください。",
      },
      {
        question: "KAGOYA CLOUD VPSの転送量に上限はありますか？",
        answer:
          "当サイトでは転送量の上限を確認できていないため「要確認」と表示しています。大量の通信が発生する用途では、公式サイトの仕様を確認してください。",
      },
    ],
    relatedLinks: [
      {
        href: "/lp/cheap-vps/",
        label: "格安VPS比較（国内VPSの最安プラン一覧）",
      },
      { href: "/vps/webarena-indigo/", label: "WebARENA Indigoの料金・評判" },
      { href: "/vps/shin-vps/", label: "シンVPSの料金・評判" },
      { href: "/articles/vps-choice/", label: "VPSの選び方" },
    ],
    updatedAt: "2026-11-26",
  },
  "shin-vps": {
    seoTitle:
      "シンVPSの料金・評判｜スタンダードと大容量メモリプランの違い・他社比較",
    h1: "シンVPSの料金・評判・おすすめプラン",
    lead: "シンVPSは、エックスサーバー株式会社が提供する国内VPSです。CPU・メモリ・ストレージのバランスが取れたスタンダードプランと、メモリ単価を抑えた大容量メモリプランの2系統があり、用途に応じて選べます。",
    operator: "エックスサーバー株式会社",
    notRecommendedFor: [
      "海外リージョンにサーバーを置きたい人",
      "オブジェクトストレージやマネージドDBなどクラウド周辺サービスを同じ事業者でそろえたい人",
      "時間単位の課金で短時間だけ使いたい人",
    ],
    useCaseGuide: [
      {
        useCase: "個人開発・学習",
        planId: "shin-memory-1gb",
        reason:
          "大容量メモリプランの1GBは、シンVPSの中で最も安く始められるプランです。",
      },
      {
        useCase: "WordPress・Docker",
        planId: "shin-memory-2gb",
        reason:
          "メモリ2GBを安く確保できるため、コンテナやDBを動かす用途と相性が良いです。",
      },
      {
        useCase: "ストレージを多く使う本番運用",
        planId: "shin-standard-4gb",
        reason:
          "スタンダードプランは大容量メモリプランよりストレージ容量が大きく、データを多く持つサービスに向きます。",
      },
    ],
    sections: [
      {
        heading: "スタンダードプランと大容量メモリプランの違い",
        paragraphs: [
          "当サイトの料金表では、プラン名が「Standard」で始まるものがスタンダードプラン、「Memory」で始まるものが大容量メモリプランです。",
          "同じメモリ容量で比べると、大容量メモリプランは月額が安い一方、ストレージ容量は小さめです。メモリを多く使うアプリやコンテナ運用なら大容量メモリプラン、ファイルやDBのデータが多いならスタンダードプランが候補になります。",
        ],
      },
    ],
    faqs: [
      {
        question: "シンVPSの料金はいくらですか？",
        answer:
          "当サイト掲載時点の最安は大容量メモリプランの1GBです。契約期間や支払い方法によって月額が変わる場合があるため、最新の料金は公式サイトで確認してください。",
      },
      {
        question:
          "シンVPSのスタンダードと大容量メモリはどちらを選ぶべきですか？",
        answer:
          "メモリ重視でコストを抑えたいなら大容量メモリプラン、ストレージ容量も必要ならスタンダードプランが向いています。料金表で同じメモリ容量のプランを比べてみてください。",
      },
      {
        question: "シンVPSのキャンペーンはありますか？",
        answer:
          "シンVPSでは時期によってキャッシュバックなどのキャンペーンが実施されることがあります。当サイトで確認できた開催中のキャンペーンはページ内に掲載し、終了したものは表示していません。最新情報は公式サイトで確認してください。",
      },
    ],
    relatedLinks: [
      { href: "/lp/shin-vps/", label: "シンVPSのおすすめプランと選び方" },
      { href: "/vps/xserver/", label: "XServer VPSの料金・評判" },
      { href: "/vps/conoha/", label: "ConoHa VPSの料金・評判" },
      { href: "/lp/cheap-vps/", label: "格安VPS比較" },
    ],
    updatedAt: "2026-11-26",
  },
  conoha: {
    seoTitle:
      "ConoHa VPSの料金・スペック・評判｜全プラン比較とメリット・デメリット",
    h1: "ConoHa VPSの料金・スペック・評判",
    lead: "ConoHa VPSは、GMOインターネットグループが提供する国内VPSです。512MBから128GBまでプランの幅が広く、小さく始めて必要に応じてスケールアップしやすいのが特徴です。管理画面が分かりやすく、初めてVPSを使う人にも選ばれています。",
    operator: "GMOインターネットグループ",
    notRecommendedFor: [
      "とにかく最安のVPSを探している人（最安特化のサービスと比べると高め）",
      "海外リージョン中心で運用したい人",
      "大容量ストレージを安く使いたい人（上位プランでもストレージは100GB）",
    ],
    useCaseGuide: [
      {
        useCase: "VPS初心者・学習用",
        planId: "conoha-1g",
        reason:
          "2vCPU・1GBで、Linuxの学習や小さなWebアプリを試すのに十分な構成です。",
      },
      {
        useCase: "WordPress・個人開発",
        planId: "conoha-2g",
        reason:
          "Webサーバー・PHP・DBを同居させても余裕を持たせやすい定番の構成です。",
      },
      {
        useCase: "小規模本番・Docker運用",
        planId: "conoha-4g",
        reason:
          "複数コンテナやバッチ処理を並行しても、メモリ不足になりにくい構成です。",
      },
    ],
    sections: [
      {
        heading: "このページとConoHa VPSガイド（LP）の違い",
        paragraphs: [
          "このページでは、ConoHa VPSの全プランの料金・スペックと他社との比較、メリット・デメリットを整理しています。用途別のおすすめプランや申し込み前のチェックポイントは「ConoHa VPS完全ガイド」で詳しく解説しています。",
        ],
      },
    ],
    faqs: [
      {
        question: "ConoHa VPSの料金はいくらですか？",
        answer:
          "当サイト掲載時点の最安は512MBプランです。プランは128GBまであり、料金表で全プランを比較できます。長期割引やキャンペーンで実際の支払額が変わる場合があるため、最新の料金は公式サイトで確認してください。",
      },
      {
        question: "ConoHa VPSは初心者に向いていますか？",
        answer:
          "管理画面が分かりやすく、OSやアプリのテンプレートから構築できるため、初めてVPSを使う人にも選ばれています。最安特化のサービスと比べると料金はやや高めです。",
      },
      {
        question: "ConoHa VPSのオブジェクトストレージは使えますか？",
        answer:
          "ConoHaではVPSとは別にオブジェクトストレージを提供しています。料金や仕様は当サイトのオブジェクトストレージ比較ページと公式サイトで確認してください。",
      },
    ],
    relatedLinks: [
      {
        href: "/lp/conoha/",
        label: "ConoHa VPS完全ガイド（おすすめプランと選び方）",
      },
      {
        href: "/storage/object-storage-comparison/",
        label: "オブジェクトストレージ比較",
      },
      { href: "/vps/sakura/", label: "さくらのVPSの料金・評判" },
      { href: "/vps/xserver/", label: "XServer VPSの料金・評判" },
    ],
    updatedAt: "2026-11-26",
  },
  sakura: {
    seoTitle: "さくらのVPSの料金・評判｜プラン別スペックと他社比較",
    h1: "さくらのVPSの料金・評判・プラン比較",
    lead: "さくらのVPSは、さくらインターネットが提供する国内VPSです。長く提供されているサービスで、構築手順などの情報がWeb上に多いのが特徴です。上位プランほどストレージ容量が大きくなる料金体系です。",
    operator: "さくらインターネット",
    notRecommendedFor: [
      "海外リージョンにサーバーを置きたい人",
      "時間課金で短時間だけ使いたい人",
      "64GB以上の大容量メモリが必要な人（当サイト掲載の上位は32GB）",
    ],
    useCaseGuide: [
      {
        useCase: "学習用・検証用",
        planId: "sakura-1g",
        reason:
          "2vCPU・1GBで、Linuxの学習や小さな検証環境に使いやすい構成です。",
      },
      {
        useCase: "小規模Webサイト・WordPress",
        planId: "sakura-2g",
        reason:
          "WebサーバーとDBを同居させるならメモリ2GBが目安。ストレージも100GBあります。",
      },
      {
        useCase: "社内システム・データの多い運用",
        planId: "sakura-4g",
        reason: "ストレージ200GBで、ログやファイルを多く扱う用途に向きます。",
      },
    ],
    faqs: [
      {
        question: "さくらのVPSの料金はいくらですか？",
        answer:
          "当サイト掲載時点の最安は512MBプランです。支払い方法や契約期間で金額が変わる場合があるため、最新の料金は公式サイトで確認してください。",
      },
      {
        question: "さくらのVPSは初心者でも使えますか？",
        answer:
          "提供期間が長く、構築手順の解説がWeb上に多いため、調べながら進めやすいサービスです。",
      },
    ],
    relatedLinks: [
      { href: "/lp/sakura/", label: "さくらのVPSのおすすめプランと選び方" },
      { href: "/vps/conoha/", label: "ConoHa VPSの料金・評判" },
      { href: "/vps/kagoya/", label: "KAGOYA CLOUD VPSの料金・評判" },
      {
        href: "/storage/object-storage-comparison/",
        label: "オブジェクトストレージ比較",
      },
    ],
    updatedAt: "2026-11-26",
  },
  xserver: {
    seoTitle: "XServer VPSの料金・評判｜プラン別スペックとメリット・デメリット",
    h1: "XServer VPSの料金・評判・プラン比較",
    lead: "XServer VPSは、エックスサーバー株式会社が提供する国内VPSです。2GBプランからの構成で、上位プランになるほどストレージ容量も大きくなります。同社のシンVPSとは料金体系やプラン構成が異なります。",
    operator: "エックスサーバー株式会社",
    notRecommendedFor: [
      "月額500円前後の最安クラスで始めたい人（最小は2GBプラン）",
      "海外リージョンにサーバーを置きたい人",
      "時間課金で短時間だけ使いたい人",
    ],
    useCaseGuide: [
      {
        useCase: "WordPress・個人開発",
        planId: "xserver-2g",
        reason:
          "最小プランでもメモリ2GBあり、WebサーバーとDBの同居に対応しやすい構成です。",
      },
      {
        useCase: "ゲームサーバー・中規模サービス",
        planId: "xserver-4g",
        reason:
          "4vCPU・4GB・150GBで、同時接続が増える用途にも余裕を持たせられます。",
      },
      {
        useCase: "データの多い本番運用",
        planId: "xserver-8g",
        reason:
          "ストレージ400GBで、DBやファイルが増えていくサービスに向きます。",
      },
    ],
    faqs: [
      {
        question: "XServer VPSの料金はいくらですか？",
        answer:
          "当サイト掲載時点の最安は2GBプランです。契約期間によって月額が変わる場合があるため、最新の料金は公式サイトで確認してください。",
      },
      {
        question: "XServer VPSとシンVPSの違いは？",
        answer:
          "どちらもエックスサーバー株式会社のVPSですが、プラン構成と料金が異なります。当サイトの各詳細ページで料金表を比較してください。",
      },
    ],
    relatedLinks: [
      { href: "/vps/shin-vps/", label: "シンVPSの料金・評判" },
      { href: "/vps/conoha/", label: "ConoHa VPSの料金・評判" },
      { href: "/use-cases/minecraft/", label: "Minecraftサーバー向けVPS比較" },
      { href: "/use-cases/wordpress/", label: "WordPress向けVPS比較" },
    ],
    updatedAt: "2026-11-26",
  },
}

export const getProviderContent = (id: string): ProviderContent | undefined =>
  contents[id]
