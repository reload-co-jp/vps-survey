import { ImageResponse } from "next/og"
import { getAllServices } from "../lib/vps"

export const alt = "VPS比較サイト"
export const contentType = "image/png"
export const dynamic = "force-static"
export const size = {
  width: 1200,
  height: 630,
}

const OpengraphImage = () => {
  const services = getAllServices()
  const domesticCount = services.filter((service) => service.region === "JP").length

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at top left, #3b67ff 0%, #18345a 42%, #0a1220 100%)",
          color: "#f7fbff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#8fe9ff",
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          VPS Survey
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 860,
          }}
        >
          <div
            style={{
              color: "#dff8ff",
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
            }}
          >
            国内・海外VPSを
            <br />
            価格と用途で比較
          </div>
          <div
            style={{
              color: "#bfd0ea",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.5,
            }}
          >
            料金帯、CPU、メモリ、用途をまとめて確認できる比較サイト
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
          }}
        >
          {[
            { label: "掲載サービス", value: `${services.length}件` },
            { label: "国内サービス", value: `${domesticCount}件` },
            { label: "比較ビュー", value: "横並び対応" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                minWidth: 210,
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  color: "#9bb5d6",
                  display: "flex",
                  fontSize: 20,
                  marginBottom: 8,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  color: "#ffffff",
                  display: "flex",
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}

export default OpengraphImage
