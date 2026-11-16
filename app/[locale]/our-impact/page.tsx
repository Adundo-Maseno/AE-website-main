import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getCountries } from '@/lib/services/map-service'
import ImpactPageContent from '@/components/impact/impact-page-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function OurImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [sections, cmsCountries] = await Promise.all([
    getPageSections('our-impact'),
    getCountries(),
  ])
  const heroSec = sections['our_impact_hero']
  const ctaSec = sections['our_impact_cta']
  const sdgsSec = sections['our_impact_sdgs']

  const heroTitle = locale === 'fr' ? heroSec?.titleFr || heroSec?.titleEn : heroSec?.titleEn
  const heroSubtitle = locale === 'fr' ? heroSec?.subtitleFr || heroSec?.subtitleEn : heroSec?.subtitleEn

  const ctaTitle = locale === 'fr' ? ctaSec?.titleFr || ctaSec?.titleEn : ctaSec?.titleEn
  const ctaDesc = locale === 'fr' ? ctaSec?.subtitleFr || ctaSec?.subtitleEn : ctaSec?.subtitleEn
  const ctaButton = locale === 'fr' ? ctaSec?.contentFr || ctaSec?.contentEn : ctaSec?.contentEn

  const sdgsTitle = locale === 'fr' ? sdgsSec?.titleFr || sdgsSec?.titleEn : sdgsSec?.titleEn
  const sdgsTag = locale === 'fr' ? sdgsSec?.subtitleFr || sdgsSec?.subtitleEn : sdgsSec?.subtitleEn
  const sdgsDesc = locale === 'fr' ? sdgsSec?.contentFr || sdgsSec?.contentEn : sdgsSec?.contentEn

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <ImpactPageContent
        cmsCountries={cmsCountries}
        heroTitle={heroTitle || undefined}
        heroSubtitle={heroSubtitle || undefined}
        ctaTitle={ctaTitle || undefined}
        ctaDesc={ctaDesc || undefined}
        ctaButton={ctaButton || undefined}
        sdgsTitle={sdgsTitle || undefined}
        sdgsTag={sdgsTag || undefined}
        sdgsDesc={sdgsDesc || undefined}
        locale={locale}
      />
    </Suspense>
  )
}
