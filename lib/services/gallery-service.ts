import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

export interface GalleryItemData {
  id: string
  titleEn: string
  titleFr?: string | null
  captionEn?: string | null
  captionFr?: string | null
  imageUrl: string
  category: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export const staticGalleryItems: GalleryItemData[] = [
  {
    id: 'static-gal-1',
    titleEn: 'Field Seed Certification & Variety Trials',
    titleFr: 'Certification des semences de plein champ et essais variétaux',
    captionEn: 'Agri Experience technical specialists conducting participatory variety selection and field inspection with local agrodealers.',
    captionFr: 'Spécialistes techniques d’Agri Experience menant une sélection variétale participative et une inspection sur le terrain avec des distributeurs agricoles locaux.',
    imageUrl: '/our-mission-2026.jpg',
    category: 'Field Research',
    order: 1,
  },
  {
    id: 'static-gal-2',
    titleEn: 'Pan-African Seed Regulators Convening',
    titleFr: 'Rencontre des régulateurs de semences panafricains',
    captionEn: 'Convening regional regulatory authorities (KEPHIS, TOSCI, SADC, COMESA) to harmonize seed trade policies.',
    captionFr: 'Réunion des autorités réglementaires régionales pour harmoniser les politiques commerciales des semences.',
    imageUrl: '/our-vision-2026.jpg',
    category: 'Conferences & Training',
    order: 2,
  },
  {
    id: 'static-gal-3',
    titleEn: 'Smallholder Farmer Last-Mile Verification',
    titleFr: 'Vérification du dernier kilomètre pour les petits exploitants agricoles',
    captionEn: 'Farmers validating certified scratch-off verification labels in rural market distribution centers.',
    captionFr: 'Agriculteurs validant les étiquettes de vérification certifiées à gratter dans les centres de distribution ruraux.',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    category: 'Inspection & Certification',
    order: 3,
  },
  {
    id: 'static-gal-4',
    titleEn: 'Agro-Dealer Association Governance Workshop',
    titleFr: 'Atelier de gouvernance de l’Association des distributeurs agricoles',
    captionEn: 'Capacity building and leadership training for county-level agricultural inputs distribution associations.',
    captionFr: 'Renforcement des capacités et formation en leadership pour les associations de distribution d’intrants agricoles.',
    imageUrl: '/pexels-equalstock-27722065.jpg',
    category: 'Conferences & Training',
    order: 4,
  },
]

export async function getGalleryItems(): Promise<GalleryItemData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.galleryItem.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fallback
    }
  }
  return staticGalleryItems
}

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.galleryItem.count()
  if (count === 0) {
    await prisma.galleryItem.createMany({
      data: staticGalleryItems.map((g) => ({
        titleEn: g.titleEn,
        titleFr: g.titleFr || null,
        captionEn: g.captionEn || null,
        captionFr: g.captionFr || null,
        imageUrl: g.imageUrl,
        category: g.category,
        order: g.order,
      })),
    })
  }
})

/**
 * Hydrates the GalleryItem table from static defaults when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveGalleryItemId(id: string): Promise<string> {
  if (!id.startsWith('static-')) return id
  const existing = staticGalleryItems.find((g) => g.id === id)
  if (!existing) {
    throw new Error(`Gallery item not found for static id: ${id}`)
  }
  const dbRecord = await prisma.galleryItem.findFirst({
    where: { titleEn: existing.titleEn },
  })
  if (!dbRecord) {
    throw new Error(`Gallery item "${existing.titleEn}" not found in database`)
  }
  return dbRecord.id
}

export async function createGalleryItem(data: {
  titleEn: string
  titleFr?: string
  captionEn?: string
  captionFr?: string
  imageUrl: string
  category?: string
  order?: number
}): Promise<GalleryItemData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.galleryItem.create({
    data: {
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      captionEn: data.captionEn || null,
      captionFr: data.captionFr || null,
      imageUrl: data.imageUrl,
      category: data.category || 'Field Work',
      order: data.order ?? 0,
    },
  })

  revalidatePath('/[locale]/gallery', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function updateGalleryItem(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr?: string
    captionEn?: string
    captionFr?: string
    imageUrl: string
    category: string
    order: number
  }>
): Promise<GalleryItemData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveGalleryItemId(id)
  const record = await prisma.galleryItem.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })

  revalidatePath('/[locale]/gallery', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveGalleryItemId(id)
  await prisma.galleryItem.delete({
    where: { id: targetId },
  })

  revalidatePath('/[locale]/gallery', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}

