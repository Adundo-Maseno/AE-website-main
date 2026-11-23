'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  MapPin,
  Building2,
  Eye,
  EyeOff,
} from 'lucide-react'
import {
  SERVICE_AREAS,
  type WorkMilestoneData,
} from '@/lib/services/milestones-service'
import { MilestoneIcon } from '@/components/our-work/milestone-icon'
import MilestoneFormModal from '@/components/admin/milestone-form-modal'

export default function AdminMilestonesPage() {
  const [milestones, setMilestones] = useState<WorkMilestoneData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMilestone, setEditingMilestone] = useState<WorkMilestoneData | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [filterArea, setFilterArea] = useState<string>('all')
  const [langTab, setLangTab] = useState<'en' | 'fr'>('en')

  const fetchMilestones = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/milestones')
      const data = await res.json()
      if (data.success && data.milestones) {
        setMilestones(data.milestones)
      }
    } catch (err) {
      console.error('Failed to load milestones:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMilestones()
  }, [])

  const serviceAreaMap = useMemo(() => {
    const map = new Map<string, (typeof SERVICE_AREAS)[number]>()
    for (const area of SERVICE_AREAS) map.set(area.slug, area)
    return map
  }, [])

  const filtered = useMemo(() => {
    if (filterArea === 'all') return milestones
    return milestones.filter((m) => m.serviceArea === filterArea)
  }, [milestones, filterArea])

  const handleToggleActive = async (m: WorkMilestoneData) => {
    try {
      const res = await fetch(`/api/admin/milestones/${m.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !m.active }),
      })
      const data = await res.json()
      if (data.success) fetchMilestones()
    } catch (err) {
      console.error('Failed to toggle milestone visibility:', err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/milestones/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setDeleteConfirmId(null)
        fetchMilestones()
      }
    } catch (err) {
      console.error('Failed to delete milestone:', err)
    }
  }

  const nextOrder =
    milestones.length > 0
      ? Math.max(...milestones.map((m) => m.order || 0)) + 1
      : 1

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Our Journey Milestones
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Manage the timeline projects displayed on the Our Work page and linked to your 6 service areas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/en/our-work#milestones"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 bg-white border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 rounded-xl text-xs font-semibold transition shadow-sm"
            >
              <ExternalLink size={14} />
              <span>View on /our-work</span>
            </Link>

            <div className="flex items-center gap-1 bg-white border border-[#0F2417]/15 rounded-xl p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setLangTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  langTab === 'en'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLangTab('fr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  langTab === 'fr'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                FR
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingMilestone(null)
                setIsModalOpen(true)
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2417] text-white rounded-xl text-xs font-bold hover:bg-[#1A4D2E] transition shadow-sm"
            >
              <Plus size={15} />
              <span>Add Milestone</span>
            </button>
          </div>
        </div>

        {/* Service Area Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterArea('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
              filterArea === 'all'
                ? 'bg-[#0F2417] text-white'
                : 'bg-white border border-[#0F2417]/15 text-[#0F2417]/75 hover:border-[#0F2417]/40'
            }`}
          >
            All ({milestones.length})
          </button>
          {SERVICE_AREAS.map((area) => {
            const count = milestones.filter((m) => m.serviceArea === area.slug).length
            return (
              <button
                key={area.slug}
                type="button"
                onClick={() => setFilterArea(area.slug)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition ${
                  filterArea === area.slug
                    ? 'bg-[#0F2417] text-white'
                    : 'bg-white border border-[#0F2417]/15 text-[#0F2417]/75 hover:border-[#0F2417]/40'
                }`}
              >
                {area.labelEn} ({count})
              </button>
            )
          })}
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-48 rounded-2xl bg-white border border-[#0F2417]/10 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => {
              const areaMeta = serviceAreaMap.get(m.serviceArea)
              const title = langTab === 'fr' && m.titleFr ? m.titleFr : m.titleEn
              const location = langTab === 'fr' && m.locationFr ? m.locationFr : m.location

              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl border p-5 flex flex-col justify-between gap-4 shadow-xs transition ${
                    m.active
                      ? 'border-[#0F2417]/15'
                      : 'border-amber-300/70 opacity-70 bg-amber-50/20'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#0F2417] text-white text-xs font-bold">
                        {m.yearRange}
                      </span>
                      <span className="text-[11px] font-semibold text-[#0F2417]/50">
                        Order #{m.order}
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#EEF7E6] border border-[#78B856]/30 text-[#0F2417] flex items-center justify-center shrink-0">
                        <MilestoneIcon name={m.icon} size={20} />
                      </div>
                      <h3 className="font-serif font-bold text-[#0F2417] text-base leading-snug">
                        {title}
                      </h3>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#0F2417]/75">
                      {m.client && (
                        <div className="flex items-center gap-1.5 font-semibold">
                          <Building2 size={13} className="text-emerald-700 shrink-0" />
                          <span>{m.client}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="shrink-0" />
                        <span>{location}</span>
                      </div>
                    </div>

                    {areaMeta && (
                      <div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${areaMeta.badgeClass}`}
                        >
                          {areaMeta.labelEn}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-[#0F2417]/10 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(m)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2417]/70 hover:text-[#0F2417]"
                    >
                      {m.active ? <Eye size={14} /> : <EyeOff size={14} />}
                      <span>{m.active ? 'Visible' : 'Hidden'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMilestone(m)
                          setIsModalOpen(true)
                        }}
                        className="p-2 rounded-lg border border-[#0F2417]/15 text-[#0F2417] hover:bg-[#0F2417]/5 transition"
                        title="Edit"
                      >
                        <Edit2 size={14} />
                      </button>

                      {deleteConfirmId === m.id ? (
                        <button
                          type="button"
                          onClick={() => handleDelete(m.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white text-[11px] font-bold"
                        >
                          Confirm
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(m.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <MilestoneFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchMilestones}
        initialData={editingMilestone}
        nextOrder={nextOrder}
      />
    </div>
  )
}
