---
type: community
cohesion: 0.39
members: 8
---

# Projects Service & ID Resolution

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[DELETE()_6]] - code - app/api/admin/projects/[id]/route.ts
- [[PUT()_6]] - code - app/api/admin/projects/[id]/route.ts
- [[deleteProject()]] - code - lib/services/projects-service.ts
- [[ensureSeeded()_6]] - code - lib/services/projects-service.ts
- [[projectsidroute.ts]] - code - app/api/admin/projects/[id]/route.ts
- [[resolveProjectId()]] - code - lib/services/projects-service.ts
- [[seedGuard_6]] - code - lib/services/projects-service.ts
- [[updateProject()]] - code - lib/services/projects-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Projects_Service__ID_Resolution
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 3 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 1 edge to [[_COMMUNITY_Admin Session & JWT Auth]]
- 1 edge to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 1 edge to [[_COMMUNITY_Client Advisory & Projects API]]
- 1 edge to [[_COMMUNITY_Beliefs Service & API Routes]]

## Top bridge nodes
- [[projectsidroute.ts]] - degree 8, connects to 4 communities
- [[updateProject()]] - degree 6, connects to 2 communities
- [[ensureSeeded()_6]] - degree 5, connects to 2 communities
- [[deleteProject()]] - degree 5, connects to 1 community
- [[DELETE()_6]] - degree 3, connects to 1 community