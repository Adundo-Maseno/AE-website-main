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
- [[GET()_2]] - code - app/api/admin/beliefs/route.ts
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
- 11 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 8 edges to [[_COMMUNITY_Protected Admin API Auth Guards]]
- 4 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 3 edges to [[_COMMUNITY_Beliefs Admin Page & Form Modal]]
- 3 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 3 edges to [[_COMMUNITY_Admin Login & SEO Route Handlers]]
- 2 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 2 edges to [[_COMMUNITY_Expertise Pillars Service & ID Resolution]]
- 2 edges to [[_COMMUNITY_Field Gallery Admin & Showcase]]
- 2 edges to [[_COMMUNITY_Field Insights Admin & Public Showcase]]
- 2 edges to [[_COMMUNITY_Pan-African Impact Map & Admin UI]]
- 2 edges to [[_COMMUNITY_Projects Service & Capacity Building]]
- 2 edges to [[_COMMUNITY_Resource Library & PDF Preview]]
- 2 edges to [[_COMMUNITY_Team Service, Roster Admin & Showcase]]
- 2 edges to [[_COMMUNITY_Why-Agri Service & ID Resolution]]
- 1 edge to [[_COMMUNITY_Admin Settings UI, Footer & Why-Agri]]

## Top bridge nodes
- [[stripManagedFields()]] - degree 29, connects to 11 communities
- [[beliefs-service.ts]] - degree 25, connects to 5 communities
- [[beliefsidroute.ts]] - degree 8, connects to 3 communities
- [[beliefsroute.ts]] - degree 8, connects to 3 communities
- [[getAllBeliefsAdmin()]] - degree 4, connects to 1 community