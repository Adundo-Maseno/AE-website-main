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
import { staticGalleryItems } from '@/lib/services/gallery-service'
import { SECTION_CONFIGS } from '@/lib/cms-sections-config'
import { getSiteSettings } from '@/lib/services/settings-service'
import SeedButton from '@/components/admin/seed-button'
import {
  FileText,
  Users,
  Briefcase,
  ArrowRight,
  ExternalLink,
  Handshake,
  Sparkles,
  Award,
  Target,
  Type,
  Compass,
  Plus,
  Globe,
  MapPin,
  Image as ImageIcon,
  KeyRound,
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const session = await getSession()
  if (!session) {
    redirect('/admin/login')
  }

  const dbConnected = await isDatabaseConnected()
  const siteSettings = await getSiteSettings()

  let resourcesCount = publicDownloads.length
  let teamCount = staticTeamMembers.length
  let projectsCount = staticProjects.length
  let insightsCount = 3
  let countriesCount = 12
  let sectionsCount = SECTION_CONFIGS.length
  let partnersCount = staticPartners.length
  let beliefsCount = staticBeliefs.length
  let whyAgriCount = staticWhyAgriCards.length
  let expertiseCount = staticExpertisePillars.length
  let galleryCount = staticGalleryItems.length
  let recentResources: any[] = []
  let recentTeam: any[] = []

  if (dbConnected) {
    try {
      const [r, t, p, ins, map, sec, part, bel, why, exp, gal, recR, recT] = await Promise.all([
        prisma.resource.count(),
        prisma.teamMember.count(),
        prisma.project.count(),
        prisma.insight.count(),
        prisma.mapCountryData.count(),
        prisma.pageSection.count(),
        prisma.partner.count(),
        prisma.coreBelief.count(),
        prisma.whyAgriCard.count(),
        prisma.expertisePillar.count(),
        prisma.galleryItem.count(),
        prisma.resource.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
        prisma.teamMember.findMany({ take: 5, orderBy: { order: 'asc' } }),
      ])
      if (r > 0) resourcesCount = r
      if (t > 0) teamCount = t
      if (p > 0) projectsCount = p
      if (ins > 0) insightsCount = ins
      if (map > 0) countriesCount = map
      if (sec > 0) sectionsCount = sec
      if (part > 0) partnersCount = part
      if (bel > 0) beliefsCount = bel
      if (why > 0) whyAgriCount = why
      if (exp > 0) expertiseCount = exp
      if (gal > 0) galleryCount = gal
      recentResources = recR
      recentTeam = recT
    } catch {
      // Fallback
    }
  }

  if (recentResources.length === 0) {
    recentResources = publicDownloads.slice(0, 5).map((d, i) => ({
      id: `fallback-${i}`,
      titleEn: d.title,
      client: d.client,
      category: d.category,
    }))
  }

  if (recentTeam.length === 0) {
    recentTeam = staticTeamMembers.slice(0, 5)
  }

  const today = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Editorial Masthead */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#0F2417]/10">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#0F2417]/60">
            <span className="px-2 py-0.5 rounded-md bg-[#0F2417]/[0.06] border border-[#0F2417]/10 text-[10px] font-mono uppercase tracking-widest text-[#0F2417] whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]">
              Editorial Control Center
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums whitespace-nowrap">{today}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-800 whitespace-nowrap [word-break:normal] [overflow-wrap:normal]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block shrink-0" />
              {dbConnected ? 'Supabase PostgreSQL live' : 'Resilient static fallback'}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0F2417]">
            Publishing Desk
          </h1>

          <p className="text-sm text-[#0F2417]/70 leading-relaxed">
            Manage public website copy, partner institutions, research publications, and the leadership roster.
          </p>
        </div>

        {/* Masthead Action Strip */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/admin/resources"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold bg-[#0F2417] text-[#FAF9F5] hover:bg-[#0F2417]/90 transition-all active:scale-[0.98] shadow-xs whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
          >
            <Plus size={14} className="shrink-0" />
            <span>New Publication</span>
          </Link>

          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold bg-white border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
          >
            <Plus size={14} className="shrink-0" />
            <span>Add Member</span>
          </Link>

          <Link
            href="/admin/settings#credentials"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] rounded-xl text-xs font-semibold bg-white border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
          >
            <KeyRound size={14} className="shrink-0" />
            <span>Credentials &amp; Settings</span>
          </Link>

          <SeedButton />
        </div>
      </section>

      {/* Interactive Bento Telemetry Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/resources"
          className="group bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:-translate-y-0.5 hover:shadow-sm rounded-2xl p-5 shadow-xs transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#0F2417]/70 font-medium">Publications &amp; Reports</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#0F2417]/10 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-[#FAF9F5] transition-colors shrink-0">
              <FileText size={15} />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#0F2417] tabular-nums">
                {resourcesCount}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 whitespace-nowrap">
                verified PDFs
              </span>
            </div>
            <ArrowRight size={14} className="text-[#0F2417]/35 group-hover:text-[#0F2417] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Link>

        <Link
          href="/admin/team"
          className="group bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:-translate-y-0.5 hover:shadow-sm rounded-2xl p-5 shadow-xs transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#0F2417]/70 font-medium">Leadership Roster</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#0F2417]/10 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-[#FAF9F5] transition-colors shrink-0">
              <Users size={15} />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#0F2417] tabular-nums">
                {teamCount}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 whitespace-nowrap">
                dual portraits
              </span>
            </div>
            <ArrowRight size={14} className="text-[#0F2417]/35 group-hover:text-[#0F2417] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Link>

        <Link
          href="/admin/partners"
          className="group bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:-translate-y-0.5 hover:shadow-sm rounded-2xl p-5 shadow-xs transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#0F2417]/70 font-medium">Partner Network</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#0F2417]/10 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-[#FAF9F5] transition-colors shrink-0">
              <Handshake size={15} />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#0F2417] tabular-nums">
                {partnersCount}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 whitespace-nowrap">
                institutions
              </span>
            </div>
            <ArrowRight size={14} className="text-[#0F2417]/35 group-hover:text-[#0F2417] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Link>

        <Link
          href="/admin/sections"
          className="group bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:-translate-y-0.5 hover:shadow-sm rounded-2xl p-5 shadow-xs transition-all active:scale-[0.99]"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#0F2417]/70 font-medium">Dynamic Copy Blocks</span>
            <div className="w-8 h-8 rounded-lg bg-[#FAF9F5] border border-[#0F2417]/10 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-[#FAF9F5] transition-colors shrink-0">
              <Type size={15} />
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#0F2417] tabular-nums">
                {sectionsCount}
              </span>
              <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 whitespace-nowrap">
                bilingual sections
              </span>
            </div>
            <ArrowRight size={14} className="text-[#0F2417]/35 group-hover:text-[#0F2417] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        </Link>
      </section>

      {/* Two Balanced Editorial Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Site Content & Brand Narrative */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#0F2417]/10">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                Site Content &amp; Brand Narrative
              </h2>
              <p className="text-xs text-[#0F2417]/60">
                Core narrative, vision, philosophy, and institutional collaborators
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 px-2.5 py-1 rounded-md bg-white border border-[#0F2417]/10 whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]">
              8 desks
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Admin Credentials & Language Switcher Controls */}
            <Link
              href="/admin/settings#credentials"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/15 hover:border-[#0F2417]/40 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-[#0F2417]/10 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <KeyRound size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Admin Login Credentials &amp; Language Switcher
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Change login email/password and show or hide the EN / FR switcher on the site
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span
                  className={`text-[11px] font-mono tabular-nums font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] ${
                    siteSettings.showLanguageSwitcher !== false
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-stone-100 text-stone-600 border-stone-200'
                  }`}
                >
                  {siteSettings.showLanguageSwitcher !== false ? 'EN/FR Shown' : 'EN/FR Hidden'}
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Taglines, Vision, Mission & Goals */}
            <Link
              href="/admin/sections"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Type size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Page Taglines, Vision &amp; Mission
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Hero headlines, vision, mission, and strategic goal copy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {sectionsCount} sections
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Our Partners */}
            <Link
              href="/admin/partners"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Handshake size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Our Partners &amp; Institutional Network
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Donors, ministries, seed regulators, and research organizations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {partnersCount} logos
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* What We Believe */}
            <Link
              href="/admin/beliefs"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    What We Believe
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Four foundational agricultural philosophy statements
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {beliefsCount} statements
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Why Agri Experience */}
            <Link
              href="/admin/why-agri"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Award size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Why Agri Experience
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Five competitive advantage pillars and interactive cards
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {whyAgriCount} cards
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Our Expertise */}
            <Link
              href="/admin/expertise"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Target size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Capabilities &amp; Core Expertise
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Five service domains featured in the About page bento grid
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {expertiseCount} pillars
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Our Impact Narrative & SDGs */}
            <Link
              href="/admin/sections?tab=our-impact"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Globe size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Our Impact &amp; SDG Alignment
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Impact map introduction, SDG commitments, and collaboration CTA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  3 blocks
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Contact & Regional Office */}
            <Link
              href="/admin/sections?tab=contact"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <MapPin size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Contact Information &amp; Headquarters
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Welcome headline, physical office address, phone and inquiry email
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  2 blocks
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Publishing & Media Records */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#0F2417]/10">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                Publishing &amp; Media Records
              </h2>
              <p className="text-xs text-[#0F2417]/60">
                Team rosters, publications, case studies, and telemetry
              </p>
            </div>
            <span className="text-[11px] font-mono tabular-nums text-[#0F2417]/55 px-2.5 py-1 rounded-md bg-white border border-[#0F2417]/10 whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]">
              6 desks
            </span>
          </div>

          <div className="space-y-2.5">
            {/* Team */}
            <Link
              href="/admin/team"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Users size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Team Profiles &amp; Photography
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Manage executive portraits (primary &amp; hover) and bilingual bios
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {teamCount} members
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Publications */}
            <Link
              href="/admin/resources"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <FileText size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Publications &amp; Resources
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Verified seed system research papers and PDF downloads
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {resourcesCount} PDFs
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Projects & Case Studies */}
            <Link
              href="/admin/projects"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Briefcase size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Pillars &amp; Case Studies
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Digital platforms (MbeguChoice, M3, RIMI) and client studies
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {projectsCount} studies
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Insights */}
            <Link
              href="/admin/insights"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Insights &amp; Field Breakthroughs
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Breeder education, market introductions, and policy articles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {insightsCount} stories
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Field Gallery */}
            <Link
              href="/admin/gallery"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <ImageIcon size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Field Gallery &amp; Photography
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Field trials, training workshops, and certification photos
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {galleryCount} photos
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>

            {/* Map Footprint */}
            <Link
              href="/admin/map"
              className="group flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:shadow-sm transition-all active:scale-[0.99] shadow-xs"
            >
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition-colors shrink-0">
                  <Compass size={16} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Pan-African Map Footprint
                  </h3>
                  <p className="text-xs text-[#0F2417]/60 leading-snug">
                    Country project counts, regional telemetry, and work done
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal] ml-3">
                <span className="text-[11px] text-[#0F2417]/70 font-mono tabular-nums px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#0F2417]/[0.08] whitespace-nowrap shrink-0">
                  {countriesCount} countries
                </span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition shrink-0" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Split Inspection View: Publications Table & Active Leadership Snapshot */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Left 2 Cols: Publications Roster Table */}
        <div className="lg:col-span-2 bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#0F2417]/10">
            <div className="min-w-0">
              <h3 className="font-serif font-bold text-base text-[#0F2417]">
                Recent Publications &amp; Reports
              </h3>
              <p className="text-xs text-[#0F2417]/60">
                Latest research documents live in the public download repository
              </p>
            </div>
            <Link
              href="/admin/resources"
              className="text-xs font-semibold text-[#0F2417] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] font-mono tabular-nums"
            >
              <span>View all {resourcesCount}</span>
              <ArrowRight size={12} className="shrink-0" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF9F5] border-y border-[#0F2417]/10">
                <tr className="text-[#0F2417]/60 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">Title</th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">Category</th>
                  <th className="py-2.5 px-3 font-medium whitespace-nowrap">Client / Sponsor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentResources.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF9F5]/80 transition">
                    <td className="py-3 px-3 font-medium text-[#0F2417] max-w-xs truncate">
                      {item.titleEn}
                    </td>
                    <td className="py-3 px-3 text-stone-600 whitespace-nowrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-stone-100 border border-[#0F2417]/[0.08] text-stone-700 text-[11px] whitespace-nowrap">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-stone-600 whitespace-nowrap">
                      {item.client}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Active Team Members */}
        <div className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#0F2417]/10">
              <div className="min-w-0">
                <h3 className="font-serif font-bold text-base text-[#0F2417]">
                  Leadership Roster
                </h3>
                <p className="text-xs text-[#0F2417]/60">
                  Featured team members on /our-team
                </p>
              </div>
              <Link
                href="/admin/team"
                className="text-xs font-semibold text-[#0F2417] hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
              >
                <span>Edit roster</span>
                <ArrowRight size={12} className="shrink-0" />
              </Link>
            </div>

            <div className="divide-y divide-stone-100 mt-2">
              {recentTeam.map((member) => (
                <div key={member.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shrink-0">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="36px"
                          unoptimized={
                            member.image.toLowerCase().split('?')[0].endsWith('.svg') ||
                            member.image.startsWith('/uploads/') ||
                            /^https?:\/\//i.test(member.image)
                          }
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[#0F2417]/40 text-xs">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-xs text-[#0F2417] truncate">{member.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{member.roleEn}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono tabular-nums text-stone-500 whitespace-nowrap shrink-0">
                    #{member.order}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3 text-xs text-stone-500">
            <span>Dual photo uploads active</span>
            <Link
              href="/en/our-team"
              target="_blank"
              className="inline-flex items-center gap-1 text-[#0F2417] font-semibold hover:underline whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
            >
              <span>Live view</span>
              <ExternalLink size={11} className="shrink-0" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
