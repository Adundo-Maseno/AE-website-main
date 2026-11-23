export type ServiceAreaSlug =
  | 'digital-platforms'
  | 'technical-studies'
  | 'project-implementation'
  | 'client-advisory'
  | 'capacity-building'
  | 'stakeholder-convenings'

export type MilestoneIconName =
  | 'sprout'
  | 'globe'
  | 'settings'
  | 'trending-up'
  | 'shield-check'
  | 'award'
  | 'laptop'
  | 'book-open'
  | 'smartphone'
  | 'leaf'
  | 'hand-holding'
  | 'wheat'

export interface ServiceAreaMeta {
  slug: ServiceAreaSlug
  labelEn: string
  labelFr: string
  href: string
  badgeClass: string
}

export const SERVICE_AREAS: ServiceAreaMeta[] = [
  {
    slug: 'digital-platforms',
    labelEn: 'Digital Platforms',
    labelFr: 'Plateformes numériques',
    href: '/our-work/digital-platforms',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    slug: 'technical-studies',
    labelEn: 'Technical Studies',
    labelFr: 'Études techniques',
    href: '/our-work/technical-studies',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-200',
  },
  {
    slug: 'project-implementation',
    labelEn: 'Project Implementation',
    labelFr: 'Mise en œuvre du projet',
    href: '/our-work/project-implementation',
    badgeClass: 'bg-[#EDF3EF] text-[#1A4D2E] border-[#1A4D2E]/25',
  },
  {
    slug: 'client-advisory',
    labelEn: 'Client Advisory & Analytical Work',
    labelFr: 'Conseil et analyse client',
    href: '/our-work/client-advisory',
    badgeClass: 'bg-[#F4F7EE] text-[#34441B] border-lime-300',
  },
  {
    slug: 'capacity-building',
    labelEn: 'Capacity-building',
    labelFr: 'Renforcement des capacités',
    href: '/our-work/capacity-building',
    badgeClass: 'bg-[#FAF0E9] text-[#9A3412] border-orange-200',
  },
  {
    slug: 'stakeholder-convenings',
    labelEn: 'Stakeholder Convenings & Learning Trips',
    labelFr: 'Réunions et voyages d’apprentissage',
    href: '/our-work/stakeholder-convenings',
    badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
  },
]

export interface WorkMilestoneData {
  id: string
  startYear: number
  endYear?: number | null
  yearRange: string
  titleEn: string
  titleFr?: string | null
  client?: string | null
  location: string
  locationFr?: string | null
  serviceArea: string
  icon: string
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export function formatYearRange(startYear: number, endYear?: number | null): string {
  if (endYear && endYear > startYear) {
    return `${startYear}–${endYear}`
  }
  return `${startYear}`
}

export function parseYearsFromRange(yearRange?: string | null): {
  startYear: number
  endYear: number | null
} {
  const matches = yearRange?.match(/\d{4}/g)
  if (!matches || matches.length === 0) {
    return { startYear: 2020, endYear: null }
  }
  const start = Number(matches[0])
  const end = matches.length > 1 ? Number(matches[1]) : null
  return {
    startYear: start,
    endYear: end && end > start ? end : null,
  }
}

export function sortMilestonesChronologically<
  T extends { startYear: number; endYear?: number | null; order?: number }
>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    if (a.startYear !== b.startYear) return a.startYear - b.startYear
    const endA = a.endYear ?? a.startYear
    const endB = b.endYear ?? b.startYear
    if (endA !== endB) return endA - endB
    return (a.order ?? 0) - (b.order ?? 0)
  })
}
