'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { TeamMemberItem } from '@/lib/services/team-service'

interface TeamCard {
  id: string
  name: string
  role: string
  bio: string
  image: string
  hoverImage?: string
  imagePosition?: string
  hoverImagePosition?: string
  projects?: string[]
}

const STATIC_IMAGE_CONFIG: Record<string, Partial<TeamCard>> = {
  aline: {
    image: '/team/aline.png',
    imagePosition: '50% 35%',
  },
  mulemia: {
    image: '/team/mulemia2.jpg',
    hoverImage: '/team/mulemia.jpg',
    imagePosition: '54% 27%',
    hoverImagePosition: '55% 21%',
  },
  jayne: {
    image: '/team/jayne2.jpg',
    hoverImage: '/team/jayne.jpg',
    imagePosition: '51% 27%',
    hoverImagePosition: '55% 30%',
  },
  ronald: {
    image: '/team/ronald2.jpg',
    hoverImage: '/team/ronald.jpg',
    imagePosition: '52% 27%',
    hoverImagePosition: '55% 27%',
  },
  denis: {
    image: '/team/denis2.jpg',
    hoverImage: '/team/denis.jpg',
    imagePosition: '50% 27%',
    hoverImagePosition: '50% 25%',
  },
  moses: {
    image: '/team/moses2.jpg',
    hoverImage: '/team/moses.jpg',
    imagePosition: '50% 26%',
    hoverImagePosition: '50% 26%',
  },
  claire: {
    image: '/team/claire2.jpg',
    hoverImage: '/team/claire.jpg',
    imagePosition: '54% 31%',
    hoverImagePosition: '57% 24%',
  },
  nicholas: {
    image: '/team/kilonzo2.jpg',
    hoverImage: '/team/kilonzo.jpg',
    imagePosition: '48% 36%',
    hoverImagePosition: '52% 24%',
  },
  kilonzo: {
    image: '/team/kilonzo2.jpg',
    hoverImage: '/team/kilonzo.jpg',
    imagePosition: '48% 36%',
    hoverImagePosition: '52% 24%',
  },
}

