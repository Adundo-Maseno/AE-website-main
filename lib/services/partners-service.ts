import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

export interface PartnerData {
  id: string
  name: string
  logoUrl: string
  websiteUrl?: string | null
  category: string
  row: number
  order: number
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

export const staticPartners: PartnerData[] = [
  {
    id: 'p-1',
    name: 'Gates Foundation',
    logoUrl: '/Gates_Foundation_Logo.svg',
    websiteUrl: 'https://www.gatesfoundation.org/',
    category: 'development_partners',
    row: 1,
    order: 1,
    active: true,
  },
  {
    id: 'p-2',
    name: 'NARO Uganda',
    logoUrl: '/naro-logo.png',
    websiteUrl: 'https://naro.go.ug/',
    category: 'regulators',
    row: 1,
    order: 2,
    active: true,
  },
  {
    id: 'p-3',
    name: 'AGRA',
    logoUrl: '/AGRA.png',
    websiteUrl: 'https://agra.org/',
    category: 'development_partners',
    row: 1,
    order: 3,
    active: true,
  },
  {
    id: 'p-4',
    name: 'KEPHIS',
    logoUrl: '/kephis-logo.png',
    websiteUrl: 'https://www.kephis.org/',
    category: 'regulators',
    row: 1,
    order: 4,
    active: true,
  },
  {
    id: 'p-5',
    name: 'TARI',
    logoUrl: '/tari-logo.png',
    websiteUrl: 'https://www.tari.go.tz/',
    category: 'regulators',
    row: 1,
    order: 5,
    active: true,
  },
  {
    id: 'p-6',
    name: 'CIMMYT',
    logoUrl: '/cimmyt-logo.svg',
    websiteUrl: 'https://www.cimmyt.org/',
    category: 'breeding_institutions',
    row: 1,
    order: 6,
    active: true,
  },
  {
    id: 'p-7',
    name: 'Catholic Relief Services',
    logoUrl: '/crs-logo.png',
    websiteUrl: 'https://www.crs.org/where-we-work/africa/kenya',
    category: 'development_partners',
    row: 1,
    order: 7,
    active: true,
  },
  {
    id: 'p-8',
    name: 'Ministry of Agriculture Tanzania',
    logoUrl: '/moa-tanzania-logo.png',
    websiteUrl: 'https://www.kilimo.go.tz/',
    category: 'government',
    row: 1,
    order: 8,
    active: true,
  },
  {
    id: 'p-9',
    name: 'USAID',
    logoUrl: '/USAID-Identity.svg',
    websiteUrl: 'https://www.usaid.gov/',
    category: 'development_partners',
    row: 1,
    order: 9,
    active: true,
  },
  {
    id: 'p-10',
    name: 'STAK',
    logoUrl: '/stak-logo.png',
    websiteUrl: 'https://stak.or.ke/',
    category: 'regulators',
    row: 1,
    order: 10,
    active: true,
  },
  {
    id: 'p-11',
    name: 'AgDevCo',
    logoUrl: '/agdevco-logo.png',
    websiteUrl: 'https://www.agdevco.com/',
    category: 'private_sector',
    row: 1,
    order: 11,
    active: true,
  },
  {
    id: 'p-12',
    name: 'Adam Smith International',
    logoUrl: '/adam-smith-international-logo.png',
    websiteUrl: 'https://adamsmithinternational.com/',
    category: 'development_partners',
    row: 2,
    order: 12,
    active: true,
  },
  {
    id: 'p-13',
    name: 'Ministry of Agriculture Kenya',
    logoUrl: '/moa-kenya-logo.png',
    websiteUrl: 'https://kilimo.go.ke/',
    category: 'government',
    row: 2,
    order: 13,
    active: true,
  },
  {
    id: 'p-14',
    name: 'NASC',
    logoUrl: '/nasc-logo.svg',
    websiteUrl: 'https://seedcouncil.gov.ng/',
    category: 'regulators',
    row: 2,
    order: 14,
    active: true,
  },
  {
    id: 'p-15',
    name: 'IFDC',
    logoUrl: '/ifdc-logo.png',
    websiteUrl: 'https://ifdc.org/',
    category: 'development_partners',
    row: 2,
    order: 15,
    active: true,
  },
  {
    id: 'p-16',
    name: 'elan',
    logoUrl: '/elan-logo.png',
    websiteUrl: 'https://www.beamexchange.org/practice/programme-database/elan-rdc/',
    category: 'development_partners',
    row: 2,
    order: 16,
    active: true,
  },
  {
    id: 'p-17',
    name: 'KALRO',
    logoUrl: '/kalro-logo.png',
    websiteUrl: 'https://www.kalro.org/',
    category: 'regulators',
    row: 2,
    order: 17,
    active: true,
  },
  {
    id: 'p-18',
    name: 'Gatsby Africa',
    logoUrl: '/gatsby-logo.png',
    websiteUrl: 'https://www.gatsbyafrica.org.uk/',
    category: 'development_partners',
    row: 2,
    order: 18,
    active: true,
  },
  {
    id: 'p-19',
    name: 'TOSCI',
    logoUrl: '/tosci-logo.png',
    websiteUrl: 'https://www.tosci.go.tz/',
    category: 'regulators',
    row: 2,
    order: 19,
    active: true,
  },
  {
    id: 'p-20',
    name: 'USTA',
    logoUrl: '/usta-logo.png',
    websiteUrl: 'http://www.usta.ug/',
    category: 'regulators',
    row: 2,
    order: 20,
    active: true,
  },
  {
    id: 'p-21',
    name: 'TASTA',
    logoUrl: '/tasta-logo-v2.png',
    websiteUrl: 'https://tasta.or.tz/',
    category: 'regulators',
    row: 2,
    order: 21,
    active: true,
  },
  {
    id: 'p-22',
    name: 'NASTAG',
    logoUrl: '/nastag-logo.png',
    websiteUrl: 'https://nastag.org/',
    category: 'regulators',
    row: 2,
    order: 22,
    active: true,
  },
]

export async function getPartners(): Promise<PartnerData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.partner.findMany({
        where: { active: true },
        orderBy: [{ row: 'asc' }, { order: 'asc' }],
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching partners:', err)
    }
  }
  return staticPartners
}

