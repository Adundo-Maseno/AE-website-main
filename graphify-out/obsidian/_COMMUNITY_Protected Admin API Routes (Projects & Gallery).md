---
type: community
cohesion: 0.22
members: 19
---

# Protected Admin API Routes (Projects & Gallery)

**Cohesion:** 0.22 - loosely connected
**Members:** 19 nodes

## Members
- [[DELETE()_6]] - code - app/api/admin/projects/[id]/route.ts
- [[GET()_1]] - code - app/api/admin/auth/session/route.ts
- [[GET()_4]] - code - app/api/admin/gallery-items/route.ts
- [[GET()_10]] - code - app/api/admin/projects/route.ts
- [[POST()_5]] - code - app/api/admin/gallery-items/route.ts
- [[POST()_9]] - code - app/api/admin/projects/route.ts
- [[PUT()_6]] - code - app/api/admin/projects/[id]/route.ts
- [[createProject()]] - code - lib/services/projects-service.ts
- [[deleteProject()]] - code - lib/services/projects-service.ts
- [[ensureSeeded()_6]] - code - lib/services/projects-service.ts
- [[gallery-itemsroute.ts]] - code - app/api/admin/gallery-items/route.ts
- [[getSession()]] - code - lib/auth.ts
- [[projects-service.ts]] - code - lib/services/projects-service.ts
- [[projectsidroute.ts]] - code - app/api/admin/projects/[id]/route.ts
- [[projectsroute.ts]] - code - app/api/admin/projects/route.ts
- [[resolveProjectId()]] - code - lib/services/projects-service.ts
- [[seedGuard_6]] - code - lib/services/projects-service.ts
- [[sessionroute.ts]] - code - app/api/admin/auth/session/route.ts
- [[updateProject()]] - code - lib/services/projects-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Protected_Admin_API_Routes_Projects__Gallery
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_Expertise Pillars Service & API Routes]]
- 9 edges to [[_COMMUNITY_Public Page Data Hydration & Revalidation]]
- 9 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 9 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 8 edges to [[_COMMUNITY_Sections API, Terms & SEO Routes]]
- 7 edges to [[_COMMUNITY_Our Work Pillar Client Views & Newsletter]]
- 7 edges to [[_COMMUNITY_Home Page & Partners API Routes]]
- 6 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 6 edges to [[_COMMUNITY_Gallery Item Service & Route Handlers]]
- 6 edges to [[_COMMUNITY_Media Upload, Contact & Email Pipeline]]
- 6 edges to [[_COMMUNITY_Field Insights Service, API & Public View]]
- 6 edges to [[_COMMUNITY_Impact Map Service & API Routes]]
- 6 edges to [[_COMMUNITY_Resources Service & API Routes]]
- 6 edges to [[_COMMUNITY_Team Service & API Routes]]
- 6 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 3 edges to [[_COMMUNITY_Admin Settings UI & Contact Page]]
- 2 edges to [[_COMMUNITY_Admin Layout Shell & Header]]
- 2 edges to [[_COMMUNITY_Admin Gallery, Partners, Projects & Sections]]
- 2 edges to [[_COMMUNITY_Gallery Page & Office Plants Motion]]

## Top bridge nodes
- [[getSession()]] - degree 85, connects to 15 communities
- [[projects-service.ts]] - degree 34, connects to 7 communities
- [[gallery-itemsroute.ts]] - degree 8, connects to 4 communities
- [[projectsroute.ts]] - degree 8, connects to 3 communities
- [[projectsidroute.ts]] - degree 8, connects to 2 communities