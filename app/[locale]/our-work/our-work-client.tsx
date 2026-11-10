'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
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
  Download,
  FolderOpen,
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { RollingText } from '@/components/ui/rolling-text'
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
}

export default function OurWorkClient({
  heroTitle,
  heroSubtitle,
  settings,
  projects = [],
  locale = 'en',
  pillarTitles,
}: OurWorkClientProps) {
  const [activePillarFilter, setActivePillarFilter] = useState<string>('all')

  // The Six Core Pillars with Complete Advisory Metadata
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
      {/* ─── 1. EDITORIAL HERO & STRATEGIC POSITIONING ─── */}
      <section className="relative w-full pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-black/[0.08]">
        {/* Subtle radial ambient atmosphere */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary-green/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C29B38]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
            {/* Left Column: Heading and Mission */}
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

              {/* Jump Navigation to the 6 Pillars */}
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal/50 block mb-2.5">
                  Direct Jump to Advisory Practice:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  {pillars.map((p) => (
                    <a
                      key={p.id}
                      href={`#pillar-${p.slug}`}
                      className="px-3.5 py-1.5 rounded-full bg-white border border-black/10 hover:border-deep-forest hover:bg-deep-forest hover:text-white transition-all duration-200 shadow-xs font-medium"
                    >
                      <span className="text-primary-green font-mono mr-1">#{p.number}</span>
                      <span>{p.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Track Record Telemetry Strip */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-[440px] shrink-0"
            >
              <div className="p-7 sm:p-8 rounded-[32px] bg-white border border-black/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
                <div className="border-b border-black/[0.06] pb-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-charcoal/60 block">
                    Institutional Record
                  </span>
                  <h2 className="font-serif font-bold text-xl text-deep-forest mt-0.5">
                    Demonstrated Impact Across Africa
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest">
                      {settings.projectsManagedCount || '350+'}
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Projects & Technical Engagements
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest">
                      {settings.countriesCount || '22'}
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Sub-Saharan African Nations
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest">
                      {settings.seedCompaniesCount || '100+'}
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Seed Enterprises & Institutions
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-serif font-bold text-3xl sm:text-4xl text-[#C29B38]">
                      {settings.yearsExperience || '25+'}
                    </span>
                    <p className="text-xs text-charcoal/70 font-medium leading-tight">
                      Years of Seed Sector Specialization
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-xs text-charcoal/60 font-medium">Bilingual Advisory (EN / FR)</span>
                  <Link
                    href="/our-impact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:underline"
                  >
                    <span>View Map Telemetry</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 2. ARCHITECTURAL PILLAR GRAPH & INTERACTIVE MATRIX ─── */}
      <section className="sticky top-16 z-30 w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-black/[0.08] py-4 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal/60 shrink-0">
              Filter Practice:
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActivePillarFilter('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
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

      {/* ─── 3. THE 6 PILLARS WITH NESTED CASE STUDIES ─── */}
      <div className="space-y-24 lg:space-y-36 py-20 lg:py-28">
        {visiblePillars.map((pillar, pIdx) => {
          // Get specific projects/case studies belonging to this pillar
          const pillarProjects = projects.filter((proj) => proj.category === pillar.slug)

          return (
            <section
              key={pillar.id}
              id={`pillar-${pillar.slug}`}
              className="scroll-mt-36 w-full"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
                {/* Pillar Header Card: Dual-Column Magazine Layout */}
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

                {/* Nested Case Studies Under This Specific Pillar */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <FolderOpen size={16} className="text-primary-green" />
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-deep-forest">
                        Case Studies & Field Assignments: {pillar.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-charcoal/60 bg-white border border-black/[0.08] px-3 py-1 rounded-full">
                      {pillarProjects.length} Verified {pillarProjects.length === 1 ? 'Record' : 'Records'}
                    </span>
                  </div>

                  {pillarProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                      {pillarProjects.map((project) => {
                        const title = locale === 'fr' ? project.titleFr || project.titleEn : project.titleEn
                        const desc = locale === 'fr' ? project.descFr || project.descEn : project.descEn

                        return (
                          <article
                            key={project.id}
                            className="group rounded-3xl bg-white border border-black/[0.08] hover:border-deep-forest/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
                          >
                            {/* Case Study Image Thumbnail */}
                            {project.imageUrl && (
                              <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0EDE4] border-b border-black/[0.06]">
                                <Image
                                  src={project.imageUrl}
                                  alt={title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}

                            {/* Case Study Metadata & Narrative */}
                            <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-4">
                              <div className="flex items-center justify-between gap-2 text-xs">
                                {project.client && (
                                  <span className="font-bold text-primary-green uppercase tracking-wider text-[11px] truncate">
                                    {project.client}
                                  </span>
                                )}
                                {project.year && (
                                  <span className="text-charcoal/50 text-[11px] font-mono shrink-0">
                                    {project.year}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-serif font-bold text-lg text-deep-forest leading-snug group-hover:text-primary-green transition-colors">
                                {title}
                              </h4>

                              <p className="text-xs text-charcoal/75 font-light leading-relaxed flex-1 line-clamp-3">
                                {desc}
                              </p>

                              {project.link && (
                                <div className="pt-3 border-t border-black/[0.06] mt-auto">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                                  >
                                    <span>Access Case Study & Documentation</span>
                                    <ExternalLink size={12} />
                                  </a>
                                </div>
                              )}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-8 rounded-2xl bg-white border border-dashed border-black/15 text-center space-y-2">
                      <p className="text-xs text-charcoal/60">
                        Institutional projects for this pillar are managed via the CMS.
                      </p>
                      <Link
                        href={pillar.link}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:underline"
                      >
                        <span>View Pillar Portal</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      {/* ─── 4. PAN-AFRICAN GEOGRAPHIC REACH & CONTINENTAL MAP ─── */}
      <section className="w-full py-20 bg-[#F4F7EE] border-y border-black/[0.08]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green">
                Continental Depth
              </span>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight leading-tight"
                style={{ fontSize: 'clamp(2rem, 1.4rem + 2vw, 3.25rem)' }}
              >
                Deep In-Country Execution Across 22 African Nations
              </h2>
              <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
                From Kenya, Tanzania, and Rwanda to Ghana, Nigeria, and Mali, our experts bridge local field realities with national regulatory architectures and regional seed harmonization treaties.
              </p>
              <div className="pt-2">
                <Link
                  href="/our-impact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-deep-forest text-white font-bold text-xs hover:bg-deep-forest/90 transition-all shadow-md"
                >
                  <RollingText className="gap-2">
                    Open Interactive Pan-African Map
                    <ArrowRight size={14} />
                  </RollingText>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-[32px] bg-white border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.03)] space-y-6">
                <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-charcoal/60">
                    Regional Footprint
                  </span>
                  <span className="text-xs font-bold text-primary-green">Active Operations</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.06]">
                    <span className="font-bold text-deep-forest block text-sm">East Africa</span>
                    <span className="text-charcoal/70 text-[11px]">Kenya, Tanzania, Uganda, Rwanda, Ethiopia, Burundi</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.06]">
                    <span className="font-bold text-deep-forest block text-sm">West Africa</span>
                    <span className="text-charcoal/70 text-[11px]">Ghana, Nigeria, Mali, Burkina Faso, Senegal, Sierra Leone</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.06]">
                    <span className="font-bold text-deep-forest block text-sm">Southern Africa</span>
                    <span className="text-charcoal/70 text-[11px]">Zambia, Malawi, Mozambique, Zimbabwe</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/[0.06]">
                    <span className="font-bold text-deep-forest block text-sm">Central Africa</span>
                    <span className="text-charcoal/70 text-[11px]">Democratic Republic of Congo (DRC)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. EXECUTIVE COMMISSION & CONSULTATION CTA ─── */}
      <section className="w-full relative overflow-hidden bg-deep-forest text-white py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(58,180,74,0.18),_transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(194,155,56,0.12),_transparent_60%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider">
            <span>Collaborate With Agri Experience</span>
          </div>

          <h2
            className="font-serif font-bold text-white tracking-tight max-w-4xl mx-auto leading-tight"
            style={{ fontSize: 'clamp(2.25rem, 1.8rem + 2.5vw, 4.5rem)' }}
          >
            Ready to Partner on Resilient Agricultural Transformation?
          </h2>

          <p className="text-white/80 font-normal text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you are commissioning a technical scoping study, seeking advisory on seed policy reform, or deploying open-access digital platforms, our senior specialists are ready to collaborate.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-white text-deep-forest hover:bg-primary-green hover:text-white transition-all duration-300 font-bold text-sm shadow-xl"
            >
              <RollingText className="gap-2">
                Initiate a Consultation
                <ArrowRight size={16} />
              </RollingText>
            </Link>

            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors font-bold text-sm"
            >
              <RollingText className="gap-2">
                Browse Research Publications
                <ExternalLink size={15} />
              </RollingText>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
