'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/admin-header'
import { Type, Sparkles, Globe, Eye, Save, CheckCircle2, AlertCircle } from 'lucide-react'

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

const SECTION_CONFIGS = [
  {
    key: 'home_hero',
    page: 'home',
    title: 'Home Hero Headline & Tagline',
    desc: 'The prominent editorial headline and sub-statement displayed on the homepage hero.',
    hasTitle: true,
    hasSubtitle: true,
    hasContent: true,
    contentLabel: 'CTA Button Label',
    subtitleLabel: 'Hero Subtitle / Description',
  },
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
    contentLabel: 'Vision Statement Body',
  },
  {
    key: 'about_mission',
    page: 'about',
    title: 'Our Mission Statement',
    desc: 'The core operational mission driving Agri Experience interventions.',
    hasTitle: true,
    hasContent: true,
    contentLabel: 'Mission Statement Body',
  },
  {
    key: 'about_goal',
    page: 'about',
    title: 'Our Strategic Goal',
    desc: 'The strategic impact goal and SDG commitments.',
    hasTitle: true,
    hasContent: true,
    contentLabel: 'Goal Statement Body',
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
    key: 'expertise_header',
    page: 'about',
    title: '"Our Expertise" Header & Intro',
    desc: 'Heading and narrative introducing the 5 service domains on /about.',
    hasTitle: true,
    hasSubtitle: true,
    subtitleLabel: 'Scope of Expertise Summary',
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
]

export default function AdminSectionsPage() {
  const [sections, setSections] = useState<Record<string, SectionRecord>>({})
  const [activeTab, setActiveTab] = useState<'home' | 'about'>('home')
  const [langTab, setLangTab] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(true)
  const [savingKey, setSavingKey] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ key: string; success: boolean; msg: string } | null>(null)

  const fetchSections = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/sections')
      const data = await res.json()
      if (data.success && data.sections) {
        setSections(data.sections)
      }
    } catch (err) {
      console.error('Failed to load sections:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSections()
  }, [])

  const handleFieldChange = (key: string, field: keyof SectionRecord, value: string) => {
    setSections((prev) => ({
      ...prev,
      [key]: {
        ...(prev[key] || { sectionKey: key, page: activeTab }),
        [field]: value,
      },
    }))
  }

  const handleSave = async (cfg: (typeof SECTION_CONFIGS)[0]) => {
    setSavingKey(cfg.key)
    setFeedback(null)
    const current = sections[cfg.key] || {
      sectionKey: cfg.key,
      page: cfg.page,
    }

    try {
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
        throw new Error(data.error || 'Failed to save section')
      }
      setFeedback({ key: cfg.key, success: true, msg: 'Saved and live on website!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ key: cfg.key, success: false, msg: err.message || 'Save failed' })
    } finally {
      setSavingKey(null)
    }
  }

  const filteredConfigs = SECTION_CONFIGS.filter((c) => c.page === activeTab)

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0F2417]/60 font-mono mb-1">
              <Type size={14} className="text-[#C29B38]" />
              <span>Editorial Desk 07</span>
              <span>/</span>
              <span>Page Taglines, Vision, Mission & Goals</span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Page Content, Hero Taglines & Vision
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Manage every editorial headline, philosophy statement, vision, mission, and strategic goal across the public website.
            </p>
          </div>

          {/* Bilingual Switcher */}
          <div className="flex items-center gap-2 bg-white border border-[#0F2417]/15 rounded-xl p-1 shadow-sm self-start">
            <button
              onClick={() => setLangTab('en')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                langTab === 'en'
                  ? 'bg-[#0F2417] text-[#FAF9F5]'
                  : 'text-[#0F2417]/70 hover:text-[#0F2417]'
              }`}
            >
              <Globe size={13} />
              English Copy
            </button>
            <button
              onClick={() => setLangTab('fr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
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

        {/* Page Filter Tabs */}
        <div className="flex gap-2 border-b border-[#0F2417]/10 pb-px">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
              activeTab === 'home'
                ? 'border-[#0F2417] text-[#0F2417]'
                : 'border-transparent text-[#0F2417]/50 hover:text-[#0F2417]'
            }`}
          >
            Home Page Sections
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
              activeTab === 'about'
                ? 'border-[#0F2417] text-[#0F2417]'
                : 'border-transparent text-[#0F2417]/50 hover:text-[#0F2417]'
            }`}
          >
            About Page (Vision, Mission, Goal & Expertise)
          </button>
        </div>

        {/* Section Cards */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading editorial sections...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredConfigs.map((cfg) => {
              const current = sections[cfg.key] || {}
              const isSaving = savingKey === cfg.key
              const feed = feedback?.key === cfg.key ? feedback : null

              const titleVal = (langTab === 'en' ? current.titleEn : current.titleFr) || ''
              const subVal = (langTab === 'en' ? current.subtitleEn : current.subtitleFr) || ''
              const contentVal = (langTab === 'en' ? current.contentEn : current.contentFr) || ''

              return (
                <div
                  key={cfg.key}
                  className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0F2417]/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                          {cfg.title}
                        </h2>
                        <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[#0F2417]/5 text-[#0F2417]/60">
                          {cfg.key}
                        </span>
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
                        onClick={() => handleSave(cfg)}
                        disabled={isSaving}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F2417] text-[#FAF9F5] rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-sm disabled:opacity-50"
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
                              e.target.value
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
                              e.target.value
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
                              e.target.value
                            )
                          }
                          placeholder={langTab === 'en' ? 'Enter statement in English...' : 'Entrer la déclaration en français...'}
                          className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417] focus:bg-white"
                        />
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
