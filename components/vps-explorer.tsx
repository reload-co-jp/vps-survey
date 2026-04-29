"use client"

import Link from "next/link"
import type { ReactNode } from "react"
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

const controlStyle = {
  appearance: "none" as const,
  background: "#ffffff",
  border: "1px solid #cbd5e0",
  borderRadius: 6,
  color: "#1a202c",
  fontSize: "0.95rem",
  minHeight: 44,
  padding: "0.65rem 0.9rem",
  width: "100%",
}

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
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const toggleExpandedPlans = (serviceId: string) => {
    setExpandedPlans((current) => ({
      ...current,
      [serviceId]: !current[serviceId],
    }))
  }

  return (
    <div
      data-vps-explorer=""
      style={{
        display: "grid",
        gap: "1.5rem",
        maxWidth: "100%",
        minWidth: 0,
        width: "100%",
      }}
    >
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
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 160px), 1fr)
          );
        }

        [data-vps-explorer] [data-grid='filters'] {
          align-items: end;
          display: grid;
          gap: 0.85rem;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 150px), 1fr)
          );
        }

        [data-vps-explorer] [data-grid='services'] {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 260px), 1fr)
          );
          max-width: 100%;
          min-width: 0;
          width: 100%;
        }

        [data-vps-explorer] [data-grid='articles'] {
          display: grid;
          gap: 1rem;
          grid-template-columns: repeat(
            auto-fit,
            minmax(min(100%, 240px), 1fr)
          );
        }

        [data-vps-explorer] [data-scroll='x'] {
          -webkit-overflow-scrolling: touch;
          overflow-x: auto;
          overscroll-behavior-x: contain;
          padding-bottom: 0.35rem;
        }
      `}</style>
      <section
        style={{
          background: "#eef6ff",
          border: "1px solid #bee3f8",
          borderRadius: 12,
          maxWidth: "100%",
          minWidth: 0,
          overflow: "hidden",
          padding: "clamp(1.25rem, 4vw, 2rem)",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gap: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
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
            }}
          >
            VPS Compare Navigator
          </span>
          <div style={{ display: "grid", gap: "0.75rem", maxWidth: 760 }}>
            <h1
              style={{
                color: "#1a202c",
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              今必要なVPSを性能・価格で比較して最安を探せる
            </h1>
            <p style={{ color: "#4a5568", fontSize: "1rem", lineHeight: 1.8 }}>
              国内外の主要 VPS を、初心者にも分かりやすい軸で一覧化。
              検索、フィルタ、ソート、比較してお好みのVPSがミツカします。
            </p>
          </div>
          <div data-grid="metrics">
            <MetricCard label="掲載サービス" value={`${services.length}件`} />
            <MetricCard label="最安価格帯" value="¥550〜" />
            <MetricCard label="比較表示" value="横並び比較" />
            <MetricCard label="主な用途" value="開発・本番・検証" />
          </div>
        </div>
      </section>

      <section
        data-surface="default"
        style={{ maxWidth: "100%", minWidth: 0, width: "100%" }}
      >
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
            <ControlField label="価格帯">
              <select
                onChange={(event) =>
                  updateFilter(
                    "priceRange",
                    event.target.value as FilterState["priceRange"]
                  )
                }
                style={controlStyle}
                value={filters.priceRange}
              >
                <option value="all">すべて</option>
                <option value="under700">700円未満</option>
                <option value="under1000">1,000円未満</option>
                <option value="over1000">1,000円以上</option>
              </select>
            </ControlField>
            <ControlField label="最小メモリ">
              <select
                onChange={(event) =>
                  updateFilter(
                    "memory",
                    event.target.value as FilterState["memory"]
                  )
                }
                style={controlStyle}
                value={filters.memory}
              >
                <option value="all">指定なし</option>
                <option value="1">1GB以上</option>
                <option value="2">2GB以上</option>
                <option value="4">4GB以上</option>
              </select>
            </ControlField>
            <ControlField label="最小CPU">
              <select
                onChange={(event) =>
                  updateFilter("cpu", event.target.value as FilterState["cpu"])
                }
                style={controlStyle}
                value={filters.cpu}
              >
                <option value="all">指定なし</option>
                <option value="1">1コア以上</option>
                <option value="2">2コア以上</option>
                <option value="4">4コア以上</option>
              </select>
            </ControlField>
            <ControlField label="国内 / 海外">
              <select
                onChange={(event) =>
                  updateFilter(
                    "region",
                    event.target.value as FilterState["region"]
                  )
                }
                style={controlStyle}
                value={filters.region}
              >
                <option value="JP">国内</option>
                <option value="GLOBAL">海外</option>
                <option value="all">すべて</option>
              </select>
            </ControlField>
            <ControlField label="用途">
              <select
                onChange={(event) =>
                  updateFilter(
                    "usage",
                    event.target.value as FilterState["usage"]
                  )
                }
                style={controlStyle}
                value={filters.usage}
              >
                <option value="all">すべて</option>
                <option value="development">開発</option>
                <option value="production">本番</option>
                <option value="verification">検証</option>
              </select>
            </ControlField>
            <ControlField label="並び替え">
              <select
                onChange={(event) =>
                  updateFilter(
                    "sort",
                    event.target.value as FilterState["sort"]
                  )
                }
                style={controlStyle}
                value={filters.sort}
              >
                <option value="popular">人気順</option>
                <option value="price">価格順</option>
                <option value="spec">スペック順</option>
              </select>
            </ControlField>
          </div>
          <p style={{ color: "#718096", fontSize: "0.92rem" }}>
            {filteredServices.length}
            件が条件に一致しています。フィルタ結果はそのまま下部の比較表に横並び表示されます。
          </p>
        </div>
      </section>

      <section data-grid="services">
        {filteredServices.map((service) => {
          const lowestPricePlan = getLowestPricePlan(service)

          return (
            <article
              key={service.id}
              data-surface="default"
              style={{ maxWidth: "100%", minWidth: 0, width: "100%" }}
            >
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <strong style={{ color: "#1a202c", fontSize: "1.05rem" }}>
                    {service.name}
                  </strong>
                  <p
                    style={{
                      color: "#718096",
                      fontSize: "0.92rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {service.summary}
                  </p>
                </div>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  <span style={pillStyle}>
                    用途:{" "}
                    {service.usage
                      .map((usage) => usageLabels[usage])
                      .join(" / ")}
                  </span>
                  <span style={pillStyle}>
                    プラン数: {service.plans.length}件
                  </span>
                  <span style={pillStyle}>{regionLabels[service.region]}</span>
                </div>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <strong style={{ color: "#1a202c", fontSize: "1.15rem" }}>
                    {getPriceRangeLabel(service)}
                  </strong>
                  <span style={subCellStyle}>
                    最安プラン: {lowestPricePlan.name}
                  </span>
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
        })}
      </section>

      <section
        data-surface="responsive"
        style={{ maxWidth: "100%", minWidth: 0, width: "100%" }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2 style={{ color: "#1a202c", fontSize: "1.35rem", marginBottom: "0.35rem" }}>
              比較ビュー
            </h2>
            <p style={{ color: "#718096" }}>
              フィルタ条件に一致した VPS を最初から横並びで比較できます。
            </p>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
            }}
          >
            <span style={{ color: "#3EA8FF", fontSize: "0.9rem" }}>
              表示中: {comparisonServices.length}件
            </span>
            <label
              style={{
                alignItems: "center",
                color: "#4a5568",
                display: "flex",
                fontSize: "0.9rem",
                gap: "0.5rem",
              }}
            >
              項目ソート
              <select
                onChange={(event) =>
                  setComparisonSort(event.target.value as ComparisonSortKey)
                }
                style={{
                  ...controlStyle,
                  minHeight: 40,
                  padding: "0.55rem 0.8rem",
                  width: "auto",
                }}
                value={comparisonSort}
              >
                <option value="default">一覧順</option>
                <option value="price">価格が安い順</option>
                <option value="cpu">CPUが高い順</option>
                <option value="memory">メモリが大きい順</option>
                <option value="storage">ストレージが大きい順</option>
                <option value="plans">プラン数が多い順</option>
                <option value="popularity">人気順</option>
              </select>
            </label>
          </div>
        </div>
        {filteredServices.length === 0 ? (
          <p style={{ color: "#718096" }}>
            条件に一致するサービスがありません。フィルタ条件を調整してください。
          </p>
        ) : (
          <div data-scroll="x">
            <table
              style={{
                minWidth: "100%",
                width: "max-content",
              }}
            >
              <thead>
                <tr>
                  <th style={compareHeadStyle}>項目</th>
                  {comparisonServices.map((service) => (
                    <th key={service.id} style={compareHeadStyle}>
                      <div style={{ display: "grid", gap: "0.35rem" }}>
                        <span>{service.name}</span>
                        <Link
                          href={`/vps/${service.id}/`}
                          style={compareLinkStyle}
                        >
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
                <tr>
                  <td style={compareCellLabelStyle}>全プラン</td>
                  {comparisonServices.map((service) => {
                    const isExpanded = expandedPlans[service.id] ?? false
                    const visiblePlans = isExpanded
                      ? service.plans
                      : service.plans.slice(0, 3)

                    return (
                      <td key={`${service.id}-plans`} style={compareCellStyle}>
                        <div style={{ display: "grid", gap: "0.55rem" }}>
                          {visiblePlans.map((plan) => (
                            <div
                              key={plan.id}
                              style={{
                                background: "#f7fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: 6,
                                display: "grid",
                                gap: "0.2rem",
                                padding: "0.6rem",
                              }}
                            >
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
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section
        data-grid="articles"
        style={{ maxWidth: "100%", minWidth: 0, width: "100%" }}
      >
        <ArticleCard
          href="/articles/vps-choice/"
          title="VPSの選び方"
          body="価格だけでなく、CPU・メモリ・リージョン・課金方式を合わせて見ると、あとからの移行コストを抑えやすくなります。"
        />
        <ArticleCard
          href="/articles/use-case-recommendations/"
          title="用途別おすすめ"
          body="開発用途なら時間課金、本番用途なら国内リージョンと安定性、検証用途なら低価格帯と初期構築のしやすさが見極めやすい軸です。"
        />
        <ArticleCard
          href="/articles/beginner-guide/"
          title="初心者向け解説"
          body="まずは 1〜2GB メモリ帯から始め、運用しながら CPU 使用率や転送量を見て上位プランへ拡張する進め方が安全です。"
        />
      </section>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          href="/articles/"
          style={{
            color: "#3EA8FF",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          記事一覧を見る →
        </Link>
      </div>
    </div>
  )
}

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #bee3f8",
      borderRadius: 8,
      display: "grid",
      gap: "0.35rem",
      padding: "0.85rem 1rem",
    }}
  >
    <span style={{ color: "#718096", fontSize: "0.82rem" }}>{label}</span>
    <strong style={{ color: "#1a202c", fontSize: "1.2rem", letterSpacing: "-0.02em" }}>
      {value}
    </strong>
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
    <span style={{ color: "#4a5568", fontSize: "0.86rem", fontWeight: 500 }}>{label}</span>
    {children}
  </label>
)

const ArticleCard = ({
  body,
  href,
  title,
}: {
  body: string
  href?: string
  title: string
}) => (
  <article
    data-surface="responsive"
    style={{ maxWidth: "100%", minWidth: 0, width: "100%" }}
  >
    <div style={{ display: "grid", gap: "0.6rem" }}>
      <h2 style={{ color: "#1a202c", fontSize: "1.1rem", fontWeight: 700 }}>{title}</h2>
      <p style={{ color: "#718096", lineHeight: 1.8 }}>{body}</p>
      {href ? (
        <Link
          href={href}
          style={{
            color: "#3EA8FF",
            fontSize: "0.9rem",
            fontWeight: 600,
            textDecoration: "none",
            width: "fit-content",
          }}
        >
          記事を読む →
        </Link>
      ) : null}
    </div>
  </article>
)

const subCellStyle = {
  color: "#718096",
  fontSize: "0.8rem",
}

const linkButtonStyle = {
  background: "#3EA8FF",
  borderRadius: 6,
  color: "#ffffff",
  display: "inline-flex",
  fontSize: "0.9rem",
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
  padding: "0.6rem 1rem",
  textDecoration: "none",
}

const compareHeadStyle = {
  background: "#f7fafc",
  borderBottom: "1px solid #e2e8f0",
  minWidth: "220px",
  padding: "0.9rem",
  textAlign: "left" as const,
  verticalAlign: "top" as const,
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
}

const compareCellLabelStyle = {
  borderBottom: "1px solid #e2e8f0",
  color: "#4a5568",
  fontWeight: 600,
  minWidth: "140px",
  padding: "0.9rem",
  whiteSpace: "nowrap" as const,
}

const compareCellStyle = {
  borderBottom: "1px solid #e2e8f0",
  color: "#1a202c",
  maxWidth: "220px",
  minWidth: "220px",
  padding: "0.9rem",
  verticalAlign: "top" as const,
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
}

const compareLinkStyle = {
  color: "#3EA8FF",
  fontSize: "0.82rem",
  textDecoration: "none",
}

const compareMoreButtonStyle = {
  appearance: "none" as const,
  background: "#ebf8ff",
  border: "1px solid #bee3f8",
  borderRadius: 6,
  color: "#3EA8FF",
  cursor: "pointer",
  fontSize: "0.82rem",
  fontWeight: 600,
  padding: "0.7rem 0.75rem",
  textAlign: "center" as const,
  width: "100%",
}

const pillStyle = {
  background: "#ebf8ff",
  border: "1px solid #bee3f8",
  borderRadius: 999,
  color: "#2b6cb0",
  fontSize: "0.8rem",
  padding: "0.3rem 0.6rem",
}
