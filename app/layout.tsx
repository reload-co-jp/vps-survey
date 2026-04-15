import type { Metadata } from "next"
import type { ReactNode } from "react"
import "./reset.css"

export const metadata: Metadata = {
  title: {
    default: "VPS比較サイト | 国内・海外VPSを価格と用途で比較",
    template: "%s | VPS比較サイト",
  },
  description:
    "国内・海外のVPSを価格、CPU、メモリ、用途で比較できるNext.js製の比較サイトです。初心者向けの解説や詳細ページも掲載しています。",
  keywords: ["VPS 比較", "VPS おすすめ", "日本 VPS", "格安 VPS"],
  openGraph: {
    description:
      "国内・海外VPSの比較、フィルタ検索、詳細確認ができる比較サイト。",
    siteName: "VPS比較サイト",
    title: "VPS比較サイト",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "国内・海外VPSの比較、フィルタ検索、詳細確認ができる比較サイト。",
    title: "VPS比較サイト",
  },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="shell-inner site-header__inner">
              <a className="brandmark" href="/">
                VPS比較サイト
              </a>
              <p className="site-header__copy">
                日本・海外VPSを価格と用途から比較できるガイド
              </p>
            </div>
          </header>
          <main className="shell-inner site-main">{children}</main>
          <footer className="site-footer">
            <div className="shell-inner site-footer__inner">
              <p>VPS選定の意思決定を支援する比較サイトMVP</p>
              <p>&copy; 2026 VPS Survey</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
export default RootLayout
