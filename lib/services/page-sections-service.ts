import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface PageSectionData {
  id?: string
  sectionKey: string
  page: string
  titleEn?: string | null
  titleFr?: string | null
  subtitleEn?: string | null
  subtitleFr?: string | null
  contentEn?: string | null
  contentFr?: string | null
  mediaUrl?: string | null
  extraJson?: string | null
  updatedAt?: Date
}

export const defaultPageSections: Record<string, PageSectionData> = {
  home_hero: {
    sectionKey: 'home_hero',
    page: 'home',
    titleEn: 'Driving Resilient\nAgricultural & Seed Systems\nAcross Africa',
    titleFr: 'Favoriser des systèmes\nagricoles et semenciers résilients\nà travers l’Afrique',
    subtitleEn: 'Through innovation, expert advisory, and digital transformation.',
    subtitleFr: 'Grâce à l’innovation, au conseil spécialisé et à la transformation numérique.',
    contentEn: 'Explore Our Impact',
    contentFr: 'Explorer notre impact',
    mediaUrl: '/Videos/hero-video.mp4',
    extraJson: JSON.stringify([
      { value: '20+', label: 'African Countries', labelFr: 'Pays africains' },
      { value: '20+', label: 'Partners', labelFr: 'Partenaires' },
      { value: '100+', label: 'Institutions Supported', labelFr: 'Institutions soutenues' },
    ]),
  },
  about_hero: {
    sectionKey: 'about_hero',
    page: 'about',
    titleEn: 'About Us',
    titleFr: 'À propos de nous',
    subtitleEn: 'Transforming agricultural systems and empowering farmers across sub-Saharan Africa.',
    subtitleFr: 'Transformer les systèmes agricoles et responsabiliser les agriculteurs à travers l’Afrique subsaharienne.',
  },
  about_vision: {
    sectionKey: 'about_vision',
    page: 'about',
    titleEn: 'Our Vision',
    titleFr: 'Notre vision',
    contentEn: 'Our vision is a food secure and environmentally healthy Africa.',
    contentFr: 'Notre vision est une Afrique garantissant la sécurité alimentaire et un environnement sain.',
    mediaUrl: '/our-vision-2026.jpg',
  },
  about_mission: {
    sectionKey: 'about_mission',
    page: 'about',
    titleEn: 'Our Mission',
    titleFr: 'Notre mission',
    contentEn: 'Our mission is to help create great crop seed systems that enable African farmers to achieve their production potential and advance environmental sustainability.',
    contentFr: 'Notre mission est d’aider à créer d’excellents systèmes de semences végétales qui permettent aux agriculteurs africains d’atteindre leur potentiel de production et de faire progresser la durabilité environnementale.',
    mediaUrl: '/our-mission-2026.jpg',
  },
  about_goal: {
    sectionKey: 'about_goal',
    page: 'about',
    titleEn: 'Our Goal',
    titleFr: 'Notre objectif',
    contentEn: 'To accomplish this mission, our goal is to become the most respected advisor and service provider in the crop seed sector to private and public stakeholders and major development partners, and contribute towards achieving Sustainable Development Goals.',
    contentFr: 'Pour accomplir cette mission, notre objectif est de devenir le conseiller et prestataire de services le plus respecté dans le secteur des semences végétales auprès des acteurs privés et publics et des principaux partenaires de développement, et de contribuer à la réalisation des Objectifs de Développement Durable.',
    mediaUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
  },
  why_agri_header: {
    sectionKey: 'why_agri_header',
    page: 'home',
    titleEn: 'Why Agri Experience',
    titleFr: 'Pourquoi Agri Experience',
    subtitleEn: 'Our Advantage',
    subtitleFr: 'Notre avantage',
  },
  beliefs_header: {
    sectionKey: 'beliefs_header',
    page: 'home',
    titleEn: 'What We Believe',
    titleFr: 'Ce en quoi nous croyons',
  },
  partners_header: {
    sectionKey: 'partners_header',
    page: 'home',
    titleEn: 'Our Partners',
    titleFr: 'Nos partenaires',
    subtitleEn: 'Our impact is measured through the success of our partners and the resilience of the communities we serve.',
    subtitleFr: 'Notre impact se mesure au succès de nos partenaires et à la résilience des communautés que nous servons.',
  },
  expertise_header: {
    sectionKey: 'expertise_header',
    page: 'about',
    titleEn: 'Our Expertise',
    titleFr: 'Notre expertise',
    subtitleEn: 'We build resilient seed systems by supporting policy interventions, strengthening quality seed production, distribution, quality assurance, and improving farmer access to improved seed.',
    subtitleFr: 'Nous bâtissons des systèmes semenciers résilients en soutenant les interventions politiques, en renforçant la production, la distribution et l’assurance qualité des semences de qualité, et en améliorant l’accès des agriculteurs aux semences améliorées.',
  },
  home_cta: {
    sectionKey: 'home_cta',
    page: 'home',
    titleEn: 'Ready to Grow Together?',
    titleFr: 'Prêt à grandir ensemble ?',
    subtitleEn: "Join our network of transformative agricultural projects across Africa. Let's build sustainable systems that last for generations.",
    subtitleFr: 'Rejoignez notre réseau de projets agricoles transformateurs à travers l’Afrique. Bâtissons des systèmes durables pour les générations à venir.',
    contentEn: 'Work With Us',
    contentFr: 'Travailler avec nous',
  },
  about_cta: {
    sectionKey: 'about_cta',
    page: 'about',
    titleEn: 'Partner With Us',
    titleFr: 'Associez-vous avec nous',
    subtitleEn: "Let's collaborate to transform agricultural systems and create sustainable impact for generations to come.",
    subtitleFr: 'Collaborons pour transformer les systèmes agricoles et créer un impact durable pour les générations futures.',
    contentEn: 'Get In Touch',
    contentFr: 'Contactez-nous',
  },
  our_work_hero: {
    sectionKey: 'our_work_hero',
    page: 'our-work',
    titleEn: 'Our Work',
    titleFr: 'Notre travail',
    subtitleEn: 'Transforming agricultural systems and empowering farmers across sub-Saharan Africa.',
    subtitleFr: 'Transformer les systèmes agricoles et responsabiliser les agriculteurs à travers l’Afrique subsaharienne.',
  },
  digital_platforms_hero: {
    sectionKey: 'digital_platforms_hero',
    page: 'our-work',
    titleEn: 'Digital Platforms',
    titleFr: 'Plateformes numériques',
    subtitleEn: 'Technology for Transparency & Growth',
    subtitleFr: 'La technologie au service de la transparence et de la croissance',
  },
  technical_studies_hero: {
    sectionKey: 'technical_studies_hero',
    page: 'our-work',
    titleEn: 'Technical Studies',
    titleFr: 'Études techniques',
    subtitleEn: 'Evidence-Based Research & Scoping',
    subtitleFr: 'Recherche fondée sur des données probantes et cadrage',
  },
  project_implementation_hero: {
    sectionKey: 'project_implementation_hero',
    page: 'our-work',
    titleEn: 'Project Implementation',
    titleFr: 'Mise en œuvre des projets',
    subtitleEn: 'Delivering Sustainable Impact Across Value Chains',
    subtitleFr: 'Générer un impact durable à travers les chaînes de valeur',
  },
  client_advisory_hero: {
    sectionKey: 'client_advisory_hero',
    page: 'our-work',
    titleEn: 'Client Advisory',
    titleFr: 'Conseil aux clients',
    subtitleEn: 'Strategic Insight & High-Impact Guidance',
    subtitleFr: 'Perspectives stratégiques et orientation à fort impact',
  },
  capacity_building_hero: {
    sectionKey: 'capacity_building_hero',
    page: 'our-work',
    titleEn: 'Capacity Building',
    titleFr: 'Renforcement des capacités',
    subtitleEn: 'Equipping Seed Teams & Regulatory Inspectors',
    subtitleFr: 'Former les équipes semencières et les inspecteurs régulateurs',
  },
  stakeholder_convenings_hero: {
    sectionKey: 'stakeholder_convenings_hero',
    page: 'our-work',
    titleEn: 'Stakeholder Convenings',
    titleFr: 'Rencontres multipartites',
    subtitleEn: 'Fostering Regional Collaboration & Trade Dialogue',
    subtitleFr: 'Favoriser la collaboration régionale et le dialogue commercial',
  },
  our_impact_hero: {
    sectionKey: 'our_impact_hero',
    page: 'our-impact',
    titleEn: 'Our Impact Across Africa',
    titleFr: 'Notre impact à travers l’Afrique',
    subtitleEn: 'Measurable change in seed systems, farmer productivity, and institutional capacity.',
    subtitleFr: 'Des changements mesurables dans les systèmes semenciers, la productivité agricole et les capacités institutionnelles.',
  },
  our_impact_cta: {
    sectionKey: 'our_impact_cta',
    page: 'our-impact',
    titleEn: 'Ready to Transform Seed Systems With Us?',
    titleFr: 'Prêt à transformer les systèmes semenciers avec nous ?',
    subtitleEn: 'Join development partners, governments, and agribusinesses creating sustainable agricultural change across Africa.',
    subtitleFr: 'Rejoignez les partenaires de développement, gouvernements et agro-industries qui créent un changement durable à travers l’Afrique.',
    contentEn: 'Work With Us',
    contentFr: 'Travailler avec nous',
  },
  contact_hero: {
    sectionKey: 'contact_hero',
    page: 'contact',
    titleEn: 'Get In Touch',
    titleFr: 'Contactez-nous',
    subtitleEn: 'Have a question or looking to collaborate? Reach out to our team in Nairobi, Kenya.',
    subtitleFr: 'Une question ou un projet de collaboration ? Contactez notre équipe à Nairobi, Kenya.',
  },
  contact_info: {
    sectionKey: 'contact_info',
    page: 'contact',
    titleEn: 'Regional Headquarters',
    titleFr: 'Siège régional',
    subtitleEn: 'Watermark Business Park, Spring Court, Karen, P.O. Box 1720 - 00606, Nairobi, Kenya',
    subtitleFr: 'Watermark Business Park, Spring Court, Karen, P.O. Box 1720 - 00606, Nairobi, Kenya',
    contentEn: 'info@agri-experience.com',
    contentFr: 'info@agri-experience.com',
    extraJson: JSON.stringify({
      phone: '+254 (20) 2626888',
      mobile: '+254 (719) 554 154',
      hours: 'Mon - Fri: 8:00 AM - 5:00 PM EAT',
    }),
  },
}

