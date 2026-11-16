---
type: community
cohesion: 0.22
members: 17
---

# Admin Dashboard & DB Seeding

**Cohesion:** 0.22 - loosely connected
**Members:** 17 nodes

## Members
- [[AdminDashboardPage()]] - code - app/admin/page.tsx
- [[SeedButton()]] - code - components/admin/seed-button.tsx
- [[adminpage.tsx]] - code - app/admin/page.tsx
- [[db.ts]] - code - lib/db.ts
- [[defaultSiteSettings]] - code - lib/services/settings-service.ts
- [[globalForPrisma]] - code - lib/db.ts
- [[prisma]] - code - lib/db.ts
- [[seed-button.tsx]] - code - components/admin/seed-button.tsx
- [[seedroute.ts]] - code - app/api/admin/seed/route.ts
- [[settings-service.ts]] - code - lib/services/settings-service.ts
- [[staticBeliefs]] - code - lib/services/beliefs-service.ts
- [[staticExpertisePillars]] - code - lib/services/expertise-service.ts
- [[staticGalleryItems]] - code - lib/services/gallery-service.ts
- [[staticPartners]] - code - lib/services/partners-service.ts
- [[staticProjects]] - code - lib/services/projects-service.ts
- [[staticTeamMembers]] - code - lib/services/team-service.ts
- [[staticWhyAgriCards]] - code - lib/services/why-agri-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Admin_Dashboard__DB_Seeding
SORT file.name ASC
```

## Connections to other communities
- 13 edges to [[_COMMUNITY_Team & Page Sections API]]
- 9 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 7 edges to [[_COMMUNITY_Resources Library & Metadata Layouts]]
- 6 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 6 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 5 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 5 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 5 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 5 edges to [[_COMMUNITY_Field Gallery CMS & Showcase]]
- 5 edges to [[_COMMUNITY_Our Work Pillar Pages]]
- 5 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 5 edges to [[_COMMUNITY_Footer Settings & PDF Preview]]
- 5 edges to [[_COMMUNITY_Interactive Impact Map & Services]]
- 4 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 3 edges to [[_COMMUNITY_App Layouts & Global Shell]]
- 1 edge to [[_COMMUNITY_Runtime Package Dependencies]]

## Top bridge nodes
- [[seedroute.ts]] - degree 35, connects to 13 communities
- [[db.ts]] - degree 21, connects to 13 communities
- [[adminpage.tsx]] - degree 26, connects to 12 communities
- [[prisma]] - degree 17, connects to 11 communities
- [[settings-service.ts]] - degree 14, connects to 5 communities