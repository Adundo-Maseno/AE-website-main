import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

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
    titleFr: 'Développement des systèmes semenciers et des marchés',
    descEn: 'Tracking seed market performance and developing actionable recommendations from longitudinal seed data to support evidence-based decision-making and guide investment and policy, while analyzing value chains and business ecosystems to improve competitiveness, investment, and market access for producers and agribusinesses.',
    descFr: "Suivre la performance du marché des semences et élaborer des recommandations concrètes à partir de données semencières longitudinales pour soutenir la prise de décision fondée sur des données probantes et guider les investissements et les politiques, tout en analysant les chaînes de valeur et les écosystèmes d'affaires pour améliorer la compétitivité, les investissements et l'accès au marché pour les producteurs et les entreprises agroalimentaires.",
    route: '/our-work/project-implementation',
    order: 1,
    active: true,
  },
  {
    id: 'exp-2',
    titleEn: 'Policy and Regulatory Advisory',
    titleFr: 'Conseil en politiques et réglementation',
    descEn: 'Providing technical support for policy development, regulatory reforms, institutional governance, and implementation of seed industry standards and guidelines.',
    descFr: "Fournir un appui technique pour l'élaboration de politiques, les réformes réglementaires, la gouvernance institutionnelle et la mise en œuvre des normes et lignes directrices du secteur semencier.",
    route: '/our-work/client-advisory',
    order: 2,
    active: true,
  },
  {
    id: 'exp-3',
    titleEn: 'Capacity Building',
    titleFr: 'Renforcement des capacités',
    descEn: 'Strengthening the skills and institutional capacity of governments, research institutions, seed companies, extension services, agrodealers and farmer organizations through training and technical assistance.',
    descFr: "Renforcer les compétences et la capacité institutionnelle des gouvernements, des instituts de recherche, des entreprises semencières, des services de vulgarisation, des distributeurs d'intrants et des organisations paysannes grâce à des formations et à une assistance technique.",
    route: '/our-work/capacity-building',
    order: 3,
    active: true,
  },
  {
    id: 'exp-4',
    titleEn: 'Strategic Advisory, Monitoring, Evaluation and Learning (MEL)',
    titleFr: 'Conseil stratégique, suivi, évaluation et apprentissage (MEL)',
    descEn: 'Conducting thematic studies, assessments, feasibility analyses, and strategic planning to support investment decisions and agricultural transformation programs. Designing comprehensive MEL frameworks and learning processes to measure project performance, outcomes, and impact.',
    descFr: "Réaliser des études thématiques, des évaluations, des analyses de faisabilité et des planifications stratégiques pour éclairer les décisions d'investissement et les programmes de transformation agricole. Concevoir des cadres de suivi-évaluation et des processus d'apprentissage complets pour mesurer la performance, les résultats et l'impact des projets.",
    route: '/our-work/technical-studies',
    order: 4,
    active: true,
  },
  {
    id: 'exp-5',
    titleEn: 'Digital Platforms',
    titleFr: 'Plateformes numériques',
    descEn: 'Designing, developing, and implementing web and mobile platforms, databases, dashboards, and information systems that improve data management, service delivery, collaboration, and decision-making across the seed sector.',
    descFr: "Concevoir, développer et mettre en œuvre des plateformes Web et mobiles, des bases de données, des tableaux de bord et des systèmes d'information qui améliorent la gestion des données, la prestation de services, la collaboration et la prise de décision dans l'ensemble du secteur semencier.",
    route: '/our-work/digital-platforms',
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

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.expertisePillar.count()
  if (count === 0) {
    await prisma.expertisePillar.createMany({
      data: staticExpertisePillars.map((item) => stripManagedFields(item)),
    })
  }
})

/**
 * Hydrates the ExpertisePillar table from static defaults when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveExpertiseId(id: string): Promise<string> {
  if (!id.startsWith('exp-')) return id
  const staticItem = staticExpertisePillars.find((p) => p.id === id)
  if (!staticItem) {
    throw new Error(`Expertise pillar not found for static id: ${id}`)
  }
  const dbRecord =
    (await prisma.expertisePillar.findFirst({
      where: { order: staticItem.order, titleEn: staticItem.titleEn },
    })) ??
    (await prisma.expertisePillar.findFirst({
      where: { order: staticItem.order },
    }))
  if (!dbRecord) {
    throw new Error(`Expertise pillar "${staticItem.titleEn}" not found in database`)
  }
  return dbRecord.id
}

export async function createExpertisePillar(data: Omit<ExpertisePillarData, 'id'>): Promise<ExpertisePillarData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.expertisePillar.create({ data: stripManagedFields(data) })
  revalidatePath('/', 'layout')
  return record
}

export async function updateExpertisePillar(id: string, data: Partial<ExpertisePillarData>): Promise<ExpertisePillarData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveExpertiseId(id)
  const record = await prisma.expertisePillar.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })
  revalidatePath('/', 'layout')
  return record
}

export async function deleteExpertisePillar(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveExpertiseId(id)
  await prisma.expertisePillar.delete({ where: { id: targetId } })
  revalidatePath('/', 'layout')
  return true
}

