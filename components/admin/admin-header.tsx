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
  Compass,
  Camera,
  Handshake,
  Sparkles,
  Award,
  Target,
  Type,
  Settings,
  SlidersHorizontal,
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

  const primaryDesks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Team', href: '/admin/team', icon: Users },
    { label: 'Publications', href: '/admin/resources', icon: FileText },
    { label: 'Case Studies', href: '/admin/projects', icon: Briefcase },
    { label: 'Insights', href: '/admin/insights', icon: Sparkles },
    { label: 'Map Footprint', href: '/admin/map', icon: Compass },
    { label: 'Gallery', href: '/admin/gallery', icon: Camera },
  ]

  const contentDesks = [
    { label: 'Page Taglines & Vision', href: '/admin/sections', icon: Type },
    { label: 'Our Partners', href: '/admin/partners', icon: Handshake },
    { label: 'What We Believe', href: '/admin/beliefs', icon: Sparkles },
    { label: 'Why Agri Experience', href: '/admin/why-agri', icon: Award },
    { label: 'Our Expertise', href: '/admin/expertise', icon: Target },
    { label: 'Impact Metrics & Settings', href: '/admin/settings', icon: Settings },
  ]

  // Do not render nav header on login page
  if (pathname === '/admin/login') return null

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/98 backdrop-blur-md border-b border-[#0F2417]/10 transition-colors shadow-xs">
      {/* Top Primary Bar */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link href="/admin" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-white border border-[#0F2417]/15 p-1.5 flex items-center justify-center shadow-xs group-hover:border-[#0F2417]/40 transition-colors">
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
                <span className="font-serif font-bold text-base text-[#0F2417] tracking-tight">
                  Agri Experience
                </span>
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#0F2417]/10 text-[#0F2417] border border-[#0F2417]/15">
                  CMS Desk
                </span>
              </div>
            </div>
          </Link>

          {/* Primary Desks Tabs */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto py-1">
            {primaryDesks.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                    isActive
                      ? 'bg-[#0F2417] text-[#FAF9F5] shadow-xs'
                      : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                  }`}
                >
                  <Icon size={13} strokeWidth={isActive ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/en"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition-colors border border-[#0F2417]/10"
          >
            <ExternalLink size={13} />
            <span>Live Site</span>
          </Link>

          {adminEmail && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0F2417]/10 text-xs text-[#0F2417]/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="truncate max-w-[140px] font-medium">{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0F2417]/70 hover:text-red-700 hover:bg-red-50/80 border border-transparent hover:border-red-200 transition-colors cursor-pointer"
            aria-label="Log out of CMS"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0F2417]/80 hover:bg-[#0F2417]/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Secondary Dynamic Content Desks Ribbon (Desktop) */}
      <div className="hidden lg:block border-t border-[#0F2417]/5 bg-[#FAF9F5]/70 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#0F2417]/50 font-mono">
            <SlidersHorizontal size={11} className="text-[#C29B38]" />
            <span>Content & Brand Desks:</span>
          </div>

          <div className="flex items-center gap-1">
            {contentDesks.map((item) => {
              const isActive = pathname.startsWith(item.href)
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11.5px] font-medium transition-all ${
                    isActive
                      ? 'bg-[#0F2417]/10 text-[#0F2417] font-bold border border-[#0F2417]/20'
                      : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                  }`}
                >
                  <Icon size={12} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#0F2417]/10 bg-[#FAF9F5] px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1">
              Primary Desks
            </span>
            <div className="space-y-0.5">
              {primaryDesks.map((item) => {
                const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive ? 'bg-[#0F2417] text-[#FAF9F5]' : 'text-[#0F2417]/80 hover:bg-[#0F2417]/5'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-[#0F2417]/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1">
              Content & Brand Desks
            </span>
            <div className="space-y-0.5">
              {contentDesks.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                      isActive ? 'bg-[#0F2417] text-[#FAF9F5]' : 'text-[#0F2417]/80 hover:bg-[#0F2417]/5'
                    }`}
                  >
                    <Icon size={14} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
