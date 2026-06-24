"use client"

import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { useMemo, useState } from "react"
import {
  billingLabels,
  filterAndSortServices,
  formatStorageLabel,
  formatTrafficLabel,
  getComparisonRows,
  getLowestPricePlan,
  getPriceRangeLabel,
  regionLabels,
  sortServicesForComparison,
  type ComparisonSortKey,
  type FilterState,
  type VpsService,
  usageLabels,
} from "../lib/vps"

const initialFilters: FilterState = {
  priceRange: "all",
  memory: "all",
  cpu: "all",
  region: "JP",
  usage: "all",
  query: "",
  sort: "popular",
}

const metrics = [
  { label: "掲載サービス", value: (count: number) => `${count}件` },
  { label: "最安価格帯", value: () => "¥550〜" },
  { label: "比較表示", value: () => "横並び比較" },
  { label: "主な用途", value: () => "開発・本番・検証" },
]

const filterGroups = [
  {
    key: "priceRange",
    label: "価格帯",
    options: [
      { label: "すべて", value: "all" },
      { label: "700円未満", value: "under700" },
      { label: "1,000円未満", value: "under1000" },
      { label: "1,000円以上", value: "over1000" },
    ],
  },
  {
    key: "memory",
    label: "最小メモリ",
    options: [
      { label: "指定なし", value: "all" },
      { label: "1GB以上", value: "1" },
      { label: "2GB以上", value: "2" },
      { label: "4GB以上", value: "4" },
    ],
  },
  {
    key: "cpu",
    label: "最小CPU",
    options: [
      { label: "指定なし", value: "all" },
      { label: "1コア以上", value: "1" },
      { label: "2コア以上", value: "2" },
      { label: "4コア以上", value: "4" },
    ],
  },
  {
    key: "region",
    label: "国内 / 海外",
    options: [
      { label: "国内", value: "JP" },
      { label: "海外", value: "GLOBAL" },
      { label: "すべて", value: "all" },
    ],
  },
  {
    key: "usage",
    label: "用途",
    options: [
      { label: "すべて", value: "all" },
      { label: "開発", value: "development" },
      { label: "本番", value: "production" },
      { label: "検証", value: "verification" },
    ],
  },
  {
    key: "sort",
    label: "並び替え",
    options: [
      { label: "人気順", value: "popular" },
      { label: "価格順", value: "price" },
      { label: "スペック順", value: "spec" },
    ],
  },
] as const

const comparisonSortOptions = [
  { label: "一覧順", value: "default" },
  { label: "価格が安い順", value: "price" },
  { label: "CPUが高い順", value: "cpu" },
  { label: "メモリが大きい順", value: "memory" },
  { label: "ストレージが大きい順", value: "storage" },
  { label: "プラン数が多い順", value: "plans" },
  { label: "人気順", value: "popularity" },
] as const

const articleLinks = [
  {
    href: "/articles/vps-choice/",
    title: "失敗しないVPSの選び方",
    body: "価格だけで選ぶと後悔する。CPU・メモリ・リージョン・課金方式で絞り込む実践的な選び方を解説。",
  },
  {
    href: "/articles/use-case-recommendations/",
    title: "用途別・迷わないVPS選び",
    body: "開発・本番・検証で最適解は変わる。用途ごとに「どこを見るべきか」を整理した。",
  },
  {
    href: "/articles/beginner-guide/",
    title: "VPS初心者が最初に読む記事",
    body: "1〜2GBで始めてスペック不足になったら上げる。この進め方が一番安全で費用も最小になる。",
  },
]

type Props = {
  services: VpsService[]
}

