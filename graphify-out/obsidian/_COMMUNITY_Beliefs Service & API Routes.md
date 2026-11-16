---
type: community
cohesion: 0.30
members: 14
---

# Beliefs Service & API Routes

**Cohesion:** 0.30 - loosely connected
**Members:** 14 nodes

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
- [[updateBelief()]] - code - lib/services/beliefs-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Beliefs_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 6 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 5 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 4 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 3 edges to [[_COMMUNITY_Beliefs & Why-Agri Admin UI]]
- 3 edges to [[_COMMUNITY_Team & Page Sections API]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 1 edge to [[_COMMUNITY_Localized Metadata & Home Sections]]

## Top bridge nodes
- [[beliefs-service.ts]] - degree 25, connects to 6 communities
- [[beliefsidroute.ts]] - degree 8, connects to 3 communities
- [[beliefsroute.ts]] - degree 8, connects to 3 communities
- [[updateBelief()]] - degree 6, connects to 1 community
- [[createBelief()]] - degree 5, connects to 1 community