'use client'

import { useState, useEffect } from 'react'
import { X, Target, Globe, Hash, Link as LinkIcon } from 'lucide-react'
import { ExpertisePillarData } from '@/lib/services/expertise-service'

interface ExpertiseFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  pillar: ExpertisePillarData | null
}

const ROUTE_OPTIONS = [
  { value: '/our-work/project-implementation', label: 'Project Implementation' },
  { value: '/our-work/client-advisory', label: 'Client Advisory' },
  { value: '/our-work/capacity-building', label: 'Capacity Building' },
  { value: '/our-work', label: 'Our Work (General)' },
  { value: '/our-impact', label: 'Our Impact' },
]

export default function ExpertiseFormModal({
  isOpen,
  onClose,
  onSuccess,
  pillar,
}: ExpertiseFormModalProps) {
  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [descEn, setDescEn] = useState('')
  const [descFr, setDescFr] = useState('')
  const [route, setRoute] = useState(ROUTE_OPTIONS[0].value)
  const [order, setOrder] = useState<number>(0)
  const [active, setActive] = useState<boolean>(true)

  useEffect(() => {
    if (pillar) {
      setTitleEn(pillar.titleEn || '')
      setTitleFr(pillar.titleFr || '')
      setDescEn(pillar.descEn || '')
      setDescFr(pillar.descFr || '')
      setRoute(pillar.route || ROUTE_OPTIONS[0].value)
      setOrder(pillar.order ?? 0)
      setActive(pillar.active ?? true)
    } else {
      setTitleEn('')
      setTitleFr('')
      setDescEn('')
      setDescFr('')
      setRoute(ROUTE_OPTIONS[0].value)
      setOrder(0)
      setActive(true)
    }
    setError(null)
  }, [pillar, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!titleEn.trim() || !descEn.trim()) {
      setError('Title and description in English are required')
      setLoading(false)
      return
    }

    const payload = {
      titleEn: titleEn.trim(),
      titleFr: titleFr.trim() || null,
      descEn: descEn.trim(),
      descFr: descFr.trim() || null,
      route,
      order: Number(order) || 0,
      active,
    }

    try {
      const url = pillar ? `/api/admin/expertise/${pillar.id}` : '/api/admin/expertise'
      const method = pillar ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save expertise pillar')
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
              <Target size={20} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-tight">
                {pillar ? 'Edit Capability / Expertise Pillar' : 'Add New Expertise Pillar'}
              </h2>
              <p className="text-xs text-[#FAF9F5]/70">
                Pillars shown on About Page Bento Grid and Service Domains
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
                  Pillar Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Seed Systems and Market Development"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Detailed Scope / Description (English) *
                </label>
                <textarea
                  required
                  rows={4}
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  placeholder="Tracking seed market performance and developing actionable recommendations..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Pillar Title (French)
                </label>
                <input
                  type="text"
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  placeholder="ex. Systèmes semenciers et développement des marchés"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                  Detailed Scope / Description (French)
                </label>
                <textarea
                  rows={4}
                  value={descFr}
                  onChange={(e) => setDescFr(e.target.value)}
                  placeholder="Suivi de la performance du marché des semences..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
                />
              </div>
            </div>
          )}

          {/* Route link */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <LinkIcon size={12} className="text-[#0F2417]/60" />
              Target Destination Page
            </label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417]"
            >
              {ROUTE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label} ({opt.value})
                </option>
              ))}
            </select>
          </div>

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
              {loading ? 'Saving...' : pillar ? 'Save Changes' : 'Create Pillar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

