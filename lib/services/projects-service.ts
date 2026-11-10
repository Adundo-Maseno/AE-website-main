import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface ProjectItem {
  id: string
  titleEn: string
  titleFr?: string | null
  descEn: string
  descFr?: string | null
  category: string
  client?: string | null
  year?: string | null
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export const staticProjects: ProjectItem[] = [
  {
    id: 'static-mbeguchoice',
    titleEn: 'MbeguChoice Variety Selector',
    titleFr: 'Sélecteur de variétés MbeguChoice',
    descEn: 'Online crop variety database helping farmers, agrodealers, and extension agents choose best-suited seed varieties by ecological zone.',
    descFr: 'Base de données en ligne des variétés agricoles aidant les agriculteurs à choisir les meilleures semences adaptées à leur zone agro-écologique.',
    category: 'digital-platforms',
    client: 'Kenya Markets Trust / Agri Experience',
    year: '2015-Present',
    order: 1,
  },
  {
    id: 'static-rimi',
    titleEn: 'Ripoti Mbegu Isiyo Bora (RIMI)',
    titleFr: 'Ripoti Mbegu Isiyo Bora (RIMI)',
    descEn: 'SMS and mobile verification platform empowering Tanzanian farmers to report low-quality or fake seed directly to TOSCI.',
    descFr: 'Plateforme mobile permettant aux agriculteurs tanzaniens de signaler les semences de mauvaise qualité ou contrefaites directement au TOSCI.',
    category: 'digital-platforms',
    client: 'Catholic Relief Services / USAID SSSD',
    year: '2022-2024',
    order: 2,
  },
  {
    id: 'static-m3',
    titleEn: 'Mulika Mbegu Mbovu (M3)',
    titleFr: 'Mulika Mbegu Mbovu (M3)',
    descEn: 'Pioneering mobile reporting platform enabling Kenyan smallholders to flag suspected counterfeit seed packages via SMS shortcode.',
    descFr: 'Plateforme mobile pionnière permettant aux petits exploitants kényans de signaler les emballages de semences suspectes par SMS.',
    category: 'digital-platforms',
    client: 'Agri Experience CSR supporting KEPHIS',
    year: '2018-2022',
    order: 3,
  },
  {
    id: 'static-feed-the-future',
    titleEn: 'Feed the Future Seed Systems for Development (SSSD)',
    titleFr: 'Feed the Future - Systèmes semenciers pour le développement',
    descEn: 'Technical leadership on private sector seed enterprise development, regulatory simplification, and market resilience across 6 countries.',
    descFr: 'Leadership technique sur le développement des entreprises semencières privées et la simplification réglementaire dans 6 pays.',
    category: 'project-implementation',
    client: 'USAID / CRS',
    year: '2019-2024',
    order: 4,
  },
  {
    id: 'static-comesa-harmonization',
    titleEn: 'COMESA Seed Trade Harmonization Technical Assessment',
    titleFr: 'Évaluation technique de l’harmonisation du commerce des semences du COMESA',
    descEn: 'Multi-country assessment of regional variety release catalogs, quarantine pest lists, and seed border transit protocols.',
    descFr: 'Évaluation multi-pays des catalogues régionaux de variétés et des protocoles de transit frontalier des semences.',
    category: 'technical-studies',
    client: 'USAID / ACTESA',
    year: '2018',
    order: 5,
  },
  {
    id: 'static-inspector-training',
    titleEn: 'Authorized Seed Inspector Training & Accreditation',
    titleFr: 'Formation et accréditation des inspecteurs semenciers agréés',
    descEn: 'Standardized curriculum and practical field evaluation modules for private and public sector seed quality inspectors.',
    descFr: 'Programme standardisé et modules d’évaluation sur le terrain pour les inspecteurs de la qualité des semences.',
    category: 'capacity-building',
    client: 'KEPHIS / AGRA',
    year: '2020-2023',
    order: 6,
  },
]

export async function getProjects(category?: string): Promise<ProjectItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.project.findMany({
        where: category ? { category } : undefined,
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fall through to static
    }
  }

  if (category) {
    return staticProjects.filter((p) => p.category === category)
  }
  return staticProjects
}

export async function createProject(data: {
  titleEn: string
  titleFr?: string
  descEn: string
  descFr?: string
  category: string
  client?: string
  year?: string
  order?: number
}): Promise<ProjectItem> {
  const record = await prisma.project.create({
    data: {
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      descEn: data.descEn,
      descFr: data.descFr || null,
      category: data.category,
      client: data.client || null,
      year: data.year || null,
      order: data.order ?? 0,
    },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function updateProject(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr?: string
    descEn: string
    descFr?: string
    category: string
    client?: string
    year?: string
    order?: number
  }>
): Promise<ProjectItem> {
  const record = await prisma.project.update({
    where: { id },
    data,
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteProject(id: string): Promise<boolean> {
  await prisma.project.delete({
    where: { id },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

