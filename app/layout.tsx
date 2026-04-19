import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./reset.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"
const footerLpLinks = [
  { href: "/lp/conoha/", label: "ConoHa VPS" },
  { href: "/lp/sakura/", label: "さくらのVPS" },
  { href: "/lp/shin-vps/", label: "シンVPS" },
  { href: "/lp/2026-04-campaign/", label: "2026年4月キャンペーン" },
]
const shellStyle = {
  margin: "0 auto",
  maxWidth: "1180px",
  paddingInline: "clamp(0.75rem, 2vw, 1rem)",
  width: "100%",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VPS比較サイト | 国内・海外VPSを価格と用途で比較",
    template: "%s | VPS比較サイト",
  },
  description:
    "国内・海外のVPSを価格、CPU、メモリ、用途で比較できるNext.js製の比較サイトです。初心者向けの解説や詳細ページも掲載しています。",
  keywords: ["VPS 比較", "VPS おすすめ", "日本 VPS", "格安 VPS"],
  alternates: {
    canonical: "/",
  },
  category: "technology",
  applicationName: "VPS比較サイト",
  referrer: "origin-when-cross-origin",
  creator: "VPS Survey",
  publisher: "VPS Survey",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    description:
      "国内・海外VPSの比較、フィルタ検索、詳細確認ができる比較サイト。",
    images: [
      {
        alt: "VPS比較サイト OGP画像",
        height: 630,
        url: "/opengraph-image",
        width: 1200,
      },
    ],
    locale: "ja_JP",
    siteName: "VPS比較サイト",
    title: "VPS比較サイト",
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    description:
      "国内・海外VPSの比較、フィルタ検索、詳細確認ができる比較サイト。",
    images: ["/twitter-image"],
    title: "VPS比較サイト",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <div style={{ minHeight: "100vh", width: "100%" }}>
          <header
            style={{
              backdropFilter: "blur(18px)",
              background: "rgba(12, 20, 34, 0.76)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              position: "sticky",
              top: 0,
              zIndex: 20,
            }}
          >
            <div
              style={{
                ...shellStyle,
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap" as const,
                gap: "1rem",
                justifyContent: "space-between",
                minHeight: "72px",
                paddingBlock: "1rem",
              }}
            >
              <a
                href="/"
                style={{
                  fontSize: "clamp(0.92rem, 2vw, 1rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                VPS比較サイト
              </a>
              <p
                style={{
                  color: "#a7bddb",
                  fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
                  textAlign: "left" as const,
                }}
              >
                日本・海外VPSを価格と用途から比較できるガイド
              </p>
            </div>
          </header>
          <main
            style={{
              ...shellStyle,
              minWidth: 0,
              paddingBottom: "4rem",
              paddingTop: "1.5rem",
            }}
          >
            {children}
          </main>
          <footer
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                ...shellStyle,
                color: "#95accb",
                display: "grid",
                fontSize: "clamp(0.8rem, 1.8vw, 0.85rem)",
                gap: "1rem",
                padding: "1.25rem 0 2rem",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.75rem 1rem",
                  justifyContent: "space-between",
                }}
              >
                <p>VPS比較サイト</p>
                <p>&copy; 2026 Reload, Inc.</p>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.6rem 1rem",
                }}
              >
                <span style={{ color: "#b8cae3" }}>LP</span>
                {footerLpLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      color: "#cfe2ff",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
export default RootLayout
