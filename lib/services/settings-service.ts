import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const FEATURE_FLAGS_SECTION_KEY = 'site_feature_flags'
const LOCAL_SETTINGS_CACHE_PATH = path.join(process.cwd(), '.site-settings-cache.json')

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
  showLanguageSwitcher?: boolean
  enableLanguageSwitcher?: boolean
  updatedAt?: Date
}

export const defaultSiteSettings: SiteSettingsData = {
  projectsManagedCount: '350+',
  countriesCount: '22',
  seedCompaniesCount: '100+',
  yearsExperience: '25+',
  contactEmail: 'info@agri-experience.com',
  contactPhone: '+254 (20) 2626888',
  officeAddress: 'Watermark Business Park\nSpring Court, Karen\nP.O. Box 1720 - 00606, Nairobi',
  linkedinUrl: 'https://www.linkedin.com/company/agri-experience-ltd/',
  showLanguageSwitcher: true,
  enableLanguageSwitcher: false,
}

function readLocalSettingsCache(): Partial<SiteSettingsData> {
  try {
    const raw = readFileSync(LOCAL_SETTINGS_CACHE_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') {
      return parsed as Partial<SiteSettingsData>
    }
  } catch {
    // Missing or unreadable cache
  }
  return {}
}

function writeLocalSettingsCache(settings: Partial<SiteSettingsData>): void {
  try {
    writeFileSync(LOCAL_SETTINGS_CACHE_PATH, JSON.stringify(settings, null, 2), 'utf-8')
  } catch {
    // Ignore read-only filesystem errors
  }
}

function parseFeatureFlags(extraJson?: string | null): {
  showLanguageSwitcher?: boolean
  enableLanguageSwitcher?: boolean
} {
  if (!extraJson) return {}
  try {
    const parsed = JSON.parse(extraJson)
    if (parsed && typeof parsed === 'object') {
      return {
        showLanguageSwitcher:
          typeof parsed.showLanguageSwitcher === 'boolean'
            ? parsed.showLanguageSwitcher
            : undefined,
        enableLanguageSwitcher:
          typeof parsed.enableLanguageSwitcher === 'boolean'
            ? parsed.enableLanguageSwitcher
            : undefined,
      }
    }
  } catch {
    // Ignore malformed JSON
  }
  return {}
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const localCache = readLocalSettingsCache()
  const connected = await isDatabaseConnected()

  if (connected) {
    try {
      const [record, flagSection] = await Promise.all([
        prisma.siteSettings.findFirst(),
        prisma.pageSection.findUnique({
          where: { sectionKey: FEATURE_FLAGS_SECTION_KEY },
        }),
      ])
      const flags = parseFeatureFlags(flagSection?.extraJson)

      return {
        id: record?.id,
        projectsManagedCount:
          record?.projectsManagedCount ?? defaultSiteSettings.projectsManagedCount,
        countriesCount: record?.countriesCount ?? defaultSiteSettings.countriesCount,
        seedCompaniesCount: record?.seedCompaniesCount ?? defaultSiteSettings.seedCompaniesCount,
        yearsExperience: record?.yearsExperience ?? defaultSiteSettings.yearsExperience,
        contactEmail: record?.contactEmail ?? defaultSiteSettings.contactEmail,
        contactPhone: record?.contactPhone ?? defaultSiteSettings.contactPhone,
        officeAddress: record?.officeAddress ?? defaultSiteSettings.officeAddress,
        linkedinUrl: record?.linkedinUrl ?? defaultSiteSettings.linkedinUrl,
        showLanguageSwitcher:
          flags.showLanguageSwitcher ??
          localCache.showLanguageSwitcher ??
          defaultSiteSettings.showLanguageSwitcher,
        enableLanguageSwitcher:
          flags.enableLanguageSwitcher ??
          localCache.enableLanguageSwitcher ??
          defaultSiteSettings.enableLanguageSwitcher,
        updatedAt: record?.updatedAt,
      }
    } catch {
      // Fallback below
    }
  }

  return {
    ...defaultSiteSettings,
    ...localCache,
  }
}

export async function updateSiteSettings(
  data: Partial<SiteSettingsData>
): Promise<SiteSettingsData> {
  const current = await getSiteSettings()
  const nextSettings: SiteSettingsData = {
    projectsManagedCount: data.projectsManagedCount ?? current.projectsManagedCount,
    countriesCount: data.countriesCount ?? current.countriesCount,
    seedCompaniesCount: data.seedCompaniesCount ?? current.seedCompaniesCount,
    yearsExperience: data.yearsExperience ?? current.yearsExperience,
    contactEmail: data.contactEmail ?? current.contactEmail,
    contactPhone: data.contactPhone ?? current.contactPhone,
    officeAddress: data.officeAddress ?? current.officeAddress,
    linkedinUrl: data.linkedinUrl ?? current.linkedinUrl,
    showLanguageSwitcher:
      data.showLanguageSwitcher ??
      current.showLanguageSwitcher ??
      defaultSiteSettings.showLanguageSwitcher,
    enableLanguageSwitcher:
      data.enableLanguageSwitcher ??
      current.enableLanguageSwitcher ??
      defaultSiteSettings.enableLanguageSwitcher,
  }

  const connected = await isDatabaseConnected()
  if (connected) {
    const existing = await prisma.siteSettings.findFirst()
    let record
    if (existing) {
      record = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: {
          projectsManagedCount: nextSettings.projectsManagedCount,
          countriesCount: nextSettings.countriesCount,
          seedCompaniesCount: nextSettings.seedCompaniesCount,
          yearsExperience: nextSettings.yearsExperience,
          contactEmail: nextSettings.contactEmail,
          contactPhone: nextSettings.contactPhone,
          officeAddress: nextSettings.officeAddress,
          linkedinUrl: nextSettings.linkedinUrl,
        },
      })
    } else {
      record = await prisma.siteSettings.create({
        data: {
          projectsManagedCount: nextSettings.projectsManagedCount,
          countriesCount: nextSettings.countriesCount,
          seedCompaniesCount: nextSettings.seedCompaniesCount,
          yearsExperience: nextSettings.yearsExperience,
          contactEmail: nextSettings.contactEmail,
          contactPhone: nextSettings.contactPhone,
          officeAddress: nextSettings.officeAddress,
          linkedinUrl: nextSettings.linkedinUrl,
        },
      })
    }

    await prisma.pageSection.upsert({
      where: { sectionKey: FEATURE_FLAGS_SECTION_KEY },
      create: {
        sectionKey: FEATURE_FLAGS_SECTION_KEY,
        page: 'settings',
        titleEn: 'Site Header & Feature Visibility Flags',
        extraJson: JSON.stringify({
          showLanguageSwitcher: nextSettings.showLanguageSwitcher,
          enableLanguageSwitcher: nextSettings.enableLanguageSwitcher,
        }),
      },
      update: {
        extraJson: JSON.stringify({
          showLanguageSwitcher: nextSettings.showLanguageSwitcher,
          enableLanguageSwitcher: nextSettings.enableLanguageSwitcher,
        }),
      },
    })

    nextSettings.id = record.id
    nextSettings.updatedAt = record.updatedAt
  }

  writeLocalSettingsCache(nextSettings)
  revalidatePath('/', 'layout')
  return nextSettings
}
