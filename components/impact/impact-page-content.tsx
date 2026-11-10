'use client'

import InteractiveMap from '@/components/interactive-map'
import ImpactAlignment from '@/components/motion/impact-alignment'
import { useTranslations } from 'next-intl'
import { ConsultingCTA } from '@/components/ui/consulting-cta'

interface ImpactPageContentProps {
  ctaTitle?: string
  ctaDesc?: string
  ctaButton?: string
  sdgsTitle?: string
  sdgsTag?: string
  sdgsDesc?: string
  locale: string
}

export default function ImpactPageContent({
  ctaTitle,
  ctaDesc,
  ctaButton,
  sdgsTitle,
  sdgsTag,
  sdgsDesc,
  locale,
}: ImpactPageContentProps) {
  const t = useTranslations('OurImpact')

  const resolvedCtaTitle = ctaTitle || t('cta_title')
  const resolvedCtaDesc = ctaDesc || t('cta_desc')
  const resolvedCtaButton = ctaButton || t('work_with_us')

  return (
    <main className="bg-white min-h-[100dvh]">
      <InteractiveMap />
      <ImpactAlignment
        initialTitle={sdgsTitle}
        initialTag={sdgsTag}
        initialDesc={sdgsDesc}
      />

      {/* Dynamic CTA Banner */}
      <ConsultingCTA
        tag={t('sdgs_tag')}
        title={resolvedCtaTitle}
        description={resolvedCtaDesc}
        primaryButton={{
          label: resolvedCtaButton,
          href: '/our-work',
        }}
        secondaryButton={{
          label: t('partner_with_us'),
          href: '/contact',
        }}
      />
    </main>
  )
}

