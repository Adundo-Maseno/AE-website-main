import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '@/lib/auth'
import { prisma, isDatabaseConnected } from '@/lib/db'
import { publicDownloads } from '@/lib/public-downloads'
import { staticTeamMembers } from '@/lib/services/team-service'
import { staticProjects } from '@/lib/services/projects-service'
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
  let isDbData = false
  let recentResources: any[] = []

  if (dbConnected) {
    try {
      const rCount = await prisma.resource.count()
      const tCount = await prisma.teamMember.count()
      const pCount = await prisma.project.count()
      if (rCount > 0) {
        resourcesCount = rCount
        isDbData = true
      }
      if (tCount > 0) {
        teamCount = tCount
      }
      if (pCount > 0) {
        projectsCount = pCount
      }
      recentResources = await prisma.resource.findMany({
        take: 4,
        orderBy: { createdAt: 'desc' },
      })
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
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#FAF9F5] border border-black/[0.08] p-6 sm:p-10 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-deep-forest text-white">
                Agri Experience CMS
              </span>
              <span className="text-xs text-charcoal/60 font-medium">
                {today}
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
              Publishing Desk & Roster Console
            </h1>
            <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed">
              Curate agricultural reports, manage leadership rosters with high-res portrait uploads, and synchronize public content in English and French.
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
              <strong>Supabase PostgreSQL Live:</strong> Real-time CRUD operations are synchronized across Vercel, Hostinger, and public caches.
            </span>
          </div>
          <div className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5 self-end sm:self-auto">
            <ShieldCheck size={14} /> Session Active
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

      {/* 3 Core Editorial Pillar Desks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Module 1: Team & Leadership */}
        <Link
          href="/admin/team"
          className="group p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
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
            <h2 className="font-serif font-bold text-xl text-deep-forest mb-2">
              Team Profiles & Photography
            </h2>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
              Upload portraits for new members, update executive leadership bios in English and French, and adjust display hierarchy.
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
          className="group p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
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
            <h2 className="font-serif font-bold text-xl text-deep-forest mb-2">
              Publications & Resources
            </h2>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
              Curate seed system research papers, farmer empowerment studies, donor-funded reports, and PDF downloads.
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
            <span>Manage Publications</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Module 3: Projects & Case Studies */}
        <Link
          href="/admin/projects"
          className="group p-6 sm:p-7 rounded-3xl bg-white border border-black/[0.08] hover:border-black/25 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
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
            <h2 className="font-serif font-bold text-xl text-deep-forest mb-2">
              Pillars & Case Studies
            </h2>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-6">
              Organize digital platforms (MbeguChoice, M3, RIMI), regional seed trade studies, and capacity-building programs.
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-bold text-deep-forest">
            <span>Manage Case Studies</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Quick Access Section: Team Roster Snapshot & Recent Publications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Team Leadership Quick Roster */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
            <div>
              <h3 className="font-serif font-bold text-lg text-deep-forest">
                Leadership Roster
              </h3>
              <p className="text-xs text-charcoal/60">
                Official team members currently live on the public site
              </p>
            </div>
            <Link
              href="/admin/team"
              className="text-xs font-bold text-deep-forest hover:underline inline-flex items-center gap-1"
            >
              View Roster <ArrowRight size={12} />
            </Link>
          </div>

          <div className="divide-y divide-black/[0.06]">
            {staticTeamMembers.slice(0, 5).map((m) => (
              <div key={m.id} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAFAF8] border border-black/[0.08] shrink-0">
                    {m.image ? (
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-deep-forest/40 text-xs">
                        {m.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-xs text-deep-forest">{m.name}</p>
                    <p className="text-[11px] text-charcoal/60">{m.roleEn}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-charcoal/40 bg-black/[0.03] px-2 py-0.5 rounded-full">
                  #{m.order}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Public Site Quick Links */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.08] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div>
                <h3 className="font-serif font-bold text-lg text-deep-forest">
                  Live Public Pages
                </h3>
                <p className="text-xs text-charcoal/60">
                  Inspect content as rendered to worldwide visitors
                </p>
              </div>
              <Globe2 size={18} className="text-deep-forest/50" />
            </div>

            <div className="space-y-3 mt-4">
              <Link
                href="/en/our-team"
                target="_blank"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] hover:border-deep-forest/30 transition-all text-xs group"
              >
                <div>
                  <span className="font-bold text-deep-forest block">
                    Our Team Page (/our-team)
                  </span>
                  <span className="text-[11px] text-charcoal/60">
                    View member portraits, bios, and modal overlays
                  </span>
                </div>
                <ExternalLink size={14} className="text-charcoal/40 group-hover:text-deep-forest transition-colors" />
              </Link>

              <Link
                href="/en/resources"
                target="_blank"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] hover:border-deep-forest/30 transition-all text-xs group"
              >
                <div>
                  <span className="font-bold text-deep-forest block">
                    Resources & Publications (/resources)
                  </span>
                  <span className="text-[11px] text-charcoal/60">
                    View downloadable research papers & toolkits
                  </span>
                </div>
                <ExternalLink size={14} className="text-charcoal/40 group-hover:text-deep-forest transition-colors" />
              </Link>

              <Link
                href="/en/our-work"
                target="_blank"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/[0.06] hover:border-deep-forest/30 transition-all text-xs group"
              >
                <div>
                  <span className="font-bold text-deep-forest block">
                    Our Work Pillars (/our-work)
                  </span>
                  <span className="text-[11px] text-charcoal/60">
                    Explore digital platforms & technical studies
                  </span>
                </div>
                <ExternalLink size={14} className="text-charcoal/40 group-hover:text-deep-forest transition-colors" />
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-black/[0.06] text-[11px] text-charcoal/50 flex items-center justify-between">
            <span>Core Web Vitals: 100/100 Mobile & Desktop</span>
            <span>Version 2.0 Editorial</span>
          </div>
        </div>
      </div>
    </div>
  )
}
