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
  // ─────────────────────────────────────────────────────────────
  // 1. DIGITAL PLATFORMS (Public Data Infrastructure & Anti-Counterfeiting)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-mbeguchoice',
    titleEn: 'MbeguChoice: Kenya’s Premier Online Seed Variety Selector',
    titleFr: 'MbeguChoice : Premier sélecteur en ligne de variétés de semences au Kenya',
    descEn: 'Developed in partnership with KALRO, KEPHIS, and Kenya Markets Trust / Gatsby Africa. An interactive digital platform that catalogues over 200 commercialized crop varieties by agro-ecological zone, disease resistance, maturity periods, and rainfall suitability, taking the guesswork out of seed selection for farmers and agrodealers.',
    descFr: 'Développé en partenariat avec le KALRO, le KEPHIS et le Kenya Markets Trust. Une plateforme numérique interactive répertoriant plus de 200 variétés commerciales par zone agro-écologique, maturité et résistance.',
    category: 'digital-platforms',
    client: 'Kenya Markets Trust / KALRO / KEPHIS',
    year: '2015-Present',
    imageUrl: '/platforms/mbeguchoice.png',
    link: 'https://mbeguchoice.com',
    order: 1,
  },
  {
    id: 'static-mbeguchoice-case-study',
    titleEn: 'Case Study: MbeguChoice Seed Variety IT Platform',
    titleFr: 'Étude de cas : Plateforme informatique de variétés de semences MbeguChoice',
    descEn: 'Official technical case study evaluating the architecture, stakeholder uptake, and market impact of Kenya’s first comprehensive crop variety database, demonstrating how open agronomic data directly addresses variety adoption gaps.',
    descFr: 'Étude de cas technique officielle évaluant l’architecture, l’adoption par les parties prenantes et l’impact sur le marché de la première base de données variétale du Kenya.',
    category: 'digital-platforms',
    client: 'DfID / Kenya Markets Trust',
    year: '2018',
    imageUrl: '/platforms/mbeguchoice.png',
    link: '/resources/Case-Study-MbeguChoice-Seed-Variety-IT-Platform.pdf',
    order: 2,
  },
  {
    id: 'static-m3',
    titleEn: 'Mulika Mbegu Mbovu (M3): Farmer SMS Anti-Counterfeit Verification',
    titleFr: 'Mulika Mbegu Mbovu (M3) : Vérification anti-contrefaçon par SMS pour agriculteurs',
    descEn: 'A pioneering mobile SMS reporting platform enabling smallholder farmers to authenticate seed package labels, report low-quality or suspected counterfeit seed directly to KEPHIS, and trigger rapid field regulatory follow-up.',
    descFr: 'Une plateforme mobile par SMS permettant aux petits exploitants d’authentifier les étiquettes de semences et de signaler directement les semences suspectes au KEPHIS.',
    category: 'digital-platforms',
    client: 'Agri Experience CSR supporting KEPHIS',
    year: '2018-2022',
    imageUrl: '/m3-logo.svg',
    link: '/resources/Empowering-Kenyan-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 3,
  },
  {
    id: 'static-rimi-tanzania',
    titleEn: 'Ripoti Mbegu Isiyo Bora (RIMI): Tanzania Mobile Reporting Platform',
    titleFr: 'Ripoti Mbegu Isiyo Bora (RIMI) : Plateforme de signalement mobile en Tanzanie',
    descEn: 'Replicating and expanding mobile farmer feedback systems in Tanzania in partnership with Catholic Relief Services and TOSCI. Empowered rural smallholders to report seed quality anomalies to the national seed regulator.',
    descFr: 'Déploiement du système de signalement mobile des semences en Tanzanie en partenariat avec Catholic Relief Services et le régulateur national TOSCI.',
    category: 'digital-platforms',
    client: 'USAID Feed the Future / CRS SSSD Activity / TOSCI',
    year: '2023',
    imageUrl: '/pexels-equalstock-27722065.jpg',
    link: '/resources/Empowering-Tanzanias-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 4,
  },
  {
    id: 'static-scratch-off-labels',
    titleEn: 'Case Study: Scratch-Off Verification Labels for Certified Seed',
    titleFr: 'Étude de cas : Étiquettes à gratter pour semences certifiées au Kenya',
    descEn: 'Documented field trial assessing the deployment of scratch-off security labels with unique alphanumeric codes on seed packets, evaluating farmer verification rates and anti-counterfeiting compliance among seed companies.',
    descFr: 'Essai documenté sur le déploiement d’étiquettes de sécurité à gratter sur les paquets de semences certifiées pour éliminer les contrefaçons.',
    category: 'digital-platforms',
    client: 'DfID / Kenya Markets Trust / KEPHIS',
    year: '2018',
    imageUrl: '/platforms/kenya-plant-variety-list.png',
    link: '/resources/Case-Study-Scratch-Off-Labels-for-Certified-Seed-in-Kenya.pdf',
    order: 5,
  },
  {
    id: 'static-acvc',
    titleEn: 'Africa Digital Crop Variety Catalogue (ACVC)',
    titleFr: 'Catalogue numérique des variétés de cultures africaines (ACVC)',
    descEn: 'Regional searchable catalog consolidating officially released and registered commercial crop varieties across East and Southern Africa, giving cross-border agribusinesses verified yield and disease data.',
    descFr: 'Catalogue consultable en ligne consolidant les variétés commerciales officiellement homologuées dans plusieurs pays d’Afrique de l’Est et australe.',
    category: 'digital-platforms',
    client: 'USAID / AGRA',
    year: '2020-Present',
    imageUrl: '/platforms/africa-crop-variety-catalogue.png',
    link: 'https://varietycatalogues.com/about/',
    order: 6,
  },
  {
    id: 'static-kpvl',
    titleEn: 'Kenya Plant Variety List (KPVL API & Portal)',
    titleFr: 'Liste des variétés végétales du Kenya (API & Portail KPVL)',
    descEn: 'Interactive API and official digital registry of all officially gazetted plant varieties in Kenya, offering real-time breeder information, gazette dates, and crop suitability metrics.',
    descFr: 'API interactive et registre officiel de toutes les variétés végétales homologuées au Kenya avec données en temps réel sur les obtenteurs.',
    category: 'digital-platforms',
    client: 'KEPHIS',
    year: '2021-Present',
    imageUrl: '/platforms/kenya-plant-variety-list.png',
    link: 'https://catalogueapi.varietycatalogues.com/',
    order: 7,
  },
  {
    id: 'static-taip',
    titleEn: 'Tanzania Agri-Inputs Platform (TAIP)',
    titleFr: 'Plateforme des intrants agricoles de Tanzanie (TAIP)',
    descEn: 'National interactive database of industry stakeholders, certified seed varieties released in Tanzania, registered agrochemicals, and agrodealers mapped to their geo-locations.',
    descFr: 'Base de données nationale des variétés homologuées en Tanzanie, des produits agrochimiques enregistrés et des distributeurs d’intrants géolocalisés.',
    category: 'digital-platforms',
    client: 'TOSCI / USAID',
    year: '2022-Present',
    imageUrl: '/platforms/tanzania-agri-inputs-platform.png',
    link: 'https://tanzaniaagri-inputsplatform.com/',
    order: 8,
  },
  {
    id: 'static-vin-scoping',
    titleEn: 'Variety Identification Number (VIN) Traceability Scoping Study',
    titleFr: 'Étude de cadrage du système de numéro d’identification variétale (VIN)',
    descEn: 'Scoping study and technical architecture design for a national Variety Identification Number system to enable end-to-end seed lot tracking, regulatory traceability, and seed certification verification.',
    descFr: 'Étude de cadrage et architecture technique d’un système national d’identification variétale pour la traçabilité des lots de semences.',
    category: 'digital-platforms',
    client: 'USAID',
    year: '2017',
    imageUrl: '/platforms/seed-sector-platform-kenya.png',
    link: '/resources/Variety-Identification-Number-VIN-System-Summary-Report-of-Scoping-Study.pdf',
    order: 9,
  },

  // ─────────────────────────────────────────────────────────────
  // 2. TECHNICAL STUDIES (Diagnostics, Market Scoping & Value Chain Economics)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-kcdms-pasture',
    titleEn: 'Scoping Study: Pasture & Fodder Planting Materials in Kenya',
    titleFr: 'Étude de cadrage : Matériel de plantation de pâturages et de fourrages au Kenya',
    descEn: 'Comprehensive market scoping across 12 high-potential Kenyan counties evaluating commercial fodder seed systems, Brachiaria cultivars, Napier multiplication, and seed market demand constraints for dairy productivity.',
    descFr: 'Étude de cadrage approfondie dans 12 comtés kenyans évaluant les systèmes semenciers de fourrages commerciaux, les cultivars de Brachiaria et la demande pour l’élevage laitier.',
    category: 'technical-studies',
    client: 'USAID / Kenya Crop and Dairy Market Systems Activity (RTI International)',
    year: '2018',
    imageUrl: '/resources/previews/preview-pasture-fodder.jpg',
    link: '/resources/Scoping-Study-Pasture-and-Fodder-Planting-Materials-in-Kenya.pdf',
    order: 10,
  },
  {
    id: 'static-kcdms-value-chain',
    titleEn: 'Scoping Study: Value Chain Crop Planting Materials in Kenya',
    titleFr: 'Étude de cadrage : Matériel de plantation pour cultures de chaîne de valeur au Kenya',
    descEn: 'Detailed empirical assessment across 12 counties investigating seedling quality and commercial supply chains for banana tissue culture, grafted avocado, mango, pineapple, passion fruit, sweet potato, and African leafy vegetables.',
    descFr: 'Évaluation empirique détaillée sur la qualité des plants et les chaînes d’approvisionnement pour bananes de culture tissulaire, avocats greffés, mangues et légumes feuilles.',
    category: 'technical-studies',
    client: 'USAID / KCDMS Activity (RTI International)',
    year: '2018',
    imageUrl: '/resources/previews/preview-value-chain-crops.jpg',
    link: '/resources/Scoping-Study-Planting-Materials-for-Value-Chain-Crops-in-Kenya-banana-avocado-mango-pineapples-passion-fruit-sweet-potatoes-African-leafy-vegetables.pdf',
    order: 11,
  },
  {
    id: 'static-kcdms-nurseries',
    titleEn: 'Scoping Study: Horticulture Seedling Nurseries as a Viable Business Model',
    titleFr: 'Étude de cadrage : Les pépinières de plants horticoles comme modèle commercial viable',
    descEn: 'Financial modeling and operational viability study of private seedling nurseries in Kenya. Analyzed capital requirements, cost structures, disease hygiene protocols, and commercial payback models for sustainable youth and private operators.',
    descFr: 'Modélisation financière et étude de viabilité opérationnelle des pépinières privées de plants horticoles au Kenya avec protocoles d’hygiène sanitaire.',
    category: 'technical-studies',
    client: 'USAID / KCDMS (RTI International)',
    year: '2018',
    imageUrl: '/resources/previews/preview-horticulture-nurseries.jpg',
    link: '/resources/Scoping-Study-Horticulture-Seedling-Nurseries-as-a-Viable-Business-Model-in-Kenya.pdf',
    order: 12,
  },
  {
    id: 'static-kcdms-agrodealer-assoc',
    titleEn: 'Scoping Study: Agrodealer Association Development in Twelve Counties',
    titleFr: 'Étude de cadrage : Développement des associations de distributeurs d’intrants',
    descEn: 'Assessed county-level agrodealer associations across 12 counties in Western and Eastern Kenya, identifying institutional gaps, retail finance barriers, and governance structures to transform them into viable commercial networks.',
    descFr: 'Évaluation des associations de distributeurs d’intrants agricoles dans 12 comtés kenyans pour lever les freins financiers et renforcer la distribution rurale.',
    category: 'technical-studies',
    client: 'USAID / KCDMS (RTI International)',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Scoping-Study-Agro-Dealer-Association-Development-in-Twelve-Counties-in-Kenya.pdf',
    order: 13,
  },
  {
    id: 'static-agrodealer-mapping',
    titleEn: 'Agrodealer Mapping & Supply Chain Analysis in Twelve Counties',
    titleFr: 'Cartographie des distributeurs d’intrants et analyse de la chaîne d’approvisionnement',
    descEn: 'Field census and GIS mapping of 1,200+ agrodealers across 12 counties, evaluating stock volumes, seed brand availability, certified product turnover, and geographic distances to remote farming clusters.',
    descFr: 'Recensement sur le terrain et cartographie SIG de plus de 1 200 distributeurs d’intrants agricoles dans 12 comtés kenyans.',
    category: 'technical-studies',
    client: 'USAID / KCDMS (RTI International)',
    year: '2018',
    imageUrl: '/pexels-flambo-388007-1112080.jpg',
    link: '/resources/Agro-Dealer-Mapping-in-Twelve-Counties-in-Kenya.pdf',
    order: 14,
  },
  {
    id: 'static-tasai-pilot',
    titleEn: 'Case Study: The African Seed Access Index (TASAI) Founding Pilot',
    titleFr: 'Étude de cas : Projet pilote fondateur de l’Indice d’accès aux semences en Afrique (TASAI)',
    descEn: 'Case study documenting the founding pilot of TASAI in Kenya, establishing standard indicators for measuring seed variety release speed, inspection efficiency, market concentration, and private seed company competitiveness.',
    descFr: 'Étude de cas documentant le projet pilote de TASAI au Kenya, établissant des indicateurs de référence pour l’évaluation des secteurs semenciers en Afrique.',
    category: 'technical-studies',
    client: 'DfID / Kenya Markets Trust',
    year: '2018',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    link: '/resources/Case-Study-The-African-Seed-Access-Index-TASAI-Pilot.pdf',
    order: 15,
  },
  {
    id: 'static-food-security-trends',
    titleEn: 'Food Security & Crop Seed in Kenya: Macro Trends & Big Payoffs',
    titleFr: 'Sécurité alimentaire et semences au Kenya : Tendances macroéconomiques et opportunités',
    descEn: 'Seminal two-part macroeconomic study analyzing 15-year seed production trends in Kenya, exposing systemic shortfalls in certified seed uptake and calculating the multi-million dollar economic gains from targeted regulatory reform.',
    descFr: 'Étude macroéconomique de référence en deux parties analysant les tendances de production de semences au Kenya et les gains économiques majeurs des réformes.',
    category: 'technical-studies',
    client: 'DfID / Kenya Markets Trust',
    year: '2015-2016',
    imageUrl: '/our-vision-2026.jpg',
    link: '/resources/Food-Security-Crop-Seed-in-Kenya-Part-1-Challenging-Trends-We-Cannot-Afford-to-Ignore.pdf',
    order: 16,
  },
  {
    id: 'static-seed-company-survey',
    titleEn: 'Seed Company Survey & Analysis: Sub-Saharan Africa',
    titleFr: 'Enquête et analyse sur les entreprises semencières en Afrique subsaharienne',
    descEn: 'Empirical survey analyzing business models, breeding access, foundation seed bottlenecks, and distribution barriers faced by emerging private seed companies across East and West Africa.',
    descFr: 'Enquête empirique analysant les modèles économiques, l’accès aux semences de base et les goulots d’étranglement des entreprises semencières privées africaines.',
    category: 'technical-studies',
    client: 'AGRA (Pro Bono Advisory)',
    year: '2018',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    link: '/resources/Seed-Company-Survey-and-Analysis-%E2%80%93-Sub-Saharan-Africa.pdf',
    order: 17,
  },

  // ─────────────────────────────────────────────────────────────
  // 3. PROJECT IMPLEMENTATION (Field Systems Reform & Supply Chain Deployment)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-tanzania-transformation',
    titleEn: 'Tanzania Seed Systems Transformation: Multi-Year Systems Reform',
    titleFr: 'Transformation des systèmes semenciers en Tanzanie : Réforme pluriannuelle',
    descEn: 'Led multi-year institutional restructuring, digital seed catalog deployment, TOSCI inspector decentralization, agrodealer licensing simplification, and mobile farmer reporting platforms (RIMI) across mainland Tanzania.',
    descFr: 'Direction de la restructuration institutionnelle pluriannuelle, du déploiement du catalogue numérique, de la décentralisation des inspecteurs TOSCI et de la plateforme RIMI.',
    category: 'project-implementation',
    client: 'USAID / CRS / Ministry of Agriculture Tanzania',
    year: '2021-Present',
    imageUrl: '/pexels-equalstock-27722065.jpg',
    link: '/resources/Empowering-Tanzanias-Farmers-to-Report-Low-Quality-or-Fake-Seed-to-the-Regulator.pdf',
    order: 18,
  },
  {
    id: 'static-feed-the-future',
    titleEn: 'Feed the Future Seed Systems for Development (SSSD)',
    titleFr: 'Feed the Future - Systèmes semenciers pour le développement (SSSD)',
    descEn: 'Technical leadership on private sector seed enterprise development, regulatory simplification, and market resilience across 6 African nations, linking community seed multipliers with commercial foundation seed providers.',
    descFr: 'Leadership technique sur le développement des entreprises semencières privées et la simplification réglementaire dans 6 pays africains.',
    category: 'project-implementation',
    client: 'USAID / Catholic Relief Services',
    year: '2019-2024',
    imageUrl: '/our-mission-2026.jpg',
    order: 19,
  },
  {
    id: 'static-county-agrodealer-case-study',
    titleEn: 'Case Study: County Agrodealer Association Institutional Strengthening',
    titleFr: 'Étude de cas : Renforcement institutionnel des associations de distributeurs',
    descEn: 'Implemented organizational development, retail financial record-keeping, and legal formalization for agrodealer county associations, creating sustainable bulk-purchasing channels with major seed and input suppliers.',
    descFr: 'Mise en œuvre du développement organisationnel, de la gestion financière et de la formalisation juridique des associations de distributeurs d’intrants dans les comtés.',
    category: 'project-implementation',
    client: 'DfID / Kenya Markets Trust',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Case-Study-County-Agrodealer-Association-Strengthening-in-Kenya.pdf',
    order: 20,
  },
  {
    id: 'static-drought-tolerant-crops',
    titleEn: 'Reaching More Farmers with High Quality Seed for Drought Tolerant Crops',
    titleFr: 'Atteindre plus d’agriculteurs avec des semences de qualité pour cultures tolérantes à la sécheresse',
    descEn: 'Field deployment strategy and commercial supply chain modeling to scale smallholder adoption of drought-tolerant sorghum, millet, and pigeon pea seed across climate-vulnerable dryland farming zones.',
    descFr: 'Stratégie de déploiement sur le terrain et modélisation de la chaîne d’approvisionnement pour accroître l’adoption de sorgho, mil et pois d’Angole tolérants à la sécheresse.',
    category: 'project-implementation',
    client: 'DfID / VUNA Climate Smart Agriculture (ASI)',
    year: '2016',
    imageUrl: '/pexels-flambo-388007-1112080.jpg',
    link: '/resources/Reaching-More-Farmers-with-High-Quality-Seed-for-Drought-Tolerant-Crops.pdf',
    order: 21,
  },

  // ─────────────────────────────────────────────────────────────
  // 4. CLIENT ADVISORY (Policy, Regulatory Reform & Regional Harmonization)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-revising-seed-regulations',
    titleEn: 'Case Study: Revising Kenya’s Seed Regulations & Authorized Inspection',
    titleFr: 'Étude de cas : Révision des réglementations semencières du Kenya et inspection privée',
    descEn: 'High-level advisory counsel to KEPHIS and the Ministry of Agriculture that structured legislative amendments to authorize private seed inspectors, establish the standard seed class, and dramatically reduce certification backlogs.',
    descFr: 'Conseil de haut niveau au KEPHIS et au Ministère de l’Agriculture pour autoriser les inspecteurs semenciers privés et instaurer la classe de semences standard.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust / KEPHIS / STAK',
    year: '2016-2018',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    link: '/resources/Case-Study-Revising-Kenya%E2%80%99s-Seed-Regulations.pdf',
    order: 22,
  },
  {
    id: 'static-seed-company-proposition',
    titleEn: 'Crop Seed Company Proposition for Improving Seed Regulation in Kenya',
    titleFr: 'Proposition des semenciers pour l’amélioration de la réglementation au Kenya',
    descEn: 'Comprehensive policy brief synthesizing private sector consensus on regulatory reform: variety release fees, authorized inspection accreditation criteria, plant quarantine modernization, and seed import/export clearance speed.',
    descFr: 'Mémoire de politique publique synthétisant le consensus du secteur privé sur les réformes réglementaires, l’homologation des variétés et la quarantaine végétale.',
    category: 'client-advisory',
    client: 'DfID / Kenya Markets Trust / STAK',
    year: '2016',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    link: '/resources/Crop-Seed-Company-Proposition-for-Improving-Current-Seed-Regulation-in-Kenya.pdf',
    order: 23,
  },
  {
    id: 'static-regional-seed-trade',
    titleEn: 'Assessment to Support Regional Seed Trade Promotion in East Africa',
    titleFr: 'Évaluation technique pour la promotion du commerce régional des semences en Afrique de l’Est',
    descEn: 'Multi-country technical assessment evaluating COMESA and EAC seed trade harmonization protocols, mutual recognition of variety release catalogs, cross-border quarantine pest lists, and border transit customs clearance.',
    descFr: 'Évaluation technique multi-pays des protocoles d’harmonisation du commerce des semences du COMESA et de l’EAC, de la reconnaissance mutuelle des catalogues variétaux et des douanes.',
    category: 'client-advisory',
    client: 'USAID / FTF Building Capacity for African Agricultural Transformation (DAI)',
    year: '2018',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Assessment-to-Support-the-Promotion-of-Regional-Seed-Trade-in-East-Africa.pdf',
    order: 24,
  },
  {
    id: 'static-national-variety-release',
    titleEn: 'National Seed Policy & Regulatory Simplification Strategy',
    titleFr: 'Politique semencière nationale et stratégie de simplification réglementaire',
    descEn: 'Strategic counsel assisting agricultural ministries in streamlining variety release timeframes from three seasons down to two, removing administrative friction, and accelerating smallholder access to climate-smart genetics.',
    descFr: 'Conseil stratégique aidant les ministères agricoles à réduire les délais d’homologation variétale de trois à deux saisons pour accélérer l’accès aux semences résilientes.',
    category: 'client-advisory',
    client: 'East Africa Regional Governments / AGRA',
    year: '2018-2023',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    order: 25,
  },

  // ─────────────────────────────────────────────────────────────
  // 5. CAPACITY BUILDING (Operational Toolkits & Accredited Training)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-seed-company-toolbox',
    titleEn: 'The African Seed Company Toolbox: 52 Tools Every Manager Should Know (EN & FR)',
    titleFr: 'La boîte à outils des entreprises semencières africaines : 52 outils de gestion (EN & FR)',
    descEn: 'World-renowned executive management toolkit published in partnership with the Bill & Melinda Gates Foundation (English and French). Delivers 52 practical tools across governance, variety trials, seed production economics, outgrower contracts, processing hygiene, and dealer marketing.',
    descFr: 'Guide de gestion de renommée mondiale publié en partenariat avec la Fondation Gates (en anglais et français). 52 outils pratiques couvrant gouvernance, multiplication, contrats et marketing.',
    category: 'capacity-building',
    client: 'Bill & Melinda Gates Foundation Agricultural Development',
    year: '2009-Present',
    imageUrl: '/images/african-seed-company-toolbox-cover.jpg',
    link: '/resources/The-African-Seed-Company-Toolbox-52-Tools-Every-Seed-Company-Manager-Should-Know-How-to-Use-ENGLISH.pdf',
    order: 26,
  },
  {
    id: 'static-stak-strengthening',
    titleEn: 'Case Study: Strengthening a Seed Trade Association in Kenya (STAK)',
    titleFr: 'Étude de cas : Renforcement de l’Association du commerce semencier du Kenya (STAK)',
    descEn: 'Institutional strengthening program that revamped STAK’s organizational governance, revenue sustainability, member value propositions, and policy advocacy capacity, establishing it as Africa’s most proactive seed trade body.',
    descFr: 'Programme de renforcement institutionnel ayant restructuré la gouvernance, la pérennité financière et la capacité de plaidoyer de la STAK au Kenya.',
    category: 'capacity-building',
    client: 'DfID / Kenya Markets Trust / STAK',
    year: '2018',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    link: '/resources/Case-Study-Strengthening-a-Seed-Trade-Association-in-Kenya.pdf',
    order: 27,
  },
  {
    id: 'static-inspector-training',
    titleEn: 'Authorized Seed Inspector Training & Accreditation Curriculum',
    titleFr: 'Programme de formation et d’accréditation des inspecteurs semenciers agréés',
    descEn: 'Standardized training curriculum and practical field evaluation modules for private and public sector seed quality inspectors, covering field inspection protocols, seed lot sampling, and ISTA laboratory verification standards.',
    descFr: 'Programme de formation standardisé et modules pratiques sur le terrain pour les inspecteurs semenciers privés et publics selon les normes internationales ISTA.',
    category: 'capacity-building',
    client: 'KEPHIS / AGRA / STAK',
    year: '2020-2023',
    imageUrl: '/pexels-flambo-388007-1112080.jpg',
    order: 28,
  },
  {
    id: 'static-wacci-breeders-training',
    titleEn: 'Seed Business Management for Crop Breeders (WACCI PhD Program)',
    titleFr: 'Gestion des entreprises semencières pour les sélectionneurs de cultures (WACCI)',
    descEn: 'Executive curriculum delivered to PhD plant breeding candidates at the West Africa Centre for Crop Improvement (University of Ghana), bridging academic genetics research with commercial seed enterprise management.',
    descFr: 'Formation pour les doctorants sélectionneurs au Centre d’amélioration des cultures d’Afrique de l’Ouest (WACCI), reliant la recherche génétique à la gestion commerciale.',
    category: 'capacity-building',
    client: 'WACCI (University of Ghana) / AGRA',
    year: '2019-Present',
    imageUrl: '/pexels-elvis-kambire-434351765-38025863.jpg',
    order: 29,
  },

  // ─────────────────────────────────────────────────────────────
  // 6. STAKEHOLDER CONVENINGS (Policy Roundtables & Regional Mediation)
  // ─────────────────────────────────────────────────────────────
  {
    id: 'static-private-sector-roundtables',
    titleEn: 'National Seed Industry Policy & Trade Roundtables',
    titleFr: 'Tables rondes nationales sur les politiques et le commerce semencier',
    descEn: 'Facilitated high-stakes Chatham House roundtables bringing together seed company executives, national regulators (KEPHIS), research institutions (KALRO), and development partners to negotiate legislative reforms and break seed policy deadlocks.',
    descFr: 'Animation de tables rondes neutres de haut niveau réunissant semenciers, régulateurs (KEPHIS), instituts de recherche et bailleurs pour débloquer les réformes semencières.',
    category: 'stakeholder-convenings',
    client: 'Kenya Markets Trust / STAK',
    year: '2016-2022',
    imageUrl: '/glenn-carstens-peters-piNf3C4TViA-unsplash.jpg',
    link: '/resources/Crop-Seed-Company-Proposition-for-Improving-Current-Seed-Regulation-in-Kenya.pdf',
    order: 30,
  },
  {
    id: 'static-cross-border-symposia',
    titleEn: 'East Africa Cross-Border Seed Quarantine & Trade Symposia',
    titleFr: 'Symposiums sur la quarantaine et le commerce transfrontalier des semences en Afrique de l’Est',
    descEn: 'Convened regional seed authorities, plant health inspectors, and commercial seed exporters from Kenya, Uganda, Tanzania, and Rwanda to resolve cross-border pest quarantine disputes and operationalize COMESA seed movement agreements.',
    descFr: 'Rencontres réunissant autorités semencières, inspecteurs phytosanitaires et exportateurs du Kenya, d’Ouganda, de Tanzanie et du Rwanda pour harmoniser le transit transfrontalier.',
    category: 'stakeholder-convenings',
    client: 'USAID / East African Seed Regulators / ACTESA',
    year: '2018-2023',
    imageUrl: '/resources/previews/preview-agrodealer-associations.jpg',
    link: '/resources/Assessment-to-Support-the-Promotion-of-Regional-Seed-Trade-in-East-Africa.pdf',
    order: 31,
  },
  {
    id: 'static-kenya-seed-study-forum',
    titleEn: 'Kenya Seed Industry Stakeholder Consultations & National Study',
    titleFr: 'Consultations des parties prenantes de l’industrie semencière du Kenya et étude nationale',
    descEn: 'Multi-stakeholder consultative process and sector-wide convening that produced the seminal Kenya Seed Industry Study, benchmarking private company investment, breeding pipeline bottlenecks, and agrodealer margin economics.',
    descFr: 'Processus consultatif multipartite ayant abouti à l’étude de référence sur l’industrie semencière au Kenya, analysant investissements privés et marges des distributeurs.',
    category: 'stakeholder-convenings',
    client: 'DfID / Kenya Markets Trust / ASI',
    year: '2012-2016',
    imageUrl: '/our-vision-2026.jpg',
    link: '/resources/Kenya-Seed-Industry-Study.pdf',
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
  revalidatePath('/[locale]', 'layout')

  return record as unknown as ProjectItem
}

export async function updateProject(
  id: string,
  data: Partial<{
    titleEn: string
    titleFr: string
    descEn: string
    descFr: string
    category: string
    client: string
    year: string
    imageUrl: string
    link: string
    order: number
  }>
): Promise<ProjectItem> {
  const record = await prisma.project.update({
    where: { id },
    data,
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]', 'layout')

  return record as unknown as ProjectItem
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({
    where: { id },
  })

  revalidatePath('/[locale]/our-work', 'page')
  revalidatePath('/[locale]', 'layout')
}
