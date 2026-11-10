'use client'

import { useState } from 'react'
import { Database, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SeedButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const router = useRouter()

  const handleSeed = async () => {
    if (!confirm('This will seed existing static site data (resources, team, projects) into the database if empty. Proceed?')) {
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
        text: `Success: Seeded ${data.stats?.resourcesSeeded || 0} resources, ${data.stats?.teamSeeded || 0} team members.`,
      })
      router.refresh()
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Seeding failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <button
        onClick={handleSeed}
        disabled={loading}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-mist hover:bg-black/5 text-deep-forest border border-black/10 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
      >
        <Database size={14} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Seeding Database...' : 'Seed / Sync Default Site Data'}
      </button>

      {message && (
        <div
          className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 size={14} className="text-green-600 shrink-0" />
          ) : (
            <AlertCircle size={14} className="text-red-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  )
}

