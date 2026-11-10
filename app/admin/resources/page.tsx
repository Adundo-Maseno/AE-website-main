'use client'

import { useState, useEffect } from 'react'
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  Download,
  AlertCircle,
  RefreshCw,
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest tracking-tight">
              Resources & Publications
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-mist text-deep-forest border border-black/5">
              {resources.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Manage public domain reports, studies, and download links with instant public site sync.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchResources}
            className="p-2.5 rounded-xl border border-black/10 hover:bg-black/5 text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Publication
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-deep-forest text-white shadow-xs'
                  : 'bg-white border border-black/5 text-charcoal/70 hover:bg-black/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search publications..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
          />
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-xs overflow-hidden">
        {loading && resources.length === 0 ? (
          <div className="py-20 text-center text-xs text-charcoal/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-deep-forest/40" />
            Loading publications...
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="py-16 text-center text-xs text-charcoal/60">
            <FileText size={32} className="mx-auto mb-2 text-charcoal/20" />
            No publications found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/5 bg-[#FAFAF8] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Title & Citation</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Client / Partner</th>
                  <th className="py-3 px-4">Link</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredResources.map((item) => (
                  <tr key={item.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-deep-forest text-sm leading-snug line-clamp-2">
                        {item.titleEn}
                      </div>
                      {item.titleFr && (
                        <div className="text-[11px] text-charcoal/50 italic line-clamp-1 mt-0.5">
                          FR: {item.titleFr}
                        </div>
                      )}
                      <div className="text-charcoal/60 line-clamp-1 mt-1 text-[11px]">
                        {item.citationEn}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-mist text-deep-forest border border-black/5">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <span className="text-[11px] font-semibold text-[#1b6b33] line-clamp-2">
                        {item.client}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-deep-forest hover:underline"
                        title={item.link}
                      >
                        <Download size={13} />
                        PDF
                      </a>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/5 transition-colors cursor-pointer"
                          title="Edit"
                          aria-label="Edit publication"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleEn)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                          aria-label="Delete publication"
                        >
                          <Trash2 size={14} />
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
