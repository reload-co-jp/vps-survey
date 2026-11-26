// オブジェクトストレージ比較データ。VPS のデータモデル（data/vps.json）とは分けて管理する。
// 値はすべて公式料金ページの記載を転記したもの。確認できなかった項目は null とし、推測で埋めない。

export type ObjectStorageService = {
  id: string
  name: string
  provider: string
  /** 日本円で表示されるか、米ドルか */
  currency: "JPY" | "USD"
  /** 料金表示の要約（公式表記を日本語化） */
  storagePrice: string | null
  minimumCharge: string | null
  egress: string | null
  requests: string | null
  freeTier: string | null
  s3Compatible: "yes" | "unconfirmed"
  note?: string
  pricingUrl: string
  /** 公式ページを確認した日 (YYYY-MM-DD) */
  checkedAt: string
  /** 公式ページを取得できず料金未確認 */
  unverified?: boolean
}

export const objectStorageServices: ObjectStorageService[] = [
  {
    id: "sakura-object-storage",
    name: "さくらのクラウド オブジェクトストレージ",
    provider: "さくらインターネット",
    currency: "JPY",
    storagePrice:
      "基本料金 月額495円（100GiB・転送量10GiB・10万リクエスト・10万オブジェクトまで含む）、超過分はストレージ10GiBごと49.5円",
    minimumCharge: "基本料金 月額495円（1バケット）",
    egress:
      "基本料金に10GiBまで含む。超過分は10GiBごと88円（さくらインターネット提供のIPアドレス以外からのGETリクエストのみ課金）",
    requests:
      "基本料金に10万リクエストまで含む。超過分は10万リクエストごと55円",
    freeTier: null,
    s3Compatible: "yes",
    note: "表示価格は税込（公式ページに明記）。アーカイブ向けプランも別途あり。",
    pricingUrl: "https://cloud.sakura.ad.jp/products/object-storage/",
    checkedAt: "2026-11-26",
  },
  {
    id: "conoha-object-storage",
    name: "ConoHa オブジェクトストレージ",
    provider: "GMOインターネットグループ",
    currency: "JPY",
    storagePrice: null,
    minimumCharge: null,
    egress: null,
    requests: null,
    freeTier: null,
    s3Compatible: "unconfirmed",
    note: "当サイトの確認時に公式ページの料金表を取得できなかったため、料金は掲載していません。公式サイトで確認してください。",
    pricingUrl: "https://www.conoha.jp/",
    checkedAt: "2026-11-26",
    unverified: true,
  },
  {
    id: "wasabi",
    name: "Wasabi Hot Cloud Storage",
    provider: "Wasabi Technologies",
    currency: "USD",
    storagePrice: "$7.99 / TB / 月から",
    minimumCharge: "従量課金プランは1TB分の最低月額料金あり。最低保存期間90日",
    egress: "無料（公式ページで「No fees for egress」と記載）",
    requests: "無料（公式ページで「No fees for API requests」と記載）",
    freeTier: null,
    s3Compatible: "unconfirmed",
    note: "無料トライアルあり（条件は公式ページを確認）。税の扱いは未確認。",
    pricingUrl: "https://wasabi.com/pricing",
    checkedAt: "2026-11-26",
  },
  {
    id: "backblaze-b2",
    name: "Backblaze B2",
    provider: "Backblaze",
    currency: "USD",
    storagePrice: "$6.95 / TB / 月から",
    minimumCharge: "最小ファイルサイズ・最低保存期間による追加料金なし",
    egress: "保存容量の3倍まで無料。超過分は $0.01 / GB",
    requests:
      "Class A・B・C は無料。Class D は1万回あたり $0.004（1日2,500回まで無料）",
    freeTier: "最初の10GBは常に無料",
    s3Compatible: "yes",
    note: "税の扱いは未確認。",
    pricingUrl: "https://www.backblaze.com/cloud-storage/pricing",
    checkedAt: "2026-11-26",
  },
  {
    id: "cloudflare-r2",
    name: "Cloudflare R2",
    provider: "Cloudflare",
    currency: "USD",
    storagePrice:
      "Standard $0.015 / GB / 月（Infrequent Access は $0.01 / GB / 月）",
    minimumCharge: "Standard は最低保存期間なし（Infrequent Access は30日）",
    egress: "無料（インターネットへの転送）",
    requests:
      "Class A $4.50 / 100万リクエスト、Class B $0.36 / 100万リクエスト（Standard）",
    freeTier:
      "Standard：ストレージ10GB/月、Class A 100万リクエスト/月、Class B 1,000万リクエスト/月",
    s3Compatible: "unconfirmed",
    note: "S3 API経由のアクセスに言及あり。税の扱いは未確認。",
    pricingUrl: "https://developers.cloudflare.com/r2/pricing/",
    checkedAt: "2026-11-26",
  },
]

export const s3CompatibleLabel = {
  yes: "対応（公式に記載）",
  unconfirmed: "公式で要確認",
} as const
