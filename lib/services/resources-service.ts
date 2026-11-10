import { prisma, isDatabaseConnected } from '@/lib/db'
import { publicDownloads, PublicDownload } from '@/lib/public-downloads'
import { revalidatePath } from 'next/cache'

export interface ResourceItem {
  id: string
  titleEn: string
  titleFr?: string | null
  link: string
  client: string
  citationEn: string
  citationFr?: string | null
  clientLink?: string | null
  category: string
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Returns all resources from the database with graceful static fallback.
 */
export async function getResources(): Promise<ResourceItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.resource.findMany({
        orderBy: { createdAt: 'desc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fall through to static data
    }
  }

  // Fallback to static publicDownloads
  return publicDownloads.map((d, index) => ({
    id: `static-${index}`,
    titleEn: d.title,
    titleFr: null,
    link: d.link,
    client: d.client,
    citationEn: d.citation,
    citationFr: null,
    clientLink: d.clientLink || null,
    category: d.category,
    createdAt: new Date(),
  }))
}

export async function createResource(data: {
  titleEn: string
  titleFr?: string
  link: string
  client: string
  citationEn: string
  citationFr?: string
  clientLink?: string
  category: string
}): Promise<ResourceItem> {
  const record = await prisma.resource.create({
    data: {
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      link: data.link,
      client: data.client,
      citationEn: data.citationEn,
      citationFr: data.citationFr || null,
      clientLink: data.clientLink || null,
      category: data.category,
    },
  })

  // Invalidate public caches on demand
  revalidatePath('/[locale]/resources', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function updateResource(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr?: string
    link: string
    client: string
    citationEn: string
    citationFr?: string
    clientLink?: string
    category: string
  }>
): Promise<ResourceItem> {
  const record = await prisma.resource.update({
    where: { id },
    data,
  })

  revalidatePath('/[locale]/resources', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteResource(id: string): Promise<boolean> {
  await prisma.resource.delete({
    where: { id },
  })

  revalidatePath('/[locale]/resources', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}
