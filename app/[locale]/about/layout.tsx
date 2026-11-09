import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('about_title'),
    description: t('about_desc'),
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        fr: '/fr/about',
        'x-default': '/en/about',
      },
    },
  };
}

export default async function AboutLayout({
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
          { name: locale === 'fr' ? 'À Propos' : 'About Us', url: `/${locale}/about` },
        ]}
      />
      {children}
    </>
  );
}
