'use client'

import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { InsightItem } from '@/lib/services/insights-service'

export default function InsightsContent({
  locale,
  initialInsights,
}: {
  locale: string
  initialInsights: InsightItem[]
}) {
  const t = useTranslations('Insights')
  const isFr = locale === 'fr'

  const insightsList = initialInsights.map((item) => ({
    title: isFr && item.titleFr ? item.titleFr : item.titleEn,
    summary: (isFr && item.summaryFr ? item.summaryFr : item.summaryEn) || '',
    link: item.link || undefined,
  }))

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* Hero */}
      <section className="relative w-full pt-16 lg:pt-28 pb-10 overflow-hidden border-b border-mist">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--mist)_0%,transparent_50%)] opacity-50" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center space-y-4 lg:space-y-6 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif font-bold text-deep-forest tracking-tight pb-1"
            style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
          >
            {t('title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg lg:text-xl text-charcoal/85 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="w-full py-12 lg:py-16 bg-white relative">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {insightsList.map((item, idx) => (
              <motion.article
                key={`${item.title}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="rounded-[24px] lg:rounded-[28px] overflow-hidden bg-mist border border-mist hover:border-primary-green/20 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200"
              >
                <div className="p-6 lg:p-8 space-y-5 flex flex-col h-full justify-between">
                  <div className="flex-1 space-y-3">
                    <h3
                      className="font-serif font-bold text-deep-forest leading-snug"
                      style={{ fontSize: 'clamp(1.15rem, 1.05rem + 0.3vw, 1.35rem)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-charcoal/85 font-normal leading-relaxed text-[14.5px] min-[1440px]:text-base">
                      {item.summary}
                    </p>
                  </div>
                  {item.link && (
                    <div className="pt-4 border-t border-primary-green/10">
                      <a
                        href={item.link}
                        className="group inline-flex items-center gap-1.5 text-primary-green font-bold text-sm hover:text-deep-forest transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t('visit_resource')}{' '}
                        <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-10 lg:py-16 bg-mist border-t border-mist">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 lg:space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl text-deep-forest font-bold">
            {t('cta_title')}
          </h2>
          <p className="text-charcoal/80 text-sm sm:text-base leading-relaxed">
            {t('cta_desc')}
          </p>
          <div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-deep-forest text-white font-medium hover:bg-primary-green transition-colors text-sm shadow-sm"
            >
              {t('view_results')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

