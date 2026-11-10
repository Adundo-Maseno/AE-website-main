'use client'

import { useRef } from 'react'
import ClientLogos from '@/components/client-logos'
import { motion } from 'framer-motion'
import { ArrowRight, Earth, Handshake, Building2 } from 'lucide-react'
import { Link } from '@/i18n/routing'
import WhyAgriExperience from '@/components/motion/why-agri-experience'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { RollingText } from '@/components/ui/rolling-text'
import { PageSectionData } from '@/lib/services/page-sections-service'
import { BeliefData } from '@/lib/services/beliefs-service'
import { WhyAgriCardData } from '@/lib/services/why-agri-service'
import { PartnerData } from '@/lib/services/partners-service'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface HomeContentProps {
  initialSections?: Record<string, PageSectionData>
  initialBeliefs?: BeliefData[]
  initialWhyCards?: WhyAgriCardData[]
  initialPartners?: PartnerData[]
}

export default function HomeContent({
  initialSections,
  initialBeliefs,
  initialWhyCards,
  initialPartners,
}: HomeContentProps) {
  const t = useTranslations('Home')
  const tAgri = useTranslations('WhyAgriExperience')
  const locale = useLocale()

  const heroRef = useRef<HTMLElement>(null)
  const heroBgRef = useRef<HTMLDivElement>(null)
  const sequenceWrapperRef = useRef<HTMLDivElement>(null)
  const track1Ref = useRef<HTMLDivElement>(null)
  const track1InnerRef = useRef<HTMLDivElement>(null)
  const track2Ref = useRef<HTMLDivElement>(null)
  const track2InnerRef = useRef<HTMLDivElement>(null)

  // Effect 1: Hero Parallax
  useGSAP(() => {
    if (!heroRef.current || !heroBgRef.current) return

    let mm = gsap.matchMedia()
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(heroBgRef.current, {
        y: () => window.innerHeight * 0.2,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 0,
          end: 'bottom top',
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      })
    })

    return () => mm.revert()
  }, [])

  // Effect 2: Multi-step Pinned Horizontal Scroll with Parallax Overlap
  useGSAP(() => {
    if (
      !sequenceWrapperRef.current ||
      !track1Ref.current ||
      !track1InnerRef.current ||
      !track2Ref.current ||
      !track2InnerRef.current
    )
      return

    let mm = gsap.matchMedia()

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const container = sequenceWrapperRef.current

      const getScroll1 = () => {
        if (!track1InnerRef.current) return 0
        return Math.max(0, track1InnerRef.current.scrollWidth - window.innerWidth)
      }
      const getScroll2 = () => {
        if (!track2InnerRef.current) return 0
        return Math.max(0, track2InnerRef.current.scrollWidth - window.innerWidth)
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScroll1() + getScroll2() + window.innerWidth}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      const scroll1 = getScroll1()
      const scroll2 = getScroll2()
      const ratio1 = scroll1 > 0 ? scroll1 / window.innerWidth : 0.1
      const ratio2 = scroll2 > 0 ? scroll2 / window.innerWidth : 0.1

      tl.to(track1InnerRef.current, {
        x: () => -getScroll1(),
        ease: 'none',
        duration: ratio1,
      })

      tl.to(
        track1Ref.current,
        {
          x: () => -window.innerWidth * 0.3,
          ease: 'power2.inOut',
          duration: 0.8,
        },
        'cover'
      )

      tl.fromTo(
        track2Ref.current,
        {
          x: '100%',
        },
        {
          x: '0%',
          ease: 'power2.inOut',
          duration: 0.8,
        },
        'cover'
      )

      tl.to(track2InnerRef.current, {
        x: () => -getScroll2(),
        ease: 'none',
        duration: ratio2,
      })

      return () => {
        tl.kill()
      }
    })

    return () => mm.revert()
  }, [])

  // Section Data Resolve
  const heroSec = initialSections?.home_hero
  const beliefsHeadSec = initialSections?.beliefs_header
  const whyHeadSec = initialSections?.why_agri_header
  const partnersHeadSec = initialSections?.partners_header
  const ctaSec = initialSections?.home_cta

  // Hero Headline
  const heroTitleRaw =
    heroSec
      ? locale === 'fr' && heroSec.titleFr
        ? heroSec.titleFr
        : heroSec.titleEn || `${t('hero_title_1')}\n${t('hero_title_2')}\n${t('hero_title_3')}`
      : `${t('hero_title_1')}\n${t('hero_title_2')}\n${t('hero_title_3')}`

  const heroTitleLines = heroTitleRaw.split('\n')

  const heroDesc =
    heroSec
      ? locale === 'fr' && heroSec.subtitleFr
        ? heroSec.subtitleFr
        : heroSec.subtitleEn || t('hero_desc')
      : t('hero_desc')

  const exploreImpactBtn =
    heroSec
      ? locale === 'fr' && heroSec.contentFr
        ? heroSec.contentFr
        : heroSec.contentEn || t('explore_impact')
      : t('explore_impact')

  // Stats Pills
  let statItems = [
    { value: t('stat_1_val'), label: t('stat_1_lbl'), icon: Earth },
    { value: t('stat_2_val'), label: t('stat_2_lbl'), icon: Handshake },
    { value: t('stat_3_val'), label: t('stat_3_lbl'), icon: Building2 },
  ]
  if (heroSec?.extraJson) {
    try {
      const parsedStats = JSON.parse(heroSec.extraJson)
      if (Array.isArray(parsedStats) && parsedStats.length >= 3) {
        statItems = [
          {
            value: parsedStats[0].value,
            label: locale === 'fr' && parsedStats[0].labelFr ? parsedStats[0].labelFr : parsedStats[0].label,
            icon: Earth,
          },
          {
            value: parsedStats[1].value,
            label: locale === 'fr' && parsedStats[1].labelFr ? parsedStats[1].labelFr : parsedStats[1].label,
            icon: Handshake,
          },
          {
            value: parsedStats[2].value,
            label: locale === 'fr' && parsedStats[2].labelFr ? parsedStats[2].labelFr : parsedStats[2].label,
            icon: Building2,
          },
        ]
      }
    } catch {
      // Keep defaults
    }
  }

  // Beliefs
  const defaultBeliefs = [
    {
      title: t('belief_4_title'),
      text: t('belief_4_text'),
      width: 'w-[290px] lg:w-[330px] xl:w-[370px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    },
    {
      title: t('belief_3_title'),
      text: t('belief_3_text'),
      width: 'w-[290px] lg:w-[330px] xl:w-[370px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    },
    {
      title: t('belief_1_title'),
      text: t('belief_1_text'),
      width: 'w-[310px] lg:w-[350px] xl:w-[400px] min-[1440px]:w-[470px] 2xl:w-[510px]',
    },
    {
      title: t('belief_2_title'),
      text: t('belief_2_text'),
      width: 'w-[310px] lg:w-[350px] xl:w-[400px] min-[1440px]:w-[470px] 2xl:w-[510px]',
    },
  ]

  const beliefsWidths = [
    'w-[290px] lg:w-[330px] xl:w-[370px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    'w-[290px] lg:w-[330px] xl:w-[370px] min-[1440px]:w-[430px] 2xl:w-[470px]',
    'w-[310px] lg:w-[350px] xl:w-[400px] min-[1440px]:w-[470px] 2xl:w-[510px]',
    'w-[310px] lg:w-[350px] xl:w-[400px] min-[1440px]:w-[470px] 2xl:w-[510px]',
  ]

  const beliefs =
    initialBeliefs && initialBeliefs.length > 0
      ? initialBeliefs.filter((b) => b.active).map((b, idx) => ({
          title: locale === 'fr' && b.titleFr ? b.titleFr : b.titleEn,
          text: locale === 'fr' && b.textFr ? b.textFr : b.textEn,
          width: beliefsWidths[idx % beliefsWidths.length],
        }))
      : defaultBeliefs

  const beliefsSectionTitle =
    beliefsHeadSec
      ? locale === 'fr' && beliefsHeadSec.titleFr
        ? beliefsHeadSec.titleFr
        : beliefsHeadSec.titleEn || t('what_we_believe')
      : t('what_we_believe')

  // Why Agri Experience Cards
  const UNIFORM_CARD_WIDTH = 'w-[290px] lg:w-[320px] xl:w-[350px] min-[1440px]:w-[420px] 2xl:w-[460px]'
  const defaultAgriCards = [
    { text: tAgri('card_3'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_2'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_5'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_1'), width: UNIFORM_CARD_WIDTH },
    { text: tAgri('card_4'), width: UNIFORM_CARD_WIDTH },
  ]

  const agriCards =
    initialWhyCards && initialWhyCards.length > 0
      ? initialWhyCards.filter((c) => c.active).map((c) => ({
          text: locale === 'fr' && c.textFr ? c.textFr : c.textEn,
          width: UNIFORM_CARD_WIDTH,
        }))
      : defaultAgriCards

  const whySectionTitle =
    whyHeadSec
      ? locale === 'fr' && whyHeadSec.titleFr
        ? whyHeadSec.titleFr
        : whyHeadSec.titleEn || tAgri('title')
      : tAgri('title')

  // Partners Header
  const partnersTitle =
    partnersHeadSec
      ? locale === 'fr' && partnersHeadSec.titleFr
        ? partnersHeadSec.titleFr
        : partnersHeadSec.titleEn || t('trusted_leaders')
      : t('trusted_leaders')

  const partnersDesc =
    partnersHeadSec
      ? locale === 'fr' && partnersHeadSec.subtitleFr
        ? partnersHeadSec.subtitleFr
        : partnersHeadSec.subtitleEn || t('trusted_leaders_desc')
      : t('trusted_leaders_desc')

  // CTA
  const ctaTitle =
    ctaSec
      ? locale === 'fr' && ctaSec.titleFr
        ? ctaSec.titleFr
        : ctaSec.titleEn || t('cta_title')
      : t('cta_title')

  const ctaDesc =
    ctaSec
      ? locale === 'fr' && ctaSec.subtitleFr
        ? ctaSec.subtitleFr
        : ctaSec.subtitleEn || t('cta_desc')
      : t('cta_desc')

  const ctaBtn1 =
    ctaSec
      ? locale === 'fr' && ctaSec.contentFr
        ? ctaSec.contentFr
        : ctaSec.contentEn || t('cta_btn_1')
      : t('cta_btn_1')

  return (
    <>
      <main className="-mt-[4.5rem] lg:-mt-[5.5rem] bg-background overflow-x-clip">
        {/* Premium Full-Bleed Video Hero Section */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[90vh] md:min-h-[100dvh] flex flex-col justify-center overflow-hidden pt-[6.5rem] pb-12 bg-white z-0"
        >
          {/* Background Media Container */}
          <div
            ref={heroBgRef}
            className="absolute inset-0 md:-top-[20vh] left-0 w-full h-full md:h-[120vh] z-0 origin-center bg-black overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-mist">
              <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image
                  src="/hero-video-frame.webp"
                  alt="Agri Experience"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="100vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="hidden md:block absolute inset-0 w-full h-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  poster="/hero-video-frame.webp"
                  className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_30%]"
                >
                  <source src="/Videos/hero-video.mp4" type="video/mp4" media="(min-width: 768px)" />
                  <track kind="captions" src="/empty.vtt" srcLang="en" label="English" />
                </video>
              </div>
            </div>
          </div>

          {/* Directional Scrim */}
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/95 via-white/85 to-white/30 md:bg-gradient-to-r md:from-white/95 md:from-[20%] md:via-white/90 md:via-[55%] md:to-transparent md:to-[85%] md:w-[85%] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] min-[1440px]:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 w-full flex-1 flex flex-col justify-center">
            <div className="max-w-2xl xl:max-w-3xl 3xl:max-w-4xl space-y-6 lg:space-y-8">
              <h1
                className="font-serif tracking-tight pb-2 text-[#1A4D2E] font-bold leading-[1.15]"
                style={{ fontSize: 'clamp(1.875rem, 1.2rem + 3.2vw, 3.75rem)' }}
              >
                {heroTitleLines.map((line, idx) => (
                  <span key={idx}>
                    {line}
                    {idx < heroTitleLines.length - 1 && <br />}
                  </span>
                ))}
              </h1>

              <p
                className="text-charcoal leading-relaxed font-normal max-w-xl xl:max-w-2xl"
                style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
              >
                {heroDesc}
              </p>

              <div className="pt-2">
                <Link
                  href="/our-impact"
                  className="group relative overflow-hidden inline-flex items-center justify-center gap-3 px-6 py-3.5 lg:px-8 lg:py-4 bg-[#1A4D2E] text-white rounded-full font-bold transition duration-200 hover:bg-[#1A4D2E]/90 text-sm lg:text-base shadow-lg shadow-[#1A4D2E]/20 hover:shadow-xl hover:scale-[1.02]"
                >
                  <RollingText className="gap-3">
                    {exploreImpactBtn}
                    <ArrowRight
                      size={18}
                      className="transform rotate-[-45deg] group-hover:rotate-0 transition-transform duration-300 ease-out shrink-0"
                    />
                  </RollingText>
                </Link>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="pt-4 lg:pt-6"
              >
                <div className="flex flex-wrap justify-start items-center gap-4 sm:gap-6 lg:gap-10 xl:gap-12">
                  {statItems.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-primary-green/20 flex items-center justify-center text-[#1A4D2E] bg-white shadow-sm shrink-0">
                        <stat.icon size={18} className="lg:w-5 lg:h-5" />
                      </div>
                      <div className="flex flex-col text-left">
                        <div
                          className="font-bold text-[#1A4D2E] leading-none"
                          style={{ fontSize: 'clamp(1.125rem, 1rem + 0.6vw, 1.5rem)' }}
                        >
                          {stat.value}
                        </div>
                        <div className="text-[11px] sm:text-xs lg:text-[14px] min-[1440px]:text-xs font-bold tracking-[0.08em] min-[1440px]:tracking-[0.12em] text-charcoal/70 mt-1 whitespace-nowrap">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="hidden md:motion-safe:block">
          {/* Pinned Horizontal Sequence Wrapper */}
          <div ref={sequenceWrapperRef} className="relative z-20 bg-mist">
            <div className="relative h-[100dvh] w-full overflow-hidden">
              {/* Track 1: Why Agri Experience Layer */}
              <div ref={track1Ref} className="absolute inset-0 w-full h-full bg-mist z-0 flex">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,var(--warm-earth)_0%,transparent_60%)] opacity-20 blur-3xl pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,var(--primary-green)_0%,transparent_60%)] opacity-[0.05] blur-3xl pointer-events-none rounded-full -translate-x-1/4 translate-y-1/4" />

                <div
                  ref={track1InnerRef}
                  className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-5 lg:gap-6 xl:gap-8 min-[1440px]:gap-12 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24"
                >
                  <div className="w-[190px] lg:w-[210px] xl:w-[240px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0 space-y-3 lg:space-y-4 min-[1440px]:space-y-6">
                    <motion.div>
                      <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] min-[1440px]:text-5xl 2xl:text-6xl font-serif text-deep-forest font-bold tracking-tight pb-1 mb-2 min-[1440px]:mb-6 leading-[1.14]">
                        {whySectionTitle}
                      </h2>
                      <div className="w-16 lg:w-20 h-1 bg-primary-green rounded-full" />
                    </motion.div>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-3 lg:gap-3.5 xl:gap-4 min-[1440px]:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(350px,52vh,520px)]">
                    {agriCards.map((item, idx) => (
                      <div
                        key={idx}
                        className={`${item.width} h-full shrink-0 bg-white/85 backdrop-blur-xl p-4 lg:p-5 xl:p-6 min-[1440px]:p-7 2xl:p-8 rounded-2xl xl:rounded-3xl border border-white/60 hover:bg-white transition-all duration-300 group relative overflow-hidden flex flex-col justify-center shadow-sm hover:shadow-md`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 flex flex-col justify-center h-full overflow-hidden">
                          <p className="text-charcoal/90 font-medium leading-relaxed text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14.5px] min-[1440px]:text-[16.5px] 2xl:text-[18px]">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Track 2: What We Believe Layer */}
              <div
                ref={track2Ref}
                className="absolute inset-0 w-full h-full bg-deep-forest z-10 translate-x-full flex"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary-green)_0%,transparent_50%)] opacity-20 pointer-events-none" />

                <div
                  ref={track2InnerRef}
                  className="flex h-full items-center pt-[4.5rem] lg:pt-[5rem] px-6 md:px-8 lg:px-10 xl:px-12 min-[1440px]:px-16 2xl:px-24 gap-5 lg:gap-6 xl:gap-8 min-[1440px]:gap-12 2xl:gap-16 relative z-10 w-max pr-6 md:pr-8 lg:pr-10 xl:pr-12 min-[1440px]:pr-16 2xl:pr-24"
                >
                  <div className="w-[190px] lg:w-[210px] xl:w-[240px] min-[1440px]:w-[340px] 2xl:w-[380px] shrink-0 space-y-3 lg:space-y-4 min-[1440px]:space-y-6">
                    <motion.div>
                      <h2 className="text-2xl sm:text-3xl lg:text-[32px] xl:text-[34px] min-[1440px]:text-4xl 2xl:text-5xl font-serif text-white font-bold tracking-tight pb-1 mb-2 min-[1440px]:mb-6 leading-[1.15]">
                        {beliefsSectionTitle}
                      </h2>
                      <div className="w-16 lg:w-20 h-1 bg-primary-green rounded-full" />
                    </motion.div>
                  </div>

                  <div className="grid grid-rows-2 grid-flow-col gap-3.5 lg:gap-4 xl:gap-5 min-[1440px]:gap-6 shrink-0 py-2 lg:py-3 h-[clamp(360px,54vh,530px)]">
                    {beliefs.map((belief, idx) => (
                      <div
                        key={idx}
                        className={`${belief.width} h-full shrink-0 bg-white/5 backdrop-blur-sm border border-white/10 p-4 sm:p-5 lg:p-6 xl:p-7 min-[1440px]:p-8 rounded-2xl xl:rounded-3xl hover:bg-white/10 transition-all duration-300 flex flex-col justify-center overflow-hidden`}
                      >
                        <div className="flex flex-col justify-center gap-1.5 xl:gap-2 min-[1440px]:gap-2.5 h-full overflow-hidden">
                          <h3 className="text-sm sm:text-base lg:text-[17px] xl:text-lg min-[1440px]:text-xl font-serif text-white font-bold leading-snug">
                            {belief.title}
                          </h3>
                          <p className="text-white/80 font-normal leading-relaxed text-xs sm:text-[13px] lg:text-[13.5px] xl:text-[14px] min-[1440px]:text-[15.5px] 2xl:text-[17px]">
                            {belief.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="block md:motion-safe:hidden">
          {/* Vertical Fallback for Mobile / Reduced Motion */}
          <div className="relative z-20 bg-mist">
            <WhyAgriExperience initialCards={initialWhyCards} headerData={whyHeadSec} />

            {/* What We Believe Section */}
            <section className="w-full py-16 lg:py-20 bg-deep-forest relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary-green)_0%,transparent_50%)] opacity-20" />
              <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                  <div className="lg:w-1/3 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <h2 className="text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight pb-2 mb-6">
                        {beliefsSectionTitle}
                      </h2>
                      <div className="w-20 h-1 bg-primary-green rounded-full" />
                    </motion.div>
                  </div>

                  <div className="w-full lg:w-2/3 flex flex-col sm:grid sm:grid-cols-2 gap-4 md:gap-6">
                    {beliefs.map((belief, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 sm:p-6 rounded-2xl hover:bg-white/10 transition-colors flex flex-col justify-center"
                      >
                        <div className="flex flex-col">
                          <h3 className="text-xl font-serif text-white mb-2 font-bold">{belief.title}</h3>
                          <p className="text-white/80 font-normal text-base leading-relaxed">{belief.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Partners & Logos */}
        <section className="w-full py-16 lg:py-16 bg-mist relative z-20">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 md:mb-16 space-y-4">
              <h2 className="text-deep-forest text-2xl sm:text-3xl lg:text-5xl font-serif font-bold tracking-tight pb-2">
                {partnersTitle}
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-charcoal/70 font-light max-w-2xl mx-auto">
                {partnersDesc}
              </p>
            </div>
            <ClientLogos initialPartners={initialPartners} />
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="relative w-full py-10 sm:py-20 lg:py-32 bg-deep-forest text-white overflow-hidden z-20">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--accent-gold)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
            <div className="flex flex-col items-center gap-4 lg:gap-8">
              <div className="overflow-hidden pb-4 -mb-4">
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight"
                >
                  {ctaTitle}
                </motion.h2>
              </div>

              <div className="overflow-hidden pb-4 -mb-4">
                <motion.p
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-lg lg:text-2xl text-white/80 font-light leading-relaxed"
                >
                  {ctaDesc}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-row flex-wrap gap-3 sm:gap-6 justify-center mt-2 lg:mt-4"
              >
                <Link
                  href="/contact"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-4 py-3 sm:px-10 sm:py-5 bg-primary-green text-white rounded-full font-bold text-xs sm:text-lg transition duration-200 shadow-2xl shadow-primary-green/20"
                >
                  <RollingText>
                    {ctaBtn1}
                  </RollingText>
                </Link>
                <Link
                  href="/our-work"
                  className="group relative overflow-hidden inline-flex items-center justify-center px-4 py-3 sm:px-10 sm:py-5 border-2 border-white/30 text-white rounded-full font-bold text-xs sm:text-lg hover:bg-white/10 transition duration-200 backdrop-blur-sm"
                >
                  <RollingText>
                    {t('cta_btn_2')}
                  </RollingText>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
