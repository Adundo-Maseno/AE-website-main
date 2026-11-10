import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface ProjectItem {
  id: string
  titleEn: string
  titleFr?: string | null
  descEn: string
  descFr?: string | null
  category: string
  client?: string | null
  year?: string | null
  imageUrl?: string | null
  link?: string | null
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export const staticProjects: ProjectItem[] = [
  // ── Digital Platforms ──
  {
    id: 'static-mbeguchoice',
    titleEn: 'MbeguChoice Variety Selector',
    titleFr: 'Sélecteur de variétés MbeguChoice',
    descEn: 'Online crop variety database helping farmers, agrodealers, and extension agents choose best-suited seed varieties by ecological zone.',
    descFr: 'Base de données en ligne des variétés agricoles aidant les agriculteurs à choisir les meilleures semences adaptées à leur zone agro-écologique.',
    category: 'digital-platforms',
    client: 'Kenya Markets Trust / Agri Experience',
    year: '2015-Present',
    imageUrl: '/platforms/mbeguchoice.png',
    link: 'https://mbeguchoice.com',
    order: 1,
  },
  {
    id: 'static-acvc',
    titleEn: 'Africa Crop Variety Catalogue',
    titleFr: 'Catalogue des variétés de cultures africaines',
    descEn: 'Regional catalog providing detailed agronomic data on commercial crop varieties released across East and Southern Africa.',
    descFr: 'Catalogue régional fournissant des données agronomiques détaillées sur les variétés commerciales publiées en Afrique de l’Est et australe.',
    category: 'digital-platforms',
    client: 'USAID / AGRA',
    year: '2020-Present',
    imageUrl: '/platforms/africa-crop-variety-catalogue.png',
    link: 'https://varietycatalogues.com/about/',
    order: 2,
  },
  {
    id: 'static-kpvl',
    titleEn: 'Kenya Plant Variety List',
    titleFr: 'Liste des variétés végétales du Kenya',
    descEn: 'Interactive API and digital registry of all officially gazetted plant varieties in Kenya with real-time breeder information.',
    descFr: 'API interactive et registre numérique de toutes les variétés végétales officiellement homologuées au Kenya.',
    category: 'digital-platforms',
    client: 'KEPHIS',
    year: '2021-Present',
    imageUrl: '/platforms/kenya-plant-variety-list.png',
    link: 'https://catalogueapi.varietycatalogues.com/',
    order: 3,
  },
  {
    id: 'static-taip',
    titleEn: 'Tanzania Agri-Inputs Platform',
    titleFr: 'Plateforme des intrants agricoles de Tanzanie',
    descEn: 'National verification and agrodealer traceability system supporting quality seed and fertilizer access in Tanzania.',
    descFr: 'Système national de vérification et de traçabilité des distributeurs d’intrants agricoles en Tanzanie.',
    category: 'digital-platforms',
    client: 'TOSCI / USAID',
    year: '2022-Present',
    imageUrl: '/platforms/tanzania-agri-inputs-platform.png',
    link: 'https://tanzaniaagri-inputsplatform.com/',
    order: 4,
  },
  {
    id: 'static-sspk',
    titleEn: 'Seed Sector Platform Kenya',
    titleFr: 'Plateforme du secteur semencier au Kenya',
    descEn: 'Online interactive and searchable database of industry stakeholders, varieties released in Kenya, and agrodealers mapped to their locations.',
    descFr: 'Base de données en ligne interactive des acteurs du secteur, des variétés homologuées au Kenya et des distributeurs cartographiés.',
    category: 'digital-platforms',
    client: 'STAK / KEPHIS',
    year: '2021-Present',
    imageUrl: '/platforms/seed-sector-platform-kenya.png',
    order: 5,
  },
  {
    id: 'static-uaip',
    titleEn: 'Agricultural Inputs Platform Uganda',
    titleFr: 'Plateforme des intrants agricoles en Ouganda',
    descEn: 'Online interactive database of industry stakeholders, varieties released in Uganda, registered agrochemicals, and agrodealers mapped to locations.',
    descFr: 'Base de données interactive en ligne des acteurs du secteur, des variétés homologuées en Ouganda et des distributeurs agréés.',
    category: 'digital-platforms',
    client: 'MAAIF Uganda / USAID',
    year: '2022-Present',
    imageUrl: '/platforms/uganda-agri-inputs-platform.png',
    order: 6,
  },
  {
    id: 'static-m3',
    titleEn: 'Mulika Mbegu Mbovu (M3)',
    titleFr: 'Mulika Mbegu Mbovu (M3)',
    descEn: 'Pioneering mobile reporting platform enabling Kenyan smallholders to flag suspected counterfeit seed packages via SMS shortcode.',
    descFr: 'Plateforme mobile pionnière permettant aux petits exploitants kényans de signaler les emballages de semences suspectes par SMS.',
    category: 'digital-platforms',
    client: 'Agri Experience CSR supporting KEPHIS',
    year: '2018-2022',
    imageUrl: '/m3-logo.svg',
    order: 7,
  },

  // ── Technical Studies ──
  {
    id: 'static-kcdms-pasture',
    titleEn: 'Scoping Study: Pasture & Fodder Planting Materials',
    titleFr: 'Étude de cadrage : Matériel de plantation de pâturages et de fourrages',
    descEn: 'Comprehensive market scoping of commercial fodder seed and vegetative planting material systems across 12 high-potential Kenyan counties.',
    descFr: 'Cadrage complet du marché des semences fourragères commerciales et du matériel végétatif dans 12 comtés kenyans.',
    category: 'technical-studies',
    client: 'USAID KCDMS / RTI International',
    year: '2020',
    imageUrl: '/resources/previews/preview-pasture-fodder.jpg',
    link: '/resources/Scoping-Study-Pasture-and-Fodder-Planting-Materials-in-Kenya.pdf',
    order: 6,
  },
  {
    id: 'static-kcdms-value-chain',
    titleEn: 'Scoping Study: Value Chain Crop Planting Materials',
    titleFr: 'Étude de cadrage : Matériel de plantation pour cultures de chaîne de valeur',
    descEn: 'Detailed assessment of banana, avocado, mango, pineapple, passion fruit, sweet potato, and African leafy vegetable seedling value chains.',
    descFr: 'Évaluation détaillée des chaînes de valeur de plants de bananes, avocats, mangues, ananas, fruits de la passion et patates douces.',
    category: 'technical-studies',
    client: 'USAID KCDMS / RTI International',
    year: '2020',
    imageUrl: '/resources/previews/preview-value-chain-crops.jpg',
    link: '/resources/Scoping-Study-Planting-Materials-for-Value-Chain-Crops-in-Kenya-banana-avocado-mango-pineapples-passion-fruit-sweet-potatoes-African-leafy-vegetables.pdf',
    order: 7,
  },
  {
    id: 'static-comesa-harmonization',
    titleEn: 'COMESA Seed Trade Harmonization Technical Assessment',
    titleFr: 'Évaluation technique de l’harmonisation du commerce des semences du COMESA',
    descEn: 'Multi-country assessment of regional variety release catalogs, quarantine pest lists, and seed border transit protocols.',
    descFr: 'Évaluation multi-pays des catalogues régionaux de variétés et des protocoles de transit frontalier des semences.',
    category: 'technical-studies',
    client: 'USAID / ACTESA',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    order: 8,
  },

  // ── Project Implementation ──
  {
    id: 'static-tanzania-transformation',
    titleEn: 'Tanzania Seed Systems Transformation: Multi-Year Systems Reform',
    titleFr: 'Transformation des systèmes semenciers en Tanzanie : Réforme pluriannuelle',
    descEn: 'Led multi-year institutional restructuring, digital seed catalog deployment, TOSCI inspector decentralization, and agrodealer licensing reforms.',
    descFr: 'Direction de la restructuration institutionnelle pluriannuelle, du déploiement du catalogue numérique des semences et des réformes de licences.',
    category: 'project-implementation',
    client: 'USAID / CRS / Ministry of Agriculture Tanzania',
    year: '2021-Present',
    imageUrl: '/pexels-equalstock-27722065.jpg',
    order: 9,
  },
  {
    id: 'static-feed-the-future',
    titleEn: 'Feed the Future Seed Systems for Development (SSSD)',
    titleFr: 'Feed the Future - Systèmes semenciers pour le développement',
    descEn: 'Technical leadership on private sector seed enterprise development, regulatory simplification, and market resilience across 6 African nations.',
    descFr: 'Leadership technique sur le développement des entreprises semencières privées et la simplification réglementaire dans 6 pays africains.',
    category: 'project-implementation',
    client: 'USAID / CRS',
    year: '2019-2024',
    imageUrl: '/our-mission-2026.jpg',
    order: 10,
  },

  // ── Client Advisory ──
  {
    id: 'static-kephis-modernization',
    titleEn: 'KEPHIS Regulatory Modernization: Private Seed Inspection Pilot',
    titleFr: 'Modernisation réglementaire de KEPHIS : Projet pilote d’inspection privée des semences',
    descEn: 'Structured policy frameworks for private inspector authorization and piloted the standard seed class, decentralizing quality assurance.',
    descFr: 'Cadres politiques structurés pour l’autorisation d’inspecteurs privés et projet pilote pour la classe de semences standard.',
    category: 'client-advisory',
    client: 'KEPHIS / Ministry of Agriculture / STAK',
    year: '2016-2020',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    order: 11,
  },
  {
    id: 'static-national-variety-release',
    titleEn: 'National Seed Policy & Regulatory Simplification Strategy',
    titleFr: 'Politique semencière nationale et stratégie de simplification réglementaire',
    descEn: 'High-level advisory assisting agricultural ministries in streamlining variety release timeframes and reducing commercialization friction.',
    descFr: 'Conseil de haut niveau aidant les ministères agricoles à rationaliser les délais d’homologation des variétés.',
    category: 'client-advisory',
    client: 'East Africa Regional Governments / AGRA',
    year: '2018-2023',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    order: 12,
  },

  // ── Capacity Building ──
  {
    id: 'static-seed-company-toolbox',
    titleEn: 'The African Seed Company Toolbox (52 Operational Tools)',
    titleFr: 'La boîte à outils des entreprises semencières africaines (52 outils)',
    descEn: 'World-renowned management guide and toolkit published in partnership with the Bill & Melinda Gates Foundation for emerging African seed executives.',
    descFr: 'Guide de gestion de renommée mondiale publié en partenariat avec la Fondation Bill & Melinda Gates pour les dirigeants semenciers africains.',
    category: 'capacity-building',
    client: 'Bill & Melinda Gates Foundation',
    year: '2009-Present',
    imageUrl: '/images/african-seed-company-toolbox-cover.jpg',
    link: '/resources/The-African-Seed-Company-Toolbox-52-Tools-Every-Seed-Company-Manager-Should-Know-How-to-Use-ENGLISH.pdf',
    order: 13,
  },
  {
    id: 'static-inspector-training',
    titleEn: 'Authorized Seed Inspector Training & Accreditation Curriculum',
    titleFr: 'Programme de formation et d’accréditation des inspecteurs semenciers agréés',
    descEn: 'Standardized curriculum and practical field evaluation modules for private and public sector seed quality inspectors.',
    descFr: 'Programme standardisé et modules d’évaluation sur le terrain pour les inspecteurs de la qualité des semences.',
    category: 'capacity-building',
    client: 'KEPHIS / AGRA / STAK',
    year: '2020-2023',
    imageUrl: '/pexels-flambo-388007-1112080.jpg',
    order: 14,
  },

  // ── Stakeholder Convenings ──
  {
    id: 'static-private-sector-roundtables',
    titleEn: 'Seed Industry Private Sector Policy & Trade Roundtables',
    titleFr: 'Tables rondes de l’industrie semencière sur les politiques et le commerce',
    descEn: 'Facilitated high-stakes roundtables uniting private seed companies, regulatory authorities, and development partners to break systemic bottlenecks.',
    descFr: 'Organisation de tables rondes réunissant semenciers privés, autorités réglementaires et partenaires de développement.',
    category: 'stakeholder-convenings',
    client: 'Kenya Markets Trust / STAK',
    year: '2016-2022',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    order: 15,
  },
]

export async function getProjects(category?: string): Promise<ProjectItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.project.findMany({
        where: category ? { category } : undefined,
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records as unknown as ProjectItem[]
      }
    } catch {
      // Fall through to static
    }
  }

  if (category) {
    return staticProjects.filter((p) => p.category === category)
  }
  return staticProjects
}

