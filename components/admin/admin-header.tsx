'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
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
  Handshake,
  Sparkles,
  Award,
  Target,
  Type,
  Settings,
  ChevronDown,
  Layers,
  Globe,
  MapPin,
  Image as ImageIcon,
} from 'lucide-react'

const navItemBaseClass =
  'inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] transition-all active:scale-[0.98]'

export default function AdminHeader({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false)
  const [publishingDropdownOpen, setPublishingDropdownOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const publishingRef = useRef<HTMLDivElement>(null)

  const isUnauthenticated = !adminEmail && pathname !== '/admin/login'

  useEffect(() => {
    if (isUnauthenticated) {
      router.replace('/admin/login')
    }
  }, [isUnauthenticated, router])

  // Auto-close dropdowns and mobile drawer on route change
  useEffect(() => {
    setContentDropdownOpen(false)
    setPublishingDropdownOpen(false)
    setMobileMenuOpen(false)
  }, [pathname])

  // Close dropdowns on outside click and Escape key
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setContentDropdownOpen(false)
      }
      if (publishingRef.current && !publishingRef.current.contains(e.target as Node)) {
        setPublishingDropdownOpen(false)
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setContentDropdownOpen(false)
        setPublishingDropdownOpen(false)
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch {
      router.push('/admin/login')
    }
  }

  // Group 1: Content & Brand Desks
  const contentItems = [
    { label: 'Page Taglines & Narratives', href: '/admin/sections', icon: Type, desc: 'Hero headlines, vision, mission, and pillar copy' },
    { label: 'Our Impact Narrative', href: '/admin/sections?tab=our-impact', icon: Globe, desc: 'Impact map intro, SDG alignment & CTA' },
    { label: 'Contact Us & Office', href: '/admin/sections?tab=contact', icon: MapPin, desc: 'Contact intro, address, email & phone' },
    { label: 'Impact Metrics & Settings', href: '/admin/settings', icon: Settings, desc: 'Pan-African numbers, head office address & credentials' },
    { label: 'Our Partners', href: '/admin/partners', icon: Handshake, desc: 'Institutional collaborator & donor logos' },
    { label: 'What We Believe', href: '/admin/beliefs', icon: Sparkles, desc: 'Foundational agricultural philosophy' },
    { label: 'Why Agri Experience', href: '/admin/why-agri', icon: Award, desc: 'Competitive advantage cards and sequence' },
    { label: 'Our Expertise', href: '/admin/expertise', icon: Target, desc: 'Service domains & capability pillars' },
  ]

  // Group 2: Publishing & Media Desks
  const publishingItems = [
    { label: 'Team & Leadership', href: '/admin/team', icon: Users, desc: 'Portraits with dual-photo uploads & bios' },
    { label: 'Publications & Reports', href: '/admin/resources', icon: FileText, desc: 'Verified downloadable seed sector PDFs' },
    { label: 'Case Studies & Pillars', href: '/admin/projects', icon: Briefcase, desc: 'Digital platforms & advisory initiatives' },
    { label: 'Field Insights', href: '/admin/insights', icon: Sparkles, desc: 'Regulatory articles & research breakthroughs' },
    { label: 'Field Gallery', href: '/admin/gallery', icon: ImageIcon, desc: 'Curated field photography & activity gallery' },
    { label: 'Pan-African Map', href: '/admin/map', icon: Compass, desc: 'Regional footprint & country project data' },
  ]

  const quickLinks = [
    { label: 'Overview', href: '/admin' },
    { label: 'Page Copy', href: '/admin/sections' },
    { label: 'Team', href: '/admin/team' },
    { label: 'Publications', href: '/admin/resources' },
    { label: 'Case Studies', href: '/admin/projects' },
    { label: 'Impact Map', href: '/admin/map' },
    { label: 'Settings', href: '/admin/settings' },
  ]

  const isRouteActive = (href: string) => {
    const baseHref = href.split('?')[0]
    if (baseHref === '/admin') return pathname === '/admin'
    return pathname === baseHref || pathname.startsWith(`${baseHref}/`)
  }

  const isContentActive = contentItems.some(
    (item) => item.href !== '/admin/settings' && isRouteActive(item.href)
  )
  const isPublishingActive = publishingItems.some((item) => isRouteActive(item.href))

  // Do not render nav header on login page
  if (pathname === '/admin/login') return null

  // Block client-side /admin/* interaction when unauthenticated
  if (isUnauthenticated) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed inset-0 z-[100] bg-[#FAF9F5] flex items-center justify-center p-6"
      >
        <div className="w-full max-w-sm bg-white border border-[#0F2417]/10 rounded-2xl shadow-lg p-8 text-center space-y-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#0F2417]/20 border-t-[#0F2417] animate-spin mx-auto" />
          <p className="font-serif font-bold text-lg text-[#0F2417]">
            Session Required
          </p>
          <p className="text-xs text-[#0F2417]/70">
            Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5]/95 backdrop-blur-md border-b border-[#0F2417]/10 transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 lg:gap-6">
        {/* Brand & Desktop/Tablet Navigation */}
        <div className="flex items-center gap-4 lg:gap-6 min-w-0">
          <Link
            href="/admin"
            className="flex items-center gap-2 group shrink-0 whitespace-nowrap [word-break:normal] [overflow-wrap:normal]"
          >
            <span className="font-serif font-bold text-base text-[#0F2417] tracking-tight whitespace-nowrap [word-break:normal] [overflow-wrap:normal]">
              Agri Experience
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#0F2417]/[0.06] border border-[#0F2417]/10 text-[10px] font-mono uppercase tracking-widest text-[#0F2417] whitespace-nowrap [word-break:normal] [overflow-wrap:normal]">
              CMS
            </span>
          </Link>

          {/* Segmented Navigation Track (overflow-visible so dropdown panels are never clipped) */}
          <nav
            aria-label="Admin primary navigation"
            className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-[#0F2417]/[0.04] border border-[#0F2417]/[0.08]"
          >
            {/* Overview */}
            <Link
              href="/admin"
              className={`${navItemBaseClass} ${
                pathname === '/admin'
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <LayoutDashboard size={14} className="shrink-0" />
              <span>Overview</span>
            </Link>

            {/* Content & Brand Desks Dropdown */}
            <div ref={contentRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={contentDropdownOpen}
                onClick={() => {
                  setContentDropdownOpen(!contentDropdownOpen)
                  setPublishingDropdownOpen(false)
                }}
                className={`${navItemBaseClass} cursor-pointer ${
                  isContentActive || contentDropdownOpen
                    ? 'bg-[#0F2417]/10 text-[#0F2417] font-semibold'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                }`}
              >
                <Layers size={14} className="shrink-0" />
                <span className="xl:hidden">Content</span>
                <span className="hidden xl:inline">Site Content &amp; Copy</span>
                <span className="px-1.5 py-0.5 rounded bg-[#0F2417]/10 text-[10px] font-mono tabular-nums text-[#0F2417]/75">
                  {contentItems.length}
                </span>
                <ChevronDown
                  size={13}
                  className={`shrink-0 transition-transform duration-200 ${
                    contentDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {contentDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[min(92vw,340px)] bg-white border border-[#0F2417]/10 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 flex items-center justify-between border-b border-stone-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F2417]/50">
                      Content &amp; Identity Desks
                    </span>
                    <span className="text-[10px] font-mono tabular-nums text-[#0F2417]/40">
                      {contentItems.length} modules
                    </span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {contentItems.map((item) => {
                      const isActive = isRouteActive(item.href)
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setContentDropdownOpen(false)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all [word-break:normal] [overflow-wrap:normal] ${
                            isActive
                              ? 'bg-[#FAF9F5] text-[#0F2417] font-semibold border border-[#0F2417]/10'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] shrink-0 mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-medium block text-[#0F2417]">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-stone-500 font-normal leading-tight block">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Publishing & Media Desks Dropdown */}
            <div ref={publishingRef} className="relative">
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={publishingDropdownOpen}
                onClick={() => {
                  setPublishingDropdownOpen(!publishingDropdownOpen)
                  setContentDropdownOpen(false)
                }}
                className={`${navItemBaseClass} cursor-pointer ${
                  isPublishingActive || publishingDropdownOpen
                    ? 'bg-[#0F2417]/10 text-[#0F2417] font-semibold'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                }`}
              >
                <FileText size={14} className="shrink-0" />
                <span className="xl:hidden">Publishing</span>
                <span className="hidden xl:inline">Publishing &amp; Media</span>
                <span className="px-1.5 py-0.5 rounded bg-[#0F2417]/10 text-[10px] font-mono tabular-nums text-[#0F2417]/75">
                  {publishingItems.length}
                </span>
                <ChevronDown
                  size={13}
                  className={`shrink-0 transition-transform duration-200 ${
                    publishingDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {publishingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[min(92vw,340px)] bg-white border border-[#0F2417]/10 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 flex items-center justify-between border-b border-stone-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F2417]/50">
                      Editorial Records &amp; Roster
                    </span>
                    <span className="text-[10px] font-mono tabular-nums text-[#0F2417]/40">
                      {publishingItems.length} desks
                    </span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    {publishingItems.map((item) => {
                      const isActive = isRouteActive(item.href)
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setPublishingDropdownOpen(false)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all [word-break:normal] [overflow-wrap:normal] ${
                            isActive
                              ? 'bg-[#FAF9F5] text-[#0F2417] font-semibold border border-[#0F2417]/10'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] shrink-0 mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-medium block text-[#0F2417]">
                              {item.label}
                            </span>
                            <span className="text-[11px] text-stone-500 font-normal leading-tight block">
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Links for Quick Workflow */}
            <Link
              href="/admin/team"
              className={`hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] transition-all active:scale-[0.98] ${
                isRouteActive('/admin/team')
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <Users size={14} className="shrink-0" />
              <span>Team</span>
            </Link>

            <Link
              href="/admin/resources"
              className={`hidden 2xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] transition-all active:scale-[0.98] ${
                isRouteActive('/admin/resources')
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <FileText size={14} className="shrink-0" />
              <span>Publications</span>
            </Link>

            <Link
              href="/admin/settings"
              className={`${navItemBaseClass} ${
                isRouteActive('/admin/settings')
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <Settings size={14} className="shrink-0" />
              <span className="xl:hidden">Settings</span>
              <span className="hidden xl:inline">Settings &amp; Credentials</span>
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/en"
            target="_blank"
            title="View public website"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg text-xs font-medium text-[#0F2417]/80 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition-all active:scale-[0.98] border border-[#0F2417]/10 whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
          >
            <ExternalLink size={13} className="shrink-0" />
            <span className="hidden lg:inline">View Site</span>
          </Link>

          {adminEmail && (
            <Link
              href="/admin/settings#credentials"
              title="Manage admin login credentials"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#0F2417]/10 hover:border-[#0F2417]/30 hover:bg-[#FAF9F5] text-xs text-[#0F2417]/80 transition-all active:scale-[0.98] max-w-[170px] whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="truncate font-medium">{adminEmail}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={handleLogout}
            title="Sign out of CMS"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium text-[#0F2417]/70 hover:text-red-700 hover:bg-red-50/80 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
            aria-label="Log out of CMS"
          >
            <LogOut size={13} className="shrink-0" />
            <span className="hidden xl:inline">Sign Out</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded-xl border border-[#0F2417]/10 text-[#0F2417]/80 hover:bg-[#0F2417]/5 transition-all active:scale-95 cursor-pointer"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Quick-Access Horizontal Scroll Ribbon */}
      {!mobileMenuOpen && (
        <nav
          aria-label="Mobile quick links"
          className="md:hidden flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 py-2 border-t border-[#0F2417]/[0.06] bg-[#FAF9F5]"
        >
          {quickLinks.map((link) => {
            const active = isRouteActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal] transition-all active:scale-[0.98] ${
                  active
                    ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                    : 'bg-white border border-[#0F2417]/10 text-[#0F2417]/75 hover:text-[#0F2417]'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      )}

      {/* Touch-Optimized Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#0F2417]/10 bg-[#FAF9F5] px-4 py-4 space-y-5 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1.5">
              Editorial Overview
            </span>
            <div className="space-y-1">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors [word-break:normal] [overflow-wrap:normal] ${
                  pathname === '/admin'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'hover:bg-[#0F2417]/5 text-[#0F2417]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <LayoutDashboard size={15} className="shrink-0" />
                  Overview Dashboard
                </span>
              </Link>
              <Link
                href="/admin/settings#credentials"
                onClick={() => setMobileMenuOpen(false)}
                className={`min-h-[44px] flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors [word-break:normal] [overflow-wrap:normal] ${
                  isRouteActive('/admin/settings')
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'hover:bg-[#0F2417]/5 text-[#0F2417]'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Settings size={15} className="shrink-0" />
                  Admin Credentials &amp; Settings
                </span>
              </Link>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0F2417]/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1.5">
              Site Content &amp; Copy
            </span>
            <div className="space-y-1">
              {contentItems.map((item) => {
                const active = isRouteActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors [word-break:normal] [overflow-wrap:normal] ${
                      active
                        ? 'bg-[#0F2417] text-[#FAF9F5]'
                        : 'hover:bg-[#0F2417]/5 text-[#0F2417]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <item.icon size={15} className="shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-[#0F2417]/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1.5">
              Publishing &amp; Media Records
            </span>
            <div className="space-y-1">
              {publishingItems.map((item) => {
                const active = isRouteActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors [word-break:normal] [overflow-wrap:normal] ${
                      active
                        ? 'bg-[#0F2417] text-[#FAF9F5]'
                        : 'hover:bg-[#0F2417]/5 text-[#0F2417]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <item.icon size={15} className="shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Drawer Session & Quick Actions Footer */}
          <div className="pt-3 border-t border-[#0F2417]/10 space-y-2.5 pb-2">
            {adminEmail && (
              <Link
                href="/admin/settings#credentials"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white border border-[#0F2417]/10 text-xs text-[#0F2417]"
              >
                <span className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="truncate font-medium">{adminEmail}</span>
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F2417]/50 shrink-0 whitespace-nowrap">
                  Account
                </span>
              </Link>
            )}

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/en"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-[#0F2417]/15 text-xs font-semibold text-[#0F2417] whitespace-nowrap [word-break:normal] [overflow-wrap:normal]"
              >
                <ExternalLink size={14} className="shrink-0" />
                <span>View Live Site</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700 cursor-pointer whitespace-nowrap [word-break:normal] [overflow-wrap:normal]"
              >
                <LogOut size={14} className="shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
