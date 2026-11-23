import { getTranslations } from 'next-intl/server'
import { getPageSections } from '@/lib/services/page-sections-service'
import { getWorkMilestones } from '@/lib/services/milestones-service'
import OurWorkContent, { type ServiceCardItem } from '@/components/our-work/our-work-content'

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

  const cards: ServiceCardItem[] = [
    {
      slug: 'digital-platforms',
      title: dpTitle,
      description: t('c1_desc'),
      mobileDescription: t('c1_mobile_desc'),
      link: '/our-work/digital-platforms',
      borderClass: 'border-emerald-200/90 hover:border-emerald-500',
      textClass: 'text-emerald-950',
      cardBgClass: 'bg-[#F0F9F4] hover:bg-white',
      btnBgClass: 'bg-emerald-700 text-white group-hover:bg-emerald-800',
    },
    {
      slug: 'technical-studies',
      title: tsTitle,
      description: t('c2_desc'),
      mobileDescription: t('c2_mobile_desc'),
      link: '/our-work/technical-studies',
      borderClass: 'border-sky-200/90 hover:border-sky-500',
      textClass: 'text-slate-950',
      cardBgClass: 'bg-[#F0F6FA] hover:bg-white',
      btnBgClass: 'bg-sky-700 text-white group-hover:bg-sky-800',
    },
    {
      slug: 'project-implementation',
      title: piTitle,
      description: t('c3_desc'),
      mobileDescription: t('c3_mobile_desc'),
      link: '/our-work/project-implementation',
      borderClass: 'border-[#1A4D2E]/25 hover:border-[#1A4D2E]/70',
      textClass: 'text-[#123821]',
      cardBgClass: 'bg-[#EDF3EF] hover:bg-white',
      btnBgClass: 'bg-[#1A4D2E] text-white group-hover:bg-[#123821]',
    },
    {
      slug: 'client-advisory',
      title: caTitle,
      description: t('c4_desc'),
      mobileDescription: t('c4_mobile_desc'),
      link: '/our-work/client-advisory',
      borderClass: 'border-lime-200/90 hover:border-lime-600',
      textClass: 'text-[#233110]',
      cardBgClass: 'bg-[#F4F7EE] hover:bg-white',
      btnBgClass: 'bg-[#435826] text-white group-hover:bg-[#34441B]',
    },
    {
      slug: 'capacity-building',
      title: cbTitle,
      description: t('c5_desc'),
      mobileDescription: t('c5_mobile_desc'),
      link: '/our-work/capacity-building',
      borderClass: 'border-orange-200/90 hover:border-orange-500',
      textClass: 'text-[#451A03]',
      cardBgClass: 'bg-[#FAF0E9] hover:bg-white',
      btnBgClass: 'bg-[#9A3412] text-white group-hover:bg-[#7C2D12]',
    },
    {
      slug: 'stakeholder-convenings',
      title: scTitle,
      description: t('c6_desc'),
      mobileDescription: t('c6_mobile_desc'),
      link: '/our-work/stakeholder-convenings',
      borderClass: 'border-teal-200/90 hover:border-teal-500',
      textClass: 'text-teal-950',
      cardBgClass: 'bg-[#EDF7F7] hover:bg-white',
      btnBgClass: 'bg-teal-700 text-white group-hover:bg-teal-800',
    },
  ]

  return (
    <OurWorkContent
      locale={locale}
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      learnMoreLabel={t('learn_more')}
      cards={cards}
      milestones={milestones}
    />
  )
}
