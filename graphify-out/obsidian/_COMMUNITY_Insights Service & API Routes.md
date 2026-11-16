---
type: community
cohesion: 0.27
members: 15
---

# Insights Service & API Routes

**Cohesion:** 0.27 - loosely connected
**Members:** 15 nodes

## Members
- [[DELETE()_3]] - code - app/api/admin/insights/[id]/route.ts
- [[GET()_5]] - code - app/api/admin/insights/route.ts
- [[POST()_6]] - code - app/api/admin/insights/route.ts
- [[PUT()_3]] - code - app/api/admin/insights/[id]/route.ts
- [[createInsight()]] - code - lib/services/insights-service.ts
- [[deleteInsight()]] - code - lib/services/insights-service.ts
- [[ensureSeeded()_3]] - code - lib/services/insights-service.ts
- [[getInsights()]] - code - lib/services/insights-service.ts
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
- 8 edges to [[_COMMUNITY_Admin Dashboard & DB Seeding]]
- 7 edges to [[_COMMUNITY_Admin Philosophy, Insights & Form Modals]]
- 6 edges to [[_COMMUNITY_Protected Admin CRUD API Routes]]
- 3 edges to [[_COMMUNITY_Site Settings, SEO & Terms Routes]]
- 2 edges to [[_COMMUNITY_Admin Session & JWT Auth]]
- 2 edges to [[_COMMUNITY_Beliefs Service & API Routes]]

## Top bridge nodes
- [[insights-service.ts]] - degree 23, connects to 4 communities
- [[insightsidroute.ts]] - degree 8, connects to 3 communities
- [[insightsroute.ts]] - degree 8, connects to 3 communities
- [[getInsights()]] - degree 6, connects to 2 communities
- [[updateInsight()]] - degree 6, connects to 1 community