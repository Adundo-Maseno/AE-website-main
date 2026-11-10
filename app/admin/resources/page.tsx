'use client'

import { useState, useEffect } from 'react'
import {
  FileText,
  Plus,
  Search,
  Edit3,
  Trash2,
  ExternalLink,
  Download,
  AlertCircle,
  RefreshCw,
  FolderOpen,
} from 'lucide-react'
import ResourceFormModal from '@/components/admin/resource-form-modal'
import { ResourceItem } from '@/lib/services/resources-service'

const CATEGORIES = [
  'All',
  'Reports & Analysis',
  'Case Studies',
  'Scoping Studies',
  'Toolkits & Guides',
]

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null)

  const fetchResources = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/resources')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch resources')
      setResources(data.resources || [])
    } catch (err: any) {
      setError(err.message || 'Error loading resources')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResources()
  }, [])

  const handleCreate = () => {
    setSelectedResource(null)
    setIsModalOpen(true)
  }

  const handleEdit = (resource: ResourceItem) => {
    setSelectedResource(resource)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setResources((prev) => prev.filter((r) => r.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete resource')
    }
  }

  const filteredResources = resources.filter((r) => {
    const matchesCat =
      selectedCategory === 'All' || r.category === selectedCategory
    const q = search.toLowerCase()
    const matchesSearch =
      !search ||
      r.titleEn.toLowerCase().includes(q) ||
      (r.titleFr && r.titleFr.toLowerCase().includes(q)) ||
      r.client.toLowerCase().includes(q) ||
      r.citationEn.toLowerCase().includes(q)
    return matchesCat && matchesSearch
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Publications Library
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {resources.length} Documents Published
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Publications & Digital Downloads
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Manage public domain seed sector studies, client partner advisories, and technical reports with instant public cache invalidation.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchResources}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Publish New Resource
          </button>
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
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
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

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, partner, citation..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs overflow-hidden">
        {loading && resources.length === 0 ? (
          <div className="py-24 text-center text-xs text-charcoal/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
            Loading publications library...
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="py-20 text-center text-xs text-charcoal/60">
            <FileText size={32} className="mx-auto mb-2 text-charcoal/20" />
            No publications found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#FAF9F5] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-5">Title & Citation</th>
                  <th className="py-4 px-5">Category</th>
                  <th className="py-4 px-5">Client / Partner</th>
                  <th className="py-4 px-5">File</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {filteredResources.map((item) => (
                  <tr key={item.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-4 px-5 max-w-lg">
                      <div className="font-bold text-deep-forest text-sm leading-snug line-clamp-2">
                        {item.titleEn}
                      </div>
                      {item.titleFr && (
                        <div className="text-[11px] text-charcoal/50 italic line-clamp-1 mt-0.5">
                          FR: {item.titleFr}
                        </div>
                      )}
                      <div className="text-charcoal/60 line-clamp-2 mt-1 text-[11px] leading-relaxed">
                        {item.citationEn}
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-mist text-deep-forest border border-black/[0.06]">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      <span className="text-xs font-semibold text-[#1b6b33] line-clamp-2">
                        {item.client}
                      </span>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF9F5] hover:bg-mist text-deep-forest border border-black/[0.06] transition-colors"
                        title={item.link}
                      >
                        <Download size={12} />
                        PDF
                      </a>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/[0.04] transition-colors cursor-pointer"
                          title="Edit publication"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleEn)}
                          className="p-2 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete publication"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      <ResourceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchResources}
        resource={selectedResource}
      />
    </div>
  )
}
