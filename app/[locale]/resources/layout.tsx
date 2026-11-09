import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('resources_title'),
    description: t('resources_desc'),
    alternates: {
      canonical: `/${locale}/resources`,
      languages: {
        en: '/en/resources',
        fr: '/fr/resources',
        'x-default': '/en/resources',
      },
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
      {children}
    </>
  );
}
