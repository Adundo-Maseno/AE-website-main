import React from 'react';

export function JsonLd({ locale }: { locale: string }) {
  const isFr = locale === 'fr';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://agri-experience.com/#organization',
    name: 'Agri Experience',
    legalName: 'Agri Experience Ltd',
    url: 'https://agri-experience.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://agri-experience.com/agri-experience-logo.png',
      caption: 'Agri Experience Logo'
    },
    image: 'https://agri-experience.com/hero-bg.png',
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
    '@id': 'https://agri-experience.com/#website',
    url: 'https://agri-experience.com',
    name: 'Agri Experience',
    description: isFr
      ? 'Catalyser des systèmes semenciers inclusifs et durables en Afrique subsaharienne.'
      : 'Catalyzing inclusive and sustainable seed systems across Sub-Saharan Africa.',
    publisher: {
      '@id': 'https://agri-experience.com/#organization'
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
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://agri-experience.com${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