export async function createProject(data: {
  titleEn: string
  titleFr?: string
  descEn: string
  descFr?: string
  category: string
  client?: string
  year?: string
  imageUrl?: string
  link?: string
  order?: number
}): Promise<ProjectItem> {
  const record = await prisma.project.create({
    data: {
      titleEn: data.titleEn,
      titleFr: data.titleFr || null,
      descEn: data.descEn,
      descFr: data.descFr || null,
      category: data.category,
      client: data.client || null,
      year: data.year || null,
      imageUrl: data.imageUrl || null,
      link: data.link || null,
      order: data.order ?? 0,
    },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return record as unknown as ProjectItem
}

export async function updateProject(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr?: string
    descEn: string
    descFr?: string
    category: string
    client?: string
    year?: string
    imageUrl?: string
    link?: string
    order?: number
  }>
): Promise<ProjectItem> {
  let record

  if (id.startsWith('static-')) {
    const existing = staticProjects.find((p) => p.id === id)
    record = await prisma.project.create({
      data: {
        titleEn: data.titleEn ?? existing?.titleEn ?? '',
        titleFr: data.titleFr !== undefined ? data.titleFr : existing?.titleFr || null,
        descEn: data.descEn ?? existing?.descEn ?? '',
        descFr: data.descFr !== undefined ? data.descFr : existing?.descFr || null,
        category: data.category ?? existing?.category ?? 'project-implementation',
        client: data.client !== undefined ? data.client : existing?.client || null,
        year: data.year !== undefined ? data.year : existing?.year || null,
        imageUrl: data.imageUrl !== undefined ? data.imageUrl : existing?.imageUrl || null,
        link: data.link !== undefined ? data.link : existing?.link || null,
        order: data.order ?? existing?.order ?? 0,
      },
    })
  } else {
    record = await prisma.project.update({
      where: { id },
      data,
    })
  }

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return record as unknown as ProjectItem
}

export async function deleteProject(id: string): Promise<boolean> {
  if (id.startsWith('static-')) {
    return true
  }

  await prisma.project.delete({
    where: { id },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}
