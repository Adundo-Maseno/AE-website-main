import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agri-experience.com'
  
  const routes = [
    '',
    '/about',
    '/contact',
    '/insights',
    '/newsletter',
    '/our-impact',
    '/our-team',
    '/our-work',
    '/resources'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
