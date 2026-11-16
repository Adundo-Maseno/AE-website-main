import { prisma, isDatabaseConnected } from '@/lib/db'
import { publicDownloads } from '@/lib/public-downloads'
import frMessages from '@/messages/fr.json'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

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

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.resource.count()
  if (count === 0) {
    const frDownloads = (frMessages as { Resources?: { downloads?: Record<string, { title?: string; citation?: string }> } }).Resources?.downloads ?? {}
    const baseTime = Date.now()
    await prisma.resource.createMany({
      data: publicDownloads.map((item, index) => {
        const frItem = frDownloads[String(index)]
        return {
          titleEn: item.title,
          titleFr: frItem?.title || null,
          link: item.link,
          client: item.client,
          citationEn: item.citation,
          citationFr: frItem?.citation || null,
          clientLink: item.clientLink || null,
          category: item.category,
          // Preserve publicDownloads chronological order under descending createdAt sort.
          createdAt: new Date(baseTime - index * 1000),
        }
      }),
    })
  }
})

/**
 * Hydrates the Resource table from static publicDownloads when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveResourceId(id: string): Promise<string> {
  if (!id.startsWith('static-')) return id
  const rawIdx = id.replace('static-', '')
  const idx = Number.parseInt(rawIdx, 10)
  if (Number.isNaN(idx) || idx < 0 || idx >= publicDownloads.length || String(idx) !== rawIdx) {
    throw new Error(`Resource not found for static id: ${id}`)
  }
  const staticItem = publicDownloads[idx]
  const dbRecord =
    (await prisma.resource.findFirst({ where: { link: staticItem.link } })) ??
    (await prisma.resource.findFirst({ where: { titleEn: staticItem.title } }))
  if (!dbRecord) {
    throw new Error(`Resource "${staticItem.title}" not found in database`)
  }
  return dbRecord.id
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
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

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
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveResourceId(id)
  const record = await prisma.resource.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })

  revalidatePath('/[locale]/resources', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteResource(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveResourceId(id)
  await prisma.resource.delete({
    where: { id: targetId },
  })

  revalidatePath('/[locale]/resources', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

