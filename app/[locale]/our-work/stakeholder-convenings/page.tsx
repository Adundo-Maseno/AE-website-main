import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import StakeholderConveningsClient from './stakeholder-convenings-client'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function StakeholderConveningsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const sections = await getPageSections('our-work')
  const sec = sections['stakeholder_convenings_hero']

  const title = locale === 'fr' ? sec?.titleFr || sec?.titleEn : sec?.titleEn
  const subtitle = locale === 'fr' ? sec?.subtitleFr || sec?.subtitleEn : sec?.subtitleEn

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <StakeholderConveningsClient
        initialHero={{
          title: title || undefined,
          subtitle: subtitle || undefined,
        }}
      />
    </Suspense>
  )
}
