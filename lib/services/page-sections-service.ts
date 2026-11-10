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

