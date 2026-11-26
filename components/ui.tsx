import type { CSSProperties, ReactNode } from "react"

// 詳細ページ・用途別ページ・比較ページで共通利用する表示部品。
// 既存ページと同じ inline style（CSS-in-JS）方式で、配色も既存に合わせている。

export const pageStackStyle: CSSProperties = {
  display: "grid",
  gap: "1.5rem",
  maxWidth: "100%",
  minWidth: 0,
  width: "100%",
}

export const panelStyle: CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  display: "grid",
  gap: "0.9rem",
  maxWidth: "100%",
  minWidth: 0,
  padding: "clamp(0.9rem, 3vw, 1.35rem)",
}

export const heroStyle: CSSProperties = {
  background: "#eef6ff",
  border: "1px solid #bee3f8",
  borderRadius: 12,
  display: "grid",
  gap: "1rem",
  padding: "clamp(1rem, 3vw, 1.6rem)",
}

export const h1Style: CSSProperties = {
  color: "#1a202c",
  fontSize: "clamp(1.6rem, 4vw, 2.6rem)",
  fontWeight: 800,
  lineHeight: 1.25,
}

export const leadStyle: CSSProperties = {
  color: "#4a5568",
  lineHeight: 1.85,
  maxWidth: 820,
}

export const h2Style: CSSProperties = {
  borderLeft: "4px solid #2563eb",
  color: "#1a202c",
  fontSize: "clamp(1.2rem, 2.6vw, 1.45rem)",
  fontWeight: 700,
  lineHeight: 1.4,
  paddingLeft: "0.7rem",
}

export const h3Style: CSSProperties = {
  color: "#1a202c",
  fontSize: "1.02rem",
  fontWeight: 700,
  lineHeight: 1.5,
}

export const textStyle: CSSProperties = {
  color: "#4a5568",
  lineHeight: 1.85,
}

export const noteStyle: CSSProperties = {
  color: "#64748b",
  fontSize: "0.82rem",
  lineHeight: 1.7,
}

export const linkStyle: CSSProperties = {
  color: "#2563eb",
  fontWeight: 600,
  textDecoration: "none",
}

export const tableWrapStyle: CSSProperties = {
  WebkitOverflowScrolling: "touch",
  maxWidth: "100%",
  overflowX: "auto",
  overscrollBehaviorX: "contain",
}

export const tableStyle: CSSProperties = {
  borderCollapse: "collapse",
  fontSize: "0.92rem",
  minWidth: "100%",
  width: "max-content",
}

export const thStyle: CSSProperties = {
  background: "#f7fafc",
  borderBottom: "1px solid #e2e8f0",
  color: "#4a5568",
  fontSize: "0.82rem",
  fontWeight: 600,
  padding: "0.7rem 0.75rem",
  textAlign: "left",
  whiteSpace: "nowrap",
}

export const tdStyle: CSSProperties = {
  borderBottom: "1px solid #e2e8f0",
  color: "#1a202c",
  padding: "0.7rem 0.75rem",
  verticalAlign: "middle",
  whiteSpace: "nowrap",
}

/** 横スクロール表の先頭列を固定（モバイルでサービス名が見えるように） */
export const stickyCellStyle: CSSProperties = {
  background: "#ffffff",
  left: 0,
  position: "sticky",
  zIndex: 1,
}

export const responsiveGrid = (minWidth: string): CSSProperties => ({
  display: "grid",
  gap: "1rem",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}), 1fr))`,
  maxWidth: "100%",
  minWidth: 0,
})

export const Section = ({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: ReactNode
}) => (
  <section id={id} style={panelStyle}>
    <h2 style={h2Style}>{title}</h2>
    {children}
  </section>
)

export const BulletList = ({
  items,
  marker,
}: {
  items: string[]
  marker?: "check" | "cross"
}) => (
  <ul
    style={{
      color: "#4a5568",
      display: "grid",
      gap: "0.55rem",
      listStyle: marker ? "none" : undefined,
      paddingLeft: marker ? 0 : "1.2rem",
    }}
  >
    {items.map((item) => (
      <li
        key={item}
        style={{
          display: marker ? "flex" : undefined,
          gap: "0.5rem",
          lineHeight: 1.75,
        }}
      >
        {marker ? (
          <span
            aria-hidden="true"
            style={{
              color: marker === "check" ? "#16a34a" : "#dc2626",
              fontWeight: 700,
            }}
          >
            {marker === "check" ? "✓" : "×"}
          </span>
        ) : null}
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

export type TocItem = { id: string; label: string }

/** 長いページ用の目次 */
export const TableOfContents = ({ items }: { items: TocItem[] }) => (
  <nav aria-label="目次" style={{ ...panelStyle, gap: "0.6rem" }}>
    <p style={{ color: "#1a202c", fontWeight: 700 }}>目次</p>
    <ol
      style={{
        color: "#2563eb",
        display: "grid",
        gap: "0.35rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
        paddingLeft: "1.3rem",
      }}
    >
      {items.map((item) => (
        <li key={item.id} style={{ lineHeight: 1.6 }}>
          <a
            href={`#${item.id}`}
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ol>
  </nav>
)

export const Metric = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #bee3f8",
      borderRadius: 8,
      display: "grid",
      gap: "0.3rem",
      padding: "0.85rem",
    }}
  >
    <span style={{ color: "#718096", fontSize: "0.8rem" }}>{label}</span>
    <strong style={{ color: "#1a202c", fontSize: "1.15rem" }}>{value}</strong>
  </div>
)

export const CtaBox = ({
  children,
  note,
}: {
  children: ReactNode
  note?: string
}) => (
  <div
    style={{
      alignItems: "center",
      background: "#fff7ed",
      border: "1px solid #fed7aa",
      borderRadius: 10,
      display: "grid",
      gap: "0.6rem",
      justifyItems: "center",
      padding: "1rem",
      textAlign: "center",
    }}
  >
    {children}
    {note ? <p style={noteStyle}>{note}</p> : null}
  </div>
)

export const JsonLd = ({ data }: { data: object }) => (
  <script
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    type="application/ld+json"
  />
)

/** コマンド例の表示 */
export const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      background: "#0f172a",
      borderRadius: 8,
      color: "#e2e8f0",
      fontFamily:
        'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
      fontSize: "0.85rem",
      lineHeight: 1.7,
      maxWidth: "100%",
      overflowX: "auto",
      padding: "0.9rem 1rem",
    }}
  >
    <code>{children}</code>
  </pre>
)
