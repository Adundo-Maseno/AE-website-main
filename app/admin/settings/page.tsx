'use client'

import { useState, useEffect } from 'react'
import { Settings, Save, CheckCircle2, AlertCircle, Building, Mail, Phone, Globe, Award } from 'lucide-react'
import { SiteSettingsData } from '@/lib/services/settings-service'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettingsData>({
    projectsManagedCount: '350+',
    countriesCount: '22',
    seedCompaniesCount: '100+',
    yearsExperience: '25+',
    contactEmail: 'info@agri-experience.com',
    contactPhone: '+254 (20) 2626888',
    officeAddress: 'Watermark Business Park, Spring Court, Karen, P.O. Box 1720 - 00606, Nairobi',
    linkedinUrl: 'https://www.linkedin.com/company/agri-experience-ltd/',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null)

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/settings')
      const data = await res.json()
      if (data.success && data.settings) {
        setSettings(data.settings)
      }
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save settings')
      }
      setFeedback({ success: true, msg: 'Settings updated & live on public site!' })
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ success: false, msg: err.message || 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Site Settings & Impact Metrics
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Configure global impact numbers, contact communications, and headquarters address displayed across headers, footers, and contact sections.
            </p>
          </div>

          {feedback && (
            <span
              className={`text-xs flex items-center gap-1 font-medium ${
                feedback.success ? 'text-emerald-700' : 'text-red-600'
              }`}
            >
              {feedback.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              {feedback.msg}
            </span>
          )}
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-[#0F2417]/50">
            Loading settings...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            {/* Impact Metrics Block */}
            <div className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#0F2417]/10">
                <Award size={18} className="text-[#0F2417]" />
                <div>
                  <h2 className="font-serif text-base font-bold text-[#0F2417]">
                    Pan-African Impact Metrics
                  </h2>
                  <p className="text-xs text-[#0F2417]/60">
                    Key performance metrics published on the homepage, footer, and impact page
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                    Projects Managed
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.projectsManagedCount}
                    onChange={(e) => setSettings({ ...settings, projectsManagedCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">e.g. 350+</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                    Countries Engaged
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.countriesCount}
                    onChange={(e) => setSettings({ ...settings, countriesCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">e.g. 22</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                    Seed Companies Supported
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.seedCompaniesCount}
                    onChange={(e) => setSettings({ ...settings, seedCompaniesCount: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">e.g. 100+</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                    Years of Field Experience
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.yearsExperience}
                    onChange={(e) => setSettings({ ...settings, yearsExperience: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                  <span className="text-[11px] text-stone-500 mt-1 block">e.g. 25+</span>
                </div>
              </div>
            </div>

            {/* Contact & Headquarters Block */}
            <div className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#0F2417]/10">
                <Building size={18} className="text-[#0F2417]" />
                <div>
                  <h2 className="font-serif text-base font-bold text-[#0F2417]">
                    Headquarters & Official Communications
                  </h2>
                  <p className="text-xs text-[#0F2417]/60">
                    Official address, email, telephone, and social links published on /contact and footer
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail size={12} className="text-[#0F2417]/60" />
                    General Inquiry Email
                  </label>
                  <input
                    type="email"
                    required
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone size={12} className="text-[#0F2417]/60" />
                    Office Telephone
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5">
                    Physical Headquarters Address
                  </label>
                  <input
                    type="text"
                    required
                    value={settings.officeAddress}
                    onChange={(e) => setSettings({ ...settings, officeAddress: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Globe size={12} className="text-[#0F2417]/60" />
                    LinkedIn Company URL
                  </label>
                  <input
                    type="url"
                    value={settings.linkedinUrl}
                    onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F2417] text-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-sm disabled:opacity-50"
              >
                <Save size={14} />
                <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

