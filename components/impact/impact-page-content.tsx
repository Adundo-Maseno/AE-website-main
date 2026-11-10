'use client'

import InteractiveMap from '@/components/interactive-map'
import ImpactAlignment from '@/components/motion/impact-alignment'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'

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
      <section className="w-full py-10 lg:py-20 bg-deep-forest text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--accent-gold)_0%,transparent_40%)] opacity-20 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-8 relative z-10">
          <h2
            className="font-serif font-bold text-white tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
          >
            {resolvedCtaTitle}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 font-normal leading-relaxed max-w-3xl mx-auto">
            {resolvedCtaDesc}
          </p>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2 sm:pt-6">
            <Link
              href="/our-work"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-primary-green text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-green/20"
            >
              <RollingText className="gap-1.5 sm:gap-2">
                {resolvedCtaButton}
                <ArrowRight
                  size={18}
                  className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                />
              </RollingText>
            </Link>
            <Link
              href="/contact"
              className="group relative overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 border-2 border-white/30 text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:bg-white/10 backdrop-blur-sm"
            >
              <RollingText className="gap-1.5 sm:gap-2">
                {t('partner_with_us')}
                <ArrowRight
                  size={18}
                  className="sm:w-5 sm:h-5 transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                />
              </RollingText>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

