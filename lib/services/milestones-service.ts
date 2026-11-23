import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'
import {
  formatYearRange,
  parseYearsFromRange,
  sortMilestonesChronologically,
  type WorkMilestoneData,
} from '@/lib/constants/milestones'

export {
  SERVICE_AREAS,
  formatYearRange,
  parseYearsFromRange,
  sortMilestonesChronologically,
  type ServiceAreaSlug,
  type MilestoneIconName,
  type ServiceAreaMeta,
  type WorkMilestoneData,
} from '@/lib/constants/milestones'

export const staticWorkMilestones: WorkMilestoneData[] = [
  {
    id: 'ms-1',
    startYear: 2013,
    endYear: 2018,
    yearRange: '2013–2018',
    titleEn: 'Kenya Crop Seed Sector Project',
    titleFr: 'Projet sur le secteur des semences au Kenya',
    client: null,
    location: 'Kenya',
    locationFr: 'Kenya',
    serviceArea: 'project-implementation',
    icon: 'sprout',
    order: 1,
    active: true,
  },
  {
    id: 'ms-2',
    startYear: 2018,
    endYear: null,
    yearRange: '2018',
    titleEn: 'Kenya Crops and Dairy Market System Development (KCDMSD) – Scoping Studies',
    titleFr: 'Développement du système de marché des cultures et produits laitiers au Kenya (KCDMSD) – Études exploratoires',
    client: null,
    location: 'Kenya',
    locationFr: 'Kenya',
    serviceArea: 'technical-studies',
    icon: 'sprout',
    order: 2,
    active: true,
  },
  {
    id: 'ms-3',
    startYear: 2018,
    endYear: null,
    yearRange: '2018',
    titleEn: 'Regional Seed Trade Assessment in East Africa',
    titleFr: 'Évaluation régionale du commerce des semences en Afrique de l’Est',
    client: 'USAID / Feed the Future',
    location: 'Kenya, Rwanda, Tanzania, Uganda, Zambia',
    locationFr: 'Kenya, Rwanda, Tanzanie, Ouganda, Zambie',
    serviceArea: 'technical-studies',
    icon: 'globe',
    order: 3,
    active: true,
  },
  {
    id: 'ms-4',
    startYear: 2018,
    endYear: 2019,
    yearRange: '2018–2019',
    titleEn: 'Evaluation and Assessment of Stress-Tolerant Maize for Africa',
    titleFr: 'Évaluation du maïs tolérant au stress pour l’Afrique',
    client: null,
    location: 'Ethiopia, Kenya, Tanzania, Uganda',
    locationFr: 'Éthiopie, Kenya, Tanzanie, Ouganda',
    serviceArea: 'technical-studies',
    icon: 'shield-check',
    order: 4,
    active: true,
  },
  {
    id: 'ms-5',
    startYear: 2018,
    endYear: 2024,
    yearRange: '2018–2024',
    titleEn: 'Supporting Seed Systems for Development – CRS',
    titleFr: 'Soutien aux systèmes semenciers pour le développement – CRS',
    client: 'CRS',
    location: 'Kenya, Tanzania',
    locationFr: 'Kenya, Tanzanie',
    serviceArea: 'project-implementation',
    icon: 'settings',
    order: 5,
    active: true,
  },
  {
    id: 'ms-6',
    startYear: 2018,
    endYear: 2024,
    yearRange: '2018–2024',
    titleEn: 'Enhancing the Seed Sector in Tanzania (ESSETA)',
    titleFr: 'Renforcement du secteur semencier en Tanzanie (ESSETA)',
    client: null,
    location: 'Tanzania',
    locationFr: 'Tanzanie',
    serviceArea: 'project-implementation',
    icon: 'trending-up',
    order: 6,
    active: true,
  },
  {
    id: 'ms-7',
    startYear: 2019,
    endYear: 2020,
    yearRange: '2019–2020',
    titleEn: 'SeedSAT Beta Development for Quality Assurance',
    titleFr: 'Développement de la version bêta de SeedSAT pour l’assurance qualité',
    client: null,
    location: 'Ethiopia, Nigeria',
    locationFr: 'Éthiopie, Nigéria',
    serviceArea: 'digital-platforms',
    icon: 'award',
    order: 7,
    active: true,
  },
  {
    id: 'ms-8',
    startYear: 2021,
    endYear: 2022,
    yearRange: '2021–2022',
    titleEn: 'Support the Development of Seed Systems Assessment Tool (SeedSAT) and CESSA',
    titleFr: 'Soutien au développement de l’outil d’évaluation des systèmes semenciers (SeedSAT) et CESSA',
    client: 'AGRA',
    location: 'Ethiopia, Ghana, Kenya, Malawi, Nigeria, Tanzania, Uganda',
    locationFr: 'Éthiopie, Ghana, Kenya, Malawi, Nigéria, Tanzanie, Ouganda',
    serviceArea: 'digital-platforms',
    icon: 'laptop',
    order: 8,
    active: true,
  },
  {
    id: 'ms-9',
    startYear: 2023,
    endYear: null,
    yearRange: '2023',
    titleEn: 'Digital Learning Study on Best Practices in Digital Learning',
    titleFr: 'Étude sur les meilleures pratiques en apprentissage numérique',
    client: 'AGRA',
    location: 'Sub-Saharan Africa',
    locationFr: 'Afrique subsaharienne',
    serviceArea: 'capacity-building',
    icon: 'book-open',
    order: 9,
    active: true,
  },
  {
    id: 'ms-10',
    startYear: 2023,
    endYear: 2027,
    yearRange: '2023–2027',
    titleEn: 'Seed Systems Indicators (SSI) – Two Phases',
    titleFr: 'Indicateurs des systèmes semenciers (SSI) – Deux phases',
    client: 'Gates Foundation',
    location: 'Ethiopia, Kenya, Nigeria, Tanzania',
    locationFr: 'Éthiopie, Kenya, Nigéria, Tanzanie',
    serviceArea: 'technical-studies',
    icon: 'sprout',
    order: 10,
    active: true,
  },
  {
    id: 'ms-11',
    startYear: 2024,
    endYear: 2025,
    yearRange: '2024–2025',
    titleEn: 'Seed Sector Environmental Assessment',
    titleFr: 'Évaluation environnementale du secteur semencier',
    client: 'Agventure Limited',
    location: 'Kenya',
    locationFr: 'Kenya',
    serviceArea: 'client-advisory',
    icon: 'leaf',
    order: 11,
    active: true,
  },
  {
    id: 'ms-12',
    startYear: 2024,
    endYear: 2026,
    yearRange: '2024–2026',
    titleEn: 'Africa Digital Crop Variety Catalogue',
    titleFr: 'Catalogue numérique africain des variétés cultivées',
    client: 'AGRA',
    location: '10 African Countries',
    locationFr: '10 pays africains',
    serviceArea: 'digital-platforms',
    icon: 'smartphone',
    order: 12,
    active: true,
  },
  {
    id: 'ms-13',
    startYear: 2025,
    endYear: 2026,
    yearRange: '2025–2026',
    titleEn: 'Development of South Sudan Investment Plan',
    titleFr: 'Élaboration du plan d’investissement du Soudan du Sud',
    client: 'AGRA',
    location: 'South Sudan',
    locationFr: 'Soudan du Sud',
    serviceArea: 'client-advisory',
    icon: 'hand-holding',
    order: 13,
    active: true,
  },
  {
    id: 'ms-14',
    startYear: 2026,
    endYear: null,
    yearRange: '2026',
    titleEn: 'Assessment to Determine the Potential for Digitizing Seed Distribution in Mali',
    titleFr: 'Évaluation du potentiel de numérisation de la distribution des semences au Mali',
    client: 'AGRA',
    location: 'Mali',
    locationFr: 'Mali',
    serviceArea: 'digital-platforms',
    icon: 'wheat',
    order: 14,
    active: true,
  },
]

