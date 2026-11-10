'use client'

import { useState, useEffect } from 'react'
import { X, Save, AlertCircle, Globe, MapPin } from 'lucide-react'
import { CountryItem } from '@/lib/services/map-service'

interface CountryFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  country?: CountryItem | null
}

export default function CountryFormModal({
  isOpen,
  onClose,
  onSuccess,
  country,
}: CountryFormModalProps) {
  const isEditing = Boolean(country && !country.id.startsWith('static-'))

  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [countryCode, setCountryCode] = useState('')
  const [countryName, setCountryName] = useState('')
  const [region, setRegion] = useState('East Africa')
  const [activeProjectsCount, setActiveProjectsCount] = useState<number>(1)
  const [engagement, setEngagement] = useState<number>(0)
  const [overviewEn, setOverviewEn] = useState('')
  const [overviewFr, setOverviewFr] = useState('')
  const [workDone, setWorkDone] = useState('')
  const [focus, setFocus] = useState('')
  const [impact, setImpact] = useState('')
  const [locations, setLocations] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (country) {
      setCountryCode(country.countryCode || '')
      setCountryName(country.countryName || '')
      setRegion(country.region || 'East Africa')
      setActiveProjectsCount(country.activeProjectsCount ?? 1)
      setEngagement(country.engagement ?? 0)
      setOverviewEn(country.overviewEn || '')
      setOverviewFr(country.overviewFr || '')
      
      const parseArray = (val?: string | null) => {
        if (!val) return ''
        try {
          const parsed = JSON.parse(val)
          return Array.isArray(parsed) ? parsed.join(', ') : val
        } catch {
          return val
        }
      }

      setWorkDone(parseArray(country.workDone))
      setFocus(parseArray(country.focus))
      setImpact(parseArray(country.impact))
      setLocations(parseArray(country.locations))
    } else {
      setCountryCode('')
      setCountryName('')
      setRegion('East Africa')
      setActiveProjectsCount(1)
      setEngagement(0)
      setOverviewEn('')
      setOverviewFr('')
      setWorkDone('Project implementation, Technical studies, Client advisory')
      setFocus('Seed certification, Market linkages, Traceability')
      setImpact('Updated seed rules, Better market trust')
      setLocations('Nairobi')
    }
    setError(null)
  }, [country, isOpen])

  if (!isOpen) return null

  const formatToArrayJson = (str: string) => {
    if (!str.trim()) return JSON.stringify([])
    const items = str.split(',').map((s) => s.trim()).filter(Boolean)
    return JSON.stringify(items)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!countryCode.trim() || !countryName.trim()) {
      setError('Please provide country code (e.g. KE) and name.')
      return
    }

    setLoading(true)

    const payload = {
      countryCode: countryCode.trim().toUpperCase(),
      countryName: countryName.trim(),
      region: region.trim() || undefined,
      activeProjectsCount: Number(activeProjectsCount) || 0,
      engagement: Number(engagement) || 0,
      overviewEn: overviewEn.trim() || undefined,
      overviewFr: overviewFr.trim() || undefined,
      workDone: formatToArrayJson(workDone),
      focus: formatToArrayJson(focus),
      impact: formatToArrayJson(impact),
      locations: formatToArrayJson(locations),
    }

    try {
      const url = isEditing && country?.id
        ? `/api/admin/map/${country.id}`
        : '/api/admin/map'
      const method = isEditing && country?.id ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save country')

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
              <MapPin size={16} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-deep-forest">
                {isEditing ? `Edit ${countryName || 'Country'}` : 'Add Country Portfolio'}
              </h2>
              <p className="text-[11px] text-charcoal/60">
                Configure country footprint, projects, farmer reach, and field focus areas.
              </p>
            </div>
          </div>
          <button
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
            English Portfolio (Primary)
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800">
              <AlertCircle size={15} className="shrink-0 text-red-600 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Identity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Country Code (ISO 2) *
              </label>
              <input
                type="text"
                required
                maxLength={3}
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
                placeholder="e.g. KE"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Country Name *
              </label>
              <input
                type="text"
                required
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="e.g. Kenya"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white cursor-pointer"
              >
                <option value="East Africa">East Africa</option>
                <option value="West Africa">West Africa</option>
                <option value="Southern Africa">Southern Africa</option>
                <option value="Central Africa">Central Africa</option>
                <option value="Pan-African">Pan-African</option>
              </select>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Active Projects Count
              </label>
              <input
                type="number"
                min={0}
                value={activeProjectsCount}
                onChange={(e) => setActiveProjectsCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Farmers Reached (Engagement)
              </label>
              <input
                type="number"
                min={0}
                value={engagement}
                onChange={(e) => setEngagement(Number(e.target.value))}
                placeholder="e.g. 124000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>
          </div>

          {/* Overview text */}
          {tab === 'en' ? (
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Portfolio Overview & Highlights (English) *
              </label>
              <textarea
                rows={3}
                required
                value={overviewEn}
                onChange={(e) => setOverviewEn(e.target.value)}
                placeholder="Summary of strategic engagements and regulatory reforms..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Aperçu du portefeuille (Français)
              </label>
              <textarea
                rows={3}
                value={overviewFr}
                onChange={(e) => setOverviewFr(e.target.value)}
                placeholder="Résumé des engagements stratégiques en français..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white leading-relaxed"
              />
            </div>
          )}

          {/* Comma-separated tag fields */}
          <div className="space-y-3 pt-2 border-t border-black/[0.06]">
            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Focus Areas <span className="text-charcoal/40 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="e.g. Seed certification, Market linkages, Traceability"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Key Impacts <span className="text-charcoal/40 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={impact}
                onChange={(e) => setImpact(e.target.value)}
                placeholder="e.g. Updated seed rules, Better market trust, Stronger distribution"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-deep-forest mb-1">
                Key Locations / Hubs <span className="text-charcoal/40 font-normal">(comma-separated)</span>
              </label>
              <input
                type="text"
                value={locations}
                onChange={(e) => setLocations(e.target.value)}
                placeholder="e.g. Nairobi, Kisumu, Nakuru"
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
                  {isEditing ? 'Save Changes' : 'Create Country'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

