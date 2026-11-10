'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  AlertCircle,
  LayoutGrid,
  Table as TableIcon,
  Image as ImageIcon,
  CheckCircle2,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react'
import TeamFormModal from '@/components/admin/team-form-modal'
import { TeamMemberItem } from '@/lib/services/team-service'

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMemberItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

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
    if (!confirm(`Are you sure you want to remove ${name} from the team roster?`))
      return

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

  const withPhotosCount = team.filter((m) => !!m.image).length
  const withDualPhotosCount = team.filter((m) => !!m.image && !!m.hoverImage).length
  const bilingualCount = team.filter((m) => !!m.roleFr || !!m.bioFr).length

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Roster & Leadership
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {team.length} Members Registered
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Team Profiles & Photography
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Manage executive leadership, specialist biographies, and high-resolution portrait photography with direct live site synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchTeam}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh team list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add New Member
          </button>
        </div>
      </div>

      {/* Snapshot Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Total Roster
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {team.length} Profiles
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-mist flex items-center justify-center text-deep-forest">
            <Users size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Dual Portraits Active
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {withDualPhotosCount} of {team.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ImageIcon size={20} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-black/[0.06] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-charcoal/60 uppercase tracking-wider">
              Bilingual (EN / FR)
            </p>
            <p className="font-serif font-bold text-2xl text-deep-forest mt-0.5">
              {bilingualCount} of {team.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Control Bar: Search & View Switcher */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, role, or title..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex items-center rounded-full bg-white border border-black/[0.08] p-1 text-xs font-semibold text-charcoal/70 shadow-xs self-end sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-deep-forest text-white shadow-xs'
                : 'hover:text-deep-forest'
            }`}
          >
            <LayoutGrid size={13} /> Grid Cards
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-deep-forest text-white shadow-xs'
                : 'hover:text-deep-forest'
            }`}
          >
            <TableIcon size={13} /> Table View
          </button>
        </div>
      </div>

      {/* Loading & Empty states */}
      {loading && team.length === 0 ? (
        <div className="py-24 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
          Loading team roster from Supabase...
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="py-20 text-center text-xs text-charcoal/60 bg-white rounded-3xl border border-black/[0.06]">
          <Users size={32} className="mx-auto mb-2 text-charcoal/20" />
          No team members found matching your search.
        </div>
      ) : viewMode === 'grid' ? (
        /* VISUAL GRID VIEW: High-end photo cards */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-3xl border border-black/[0.08] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-black/20 transition-all flex flex-col justify-between"
            >
              {/* Photo Canvas with Interactive Hover Preview */}
              <div className="relative w-full aspect-[4/5] bg-[#EFEFEF] overflow-hidden">
                {member.image ? (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className={`object-cover transition-all duration-500 ${
                        member.hoverImage ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'
                      }`}
                    />
                    {member.hoverImage && (
                      <Image
                        src={member.hoverImage}
                        alt={`${member.name} alternate`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-charcoal/30 gap-2">
                    <span className="font-serif text-5xl font-bold">{member.name.charAt(0)}</span>
                    <span className="text-[11px] font-semibold text-charcoal/50">No Photo Uploaded</span>
                  </div>
                )}

                {/* Rank Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold tracking-wider">
                  #{member.order}
                </span>

                {/* Dual Photos Badge */}
                {member.image && member.hoverImage ? (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase flex items-center gap-1">
                    <CheckCircle2 size={10} /> 2 Photos
                  </span>
                ) : member.image ? (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] font-semibold">
                    1 Photo
                  </span>
                ) : null}

                {/* Dual Photo Thumbnails Indicator */}
                {member.image && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md">
                    <div
                      className="relative w-5 h-5 rounded-md overflow-hidden border border-white/60 shrink-0"
                      title="Primary headshot"
                    >
                      <Image src={member.image} alt="Primary" fill className="object-cover" sizes="20px" />
                    </div>
                    {member.hoverImage ? (
                      <div
                        className="relative w-5 h-5 rounded-md overflow-hidden border border-white/60 shrink-0"
                        title="Hover alternate headshot"
                      >
                        <Image src={member.hoverImage} alt="Hover" fill className="object-cover" sizes="20px" />
                      </div>
                    ) : (
                      <span className="text-[9px] text-white/70 px-1 font-mono">No Hover</span>
                    )}
                  </div>
                )}

                {/* Edit Button overlay on hover */}
                <button
                  onClick={() => handleEdit(member)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-white/95 text-deep-forest shadow-md hover:bg-deep-forest hover:text-white transition-all cursor-pointer opacity-90 group-hover:opacity-100"
                  title="Edit member & both photos"
                >
                  <Edit3 size={15} />
                </button>
              </div>

              {/* Text Body */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug group-hover:text-[#1b6b33] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-charcoal/80 uppercase tracking-wider mt-1">
                    {member.roleEn}
                  </p>
                  {member.roleFr && (
                    <p className="text-[11px] text-charcoal/50 italic mt-0.5 line-clamp-1">
                      FR: {member.roleFr}
                    </p>
                  )}
                  <p className="text-xs text-charcoal/70 line-clamp-3 mt-3 leading-relaxed">
                    {member.bioEn || 'No bio provided yet.'}
                  </p>
                </div>

                {/* Card footer actions */}
                <div className="pt-4 mt-4 border-t border-black/[0.06] flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-charcoal/50">
                    {member.id.startsWith('static-') ? 'Static Default' : 'Live Supabase'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(member)}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-deep-forest hover:bg-mist transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member.id, member.name)}
                      className="p-1 rounded-full text-charcoal/40 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete profile"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* COMPACT TABLE VIEW */
        <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#FAF9F5] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-5 w-12 text-center">Rank</th>
                  <th className="py-3.5 px-5">Member</th>
                  <th className="py-3.5 px-5">Role & Title</th>
                  <th className="py-3.5 px-5">Photo Status</th>
                  <th className="py-3.5 px-5">Bio Excerpt</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {filteredTeam.map((member) => (
                  <tr key={member.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-4 px-5 text-center font-bold text-charcoal/50">
                      #{member.order}
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        {/* Dual Avatar Display */}
                        <div className="flex items-center -space-x-2 shrink-0">
                          <div
                            className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAFAF8] border-2 border-white shadow-xs z-10"
                            title="Primary headshot"
                          >
                            {member.image ? (
                              <Image
                                src={member.image}
                                alt={`${member.name} Primary`}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-bold text-deep-forest/40 text-xs">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>

                          <div
                            className="relative w-10 h-10 rounded-full overflow-hidden bg-[#EFEFEF] border-2 border-white shadow-xs"
                            title="Interactive hover headshot"
                          >
                            {member.hoverImage ? (
                              <Image
                                src={member.hoverImage}
                                alt={`${member.name} Hover`}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[9px] font-bold text-charcoal/40 bg-black/5">
                                --
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="font-bold text-deep-forest text-sm">
                            {member.name}
                          </div>
                          <span className="text-[10px] text-charcoal/50">
                            {member.id.startsWith('static-') ? 'Static Default' : 'Live Supabase'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      <div className="font-semibold text-deep-forest">
                        {member.roleEn}
                      </div>
                      {member.roleFr && (
                        <div className="text-[11px] text-charcoal/50 italic mt-0.5">
                          FR: {member.roleFr}
                        </div>
                      )}
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      {member.image && member.hoverImage ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          <CheckCircle2 size={11} /> 2 Photos Active
                        </span>
                      ) : member.image ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                          1 Photo Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                          Missing Photos
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 max-w-md">
                      <p className="text-charcoal/70 line-clamp-2 text-xs">
                        {member.bioEn || 'No bio provided'}
                      </p>
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/[0.04] transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id, member.name)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Form */}
      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTeam}
        member={selectedMember}
      />
    </div>
  )
}
