import type { Metadata } from "next"
import Script from "next/script"
import type { ReactNode } from "react"
import "./reset.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"
const googleAnalyticsId = "G-BH2STWSGXR"
const isProduction = process.env.NODE_ENV === "production"
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
        {isProduction ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        ) : null}
        <div style={{ minHeight: "100vh", width: "100%" }}>
          <header
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
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
                minHeight: "60px",
                paddingBlock: "0.75rem",
              }}
            >
              <a
                href="/"
                style={{
                  color: "#1a202c",
                  fontSize: "clamp(0.92rem, 2vw, 1rem)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                VPS比較サイト
              </a>
              <nav style={{ display: "flex", gap: "1.25rem" }}>
                <a
                  href="/articles/"
                  style={{
                    color: "#4a5568",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  記事
                </a>
              </nav>
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
              background: "#ffffff",
              borderTop: "1px solid #e2e8f0",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                ...shellStyle,
                color: "#718096",
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
                <p style={{ color: "#1a202c", fontWeight: 600 }}>VPS比較サイト</p>
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
                <span style={{ color: "#a0aec0" }}>LP</span>
                {footerLpLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    style={{
                      color: "#3EA8FF",
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
