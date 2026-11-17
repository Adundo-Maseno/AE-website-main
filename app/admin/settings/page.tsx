'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  Mail,
  Phone,
  Globe,
  Award,
  KeyRound,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Languages,
} from 'lucide-react'
import { SiteSettingsData } from '@/lib/services/settings-service'

export default function AdminSettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<SiteSettingsData>({
    projectsManagedCount: '350+',
    countriesCount: '22',
    seedCompaniesCount: '100+',
    yearsExperience: '25+',
    contactEmail: 'info@agri-experience.com',
    contactPhone: '+254 (20) 2626888',
    officeAddress: 'Watermark Business Park, Spring Court, Karen, P.O. Box 1720 - 00606, Nairobi, Kenya',
    linkedinUrl: 'https://www.linkedin.com/company/agri-experience-ltd/',
    showLanguageSwitcher: true,
    enableLanguageSwitcher: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savingLang, setSavingLang] = useState(false)
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null)
  const [langFeedback, setLangFeedback] = useState<{ success: boolean; msg: string } | null>(null)

  // Admin Login Credentials state
  const [currentAdminEmail, setCurrentAdminEmail] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordFeedback, setPasswordFeedback] = useState<{ success: boolean; msg: string } | null>(
    null
  )

  const fetchSettingsAndAdmin = async () => {
    try {
      setLoading(true)
      const [settingsRes, authRes] = await Promise.all([
        fetch('/api/admin/settings'),
        fetch('/api/admin/auth/change-password'),
      ])
      const settingsData = await settingsRes.json()
      if (settingsData.success && settingsData.settings) {
        setSettings({
          ...settingsData.settings,
          showLanguageSwitcher: settingsData.settings.showLanguageSwitcher ?? true,
          enableLanguageSwitcher: settingsData.settings.enableLanguageSwitcher ?? false,
        })
      }
      if (authRes.ok) {
        const authData = await authRes.json()
        if (authData.success && authData.email) {
          setCurrentAdminEmail(authData.email)
          setNewEmail(authData.email)
        }
      }
    } catch (err) {
      console.error('Failed to load settings:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSettingsAndAdmin()
  }, [])

  const handleSaveLanguageFlags = async (
    nextShow: boolean,
    nextEnable: boolean
  ) => {
    const previous = {
      showLanguageSwitcher: settings.showLanguageSwitcher,
      enableLanguageSwitcher: settings.enableLanguageSwitcher,
    }
    const updatedSettings: SiteSettingsData = {
      ...settings,
      showLanguageSwitcher: nextShow,
      enableLanguageSwitcher: nextEnable,
    }
    setSettings(updatedSettings)
    setSavingLang(true)
    setLangFeedback(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update navbar visibility')
      }
      setLangFeedback({
        success: true,
        msg: nextShow
          ? 'Language switcher is now visible on the public navbar.'
          : 'Language switcher is now hidden on the public navbar.',
      })
      router.refresh()
      setTimeout(() => setLangFeedback(null), 3500)
    } catch (err: any) {
      setSettings((prev) => ({ ...prev, ...previous }))
      setLangFeedback({ success: false, msg: err.message || 'Update failed' })
    } finally {
      setSavingLang(false)
    }
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
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
      router.refresh()
      setTimeout(() => setFeedback(null), 3000)
    } catch (err: any) {
      setFeedback({ success: false, msg: err.message || 'Save failed' })
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordFeedback(null)

    const trimmedEmail = newEmail.trim().toLowerCase()
    const emailChanged = trimmedEmail && trimmedEmail !== currentAdminEmail.toLowerCase()
    const passwordChanged = newPassword.length > 0

    if (!emailChanged && !passwordChanged) {
      setPasswordFeedback({
        success: false,
        msg: 'Change the admin email address or enter a new password to update.',
      })
      return
    }

    if (passwordChanged) {
      if (newPassword.length < 8) {
        setPasswordFeedback({
          success: false,
          msg: 'New password must be at least 8 characters long.',
        })
        return
      }
      if (newPassword !== confirmPassword) {
        setPasswordFeedback({ success: false, msg: 'New password and confirmation do not match.' })
        return
      }
    }

    setPasswordLoading(true)

    try {
      const res = await fetch('/api/admin/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword,
          newEmail: trimmedEmail,
          newPassword: passwordChanged ? newPassword : '',
          confirmPassword: passwordChanged ? confirmPassword : '',
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update credentials')
      }

      if (data.email) {
        setCurrentAdminEmail(data.email)
        setNewEmail(data.email)
      }

      setPasswordFeedback({
        success: true,
        msg: data.message || 'Admin login credentials updated successfully.',
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      router.refresh()
      setTimeout(() => setPasswordFeedback(null), 4500)
    } catch (err: any) {
      setPasswordFeedback({ success: false, msg: err.message || 'Failed to update credentials' })
    } finally {
      setPasswordLoading(false)
    }
  }

  const isLangShown = settings.showLanguageSwitcher !== false
  const isLangActive = settings.enableLanguageSwitcher === true

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0F2417] flex flex-col font-sans">
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0F2417]/10">
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-[#0F2417]">
              Site Settings &amp; Access Control
            </h1>
            <p className="text-sm text-[#0F2417]/70 mt-1 max-w-2xl">
              Manage administrator login credentials, toggle the public navbar language switcher, and configure global site metrics.
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
          <div className="space-y-8">
            {/* 1. Administrator Login Credentials (Moved to Top for Visibility) */}
            <section
              id="credentials"
              className="bg-white border border-[#0F2417]/15 rounded-2xl p-6 shadow-xs space-y-6 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0F2417]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0F2417] flex items-center justify-center text-[#FAF9F5]">
                    <Shield size={18} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                        Administrator Login Credentials
                      </h2>
                      {currentAdminEmail && (
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Signed in: {currentAdminEmail}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#0F2417]/60 mt-0.5">
                      Update your admin login email, password, or both. Requires your current password to confirm.
                    </p>
                  </div>
                </div>

                {passwordFeedback && (
                  <span
                    className={`text-xs flex items-center gap-1 font-medium ${
                      passwordFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {passwordFeedback.success ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <AlertCircle size={14} />
                    )}
                    {passwordFeedback.msg}
                  </span>
                )}
              </div>

              <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Mail size={12} className="text-[#0F2417]/60" /> Admin Login Email
                    </label>
                    <input
                      type="email"
                      required
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="admin@agri-experience.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Lock size={12} className="text-[#0F2417]/60" /> Current Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Verify current password..."
                        className="w-full px-3.5 pr-10 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F2417]/40 hover:text-[#0F2417] cursor-pointer"
                        aria-label={showCurrent ? 'Hide current password' : 'Show current password'}
                      >
                        {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <KeyRound size={12} className="text-[#0F2417]/60" /> New Password{' '}
                      <span className="font-normal text-[#0F2417]/50 lowercase">(optional if only changing email)</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showNew ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimum 8 characters..."
                        className="w-full px-3.5 pr-10 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F2417]/40 hover:text-[#0F2417] cursor-pointer"
                        aria-label={showNew ? 'Hide new password' : 'Show new password'}
                      >
                        {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F2417] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <KeyRound size={12} className="text-[#0F2417]/60" /> Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        required={newPassword.length > 0}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-type new password..."
                        className="w-full px-3.5 pr-10 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F2417]/40 hover:text-[#0F2417] cursor-pointer"
                        aria-label={showConfirm ? 'Hide password confirmation' : 'Show password confirmation'}
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-[11px] text-[#0F2417]/55">
                    Passwords are hashed with bcrypt and your admin session stays signed in seamlessly after updating.
                  </p>
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F2417] text-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-xs disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    <KeyRound size={14} />
                    <span>{passwordLoading ? 'Updating...' : 'Update Credentials'}</span>
                  </button>
                </div>
              </form>
            </section>

            {/* 2. Website Header & Language Switcher Controls */}
            <section
              id="language-switcher"
              className="bg-white border border-[#0F2417]/15 rounded-2xl p-6 shadow-xs space-y-5 scroll-mt-24"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0F2417]/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#0F2417]/10 flex items-center justify-center text-[#0F2417]">
                    <Languages size={18} />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#0F2417]">
                      Website Header &amp; Language Switcher (EN / FR)
                    </h2>
                    <p className="text-xs text-[#0F2417]/60 mt-0.5">
                      Instantly hide or unhide the EN / FR language toggle on the desktop header and mobile drawer.
                    </p>
                  </div>
                </div>

                {langFeedback && (
                  <span
                    className={`text-xs flex items-center gap-1 font-medium ${
                      langFeedback.success ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {langFeedback.success ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                    {langFeedback.msg}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Toggle 1: Hide / Unhide Language Switcher */}
                <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#0F2417]/10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F2417]">
                        Navbar Language Switcher Visibility
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isLangShown
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-stone-200 text-stone-700 border-stone-300'
                        }`}
                      >
                        {isLangShown ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-[#0F2417]/65 leading-relaxed">
                      {isLangShown
                        ? 'The EN / FR pill is currently displayed in the public website header and mobile menu.'
                        : 'The EN / FR pill is completely hidden from all visitors on desktop and mobile.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isLangShown}
                    disabled={savingLang}
                    onClick={() => handleSaveLanguageFlags(!isLangShown, isLangActive)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
                      isLangShown ? 'bg-[#0F2417]' : 'bg-stone-300'
                    }`}
                  >
                    <span className="sr-only">Toggle language switcher visibility</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                        isLangShown ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>

                {/* Toggle 2: Live Switch vs Review Badge Mode */}
                <div className={`flex items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF9F5] border border-[#0F2417]/10 transition-opacity ${
                  !isLangShown ? 'opacity-50' : 'opacity-100'
                }`}>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#0F2417]">
                        Live EN / FR Switching
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isLangActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {isLangActive ? 'Interactive' : 'Review Notice'}
                      </span>
                    </div>
                    <p className="text-xs text-[#0F2417]/65 leading-relaxed">
                      {isLangActive
                        ? 'Visitors can freely switch between English (/en) and French (/fr).'
                        : 'Shows "Under Linguistic Review" badge while greyed out.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isLangActive}
                    disabled={savingLang || !isLangShown}
                    onClick={() => handleSaveLanguageFlags(isLangShown, !isLangActive)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${
                      isLangActive ? 'bg-[#0F2417]' : 'bg-stone-300'
                    }`}
                  >
                    <span className="sr-only">Toggle live language switching</span>
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ${
                        isLangActive ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* 3. Global Impact Metrics & Contact Info Form */}
            <form onSubmit={handleSaveSettings} className="space-y-8">
              {/* Impact Metrics Block */}
              <div className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-xs space-y-5">
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
                      onChange={(e) =>
                        setSettings({ ...settings, projectsManagedCount: e.target.value })
                      }
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
                      onChange={(e) =>
                        setSettings({ ...settings, seedCompaniesCount: e.target.value })
                      }
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
                      onChange={(e) =>
                        setSettings({ ...settings, yearsExperience: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5]/50 border border-[#0F2417]/20 rounded-lg text-sm text-[#0F2417] focus:outline-none focus:border-[#0F2417] focus:bg-white"
                    />
                    <span className="text-[11px] text-stone-500 mt-1 block">e.g. 25+</span>
                  </div>
                </div>
              </div>

              {/* Contact & Headquarters Block */}
              <div className="bg-white border border-[#0F2417]/10 rounded-2xl p-6 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 pb-3 border-b border-[#0F2417]/10">
                  <Building size={18} className="text-[#0F2417]" />
                  <div>
                    <h2 className="font-serif text-base font-bold text-[#0F2417]">
                      Headquarters &amp; Official Communications
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
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0F2417] text-[#FAF9F5] rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#0F2417]/90 transition shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <Save size={14} />
                  <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
