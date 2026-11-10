'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Invalid email or password')
      }

      setSuccess(true)
      router.push('/admin')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.')
    } finally {
      setLoading(false)
    }
  }

  const fillDefaultCredentials = () => {
    setEmail('admin@agriexperience.com')
    setPassword('AgriExp2026!MasterKey')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#FAF9F5] relative overflow-hidden">
      <div className="w-full max-w-md bg-white rounded-3xl border border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8 sm:p-10 relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-[#FAF9F5] border border-black/[0.08] mb-4 shadow-xs">
            <Image
              src="/agri-experience-logo.png"
              alt="Agri Experience"
              width={42}
              height={42}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-deep-forest tracking-tight">
            Publishing Desk Sign In
          </h1>
          <p className="text-xs text-charcoal/70 mt-1.5 leading-relaxed">
            Enter your authorized credentials to manage publications, team rosters, and case studies.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-800">
            <AlertCircle size={16} className="shrink-0 text-red-600 mt-0.5" />
            <p className="leading-snug">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-emerald-800">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600 mt-0.5" />
            <p className="leading-snug">Authentication verified. Entering publishing desk...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-deep-forest mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agriexperience.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white text-deep-forest placeholder:text-charcoal/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-deep-forest mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/40" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-black/15 focus:border-deep-forest focus:ring-1 focus:ring-deep-forest/20 outline-none text-xs bg-white text-deep-forest"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-charcoal/40 hover:text-deep-forest transition-colors cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full mt-2 py-3 rounded-full bg-deep-forest hover:bg-[#153e25] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <span>Verifying credentials...</span>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Demo Helper Box */}
        <div className="mt-8 pt-6 border-t border-black/[0.06] text-center">
          <p className="text-[11px] text-charcoal/60 mb-2">
            Administrator credentials:
          </p>
          <button
            type="button"
            onClick={fillDefaultCredentials}
            className="text-xs font-bold text-deep-forest hover:underline inline-flex items-center gap-1.5 cursor-pointer bg-[#FAF9F5] px-3.5 py-1.5 rounded-full border border-black/[0.08]"
          >
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>Use Default Credentials</span>
          </button>
        </div>
      </div>
    </div>
  )
}
