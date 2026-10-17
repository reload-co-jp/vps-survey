import type { Metadata, Viewport } from "next"
import Script from "next/script"
import type { ReactNode } from "react"
import { companyUrl, siteName, siteUrl } from "../lib/site"
import "./reset.css"

const googleAnalyticsId = "G-BH2STWSGXR"
const googleAdsenseClient = "ca-pub-6542845006087970"
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
const isProduction = process.env.NODE_ENV === "production"
const footerLpLinks = [
  { href: "/lp/cheap-vps/", label: "格安VPS比較" },
  { href: "/lp/conoha/", label: "ConoHa VPS" },
  { href: "/lp/sakura/", label: "さくらのVPS" },
  { href: "/lp/shin-vps/", label: "シンVPS" },
  { href: "/lp/2026-04-campaign/", label: "2026年4月キャンペーン" },
  { href: "/lp/2026-05-campaign/", label: "2026年5月キャンペーン" },
  { href: "/lp/2026-06-campaign/", label: "2026年6月キャンペーン" },
  { href: "/lp/2026-07-campaign/", label: "2026年7月キャンペーン" },
  { href: "/lp/2026-08-campaign/", label: "2026年8月キャンペーン" },
]
const footerSiteLinks = [{ href: "/about/", label: "このサイトについて" }]
const headerLinks = [
  { href: "/articles/", label: "記事" },
  { href: "/news/", label: "ニュース" },
]
const shellStyle = {
  margin: "0 auto",
  maxWidth: "1180px",
  paddingInline: "clamp(0.75rem, 2vw, 1rem)",
  width: "100%",
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
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
  applicationName: siteName,
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  referrer: "origin-when-cross-origin",
  creator: siteName,
  publisher: siteName,
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
    siteName,
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  sameAs: [companyUrl],
}

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "ja",
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <head>
        <link href="/llms.txt" rel="alternate" type="text/plain" />
        <link href="/llms-full.txt" rel="alternate" type="text/plain" />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
          type="application/ld+json"
        />
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
            <Script
              async
              crossOrigin="anonymous"
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClient}`}
              strategy="afterInteractive"
            />
          </>
        ) : null}
        <a className="skip-link" href="#main">
          本文へスキップ
        </a>
        <header className="site-header">
          <div className="site-header__inner" style={shellStyle}>
            <a aria-label={`${siteName} トップ`} className="site-logo" href="/">
              <span aria-hidden="true" className="site-logo__mark">
                VPS
              </span>
              VPS比較サイト
            </a>
            <nav aria-label="メインナビゲーション" className="site-nav">
              {headerLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main
          id="main"
          style={{
            ...shellStyle,
            minWidth: 0,
            paddingBottom: "4rem",
            paddingTop: "1.5rem",
          }}
        >
          {children}
        </main>
        <footer className="site-footer">
          <div className="site-footer__inner" style={shellStyle}>
            <p className="site-footer__brand">VPS比較サイト</p>
            <nav
              aria-label="キャンペーン・サービス別LP"
              className="site-footer__nav"
            >
              <h2>LP</h2>
              <ul>
                {footerLpLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="サイト情報" className="site-footer__nav">
              <h2>サイト情報</h2>
              <ul>
                {footerSiteLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
                <li>
                  <a
                    href={companyUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    運営会社
                  </a>
                </li>
              </ul>
            </nav>
            <p className="site-footer__copy">&copy; 2026 Reload, Inc.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
export default RootLayout
