import vpsData from "../data/vps.json"

export type RegionType = "JP" | "GLOBAL"
export type BillingType = "monthly" | "hourly"
export type UsageType = "development" | "production" | "verification"

export type VpsService = {
  id: string
  name: string
  price: number
  cpu: number
  memory: number
  storage: number
  traffic: string
  region: RegionType
  billing: BillingType
  popularity: number
  usage: UsageType[]
  tags: string[]
  summary: string
  features: string[]
  pros: string[]
  cons: string[]
  recommendedFor: string[]
  officialUrl: string
}

export type SortKey = "price" | "spec" | "popular"

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

export const getAllServices = () => services

export const getServiceById = (id: string) =>
  services.find((service) => service.id === id)

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

const getSpecScore = (service: VpsService) =>
  service.cpu * 1.5 + service.memory * 2 + service.storage / 50

export const filterAndSortServices = (
  items: VpsService[],
  filters: FilterState
) => {
  const normalizedQuery = filters.query.trim().toLowerCase()

  return items
    .filter((service) => matchesPrice(service.price, filters.priceRange))
    .filter((service) => matchesMinimum(service.memory, filters.memory))
    .filter((service) => matchesMinimum(service.cpu, filters.cpu))
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
      if (filters.sort === "price") return left.price - right.price
      if (filters.sort === "popular") return right.popularity - left.popularity

      return getSpecScore(right) - getSpecScore(left)
    })
}

export const getComparisonRows = (servicesToCompare: VpsService[]) => [
  {
    label: "月額料金",
    values: servicesToCompare.map(
      (service) => `¥${service.price.toLocaleString()}`
    ),
  },
  {
    label: "CPU",
    values: servicesToCompare.map((service) => `${service.cpu} vCPU`),
  },
  {
    label: "メモリ",
    values: servicesToCompare.map((service) => `${service.memory} GB`),
  },
  {
    label: "ストレージ",
    values: servicesToCompare.map((service) => `${service.storage} GB`),
  },
  {
    label: "転送量",
    values: servicesToCompare.map((service) => service.traffic),
  },
  {
    label: "リージョン",
    values: servicesToCompare.map((service) => regionLabels[service.region]),
  },
  {
    label: "課金方式",
    values: servicesToCompare.map((service) => billingLabels[service.billing]),
  },
]
