'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  ExternalLink,
  LogOut,
} from 'lucide-react'

export default function AdminHeader({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    }
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Resources', href: '/admin/resources', icon: FileText },
    { label: 'Team', href: '/admin/team', icon: Users },
    { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  ]

  // Do not render nav header on login page
  if (pathname === '/admin/login') return null

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-black/5 shadow-xs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-mist flex items-center justify-center p-1">
              <Image
                src="/agri-experience-logo.png"
                alt="Agri Experience"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-bold text-base text-deep-forest tracking-tight">
                Agri Experience
              </span>
              <span className="ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-green/15 text-deep-forest">
                CMS
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-deep-forest text-white shadow-xs'
                      : 'text-charcoal/70 hover:text-deep-forest hover:bg-black/5'
                  }`}
                >
                  <Icon size={14} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/en"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-charcoal/70 hover:text-deep-forest hover:bg-black/5 transition-colors"
          >
            <ExternalLink size={13} />
            View Site
          </Link>

          {adminEmail && (
            <span className="hidden lg:inline text-xs text-charcoal/60 truncate max-w-[180px]">
              {adminEmail}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
            aria-label="Log out"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
