import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import ProjectImplementationClient from './project-implementation-client'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function ProjectImplementationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const sections = await getPageSections('our-work')
  const sec = sections['project_implementation_hero']

  const title = locale === 'fr' ? sec?.titleFr || sec?.titleEn : sec?.titleEn
  const subtitle = locale === 'fr' ? sec?.subtitleFr || sec?.subtitleEn : sec?.subtitleEn

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <ProjectImplementationClient
        initialHero={{
          title: title || undefined,
          subtitle: subtitle || undefined,
        }}
      />
    </Suspense>
  )
}