function normalizeMilestoneRecord(m: WorkMilestoneData): WorkMilestoneData {
  const parsed = parseYearsFromRange(m.yearRange)
  const startYear = m.startYear || parsed.startYear
  const endYear =
    m.endYear !== undefined
      ? m.endYear && m.endYear > startYear
        ? m.endYear
        : null
      : parsed.endYear
  return {
    ...m,
    startYear,
    endYear,
    yearRange: formatYearRange(startYear, endYear),
  }
}

export async function getWorkMilestones(): Promise<WorkMilestoneData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.workMilestone.findMany({
        where: { active: true },
        orderBy: [{ startYear: 'asc' }, { endYear: 'asc' }, { order: 'asc' }],
      })
      if (records && records.length > 0) {
        return sortMilestonesChronologically(records.map(normalizeMilestoneRecord))
      }
    } catch (err) {
      console.error('Error fetching work milestones:', err)
    }
  }
  return sortMilestonesChronologically(staticWorkMilestones)
}

export async function getAllWorkMilestonesAdmin(): Promise<WorkMilestoneData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.workMilestone.findMany({
        orderBy: [{ startYear: 'asc' }, { endYear: 'asc' }, { order: 'asc' }],
      })
      if (records && records.length > 0) {
        return sortMilestonesChronologically(records.map(normalizeMilestoneRecord))
      }
    } catch (err) {
      console.error('Error fetching admin work milestones:', err)
    }
  }
  return sortMilestonesChronologically(staticWorkMilestones)
}