export async function getAllPartnersAdmin(): Promise<PartnerData[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.partner.findMany({
        orderBy: [{ row: 'asc' }, { order: 'asc' }],
      })
      if (records && records.length > 0) {
        return records
      }
    } catch (err) {
      console.error('Error fetching all partners admin:', err)
    }
  }
  return staticPartners
}

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.partner.count()
  if (count === 0) {
    await prisma.partner.createMany({
      data: staticPartners.map((item) => stripManagedFields(item)),
    })
  }
})

/**
 * Hydrates the Partner table from static defaults when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolvePartnerId(id: string): Promise<string> {
  if (!id.startsWith('p-')) return id
  const staticItem = staticPartners.find((p) => p.id === id)
  if (!staticItem) {
    throw new Error(`Partner not found for static id: ${id}`)
  }
  const dbRecord = await prisma.partner.findFirst({
    where: { name: staticItem.name },
  })
  if (!dbRecord) {
    throw new Error(`Partner "${staticItem.name}" not found in database`)
  }
  return dbRecord.id
}

export async function createPartner(data: Omit<PartnerData, 'id'>): Promise<PartnerData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.partner.create({ data: stripManagedFields(data) })
  revalidatePath('/', 'layout')
  return record
}

export async function updatePartner(id: string, data: Partial<PartnerData>): Promise<PartnerData> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolvePartnerId(id)
  const record = await prisma.partner.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })
  revalidatePath('/', 'layout')
  return record
}

export async function deletePartner(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolvePartnerId(id)
  await prisma.partner.delete({ where: { id: targetId } })
  revalidatePath('/', 'layout')
  return true
}

