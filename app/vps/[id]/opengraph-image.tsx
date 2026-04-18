import { ImageResponse } from "next/og"
import { notFound } from "next/navigation"
import {
  getAllServices,
  getLowestPricePlan,
  getPriceRangeLabel,
  getServiceById,
  regionLabels,
  usageLabels,
} from "../../../lib/vps"

export const alt = "VPS詳細ページ"
export const contentType = "image/png"
export const dynamic = "force-static"
export const size = {
  width: 1200,
  height: 630,
}

export const generateStaticParams = () =>
  getAllServices().map((service) => ({ id: service.id }))

type Props = {
  params: Promise<{
    id: string
  }>
}

const OpengraphImage = async ({ params }: Props) => {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    notFound()
  }

  const lowestPricePlan = getLowestPricePlan(service)

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "radial-gradient(circle at top left, rgba(111, 225, 255, 0.18), rgba(122, 141, 255, 0.12) 30%, #07111f 70%, #050912 100%)",
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
            display: "flex",
            gap: 12,
          }}
        >
          {service.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                color: "#bfeeff",
                display: "flex",
                fontSize: 22,
                padding: "10px 18px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 880,
          }}
        >
          <div
            style={{
              color: "#ffffff",
              display: "flex",
              fontSize: 66,
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            {service.name}
          </div>
          <div
            style={{
              color: "#c9d8ed",
              display: "flex",
              fontSize: 28,
              lineHeight: 1.5,
            }}
          >
            {service.summary}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
          }}
        >
          {[
            { label: "料金帯", value: getPriceRangeLabel(service) },
            { label: "最安プラン", value: lowestPricePlan.name },
            { label: "リージョン", value: regionLabels[service.region] },
            {
              label: "おすすめ用途",
              value: usageLabels[service.usage[0]],
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                minWidth: 220,
                padding: "18px 22px",
              }}
            >
              <div
                style={{
                  color: "#98b5d6",
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
                  fontSize: 30,
                  fontWeight: 600,
                  lineHeight: 1.2,
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
