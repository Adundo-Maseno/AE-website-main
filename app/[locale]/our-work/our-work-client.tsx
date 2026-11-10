'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles,
  Target,
  FileText,
  Users,
  Compass,
  Building,
  MonitorSmartphone,
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  FolderOpen,
  Globe2,
  Workflow,
  Star,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { RollingText } from '@/components/ui/rolling-text'
import { ConsultingCTA } from '@/components/ui/consulting-cta'
import type { ProjectItem } from '@/lib/services/projects-service'
import type { SiteSettingsData } from '@/lib/services/settings-service'

interface PillarDefinition {
  id: string
  number: string
  title: string
  category: string
  slug: string
  link: string
  heroImage: string
  description: string
  methodology: string
  coreOutputs: string[]
  clientSponsors: string[]
}

interface OurWorkClientProps {
  heroTitle: string
  heroSubtitle: string
  settings: SiteSettingsData
  projects: ProjectItem[]
  locale: string
  pillarTitles: {
    digitalPlatforms: string
    technicalStudies: string
    projectImplementation: string
    clientAdvisory: string
    capacityBuilding: string
    stakeholderConvenings: string
  }
  pillarSubtitles?: {
    digitalPlatforms?: string | null
    technicalStudies?: string | null
    projectImplementation?: string | null
    clientAdvisory?: string | null
    capacityBuilding?: string | null
    stakeholderConvenings?: string | null
  }
}

