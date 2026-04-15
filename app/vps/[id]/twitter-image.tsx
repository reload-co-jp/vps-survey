import { getAllServices } from "../../../lib/vps"

export const dynamic = "force-static"
export const generateStaticParams = () =>
  getAllServices().map((service) => ({ id: service.id }))
export { alt, contentType, size } from "./opengraph-image"
export { default } from "./opengraph-image"
