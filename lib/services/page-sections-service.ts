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
    titleFr: "Driving Resilient\nAgricoles et semenciers résilients\nÀ travers l'Afrique",
    subtitleEn: 'Through innovation, expert advisory, and digital transformation.',
    subtitleFr: 'Through innovation, expert advisory, and digital transformation.',
    contentEn: 'Explore Our Impact',
    contentFr: 'Explorez notre impact',
    mediaUrl: '/Videos/hero-video.mp4',
    extraJson: JSON.stringify([
      { value: '20+', label: 'African Countries', labelFr: 'Pays africains' },
      { value: '20+', label: 'Partners', labelFr: 'Partners' },
      { value: '100+', label: 'Institutions Supported', labelFr: 'Institutions prises en charge' },
    ]),
  },
  about_hero: {
    sectionKey: 'about_hero',
    page: 'about',
    titleEn: 'About Us',
    titleFr: 'À Propos',
    subtitleEn: 'Transforming agricultural systems and empowering farmers across sub-Saharan Africa.',
    subtitleFr: 'Transformer les systèmes agricoles et responsabiliser les agriculteurs en Afrique subsaharienne.',
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
    contentFr: 'Notre mission est d’aider à créer d’excellents systèmes semenciers qui permettent aux agriculteurs africains d’atteindre leur potentiel de production et de faire progresser la durabilité environnementale.',
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
    titleFr: 'Pourquoi Agri Expérience',
    subtitleEn: 'Our Advantage',
    subtitleFr: 'Notre avantage',
  },
  beliefs_header: {
    sectionKey: 'beliefs_header',
    page: 'home',
    titleEn: 'What We Believe',
    titleFr: 'Ce que nous croyons',
  },
  partners_header: {
    sectionKey: 'partners_header',
    page: 'home',
    titleEn: 'Our Partners',
    titleFr: 'Our Partners',
    subtitleEn: 'Our impact is measured through the success of our partners and the resilience of the communities we serve.',
    subtitleFr: 'Notre impact se mesure à l’aune du succès de nos partenaires et de la résilience des communautés que nous servons.',
  },
  expertise_header: {
    sectionKey: 'expertise_header',
    page: 'about',
    titleEn: 'Our Expertise',
    titleFr: 'Notre expertise',
    subtitleEn: 'We build resilient seed systems by supporting policy interventions, strengthening quality seed production, distribution, quality assurance, and improving farmer access to improved seed.',
    subtitleFr: "Nous renforçons la résilience des systèmes semenciers en appuyant les interventions politiques, en renforçant la production, la distribution et l'assurance qualité des semences de qualité, et en améliorant l'accès des agriculteurs aux semences améliorées.",
  },
  home_cta: {
    sectionKey: 'home_cta',
    page: 'home',
    titleEn: 'Ready to Grow Together?',
    titleFr: 'Prêt à grandir ensemble ?',
    subtitleEn: "Join our network of transformative agricultural projects across Africa. Let's build sustainable systems that last for generations.",
    subtitleFr: 'Rejoignez notre réseau de projets agricoles transformateurs à travers l’Afrique. Bâtissons des systèmes durables qui durent des générations.',
    contentEn: 'Work With Us',
    contentFr: 'Travaillez avec nous',
  },
  about_cta: {
    sectionKey: 'about_cta',
    page: 'about',
    titleEn: 'Partner With Us',
    titleFr: 'Devenez partenaire avec nous',
    subtitleEn: "Let's collaborate to transform agricultural systems and create sustainable impact for generations to come.",
    subtitleFr: 'Collaborons pour transformer les systèmes agricoles et créer un impact durable pour les générations à venir.',
    contentEn: 'Get In Touch',
    contentFr: 'Entrer en contact',
  },
  our_work_hero: {
    sectionKey: 'our_work_hero',
    page: 'our-work',
    titleEn: 'Solutions that cultivate impact.',
    titleFr: 'Des solutions qui cultivent l’impact.',
    subtitleEn: 'At Agri Experience, we combine knowledge, technology, and field expertise to deliver end-to-end solutions for a smarter, more sustainable agricultural future.',
    subtitleFr: 'Chez Agri Experience, nous combinons connaissances, technologies et expertise sur le terrain pour proposer des solutions de bout en bout pour un avenir agricole plus intelligent et plus durable.',
  },
  digital_platforms_hero: {
    sectionKey: 'digital_platforms_hero',
    page: 'our-work',
    titleEn: 'Digital Platforms',
    titleFr: 'Plateformes numériques',
    subtitleEn: 'Technology for Smarter Agriculture',
    subtitleFr: 'Technologie pour une agriculture plus intelligente',
  },
  technical_studies_hero: {
    sectionKey: 'technical_studies_hero',
    page: 'our-work',
    titleEn: 'Technical Studies',
    titleFr: 'Etudes Techniques',
    subtitleEn: 'Data-Driven Insights for the Seed Sector',
    subtitleFr: 'Informations basées sur les données pour le secteur des semences',
  },
  project_implementation_hero: {
    sectionKey: 'project_implementation_hero',
    page: 'our-work',
    titleEn: 'Project Implementation',
    titleFr: 'Mise en œuvre du projet',
    subtitleEn: 'Turning Agricultural Strategy into Field Reality',
    subtitleFr: 'Transformer la stratégie agricole en réalité sur le terrain',
  },
  client_advisory_hero: {
    sectionKey: 'client_advisory_hero',
    page: 'our-work',
    titleEn: 'Client Advisory and Analytical Work',
    titleFr: 'Travaux de conseil et d’analyse auprès des clients',
    subtitleEn: 'Strategic Counsel for Agricultural Transformation',
    subtitleFr: 'Conseil stratégique pour la transformation agricole',
  },
  capacity_building_hero: {
    sectionKey: 'capacity_building_hero',
    page: 'our-work',
    titleEn: 'Capacity-building',
    titleFr: 'Renforcement des capacités',
    subtitleEn: 'Capacity Building',
    subtitleFr: 'Renforcement des capacités',
  },
  stakeholder_convenings_hero: {
    sectionKey: 'stakeholder_convenings_hero',
    page: 'our-work',
    titleEn: 'Stakeholder Convenings and Learning Trips',
    titleFr: 'Réunions des parties prenantes et voyages d’apprentissage',
    subtitleEn: 'Bringing the Seed-focused, Agricultural Ecosystem Together',
    subtitleFr: 'Rassembler l’écosystème agricole axé sur les semences',
  },
  our_impact_hero: {
    sectionKey: 'our_impact_hero',
    page: 'our-impact',
    titleEn: '',
    titleFr: '',
    subtitleEn: '',
    subtitleFr: '',
  },
  our_impact_sdgs: {
    sectionKey: 'our_impact_sdgs',
    page: 'our-impact',
    titleEn: 'Our Impact',
    titleFr: 'Notre impact',
    subtitleEn: 'Strategic Alignment',
    subtitleFr: 'Alignement stratégique',
    contentEn: 'Our work directly aligns with the UN Sustainable Development Goals. Hover over a goal to explore our contribution.',
    contentFr: 'Notre travail s’aligne directement sur les objectifs de développement durable des Nations Unies. Passez la souris sur un objectif pour découvrir notre contribution.',
  },
  our_impact_cta: {
    sectionKey: 'our_impact_cta',
    page: 'our-impact',
    titleEn: 'Be Part of the Impact',
    titleFr: "Faites partie de l'impact",
    subtitleEn: 'Join us in transforming agricultural systems and improving livelihoods across Africa.',
    subtitleFr: 'Rejoignez-nous pour transformer les systèmes agricoles et améliorer les moyens de subsistance à travers l’Afrique.',
    contentEn: 'Work With Us',
    contentFr: 'Travaillez avec nous',
  },
  contact_hero: {
    sectionKey: 'contact_hero',
    page: 'contact',
    titleEn: 'Get In Touch',
    titleFr: 'Entrer en contact',
    subtitleEn: 'Agri Experience is an African consulting firm focused on developing strong seed systems in sub-Saharan Africa. We look forward to hearing from you.',
    subtitleFr: 'Agri Experience est une société de conseil africaine axée sur le développement de systèmes semenciers solides en Afrique subsaharienne. Nous sommes impatients de vous entendre.',
  },
  contact_info: {
    sectionKey: 'contact_info',
    page: 'contact',
    titleEn: 'Kenya',
    titleFr: 'Kenya',
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

