---
type: community
cohesion: 0.23
members: 13
---

# Expertise Pillars Service & API

**Cohesion:** 0.23 - loosely connected
**Members:** 13 nodes

## Members
- [[DELETE()_1]] - code - app/api/admin/expertise/[id]/route.ts
- [[GET()_2]] - code - app/api/admin/expertise/route.ts
- [[POST()_4]] - code - app/api/admin/expertise/route.ts
- [[PUT()_1]] - code - app/api/admin/expertise/[id]/route.ts
- [[createExpertisePillar()]] - code - lib/services/expertise-service.ts
- [[deleteExpertisePillar()]] - code - lib/services/expertise-service.ts
- [[ensureSeeded()_1]] - code - lib/services/expertise-service.ts
- [[expertiseidroute.ts]] - code - app/api/admin/expertise/[id]/route.ts
- [[expertiseroute.ts]] - code - app/api/admin/expertise/route.ts
- [[getAllExpertisePillarsAdmin()]] - code - lib/services/expertise-service.ts
- [[resolveExpertiseId()]] - code - lib/services/expertise-service.ts
- [[seedGuard_1]] - code - lib/services/expertise-service.ts
- [[updateExpertisePillar()]] - code - lib/services/expertise-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Expertise_Pillars_Service__API
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 6 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 3 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 2 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]

## Top bridge nodes
- [[expertiseidroute.ts]] - degree 8, connects to 4 communities
- [[expertiseroute.ts]] - degree 8, connects to 4 communities
- [[updateExpertisePillar()]] - degree 6, connects to 2 communities
- [[createExpertisePillar()]] - degree 5, connects to 2 communities
- [[seedGuard_1]] - degree 3, connects to 2 communities