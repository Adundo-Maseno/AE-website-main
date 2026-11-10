import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '@/lib/auth'
import { prisma, isDatabaseConnected } from '@/lib/db'
import { publicDownloads } from '@/lib/public-downloads'
import { staticTeamMembers } from '@/lib/services/team-service'
import { staticProjects } from '@/lib/services/projects-service'
import { staticPartners } from '@/lib/services/partners-service'
import { staticBeliefs } from '@/lib/services/beliefs-service'
import { staticWhyAgriCards } from '@/lib/services/why-agri-service'
import { staticExpertisePillars } from '@/lib/services/expertise-service'
import SeedButton from '@/components/admin/seed-button'
import {
  FileText,
  Users,
  Briefcase,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
  Upload,
  ExternalLink,
  ShieldCheck,
  Globe2,
  Handshake,
  Sparkles,
  Award,
  Target,
  Type,
  Compass,
  Camera,
  Settings,
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }

  const dbConnected = await isDatabaseConnected()
  let resourcesCount = publicDownloads.length
  let teamCount = staticTeamMembers.length
  let projectsCount = staticProjects.length
  let insightsCount = 3
  let countriesCount = 12
  let galleryCount = 4
  let sectionsCount = 11
  let partnersCount = staticPartners.length
  let beliefsCount = staticBeliefs.length
  let whyAgriCount = staticWhyAgriCards.length
  let expertiseCount = staticExpertisePillars.length
  let isDbData = false

  if (dbConnected) {
    try {
      const [r, t, p, ins, map, gal, sec, part, bel, why, exp] = await Promise.all([
        prisma.resource.count(),
        prisma.teamMember.count(),
        prisma.project.count(),
        prisma.insight.count(),
        prisma.mapCountryData.count(),
        prisma.galleryItem.count(),
        prisma.pageSection.count(),
        prisma.partner.count(),
        prisma.coreBelief.count(),
        prisma.whyAgriCard.count(),
        prisma.expertisePillar.count(),
      ])
      if (r > 0) { resourcesCount = r; isDbData = true; }
      if (t > 0) teamCount = t
      if (p > 0) projectsCount = p
      if (ins > 0) insightsCount = ins
      if (map > 0) countriesCount = map
      if (gal > 0) galleryCount = gal
      if (sec > 0) sectionsCount = sec
      if (part > 0) partnersCount = part
      if (bel > 0) beliefsCount = bel
      if (why > 0) whyAgriCount = why
      if (exp > 0) expertiseCount = exp
    } catch {
      // Fallback
    }
  }

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF9F5] border border-black/[0.08] p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest text-white">
                Agri Experience CMS
              </span>
              <span className="text-xs text-charcoal/60 font-medium font-mono">
                {today}
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
              Unified Editorial & Site Publishing Desk
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Every content element on the website is 100% dynamic and synchronized to Supabase PostgreSQL: hero taglines, vision & mission, partner logos, core beliefs, Why Agri Experience advantages, expertise capabilities, research reports, and team rosters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <SeedButton />
          </div>
        </div>
      </div>

      {/* Database Connection Heartbeat Banner */}
      {dbConnected ? (
        <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-2.5 font-medium">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span>
              <strong>Supabase PostgreSQL Active:</strong> All 12 editorial content domains are live and dynamic. Edits take effect immediately.
            </span>
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 self-end sm:self-auto">
            <ShieldCheck size={14} /> Database Session Synced
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Hybrid Fallback Mode:</span> No database connection string is active in this environment. Serving resilient static data.
          </div>
        </div>
      )}

      {/* Content & Brand Desks (New Core Section requested by User) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-xl text-deep-forest">
              Dynamic Brand & Page Content Desks
            </h2>
            <p className="text-xs text-charcoal/60">
              Manage taglines, philosophy statements, organizational vision, partner networks, and service pillars
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {/* Desk: Page Sections & Taglines */}
          <Link
            href="/admin/sections"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Type size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-deep-forest">
                  {sectionsCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                Taglines & Vision
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                Hero headlines, Vision, Mission, Goal & CTA taglines.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Edit Sections</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Desk: Our Partners */}
          <Link
            href="/admin/partners"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Handshake size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-deep-forest">
                  {partnersCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                Our Partners
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                Client logos, government ministries, and regulators.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Manage Logos</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Desk: What We Believe */}
          <Link
            href="/admin/beliefs"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Sparkles size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-deep-forest">
                  {beliefsCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                What We Believe
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                4 core agricultural philosophy statements.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Manage Beliefs</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Desk: Why Agri Experience */}
          <Link
            href="/admin/why-agri"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Award size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-deep-forest">
                  {whyAgriCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                Why Agri Experience
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                5 competitive advantage pillars and cards.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Manage Cards</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Desk: Our Expertise */}
          <Link
            href="/admin/expertise"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Target size={18} />
                </div>
                <span className="font-serif font-bold text-xl text-deep-forest">
                  {expertiseCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                Our Expertise
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                5 service domains featured on the Bento Grid.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Manage Domains</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Desk: Settings & Metrics */}
          <Link
            href="/admin/settings"
            className="group p-5 rounded-2xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors">
                  <Settings size={18} />
                </div>
                <span className="font-serif font-bold text-sm text-deep-forest">
                  Live Stats
                </span>
              </div>
              <h3 className="font-serif font-bold text-sm text-deep-forest">
                Impact & Settings
              </h3>
              <p className="text-[11px] text-charcoal/70 leading-relaxed mt-1">
                350+ Projects, 22 Countries, Contact Info.
              </p>
            </div>
            <div className="pt-3 mt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-bold text-deep-forest">
              <span>Configure</span>
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Primary Publishing Desks */}
      <div className="space-y-4">
        <div>
          <h2 className="font-serif font-bold text-xl text-deep-forest">
            Editorial Publishing Desks
          </h2>
          <p className="text-xs text-charcoal/60">
            Manage long-form editorial records, research downloads, case studies, and field assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: Team & Leadership */}
          <Link
            href="/admin/team"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <Users size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {teamCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Team Profiles & Dual Photography
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Manage members with primary & hover portrait uploads, bilingual executive bios, and hierarchy sorting.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Team Roster</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 2: Publications & Reports */}
          <Link
            href="/admin/resources"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <FileText size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {resourcesCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Publications & PDF Downloads
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Curate all 24 verified seed system reports, toolkits, and client citations across 4 categories.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Publications</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 3: Projects & Pillars */}
          <Link
            href="/admin/projects"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <Briefcase size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {projectsCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Work Pillars & Case Studies
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Digital platforms (MbeguChoice, M3, RIMI), regional seed trade studies, and advisory initiatives.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Case Studies</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 4: Insights */}
          <Link
            href="/admin/insights"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <Sparkles size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {insightsCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Insights & Field Breakthroughs
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Publish articles on regulatory transparency, breeder training, and drought-tolerant seed rollouts.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Insights</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 5: Pan-African Map */}
          <Link
            href="/admin/map"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <Compass size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {countriesCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Pan-African Map Footprint
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Configure country telemetry, active projects count, work done, and regional engagement tiers.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Map Countries</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Module 6: Photography Gallery */}
          <Link
            href="/admin/gallery"
            className="group p-6 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-mist flex items-center justify-center text-deep-forest group-hover:bg-deep-forest group-hover:text-white transition-colors shadow-xs">
                  <Camera size={22} />
                </div>
                <span className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest">
                  {galleryCount}
                </span>
              </div>
              <h3 className="font-serif font-bold text-xl text-deep-forest mb-2">
                Field Photography Gallery
              </h3>
              <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
                Upload authentic photography from field seed trials, agrodealer workshops, and regional convenings.
              </p>
            </div>
            <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
              <span>Manage Gallery</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
