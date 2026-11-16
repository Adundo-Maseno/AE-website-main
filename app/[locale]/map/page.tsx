import { Suspense } from 'react'
import { getCountries } from '@/lib/services/map-service'
import InteractiveMap from '@/components/interactive-map'

export const revalidate = 0

export default async function MapPage() {
  const cmsCountries = await getCountries()

  return (
    <div className="w-full min-h-[100dvh]">
      <Suspense fallback={<div className="w-full min-h-[100dvh] bg-primary-ivory" />}>
        <InteractiveMap cmsCountries={cmsCountries} />
      </Suspense>
    </div>
  )
}
