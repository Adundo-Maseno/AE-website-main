import { NextResponse } from 'next/server'
import { prisma, isDatabaseConnected } from '@/lib/db'
import { publicDownloads } from '@/lib/public-downloads'
import { staticTeamMembers } from '@/lib/services/team-service'
import { staticProjects } from '@/lib/services/projects-service'
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export async function POST() {
  const connected = await isDatabaseConnected()
  if (!connected) {
    return NextResponse.json(
      {
        error: 'Database is not connected. Please verify DATABASE_URL is configured.',
      },
      { status: 503 }
    )
  }

  try {
    let adminCreated = false
    let resourcesSeeded = 0
    let teamSeeded = 0
    let projectsSeeded = 0

    // 1. Seed Superadmin if none exists
    const existingAdmin = await prisma.adminUser.findFirst()
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 10)
      await prisma.adminUser.create({
        data: {
          email: DEFAULT_ADMIN_EMAIL.toLowerCase(),
          passwordHash,
          name: 'Agri Experience Admin',
        },
      })
      adminCreated = true
    }

    // 2. Seed Resources from publicDownloads if empty
    const resourceCount = await prisma.resource.count()
    if (resourceCount === 0) {
      for (const item of publicDownloads) {
        await prisma.resource.create({
          data: {
            titleEn: item.title,
            titleFr: null,
            link: item.link,
            client: item.client,
            citationEn: item.citation,
            citationFr: null,
            clientLink: item.clientLink || null,
            category: item.category,
          },
        })
        resourcesSeeded++
      }
    }

    // 3. Seed Team Members if empty
    const teamCount = await prisma.teamMember.count()
    if (teamCount === 0) {
      for (const m of staticTeamMembers) {
        await prisma.teamMember.create({
          data: {
            name: m.name,
            roleEn: m.roleEn,
            roleFr: m.roleFr || null,
            bioEn: m.bioEn || null,
            bioFr: m.bioFr || null,
            image: m.image || null,
            order: m.order,
          },
        })
        teamSeeded++
      }
    }

    // 4. Seed Projects if empty
    const projectCount = await prisma.project.count()
    if (projectCount === 0) {
      for (const p of staticProjects) {
        await prisma.project.create({
          data: {
            titleEn: p.titleEn,
            titleFr: p.titleFr || null,
            descEn: p.descEn,
            descFr: p.descFr || null,
            category: p.category,
            client: p.client || null,
            year: p.year || null,
            order: p.order,
          },
        })
        projectsSeeded++
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Seed completed successfully',
      stats: {
        adminCreated,
        resourcesSeeded,
        teamSeeded,
        projectsSeeded,
        totalResources: resourceCount === 0 ? resourcesSeeded : resourceCount,
        totalTeam: teamCount === 0 ? teamSeeded : teamCount,
        totalProjects: projectCount === 0 ? projectsSeeded : projectCount,
      },
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Seeding failed' },
      { status: 500 }
    )
  }
}
