import { Suspense } from 'react'
import { getTeamMembers } from '@/lib/services/team-service'
import OurTeamContent from '@/components/our-team-content'

export const revalidate = 0 // Dynamic on-demand revalidation via revalidatePath

export default async function OurTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const initialTeam = await getTeamMembers()

  return (
    <Suspense fallback={<div className="min-h-[100dvh] bg-[#FAFAFA]" />}>
      <OurTeamContent locale={locale} initialTeam={initialTeam} />
    </Suspense>
  )
}
