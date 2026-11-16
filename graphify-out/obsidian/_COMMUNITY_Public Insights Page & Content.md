---
type: community
cohesion: 0.60
members: 5
---

# Public Insights Page & Content

**Cohesion:** 0.60 - moderately connected
**Members:** 5 nodes

## Members
- [[InsightsContent()]] - code - components/insights-content.tsx
- [[InsightsPage()]] - code - app/[locale]/insights/page.tsx
- [[localeinsightspage.tsx]] - code - app/[locale]/insights/page.tsx
- [[getInsights()]] - code - lib/services/insights-service.ts
- [[revalidate_3]] - code - app/[locale]/insights/page.tsx

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Public_Insights_Page__Content
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_Insights Service & API Routes]]
- 2 edges to [[_COMMUNITY_Our Work Client Views]]
- 1 edge to [[_COMMUNITY_Interactive Impact Map & Services]]
- 1 edge to [[_COMMUNITY_About & Services Bento Grid]]
- 1 edge to [[_COMMUNITY_Home Page Data Hydration]]

## Top bridge nodes
- [[localeinsightspage.tsx]] - degree 7, connects to 3 communities
- [[getInsights()]] - degree 6, connects to 2 communities
- [[InsightsContent()]] - degree 4, connects to 2 communities