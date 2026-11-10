'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle, Globe, Lightbulb } from 'lucide-react'
import { InsightItem } from '@/lib/services/insights-service'

interface InsightFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  insight?: InsightItem | null
}

export default function InsightFormModal({
  isOpen,
  onClose,
  onSuccess,
  insight,
}: InsightFormModalProps) {
  const isEditing = Boolean(insight && !insight.id.startsWith('static-'))

  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [summaryEn, setSummaryEn] = useState('')
  const [summaryFr, setSummaryFr] = useState('')
  const [contentEn, setContentEn] = useState('')
  const [contentFr, setContentFr] = useState('')
  const [link, setLink] = useState('')
  const [author, setAuthor] = useState('')
  const [order, setOrder] = useState<number>(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (insight) {
      setTitleEn(insight.titleEn || '')
      setTitleFr(insight.titleFr || '')
      setSummaryEn(insight.summaryEn || '')
      setSummaryFr(insight.summaryFr || '')
      setContentEn(insight.contentEn || '')
      setContentFr(insight.contentFr || '')
      setLink(insight.link || '')
      setAuthor(insight.author || '')
      setOrder(insight.order ?? 0)
    } else {
      setTitleEn('')
      setTitleFr('')
      setSummaryEn('')
      setSummaryFr('')
      setContentEn('')
      setContentFr('')
      setLink('')
      setAuthor('')
      setOrder(0)
    }
    setError(null)
  }, [insight, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!titleEn.trim()) {
      setError('Please provide an English title.')
      return
    }

    setLoading(true)

    const payload = {
      titleEn: titleEn.trim(),
      titleFr: titleFr.trim() || undefined,
      summaryEn: summaryEn.trim() || undefined,
      summaryFr: summaryFr.trim() || undefined,
      contentEn: contentEn.trim() || undefined,
      contentFr: contentFr.trim() || undefined,
      link: link.trim() || undefined,
      author: author.trim() || undefined,
      order: Number(order) || 0,
    }

    try {
      const url = isEditing && insight?.id
        ? `/api/admin/insights/${insight.id}`
        : '/api/admin/insights'
      const method = isEditing && insight?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save insight')

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between bg-[#FAF9F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-deep-forest text-white flex items-center justify-center">
              <Lightbulb size={16} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-deep-forest">
                {isEditing ? 'Edit Impact Insight' : 'Add Impact Insight'}
              </h2>
              <p className="text-[11px] text-charcoal/60">
                Publish case summaries and seed commercialization breakthroughs.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-charcoal/60 hover:text-charcoal transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-6 px-6 border-b border-black/[0.06] bg-white">
          <button
            type="button"
            onClick={() => setTab('en')}
            className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'en'
                ? 'border-deep-forest text-deep-forest'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            English Content (Primary)
          </button>
          <button
            type="button"
            onClick={() => setTab('fr')}
            className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
              tab === 'fr'
                ? 'border-deep-forest text-deep-forest'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <Globe size={13} />
            French Translation (Optional)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle size={15} className="shrink-0 text-red-600 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {tab === 'en' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Insight Headline (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Introducing new drought tolerant maize varieties into the market"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Brief Summary (English) *
                </label>
                <textarea
                  rows={3}
                  value={summaryEn}
                  onChange={(e) => setSummaryEn(e.target.value)}
                  placeholder="2-3 sentence overview displayed on the cards..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Full Background & Key Outcomes (English) <span className="text-charcoal/40 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  placeholder="Detailed findings, stakeholder partnerships, and methodology..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Titre de l&apos;Aperçu (Français)
                </label>
                <input
                  type="text"
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  placeholder="Titre en français..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Résumé en Français
                </label>
                <textarea
                  rows={3}
                  value={summaryFr}
                  onChange={(e) => setSummaryFr(e.target.value)}
                  placeholder="Résumé pour les cartes..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Résultats et méthodologie (Français)
                </label>
                <textarea
                  rows={4}
                  value={contentFr}
                  onChange={(e) => setContentFr(e.target.value)}
                  placeholder="Contenu complet..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-black/[0.06]">
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Author / Lead Advisor
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Mulemia Maina or Agri Experience Team"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-deep-forest mb-1">
              External Resource Link <span className="text-charcoal/40 font-normal">(optional)</span>
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="e.g. http://www.seedsectorplatformkenya.com/"
              className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white font-mono"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/[0.06]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-bold text-charcoal/70 hover:bg-black/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={14} />
                  {isEditing ? 'Save Changes' : 'Create Insight'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

