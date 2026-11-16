---
type: community
cohesion: 0.27
members: 14
---

# Insights Service & API Routes

**Cohesion:** 0.27 - loosely connected
**Members:** 14 nodes

## Members
- [[DELETE()_3]] - code - app/api/admin/insights/[id]/route.ts
- [[GET()_5]] - code - app/api/admin/insights/route.ts
- [[POST()_6]] - code - app/api/admin/insights/route.ts
- [[PUT()_3]] - code - app/api/admin/insights/[id]/route.ts
- [[createInsight()]] - code - lib/services/insights-service.ts
- [[deleteInsight()]] - code - lib/services/insights-service.ts
- [[ensureSeeded()_3]] - code - lib/services/insights-service.ts
- [[insights-service.ts]] - code - lib/services/insights-service.ts
- [[insightsidroute.ts]] - code - app/api/admin/insights/[id]/route.ts
- [[insightsroute.ts]] - code - app/api/admin/insights/route.ts
- [[resolveInsightId()]] - code - lib/services/insights-service.ts
- [[seedGuard_3]] - code - lib/services/insights-service.ts
- [[staticInsights]] - code - lib/services/insights-service.ts
- [[updateInsight()]] - code - lib/services/insights-service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Insights_Service__API_Routes
SORT file.name ASC
```

## Connections to other communities
- 6 edges to [[_COMMUNITY_Protected Admin CRUD Routes]]
- 4 edges to [[_COMMUNITY_Public Insights Page & Content]]
- 4 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 4 edges to [[_COMMUNITY_Partners Service & API Routes]]
- 3 edges to [[_COMMUNITY_Admin Insights Management UI]]
- 3 edges to [[_COMMUNITY_Team & Page Sections API]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 1 edge to [[_COMMUNITY_Our Work Client Views]]
- 1 edge to [[_COMMUNITY_Home Page Data Hydration]]

## Top bridge nodes
- [[insights-service.ts]] - degree 23, connects to 7 communities
- [[insightsroute.ts]] - degree 8, connects to 4 communities
- [[insightsidroute.ts]] - degree 8, connects to 3 communities
- [[GET()_5]] - degree 3, connects to 2 communities
- [[updateInsight()]] - degree 6, connects to 1 community