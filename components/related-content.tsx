import Link from "next/link"
import { h2Style, panelStyle } from "./ui"

export type RelatedLink = {
  href: string
  title: string
  description?: string
}

/** 記事末尾・比較ページ末尾の関連コンテンツ（モバイルでは 1 列） */
export const RelatedContent = ({
  title = "関連ページ",
  links,
}: {
  title?: string
  links: RelatedLink[]
}) =>
  links.length ? (
    <nav aria-label={title} style={panelStyle}>
      <h2 style={h2Style}>{title}</h2>
      <ul
        style={{
          display: "grid",
          gap: "0.75rem",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
          listStyle: "none",
          padding: 0,
        }}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                color: "#1a202c",
                display: "grid",
                gap: "0.3rem",
                height: "100%",
                padding: "0.85rem",
                textDecoration: "none",
              }}
            >
              <strong style={{ color: "#2563eb", lineHeight: 1.5 }}>
                {link.title}
              </strong>
              {link.description ? (
                <span
                  style={{
                    color: "#64748b",
                    fontSize: "0.86rem",
                    lineHeight: 1.6,
                  }}
                >
                  {link.description}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : null
