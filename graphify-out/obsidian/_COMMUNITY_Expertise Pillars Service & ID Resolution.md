---
type: community
cohesion: 0.39
members: 8
---

# Expertise Pillars Service & ID Resolution

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[DELETE()_1]] - code - app/api/admin/expertise/[id]/route.ts
- [[PUT()_1]] - code - app/api/admin/expertise/[id]/route.ts
- [[deleteExpertisePillar()]] - code - lib/services/expertise-service.ts
- [[ensureSeeded()_1]] - code - lib/services/expertise-service.ts
- [[expertiseidroute.ts]] - code - app/api/admin/expertise/[id]/route.ts
- [[resolveExpertiseId()]] - code - lib/services/expertise-service.ts
- [[seedGuard_1]] - code - lib/services/expertise-service.ts
- [[updateExpertisePillar()]] - code - lib/services/expertise-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Expertise_Pillars_Service__ID_Resolution
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Home & About Page Data Hydration]]
- 4 edges to [[_COMMUNITY_Protected Admin API Auth Guards]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 1 edge to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 1 edge to [[_COMMUNITY_Admin Login & SEO Route Handlers]]

## Top bridge nodes
- [[expertiseidroute.ts]] - degree 8, connects to 4 communities
- [[updateExpertisePillar()]] - degree 6, connects to 2 communities
- [[ensureSeeded()_1]] - degree 5, connects to 2 communities
- [[seedGuard_1]] - degree 3, connects to 2 communities
- [[deleteExpertisePillar()]] - degree 5, connects to 1 community