'use client'

import { useState, useEffect } from 'react'
import { X, Save, Loader2 } from 'lucide-react'
import {
  SERVICE_AREAS,
  formatYearRange,
  type WorkMilestoneData,
} from '@/lib/constants/milestones'
import {
  MILESTONE_ICON_OPTIONS,
  MilestoneIcon,
} from '@/components/our-work/milestone-icon'

interface MilestoneFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
  initialData?: WorkMilestoneData | null
  nextOrder?: number
}

export default function MilestoneFormModal({
  isOpen,
  onClose,
  onSaved,
  initialData,
  nextOrder = 15,
}: MilestoneFormModalProps) {
  const [startYear, setStartYear] = useState('2026')
  const [endYear, setEndYear] = useState('')
  const [titleEn, setTitleEn] = useState('')
  const [titleFr, setTitleFr] = useState('')
  const [client, setClient] = useState('')
  const [location, setLocation] = useState('')
  const [locationFr, setLocationFr] = useState('')
  const [serviceArea, setServiceArea] = useState('project-implementation')
  const [icon, setIcon] = useState('sprout')
  const [order, setOrder] = useState(1)
  const [active, setActive] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialData) {
      setStartYear(String(initialData.startYear || 2020))
      setEndYear(initialData.endYear ? String(initialData.endYear) : '')
      setTitleEn(initialData.titleEn || '')
      setTitleFr(initialData.titleFr || '')
      setClient(initialData.client || '')
      setLocation(initialData.location || '')
      setLocationFr(initialData.locationFr || '')
      setServiceArea(initialData.serviceArea || 'project-implementation')
      setIcon(initialData.icon || 'sprout')
      setOrder(initialData.order ?? 1)
      setActive(initialData.active ?? true)
    } else {
      setStartYear(String(new Date().getFullYear()))
      setEndYear('')
      setTitleEn('')
      setTitleFr('')
      setClient('')
      setLocation('')
      setLocationFr('')
      setServiceArea('project-implementation')
      setIcon('sprout')
      setOrder(nextOrder)
      setActive(true)
    }
    setError('')
  }, [initialData, isOpen, nextOrder])

  if (!isOpen) return null

  const numericStart = Number(startYear)
  const numericEnd = endYear.trim() !== '' ? Number(endYear) : null
  const badgePreview =
    Number.isInteger(numericStart) && numericStart >= 1990
      ? formatYearRange(numericStart, numericEnd)
      : '—'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!Number.isInteger(numericStart) || numericStart < 1990 || numericStart > 2100) {
      setError('Please enter a valid 4-digit Start Year (e.g. 2024).')
      return
    }
    if (
      numericEnd !== null &&
      (!Number.isInteger(numericEnd) || numericEnd < numericStart || numericEnd > 2100)
    ) {
      setError('End Year must be greater than or equal to Start Year (or leave blank for a single-year project).')
      return
    }
    if (!titleEn.trim() || !location.trim()) {
      setError('English title and location are required.')
      return
    }

    try {
      setSaving(true)
      setError('')

      const payload = {
        startYear: numericStart,
        endYear: numericEnd && numericEnd > numericStart ? numericEnd : null,
        titleEn: titleEn.trim(),
        titleFr: titleFr.trim() || null,
        client: client.trim() || null,
        location: location.trim(),
        locationFr: locationFr.trim() || null,
        serviceArea,
        icon,
        order: Number(order) || 0,
        active,
      }

      const url = initialData
        ? `/api/admin/milestones/${initialData.id}`
        : '/api/admin/milestones'
      const method = initialData ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error || 'Failed to save milestone')
        return
      }

      onSaved()
      onClose()
    } catch (err: any) {
      setError(err.message || 'Failed to save milestone')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#0F2417]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-[#0F2417]/15 rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden">
        <div className="px-6 py-4 bg-[#FAF9F5] border-b border-[#0F2417]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-xl font-bold text-[#0F2417]">
              {initialData ? 'Edit Journey Milestone' : 'Add Journey Milestone'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#0F2417] text-white text-xs font-bold">
              {badgePreview}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#0F2417]/60 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Start Year *
              </label>
              <input
                type="number"
                min={1990}
                max={2100}
                value={startYear}
                onChange={(e) => setStartYear(e.target.value)}
                placeholder="e.g. 2018"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                End Year <span className="font-normal text-[#0F2417]/50">(optional — leave blank for single year)</span>
              </label>
              <input
                type="number"
                min={1990}
                max={2100}
                value={endYear}
                onChange={(e) => setEndYear(e.target.value)}
                placeholder="e.g. 2024"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
              Service Area (links to /our-work pillar) *
            </label>
            <select
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
            >
              {SERVICE_AREAS.map((area) => (
                <option key={area.slug} value={area.slug}>
                  {area.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Project Title (English) *
              </label>
              <textarea
                rows={2}
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Africa Digital Crop Variety Catalogue"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Project Title (French)
              </label>
              <textarea
                rows={2}
                value={titleFr}
                onChange={(e) => setTitleFr(e.target.value)}
                placeholder="Titre en français (optionnel)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Client / Donor
              </label>
              <input
                type="text"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                placeholder="e.g. AGRA, Gates Foundation"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Location (English) *
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kenya, Tanzania"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Location (French)
              </label>
              <input
                type="text"
                value={locationFr}
                onChange={(e) => setLocationFr(e.target.value)}
                placeholder="e.g. Kenya, Tanzanie"
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
              />
            </div>
          </div>

          {/* Icon Picker */}
          <div>
            <label className="block text-xs font-bold text-[#0F2417]/80 mb-2">
              Card Icon
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {MILESTONE_ICON_OPTIONS.map((opt) => {
                const selected = icon === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setIcon(opt.value)}
                    className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border text-[11px] font-medium transition ${
                      selected
                        ? 'bg-[#0F2417] text-white border-[#0F2417]'
                        : 'bg-[#FAF9F5] text-[#0F2417]/80 border-[#0F2417]/15 hover:border-[#0F2417]/40'
                    }`}
                  >
                    <MilestoneIcon name={opt.value} size={18} />
                    <span className="truncate w-full text-center">{opt.label.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center pt-1">
            <div>
              <label className="block text-xs font-bold text-[#0F2417]/80 mb-1.5">
                Tie-break Order <span className="font-normal text-[#0F2417]/50">(same years)</span>
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#0F2417]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2417]/20"
              />
            </div>

            <label className="flex items-center gap-2.5 pt-5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                className="w-4 h-4 rounded border-[#0F2417]/30 text-[#0F2417] focus:ring-[#0F2417]"
              />
              <span className="text-sm font-semibold text-[#0F2417]">
                Visible on /our-work
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-[#0F2417]/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-[#0F2417]/20 text-xs font-bold text-[#0F2417] hover:bg-[#0F2417]/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F2417] text-white text-xs font-bold hover:bg-[#1A4D2E] transition disabled:opacity-60"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              <span>{saving ? 'Saving...' : 'Save Milestone'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
