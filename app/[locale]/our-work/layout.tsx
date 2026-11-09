import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BreadcrumbJsonLd } from '@/components/json-ld';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('our_work_title'),
    description: t('our_work_desc'),
    alternates: {
      canonical: `/${locale}/our-work`,
      languages: {
        en: '/en/our-work',
        fr: '/fr/our-work',
        'x-default': '/en/our-work',
      },
    },
  };
}

export default async function OurWorkLayout({
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
          { name: locale === 'fr' ? 'Notre Travail' : 'Our Work', url: `/${locale}/our-work` },
        ]}
      />
      {children}
    </>
  );
}
