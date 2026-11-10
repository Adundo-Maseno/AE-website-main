import { prisma, isDatabaseConnected } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export interface TeamMemberItem {
  id: string
  name: string
  roleEn: string
  roleFr?: string | null
  bioEn?: string | null
  bioFr?: string | null
  image?: string | null
  hoverImage?: string | null
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export const staticTeamMembers: TeamMemberItem[] = [
  {
    id: 'static-aline',
    name: "Aline O'Connor",
    roleEn: 'Founding Director',
    roleFr: 'Directrice fondatrice',
    bioEn: "Aline is an experienced seed company practitioner, teacher, writer, manager, strategist, and entrepreneur, who has worked on seed systems in Africa since 2007. Aline has worked in the crop seed industry in the US and Africa for close to 30 years, including nine years as the CEO of a large US crop seed company. As the Founding Director of Agri Experience, Aline is highly committed to building and supporting local teams to catalyze growth and opportunity in Africa, and remains available as an advisor to the company.",
    bioFr: "Aline est une praticienne expérimentée des sociétés semencières, enseignante, écrivaine, gestionnaire, stratège et entrepreneur, qui travaille sur les systèmes semenciers en Afrique depuis 2007. Aline a travaillé dans l'industrie des semences agricoles aux États-Unis et en Afrique pendant près de 30 ans, dont neuf ans en tant que PDG d'une grande entreprise américaine de semences agricoles. En tant que directrice fondatrice d'Agri Experience, Aline est très engagée dans la constitution et le soutien des équipes locales pour catalyser la croissance et les opportunités en Afrique, et reste disponible en tant que conseillère auprès de l'entreprise.",
    image: '/team/aline.png',
    hoverImage: '/team/aline.png',
    order: 1,
  },
  {
    id: 'static-mulemia',
    name: 'Mulemia Maina',
    roleEn: 'Managing Director',
    roleFr: 'Directrice générale',
    bioEn: 'Mulemia Maina who leads the team, is a distinguished leader in Africa’s seed sector with over 25 years of expertise in the seed and agricultural sector, spanning public-private partnerships, enterprise development, strategic programming, and development partner relations. She has managed over 350 projects across 22 countries, collaborating with governments, regional bodies, and over 100 seed companies to strengthen policy, capacity, and last-mile delivery. Passionate about empowering farmers, Mulemia champions improved technologies and transformative seed system initiatives to enhance livelihoods across sub-Saharan Africa. She is fluent in English, French, and Kiswahili.',
    bioFr: 'Mulemia Maina, qui dirige l’équipe, est un leader éminent du secteur semencier en Afrique avec plus de 25 ans d’expertise dans le secteur semencier et agricole, couvrant les partenariats public-privé, le développement d’entreprises, la programmation stratégique et les relations avec les partenaires de développement. Elle a géré plus de 350 projets dans 22 pays, collaborant avec des gouvernements, des organismes régionaux et plus de 100 entreprises semencières pour renforcer les politiques, les capacités et la livraison du dernier kilomètre. Passionnée par l’autonomisation des agriculteurs, Mulemia défend les technologies améliorées et les initiatives de systèmes semenciers transformateurs pour améliorer les moyens de subsistance en Afrique subsaharienne. Elle parle couramment l’anglais, le français et le kiswahili.',
    image: '/team/mulemia2.jpg',
    hoverImage: '/team/mulemia.jpg',
    order: 2,
  },
  {
    id: 'static-jayne',
    name: 'Jayne Ngugi',
    roleEn: 'Director, Finance & Administration',
    roleFr: 'Directrice, Finances et Administration',
    bioEn: "Jayne leads the finance and administration portfolio, overseeing the firm's financial management, governance, and administrative operations. With over 30 years of experience in finance and administration, she manages donor and program funds and brings expertise in grant management, financial compliance, internal controls, donor reporting, and financial governance. She provides strategic financial leadership that ensures sound stewardship, operational excellence, and the highest standards of integrity and accountability across the organization.",
    bioFr: 'Jayne dirige le portefeuille des finances et de l’administration, supervisant la gestion financière, la gouvernance et les opérations administratives du cabinet. Avec plus de 30 ans d’expérience en finance et en administration, elle gère les fonds des donateurs et des programmes et apporte son expertise en matière de gestion des subventions, de conformité financière, de contrôles internes, de reporting aux donateurs et de gouvernance financière. Elle assure un leadership financier stratégique qui garantit une saine gestion, l’excellence opérationnelle et les normes les plus élevées d’intégrité et de responsabilité dans l’ensemble de l’organisation.',
    image: '/team/jayne2.jpg',
    hoverImage: '/team/jayne.jpg',
    order: 3,
  },
  {
    id: 'static-ronald',
    name: 'Ronald Misigo',
    roleEn: 'Technical Lead',
    roleFr: 'Responsable technique',
    bioEn: 'Ronald serves as technical lead and is a digital agriculture specialist with over 13 years of experience in seed systems and digital transformation. He specializes in designing innovative digital platforms, databases, dashboards, as well as information systems that strengthen seed systems while advancing agricultural value chains across Africa. His expertise spans technical studies, client advisory, policy and regulatory reform, together with seed systems analytics enabling governments, development partners and private sector organizations to make evidence-based investment and strategic decisions. Ronald has developed impactful national and regional seed-focused tools including SMS based digital feedback solutions that empower farmers, agrodealers, seed companies, as well as regulators in decision making.',
    bioFr: 'Ronald est responsable technique et est un spécialiste de l’agriculture numérique avec plus de 13 ans d’expérience dans les systèmes semenciers et la transformation numérique. Il se spécialise dans la conception de plateformes numériques innovantes, de bases de données, de tableaux de bord ainsi que de systèmes d’information qui renforcent les systèmes semenciers tout en faisant progresser les chaînes de valeur agricoles à travers l’Afrique. Son expertise couvre les études techniques, le conseil aux clients, la réforme politique et réglementaire, ainsi que l’analyse des systèmes semenciers permettant aux gouvernements, aux partenaires de développement et aux organisations du secteur privé de prendre des décisions stratégiques et d’investissement fondées sur des données probantes. Ronald a développé des outils nationaux et régionaux efficaces axés sur les semences, notamment des solutions de retour d’information numérique basées sur SMS qui permettent aux agriculteurs, aux distributeurs agricoles, aux entreprises semencières ainsi qu’aux régulateurs de prendre des décisions.',
    image: '/team/ronald2.jpg',
    hoverImage: '/team/ronald.jpg',
    order: 4,
  },
  {
    id: 'static-denis',
    name: 'Denis Langat',
    roleEn: 'M+E Specialist',
    roleFr: 'Spécialiste M+E',
    bioEn: 'Denis is a young and dynamic project monitoring specialist who supports client related activities with a focus on general research, documentation, record keeping, project monitoring, data collection and analysis.',
    bioFr: 'Denis est un jeune et dynamique spécialiste du suivi de projet qui soutient les activités liées aux clients en mettant l’accent sur la recherche générale, la documentation, la tenue de dossiers, le suivi de projet, la collecte et l’analyse de données.',
    image: '/team/denis2.jpg',
    hoverImage: '/team/denis.jpg',
    order: 5,
  },
  {
    id: 'static-moses',
    name: 'Moses Adundo',
    roleEn: 'Data Analyst',
    roleFr: 'Analyste de données',
    bioEn: 'Moses serves as a data analyst, supporting data-driven decision-making through advanced analytics, data management, and visualization. With over 7 years of experience in data analysis and digital information systems, he specializes in data collection, quality assurance, statistical analysis, dashboard development, and business intelligence. Moses transforms complex datasets into actionable insights that enable governments, development partners, and private sector organizations to make evidence-based decisions and improve program performance.',
    bioFr: 'Moses sert d’analyste de données, soutenant la prise de décision basée sur les données grâce à des analyses avancées, à la gestion des données et à la visualisation. Avec plus de 7 ans d’expérience en analyse de données et en systèmes d’information numériques, il se spécialise dans la collecte de données, l’assurance qualité, l’analyse statistique, le développement de tableaux de bord et la business intelligence. Moses transforme des ensembles de données complexes en informations exploitables qui permettent aux gouvernements, aux partenaires de développement et aux organisations du secteur privé de prendre des décisions fondées sur des preuves et d’améliorer les performances des programmes.',
    image: '/team/moses2.jpg',
    hoverImage: '/team/moses.jpg',
    order: 6,
  },
  {
    id: 'static-claire',
    name: 'Claire Wanjiru',
    roleEn: 'Executive Assistant',
    roleFr: 'Assistante de direction',
    bioEn: 'Claire provides high-level administrative and logistics support to ensure seamless company operations. She supports technical operations including asset management, budget coordination, process optimization and keeps operations well aligned by managing workflows and complex schedules. Her dedication to operational excellence and organizational effectiveness enables the team to focus on strategic priorities and ensures that company’s objectives are met with precision, supporting the broader mission and driving sustainable success.',
    bioFr: 'Claire fournit un soutien administratif et logistique de haut niveau pour assurer le bon fonctionnement de l’entreprise. Elle prend en charge les opérations techniques, notamment la gestion des actifs, la coordination budgétaire, l’optimisation des processus et maintient les opérations bien alignées en gérant les flux de travail et les calendriers complexes. Son dévouement à l’excellence opérationnelle et à l’efficacité organisationnelle permet à l’équipe de se concentrer sur les priorités stratégiques et garantit que les objectifs de l’entreprise sont atteints avec précision, soutenant la mission plus large et favorisant un succès durable.',
    image: '/team/claire2.jpg',
    hoverImage: '/team/claire.jpg',
    order: 7,
  },
  {
    id: 'static-nicholas',
    name: 'Nicholas Kilonzo',
    roleEn: 'Office Assistant',
    roleFr: 'Assistant de bureau',
    bioEn: 'An integral part of the team, providing essential logistical and office support.',
    bioFr: 'Une partie intégrante de l’équipe, fournissant un soutien logistique et bureautique essentiel.',
    image: '/team/kilonzo2.jpg',
    hoverImage: '/team/kilonzo.jpg',
    order: 8,
  },
]

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  const connected = await isDatabaseConnected()
  if (connected) {
    try {
      const records = await prisma.teamMember.findMany({
        orderBy: { order: 'asc' },
      })
      if (records && records.length > 0) {
        return records
      }
    } catch {
      // Fall through to static
    }
  }

  return staticTeamMembers
}