export const VpsExplorer = ({ services }: Props) => {
  const [filters, setFilters] = useState(initialFilters)
  const [comparisonSort, setComparisonSort] =
    useState<ComparisonSortKey>("default")
  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>(
    {}
  )

  const filteredServices = useMemo(
    () => filterAndSortServices(services, filters),
    [filters, services]
  )
  const comparisonServices = useMemo(
    () => sortServicesForComparison(filteredServices, comparisonSort),
    [comparisonSort, filteredServices]
  )
  const comparisonRows = useMemo(
    () => getComparisonRows(comparisonServices),
    [comparisonServices]
  )

  const updateFilter = <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key]
  ) => setFilters((current) => ({ ...current, [key]: value }))

  const toggleExpandedPlans = (serviceId: string) =>
    setExpandedPlans((current) => ({
      ...current,
      [serviceId]: !current[serviceId],
    }))

  return (
    <div data-vps-explorer="" style={explorerStyle}>
      <ExplorerStyles />
      <Hero serviceCount={services.length} />
      <FilterPanel
        filters={filters}
        resultCount={filteredServices.length}
        updateFilter={updateFilter}
      />
      <ServiceGrid services={filteredServices} />
      <ComparisonTable
        comparisonRows={comparisonRows}
        comparisonServices={comparisonServices}
        expandedPlans={expandedPlans}
        filteredCount={filteredServices.length}
        setComparisonSort={setComparisonSort}
        sort={comparisonSort}
        toggleExpandedPlans={toggleExpandedPlans}
      />
      <ArticleGrid />
    </div>
  )
}

const ExplorerStyles = () => (
  <style>{`
    [data-vps-explorer] [data-surface='default'] {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      padding: 1.25rem;
    }

    [data-vps-explorer] [data-surface='responsive'] {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: clamp(8px, 2vw, 12px);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
      padding: clamp(0.9rem, 3vw, 1.25rem);
    }

    [data-vps-explorer] [data-grid='metrics'] {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
    }

    [data-vps-explorer] [data-grid='filters'] {
      align-items: end;
      display: grid;
      gap: 0.85rem;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 150px), 1fr));
    }

    [data-vps-explorer] [data-grid='services'] {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
      max-width: 100%;
      min-width: 0;
      width: 100%;
    }

    [data-vps-explorer] [data-grid='articles'] {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
    }

    [data-vps-explorer] [data-scroll='x'] {
      -webkit-overflow-scrolling: touch;
      overflow-x: auto;
      overscroll-behavior-x: contain;
      padding-bottom: 0.35rem;
    }
  `}</style>
)

const Hero = ({ serviceCount }: { serviceCount: number }) => (
  <section style={heroStyle}>
    <div style={heroContentStyle}>
      <span style={eyebrowStyle}>VPS Compare Navigator</span>
      <div style={{ display: "grid", gap: "0.75rem", maxWidth: 760 }}>
        <h1 style={heroTitleStyle}>
          月550円から。あなたに合うVPSを今すぐ見つける
        </h1>
        <p style={heroLeadStyle}>
          国内・海外15社以上を価格・スペック・用途で絞り込み。
          横並び比較でサクッと決めよう。
        </p>
      </div>
      <div data-grid="metrics">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value(serviceCount)}
          />
        ))}
      </div>
    </div>
  </section>
)

type FilterPanelProps = {
  filters: FilterState
  resultCount: number
  updateFilter: <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key]
  ) => void
}

