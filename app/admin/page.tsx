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
  let sectionsCount = 11
  let partnersCount = staticPartners.length
  let beliefsCount = staticBeliefs.length
  let whyAgriCount = staticWhyAgriCards.length
  let expertiseCount = staticExpertisePillars.length
  let recentResources: any[] = []
  let recentTeam: any[] = []

  if (dbConnected) {
    try {
      const [r, t, p, ins, map, sec, part, bel, why, exp, recR, recT] = await Promise.all([
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
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2.5 text-xs text-[#0F2417]/60">
            <span>{today}</span>
            <span>·</span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
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
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/admin/resources"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#0F2417] text-[#FAF9F5] hover:bg-[#0F2417]/90 transition shadow-xs"
          >
            <Plus size={14} />
            <span>New Publication</span>
          </Link>

          <Link
            href="/admin/team"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 transition"
          >
            <Plus size={14} />
            <span>Add Member</span>
          </Link>

          <SeedButton />
        </div>
      </section>

      {/* Telemetry Strip */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#0F2417]/10 rounded-xl p-5 shadow-xs">
          <span className="text-xs text-[#0F2417]/60 font-medium block">Publications & Reports</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-3xl font-bold text-[#0F2417]">{resourcesCount}</span>
            <span className="text-[11px] text-[#0F2417]/50">verified PDFs</span>
          </div>
        </div>

        <div className="bg-white border border-[#0F2417]/10 rounded-xl p-5 shadow-xs">
          <span className="text-xs text-[#0F2417]/60 font-medium block">Leadership Roster</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-3xl font-bold text-[#0F2417]">{teamCount}</span>
            <span className="text-[11px] text-[#0F2417]/50">dual portraits</span>
          </div>
        </div>

        <div className="bg-white border border-[#0F2417]/10 rounded-xl p-5 shadow-xs">
          <span className="text-xs text-[#0F2417]/60 font-medium block">Partner Network</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-3xl font-bold text-[#0F2417]">{partnersCount}</span>
            <span className="text-[11px] text-[#0F2417]/50">institutions</span>
          </div>
        </div>

        <div className="bg-white border border-[#0F2417]/10 rounded-xl p-5 shadow-xs">
          <span className="text-xs text-[#0F2417]/60 font-medium block">Dynamic Copy Blocks</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-serif text-3xl font-bold text-[#0F2417]">{sectionsCount}</span>
            <span className="text-[11px] text-[#0F2417]/50">bilingual sections</span>
          </div>
        </div>
      </section>

      {/* Two Balanced Editorial Columns */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column 1: Site Content & Brand Narrative */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#0F2417]/10">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                Site Content & Brand Narrative
              </h2>
              <p className="text-xs text-[#0F2417]/60">
                Core narrative, vision, philosophy, and institutional collaborators
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Taglines, Vision, Mission & Goals */}
            <Link
              href="/admin/sections"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Type size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Page Taglines, Vision & Mission
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Hero headlines, vision, mission, and strategic goal copy
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{sectionsCount} sections</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Our Partners */}
            <Link
              href="/admin/partners"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Handshake size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Our Partners & Institutional Network
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Donors, ministries, seed regulators, and research organizations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{partnersCount} logos</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* What We Believe */}
            <Link
              href="/admin/beliefs"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    What We Believe
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Four foundational agricultural philosophy statements
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{beliefsCount} statements</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Why Agri Experience */}
            <Link
              href="/admin/why-agri"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Award size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Why Agri Experience
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Five competitive advantage pillars and interactive cards
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{whyAgriCount} cards</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Our Expertise */}
            <Link
              href="/admin/expertise"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Target size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Capabilities & Core Expertise
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Five service domains featured in the About page bento grid
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{expertiseCount} pillars</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Our Impact Narrative & SDGs */}
            <Link
              href="/admin/sections?tab=our-impact"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Globe size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Our Impact & SDG Alignment
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Impact map introduction, SDG commitments, and collaboration CTA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">3 blocks</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Contact & Regional Office */}
            <Link
              href="/admin/sections?tab=contact"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <MapPin size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Contact Information & Headquarters
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Welcome headline, physical office address, phone and inquiry email
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">2 blocks</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Publishing & Media Records */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#0F2417]/10">
            <div>
              <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                Publishing & Media Records
              </h2>
              <p className="text-xs text-[#0F2417]/60">
                Team rosters, publications, case studies, and telemetry
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            {/* Team */}
            <Link
              href="/admin/team"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Team Profiles & Photography
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Manage executive portraits (primary & hover) and bilingual bios
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{teamCount} members</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Publications */}
            <Link
              href="/admin/resources"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Publications & Resources
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Verified seed system research papers and PDF downloads
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{resourcesCount} PDFs</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Projects & Case Studies */}
            <Link
              href="/admin/projects"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Briefcase size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Pillars & Case Studies
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Digital platforms (MbeguChoice, M3, RIMI) and client studies
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{projectsCount} studies</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Insights */}
            <Link
              href="/admin/insights"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Insights & Field Breakthroughs
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Breeder education, market introductions, and policy articles
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{insightsCount} stories</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>

            {/* Map Footprint */}
            <Link
              href="/admin/map"
              className="group flex items-center justify-between p-4 rounded-xl bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 transition shadow-xs"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] group-hover:bg-[#0F2417] group-hover:text-white transition">
                  <Compass size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F2417]">
                    Pan-African Map Footprint
                  </h3>
                  <p className="text-xs text-[#0F2417]/60">
                    Country project counts, regional telemetry, and work done
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#0F2417]/50 font-mono">{countriesCount} countries</span>
                <ArrowRight size={14} className="text-[#0F2417]/40 group-hover:translate-x-0.5 group-hover:text-[#0F2417] transition" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Split Inspection View: Publications Table & Active Leadership Snapshot */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Left 2 Cols: Publications Roster Table */}
        <div className="lg:col-span-2 bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0F2417]/10">
            <div>
              <h3 className="font-serif font-bold text-base text-[#0F2417]">
                Recent Publications & Reports
              </h3>
              <p className="text-xs text-[#0F2417]/60">
                Latest research documents live in the public download repository
              </p>
            </div>
            <Link
              href="/admin/resources"
              className="text-xs font-semibold text-[#0F2417] hover:underline inline-flex items-center gap-1"
            >
              <span>View all {resourcesCount}</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-100 text-[#0F2417]/50 uppercase tracking-wider font-mono text-[10px]">
                  <th className="py-2.5 font-medium">Title</th>
                  <th className="py-2.5 font-medium">Category</th>
                  <th className="py-2.5 font-medium">Client / Sponsor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentResources.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/60 transition">
                    <td className="py-3 font-medium text-[#0F2417] max-w-xs truncate pr-4">
                      {item.titleEn}
                    </td>
                    <td className="py-3 text-stone-600 whitespace-nowrap pr-4">
                      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 text-stone-600 whitespace-nowrap">
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
            <div className="flex items-center justify-between pb-3 border-b border-[#0F2417]/10">
              <div>
                <h3 className="font-serif font-bold text-base text-[#0F2417]">
                  Leadership Roster
                </h3>
                <p className="text-xs text-[#0F2417]/60">
                  Featured team members on /our-team
                </p>
              </div>
              <Link
                href="/admin/team"
                className="text-xs font-semibold text-[#0F2417] hover:underline inline-flex items-center gap-1"
              >
                <span>Edit roster</span>
                <ArrowRight size={12} />
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
                  <span className="text-[10px] font-mono text-stone-400 shrink-0">
                    #{member.order}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Dual photo uploads active</span>
            <Link
              href="/en/our-team"
              target="_blank"
              className="inline-flex items-center gap-1 text-[#0F2417] font-semibold hover:underline"
            >
              <span>Live view</span>
              <ExternalLink size={11} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
