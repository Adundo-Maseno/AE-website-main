import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('our_work_capacity_building_title'),
    description: t('our_work_capacity_building_desc'),
  };
}

export default function CapacityBuildingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
