import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('our_impact_title'),
    description: t('our_impact_desc'),
    alternates: {
      canonical: `/${locale}/our-impact`,
      languages: {
        en: '/en/our-impact',
        fr: '/fr/our-impact',
        'x-default': '/en/our-impact',
      },
    },
  };
}

export default async function OurImpactLayout({
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
          { name: locale === 'fr' ? 'Notre Impact' : 'Our Impact', url: `/${locale}/our-impact` },
        ]}
      />
      {children}
    </>
  );
}
