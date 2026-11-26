/* global fetch, AbortSignal, console, process */
// 公式サイト・アフィリエイトリンクのリンク切れチェック
// 使い方: pnpm check:links
// - data/vps.json の officialUrl / affiliateUrl にアクセスし、HTTP ステータスを確認する
// - app/ components/ lib/ にアフィリエイトURLが直書きされていないかも確認する
import { readFile, readdir } from "node:fs/promises"
import path from "node:path"

const root = path.resolve(import.meta.dirname, "..")
const services = JSON.parse(
  await readFile(path.join(root, "data/vps.json"), "utf8")
)

const check = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
      headers: { "user-agent": "Mozilla/5.0 (link-check)" },
    })
    return { status: response.status, finalUrl: response.url }
  } catch (error) {
    return { status: 0, finalUrl: "", error: String(error) }
  }
}

let failures = 0
for (const service of services) {
  for (const [kind, url] of [
    ["official", service.officialUrl],
    ["affiliate", service.affiliateUrl],
  ]) {
    if (!url) continue
    const result = await check(url)
    // 403 はボット対策で返すサイトがあるため警告扱い
    const level =
      result.status >= 200 && result.status < 400
        ? "OK  "
        : result.status === 403
          ? "WARN"
          : "FAIL"
    if (level === "FAIL") failures += 1
    console.log(
      `${level} ${service.id.padEnd(16)} ${kind.padEnd(9)} ${result.status} ${url}${
        result.finalUrl && result.finalUrl !== url
          ? ` -> ${result.finalUrl}`
          : ""
      }${result.error ? ` (${result.error})` : ""}`
    )
  }
}

// アフィリエイトURLの直書き検出
const affiliatePattern = /px\.a8\.net|a8\.net\/0\.gif|a8mat=/
const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...(await walk(full)))
    else if (/\.(tsx?|mjs|js)$/.test(entry.name)) files.push(full)
  }
  return files
}
for (const dir of ["app", "components", "lib"]) {
  for (const file of await walk(path.join(root, dir))) {
    const text = await readFile(file, "utf8")
    if (affiliatePattern.test(text)) {
      failures += 1
      console.log(
        `FAIL hardcoded affiliate URL: ${path.relative(root, file)} (data/vps.json で管理してください)`
      )
    }
  }
}

if (failures > 0) {
  console.error(`\n${failures} 件の問題があります`)
  process.exit(1)
}
console.log("\nリンクチェック完了")
