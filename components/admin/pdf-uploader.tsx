'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Upload,
  FileText,
  Check,
  Search,
  ExternalLink,
  AlertCircle,
  FolderOpen,
  Link as LinkIcon,
} from 'lucide-react'

interface PdfFileItem {
  name: string
  url: string
  folder: string
  sizeBytes: number
  sizeFormatted: string
}

interface PdfUploaderProps {
  value: string
  onChange: (url: string) => void
}

export default function PdfUploader({ value, onChange }: PdfUploaderProps) {
  const [tab, setTab] = useState<'upload' | 'archive' | 'url'>('upload')
  const [dragOver, setDragOver] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [archiveFiles, setArchiveFiles] = useState<PdfFileItem[]>([])
  const [loadingArchive, setLoadingArchive] = useState(false)
  const [archiveSearch, setArchiveSearch] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch archive PDFs on mount or tab change
  const fetchArchive = async () => {
    setLoadingArchive(true)
    try {
      const res = await fetch('/api/admin/pdf-gallery')
      const data = await res.json()
      if (res.ok && data.files) {
        setArchiveFiles(data.files)
      }
    } catch {
      // Ignore
    } finally {
      setLoadingArchive(false)
    }
  }

  useEffect(() => {
    fetchArchive()
  }, [])

  const handleUploadFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setError('Please select a valid PDF file.')
      return
    }

    if (file.size > 30 * 1024 * 1024) {
      setError('PDF file size exceeds 30MB limit.')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'resources')

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      onChange(data.url)
      fetchArchive()
    } catch (err: any) {
      setError(err.message || 'Failed to upload PDF')
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0])
    }
  }

  const filteredArchive = archiveFiles.filter((f) =>
    f.name.toLowerCase().includes(archiveSearch.toLowerCase())
  )

  const cleanFilename = (pathStr: string) => {
    if (!pathStr) return ''
    try {
      const decoded = decodeURIComponent(pathStr)
      return decoded.split('/').pop() || decoded
    } catch {
      return pathStr.split('/').pop() || pathStr
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal/80">
          PDF Document Attachment *
        </label>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-mist border border-black/5 text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              tab === 'upload' ? 'bg-white shadow-xs text-deep-forest font-bold' : 'text-charcoal/60'
            }`}
          >
            Upload PDF
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('archive')
              if (archiveFiles.length === 0) fetchArchive()
            }}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              tab === 'archive' ? 'bg-white shadow-xs text-deep-forest font-bold' : 'text-charcoal/60'
            }`}
          >
            <FolderOpen size={11} />
            Archive ({archiveFiles.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
              tab === 'url' ? 'bg-white shadow-xs text-deep-forest font-bold' : 'text-charcoal/60'
            }`}
          >
            <LinkIcon size={11} />
            Direct Path
          </button>
        </div>
      </div>

      {/* Active PDF Badge */}
      {value && (
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950">
          <div className="flex items-center gap-2.5 min-w-0 pr-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <FileText size={14} />
            </div>
            <div className="truncate">
              <p className="font-bold text-emerald-900 truncate" title={value}>
                {cleanFilename(value)}
              </p>
              <p className="text-[10px] text-emerald-700/80 font-mono truncate">{value}</p>
            </div>
          </div>
          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 transition-colors"
          >
            <ExternalLink size={11} />
            Test PDF
          </a>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-800">
          <AlertCircle size={14} className="shrink-0 text-red-600 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* TAB 1: UPLOAD DROPZONE */}
      {tab === 'upload' && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleUploadFile(e.target.files[0])
              }
            }}
          />
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
              dragOver
                ? 'border-deep-forest bg-deep-forest/5 scale-[0.99]'
                : 'border-black/10 hover:border-black/20 bg-[#FAF9F5]/70'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-deep-forest/10 text-deep-forest flex items-center justify-center">
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-deep-forest border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Upload size={18} />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-charcoal">
                  {uploading ? 'Uploading and optimizing PDF...' : 'Click to select or drag & drop PDF'}
                </p>
                <p className="text-[11px] text-charcoal/50 mt-0.5">
                  PDF format, maximum 30MB. Automatically stored in /uploads/resources/
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHIVE GALLERY PICKER */}
      {tab === 'archive' && (
        <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/10 space-y-3">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search 24+ reports and case study PDFs..."
              value={archiveSearch}
              onChange={(e) => setArchiveSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-black/10 text-xs bg-white focus:border-deep-forest focus:ring-1 focus:ring-deep-forest outline-none"
            />
          </div>

          {loadingArchive ? (
            <div className="py-6 text-center text-xs text-charcoal/50">
              <div className="w-4 h-4 border-2 border-deep-forest border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Scanning PDF repository...
            </div>
          ) : filteredArchive.length === 0 ? (
            <div className="py-6 text-center text-xs text-charcoal/50">
              No matching PDF files found.
            </div>
          ) : (
            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1 divide-y divide-black/[0.04]">
              {filteredArchive.map((file) => {
                const isSelected = value === file.url
                return (
                  <div
                    key={file.url}
                    onClick={() => onChange(file.url)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-deep-forest text-white font-medium shadow-xs'
                        : 'hover:bg-white text-charcoal'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <FileText
                        size={14}
                        className={`shrink-0 ${isSelected ? 'text-white' : 'text-deep-forest/70'}`}
                      />
                      <span className="truncate" title={file.name}>
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-charcoal/60'
                        }`}
                      >
                        {file.sizeFormatted}
                      </span>
                      {isSelected && <Check size={13} className="text-white" />}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: DIRECT PATH INPUT */}
      {tab === 'url' && (
        <div>
          <input
            type="text"
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/resources/document-name.pdf or https://..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-2 focus:ring-deep-forest/10 outline-none text-xs font-mono bg-white"
          />
          <p className="text-[11px] text-charcoal/50 mt-1">
            Path relative to public directory (e.g. <code className="bg-black/5 px-1 rounded">/resources/filename.pdf</code>) or external URL.
          </p>
        </div>
      )}
    </div>
  )
}
