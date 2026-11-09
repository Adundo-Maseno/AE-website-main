import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BreadcrumbJsonLd, ResourcesJsonLd } from '@/components/json-ld';
import { publicDownloads } from '@/lib/public-downloads';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ae-website-main.vercel.app';

  const title = t('resources_title');
  const description = t('resources_desc');

  return {
    title,
    description,
    keywords: [
      'Seed Systems Reports',
      'Agricultural Case Studies',
      'Seed Regulatory Reform',
      'East Africa Seed Trade',
      'Pasture Fodder Studies',
      'Agri Experience Downloads',
      'Sub-Saharan Africa Agriculture',
      'Public Agricultural Studies'
    ],
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        en: '/en/resources',
        fr: '/fr/resources',
        'x-default': '/en/resources',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `${siteUrl}/${locale}/resources`,
      siteName: 'Agri Experience',
      title,
      description,
      images: [
        {
          url: '/hero-bg.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ResourcesLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: locale === 'fr' ? 'Accueil' : 'Home', url: `/${locale}` },
          { name: locale === 'fr' ? 'Ressources' : 'Resources', url: `/${locale}/resources` },
        ]}
      />
      <ResourcesJsonLd locale={locale} downloads={publicDownloads} />
      {children}
    </>
  );
}
