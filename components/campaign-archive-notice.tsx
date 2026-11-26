import Link from "next/link"

/**
 * 終了済みキャンペーンLPの冒頭に表示する注意書き。
 * 過去のキャンペーン情報を「現在のおすすめ」と誤認させないために使う。
 */
export const CampaignArchiveNotice = ({ period }: { period: string }) => (
  <aside
    role="note"
    style={{
      background: "#fefce8",
      border: "1px solid #fde047",
      borderRadius: 10,
      color: "#713f12",
      display: "grid",
      gap: "0.4rem",
      lineHeight: 1.7,
      padding: "0.9rem 1rem",
    }}
  >
    <strong>このページは{period}のキャンペーン情報のアーカイブです</strong>
    <p style={{ fontSize: "0.92rem" }}>
      掲載しているキャンペーンはすでに終了しています。現在の料金は{" "}
      <Link href="/" style={{ color: "#1d4ed8", fontWeight: 600 }}>
        VPS比較一覧
      </Link>{" "}
      や各サービスの詳細ページ、最新のキャンペーンは各公式サイトで確認してください。
    </p>
  </aside>
)
