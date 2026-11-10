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
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export const staticTeamMembers: TeamMemberItem[] = [
  {
    id: 'static-aline',
    name: "Aline O'Connor",
    roleEn: 'Managing Director & Founder',
    roleFr: 'Directrice générale et fondatrice',
    bioEn: 'Seed systems expert with over 35 years of executive experience across public, private, and international agricultural development in Africa.',
    bioFr: 'Experte des systèmes semenciers avec plus de 35 ans d’expérience exécutive dans le développement agricole en Afrique.',
    image: '/team/aline.png',
    order: 1,
  },
  {
    id: 'static-mulemia',
    name: 'Mulemia Maina',
    roleEn: 'Senior Seed Regulatory Specialist',
    roleFr: 'Spécialiste principal de la réglementation semencière',
    bioEn: 'Specialist in seed policy harmonization, variety release, and regional agricultural trade across COMESA and EAC.',
    bioFr: 'Spécialiste de l’harmonisation des politiques semencières et du commerce régional au sein du COMESA et de la CAE.',
    image: '/team/mulemia2.jpg',
    order: 2,
  },
  {
    id: 'static-jayne',
    name: 'Jayne Gathii',
    roleEn: 'Agri-Enterprise & Seed Systems Advisor',
    roleFr: 'Conseillère en agro-entreprise et systèmes semenciers',
    bioEn: 'Advisor specializing in seed enterprise development, SME finance, and early generation seed systems.',
    bioFr: 'Conseillère spécialisée dans le développement des entreprises semencières et les systèmes de semences de pré-base.',
    image: '/team/jayne2.jpg',
    order: 3,
  },
  {
    id: 'static-ronald',
    name: 'Ronald Ssekamate',
    roleEn: 'Seed Inspection & Quality Assurance Lead',
    roleFr: 'Responsable de l’inspection des semences et de l’assurance qualité',
    bioEn: 'Expert in field inspections, digital verification, and seed testing laboratory accreditation.',
    bioFr: 'Expert en inspections au champ, vérification numérique et accréditation des laboratoires de semences.',
    image: '/team/ronald2.jpg',
    order: 4,
  },
  {
    id: 'static-denis',
    name: 'Denis Macharia',
    roleEn: 'Data Analytics & Digital Agriculture Systems',
    roleFr: 'Systèmes de données et d’agriculture numérique',
    bioEn: 'Specialist in agricultural informatics, digital verification platforms (M3, RIMI), and GIS mapping.',
    bioFr: 'Spécialiste de l’informatique agricole, des plateformes de vérification numérique et de la cartographie SIG.',
    image: '/team/denis2.jpg',
    order: 5,
  },
  {
    id: 'static-moses',
    name: 'Moses Lomeri',
    roleEn: 'Agronomy & Field Operations Coordinator',
    roleFr: 'Coordonnateur de l’agronomie et des opérations de terrain',
    bioEn: 'Coordinates large-scale on-farm trials, farmer demonstration plots, and agrodealer capacity building.',
    bioFr: 'Coordonne les essais à la ferme, les parcelles de démonstration et le renforcement des capacités des distributeurs.',
    image: '/team/moses2.jpg',
    order: 6,
  },
  {
    id: 'static-claire',
    name: 'Claire Kageha',
    roleEn: 'Project Finance & Grants Management Specialist',
    roleFr: 'Spécialiste de la gestion financière des projets et des subventions',
    bioEn: 'Oversees multi-donor compliance, financial tracking, and operational management for donor-funded initiatives.',
    bioFr: 'Supervise la conformité multi-bailleurs et le suivi financier pour les initiatives subventionnées.',
    image: '/team/claire2.jpg',
    order: 7,
  },
  {
    id: 'static-nicholas',
    name: 'Nicholas Kilonzo',
    roleEn: 'Communications & Knowledge Management Officer',
    roleFr: 'Responsable de la communication et de la gestion des connaissances',
    bioEn: 'Leads digital outreach, stakeholder dissemination, and multimedia documentation of agricultural impacts.',
    bioFr: 'Dirige la sensibilisation numérique, la diffusion aux parties prenantes et la documentation multimédia.',
    image: '/team/kilonzo2.jpg',
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
    order?: number
  }>
): Promise<TeamMemberItem> {
  const record = await prisma.teamMember.update({
    where: { id },
    data,
  })

  revalidatePath('/[locale]/our-team', 'page')
  revalidatePath('/[locale]', 'layout')

  return record
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  await prisma.teamMember.delete({
    where: { id },
  })

  revalidatePath('/[locale]/our-team', 'page')
  revalidatePath('/[locale]', 'layout')

  return true
}
