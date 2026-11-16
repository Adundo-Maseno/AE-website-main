---
type: community
cohesion: 0.30
members: 15
---

# Beliefs Service & API Routes

**Cohesion:** 0.30 - loosely connected
**Members:** 15 nodes

## Members
- [[DELETE()]] - code - app/api/admin/beliefs/[id]/route.ts
- [[GET()_1]] - code - app/api/admin/beliefs/route.ts
- [[POST()_3]] - code - app/api/admin/beliefs/route.ts
- [[PUT()]] - code - app/api/admin/beliefs/[id]/route.ts
- [[beliefs-service.ts]] - code - lib/services/beliefs-service.ts
- [[beliefsidroute.ts]] - code - app/api/admin/beliefs/[id]/route.ts
- [[beliefsroute.ts]] - code - app/api/admin/beliefs/route.ts
- [[createBelief()]] - code - lib/services/beliefs-service.ts
- [[deleteBelief()]] - code - lib/services/beliefs-service.ts
- [[ensureSeeded()]] - code - lib/services/beliefs-service.ts
- [[getAllBeliefsAdmin()]] - code - lib/services/beliefs-service.ts
- [[resolveBeliefId()]] - code - lib/services/beliefs-service.ts
- [[seedGuard]] - code - lib/services/beliefs-service.ts
- [[stripManagedFields()]] - code - lib/services/service-utils.ts
- [[updateBelief()]] - code - lib/services/beliefs-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Beliefs_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 15 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 8 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 4 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 3 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 3 edges to [[_COMMUNITY_Admin Philosophy, Insights & Form Modals]]
- 3 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 3 edges to [[_COMMUNITY_Expertise Pillars Service & API]]
- 3 edges to [[_COMMUNITY_Why-Agri Service & API Routes]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 2 edges to [[_COMMUNITY_Gallery Items Service & API Routes]]
- 2 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 1 edge to [[_COMMUNITY_Map Country Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Projects Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Team Service & ID Resolution]]

## Top bridge nodes
- [[stripManagedFields()]] - degree 29, connects to 10 communities
- [[beliefs-service.ts]] - degree 25, connects to 4 communities
- [[beliefsidroute.ts]] - degree 8, connects to 3 communities
- [[beliefsroute.ts]] - degree 8, connects to 3 communities
- [[getAllBeliefsAdmin()]] - degree 4, connects to 1 community