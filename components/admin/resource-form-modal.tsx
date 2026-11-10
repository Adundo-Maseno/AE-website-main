'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle } from 'lucide-react'
import { ResourceItem } from '@/lib/services/resources-service'

const CATEGORIES = [
  'Reports & Analysis',
  'Case Studies',
  'Scoping Studies',
  'Toolkits & Guides',
]

interface ResourceFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  resource?: ResourceItem | null
}

export default function ResourceFormModal({
  isOpen,
  onClose,
  onSuccess,
  resource,
}: ResourceFormModalProps) {
  const isEditing = Boolean(resource && !resource.id.startsWith('static-'))

  const [activeTab, setActiveTab] = useState<'en' | 'fr'>('en')
  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [link, setLink] = useState('')
  const [client, setClient] = useState('')
  const [citationEn, setCitationEn] = useState('')
  const [citationFr, setCitationFr] = useState('')
  const [clientLink, setClientLink] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (resource) {
      setTitleEn(resource.titleEn || '')
      setTitleFr(resource.titleFr || '')
      setLink(resource.link || '')
      setClient(resource.client || '')
      setCitationEn(resource.citationEn || '')
      setCitationFr(resource.citationFr || '')
      setClientLink(resource.clientLink || '')
      setCategory(resource.category || CATEGORIES[0])
    } else {
      setTitleEn('')
      setTitleFr('')
      setLink('/resources/')
      setClient('')
      setCitationEn('')
      setCitationFr('')
      setClientLink('')
      setCategory(CATEGORIES[0])
    }
    setError(null)
  }, [resource, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload = {
        titleEn,
        titleFr: titleFr || null,
        link,
        client,
        citationEn,
        citationFr: citationFr || null,
        clientLink: clientLink || null,
        category,
      }

      const url = isEditing && resource?.id
        ? `/api/admin/resources/${resource.id}`
        : '/api/admin/resources'
      const method = isEditing ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save resource')
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-6">
          <div>
            <h2 className="font-serif font-bold text-xl text-deep-forest">
              {isEditing ? 'Edit Publication' : 'Add New Publication'}
            </h2>
            <p className="text-xs text-charcoal/60 mt-0.5">
              Fill in publication details, citations, and download links.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-charcoal/50 hover:text-charcoal hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
            <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {/* Language Tabs */}
        <div className="flex items-center gap-2 mb-6 p-1 rounded-xl bg-mist border border-black/5 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'en'
                ? 'bg-deep-forest text-white shadow-xs'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            English Content
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('fr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'fr'
                ? 'bg-deep-forest text-white shadow-xs'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            French Content (Français)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === 'en' ? (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                  Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Assessment to Support the Promotion of Regional Seed Trade"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                  Citation / Description (English) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={citationEn}
                  onChange={(e) => setCitationEn(e.target.value)}
                  placeholder="e.g. Agri Experience Ltd. (2023). Title of the report..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                  Titre (Français) <span className="text-charcoal/40 font-normal lowercase">(optionnel)</span>
                </label>
                <input
                  type="text"
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  placeholder="Titre en français..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                  Citation / Description (Français) <span className="text-charcoal/40 font-normal lowercase">(optionnel)</span>
                </label>
                <textarea
                  rows={3}
                  value={citationFr}
                  onChange={(e) => setCitationFr(e.target.value)}
                  placeholder="Agri Experience Ltd. (2023). Description en français..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white cursor-pointer"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                Client / Partner *
              </label>
              <input
                type="text"
                required
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. USAID, Catholic Relief Services, KEPHIS"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                PDF Download URL / Path *
              </label>
              <input
                type="text"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="/resources/document-name.pdf"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                External Client Link <span className="text-charcoal/40 font-normal lowercase">(optional)</span>
              </label>
              <input
                type="url"
                value={clientLink}
                onChange={(e) => setClientLink(e.target.value)}
                placeholder="https://client-website.org/project"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-sm bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-black/5 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-black/10 hover:bg-black/5 text-charcoal/70 text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={14} />
                  {isEditing ? 'Save Changes' : 'Create Publication'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
