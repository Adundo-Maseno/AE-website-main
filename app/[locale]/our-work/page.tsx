import { getTranslations } from 'next-intl/server'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getWorkMilestones } from '@/lib/services/milestones-service'
import OurWorkContent, { type PracticeAreaInfo } from '@/components/our-work/our-work-content'

export const revalidate = 0 // Dynamic on-demand revalidation

export default async function OurWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [t, sections, milestones] = await Promise.all([
    getTranslations({ locale, namespace: 'OurWork' }),
    getPageSections('our-work'),
    getWorkMilestones(),
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

  const practiceAreas: PracticeAreaInfo[] = [
    {
      slug: 'digital-platforms',
      title: dpTitle,
      description: t('c1_desc'),
      link: '/our-work/digital-platforms',
    },
    {
      slug: 'technical-studies',
      title: tsTitle,
      description: t('c2_desc'),
      link: '/our-work/technical-studies',
    },
    {
      slug: 'project-implementation',
      title: piTitle,
      description: t('c3_desc'),
      link: '/our-work/project-implementation',
    },
    {
      slug: 'client-advisory',
      title: caTitle,
      description: t('c4_desc'),
      link: '/our-work/client-advisory',
    },
    {
      slug: 'capacity-building',
      title: cbTitle,
      description: t('c5_desc'),
      link: '/our-work/capacity-building',
    },
    {
      slug: 'stakeholder-convenings',
      title: scTitle,
      description: t('c6_desc'),
      link: '/our-work/stakeholder-convenings',
    },
  ]

  return (
    <OurWorkContent
      locale={locale}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      learnMoreLabel={t('learn_more')}
      practiceAreas={practiceAreas}
      milestones={milestones}
    />
  )
}
