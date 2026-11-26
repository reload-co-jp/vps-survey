import vpsData from "../data/vps.json"

export type RegionType = "JP" | "GLOBAL"
export type BillingType = "monthly" | "hourly"
export type UsageType = "development" | "production" | "verification"

export type VpsPlan = {
  id: string
  name: string
  price: number
  cpu: number
  memory: number
  storage: number | null
  traffic: string
  billing: BillingType
}

export type CurrencyType = "JPY" | "USD"

export type VpsCampaign = {
  title: string
  description: string
  url: string
  /** ISO 8601 date (YYYY-MM-DD) */
  startDate: string
  /** ISO 8601 date (YYYY-MM-DD) */
  endDate: string
}

export type VpsService = {
  id: string
  name: string
  region: RegionType
  popularity: number
  usage: UsageType[]
  tags: string[]
  summary: string
  features: string[]
  pros: string[]
  cons: string[]
  recommendedFor: string[]
  officialUrl: string
  affiliateUrl?: string
  affiliatePixelUrl?: string
  /** 料金表示の通貨。DigitalOcean など海外サービスは USD 表記 */
  currency: CurrencyType
  /** 料金・スペックを公式サイトで最後に確認した日 (YYYY-MM-DD) */
  priceCheckedAt: string
  /** 公式で確認できたキャンペーン。期間外のものは表示しない */
  campaigns: VpsCampaign[]
  plans: VpsPlan[]
}

export const getOutboundUrl = (service: VpsService) =>
  service.affiliateUrl ?? service.officialUrl

export const hasAffiliate = (service: VpsService) =>
  Boolean(service.affiliateUrl)

/** 通貨を考慮した料金表示。USD は円換算せずドル表記のまま出す */
export const formatPrice = (service: VpsService, price: number) =>
  service.currency === "USD"
    ? `$${price.toLocaleString("en-US")}`
    : `¥${price.toLocaleString("ja-JP")}`

export const formatPriceCheckedAt = (service: VpsService) => {
  const [year, month, day] = service.priceCheckedAt.split("-").map(Number)
  return `${year}年${month}月${day}日`
}

export const formatMemoryLabel = (memory: number) =>
  memory < 1 ? `${Math.round(memory * 1024)}MB` : `${memory}GB`

/** 指定日時点で開催中のキャンペーンのみ返す（終了・開始前は除外） */
export const getActiveCampaigns = (service: VpsService, now = new Date()) => {
  const today = now.toISOString().slice(0, 10)
  return service.campaigns.filter(
    (campaign) => campaign.startDate <= today && today <= campaign.endDate
  )
}

/** メモリ minMemory GB 以上で最安のプラン */
export const getCheapestPlanWithMemory = (
  service: VpsService,
  minMemory: number
): VpsPlan | undefined =>
  [...service.plans]
    .filter((plan) => plan.memory >= minMemory)
    .sort((left, right) => left.price - right.price)[0]

export type SortKey = "price" | "spec" | "popular"
export type ComparisonSortKey =
  | "default"
  | "price"
  | "cpu"
  | "memory"
  | "storage"
  | "plans"
  | "popularity"

export type FilterState = {
  priceRange: "all" | "under700" | "under1000" | "over1000"
  memory: "all" | "1" | "2" | "4"
  cpu: "all" | "1" | "2" | "4"
  region: "all" | "JP" | "GLOBAL"
  usage: "all" | UsageType
  query: string
  sort: SortKey
}

const services = vpsData as VpsService[]

export const usageLabels: Record<UsageType, string> = {
  development: "開発",
  production: "本番",
  verification: "検証",
}

export const regionLabels: Record<RegionType, string> = {
  JP: "国内",
  GLOBAL: "海外",
}

export const billingLabels: Record<BillingType, string> = {
  monthly: "月額課金",
  hourly: "時間課金",
}

export const formatTrafficLabel = (traffic: string) =>
  traffic === "unlimited" ? "無制限" : traffic

export const formatStorageLabel = (storage: number | null) =>
  storage === null ? "-" : `${storage} GB`

export const getAllServices = () => services

export const getServiceById = (id: string) =>
  services.find((service) => service.id === id)

export const getLowestPricePlan = (service: VpsService) =>
  [...service.plans].sort((left, right) => left.price - right.price)[0]

export const getHighestSpecPlan = (service: VpsService) =>
  [...service.plans].sort(
    (left, right) => getPlanSpecScore(right) - getPlanSpecScore(left)
  )[0]

export const getPriceRangeLabel = (service: VpsService) => {
  const prices = service.plans.map((plan) => plan.price)
  const minimum = Math.min(...prices)
  const maximum = Math.max(...prices)

  if (minimum === maximum) {
    return formatPrice(service, minimum)
  }

  return `${formatPrice(service, minimum)}〜${formatPrice(service, maximum)}`
}

