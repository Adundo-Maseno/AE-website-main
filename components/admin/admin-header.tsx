'use client'

import { useState, useRef, useEffect } from 'react'
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
  Handshake,
  Sparkles,
  Award,
  Target,
  Type,
  Settings,
  ChevronDown,
  Layers,
} from 'lucide-react'

export default function AdminHeader({ adminEmail }: { adminEmail?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contentDropdownOpen, setContentDropdownOpen] = useState(false)
  const [publishingDropdownOpen, setPublishingDropdownOpen] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)
  const publishingRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
        setContentDropdownOpen(false)
      }
      if (publishingRef.current && !publishingRef.current.contains(e.target as Node)) {
        setPublishingDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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
    { label: 'Impact Metrics & Contact Info', href: '/admin/settings', icon: Settings, desc: 'Pan-African numbers, head office address & email' },
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
    { label: 'Pan-African Map', href: '/admin/map', icon: Compass, desc: 'Regional footprint & country project data' },
  ]

  const isContentActive = contentItems.some((item) => pathname.startsWith(item.href))
  const isPublishingActive = publishingItems.some((item) => pathname.startsWith(item.href))

  // Do not render nav header on login page
  if (pathname === '/admin/login') return null

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FAF9F5] border-b border-[#0F2417]/10 transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand & Left Navigation */}
        <div className="flex items-center gap-8">
          <Link href="/admin" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-8 h-8 rounded-lg bg-white border border-[#0F2417]/15 p-1 flex items-center justify-center shadow-xs group-hover:border-[#0F2417]/40 transition-colors">
              <Image
                src="/agri-experience-logo.png"
                alt="Agri Experience"
                width={24}
                height={24}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-base text-[#0F2417] tracking-tight">
                Agri Experience
              </span>
              <span className="text-[11px] font-mono text-[#0F2417]/50 tracking-wider">
                CMS
              </span>
            </div>
          </Link>

          {/* Clean Segmented Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {/* Overview */}
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin'
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <LayoutDashboard size={14} />
              <span>Overview</span>
            </Link>

            {/* Content & Brand Desks Dropdown */}
            <div ref={contentRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setContentDropdownOpen(!contentDropdownOpen)
                  setPublishingDropdownOpen(false)
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isContentActive || contentDropdownOpen
                    ? 'bg-[#0F2417]/10 text-[#0F2417] font-semibold'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                }`}
              >
                <Layers size={14} />
                <span>Site Content & Copy</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${contentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {contentDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#0F2417]/10 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#0F2417]/40 border-b border-stone-100">
                    Content & Identity Desks
                  </div>
                  <div className="py-1">
                    {contentItems.map((item) => {
                      const isActive = pathname.startsWith(item.href)
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setContentDropdownOpen(false)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#FAF9F5] text-[#0F2417] font-semibold'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] shrink-0 mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div>
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
                onClick={() => {
                  setPublishingDropdownOpen(!publishingDropdownOpen)
                  setContentDropdownOpen(false)
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isPublishingActive || publishingDropdownOpen
                    ? 'bg-[#0F2417]/10 text-[#0F2417] font-semibold'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
                }`}
              >
                <FileText size={14} />
                <span>Publishing & Media</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${publishingDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {publishingDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[#0F2417]/10 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-wider text-[#0F2417]/40 border-b border-stone-100">
                    Editorial Records & Roster
                  </div>
                  <div className="py-1">
                    {publishingItems.map((item) => {
                      const isActive = pathname.startsWith(item.href)
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setPublishingDropdownOpen(false)}
                          className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            isActive
                              ? 'bg-[#FAF9F5] text-[#0F2417] font-semibold'
                              : 'hover:bg-stone-50 text-stone-700'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center text-[#0F2417] shrink-0 mt-0.5">
                            <Icon size={14} />
                          </div>
                          <div>
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
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/team'
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <Users size={14} />
              <span>Team</span>
            </Link>

            <Link
              href="/admin/resources"
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                pathname === '/admin/resources'
                  ? 'bg-[#0F2417] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5'
              }`}
            >
              <FileText size={14} />
              <span>Publications</span>
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/en"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#0F2417]/80 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition-colors border border-[#0F2417]/10"
          >
            <ExternalLink size={13} />
            <span>View Site</span>
          </Link>

          {adminEmail && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#0F2417]/10 text-xs text-[#0F2417]/80">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[150px] font-medium">{adminEmail}</span>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#0F2417]/70 hover:text-red-700 hover:bg-red-50/80 transition-colors cursor-pointer"
            aria-label="Log out of CMS"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0F2417]/80 hover:bg-[#0F2417]/5 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#0F2417]/10 bg-[#FAF9F5] px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1">
              Editorial Overview
            </span>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#0F2417]/5"
            >
              <LayoutDashboard size={14} />
              Overview Dashboard
            </Link>
          </div>

          <div className="pt-2 border-t border-[#0F2417]/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1">
              Site Content & Copy
            </span>
            <div className="space-y-0.5">
              {contentItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#0F2417]/5"
                >
                  <item.icon size={14} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-[#0F2417]/10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#0F2417]/50 px-2 block mb-1">
              Publishing & Media Records
            </span>
            <div className="space-y-0.5">
              {publishingItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#0F2417]/5"
                >
                  <item.icon size={14} />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
