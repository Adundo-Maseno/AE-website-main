'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { ExpertisePillarData } from '@/lib/services/expertise-service'
import { PageSectionData } from '@/lib/services/page-sections-service'

export interface ServicePillar {
  key: string
  number: string
  title: string
  desc: string
  route: string
}

interface BentoCardProps {
  pillar: ServicePillar
}

function BentoCard({ pillar }: BentoCardProps) {
  return (
    <div
      className="group relative rounded-[28px] overflow-hidden flex flex-col justify-between h-full p-6 sm:p-8 bg-white border border-stone-200/80 text-deep-forest shadow-xs hover:shadow-xl hover:border-primary-green/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Top Number Badge & Title */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-primary-green uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary-green/10">
            Pillar {pillar.number}
          </span>
        </div>
        <h3
          className="font-serif tracking-tight font-bold leading-[1.25] text-deep-forest group-hover:text-primary-green transition-colors duration-200"
          style={{ fontSize: 'clamp(1.2rem, 1.1rem + 0.35vw, 1.45rem)' }}
        >
          {pillar.title}
        </h3>
        <p
          className="font-sans font-light leading-relaxed text-charcoal/85 text-[14px] min-[1440px]:text-[15px]"
        >
          {pillar.desc}
        </p>
      </div>

      {/* Bottom Footer */}
      <div className="pt-5 mt-auto flex items-center justify-between border-t border-stone-100">
        <span className="text-[11px] font-mono text-charcoal/50 uppercase tracking-wider">Consulting Practice</span>
        <Link
          href={pillar.route}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest group-hover:text-primary-green transition-colors duration-200"
        >
          <span>Explore Practice</span>
          <ArrowRight size={14} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
        </Link>
      </div>
    </div>
  )
}

interface ServicesBentoGridProps {
  initialPillars?: ExpertisePillarData[]
  headerData?: PageSectionData
}

export default function ServicesBentoGrid({ initialPillars, headerData }: ServicesBentoGridProps = {}) {
  const t = useTranslations('About')
  const locale = useLocale()

  const defaultPillarRoutes = [
    '/our-work/digital-platforms',
    '/our-work/technical-studies',
    '/our-work/project-implementation',
    '/our-work/client-advisory',
    '/our-work/capacity-building',
    '/our-work/stakeholder-convenings',
  ]

  let pillars: ServicePillar[] = []

  if (initialPillars && initialPillars.length > 0) {
    pillars = initialPillars.filter((p) => p.active).map((p, idx) => ({
      key: p.id,
      number: String(idx + 1).padStart(2, '0'),
      title: locale === 'fr' && p.titleFr ? p.titleFr : p.titleEn,
      desc: locale === 'fr' && p.descFr ? p.descFr : p.descEn,
      route: p.route || defaultPillarRoutes[idx] || '/our-work',
    }))
  } else {
    const rawCards = (t.raw('expertise_cards') as Array<{ title: string; desc: string }>) || []
    pillars = rawCards.slice(0, 6).map((card, idx) => ({
      key: String(idx),
      number: String(idx + 1).padStart(2, '0'),
      title: card.title,
      desc: card.desc,
      route: defaultPillarRoutes[idx] || '/our-work',
    }))
  }

  const title =
    headerData
      ? locale === 'fr' && headerData.titleFr
        ? headerData.titleFr
        : headerData.titleEn || t('expertise_title')
      : t('expertise_title')

  const desc =
    headerData
      ? locale === 'fr' && headerData.subtitleFr
        ? headerData.subtitleFr
        : headerData.subtitleEn || t('expertise_desc')
      : t('expertise_desc')

  return (
    <section className="w-full py-16 md:py-20 lg:py-28 bg-[#F8F6F0] relative border-t border-stone-200/60 overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#3ab44a]/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2484c6]/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green">
              Advisory Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0F1A15] tracking-tight pb-1 leading-tight">
              {title}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-stone-700 font-normal leading-relaxed">
              {desc}
            </p>
          </div>

          <Link
            href="/our-work"
            className="group shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-deep-forest hover:bg-primary-green text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <span>Explore All 6 Practice Portals</span>
            <ArrowRight size={16} className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0" />
          </Link>
        </div>

        {/* 6-Pillar Balanced Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pillars.map((pillar) => (
            <BentoCard key={pillar.key} pillar={pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
