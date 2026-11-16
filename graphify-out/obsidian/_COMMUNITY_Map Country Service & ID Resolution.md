---
type: community
cohesion: 0.39
members: 8
---

# Map Country Service & ID Resolution

**Cohesion:** 0.39 - loosely connected
**Members:** 8 nodes

## Members
- [[DELETE()_4]] - code - app/api/admin/map/[id]/route.ts
- [[PUT()_4]] - code - app/api/admin/map/[id]/route.ts
- [[deleteCountry()]] - code - lib/services/map-service.ts
- [[ensureSeeded()_4]] - code - lib/services/map-service.ts
- [[mapidroute.ts]] - code - app/api/admin/map/[id]/route.ts
- [[resolveCountryId()]] - code - lib/services/map-service.ts
- [[seedGuard_4]] - code - lib/services/map-service.ts
- [[updateCountry()]] - code - lib/services/map-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Map_Country_Service__ID_Resolution
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 3 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 1 edge to [[_COMMUNITY_Admin Session & JWT Auth]]
- 1 edge to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 1 edge to [[_COMMUNITY_Impact Map Country Data & Services]]
- 1 edge to [[_COMMUNITY_Beliefs Service & API Routes]]

## Top bridge nodes
- [[mapidroute.ts]] - degree 8, connects to 4 communities
- [[updateCountry()]] - degree 6, connects to 2 communities
- [[ensureSeeded()_4]] - degree 5, connects to 2 communities
- [[deleteCountry()]] - degree 5, connects to 1 community
- [[DELETE()_4]] - degree 3, connects to 1 community