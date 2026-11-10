'use client'

import { useState, useEffect } from 'react'
import { Target, Plus, Edit2, Trash2, Globe, Hash, Link as LinkIcon } from 'lucide-react'
import { ExpertisePillarData } from '@/lib/services/expertise-service'
import ExpertiseFormModal from '@/components/admin/expertise-form-modal'

export default function AdminExpertisePage() {
  const [pillars, setPillars] = useState<ExpertisePillarData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPillar, setEditingPillar] = useState<ExpertisePillarData | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [langTab, setLangTab] = useState<'en' | 'fr'>('en')

  const fetchPillars = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/expertise')
      const data = await res.json()
      if (data.success && data.pillars) {
        setPillars(data.pillars)
      }
    } catch (err) {
      console.error('Failed to load expertise pillars:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPillars()
  }, [])

  const handleEdit = (p: ExpertisePillarData) => {
    setEditingPillar(p)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingPillar(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/expertise/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchPillars()
        setDeleteConfirmId(null)
      }
    } catch (err) {
      console.error('Failed to delete pillar:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Our Expertise & Capabilities
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Core capability domains featured on the About page and cross-linked to specialized service areas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-[#0F2417]/15 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setLangTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  langTab === 'en'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                <Globe size={13} />
                English
              </button>
              <button
                onClick={() => setLangTab('fr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  langTab === 'fr'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                }`}
              >
                <Globe size={13} />
                Français
              </button>
            </div>

            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2417] text-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-sm"
            >
              <Plus size={16} />
              <span>Add Expertise Pillar</span>
            </button>
          </div>
        </div>

        {/* Pillars List */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading expertise pillars...
          </div>
        ) : pillars.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50 bg-white border border-[#0F2417]/10 rounded-2xl">
            No pillars created yet. Click &quot;Add Expertise Pillar&quot; to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const title = langTab === 'en' ? p.titleEn : p.titleFr || p.titleEn
              const desc = langTab === 'en' ? p.descEn : p.descFr || p.descEn

              return (
                <div
                  key={p.id}
                  className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#0F2417]/10">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0F2417]/5 flex items-center justify-center font-mono text-xs font-bold text-[#0F2417]">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono text-[#0F2417]/50">Order: {p.order}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          p.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {p.active ? '● Live Active' : '○ Hidden'}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#0F2417] mt-3">
                      {title}
                    </h3>
                    <p className="text-sm text-[#0F2417]/80 leading-relaxed mt-2">
                      {desc}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-primary-green font-semibold mt-4">
                      <LinkIcon size={12} />
                      <span>Route: {p.route}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 mt-6 border-t border-[#0F2417]/10">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 rounded-lg text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition text-xs flex items-center gap-1"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === p.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-[11px] font-bold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg text-red-600/70 hover:text-red-700 hover:bg-red-50 transition text-xs flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      <ExpertiseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPillars}
        pillar={editingPillar}
      />
    </div>
  )
}

