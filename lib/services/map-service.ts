import { prisma, isDatabaseConnected } from '@/lib/db'
import { countrySeeds } from '@/components/country-data'
import { revalidatePath } from 'next/cache'

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

export async function updateCountry(
  id: string,
  data: Partial<{
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
  const record = await prisma.mapCountryData.update({
    where: { id },
    data,
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
  await prisma.mapCountryData.delete({
    where: { id },
  })

  revalidatePath('/[locale]/map', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

