import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getSiteSettings } from '@/lib/services/settings-service'
import { getProjects } from '@/lib/services/projects-service'
import OurWorkClient from './our-work-client'

export const revalidate = 0 // Dynamic on-demand revalidation

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const sections = await getPageSections('our-work')
  const heroSec = sections['our_work_hero']

  const title =
    (locale === 'fr' ? heroSec?.titleFr || heroSec?.titleEn : heroSec?.titleEn) ||
    'Our Work: Strategic Advisory & Seed Systems Practice'
  const description =
    (locale === 'fr' ? heroSec?.subtitleFr || heroSec?.subtitleEn : heroSec?.subtitleEn) ||
    'Agri Experience delivers specialized seed systems transformation, digital platforms, regulatory advisory, and technical scoping across sub-Saharan Africa.'

  return {
    title: `${title} | Agri Experience Ltd`,
    description,
    keywords: [
      'Seed Systems Africa',
      'Agricultural Advisory Consultancy',
      'Digital Seed Platforms',
      'KEPHIS Variety Release',
      'African Seed Company Toolbox',
      'Agricultural Policy Reform',
      'Tanzania Seed Systems',
      'Smallholder Agricultural Transformation',
    ],
    alternates: {
      canonical: `/${locale}/our-work`,
      languages: {
        en: '/en/our-work',
        fr: '/fr/our-work',
        'x-default': '/en/our-work',
      },
    },
    openGraph: {
      title: `${title} | Agri Experience`,
      description,
      url: `https://www.agri-experience.com/${locale}/our-work`,
      siteName: 'Agri Experience Ltd',
      images: [
        {
          url: '/pexels-equalstock-27722065.jpg',
          width: 1200,
          height: 630,
          alt: 'Agri Experience Seed Systems Transformation Field Implementation',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Agri Experience`,
      description,
      images: ['/pexels-equalstock-27722065.jpg'],
    },
  }
}

export default async function OurWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'OurWork' })

  const [sections, settings, allProjects] = await Promise.all([
    getPageSections('our-work'),
    getSiteSettings(),
    getProjects(),
  ])

  const heroSec = sections['our_work_hero']
  const heroTitle =
    (locale === 'fr' ? heroSec?.titleFr || heroSec?.titleEn : heroSec?.titleEn) || t('title')
  const heroSubtitle =
    (locale === 'fr' ? heroSec?.subtitleFr || heroSec?.subtitleEn : heroSec?.subtitleEn) ||
    t('subtitle')

  const dpTitle =
    (locale === 'fr'
      ? sections['digital_platforms_hero']?.titleFr || sections['digital_platforms_hero']?.titleEn
      : sections['digital_platforms_hero']?.titleEn) || t('c1_title')
  const tsTitle =
    (locale === 'fr'
      ? sections['technical_studies_hero']?.titleFr || sections['technical_studies_hero']?.titleEn
      : sections['technical_studies_hero']?.titleEn) || t('c2_title')
  const piTitle =
    (locale === 'fr'
      ? sections['project_implementation_hero']?.titleFr ||
        sections['project_implementation_hero']?.titleEn
      : sections['project_implementation_hero']?.titleEn) || t('c3_title')
  const caTitle =
    (locale === 'fr'
      ? sections['client_advisory_hero']?.titleFr || sections['client_advisory_hero']?.titleEn
      : sections['client_advisory_hero']?.titleEn) || t('c4_title')
  const cbTitle =
    (locale === 'fr'
      ? sections['capacity_building_hero']?.titleFr || sections['capacity_building_hero']?.titleEn
      : sections['capacity_building_hero']?.titleEn) || t('c5_title')
  const scTitle =
    (locale === 'fr'
      ? sections['stakeholder_convenings_hero']?.titleFr ||
        sections['stakeholder_convenings_hero']?.titleEn
      : sections['stakeholder_convenings_hero']?.titleEn) || t('c6_title')

  // Comprehensive JSON-LD Structured Data for Elite Consulting Practice
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pan-African Seed Systems Advisory & Agricultural Transformation',
    serviceType: 'Agricultural Systems Consulting',
    provider: {
      '@type': 'Organization',
      name: 'Agri Experience Ltd',
      url: 'https://www.agri-experience.com',
      logo: 'https://www.agri-experience.com/agri-experience-logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.officeAddress || 'Watermark Business Park, Spring Court, Karen',
        addressLocality: 'Nairobi',
        addressCountry: 'KE',
      },
      telephone: settings.contactPhone || '+254 (20) 2626888',
      email: settings.contactEmail || 'info@agri-experience.com',
    },
    areaServed: [
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Tanzania' },
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'Mali' },
      { '@type': 'Country', name: 'Burkina Faso' },
      { '@type': 'Country', name: 'Zambia' },
      { '@type': 'Country', name: 'Malawi' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Agri Experience Consulting Practices',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: dpTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/digital-platforms`,
            description: t('c1_desc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: tsTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/technical-studies`,
            description: t('c2_desc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: piTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/project-implementation`,
            description: t('c3_desc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: caTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/client-advisory`,
            description: t('c4_desc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: cbTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/capacity-building`,
            description: t('c5_desc'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: scTitle,
            url: `https://www.agri-experience.com/${locale}/our-work/stakeholder-convenings`,
            description: t('c6_desc'),
          },
        },
      ],
    },
  }

  return (
    <>
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Suspense fallback={<div className="bg-[#FAF9F5] min-h-[100dvh]" />}>
        <OurWorkClient
          heroTitle={heroTitle}
          heroSubtitle={heroSubtitle}
          settings={settings}
          projects={allProjects}
          locale={locale}
          pillarTitles={{
            digitalPlatforms: dpTitle,
            technicalStudies: tsTitle,
            projectImplementation: piTitle,
            clientAdvisory: caTitle,
            capacityBuilding: cbTitle,
            stakeholderConvenings: scTitle,
          }}
        />
      </Suspense>
    </>
  )
}
