import Image from 'next/image'
import OfficePlantsGallery from '@/components/motion/office-plants-gallery'
import { getTranslations } from 'next-intl/server'
import { getGalleryItems } from '@/lib/services/gallery-service'

export const revalidate = 0

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [t, galleryItems] = await Promise.all([
    getTranslations({ locale, namespace: 'Gallery' }),
    getGalleryItems(),
  ])

  const isFr = locale === 'fr'

  return (
    <main className="bg-white min-h-[100dvh] pt-16 lg:pt-28 pb-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-7xl font-serif text-deep-forest font-bold tracking-tight pb-2 mb-4">
          {t('title')}
        </h1>
        <p className="text-lg lg:text-xl text-charcoal/80 max-w-2xl mx-auto font-light">
          {t('subtitle')}
        </p>
      </div>

      <OfficePlantsGallery />

      {galleryItems.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-deep-forest font-bold tracking-tight mb-3">
              {isFr ? 'Galerie de terrain' : 'Field & Events Gallery'}
            </h2>
            <p className="text-sm sm:text-base text-charcoal/75 leading-relaxed">
              {isFr
                ? 'Moments clés de nos projets semenciers, formations et rencontres régionales à travers l’Afrique.'
                : 'Highlights from our seed systems fieldwork, capacity-building workshops, and regional convenings across Africa.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {galleryItems.map((item) => {
              const title = isFr ? item.titleFr || item.titleEn : item.titleEn
              const caption = isFr ? item.captionFr || item.captionEn : item.captionEn
              const isExternal = item.imageUrl.startsWith('http')
              const isUnoptimized =
                item.imageUrl.endsWith('.svg') || item.imageUrl.startsWith('/uploads/')

              return (
                <article
                  key={item.id}
                  className="group rounded-3xl overflow-hidden border border-black/[0.06] bg-white shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-mist">
                    {isExternal ? (
                      <img
                        src={item.imageUrl}
                        alt={title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <Image
                        src={item.imageUrl}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={isUnoptimized}
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-deep-forest/85 text-white text-[11px] font-semibold tracking-wide backdrop-blur-xs">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col gap-2">
                    <h3 className="font-serif font-bold text-lg text-deep-forest leading-snug">
                      {title}
                    </h3>
                    {caption && (
                      <p className="text-sm text-charcoal/75 leading-relaxed line-clamp-3">
                        {caption}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
