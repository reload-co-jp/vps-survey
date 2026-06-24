const googleAdsenseClient = "ca-pub-6542845006087970"

export const dynamic = "force-static"

export const GET = () => {
  return new Response(
    `google.com, ${googleAdsenseClient}, DIRECT, f08c47fec0942fa0\n`,
    {
      headers: { "content-type": "text/plain; charset=utf-8" },
    },
  )
}
