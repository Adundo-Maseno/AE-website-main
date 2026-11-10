import { Suspense } from 'react'
import { getInsights } from '@/lib/services/insights-service'
import InsightsContent from '@/components/insights-content'

export const revalidate = 0

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const initialInsights = await getInsights()

  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-white" />}>
      <InsightsContent locale={locale} initialInsights={initialInsights} />
    </Suspense>
  )
}
