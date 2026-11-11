import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, Bebas_Neue, Space_Grotesk } from 'next/font/google'
import '../globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ae-website-main.vercel.app';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('root_title_default'),
      template: t('root_title_template'),
    },
    description: t('root_desc'),
    keywords: ['Agriculture', 'Seed Systems', 'Agricultural Development', 'Sub-Saharan Africa', 'Kenya', 'Agri Experience', 'Value Chains'],
    authors: [{ name: 'Agri Experience' }],
    creator: 'Agri Experience',
    publisher: 'Agri Experience',
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      url: `${siteUrl}/${locale}`,
      siteName: 'Agri Experience',
      title: t('root_title_default'),
      description: t('root_desc'),
      images: [
        {
          url: '/hero-bg.png',
          width: 1200,
          height: 630,
          alt: t('root_og_alt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/apple-icon.png',
    },
  };
}

import ScrollToTop from '@/components/scroll-to-top'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import LanguageSwitchProvider from '@/components/language-switch-provider'
import GoogleAnalytics from '@/components/google-analytics'
import CookieToast from '@/components/cookie-toast'
import { ServiceWorkerCleanup } from '@/components/service-worker-cleanup'
import { JsonLd } from '@/components/json-ld'

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfairDisplay.variable} ${dmSans.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} bg-background`}
    >
      <body suppressHydrationWarning className="font-dm-sans antialiased text-foreground">
        <JsonLd locale={locale} />
        <ServiceWorkerCleanup />
        <GoogleAnalytics />
        <NextIntlClientProvider messages={messages}>
          <LanguageSwitchProvider>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
            <CookieToast />
          </LanguageSwitchProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
