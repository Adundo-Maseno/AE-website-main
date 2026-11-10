'use client'

import { useState, useEffect } from 'react'
import AdminHeader from '@/components/admin/admin-header'
import { Handshake, Plus, Search, Edit2, Trash2, ExternalLink, Layers, CheckCircle2 } from 'lucide-react'
import { PartnerData } from '@/lib/services/partners-service'
import PartnerFormModal from '@/components/admin/partner-form-modal'
import Image from 'next/image'

const CATEGORY_LABELS: Record<string, string> = {
  development_partners: 'Development Partners',
  government: 'Government & Ministries',
  regulators: 'Regulators',
  breeding_institutions: 'Breeding & Research',
  private_sector: 'Private Sector',
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerData[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<PartnerData | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/partners')
      const data = await res.json()
      if (data.success && data.partners) {
        setPartners(data.partners)
      }
    } catch (err) {
      console.error('Failed to load partners:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const handleEdit = (partner: PartnerData) => {
    setEditingPartner(partner)
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setEditingPartner(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchPartners()
        setDeleteConfirmId(null)
      }
    } catch (err) {
      console.error('Failed to delete partner:', err)
    }
  }

  const filteredPartners = partners.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter
    return matchesSearch && matchesCat
  })

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <AdminHeader />

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#0F2417]/60 font-mono mb-1">
              <Handshake size={14} className="text-[#C29B38]" />
              <span>Editorial Desk 08</span>
              <span>/</span>
              <span>Our Partners & Collaborators</span>
            </div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Partners & Institutional Network
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Manage client logos, government ministries, regional seed regulators, and development institutions featured on the home marquee.
            </p>
          </div>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F2417] text-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-sm self-start md:self-auto"
          >
            <Plus size={16} />
            <span>Add Partner Logo</span>
          </button>
        </div>

        {/* Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#0F2417]/10 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-[#0F2417]/60 uppercase tracking-wider block font-semibold">Total Partners</span>
            <span className="font-serif text-2xl font-bold text-[#0F2417] mt-1 block">{partners.length}</span>
          </div>
          <div className="bg-white border border-[#0F2417]/10 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-[#0F2417]/60 uppercase tracking-wider block font-semibold">Live in Marquee</span>
            <span className="font-serif text-2xl font-bold text-emerald-800 mt-1 block">
              {partners.filter((p) => p.active).length}
            </span>
          </div>
          <div className="bg-white border border-[#0F2417]/10 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-[#0F2417]/60 uppercase tracking-wider block font-semibold">Row 1 (Top)</span>
            <span className="font-serif text-2xl font-bold text-[#0F2417] mt-1 block">
              {partners.filter((p) => p.row === 1).length}
            </span>
          </div>
          <div className="bg-white border border-[#0F2417]/10 rounded-xl p-4 shadow-sm">
            <span className="text-xs text-[#0F2417]/60 uppercase tracking-wider block font-semibold">Row 2 (Bottom)</span>
            <span className="font-serif text-2xl font-bold text-[#0F2417] mt-1 block">
              {partners.filter((p) => p.row === 2).length}
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0F2417]/40" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by organization name..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-[#0F2417]/15 rounded-xl text-xs text-[#0F2417] placeholder:text-[#0F2417]/40 focus:outline-none focus:border-[#0F2417]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['ALL', 'development_partners', 'regulators', 'government', 'breeding_institutions', 'private_sector'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  categoryFilter === cat
                    ? 'bg-[#0F2417] text-[#FAF9F5]'
                    : 'bg-white border border-[#0F2417]/10 text-[#0F2417]/70 hover:bg-[#0F2417]/5'
                }`}
              >
                {cat === 'ALL' ? 'All Sectors' : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {/* Partner Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading partner logos...
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50 bg-white border border-[#0F2417]/10 rounded-2xl">
            No partners found matching your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-[#0F2417]/10 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  {/* Logo Display Box */}
                  <div className="w-full h-24 rounded-xl bg-[#FAF9F5] border border-[#0F2417]/5 flex items-center justify-center p-4 relative overflow-hidden mb-4">
                    {partner.logoUrl ? (
                      <Image
                        src={partner.logoUrl}
                        alt={partner.name}
                        width={140}
                        height={60}
                        className="max-h-16 w-auto object-contain transition group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-xs text-[#0F2417]/40">No Logo</span>
                    )}
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-white border border-[#0F2417]/10 text-[#0F2417]/60">
                      Row {partner.row}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm text-[#0F2417] group-hover:text-primary-green transition">
                    {partner.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#0F2417]/5 text-[#0F2417]/70">
                      {CATEGORY_LABELS[partner.category] || partner.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        partner.active
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {partner.active ? '● Live' : '○ Hidden'}
                    </span>
                  </div>

                  {partner.websiteUrl && (
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#0F2417]/60 hover:text-[#0F2417] flex items-center gap-1 mt-3 transition"
                    >
                      <ExternalLink size={11} />
                      <span className="truncate">{partner.websiteUrl.replace(/^https?:\/\//, '')}</span>
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-[#0F2417]/10">
                  <button
                    onClick={() => handleEdit(partner)}
                    className="p-1.5 rounded-lg text-[#0F2417]/70 hover:text-[#0F2417] hover:bg-[#0F2417]/5 transition text-xs flex items-center gap-1"
                  >
                    <Edit2 size={13} />
                    <span>Edit</span>
                  </button>

                  {deleteConfirmId === partner.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(partner.id)}
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
                      onClick={() => setDeleteConfirmId(partner.id)}
                      className="p-1.5 rounded-lg text-red-600/70 hover:text-red-700 hover:bg-red-50 transition text-xs flex items-center gap-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <PartnerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchPartners}
        partner={editingPartner}
      />
    </div>
  )
}
