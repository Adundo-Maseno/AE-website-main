'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, MapPin, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from '@/i18n/routing'
import {
  SERVICE_AREAS,
  formatYearRange,
  sortMilestonesChronologically,
  type WorkMilestoneData,
} from '@/lib/constants/milestones'
import { MilestoneIcon } from '@/components/our-work/milestone-icon'

export interface PracticeAreaInfo {
  slug: string
  title: string
  description: string
  link: string
}

interface OurWorkContentProps {
  locale: string
  heroTitle: string
  heroSubtitle: string
  learnMoreLabel: string
  practiceAreas: PracticeAreaInfo[]
  milestones: WorkMilestoneData[]
}

export default function OurWorkContent({
  locale,
  heroTitle,
  heroSubtitle,
  learnMoreLabel,
  practiceAreas,
  milestones,
}: OurWorkContentProps) {
  const [selectedArea, setSelectedArea] = useState<string>('all')
  const isFr = locale === 'fr'

  const sortedMilestones = useMemo(
    () => sortMilestonesChronologically(milestones),
    [milestones]
  )

  const areaCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const m of sortedMilestones) {
      counts[m.serviceArea] = (counts[m.serviceArea] || 0) + 1
    }
    return counts
  }, [sortedMilestones])

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

  const practiceInfoMap = useMemo(() => {
    const map = new Map<string, PracticeAreaInfo>()
    for (const info of practiceAreas) {
      map.set(info.slug, info)
    }
    return map
  }, [practiceAreas])

  const activePracticeInfo =
    selectedArea !== 'all' ? practiceInfoMap.get(selectedArea) : null

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* Top Hero Section */}
      <section className="relative w-full pt-16 lg:pt-28 pb-10 lg:pb-14 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-16">
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

      {/* Our Journey: Key Milestones Section */}
      <section
        id="milestones"
        className="w-full py-12 md:py-16 bg-[#F7FAF4] border-t border-emerald-900/10 scroll-mt-20 relative overflow-hidden"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          {/* Section Header */}
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

          {/* Service Area Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setSelectedArea('all')}
              className={`px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedArea === 'all'
                  ? 'bg-deep-forest text-white shadow-sm'
                  : 'bg-white text-deep-forest/80 border border-deep-forest/15 hover:border-deep-forest/40'
              }`}
            >
              {isFr ? 'Tous les domaines' : 'All Practice Areas'} ({sortedMilestones.length})
            </button>

            {SERVICE_AREAS.map((area) => {
              const count = areaCounts[area.slug] || 0
              const isSelected = selectedArea === area.slug
              const info = practiceInfoMap.get(area.slug)
              const label = info?.title || (isFr ? area.labelFr : area.labelEn)

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
                  {label} {count > 0 ? `(${count})` : ''}
                </button>
              )
            })}
          </div>

          {/* Contextual Practice Area Link Banner when filtered */}
          {activePracticeInfo && (
            <div className="mb-8 rounded-2xl bg-white border border-deep-forest/15 px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-deep-forest text-lg sm:text-xl">
                  {activePracticeInfo.title}
                </h3>
                <p className="text-sm text-charcoal/80 leading-relaxed max-w-3xl">
                  {activePracticeInfo.description}
                </p>
              </div>
              <Link
                href={activePracticeInfo.link}
                className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest text-white text-xs sm:text-sm font-bold hover:bg-[#1A4D2E] transition shadow-xs"
              >
                <span>{learnMoreLabel}</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          )}

          {/* Milestone Cards Grid */}
          {filteredMilestones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-3">
              {filteredMilestones.map((m, idx) => {
                const areaMeta = serviceAreaMap.get(m.serviceArea)
                const areaInfo = practiceInfoMap.get(m.serviceArea)
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
                            <span>
                              {areaInfo?.title || (isFr ? areaMeta.labelFr : areaMeta.labelEn)}
                            </span>
                            <ArrowRight size={10} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-white border border-deep-forest/10 p-10 text-center space-y-3">
              <p className="text-sm sm:text-base text-charcoal/75">
                {isFr
                  ? 'Aucun jalon répertorié dans ce domaine pour le moment.'
                  : 'No milestones listed under this practice area yet.'}
              </p>
              {activePracticeInfo && (
                <Link
                  href={activePracticeInfo.link}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-deep-forest hover:underline"
                >
                  <span>{learnMoreLabel}</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
