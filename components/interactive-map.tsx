'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  Globe,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import {
  cityCoordinates,
  createGenericProjects,
  mergeCountriesWithCms,
} from './country-data'
import type { CountryItem } from '@/lib/services/map-service'

const InteractiveMapbox = dynamic(
  () => import('./map/interactive-mapbox').then((mod) => mod.InteractiveMapbox),
  { ssr: false, loading: () => <div className="w-full h-full bg-primary-ivory animate-pulse" /> }
)
import { getOptimalZoom } from './map/map-utils'
import {
  type Region,
  type CountryProject,
  type CountryRecord,
  type DetailedCountryRecord,
  formatFarmers,
  regionFill
} from './map/map-types'

export type { Region, CountryProject, CountryRecord, DetailedCountryRecord }
export { cityCoordinates, formatFarmers, regionFill }

interface InteractiveMapProps {
  cmsCountries?: CountryItem[]
  heroTitle?: string
  heroSubtitle?: string
}

export default function InteractiveMap({
  cmsCountries,
  heroTitle,
  heroSubtitle,
}: InteractiveMapProps = {}) {
  const t = useTranslations('InteractiveMap')
  const locale = useLocale()

  const countrySeeds = useMemo(
    () => mergeCountriesWithCms(locale, cmsCountries),
    [locale, cmsCountries]
  )
  const countriesData = useMemo(() => Object.fromEntries(countrySeeds.map((c) => [c.name, c])) as Record<string, DetailedCountryRecord>, [countrySeeds])
  const countriesByGeoName = useMemo(() => Object.fromEntries(countrySeeds.map((c) => [c.geoName ?? c.name, c])) as Record<string, DetailedCountryRecord>, [countrySeeds])
  
  const buildCountryProjects = useCallback((country: DetailedCountryRecord): CountryProject[] => country.projectBlueprints ?? createGenericProjects(country, locale), [locale])
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const desktopDossierRef = useRef<HTMLDivElement>(null)
  const [selectedCountry, setSelectedCountry] = useState<DetailedCountryRecord | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [hoveredName, setHoveredName] = useState<string | null>(null)

  const mapboxMapRef = useRef<any>(null)

  const updateTooltipPos = useCallback((pos: { x: number; y: number }) => {
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    }
    if (desktopDossierRef.current) {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      if (!isMobile) {
        desktopDossierRef.current.style.transform = `translate3d(${pos.x + 40}px, ${pos.y - 100}px, 0)`
      } else {
        desktopDossierRef.current.style.transform = 'none'
      }
    }
  }, [])

  const activeProjects = useMemo(
    () => (selectedCountry ? buildCountryProjects(selectedCountry) : []),
    [selectedCountry, buildCountryProjects]
  )
  
  const closeCountryOverlay = () => {
    setSelectedCountry(null)
    setSelectedProjectIndex(null)
    setHoveredName(null)
    if (mapboxMapRef.current) {
      mapboxMapRef.current.easeTo({
        center: [17.0, -2.0],
        zoom: getOptimalZoom(),
        pitch: 0,
        duration: 1000,
        essential: true
      });
    }
  }

  const handleCountryClickWrapper = (countryCode: string | null) => {
    if (!countryCode) {
      closeCountryOverlay()
      return
    }
    
    const country = Object.values(countriesData).find(
      (c) => c.code.toUpperCase() === countryCode.toUpperCase()
    )
    if (country) {
      setSelectedCountry(country)
      setSelectedProjectIndex(null)
      setHoveredName(null)
    }
  }

  return (
    <section className="w-full relative bg-primary-ivory h-[100vh] h-[100dvh] min-h-[550px] md:min-h-[750px] lg:min-h-[850px] flex flex-col overflow-hidden">
      {/* Main Interactive Workspace — full bleed, edge to edge */}
      <div className="relative flex-1 flex flex-col w-full h-full overflow-hidden" ref={containerRef}>
        {(heroTitle || heroSubtitle) && (
          <div
            className={`absolute top-4 left-4 right-4 sm:right-auto sm:top-6 sm:left-6 z-20 pointer-events-none max-w-md transition-opacity duration-300 ${
              selectedCountry ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-md border border-deep-forest/10 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-sm">
              {heroTitle && (
                <h1 className="font-serif font-bold text-deep-forest text-xl sm:text-2xl lg:text-3xl tracking-tight leading-tight">
                  {heroTitle}
                </h1>
              )}
              {heroSubtitle && (
                <p className="text-xs sm:text-sm text-charcoal/80 leading-relaxed mt-1">
                  {heroSubtitle}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Map Canvas - scales with flex-1 */}
        <div className="flex-1 relative h-full w-full transition-all duration-500 ease-in-out">
          <div className="absolute inset-0 z-0">
            <InteractiveMapbox 
              onMapReady={(m) => mapboxMapRef.current = m}
              onCountryClick={handleCountryClickWrapper}
              setHoveredName={setHoveredName}
              setTooltipPos={updateTooltipPos}
              selectedCountryName={selectedCountry?.code}
              activeProjects={activeProjects}
              selectedProjectIndex={selectedProjectIndex}
              setSelectedProjectIndex={setSelectedProjectIndex}
              cityCoordinates={cityCoordinates}
            />
          </div>

          <div
            ref={tooltipRef}
            style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              pointerEvents: 'none',
              zIndex: 50
            }}
          >
            <AnimatePresence>
              {!selectedCountry && hoveredName && (
                <motion.div
                  layoutId="country-dossier"
                  initial={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
                  exit={{ opacity: 0, scale: 0.95, y: -10, x: "-50%" }}
                  transition={{ duration: 0.15 }}
                  style={{ transformOrigin: 'center' }}
                  className="absolute top-6 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-md border border-white/10 bg-deep-forest/40 text-white shadow-md flex items-center justify-center"
                >
                  {hoveredName}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dossier — Bottom Sheet on Mobile, Floating Overlay on Desktop */}
        <div 
          ref={desktopDossierRef} 
          className="absolute inset-0 pointer-events-none z-30 lg:left-0 lg:top-0 lg:inset-auto lg:w-105 lg:h-auto"
        >
          <AnimatePresence>
            {selectedCountry && (
              <motion.div
                layoutId="country-dossier"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200, mass: 0.8 }}
                className={[
                  'pointer-events-auto',
                  // Mobile: bottom sheet — fills width, sits at bottom
                  'absolute bottom-0 left-0 right-0 h-[calc(50vh+100px)]',
                  'rounded-t-3xl',
                  // Desktop: floating overlay card positioned right next to the selected country (which is centered)
                  'lg:relative lg:bottom-auto lg:left-auto lg:right-auto',
                  'lg:w-full lg:h-auto lg:max-h-[85vh]',
                  'lg:rounded-2xl',
                  // Shared glass styling matching the label
                  'bg-deep-forest/80 lg:bg-deep-forest/70 backdrop-blur-xl',
                  'border border-white/20',
                  'shadow-2xl',
                  'flex flex-col overflow-hidden',
                ].join(' ')}
              >
              {/* Drag indicator — mobile only */}
              <div className="lg:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              {/* Header */}
              <div className="shrink-0 flex items-start justify-between gap-3 px-6 pt-4 lg:pt-6 pb-4 relative">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70">
                    <Globe size={11} className="opacity-60" />
                    {selectedCountry.region}
                  </div>
                  <h3 className="text-white text-2xl lg:text-[28px] font-serif tracking-tight pb-2 leading-tight font-bold flex items-center gap-3">
                    <img 
                      src={`/flags/${selectedCountry.code.toLowerCase()}.png`}
                      alt={`${selectedCountry.code} flag`} 
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                      className="w-8 h-8 lg:w-10 lg:h-10 object-contain shrink-0 drop-shadow-sm"
                    />
                    {selectedCountry.name}
                  </h3>
                </div>
                <button
                  onClick={closeCountryOverlay}
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/50 transition-all duration-200 hover:bg-white/20 hover:text-white hover:scale-110"
                  aria-label="Close country dossier"
                >
                  <X size={16} strokeWidth={2.5} />
                </button>
              </div>

              {/* Subtle separator */}
              <div className="mx-6 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 pt-5 pb-7 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="space-y-4">

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                        <Briefcase size={12} className="text-accent-gold" />
                        {locale === 'fr' ? 'Projets actifs' : 'Active Projects'}
                      </div>
                      <div className="mt-1 text-xl font-serif font-bold text-white">
                        {selectedCountry.projects}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white/60">
                        <Users size={12} className="text-accent-gold" />
                        {locale === 'fr' ? 'Agriculteurs touchés' : 'Farmers Reached'}
                      </div>
                      <div className="mt-1 text-xl font-serif font-bold text-white">
                        {formatFarmers(selectedCountry.engagement)}
                      </div>
                    </div>
                  </div>

                  {/* Overview */}
                  {selectedCountry.overview && (
                    <p className="text-sm leading-relaxed text-white/85">
                      {selectedCountry.overview}
                    </p>
                  )}

                  {/* Work Done Details */}
                  {(selectedCountry.workDone || []).length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 shadow-sm">
                      <div className="text-sm font-bold uppercase tracking-widest text-accent-gold/90 mb-3 flex items-center gap-2">
                        <Target size={16} /> {t('work_done') || 'Work Done'}
                      </div>
                      <ul className="space-y-2.5">
                        {(selectedCountry.workDone || []).map((work, i) => (
                          <li key={`work-${i}`} className="flex items-start gap-3 text-sm leading-relaxed text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 mt-1.5 shrink-0" />
                            <span>{work}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Focus Areas */}
                  {selectedCountry.focus && selectedCountry.focus.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent-gold/90 mb-2.5 flex items-center gap-2">
                        <Sparkles size={14} /> {locale === 'fr' ? 'Domaines clés' : 'Focus Areas'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCountry.focus.map((item, i) => (
                          <span
                            key={`focus-${i}`}
                            className="rounded-full bg-white/10 border border-white/10 px-2.5 py-1 text-xs text-white/85"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Impacts */}
                  {selectedCountry.impact && selectedCountry.impact.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent-gold/90 mb-2.5 flex items-center gap-2">
                        <TrendingUp size={14} /> {locale === 'fr' ? 'Impacts clés' : 'Key Impacts'}
                      </div>
                      <ul className="space-y-2">
                        {selectedCountry.impact.map((item, i) => (
                          <li key={`impact-${i}`} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/80">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent-gold/40 mt-1.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Key Locations */}
                  {selectedCountry.locations && selectedCountry.locations.length > 0 && (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-widest text-accent-gold/90 mb-2.5 flex items-center gap-2">
                        <MapPin size={14} /> {locale === 'fr' ? 'Pôles clés' : 'Key Locations'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCountry.locations.map((loc, i) => (
                          <span
                            key={`loc-${i}`}
                            className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/10 px-2.5 py-1 text-xs text-white/85"
                          >
                            <MapPin size={10} className="text-accent-gold/80" />
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      </div>
    </section>
  )
}