const FilterPanel = ({
  filters,
  resultCount,
  updateFilter,
}: FilterPanelProps) => (
  <section data-surface="default" style={fullWidthStyle}>
    <div style={{ display: "grid", gap: "1rem" }}>
      <div data-grid="filters">
        <ControlField label="サービス名検索">
          <input
            onChange={(event) => updateFilter("query", event.target.value)}
            placeholder="ConoHa / DigitalOcean など"
            style={controlStyle}
            value={filters.query}
          />
        </ControlField>
        {filterGroups.map((group) => (
          <ControlField key={group.key} label={group.label}>
            <select
              onChange={(event) =>
                updateFilter(group.key, event.target.value as never)
              }
              style={controlStyle}
              value={filters[group.key]}
            >
              {group.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </ControlField>
        ))}
      </div>
      <p style={{ color: "#718096", fontSize: "0.92rem" }}>
        {resultCount}
        件が条件に一致しています。フィルタ結果はそのまま下部の比較表に横並び表示されます。
      </p>
    </div>
  </section>
)

const ServiceGrid = ({ services }: { services: VpsService[] }) => (
  <section data-grid="services">
    {services.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </section>
)

const ServiceCard = ({ service }: { service: VpsService }) => {
  const lowestPricePlan = getLowestPricePlan(service)

  return (
    <article data-surface="default" style={fullWidthStyle}>
      <div style={{ display: "grid", gap: "0.75rem" }}>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <strong style={{ color: "#1a202c", fontSize: "1.05rem" }}>
            {service.name}
          </strong>
          <p style={cardTextStyle}>{service.summary}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={pillStyle}>
            用途: {service.usage.map((usage) => usageLabels[usage]).join(" / ")}
          </span>
          <span style={pillStyle}>プラン数: {service.plans.length}件</span>
          <span style={pillStyle}>{regionLabels[service.region]}</span>
        </div>
        <div style={{ display: "grid", gap: "0.35rem" }}>
          <strong style={{ color: "#1a202c", fontSize: "1.15rem" }}>
            {getPriceRangeLabel(service)}
          </strong>
          <span style={subCellStyle}>最安プラン: {lowestPricePlan.name}</span>
          <span style={subCellStyle}>
            {lowestPricePlan.cpu} vCPU / {lowestPricePlan.memory} GB /{" "}
            {formatStorageLabel(lowestPricePlan.storage)}
          </span>
        </div>
        <Link href={`/vps/${service.id}/`} style={linkButtonStyle}>
          詳細を見る
        </Link>
      </div>
    </article>
  )
}

type ComparisonTableProps = {
  comparisonRows: ReturnType<typeof getComparisonRows>
  comparisonServices: VpsService[]
  expandedPlans: Record<string, boolean>
  filteredCount: number
  setComparisonSort: (sort: ComparisonSortKey) => void
  sort: ComparisonSortKey
  toggleExpandedPlans: (serviceId: string) => void
}

const ComparisonTable = ({
  comparisonRows,
  comparisonServices,
  expandedPlans,
  filteredCount,
  setComparisonSort,
  sort,
  toggleExpandedPlans,
}: ComparisonTableProps) => (
  <section data-surface="responsive" style={fullWidthStyle}>
    <div style={comparisonHeaderStyle}>
      <div>
        <h2 style={sectionTitleStyle}>全サービス横並び比較</h2>
        <p style={{ color: "#718096" }}>
          フィルタ条件のVPSを横並びで比較。価格・スペック・プランを一気見できる。
        </p>
      </div>
      <ComparisonSortControl
        count={comparisonServices.length}
        setSort={setComparisonSort}
        sort={sort}
      />
    </div>
    {filteredCount === 0 ? (
      <p style={{ color: "#718096" }}>
        条件に一致するサービスがありません。フィルタ条件を調整してください。
      </p>
    ) : (
      <div data-scroll="x">
        <table style={{ minWidth: "100%", width: "max-content" }}>
          <thead>
            <tr>
              <th style={compareHeadStyle}>項目</th>
              {comparisonServices.map((service) => (
                <th key={service.id} style={compareHeadStyle}>
                  <div style={{ display: "grid", gap: "0.35rem" }}>
                    <span>{service.name}</span>
                    <Link href={`/vps/${service.id}/`} style={compareLinkStyle}>
                      詳細を見る
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.label}>
                <td style={compareCellLabelStyle}>{row.label}</td>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.label}-${value}-${index}`}
                    style={compareCellStyle}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
            <PlanComparisonRow
              expandedPlans={expandedPlans}
              services={comparisonServices}
              toggleExpandedPlans={toggleExpandedPlans}
            />
          </tbody>
        </table>
      </div>
    )}
  </section>
)

type ComparisonSortControlProps = {
  count: number
  setSort: (sort: ComparisonSortKey) => void
  sort: ComparisonSortKey
}

const ComparisonSortControl = ({
  count,
  setSort,
  sort,
}: ComparisonSortControlProps) => (
  <div style={comparisonControlsStyle}>
    <span style={{ color: "#3EA8FF", fontSize: "0.9rem" }}>
      表示中: {count}件
    </span>
    <label style={inlineLabelStyle}>
      項目ソート
      <select
        onChange={(event) => setSort(event.target.value as ComparisonSortKey)}
        style={compactControlStyle}
        value={sort}
      >
        {comparisonSortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
)

type PlanComparisonRowProps = {
  expandedPlans: Record<string, boolean>
  services: VpsService[]
  toggleExpandedPlans: (serviceId: string) => void
}

const PlanComparisonRow = ({
  expandedPlans,
  services,
  toggleExpandedPlans,
}: PlanComparisonRowProps) => (
  <tr>
    <td style={compareCellLabelStyle}>全プラン</td>
    {services.map((service) => {
      const isExpanded = expandedPlans[service.id] ?? false
      const visiblePlans = isExpanded
        ? service.plans
        : service.plans.slice(0, 3)

      return (
        <td key={`${service.id}-plans`} style={compareCellStyle}>
          <div style={{ display: "grid", gap: "0.55rem" }}>
            {visiblePlans.map((plan) => (
              <div key={plan.id} style={planCardStyle}>
                <strong style={{ fontSize: "0.85rem" }}>
                  {plan.name} / ¥{plan.price.toLocaleString()}
                </strong>
                <span style={subCellStyle}>
                  {plan.cpu} vCPU / {plan.memory} GB /{" "}
                  {formatStorageLabel(plan.storage)}
                </span>
                <span style={subCellStyle}>
                  {formatTrafficLabel(plan.traffic)} /{" "}
                  {billingLabels[plan.billing]}
                </span>
              </div>
            ))}
            {service.plans.length > 3 ? (
              <button
                onClick={() => toggleExpandedPlans(service.id)}
                style={compareMoreButtonStyle}
                type="button"
              >
                {isExpanded
                  ? "閉じる"
                  : `もっとみる（残り${service.plans.length - 3}件）`}
              </button>
            ) : null}
          </div>
        </td>
      )
    })}
  </tr>
)

const ArticleGrid = () => (
  <>
    <section data-grid="articles" style={fullWidthStyle}>
      {articleLinks.map((article) => (
        <ArticleCard key={article.href} {...article} />
      ))}
    </section>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Link href="/articles/" style={textLinkStyle}>
        記事一覧を見る →
      </Link>
    </div>
  </>
)

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div style={metricCardStyle}>
    <span style={{ color: "#718096", fontSize: "0.82rem" }}>{label}</span>
    <strong style={metricValueStyle}>{value}</strong>
  </div>
)

const ControlField = ({
  children,
  label,
}: {
  children: ReactNode
  label: string
}) => (
  <label style={{ display: "grid", gap: "0.45rem" }}>
    <span style={{ color: "#4a5568", fontSize: "0.86rem", fontWeight: 500 }}>
      {label}
    </span>
    {children}
  </label>
)

const ArticleCard = ({
  body,
  href,
  title,
}: {
  body: string
  href: string
  title: string
}) => (
  <article data-surface="responsive" style={fullWidthStyle}>
    <div style={{ display: "grid", gap: "0.6rem" }}>
      <h2 style={{ color: "#1a202c", fontSize: "1.1rem", fontWeight: 700 }}>
        {title}
      </h2>
      <p style={{ color: "#718096", lineHeight: 1.8 }}>{body}</p>
      <Link href={href} style={articleLinkStyle}>
        記事を読む →
      </Link>
    </div>
  </article>
)

const explorerStyle: CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  maxWidth: "100%",
  minWidth: 0,
  width: "100%",
}

const fullWidthStyle: CSSProperties = {
  maxWidth: "100%",
  minWidth: 0,
  width: "100%",
}

const controlStyle: CSSProperties = {
  appearance: "none",
  background: "#ffffff",
  border: "1px solid #cbd5e0",
  borderRadius: 6,
  color: "#1a202c",
  fontSize: "0.95rem",
  minHeight: 44,
  padding: "0.65rem 0.9rem",
  width: "100%",
}

const compactControlStyle: CSSProperties = {
  ...controlStyle,
  minHeight: 40,
  padding: "0.55rem 0.8rem",
  width: "auto",
}

const heroStyle: CSSProperties = {
  background: "#eef6ff",
  border: "1px solid #bee3f8",
  borderRadius: 12,
  maxWidth: "100%",
  minWidth: 0,
  overflow: "hidden",
  padding: "clamp(1.25rem, 4vw, 2rem)",
  position: "relative",
  width: "100%",
}

const heroContentStyle: CSSProperties = {
  display: "grid",
  gap: "1rem",
  position: "relative",
  zIndex: 1,
}

const eyebrowStyle: CSSProperties = {
  background: "#ebf8ff",
  border: "1px solid #bee3f8",
  borderRadius: 999,
  color: "#2b6cb0",
  display: "inline-flex",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  padding: "0.35rem 0.7rem",
  textTransform: "uppercase",
  width: "fit-content",
}

const heroTitleStyle: CSSProperties = {
  color: "#1a202c",
  fontSize: "clamp(1.75rem, 4vw, 3rem)",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.2,
}

const heroLeadStyle: CSSProperties = {
  color: "#4a5568",
  fontSize: "1rem",
  lineHeight: 1.8,
}

const metricCardStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #bee3f8",
  borderRadius: 8,
  display: "grid",
  gap: "0.35rem",
  padding: "0.85rem 1rem",
}

const metricValueStyle: CSSProperties = {
  color: "#1a202c",
  fontSize: "1.2rem",
  letterSpacing: "-0.02em",
}

const cardTextStyle: CSSProperties = {
  color: "#718096",
  fontSize: "0.92rem",
  lineHeight: 1.7,
}

const comparisonHeaderStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
  justifyContent: "space-between",
  marginBottom: "1rem",
}

const comparisonControlsStyle: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
}

const inlineLabelStyle: CSSProperties = {
  alignItems: "center",
  color: "#4a5568",
  display: "flex",
  fontSize: "0.9rem",
  gap: "0.5rem",
}

const sectionTitleStyle: CSSProperties = {
  color: "#1a202c",
  fontSize: "1.35rem",
  marginBottom: "0.35rem",
}

const planCardStyle: CSSProperties = {
  background: "#f7fafc",
  border: "1px solid #e2e8f0",
  borderRadius: 6,
  display: "grid",
  gap: "0.2rem",
  padding: "0.6rem",
}

const subCellStyle: CSSProperties = {
  color: "#718096",
  fontSize: "0.8rem",
}

const linkButtonStyle: CSSProperties = {
  background: "#3EA8FF",
  borderRadius: 6,
  color: "#ffffff",
  display: "inline-flex",
  fontSize: "0.9rem",
  fontWeight: 600,
  padding: "0.6rem 1rem",
  textDecoration: "none",
  whiteSpace: "nowrap",
}

const compareHeadStyle: CSSProperties = {
  background: "#f7fafc",
  borderBottom: "1px solid #e2e8f0",
  minWidth: "220px",
  padding: "0.9rem",
  textAlign: "left",
  verticalAlign: "top",
  whiteSpace: "normal",
  wordBreak: "break-word",
}

const compareCellLabelStyle: CSSProperties = {
  borderBottom: "1px solid #e2e8f0",
  color: "#4a5568",
  fontWeight: 600,
  minWidth: "140px",
  padding: "0.9rem",
  whiteSpace: "nowrap",
}

const compareCellStyle: CSSProperties = {
  borderBottom: "1px solid #e2e8f0",
  color: "#1a202c",
  maxWidth: "220px",
  minWidth: "220px",
  padding: "0.9rem",
  verticalAlign: "top",
  whiteSpace: "normal",
  wordBreak: "break-word",
}

const compareLinkStyle: CSSProperties = {
  color: "#3EA8FF",
  fontSize: "0.82rem",
  textDecoration: "none",
}

const compareMoreButtonStyle: CSSProperties = {
  appearance: "none",
  background: "#ebf8ff",
  border: "1px solid #bee3f8",
  borderRadius: 6,
  color: "#3EA8FF",
  cursor: "pointer",
  fontSize: "0.82rem",
  fontWeight: 600,
  padding: "0.7rem 0.75rem",
  textAlign: "center",
  width: "100%",
}

const pillStyle: CSSProperties = {
  background: "#ebf8ff",
  border: "1px solid #bee3f8",
  borderRadius: 999,
  color: "#2b6cb0",
  fontSize: "0.8rem",
  padding: "0.3rem 0.6rem",
}

const textLinkStyle: CSSProperties = {
  color: "#3EA8FF",
  fontSize: "0.9rem",
  fontWeight: 600,
  textDecoration: "none",
}

const articleLinkStyle: CSSProperties = {
  ...textLinkStyle,
  width: "fit-content",
}
