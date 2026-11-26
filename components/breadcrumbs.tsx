import Link from "next/link"
import { absoluteUrl, siteName } from "../lib/site"

export type BreadcrumbItem = {
  name: string
  path: string
}

/**
 * 表示用パンくず + BreadcrumbList 構造化データ。
 * items には先頭のホームを含めない（自動で付与する）。
 */
export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  const all = [{ name: siteName, path: "/" }, ...items]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <nav aria-label="パンくずリスト">
        <ol
          style={{
            color: "#64748b",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "0.85rem",
            gap: "0.35rem",
            listStyle: "none",
            padding: 0,
          }}
        >
          {all.map((item, index) => {
            const isLast = index === all.length - 1
            return (
              <li
                key={item.path}
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: "0.35rem",
                }}
              >
                {isLast ? (
                  <span aria-current="page">{item.name}</span>
                ) : (
                  <>
                    <Link
                      href={item.path}
                      style={{ color: "#2563eb", textDecoration: "none" }}
                    >
                      {index === 0 ? "ホーム" : item.name}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
