import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('our_team_title'),
    description: t('our_team_desc'),
  };
}

export default function OurTeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
