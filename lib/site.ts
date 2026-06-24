export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vps.reload.co.jp"

export const companyUrl = "https://reload.co.jp/"
export const siteName = "VPS比較サイト"
export const publisherName = "Reload, Inc."
export const lastModified = "2026-06-24T00:00:00+09:00"

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString()
