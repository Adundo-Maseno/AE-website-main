import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agri-experience.com';
  const locales = ['en', 'fr'] as const;

  const routes = [
    '',
    '/about',
    '/our-work',
    '/our-work/digital-platforms',
    '/our-work/technical-studies',
    '/our-work/project-implementation',
    '/our-work/client-advisory',
    '/our-work/capacity-building',
    '/our-work/stakeholder-convenings',
    '/our-impact',
    '/our-team',
    '/insights',
    '/resources',
    '/map',
    '/gallery',
    '/newsletter',
    '/contact',
    '/privacy',
    '/terms'
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  routes.forEach((route) => {
    const isHome = route === '';
    const isMainSection = ['/about', '/our-work', '/our-impact', '/resources'].includes(route);
    const priority = isHome ? 1.0 : isMainSection ? 0.9 : 0.7;
    const changeFrequency: 'daily' | 'weekly' | 'monthly' = isHome ? 'weekly' : isMainSection ? 'weekly' : 'monthly';

    locales.forEach((locale) => {
      const pathWithLocale = `/${locale}${route}`;
      sitemapEntries.push({
        url: `${baseUrl}${pathWithLocale}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            fr: `${baseUrl}/fr${route}`,
            'x-default': `${baseUrl}/en${route}`
          }
        }
      });
    });
  });

  return sitemapEntries;
}
