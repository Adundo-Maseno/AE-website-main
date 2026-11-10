'use client'

import { useState, useEffect } from 'react'
import {
  Lightbulb,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  RefreshCw,
  Globe,
  CheckCircle2,
} from 'lucide-react'
import InsightFormModal from '@/components/admin/insight-form-modal'
import { InsightItem } from '@/lib/services/insights-service'

export default function AdminInsightsPage() {
  const [insights, setInsights] = useState<InsightItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<InsightItem | null>(null)

  const fetchInsights = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/insights')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch insights')
      setInsights(data.insights || [])
    } catch (err: any) {
      setError(err.message || 'Error loading insights')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInsights()
  }, [])

  const handleCreate = () => {
    setSelectedInsight(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: InsightItem) => {
    setSelectedInsight(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/insights/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setInsights((prev) => prev.filter((i) => i.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete insight')
    }
  }

  const filtered = insights.filter((i) => {
    const q = search.toLowerCase()
    return (
      !search ||
      i.titleEn.toLowerCase().includes(q) ||
      (i.titleFr && i.titleFr.toLowerCase().includes(q)) ||
      (i.summaryEn && i.summaryEn.toLowerCase().includes(q)) ||
      (i.author && i.author.toLowerCase().includes(q))
    )
  })

  const bilingualCount = insights.filter((i) => !!i.titleFr || !!i.summaryFr).length
  const linksCount = insights.filter((i) => !!i.link).length

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Strategic Impact
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {insights.length} Published Articles
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Insights & Field Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Manage evidence-based breakthrough insights, seed commercialization case studies, and transparent stakeholder platforms.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchInsights}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh insights list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add New Insight
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Total Insights
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {insights.length} Cases
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest">
            <Lightbulb size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Bilingual (EN / FR)
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {bilingualCount} of {insights.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Globe size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              External Resource Portals
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {linksCount} Portals
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search insights by topic, headline, author..."
          className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
        />
      </div>

      {/* Grid of Insight Cards */}
      {loading && insights.length === 0 ? (
        <div className="py-24 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
          Loading impact insights from Supabase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <Lightbulb size={32} className="mx-auto mb-2 text-charcoal/20" />
          No insights found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-black/[0.08] p-6 shadow-xs hover:shadow-lg hover:border-black/20 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="px-2 py-0.5 rounded-full bg-mist text-deep-forest font-bold">
                    #{item.order}
                  </span>
                  {item.author && (
                    <span className="text-charcoal/50 font-medium">
                      By {item.author}
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug">
                  {item.titleEn}
                </h3>

                {item.titleFr && (
                  <p className="text-[11px] text-charcoal/50 italic">
                    FR: {item.titleFr}
                  </p>
                )}

                <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3">
                  {item.summaryEn || 'No summary text provided.'}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b6b33] hover:text-deep-forest pt-2"
                  >
                    <span>Visit Resource Platform</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-black/[0.06] mt-5">
                <span className="text-[10px] text-charcoal/50">
                  {item.id.startsWith('static-') ? 'Static Preset' : 'Live Supabase'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg hover:bg-mist text-deep-forest transition-colors cursor-pointer"
                    title="Edit insight"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.titleEn)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                    title="Delete insight"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <InsightFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchInsights}
        insight={selectedInsight}
      />
    </div>
  )
}

