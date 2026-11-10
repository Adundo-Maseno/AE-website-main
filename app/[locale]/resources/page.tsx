import { Suspense } from 'react'
import { getResources } from '@/lib/services/resources-service'
import ResourcesContent from '@/components/resources-content'

export const revalidate = 0 // On-demand revalidation via revalidatePath

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const initialResources = await getResources()

  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-white" />}>
      <ResourcesContent locale={locale} initialResources={initialResources} />
    </Suspense>
  )
}
