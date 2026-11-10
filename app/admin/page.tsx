import { redirect } from 'next/navigation'
import Link from 'next/link'
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
  Layers,
  ArrowRight,
  Database,
  CheckCircle2,
  AlertTriangle,
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
    } catch {
      // Fallback
    }
  }

  const stats = [
    {
      title: 'Publications & Resources',
      count: resourcesCount,
      desc: isDbData ? 'Managed in Database' : 'Loaded from Static Seed',
      href: '/admin/resources',
      icon: FileText,
      accent: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Team Members',
      count: teamCount,
      desc: 'Experts & Leadership',
      href: '/admin/team',
      icon: Users,
      accent: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      title: 'Case Studies & Pillars',
      count: projectsCount,
      desc: 'Our Work pillars & assignments',
      href: '/admin/projects',
      icon: Briefcase,
      accent: 'bg-amber-50 text-amber-700 border-amber-100',
    },
    {
      title: 'Database Engine',
      count: dbConnected ? 'Connected' : 'Hybrid Fallback',
      desc: dbConnected ? 'PostgreSQL Active' : 'Static Fallback Active',
      href: '#',
      icon: Database,
      accent: dbConnected
        ? 'bg-green-50 text-green-700 border-green-100'
        : 'bg-amber-50 text-amber-700 border-amber-100',
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-black/5 shadow-xs">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
            Admin Console
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest tracking-tight mt-2">
            Welcome back, {session.name}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Manage your publications, team profiles, and public content with live cache synchronization.
          </p>
        </div>

        <SeedButton />
      </div>

      {/* System Status Alert */}
      {!dbConnected ? (
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Hybrid Storage Mode:</span> The website is currently serving static fallback content. Once a PostgreSQL database (`DATABASE_URL`) is connected, click <strong>"Seed / Sync Default Site Data"</strong> above to populate the database and enable live database writes.
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-green-50/70 border border-green-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-green-900">
            <CheckCircle2 size={16} className="text-green-600 shrink-0" />
            <span>Database connection verified. CRUD operations will update public pages in real time.</span>
          </div>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-black/5 hover:border-black/15 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-charcoal/70 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2 rounded-xl border ${stat.accent}`}>
                  <Icon size={16} />
                </div>
              </div>
              <div>
                <p className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest mb-1">
                  {stat.count}
                </p>
                <p className="text-xs text-charcoal/60 flex items-center gap-1 group-hover:text-deep-forest transition-colors">
                  {stat.desc}
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Quick Navigation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/resources"
          className="p-6 rounded-2xl bg-white border border-black/5 hover:border-deep-forest/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-white transition-colors">
              <FileText size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-deep-forest mb-1">
              Resources & Reports
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
              Add, update, or remove downloadable PDF publications, citations, client partner tags, and categories.
            </p>
          </div>
          <span className="text-xs font-bold text-deep-forest inline-flex items-center gap-1.5 mt-auto">
            Manage Publications <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/admin/team"
          className="p-6 rounded-2xl bg-white border border-black/5 hover:border-deep-forest/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-white transition-colors">
              <Users size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-deep-forest mb-1">
              Team Profiles
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
              Manage executive leadership, team member bios, photos, and roles in English and French.
            </p>
          </div>
          <span className="text-xs font-bold text-deep-forest inline-flex items-center gap-1.5 mt-auto">
            Manage Team <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>

        <Link
          href="/admin/projects"
          className="p-6 rounded-2xl bg-white border border-black/5 hover:border-deep-forest/30 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest mb-4 group-hover:bg-deep-forest group-hover:text-white transition-colors">
              <Briefcase size={20} />
            </div>
            <h3 className="font-serif font-bold text-lg text-deep-forest mb-1">
              Projects & Case Studies
            </h3>
            <p className="text-xs text-charcoal/70 leading-relaxed mb-4">
              Configure featured assignments, digital platform initiatives (MbeguChoice, M3), and regional case studies.
            </p>
          </div>
          <span className="text-xs font-bold text-deep-forest inline-flex items-center gap-1.5 mt-auto">
            Manage Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  )
}