export async function createTeamMember(data: {
  name: string
  roleEn: string
  roleFr?: string
  bioEn?: string
  bioFr?: string
  image?: string
  hoverImage?: string
  order?: number
}): Promise<TeamMemberItem> {
  const record = await prisma.teamMember.create({
    data: {
      name: data.name,
      roleEn: data.roleEn,
      roleFr: data.roleFr || null,
      bioEn: data.bioEn || null,
      bioFr: data.bioFr || null,
      image: data.image || null,
      hoverImage: data.hoverImage || null,
      order: data.order ?? 0,
    },
  })

  revalidatePath('/[locale]/our-team', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function updateTeamMember(
  id: string,
  data: Partial<{
    name: string
    roleEn: string
    roleFr?: string
    bioEn?: string
    bioFr?: string
    image?: string
    hoverImage?: string
    order?: number
  }>
): Promise<TeamMemberItem> {
  let record

  if (id.startsWith('static-')) {
    const existing = staticTeamMembers.find((m) => m.id === id)
    record = await prisma.teamMember.create({
      data: {
        name: data.name ?? existing?.name ?? '',
        roleEn: data.roleEn ?? existing?.roleEn ?? '',
        roleFr: data.roleFr !== undefined ? data.roleFr : existing?.roleFr || null,
        bioEn: data.bioEn !== undefined ? data.bioEn : existing?.bioEn || null,
        bioFr: data.bioFr !== undefined ? data.bioFr : existing?.bioFr || null,
        image: data.image !== undefined ? data.image : existing?.image || null,
        hoverImage: data.hoverImage !== undefined ? data.hoverImage : existing?.hoverImage || null,
        order: data.order ?? existing?.order ?? 0,
      },
    })
  } else {
    record = await prisma.teamMember.update({
      where: { id },
      data,
    })
  }

  revalidatePath('/[locale]/our-team', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (id.startsWith('static-')) {
    return true
  }

  await prisma.teamMember.delete({
    where: { id },
  })

  revalidatePath('/[locale]/our-team', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}
