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
import {
  SECTION_CONFIGS,
  SECTION_TABS,
  type PageTabKey,
  type SectionConfig,
} from '@/lib/cms-sections-config'

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
            {SECTION_TABS.map((tab) => {
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
