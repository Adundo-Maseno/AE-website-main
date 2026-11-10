'use client'

import { RollingText } from '@/components/ui/rolling-text'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { ScrollAccordion } from '@/components/motion/scroll-accordion'
import ServicesBentoGrid from '@/components/motion/services-bento-grid'
import { useTranslations, useLocale } from 'next-intl'
import { PageSectionData } from '@/lib/services/page-sections-service'
import { ExpertisePillarData } from '@/lib/services/expertise-service'

interface AboutContentProps {
  initialSections?: Record<string, PageSectionData>
  initialPillars?: ExpertisePillarData[]
}

export default function AboutContent({ initialSections, initialPillars }: AboutContentProps) {
  const t = useTranslations('About')
  const locale = useLocale()

  const heroSec = initialSections?.about_hero
  const visionSec = initialSections?.about_vision
  const missionSec = initialSections?.about_mission
  const goalSec = initialSections?.about_goal
  const ctaSec = initialSections?.about_cta
  const expSec = initialSections?.expertise_header

  const heroTitle =
    heroSec
      ? locale === 'fr' && heroSec.titleFr
        ? heroSec.titleFr
        : heroSec.titleEn || t('title')
      : t('title')

  const heroSubtitle =
    heroSec
      ? locale === 'fr' && heroSec.subtitleFr
        ? heroSec.subtitleFr
        : heroSec.subtitleEn || t('subtitle')
      : t('subtitle')

  const visionTitle =
    visionSec
      ? locale === 'fr' && visionSec.titleFr
        ? visionSec.titleFr
        : visionSec.titleEn || t('vision_title')
      : t('vision_title')

  const visionDesc =
    visionSec
      ? locale === 'fr' && visionSec.contentFr
        ? visionSec.contentFr
        : visionSec.contentEn || t('vision_desc')
      : t('vision_desc')

  const missionTitle =
    missionSec
      ? locale === 'fr' && missionSec.titleFr
        ? missionSec.titleFr
        : missionSec.titleEn || t('mission_title')
      : t('mission_title')

  const missionDesc =
    missionSec
      ? locale === 'fr' && missionSec.contentFr
        ? missionSec.contentFr
        : missionSec.contentEn || t('mission_desc')
      : t('mission_desc')

  const goalTitle =
    goalSec
      ? locale === 'fr' && goalSec.titleFr
        ? goalSec.titleFr
        : goalSec.titleEn || t('goal_title')
      : t('goal_title')

  const goalDesc =
    goalSec
      ? locale === 'fr' && goalSec.contentFr
        ? goalSec.contentFr
        : goalSec.contentEn || t('goal_desc')
      : t('goal_desc')

  const ctaTitle =
    ctaSec
      ? locale === 'fr' && ctaSec.titleFr
        ? ctaSec.titleFr
        : ctaSec.titleEn || t('cta_title')
      : t('cta_title')

  const ctaDesc =
    ctaSec
      ? locale === 'fr' && ctaSec.subtitleFr
        ? ctaSec.subtitleFr
        : ctaSec.subtitleEn || t('cta_desc')
      : t('cta_desc')

  const ctaBtn =
    ctaSec
      ? locale === 'fr' && ctaSec.contentFr
        ? ctaSec.contentFr
        : ctaSec.contentEn || t('get_in_touch')
      : t('get_in_touch')

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* Editorial Hero */}
      <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden snap-start scroll-mt-20 bg-mist">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2">
              {heroTitle}
            </h1>
            <p className="text-lg lg:text-xl text-charcoal/80 max-w-3xl mx-auto leading-relaxed font-light">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Goal Section replaced with ScrollAccordion */}
      <ScrollAccordion
        title={heroTitle}
        visionTitle={visionTitle}
        visionDesc={visionDesc}
        missionTitle={missionTitle}
        missionDesc={missionDesc}
        goalTitle={goalTitle}
        goalDesc={typeof goalDesc === 'string' ? goalDesc.replace(/<br\s*\/?>/g, '') : goalDesc}
      />

      {/* Editorial Bento Expertise Section */}
      <ServicesBentoGrid initialPillars={initialPillars} headerData={expSec} />

      {/* Core Values Grid */}
      <section className="w-full py-16 lg:py-16 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2">
                {t('values_title')}
              </h2>
            </div>

            <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden">
              <Image
                src="/our-values.png"
                alt="Our Core Values"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-10 lg:py-20 bg-mist">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-6 lg:space-y-10">
          <h2 className="text-deep-forest text-2xl sm:text-3xl lg:text-5xl font-serif">{ctaTitle}</h2>
          <p className="text-lg lg:text-2xl text-charcoal/80 font-light leading-relaxed">
            {ctaDesc}
          </p>
          <div className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center pt-2 sm:pt-6">
            <Link
              href="/contact"
              className="overflow-hidden relative group inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-deep-forest text-white rounded-full font-bold text-sm sm:text-base transition duration-200 hover:scale-[1.02] hover:shadow-xl hover:shadow-deep-forest/20"
            >
              <RollingText className="gap-1.5 sm:gap-2">
                {ctaBtn}
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
