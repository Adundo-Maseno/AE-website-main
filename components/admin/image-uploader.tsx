'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Upload,
  Image as ImageIcon,
  Check,
  X,
  RefreshCw,
  FolderOpen,
  Link2,
} from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label: string
  hint?: string
  folder?: string
}

export default function ImageUploader({
  value,
  onChange,
  label,
  hint,
  folder = 'team',
}: ImageUploaderProps) {
  const [activeMode, setActiveMode] = useState<'upload' | 'gallery' | 'url'>('upload')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadGallery = async () => {
    setGalleryLoading(true)
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      if (res.ok && data.images) {
        setGalleryImages(data.images)
      }
    } catch {
      // ignore
    } finally {
      setGalleryLoading(false)
    }
  }

  useEffect(() => {
    if (activeMode === 'gallery' && galleryImages.length === 0) {
      loadGallery()
    }
  }, [activeMode])

  const handleFileUpload = async (file: File) => {
    setError(null)
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to upload photo')

      onChange(data.url)
    } catch (err: any) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-deep-forest">
          {label}
        </label>
        {/* Mode selector pills */}
        <div className="inline-flex items-center rounded-lg bg-black/[0.04] p-0.5 text-[11px] font-semibold text-charcoal/70">
          <button
            type="button"
            onClick={() => setActiveMode('upload')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              activeMode === 'upload' ? 'bg-white text-deep-forest shadow-xs' : 'hover:text-deep-forest'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('gallery')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              activeMode === 'gallery' ? 'bg-white text-deep-forest shadow-xs' : 'hover:text-deep-forest'
            }`}
          >
            Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('url')}
            className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
              activeMode === 'url' ? 'bg-white text-deep-forest shadow-xs' : 'hover:text-deep-forest'
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {hint && <p className="text-[11px] text-charcoal/60">{hint}</p>}

      {error && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
          {error}
        </div>
      )}

      {/* Current Photo Preview Bar */}
      {value ? (
        <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/[0.08] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAFAF8] border border-black/[0.08] shrink-0">
              <Image
                src={value}
                alt="Selected portrait"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-deep-forest truncate">{value}</p>
              <span className="text-[10px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                <Check size={11} /> Photo Active
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-lg text-charcoal/40 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
            title="Remove photo"
          >
            <X size={15} />
          </button>
        </div>
      ) : null}

      {/* Mode A: Drag & Drop File Upload */}
      {activeMode === 'upload' && (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer ${
            isDragOver
              ? 'border-deep-forest bg-deep-forest/[0.03]'
              : 'border-black/15 hover:border-deep-forest/40 bg-white hover:bg-[#FAF9F5]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileUpload(e.target.files[0])
              }
            }}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-full bg-deep-forest/[0.06] text-deep-forest flex items-center justify-center">
              {uploading ? (
                <RefreshCw size={18} className="animate-spin text-deep-forest" />
              ) : (
                <Upload size={18} />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-deep-forest">
                {uploading ? 'Uploading portrait...' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-[11px] text-charcoal/50 mt-0.5">
                PNG, JPG, WebP, or AVIF (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mode B: Existing Gallery Selector */}
      {activeMode === 'gallery' && (
        <div className="rounded-2xl border border-black/[0.08] bg-white p-3 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-black/[0.04]">
            <span className="text-[11px] font-semibold text-charcoal/60">
              Select existing team portrait:
            </span>
            <button
              type="button"
              onClick={loadGallery}
              className="text-[11px] text-deep-forest font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw size={10} className={galleryLoading ? 'animate-spin' : ''} /> Refresh
            </button>
          </div>

          {galleryLoading ? (
            <div className="py-8 text-center text-xs text-charcoal/50">Loading gallery...</div>
          ) : galleryImages.length === 0 ? (
            <div className="py-6 text-center text-xs text-charcoal/50">No images found.</div>
          ) : (
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto pr-1">
              {galleryImages.map((img) => {
                const isSelected = value === img
                return (
                  <button
                    key={img}
                    type="button"
                    onClick={() => onChange(img)}
                    className={`relative aspect-square rounded-xl overflow-hidden border transition-all cursor-pointer group ${
                      isSelected
                        ? 'border-deep-forest ring-2 ring-deep-forest shadow-xs'
                        : 'border-black/10 hover:border-deep-forest/50'
                    }`}
                  >
                    <Image
                      src={img}
                      alt="Thumbnail"
                      fill
                      sizes="60px"
                      className="object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-deep-forest/40 flex items-center justify-center text-white">
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Mode C: Direct Path or External URL */}
      {activeMode === 'url' && (
        <div className="relative">
          <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="e.g. /team/aline.png or https://..."
            className="w-full pl-8 pr-3 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
          />
        </div>
      )}
    </div>
  )
}

