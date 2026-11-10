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
} from 'lucide-react'
import { Link } from '@/i18n/routing'
import { RollingText } from '@/components/ui/rolling-text'
import type { ProjectItem } from '@/lib/services/projects-service'
import type { SiteSettingsData } from '@/lib/services/settings-service'

interface PillarItem {
  id: string
  number: string
  title: string
  category: string
  link: string
  image: string
  description: string
  deliverables: string[]
  statsHighlight: string
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
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0)
  const [selectedCaseStudyCategory, setSelectedCaseStudyCategory] = useState<string>('all')

  // The 6 Strategic Consulting Pillars
  const pillars: PillarItem[] = [
    {
      id: 'digital-platforms',
      number: '01',
      title: pillarTitles.digitalPlatforms,
      category: 'Technology & Open Data',
      link: '/our-work/digital-platforms',
      image: '/platforms/mbeguchoice.png',
      description:
        'Pioneering digital public infrastructure that connects breeders, regulators, and smallholder farmers with verified seed data and market transparency.',
      deliverables: [
        'MbeguChoice Variety Selector',
        'Africa Crop Variety Catalogue (ACVC)',
        'Kenya Plant Variety List Gazette API',
        'Mulika Mbegu Mbovu (M3) SMS Counterfeit Reporting',
      ],
      statsHighlight: '6 Digital Platforms Deployed Across 4 Nations',
    },
    {
      id: 'technical-studies',
      number: '02',
      title: pillarTitles.technicalStudies,
      category: 'Market Diagnostics & Evidence',
      link: '/our-work/technical-studies',
      image: '/resources/previews/preview-pasture-fodder.jpg',
      description:
        'Empirical, peer-reviewed market diagnostics, feasibility assessments, and value chain analyses that translate intricate systemic barriers into actionable roadmaps.',
      deliverables: [
        'Pasture & Fodder Commercial Seed Scoping',
        'Horticulture Nursery Viability Business Models',
        'Value Chain Crop Planting Material Diagnostics',
        'Agrodealer Association Institutional Assessments',
      ],
      statsHighlight: '15+ Comprehensive Scoping Reports Published',
    },
    {
      id: 'project-implementation',
      number: '03',
      title: pillarTitles.projectImplementation,
      category: 'Field Systems Reform',
      link: '/our-work/project-implementation',
      image: '/pexels-equalstock-27722065.jpg',
      description:
        'Hands-on operational management and program delivery that transforms high-level development strategies into verified on-the-ground seed sector reforms.',
      deliverables: [
        'Tanzania Multi-Year Seed Systems Transformation',
        'Decentralized Private Seed Inspection Pilots',
        'Standard Seed Class Commercial Multiplication',
        'Last-Mile Agrodealer Distribution Networks',
      ],
      statsHighlight: '120,000+ Smallholders Reached with Quality Seed',
    },
    {
      id: 'client-advisory',
      number: '04',
      title: pillarTitles.clientAdvisory,
      category: 'Strategic & Regulatory Reform',
      link: '/our-work/client-advisory',
      image: '/pexels-elvis-kambire-434351765-38025863.jpg',
      description:
        'High-level counsel assisting ministries of agriculture, regulatory bodies, and development partners to streamline variety release and modernize policy.',
      deliverables: [
        'KEPHIS Regulatory Modernization Advisory',
        'National Variety Release Protocol Streamlining',
        'COMESA Regional Seed Trade Harmonization',
        'Public-Private Seed Partnership Governance',
      ],
      statsHighlight: '25+ Years High-Stakes Institutional Counsel',
    },
    {
      id: 'capacity-building',
      number: '05',
      title: pillarTitles.capacityBuilding,
      category: 'Executive Leadership & Training',
      link: '/our-work/capacity-building',
      image: '/images/african-seed-company-toolbox-cover.jpg',
      description:
        'World-class management curricula, practical field toolkits, and accreditation training strengthening the next generation of African seed enterprises.',
      deliverables: [
        'The African Seed Company Toolbox (52 Tools)',
        'Authorized Private Inspector Accreditation',
        'Seed Outgrower & Association Management Modules',
        'Women & Youth Seed Entrepreneurship Tracks',
      ],
      statsHighlight: '100+ Seed Companies Trained Across SSA',
    },
    {
      id: 'stakeholder-convenings',
      number: '06',
      title: pillarTitles.stakeholderConvenings,
      category: 'High-Trust Neutral Forums',
      link: '/our-work/stakeholder-convenings',
      image: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
      description:
        'Neutral, evidence-based mediation and roundtables bringing together public regulators, private seed enterprises, and civil society to unlock policy deadlocks.',
      deliverables: [
        'Seed Industry Policy & Trade Roundtables',
        'Cross-Border Quarantine & Movement Symposia',
        'Regional Seed Association Working Groups',
        'Government-Breeder Consensus Frameworks',
      ],
      statsHighlight: '100% Key National Seed Companies Represented',
    },
  ]

  // The 6-Stage Transformation Workflow / System Graph
  const workflowStages = [
    {
      stage: '01',
      title: 'Empirical Diagnostics & Scoping',
      pillar: 'Technical Studies',
      icon: Target,
      summary:
        'Rigorous baseline research and market mapping across target value chains to uncover systemic bottlenecks, informal seed flows, and commercial potential.',
      inputs: 'Field sampling, stakeholder interviews, policy audits, agro-ecological data',
      outcomes: 'Published scoping studies, investment memos, priority intervention matrices',
    },
    {
      stage: '02',
      title: 'Regulatory & Policy Architecture',
      pillar: 'Client Advisory',
      icon: Award,
      summary:
        'Structuring legislative amendments, simplified variety release protocols, and authorized inspection regulations with ministries and national seed boards.',
      inputs: 'Draft DDLs, regional trade treaties (COMESA/SADC), regulator capacity audits',
      outcomes: 'Gazetted standards, private inspector authorizations, reduced variety release latency',
    },
    {
      stage: '03',
      title: 'Decentralized Field Implementation',
      pillar: 'Project Implementation',
      icon: TrendingUp,
      summary:
        'Execution of multi-year field programs, managing decentralized certification hubs, breeder seed multiplication, and agrodealer licensing.',
      inputs: 'Foundation seed access, certified inspectors, regional logistics coordination',
      outcomes: 'Operational commercial supply chains, farmer adoption of certified seed',
    },
    {
      stage: '04',
      title: 'Digital Public Infrastructure',
      pillar: 'Digital Platforms',
      icon: MonitorSmartphone,
      summary:
        'Deploying open-access digital platforms, online variety selectors, and SMS feedback channels to eliminate market information asymmetries.',
      inputs: 'National variety gazettes, breeder performance data, USSD shortcodes',
      outcomes: 'Farmer decision-support tools (MbeguChoice), real-time counterfeit reporting (M3)',
    },
    {
      stage: '05',
      title: 'Enterprise & Institutional Capacity',
      pillar: 'Capacity Building',
      icon: BookOpen,
      summary:
        'Embedding management excellence into local seed companies, farmer associations, and inspection agencies using tested management toolkits.',
      inputs: 'African Seed Company Toolbox (52 Tools), accredited trainer curriculum',
      outcomes: 'Self-sustaining seed enterprises, qualified authorized private inspectors',
    },
    {
      stage: '06',
      title: 'Multi-Stakeholder Alignment & Scale',
      pillar: 'Stakeholder Convenings',
      icon: Users,
      summary:
        'Convening neutral, Chatham-House style roundtables with regulators, private seed leaders, and donors to break trade bottlenecks and review impact.',
      inputs: 'Trade dispute dossiers, regional quarantine lists, cross-sector working groups',
      outcomes: 'Bilateral seed trade pacts, policy harmonizations, sustained multi-actor trust',
    },
  ]

  // Filter case studies
  const filteredProjects =
    selectedCaseStudyCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCaseStudyCategory)

  // Categories list for tabs
  const categories = [
    { id: 'all', label: 'All Assignments' },
    { id: 'project-implementation', label: 'Implementation' },
    { id: 'client-advisory', label: 'Advisory' },
    { id: 'digital-platforms', label: 'Digital Platforms' },
    { id: 'technical-studies', label: 'Technical Studies' },
    { id: 'capacity-building', label: 'Capacity Building' },
    { id: 'stakeholder-convenings', label: 'Convenings' },
  ]

  return (
    <main className="bg-[#FAF9F5] min-h-[100dvh] text-deep-forest selection:bg-primary-green selection:text-white">
      {/* ─── 1. EDITORIAL HERO & STRATEGIC POSITIONING ─── */}
      <section className="relative w-full pt-20 lg:pt-32 pb-16 lg:pb-24 overflow-hidden border-b border-black/[0.08]">
        {/* Subtle radial ambient atmosphere */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary-green/[0.04] rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C29B38]/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
            {/* Left Narrative */}
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
                style={{ fontSize: 'clamp(2.25rem, 1.8rem + 2.8vw, 5rem)' }}
              >
                {heroTitle}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-charcoal/85 leading-relaxed font-normal max-w-2xl">
                {heroSubtitle}
              </p>

              {/* Jump Anchor Strip */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 text-xs font-medium">
                <a
                  href="#pillars"
                  className="px-4 py-2 rounded-full bg-white border border-black/10 hover:border-deep-forest hover:bg-deep-forest hover:text-white transition-all duration-200 shadow-xs"
                >
                  6 Strategic Pillars ↓
                </a>
                <a
                  href="#framework"
                  className="px-4 py-2 rounded-full bg-white border border-black/10 hover:border-deep-forest hover:bg-deep-forest hover:text-white transition-all duration-200 shadow-xs"
                >
                  Transformation Framework ↓
                </a>
                <a
                  href="#case-studies"
                  className="px-4 py-2 rounded-full bg-white border border-black/10 hover:border-deep-forest hover:bg-deep-forest hover:text-white transition-all duration-200 shadow-xs"
                >
                  Flagship Case Studies ↓
                </a>
              </div>
            </motion.div>

            {/* Right Telemetry Column: High-Credibility Institutional Track Record */}
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
                    Demonstrated Impact at Scale
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

      {/* ─── 2. THE 6 STRATEGIC CONSULTING PILLARS ─── */}
      <section id="pillars" className="w-full py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-14">
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green">
                Practice Architecture
              </span>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight leading-tight"
                style={{ fontSize: 'clamp(2rem, 1.5rem + 1.8vw, 3.5rem)' }}
              >
                Six Core Advisory Practices
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-charcoal/70 max-w-md leading-relaxed">
              Every assignment integrates specialized policy rigor, commercial acumen, and digital infrastructure to build resilient, farmer-first seed ecosystems.
            </p>
          </div>

          {/* Pillars 3x2 Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.article
                key={pillar.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group rounded-[32px] bg-white border border-black/[0.08] hover:border-deep-forest/40 hover:shadow-[0_20px_50px_rgba(15,36,23,0.08)] transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Media Header with Photography/Platform Preview */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0EDE4] border-b border-black/[0.06]">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/70 via-transparent to-transparent pointer-events-none" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-deep-forest shadow-xs">
                      Pillar {pillar.number}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest/80 backdrop-blur-md text-white">
                      {pillar.category}
                    </span>
                  </div>

                  {/* Bottom Stats Highlight on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-[11px] font-medium text-white/95 truncate drop-shadow-sm">
                    {pillar.statsHighlight}
                  </div>
                </div>

                {/* Editorial Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-deep-forest group-hover:text-primary-green transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-[13.5px] text-charcoal/80 font-normal leading-relaxed line-clamp-3">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Tangible Consulting Outputs */}
                  <div className="space-y-2 pt-4 border-t border-black/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50 block">
                      Core Interventions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal/85">
                      {pillar.deliverables.slice(0, 3).map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-primary-green shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Practice Portal Link */}
                  <div className="pt-4 border-t border-black/[0.06] mt-auto">
                    <Link
                      href={pillar.link}
                      className="group/link flex items-center justify-between w-full text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                    >
                      <span className="tracking-wide">Explore Practice & Case Studies</span>
                      <div className="w-8 h-8 rounded-full bg-deep-forest/5 group-hover/link:bg-deep-forest group-hover/link:text-white flex items-center justify-center transition-all">
                        <ArrowRight
                          size={14}
                          className="transform rotate-[-45deg] group-hover/link:rotate-0 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. THE TRANSFORMATION CYCLE / SYSTEM ARCHITECTURE WORKFLOW GRAPH ─── */}
      <section id="framework" className="w-full py-20 lg:py-28 bg-[#F3EFE6] border-y border-black/[0.08]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-14">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C29B38]">
              System Design & Engagement Model
            </span>
            <h2
              className="font-serif font-bold text-deep-forest tracking-tight leading-tight"
              style={{ fontSize: 'clamp(2rem, 1.5rem + 1.8vw, 3.5rem)' }}
            >
              The Seed Systems Transformation Cycle
            </h2>
            <p className="text-sm sm:text-base text-charcoal/80 leading-relaxed font-normal">
              Sustainable seed sector development cannot occur in isolation. Our integrated methodology unites diagnostic research, regulatory modernization, digital platforms, and high-trust dialogue.
            </p>
          </div>

          {/* Workflow Stepper Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {workflowStages.map((wf, idx) => {
              const Icon = wf.icon
              const isActive = activeWorkflowIndex === idx

              return (
                <button
                  key={wf.stage}
                  type="button"
                  onClick={() => setActiveWorkflowIndex(idx)}
                  className={`text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-deep-forest text-white border-deep-forest shadow-lg scale-[1.02]'
                      : 'bg-white text-deep-forest border-black/10 hover:border-deep-forest/40 hover:bg-white/90'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-4">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? 'text-[#C29B38]' : 'text-charcoal/40'
                      }`}
                    >
                      PHASE {wf.stage}
                    </span>
                    <Icon size={16} className={isActive ? 'text-white' : 'text-primary-green'} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-sm leading-snug line-clamp-2">
                      {wf.title}
                    </h3>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isActive ? 'text-white/70' : 'text-charcoal/60'
                      }`}
                    >
                      {wf.pillar}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Phase Deep Dive Card */}
          <AnimatePresence mode="wait">
            {workflowStages[activeWorkflowIndex] && (
              <motion.div
                key={activeWorkflowIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="p-8 sm:p-10 lg:p-12 rounded-[36px] bg-white border border-black/[0.08] shadow-[0_15px_40px_rgba(0,0,0,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-deep-forest text-white">
                      Phase {workflowStages[activeWorkflowIndex].stage}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
                      {workflowStages[activeWorkflowIndex].pillar}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                    {workflowStages[activeWorkflowIndex].title}
                  </h3>

                  <p className="text-sm sm:text-base text-charcoal/85 leading-relaxed font-normal">
                    {workflowStages[activeWorkflowIndex].summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-black/[0.06]">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50">
                        Primary Client Inputs:
                      </span>
                      <p className="text-xs text-deep-forest font-medium">
                        {workflowStages[activeWorkflowIndex].inputs}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-charcoal/50">
                        Sustainable Deliverables:
                      </span>
                      <p className="text-xs text-primary-green font-medium">
                        {workflowStages[activeWorkflowIndex].outcomes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#FAF9F5] border border-black/[0.08] rounded-2xl p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-deep-forest uppercase tracking-wider">
                    <CheckCircle2 size={15} className="text-primary-green" />
                    <span>How This Drives Systemic Scale</span>
                  </div>
                  <p className="text-xs text-charcoal/80 leading-relaxed font-light">
                    Agri Experience ensures that analytical recommendations do not remain on paper. By transitioning directly from evidence (Phase 01) through policy reform (Phase 02) into digital tools (Phase 04) and stakeholder consensus (Phase 06), we secure irreversible institutional ownership.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                    >
                      <span>Commission a Diagnostic or Advisory Program</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── 4. CROSS-PILLAR FLAGSHIP CASE STUDIES ─── */}
      <section id="case-studies" className="w-full py-20 lg:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
          {/* Section Header & Category Filters */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-black/[0.08]">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary-green">
                Evidence of Execution
              </span>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight"
                style={{ fontSize: 'clamp(2rem, 1.5rem + 1.8vw, 3.5rem)' }}
              >
                Flagship Case Studies & Engagements
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 text-xs">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCaseStudyCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer font-medium ${
                    selectedCaseStudyCategory === c.id
                      ? 'bg-deep-forest text-white border-deep-forest'
                      : 'bg-white text-charcoal/70 border-black/10 hover:border-black/30'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 9).map((p) => {
              const title = locale === 'fr' ? p.titleFr || p.titleEn : p.titleEn
              const desc = locale === 'fr' ? p.descFr || p.descEn : p.descEn

              return (
                <div
                  key={p.id}
                  className="group rounded-3xl bg-white border border-black/[0.08] hover:border-deep-forest/40 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {p.imageUrl && (
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F0EDE4] border-b border-black/[0.06]">
                      <Image
                        src={p.imageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6 sm:p-7 flex flex-col flex-1 space-y-4">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      {p.client && (
                        <span className="font-bold text-primary-green uppercase tracking-wider text-[11px] truncate">
                          {p.client}
                        </span>
                      )}
                      {p.year && (
                        <span className="text-charcoal/50 text-[11px] font-mono shrink-0">
                          {p.year}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug group-hover:text-primary-green transition-colors">
                      {title}
                    </h3>

                    <p className="text-xs text-charcoal/75 font-light leading-relaxed flex-1 line-clamp-3">
                      {desc}
                    </p>

                    {p.link && (
                      <div className="pt-3 border-t border-black/[0.06] mt-auto">
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-primary-green transition-colors"
                        >
                          <span>Open Assignment Details</span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Link to Resource Library */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/[0.08]">
            <p className="text-xs text-charcoal/70">
              Need access to complete project dossiers, scoping study PDFs, or presentation slides?
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-forest text-white font-bold text-xs hover:bg-deep-forest/90 transition-all shadow-xs"
            >
              <RollingText className="gap-2">
                Explore Full Resource & Publications Library
                <ArrowRight size={14} />
              </RollingText>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. PAN-AFRICAN GEOGRAPHIC REACH & IMPACT MAP TEASER ─── */}
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

      {/* ─── 6. EXECUTIVE ENGAGEMENT / COMMISSION CONSULTATION CTA ─── */}
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

