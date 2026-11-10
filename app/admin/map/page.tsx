'use client'

import { useState, useEffect } from 'react'
import {
  MapPin,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  Globe,
  Users,
  Briefcase,
} from 'lucide-react'
import CountryFormModal from '@/components/admin/country-form-modal'
import { CountryItem } from '@/lib/services/map-service'

export default function AdminMapPage() {
  const [countries, setCountries] = useState<CountryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(null)

  const fetchCountries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/map')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch country records')
      setCountries(data.countries || [])
    } catch (err: any) {
      setError(err.message || 'Error loading countries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const handleCreate = () => {
    setSelectedCountry(null)
    setIsModalOpen(true)
  }

  const handleEdit = (item: CountryItem) => {
    setSelectedCountry(item)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from the map registry?`)) return
    try {
      const res = await fetch(`/api/admin/map/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setCountries((prev) => prev.filter((c) => c.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete country')
    }
  }

  const filtered = countries.filter((c) => {
    const q = search.toLowerCase()
    return (
      !search ||
      c.countryName.toLowerCase().includes(q) ||
      c.countryCode.toLowerCase().includes(q) ||
      (c.region && c.region.toLowerCase().includes(q)) ||
      (c.overviewEn && c.overviewEn.toLowerCase().includes(q))
    )
  })

  const totalProjects = countries.reduce((acc, c) => acc + (c.activeProjectsCount || 0), 0)
  const totalFarmers = countries.reduce((acc, c) => acc + (c.engagement || 0), 0)

  const parseTags = (val?: string | null) => {
    if (!val) return []
    try {
      const parsed = JSON.parse(val)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean)
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Pan-African Geographic Footprint
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {countries.length} Country Hubs Mapped
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Interactive Map & Country Data
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Manage African country footprints, ongoing project counts, farmer reach numbers, regional policy hubs, and agricultural value chain deliverables.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchCountries}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh countries list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add Country Hub
          </button>
        </div>
      </div>

      {/* Snapshot Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Countries Active
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {countries.length} Nations
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest">
            <Globe size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Total Active Projects
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {totalProjects} Assignments
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Briefcase size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Farmers Reached (Direct)
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {(totalFarmers / 1000).toFixed(0)}K+ Farmers
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Users size={20} />
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-80">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by country, code (KE, TZ...), or region..."
          className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
        />
      </div>

      {/* Country Cards Grid */}
      {loading && countries.length === 0 ? (
        <div className="py-24 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
          Loading African footprint from Supabase...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <MapPin size={32} className="mx-auto mb-2 text-charcoal/20" />
          No country hubs found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => {
            const focusTags = parseTags(c.focus)
            const locations = parseTags(c.locations)
            return (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-black/[0.08] p-6 shadow-xs hover:shadow-lg hover:border-black/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-deep-forest text-white font-mono font-bold text-xs flex items-center justify-center">
                        {c.countryCode}
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-deep-forest leading-tight">
                          {c.countryName}
                        </h3>
                        <p className="text-[10px] text-charcoal/50 font-medium">
                          {c.region || 'African Region'}
                        </p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-mist text-deep-forest text-xs font-bold border border-black/[0.06]">
                      {c.activeProjectsCount} Projects
                    </span>
                  </div>

                  {c.overviewEn && (
                    <p className="text-xs text-charcoal/80 leading-relaxed line-clamp-3">
                      {c.overviewEn}
                    </p>
                  )}

                  {/* Metrics Pills */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-charcoal/70">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100">
                      👥 {(c.engagement / 1000).toFixed(0)}K+ Reached
                    </span>
                    {locations.length > 0 && (
                      <span className="px-2.5 py-1 rounded-xl bg-[#FAF9F5] border border-black/[0.06] truncate">
                        📍 {locations.slice(0, 2).join(', ')}
                      </span>
                    )}
                  </div>

                  {/* Focus Tags */}
                  {focusTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {focusTags.slice(0, 3).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-black/[0.03] text-charcoal/70 border border-black/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-black/[0.06] mt-5">
                  <span className="text-[10px] text-charcoal/50">
                    {c.id.startsWith('static-') ? 'Preset Hub' : 'Live Supabase'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(c)}
                      className="p-2 rounded-lg hover:bg-mist text-deep-forest transition-colors cursor-pointer"
                      title="Edit country record"
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id, c.countryName)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                      title="Delete country record"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <CountryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCountries}
        country={selectedCountry}
      />
    </div>
  )
}

