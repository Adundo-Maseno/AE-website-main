---
type: community
cohesion: 0.30
members: 14
---

# Partners Service & API Routes

**Cohesion:** 0.30 - loosely connected
**Members:** 14 nodes

## Members
- [[DELETE()_5]] - code - app/api/admin/partners/[id]/route.ts
- [[GET()_7]] - code - app/api/admin/partners/route.ts
- [[POST()_8]] - code - app/api/admin/partners/route.ts
- [[PUT()_5]] - code - app/api/admin/partners/[id]/route.ts
- [[createPartner()]] - code - lib/services/partners-service.ts
- [[deletePartner()]] - code - lib/services/partners-service.ts
- [[ensureSeeded()_5]] - code - lib/services/partners-service.ts
- [[getAllPartnersAdmin()]] - code - lib/services/partners-service.ts
- [[partners-service.ts]] - code - lib/services/partners-service.ts
- [[partnersidroute.ts]] - code - app/api/admin/partners/[id]/route.ts
- [[partnersroute.ts]] - code - app/api/admin/partners/route.ts
- [[resolvePartnerId()]] - code - lib/services/partners-service.ts
- [[seedGuard_5]] - code - lib/services/partners-service.ts
- [[updatePartner()]] - code - lib/services/partners-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Partners_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 6 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 4 edges to [[_COMMUNITY_Admin Content Pages & Sections Config]]
- 4 edges to [[_COMMUNITY_Beliefs Service & API Routes]]
- 3 edges to [[_COMMUNITY_Home Page Data Hydration]]
- 3 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]

## Top bridge nodes
- [[partners-service.ts]] - degree 26, connects to 5 communities
- [[partnersidroute.ts]] - degree 8, connects to 3 communities
- [[partnersroute.ts]] - degree 8, connects to 3 communities
- [[updatePartner()]] - degree 6, connects to 1 community
- [[createPartner()]] - degree 5, connects to 1 community