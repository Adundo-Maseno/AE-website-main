'use client'

import { useState, useEffect } from 'react'
import { X, Award, Globe, Hash } from 'lucide-react'
import { WhyAgriCardData } from '@/lib/services/why-agri-service'

interface WhyAgriFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  card: WhyAgriCardData | null
}

export default function WhyAgriFormModal({
  isOpen,
  onClose,
  onSuccess,
  card,
}: WhyAgriFormModalProps) {
  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [textEn, setTextEn] = useState('')
  const [textFr, setTextFr] = useState('')
  const [order, setOrder] = useState<number>(0)
  const [active, setActive] = useState<boolean>(true)

  useEffect(() => {
    if (card) {
      setTitleEn(card.titleEn || '')
      setTitleFr(card.titleFr || '')
      setTextEn(card.textEn || '')
      setTextFr(card.textFr || '')
      setOrder(card.order ?? 0)
      setActive(card.active ?? true)
    } else {
      setTitleEn('')
      setTitleFr('')
      setTextEn('')
      setTextFr('')
      setOrder(0)
      setActive(true)
    }
    setError(null)
  }, [card, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!textEn.trim()) {
      setError('Card statement text in English is required')
      setLoading(false)
      return
    }

    const payload = {
      titleEn: titleEn.trim() || null,
      titleFr: titleFr.trim() || null,
      textEn: textEn.trim(),
      textFr: textFr.trim() || null,
      order: Number(order) || 0,
      active,
    }

    try {
      const url = card ? `/api/admin/why-agri/${card.id}` : '/api/admin/why-agri'
      const method = card ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save card')
      }
      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#FAF9F5] border border-[#0F2417]/10 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0F2417] text-[#FAF9F5] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C29B38]/20 flex items-center justify-center text-[#C29B38]">
              <Award size={20} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-tight">
                {card ? 'Edit "Why Agri Experience" Card' : 'Add New "Why Agri Experience" Card'}
              </h2>
              <p className="text-xs text-[#FAF9F5]/70">
                Pillars featured in the horizontal scroll sequence and home advantage grid
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#FAF9F5]/60 hover:text-[#FAF9F5] hover:bg-white/10 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Bilingual Tabs */}
        <div className="flex border-b border-[#0F2417]/10 bg-white/60 px-6 pt-3">
          <button
            type="button"
            onClick={() => setTab('en')}
            className={`pb-2.5 px-4 text-xs font-bold tracking-wider uppercase border-b-2 transition flex items-center gap-1.5 ${
              tab === 'en'
                ? 'border-[#0F2417] text-[#0F2417]'
                : 'border-transparent text-[#0F2417]/40 hover:text-[#0F2417]'
            }`}
          >
            <Globe size={13} />
            English
          </button>
          <button
            type="button"
            onClick={() => setTab('fr')}
            className={`pb-2.5 px-4 text-xs font-bold tracking-wider uppercase border-b-2 transition flex items-center gap-1.5 ${
              tab === 'fr'
                ? 'border-[#0F2417] text-[#0F2417]'
                : 'border-transparent text-[#0F2417]/40 hover:text-[#0F2417]'
            }`}
          >
            <Globe size={13} />
            Français
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {error}
            </div>
          )}

          {tab === 'en' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Headline Tag (Optional)
                </label>
                <input
                  type="text"
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Evidence-Based Insight"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Statement Text (English) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={textEn}
                  onChange={(e) => setTextEn(e.target.value)}
                  placeholder="We carefully develop recommendations that are grounded in behavioural patterns and evidence."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Headline Tag (French)
                </label>
                <input
                  type="text"
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  placeholder="ex. Des perspectives fondées sur des preuves"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Statement Text (French)
                </label>
                <textarea
                  rows={4}
                  value={textFr}
                  onChange={(e) => setTextFr(e.target.value)}
                  placeholder="Nous élaborons soigneusement des recommandations ancrées dans les comportements..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Hash size={12} className="text-[#0F2417]/60" />
                Sort Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                Visibility
              </label>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition border ${
                  active
                    ? 'bg-[#0F2417] text-[#FAF9F5] border-[#0F2417]'
                    : 'bg-stone-200 text-stone-600 border-stone-300'
                }`}
              >
                {active ? '● Live Active' : '○ Hidden'}
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#0F2417]/10">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#0F2417] text-[#FAF9F5] hover:bg-[#0F2417]/90 transition shadow-sm disabled:opacity-50"
            >
              {loading ? 'Saving...' : card ? 'Save Changes' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
