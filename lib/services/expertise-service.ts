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
    titleEn: 'Digital Platforms & Public Data Infrastructure',
    titleFr: 'Plateformes numériques et infrastructures de données publiques',
    descEn: 'Architecting national variety selectors, regional agronomic catalogues, gazette APIs, and farmer-facing SMS feedback loops that drive transparency across the seed value chain.',
    descFr: 'Conception de sélecteurs de variétés nationaux, de catalogues agronomiques régionaux et de boucles de rétroaction par SMS pour les agriculteurs.',
    route: '/our-work/digital-platforms',
    order: 1,
    active: true,
  },
  {
    id: 'exp-2',
    titleEn: 'Technical Studies & Market Diagnostics',
    titleFr: 'Études techniques et diagnostics de marché',
    descEn: 'Conducting empirical market scoping, nursery commercial economics, and value chain assessments to identify root bottlenecks prior to capital and program investment.',
    descFr: 'Réalisation d’études de cadrage de marché, d’analyses économiques de pépinières et d’évaluations des chaînes de valeur pour identifier les goulots d’étranglement.',
    route: '/our-work/technical-studies',
    order: 2,
    active: true,
  },
  {
    id: 'exp-3',
    titleEn: 'Project Implementation & Systems Reform',
    titleFr: 'Mise en œuvre de projets et réforme des systèmes',
    descEn: 'Executing multi-year field programs, decentralizing national regulatory inspection services, and expanding standard seed multiplication with partners like USAID and CRS.',
    descFr: 'Exécution de programmes de terrain pluriannuels, décentralisation des inspections réglementaires et multiplication commerciale de semences.',
    route: '/our-work/project-implementation',
    order: 3,
    active: true,
  },
  {
    id: 'exp-4',
    titleEn: 'Client Advisory & Regulatory Harmonization',
    titleFr: 'Conseil aux clients et harmonisation réglementaire',
    descEn: 'Providing strategic counsel to agricultural ministries and regional authorities to streamline variety release timeframes, modernize quarantine protocols, and craft PPP frameworks.',
    descFr: 'Conseil stratégique aux ministères agricoles et aux autorités régionales pour rationaliser les délais d’homologation des variétés et moderniser les protocoles de quarantaine.',
    route: '/our-work/client-advisory',
    order: 4,
    active: true,
  },
  {
    id: 'exp-5',
    titleEn: 'Capacity Building & Leadership Training',
    titleFr: 'Renforcement des capacités et formation au leadership',
    descEn: 'Authoring operational management toolkits (The African Seed Company Toolbox) and training accredited private inspectors and emerging agribusiness executives.',
    descFr: 'Création d’outils de gestion opérationnelle (Boîte à outils des entreprises semencières) et formation d’inspecteurs semenciers privés agréés.',
    route: '/our-work/capacity-building',
    order: 5,
    active: true,
  },
  {
    id: 'exp-6',
    titleEn: 'Stakeholder Convenings & Policy Mediation',
    titleFr: 'Rencontres multipartites et médiation politique',
    descEn: 'Hosting neutral, high-trust roundtables under Chatham House rules uniting seed companies, research bodies, and regulators to break legislative deadlocks.',
    descFr: 'Organisation de tables rondes neutres réunissant semenciers, instituts de recherche et régulateurs pour lever les blocages politiques et réglementaires.',
    route: '/our-work/stakeholder-convenings',
    order: 6,
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

