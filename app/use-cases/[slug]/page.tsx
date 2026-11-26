import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { FilteredVpsPage } from "../../../components/filtered-vps-page"
import {
  BulletList,
  JsonLd,
  Section,
  tableStyle,
  tableWrapStyle,
  tdStyle,
  textStyle,
  thStyle,
} from "../../../components/ui"
import { absoluteUrl, siteName } from "../../../lib/site"
import { getAllUseCases, getUseCaseBySlug } from "../../../lib/use-cases"
import { getAllServices } from "../../../lib/vps"

type Props = {
  params: Promise<{ slug: string }>
}

export const generateStaticParams = () =>
  getAllUseCases().map((useCase) => ({ slug: useCase.slug }))

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params
  const useCase = getUseCaseBySlug(slug)
  if (!useCase) return { title: "ページが見つかりません" }

  const path = `/use-cases/${useCase.slug}/`
  return {
    title: useCase.title,
    description: useCase.description,
    alternates: { canonical: path },
    openGraph: {
      title: useCase.title,
      description: useCase.description,
      type: "article",
      url: path,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: useCase.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: useCase.title,
      description: useCase.description,
      images: ["/twitter-image"],
    },
  }
}

const UseCasePage = async ({ params }: Props) => {
  const { slug } = await params
  const useCase = getUseCaseBySlug(slug)
  if (!useCase) notFound()

  const path = `/use-cases/${useCase.slug}/`
  const rows = getAllServices()
    .filter((service) => service.region === "JP")
    .flatMap((service) => {
      const plan = service.plans
        .filter(
          (item) =>
            item.memory >= useCase.minMemory && item.cpu >= useCase.minCpu
        )
        .sort((left, right) => left.price - right.price)[0]
      return plan ? [{ service, plan }] : []
    })
    .sort((left, right) => left.plan.price - right.plan.price)

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: useCase.title,
    description: useCase.description,
    inLanguage: "ja",
    datePublished: `${useCase.updatedAt}T00:00:00+09:00`,
    dateModified: `${useCase.updatedAt}T00:00:00+09:00`,
    author: { "@type": "Organization", name: siteName, url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(path),
  }

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <FilteredVpsPage
        beforeTable={
          <Section id="spec" title={`${useCase.name}に必要なスペックの目安`}>
            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th scope="col" style={thStyle}>
                      項目
                    </th>
                    <th scope="col" style={thStyle}>
                      最低限
                    </th>
                    <th scope="col" style={thStyle}>
                      推奨
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {useCase.specs.map((spec) => (
                    <tr key={spec.label}>
                      <th scope="row" style={{ ...tdStyle, fontWeight: 600 }}>
                        {spec.label}
                      </th>
                      <td style={{ ...tdStyle, whiteSpace: "normal" }}>
                        {spec.minimum}
                      </td>
                      <td style={{ ...tdStyle, whiteSpace: "normal" }}>
                        {spec.recommended}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>
              推奨スペックの根拠
            </h3>
            <BulletList items={useCase.rationale} />
            <p style={{ ...textStyle, fontSize: "0.85rem" }}>
              ※
              一般的な構成を前提にした目安です。当サイトでの実測値ではありません。実際の必要量は利用人数やアプリの構成によって変わります。
            </p>
          </Section>
        }
        breadcrumbs={[
          { name: "用途別VPS比較", path: "/use-cases/" },
          { name: `${useCase.name}向けVPS比較`, path },
        ]}
        h1={useCase.h1}
        lead={<p>{useCase.lead}</p>}
        path={path}
        related={useCase.related}
        rows={rows}
        tableCaption={`メモリ${useCase.minMemory}GB以上・${useCase.minCpu}vCPU以上の最安プラン（国内VPS・月額）`}
        tableTitle={`${useCase.name}向けにおすすめの国内VPSプラン`}
      >
        <Section
          id="cautions"
          title={`${useCase.name}をVPSで動かすときの注意点`}
        >
          <BulletList items={useCase.cautions} />
        </Section>
      </FilteredVpsPage>
    </>
  )
}

export default UseCasePage
