import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { createSeedGuard, stripManagedFields } from './service-utils'

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
    titleFr: 'Plateforme du secteur semencier du Kenya',
    descEn: 'Searchable national registry connecting seed companies, agrodealers, regulators, and researchers with verified variety and geographic market data.',
    descFr: 'Registre national interrogeable reliant entreprises semencières, agro-distributeurs, régulateurs et chercheurs grâce aux données variétales et cartographiques.',
    category: 'digital-platforms',
    client: 'KEPHIS / KALRO / STAK / Kenya Markets Trust',
    year: '2016-Present',
    imageUrl: '/platforms/seed-sector-platform-kenya.png',
    link: 'http://www.seedsectorplatformkenya.com/',
    order: 5,
  },
  {
    id: 'static-uaip',
    titleEn: 'Agricultural Inputs Platform Uganda',
    titleFr: 'Plateforme des intrants agricoles de l’Ouganda',
    descEn: 'Interactive national database mapping Uganda seed industry stakeholders, officially released crop varieties, registered agrochemicals, and agrodealers.',
    descFr: 'Base de données nationale interactive cartographiant les acteurs semenciers, variétés homologuées, intrants et agro-distributeurs en Ouganda.',
    category: 'digital-platforms',
    client: 'NARO / USTA / Ministry of Agriculture Uganda',
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
    link: '/resources/Empowering-Kenyan-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 7,
  },
  {
    id: 'static-rimi',
    titleEn: 'Ripoti Mbegu Isiyo Bora (RIMI)',
    titleFr: 'Ripoti Mbegu Isiyo Bora (RIMI)',
    descEn: 'Farmer-facing SMS quality reporting system deployed with TOSCI under USAID SSSD to help Tanzanian smallholders report substandard or counterfeit seed.',
    descFr: 'Système SMS de signalement déployé avec TOSCI dans le cadre de USAID SSSD pour permettre aux agriculteurs tanzaniens de signaler les semences contrefaites.',
    category: 'digital-platforms',
    client: 'Catholic Relief Services / USAID SSSD / TOSCI',
    year: '2021-2023',
    imageUrl: '/our-vision-2026.jpg',
    link: '/resources/Empowering-Tanzanias-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 8,
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
    year: '2018',
    imageUrl: '/resources/previews/preview-pasture-fodder.jpg',
    link: '/resources/Scoping-Study-Pasture-and-Fodder-Planting-Materials-in-Kenya.pdf',
    order: 9,
  },
  {
    id: 'static-kcdms-value-chain',
    titleEn: 'Scoping Study: Value Chain Crop Planting Materials',
    titleFr: 'Étude de cadrage : Matériel de plantation pour cultures de chaîne de valeur',
    descEn: 'Detailed assessment of banana, avocado, mango, pineapple, passion fruit, sweet potato, and African leafy vegetable seedling value chains.',
    descFr: 'Évaluation détaillée des chaînes de valeur de plants de bananes, avocats, mangues, ananas, fruits de la passion et patates douces.',
    category: 'technical-studies',
    client: 'USAID KCDMS / RTI International',
    year: '2018',
    imageUrl: '/resources/previews/preview-value-chain-crops.jpg',
    link: '/resources/Scoping-Study-Planting-Materials-for-Value-Chain-Crops-in-Kenya-banana-avocado-mango-pineapples-passion-fruit-sweet-potatoes-African-leafy-vegetables.pdf',
    order: 10,
  },
  {
    id: 'static-comesa-harmonization',
    titleEn: 'COMESA Seed Trade Harmonization Technical Assessment',
    titleFr: 'Évaluation technique de l’harmonisation du commerce des semences du COMESA',
    descEn: 'Multi-country assessment of regional variety release catalogs, quarantine pest lists, and seed border transit protocols across East Africa.',
    descFr: 'Évaluation multi-pays des catalogues régionaux de variétés et des protocoles de transit frontalier des semences en Afrique de l’Est.',
    category: 'technical-studies',
    client: 'USAID / FTF DAI',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Assessment-to-Support-the-Promotion-of-Regional-Seed-Trade-in-East-Africa.pdf',
    order: 11,
  },
  {
    id: 'static-kcdms-nurseries',
    titleEn: 'Horticulture Seedling Nurseries Business Model Scoping Study',
    titleFr: 'Étude de cadrage : Les pépinières de semis horticoles comme modèle viable',
    descEn: 'Viability assessment of private horticulture seedling nurseries across Kenya, examining unit economics, phytosanitary standards, and farmer demand.',
    descFr: 'Évaluation de la viabilité commerciale des pépinières horticoles privées au Kenya, normes phytosanitaires et demande des producteurs.',
    category: 'technical-studies',
    client: 'USAID KCDMS / RTI International',
    year: '2018',
    imageUrl: '/resources/previews/preview-horticulture-nurseries.jpg',
    link: '/resources/Scoping-Study-Horticulture-Seedling-Nurseries-as-a-Viable-Business-Model-in-Kenya.pdf',
    order: 12,
  },
  {
    id: 'static-kcdms-agrodealer-mapping',
    titleEn: 'Agrodealer Mapping in Twelve Counties in Kenya',
    titleFr: 'Cartographie des agro-distributeurs dans douze comtés du Kenya',
    descEn: 'Geolocated census and distribution gap diagnostic covering input retailers across twelve KCDMS priority counties in Kenya.',
    descFr: 'Recensement géolocalisé et diagnostic de la couverture des distributeurs d’intrants agricoles dans douze comtés du Kenya.',
    category: 'technical-studies',
    client: 'USAID KCDMS / RTI International',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Agro-Dealer-Mapping-in-Twelve-Counties-in-Kenya.pdf',
    order: 13,
  },
  {
    id: 'static-ssa-seed-company-survey',
    titleEn: 'Seed Company Survey & Analysis — Sub-Saharan Africa',
    titleFr: 'Enquête et analyse sur les sociétés semencières — Afrique subsaharienne',
    descEn: 'Cross-regional survey analyzing seed enterprise production capacity, working capital constraints, marketing channels, and variety adoption drivers.',
    descFr: 'Enquête régionale analysant les capacités de production, les contraintes de financement et les circuits commerciaux des entreprises semencières.',
    category: 'technical-studies',
    client: 'AGRA',
    year: '2018',
    imageUrl: '/pexels-flambo-388007-1112080.jpg',
    link: '/resources/Seed-Company-Survey-and-Analysis-Sub-Saharan-Africa.pdf',
    order: 14,
  },
  {
    id: 'static-vin-scoping',
    titleEn: 'Variety Identification Number (VIN) System Scoping Study',
    titleFr: 'Étude de cadrage sur le système de numéro d’identification des variétés (VIN)',
    descEn: 'Technical feasibility scoping of standardized Variety Identification Numbers to curb mislabeling and improve seed traceability across markets.',
    descFr: 'Étude de faisabilité technique des numéros normalisés d’identification variétale pour renforcer la traçabilité des semences.',
    category: 'technical-studies',
    client: 'USAID',
    year: '2017',
    imageUrl: '/our-vision.jpg',
    link: '/resources/Variety-Identification-Number-VIN-System-Summary-Report-of-Scoping-Study.pdf',
    order: 15,
  },
  {
    id: 'static-drought-tolerant-seed',
    titleEn: 'High-Quality Seed for Drought-Tolerant Crops Study',
    titleFr: 'Semences de haute qualité pour les cultures tolérantes à la sécheresse',
    descEn: 'Climate-smart agricultural research identifying market bottlenecks and delivery models to expand smallholder access to drought-tolerant crop seed.',
    descFr: 'Recherche sur l’agriculture intelligente face au climat identifiant les modèles de distribution de semences tolérantes à la sécheresse.',
    category: 'technical-studies',
    client: 'DfID VUNA Climate Smart Agriculture / ASI',
    year: '2016',
    imageUrl: '/pexels-halis-collu-2057418323-29219216.jpg',
    link: '/resources/Reaching-More-Farmers-with-High-Quality-Seed-for-Drought-Tolerant-Crops.pdf',
    order: 16,
  },

  // ── Project Implementation ──
  {
    id: 'static-tanzania-transformation',
    titleEn: 'Tanzania Seed Systems Transformation: Multi-Year Systems Reform',
    titleFr: 'Transformation des systèmes semenciers en Tanzanie : Réforme pluriannuelle',
    descEn: 'Led multi-year institutional restructuring, digital seed catalog deployment, TOSCI inspector decentralization, and agrodealer licensing reforms.',
    descFr: 'Direction de la restructuration institutionnelle pluriannuelle, du déploiement du catalogue numérique des semences et des réformes de licences.',
    category: 'project-implementation',
    client: 'Gates Foundation / Ministry of Agriculture Tanzania / TOSCI',
    year: '2019-2024',
    imageUrl: '/pexels-equalstock-27722065.jpg',
    link: '/resources/Empowering-Tanzanias-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 17,
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
    link: '/resources/Empowering-Tanzanias-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 18,
  },
  {
    id: 'static-scratch-off-labels',
    titleEn: 'Scratch-Off Labels for Certified Seed Authentication in Kenya',
    titleFr: 'Étiquettes à gratter pour l’authentification des semences certifiées au Kenya',
    descEn: 'Designed and implemented national roll-out of tamper-evident scratch-off verification labels with KEPHIS, slashing counterfeits by over 40%.',
    descFr: 'Conception et déploiement national d’étiquettes de vérification à gratter avec le KEPHIS, réduisant les contrefaçons de plus de 40 %.',
    category: 'project-implementation',
    client: 'DfID / Kenya Markets Trust / KEPHIS',
    year: '2016-2018',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    link: '/resources/Case-Study-Scratch-Off-Labels-for-Certified-Seed-in-Kenya.pdf',
    order: 19,
  },
  {
    id: 'static-county-agrodealer-associations',
    titleEn: 'County Agrodealer Association Strengthening in Kenya',
    titleFr: 'Renforcement des associations d’agro-distributeurs de comté au Kenya',
    descEn: 'Established and mentored 16 county-level agrodealer associations across Kenya to improve input supply governance, peer compliance, and last-mile outreach.',
    descFr: 'Création et accompagnement de 16 associations départementales d’agro-distributeurs au Kenya pour structurer la distribution du dernier kilomètre.',
    category: 'project-implementation',
    client: 'DfID / Kenya Markets Trust',
    year: '2015-2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Case-Study-County-Agrodealer-Association-Strengthening-in-Kenya.pdf',
    order: 20,
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
    link: '/resources/Case-Study-Revising-Kenyas-Seed-Regulations.pdf',
    order: 21,
  },
  {
    id: 'static-national-variety-release',
    titleEn: 'National Seed Policy & Regulatory Simplification Strategy',
    titleFr: 'Politique semencière nationale et stratégie de simplification réglementaire',
    descEn: 'High-level advisory assisting agricultural ministries in streamlining variety release timeframes and reducing commercialization friction.',
    descFr: 'Conseil de haut niveau aidant les ministères agricoles à rationaliser les délais d’homologation des variétés.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust / East Africa Governments',
    year: '2016-2023',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    link: '/resources/Crop-Seed-Company-Proposition-for-Improving-Current-Seed-Regulation-in-Kenya.pdf',
    order: 22,
  },
  {
    id: 'static-tasai-pilot',
    titleEn: 'The African Seed Access Index (TASAI) Kenya Pilot Case Study',
    titleFr: 'Étude de cas pilote de l’Indice africain d’accès aux semences (TASAI)',
    descEn: 'Advised on the operationalization of the TASAI seed sector scorecard in Kenya, benchmarking regulatory performance and market competitiveness.',
    descFr: 'Conseil sur l’opérationnalisation du tableau de bord TASAI au Kenya pour évaluer la compétitivité et la performance réglementaire.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust / TASAI',
    year: '2018',
    imageUrl: '/vision-v2.jpg',
    link: '/resources/Case-Study-The-African-Seed-Access-Index-TASAI-Pilot.pdf',
    order: 23,
  },
  {
    id: 'static-food-security-crop-seed',
    titleEn: 'Food Security & Crop Seed in Kenya: Payoffs & Policy Advisory',
    titleFr: 'Sécurité alimentaire et semences au Kenya : analyse des retombées politiques',
    descEn: 'Strategic economic analysis quantifying national food security and GDP gains from expanding certified seed adoption across key staple crops.',
    descFr: 'Analyse économique stratégique quantifiant les gains de sécurité alimentaire liés à l’adoption des semences certifiées.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust',
    year: '2015-2016',
    imageUrl: '/our-mission.jpg',
    link: '/resources/Food-Security-Crop-Seed-in-Kenya-Part-2-Big-Payoffs-We-Cannot-Afford-to-Ignore.pdf',
    order: 24,
  },
  {
    id: 'static-mbeguchoice-case-study',
    titleEn: 'MbeguChoice Digital Decision-Support Architecture Case Study',
    titleFr: 'Étude de cas : Plateforme numérique d’aide au choix variétal MbeguChoice',
    descEn: 'Analytical review of farmer decision-support adoption, offline mobile UX, and public-private governance lessons from MbeguChoice.',
    descFr: 'Revue analytique de l’adoption de l’outil d’aide à la décision variétale et de la gouvernance public-privé de MbeguChoice.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust',
    year: '2018',
    imageUrl: '/platforms/mbeguchoice.png',
    link: '/resources/Case-Study-MbeguChoice-Seed-Variety-IT-Platform.pdf',
    order: 25,
  },

  // ── Capacity Building ──
  {
    id: 'static-seed-company-toolbox',
    titleEn: 'The African Seed Company Toolbox (52 Operational Tools)',
    titleFr: 'La boîte à outils des entreprises semencières africaines (52 outils)',
    descEn: 'World-renowned management guide and toolkit published in partnership with the Gates Foundation for emerging African seed executives.',
    descFr: 'Guide de gestion de renommée mondiale publié en partenariat avec la Fondation Gates pour les dirigeants semenciers africains.',
    category: 'capacity-building',
    client: 'Gates Foundation Agricultural Development',
    year: '2009-Present',
    imageUrl: '/images/african-seed-company-toolbox-cover.jpg',
    link: '/resources/The-African-Seed-Company-Toolbox-52-Tools-Every-Seed-Company-Manager-Should-Know-How-to-Use-ENGLISH.pdf',
    order: 26,
  },
  {
    id: 'static-seed-company-toolbox-fr',
    titleEn: 'La Boîte à Outils des Entreprises Semencières Africaines (French Edition)',
    titleFr: 'La boîte à outils des entreprises semencières africaines (Édition française)',
    descEn: 'Complete Francophone edition of the 52 management tools empowering seed enterprises across West and Central Africa.',
    descFr: 'Édition francophone complète des 52 outils de gestion destinés aux entreprises semencières d’Afrique de l’Ouest et centrale.',
    category: 'capacity-building',
    client: 'Gates Foundation Agricultural Development',
    year: '2009-Present',
    imageUrl: '/images/african-seed-company-toolbox-cover.png',
    link: '/resources/La-boite-a-outils-des-entreprises-semencieres-Africaines.pdf',
    order: 27,
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
    link: '/resources/Case-Study-Revising-Kenyas-Seed-Regulations.pdf',
    order: 28,
  },
  {
    id: 'static-agrodealer-association-scoping',
    titleEn: 'Agrodealer Association Governance & Training Program (12 Counties)',
    titleFr: 'Programme de gouvernance et formation des associations d’agro-distributeurs',
    descEn: 'Capacity-building framework strengthening 12 county agrodealer associations in business records, advocacy, and input quality stewardship.',
    descFr: 'Cadre de renforcement des capacités accompagnant 12 associations départementales d’agro-distributeurs au Kenya.',
    category: 'capacity-building',
    client: 'USAID KCDMS / RTI International',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Scoping-Study-Agro-Dealer-Association-Development-in-Twelve-Counties-in-Kenya.pdf',
    order: 29,
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
    link: '/resources/Case-Study-Strengthening-a-Seed-Trade-Association-in-Kenya.pdf',
    order: 30,
  },
  {
    id: 'static-stak-strengthening',
    titleEn: 'Strengthening the Seed Trade Association of Kenya (STAK)',
    titleFr: 'Renforcement de l’Association du commerce des semences du Kenya (STAK)',
    descEn: 'Institutional governance convenings, member advocacy alignment, and public-private dialogue platform revitalization growing STAK membership by 30%+.',
    descFr: 'Concertations de gouvernance institutionnelle et redynamisation du dialogue public-privé portant les adhésions de STAK à +30 %.',
    category: 'stakeholder-convenings',
    client: 'DfID / Kenya Markets Trust / STAK',
    year: '2018',
    imageUrl: '/mission-v2.jpg',
    link: '/resources/Case-Study-Strengthening-a-Seed-Trade-Association-in-Kenya.pdf',
    order: 31,
  },
  {
    id: 'static-regional-seed-trade-convenings',
    titleEn: 'East Africa Regional Seed Trade Harmonization Dialogues',
    titleFr: 'Dialogues régionaux sur l’harmonisation du commerce des semences en Afrique de l’Est',
    descEn: 'Cross-border stakeholder convenings aligning national regulators and seed trade associations on regional seed trade protocols in East Africa.',
    descFr: 'Rencontres transfrontalières alignant régulateurs nationaux et associations semencières sur les protocoles commerciaux en Afrique de l’Est.',
    category: 'stakeholder-convenings',
    client: 'USAID / FTF DAI / COMESA-EAC',
    year: '2018',
    imageUrl: '/hero-video-frame.jpg',
    link: '/resources/Assessment-to-Support-the-Promotion-of-Regional-Seed-Trade-in-East-Africa.pdf',
    order: 32,
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

const seedGuard = createSeedGuard(async () => {
  const count = await prisma.project.count()
  if (count === 0) {
    await prisma.project.createMany({
      data: staticProjects.map((p) => ({
        titleEn: p.titleEn,
        titleFr: p.titleFr || null,
        descEn: p.descEn,
        descFr: p.descFr || null,
        category: p.category,
        client: p.client || null,
        year: p.year || null,
        imageUrl: p.imageUrl || null,
        link: p.link || null,
        order: p.order ?? 0,
      })),
    })
  }
})

/**
 * Hydrates the Project table from static defaults when empty.
 */
async function ensureSeeded(): Promise<boolean> {
  return seedGuard()
}

async function resolveProjectId(id: string): Promise<string> {
  if (!id.startsWith('static-')) return id
  const existing = staticProjects.find((p) => p.id === id)
  if (!existing) {
    throw new Error(`Project not found for static id: ${id}`)
  }
  const dbRecord = await prisma.project.findFirst({
    where: { titleEn: existing.titleEn },
  })
  if (!dbRecord) {
    throw new Error(`Project "${existing.titleEn}" not found in database`)
  }
  return dbRecord.id
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
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

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
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveProjectId(id)
  const record = await prisma.project.update({
    where: { id: targetId },
    data: stripManagedFields(data),
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return record as unknown as ProjectItem
}

export async function deleteProject(id: string): Promise<boolean> {
  const connected = await ensureSeeded()
  if (!connected) throw new Error('Database is not connected')

  const targetId = await resolveProjectId(id)
  await prisma.project.delete({
    where: { id: targetId },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]/our-work/[slug]', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}
