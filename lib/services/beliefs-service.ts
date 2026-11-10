import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface BeliefData {
  id: string
  titleEn: string
  titleFr?: string | null
  textEn: string
  textFr?: string | null
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const staticBeliefs: BeliefData[] = [
  {
    id: 'b-1',
    titleEn: 'Agriculture is Foundational',
    titleFr: 'L’agriculture est fondamentale',
    textEn: 'We believe that agriculture is one of the most important sectors in the world, with major impacts on health, nutrition, the environment, security, economies, and social development.',
    textFr: 'Nous croyons que l’agriculture est l’un des secteurs les plus importants au monde, avec des impacts majeurs sur la santé, la nutrition, l’environnement, la sécurité, l’économie et le développement social.',
    order: 1,
    active: true,
  },
  {
    id: 'b-2',
    titleEn: 'Unlocking Untapped Potential',
    titleFr: 'Libérer un potentiel inexploité',
    textEn: 'We believe that sub-Saharan Africa has vast untapped agricultural potential, and that African farmers and entrepreneurs should be given the opportunity and tools to tap this potential.',
    textFr: 'Nous croyons que l’Afrique subsaharienne possède un vaste potentiel agricole inexploité et que les agriculteurs et entrepreneurs africains devraient avoir l’opportunité et les outils pour l’exploiter.',
    order: 2,
    active: true,
  },
  {
    id: 'b-3',
    titleEn: 'Practical Solutions',
    titleFr: 'Des solutions pratiques',
    textEn: 'We believe that practical solutions to agricultural challenges, based on deep experience and not just theory, can deliver significant results in sub-Saharan Africa.',
    textFr: 'Nous croyons que des solutions pratiques aux défis agricoles, fondées sur une expérience approfondie et non sur la seule théorie, peuvent apporter des résultats significatifs en Afrique subsaharienne.',
    order: 3,
    active: true,
  },
  {
    id: 'b-4',
    titleEn: 'Empowering Women & Youth',
    titleFr: 'Autonomiser les femmes et les jeunes',
    textEn: 'We believe that Africa’s women and youth farmers should play significant roles in developing agriculture in their countries.',
    textFr: 'Nous croyons que les femmes et les jeunes agriculteurs d’Afrique doivent jouer un rôle prépondérant dans le développement agricole de leur pays.',
    order: 4,
    active: true,
  },
]

export async function getBeliefs(): Promise<BeliefData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.coreBelief.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching beliefs:', err)
    }
  }
  return staticBeliefs
}

export async function getAllBeliefsAdmin(): Promise<BeliefData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.coreBelief.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching all beliefs admin:', err)
    }
  }
  return staticBeliefs
}

export async function createBelief(data: Omit<BeliefData, 'id'>): Promise<BeliefData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.coreBelief.create({ data })
  revalidatePath('/', 'layout')
  return record
}

export async function updateBelief(id: string, data: Partial<BeliefData>): Promise<BeliefData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.coreBelief.update({ where: { id }, data })
  revalidatePath('/', 'layout')
  return record
}

export async function deleteBelief(id: string): Promise<boolean> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  await prisma.coreBelief.delete({ where: { id } })
  revalidatePath('/', 'layout')
  return true
}

