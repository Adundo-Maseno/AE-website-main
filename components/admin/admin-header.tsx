'use client'

import { useState } from 'react'
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
  Menu,
  X,
  Sparkles,
} from 'lucide-react'

export default function AdminHeader({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Publications & Reports', href: '/admin/resources', icon: FileText },
    { label: 'Team & Leadership', href: '/admin/team', icon: Users },
    { label: 'Pillars & Case Studies', href: '/admin/projects', icon: Briefcase },
  ]

  // Do not render nav header on login page
  if (pathname === '/admin/login') return null

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-black/[0.08] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl bg-white border border-black/[0.08] p-1.5 flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] group-hover:border-deep-forest/30 transition-colors">
              <Image
                src="/agri-experience-logo.png"
                alt="Agri Experience"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-deep-forest tracking-tight">
                  Agri Experience
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-deep-forest/[0.08] text-deep-forest border border-deep-forest/10">
                  Publishing Desk
                </span>
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
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
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-deep-forest text-white shadow-xs'
                      : 'text-charcoal/70 hover:text-deep-forest hover:bg-black/[0.04]'
                  }`}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/en"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-charcoal/70 hover:text-deep-forest hover:bg-black/[0.04] transition-colors border border-black/[0.06]"
          >
            <ExternalLink size={13} />
            <span>Live Site</span>
          </Link>

          {adminEmail && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] text-xs text-charcoal/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[150px] font-medium">{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-charcoal/70 hover:text-red-700 hover:bg-red-50/80 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
            aria-label="Log out of CMS"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-charcoal/80 hover:bg-black/[0.04] transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/[0.06] bg-[#FAF9F5] px-4 py-3 space-y-1">
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
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-deep-forest text-white'
                    : 'text-charcoal/70 hover:text-deep-forest hover:bg-black/[0.04]'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            )
          })}
          <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-xs text-charcoal/60 px-3">
            <span>{adminEmail || 'Signed in'}</span>
            <Link href="/en" target="_blank" className="font-bold text-deep-forest inline-flex items-center gap-1">
              Live Site <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
