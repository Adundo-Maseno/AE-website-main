import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('insights_title'),
    description: t('insights_desc'),
  };
}

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
