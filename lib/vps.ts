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
  storage: number
  traffic: string
  billing: BillingType
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
  plans: VpsPlan[]
}

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
    return `¥${minimum.toLocaleString()}`
  }

  return `¥${minimum.toLocaleString()}〜¥${maximum.toLocaleString()}`
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

const getPlanSpecScore = (plan: VpsPlan) =>
  plan.cpu * 1.5 + plan.memory * 2 + plan.storage / 50

export const filterAndSortServices = (
  items: VpsService[],
  filters: FilterState
) => {
  const normalizedQuery = filters.query.trim().toLowerCase()

  return items
    .filter((service) =>
      service.plans.some((plan) => matchesPrice(plan.price, filters.priceRange))
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
        return getLowestPricePlan(left).price - getLowestPricePlan(right).price
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
    values: servicesToCompare.map(
      (service) => `${getLowestPricePlan(service).storage} GB`
    ),
  },
  {
    label: "転送量",
    values: servicesToCompare.map(
      (service) => formatTrafficLabel(getLowestPricePlan(service).traffic)
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
      return getLowestPricePlan(left).price - getLowestPricePlan(right).price
    }

    if (sortKey === "cpu") {
      return getLowestPricePlan(right).cpu - getLowestPricePlan(left).cpu
    }

    if (sortKey === "memory") {
      return getLowestPricePlan(right).memory - getLowestPricePlan(left).memory
    }

    if (sortKey === "storage") {
      return (
        getLowestPricePlan(right).storage - getLowestPricePlan(left).storage
      )
    }

    if (sortKey === "plans") {
      return right.plans.length - left.plans.length
    }

    return right.popularity - left.popularity
  })
}
