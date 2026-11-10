'use client'

import { useState, useEffect } from 'react'
import { X, Globe, User, Image as ImageIcon, Hash } from 'lucide-react'
import { TeamMemberItem } from '@/lib/services/team-service'

interface TeamFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  member: TeamMemberItem | null
}

export default function TeamFormModal({
  isOpen,
  onClose,
  onSuccess,
  member,
}: TeamFormModalProps) {
  const [tab, setTab] = useState<'en' | 'fr'>('en')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [roleEn, setRoleEn] = useState('')
  const [roleFr, setRoleFr] = useState('')
  const [bioEn, setBioEn] = useState('')
  const [bioFr, setBioFr] = useState('')
  const [image, setImage] = useState('')
  const [order, setOrder] = useState<number>(0)

  useEffect(() => {
    if (member) {
      setName(member.name || '')
      setRoleEn(member.roleEn || '')
      setRoleFr(member.roleFr || '')
      setBioEn(member.bioEn || '')
      setBioFr(member.bioFr || '')
      setImage(member.image || '')
      setOrder(member.order ?? 0)
    } else {
      setName('')
      setRoleEn('')
      setRoleFr('')
      setBioEn('')
      setBioFr('')
      setImage('')
      setOrder(0)
    }
    setError(null)
  }, [member, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter the team member name.')
      return
    }
    if (!roleEn.trim()) {
      setError('Please provide an English role.')
      return
    }

    setLoading(true)

    const payload = {
      name: name.trim(),
      roleEn: roleEn.trim(),
      roleFr: roleFr.trim() || undefined,
      bioEn: bioEn.trim() || undefined,
      bioFr: bioFr.trim() || undefined,
      image: image.trim() || undefined,
      order: Number(order) || 0,
    }

    try {
      const url = member?.id && !member.id.startsWith('static-')
        ? `/api/admin/team/${member.id}`
        : '/api/admin/team'
      const method = member?.id && !member.id.startsWith('static-') ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save team member')

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-[#FAFAF8]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-deep-forest text-white">
              <User size={18} />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-deep-forest">
                {member ? 'Edit Team Member' : 'Add Team Member'}
              </h2>
              <p className="text-xs text-charcoal/60">
                Manage leadership & expert profiles with bilingual translations.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 text-charcoal/60 hover:text-deep-forest transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Language Tabs */}
        <div className="flex border-b border-black/5 px-6 bg-white gap-4">
          <button
            type="button"
            onClick={() => setTab('en')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              tab === 'en'
                ? 'border-deep-forest text-deep-forest'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <Globe size={14} /> English Details (Primary)
          </button>
          <button
            type="button"
            onClick={() => setTab('fr')}
            className={`py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              tab === 'fr'
                ? 'border-deep-forest text-deep-forest'
                : 'border-transparent text-charcoal/50 hover:text-charcoal'
            }`}
          >
            <Globe size={14} /> French Translations (Optional)
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
              {error}
            </div>
          )}

          {tab === 'en' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Aline O'Connor"
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Role / Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={roleEn}
                  onChange={(e) => setRoleEn(e.target.value)}
                  placeholder="e.g. Managing Director & Founder"
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Bio / Background (English)
                </label>
                <textarea
                  rows={4}
                  value={bioEn}
                  onChange={(e) => setBioEn(e.target.value)}
                  placeholder="Describe experience, leadership, and seed systems specialization..."
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-deep-forest mb-1 flex items-center gap-1">
                    <ImageIcon size={12} /> Photo Path or URL
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/team/aline.png"
                    className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                  />
                  <p className="text-[10px] text-charcoal/50 mt-1">
                    Local static image path in `/public/team/` or external HTTPS URL.
                  </p>
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
                  <p className="text-[10px] text-charcoal/50 mt-1">
                    Lower numbers appear first on the public website.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Role / Title (French)
                </label>
                <input
                  type="text"
                  value={roleFr}
                  onChange={(e) => setRoleFr(e.target.value)}
                  placeholder="e.g. Directrice générale et fondatrice"
                  className="w-full px-3.5 py-2 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-deep-forest mb-1">
                  Bio / Background (French)
                </label>
                <textarea
                  rows={5}
                  value={bioFr}
                  onChange={(e) => setBioFr(e.target.value)}
                  placeholder="Traduction française du profil professionnel..."
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
              {loading ? 'Saving...' : member ? 'Update Member' : 'Create Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
