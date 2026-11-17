import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

export interface WhyAgriCardData {
  id: string
  titleEn?: string | null
  titleFr?: string | null
  textEn: string
  textFr?: string | null
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const staticWhyAgriCards: WhyAgriCardData[] = [
  {
    id: 'wa-1',
    titleEn: 'Evidence-Based Insight',
    titleFr: 'Des perspectives fondées sur des preuves',
    textEn: 'We carefully develop recommendations that are grounded in behavioural patterns and evidence.',
    textFr: 'Nous élaborons soigneusement des recommandations fondées sur des modèles de comportement et des données probantes.',
    order: 1,
    active: true,
  },
  {
    id: 'wa-2',
    titleEn: 'Deep Africa Grounding',
    titleFr: 'Un ancrage africain profond',
    textEn: 'We bring deep, based-in-Africa, experience and expertise to our assignments.',
    textFr: 'Nous apportons à nos missions une expérience et une expertise approfondies, basées en Afrique.',
    order: 2,
    active: true,
  },
  {
    id: 'wa-3',
    titleEn: 'Farmer Empowerment',
    titleFr: 'Autonomisation des producteurs',
    textEn: 'We understand that farmer empowerment is a major force for positive change.',
    textFr: 'Nous comprenons que l’autonomisation des agriculteurs est une force majeure pour un changement positif.',
    order: 3,
    active: true,
  },
  {
    id: 'wa-4',
    titleEn: 'Public & Private Sector Expertise',
    titleFr: 'Expertise des secteurs public et privé',
    textEn: 'We embed our work and recommendations with permanent stakeholders through a collaborative, public/private approach.',
    textFr: 'We embed our work and recommendations with permanent stakeholders through a collaborative, public/private approach.',
    order: 4,
    active: true,
  },
  {
    id: 'wa-5',
    titleEn: 'Systems Transformation',
    titleFr: 'Transformation systémique',
    textEn: 'We have first-hand knowledge of systemic change, and what is required to achieve it.',
    textFr: 'Nous avons une connaissance directe du changement systémique et de ce qui est nécessaire pour y parvenir.',
    order: 5,
    active: true,
  },
]

export async function getWhyAgriCards(): Promise<WhyAgriCardData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.whyAgriCard.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching Why Agri cards:', err)
    }
  }
  return staticWhyAgriCards
}

export async function getAllWhyAgriCardsAdmin(): Promise<WhyAgriCardData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.whyAgriCard.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching all Why Agri cards admin:', err)
    }
  }
  return staticWhyAgriCards
}

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.whyAgriCard.count()
  if (count === 0) {
    await prisma.whyAgriCard.createMany({
      data: staticWhyAgriCards.map((item) => stripManagedFields(item)),
    })
  }
})

/**
 * Hydrates the WhyAgriCard table from static defaults when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveWhyAgriId(id: string): Promise<string> {
  if (!id.startsWith('wa-')) return id
  const staticItem = staticWhyAgriCards.find((c) => c.id === id)
  if (!staticItem) {
    throw new Error(`Why Agri card not found for static id: ${id}`)
  }
  const dbRecord =
    (await prisma.whyAgriCard.findFirst({
      where: { order: staticItem.order, titleEn: staticItem.titleEn ?? undefined },
    })) ??
    (await prisma.whyAgriCard.findFirst({
      where: { order: staticItem.order },
    }))
  if (!dbRecord) {
    throw new Error(`Why Agri card #${staticItem.order} not found in database`)
  }
  return dbRecord.id
}

export async function createWhyAgriCard(data: Omit<WhyAgriCardData, 'id'>): Promise<WhyAgriCardData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.whyAgriCard.create({ data: stripManagedFields(data) })
  revalidatePath('/', 'layout')
  return record
}

export async function updateWhyAgriCard(id: string, data: Partial<WhyAgriCardData>): Promise<WhyAgriCardData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveWhyAgriId(id)
  const record = await prisma.whyAgriCard.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })
  revalidatePath('/', 'layout')
  return record
}

export async function deleteWhyAgriCard(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveWhyAgriId(id)
  await prisma.whyAgriCard.delete({ where: { id: targetId } })
  revalidatePath('/', 'layout')
  return true
}

