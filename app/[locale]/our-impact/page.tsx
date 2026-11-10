import { Suspense } from 'react'
import { getPageSections } from '@/lib/services/page-sections-service'
import ImpactPageContent from '@/components/impact/impact-page-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function OurImpactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const sections = await getPageSections('our-impact')
  const ctaSec = sections['our_impact_cta']
  const sdgsSec = sections['our_impact_sdgs']

  const ctaTitle = locale === 'fr' ? ctaSec?.titleFr || ctaSec?.titleEn : ctaSec?.titleEn
  const ctaDesc = locale === 'fr' ? ctaSec?.subtitleFr || ctaSec?.subtitleEn : ctaSec?.subtitleEn
  const ctaButton = locale === 'fr' ? ctaSec?.contentFr || ctaSec?.contentEn : ctaSec?.contentEn

  const sdgsTitle = locale === 'fr' ? sdgsSec?.titleFr || sdgsSec?.titleEn : sdgsSec?.titleEn
  const sdgsTag = locale === 'fr' ? sdgsSec?.subtitleFr || sdgsSec?.subtitleEn : sdgsSec?.subtitleEn
  const sdgsDesc = locale === 'fr' ? sdgsSec?.contentFr || sdgsSec?.contentEn : sdgsSec?.contentEn

  return (
    <Suspense fallback={<div className="bg-white min-h-[100dvh]" />}>
      <ImpactPageContent
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
