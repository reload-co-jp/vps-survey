"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import {
  filterAndSortServices,
  getComparisonRows,
  getLowestPricePlan,
  getPriceRangeLabel,
  regionLabels,
  type FilterState,
  type VpsService,
  usageLabels,
} from "../lib/vps"

const initialFilters: FilterState = {
  priceRange: "all",
  memory: "all",
  cpu: "all",
  region: "all",
  usage: "all",
  query: "",
  sort: "popular",
}

const sectionStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 24,
  padding: "1.25rem",
  maxWidth: "1180px",
}

const controlStyle = {
  appearance: "none" as const,
  background: "rgba(9, 18, 32, 0.88)",
  border: "1px solid rgba(128, 170, 255, 0.24)",
  borderRadius: 14,
  color: "#eff4ff",
  fontSize: "0.95rem",
  minHeight: 48,
  padding: "0.8rem 0.95rem",
  width: "100%",
}
const responsiveGrid = (minWidth: string) => ({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))`,
})

type Props = {
  services: VpsService[]
}

export const VpsExplorer = ({ services }: Props) => {
  const [filters, setFilters] = useState(initialFilters)

  const filteredServices = useMemo(
    () => filterAndSortServices(services, filters),
    [filters, services]
  )

  const comparisonRows = useMemo(
    () => getComparisonRows(filteredServices),
    [filteredServices]
  )

  const updateFilter = <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key]
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        maxWidth: "100%",
        minWidth: 0,
        width: "100%",
      }}
    >
      <section
        style={{
          background:
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.28), transparent 28%), linear-gradient(135deg, #10203e 0%, #07101f 55%, #040812 100%)",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: "clamp(20px, 4vw, 32px)",
          overflow: "hidden",
          padding: "clamp(0.9rem, 3vw, 1.5rem)",
          position: "relative",
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
              background: "rgba(112, 214, 255, 0.14)",
              border: "1px solid rgba(112, 214, 255, 0.25)",
              borderRadius: 999,
              color: "#9ee9ff",
              display: "inline-flex",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              padding: "0.45rem 0.7rem",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            VPS Compare Navigator
          </span>
          <div style={{ display: "grid", gap: "0.75rem", maxWidth: 760 }}>
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
            >
              価格・性能・用途から、いま必要な VPS をすばやく比較。
            </h1>
            <p style={{ color: "#c9d8f2", fontSize: "1rem", lineHeight: 1.8 }}>
              国内外の主要 VPS を、初心者にも分かりやすい軸で一覧化しました。
              検索、フィルタ、ソート、比較、詳細ページまで MVP
              として一通り使えます。
            </p>
          </div>
          <div style={{ ...responsiveGrid("160px"), gap: "0.75rem" }}>
            <MetricCard label="掲載サービス" value={`${services.length}件`} />
            <MetricCard label="最安価格帯" value="¥550〜" />
            <MetricCard label="比較表示" value="横並び比較" />
            <MetricCard label="主な用途" value="開発・本番・検証" />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              ...responsiveGrid("150px"),
              alignItems: "end",
              gap: "0.85rem",
            }}
          >
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
                <option value="all">すべて</option>
                <option value="JP">国内</option>
                <option value="GLOBAL">海外</option>
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
          <p style={{ color: "#a4bad8", fontSize: "0.92rem" }}>
            {filteredServices.length}
            件が条件に一致しています。フィルタ結果はそのまま下部の比較表に横並び表示されます。
          </p>
        </div>
      </section>

      <section
        style={{
          ...responsiveGrid("260px"),
          minWidth: 0,
          width: "100%",
          maxWidth: "1180px",
        }}
      >
        {filteredServices.map((service) => {
          const lowestPricePlan = getLowestPricePlan(service)

          return (
            <article key={service.id} style={sectionStyle}>
              <div style={{ display: "grid", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.35rem" }}>
                  <strong style={{ fontSize: "1.05rem" }}>
                    {service.name}
                  </strong>
                  <p
                    style={{
                      color: "#a5bbd8",
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
                  <strong style={{ fontSize: "1.15rem" }}>
                    {getPriceRangeLabel(service)}
                  </strong>
                  <span style={subCellStyle}>
                    最安プラン: {lowestPricePlan.name}
                  </span>
                  <span style={subCellStyle}>
                    {lowestPricePlan.cpu} vCPU / {lowestPricePlan.memory} GB /{" "}
                    {lowestPricePlan.storage} GB
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
        style={{
          ...sectionStyle,
          borderRadius: "clamp(20px, 4vw, 24px)",
          padding: "clamp(0.9rem, 3vw, 1.25rem)",
        }}
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
            <h2 style={{ fontSize: "1.35rem", marginBottom: "0.35rem" }}>
              比較ビュー
            </h2>
            <p style={{ color: "#a4bad8" }}>
              フィルタ条件に一致した VPS を最初から横並びで比較できます。
            </p>
          </div>
          <span style={{ color: "#9ed9ff", fontSize: "0.9rem" }}>
            表示中: {filteredServices.length}件
          </span>
        </div>
        {filteredServices.length === 0 ? (
          <p style={{ color: "#a4bad8" }}>
            条件に一致するサービスがありません。フィルタ条件を調整してください。
          </p>
        ) : (
          <div
            style={{
              WebkitOverflowScrolling: "touch",
              overflowX: "auto",
              overscrollBehaviorX: "contain",
              paddingBottom: "0.35rem",
            }}
          >
            <table
              style={{
                minWidth: "100%",
                width: "max-content",
              }}
            >
              <thead>
                <tr>
                  <th style={compareHeadStyle}>項目</th>
                  {filteredServices.map((service) => (
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
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        <ArticleCard
          title="VPSの選び方"
          body="価格だけでなく、CPU・メモリ・リージョン・課金方式を合わせて見ると、あとからの移行コストを抑えやすくなります。"
        />
        <ArticleCard
          title="用途別おすすめ"
          body="開発用途なら時間課金、本番用途なら国内リージョンと安定性、検証用途なら低価格帯と初期構築のしやすさが見極めやすい軸です。"
        />
        <ArticleCard
          title="初心者向け解説"
          body="まずは 1〜2GB メモリ帯から始め、運用しながら CPU 使用率や転送量を見て上位プランへ拡張する進め方が安全です。"
        />
      </section>
    </div>
  )
}

const MetricCard = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 20,
      display: "grid",
      gap: "0.35rem",
      padding: "1rem",
    }}
  >
    <span style={{ color: "#a6b9d2", fontSize: "0.82rem" }}>{label}</span>
    <strong style={{ fontSize: "1.25rem", letterSpacing: "-0.03em" }}>
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
    <span style={{ color: "#cfe1fb", fontSize: "0.86rem" }}>{label}</span>
    {children}
  </label>
)

const ArticleCard = ({ body, title }: { body: string; title: string }) => (
  <article
    style={{
      ...sectionStyle,
      borderRadius: "clamp(20px, 4vw, 24px)",
      padding: "clamp(0.9rem, 3vw, 1.25rem)",
    }}
  >
    <div style={{ display: "grid", gap: "0.6rem" }}>
      <h2 style={{ fontSize: "1.2rem" }}>{title}</h2>
      <p style={{ color: "#afc3dd", lineHeight: 1.8 }}>{body}</p>
    </div>
  </article>
)

const subCellStyle = {
  color: "#9bc2ea",
  fontSize: "0.8rem",
}

const linkButtonStyle = {
  background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
  borderRadius: 999,
  color: "#031321",
  display: "inline-flex",
  fontSize: "0.9rem",
  fontWeight: 700,
  whiteSpace: "nowrap" as const,
  padding: "0.7rem 1rem",
  textDecoration: "none",
}

const compareHeadStyle = {
  background: "rgba(13, 25, 43, 0.96)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  minWidth: "220px",
  padding: "0.9rem",
  textAlign: "left" as const,
  verticalAlign: "top" as const,
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
}

const compareCellLabelStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "#c8d9f1",
  fontWeight: 700,
  minWidth: "140px",
  padding: "0.9rem",
  whiteSpace: "nowrap" as const,
}

const compareCellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  maxWidth: "220px",
  minWidth: "220px",
  padding: "0.9rem",
  verticalAlign: "top" as const,
  whiteSpace: "normal" as const,
  wordBreak: "break-word" as const,
}

const compareLinkStyle = {
  color: "#9edaff",
  fontSize: "0.82rem",
  textDecoration: "none",
}

const pillStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 999,
  color: "#bcd1eb",
  fontSize: "0.8rem",
  padding: "0.3rem 0.6rem",
}
