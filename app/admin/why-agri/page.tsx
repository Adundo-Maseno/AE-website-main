'use client'

import { useState, useEffect } from 'react'
import { Award, Plus, Edit2, Trash2, Globe, Hash } from 'lucide-react'
import { WhyAgriCardData } from '@/lib/services/why-agri-service'
import WhyAgriFormModal from '@/components/admin/why-agri-form-modal'

export default function AdminWhyAgriPage() {
  const [cards, setCards] = useState<WhyAgriCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<WhyAgriCardData | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [langTab, setLangTab] = useState<'en' | 'fr'>('en')

  const fetchCards = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/why-agri')
      const data = await res.json()
      if (data.success && data.cards) {
        setCards(data.cards)
      }
    } catch (err) {
      console.error('Failed to load why-agri cards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const handleEdit = (c: WhyAgriCardData) => {
    setEditingCard(c)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingCard(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/why-agri/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchCards()
        setDeleteConfirmId(null)
      }
    } catch (err) {
      console.error('Failed to delete card:', err)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Why Agri Experience
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Competitive advantage pillars featured in the horizontal sequence and advantage grid.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white border border-[#0F2417]/15 rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setLangTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${langTab === 'en'
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'text-[#0F2417]/70 hover:text-[#0F2417]'
                  }`}
              >
                <Globe size={13} />
                English
              </button>
              <button
                onClick={() => setLangTab('fr')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${langTab === 'fr'
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
              <span>Add Card</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading advantage cards...
          </div>
        ) : cards.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50 bg-white border border-[#0F2417]/10 rounded-2xl">
            No cards created yet. Click &quot;Add Card&quot; to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((c, idx) => {
              const headline = langTab === 'en' ? c.titleEn : c.titleFr || c.titleEn
              const text = langTab === 'en' ? c.textEn : c.textFr || c.textEn

              return (
                <div
                  key={c.id}
                  className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#0F2417]/10">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0F2417]/5 flex items-center justify-center font-mono text-xs font-bold text-[#0F2417]">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-mono text-[#0F2417]/50">Order: {c.order}</span>
                      </div>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${c.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-stone-100 text-stone-500'
                          }`}
                      >
                        {c.active ? '● Live Active' : '○ Hidden'}
                      </span>
                    </div>

                    {headline && (
                      <span className="text-xs font-bold uppercase tracking-wider text-primary-green block mt-3">
                        {headline}
                      </span>
                    )}

                    <p className="text-sm text-[#0F2417]/90 leading-relaxed mt-2 font-medium">
                      &quot;{text}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 mt-6 border-t border-[#0F2417]/10">
                    <button
                      onClick={() => handleEdit(c)}
                      className="p-1.5 rounded-lg text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition text-xs flex items-center gap-1"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === c.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(c.id)}
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
                        onClick={() => setDeleteConfirmId(c.id)}
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

      <WhyAgriFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchCards}
        card={editingCard}
      />
    </div>
  )
}

