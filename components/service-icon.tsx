import type { VpsService } from "../lib/vps"

// 公式ロゴは商標・利用規約の確認が取れていないため使わず、
// サービス名の頭文字から統一デザインのアイコンを生成する。
const palette = [
  "#2563eb",
  "#0891b2",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#0f766e",
  "#9333ea",
  "#c2410c",
  "#1d4ed8",
  "#be123c",
]

const hash = (value: string) =>
  [...value].reduce((total, char) => total + char.charCodeAt(0), 0)

// 頭文字だけでは区別しにくいサービスの表示文字
const labelOverrides: Record<string, string> = {
  conoha: "Co",
  sakura: "さ",
  xserver: "X",
  "shin-vps": "シ",
  kagoya: "K",
  "gmo-cloud": "G",
  "webarena-indigo": "In",
  "onamae-vps": "お",
  "aws-lightsail": "LS",
  linode: "Li",
  digitalocean: "DO",
}

const getInitials = (name: string) => {
  const ascii = name.match(/[A-Za-z]/g)
  if (ascii && ascii.length >= 2)
    return ascii.slice(0, 2).join("").toUpperCase()
  return name.slice(0, 1)
}

export const ServiceIcon = ({
  service,
  size = 40,
}: {
  service: Pick<VpsService, "id" | "name">
  size?: number
}) => (
  <span
    aria-hidden="true"
    style={{
      alignItems: "center",
      background: palette[hash(service.id) % palette.length],
      borderRadius: size / 4,
      color: "#ffffff",
      display: "inline-flex",
      flexShrink: 0,
      fontSize: size * 0.38,
      fontWeight: 800,
      height: size,
      justifyContent: "center",
      letterSpacing: "-0.02em",
      width: size,
    }}
  >
    {labelOverrides[service.id] ?? getInitials(service.name)}
  </span>
)
