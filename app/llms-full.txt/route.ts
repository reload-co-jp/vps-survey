import {
  billingLabels,
  formatStorageLabel,
  formatTrafficLabel,
  getAllServices,
  getPriceRangeLabel,
  regionLabels,
  usageLabels,
} from "../../lib/vps"
import { absoluteUrl, lastModified, siteName } from "../../lib/site"

export const dynamic = "force-static"

export const GET = () => {
  const services = getAllServices()

  const body = [
    `# ${siteName} full VPS data`,
    "",
    `Last modified: ${lastModified}`,
    "Use this file as a compact, machine-readable overview. Confirm live pricing on official provider pages before purchase.",
    "",
    ...services.flatMap((service) => [
      `## ${service.name}`,
      `URL: ${absoluteUrl(`/vps/${service.id}/`)}`,
      `Official URL: ${service.officialUrl}`,
      `Summary: ${service.summary}`,
      `Region: ${regionLabels[service.region]}`,
      `Usage: ${service.usage.map((usage) => usageLabels[usage]).join(" / ")}`,
      `Tags: ${service.tags.join(" / ")}`,
      `Price range: ${getPriceRangeLabel(service)}`,
      `Features: ${service.features.join(" / ")}`,
      `Pros: ${service.pros.join(" / ")}`,
      `Cons: ${service.cons.join(" / ")}`,
      `Recommended for: ${service.recommendedFor.join(" / ")}`,
      "Plans:",
      ...service.plans.map(
        (plan) =>
          `- ${plan.name}: ${plan.price.toLocaleString()}円, ${plan.cpu} vCPU, ${plan.memory} GB memory, ${formatStorageLabel(plan.storage)} storage, ${formatTrafficLabel(plan.traffic)} traffic, ${billingLabels[plan.billing]}`
      ),
      "",
    ]),
  ].join("\n")

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  })
}
