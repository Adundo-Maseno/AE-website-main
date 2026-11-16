'use client'

import { useState, useEffect } from 'react'
import { Database, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SeedButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => setMessage(null), 6000)
    return () => clearTimeout(timer)
  }, [message])

  const handleSeed = async () => {
    if (!confirm('This will seed default site publications, team members, and case studies into the connected database if empty. Proceed?')) {
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/admin/seed', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Seed failed')
      }

      setMessage({
        type: 'success',
        text: `Database synchronized successfully with ${data.stats?.totalResources || 0} publications, ${data.stats?.totalTeam || 0} team members, and ${data.stats?.totalProjects || 0} case studies.`,
      })
      router.refresh()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Seeding failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleSeed}
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#FAF9F5] text-deep-forest border border-black/[0.12] text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap"
      >
        {loading ? (
          <RefreshCw size={14} className="animate-spin text-deep-forest" />
        ) : (
          <Database size={14} className="text-deep-forest" />
        )}
        <span>{loading ? 'Synchronizing...' : 'Sync Default Data'}</span>
      </button>

      {message && (
        <div
          role="status"
          aria-live="polite"
          className={`absolute right-0 top-full mt-2 w-80 max-w-[calc(100vw-2rem)] z-50 p-3 rounded-2xl text-xs flex items-start gap-2 shadow-lg ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={15} className="text-red-600 shrink-0 mt-0.5" />
          )}
          <span className="flex-1 leading-relaxed">{message.text}</span>
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="p-0.5 rounded hover:bg-black/5 shrink-0 cursor-pointer"
            aria-label="Dismiss status message"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
