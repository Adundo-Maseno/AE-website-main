'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  RefreshCw,
  AlertCircle,
  Hash,
} from 'lucide-react'
import TeamFormModal from '@/components/admin/team-form-modal'
import { TeamMemberItem } from '@/lib/services/team-service'

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMemberItem | null>(null)

  const fetchTeam = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/team')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch team members')
      setTeam(data.team || [])
    } catch (err: any) {
      setError(err.message || 'Error loading team members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeam()
  }, [])

  const handleCreate = () => {
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleEdit = (member: TeamMemberItem) => {
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return

    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setTeam((prev) => prev.filter((m) => m.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete team member')
    }
  }

  const filteredTeam = team.filter((m) => {
    const q = search.toLowerCase()
    return (
      !search ||
      m.name.toLowerCase().includes(q) ||
      m.roleEn.toLowerCase().includes(q) ||
      (m.roleFr && m.roleFr.toLowerCase().includes(q))
    )
  })

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest tracking-tight">
              Team Profiles
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-mist text-deep-forest border border-black/5">
              {team.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Manage executive leadership and specialist bios with live website updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchTeam}
            className="p-2.5 rounded-xl border border-black/10 hover:bg-black/5 text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Plus size={16} />
            Add Team Member
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Search Input */}
      <div className="relative w-full md:w-80">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or title..."
          className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-xs overflow-hidden">
        {loading && team.length === 0 ? (
          <div className="py-20 text-center text-xs text-charcoal/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-deep-forest/40" />
            Loading team profiles...
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="py-16 text-center text-xs text-charcoal/60">
            <Users size={32} className="mx-auto mb-2 text-charcoal/20" />
            No team members found matching your search.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/5 bg-[#FAFAF8] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Role & Title</th>
                  <th className="py-3 px-4">Bio Excerpt</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-charcoal/40">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black/5 text-[11px]">
                        {member.order}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-mist shrink-0 border border-black/5 relative">
                          {member.image ? (
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-deep-forest/40">
                              {member.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-deep-forest text-sm">
                            {member.name}
                          </div>
                          <span className="text-[10px] text-charcoal/50">
                            {member.id.startsWith('static-') ? 'Default Profile' : 'DB Managed'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-semibold text-deep-forest">
                        {member.roleEn}
                      </div>
                      {member.roleFr && (
                        <div className="text-[11px] text-charcoal/50 italic mt-0.5">
                          FR: {member.roleFr}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 max-w-md">
                      <p className="text-charcoal/70 line-clamp-2 text-xs">
                        {member.bioEn || 'No bio provided'}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/5 transition-colors cursor-pointer"
                          title="Edit"
                          aria-label="Edit team member"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                          aria-label="Delete team member"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTeam}
        member={selectedMember}
      />
    </div>
  )
}
