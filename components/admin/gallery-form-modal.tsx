'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle, Globe, Image as ImageIcon, Hash } from 'lucide-react'
import { GalleryItemData } from '@/lib/services/gallery-service'
import ImageUploader from './image-uploader'

interface GalleryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  item?: GalleryItemData | null
}

const GALLERY_CATEGORIES = [
  'Field Research',
  'Conferences & Training',
  'Inspection & Certification',
  'Seed Production',
]

export default function GalleryFormModal({
  isOpen,
  onClose,
  onSuccess,
  item,
}: GalleryFormModalProps) {
  const isEditing = Boolean(item?.id)

  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [captionEn, setCaptionEn] = useState('')
  const [captionFr, setCaptionFr] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0])
  const [order, setOrder] = useState<number>(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (item) {
      setTitleEn(item.titleEn || '')
      setTitleFr(item.titleFr || '')
      setCaptionEn(item.captionEn || '')
      setCaptionFr(item.captionFr || '')
      setImageUrl(item.imageUrl || '')
      setCategory(item.category || GALLERY_CATEGORIES[0])
      setOrder(item.order ?? 0)
    } else {
      setTitleEn('')
      setTitleFr('')
      setCaptionEn('')
      setCaptionFr('')
      setImageUrl('')
      setCategory(GALLERY_CATEGORIES[0])
      setOrder(0)
    }
    setError(null)
  }, [item, isOpen])

  if (!isOpen) return null

  const categoryOptions =
    category && !GALLERY_CATEGORIES.includes(category)
      ? [category, ...GALLERY_CATEGORIES]
      : GALLERY_CATEGORIES

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!titleEn.trim()) {
      setError('Please provide an English photo title.')
      return
    }
    if (!imageUrl.trim()) {
      setError('Please upload or select a gallery image.')
      return
    }

    setLoading(true)

    const payload = {
      titleEn: titleEn.trim(),
      titleFr: titleFr.trim() || undefined,
      captionEn: captionEn.trim() || undefined,
      captionFr: captionFr.trim() || undefined,
      imageUrl: imageUrl.trim(),
      category,
      order: Number(order) || 0,
    }

    try {
      const url =
        isEditing && item?.id
          ? `/api/admin/gallery-items/${item.id}`
          : '/api/admin/gallery-items'
      const method = isEditing && item?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save gallery item')

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
              <ImageIcon size={16} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-deep-forest">
                {isEditing ? 'Edit Gallery Photo' : 'Add Gallery Photo'}
              </h2>
              <p className="text-[11px] text-charcoal/60">
                Manage curated field photography, captions, and activity categories.
              </p>
            </div>
          </div>
          <button
            type="button"
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
            English Details (Primary)
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
              <ImageUploader
                value={imageUrl}
                onChange={setImageUrl}
                label="Field Photography *"
                hint="Upload a field activity photo, select from the gallery, or provide a URL."
                folder="gallery"
              />

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Photo Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Field Seed Certification & Variety Trials"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Caption / Context (English)
                </label>
                <textarea
                  rows={3}
                  value={captionEn}
                  onChange={(e) => setCaptionEn(e.target.value)}
                  placeholder="Describe the field activity, participants, and location..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Titre de la Photo (Français)
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
                  Légende / Contexte (Français)
                </label>
                <textarea
                  rows={4}
                  value={captionFr}
                  onChange={(e) => setCaptionFr(e.target.value)}
                  placeholder="Légende en français..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-black/[0.06]">
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white cursor-pointer"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                <Hash size={12} /> Sort Order
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>
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
                  {isEditing ? 'Save Changes' : 'Create Gallery Item'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
