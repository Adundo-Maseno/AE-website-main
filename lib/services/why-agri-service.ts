import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

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
    textFr: 'Nous élaborons soigneusement des recommandations ancrées dans les comportements et les données probantes.',
    order: 1,
    active: true,
  },
  {
    id: 'wa-2',
    titleEn: 'Deep Africa Grounding',
    titleFr: 'Un ancrage africain profond',
    textEn: 'We bring deep, based-in-Africa, experience and expertise to our assignments.',
    textFr: 'Nous apportons à nos missions une expérience et une expertise approfondies, ancrées en Afrique.',
    order: 2,
    active: true,
  },
  {
    id: 'wa-3',
    titleEn: 'Farmer Empowerment',
    titleFr: 'Autonomisation des producteurs',
    textEn: 'We understand that farmer empowerment is a major force for positive change.',
    textFr: 'Nous comprenons que l’autonomisation des agriculteurs est un puissant moteur de changement positif.',
    order: 3,
    active: true,
  },
  {
    id: 'wa-4',
    titleEn: 'Public & Private Sector Expertise',
    titleFr: 'Expertise des secteurs public et privé',
    textEn: 'We have hands-on experience in both the private and public seed sectors.',
    textFr: 'Nous possédons une expérience pratique dans les secteurs semenciers tant privé que public.',
    order: 4,
    active: true,
  },
  {
    id: 'wa-5',
    titleEn: 'Systems Transformation',
    titleFr: 'Transformation systémique',
    textEn: 'We are passionate about our mission to help transform African seed systems into vibrant engines of development.',
    textFr: 'Nous sommes passionnés par notre mission d’aider à transformer les systèmes semenciers africains en moteurs dynamiques de développement.',
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

export async function createWhyAgriCard(data: Omit<WhyAgriCardData, 'id'>): Promise<WhyAgriCardData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.whyAgriCard.create({ data })
  revalidatePath('/', 'layout')
  return record
}

export async function updateWhyAgriCard(id: string, data: Partial<WhyAgriCardData>): Promise<WhyAgriCardData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.whyAgriCard.update({ where: { id }, data })
  revalidatePath('/', 'layout')
  return record
}

export async function deleteWhyAgriCard(id: string): Promise<boolean> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  await prisma.whyAgriCard.delete({ where: { id } })
  revalidatePath('/', 'layout')
  return true
}
