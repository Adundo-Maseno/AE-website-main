import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface SiteSettingsData {
  id?: string
  projectsManagedCount: string
  countriesCount: string
  seedCompaniesCount: string
  yearsExperience: string
  contactEmail: string
  contactPhone: string
  officeAddress: string
  linkedinUrl: string
  updatedAt?: Date
}

export const defaultSiteSettings: SiteSettingsData = {
  projectsManagedCount: '350+',
  countriesCount: '22',
  seedCompaniesCount: '100+',
  yearsExperience: '25+',
  contactEmail: 'info@agri-experience.com',
  contactPhone: '+254 700 000 000',
  officeAddress: 'Nairobi, Kenya',
  linkedinUrl: 'https://linkedin.com/company/agri-experience',
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const record = await prisma.siteSettings.findFirst()
      if (record) {
        return {
          id: record.id,
          projectsManagedCount: record.projectsManagedCount,
          countriesCount: record.countriesCount,
          seedCompaniesCount: record.seedCompaniesCount,
          yearsExperience: record.yearsExperience,
          contactEmail: record.contactEmail,
          contactPhone: record.contactPhone,
          officeAddress: record.officeAddress,
          linkedinUrl: record.linkedinUrl,
          updatedAt: record.updatedAt,
        }
      }
    } catch {
      // Fallback
    }
  }
  return defaultSiteSettings
}

export async function updateSiteSettings(data: Partial<SiteSettingsData>): Promise<SiteSettingsData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database not connected')

  const existing = await prisma.siteSettings.findFirst()
  let result
  if (existing) {
    result = await prisma.siteSettings.update({
      where: { id: existing.id },
      data: {
        projectsManagedCount: data.projectsManagedCount ?? existing.projectsManagedCount,
        countriesCount: data.countriesCount ?? existing.countriesCount,
        seedCompaniesCount: data.seedCompaniesCount ?? existing.seedCompaniesCount,
        yearsExperience: data.yearsExperience ?? existing.yearsExperience,
        contactEmail: data.contactEmail ?? existing.contactEmail,
        contactPhone: data.contactPhone ?? existing.contactPhone,
        officeAddress: data.officeAddress ?? existing.officeAddress,
        linkedinUrl: data.linkedinUrl ?? existing.linkedinUrl,
      },
    })
  } else {
    result = await prisma.siteSettings.create({
      data: {
        projectsManagedCount: data.projectsManagedCount || defaultSiteSettings.projectsManagedCount,
        countriesCount: data.countriesCount || defaultSiteSettings.countriesCount,
        seedCompaniesCount: data.seedCompaniesCount || defaultSiteSettings.seedCompaniesCount,
        yearsExperience: data.yearsExperience || defaultSiteSettings.yearsExperience,
        contactEmail: data.contactEmail || defaultSiteSettings.contactEmail,
        contactPhone: data.contactPhone || defaultSiteSettings.contactPhone,
        officeAddress: data.officeAddress || defaultSiteSettings.officeAddress,
        linkedinUrl: data.linkedinUrl || defaultSiteSettings.linkedinUrl,
      },
    })
  }

  revalidatePath('/', 'layout')
  return result
}

