import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

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
    name: 'TOSCI',
    logoUrl: '/tosci-logo.png',
    websiteUrl: 'https://www.tosci.go.tz/',
    category: 'regulators',
    row: 2,
    order: 13,
    active: true,
  },
  {
    id: 'p-14',
    name: 'CGIAR',
    logoUrl: '/cgiar-logo.png',
    websiteUrl: 'https://www.cgiar.org/',
    category: 'breeding_institutions',
    row: 2,
    order: 14,
    active: true,
  },
  {
    id: 'p-15',
    name: 'KALRO',
    logoUrl: '/kalro-logo.png',
    websiteUrl: 'https://www.kalro.org/',
    category: 'regulators',
    row: 2,
    order: 15,
    active: true,
  },
  {
    id: 'p-16',
    name: 'AATF',
    logoUrl: '/aatf-logo.png',
    websiteUrl: 'https://www.aatf-africa.org/',
    category: 'breeding_institutions',
    row: 2,
    order: 16,
    active: true,
  },
  {
    id: 'p-17',
    name: 'FCDO',
    logoUrl: '/fcdo-logo.png',
    websiteUrl: 'https://www.gov.uk/government/organisations/foreign-commonwealth-development-office',
    category: 'development_partners',
    row: 2,
    order: 17,
    active: true,
  },
  {
    id: 'p-18',
    name: 'World Bank',
    logoUrl: '/the-world-bank-logo.png',
    websiteUrl: 'https://www.worldbank.org/',
    category: 'development_partners',
    row: 2,
    order: 18,
    active: true,
  },
  {
    id: 'p-19',
    name: 'TASTA',
    logoUrl: '/tasta-logo.png',
    websiteUrl: 'https://tasta.or.tz/',
    category: 'regulators',
    row: 2,
    order: 19,
    active: true,
  },
  {
    id: 'p-20',
    name: 'WACCI',
    logoUrl: '/wacci-logo.png',
    websiteUrl: 'https://wacci.ug.edu.gh/',
    category: 'breeding_institutions',
    row: 2,
    order: 20,
    active: true,
  },
  {
    id: 'p-21',
    name: 'DAI',
    logoUrl: '/dai-logo.png',
    websiteUrl: 'https://www.dai.com/',
    category: 'development_partners',
    row: 2,
    order: 21,
    active: true,
  },
  {
    id: 'p-22',
    name: 'Seed Co',
    logoUrl: '/seed-co-logo.png',
    websiteUrl: 'https://www.seedcogroup.com/',
    category: 'private_sector',
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

export async function createPartner(data: Omit<PartnerData, 'id'>): Promise<PartnerData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.partner.create({ data })
  revalidatePath('/', 'layout')
  return record
}

export async function updatePartner(id: string, data: Partial<PartnerData>): Promise<PartnerData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.partner.update({ where: { id }, data })
  revalidatePath('/', 'layout')
  return record
}

export async function deletePartner(id: string): Promise<boolean> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  await prisma.partner.delete({ where: { id } })
  revalidatePath('/', 'layout')
  return true
}

