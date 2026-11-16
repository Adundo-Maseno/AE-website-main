import { prisma, isDatabaseConnected } from '@/lib/db'
import { countrySeeds, countrySeedsFr } from '@/components/country-data'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

export interface CountryItem {
  id: string
  countryCode: string
  countryName: string
  region?: string | null
  activeProjectsCount: number
  engagement: number
  overviewEn?: string | null
  overviewFr?: string | null
  workDone?: string | null
  focus?: string | null
  impact?: string | null
  locations?: string | null
  updatedAt?: Date
}

export async function getCountries(): Promise<CountryItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.mapCountryData.findMany({
        orderBy: { activeProjectsCount: 'desc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fallback to static
    }
  }

  // Fallback to countrySeeds
  return countrySeeds.map((c) => ({
    id: `static-${c.code.toLowerCase()}`,
    countryCode: c.code,
    countryName: c.name,
    region: c.region,
    activeProjectsCount: c.projects,
    engagement: c.engagement,
    overviewEn: c.overview,
    overviewFr: null,
    workDone: JSON.stringify(c.workDone),
    focus: JSON.stringify(c.focus),
    impact: JSON.stringify(c.impact),
    locations: JSON.stringify(c.locations),
  }))
}

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.mapCountryData.count()
  if (count === 0) {
    const frOverviewByCode = new Map(
      countrySeedsFr.map((c) => [c.code.toUpperCase(), c.overview])
    )
    await prisma.mapCountryData.createMany({
      data: countrySeeds.map((c) => ({
        countryCode: c.code.toUpperCase().trim(),
        countryName: c.name.trim(),
        region: c.region || null,
        activeProjectsCount: c.projects ?? 0,
        engagement: c.engagement ?? 0,
        overviewEn: c.overview || null,
        overviewFr: frOverviewByCode.get(c.code.toUpperCase()) || null,
        workDone: JSON.stringify(c.workDone),
        focus: JSON.stringify(c.focus),
        impact: JSON.stringify(c.impact),
        locations: JSON.stringify(c.locations),
      })),
      skipDuplicates: true,
    })
  }
})

/**
 * Hydrates the MapCountryData table from countrySeeds when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveCountryId(id: string): Promise<string> {
  if (!id.startsWith('static-')) return id
  const code = id.replace('static-', '').toUpperCase()
  const dbRecord = await prisma.mapCountryData.findFirst({
    where: { countryCode: code },
  })
  if (!dbRecord) {
    throw new Error(`Country "${code}" not found in database`)
  }
  return dbRecord.id
}

export async function updateCountry(
  id: string,
  data: Partial<{
    countryCode: string
    countryName: string
    region: string
    activeProjectsCount: number
    engagement: number
    overviewEn: string
    overviewFr: string
    workDone: string
    focus: string
    impact: string
    locations: string
  }>
): Promise<CountryItem> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveCountryId(id)
  const cleanData = stripManagedFields(data)
  if (typeof cleanData.countryCode === 'string') {
    cleanData.countryCode = cleanData.countryCode.toUpperCase().trim()
  }

  const record = await prisma.mapCountryData.update({
    where: { id: targetId },
    data: cleanData,
  })

  revalidatePath('/[locale]/map', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function createCountry(data: {
  countryCode: string
  countryName: string
  region?: string
  activeProjectsCount?: number
  engagement?: number
  overviewEn?: string
  overviewFr?: string
  workDone?: string
  focus?: string
  impact?: string
  locations?: string
}): Promise<CountryItem> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.mapCountryData.create({
    data: {
      countryCode: data.countryCode.toUpperCase().trim(),
      countryName: data.countryName.trim(),
      region: data.region || null,
      activeProjectsCount: data.activeProjectsCount ?? 0,
      engagement: data.engagement ?? 0,
      overviewEn: data.overviewEn || null,
      overviewFr: data.overviewFr || null,
      workDone: data.workDone || null,
      focus: data.focus || null,
      impact: data.impact || null,
      locations: data.locations || null,
    },
  })

  revalidatePath('/[locale]/map', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteCountry(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveCountryId(id)
  await prisma.mapCountryData.delete({
    where: { id: targetId },
  })

  revalidatePath('/[locale]/map', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

