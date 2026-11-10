'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { X, Globe, Briefcase, Calendar, Building, Hash, Upload, Image as ImageIcon, Link as LinkIcon, Trash2 } from 'lucide-react'
import { ProjectItem } from '@/lib/services/projects-service'

interface ProjectFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  project: ProjectItem | null
}

const PROJECT_CATEGORIES = [
  { value: 'digital-platforms', label: 'Digital Platforms' },
  { value: 'technical-studies', label: 'Technical Studies' },
  { value: 'project-implementation', label: 'Project Implementation' },
  { value: 'client-advisory', label: 'Client Advisory' },
  { value: 'capacity-building', label: 'Capacity Building' },
  { value: 'stakeholder-convenings', label: 'Stakeholder Convenings' },
]

export default function ProjectFormModal({
  isOpen,
  onClose,
  onSuccess,
  project,
}: ProjectFormModalProps) {
  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [descEn, setDescEn] = useState('')
  const [descFr, setDescFr] = useState('')
  const [category, setCategory] = useState(PROJECT_CATEGORIES[0].value)
  const [client, setClient] = useState('')
  const [year, setYear] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [link, setLink] = useState('')
  const [order, setOrder] = useState<number>(0)

  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (project) {
      setTitleEn(project.titleEn || '')
      setTitleFr(project.titleFr || '')
      setDescEn(project.descEn || '')
      setDescFr(project.descFr || '')
      setCategory(project.category || PROJECT_CATEGORIES[0].value)
      setClient(project.client || '')
      setYear(project.year || '')
      setImageUrl(project.imageUrl || '')
      setLink(project.link || '')
      setOrder(project.order ?? 0)
    } else {
      setTitleEn('')
      setTitleFr('')
      setDescEn('')
      setDescFr('')
      setCategory(PROJECT_CATEGORIES[0].value)
      setClient('')
      setYear('')
      setImageUrl('')
      setLink('')
      setOrder(0)
    }
    setError(null)
  }, [project, isOpen])

  if (!isOpen) return null

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingImage(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'projects')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Upload failed')
      }

      setImageUrl(data.url)
    } catch (err: any) {
      setError(err.message || 'Image upload failed')
    } finally {
      setUploadingImage(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!titleEn.trim()) {
      setError('Please provide an English project title.')
      return
    }
    if (!descEn.trim()) {
      setError('Please provide an English project description.')
      return
    }

    setLoading(true)

    const payload = {
      titleEn: titleEn.trim(),
      titleFr: titleFr.trim() || undefined,
      descEn: descEn.trim(),
      descFr: descFr.trim() || undefined,
      category,
      client: client.trim() || undefined,
      year: year.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
      link: link.trim() || undefined,
      order: Number(order) || 0,
    }

    try {
      const url =
        project?.id && !project.id.startsWith('static-')
          ? `/api/admin/projects/${project.id}`
          : '/api/admin/projects'
      const method = project?.id && !project.id.startsWith('static-') ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save project')

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error saving project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-black/10 shadow-2xl p-6 sm:p-8 my-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-black/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-deep-forest/5 text-deep-forest">
              <Briefcase size={20} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-xl text-deep-forest">
                {project ? 'Edit Project / Case Study' : 'Add Project / Case Study'}
              </h2>
              <p className="text-xs text-charcoal/60">
                Manage case studies, digital platforms, and advisory initiatives with showcase photography.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-charcoal/40 hover:text-deep-forest rounded-full hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
            {error}
          </div>
        )}

        {/* Language Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setTab('en')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              tab === 'en'
                ? 'bg-deep-forest text-white'
                : 'text-charcoal/60 hover:text-deep-forest hover:bg-black/5'
            }`}
          >
            <Globe size={13} /> English Details
          </button>
          <button
            type="button"
            onClick={() => setTab('fr')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              tab === 'fr'
                ? 'bg-deep-forest text-white'
                : 'text-charcoal/60 hover:text-deep-forest hover:bg-black/5'
            }`}
          >
            <Globe size={13} /> French Details
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'en' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Project Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  placeholder="e.g. Tanzania Seed Systems Transformation"
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1">
                    Work Pillar / Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
                  >
                    {PROJECT_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                    <Building size={12} /> Client / Funder
                  </label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. USAID / CRS / Ministry of Agriculture"
                    className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                  />
                </div>
              </div>

              {/* Featured Case Study Image Upload */}
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                  <ImageIcon size={12} /> Case Study Featured Image / Photography
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <div className="flex-1 w-full relative">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/uploads/projects/... or /pexels-equalstock-27722065.jpg"
                      className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                    />
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-3.5 py-2 rounded-xl bg-deep-forest/10 hover:bg-deep-forest/20 text-deep-forest text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                  >
                    <Upload size={13} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Photo'}</span>
                  </button>

                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="Clear image"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {imageUrl && (
                  <div className="mt-2.5 relative w-28 h-18 rounded-xl overflow-hidden border border-black/10 bg-[#FAF9F5]">
                    <Image
                      src={imageUrl}
                      alt="Project preview"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              {/* External Link */}
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                  <LinkIcon size={12} /> External Case Study / Live Platform URL
                </label>
                <input
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://... or /resources/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Description / Impact (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={descEn}
                  onChange={(e) => setDescEn(e.target.value)}
                  placeholder="Detail scope, activities, technical solutions, and farmer or regulatory impact..."
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                    <Calendar size={12} /> Timeline / Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. 2019-2024"
                    className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                    <Hash size={12} /> Display Order
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value, 10) || 0)}
                    placeholder="1"
                    className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Project Title (French)
                </label>
                <input
                  type="text"
                  value={titleFr}
                  onChange={(e) => setTitleFr(e.target.value)}
                  placeholder="Titre du projet en français..."
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Description / Impact (French)
                </label>
                <textarea
                  rows={5}
                  value={descFr}
                  onChange={(e) => setDescFr(e.target.value)}
                  placeholder="Description du projet et résultats en français..."
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs resize-none"
                />
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-4 border-t border-black/5 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-xl border border-black/10 hover:bg-black/5 text-xs font-semibold text-charcoal/70 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
