'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Image as ImageIcon,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  AlertCircle,
  Globe,
  Layers,
  ExternalLink,
} from 'lucide-react'
import GalleryFormModal from '@/components/admin/gallery-form-modal'
import { GalleryItemData } from '@/lib/services/gallery-service'

const CATEGORIES = [
  'All',
  'Field Research',
  'Conferences & Training',
  'Inspection & Certification',
  'Seed Production',
]

const shouldUnoptimize = (url: string) => {
  const clean = url.split('?')[0].toLowerCase()
  return clean.endsWith('.svg') || url.startsWith('/uploads/') || /^https?:\/\//i.test(url)
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItemData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItemData | null>(null)

  const fetchGalleryItems = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/gallery-items')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch gallery items')
      setItems(data.items || [])
    } catch (err: any) {
      setError(err.message || 'Error loading gallery items')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  const handleCreate = () => {
    setSelectedItem(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: GalleryItemData) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    try {
      const res = await fetch(`/api/admin/gallery-items/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete gallery item')
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory
    const q = search.toLowerCase()
    const matchesSearch =
      !search ||
      item.titleEn.toLowerCase().includes(q) ||
      (item.titleFr && item.titleFr.toLowerCase().includes(q)) ||
      (item.captionEn && item.captionEn.toLowerCase().includes(q)) ||
      (item.captionFr && item.captionFr.toLowerCase().includes(q)) ||
      item.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  const bilingualCount = items.filter((i) => !!i.titleFr || !!i.captionFr).length
  const categoryCount = new Set(items.map((i) => i.category).filter(Boolean)).size

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Visual Documentation
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {items.length} Gallery Photos
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Field Gallery & Activity Archive
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Curate field research trials, regulatory convenings, inspection training, and seed production photography for the public gallery.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <Link
            href="/en/gallery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 text-xs font-semibold transition-all active:scale-[0.98] whitespace-nowrap shrink-0 [word-break:normal] [overflow-wrap:normal]"
          >
            <ExternalLink size={14} className="shrink-0" />
            <span>View Live Gallery</span>
          </Link>

          <button
            type="button"
            onClick={fetchGalleryItems}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh gallery list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add Gallery Photo
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Total Photos
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {items.length} Records
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest">
            <ImageIcon size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Active Categories
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {categoryCount} Themes
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Layers size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Bilingual (EN / FR)
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {bilingualCount} of {items.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Globe size={20} />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-deep-forest text-white shadow-xs'
                  : 'bg-white border border-black/[0.08] text-charcoal/70 hover:bg-black/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gallery by title, caption, category..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {loading && items.length === 0 ? (
        <div className="py-24 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
          Loading field gallery...
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-20 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <ImageIcon size={32} className="mx-auto mb-2 text-charcoal/20" />
          No gallery items found matching your filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-black/[0.08] overflow-hidden shadow-xs hover:shadow-lg hover:border-black/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Preview */}
                <div className="relative w-full aspect-[16/10] bg-[#FAF9F5] overflow-hidden border-b border-black/[0.06]">
                  {item.imageUrl ? (
                    <Image
                      src={item.imageUrl}
                      alt={item.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      unoptimized={shouldUnoptimize(item.imageUrl)}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-charcoal/30">
                      <ImageIcon size={28} />
                    </div>
                  )}

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider">
                    #{item.order}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-deep-forest text-[10px] font-bold shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-5 space-y-2">
                  <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug">
                    {item.titleEn}
                  </h3>
                  {item.titleFr && (
                    <p className="text-[11px] text-charcoal/50 italic line-clamp-1">
                      FR: {item.titleFr}
                    </p>
                  )}
                  <p className="text-xs text-charcoal/75 leading-relaxed line-clamp-3">
                    {item.captionEn || 'No caption provided.'}
                  </p>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-[10px] text-charcoal/50">
                  {item.id.startsWith('static-') ? 'Static Preset' : 'Live Supabase'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded-lg hover:bg-mist text-deep-forest transition-colors cursor-pointer"
                    title="Edit gallery item"
                  >
                    <Edit3 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id, item.titleEn)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                    title="Delete gallery item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <GalleryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchGalleryItems}
        item={selectedItem}
      />
    </div>
  )
}
