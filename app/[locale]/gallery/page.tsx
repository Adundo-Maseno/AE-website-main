import OfficePlantsGallery from '@/components/motion/office-plants-gallery'
import { useTranslations } from 'next-intl'

export default function GalleryPage() {
  const t = useTranslations('Gallery')
  return (
    <main className="bg-white min-h-[100dvh] pt-16 lg:pt-28 pb-10">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg lg:text-xl text-charcoal/80 max-w-2xl mx-auto font-light">
          {t('subtitle')}
        </p>
      </div>
      
      <OfficePlantsGallery />
    </main>
  )
}