const matchesPrice = (price: number, range: FilterState["priceRange"]) => {
  if (range === "under700") return price < 700
  if (range === "under1000") return price < 1000
  if (range === "over1000") return price >= 1000
  return true
}

const matchesMinimum = (
  value: number,
  selected: FilterState["memory"] | FilterState["cpu"]
) => (selected === "all" ? true : value >= Number(selected))

/** 円建てを先に価格順、円以外（USD）は後ろに回す */
const comparePriceAcrossCurrency = (left: VpsService, right: VpsService) => {
  if (left.currency !== right.currency) {
    return left.currency === "JPY" ? -1 : 1
  }
  return getLowestPricePlan(left).price - getLowestPricePlan(right).price
}

const getPlanSpecScore = (plan: VpsPlan) =>
  plan.cpu * 1.5 + plan.memory * 2 + (plan.storage ?? 0) / 50

export const filterAndSortServices = (
  items: VpsService[],
  filters: FilterState
) => {
  const normalizedQuery = filters.query.trim().toLowerCase()

  return items
    .filter((service) =>
      // 価格帯フィルタは円建てのサービスのみ判定（USD を円とみなさない）
      filters.priceRange === "all"
        ? true
        : service.currency === "JPY" &&
          service.plans.some((plan) =>
            matchesPrice(plan.price, filters.priceRange)
          )
    )
    .filter((service) =>
      service.plans.some((plan) => matchesMinimum(plan.memory, filters.memory))
    )
    .filter((service) =>
      service.plans.some((plan) => matchesMinimum(plan.cpu, filters.cpu))
    )
    .filter((service) =>
      filters.region === "all" ? true : service.region === filters.region
    )
    .filter((service) =>
      filters.usage === "all" ? true : service.usage.includes(filters.usage)
    )
    .filter((service) =>
      normalizedQuery.length === 0
        ? true
        : service.name.toLowerCase().includes(normalizedQuery)
    )
    .sort((left, right) => {
      if (filters.sort === "price") {
        return comparePriceAcrossCurrency(left, right)
      }
      if (filters.sort === "popular") return right.popularity - left.popularity

      return (
        getPlanSpecScore(getHighestSpecPlan(right)) -
        getPlanSpecScore(getHighestSpecPlan(left))
      )
    })
}

export const getComparisonRows = (servicesToCompare: VpsService[]) => [
  {
    label: "最安プラン",
    values: servicesToCompare.map(
      (service) => getLowestPricePlan(service).name
    ),
  },
  {
    label: "料金帯",
    values: servicesToCompare.map((service) => getPriceRangeLabel(service)),
  },
  {
    label: "最小CPU",
    values: servicesToCompare.map(
      (service) => `${getLowestPricePlan(service).cpu} vCPU`
    ),
  },
  {
    label: "最小メモリ",
    values: servicesToCompare.map(
      (service) => `${getLowestPricePlan(service).memory} GB`
    ),
  },
  {
    label: "最小ストレージ",
    values: servicesToCompare.map((service) =>
      formatStorageLabel(getLowestPricePlan(service).storage)
    ),
  },
  {
    label: "転送量",
    values: servicesToCompare.map((service) =>
      formatTrafficLabel(getLowestPricePlan(service).traffic)
    ),
  },
  {
    label: "リージョン",
    values: servicesToCompare.map((service) => regionLabels[service.region]),
  },
  {
    label: "課金方式",
    values: servicesToCompare.map(
      (service) => billingLabels[getLowestPricePlan(service).billing]
    ),
  },
  {
    label: "プラン数",
    values: servicesToCompare.map((service) => `${service.plans.length}件`),
  },
]

export const sortServicesForComparison = (
  servicesToCompare: VpsService[],
  sortKey: ComparisonSortKey
) => {
  if (sortKey === "default") {
    return servicesToCompare
  }

  return [...servicesToCompare].sort((left, right) => {
    if (sortKey === "price") {
      return comparePriceAcrossCurrency(left, right)
    }

    if (sortKey === "cpu") {
      return getLowestPricePlan(right).cpu - getLowestPricePlan(left).cpu
    }

    if (sortKey === "memory") {
      return getLowestPricePlan(right).memory - getLowestPricePlan(left).memory
    }

    if (sortKey === "storage") {
      return (
        (getLowestPricePlan(right).storage ?? -1) -
        (getLowestPricePlan(left).storage ?? -1)
      )
    }

    if (sortKey === "plans") {
      return right.plans.length - left.plans.length
    }

    return right.popularity - left.popularity
  })
}
