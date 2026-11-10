import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getBeliefs } from '@/lib/services/beliefs-service'
import { getWhyAgriCards } from '@/lib/services/why-agri-service'
import { getPartners } from '@/lib/services/partners-service'
import HomeContent from '@/components/home-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function HomePage() {
  const [sections, beliefs, whyCards, partners] = await Promise.all([
    getPageSections('home'),
    getBeliefs(),
    getWhyAgriCards(),
    getPartners(),
  ])

  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-mist" />}>
      <HomeContent
        initialSections={sections}
        initialBeliefs={beliefs}
        initialWhyCards={whyCards}
        initialPartners={partners}
      />
    </Suspense>
  )
}
