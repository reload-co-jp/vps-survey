import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { Breadcrumbs } from "./breadcrumbs"
import { RelatedContent } from "./related-content"
import {
  JsonLd,
  TableOfContents,
  h1Style,
  heroStyle,
  leadStyle,
  linkStyle,
  noteStyle,
  pageStackStyle,
  panelStyle,
  type TocItem,
} from "./ui"
import { getArticleById, getRelatedArticles } from "../lib/articles"
import { absoluteUrl, siteName } from "../lib/site"

const formatDate = (iso: string) => {
  const [year, month, day] = iso.slice(0, 10).split("-").map(Number)
  return `${year}年${month}月${day}日`
}

/** lib/articles.ts の登録内容から記事ページの metadata を作る */
export const buildArticleMetadata = (id: string): Metadata => {
  const article = getArticleById(id)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: article.href },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: article.href,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: ["/twitter-image"],
    },
  }
}

type CompareLink = { href: string; label: string }

/**
 * 技術記事の共通レイアウト。
 * 目次・比較ページへの導線・関連記事を自動で付ける。
 */
export const ArticleLayout = ({
  id,
  lead,
  toc,
  compareLinks,
  children,
}: {
  id: string
  lead: ReactNode
  toc: TocItem[]
  compareLinks: CompareLink[]
  children: ReactNode
}) => {
  const article = getArticleById(id)
  if (!article) return null

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "ja",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(article.href),
  }

  return (
    <article style={pageStackStyle}>
      <JsonLd data={articleJsonLd} />
      <header style={heroStyle}>
        <Breadcrumbs
          items={[
            { name: "記事一覧", path: "/articles/" },
            { name: article.title, path: article.href },
          ]}
        />
        <p style={noteStyle}>
          {article.category} ／ 公開：{formatDate(article.publishedAt)} ／
          更新：
          {formatDate(article.updatedAt)}
        </p>
        <h1 style={h1Style}>{article.title}</h1>
        <div style={leadStyle}>{lead}</div>
      </header>
      <TableOfContents items={toc} />
      {children}
      <aside
        aria-label="VPSを比較する"
        style={{ ...panelStyle, background: "#eff6ff" }}
      >
        <p style={{ color: "#1a202c", fontWeight: 700 }}>
          この記事の内容を試せるVPSを探す
        </p>
        <ul style={{ display: "grid", gap: "0.4rem", paddingLeft: "1.2rem" }}>
          {compareLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} style={linkStyle}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <RelatedContent
        links={getRelatedArticles(id).map((item) => ({
          href: item.href,
          title: item.title,
          description: item.description,
        }))}
        title="関連記事"
      />
    </article>
  )
}

/** 既存記事の末尾に付ける比較導線と関連記事 */
export const ArticleFooter = ({ id }: { id: string }) => (
  <>
    <aside
      aria-label="VPSを比較する"
      style={{ ...panelStyle, background: "#eff6ff" }}
    >
      <p style={{ color: "#1a202c", fontWeight: 700 }}>VPSを比較して選ぶ</p>
      <ul style={{ display: "grid", gap: "0.4rem", paddingLeft: "1.2rem" }}>
        <li>
          <Link href="/" style={linkStyle}>
            料金・スペック・用途でVPSを比較する
          </Link>
        </li>
        <li>
          <Link href="/use-cases/" style={linkStyle}>
            用途別VPS比較（Docker・WordPress・Minecraft・VPN）
          </Link>
        </li>
        <li>
          <Link href="/lp/cheap-vps/" style={linkStyle}>
            格安VPS比較
          </Link>
        </li>
      </ul>
    </aside>
    <RelatedContent
      links={getRelatedArticles(id).map((item) => ({
        href: item.href,
        title: item.title,
        description: item.description,
      }))}
      title="関連記事"
    />
  </>
)
