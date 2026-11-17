---
type: community
cohesion: 0.27
members: 15
---

# Beliefs Service & API Routes

**Cohesion:** 0.27 - loosely connected
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
- [[staticBeliefs]] - code - lib/services/beliefs-service.ts
- [[updateBelief()]] - code - lib/services/beliefs-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Beliefs_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 6 edges to [[_COMMUNITY_Protected Admin API Routes (Projects & Gallery)]]
- 6 edges to [[_COMMUNITY_Expertise Pillars Service & API Routes]]
- 4 edges to [[_COMMUNITY_Home Page & Partners API Routes]]
- 3 edges to [[_COMMUNITY_Beliefs & Why-Agri Admin Pages]]
- 3 edges to [[_COMMUNITY_Sections API, Terms & SEO Routes]]
- 2 edges to [[_COMMUNITY_Admin Session, JWT & Credentials API]]
- 1 edge to [[_COMMUNITY_Home Content & Why-Agri Experience]]

## Top bridge nodes
- [[beliefs-service.ts]] - degree 25, connects to 6 communities
- [[beliefsidroute.ts]] - degree 8, connects to 3 communities
- [[beliefsroute.ts]] - degree 8, connects to 3 communities
- [[updateBelief()]] - degree 6, connects to 1 community
- [[createBelief()]] - degree 5, connects to 1 community