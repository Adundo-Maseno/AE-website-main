import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface ExpertisePillarData {
  id: string
  titleEn: string
  titleFr?: string | null
  descEn: string
  descFr?: string | null
  route: string
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const staticExpertisePillars: ExpertisePillarData[] = [
  {
    id: 'exp-1',
    titleEn: 'Seed Systems and Market Development',
    titleFr: 'Systèmes semenciers et développement des marchés',
    descEn: 'Tracking seed market performance and developing actionable recommendations from longitudinal seed data to support evidence-based decision-making and guide investment and policy, while analyzing value chains and business ecosystems to improve competitiveness, investment, and market access for producers and agribusinesses.',
    descFr: 'Suivi de la performance du marché des semences et élaboration de recommandations exploitables à partir de données longitudinales pour guider les investissements et les politiques publiques.',
    route: '/our-work/project-implementation',
    order: 1,
    active: true,
  },
  {
    id: 'exp-2',
    titleEn: 'Policy and Regulatory Advisory',
    titleFr: 'Conseil politique et réglementaire',
    descEn: 'Providing technical support for policy development, regulatory reforms, institutional governance, and implementation of seed industry standards and guidelines.',
    descFr: 'Fourniture d’un appui technique pour l’élaboration des politiques, les réformes réglementaires, la gouvernance institutionnelle et la mise en œuvre des normes semencières.',
    route: '/our-work/client-advisory',
    order: 2,
    active: true,
  },
  {
    id: 'exp-3',
    titleEn: 'Capacity Building',
    titleFr: 'Renforcement des capacités',
    descEn: 'Strengthening the skills and institutional capacity of governments, research institutions, seed companies, extension services, agrodealers and farmer organizations through training and technical assistance.',
    descFr: 'Renforcement des compétences et des capacités institutionnelles des gouvernements, instituts de recherche, entreprises semencières et distributeurs.',
    route: '/our-work/capacity-building',
    order: 3,
    active: true,
  },
  {
    id: 'exp-4',
    titleEn: 'Strategic Advisory, Monitoring, Evaluation and Learning (MEL)',
    titleFr: 'Conseil stratégique, suivi, évaluation et apprentissage (MEL)',
    descEn: 'Conducting thematic studies, assessments, feasibility analyses, and strategic planning to support investment decisions and agricultural transformation programs. Designing comprehensive MEL frameworks and learning processes to measure project performance, outcomes, and impact.',
    descFr: 'Réalisation d’études thématiques, d’évaluations, d’analyses de faisabilité et de planification stratégique pour soutenir les programmes de transformation agricole.',
    route: '/our-work/client-advisory',
    order: 4,
    active: true,
  },
  {
    id: 'exp-5',
    titleEn: 'Digital Platforms',
    titleFr: 'Plateformes numériques',
    descEn: 'Designing, developing, and implementing web and mobile platforms, databases, dashboards, and information systems that improve data management, service delivery, collaboration, and decision-making across the seed sector.',
    descFr: 'Conception, développement et déploiement de plateformes web et mobiles, bases de données et tableaux de bord pour la gouvernance de données semencières.',
    route: '/our-work/project-implementation',
    order: 5,
    active: true,
  },
]

export async function getExpertisePillars(): Promise<ExpertisePillarData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.expertisePillar.findMany({
        where: { active: true },
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching expertise pillars:', err)
    }
  }
  return staticExpertisePillars
}

export async function getAllExpertisePillarsAdmin(): Promise<ExpertisePillarData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.expertisePillar.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching all expertise pillars admin:', err)
    }
  }
  return staticExpertisePillars
}

export async function createExpertisePillar(data: Omit<ExpertisePillarData, 'id'>): Promise<ExpertisePillarData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.expertisePillar.create({ data })
  revalidatePath('/', 'layout')
  return record
}

export async function updateExpertisePillar(id: string, data: Partial<ExpertisePillarData>): Promise<ExpertisePillarData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.expertisePillar.update({ where: { id }, data })
  revalidatePath('/', 'layout')
  return record
}

export async function deleteExpertisePillar(id: string): Promise<boolean> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  await prisma.expertisePillar.delete({ where: { id } })
  revalidatePath('/', 'layout')
  return true
}

