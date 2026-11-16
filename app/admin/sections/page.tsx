'use client'

import { useState, useEffect } from 'react'
import {
  Globe,
  Save,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Image as ImageIcon,
} from 'lucide-react'
import ImageUploader from '@/components/admin/image-uploader'

interface SectionRecord {
  id?: string
  sectionKey: string
  page: string
  titleEn?: string | null
  titleFr?: string | null
  subtitleEn?: string | null
  subtitleFr?: string | null
  contentEn?: string | null
  contentFr?: string | null
  mediaUrl?: string | null
  extraJson?: string | null
}

type PageTabKey = 'home' | 'about' | 'our-work' | 'our-impact' | 'contact'

interface SectionConfig {
  key: string
  page: PageTabKey
  title: string
  desc: string
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasContent?: boolean
  hasMedia?: boolean
  subtitleLabel?: string
  contentLabel?: string
  mediaLabel?: string
}

const SECTION_CONFIGS: SectionConfig[] = [
  // ── HOME PAGE ──
  {
    key: 'home_hero',
    page: 'home',
    title: 'Home Hero Headline & Tagline',
    desc: 'The prominent editorial headline and sub-statement displayed on the homepage hero.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    hasMedia: true,
    contentLabel: 'CTA Button Label',
    subtitleLabel: 'Hero Subtitle / Description',
    mediaLabel: 'Hero Background Video / Image URL',
  },
  {
    key: 'why_agri_header',
    page: 'home',
    title: '"Why Agri Experience" Header & Tagline',
    desc: 'The title and category pill introducing the advantage section.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Section Eyebrow / Tagline (e.g. Our Advantage)',
  },
  {
    key: 'beliefs_header',
    page: 'home',
    title: '"What We Believe" Header',
    desc: 'The section heading for core agricultural philosophy.',
    hasTitle: true,
  },
  {
    key: 'partners_header',
    page: 'home',
    title: '"Our Partners" Header & Narrative',
    desc: 'Heading and descriptive lead text above the institutional partner marquee.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Partnership Impact Narrative',
  },
  {
    key: 'home_cta',
    page: 'home',
    title: 'Home Page CTA Banner',
    desc: 'Bottom conversion banner inviting partnerships on the home page.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Button Label',
  },

  // ── ABOUT PAGE ──
  {
    key: 'about_hero',
    page: 'about',
    title: 'About Page Hero Headline',
    desc: 'The header title and lead paragraph introducing the organisation on /about.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Lead Introduction Paragraph',
  },
  {
    key: 'about_vision',
    page: 'about',
    title: 'Our Vision Statement',
    desc: 'The overarching organizational vision for African agriculture.',
    hasTitle: true,
    hasContent: true,
    hasMedia: true,
    contentLabel: 'Vision Statement Body',
    mediaLabel: 'Vision Section Photography',
  },
  {
    key: 'about_mission',
    page: 'about',
    title: 'Our Mission Statement',
    desc: 'The core operational mission driving Agri Experience interventions.',
    hasTitle: true,
    hasContent: true,
    hasMedia: true,
    contentLabel: 'Mission Statement Body',
    mediaLabel: 'Mission Section Photography',
  },
  {
    key: 'about_goal',
    page: 'about',
    title: 'Our Strategic Goal',
    desc: 'The strategic impact goal and SDG commitments.',
    hasTitle: true,
    hasContent: true,
    hasMedia: true,
    contentLabel: 'Goal Statement Body',
    mediaLabel: 'Strategic Goal Photography',
  },
  {
    key: 'expertise_header',
    page: 'about',
    title: '"Our Expertise" Header & Intro',
    desc: 'Heading and narrative introducing the 5 service domains on /about.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Scope of Expertise Summary',
  },
  {
    key: 'about_cta',
    page: 'about',
    title: 'About Page CTA Banner',
    desc: 'Bottom conversion banner inviting inquiries on /about.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Button Label',
  },

  // ── OUR WORK & 6 PILLARS ──
  {
    key: 'our_work_hero',
    page: 'our-work',
    title: 'Our Work: Main Overview Hero',
    desc: 'The primary headline and lead narrative on the main /our-work portal.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Overview Subtitle / Narrative',
  },
  {
    key: 'digital_platforms_hero',
    page: 'our-work',
    title: 'Pillar 1: Digital Platforms Hero',
    desc: 'Hero headline and subtitle on /our-work/digital-platforms.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'technical_studies_hero',
    page: 'our-work',
    title: 'Pillar 2: Technical Studies Hero',
    desc: 'Hero headline and subtitle on /our-work/technical-studies.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'project_implementation_hero',
    page: 'our-work',
    title: 'Pillar 3: Project Implementation Hero',
    desc: 'Hero headline and subtitle on /our-work/project-implementation.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'client_advisory_hero',
    page: 'our-work',
    title: 'Pillar 4: Client Advisory Hero',
    desc: 'Hero headline and subtitle on /our-work/client-advisory.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'capacity_building_hero',
    page: 'our-work',
    title: 'Pillar 5: Capacity Building Hero',
    desc: 'Hero headline and subtitle on /our-work/capacity-building.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },
  {
    key: 'stakeholder_convenings_hero',
    page: 'our-work',
    title: 'Pillar 6: Stakeholder Convenings Hero',
    desc: 'Hero headline and subtitle on /our-work/stakeholder-convenings.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Pillar Eyebrow / Tagline',
  },

  // ── OUR IMPACT ──
  {
    key: 'our_impact_hero',
    page: 'our-impact',
    title: 'Our Impact: Hero Headline',
    desc: 'Headline and introduction above the interactive Pan-African impact map.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Impact Lead Subtitle',
  },
  {
    key: 'our_impact_sdgs',
    page: 'our-impact',
    title: 'Sustainable Development Goals (SDGs) Alignment Header',
    desc: 'Section headline, category tag, and narrative introducing the SDG alignment cards.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'Header Eyebrow Tagline (e.g. Sustainable Development Goals)',
    contentLabel: 'Narrative Lead Description',
  },
  {
    key: 'our_impact_cta',
    page: 'our-impact',
    title: 'Our Impact: Bottom CTA Banner',
    desc: 'Call-to-action banner inviting partners to collaborate on seed systems.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'CTA Narrative',
    contentLabel: 'Primary Button Label',
  },

  // ── CONTACT US ──
  {
    key: 'contact_hero',
    page: 'contact',
    title: 'Contact Us: Hero Headline',
    desc: 'Headline and welcome subtitle on /contact.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Welcome Subtitle',
  },
  {
    key: 'contact_info',
    page: 'contact',
    title: 'Regional Headquarters & Inquiry Card',
    desc: 'Physical office address, general contact email, and office location card title.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    subtitleLabel: 'Physical Office Address',
    contentLabel: 'Inquiry Email Address',
  },
]

const TABS: { id: PageTabKey; label: string }[] = [
  { id: 'home', label: 'Home Page' },
  { id: 'about', label: 'About Us' },
  { id: 'our-work', label: 'Our Work & 6 Pillars' },
  { id: 'our-impact', label: 'Our Impact' },
  { id: 'contact', label: 'Contact Us' },
]

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Record<string, SectionRecord>>({})
  const [activeTab, setActiveTab] = useState<PageTabKey>('home')
  const [langTab, setLangTab] = useState<'en' | 'fr'>('en')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [savingAll, setSavingAll] = useState(false)
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set())
  const [expandedUploaders, setExpandedUploaders] = useState<Set<string>>(new Set())
  const [feedback, setFeedback] = useState<{ key: string; success: boolean; msg: string } | null>(null)
  const [batchFeedback, setBatchFeedback] = useState<{ success: boolean; msg: string } | null>(null)

  const fetchSections = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/sections')
      const data = await res.json()
      if (data.success && data.sections) {
        setSections(data.sections)
        setDirtyKeys(new Set())
      }
    } catch (err) {
      console.error('Failed to load sections:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search).get('tab')
      if (p && ['home', 'about', 'our-work', 'our-impact', 'contact'].includes(p)) {
        setActiveTab(p as PageTabKey)
      }
    }
    fetchSections()
  }, [])

  const handleFieldChange = (
    key: string,
    field: keyof SectionRecord,
    value: string,
    page?: PageTabKey
  ) => {
    const resolvedPage = page || SECTION_CONFIGS.find((c) => c.key === key)?.page || activeTab
    setSections((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { sectionKey: key, page: resolvedPage }),
        [field]: value,
      },
    }))
    setDirtyKeys((prev) => {
      if (prev.has(key)) return prev
      const next = new Set(prev)
      next.add(key)
      return next
    })
  }

  const saveSingleSection = async (cfg: SectionConfig): Promise<boolean> => {
    const current = sections[cfg.key] || {
      sectionKey: cfg.key,
      page: cfg.page,
    }

    const res = await fetch('/api/admin/sections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionKey: cfg.key,
        page: cfg.page,
        titleEn: current.titleEn,
        titleFr: current.titleFr,
        subtitleEn: current.subtitleEn,
        subtitleFr: current.subtitleFr,
        contentEn: current.contentEn,
        contentFr: current.contentFr,
        mediaUrl: current.mediaUrl,
        extraJson: current.extraJson,
      }),
    })
    const data = await res.json()
    if (!res.ok || !data.success) {
      throw new Error(data.error || `Failed to save ${cfg.key}`)
    }

    setDirtyKeys((prev) => {
      if (!prev.has(cfg.key)) return prev
      const next = new Set(prev)
      next.delete(cfg.key)
      return next
    })
    return true
  }

  const handleSave = async (cfg: SectionConfig) => {
    setSavingKey(cfg.key)
    setFeedback(null)

    try {
      await saveSingleSection(cfg)
      setFeedback({ key: cfg.key, success: true, msg: 'Saved and live on website!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ key: cfg.key, success: false, msg: err.message || 'Save failed' })
    } finally {
      setSavingKey(null)
    }
  }

  const tabDirtyConfigs = SECTION_CONFIGS.filter(
    (c) => c.page === activeTab && dirtyKeys.has(c.key)
  )

  const handleSaveAll = async () => {
    if (tabDirtyConfigs.length === 0) return
    setSavingAll(true)
    setBatchFeedback(null)
    let savedCount = 0

    try {
      for (const cfg of tabDirtyConfigs) {
        setSavingKey(cfg.key)
        await saveSingleSection(cfg)
        savedCount++
      }
      setBatchFeedback({
        success: true,
        msg: `Saved ${savedCount} section${savedCount === 1 ? '' : 's'} sequentially!`,
      })
      setTimeout(() => setBatchFeedback(null), 4000)
    } catch (err: any) {
      setBatchFeedback({
        success: false,
        msg: err.message || `Saved ${savedCount} before encountering an error`,
      })
    } finally {
      setSavingKey(null)
      setSavingAll(false)
    }
  }

  const toggleUploader = (key: string) => {
    setExpandedUploaders((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const trimmedSearch = searchQuery.trim().toLowerCase()
  const filteredConfigs = trimmedSearch
    ? SECTION_CONFIGS.filter(
        (c) =>
          c.title.toLowerCase().includes(trimmedSearch) ||
          c.key.toLowerCase().includes(trimmedSearch) ||
          c.desc.toLowerCase().includes(trimmedSearch)
      )
    : SECTION_CONFIGS.filter((c) => c.page === activeTab)

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Site Content, Taglines & Narratives
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Edit the hero headlines, lead descriptions, vision, mission, and strategic narratives across all website pages and pillars.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Search Filter */}
            <div className="relative w-64 sm:w-72">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0F2417]/40"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections by title, key..."
                aria-label="Search sections"
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#0F2417]/15 rounded-xl text-xs text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#0F2417]/40 hover:text-[#0F2417] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Bilingual Switcher */}
            <div className="flex items-center gap-2 bg-white border border-[#0F2417]/15 rounded-xl p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setLangTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  langTab === 'en'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                <Globe size={13} />
                English Copy
              </button>
              <button
                type="button"
                onClick={() => setLangTab('fr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  langTab === 'fr'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                <Globe size={13} />
                Français Copy
              </button>
            </div>
          </div>
        </div>

        {/* Page Filter Tabs + Save All Changes */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#0F2417]/10 pb-2 lg:pb-0">
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => {
              const tabDirtyCount = SECTION_CONFIGS.filter(
                (c) => c.page === tab.id && dirtyKeys.has(c.key)
              ).length

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id)
                    if (trimmedSearch) setSearchQuery('')
                  }}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition cursor-pointer inline-flex items-center gap-1.5 ${
                    !trimmedSearch && activeTab === tab.id
                      ? 'border-[#0F2417] text-[#0F2417]'
                      : 'border-transparent text-[#0F2417]/50 hover:text-[#0F2417]'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tabDirtyCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                      {tabDirtyCount}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-3 pb-2 lg:pb-1">
            {batchFeedback && (
              <span
                className={`text-xs flex items-center gap-1 font-medium ${
                  batchFeedback.success ? 'text-emerald-700' : 'text-red-600'
                }`}
              >
                {batchFeedback.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                {batchFeedback.msg}
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={tabDirtyConfigs.length === 0 || savingAll || savingKey !== null}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F2417] text-[#FAF9F5] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-xs disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
            >
              <Save size={13} />
              <span>
                {savingAll
                  ? 'Saving All...'
                  : tabDirtyConfigs.length > 0
                  ? `Save All Changes (${tabDirtyConfigs.length})`
                  : 'Save All Changes'}
              </span>
            </button>
          </div>
        </div>

        {trimmedSearch && (
          <div className="text-xs text-[#0F2417]/70 flex items-center justify-between bg-white px-4 py-2.5 rounded-xl border border-[#0F2417]/10">
            <span>
              Showing <strong>{filteredConfigs.length}</strong> section
              {filteredConfigs.length === 1 ? '' : 's'} matching &quot;{searchQuery.trim()}&quot; across all tabs
            </span>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#0F2417] hover:underline cursor-pointer"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Section Cards */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading editorial sections...
          </div>
        ) : filteredConfigs.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#0F2417]/50 bg-white border border-[#0F2417]/10 rounded-2xl">
            No sections match your search query.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredConfigs.map((cfg) => {
              const current = sections[cfg.key] || {}
              const isSaving = savingKey === cfg.key
              const isDirty = dirtyKeys.has(cfg.key)
              const feed = feedback?.key === cfg.key ? feedback : null

              const titleVal = (langTab === 'en' ? current.titleEn : current.titleFr) || ''
              const subVal = (langTab === 'en' ? current.subtitleEn : current.subtitleFr) || ''
              const contentVal = (langTab === 'en' ? current.contentEn : current.contentFr) || ''
              const mediaVal = current.mediaUrl || ''
              const isUploaderExpanded = expandedUploaders.has(cfg.key)

              return (
                <div
                  key={cfg.key}
                  className={`bg-white border rounded-2xl p-6 shadow-xs hover:shadow-sm transition space-y-4 ${
                    isDirty ? 'border-amber-300 ring-1 ring-amber-200/70' : 'border-[#0F2417]/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0F2417]/10">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                          {cfg.title}
                        </h2>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#0F2417]/5 text-[#0F2417]/60">
                          {cfg.key}
                        </span>
                        {trimmedSearch && (
                          <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                            {cfg.page}
                          </span>
                        )}
                        {isDirty && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            Unsaved changes
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#0F2417]/70 mt-0.5">{cfg.desc}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {feed && (
                        <span
                          className={`text-xs flex items-center gap-1 font-medium ${
                            feed.success ? 'text-emerald-700' : 'text-red-600'
                          }`}
                        >
                          {feed.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                          {feed.msg}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSave(cfg)}
                        disabled={isSaving || savingAll}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F2417] text-[#FAF9F5] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-xs disabled:opacity-50 cursor-pointer"
                      >
                        <Save size={13} />
                        {isSaving ? 'Saving...' : 'Save & Publish'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 pt-1">
                    {/* Headline Title */}
                    {cfg.hasTitle && (
                      <div>
                        <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                          Headline / Title ({langTab === 'en' ? 'English' : 'Français'})
                        </label>
                        <input
                          type="text"
                          value={titleVal}
                          onChange={(e) =>
                            handleFieldChange(
                              cfg.key,
                              langTab === 'en' ? 'titleEn' : 'titleFr',
                              e.target.value,
                              cfg.page
                            )
                          }
                          placeholder={langTab === 'en' ? 'Enter title in English...' : 'Entrer le titre en français...'}
                          className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] focus:bg-white"
                        />
                      </div>
                    )}

                    {/* Subtitle / Eyebrow */}
                    {cfg.hasSubtitle && (
                      <div>
                        <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                          {cfg.subtitleLabel || 'Subtitle / Description'} ({langTab === 'en' ? 'English' : 'Français'})
                        </label>
                        <textarea
                          rows={2}
                          value={subVal}
                          onChange={(e) =>
                            handleFieldChange(
                              cfg.key,
                              langTab === 'en' ? 'subtitleEn' : 'subtitleFr',
                              e.target.value,
                              cfg.page
                            )
                          }
                          placeholder={langTab === 'en' ? 'Enter narrative in English...' : 'Entrer la description en français...'}
                          className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] focus:bg-white"
                        />
                      </div>
                    )}

                    {/* Content / Statement Body */}
                    {cfg.hasContent && (
                      <div>
                        <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                          {cfg.contentLabel || 'Statement Content'} ({langTab === 'en' ? 'English' : 'Français'})
                        </label>
                        <textarea
                          rows={3}
                          value={contentVal}
                          onChange={(e) =>
                            handleFieldChange(
                              cfg.key,
                              langTab === 'en' ? 'contentEn' : 'contentFr',
                              e.target.value,
                              cfg.page
                            )
                          }
                          placeholder={langTab === 'en' ? 'Enter statement in English...' : 'Entrer la déclaration en français...'}
                          className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] focus:bg-white"
                        />
                      </div>
                    )}

                    {/* Media URL */}
                    {cfg.hasMedia && (
                      <div className="space-y-2.5 pt-1 border-t border-[#0F2417]/5">
                        <div className="flex items-center justify-between gap-2">
                          <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider">
                            {cfg.mediaLabel || 'Media URL'}
                          </label>
                          <button
                            type="button"
                            onClick={() => toggleUploader(cfg.key)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0F2417]/70 hover:text-[#0F2417] cursor-pointer"
                          >
                            <ImageIcon size={12} />
                            <span>{isUploaderExpanded ? 'Hide Image Uploader' : 'Upload / Pick Image'}</span>
                          </button>
                        </div>
                        <input
                          type="text"
                          value={mediaVal}
                          onChange={(e) =>
                            handleFieldChange(cfg.key, 'mediaUrl', e.target.value, cfg.page)
                          }
                          placeholder={
                            cfg.key === 'home_hero'
                              ? '/Videos/hero-video.mp4 or /uploads/...'
                              : '/our-vision-2026.jpg or /uploads/...'
                          }
                          className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] focus:bg-white font-mono"
                        />
                        {isUploaderExpanded && (
                          <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#0F2417]/10">
                            <ImageUploader
                              value={/\.(mp4|webm|mov)$/i.test(mediaVal) ? '' : mediaVal}
                              onChange={(url) =>
                                handleFieldChange(cfg.key, 'mediaUrl', url, cfg.page)
                              }
                              label="Choose or upload image asset"
                              folder="gallery"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
