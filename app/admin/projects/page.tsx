'use client'

import { useState, useEffect } from 'react'
import {
  Briefcase,
  Plus,
  Search,
  Edit3,
  Trash2,
  RefreshCw,
  AlertCircle,
  Calendar,
  Building,
} from 'lucide-react'
import ProjectFormModal from '@/components/admin/project-form-modal'
import { ProjectItem } from '@/lib/services/projects-service'

const PILLARS = [
  { value: 'All', label: 'All Pillars' },
  { value: 'digital-platforms', label: 'Digital Platforms' },
  { value: 'technical-studies', label: 'Technical Studies' },
  { value: 'project-implementation', label: 'Project Implementation' },
  { value: 'client-advisory', label: 'Client Advisory' },
  { value: 'capacity-building', label: 'Capacity Building' },
  { value: 'stakeholder-convenings', label: 'Stakeholder Convenings' },
]

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedPillar, setSelectedPillar] = useState('All')
  const [search, setSearch] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    try {
      const url =
        selectedPillar !== 'All'
          ? `/api/admin/projects?category=${selectedPillar}`
          : '/api/admin/projects'
      const res = await fetch(url)
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch projects')
      setProjects(data.projects || [])
    } catch (err: any) {
      setError(err.message || 'Error loading projects')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [selectedPillar])

  const handleCreate = () => {
    setSelectedProject(null)
    setIsModalOpen(true)
  }

  const handleEdit = (project: ProjectItem) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      alert(err.message || 'Could not delete project')
    }
  }

  const filteredProjects = projects.filter((p) => {
    const q = search.toLowerCase()
    return (
      !search ||
      p.titleEn.toLowerCase().includes(q) ||
      (p.titleFr && p.titleFr.toLowerCase().includes(q)) ||
      (p.client && p.client.toLowerCase().includes(q)) ||
      p.descEn.toLowerCase().includes(q)
    )
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Editorial Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-black/[0.08]">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-deep-forest text-white">
              Work Pillars & Programs
            </span>
            <span className="text-xs font-semibold text-charcoal/60">
              {projects.length} Case Studies & Assignments
            </span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-deep-forest tracking-tight">
            Case Studies & Pillar Assignments
          </h1>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1 max-w-2xl leading-relaxed">
            Manage flagship digital platforms (MbeguChoice, M3, RIMI), regional trade diagnostics, and agricultural capacity-building initiatives.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={fetchProjects}
            className="p-2.5 rounded-full border border-black/10 hover:bg-black/[0.04] text-charcoal/70 transition-colors cursor-pointer"
            title="Refresh list"
            aria-label="Refresh projects list"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleCreate}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Plus size={16} />
            Add Case Study
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Pillar Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.value}
              onClick={() => setSelectedPillar(pillar.value)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${selectedPillar === pillar.value
                  ? 'bg-deep-forest text-white shadow-xs'
                  : 'bg-white border border-black/[0.08] text-charcoal/70 hover:bg-black/[0.04]'
                }`}
            >
              {pillar.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, client, or topic..."
            className="w-full pl-9 pr-4 py-2 rounded-full border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-black/[0.08] shadow-xs overflow-hidden">
        {loading && projects.length === 0 ? (
          <div className="py-24 text-center text-xs text-charcoal/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-3 text-deep-forest/40" />
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-xs text-charcoal/60">
            <Briefcase size={32} className="mx-auto mb-2 text-charcoal/20" />
            No projects found in this pillar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/[0.06] bg-[#FAF9F5] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-4 px-5 w-12 text-center">Rank</th>
                  <th className="py-4 px-5">Title & Description</th>
                  <th className="py-4 px-5">Pillar</th>
                  <th className="py-4 px-5">Client / Partner</th>
                  <th className="py-4 px-5">Timeline</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.06]">
                {filteredProjects.map((item) => (
                  <tr key={item.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-4 px-5 text-center font-bold text-charcoal/50">
                      #{item.order}
                    </td>

                    <td className="py-4 px-5 max-w-lg">
                      <div className="flex items-start gap-3">
                        {item.imageUrl ? (
                          <div className="relative w-12 h-10 rounded-lg overflow-hidden border border-black/10 shrink-0 bg-[#FAF9F5]">
                            <img
                              src={item.imageUrl}
                              alt={item.titleEn}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-10 rounded-lg border border-dashed border-black/15 shrink-0 bg-[#FAF9F5] flex items-center justify-center text-charcoal/30">
                            <Briefcase size={14} />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-bold text-deep-forest text-sm leading-snug">
                            {item.titleEn}
                          </div>
                          {item.titleFr && (
                            <div className="text-[11px] text-charcoal/50 italic line-clamp-1 mt-0.5">
                              FR: {item.titleFr}
                            </div>
                          )}
                          <p className="text-charcoal/70 line-clamp-2 mt-1 text-xs leading-relaxed">
                            {item.descEn}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-mist text-deep-forest border border-black/[0.06] capitalize">
                        {item.category.replace('-', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-5 max-w-xs">
                      {item.client ? (
                        <span className="text-xs font-semibold text-[#1b6b33]">
                          {item.client}
                        </span>
                      ) : (
                        <span className="text-charcoal/40 italic">—</span>
                      )}
                    </td>

                    <td className="py-4 px-5 whitespace-nowrap">
                      {item.year ? (
                        <span className="text-xs text-charcoal/70 flex items-center gap-1">
                          <Calendar size={12} className="text-charcoal/40" />
                          {item.year}
                        </span>
                      ) : (
                        <span className="text-charcoal/40 italic">—</span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/[0.04] transition-colors cursor-pointer"
                          title="Edit project"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleEn)}
                          className="p-2 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete project"
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
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
        project={selectedProject}
      />
    </div>
  )
}
