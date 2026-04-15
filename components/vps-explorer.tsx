"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { useMemo, useState } from "react"
import {
  billingLabels,
  filterAndSortServices,
  getComparisonRows,
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

type Props = {
  services: VpsService[]
}

export const VpsExplorer = ({ services }: Props) => {
  const [filters, setFilters] = useState(initialFilters)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const filteredServices = useMemo(
    () => filterAndSortServices(services, filters),
    [filters, services]
  )

  const selectedServices = useMemo(
    () =>
      services
        .filter((service) => selectedIds.includes(service.id))
        .slice(0, 3),
    [selectedIds, services]
  )

  const comparisonRows = useMemo(
    () => getComparisonRows(selectedServices),
    [selectedServices]
  )

  const updateFilter = <Key extends keyof FilterState>(
    key: Key,
    value: FilterState[Key]
  ) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const toggleCompare = (id: string) => {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((currentId) => currentId !== id)
      }

      if (current.length >= 3) {
        return [...current.slice(1), id]
      }

      return [...current, id]
    })
  }

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <section
        style={{
          background:
            "radial-gradient(circle at top left, rgba(103, 199, 255, 0.28), transparent 28%), linear-gradient(135deg, #10203e 0%, #07101f 55%, #040812 100%)",
          border: "1px solid rgba(139, 197, 255, 0.18)",
          borderRadius: 32,
          overflow: "hidden",
          padding: "1.5rem",
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
          <div
            style={{
              display: "grid",
              gap: "0.75rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            }}
          >
            <MetricCard label="掲載サービス" value={`${services.length}件`} />
            <MetricCard label="最安価格帯" value="¥550〜" />
            <MetricCard label="比較選択" value="最大3件" />
            <MetricCard label="主な用途" value="開発・本番・検証" />
          </div>
        </div>
      </section>

      <section style={sectionStyle}>
        <div style={{ display: "grid", gap: "1rem" }}>
          <div
            style={{
              alignItems: "end",
              display: "grid",
              gap: "0.85rem",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
            {filteredServices.length}件が条件に一致しています。比較したい VPS
            を選ぶと、 下部に横並びの比較表を表示します。
          </p>
        </div>
      </section>

      <section style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "separate",
            borderSpacing: 0,
            minWidth: 980,
            width: "100%",
          }}
        >
          <thead>
            <tr>
              {[
                "比較",
                "サービス名",
                "月額料金",
                "CPU",
                "メモリ",
                "ストレージ",
                "転送量",
                "リージョン",
                "課金方式",
                "詳細",
              ].map((label) => (
                <th
                  key={label}
                  style={{
                    background: "rgba(11, 21, 37, 0.95)",
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    color: "#d9e6f8",
                    fontSize: "0.78rem",
                    letterSpacing: "0.04em",
                    padding: "0.95rem 0.85rem",
                    position: "sticky",
                    textAlign: "left",
                    textTransform: "uppercase",
                    top: 0,
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((service) => {
              const checked = selectedIds.includes(service.id)

              return (
                <tr
                  key={service.id}
                  style={{
                    background: checked
                      ? "rgba(24, 57, 99, 0.38)"
                      : "rgba(8, 15, 28, 0.92)",
                  }}
                >
                  <td style={cellStyle}>
                    <input
                      aria-label={`${service.name}を比較に追加`}
                      checked={checked}
                      onChange={() => toggleCompare(service.id)}
                      type="checkbox"
                    />
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: "grid", gap: "0.35rem" }}>
                      <strong style={{ fontSize: "1rem" }}>
                        {service.name}
                      </strong>
                      <span style={{ color: "#a5bbd8", fontSize: "0.9rem" }}>
                        {service.summary}
                      </span>
                      <span style={{ color: "#7dc9ff", fontSize: "0.82rem" }}>
                        用途:{" "}
                        {service.usage
                          .map((usage) => usageLabels[usage])
                          .join(" / ")}
                      </span>
                    </div>
                  </td>
                  <td style={cellStyle}>¥{service.price.toLocaleString()}</td>
                  <td style={cellStyle}>{service.cpu} vCPU</td>
                  <td style={cellStyle}>{service.memory} GB</td>
                  <td style={cellStyle}>{service.storage} GB</td>
                  <td style={cellStyle}>{service.traffic}</td>
                  <td style={cellStyle}>{regionLabels[service.region]}</td>
                  <td style={cellStyle}>{billingLabels[service.billing]}</td>
                  <td style={cellStyle}>
                    <Link href={`/vps/${service.id}/`} style={linkButtonStyle}>
                      詳細を見る
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section style={sectionStyle}>
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
              選択した VPS を横並びで比較できます。最大3件まで表示します。
            </p>
          </div>
          <span style={{ color: "#9ed9ff", fontSize: "0.9rem" }}>
            選択中: {selectedServices.length}件
          </span>
        </div>
        {selectedServices.length === 0 ? (
          <p style={{ color: "#a4bad8" }}>
            一覧のチェックボックスから比較したいサービスを選んでください。
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ minWidth: 720, width: "100%" }}>
              <thead>
                <tr>
                  <th style={compareHeadStyle}>項目</th>
                  {selectedServices.map((service) => (
                    <th key={service.id} style={compareHeadStyle}>
                      {service.name}
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
  <article style={sectionStyle}>
    <div style={{ display: "grid", gap: "0.6rem" }}>
      <h2 style={{ fontSize: "1.2rem" }}>{title}</h2>
      <p style={{ color: "#afc3dd", lineHeight: 1.8 }}>{body}</p>
    </div>
  </article>
)

const cellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "#edf4ff",
  padding: "1rem 0.85rem",
  verticalAlign: "top" as const,
}

const linkButtonStyle = {
  background: "linear-gradient(135deg, #7be1ff, #8bb3ff)",
  borderRadius: 999,
  color: "#031321",
  display: "inline-flex",
  fontSize: "0.9rem",
  fontWeight: 700,
  padding: "0.7rem 1rem",
  textDecoration: "none",
}

const compareHeadStyle = {
  background: "rgba(13, 25, 43, 0.96)",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "0.9rem",
  textAlign: "left" as const,
}

const compareCellLabelStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  color: "#c8d9f1",
  fontWeight: 700,
  padding: "0.9rem",
}

const compareCellStyle = {
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  padding: "0.9rem",
}