const seedIfEmpty = createSeedGuard(async () => {
  const count = await prisma.workMilestone.count()
  if (count === 0) {
    for (const m of staticWorkMilestones) {
      await prisma.workMilestone.create({
        data: {
          startYear: m.startYear,
          endYear: m.endYear ?? null,
          yearRange: formatYearRange(m.startYear, m.endYear),
          titleEn: m.titleEn,
          titleFr: m.titleFr || null,
          client: m.client || null,
          location: m.location,
          locationFr: m.locationFr || null,
          serviceArea: m.serviceArea,
          icon: m.icon,
          order: m.order,
          active: m.active,
        },
      })
    }
  }
})

function revalidateWorkPaths() {
  try {
    revalidatePath('/[locale]/our-work', 'page')
    revalidatePath('/en/our-work')
    revalidatePath('/fr/our-work')
  } catch {}
}

export async function createWorkMilestone(data: Omit<WorkMilestoneData, 'id'>) {
  await seedIfEmpty()
  const startYear = Number(data.startYear)
  const endYear =
    data.endYear !== null && data.endYear !== undefined && Number(data.endYear) > startYear
      ? Number(data.endYear)
      : null

  const created = await prisma.workMilestone.create({
    data: {
      startYear,
      endYear,
      yearRange: formatYearRange(startYear, endYear),
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      client: data.client || null,
      location: data.location,
      locationFr: data.locationFr || null,
      serviceArea: data.serviceArea || 'project-implementation',
      icon: data.icon || 'sprout',
      order: data.order ?? 0,
      active: data.active ?? true,
    },
  })
  revalidateWorkPaths()
  return created
}

export async function updateWorkMilestone(id: string, data: Partial<WorkMilestoneData>) {
  await seedIfEmpty()
  const cleanData = stripManagedFields(data as Record<string, any>)
  const target = id.startsWith('ms-')
    ? await prisma.workMilestone.findFirst({
        where: { order: parseInt(id.replace('ms-', ''), 10) || 1 },
      })
    : null
  const existingId = target ? target.id : id

  if (cleanData.startYear !== undefined || cleanData.endYear !== undefined) {
    const existing = await prisma.workMilestone.findUnique({ where: { id: existingId } })
    const startYear =
      cleanData.startYear !== undefined
        ? Number(cleanData.startYear)
        : existing?.startYear ?? 2020
    const rawEnd =
      cleanData.endYear !== undefined ? cleanData.endYear : existing?.endYear ?? null
    const endYear =
      rawEnd !== null && rawEnd !== '' && Number(rawEnd) > startYear ? Number(rawEnd) : null

    cleanData.startYear = startYear
    cleanData.endYear = endYear
    cleanData.yearRange = formatYearRange(startYear, endYear)
  }

  const updated = await prisma.workMilestone.update({
    where: { id: existingId },
    data: cleanData,
  })
  revalidateWorkPaths()
  return updated
}

export async function deleteWorkMilestone(id: string) {
  await seedIfEmpty()
  const target = id.startsWith('ms-')
    ? await prisma.workMilestone.findFirst({
        where: { order: parseInt(id.replace('ms-', ''), 10) || 1 },
      })
    : null
  await prisma.workMilestone.delete({
    where: { id: target ? target.id : id },
  })
  revalidateWorkPaths()
}
