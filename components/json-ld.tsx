import React from 'react';

export function JsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ae-website-main.vercel.app';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'Agri Experience',
    legalName: 'Agri Experience Ltd',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/agri-experience-logo.png`,
      caption: 'Agri Experience Logo'
    },
    image: `${siteUrl}/hero-bg.png`,
    description: isFr
      ? 'Cabinet de conseil africain spécialisé dans le développement des systèmes semenciers, le conseil en politiques agricoles et le renforcement des filières en Afrique subsaharienne.'
      : 'African agricultural consulting firm specializing in seed systems development, policy advisory, and agricultural market transformations across Sub-Saharan Africa.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Watermark Business Park, Spring Court, Karen',
      addressLocality: 'Nairobi',
      postalCode: '00606',
      addressCountry: 'KE'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: 'info@agri-experience.com',
      availableLanguage: ['English', 'French']
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Sub-Saharan Africa' },
      { '@type': 'Country', name: 'Kenya' },
      { '@type': 'Country', name: 'Tanzania' },
      { '@type': 'Country', name: 'Uganda' },
      { '@type': 'Country', name: 'Rwanda' },
      { '@type': 'Country', name: 'Ethiopia' },
      { '@type': 'Country', name: 'Ghana' },
      { '@type': 'Country', name: 'Nigeria' }
    ],
    sameAs: [
      'https://www.linkedin.com/company/agri-experience/'
    ],
    knowsAbout: [
      'Seed Systems Development',
      'Seed Regulatory Reform',
      'Seed Certification & Inspection',
      'MbeguChoice Variety Selector',
      'Agro-dealer Networks',
      'Private Seed Inspector Accreditation',
      'Anti-counterfeit Seed Tracking (M3)',
      'Sub-Saharan Africa Agriculture'
    ]
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'Agri Experience',
    description: isFr
      ? 'Catalyser des systèmes semenciers inclusifs et durables en Afrique subsaharienne.'
      : 'Catalyzing inclusive and sustainable seed systems across Sub-Saharan Africa.',
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    inLanguage: ['en-US', 'fr-FR']
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function BreadcrumbJsonLd({
  items
}: {
  items: { name: string; url: string }[];
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ae-website-main.vercel.app';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ResourcesJsonLd({
  locale,
  downloads
}: {
  locale: string;
  downloads: Array<{
    title: string;
    link: string;
    client: string;
    citation: string;
    category: string;
  }>;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ae-website-main.vercel.app';
  const isFr = locale === 'fr';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/${locale}/resources#webpage`,
    url: `${siteUrl}/${locale}/resources`,
    name: isFr ? 'Ressources & Publications' : 'Resources & Publications',
    description: isFr
      ? 'Accédez aux rapports, études de cas et guides du domaine public publiés par Agri Experience.'
      : 'Access public-domain reports, case studies, scoping studies, and toolkits curated by Agri Experience.',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Agri Experience',
      url: siteUrl
    },
    about: {
      '@type': 'Thing',
      name: 'Seed Systems & Agricultural Development in Sub-Saharan Africa'
    },
    hasPart: downloads.map((d) => ({
      '@type': 'DigitalDocument',
      name: d.title,
      headline: d.title,
      description: d.citation,
      encodingFormat: 'application/pdf',
      url: `${siteUrl}${d.link}`,
      author: {
        '@type': 'Organization',
        name: d.client || 'Agri Experience'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Agri Experience',
        url: siteUrl
      },
      genre: d.category,
      inLanguage: 'en'
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

