'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowRight, MapPin, Building2, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import {
  SERVICE_AREAS,
  formatYearRange,
  sortMilestonesChronologically,
  type WorkMilestoneData,
} from '@/lib/constants/milestones'
import { MilestoneIcon } from '@/components/our-work/milestone-icon'

export interface ServiceCardItem {
  slug: string
  title: string
  description: string
  mobileDescription: string
  link: string
  borderClass: string
  textClass: string
  cardBgClass: string
  btnBgClass: string
}

interface OurWorkContentProps {
  locale: string
  heroTitle: string
  heroSubtitle: string
  learnMoreLabel: string
  cards: ServiceCardItem[]
  milestones: WorkMilestoneData[]
}

export default function OurWorkContent({
  locale,
  heroTitle,
  heroSubtitle,
  learnMoreLabel,
  cards,
  milestones,
}: OurWorkContentProps) {
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const timelineRef = useRef<HTMLElement>(null)
  const isFr = locale === 'fr'

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of milestones) {
      counts[m.serviceArea] = (counts[m.serviceArea] || 0) + 1
    }
    return counts
  }, [milestones])

  const sortedMilestones = useMemo(
    () => sortMilestonesChronologically(milestones),
    [milestones]
  )

  const filteredMilestones = useMemo(() => {
    if (selectedArea === 'all') return sortedMilestones
    return sortedMilestones.filter((m) => m.serviceArea === selectedArea)
  }, [sortedMilestones, selectedArea])

  const yearSpanLabel = useMemo(() => {
    if (sortedMilestones.length === 0) return '2013 – 2026'
    const min = Math.min(...sortedMilestones.map((m) => m.startYear))
    const max = Math.max(...sortedMilestones.map((m) => m.endYear ?? m.startYear))
    return min === max ? `${min}` : `${min} – ${max}`
  }, [sortedMilestones])

  const serviceAreaMap = useMemo(() => {
    const map = new Map<string, (typeof SERVICE_AREAS)[number]>()
    for (const area of SERVICE_AREAS) {
      map.set(area.slug, area)
    }
    return map
  }, [])

  const handleFilterFromCard = (e: React.MouseEvent, slug: string) => {
    e.preventDefault()
    e.stopPropagation()
    setSelectedArea(slug)
    timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* Top Section */}
      <section className="relative w-full pt-16 lg:pt-28 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-16">
            <div className="flex-1 space-y-4">
              <h1
                className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
              >
                {heroTitle}
              </h1>
            </div>

            <div className="flex-1 lg:pt-12 relative">
              <div className="hidden lg:block absolute left-0 top-12 bottom-0 w-px bg-stone-200/80" />
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-charcoal/90 leading-relaxed font-normal lg:pl-10">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Service Areas Grid */}
      <section className="w-full pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-12 md:pb-16 relative z-10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 xl:gap-7">
            {cards.map((card) => {
              const count = areaCounts[card.slug] || 0
              return (
                <Link key={card.slug} href={card.link} className="block h-full group">
                  <div
                    className={`rounded-2xl md:rounded-[24px] lg:rounded-[26px] border ${card.borderClass} ${card.cardBgClass} flex flex-col justify-between h-full shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 md:p-6 lg:p-7 min-h-0 md:min-h-[210px] lg:min-h-[230px]`}
                  >
                    {/* Mobile Layout (< md) */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4 md:hidden py-1">
                      <div className="flex-1 flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h2
                            className={`text-[16.5px] sm:text-lg font-serif font-bold ${card.textClass} leading-snug`}
                          >
                            {card.title}
                          </h2>
                        </div>
                        <p className="text-[13px] sm:text-sm text-charcoal/80 leading-relaxed line-clamp-2 pr-1">
                          {card.mobileDescription}
                        </p>
                        {count > 0 && (
                          <button
                            type="button"
                            onClick={(e) => handleFilterFromCard(e, card.slug)}
                            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-deep-forest/75 hover:text-deep-forest w-fit"
                          >
                            <Filter size={11} />
                            <span>
                              {count} {isFr ? (count === 1 ? 'jalon' : 'jalons') : count === 1 ? 'milestone' : 'milestones'}
                            </span>
                          </button>
                        )}
                      </div>
                      <div
                        className={`w-8 h-8 shrink-0 rounded-full ${card.btnBgClass} flex items-center justify-center shadow-xs`}
                      >
                        <ArrowRight
                          size={14}
                          className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                        />
                      </div>
                    </div>

                    {/* Desktop Layout (md+) */}
                    <div className="hidden md:flex flex-col justify-between h-full space-y-4 lg:space-y-5">
                      <div className="space-y-2 lg:space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <h2
                            className={`font-serif font-bold ${card.textClass} tracking-tight pb-0.5 leading-snug`}
                            style={{ fontSize: 'clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem)' }}
                          >
                            {card.title}
                          </h2>
                          {count > 0 && (
                            <button
                              type="button"
                              onClick={(e) => handleFilterFromCard(e, card.slug)}
                              title={isFr ? 'Filtrer les jalons ci-dessous' : 'Filter milestones below'}
                              className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/80 hover:bg-white border border-black/10 text-deep-forest/80 hover:text-deep-forest transition-colors"
                            >
                              <span>{count}</span>
                              <span className="hidden xl:inline">
                                {isFr ? (count === 1 ? 'projet' : 'projets') : count === 1 ? 'project' : 'projects'}
                              </span>
                            </button>
                          )}
                        </div>
                        <p className="text-charcoal/90 font-normal leading-relaxed text-[14.5px] min-[1440px]:text-[15px]">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-4 lg:pt-5 mt-auto flex items-center justify-between border-t border-black/5">
                        <span className={`text-xs lg:text-sm font-bold ${card.textClass}`}>
                          {learnMoreLabel}
                        </span>
                        <div
                          className={`w-8 h-8 lg:w-9 lg:h-9 rounded-full ${card.btnBgClass} flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300`}
                        >
                          <ArrowRight
                            size={16}
                            className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Integrated Our Journey: Key Milestones Section */}
      {milestones.length > 0 && (
        <section
          ref={timelineRef}
          id="milestones"
          className="w-full py-14 md:py-20 bg-[#F7FAF4] border-t border-emerald-900/10 scroll-mt-20 relative overflow-hidden"
        >
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
            {/* Section Header matching Infographic */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight"
                style={{ fontSize: 'clamp(1.75rem, 1.35rem + 1.8vw, 3rem)' }}
              >
                {isFr ? 'Notre parcours : jalons clés' : 'Our Journey: Key Milestones'}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-charcoal/80 font-normal leading-relaxed">
                {isFr
                  ? 'Un portefeuille croissant de missions en systèmes semenciers, développement des marchés et agriculture numérique'
                  : 'A growing portfolio of seed systems, market development and digital agriculture assignments'}
              </p>
            </div>

            {/* Signature Year-Span Divider Pill */}
            <div className="relative flex items-center justify-center my-8">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[#6AB04C]/50" />
              <span className="relative z-10 px-6 py-1.5 rounded-full bg-deep-forest text-white font-serif font-bold text-sm sm:text-base tracking-wide shadow-sm">
                {yearSpanLabel}
              </span>
            </div>

            {/* Seamless Service Area Filter Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              <button
                type="button"
                onClick={() => setSelectedArea('all')}
                className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedArea === 'all'
                    ? 'bg-deep-forest text-white shadow-sm'
                    : 'bg-white text-deep-forest/80 border border-deep-forest/15 hover:border-deep-forest/40'
                }`}
              >
                {isFr ? 'Tous les domaines' : 'All Practice Areas'} ({milestones.length})
              </button>

              {SERVICE_AREAS.map((area) => {
                const count = areaCounts[area.slug] || 0
                if (count === 0) return null
                const isSelected = selectedArea === area.slug
                return (
                  <button
                    key={area.slug}
                    type="button"
                    onClick={() => setSelectedArea(area.slug)}
                    className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-deep-forest text-white shadow-sm'
                        : 'bg-white text-deep-forest/80 border border-deep-forest/15 hover:border-deep-forest/40'
                    }`}
                  >
                    {isFr ? area.labelFr : area.labelEn} ({count})
                  </button>
                )
              })}
            </div>

            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-3">
              {filteredMilestones.map((m, idx) => {
                const areaMeta = serviceAreaMap.get(m.serviceArea)
                const title = isFr && m.titleFr ? m.titleFr : m.titleEn
                const location = isFr && m.locationFr ? m.locationFr : m.location

                return (
                  <motion.article
                    key={m.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: Math.min(idx * 0.03, 0.25) }}
                    className="relative mt-4 rounded-2xl bg-[#EEF7E6] border border-[#78B856]/45 hover:border-deep-forest/50 hover:bg-white hover:shadow-lg transition-all duration-300 p-5 pt-8 flex flex-col justify-between text-center"
                  >
                    {/* Overlapping Dark Green Year Badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-deep-forest text-white font-bold text-xs tracking-wide shadow-sm whitespace-nowrap">
                      {formatYearRange(m.startYear, m.endYear)}
                    </div>

                    <div className="space-y-3 flex-1 flex flex-col items-center">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#78B856]/30 text-deep-forest flex items-center justify-center shadow-2xs">
                        <MilestoneIcon name={m.icon} size={24} />
                      </div>

                      {/* Project Title */}
                      <h3 className="font-serif font-bold text-deep-forest text-[15px] sm:text-base leading-snug">
                        {title}
                      </h3>
                    </div>

                    {/* Footer: Client, Location & Linked Service Area */}
                    <div className="mt-4 pt-3 border-t border-[#78B856]/25 space-y-2 text-xs text-charcoal/85">
                      {m.client && (
                        <div className="flex items-center justify-center gap-1.5 font-semibold text-deep-forest/90">
                          <Building2 size={13} className="shrink-0 text-primary-green" />
                          <span>{m.client}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-1.5 text-charcoal/80">
                        <MapPin size={13} className="shrink-0 text-deep-forest/70" />
                        <span>{location}</span>
                      </div>

                      {areaMeta && (
                        <div className="pt-1">
                          <Link
                            href={areaMeta.href}
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-opacity hover:opacity-80 ${areaMeta.badgeClass}`}
                          >
                            <span>{isFr ? areaMeta.labelFr : areaMeta.labelEn}</span>
                            <ArrowRight size={10} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
