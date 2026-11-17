'use client'

import { RollingText } from '@/components/ui/rolling-text'
import { motion } from 'framer-motion'
import {
  Tractor,
  Target,
  Users,
  ClipboardList,
  MapPin,
  Sprout,
  ArrowRight,
  CheckCircle2,
  Handshake,
  Shield,
  ExternalLink,
  FileText,
} from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { ProjectItem } from '@/lib/services/projects-service'

interface ProjectImplementationClientProps {
  initialHero?: {
    title?: string
    subtitle?: string
  }
  projects?: ProjectItem[]
  locale?: string
}

export default function ProjectImplementationClient({
  initialHero,
  projects = [],
  locale = 'en',
}: ProjectImplementationClientProps) {
  const t = useTranslations('ProjectImplementation')

  const heroTitle = initialHero?.title || t('hero_title')
  const heroSubtitle = initialHero?.subtitle || t('hero_subtitle')

  const implementationAreas = [
    {
      icon: Sprout,
      title: t('areas.0.title'),
      points: [t('areas.0.points.0'), t('areas.0.points.1'), t('areas.0.points.2')],
    },
    {
      icon: MapPin,
      title: t('areas.1.title'),
      points: [t('areas.1.points.0'), t('areas.1.points.1'), t('areas.1.points.2')],
    },
    {
      icon: Handshake,
      title: t('areas.2.title'),
      points: [t('areas.2.points.0'), t('areas.2.points.1'), t('areas.2.points.2')],
    },
    {
      icon: Shield,
      title: t('areas.3.title'),
      points: [t('areas.3.points.0'), t('areas.3.points.1'), t('areas.3.points.2')],
    },
    {
      icon: ClipboardList,
      title: t('areas.4.title'),
      points: [t('areas.4.points.0'), t('areas.4.points.1'), t('areas.4.points.2')],
    },
    {
      icon: Target,
      title: t('areas.5.title'),
      points: [t('areas.5.points.0'), t('areas.5.points.1'), t('areas.5.points.2')],
    },
  ]

  const processSteps = [
    {
      step: '01',
      title: t('processSteps.0.title'),
      description: t('processSteps.0.description'),
      icon: Target,
    },
    {
      step: '02',
      title: t('processSteps.1.title'),
      description: t('processSteps.1.description'),
      icon: Users,
    },
    {
      step: '03',
      title: t('processSteps.2.title'),
      description: t('processSteps.2.description'),
      icon: Tractor,
    },
    {
      step: '04',
      title: t('processSteps.3.title'),
      description: t('processSteps.3.description'),
      icon: ClipboardList,
    },
    {
      step: '05',
      title: t('processSteps.4.title'),
      description: t('processSteps.4.description'),
      icon: CheckCircle2,
    },
  ]

  const defaultTitles = new Set([
    'enhancing the seed systems in tanzania (esseta) – a turning point for tanzania’s seed sector',
    'tanzania seed systems transformation: multi-year systems reform',
    'feed the future seed systems for development (sssd)',
    'scratch-off labels for certified seed authentication in kenya',
    'county agrodealer association strengthening in kenya',
  ])

  const customProjects = projects.filter(
    (p) => !p.id.startsWith('static-') && !defaultTitles.has(p.titleEn.toLowerCase())
  )

  return (
    <main className="bg-white min-h-[100dvh]">
      {/* ─── Hero ─── */}
      <section className="relative w-full pt-16 lg:pt-28 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-deep-forest/[0.04] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-green/[0.03] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-4 lg:space-y-6"
            >
              <h1
                className="font-serif text-deep-forest font-bold leading-tight tracking-tight pb-2"
                style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
                dangerouslySetInnerHTML={{ __html: heroTitle }}
              />
              <p className="text-deep-forest font-semibold text-base sm:text-lg tracking-wide">
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
              <div className="hidden lg:block absolute left-0 top-16 bottom-0 w-px bg-deep-forest/10" />
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
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-deep-forest text-white rounded-full font-semibold text-sm hover:opacity-90 transition-opacity"
                  >
                    <RollingText className="gap-2">
                      {t('req_partnership')}
                      <ArrowRight
                        size={16}
                        className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                      />
                    </RollingText>
                  </Link>
                  <Link
                    href="/our-work"
                    className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 border border-deep-forest/20 text-deep-forest rounded-full font-semibold text-sm hover:bg-deep-forest/5 transition-colors"
                  >
                    <RollingText className="gap-2">{t('our_work')}</RollingText>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Key Implementation Areas ─── */}
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
            >
              {t('ia_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {implementationAreas.map((area, idx) => {
              const Icon = area.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group rounded-[32px] bg-mist border border-mist hover:border-primary-green/20 hover:bg-white hover:shadow-xl transition-[background-color,border-color,box-shadow] duration-200 p-8 lg:p-10 flex flex-col relative overflow-hidden"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green mb-6 group-hover:bg-primary-green group-hover:text-white transition duration-200">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-deep-forest mb-4 tracking-tight pb-2">
                    {area.title}
                  </h3>

                  <ul className="space-y-3 flex-1">
                    {area.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-charcoal/80 font-light leading-relaxed text-[14.5px] min-[1440px]:text-base"
                      >
                        <CheckCircle2 size={16} className="text-primary-green mt-0.5 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── Flagship Implementation Case Study: Tanzania Seed Systems Transformation ─── */}
      <section className="w-full py-16 lg:py-24 bg-[#F4F8F0] border-y border-[#E0EAD8] overflow-hidden">
        <div className="max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-10">
          {/* ── Title & Explainer Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-4xl"
          >
            <h2
              className="font-serif font-bold text-deep-forest tracking-tight pb-1"
              style={{ fontSize: 'clamp(2rem, 1.4rem + 2.2vw, 3.5rem)' }}
            >
              {t('cs_title')}
            </h2>

            <div className="space-y-4 text-charcoal/85 font-normal leading-relaxed text-base sm:text-lg lg:text-[17px]">
              <p>{t('cs_desc1')}</p>
              <p>{t('cs_desc2')}</p>
            </div>

            {/* Bottom Action */}
            <div className="pt-2 flex items-center justify-start">
              <Link
                href="/contact"
                className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3.5 bg-primary-green text-white rounded-full font-semibold text-sm hover:bg-primary-green/90 transition-all shadow-md"
              >
                <RollingText className="gap-2">
                  {t('cs_cta_btn')}
                  <ArrowRight
                    size={15}
                    className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                  />
                </RollingText>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Dynamic CMS Projects ─── */}
      {customProjects.length > 0 && (
        <section className="w-full py-16 bg-[#F8FAF6] border-b border-black/[0.06]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-green">
                Project Implementation
              </span>
              <h3 className="font-serif font-bold text-2xl lg:text-3xl text-deep-forest tracking-tight">
                Additional CMS Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProjects.map((p) => {
                const title = locale === 'fr' ? p.titleFr || p.titleEn : p.titleEn
                const desc = locale === 'fr' ? p.descFr || p.descEn : p.descEn

                return (
                  <div
                    key={p.id}
                    className="group rounded-3xl bg-white border border-black/[0.08] hover:border-primary-green/30 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {p.imageUrl ? (
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-mist border-b border-black/[0.06]">
                        <Image
                          src={p.imageUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="relative w-full h-32 bg-primary-green/5 border-b border-black/[0.06] flex items-center justify-center text-primary-green/30">
                        <FileText size={40} />
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-1 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        {p.client && (
                          <span className="font-bold text-primary-green uppercase tracking-wider text-[11px]">
                            {p.client}
                          </span>
                        )}
                        {p.year && (
                          <span className="text-charcoal/50 text-[11px] font-mono">
                            {p.year}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif font-bold text-lg text-deep-forest leading-snug group-hover:text-primary-green transition-colors">
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
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-green hover:underline"
                          >
                            <span>View Project</span>
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

          {/* Noise texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="noiseFilterCTA">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect
                width="100%"
                height="100%"
                filter="url(#noiseFilterCTA)"
              />
            </svg>
          </div>

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
                  className="overflow-hidden relative group inline-flex items-center gap-2 px-8 py-4 bg-primary-green text-white rounded-full font-semibold hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-green/20 transition-all"
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