export async function getPageSections(page?: string): Promise<Record<string, PageSectionData>> {
  const result = { ...defaultPageSections }
  const connected = await isDatabaseConnected()

  if (connected) {
    try {
      const records = await prisma.pageSection.findMany({
        where: page ? { page } : undefined,
      })
      records.forEach((r) => {
        result[r.sectionKey] = {
          id: r.id,
          sectionKey: r.sectionKey,
          page: r.page,
          titleEn: r.titleEn,
          titleFr: r.titleFr,
          subtitleEn: r.subtitleEn,
          subtitleFr: r.subtitleFr,
          contentEn: r.contentEn,
          contentFr: r.contentFr,
          mediaUrl: r.mediaUrl,
          extraJson: r.extraJson,
          updatedAt: r.updatedAt,
        }
      })
    } catch (err) {
      console.error('Error fetching page sections:', err)
    }
  }

  return result
}

export async function upsertPageSection(data: {
  sectionKey: string
  page: string
  titleEn?: string | null
  titleFr?: string | null
  subtitleEn?: string | null
  subtitleFr?: string | null
  contentEn?: string | null
  contentFr?: string | null
  mediaUrl?: string | null
  extraJson?: string | null
}): Promise<PageSectionData> {
  const connected = await isDatabaseConnected()
  if (!connected) throw new Error('Database is not connected')

  const record = await prisma.pageSection.upsert({
    where: { sectionKey: data.sectionKey },
    create: {
      sectionKey: data.sectionKey,
      page: data.page,
      titleEn: data.titleEn,
      titleFr: data.titleFr,
      subtitleEn: data.subtitleEn,
      subtitleFr: data.subtitleFr,
      contentEn: data.contentEn,
      contentFr: data.contentFr,
      mediaUrl: data.mediaUrl,
      extraJson: data.extraJson,
    },
    update: {
      titleEn: data.titleEn,
      titleFr: data.titleFr,
      subtitleEn: data.subtitleEn,
      subtitleFr: data.subtitleFr,
      contentEn: data.contentEn,
      contentFr: data.contentFr,
      mediaUrl: data.mediaUrl,
      extraJson: data.extraJson,
    },
  })

  revalidatePath('/', 'layout')
  return record
}

