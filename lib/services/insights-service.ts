import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface InsightItem {
  id: string
  titleEn: string
  titleFr?: string | null
  summaryEn?: string | null
  summaryFr?: string | null
  contentEn?: string | null
  contentFr?: string | null
  link?: string | null
  author?: string | null
  order: number
  publishedAt?: Date
  createdAt?: Date
  updatedAt?: Date
}

export const staticInsights: InsightItem[] = [
  {
    id: 'static-insight-1',
    titleEn: 'Bringing accurate and transparent information to seed sector stakeholders',
    titleFr: 'Apporter des informations précises et transparentes aux acteurs du secteur semencier',
    summaryEn: 'Agri Experience partnered with KEPHIS, KALRO, and STAK to build a searchable seed sector information platform for decision-makers.',
    summaryFr: 'Agri Experience s’est associé au KEPHIS, au KALRO et au STAK pour créer une plateforme d’information interrogeable sur le secteur semencier destinée aux décideurs.',
    contentEn: 'A transparent, digitized regulatory information portal linking breeders, regulators, seed companies, and farmers to combat misinformation and counterfeit seeds.',
    contentFr: 'Un portail d’informations réglementaires numérisé et transparent reliant sélectionneurs, régulateurs, entreprises semencières et agriculteurs pour lutter contre la désinformation et les contrefaçons.',
    link: 'http://www.seedsectorplatformkenya.com/',
    author: 'Agri Experience Technical Team',
    order: 1,
  },
  {
    id: 'static-insight-2',
    titleEn: 'Educating crop breeders about crop seed commercialisation',
    titleFr: 'Éduquer les sélectionneurs de cultures sur la commercialisation des semences de culture',
    summaryEn: 'Seed Business Management training for WACCI PhD students strengthened the link between research and large-scale farmer impact.',
    summaryFr: 'La formation en gestion des entreprises semencières destinée aux étudiants au doctorat du WACCI a renforcé le lien entre la recherche et l’impact sur les agriculteurs à grande échelle.',
    contentEn: 'Transforming scientific discoveries into commercially viable seed enterprises across sub-Saharan Africa.',
    contentFr: 'Transformer les découvertes scientifiques en entreprises semencières commercialement viables à travers l’Afrique subsaharienne.',
    author: 'Aline O’Connor',
    order: 2,
  },
  {
    id: 'static-insight-3',
    titleEn: 'Introducing new drought tolerant maize varieties into the market',
    titleFr: 'Introduire de nouvelles variétés de maïs tolérantes à la sécheresse sur le marché',
    summaryEn: 'Private sector surveys and rollout support enabled rapid, successful introductions of drought tolerant maize varieties.',
    summaryFr: 'Les enquêtes auprès du secteur privé et le soutien au déploiement ont permis des introductions rapides et réussies de variétés de maïs tolérantes à la sécheresse.',
    contentEn: 'Accelerating market adoption of climate-resilient genetics among smallholder farming communities in East Africa.',
    contentFr: 'Accélérer l’adoption sur le marché de génétiques résilientes au climat parmi les communautés de petits exploitants agricoles en Afrique de l’Est.',
    author: 'Mulemia Maina',
    order: 3,
  },
]

export async function getInsights(): Promise<InsightItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.insight.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fallback to static
    }
  }
  return staticInsights
}

export async function createInsight(data: {
  titleEn: string
  titleFr?: string
  summaryEn?: string
  summaryFr?: string
  contentEn?: string
  contentFr?: string
  link?: string
  author?: string
  order?: number
}): Promise<InsightItem> {
  const record = await prisma.insight.create({
    data: {
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      summaryEn: data.summaryEn || null,
      summaryFr: data.summaryFr || null,
      contentEn: data.contentEn || null,
      contentFr: data.contentFr || null,
      link: data.link || null,
      author: data.author || null,
      order: data.order ?? 0,
    },
  })

  revalidatePath('/[locale]/insights', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function updateInsight(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr?: string
    summaryEn?: string
    summaryFr?: string
    contentEn?: string
    contentFr?: string
    link?: string
    author?: string
    order?: number
  }>
): Promise<InsightItem> {
  const record = await prisma.insight.update({
    where: { id },
    data,
  })

  revalidatePath('/[locale]/insights', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteInsight(id: string): Promise<boolean> {
  await prisma.insight.delete({
    where: { id },
  })

  revalidatePath('/[locale]/insights', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

