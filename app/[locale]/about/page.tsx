import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getExpertisePillars } from '@/lib/services/expertise-service'
import AboutContent from '@/components/about-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function AboutPage() {
  const [sections, pillars] = await Promise.all([
    getPageSections('about'),
    getExpertisePillars(),
  ])

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <AboutContent initialSections={sections} initialPillars={pillars} />
    </Suspense>
  )
}
