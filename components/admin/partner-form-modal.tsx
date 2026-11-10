'use client'

import { useState, useEffect } from 'react'
import { X, Handshake, Globe, Hash, Layers } from 'lucide-react'
import { PartnerData } from '@/lib/services/partners-service'
import ImageUploader from './image-uploader'

interface PartnerFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  partner: PartnerData | null
}

const CATEGORIES = [
  { value: 'development_partners', label: 'Development Partners' },
  { value: 'government', label: 'Government & Ministries' },
  { value: 'regulators', label: 'National & Regional Regulators' },
  { value: 'breeding_institutions', label: 'Breeding & Research Institutions' },
  { value: 'private_sector', label: 'Private Sector Enterprises' },
]

export default function PartnerFormModal({
  isOpen,
  onClose,
  onSuccess,
  partner,
}: PartnerFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0].value)
  const [row, setRow] = useState<number>(1)
  const [order, setOrder] = useState<number>(0)
  const [active, setActive] = useState<boolean>(true)

  useEffect(() => {
    if (partner) {
      setName(partner.name || '')
      setLogoUrl(partner.logoUrl || '')
      setWebsiteUrl(partner.websiteUrl || '')
      setCategory(partner.category || CATEGORIES[0].value)
      setRow(partner.row ?? 1)
      setOrder(partner.order ?? 0)
      setActive(partner.active ?? true)
    } else {
      setName('')
      setLogoUrl('')
      setWebsiteUrl('')
      setCategory(CATEGORIES[0].value)
      setRow(1)
      setOrder(0)
      setActive(true)
    }
    setError(null)
  }, [partner, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!name.trim() || !logoUrl.trim()) {
      setError('Partner name and logo image are required')
      setLoading(false)
      return
    }

    const payload = {
      name: name.trim(),
      logoUrl: logoUrl.trim(),
      websiteUrl: websiteUrl.trim() || null,
      category,
      row: Number(row) || 1,
      order: Number(order) || 0,
      active,
    }

    try {
      const url = partner ? `/api/admin/partners/${partner.id}` : '/api/admin/partners'
      const method = partner ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save partner')
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
        {/* Modal Header */}
        <div className="bg-[#0F2417] text-[#FAF9F5] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#C29B38]/20 flex items-center justify-center text-[#C29B38]">
              <Handshake size={20} />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold tracking-tight">
                {partner ? 'Edit Partner / Client Logo' : 'Add New Partner / Collaborator'}
              </h2>
              <p className="text-xs text-[#FAF9F5]/70">
                Manages brand presence on home page partner marquee
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

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
              {error}
            </div>
          )}

          {/* Partner Name */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
              Organization Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Gates Foundation, CIMMYT, KEPHIS..."
              className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
            />
          </div>

          {/* Logo Upload / Select */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
              Partner Logo SVG / PNG *
            </label>
            <ImageUploader
              value={logoUrl}
              onChange={(url) => setLogoUrl(url)}
              label="Select or upload partner logo image"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Globe size={13} className="text-[#0F2417]/60" />
              Website URL (Optional)
            </label>
            <input
              type="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.org"
              className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Row, Order, Active Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Layers size={12} className="text-[#0F2417]/60" />
                Marquee Row
              </label>
              <select
                value={row}
                onChange={(e) => setRow(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417]"
              >
                <option value={1}>Row 1 (Top)</option>
                <option value={2}>Row 2 (Bottom)</option>
              </select>
            </div>
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

          {/* Submit Actions */}
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
              {loading ? 'Saving...' : partner ? 'Save Changes' : 'Create Partner'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