export default function OurWorkClient({
  heroTitle,
  heroSubtitle,
  settings,
  projects = [],
  locale = 'en',
  pillarTitles,
  pillarSubtitles,
}: OurWorkClientProps) {
  const [activePillarFilter, setActivePillarFilter] = useState<string>('all')

  // The Six Core Consulting Practices with CMS fallbacks
  const pillars: PillarDefinition[] = [
    {
      id: 'digital-platforms',
      number: '01',
      title: pillarTitles.digitalPlatforms,
      category: 'Technology & Open Data',
      slug: 'digital-platforms',
      link: '/our-work/digital-platforms',
      heroImage: '/platforms/mbeguchoice.png',
      description:
        pillarSubtitles?.digitalPlatforms ||
        'Pioneering digital public infrastructure, open data catalogs, and mobile feedback systems that connect breeders, national regulators, agrodealers, and smallholder farmers with verified crop variety information and market transparency.',
      methodology:
        'Database architecture, API gazette integration, user-centric mobile UI design (USSD/web), and real-time farmer feedback loops.',
      coreOutputs: [
        'National crop variety selectors (MbeguChoice)',
        'Regional agronomic variety databases (ACVC)',
        'Official gazetted seed registries & APIs (KPVL)',
        'Anti-counterfeit SMS reporting solutions (M3)',
      ],
      clientSponsors: ['KEPHIS', 'USAID', 'AGRA', 'Kenya Markets Trust', 'TOSCI'],
    },
    {
      id: 'technical-studies',
      number: '02',
      title: pillarTitles.technicalStudies,
      category: 'Market Diagnostics & Evidence',
      slug: 'technical-studies',
      link: '/our-work/technical-studies',
      heroImage: '/resources/previews/preview-pasture-fodder.jpg',
      description:
        pillarSubtitles?.technicalStudies ||
        'Empirical market diagnostics, commercial feasibility studies, and value chain assessments that uncover systemic market bottlenecks and provide evidence-based roadmaps for institutional and private sector investment.',
      methodology:
        'Field sampling across high-potential agricultural counties, stakeholder interviews, policy audits, financial modeling, and peer-reviewed scoping.',
      coreOutputs: [
        'Commercial fodder and pasture seed market scoping',
        'Private horticulture seedling nursery business models',
        'Vegetative value-chain crop planting material diagnostics',
        'Agrodealer association institutional assessments',
      ],
      clientSponsors: ['USAID KCDMS', 'RTI International', 'ACTESA / COMESA'],
    },
    {
      id: 'project-implementation',
      number: '03',
      title: pillarTitles.projectImplementation,
      category: 'Field Systems Reform',
      slug: 'project-implementation',
      link: '/our-work/project-implementation',
      heroImage: '/pexels-equalstock-27722065.jpg',
      description:
        pillarSubtitles?.projectImplementation ||
        'Multi-year field program management, regulatory restructuring, and supply chain deployment that translates high-level development strategies into verified, measurable seed sector transformation on the ground.',
      methodology:
        'Institutional restructuring, decentralized quality assurance, authorized inspector training, public-private operational alignment, and last-mile agrodealer distribution.',
      coreOutputs: [
        'Tanzania Seed Systems Transformation multi-year reform',
        'Decentralization of TOSCI inspector verification protocols',
        'Authorized private inspector pilot programs',
        'Standard seed class commercial multiplication rollouts',
      ],
      clientSponsors: ['USAID', 'CRS', 'Ministry of Agriculture Tanzania', 'Feed the Future'],
    },
    {
      id: 'client-advisory',
      number: '04',
      title: pillarTitles.clientAdvisory,
      category: 'Strategic & Regulatory Reform',
      slug: 'client-advisory',
      link: '/our-work/client-advisory',
      heroImage: '/pexels-elvis-kambire-434351765-38025863.jpg',
      description:
        pillarSubtitles?.clientAdvisory ||
        'High-level strategic counsel assisting ministries of agriculture, national seed authorities, and international development organizations in streamlining variety release protocols, removing regulatory friction, and crafting public-private frameworks.',
      methodology:
        'Legislative drafting, regulatory impact assessments, comparative regional benchmarking, and public-private dialogue architecture.',
      coreOutputs: [
        'KEPHIS regulatory modernization and authorized inspector frameworks',
        'National variety release timeframe streamlining strategies',
        'Regional seed trade and quarantine protocol harmonization',
        'Public-private seed enterprise partnership governance',
      ],
      clientSponsors: ['KEPHIS', 'STAK', 'Ministry of Agriculture Kenya', 'AGRA'],
    },
    {
      id: 'capacity-building',
      number: '05',
      title: pillarTitles.capacityBuilding,
      category: 'Executive Leadership & Training',
      slug: 'capacity-building',
      link: '/our-work/capacity-building',
      heroImage: '/images/african-seed-company-toolbox-cover.jpg',
      description:
        pillarSubtitles?.capacityBuilding ||
        'Standardized management toolkits, accredited professional training, and practical operational guides engineered to build world-class leadership capacity across emerging African seed enterprises, outgrowers, and regulatory inspectors.',
      methodology:
        'Interactive case-method workshops, practical field evaluation modules, financial tools, and institutional accreditation exams.',
      coreOutputs: [
        'The African Seed Company Toolbox (52 Tools) with Gates Foundation',
        'Authorized Seed Inspector accreditation curriculum',
        'Seed outgrower management and contracting modules',
        'Women and youth agri-enterprise leadership development',
      ],
      clientSponsors: ['Bill & Melinda Gates Foundation', 'KEPHIS', 'AGRA', 'STAK'],
    },
    {
      id: 'stakeholder-convenings',
      number: '06',
      title: pillarTitles.stakeholderConvenings,
      category: 'High-Trust Neutral Forums',
      slug: 'stakeholder-convenings',
      link: '/our-work/stakeholder-convenings',
      heroImage: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
      description:
        pillarSubtitles?.stakeholderConvenings ||
        'Neutral, high-trust mediation and multi-stakeholder roundtables uniting public regulators, commercial seed companies, research institutes, and farmer advocates to break policy deadlocks and achieve consensus on critical seed reforms.',
      methodology:
        'Chatham House rule roundtables, technical briefing papers, structured dispute resolution, and joint public-private action plans.',
      coreOutputs: [
        'National Seed Industry Policy & Trade Roundtables',
        'Cross-border seed quarantine and movement symposia',
        'Regulator-breeder commercialization consultations',
        'Regional seed association consensus declarations',
      ],
      clientSponsors: ['Kenya Markets Trust', 'STAK', 'East African Seed Regulators'],
    },
  ]

  // Filter pillars if single filter selected
  const visiblePillars =
    activePillarFilter === 'all'
      ? pillars
      : pillars.filter((p) => p.slug === activePillarFilter)

  return (
    <main className="bg-[#FAF9F5] min-h-[100dvh] text-deep-forest selection:bg-primary-green selection:text-white">
      {/* ─── 1. EDITORIAL HERO & PRACTICE ARCHITECTURE ─── */}
      <section className="relative w-full pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-black/[0.08]">
        {/* Subtle radial ambient atmosphere */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary-green/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C29B38]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
            {/* Left Column: Heading and Positioning */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-deep-forest/5 border border-deep-forest/10 text-deep-forest text-xs font-semibold tracking-wider uppercase">
                <Sparkles size={13} className="text-[#C29B38]" />
                <span>Pan-African Seed Systems Advisory</span>
              </div>

              <h1
                className="font-serif font-bold text-deep-forest tracking-tight leading-[1.08]"
                style={{ fontSize: 'clamp(2.25rem, 1.8rem + 2.8vw, 4.75rem)' }}
              >
                {heroTitle}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 leading-relaxed font-normal max-w-2xl">
                {heroSubtitle}
              </p>
            </motion.div>

            {/* Right Column: Practice Portfolio Telemetry (Distinct from Site Overview Stats) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[460px] shrink-0"
            >
              <div className="p-7 sm:p-8 rounded-[32px] bg-white border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
                <div className="border-b border-black/[0.06] pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 block">
                    Practice Portfolio
                  </span>
                  <h2 className="font-serif font-bold text-xl text-deep-forest mt-0.5">
                    Integrated Consulting Architecture
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest">
                      6
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Specialized Consulting Pillars
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest">
                      {projects.length || 15}+
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Documented Case Studies & Tools
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-primary-green">
                      100%
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Open Access Public Goods
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#C29B38]">
                      EN / FR
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Bilingual Sub-Saharan Delivery
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-charcoal/60 font-medium">Dynamic CMS Managed Portfolio</span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:underline"
                  >
                    <span>Request Briefing</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. STICKY PRACTICE MATRIX BAR (SINGLE SOURCE OF NAVIGATION) ─── */}
      <section className="sticky top-16 z-30 w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-black/[0.08] py-4 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal/60 shrink-0">
              Select Practice:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActivePillarFilter('all')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activePillarFilter === 'all'
                    ? 'bg-deep-forest text-white shadow-xs'
                    : 'bg-white text-charcoal/70 border border-black/10 hover:border-black/30'
                }`}
              >
                All 6 Pillars
              </button>
              {pillars.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActivePillarFilter(p.slug)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePillarFilter === p.slug
                      ? 'bg-deep-forest text-white shadow-xs'
                      : 'bg-white text-charcoal/70 border border-black/10 hover:border-black/30'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">#{p.number}</span>
                  <span>{p.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THE 6 PILLARS: EXECUTIVE DOSSIER & FLAGSHIP SPOTLIGHT ─── */}
      <div className="space-y-24 lg:space-y-36 py-20 lg:py-28">
        {visiblePillars.map((pillar) => {
          // Get specific projects/case studies belonging to this pillar
          const pillarProjects = projects.filter((proj) => proj.category === pillar.slug)
          const flagship = pillarProjects[0]
          const otherProjects = pillarProjects.slice(1)

          return (
            <section
              key={pillar.id}
              id={`pillar-${pillar.slug}`}
              className="scroll-mt-36 w-full"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
                {/* 3A. Pillar Magazine Header Card */}
                <div className="rounded-[40px] bg-white border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 lg:p-12">
                    {/* Left: Visual Photography / Platform Screenshot */}
                    <div className="lg:col-span-5 relative">
                      <div className="relative aspect-[16/11] rounded-[28px] overflow-hidden bg-[#F0EDE4] border border-black/[0.08] shadow-md group">
                        <Image
                          src={pillar.heroImage}
                          alt={pillar.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent pointer-events-none" />

                        {/* Top Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-deep-forest shadow-xs">
                            Pillar {pillar.number}
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest/85 text-white">
                            {pillar.category}
                          </span>
                        </div>

                        {/* Bottom Partner Sponsors */}
                        <div className="absolute bottom-4 left-4 right-4 text-[11px] text-white/90">
                          <span className="font-mono uppercase text-[10px] text-white/60 block">Key Partners:</span>
                          <p className="font-medium truncate drop-shadow-sm">
                            {pillar.clientSponsors.join(' • ')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right: Narrative, Scope, and Practice Portal Action */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-primary-green uppercase tracking-wider">
                            Pillar {pillar.number} Practice Dossier
                          </span>
                        </div>
                        <h2
                          className="font-serif font-bold text-deep-forest tracking-tight leading-tight"
                          style={{ fontSize: 'clamp(1.875rem, 1.4rem + 1.8vw, 3.25rem)' }}
                        >
                          {pillar.title}
                        </h2>
                        <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-normal">
                          {pillar.description}
                        </p>
                      </div>

                      {/* Methodology & Interventions Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/[0.06]">
                        <div className="space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50 block">
                            Core Advisory Scope:
                          </span>
                          <ul className="space-y-1.5 text-xs text-charcoal/80">
                            {pillar.coreOutputs.map((out, oIdx) => (
                              <li key={oIdx} className="flex items-start gap-2">
                                <CheckCircle2 size={13} className="text-primary-green shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{out}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="space-y-2 bg-[#FAF9F5] p-4 rounded-2xl border border-black/[0.06]">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50 block">
                            Delivery Methodology:
                          </span>
                          <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                            {pillar.methodology}
                          </p>
                        </div>
                      </div>

                      {/* Practice Portal Deep-Dive Button */}
                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link
                          href={pillar.link}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-forest text-white hover:bg-deep-forest/90 font-bold text-xs transition-all shadow-xs"
                        >
                          <RollingText className="gap-2">
                            <span>Open Dedicated {pillar.title} Practice Portal</span>
                            <ArrowRight size={14} />
                          </RollingText>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3B. Flagship Case Study Spotlight & Evidence Directory (Prevents duplicate card dumping) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  {/* Left: Flagship Case Study Spotlight */}
                  {flagship ? (
                    <div className="lg:col-span-7 rounded-[32px] bg-white border border-black/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
                      <div>
                        <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-green/10 text-primary-green text-xs font-bold uppercase tracking-wider">
                            <Star size={12} className="fill-primary-green text-primary-green" />
                            <span>Flagship Practice Assignment</span>
                          </div>
                          {flagship.year && (
                            <span className="font-mono text-xs text-charcoal/50">
                              {flagship.year}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 items-start">
                          {flagship.imageUrl && (
                            <div className="relative w-full sm:w-44 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 bg-[#F0EDE4] border border-black/[0.06]">
                              <Image
                                src={flagship.imageUrl}
                                alt={flagship.titleEn}
                                fill
                                sizes="(max-width: 640px) 100vw, 180px"
                                className="object-cover"
                              />
                            </div>
                          )}

                          <div className="space-y-2 flex-1">
                            {flagship.client && (
                              <span className="font-bold text-primary-green uppercase text-[11px] tracking-wider block">
                                {flagship.client}
                              </span>
                            )}
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-deep-forest leading-snug">
                              {locale === 'fr' ? flagship.titleFr || flagship.titleEn : flagship.titleEn}
                            </h3>
                            <p className="text-xs sm:text-sm text-charcoal/75 font-light leading-relaxed line-clamp-3">
                              {locale === 'fr' ? flagship.descFr || flagship.descEn : flagship.descEn}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-black/[0.06] mt-6 flex items-center justify-between">
                        {flagship.link ? (
                          <a
                            href={flagship.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                          >
                            <span>Access Assignment Brief</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span className="text-xs text-charcoal/50 font-light">
                            Featured Institutional Case Study
                          </span>
                        )}

                        <Link
                          href={pillar.link}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary-green hover:underline"
                        >
                          <span>Explore Details in Pillar Portal</span>
                          <ChevronRight size={13} />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="lg:col-span-7 rounded-[32px] bg-white border border-dashed border-black/15 p-8 flex items-center justify-center text-center">
                      <p className="text-xs text-charcoal/60">
                        Assignments for this practice are managed dynamically in the CMS.
                      </p>
                    </div>
                  )}

                  {/* Right: Practice Evidence Directory Card */}
                  <div className="lg:col-span-5 rounded-[32px] bg-[#F4F7EE] border border-black/[0.08] p-6 sm:p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-black/[0.08] pb-3">
                        <div className="flex items-center gap-2">
                          <FolderOpen size={16} className="text-primary-green" />
                          <h4 className="font-serif font-bold text-base sm:text-lg text-deep-forest">
                            Practice Directory
                          </h4>
                        </div>
                        <span className="font-mono text-xs font-bold text-charcoal/60 px-2.5 py-0.5 rounded-full bg-white border border-black/10">
                          {pillarProjects.length} {pillarProjects.length === 1 ? 'Record' : 'Records'}
                        </span>
                      </div>

                      <p className="text-xs text-charcoal/70 font-normal leading-relaxed">
                        Complete research documents, digital registries, and scoping tools published under {pillar.title}:
                      </p>

                      {/* Compact List of Additional Assignments (No duplicate full cards!) */}
                      <div className="space-y-2 pt-1">
                        {otherProjects.length > 0 ? (
                          otherProjects.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="p-3 rounded-2xl bg-white border border-black/[0.06] hover:border-deep-forest/30 transition-all flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="space-y-0.5 truncate">
                                <span className="font-bold text-deep-forest block truncate">
                                  {locale === 'fr' ? item.titleFr || item.titleEn : item.titleEn}
                                </span>
                                {item.client && (
                                  <span className="text-[10px] text-charcoal/50 font-mono block truncate">
                                    {item.client}
                                  </span>
                                )}
                              </div>
                              <Link
                                href={pillar.link}
                                className="shrink-0 p-1.5 rounded-full bg-black/5 hover:bg-deep-forest hover:text-white transition-colors"
                              >
                                <ChevronRight size={13} />
                              </Link>
                            </div>
                          ))
                        ) : (
                          <div className="p-3 rounded-2xl bg-white/70 border border-black/[0.06] text-xs text-charcoal/60 text-center">
                            Primary assignment showcased on left.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-black/[0.08] mt-6">
                      <Link
                        href={pillar.link}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-deep-forest text-white hover:bg-deep-forest/90 font-bold text-xs transition-all shadow-xs"
                      >
                        <RollingText className="gap-2">
                          <span>View Full {pillar.title} Dossier ({pillarProjects.length} Records)</span>
                          <ArrowRight size={13} />
                        </RollingText>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* ─── 4. INTEGRATED METHODOLOGY: HOW OUR 6 PRACTICES REINFORCE EACH OTHER ─── */}
      <section className="w-full py-20 bg-white border-y border-black/[0.08]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green">
              Systems Integration
            </span>
            <h2
              className="font-serif font-bold text-deep-forest tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2rem, 1.5rem + 1.8vw, 3.25rem)' }}
            >
              How Our Six Practices Connect for Systemic Impact
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed font-normal">
              Unlike single-focus firms, Agri Experience combines diagnostic evidence, ministerial policy reform, and digital deployment in a continuous, reinforcing lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-[32px] bg-[#FAF9F5] border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green">
                <FileText size={22} />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal/50 block">
                Phase 01: Evidence
              </span>
              <h3 className="font-serif font-bold text-xl text-deep-forest">
                Technical Studies & Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                Empirical field research, commercial nursery economics, and value chain assessments identifying systemic root bottlenecks prior to capital investment.
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-[#FAF9F5] border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#C29B38]/15 flex items-center justify-center text-[#C29B38]">
                <Users size={22} />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal/50 block">
                Phase 02: Consensus
              </span>
              <h3 className="font-serif font-bold text-xl text-deep-forest">
                Advisory & Stakeholder Convenings
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                Facilitating high-trust public-private dialogue, drafting gazetted regulations, and aligning seed authorities with international trade standards.
              </p>
            </div>

            <div className="p-8 rounded-[32px] bg-[#FAF9F5] border border-black/[0.08] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-deep-forest/10 flex items-center justify-center text-deep-forest">
                <Workflow size={22} />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal/50 block">
                Phase 03: Scale
              </span>
              <h3 className="font-serif font-bold text-xl text-deep-forest">
                Implementation & Digital Platforms
              </h3>
              <p className="text-xs sm:text-sm text-charcoal/80 font-light leading-relaxed">
                Rolling out decentralized quality inspections, training enterprise leadership via the Toolbox, and launching open-access national crop variety databases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. EXECUTIVE COMMISSION & CONSULTATION CTA ─── */}
      <ConsultingCTA
        tag="Collaborate With Agri Experience"
        title="Ready to Partner on Resilient Agricultural Transformation?"
        description="Whether you are commissioning a technical scoping study, seeking advisory on seed policy reform, or deploying open-access digital platforms, our senior specialists are ready to collaborate."
        primaryButton={{
          label: 'Initiate a Consultation',
          href: '/contact',
        }}
        secondaryButton={{
          label: 'Browse Research Publications',
          href: '/resources',
        }}
      />
    </main>
  )
}
