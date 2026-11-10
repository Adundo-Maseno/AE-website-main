'use client'

import { RollingText } from '@/components/ui/rolling-text'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, Building, Calendar, ExternalLink, ShieldCheck } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { ProjectItem } from '@/lib/services/projects-service'

interface ClientAdvisoryClientProps {
  initialHero?: {
    title?: string
    subtitle?: string
  }
  projects?: ProjectItem[]
  locale?: string
}

export default function ClientAdvisoryClient({
  initialHero,
  projects = [],
  locale = 'en',
}: ClientAdvisoryClientProps) {
  const t = useTranslations('ClientAdvisory')

  const heroSubtitle = initialHero?.subtitle || t('hero_subtitle')

  const advisoryServices = [
    {
      title: t('adv_services.0.title'),
      description: t('adv_services.0.description'),
    },
    {
      title: t('adv_services.1.title'),
      description: t('adv_services.1.description'),
    },
    {
      title: t('adv_services.2.title'),
      description: t('adv_services.2.description'),
    },
    {
      title: t('adv_services.3.title'),
      description: t('adv_services.3.description'),
    },
  ]

  const approachPillars = [
    {
      title: t('pillars.0.title'),
      description: t('pillars.0.description'),
    },
    {
      title: t('pillars.1.title'),
      description: t('pillars.1.description'),
    },
    {
      title: t('pillars.2.title'),
      description: t('pillars.2.description'),
    },
  ]

  const regulatoryMilestones = [
    {
      title: t('cs_pillar1_title'),
      desc: t('cs_pillar1_desc'),
    },
    {
      title: t('cs_pillar2_title'),
      desc: t('cs_pillar2_desc'),
    },
    {
      title: t('cs_pillar3_title'),
      desc: t('cs_pillar3_desc'),
    },
    {
      title: t('cs_pillar4_title'),
      desc: t('cs_pillar4_desc'),
    },
  ]

  const customProjects = projects.filter(
    (p) => !p.id.startsWith('static-') || p.id === 'static-national-variety-release'
  )

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* ─── Hero ─── */}
      <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-gold/[0.04] rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[600px] h-[400px] bg-warm-earth/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-4 lg:space-y-6"
            >
              {initialHero?.title ? (
                <h1
                  className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                  style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                >
                  {initialHero.title}
                </h1>
              ) : (
                <h1
                  className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                  style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                >
                  {t('hero_title1')}
                  <span className="block text-[#435826]">{t('hero_title2')}</span>
                </h1>
              )}
              <p className="text-[#435826] font-semibold text-base sm:text-lg tracking-wide">
                {heroSubtitle}
              </p>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 lg:pt-16 relative"
            >
              <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-[#435826]/20" />
              <div className="lg:pl-10 space-y-4">
                <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-xl text-charcoal/85 leading-relaxed font-normal">
                  {t('hero_desc1')}
                </p>
                <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-xl text-charcoal/85 leading-relaxed font-normal">
                  {t('hero_desc2')}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#435826] text-white rounded-full font-semibold text-sm hover:bg-[#34441B] transition-colors shadow-xs shadow-[#435826]/20"
                  >
                    <RollingText className="gap-2">
                      {t('req_advisory')}
                      <ArrowRight
                        size={16}
                        className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                      />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-[#435826]/30 text-[#435826] rounded-full font-semibold text-sm hover:bg-[#F4F7EE] transition-colors"
                  >
                    <RollingText className="gap-2">{t('our_work')}</RollingText>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Advisory Services Grid ─── */}
      <section className="w-full pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mb-12 lg:mb-16"
          >
            <h2
              className="font-serif font-bold text-deep-forest tracking-tight pb-2"
              style={{ fontSize: 'clamp(1.75rem, 1.3rem + 2vw, 3rem)' }}
              dangerouslySetInnerHTML={{ __html: t('adv_services_title') }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {advisoryServices.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`rounded-[32px] border border-mist hover:border-[#435826]/30 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-6 sm:p-8 lg:p-10 group relative overflow-hidden ${
                  idx % 2 === 0 ? 'bg-mist' : 'bg-[#F4F7EE]/40'
                }`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#435826]/[0.04] rounded-bl-[80px] pointer-events-none group-hover:bg-[#435826]/[0.08] transition duration-300" />

                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl font-serif font-bold text-deep-forest group-hover:text-[#435826] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Our Approach — 3 Pillars ─── */}
      <section className="w-full pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-deep-forest tracking-tight pb-2">
              {t('oa_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {approachPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative group"
              >
                <div className="w-12 h-1 bg-[#435826] rounded-full mb-8 group-hover:w-20 transition-all duration-300" />
                <div className="text-6xl font-data text-[#435826]/15 leading-none mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-forest mb-4">
                  {pillar.title}
                </h3>
                <p className="text-charcoal/70 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Flagship Advisory Case Study: Redesigned with Photography & Editorial Spread ─── */}
      <section className="w-full py-16 lg:py-24 bg-[#F4F7EE] border-y border-[#E2E8D8] overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 pb-4">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#435826]/10 text-[#435826] text-xs font-bold uppercase tracking-wider">
                Flagship Regulatory Advisory
              </span>
              <h2
                className="font-serif font-bold text-deep-forest tracking-tight pb-1"
                style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3.5rem)' }}
              >
                {t('cs_title')}
              </h2>
            </div>
            <div className="text-xs font-mono text-charcoal/60 bg-white/80 border border-black/[0.08] px-4 py-2 rounded-2xl backdrop-blur-xs self-start">
              Policy & Institutional Advisory • KEPHIS Kenya
            </div>
          </div>

          {/* Dual-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Photography Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-black/10 group">
                <Image
                  src="/pexels-elvis-kambire-434351765-38025863.jpg"
                  alt="Certified seed field inspection and regulatory modernization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg text-deep-forest space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#435826] uppercase tracking-wider">
                    <ShieldCheck size={14} />
                    <span>KEPHIS • Ministry of Agriculture • STAK</span>
                  </div>
                  <p className="text-xs text-charcoal/80 font-medium leading-snug">
                    Unlocking regulatory bottlenecks, gazetting private seed inspectors, and pioneering the standard seed class.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Narrative & 4 Milestone Impact Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4 text-charcoal/85 font-normal leading-relaxed text-base sm:text-lg">
                <p>{t('cs_desc1')}</p>
                <p>{t('cs_desc2')}</p>
              </div>

              {/* 4 Strategic Advisory Impact Cards */}
              <div>
                <h3 className="text-sm font-bold text-deep-forest uppercase tracking-wider mb-4">
                  {t('cs_section_title')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {regulatoryMilestones.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-black/[0.06] hover:border-[#435826]/40 hover:shadow-md transition-all duration-300"
                    >
                      <div>
                        <h4 className="text-sm font-serif font-bold text-deep-forest mb-1.5 leading-snug group-hover:text-[#435826] transition-colors">
                          {milestone.title}
                        </h4>
                        <p className="text-xs text-charcoal/75 font-light leading-relaxed">
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-[#435826] text-white rounded-full font-semibold text-sm hover:bg-[#34441B] transition-all shadow-md"
                >
                  <RollingText className="gap-2">
                    {t('cs_cta_btn')}
                    <ArrowRight
                      size={15}
                      className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                    />
                  </RollingText>
                </Link>
                <Link
                  href="/resources?tab=case-studies"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-forest hover:text-[#435826] transition-colors px-4 py-2"
                >
                  <span>Read Regulatory Whitepapers</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Dynamic CMS Projects Showcase (if additional projects exist) ─── */}
      {customProjects.length > 0 && (
        <section className="w-full py-16 bg-white border-b border-black/[0.06]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-2xl lg:text-3xl text-deep-forest tracking-tight">
                  Featured Advisory Engagements
                </h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  Strategic governance and regulatory advisory partnerships across Africa.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProjects.map((p) => {
                const title = locale === 'fr' ? p.titleFr || p.titleEn : p.titleEn
                const desc = locale === 'fr' ? p.descFr || p.descEn : p.descEn

                return (
                  <div
                    key={p.id}
                    className="group rounded-3xl bg-mist border border-mist hover:border-[#435826]/30 hover:bg-white hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {p.imageUrl && (
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-white border-b border-black/[0.06]">
                        <Image
                          src={p.imageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        {p.client && (
                          <span className="font-bold text-[#435826] uppercase tracking-wider text-[11px]">
                            {p.client}
                          </span>
                        )}
                        {p.year && (
                          <span className="text-charcoal/50 text-[11px] font-mono">
                            {p.year}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-lg text-deep-forest leading-snug group-hover:text-[#435826] transition-colors">
                        {title}
                      </h4>

                      <p className="text-xs text-charcoal/70 font-light leading-relaxed flex-1 line-clamp-3">
                        {desc}
                      </p>

                      {p.link && (
                        <div className="pt-3 border-t border-black/[0.06] mt-auto">
                          <a
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#435826] hover:underline"
                          >
                            <span>Read Advisory Brief</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Section ─── */}
      <section className="w-full">
        <div className="w-full bg-deep-forest overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(58,180,74,0.08),transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(36,132,198,0.05),transparent_50%)] pointer-events-none" />

          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 lg:py-20 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2
                className="text-3xl lg:text-5xl font-serif font-bold text-white tracking-tight pb-2 mb-6"
                dangerouslySetInnerHTML={{ __html: t('cta_title') }}
              />
              <p className="text-base sm:text-lg lg:text-[14.5px] min-[1440px]:text-lg text-white/60 font-light leading-relaxed mb-10 max-w-xl mx-auto">
                {t('cta_desc')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-[#435826] text-white rounded-full font-semibold hover:bg-[#34441B] hover:scale-[1.02] hover:shadow-xl hover:shadow-[#435826]/20 transition-all"
                >
                  <RollingText className="gap-2">
                    {t('cta_btn1')}
                    <ArrowRight
                      size={18}
                      className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                    />
                  </RollingText>
                </Link>
                <Link
                  href="/our-work"
                  className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold hover:bg-white/5 transition-all"
                >
                  <RollingText className="gap-2">{t('cta_btn2')}</RollingText>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}