export default function OurTeamContent({
  locale,
  initialTeam,
}: {
  locale: string
  initialTeam: TeamMemberItem[]
}) {
  const t = useTranslations('OurTeam')
  const [selectedMember, setSelectedMember] = useState<TeamCard | null>(null)

  const isFr = locale === 'fr'

  const fullTeam: TeamCard[] = initialTeam.map((item) => {
    const key = item.name.toLowerCase().split(' ')[0]
    const config = STATIC_IMAGE_CONFIG[key] || {}

    // Check if translations exist for known team keys
    let name = item.name
    let role = isFr && item.roleFr ? item.roleFr : item.roleEn
    let bio = (isFr && item.bioFr ? item.bioFr : item.bioEn) || ''
    let projects: string[] | undefined

    try {
      if (t.has(`${key}_name` as any)) {
        name = t(`${key}_name` as any)
      }
      if (!item.roleFr && isFr && t.has(`${key}_role` as any)) {
        role = t(`${key}_role` as any)
      }
      if (!item.bioFr && isFr && t.has(`${key}_bio` as any)) {
        bio = t(`${key}_bio` as any)
      }
      if (t.has(`${key}_projects` as any)) {
        projects = t(`${key}_projects` as any).split(', ')
      }
    } catch {
      // Fallback to record attributes
    }

    return {
      id: item.id,
      name,
      role,
      bio,
      image: item.image || config.image || '/team/placeholder.jpg',
      hoverImage: item.hoverImage || config.hoverImage,
      imagePosition: config.imagePosition,
      hoverImagePosition: config.hoverImagePosition,
      projects,
    }
  })

  return (
    <main className="bg-[#FAFAFA] min-h-[100dvh]">
      {/* Editorial Hero */}
      <section className="relative w-full pt-16 lg:pt-[min(5.5rem,8vh)] pb-8 lg:pb-[min(2.75rem,4vh)] overflow-hidden border-b border-mist snap-start scroll-mt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--mist)_0%,transparent_50%)] opacity-50"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 lg:space-y-[min(1.25rem,2vh)] text-center"
          >
            <h1
              className="font-serif text-deep-forest font-bold tracking-tight pb-2"
              style={{ fontSize: 'clamp(1.875rem, 1.4rem + 2.4vw, 4.5rem)' }}
            >
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-charcoal/90 max-w-3xl mx-auto leading-relaxed font-normal">
              {t('subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid Layout */}
      <section className="w-full max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-[min(2.75rem,4vh)] pb-16 lg:pb-16 snap-start scroll-mt-20">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-12 lg:gap-x-3 lg:gap-y-[min(4rem,6vh)]">
          {fullTeam.map((member, idx) => (
            <motion.div
              key={member.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.08 }}
              className="group cursor-pointer flex flex-col"
              onClick={() => setSelectedMember(member)}
            >
              {/* Image Container */}
              <div
                className="relative w-full aspect-square sm:aspect-[4/5] rounded-none group-hover:rounded-xl transition-all duration-[800ms] ease-out overflow-hidden shadow-lg mb-5 lg:mb-[min(1.5rem,2vh)] bg-[#EFEFEF]"
                style={{ maxHeight: 'min(42vh, 380px)' }}
              >
                {member.image && member.image !== '/team/placeholder.jpg' ? (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className={`object-cover transition-all duration-[800ms] ease-out group-hover:scale-110 ${
                        member.hoverImage ? 'group-hover:opacity-0' : ''
                      } opacity-0`}
                      onLoad={(e) =>
                        (e.target as HTMLImageElement).classList.remove('opacity-0')
                      }
                      style={{
                        objectPosition: member.imagePosition || 'center 25%',
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    {member.hoverImage && (
                      <Image
                        src={member.hoverImage}
                        alt={`${member.name} alternate`}
                        fill
                        className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-[800ms] ease-out"
                        style={{
                          objectPosition: member.hoverImagePosition || 'center 25%',
                        }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-[800ms] ease-out group-hover:scale-110">
                    <span className="text-7xl font-serif text-charcoal/10 font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Text Information */}
              <div className="text-left px-2">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-deep-forest group-hover:text-primary-green transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-charcoal/70 mt-1.5">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
              onClick={() => setSelectedMember(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-3xl lg:max-w-[1600px] bg-white rounded-3xl lg:rounded-none overflow-hidden shadow-2xl flex flex-col lg:flex-row"
              style={{ height: 'min(90vh, 900px)', maxHeight: '92vh' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 lg:top-8 lg:right-8 z-20 w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-white/90 lg:bg-[#FAFAFA] backdrop-blur-md lg:backdrop-blur-none hover:bg-[#F0F0F0] flex items-center justify-center transition-colors border border-black/5 shadow-sm lg:shadow-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="text-deep-forest w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              </button>

              {/* Left Side: Typography & Content */}
              <div
                className="flex-1 flex flex-col overflow-y-auto"
                style={{
                  padding: 'clamp(1.5rem, 1rem + 2.5vw, 4rem)',
                  gap: 'clamp(1rem, 0.5rem + 2vh, 2rem)',
                }}
              >
                <div>
                  <h2
                    className="font-serif text-deep-forest font-normal leading-tight tracking-tight pb-2 mb-4 lg:mb-6 pr-12 lg:pr-0"
                    style={{ fontSize: 'clamp(2.25rem, 9vh, 7.5rem)' }}
                  >
                    {selectedMember.name.split(' ')[0]}
                    <br className="hidden lg:block" />
                    <span className="lg:hidden"> </span>
                    {selectedMember.name.split(' ').slice(1).join(' ')}
                  </h2>

                  <div className="space-y-4 max-w-xl">
                    <p className="text-charcoal/90 text-sm sm:text-base lg:text-[1.125rem] font-normal leading-relaxed">
                      {selectedMember.bio}
                    </p>
                  </div>
                </div>

                {/* Tags / Projects area */}
                {selectedMember.projects && selectedMember.projects.length > 0 && (
                  <div className="mt-4 lg:mt-6 space-y-3">
                    <h4 className="text-[0.65rem] lg:text-xs font-bold uppercase tracking-[0.2em] text-charcoal/50">
                      {t('expertise_label')}
                    </h4>
                    <div className="flex flex-wrap gap-2 lg:gap-2.5">
                      {selectedMember.projects.map((project, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 lg:px-4 lg:py-2 rounded-full border border-black/10 text-charcoal/80 text-[11px] lg:text-xs hover:border-primary-green hover:text-primary-green transition-colors cursor-default bg-black/[0.02]"
                        >
                          {project} ↗
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side: Large Portrait (Desktop Only) */}
              <div className="hidden lg:block w-[45%] relative bg-[#F5F5F5] overflow-hidden shrink-0">
                {selectedMember.image && selectedMember.image !== '/team/placeholder.jpg' ? (
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: selectedMember.imagePosition || 'center 25%',
                    }}
                    sizes="(max-width: 1600px) 45vw, 700px"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[15rem] font-serif text-charcoal/5 font-bold">
                      {selectedMember.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}

