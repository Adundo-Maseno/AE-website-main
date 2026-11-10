import type { Metadata } from 'next'
import '../globals.css'
import AdminHeader from '@/components/admin/admin-header'
import { getSession } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Admin CMS | Agri Experience',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang="en">
      <body className="font-sans bg-[#FBFBFA] min-h-screen text-deep-forest antialiased">
        <AdminHeader adminEmail={session?.email} />
        <main>{children}</main>
      </body>
    </html>
  )
}
