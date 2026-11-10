import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getSiteSettings } from '@/lib/services/settings-service'
import ContactClientContent from '@/components/contact/contact-client-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [sections, settings] = await Promise.all([
    getPageSections('contact'),
    getSiteSettings(),
  ])

  const heroSec = sections['contact_hero']
  const infoSec = sections['contact_info']

  const heroTitle = locale === 'fr' ? heroSec?.titleFr || heroSec?.titleEn : heroSec?.titleEn
  const heroSubtitle = locale === 'fr' ? heroSec?.subtitleFr || heroSec?.subtitleEn : heroSec?.subtitleEn
  const infoTitle = locale === 'fr' ? infoSec?.titleFr || infoSec?.titleEn : infoSec?.titleEn
  const infoAddress = settings?.officeAddress || (locale === 'fr' ? infoSec?.subtitleFr : infoSec?.subtitleEn)
  const infoEmail = settings?.contactEmail || infoSec?.contentEn
  const infoPhone = settings?.contactPhone

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <ContactClientContent
        heroTitle={heroTitle || undefined}
        heroSubtitle={heroSubtitle || undefined}
        infoTitle={infoTitle || undefined}
        infoAddress={infoAddress || undefined}
        infoEmail={infoEmail || undefined}
        infoPhone={infoPhone || undefined}
        locale={locale}
      />
    </Suspense>
  )
}
