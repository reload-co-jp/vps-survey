import type { Metadata } from "next"
import Link from "next/link"
import { Breadcrumbs } from "../../components/breadcrumbs"
import {
  h1Style,
  heroStyle,
  leadStyle,
  pageStackStyle,
  panelStyle,
  responsiveGrid,
} from "../../components/ui"
import { getAllUseCases } from "../../lib/use-cases"

const description =
  "Docker、WordPress、Minecraft、VPNなど用途別に、VPSに必要なスペックの目安と条件を満たす国内VPSのプランを比較できます。"

export const metadata: Metadata = {
  title: "用途別VPS比較｜Docker・WordPress・Minecraft・VPN",
  description,
  alternates: { canonical: "/use-cases/" },
  openGraph: {
    title: "用途別VPS比較",
    description,
    type: "website",
    url: "/use-cases/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "用途別VPS比較",
      },
    ],
  },
}

const UseCasesIndexPage = () => (
  <div style={pageStackStyle}>
    <section style={heroStyle}>
      <Breadcrumbs items={[{ name: "用途別VPS比較", path: "/use-cases/" }]} />
      <h1 style={h1Style}>用途別VPS比較</h1>
      <p style={leadStyle}>{description}</p>
    </section>
    <div style={responsiveGrid("260px")}>
      {getAllUseCases().map((useCase) => (
        <Link
          href={`/use-cases/${useCase.slug}/`}
          key={useCase.slug}
          style={{ ...panelStyle, color: "#1a202c", textDecoration: "none" }}
        >
          <strong style={{ color: "#2563eb", fontSize: "1.1rem" }}>
            {useCase.name}向けVPS比較
          </strong>
          <span
            style={{ color: "#4a5568", fontSize: "0.9rem", lineHeight: 1.7 }}
          >
            {useCase.description}
          </span>
        </Link>
      ))}
    </div>
  </div>
)

export default UseCasesIndexPage
