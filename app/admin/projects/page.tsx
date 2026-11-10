'use client'

import { useState, useEffect } from 'react'
import {
  Briefcase,
  Plus,
  Search,
  Edit2,
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
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest tracking-tight">
              Projects & Case Studies
            </h1>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-mist text-deep-forest border border-black/5">
              {projects.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/70 mt-1">
            Manage pillar initiatives, digital platforms (MbeguChoice, M3), and donor programs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchProjects}
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
            Add Project
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
          <AlertCircle size={16} className="text-red-600 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Pillar Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {PILLARS.map((pillar) => (
            <button
              key={pillar.value}
              onClick={() => setSelectedPillar(pillar.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedPillar === pillar.value
                  ? 'bg-deep-forest text-white shadow-xs'
                  : 'bg-white border border-black/5 text-charcoal/70 hover:bg-black/5'
              }`}
            >
              {pillar.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-xl border border-black/10 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-black/5 shadow-xs overflow-hidden">
        {loading && projects.length === 0 ? (
          <div className="py-20 text-center text-xs text-charcoal/60">
            <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-deep-forest/40" />
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-xs text-charcoal/60">
            <Briefcase size={32} className="mx-auto mb-2 text-charcoal/20" />
            No projects found in this pillar.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-black/5 bg-[#FAFAF8] text-charcoal/70 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Title & Description</th>
                  <th className="py-3 px-4">Pillar</th>
                  <th className="py-3 px-4">Client / Partner</th>
                  <th className="py-3 px-4">Timeline</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {filteredProjects.map((item) => (
                  <tr key={item.id} className="hover:bg-mist/30 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-charcoal/40">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-black/5 text-[11px]">
                        {item.order}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-md">
                      <div className="font-bold text-deep-forest text-sm leading-snug">
                        {item.titleEn}
                      </div>
                      {item.titleFr && (
                        <div className="text-[11px] text-charcoal/50 italic line-clamp-1 mt-0.5">
                          FR: {item.titleFr}
                        </div>
                      )}
                      <p className="text-charcoal/65 line-clamp-2 mt-1 text-xs">
                        {item.descEn}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-mist text-deep-forest border border-black/5 capitalize">
                        {item.category.replace('-', ' ')}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      {item.client ? (
                        <span className="text-[11px] font-semibold text-[#1b6b33]">
                          {item.client}
                        </span>
                      ) : (
                        <span className="text-charcoal/40 italic">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.year ? (
                        <span className="text-xs text-charcoal/70 flex items-center gap-1">
                          <Calendar size={12} className="text-charcoal/40" />
                          {item.year}
                        </span>
                      ) : (
                        <span className="text-charcoal/40 italic">—</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-deep-forest hover:bg-black/5 transition-colors cursor-pointer"
                          title="Edit"
                          aria-label="Edit project"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.titleEn)}
                          className="p-1.5 rounded-lg text-charcoal/60 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete"
                          aria-label="Delete project"
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

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
        project={selectedProject}
      />
    </div>
  )
}
